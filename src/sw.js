const SHELL_CACHE = 'shell-v1';
const TILE_CACHE  = 'map-tiles-v2'; // v2: switched CARTO Voyager → OpenStreetMap tiles; purge old watermarked tiles
const IMG_CACHE   = 'location-imgs-v1';
const MAX_TILES   = 1200;
const MAX_IMGS    = 300;

const SHELL_URLS = ['/', '/index.html', '/assets/locations.json'];

// ── Install: cache the app shell ─────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache => cache.addAll(SHELL_URLS))
  );
  self.skipWaiting();
});

// ── Activate: clean up old caches ────────────────────────────────────────────
self.addEventListener('activate', event => {
  const kept = new Set([SHELL_CACHE, TILE_CACHE, IMG_CACHE]);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !kept.has(k)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Map tiles — cache-first, evict oldest over cap
  if (isTile(url)) {
    event.respondWith(tileFirst(request));
    return;
  }

  // Location images — cache-first, lazy population
  if (isLocationImg(url)) {
    event.respondWith(imgFirst(request));
    return;
  }

  // Navigation requests — network-first, fall back to app shell
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match('/index.html', { cacheName: SHELL_CACHE })
      )
    );
    return;
  }

  // JS/CSS/fonts — network-first, cache as fallback
  if (isAppAsset(url)) {
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(SHELL_CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Everything else — network only
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function isTile(url) {
  return (
    url.hostname === 'tile.openstreetmap.org' ||
    url.hostname.endsWith('.tile.openstreetmap.org')
  );
}

function isLocationImg(url) {
  // Our assets images and any external location photos
  return (
    url.pathname.startsWith('/assets/images/') ||
    url.hostname === 'images.unsplash.com' ||
    url.hostname === 'upload.wikimedia.org'
  );
}

function isAppAsset(url) {
  return (
    url.origin === self.location.origin &&
    (url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.json') ||
      url.pathname.endsWith('.woff2') ||
      url.pathname.endsWith('.woff') ||
      url.pathname.endsWith('.ico'))
  );
}

async function tileFirst(request) {
  const cached = await caches.match(request, { cacheName: TILE_CACHE });
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(TILE_CACHE);
      await evictOldest(cache, MAX_TILES);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function imgFirst(request) {
  const cached = await caches.match(request, { cacheName: IMG_CACHE });
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(IMG_CACHE);
      await evictOldest(cache, MAX_IMGS);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function evictOldest(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length >= maxEntries) {
    await cache.delete(keys[0]);
  }
}
