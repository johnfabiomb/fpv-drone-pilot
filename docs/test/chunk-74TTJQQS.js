import {
  subscribeToChanges
} from "./chunk-FSJG3SUO.js";
import {
  BookingsAuthService
} from "./chunk-KKHOHJA2.js";
import {
  bookingsDb
} from "./chunk-F6LTA4RG.js";
import {
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-EBVVQ6Y2.js";
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
      const { data, error } = yield bookingsDb.rpc("create_booking", {
        p_booking: {
          org_id: input.orgId,
          staff_id: input.staffId,
          service_id: input.serviceId,
          client_id: input.clientId,
          contact_name: input.contactName ?? null,
          title: input.title,
          description: input.description,
          price_total: input.priceTotal,
          // Confirmed → 'booked' (reserved + calendar). Tentative → 'pending': held for the
          // admin (created_by 'admin' makes pending block the slot) until they confirm.
          status: input.confirmed ? "booked" : "pending",
          created_by: "admin",
          allow_card: input.allowCard,
          allow_inperson: input.allowInperson,
          deposit_allowed: input.depositAllowed,
          deposit_percent: input.depositPercent,
          needs_production: input.needsProduction,
          is_external: false,
          location: input.location ?? null,
          notes: input.notes ?? null
        },
        p_slots: input.slots
      });
      if (error)
        return { error: this.overlapOr(error) };
      yield this.fetchBookings();
      const row = Array.isArray(data) ? data[0] : data;
      return { id: row.id, ref: row.booking_ref };
    });
  }
  /** Raw editable fields for a single booking (admin-only via RLS). */
  getBooking(id) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("bookings").select("id, org_id, booking_ref, staff_id, service_id, client_id, contact_name, title, description, start_at, end_at, price_total, location, notes, status, allow_card, allow_inperson, deposit_percent, deposit_allowed, needs_production").eq("id", id).maybeSingle();
      return data ?? null;
    });
  }
  /** A booking's time blocks (one or more), earliest first. */
  getBookingSlots(bookingId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("booking_slots").select("start_at, end_at").eq("booking_id", bookingId).order("start_at");
      return (data ?? []).map((s) => ({ start: s.start_at, end: s.end_at }));
    });
  }
  /** Update a booking + replace its slots (atomic). Overlap fails with 23P01 → `slot_taken`. */
  updateBooking(id, input) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.rpc("update_booking", {
        p_booking_id: id,
        p_booking: {
          staff_id: input.staffId,
          service_id: input.serviceId,
          client_id: input.clientId,
          contact_name: input.contactName ?? null,
          title: input.title,
          description: input.description,
          price_total: input.priceTotal,
          allow_card: input.allowCard,
          allow_inperson: input.allowInperson,
          deposit_allowed: input.depositAllowed,
          deposit_percent: input.depositPercent,
          needs_production: input.needsProduction,
          location: input.location ?? null,
          notes: input.notes ?? null
        },
        p_slots: input.slots
      });
      if (error)
        return { error: this.overlapOr(error) };
      this.syncBookingEvent(id, data ?? void 0);
      yield this.fetchBookings();
      return { ok: true };
    });
  }
  /** Map a Postgres exclusion-violation to `slot_taken`, else pass the message. */
  overlapOr(error) {
    return error.code === "23P01" || /no_overlap|exclusion/.test(error.message) ? "slot_taken" : error.message;
  }
  /**
   * A worker's blocking bookings overlapping [fromIso, toIso) — for the admin
   * availability picker, which shows WHY each slot is busy (client · title).
   * Admin-only by RLS (org-scoped). Statuses that don't reserve the slot
   * (pending/draft/cancelled/expired) are excluded, mirroring the DB constraint.
   */
  getWorkerBusy(staffId, fromIso, toIso) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.from("booking_slots").select("booking_id, start_at, end_at, bookings!inner(title, status, clients(name))").eq("staff_id", staffId).eq("blocking", true).lt("start_at", toIso).gt("end_at", fromIso).order("start_at");
      if (error) {
        console.error("[BookingData] getWorkerBusy:", error);
        return [];
      }
      return (data ?? []).map((r) => {
        const row = r;
        const bk = Array.isArray(row.bookings) ? row.bookings[0] : row.bookings;
        const client = Array.isArray(bk.clients) ? bk.clients[0] : bk.clients;
        return { id: row.booking_id, start_at: row.start_at, end_at: row.end_at, title: bk.title, status: bk.status, clientName: client?.name ?? null };
      });
    });
  }
  /** Mint a booking-link token (anon-accessible) for this booking. */
  createBookingToken(bookingId) {
    return __async(this, null, function* () {
      const { data: bk } = yield bookingsDb.from("bookings").select("org_id").eq("id", bookingId).single();
      if (!bk)
        return null;
      const { data } = yield bookingsDb.from("booking_links").insert({ org_id: bk.org_id, booking_id: bookingId, expires_at: null }).select("token").single();
      return data?.token ?? null;
    });
  }
  /** Shareable payment link (`/book/:token`). */
  generateLink(bookingId) {
    return __async(this, null, function* () {
      const token = yield this.createBookingToken(bookingId);
      return token ? `${window.location.origin}/book/${token}` : null;
    });
  }
  /** Shareable invoice link (`/book/invoice?token=…`) — viewable by the client without logging in. */
  invoiceShareLink(bookingId) {
    return __async(this, null, function* () {
      const token = yield this.createBookingToken(bookingId);
      return token ? `${window.location.origin}/book/invoice?token=${token}` : null;
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
  /** Remove a payment (e.g. recorded by mistake). Soft delete via RPC — the row is kept for audit. */
  deletePayment(paymentId, bookingId) {
    return __async(this, null, function* () {
      yield bookingsDb.rpc("soft_delete", { p_table: "payments", p_id: paymentId });
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
  /** Discard the customised invoice — revert to one derived live from the booking. Clears the
   *  override in place (keeps the 1:1 row, so re-editing just updates it; a soft delete would
   *  collide with UNIQUE(booking_id)). */
  resetInvoice(bookingId) {
    return __async(this, null, function* () {
      yield bookingsDb.from("invoices").update({ line_items: [], notes: null, issue_date: null }).eq("booking_id", bookingId);
    });
  }
  /** Admin "confirm now": create/refresh this booking's Google Calendar event immediately
   *  (instead of waiting for the client to pay/confirm). Awaited so the caller knows it ran. */
  confirmToCalendar(bookingId) {
    return __async(this, null, function* () {
      const { error } = yield bookingsDb.functions.invoke("sync-booking-event", { body: { bookingId } });
      if (error)
        console.warn("[BookingData] confirmToCalendar:", error.message);
    });
  }
  /** Fire-and-forget: re-sync the booking's calendar event(s) to its current slots/title.
   *  `deleteEventIds` removes events orphaned by an edit (moved/removed time blocks). */
  syncBookingEvent(bookingId, deleteEventIds) {
    void bookingsDb.functions.invoke("sync-booking-event", { body: { bookingId, deleteEventIds } }).then(({ error }) => {
      if (error)
        console.warn("[BookingData] calendar sync failed:", error.message);
    });
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
  deleteBooking(bookingId, removeCalendarEvent) {
    return __async(this, null, function* () {
      let calendarCleared = true;
      if (removeCalendarEvent) {
        const { data, error: error2 } = yield bookingsDb.functions.invoke("cancel-booking", { body: { bookingId, refund: false } });
        if (error2)
          return { error: error2.message };
        calendarCleared = data?.calendar_cleared !== false;
      }
      const { error } = yield bookingsDb.rpc("soft_delete", { p_table: "bookings", p_id: bookingId });
      if (error)
        return { error: error.message };
      yield this.fetchBookings();
      return { ok: true, calendarCleared };
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
  static {
    this.ACTIVE = ["booked", "in_progress", "done"];
  }
  /** Apply a tab's filter + sort to a booking_summary query (server-side). */
  applyTabFilter(q, tab, nowIso) {
    const A = _BookingDataService.ACTIVE;
    switch (tab) {
      // Upcoming = happening now or still to come (real OR external), soonest first.
      case "upcoming":
        return q.in("status", ["booked", "in_progress"]).gte("end_at", nowIso).order("start_at", { ascending: true });
      case "past":
        return q.eq("is_external", false).in("status", A).lt("end_at", nowIso).order("start_at", { ascending: false });
      case "pending":
        return q.eq("status", "pending").order("start_at", { ascending: true });
      case "unpaid":
        return q.eq("is_external", false).in("status", A).in("payment_status", ["unpaid", "partial"]).order("start_at", { ascending: true });
      case "paid":
        return q.eq("is_external", false).in("status", A).eq("payment_status", "paid").order("start_at", { ascending: false });
      case "external":
        return q.eq("is_external", true).order("start_at", { ascending: true });
      case "cancelled":
        return q.in("status", ["cancelled", "expired"]).order("start_at", { ascending: false });
      case "all":
        return q.order("start_at", { ascending: false });
    }
  }
  /** Fresh rows for one tab, optionally matching a search term — fetched on demand. */
  queryBookings(tab, search = "") {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org)
        return [];
      const nowIso = (/* @__PURE__ */ new Date()).toISOString();
      let q = this.applyTabFilter(bookingsDb.from("booking_summary").select("*").eq("org_id", org), tab, nowIso);
      const s = search.trim().replace(/[,()]/g, " ").trim();
      if (s)
        q = q.or(`booking_ref.ilike.%${s}%,client_name.ilike.%${s}%,title.ilike.%${s}%`);
      const { data, error } = yield q;
      if (error) {
        console.error("[BookingData] queryBookings:", error);
        return [];
      }
      return data ?? [];
    });
  }
  /** Per-tab counts (for the tab badges) — one HEAD count query per tab, in parallel. */
  bookingTabCounts() {
    return __async(this, null, function* () {
      const empty = { upcoming: 0, pending: 0, unpaid: 0, paid: 0, past: 0, external: 0, cancelled: 0, all: 0 };
      const org = this.auth.orgId();
      if (!org)
        return empty;
      const nowIso = (/* @__PURE__ */ new Date()).toISOString();
      const tabs = ["upcoming", "pending", "unpaid", "paid", "past", "external", "cancelled", "all"];
      const results = yield Promise.all(tabs.map((tab) => this.applyTabFilter(bookingsDb.from("booking_summary").select("*", { count: "exact", head: true }).eq("org_id", org), tab, nowIso)));
      const counts = __spreadValues({}, empty);
      tabs.forEach((tab, i) => {
        counts[tab] = results[i].count ?? 0;
      });
      return counts;
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
//# sourceMappingURL=chunk-74TTJQQS.js.map
