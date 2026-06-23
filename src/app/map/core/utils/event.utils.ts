import { EventVenuePin, MaltaEvent } from '@map/core/models';
import { EventCategory } from '@map/core/models/enums';

interface CategoryMeta { label: string; icon: string; color: string; }

const CATEGORY_META: Record<EventCategory, CategoryMeta> = {
  [EventCategory.Party]:           { label: 'Party',          icon: '🎉', color: '#a855f7' },
  [EventCategory.PoolBeach]:       { label: 'Pool & Beach',   icon: '🏖️', color: '#06b6d4' },
  [EventCategory.Nightlife]:       { label: 'Nightlife',      icon: '🍸', color: '#ec4899' },
  [EventCategory.ConcertFestival]: { label: 'Concert',        icon: '🎤', color: '#f59e0b' },
  [EventCategory.Boat]:            { label: 'Boat',           icon: '⛵', color: '#0ea5e9' },
};

const FALLBACK: CategoryMeta = { label: 'Event', icon: '🎟️', color: '#e11d48' };
/** Shared accent for the events feature (pins, chips) — distinct from gems/experiences. */
export const EVENTS_ACCENT = '#e11d48';

export function eventCategoryMeta(category: string): CategoryMeta {
  return CATEGORY_META[category as EventCategory] ?? FALLBACK;
}

export const EVENT_FILTERS: { id: string; label: string }[] = [
  { id: 'all',     label: 'All' },
  { id: 'party',   label: 'Parties' },
  { id: 'pool-beach', label: 'Pool & Beach' },
  { id: 'nightlife', label: 'Nightlife' },
  { id: 'concert-festival', label: 'Concerts' },
  { id: 'boat',    label: 'Boat' },
];

export const PERIOD_FILTERS: { id: string; label: string }[] = [
  { id: 'all', label: 'All dates' },
  { id: 'today', label: 'Today' },
  { id: 'weekend', label: 'This weekend' },
  { id: '7d', label: 'Next 7 days' },
  { id: '30d', label: 'Next 30 days' },
];

/** Earliest upcoming occurrence (ISO) on/after `now`, else the earliest date. */
export function nextDate(event: MaltaEvent, now: Date): string | null {
  const iso = now.toISOString().slice(0, 16);
  const upcoming = event.dates.map(d => d.start).filter((s): s is string => !!s).sort();
  return upcoming.find(s => s >= iso) ?? upcoming[0] ?? null;
}

/** True if the event has any occurrence inside the given period relative to `now`. */
export function matchesPeriod(event: MaltaEvent, period: string, now: Date): boolean {
  if (period === 'all') return true;
  const starts = event.dates.map(d => d.start).filter((s): s is string => !!s);
  if (!starts.length) return false;

  const startOfToday = new Date(now); startOfToday.setHours(0, 0, 0, 0);
  let from = startOfToday, to: Date;

  if (period === 'today') {
    to = new Date(startOfToday); to.setDate(to.getDate() + 1);
  } else if (period === 'weekend') {
    // Window = upcoming Saturday 00:00 → Monday 00:00. If today is Sunday, start today.
    const day = startOfToday.getDay(); // 0 Sun … 6 Sat
    from = new Date(startOfToday);
    if (day !== 0) from.setDate(startOfToday.getDate() + (6 - day)); // advance to Saturday
    to = new Date(from);
    to.setDate(from.getDate() + (day === 0 ? 1 : 2)); // Sun→Mon (1 day), Sat→Mon (2 days)
  } else {
    const days = period === '7d' ? 7 : 30;
    to = new Date(startOfToday); to.setDate(to.getDate() + days);
  }

  const fromIso = from.toISOString().slice(0, 16);
  const toIso = to.toISOString().slice(0, 16);
  return starts.some(s => s >= fromIso && s < toIso);
}

/** Human date label, e.g. "Fri 26 Jun · 23:00". Falls back to the raw label. */
export function formatEventDate(iso: string | null, raw: string): string {
  if (!iso) return raw;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return raw;
  const date = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${date} · ${time}`;
}

/** Always link out via the affiliate url. */
export function eventBookUrl(event: MaltaEvent): string {
  return event.affiliateUrl || event.url;
}

/** One pin per venue, aggregating every event held there (events with coords only). */
export function getEventVenuePins(events: MaltaEvent[]): EventVenuePin[] {
  const byVenue = new Map<string, EventVenuePin>();
  for (const ev of events) {
    if (ev.lat == null || ev.lon == null) continue;
    const key = ev.venue || `${ev.lat},${ev.lon}`;
    if (!byVenue.has(key)) byVenue.set(key, { venue: ev.venue, lat: ev.lat, lon: ev.lon, events: [] });
    byVenue.get(key)!.events.push(ev);
  }
  return [...byVenue.values()];
}
