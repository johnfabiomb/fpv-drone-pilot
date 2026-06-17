import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { BookingSummary, Client, EditableBooking, Payment, PaymentMethod, WorkerBusy } from '@booking/core/interfaces/booking.interface';
import { LineItem } from '@booking/core/interfaces/invoice.interface';
import { subscribeToChanges, RealtimeHandle } from '@booking/core/utils/realtime.util';

// Scoped to PlatformShellComponent — provided there, not root.
// Lifetime matches the admin session; destroyed when user leaves /bookings.
@Injectable()
export class BookingDataService implements OnDestroy {
  private readonly auth = inject(BookingsAuthService);
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

  /** Create or update a client with full billing details (everything but the name is optional). Returns the saved row. */
  async saveClient(orgId: string, c: {
    id?: string; name: string; email: string | null; phone: string | null;
    company: string | null; vat_number: string | null; billing_address: string | null; notes: string | null;
  }): Promise<{ client?: Client; error?: string }> {
    const row = {
      name: c.name.trim(), email: c.email?.trim() || null, phone: c.phone?.trim() || null,
      company: c.company?.trim() || null, vat_number: c.vat_number?.trim() || null,
      billing_address: c.billing_address?.trim() || null, notes: c.notes?.trim() || null,
    };
    const { data, error } = c.id
      ? await bookingsDb.from('clients').update(row).eq('id', c.id).select('*').single()
      : await bookingsDb.from('clients').insert({ org_id: orgId, ...row }).select('*').single();
    if (error) return { error: error.message };
    await this.fetchClients();
    return { client: data as Client };
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
    title: string; description: string; startAt: string; hours: number; priceTotal: number;
    allowCard: boolean; allowInperson: boolean;
    depositAllowed: boolean; depositPercent: number; needsProduction: boolean;
    location?: string | null; notes?: string | null;
  }): Promise<{ id?: string; ref?: string; error?: string }> {
    const start = new Date(input.startAt);
    const end = new Date(start.getTime() + input.hours * 3_600_000);
    const { data, error } = await bookingsDb
      .from('bookings')
      .insert({
        org_id: input.orgId, staff_id: input.staffId, service_id: input.serviceId,
        client_id: input.clientId, title: input.title, description: input.description,
        start_at: start.toISOString(), end_at: end.toISOString(),
        price_total: input.priceTotal, status: 'booked', created_by: 'admin',
        allow_card: input.allowCard, allow_inperson: input.allowInperson,
        deposit_allowed: input.depositAllowed, deposit_percent: input.depositPercent,
        needs_production: input.needsProduction,
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
      .select('id, org_id, booking_ref, staff_id, service_id, client_id, title, description, start_at, end_at, price_total, location, notes, status, allow_card, allow_inperson, deposit_percent, deposit_allowed, needs_production')
      .eq('id', id)
      .maybeSingle();
    return (data as EditableBooking) ?? null;
  }

  /** Update an existing booking. Moving it onto an occupied slot fails with 23P01. */
  async updateBooking(id: string, input: {
    staffId: string; serviceId: string | null; clientId: string;
    title: string; description: string; startAt: string; hours: number; priceTotal: number;
    allowCard: boolean; allowInperson: boolean;
    depositAllowed: boolean; depositPercent: number; needsProduction: boolean;
    location?: string | null; notes?: string | null;
  }): Promise<{ ok?: boolean; error?: string }> {
    const start = new Date(input.startAt);
    const end = new Date(start.getTime() + input.hours * 3_600_000);
    const { error } = await bookingsDb
      .from('bookings')
      .update({
        staff_id: input.staffId, service_id: input.serviceId, client_id: input.clientId,
        title: input.title, description: input.description, start_at: start.toISOString(), end_at: end.toISOString(),
        price_total: input.priceTotal, allow_card: input.allowCard, allow_inperson: input.allowInperson,
        deposit_allowed: input.depositAllowed, deposit_percent: input.depositPercent,
        needs_production: input.needsProduction,
        location: input.location ?? null, notes: input.notes ?? null,
        // An edited import becomes a real booking (counts in revenue, invoiceable).
        is_external: false,
      })
      .eq('id', id);
    if (error) return { error: error.code === '23P01' ? 'slot_taken' : error.message };
    // Push the edit to Google Calendar (title, time, location, description).
    this.syncBookingEvent(id);
    await this.fetchBookings();
    return { ok: true };
  }

  /**
   * A worker's blocking bookings overlapping [fromIso, toIso) — for the admin
   * availability picker, which shows WHY each slot is busy (client · title).
   * Admin-only by RLS (org-scoped). Statuses that don't reserve the slot
   * (pending/draft/cancelled/expired) are excluded, mirroring the DB constraint.
   */
  async getWorkerBusy(staffId: string, fromIso: string, toIso: string): Promise<WorkerBusy[]> {
    const { data, error } = await bookingsDb
      .from('bookings')
      .select('id, start_at, end_at, title, status, clients(name)')
      .eq('staff_id', staffId)
      .in('status', ['hold', 'booked', 'in_progress', 'done'])
      .lt('start_at', toIso)
      .gt('end_at', fromIso)
      .order('start_at');
    if (error) { console.error('[BookingData] getWorkerBusy:', error); return []; }
    return (data ?? []).map(r => {
      const row = r as { id: string; start_at: string; end_at: string; title: string; status: string; clients: { name: string } | { name: string }[] | null };
      const client = Array.isArray(row.clients) ? row.clients[0] : row.clients;
      return { id: row.id, start_at: row.start_at, end_at: row.end_at, title: row.title, status: row.status as WorkerBusy['status'], clientName: client?.name ?? null };
    });
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
      const { pushed = 0, pulled = 0, push_errors = [], pull_errors = [] } = (data ?? {}) as Record<string, unknown> & { pushed?: number; pulled?: number; push_errors?: string[]; pull_errors?: string[] };
      const parts: string[] = [];
      if (pushed)  parts.push(`${pushed} pushed to Calendar`);
      if (pulled)  parts.push(`${pulled} external events imported`);
      if (!pushed && !pulled) parts.push('Everything in sync');
      const errCount = push_errors.length + pull_errors.length;
      if (errCount) parts.push(`${errCount} error(s)`);
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

  // ── Invoice overrides (edit an invoice WITHOUT touching the booking) ─────
  /** Persist a customised invoice for a booking (line items / notes / date). */
  async saveInvoice(orgId: string, bookingId: string, input: {
    lineItems: LineItem[]; notes: string | null; issueDate: string | null;
  }): Promise<{ ok?: boolean; error?: string }> {
    const { error } = await bookingsDb.from('invoices').upsert({
      org_id: orgId, booking_id: bookingId,
      line_items: input.lineItems, notes: input.notes, issue_date: input.issueDate,
    }, { onConflict: 'booking_id' });
    if (error) return { error: error.message };
    return { ok: true };
  }

  /** The invoice's line items (saved override, else a single line derived from the booking). Keeps service metadata. */
  async getInvoiceItems(bookingId: string): Promise<LineItem[]> {
    const { data } = await bookingsDb.rpc('get_invoice', { p_booking: bookingId });
    const items = (data as { invoice?: { line_items?: LineItem[] } } | null)?.invoice?.line_items ?? [];
    return items.map(i => ({
      description: i.description, amount: Number(i.amount),
      ...(i.serviceId ? { serviceId: i.serviceId } : {}),
      ...(i.hours ? { hours: Number(i.hours) } : {}),
    }));
  }

  /** Discard the customised invoice — revert to one derived live from the booking. */
  async resetInvoice(bookingId: string): Promise<void> {
    await bookingsDb.from('invoices').delete().eq('booking_id', bookingId);
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
    const org = this.auth.orgId();
    if (!org) { this.bookings.set([]); return; }
    const { data, error } = await bookingsDb
      .from('booking_summary')
      .select('*')
      .eq('org_id', org)
      .order('start_at', { ascending: false });
    if (error) console.error('[BookingData] fetchBookings:', error);
    this.bookings.set((data ?? []) as BookingSummary[]);
  }

  private async fetchClients(): Promise<void> {
    const org = this.auth.orgId();
    if (!org) { this.clients.set([]); return; }
    const { data, error } = await bookingsDb.from('clients').select('*').eq('org_id', org).order('name');
    if (error) console.error('[BookingData] fetchClients:', error);
    this.clients.set((data ?? []) as Client[]);
  }
}
