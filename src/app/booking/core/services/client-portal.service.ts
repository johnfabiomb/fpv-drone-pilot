import { Injectable, computed, signal } from '@angular/core';
import { bookingsDb } from '@booking/core/db/supabase.bookings';

export interface ClientProfile {
  name: string;
  email: string;
  company: string | null;
  vat_number: string | null;
  billing_address: string | null;
}

export interface BillingInput {
  name: string;
  email: string;
  company: string;
  vat: string;
  address: string;
}

export interface ClientBooking {
  id: string;
  booking_ref: string;
  title: string;
  description: string | null;
  location: string | null;
  start_at: string;
  end_at: string;
  price_total: number;
  status: string;
  total_paid: number;
  balance_due: number;
}

// Client-side (non-admin) auth + booking actions, scoped to an organization.
// Any signed-in Supabase user can be a client of one or more orgs.
@Injectable({ providedIn: 'root' })
export class ClientPortalService {
  private readonly _user = signal<{ id: string; email: string | null } | null>(null);
  readonly user = this._user.asReadonly();
  readonly signedIn = computed(() => this._user() !== null);

  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    const { data: { session } } = await bookingsDb.auth.getSession();
    this.setUser(session?.user ?? null);
    // CRITICAL: never await a Supabase call directly in this callback (deadlock).
    bookingsDb.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => this.setUser(session?.user ?? null), 0);
    });
  }

  async signInWithGoogle(redirectPath: string): Promise<void> {
    await bookingsDb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}${redirectPath}` } });
  }
  async signInWithEmail(email: string, redirectPath: string): Promise<void> {
    await bookingsDb.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}${redirectPath}` } });
  }
  async signOut(): Promise<void> { await bookingsDb.auth.signOut(); this.setUser(null); }

  /** This user's client id within an org (null if none yet). */
  private async clientId(orgId: string): Promise<string | null> {
    const uid = this._user()?.id;
    if (!uid) return null;
    const { data } = await bookingsDb.from('clients').select('id').eq('org_id', orgId).eq('user_id', uid).maybeSingle();
    return (data as { id: string } | null)?.id ?? null;
  }

  async loadMyProfile(orgId: string): Promise<ClientProfile | null> {
    const uid = this._user()?.id;
    if (!uid) return null;
    const { data } = await bookingsDb.from('clients')
      .select('name, email, company, vat_number, billing_address')
      .eq('org_id', orgId).eq('user_id', uid).maybeSingle();
    return (data as ClientProfile) ?? null;
  }

  /** Link/update the client profile in this org. Returns the client id. */
  async upsertProfile(orgId: string, b: BillingInput): Promise<string> {
    const { data, error } = await bookingsDb.rpc('upsert_my_client', {
      p_org: orgId, p_name: b.name, p_email: b.email, p_company: b.company, p_vat: b.vat, p_address: b.address,
    });
    if (error) throw error;
    return data as string;
  }

  /** Card booking: 15-min hold + Stripe intent. Returns clientSecret or { error }. */
  async startCardBooking(staffId: string, serviceId: string, startIso: string, hours: number, paymentType: 'deposit' | 'full'):
    Promise<{ clientSecret?: string; bookingRef?: string; error?: string }> {
    const { data, error } = await bookingsDb.functions.invoke('start-card-booking', {
      body: { staffId, serviceId, start: startIso, hours, paymentType },
    });
    if (error) throw error;
    return data as { clientSecret?: string; bookingRef?: string; error?: string };
  }

  /** Cash request (status 'pending'; price server-set). */
  async createBookingRequest(orgId: string, staffId: string, serviceId: string, startIso: string, hours: number, notes?: string):
    Promise<{ id: string; booking_ref: string }> {
    const { data, error } = await bookingsDb.rpc('create_booking_request', {
      p_org: orgId, p_staff: staffId, p_service: serviceId, p_start: startIso, p_hours: hours, p_notes: notes ?? null,
    });
    if (error) throw error;
    const row = Array.isArray(data) ? data[0] : data;
    return row as { id: string; booking_ref: string };
  }

  /** The signed-in client's own bookings within an org. */
  async loadMyBookings(orgId: string): Promise<ClientBooking[]> {
    const cid = await this.clientId(orgId);
    if (!cid) return [];
    const { data: rows } = await bookingsDb.from('bookings')
      .select('id, booking_ref, title, description, location, start_at, end_at, price_total, status')
      .eq('org_id', orgId).eq('client_id', cid).order('start_at', { ascending: false });
    const bookings = (rows ?? []) as Omit<ClientBooking, 'total_paid' | 'balance_due'>[];
    if (bookings.length === 0) return [];
    const ids = bookings.map(b => b.id);
    const { data: pays } = await bookingsDb.from('payments').select('booking_id, amount, status').in('booking_id', ids);
    const paid = new Map<string, number>();
    for (const p of (pays ?? []) as { booking_id: string; amount: number; status: string }[]) {
      if (p.status === 'completed') paid.set(p.booking_id, (paid.get(p.booking_id) ?? 0) + Number(p.amount));
    }
    return bookings.map(b => {
      const tp = paid.get(b.id) ?? 0;
      return { ...b, total_paid: tp, balance_due: Math.max(0, b.price_total - tp) };
    });
  }

  private setUser(user: { id: string; email?: string | null } | null): void {
    this._user.set(user ? { id: user.id, email: user.email ?? null } : null);
  }
}
