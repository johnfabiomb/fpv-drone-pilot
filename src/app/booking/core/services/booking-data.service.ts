import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { BookingSummary, BookingSlot, BookingTab, Client, EditableBooking, Payment, PaymentMethod, WorkerBusy } from '@booking/core/interfaces/booking.interface';
import { LineItem } from '@booking/core/interfaces/invoice.interface';
import { Delivery, DeliveryLink } from '@booking/core/interfaces/delivery.interface';
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
    orgId: string; staffId: string; serviceId: string | null; clientId: string | null; contactName?: string | null;
    title: string; description: string; slots: BookingSlot[]; priceTotal: number;
    allowCard: boolean; allowInperson: boolean;
    depositAllowed: boolean; depositPercent: number; needsProduction: boolean;
    confirmed: boolean;
    location?: string | null; notes?: string | null;
  }): Promise<{ id?: string; ref?: string; error?: string }> {
    const { data, error } = await bookingsDb.rpc('create_booking', {
      p_booking: {
        org_id: input.orgId, staff_id: input.staffId, service_id: input.serviceId,
        client_id: input.clientId, contact_name: input.contactName ?? null,
        title: input.title, description: input.description, price_total: input.priceTotal,
        // Confirmed → 'booked' (reserved + calendar). Tentative → 'pending': held for the
        // admin (created_by 'admin' makes pending block the slot) until they confirm.
        status: input.confirmed ? 'booked' : 'pending', created_by: 'admin',
        allow_card: input.allowCard, allow_inperson: input.allowInperson,
        deposit_allowed: input.depositAllowed, deposit_percent: input.depositPercent,
        needs_production: input.needsProduction, is_external: false,
        location: input.location ?? null, notes: input.notes ?? null,
      },
      p_slots: input.slots,
    });
    if (error) return { error: this.overlapOr(error) };
    await this.fetchBookings();
    const row = (Array.isArray(data) ? data[0] : data) as { id: string; booking_ref: string };
    return { id: row.id, ref: row.booking_ref };
  }

  /** Raw editable fields for a single booking (admin-only via RLS). */
  async getBooking(id: string): Promise<EditableBooking | null> {
    const { data } = await bookingsDb
      .from('bookings')
      .select('id, org_id, booking_ref, staff_id, service_id, client_id, contact_name, title, description, start_at, end_at, price_total, location, notes, status, allow_card, allow_inperson, deposit_percent, deposit_allowed, needs_production')
      .eq('id', id)
      .maybeSingle();
    return (data as EditableBooking) ?? null;
  }

  /** A booking's time blocks (one or more), earliest first. */
  async getBookingSlots(bookingId: string): Promise<BookingSlot[]> {
    const { data } = await bookingsDb
      .from('booking_slots').select('start_at, end_at').eq('booking_id', bookingId).order('start_at');
    return (data ?? []).map(s => ({ start: (s as { start_at: string }).start_at, end: (s as { end_at: string }).end_at }));
  }

  /** Update a booking + replace its slots (atomic). Overlap fails with 23P01 → `slot_taken`. */
  async updateBooking(id: string, input: {
    staffId: string; serviceId: string | null; clientId: string | null; contactName?: string | null;
    title: string; description: string; slots: BookingSlot[]; priceTotal: number;
    allowCard: boolean; allowInperson: boolean;
    depositAllowed: boolean; depositPercent: number; needsProduction: boolean;
    location?: string | null; notes?: string | null;
  }): Promise<{ ok?: boolean; error?: string }> {
    const { data, error } = await bookingsDb.rpc('update_booking', {
      p_booking_id: id,
      p_booking: {
        staff_id: input.staffId, service_id: input.serviceId,
        client_id: input.clientId, contact_name: input.contactName ?? null,
        title: input.title, description: input.description, price_total: input.priceTotal,
        allow_card: input.allowCard, allow_inperson: input.allowInperson,
        deposit_allowed: input.depositAllowed, deposit_percent: input.depositPercent,
        needs_production: input.needsProduction,
        location: input.location ?? null, notes: input.notes ?? null,
      },
      p_slots: input.slots,
    });
    if (error) return { error: this.overlapOr(error) };
    // `data` = google_event_ids orphaned by moved/removed time blocks → delete them while
    // re-syncing so the calendar matches the new slots (no stale or duplicate events).
    this.syncBookingEvent(id, (data as string[] | null) ?? undefined);
    await this.fetchBookings();
    return { ok: true };
  }

  /** Map a Postgres exclusion-violation to `slot_taken`, else pass the message. */
  private overlapOr(error: { code?: string; message: string }): string {
    return error.code === '23P01' || /no_overlap|exclusion/.test(error.message) ? 'slot_taken' : error.message;
  }

  /**
   * A worker's blocking bookings overlapping [fromIso, toIso) — for the admin
   * availability picker, which shows WHY each slot is busy (client · title).
   * Admin-only by RLS (org-scoped). Statuses that don't reserve the slot
   * (pending/draft/cancelled/expired) are excluded, mirroring the DB constraint.
   */
  async getWorkerBusy(staffId: string, fromIso: string, toIso: string): Promise<WorkerBusy[]> {
    const { data, error } = await bookingsDb
      .from('booking_slots')
      .select('booking_id, start_at, end_at, bookings!inner(title, status, clients(name))')
      .eq('staff_id', staffId)
      .eq('blocking', true)
      .lt('start_at', toIso)
      .gt('end_at', fromIso)
      .order('start_at');
    if (error) { console.error('[BookingData] getWorkerBusy:', error); return []; }
    return (data ?? []).map(r => {
      const row = r as unknown as { booking_id: string; start_at: string; end_at: string;
        bookings: { title: string; status: string; clients: { name: string } | { name: string }[] | null }
                | { title: string; status: string; clients: { name: string } | { name: string }[] | null }[] };
      const bk = Array.isArray(row.bookings) ? row.bookings[0] : row.bookings;
      const client = Array.isArray(bk.clients) ? bk.clients[0] : bk.clients;
      return { id: row.booking_id, start_at: row.start_at, end_at: row.end_at, title: bk.title, status: bk.status as WorkerBusy['status'], clientName: client?.name ?? null };
    });
  }

  /** Mint a booking-link token (anon-accessible) for this booking. */
  private async createBookingToken(bookingId: string): Promise<string | null> {
    const { data: bk } = await bookingsDb.from('bookings').select('org_id').eq('id', bookingId).single();
    if (!bk) return null;
    const { data } = await bookingsDb
      .from('booking_links')
      .insert({ org_id: (bk as { org_id: string }).org_id, booking_id: bookingId, expires_at: null })
      .select('token')
      .single();
    return data?.token ?? null;
  }

  /** Shareable payment link (`/book/:token`). */
  async generateLink(bookingId: string): Promise<string | null> {
    const token = await this.createBookingToken(bookingId);
    return token ? `${window.location.origin}/book/${token}` : null;
  }

  /** Shareable invoice link (`/book/invoice?token=…`) — viewable by the client without logging in. */
  async invoiceShareLink(bookingId: string): Promise<string | null> {
    const token = await this.createBookingToken(bookingId);
    return token ? `${window.location.origin}/book/invoice?token=${token}` : null;
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

  /** Remove a payment (e.g. recorded by mistake). Soft delete via RPC — the row is kept for audit. */
  async deletePayment(paymentId: string, bookingId: string): Promise<void> {
    await bookingsDb.rpc('soft_delete', { p_table: 'payments', p_id: paymentId });
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

  /** Discard the customised invoice — revert to one derived live from the booking. Clears the
   *  override in place (keeps the 1:1 row, so re-editing just updates it; a soft delete would
   *  collide with UNIQUE(booking_id)). */
  async resetInvoice(bookingId: string): Promise<void> {
    await bookingsDb.from('invoices').update({ line_items: [], notes: null, issue_date: null }).eq('booking_id', bookingId);
  }

  // ── Delivery (what the client receives once paid) ─────────────────────────
  // One row per booking. The client-facing read is the `get_delivery_by_token` RPC,
  // which applies the paid-in-full gate in SQL — never re-implement that check here.

  /** The delivery attached to a booking (admin view), or null if none. */
  async getDelivery(bookingId: string): Promise<Delivery | null> {
    const { data, error } = await bookingsDb
      .from('deliveries')
      .select('id, booking_id, message, links, released_at, updated_at')
      .eq('booking_id', bookingId)
      .maybeSingle();
    if (error) { console.error('[BookingData] getDelivery:', error.message); return null; }
    return (data as Delivery) ?? null;
  }

  /** Create or replace the delivery content. Deliberately does NOT send `released_at`:
   *  PostgREST's upsert only updates the columns supplied, so editing the message or
   *  links can never silently re-lock (or unlock) an already-released delivery. */
  async saveDelivery(orgId: string, bookingId: string, input: {
    message: string | null; links: DeliveryLink[];
  }): Promise<{ ok?: boolean; error?: string }> {
    const { error } = await bookingsDb.from('deliveries').upsert({
      org_id: orgId, booking_id: bookingId,
      message: input.message, links: input.links,
    }, { onConflict: 'booking_id' });
    if (error) return { error: error.message };
    return { ok: true };
  }

  /** Manual override — show the delivery before the booking is paid in full (goodwill
   *  early delivery, and €0/comped bookings which can never read as "paid"). */
  async setDeliveryReleased(orgId: string, bookingId: string, released: boolean): Promise<{ ok?: boolean; error?: string }> {
    const { error } = await bookingsDb.from('deliveries').upsert({
      org_id: orgId, booking_id: bookingId,
      released_at: released ? new Date().toISOString() : null,
    }, { onConflict: 'booking_id' });
    if (error) return { error: error.message };
    return { ok: true };
  }

  /** Clear the delivery in place (content + release). The row is kept, like resetInvoice —
   *  and it must be: an upsert can't resolve its ON CONFLICT target against a
   *  soft-deleted row, since `hide_deleted` makes that row invisible. */
  async clearDelivery(orgId: string, bookingId: string): Promise<{ ok?: boolean; error?: string }> {
    const { error } = await bookingsDb.from('deliveries').upsert({
      org_id: orgId, booking_id: bookingId, message: null, links: [], released_at: null,
    }, { onConflict: 'booking_id' });
    if (error) return { error: error.message };
    return { ok: true };
  }

  /** Admin "confirm now": create/refresh this booking's Google Calendar event immediately
   *  (instead of waiting for the client to pay/confirm). Awaited so the caller knows it ran. */
  async confirmToCalendar(bookingId: string): Promise<void> {
    const { error } = await bookingsDb.functions.invoke('sync-booking-event', { body: { bookingId } });
    if (error) console.warn('[BookingData] confirmToCalendar:', error.message);
  }

  /** Fire-and-forget: re-sync the booking's calendar event(s) to its current slots/title.
   *  `deleteEventIds` removes events orphaned by an edit (moved/removed time blocks). */
  private syncBookingEvent(bookingId: string, deleteEventIds?: string[]): void {
    void bookingsDb.functions.invoke('sync-booking-event', { body: { bookingId, deleteEventIds } })
      .then(({ error }) => { if (error) console.warn('[BookingData] calendar sync failed:', error.message); });
  }

  /**
   * Soft-delete a booking (mainly for imported/external events). The row is kept and the
   * DB cascade-soft-deletes its slots/payments/invoices/links/tasks/cards — all hidden by
   * RLS, nothing destroyed, the slot is freed. When `removeCalendarEvent` is true its Google
   * Calendar event is removed first (via cancel-booking, no refund). `calendarCleared`
   * reports whether Google actually accepted the removal — `false` means the booking is
   * gone from the platform but its event still sits on the calendar (e.g. expired Google
   * token), so the caller can warn instead of falsely claiming success.
   */
  async deleteBooking(bookingId: string, removeCalendarEvent: boolean): Promise<{ ok?: boolean; error?: string; calendarCleared?: boolean }> {
    let calendarCleared = true;
    if (removeCalendarEvent) {
      const { data, error } = await bookingsDb.functions.invoke('cancel-booking', { body: { bookingId, refund: false } });
      if (error) return { error: error.message };
      calendarCleared = (data as { calendar_cleared?: boolean } | null)?.calendar_cleared !== false;
    }
    // Soft delete via SECURITY DEFINER RPC — a direct UPDATE would be rejected by the
    // restrictive hide_deleted SELECT policy (the new row becomes invisible). The DB
    // cascade-soft-deletes its slots/payments/invoices/links/tasks/cards.
    const { error } = await bookingsDb.rpc('soft_delete', { p_table: 'bookings', p_id: bookingId });
    if (error) return { error: error.message };
    await this.fetchBookings();
    return { ok: true, calendarCleared };
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

  // ── Tabbed list: each tab is a fresh server-side query (no local filtering) ──
  private static readonly ACTIVE = ['booked', 'in_progress', 'done'];

  /** Apply a tab's filter + sort to a booking_summary query (server-side). */
  private applyTabFilter(q: any, tab: BookingTab, nowIso: string): any {
    const A = BookingDataService.ACTIVE;
    switch (tab) {
      // Upcoming = happening now or still to come (real OR external), soonest first.
      case 'upcoming':  return q.in('status', ['booked', 'in_progress']).gte('end_at', nowIso).order('start_at', { ascending: true });
      case 'past':      return q.eq('is_external', false).in('status', A).lt('end_at', nowIso).order('start_at', { ascending: false });
      case 'pending':   return q.eq('status', 'pending').order('start_at', { ascending: true });
      case 'unpaid':    return q.eq('is_external', false).in('status', A).in('payment_status', ['unpaid', 'partial']).order('start_at', { ascending: true });
      case 'paid':      return q.eq('is_external', false).in('status', A).eq('payment_status', 'paid').order('start_at', { ascending: false });
      case 'external':  return q.eq('is_external', true).order('start_at', { ascending: true });
      case 'cancelled': return q.in('status', ['cancelled', 'expired']).order('start_at', { ascending: false });
      case 'all':       return q.order('start_at', { ascending: false });
    }
  }

  /** Fresh rows for one tab, optionally matching a search term — fetched on demand. */
  async queryBookings(tab: BookingTab, search = ''): Promise<BookingSummary[]> {
    const org = this.auth.orgId();
    if (!org) return [];
    const nowIso = new Date().toISOString();
    let q = this.applyTabFilter(
      bookingsDb.from('booking_summary').select('*').eq('org_id', org), tab, nowIso);
    // PostgREST `or` uses commas/parens as syntax — strip them from the user term.
    const s = search.trim().replace(/[,()]/g, ' ').trim();
    if (s) q = q.or(`booking_ref.ilike.%${s}%,client_name.ilike.%${s}%,title.ilike.%${s}%`);
    const { data, error } = await q;
    if (error) { console.error('[BookingData] queryBookings:', error); return []; }
    return (data ?? []) as BookingSummary[];
  }

  /** Per-tab counts (for the tab badges) — one HEAD count query per tab, in parallel. */
  async bookingTabCounts(): Promise<Record<BookingTab, number>> {
    const empty: Record<BookingTab, number> =
      { upcoming: 0, pending: 0, unpaid: 0, paid: 0, past: 0, external: 0, cancelled: 0, all: 0 };
    const org = this.auth.orgId();
    if (!org) return empty;
    const nowIso = new Date().toISOString();
    const tabs: BookingTab[] = ['upcoming', 'pending', 'unpaid', 'paid', 'past', 'external', 'cancelled', 'all'];
    const results = await Promise.all(tabs.map(tab =>
      this.applyTabFilter(
        bookingsDb.from('booking_summary').select('*', { count: 'exact', head: true }).eq('org_id', org),
        tab, nowIso)));
    const counts = { ...empty };
    tabs.forEach((tab, i) => { counts[tab] = results[i].count ?? 0; });
    return counts;
  }

  private async fetchClients(): Promise<void> {
    const org = this.auth.orgId();
    if (!org) { this.clients.set([]); return; }
    const { data, error } = await bookingsDb.from('clients').select('*').eq('org_id', org).order('name');
    if (error) console.error('[BookingData] fetchClients:', error);
    this.clients.set((data ?? []) as Client[]);
  }
}
