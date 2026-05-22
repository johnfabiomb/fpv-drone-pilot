import {
  NavigationService
} from "./chunk-6CA4EYDJ.js";
import {
  providers
} from "./chunk-IVYH72XF.js";
import {
  SeoService
} from "./chunk-NO2KK3DI.js";
import {
  MapBridgeService
} from "./chunk-QQNN6TR7.js";
import {
  locations
} from "./chunk-BGN3ADSP.js";
import {
  takeUntilDestroyed
} from "./chunk-XNG4FTY2.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-GBUZQIWY.js";
import "./chunk-2O5DCFN6.js";
import {
  DestroyRef,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent
} from "./chunk-DMXQYC6T.js";

// src/app/platform/map-explore/map-explore.component.ts
var MapExploreComponent = class _MapExploreComponent {
  constructor() {
    this.mapProviders = providers.filter((p) => p.showOnMap && p.lat && p.lon);
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.seo = inject(SeoService);
    this.bridge = inject(MapBridgeService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.nav = inject(NavigationService);
  }
  ngOnInit() {
    this.seo.setPage("map");
    if (!isPlatformBrowser(this.platformId))
      return;
    const params = this.route.snapshot.queryParamMap;
    const locId = params.get("locationId") ? parseInt(params.get("locationId"), 10) : null;
    const title = params.get("title");
    const backTo = params.get("backTo");
    if (locId) {
      const loc = locations.find((l) => l.id === locId) ?? null;
      if (loc) {
        const queryParams = backTo ? { backTo } : {};
        this.router.navigate(["/malta/locations", loc.slug], { replaceUrl: true, queryParams });
        return;
      }
    }
    if (title) {
      const loc = locations.find((l) => encodeURIComponent(l.title) === title || encodeURIComponent(l.title.replace(" ", "-")) === title) ?? null;
      if (loc) {
        const queryParams = backTo ? { backTo } : {};
        this.router.navigate(["/malta/locations", loc.slug], { replaceUrl: true, queryParams });
        return;
      }
    }
    this.bridge.enterExploreMode(this.mapProviders, this.resolveBackBtn(backTo));
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.nav.back(params));
    this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => this.router.navigate(["/malta/providers", p.id]));
    this.bridge.interstitialProviderSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => this.router.navigate(["/malta/providers", p.id]));
  }
  resolveBackBtn(backTo) {
    if (backTo === "30-places-2026")
      return { label: "Back to list", accent: true };
    if (backTo === "list")
      return { label: "Back", accent: true };
    return null;
  }
  static {
    this.\u0275fac = function MapExploreComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapExploreComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MapExploreComponent, selectors: [["app-map-explore"]], decls: 0, vars: 0, template: function MapExploreComponent_Template(rf, ctx) {
    }, styles: ["\n\n/*# sourceMappingURL=map-explore.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MapExploreComponent, { className: "MapExploreComponent", filePath: "src/app/platform/map-explore/map-explore.component.ts", lineNumber: 19 });
})();
export {
  MapExploreComponent
};
//# sourceMappingURL=chunk-5RZC3NXV.js.map
