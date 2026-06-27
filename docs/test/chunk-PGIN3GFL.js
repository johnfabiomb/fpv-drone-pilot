import {
  bookingsDb
} from "./chunk-3A2C4JCE.js";
import {
  ɵɵdefineInjectable
} from "./chunk-2FJZNSO2.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/core/services/booking-admin.service.ts
var BookingAdminService = class _BookingAdminService {
  // ── Services ──────────────────────────────────────────────────────
  listServices(orgId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("services").select("*").eq("org_id", orgId).order("name");
      return data ?? [];
    });
  }
  saveService(orgId, s) {
    return __async(this, null, function* () {
      const row = {
        org_id: orgId,
        name: s.name,
        description: s.description ?? null,
        pricing: s.pricing,
        min_hours: s.min_hours,
        max_hours: s.max_hours,
        is_active: s.is_active ?? true,
        task_template: s.task_template ?? []
      };
      if (s.id)
        yield bookingsDb.from("services").update(row).eq("id", s.id);
      else
        yield bookingsDb.from("services").insert(row);
    });
  }
  deleteService(id) {
    return __async(this, null, function* () {
      yield bookingsDb.rpc("soft_delete", { p_table: "services", p_id: id });
    });
  }
  // ── Staff ─────────────────────────────────────────────────────────
  listStaff(orgId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("staff").select("*").eq("org_id", orgId).order("name");
      return data ?? [];
    });
  }
  saveStaff(orgId, s) {
    return __async(this, null, function* () {
      const row = { org_id: orgId, name: s.name, email: s.email ?? null, is_bookable: s.is_bookable ?? true };
      if (s.id)
        yield bookingsDb.from("staff").update(row).eq("id", s.id);
      else
        yield bookingsDb.from("staff").insert(row);
    });
  }
  deleteStaff(id) {
    return __async(this, null, function* () {
      yield bookingsDb.rpc("soft_delete", { p_table: "staff", p_id: id });
    });
  }
  // ── Staff ↔ Service assignment + schedule ─────────────────────────
  listStaffServices() {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("staff_services").select("staff_id, service_id, working_hours");
      return data ?? [];
    });
  }
  assignService(staffId, serviceId, workingHours) {
    return __async(this, null, function* () {
      yield bookingsDb.from("staff_services").upsert({ staff_id: staffId, service_id: serviceId, working_hours: workingHours });
    });
  }
  unassignService(staffId, serviceId) {
    return __async(this, null, function* () {
      yield bookingsDb.from("staff_services").delete().eq("staff_id", staffId).eq("service_id", serviceId);
    });
  }
  // ── Org settings ──────────────────────────────────────────────────
  getOrgSettings(orgId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("organizations").select("timezone, currency, booking_params, features, invoice_details").eq("id", orgId).maybeSingle();
      return data ?? null;
    });
  }
  // ── Work board (production) ───────────────────────────────────────
  /** All cards (active + backlog) from the work_board view — names/is_active resolved server-side. */
  loadJobs(orgId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("work_board").select("id, title, production_status, booking_id, booking_start_at, booking_end_at, is_active, assignee_id, assignee_name, due_at, client_name, service_name").eq("org_id", orgId).order("sort").order("created_at");
      return (data ?? []).map((w) => ({
        id: w["id"],
        bookingId: w["booking_id"] ?? null,
        title: w["title"],
        start_at: w["booking_start_at"] ?? null,
        bookingEndAt: w["booking_end_at"] ?? null,
        production_status: w["production_status"],
        isActive: !!w["is_active"],
        assigneeId: w["assignee_id"] ?? null,
        assigneeName: w["assignee_name"] ?? null,
        dueAt: w["due_at"] ?? null,
        clientName: w["client_name"] ?? null,
        serviceName: w["service_name"] ?? null
      }));
    });
  }
  /** Pull a backlog card onto the board (or push one back). */
  activateCard(id) {
    return __async(this, null, function* () {
      yield bookingsDb.from("work_items").update({ activated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
    });
  }
  backlogCard(id) {
    return __async(this, null, function* () {
      yield bookingsDb.from("work_items").update({ activated_at: null }).eq("id", id);
    });
  }
  /** Assign a card to a staff member (or clear it). */
  assignCard(id, staffId) {
    return __async(this, null, function* () {
      yield bookingsDb.from("work_items").update({ assignee_id: staffId }).eq("id", id);
    });
  }
  /** Set / clear a card's deliver-by date (yyyy-MM-dd or null). */
  setDue(id, dueAt) {
    return __async(this, null, function* () {
      yield bookingsDb.from("work_items").update({ due_at: dueAt }).eq("id", id);
    });
  }
  /** Bookings the admin can attach a new work card to (most recent first). */
  loadJobOptions(orgId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("booking_summary").select("id, title, start_at, client_name").eq("org_id", orgId).order("start_at", { ascending: false }).limit(100);
      return (data ?? []).map((b) => ({
        id: b["id"],
        title: b["title"],
        start_at: b["start_at"],
        clientName: b["client_name"] ?? null
      }));
    });
  }
  /** Create a work card — standalone (bookingId null) or linked to a booking (seeds its service tasks). */
  addWorkItem(orgId, bookingId, title) {
    return __async(this, null, function* () {
      yield bookingsDb.rpc("create_work_item", { p_org: orgId, p_booking: bookingId, p_title: title });
    });
  }
  /** Remove a card from the board (soft delete via RPC). Never touches the booking — only
   *  unflags it. The work_items → tasks cascade trigger hides its checklist automatically. */
  deleteWorkItem(id, bookingId) {
    return __async(this, null, function* () {
      yield bookingsDb.rpc("soft_delete", { p_table: "work_items", p_id: id });
      if (bookingId)
        yield bookingsDb.from("bookings").update({ needs_production: false }).eq("id", bookingId);
    });
  }
  loadTasks(orgId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("tasks").select("id, work_item_id, title, is_done, due_at").eq("org_id", orgId).order("sort").order("created_at");
      return data ?? [];
    });
  }
  toggleTask(id, done) {
    return __async(this, null, function* () {
      yield bookingsDb.from("tasks").update({ is_done: done, done_at: done ? (/* @__PURE__ */ new Date()).toISOString() : null }).eq("id", id);
    });
  }
  addTask(orgId, workItemId, title) {
    return __async(this, null, function* () {
      yield bookingsDb.from("tasks").insert({ org_id: orgId, work_item_id: workItemId, title });
    });
  }
  removeTask(id) {
    return __async(this, null, function* () {
      yield bookingsDb.rpc("soft_delete", { p_table: "tasks", p_id: id });
    });
  }
  setStage(workItemId, stage, bookingId = null) {
    return __async(this, null, function* () {
      yield bookingsDb.from("work_items").update({ production_status: stage }).eq("id", workItemId);
      if (bookingId) {
        yield bookingsDb.from("bookings").update({ production_status: stage }).eq("id", bookingId);
        void bookingsDb.functions.invoke("sync-booking-event", { body: { bookingId } }).then(({ error }) => {
          if (error)
            console.warn("[BookingAdmin] calendar sync failed:", error.message);
        });
      }
    });
  }
  updateOrgSettings(orgId, patch) {
    return __async(this, null, function* () {
      yield bookingsDb.from("organizations").update(patch).eq("id", orgId);
    });
  }
  // ── Integrations ──────────────────────────────────────────────────
  checkIntegrations() {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.functions.invoke("check-integrations");
      if (error)
        return { error: error.message };
      return data;
    });
  }
  // ── Stripe Connect (per-org payouts) ──────────────────────────────
  /** Start (or resume) Stripe Connect onboarding; returns the hosted onboarding URL. */
  connectStripeStart(orgId) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.functions.invoke("connect-stripe-start", { body: { orgId } });
      if (error)
        return { error: error.message };
      return data;
    });
  }
  /** Read the org's Connect status (re-checks Stripe + caches the result). */
  connectStripeStatus(orgId) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.functions.invoke("connect-stripe-status", { body: { orgId } });
      if (error)
        return { connected: false, chargesEnabled: false, detailsSubmitted: false, error: error.message };
      return data;
    });
  }
  // ── Organizations & members (platform-admin gated where required) ──
  /** Create a new organization (platform admin only). Returns the new org id. */
  createOrg(name, slug, timezone, currency) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.rpc("create_org", { p_name: name, p_slug: slug, p_timezone: timezone, p_currency: currency });
      if (error)
        return { error: error.message };
      return { id: data };
    });
  }
  listMembers(orgId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.rpc("list_org_members", { p_org: orgId });
      return data ?? [];
    });
  }
  /** Add/update a member by email. 'no_user' = they must sign in once first. */
  addMember(orgId, email, role) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.rpc("add_org_member", { p_org: orgId, p_email: email, p_role: role });
      if (error)
        return "error";
      return data ?? "error";
    });
  }
  removeMember(orgId, userId) {
    return __async(this, null, function* () {
      const { error } = yield bookingsDb.rpc("remove_org_member", { p_org: orgId, p_user: userId });
      if (error)
        return { error: error.message };
      return { ok: true };
    });
  }
  static {
    this.\u0275fac = function BookingAdminService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingAdminService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BookingAdminService, factory: _BookingAdminService.\u0275fac, providedIn: "root" });
  }
};

export {
  BookingAdminService
};
//# sourceMappingURL=chunk-PGIN3GFL.js.map
