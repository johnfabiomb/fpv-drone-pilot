// Timezone helpers for the admin availability picker, which works in an org's
// local wall-clock (e.g. "10:00 in Europe/Malta") but stores/compares instants
// in UTC. The public calendar gets this from the `get-availability` Edge
// Function; the admin builds availability client-side from data it already has,
// so it needs the same wall-clock ↔ UTC mapping here.

/** Offset (ms) of `tz` at a given instant — positive east of UTC. */
function tzOffsetMs(instant: Date, tz: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const p: Record<string, string> = {};
  for (const part of dtf.formatToParts(instant)) p[part.type] = part.value;
  const asUtc = Date.UTC(+p['year'], +p['month'] - 1, +p['day'], +p['hour'], +p['minute'], +p['second']);
  return asUtc - instant.getTime();
}

/**
 * The UTC instant for a wall-clock hour on `dateStr` (YYYY-MM-DD) in `tz`.
 * Iterates to settle the offset across DST boundaries.
 */
export function zonedHourToUtc(dateStr: string, hour: number, tz: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  let ms = Date.UTC(y, m - 1, d, hour, 0, 0);
  for (let i = 0; i < 2; i++) {
    const corrected = Date.UTC(y, m - 1, d, hour, 0, 0) - tzOffsetMs(new Date(ms), tz);
    if (corrected === ms) break;
    ms = corrected;
  }
  return new Date(ms);
}

/** Express a UTC instant as its wall-clock date (YYYY-MM-DD) + hour in `tz`. */
export function utcToZoned(instant: Date, tz: string): { dateStr: string; hour: number } {
  const dtf = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit',
  });
  const p: Record<string, string> = {};
  for (const part of dtf.formatToParts(instant)) p[part.type] = part.value;
  return { dateStr: `${p['year']}-${p['month']}-${p['day']}`, hour: +p['hour'] };
}
