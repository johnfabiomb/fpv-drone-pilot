import {
  bookingsDb
} from "./chunk-3A2C4JCE.js";
import {
  signal,
  ɵɵdefineInjectable
} from "./chunk-2FJZNSO2.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/core/services/bookings-auth.service.ts
var ROLE_CACHE_KEY = "jm-bookings-admin";
var BookingsAuthService = class _BookingsAuthService {
  constructor() {
    this.state = signal("loading");
    this.orgId = signal(null);
    this.orgs = signal([]);
    this.isPlatformAdmin = signal(false);
    this.features = signal({});
    this._initPromise = null;
    this.currentUserId = null;
    this.lastResolvedUser = null;
  }
  initialize() {
    if (this._initPromise)
      return this._initPromise;
    const storedUserId = this.readStoredUserId();
    const cached = storedUserId ? this.readCache(storedUserId) : null;
    if (cached) {
      this.orgId.set(cached.org ?? null);
      this.state.set("admin");
    }
    this._initPromise = new Promise((resolve) => {
      let settled = false;
      const settle = () => {
        if (!settled) {
          settled = true;
          resolve();
        }
      };
      const timeout = setTimeout(() => {
        if (this.state() === "loading")
          this.state.set("signed-out");
        settle();
      }, 8e3);
      bookingsDb.auth.getSession().then((_0) => __async(this, [_0], function* ({ data: { session } }) {
        clearTimeout(timeout);
        yield this.resolveRole(session?.user?.id ?? null);
        settle();
      })).catch(() => {
        clearTimeout(timeout);
        if (this.state() === "loading")
          this.state.set("signed-out");
        settle();
      });
      bookingsDb.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
          setTimeout(() => {
            void this.resolveRole(session?.user?.id ?? null);
          }, 0);
        }
      });
    });
    return this._initPromise;
  }
  signInWithGoogle() {
    return __async(this, null, function* () {
      yield bookingsDb.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/bookings` }
      });
    });
  }
  signIn(email) {
    return __async(this, null, function* () {
      yield bookingsDb.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/bookings` }
      });
    });
  }
  signOut() {
    return __async(this, null, function* () {
      yield bookingsDb.auth.signOut();
      localStorage.removeItem(ROLE_CACHE_KEY);
      this.lastResolvedUser = null;
      this.state.set("signed-out");
    });
  }
  // ── Helpers ───────────────────────────────────────────────────────────────────
  /** Re-resolve the user's orgs/role (e.g. after creating an org or adding a member). */
  refresh() {
    return __async(this, null, function* () {
      if (this.currentUserId)
        yield this.resolveRole(this.currentUserId, true);
    });
  }
  /** Switch the active org (used by the sidebar switcher). Must be one of `orgs()`. */
  setActiveOrg(orgId) {
    if (!this.orgs().some((o) => o.id === orgId))
      return;
    this.applyActiveOrg(orgId);
  }
  applyActiveOrg(orgId) {
    const orgChanged = this.orgId() !== orgId;
    this.orgId.set(orgId);
    if (this.currentUserId) {
      localStorage.setItem(ROLE_CACHE_KEY, JSON.stringify({ uid: this.currentUserId, org: orgId }));
    }
    if (orgChanged)
      this.features.set({});
    bookingsDb.from("organizations").select("features").eq("id", orgId).maybeSingle().then(({ data: o }) => this.features.set(o?.features ?? {}));
  }
  resolveRole(userId, force = false) {
    return __async(this, null, function* () {
      if (!force && userId && userId === this.lastResolvedUser)
        return;
      this.lastResolvedUser = userId;
      if (!userId) {
        this.currentUserId = null;
        this.orgs.set([]);
        localStorage.removeItem(ROLE_CACHE_KEY);
        this.state.set("signed-out");
        return;
      }
      this.currentUserId = userId;
      try {
        const { data, error } = yield bookingsDb.from("org_members").select("org_id, role, organizations(name, slug)").eq("user_id", userId).in("role", ["owner", "admin"]).order("role");
        if (error) {
          console.warn("[BookingsAuth] org_members error (keeping current state):", error.message);
          if (this.state() === "loading")
            this.state.set("no-access");
          return;
        }
        const orgs = (data ?? []).map((r) => {
          const o = Array.isArray(r.organizations) ? r.organizations[0] : r.organizations;
          return { id: r.org_id, role: r.role, name: o?.name ?? "Organization", slug: o?.slug ?? "" };
        });
        this.orgs.set(orgs);
        bookingsDb.from("platform_admins").select("user_id").eq("user_id", userId).maybeSingle().then(({ data: data2 }) => this.isPlatformAdmin.set(!!data2));
        if (orgs.length === 0) {
          this.orgId.set(null);
          localStorage.removeItem(ROLE_CACHE_KEY);
          this.state.set("no-access");
          return;
        }
        const cachedOrg = this.readCache(userId)?.org;
        const active = orgs.find((o) => o.id === cachedOrg)?.id ?? orgs[0].id;
        this.applyActiveOrg(active);
        this.state.set("admin");
      } catch (err) {
        if (this.state() === "loading")
          this.state.set("no-access");
      }
    });
  }
  readStoredUserId() {
    try {
      const raw = localStorage.getItem("sb-odmwjhysvvbhxytyefhv-auth-token");
      if (!raw)
        return null;
      const parsed = JSON.parse(raw);
      return parsed?.user?.id ?? parsed?.currentSession?.user?.id ?? null;
    } catch {
      return null;
    }
  }
  readCache(userId) {
    try {
      const raw = localStorage.getItem(ROLE_CACHE_KEY);
      if (!raw)
        return null;
      const c = JSON.parse(raw);
      return c?.uid === userId ? { uid: c.uid, org: c.org ?? null } : null;
    } catch {
      return null;
    }
  }
  static {
    this.\u0275fac = function BookingsAuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingsAuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BookingsAuthService, factory: _BookingsAuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  BookingsAuthService
};
//# sourceMappingURL=chunk-RCLK272Z.js.map
