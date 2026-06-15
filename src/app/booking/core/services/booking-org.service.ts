import { Injectable, computed, signal } from '@angular/core';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { OrgBooking, OrgService } from '@booking/core/interfaces/org.interface';

// The active organization for the public booking flow. Single-org for now
// (johnfabiomb); when multiple orgs exist this becomes slug-driven from the route.
export const ORG_SLUG = 'johnfabiomb';

@Injectable({ providedIn: 'root' })
export class BookingOrgService {
  private readonly _data = signal<OrgBooking | null>(null);
  readonly data = this._data.asReadonly();
  readonly org = computed(() => this._data()?.org ?? null);
  readonly services = computed(() => this._data()?.services ?? []);

  private inflight: Promise<OrgBooking | null> | null = null;
  private loadedSlug: string | null = null;

  /** Loads (and caches) the org + services + workers for a slug. Re-fetches if the slug changes. */
  async load(slug: string = ORG_SLUG): Promise<OrgBooking | null> {
    if (this._data() && this.loadedSlug === slug) return this._data();
    if (this.inflight && this.loadedSlug === slug) return this.inflight;
    this.loadedSlug = slug;
    this.inflight = (async () => {
      const { data, error } = await bookingsDb.functions.invoke<OrgBooking & { error?: string }>('get-org-booking', { body: { slug } });
      if (error || !data || (data as { error?: string }).error) { this._data.set(null); return null; }
      this._data.set(data);
      return data;
    })();
    const res = await this.inflight;
    this.inflight = null;
    return res;
  }

  serviceById(id: string): OrgService | null {
    return this.services().find(s => s.id === id) ?? null;
  }
}
