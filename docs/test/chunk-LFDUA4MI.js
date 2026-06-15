import {
  FEATURES
} from "./chunk-TRSB2AWX.js";
import {
  FILTER_OPTIONS,
  difficultyColor,
  getIslandLabel,
  matchesFilter,
  normalizeForSearch
} from "./chunk-ZDYHF2FQ.js";
import {
  locations
} from "./chunk-QS4OYXJB.js";
import {
  PanelShellComponent
} from "./chunk-TJZD2Y33.js";
import {
  ProviderCardComponent
} from "./chunk-CFTTVKJV.js";
import {
  haversineKm,
  isDiscountValid
} from "./chunk-V7N54URF.js";
import {
  providers
} from "./chunk-72UWX26Y.js";
import {
  MapBridgeService,
  takeUntilDestroyed
} from "./chunk-5VBZGDTT.js";
import "./chunk-IIDAMI5Y.js";
import {
  SeoService
} from "./chunk-NWMV7NZP.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-K4JTNS7E.js";
import {
  Router
} from "./chunk-ZDNO6UPP.js";
import "./chunk-KJHSNOMD.js";
import {
  CommonModule,
  DestroyRef,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  computed,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-W3IDOWRJ.js";
import "./chunk-TWWAJFRB.js";

// src/app/map/features/map/list/location-list.component.ts
function LocationListComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function LocationListComponent_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.searchQuery.set(""));
    });
    \u0275\u0275element(1, "i", 18);
    \u0275\u0275elementEnd();
  }
}
function LocationListComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275listener("click", function LocationListComponent_div_17_Template_div_click_0_listener() {
      const f_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleFilter(f_r4.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("chip--deals", f_r4.id === "deals")("active", ctx_r1.activeFilter() === f_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", f_r4.emoji, " ", f_r4.label, " ");
  }
}
function LocationListComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275listener("click", function LocationListComponent_div_19_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.browseDeals());
    });
    \u0275\u0275elementStart(1, "div", 21)(2, "span", 22);
    \u0275\u0275text(3, "\u{1F3F7}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 23);
    \u0275\u0275text(6, "Local Deals");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 25);
    \u0275\u0275text(10, " View all ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 26);
    \u0275\u0275element(12, "line", 27)(13, "polyline", 28);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("Tours, stays, dining & more \xB7 ", ctx_r1.allProviders.length, " offers");
  }
}
function LocationListComponent_ng_container_20_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2B50 ", item_r7.data.rating, "");
  }
}
function LocationListComponent_ng_container_20_div_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.islandLabel(item_r7.data));
  }
}
function LocationListComponent_ng_container_20_div_1_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "hidden gem");
    \u0275\u0275elementEnd();
  }
}
function LocationListComponent_ng_container_20_div_1_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F4CD} ", item_r7.distance, " ");
  }
}
function LocationListComponent_ng_container_20_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275listener("click", function LocationListComponent_ng_container_20_div_1_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openLocation(item_r7.data));
    });
    \u0275\u0275element(1, "img", 32);
    \u0275\u0275elementStart(2, "div", 33)(3, "div", 34)(4, "span", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, LocationListComponent_ng_container_20_div_1_span_6_Template, 2, 1, "span", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 37)(8, "span", 38);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, LocationListComponent_ng_container_20_div_1_span_10_Template, 2, 1, "span", 39)(11, LocationListComponent_ng_container_20_div_1_span_11_Template, 2, 0, "span", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, LocationListComponent_ng_container_20_div_1_div_12_Template, 2, 1, "div", 41);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r7.data.img, \u0275\u0275sanitizeUrl)("alt", item_r7.data.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r7.data.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r7.data.rating);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", ctx_r1.difficultyColor(item_r7.data.difficulty));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.data.difficulty);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.islandLabel(item_r7.data));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r7.data.hidden);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r7.distance);
  }
}
function LocationListComponent_ng_container_20_app_provider_card_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-card", 46);
    \u0275\u0275listener("selected", function LocationListComponent_ng_container_20_app_provider_card_2_Template_app_provider_card_selected_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openProvider($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("provider", item_r7.data);
  }
}
function LocationListComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, LocationListComponent_ng_container_20_div_1_Template, 13, 10, "div", 29)(2, LocationListComponent_ng_container_20_app_provider_card_2_Template, 1, 1, "app-provider-card", 30);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r7.type === "location");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r7.type === "provider");
  }
}
function LocationListComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeFilter() === "deals" ? "No deals available yet." : "No locations match the selected filters.", " ");
  }
}
var LocationListComponent = class _LocationListComponent {
  constructor() {
    this.allLocations = locations;
    this.allProviders = providers;
    this.mapProviders = providers.filter((p) => p.showOnMap && p.lat && p.lon);
    this.FEATURES = FEATURES;
    this.filters = FEATURES.PROMOTIONS ? FILTER_OPTIONS : FILTER_OPTIONS.filter((f) => f.id !== "deals");
    this.activeFilter = signal(null);
    this.sortMode = signal("rating");
    this.searchQuery = signal("");
    this.searchFocused = signal(false);
    this.userLat = signal(null);
    this.userLon = signal(null);
    this.hasGps = computed(() => this.userLat() !== null);
    this.activeProviders = computed(() => this.allProviders.filter((p) => !p.discount || isDiscountValid(p.discount)));
    this.dealLocationIds = computed(() => new Set(this.activeProviders().flatMap((p) => p.nearLocationIds ?? [])));
    this.filteredLocations = computed(() => {
      const q = normalizeForSearch(this.searchQuery().trim());
      const activeFilter = this.activeFilter();
      const lat = this.userLat();
      const lon = this.userLon();
      const mode = this.sortMode();
      const dealIds = this.dealLocationIds();
      let list = activeFilter === null ? [...this.allLocations] : this.allLocations.filter((loc) => matchesFilter(loc, activeFilter, { dealLocationIds: dealIds }));
      if (q)
        list = list.filter((loc) => normalizeForSearch(loc.title).includes(q));
      if (mode === "distance" && lat !== null) {
        return list.map((loc) => ({ loc, dist: haversineKm(lat, lon, loc.lat, loc.lon) })).sort((a, b) => a.dist - b.dist).map((x) => x.loc);
      }
      if (mode === "rating")
        return list.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      return list.slice().sort((a, b) => a.title.localeCompare(b.title));
    });
    this.displayList = computed(() => {
      const locs = this.filteredLocations();
      const lat = this.userLat();
      const lon = this.userLon();
      if (this.activeFilter() === "deals") {
        return this.activeProviders().map((p) => ({ type: "provider", data: p }));
      }
      const toItem = (loc) => {
        let distance = null;
        if (lat !== null) {
          const km = haversineKm(lat, lon, loc.lat, loc.lon);
          distance = km < 1 ? `${Math.round(km * 1e3)} m away` : `${km.toFixed(1)} km away`;
        }
        return { type: "location", data: loc, distance };
      };
      if (!FEATURES.PROMOTIONS || this.allProviders.length === 0) {
        return locs.map(toItem);
      }
      const result = [];
      let pi = 0;
      for (let i = 0; i < locs.length; i++) {
        result.push(toItem(locs[i]));
        if ((i + 1) % 4 === 0) {
          result.push({ type: "provider", data: this.allProviders[pi % this.allProviders.length] });
          pi++;
        }
      }
      return result;
    });
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.router = inject(Router);
    this.seo = inject(SeoService);
    this.bridge = inject(MapBridgeService);
  }
  ngOnInit() {
    this.seo.setPage("list");
    if (!isPlatformBrowser(this.platformId))
      return;
    this.bridge.enterPanelMode(this.mapProviders);
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta/locations", loc.slug], { queryParams: { backTo: "list" } });
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.userLat.set(pos.coords.latitude);
        this.userLon.set(pos.coords.longitude);
        if (this.sortMode() === "rating")
          this.sortMode.set("distance");
      }, () => {
      }, { maximumAge: 6e4, timeout: 1e4 });
    }
  }
  toggleFilter(id) {
    this.activeFilter.update((current) => current === id ? null : id);
  }
  setSort(mode) {
    this.sortMode.set(mode);
  }
  islandLabel(loc) {
    return getIslandLabel(loc);
  }
  difficultyColor(difficulty) {
    return difficultyColor(difficulty);
  }
  openLocation(loc) {
    this.router.navigate(["/malta/locations", loc.slug], { queryParams: { backTo: "list" } });
  }
  openProvider(provider) {
    this.router.navigate(["/malta/providers", provider.id]);
  }
  browseDeals() {
    this.router.navigate(["/malta/deals"], { queryParams: { backTo: "list" } });
  }
  goToMap() {
    this.router.navigate(["/malta"]);
  }
  static {
    this.\u0275fac = function LocationListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LocationListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocationListComponent, selectors: [["app-location-list"]], decls: 22, vars: 16, consts: [["title", "Browse Locations", 3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd"], ["panelActions", "", 1, "list-count"], [1, "controls"], [1, "search-row"], [1, "search-wrap"], [1, "fa", "fa-search", "search-icon"], ["type", "search", "placeholder", "Search locations\u2026", "autocomplete", "off", 1, "search-input", 3, "ngModelChange", "focus", "blur", "ngModel"], ["class", "search-clear", 3, "click", 4, "ngIf"], [1, "sort-inline"], [1, "sort-btn", 3, "click", "disabled"], [1, "sort-btn", 3, "click"], [1, "filter-chips"], ["class", "chip", 3, "chip--deals", "active", "click", 4, "ngFor", "ngForOf"], [1, "location-list"], ["class", "deals-banner", 3, "click", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["class", "empty", 4, "ngIf"], [1, "search-clear", 3, "click"], [1, "fa", "fa-times"], [1, "chip", 3, "click"], [1, "deals-banner", 3, "click"], [1, "deals-banner__left"], [1, "deals-banner__icon"], [1, "deals-banner__title"], [1, "deals-banner__sub"], [1, "deals-banner__cta"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"], ["class", "loc-card", 3, "click", 4, "ngIf"], [3, "provider", "selected", 4, "ngIf"], [1, "loc-card", 3, "click"], ["loading", "lazy", 1, "loc-thumb", 3, "src", "alt"], [1, "loc-info"], [1, "loc-top"], [1, "loc-title"], ["class", "loc-rating", 4, "ngIf"], [1, "loc-badges"], [1, "badge"], ["class", "badge badge--island", 4, "ngIf"], ["class", "badge badge--hidden", 4, "ngIf"], ["class", "loc-distance", 4, "ngIf"], [1, "loc-rating"], [1, "badge", "badge--island"], [1, "badge", "badge--hidden"], [1, "loc-distance"], [3, "selected", "provider"], [1, "empty"]], template: function LocationListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function LocationListComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.goToMap();
        })("dragStart", function LocationListComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function LocationListComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function LocationListComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function LocationListComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function LocationListComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function LocationListComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275elementStart(1, "span", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "div", 4);
        \u0275\u0275element(6, "i", 5);
        \u0275\u0275elementStart(7, "input", 6);
        \u0275\u0275listener("ngModelChange", function LocationListComponent_Template_input_ngModelChange_7_listener($event) {
          return ctx.searchQuery.set($event);
        })("focus", function LocationListComponent_Template_input_focus_7_listener() {
          return ctx.searchFocused.set(true);
        })("blur", function LocationListComponent_Template_input_blur_7_listener() {
          return ctx.searchFocused.set(false);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, LocationListComponent_button_8_Template, 2, 0, "button", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 8)(10, "button", 9);
        \u0275\u0275listener("click", function LocationListComponent_Template_button_click_10_listener() {
          return ctx.setSort("distance");
        });
        \u0275\u0275text(11, " \u{1F4CD} ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 10);
        \u0275\u0275listener("click", function LocationListComponent_Template_button_click_12_listener() {
          return ctx.setSort("rating");
        });
        \u0275\u0275text(13, " \u2B50 ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "button", 10);
        \u0275\u0275listener("click", function LocationListComponent_Template_button_click_14_listener() {
          return ctx.setSort("alpha");
        });
        \u0275\u0275text(15, " A\u2013Z ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "div", 11);
        \u0275\u0275template(17, LocationListComponent_div_17_Template, 2, 6, "div", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 13);
        \u0275\u0275template(19, LocationListComponent_div_19_Template, 14, 1, "div", 14)(20, LocationListComponent_ng_container_20_Template, 3, 2, "ng-container", 15)(21, LocationListComponent_div_21_Template, 2, 1, "div", 16);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.activeFilter() === "deals" ? ctx.allProviders.length : ctx.filteredLocations().length);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("search-row--focused", ctx.searchFocused());
        \u0275\u0275advance(3);
        \u0275\u0275property("ngModel", ctx.searchQuery());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchQuery());
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.sortMode() === "distance");
        \u0275\u0275property("disabled", !ctx.hasGps());
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.sortMode() === "rating");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.sortMode() === "alpha");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.filters);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.FEATURES.PROMOTIONS !== false && ctx.activeFilter() !== "deals");
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.displayList());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.displayList().length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, PanelShellComponent, ProviderCardComponent], styles: ["\n\n.list-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #fff;\n  background: var(--color-primary);\n  border-radius: var(--radius-sm);\n  padding: 2px 10px;\n  flex-shrink: 0;\n}\n.controls[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 5;\n  background: var(--color-bg);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  padding: 10px 0 8px;\n}\n.search-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0 16px 8px;\n}\n.search-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  flex: 1;\n  min-width: 0;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  color: var(--color-text-light);\n  font-size: 13px;\n  pointer-events: none;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 38px;\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg-muted);\n  padding: 0 36px 0 34px;\n  font-size: 14px;\n  color: var(--color-text-base);\n  outline: none;\n  transition: border-color var(--transition), background var(--transition);\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-text-light);\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  background: var(--color-bg);\n}\n.search-input[_ngcontent-%COMP%]::-webkit-search-cancel-button {\n  display: none;\n}\n.search-clear[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  width: 20px;\n  height: 20px;\n  border-radius: var(--radius-sm);\n  border: none;\n  background: #d1d5db;\n  color: #fff;\n  font-size: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n}\n.search-clear[_ngcontent-%COMP%]:hover {\n  background: var(--color-text-light);\n}\n.sort-inline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n  max-width: 120px;\n  opacity: 1;\n  overflow: hidden;\n  transition: max-width 0.25s ease, opacity 0.2s ease;\n}\n.search-row--focused[_ngcontent-%COMP%]   .sort-inline[_ngcontent-%COMP%] {\n  max-width: 0;\n  opacity: 0;\n  pointer-events: none;\n}\n.filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  padding: 0 16px 8px;\n  overflow-x: auto;\n  scrollbar-width: none;\n}\n.filter-chips[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.sort-btn[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: 15px;\n  font-weight: 500;\n  padding: 0;\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg-muted);\n  color: #4b5563;\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    color var(--transition),\n    box-shadow var(--transition);\n}\n.sort-btn[_ngcontent-%COMP%]:hover {\n  background: #dde0e5;\n  color: var(--color-text-base);\n}\n.sort-btn.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: #fff;\n  font-weight: 600;\n  box-shadow: 0 2px 8px var(--color-primary-shadow);\n}\n.sort-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.deals-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 12px 14px;\n  background:\n    linear-gradient(\n      135deg,\n      #fffbeb 0%,\n      #fef3c7 100%);\n  border: 1.5px solid var(--color-primary);\n  border-radius: var(--radius-xl);\n  cursor: pointer;\n  transition: box-shadow var(--transition), transform var(--transition);\n}\n.deals-banner[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n@media (hover: hover) {\n  .deals-banner[_ngcontent-%COMP%]:hover {\n    box-shadow: 0 4px 16px var(--color-primary-shadow);\n  }\n}\n.deals-banner__left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.deals-banner__icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.deals-banner__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #92400e;\n}\n.deals-banner__sub[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #b45309;\n  margin-top: 2px;\n}\n.deals-banner__cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-primary);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.location-list[_ngcontent-%COMP%] {\n  padding: 8px 12px 80px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.loc-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  background: var(--color-bg);\n  border-radius: var(--radius-lg);\n  padding: 10px;\n  cursor: pointer;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: box-shadow var(--transition), transform var(--transition);\n}\n.loc-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n@media (hover: hover) {\n  .loc-card[_ngcontent-%COMP%]:hover {\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n    transform: translateY(-1px);\n  }\n}\n.loc-thumb[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: var(--radius-md);\n  object-fit: cover;\n  flex-shrink: 0;\n  background: var(--color-border);\n}\n.loc-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.loc-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n}\n.loc-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  line-height: 1.3;\n}\n.loc-rating[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.loc-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.loc-distance[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--color-text-muted);\n  font-weight: 500;\n}\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--color-text-light);\n  font-size: 14px;\n  padding: 48px 0;\n}\n/*# sourceMappingURL=location-list.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocationListComponent, { className: "LocationListComponent", filePath: "src/app/map/features/map/list/location-list.component.ts", lineNumber: 30 });
})();
export {
  LocationListComponent
};
//# sourceMappingURL=chunk-LFDUA4MI.js.map
