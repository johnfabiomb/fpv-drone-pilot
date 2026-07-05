// After the production build, use the built SPA shell as the GitHub Pages 404
// fallback. GitHub Pages serves 404.html for any path without a prerendered file
// — i.e. the booking app (/bookings/*, /book/:token pay links, /book/calendar …);
// every map route is prerendered, so the map never hits this. This boots the Angular
// app IN PLACE at the requested URL (instead of bouncing through "/", which broke
// OAuth callbacks).
//
// docs/index.html is the PRERENDERED LANDING page, so we strip its DOM (stripAppShell)
// down to a neutral boot loader — otherwise the browser paints the whole landing page
// for a frame before Angular boots and routes to the real page.
//
// We also swap the inherited map Open Graph tags for a neutral BOOKING card, so a
// pay link shared on WhatsApp/IG previews as "Booking · John F. Montaño" with a
// branded image instead of the "Explore Malta" map card. (Dedicated routes like
// /book/invoice override this with their own card via make-share-pages.js.)
const fs = require('fs');
const path = require('path');
const { rewriteMeta, stripAppShell } = require('./og-meta');

const docs = path.join(__dirname, '..', 'docs');
const ORIGIN = 'https://johnfabiomb.com';

const shell = stripAppShell(fs.readFileSync(path.join(docs, 'index.html'), 'utf8'));
const html = rewriteMeta(shell, {
  title: 'Booking · John F. Montaño',
  description: 'Confirm and pay for your booking with John F. Montaño — aerial & camera production, Malta.',
  url: `${ORIGIN}/book`,
  image: `${ORIGIN}/assets/og-booking.png`,
  imageAlt: 'Booking — John F. Montaño',
  siteName: 'John F. Montaño',
  noindex: true,   // catch-all fallback (booking app shell) — not for indexing
});
fs.writeFileSync(path.join(docs, '404.html'), html);
console.log('make-404: docs/404.html ← SPA fallback + branded booking OG card');
