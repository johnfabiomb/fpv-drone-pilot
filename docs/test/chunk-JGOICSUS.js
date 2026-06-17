import {
  Router
} from "./chunk-23WFKX7T.js";
import {
  inject,
  ɵɵdefineInjectable
} from "./chunk-YX7TN7IZ.js";

// src/app/map/core/services/navigation.service.ts
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
    } else if (backTo === "groups") {
      this.router.navigate(["/malta/groups"]);
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
//# sourceMappingURL=chunk-JGOICSUS.js.map
