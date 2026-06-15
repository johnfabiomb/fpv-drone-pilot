import {
  bookingsDb
} from "./chunk-QQIZI4YX.js";
import {
  computed,
  signal,
  ɵɵdefineInjectable
} from "./chunk-W3IDOWRJ.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/core/services/booking-org.service.ts
var ORG_SLUG = "johnfabiomb";
var BookingOrgService = class _BookingOrgService {
  constructor() {
    this._data = signal(null);
    this.data = this._data.asReadonly();
    this.org = computed(() => this._data()?.org ?? null);
    this.services = computed(() => this._data()?.services ?? []);
    this.inflight = null;
    this.loadedSlug = null;
  }
  /** Loads (and caches) the org + services + workers for a slug. Re-fetches if the slug changes. */
  load() {
    return __async(this, arguments, function* (slug = ORG_SLUG) {
      if (this._data() && this.loadedSlug === slug)
        return this._data();
      if (this.inflight && this.loadedSlug === slug)
        return this.inflight;
      this.loadedSlug = slug;
      this.inflight = (() => __async(this, null, function* () {
        const { data, error } = yield bookingsDb.functions.invoke("get-org-booking", { body: { slug } });
        if (error || !data || data.error) {
          this._data.set(null);
          return null;
        }
        this._data.set(data);
        return data;
      }))();
      const res = yield this.inflight;
      this.inflight = null;
      return res;
    });
  }
  serviceById(id) {
    return this.services().find((s) => s.id === id) ?? null;
  }
  static {
    this.\u0275fac = function BookingOrgService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingOrgService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BookingOrgService, factory: _BookingOrgService.\u0275fac, providedIn: "root" });
  }
};

export {
  BookingOrgService
};
//# sourceMappingURL=chunk-XH7FL5WJ.js.map
