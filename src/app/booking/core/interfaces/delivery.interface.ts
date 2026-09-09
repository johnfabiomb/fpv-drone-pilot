/**
 * What the client receives once a booking is paid — a message and/or labelled links
 * (Drive / WeTransfer / gallery). One delivery per booking; see `deliveries` (§17).
 */

/** One labelled destination the client opens. */
export interface DeliveryLink {
  label: string;
  url: string;
}

/** The admin's view of a booking's delivery (read from `deliveries` under RLS). */
export interface Delivery {
  id: string;
  booking_id: string;
  message: string | null;
  links: DeliveryLink[];
  released_at: string | null;
  updated_at: string | null;
}

/**
 * What `get_delivery_by_token` returns to the public pay page. `message`/`links` are
 * empty unless `unlocked` — the gate is applied in SQL, so locked content never
 * reaches the browser. `link_count`/`remaining` let the page render a teaser.
 */
export interface PublicDelivery {
  exists: boolean;
  unlocked: boolean;
  remaining: number;
  link_count: number;
  message: string | null;
  links: DeliveryLink[];
  updated_at: string | null;
}

/**
 * Only http(s) destinations are accepted, so a `javascript:`/`data:` URL can never be
 * stored and later rendered into an anchor on the client's page.
 */
export function isDeliveryUrl(url: string): boolean {
  try {
    const u = new URL(url.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}
