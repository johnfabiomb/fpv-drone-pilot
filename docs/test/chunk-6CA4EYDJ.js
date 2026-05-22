import {
  Router
} from "./chunk-GBUZQIWY.js";
import {
  inject,
  ɵɵdefineInjectable
} from "./chunk-DMXQYC6T.js";

// src/app/shared/services/navigation.service.ts
var NavigationService = class _NavigationService {
  constructor() {
    this.router = inject(Router);
  }
  back(params) {
    const backTo = params.get("backTo");
    if (backTo === "30-places-2026") {
      this.router.navigate(["/malta/30-places-2026"]);
    } else if (backTo === "list") {
      this.router.navigate(["/malta/list"]);
    } else if (backTo === "location") {
      const fromLocation = params.get("fromLocation");
      const locationBackTo = params.get("locationBackTo");
      this.router.navigate(fromLocation ? ["/malta/locations", fromLocation] : ["/malta"], locationBackTo ? { queryParams: { backTo: locationBackTo } } : {});
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
//# sourceMappingURL=chunk-6CA4EYDJ.js.map
