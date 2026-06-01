const fs   = require('fs');
const path = require('path');

const BASE  = 'https://johnfabiomb.com';
const today = new Date().toISOString().split('T')[0];

const locs      = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/assets/locations.json'),  'utf8'));
const providers = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/assets/providers.json'), 'utf8'));

const locArray      = Array.isArray(locs)      ? locs      : (locs.locations      ?? locs);
const providerArray = Array.isArray(providers) ? providers : (providers.providers ?? providers);

const url = (loc, priority, changefreq, extra = '') => `  <url>
    <loc>${BASE}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${extra}
  </url>`;

const homeExtra = `
    <image:image>
      <image:loc>${BASE}/assets/map-min.png</image:loc>
      <image:title>Explore Malta - Interactive Map of Hidden Gems</image:title>
      <image:caption>Free interactive map of Malta featuring ${locArray.length}+ hidden gems, caves, beaches and historical sites by FPV drone pilot John Montaño</image:caption>
    </image:image>`;

const staticUrls = [
  url('/malta',               '1.0', 'weekly',  homeExtra),
  url('/malta/list',          '0.7', 'weekly'),
  url('/malta/deals',         '0.7', 'weekly'),
  url('/malta/30-places-2026','0.6', 'monthly'),
  url('/about',               '0.4', 'monthly'),
  url('/contact',             '0.4', 'monthly'),
  url('/privacy',             '0.4', 'monthly'),
  url('/cookies',             '0.4', 'monthly'),
];

const locationUrls = locArray.map(loc =>
  url(`/malta/locations/${loc.slug}`, '0.8', 'daily'),
);

const providerUrls = providerArray.map(p =>
  url(`/malta/providers/${p.id}`, '0.5', 'weekly'),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[...staticUrls, ...locationUrls, ...providerUrls].join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '../src/sitemap.xml'), sitemap);
console.log(`Sitemap generated — ${staticUrls.length + locationUrls.length + providerUrls.length} URLs (${today})`);
