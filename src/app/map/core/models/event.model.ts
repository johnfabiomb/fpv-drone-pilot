import type { EventCategory } from '@map/core/models/enums';

/** A single occurrence of an event (recurring events have several). */
export interface EventDate {
  start: string | null; // ISO datetime, e.g. "2026-06-26T23:00"
  dateRaw: string;       // original label, e.g. "Friday 26 June 23:00"
}

/**
 * A Malta event (sourced from the GetYourTickets affiliate listing).
 * One entry per event; recurring events carry every occurrence in `dates`.
 */
export interface MaltaEvent {
  id: string;
  name: string;
  category: EventCategory;
  venue: string;
  lat: number | null;
  lon: number | null;
  image: string;
  url: string;          // base event url
  affiliateUrl: string; // base url + '/' + affiliate code — always link to this
  organizer?: string;
  dates: EventDate[];
}

/** One map pin per venue, aggregating the events held there. */
export interface EventVenuePin {
  venue: string;
  lat: number;
  lon: number;
  events: MaltaEvent[];
}
