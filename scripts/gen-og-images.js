// Generates the branded social-share images (1200×630) shown when public links are
// pasted into WhatsApp / Messenger / etc.:
//   og-invoice.png — /book/invoice (the invoice link)
//   og-booking.png — pay links (/book/:token) + booking start (/book), via 404 fallback
// Run once (or after rebranding): `node scripts/gen-og-images.js`.
const path = require('path');
const sharp = require('sharp');

const ACCENT = '#F4A922';
const INK = '#111827';
const MUTED = '#6b7280';
const LINE = '#e5e7eb';
const assets = path.join(__dirname, '..', 'src', 'assets');

// Shared card: accent top bar, document motif, eyebrow + name + tagline + CTA.
function card({ eyebrow, cta }) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="16" fill="${ACCENT}"/>
  <g transform="translate(820,150)">
    <rect x="0" y="0" width="240" height="320" rx="16" fill="#ffffff" stroke="${LINE}" stroke-width="3"/>
    <rect x="0" y="0" width="240" height="64" rx="16" fill="${ACCENT}"/>
    <rect x="0" y="48" width="240" height="16" fill="${ACCENT}"/>
    <rect x="32" y="104" width="176" height="14" rx="7" fill="${LINE}"/>
    <rect x="32" y="140" width="120" height="14" rx="7" fill="${LINE}"/>
    <rect x="32" y="200" width="176" height="14" rx="7" fill="${LINE}"/>
    <rect x="32" y="236" width="140" height="14" rx="7" fill="${LINE}"/>
    <rect x="32" y="282" width="80" height="20" rx="10" fill="${ACCENT}"/>
  </g>
  <g font-family="Helvetica, Arial, sans-serif">
    <text x="100" y="210" font-size="40" font-weight="700" fill="${ACCENT}" letter-spacing="6">${eyebrow}</text>
    <text x="100" y="320" font-size="92" font-weight="800" fill="${INK}">John F. Montaño</text>
    <text x="100" y="380" font-size="34" font-weight="500" fill="${MUTED}">Aerial &amp; camera production · Malta</text>
    <text x="100" y="470" font-size="30" font-weight="600" fill="${INK}">${cta}</text>
  </g>
</svg>`;
}

const IMAGES = [
  { file: 'og-invoice.png', eyebrow: 'INVOICE', cta: 'View &amp; download your invoice' },
  { file: 'og-booking.png', eyebrow: 'BOOKING', cta: 'Confirm &amp; pay for your booking' },
];

Promise.all(IMAGES.map(i =>
  sharp(Buffer.from(card(i))).png().toFile(path.join(assets, i.file))
    .then(() => console.log('gen-og-images: wrote src/assets/' + i.file))
)).catch(err => { console.error(err); process.exit(1); });
