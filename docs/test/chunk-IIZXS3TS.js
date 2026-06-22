import {
  bookingsDb
} from "./chunk-Y4O5MVSK.js";
import {
  computed,
  signal,
  ɵɵdefineInjectable
} from "./chunk-P56CFEJA.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/core/services/client-portal.service.ts
var ClientPortalService = class _ClientPortalService {
  constructor() {
    this._user = signal(null);
    this.user = this._user.asReadonly();
    this.signedIn = computed(() => this._user() !== null);
    this.initialized = false;
  }
  init() {
    return __async(this, null, function* () {
      if (this.initialized)
        return;
      this.initialized = true;
      const { data: { session } } = yield bookingsDb.auth.getSession();
      this.setUser(session?.user ?? null);
      bookingsDb.auth.onAuthStateChange((_event, session2) => {
        setTimeout(() => this.setUser(session2?.user ?? null), 0);
      });
    });
  }
  signInWithGoogle(redirectPath) {
    return __async(this, null, function* () {
      yield bookingsDb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}${redirectPath}` } });
    });
  }
  signInWithEmail(email, redirectPath) {
    return __async(this, null, function* () {
      yield bookingsDb.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}${redirectPath}` } });
    });
  }
  signOut() {
    return __async(this, null, function* () {
      yield bookingsDb.auth.signOut();
      this.setUser(null);
    });
  }
  /** This user's client id within an org (null if none yet). */
  clientId(orgId) {
    return __async(this, null, function* () {
      const uid = this._user()?.id;
      if (!uid)
        return null;
      const { data } = yield bookingsDb.from("clients").select("id").eq("org_id", orgId).eq("user_id", uid).maybeSingle();
      return data?.id ?? null;
    });
  }
  loadMyProfile(orgId) {
    return __async(this, null, function* () {
      const uid = this._user()?.id;
      if (!uid)
        return null;
      const { data } = yield bookingsDb.from("clients").select("name, email, company, vat_number, billing_address").eq("org_id", orgId).eq("user_id", uid).maybeSingle();
      return data ?? null;
    });
  }
  /** Link/update the client profile in this org. Returns the client id. */
  upsertProfile(orgId, b) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.rpc("upsert_my_client", {
        p_org: orgId,
        p_name: b.name,
        p_email: b.email,
        p_company: b.company,
        p_vat: b.vat,
        p_address: b.address
      });
      if (error)
        throw error;
      return data;
    });
  }
  /** Card booking: 15-min hold + Stripe intent. Returns clientSecret + the org's
   *  connected account (needed to init Stripe.js for a direct charge), or { error }. */
  startCardBooking(staffId, serviceId, startIso, hours, paymentType) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.functions.invoke("start-card-booking", {
        body: { staffId, serviceId, start: startIso, hours, paymentType }
      });
      if (error)
        throw error;
      return data;
    });
  }
  /** Cash request (status 'pending'; price server-set). */
  createBookingRequest(orgId, staffId, serviceId, startIso, hours, notes) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.rpc("create_booking_request", {
        p_org: orgId,
        p_staff: staffId,
        p_service: serviceId,
        p_start: startIso,
        p_hours: hours,
        p_notes: notes ?? null
      });
      if (error)
        throw error;
      const row = Array.isArray(data) ? data[0] : data;
      return row;
    });
  }
  /** The signed-in client's own bookings within an org. */
  loadMyBookings(orgId) {
    return __async(this, null, function* () {
      const cid = yield this.clientId(orgId);
      if (!cid)
        return [];
      const { data: rows } = yield bookingsDb.from("bookings").select("id, booking_ref, title, description, location, start_at, end_at, price_total, status").eq("org_id", orgId).eq("client_id", cid).order("start_at", { ascending: false });
      const bookings = rows ?? [];
      if (bookings.length === 0)
        return [];
      const ids = bookings.map((b) => b.id);
      const { data: pays } = yield bookingsDb.from("payments").select("booking_id, amount, status").in("booking_id", ids);
      const paid = /* @__PURE__ */ new Map();
      for (const p of pays ?? []) {
        if (p.status === "completed")
          paid.set(p.booking_id, (paid.get(p.booking_id) ?? 0) + Number(p.amount));
      }
      return bookings.map((b) => {
        const tp = paid.get(b.id) ?? 0;
        return __spreadProps(__spreadValues({}, b), { total_paid: tp, balance_due: Math.max(0, b.price_total - tp) });
      });
    });
  }
  setUser(user) {
    this._user.set(user ? { id: user.id, email: user.email ?? null } : null);
  }
  static {
    this.\u0275fac = function ClientPortalService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ClientPortalService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ClientPortalService, factory: _ClientPortalService.\u0275fac, providedIn: "root" });
  }
};

export {
  ClientPortalService
};
//# sourceMappingURL=chunk-IIZXS3TS.js.map
