import {
  events
} from "./chunk-S3HAMASV.js";
import {
  NavigationService
} from "./chunk-372PF7SV.js";
import {
  providers
} from "./chunk-DYEFD6F2.js";
import {
  SeoService
} from "./chunk-WFXQZ6RY.js";
import {
  getEventVenuePins,
  upcomingEvents
} from "./chunk-BU7ZDQCB.js";
import {
  getExperiencePins
} from "./chunk-ETA2JZSR.js";
import {
  MapBridgeService
} from "./chunk-USW22R6T.js";
import {
  locations
} from "./chunk-PIDQOFLT.js";
import "./chunk-5FMFH5XE.js";
import {
  takeUntilDestroyed
} from "./chunk-Q5BD35NP.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-Q6APD67I.js";
import "./chunk-GHBBMOR7.js";
import {
  DestroyRef,
  PLATFORM_ID,
  effect,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent
} from "./chunk-EBVVQ6Y2.js";
import "./chunk-TWWAJFRB.js";

// src/app/map/features/map/explore/map-explore.component.ts
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
    const allProviders = providers;
    const allEvents = upcomingEvents(events, /* @__PURE__ */ new Date());
    effect(() => {
      const layers = this.bridge.mapLayers();
      this.bridge.showGems.set(layers.gems);
      this.bridge.experiencePins.set(layers.experiences ? getExperiencePins(allProviders) : []);
      this.bridge.eventVenuePins.set(layers.events ? getEventVenuePins(allEvents) : []);
    });
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
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta/locations", loc.slug]);
    });
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MapExploreComponent, { className: "MapExploreComponent", filePath: "src/app/map/features/map/explore/map-explore.component.ts", lineNumber: 22 });
})();
export {
  MapExploreComponent
};
//# sourceMappingURL=chunk-7DQJCNNK.js.map
