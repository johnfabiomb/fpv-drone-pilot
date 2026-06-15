export interface OrgInfo {
  id: string;
  slug: string;
  name: string;
  timezone: string;
  currency: string;
  booking_params: {
    deposit_percent?: number;
    hold_minutes?: number;
    min_lead_minutes?: number;
    buffer_minutes?: number;
    cash_allowed?: boolean;
  };
}

export interface PricingTier { hours: number; price: number; }

export interface ServicePricing {
  tiers: PricingTier[];
  extra_hour_price: number;
}

export interface ServiceWorker { id: string; name: string; }

export interface OrgService {
  id: string;
  name: string;
  description: string | null;
  pricing: ServicePricing;
  min_hours: number;
  max_hours: number;
  workers: ServiceWorker[];
}

export interface OrgBooking {
  org: OrgInfo;
  services: OrgService[];
}

/** Price for `hours` of a service — mirrors the SQL `service_price()`. */
export function servicePrice(pricing: ServicePricing, hours: number): number | null {
  const exact = pricing.tiers.find(t => t.hours === hours);
  if (exact) return exact.price;
  const lower = pricing.tiers.filter(t => t.hours <= hours).sort((a, b) => b.hours - a.hours)[0];
  if (!lower) return null; // below the minimum tier
  return lower.price + (hours - lower.hours) * (pricing.extra_hour_price ?? 0);
}
