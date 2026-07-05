// Shared: rewrite the <head> SEO / Open Graph / Twitter meta of the built SPA
// shell for a given share target. Social crawlers (WhatsApp, Messenger, Facebook,
// Twitter…) don't run JS, so any link whose preview must be correct needs its OG
// tags baked into the static HTML the server returns. Used by make-404.js (the
// booking-app fallback card) and make-share-pages.js (per-route static cards).

// Replace the content of a <meta> identified by an attribute (name=/property=),
// leaving the rest of the document untouched.
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s+content=")[^"]*(")`, 'i');
  return re.test(html) ? html.replace(re, `$1${value}$2`) : html;
}

/**
 * Rewrite the shell's head meta for a share target.
 * m: { title, description, url, image, imageAlt, imageType, imageW, imageH,
 *      siteName, noindex }
 */
function rewriteMeta(shell, m) {
  let html = shell.replace(/<title>[^<]*<\/title>/i, `<title>${m.title}</title>`);
  if (m.url) html = html.replace(/(<link rel="canonical" href=")[^"]*(")/i, `$1${m.url}$2`);
  html = setMeta(html, 'name', 'robots', m.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  html = setMeta(html, 'name', 'description', m.description);
  html = setMeta(html, 'property', 'og:type', 'website');
  if (m.siteName) html = setMeta(html, 'property', 'og:site_name', m.siteName);
  html = setMeta(html, 'property', 'og:title', m.title);
  html = setMeta(html, 'property', 'og:description', m.description);
  if (m.url) html = setMeta(html, 'property', 'og:url', m.url);
  html = setMeta(html, 'property', 'og:image', m.image);
  html = setMeta(html, 'property', 'og:image:width', String(m.imageW || 1200));
  html = setMeta(html, 'property', 'og:image:height', String(m.imageH || 630));
  html = setMeta(html, 'property', 'og:image:type', m.imageType || 'image/png');
  html = setMeta(html, 'property', 'og:image:alt', m.imageAlt || m.title);
  html = setMeta(html, 'name', 'twitter:title', m.title);
  html = setMeta(html, 'name', 'twitter:description', m.description);
  html = setMeta(html, 'name', 'twitter:image', m.image);
  html = setMeta(html, 'name', 'twitter:image:alt', m.imageAlt || m.title);
  return html;
}

// A minimal boot loader that replaces the prerendered page DOM inside <app-root> in
// the fallback/share shells. Without this, docs/404.html (a copy of the prerendered
// landing page) paints the LANDING for a frame before Angular boots and routes to the
// real page. Angular clears <app-root>'s children on bootstrap, so the spinner + its
// <style> vanish once the app renders. Head/scripts/base-href are left untouched.
const BOOT_LOADER =
  '<style>@keyframes jm-spin{to{transform:rotate(360deg)}}</style>' +
  '<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#fff">' +
  '<div style="width:34px;height:34px;border:3px solid #e5e7eb;border-top-color:#F4A922;border-radius:50%;animation:jm-spin .7s linear infinite"></div>' +
  '</div>';

// Strip the prerendered page DOM from inside <app-root>, leaving a clean root + boot
// loader. Preserves <head>, <base href>, and every <script>/<link> bundle tag (outside
// <app-root>), so the SPA still boots in place at the requested URL.
function stripAppShell(html) {
  return html.replace(/<app-root[\s\S]*?<\/app-root>/i, `<app-root>${BOOT_LOADER}</app-root>`);
}

module.exports = { rewriteMeta, stripAppShell };
