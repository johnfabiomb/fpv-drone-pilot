import {
  signal,
  ɵɵdefineInjectable
} from "./chunk-YX7TN7IZ.js";

// src/app/booking/ui/toast/toast.service.ts
var ToastService = class _ToastService {
  constructor() {
    this._toasts = signal([]);
    this.toasts = this._toasts.asReadonly();
    this.seq = 0;
  }
  show(message, type = "info", durationMs = 3800) {
    const id = ++this.seq;
    this._toasts.update((list) => [...list, { id, type, message }]);
    if (durationMs > 0)
      setTimeout(() => this.dismiss(id), durationMs);
  }
  success(message, durationMs) {
    this.show(message, "success", durationMs);
  }
  error(message, durationMs = 5200) {
    this.show(message, "error", durationMs);
  }
  info(message, durationMs) {
    this.show(message, "info", durationMs);
  }
  dismiss(id) {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }
  static {
    this.\u0275fac = function ToastService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
  }
};

export {
  ToastService
};
//# sourceMappingURL=chunk-WE6LBMFD.js.map
