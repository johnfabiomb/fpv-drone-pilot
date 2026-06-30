import {
  signal,
  ɵɵdefineInjectable
} from "./chunk-EBVVQ6Y2.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/ui/confirm/confirm.service.ts
var ConfirmService = class _ConfirmService {
  constructor() {
    this.request = signal(null);
    this.resolver = null;
    this.seq = 0;
  }
  ask(opts) {
    this.resolver?.(false);
    this.request.set(__spreadProps(__spreadValues({}, opts), { id: ++this.seq }));
    return new Promise((resolve) => {
      this.resolver = resolve;
    });
  }
  resolve(value) {
    this.resolver?.(value);
    this.resolver = null;
    this.request.set(null);
  }
  static {
    this.\u0275fac = function ConfirmService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ConfirmService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ConfirmService, factory: _ConfirmService.\u0275fac, providedIn: "root" });
  }
};

export {
  ConfirmService
};
//# sourceMappingURL=chunk-2IDKTD3Z.js.map
