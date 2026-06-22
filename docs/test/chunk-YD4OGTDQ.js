import {
  bookingsDb
} from "./chunk-Y4O5MVSK.js";
import {
  ɵɵdefineInjectable
} from "./chunk-P56CFEJA.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/core/services/availability.service.ts
var AvailabilityService = class _AvailabilityService {
  getAvailability(staffId, serviceId, from, to) {
    return __async(this, null, function* () {
      const { data, error } = yield bookingsDb.functions.invoke("get-availability", {
        body: { staffId, serviceId, from, to }
      });
      if (error)
        throw error;
      if (!data)
        throw new Error("No availability returned");
      return data;
    });
  }
  static {
    this.\u0275fac = function AvailabilityService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AvailabilityService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AvailabilityService, factory: _AvailabilityService.\u0275fac, providedIn: "root" });
  }
};

export {
  AvailabilityService
};
//# sourceMappingURL=chunk-YD4OGTDQ.js.map
