export interface BookingConfig {
  baseUrl: string;
  checkInOffsetDays: number;
  nights: number;
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
  emoji: string;
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
}
