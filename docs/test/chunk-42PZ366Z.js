import {
  EventCategory
} from "./chunk-YQQNS7T3.js";

// src/app/map/core/utils/event.utils.ts
var CATEGORY_META = {
  [EventCategory.Party]: { label: "Party", icon: "\u{1F389}", color: "#a855f7" },
  [EventCategory.PoolBeach]: { label: "Pool & Beach", icon: "\u{1F3D6}\uFE0F", color: "#06b6d4" },
  [EventCategory.Nightlife]: { label: "Nightlife", icon: "\u{1F378}", color: "#ec4899" },
  [EventCategory.ConcertFestival]: { label: "Concert", icon: "\u{1F3A4}", color: "#f59e0b" },
  [EventCategory.Boat]: { label: "Boat", icon: "\u26F5", color: "#0ea5e9" }
};
var FALLBACK = { label: "Event", icon: "\u{1F39F}\uFE0F", color: "#e11d48" };
var EVENTS_ACCENT = "#e11d48";
function eventCategoryMeta(category) {
  return CATEGORY_META[category] ?? FALLBACK;
}
var EVENT_FILTERS = [
  { id: "all", label: "All" },
  { id: "party", label: "Parties" },
  { id: "pool-beach", label: "Pool & Beach" },
  { id: "nightlife", label: "Nightlife" },
  { id: "concert-festival", label: "Concerts" },
  { id: "boat", label: "Boat" }
];
var PERIOD_FILTERS = [
  { id: "all", label: "All dates" },
  { id: "today", label: "Today" },
  { id: "weekend", label: "This weekend" },
  { id: "7d", label: "Next 7 days" },
  { id: "30d", label: "Next 30 days" }
];
function dayCutoff(now) {
  const y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T00:00`;
}
function hasUpcomingDate(event, now) {
  const cutoff = dayCutoff(now);
  return event.dates.some((d) => d.start != null && d.start >= cutoff);
}
function upcomingEvents(events, now) {
  return events.filter((e) => hasUpcomingDate(e, now));
}
function nextDate(event, now) {
  const iso = now.toISOString().slice(0, 16);
  const upcoming = event.dates.map((d) => d.start).filter((s) => !!s).sort();
  return upcoming.find((s) => s >= iso) ?? upcoming[0] ?? null;
}
function matchesPeriod(event, period, now) {
  if (period === "all")
    return true;
  const starts = event.dates.map((d) => d.start).filter((s) => !!s);
  if (!starts.length)
    return false;
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  let from = startOfToday, to;
  if (period === "today") {
    to = new Date(startOfToday);
    to.setDate(to.getDate() + 1);
  } else if (period === "weekend") {
    const day = startOfToday.getDay();
    from = new Date(startOfToday);
    if (day !== 0)
      from.setDate(startOfToday.getDate() + (6 - day));
    to = new Date(from);
    to.setDate(from.getDate() + (day === 0 ? 1 : 2));
  } else {
    const days = period === "7d" ? 7 : 30;
    to = new Date(startOfToday);
    to.setDate(to.getDate() + days);
  }
  const fromIso = from.toISOString().slice(0, 16);
  const toIso = to.toISOString().slice(0, 16);
  return starts.some((s) => s >= fromIso && s < toIso);
}
function formatEventDate(iso, raw) {
  if (!iso)
    return raw;
  const d = new Date(iso);
  if (isNaN(d.getTime()))
    return raw;
  const date = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${date} \xB7 ${time}`;
}
function eventBookUrl(event) {
  return event.affiliateUrl || event.url;
}
function getEventVenuePins(events) {
  const byVenue = /* @__PURE__ */ new Map();
  for (const ev of events) {
    if (ev.lat == null || ev.lon == null)
      continue;
    const key = ev.venue || `${ev.lat},${ev.lon}`;
    if (!byVenue.has(key))
      byVenue.set(key, { venue: ev.venue, lat: ev.lat, lon: ev.lon, events: [] });
    byVenue.get(key).events.push(ev);
  }
  return [...byVenue.values()];
}

export {
  EVENTS_ACCENT,
  eventCategoryMeta,
  EVENT_FILTERS,
  PERIOD_FILTERS,
  upcomingEvents,
  nextDate,
  matchesPeriod,
  formatEventDate,
  eventBookUrl,
  getEventVenuePins
};
//# sourceMappingURL=chunk-42PZ366Z.js.map
