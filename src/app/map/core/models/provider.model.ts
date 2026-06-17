import type { ExperienceType } from '@map/core/models/enums';

export interface BookingConfig {
  baseUrl: string;
  checkInOffsetDays: number;
  nights: number;
}

/** A single spot where an experience pin appears on the map. */
export interface ExperienceSpot {
  lat: number;
  lon: number;
  label?: string;             // pin pill text, e.g. "Blue Lagoon ride"
  nearLocationIds?: number[]; // surfaces this experience in those location panels
}

/**
 * A concrete thing a provider lets you do (wakeboard, buggy safari, dive…).
 * One provider has many experiences; one experience can appear at several spots.
 * Discount/booking fall back to the parent provider when not overridden here.
 */
export interface Experience {
  id: string;                  // e.g. 'yippee-buggy'
  providerId: string;          // FK → Provider.id
  title: string;
  type: ExperienceType;        // drives the pin icon
  emoji?: string;              // optional explicit icon override
  tagline: string;
  description: string;         // HTML allowed — rendered with [innerHTML]
  coverImage?: string | null;  // null → icon-only pin; set a path to show a photo pin (see documentation/EXPERIENCES.md)
  images?: string[];
  spots: ExperienceSpot[];
  discount?: ProviderDiscount; // overrides provider.discount when set
  bookUrl?: string;            // overrides provider.website when set
}

export interface ProviderDiscount {
  label: string;
  shortLabel?: string;
  coupon: string;
  instructions: string;
  validUntil?: string; // ISO date string e.g. "2026-10-31" — discount hidden after this date
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  color?: string;
  pinBorderColor?: string;
  emoji?: string;
  tagline: string;
  description?: string;
  coverImage?: string | null;
  images?: string[];
  website?: string;
  instagram?: string;
  phone?: string;
  lat?: number;
  lon?: number;
  showOnMap?: boolean;
  mapLabel?: string;
  nearLocationIds?: number[];
  discount?: ProviderDiscount;
  bookingConfig?: BookingConfig;
  highlights?: string[];
  experiences?: Experience[];
}
