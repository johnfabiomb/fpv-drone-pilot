import { Injectable, OnDestroy, signal } from '@angular/core';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { BookingSummary, Client, EditableBooking, Payment, PaymentMethod } from '@booking/core/interfaces/booking.interface';
import { subscribeToChanges, RealtimeHandle } from '@booking/core/utils/realtime.util';

// Scoped to PlatformShellComponent — provided there, not root.
// Lifetime matches the admin session; destroyed when user leaves /bookings.
@Injectable()
export class BookingDataService implements OnDestroy {
  readonly bookings = signal<BookingSummary[]>([]);
  readonly clients  = signal<Client[]>([]);
  readonly loading  = signal(false);
  readonly syncing  = signal(false);
  readonly syncResult = signal<string | null>(null);

  // Realtime: the list refreshes live when bookings/payments change.
  private realtime: RealtimeHandle | null = null;

  async load(): Promise<void> {
    this.loading.set(true);
    // Retry up to 3 times with 15 s per attempt — PostgREST on the free tier can
    // take 10-15 s to serve the first query after a period of inactivity.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if (attempt > 0) await new Promise(r => setTimeout(r, 3_000));
        await Promise.race([
          Promise.all([this.fetchBookings(), this.fetchClients()]),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 15_000)
          ),
        ]);
        this.loading.set(false);
        this.subscribeRealtime();
        return;
      } catch (err) {
        console.warn(`[BookingData] attempt ${attempt + 1} failed:`, (err as Error).message);
      }
    }
    console.error('[BookingData] all retries failed — Supabase project may be paused');
    this.loading.set(false);
  }

  /** Create a client on behalf of the admin (no auth user yet — claimed by email on first sign-in). */
  async createClient(orgId: string, name: string, email: string | null): Promise<Client | null> {
    const { data, error } = await bookingsDb
      .from('clients')
      .insert({ org_id: orgId, name, email })
      .select('*')
      .single();
    if (error) { console.error('[BookingData] createClient:', error); return null; }
    await this.fetchClients();
    return data as Client;
  }

  /**
   * Create a confirmed booking manually (admin agreed the job; client pays via the link).
   * Status `booked` reserves the worker's slot — the DB exclusion constraint rejects
   * overlaps on the same worker (SQLSTATE 23P01 → `slot_taken`). Ref + production tasks
   * are set by DB triggers.
   */
  async createBooking(input: {
    orgId: string; staffId: string; serviceId: string | null; clientId: string;
    title: string; startAt: string; hours: number; priceTotal: number;
    allowCard: boolean; allowInperson: boolean;
    location?: string | null; notes?: string | null;
  }): Promise<{ id?: string; ref?: string; error?: string }> {
    const start = new Date(input.startAt);
    const end = new Date(start.getTime() + input.hours * 3_600_000);
    const { data, error } = await bookingsDb
      .from('bookings')
      .insert({
        org_id: input.orgId, staff_id: input.staffId, service_id: input.serviceId,
        client_id: input.clientId, title: input.title,
        start_at: start.toISOString(), end_at: end.toISOString(),
        price_total: input.priceTotal, status: 'booked', created_by: 'admin',
        allow_card: input.allowCard, allow_inperson: input.allowInperson,
        location: input.location ?? null, notes: input.notes ?? null,
      })
      .select('id, booking_ref')
      .single();
    if (error) {
      if (error.code === '23P01') return { error: 'slot_taken' };
      return { error: error.message };
    }
    await this.fetchBookings();
    const row = data as { id: string; booking_ref: string };
    return { id: row.id, ref: row.booking_ref };
  }

  /** Raw editable fields for a single booking (admin-only via RLS). */
  async getBooking(id: string): Promise<EditableBooking | null> {
    const { data } = await bookingsDb
      .from('bookings')
      .select('id, org_id, booking_ref, staff_id, service_id, client_id, title, start_at, end_at, price_total, location, notes, status, allow_card, allow_inperson')
      .eq('id', id)
      .maybeSingle();
    return (data as EditableBooking) ?? null;
  }

  /** Update an existing booking. Moving it onto an occupied slot fails with 23P01. */
  async updateBooking(id: string, input: {
    staffId: string; serviceId: string | null; clientId: string;
    title: string; startAt: string; hours: number; priceTotal: number;
    allowCard: boolean; allowInperson: boolean;
    location?: string | null; notes?: string | null;
  }): Promise<{ ok?: boolean; error?: string }> {
    const start = new Date(input.startAt);
    const end = new Date(start.getTime() + input.hours * 3_600_000);
    const { error } = await bookingsDb
      .from('bookings')
      .update({
        staff_id: input.staffId, service_id: input.serviceId, client_id: input.clientId,
        title: input.title, start_at: start.toISOString(), end_at: end.toISOString(),
        price_total: input.priceTotal, allow_card: input.allowCard, allow_inperson: input.allowInperson,
        location: input.location ?? null, notes: input.notes ?? null,
      })
      .eq('id', id);
    if (error) return { error: error.code === '23P01' ? 'slot_taken' : error.message };
    await this.fetchBookings();
    return { ok: true };
  }

  async generateLink(bookingId: string): Promise<string | null> {
    const { data: bk } = await bookingsDb.from('bookings').select('org_id').eq('id', bookingId).single();
    if (!bk) return null;
    const { data } = await bookingsDb
      .from('booking_links')
      .insert({ org_id: (bk as { org_id: string }).org_id, booking_id: bookingId, expires_at: null })
      .select('token')
      .single();
    return data?.token ? `${window.location.origin}/book/${data.token}` : null;
  }

  async syncCalendar(): Promise<void> {
    this.syncing.set(true);
    this.syncResult.set(null);

    const { data: { session } } = await bookingsDb.auth.getSession();
    if (!session) { this.syncing.set(false); return; }

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Sync timed out — Edge Function not deployed yet')), 10_000),
    );
    const { data, error } = await Promise.race([
      bookingsDb.functions.invoke('sync-calendar'),
      timeout,
    ]).catch(e => ({ data: null, error: e as Error }));

    if (error) {
      this.syncResult.set(`Error: ${error.message}`);
    } else {
      const { pushed = 0, pulled = 0, push_errors = [] } = (data ?? {}) as Record<string, unknown> & { pushed?: number; pulled?: number; push_errors?: string[] };
      const parts: string[] = [];
      if (pushed)  parts.push(`${pushed} pushed to Calendar`);
      if (pulled)  parts.push(`${pulled} external events imported`);
      if (!pushed && !pulled) parts.push('Everything in sync');
      if (push_errors.length) parts.push(`${push_errors.length} error(s)`);
      this.syncResult.set(parts.join(' · '));
      await this.fetchBookings();
    }

    this.syncing.set(false);
    setTimeout(() => this.syncResult.set(null), 5000);
  }

  // ── Admin actions: cash-request approvals + reconciliation ──────────
  /** Approve a pending cash request → booked + push to Google Calendar. */
  async approveRequest(bookingId: string): Promise<{ ok?: boolean; error?: string }> {
    const { data, error } = await bookingsDb.functions.invoke('approve-cash-booking', { body: { bookingId } });
    if (error) throw error;
    if (!data?.error) await this.fetchBookings();
    return (data ?? {}) as { ok?: boolean; error?: string };
  }

  /** Decline a pending cash request (frees nothing — it wasn't blocking the slot). */
  async declineRequest(bookingId: string): Promise<void> {
    await bookingsDb.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId);
    await this.fetchBookings();
  }

  /** All payments recorded against a booking, newest first. */
  async getPayments(bookingId: string): Promise<Payment[]> {
    const { data } = await bookingsDb
      .from('payments')
      .select('id, amount, method, note, status, paid_at, created_at, stripe_payment_intent_id')
      .eq('booking_id', bookingId)
      .order('paid_at', { ascending: true, nullsFirst: true })
      .order('created_at', { ascending: true });
    return (data ?? []) as Payment[];
  }

  /** Record a manual payment (cash / Revolut / bank / other) of any amount. */
  async addPayment(bookingId: string, input: {
    amount: number; method: PaymentMethod; note?: string | null; paidAt?: string | null;
  }): Promise<{ ok?: boolean; error?: string }> {
    const { data: bk } = await bookingsDb.from('bookings').select('org_id').eq('id', bookingId).single();
    const orgId = (bk as { org_id: string } | null)?.org_id;
    if (!orgId) return { error: 'not_found' };
    const { error } = await bookingsDb.from('payments').insert({
      org_id: orgId, booking_id: bookingId, amount: input.amount,
      type: 'full', status: 'completed', method: input.method,
      note: input.note ?? null,
      paid_at: input.paidAt ?? new Date().toISOString(),
    });
    if (error) return { error: error.message };
    this.syncBookingEvent(bookingId);
    await this.fetchBookings();
    return { ok: true };
  }

  /** Remove a payment (e.g. recorded by mistake). Card/Stripe payments aren't deletable here. */
  async deletePayment(paymentId: string, bookingId: string): Promise<void> {
    await bookingsDb.from('payments').delete().eq('id', paymentId);
    this.syncBookingEvent(bookingId);
    await this.fetchBookings();
  }

  /** Shortcut: record the full outstanding balance as a cash payment. */
  async recordCashPayment(bookingId: string, amount: number): Promise<void> {
    await this.addPayment(bookingId, { amount, method: 'cash', note: 'Marked as paid' });
  }

  /** Override the agreed price for a booking. */
  async setAmount(bookingId: string, priceTotal: number): Promise<void> {
    await bookingsDb.from('bookings').update({ price_total: priceTotal }).eq('id', bookingId);
    this.syncBookingEvent(bookingId);
    await this.fetchBookings();
  }

  /** Fire-and-forget: refresh the booking's calendar event description (payment + progress). */
  private syncBookingEvent(bookingId: string): void {
    void bookingsDb.functions.invoke('sync-booking-event', { body: { bookingId } })
      .then(({ error }) => { if (error) console.warn('[BookingData] calendar sync failed:', error.message); });
  }

  /** Cancel a booking (frees the slot + removes the calendar event); optional Stripe refund. */
  async cancelBooking(bookingId: string, refund: boolean): Promise<{ ok?: boolean; refunded?: number; calendar_cleared?: boolean; error?: string }> {
    const { data, error } = await bookingsDb.functions.invoke('cancel-booking', { body: { bookingId, refund } });
    if (error) throw error;
    if (!data?.error) await this.fetchBookings();
    return (data ?? {}) as { ok?: boolean; refunded?: number; calendar_cleared?: boolean; error?: string };
  }

  // ── Realtime ────────────────────────────────────────────────────────
  private subscribeRealtime(): void {
    if (this.realtime) return;
    this.realtime = subscribeToChanges('admin-bookings', ['bookings', 'payments'], () => void this.fetchBookings());
  }

  ngOnDestroy(): void { this.realtime?.destroy(); }

  private async fetchBookings(): Promise<void> {
    const { data, error } = await bookingsDb
      .from('booking_summary')
      .select('*')
      .order('start_at', { ascending: false });
    if (error) console.error('[BookingData] fetchBookings:', error);
    this.bookings.set((data ?? []) as BookingSummary[]);
  }

  private async fetchClients(): Promise<void> {
    const { data, error } = await bookingsDb.from('clients').select('*').order('name');
    if (error) console.error('[BookingData] fetchClients:', error);
    this.clients.set((data ?? []) as Client[]);
  }
}
