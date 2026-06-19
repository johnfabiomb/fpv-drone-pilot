// After the production build, emit static HTML pages for PUBLIC share links whose
// social preview (Open Graph) must be correct WITHOUT running JavaScript — social
// crawlers (WhatsApp, Messenger, Facebook, Twitter…) don't execute JS, they read
// the raw HTML's meta tags. GitHub Pages serves these files for their path while
// the query string (?token=…) is ignored, so the human still boots the SPA in
// place and sees their actual page; only the crawler reads the branded card.
//
// Only works for routes with a LITERAL path segment (so a static file can exist):
//   /book          → booking start (service picker)
//   /book/invoice  → invoice link (?token=…)
// Token-in-PATH links like /book/:token (pay link) can't have a per-file page;
// they fall back to docs/404.html, which make-404.js gives a branded booking card.
//
// Each page is the built SPA shell (docs/index.html) with its head meta swapped.
const fs = require('fs');
const path = require('path');
const { rewriteMeta } = require('./og-meta');

const docs = path.join(__dirname, '..', 'docs');
const ORIGIN = 'https://johnfabiomb.com';

const PAGES = [
  {
    dir: 'book',                               // serves /book (booking start)
    title: 'Book John F. Montaño',
    description: 'Check availability and book aerial & camera production online — John F. Montaño, Malta.',
    url: `${ORIGIN}/book`,
    image: `${ORIGIN}/assets/og-booking.png`,
    imageAlt: 'Book John F. Montaño',
    siteName: 'John F. Montaño',
    noindex: true,   // booking app is intentionally not indexed yet (no SEO wanted)
  },
  {
    dir: 'book/invoice',                       // serves /book/invoice?token=… — private
    title: 'Invoice · John F. Montaño',
    description: 'View and download your invoice from John F. Montaño — aerial & camera production, Malta.',
    url: `${ORIGIN}/book/invoice`,
    image: `${ORIGIN}/assets/og-invoice.png`,
    imageAlt: 'Invoice — John F. Montaño',
    siteName: 'John F. Montaño',
    noindex: true,
  },
];

const shell = fs.readFileSync(path.join(docs, 'index.html'), 'utf8');
for (const p of PAGES) {
  const outDir = path.join(docs, p.dir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), rewriteMeta(shell, p));
  console.log(`make-share-pages: docs/${p.dir}/index.html ← branded OG (${p.title})`);
}
