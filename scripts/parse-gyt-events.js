#!/usr/bin/env node
/**
 * Parses a saved GetYourTickets "Malta" listing HTML into structured JSON.
 *
 * You provide the HTML (e.g. save the page you're browsing as an affiliate):
 *   node scripts/parse-gyt-events.js path/to/gyt-malta.html [output.json]
 *
 * Output: an array of events with name, date (raw + ISO), venue, image, the
 * base event url, and YOUR affiliate url (base + '/' + AFFILIATE_CODE).
 *
 * Only `.cardEvent` blocks badged "Malta" are kept.
 */

const fs = require('fs');
const path = require('path');

const AFFILIATE_CODE = 'NMAHOOF1';
const ASSUMED_BASE_YEAR = 2026; // dates have no year; months before the "season start" roll to next year

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim();
}

// "Tuesday 23 June 21:00" -> { iso, dateRaw }
function parseDate(raw) {
  const m = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{1,2}):(\d{2})/.exec(raw);
  if (!m) return { iso: null, dateRaw: raw };
  const day = +m[1], month = MONTHS[m[2].toLowerCase()], hh = m[3].padStart(2, '0'), mm = m[4];
  if (!month) return { iso: null, dateRaw: raw };
  // June onwards = base year; Jan–May = next year (season wrap)
  const year = month >= 6 ? ASSUMED_BASE_YEAR : ASSUMED_BASE_YEAR + 1;
  const iso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${hh}:${mm}`;
  return { iso, dateRaw: raw };
}

// crude category guess from the name (affiliate feed would give the real one)
function guessCategory(name) {
  const n = name.toLowerCase();
  if (/pool|swim|beach|foam/.test(n)) return 'pool-beach';
  if (/boat|cruise|sail/.test(n)) return 'boat';
  if (/festival|showcase|live|concert|tour/.test(n)) return 'concert-festival';
  if (/pub crawl|crawl/.test(n)) return 'nightlife';
  return 'party';
}

function parse(html) {
  const cards = html.split(/class="card noselect cardEvent"/).slice(1);
  // Group by event URL — a recurring event (e.g. "TwentyTwo Friday") shows up
  // as one card per date, so we collect every occurrence into one event's dates[].
  const byUrl = new Map();

  for (const card of cards) {
    const badge = (card.match(/class="badge">([^<]+)</) || [])[1];
    if (!badge || badge.trim().toLowerCase() !== 'malta') continue;

    const url = (card.match(/href="(https?:\/\/[^"]+\/event\/[^"]+)"/) || [])[1];
    if (!url) continue;

    const image = (card.match(/<img[^>]+src="([^"]+)"/) || [])[1] || null;
    const name = decodeEntities((card.match(/class="titleEv[^"]*"><a[^>]*>([^<]+)</) || [])[1] || '');
    const dateRaw = decodeEntities((card.match(/class="dateEv">([^<]+)</) || [])[1] || '');
    const venue = decodeEntities((card.match(/class="[^"]*luoEv[^"]*"[^>]*>.*?<\/i>\s*([^<]+)</) || [])[1] || '');
    const { iso } = parseDate(dateRaw);

    if (!byUrl.has(url)) {
      const parts = url.replace(/\/+$/, '').split('/event/')[1].split('/');
      byUrl.set(url, {
        id: parts[1] || null,
        name,
        category: guessCategory(name),
        venue,
        lat: null,           // fill from a venue → coords lookup later
        lon: null,
        image,
        url,
        affiliateUrl: `${url}/${AFFILIATE_CODE}`,
        organizer: parts[0] || null,
        dates: [],
      });
    }
    // collect this occurrence (dedupe identical date strings)
    const ev = byUrl.get(url);
    if (dateRaw && !ev.dates.some(d => d.dateRaw === dateRaw)) {
      ev.dates.push({ start: iso, dateRaw });
    }
  }

  // Coordinates: the Google Map markers carry position="lat,lng" + aria-label=name.
  // Join them to events by name so each event gets its venue's exact lat/lon.
  const coordsByName = new Map();
  const markerRe = /<gmp-advanced-marker[^>]*?aria-label="([^"]*)"[^>]*?position="(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)"/g;
  let mk;
  while ((mk = markerRe.exec(html)) !== null) {
    const key = decodeEntities(mk[1]).toLowerCase();
    if (!coordsByName.has(key)) coordsByName.set(key, { lat: +mk[2], lon: +mk[3] });
  }

  const events = [...byUrl.values()];
  for (const ev of events) {
    ev.dates.sort((a, b) => (a.start || '').localeCompare(b.start || ''));
    const c = coordsByName.get(ev.name.toLowerCase());
    if (c) { ev.lat = c.lat; ev.lon = c.lon; }
  }
  return events;
}

// ── main ──
const inFile = process.argv[2];
const outFile = process.argv[3] || path.join(__dirname, '../src/assets/events.json');
if (!inFile) {
  console.error('Usage: node scripts/parse-gyt-events.js <input.html> [output.json]');
  process.exit(1);
}
const html = fs.readFileSync(inFile, 'utf8');
const events = parse(html);
const firstDate = e => (e.dates[0] && e.dates[0].start) || '';
events.sort((a, b) => firstDate(a).localeCompare(firstDate(b)));
const totalOccurrences = events.reduce((n, e) => n + e.dates.length, 0);
// Wrapped in { events } to match the app's `import { events } from '@assets/events.json'`.
fs.writeFileSync(outFile, JSON.stringify({ events }, null, 2));
console.log(`Parsed ${events.length} unique Malta events (${totalOccurrences} dated occurrences) → ${path.relative(process.cwd(), outFile)}`);
console.log('Next: node scripts/download-event-images.js  →  node scripts/convert-to-webp.js');
const venues = [...new Set(events.map(e => e.venue).filter(Boolean))];
console.log(`Distinct venues (${venues.length}): ${venues.join(', ')}`);
