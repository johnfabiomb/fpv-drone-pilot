#!/usr/bin/env node
/**
 * Downloads remote event images (events.json) into src/assets/images/events/ and
 * rewrites each event's `image` to the local path. Run after parse-gyt-events.js;
 * then `convert-to-webp.js` compresses them (jpg → webp) and rewrites the refs.
 *
 *   node scripts/download-event-images.js
 *
 * Idempotent: skips images already downloaded.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const EVENTS_JSON = path.join(__dirname, '../src/assets/events.json');
const OUT_DIR     = path.join(__dirname, '../src/assets/images/events');
const PUBLIC_BASE = '/assets/images/events';

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close(); fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        file.close(); fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => { file.close(); fs.existsSync(dest) && fs.unlinkSync(dest); reject(err); });
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const data = JSON.parse(fs.readFileSync(EVENTS_JSON, 'utf8'));
  const events = data.events ?? data;

  let downloaded = 0, skipped = 0, failed = 0;
  for (const ev of events) {
    if (!ev.image || !/^https?:\/\//.test(ev.image)) { skipped++; continue; }
    const ext = (ev.image.split('?')[0].match(/\.(jpe?g|png|webp)$/i) || ['', 'jpg'])[1].toLowerCase();
    const fileName = `${ev.id}.${ext === 'jpeg' ? 'jpg' : ext}`;
    const dest = path.join(OUT_DIR, fileName);
    const localPath = `${PUBLIC_BASE}/${fileName}`;

    if (fs.existsSync(dest)) { ev.image = localPath; skipped++; continue; }
    try {
      await download(ev.image, dest);
      ev.image = localPath;
      downloaded++;
    } catch (err) {
      console.warn(`  ! ${ev.id}: ${err.message} (kept remote url)`);
      failed++;
    }
  }

  fs.writeFileSync(EVENTS_JSON, JSON.stringify(data, null, 2));
  console.log(`Event images — downloaded ${downloaded}, skipped ${skipped}, failed ${failed}.`);
  console.log('Next: node scripts/convert-to-webp.js  (compresses + rewrites refs)');
}

main().catch(err => { console.error(err); process.exit(1); });
