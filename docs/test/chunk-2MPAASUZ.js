import {
  Router
} from "./chunk-GBUZQIWY.js";
import {
  Location,
  inject,
  ɵɵdefineInjectable
} from "./chunk-DMXQYC6T.js";

// src/app/shared/services/navigation.service.ts
var NavigationService = class _NavigationService {
  constructor() {
    this.router = inject(Router);
    this.location = inject(Location);
  }
  /**
   * Resolves the correct back destination from query params, falling back to
   * browser history when available, or /malta when the page was opened directly.
   */
  back(params) {
    const backTo = params.get("backTo");
    const fromLocation = params.get("fromLocation");
    if (fromLocation) {
      this.router.navigate(["/malta/locations", fromLocation]);
    } else if (backTo === "30-places-2026") {
      this.router.navigate(["/malta/30-places-2026"]);
    } else if (backTo === "list") {
      this.router.navigate(["/malta/list"]);
    } else if (backTo === "deals") {
      this.router.navigate(["/malta/deals"]);
    } else if ((window.history.state?.navigationId ?? 1) > 1) {
      this.location.back();
    } else {
      this.router.navigate(["/malta"]);
    }
  }
  static {
    this.\u0275fac = function NavigationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavigationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NavigationService, factory: _NavigationService.\u0275fac, providedIn: "root" });
  }
};

export {
  NavigationService
};
//# sourceMappingURL=chunk-2MPAASUZ.js.map
