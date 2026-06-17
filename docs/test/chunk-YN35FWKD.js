import {
  subscribeToChanges
} from "./chunk-62WGWY5L.js";
import {
  BookingsAuthService
} from "./chunk-MQ25DMRF.js";
import {
  bookingsDb
} from "./chunk-5R6IZFLD.js";
import {
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-YX7TN7IZ.js";
import {
  __async,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/core/services/booking-data.service.ts
var BookingDataService = class _BookingDataService {
  constructor() {
    this.auth = inject(BookingsAuthService);
    this.bookings = signal([]);
    this.clients = signal([]);
    this.loading = signal(false);
    this.syncing = signal(false);
    this.syncResult = signal(null);
    this.realtime = null;
  }
  load() {
    return __async(this, null, function* () {
      this.loading.set(true);
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          if (attempt > 0)
            yield new Promise((r) => setTimeout(r, 3e3));
          yield Promise.race([
            Promise.all([this.fetchBookings(), this.fetchClients()]),
            new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 15e3))
          ]);
          this.loading.set(false);
          this.subscribeRealtime();
          return;
        } catch (err) {
          console.warn(`[BookingData] attempt ${attempt + 1} failed:`, err.message);
        }
      }
      console.error("[BookingData] all retries failed \u2014 Supabase project may be paused");
      this.loading.set(false);
    });
  }
  /** Create or update a client with full billing details (everything but the name is optional). Returns the saved row. */
  saveClient(orgId, c) {
    return __async(this, null, function* () {
      const row = {
        name: c.name.trim(),
        email: c.email?.trim() || null,
        phone: c.phone?.trim() || null,
        company: c.company?.trim() || null,
        vat_number: c.vat_number?.trim() || null,
        billing_address: c.billing_address?.trim() || null,
        notes: c.notes?.trim() || null
      };
      const { data, error } = c.id ? yield bookingsDb.from("clients").update(row).eq("id", c.id).select("*").single() : yield bookingsDb.from("clients").insert(__spreadValues({ org_id: orgId }, row)).select("*").single();
      if (error)
        return { error: error.message };
      yield this.fetchClients();
      return { client: data };
    });
  }
  /** Create a client on behalf of the admin (no auth user yet — claimed by email on first sign-in). */
  createClient(orgId, name, email) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.from("clients").insert({ org_id: orgId, name, email }).select("*").single();
      if (error) {
        console.error("[BookingData] createClient:", error);
        return null;
      }
      yield this.fetchClients();
      return data;
    });
  }
  /**
   * Create a confirmed booking manually (admin agreed the job; client pays via the link).
   * Status `booked` reserves the worker's slot — the DB exclusion constraint rejects
   * overlaps on the same worker (SQLSTATE 23P01 → `slot_taken`). Ref + production tasks
   * are set by DB triggers.
   */
  createBooking(input) {
    return __async(this, null, function* () {
      const start = new Date(input.startAt);
      const end = new Date(start.getTime() + input.hours * 36e5);
      const { data, error } = yield bookingsDb.from("bookings").insert({
        org_id: input.orgId,
        staff_id: input.staffId,
        service_id: input.serviceId,
        client_id: input.clientId,
        title: input.title,
        description: input.description,
        start_at: start.toISOString(),
        end_at: end.toISOString(),
        price_total: input.priceTotal,
        status: "booked",
        created_by: "admin",
        allow_card: input.allowCard,
        allow_inperson: input.allowInperson,
        deposit_allowed: input.depositAllowed,
        deposit_percent: input.depositPercent,
        needs_production: input.needsProduction,
        location: input.location ?? null,
        notes: input.notes ?? null
      }).select("id, booking_ref").single();
      if (error) {
        if (error.code === "23P01")
          return { error: "slot_taken" };
        return { error: error.message };
      }
      yield this.fetchBookings();
      const row = data;
      return { id: row.id, ref: row.booking_ref };
    });
  }
  /** Raw editable fields for a single booking (admin-only via RLS). */
  getBooking(id) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("bookings").select("id, org_id, booking_ref, staff_id, service_id, client_id, title, description, start_at, end_at, price_total, location, notes, status, allow_card, allow_inperson, deposit_percent, deposit_allowed, needs_production").eq("id", id).maybeSingle();
      return data ?? null;
    });
  }
  /** Update an existing booking. Moving it onto an occupied slot fails with 23P01. */
  updateBooking(id, input) {
    return __async(this, null, function* () {
      const start = new Date(input.startAt);
      const end = new Date(start.getTime() + input.hours * 36e5);
      const { error } = yield bookingsDb.from("bookings").update({
        staff_id: input.staffId,
        service_id: input.serviceId,
        client_id: input.clientId,
        title: input.title,
        description: input.description,
        start_at: start.toISOString(),
        end_at: end.toISOString(),
        price_total: input.priceTotal,
        allow_card: input.allowCard,
        allow_inperson: input.allowInperson,
        deposit_allowed: input.depositAllowed,
        deposit_percent: input.depositPercent,
        needs_production: input.needsProduction,
        location: input.location ?? null,
        notes: input.notes ?? null,
        // An edited import becomes a real booking (counts in revenue, invoiceable).
        is_external: false
      }).eq("id", id);
      if (error)
        return { error: error.code === "23P01" ? "slot_taken" : error.message };
      this.syncBookingEvent(id);
      yield this.fetchBookings();
      return { ok: true };
    });
  }
  /**
   * A worker's blocking bookings overlapping [fromIso, toIso) — for the admin
   * availability picker, which shows WHY each slot is busy (client · title).
   * Admin-only by RLS (org-scoped). Statuses that don't reserve the slot
   * (pending/draft/cancelled/expired) are excluded, mirroring the DB constraint.
   */
  getWorkerBusy(staffId, fromIso, toIso) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.from("bookings").select("id, start_at, end_at, title, status, clients(name)").eq("staff_id", staffId).in("status", ["hold", "booked", "in_progress", "done"]).lt("start_at", toIso).gt("end_at", fromIso).order("start_at");
      if (error) {
        console.error("[BookingData] getWorkerBusy:", error);
        return [];
      }
      return (data ?? []).map((r) => {
        const row = r;
        const client = Array.isArray(row.clients) ? row.clients[0] : row.clients;
        return { id: row.id, start_at: row.start_at, end_at: row.end_at, title: row.title, status: row.status, clientName: client?.name ?? null };
      });
    });
  }
  generateLink(bookingId) {
    return __async(this, null, function* () {
      const { data: bk } = yield bookingsDb.from("bookings").select("org_id").eq("id", bookingId).single();
      if (!bk)
        return null;
      const { data } = yield bookingsDb.from("booking_links").insert({ org_id: bk.org_id, booking_id: bookingId, expires_at: null }).select("token").single();
      return data?.token ? `${window.location.origin}/book/${data.token}` : null;
    });
  }
  syncCalendar() {
    return __async(this, null, function* () {
      this.syncing.set(true);
      this.syncResult.set(null);
      const { data: { session } } = yield bookingsDb.auth.getSession();
      if (!session) {
        this.syncing.set(false);
        return;
      }
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Sync timed out \u2014 Edge Function not deployed yet")), 1e4));
      const { data, error } = yield Promise.race([
        bookingsDb.functions.invoke("sync-calendar"),
        timeout
      ]).catch((e) => ({ data: null, error: e }));
      if (error) {
        this.syncResult.set(`Error: ${error.message}`);
      } else {
        const { pushed = 0, pulled = 0, push_errors = [], pull_errors = [] } = data ?? {};
        const parts = [];
        if (pushed)
          parts.push(`${pushed} pushed to Calendar`);
        if (pulled)
          parts.push(`${pulled} external events imported`);
        if (!pushed && !pulled)
          parts.push("Everything in sync");
        const errCount = push_errors.length + pull_errors.length;
        if (errCount)
          parts.push(`${errCount} error(s)`);
        this.syncResult.set(parts.join(" \xB7 "));
        yield this.fetchBookings();
      }
      this.syncing.set(false);
      setTimeout(() => this.syncResult.set(null), 5e3);
    });
  }
  // ── Admin actions: cash-request approvals + reconciliation ──────────
  /** Approve a pending cash request → booked + push to Google Calendar. */
  approveRequest(bookingId) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.functions.invoke("approve-cash-booking", { body: { bookingId } });
      if (error)
        throw error;
      if (!data?.error)
        yield this.fetchBookings();
      return data ?? {};
    });
  }
  /** Decline a pending cash request (frees nothing — it wasn't blocking the slot). */
  declineRequest(bookingId) {
    return __async(this, null, function* () {
      yield bookingsDb.from("bookings").update({ status: "cancelled" }).eq("id", bookingId);
      yield this.fetchBookings();
    });
  }
  /** All payments recorded against a booking, newest first. */
  getPayments(bookingId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("payments").select("id, amount, method, note, status, paid_at, created_at, stripe_payment_intent_id").eq("booking_id", bookingId).order("paid_at", { ascending: true, nullsFirst: true }).order("created_at", { ascending: true });
      return data ?? [];
    });
  }
  /** Record a manual payment (cash / Revolut / bank / other) of any amount. */
  addPayment(bookingId, input) {
    return __async(this, null, function* () {
      const { data: bk } = yield bookingsDb.from("bookings").select("org_id").eq("id", bookingId).single();
      const orgId = bk?.org_id;
      if (!orgId)
        return { error: "not_found" };
      const { error } = yield bookingsDb.from("payments").insert({
        org_id: orgId,
        booking_id: bookingId,
        amount: input.amount,
        type: "full",
        status: "completed",
        method: input.method,
        note: input.note ?? null,
        paid_at: input.paidAt ?? (/* @__PURE__ */ new Date()).toISOString()
      });
      if (error)
        return { error: error.message };
      this.syncBookingEvent(bookingId);
      yield this.fetchBookings();
      return { ok: true };
    });
  }
  /** Remove a payment (e.g. recorded by mistake). Card/Stripe payments aren't deletable here. */
  deletePayment(paymentId, bookingId) {
    return __async(this, null, function* () {
      yield bookingsDb.from("payments").delete().eq("id", paymentId);
      this.syncBookingEvent(bookingId);
      yield this.fetchBookings();
    });
  }
  /** Shortcut: record the full outstanding balance as a cash payment. */
  recordCashPayment(bookingId, amount) {
    return __async(this, null, function* () {
      yield this.addPayment(bookingId, { amount, method: "cash", note: "Marked as paid" });
    });
  }
  /** Override the agreed price for a booking. */
  setAmount(bookingId, priceTotal) {
    return __async(this, null, function* () {
      yield bookingsDb.from("bookings").update({ price_total: priceTotal }).eq("id", bookingId);
      this.syncBookingEvent(bookingId);
      yield this.fetchBookings();
    });
  }
  // ── Invoice overrides (edit an invoice WITHOUT touching the booking) ─────
  /** Persist a customised invoice for a booking (line items / notes / date). */
  saveInvoice(orgId, bookingId, input) {
    return __async(this, null, function* () {
      const { error } = yield bookingsDb.from("invoices").upsert({
        org_id: orgId,
        booking_id: bookingId,
        line_items: input.lineItems,
        notes: input.notes,
        issue_date: input.issueDate
      }, { onConflict: "booking_id" });
      if (error)
        return { error: error.message };
      return { ok: true };
    });
  }
  /** The invoice's line items (saved override, else a single line derived from the booking). Keeps service metadata. */
  getInvoiceItems(bookingId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.rpc("get_invoice", { p_booking: bookingId });
      const items = data?.invoice?.line_items ?? [];
      return items.map((i) => __spreadValues(__spreadValues({
        description: i.description,
        amount: Number(i.amount)
      }, i.serviceId ? { serviceId: i.serviceId } : {}), i.hours ? { hours: Number(i.hours) } : {}));
    });
  }
  /** Discard the customised invoice — revert to one derived live from the booking. */
  resetInvoice(bookingId) {
    return __async(this, null, function* () {
      yield bookingsDb.from("invoices").delete().eq("booking_id", bookingId);
    });
  }
  /** Fire-and-forget: refresh the booking's calendar event description (payment + progress). */
  syncBookingEvent(bookingId) {
    void bookingsDb.functions.invoke("sync-booking-event", { body: { bookingId } }).then(({ error }) => {
      if (error)
        console.warn("[BookingData] calendar sync failed:", error.message);
    });
  }
  /** Cancel a booking (frees the slot + removes the calendar event); optional Stripe refund. */
  cancelBooking(bookingId, refund) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.functions.invoke("cancel-booking", { body: { bookingId, refund } });
      if (error)
        throw error;
      if (!data?.error)
        yield this.fetchBookings();
      return data ?? {};
    });
  }
  // ── Realtime ────────────────────────────────────────────────────────
  subscribeRealtime() {
    if (this.realtime)
      return;
    this.realtime = subscribeToChanges("admin-bookings", ["bookings", "payments"], () => void this.fetchBookings());
  }
  ngOnDestroy() {
    this.realtime?.destroy();
  }
  fetchBookings() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org) {
        this.bookings.set([]);
        return;
      }
      const { data, error } = yield bookingsDb.from("booking_summary").select("*").eq("org_id", org).order("start_at", { ascending: false });
      if (error)
        console.error("[BookingData] fetchBookings:", error);
      this.bookings.set(data ?? []);
    });
  }
  fetchClients() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org) {
        this.clients.set([]);
        return;
      }
      const { data, error } = yield bookingsDb.from("clients").select("*").eq("org_id", org).order("name");
      if (error)
        console.error("[BookingData] fetchClients:", error);
      this.clients.set(data ?? []);
    });
  }
  static {
    this.\u0275fac = function BookingDataService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingDataService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BookingDataService, factory: _BookingDataService.\u0275fac });
  }
};

export {
  BookingDataService
};
//# sourceMappingURL=chunk-YN35FWKD.js.map
