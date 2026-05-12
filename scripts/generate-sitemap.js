const fs = require('fs');
const path = require('path');

const BASE = 'https://johnfabiomb.com';
const today = new Date().toISOString().split('T')[0];

const locationsPath = path.join(__dirname, '../src/assets/locations.json');
const sitemapPath   = path.join(__dirname, '../src/sitemap.xml');

const raw  = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));
const locs = Array.isArray(raw) ? raw : (raw.locations ?? raw);

const encode = title => encodeURIComponent(title.replace(/ /g, '-'));

const homepageUrl = `  <url>
    <loc>${BASE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${BASE}/assets/map-min.png</image:loc>
      <image:title>Explore Malta - Interactive Map of Hidden Gems</image:title>
      <image:caption>Free interactive map of Malta featuring ${locs.length}+ hidden gems, caves, beaches and historical sites by FPV drone pilot John Montaño</image:caption>
    </image:image>
  </url>`;

const locationUrls = locs.map(loc => `  <url>
    <loc>${BASE}/malta?title=${encode(loc.title)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[homepageUrl, ...locationUrls].join('\n')}
</urlset>
`;

fs.writeFileSync(sitemapPath, sitemap);
console.log(`Sitemap generated — ${locs.length + 1} URLs (${today})`);
