import {
  haversineM
} from "./chunk-6PGXQTC4.js";
import {
  ImageGalleryComponent,
  ProviderDetailComponent,
  ShareButtonComponent
} from "./chunk-MEYSLWN5.js";
import {
  PanelShellComponent,
  providers
} from "./chunk-I6BK37O6.js";
import {
  AnalyticsService
} from "./chunk-CTBGTVWE.js";
import {
  getIsland
} from "./chunk-DLVZTOB5.js";
import {
  MapBridgeService,
  ProviderCardComponent
} from "./chunk-OFGCOCRE.js";
import {
  locations
} from "./chunk-HWLWP4H2.js";
import {
  FEATURES
} from "./chunk-D7BDNDUA.js";
import {
  takeUntilDestroyed
} from "./chunk-HRBQLXCV.js";
import {
  SeoService
} from "./chunk-3T5F7SK7.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-GZJOKFRP.js";
import {
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf,
  isPlatformBrowser
} from "./chunk-AVMQEWGR.js";
import {
  DestroyRef,
  EventEmitter,
  PLATFORM_ID,
  inject,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-PGBPO7BH.js";

// src/app/components/location-panel/location-panel.component.ts
function LocationDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 18);
    \u0275\u0275text(2, "Leave your route?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19)(4, "button", 20);
    \u0275\u0275listener("click", function LocationDetailComponent_div_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelClose());
    });
    \u0275\u0275text(5, "Stay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 21);
    \u0275\u0275listener("click", function LocationDetailComponent_div_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmClose());
    });
    \u0275\u0275text(7, "Leave");
    \u0275\u0275elementEnd()()();
  }
}
function LocationDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275element(2, "i", 24);
    \u0275\u0275text(3, " You're close to this location \u2014 are you starting your hike? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 25)(5, "button", 26);
    \u0275\u0275listener("click", function LocationDetailComponent_div_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissNearbyPrompt());
    });
    \u0275\u0275text(6, "Just exploring");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 27);
    \u0275\u0275listener("click", function LocationDetailComponent_div_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activateHikingMode());
    });
    \u0275\u0275text(8, "I'm heading there!");
    \u0275\u0275elementEnd()()();
  }
}
function LocationDetailComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275text(2, " Route active \u2014 closing will ask for confirmation\n");
    \u0275\u0275elementEnd();
  }
}
function LocationDetailComponent_div_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatTag(tag_r4));
  }
}
function LocationDetailComponent_div_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275element(1, "i", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.location == null ? null : ctx_r1.location.rating, "");
  }
}
function LocationDetailComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275template(1, LocationDetailComponent_div_4_span_1_Template, 2, 1, "span", 31)(2, LocationDetailComponent_div_4_span_2_Template, 3, 1, "span", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.location == null ? null : ctx_r1.location.tags);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.location == null ? null : ctx_r1.location.rating);
  }
}
function LocationDetailComponent_div_8_app_provider_card_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-card", 39);
    \u0275\u0275listener("selected", function LocationDetailComponent_div_8_app_provider_card_3_Template_app_provider_card_selected_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.providerSelected.emit($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275property("provider", p_r6);
  }
}
function LocationDetailComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37);
    \u0275\u0275text(2, "Exclusive deals near this spot");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, LocationDetailComponent_div_8_app_provider_card_3_Template, 1, 1, "app-provider-card", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.nearbyProviders);
  }
}
function LocationDetailComponent_div_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "i", 12);
    \u0275\u0275text(2, " Follow the route on the map above \u2014 Google Maps may take a different path. ");
    \u0275\u0275elementEnd();
  }
}
function LocationDetailComponent_div_16_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275listener("click", function LocationDetailComponent_div_16_div_4_Template_div_click_0_listener() {
      const ctx_r7 = \u0275\u0275restoreView(_r7);
      const point_r9 = ctx_r7.$implicit;
      const i_r10 = ctx_r7.index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.navigateTo(point_r9, i_r10));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4, "Opens Google Maps");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const point_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.pointLabel(point_r9, i_r10));
  }
}
function LocationDetailComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275template(1, LocationDetailComponent_div_16_div_1_Template, 3, 0, "div", 41);
    \u0275\u0275elementStart(2, "div", 42);
    \u0275\u0275text(3, "Google Maps directions");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, LocationDetailComponent_div_16_div_4_Template, 5, 1, "div", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.hasRecordedRoute());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.visibleMapPoints());
  }
}
function LocationDetailComponent_div_17_div_4_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatTag(item_r12.location.tags[0]));
  }
}
function LocationDetailComponent_div_17_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275listener("click", function LocationDetailComponent_div_17_div_4_Template_div_click_0_listener() {
      const item_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clickon(item_r12.location));
    });
    \u0275\u0275element(1, "img", 52);
    \u0275\u0275elementStart(2, "div", 53)(3, "span", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, LocationDetailComponent_div_17_div_4_span_5_Template, 2, 1, "span", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 56);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 57);
    \u0275\u0275element(9, "polyline", 58);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r12.location.img, \u0275\u0275sanitizeUrl)("alt", item_r12.location.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r12.location.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r12.location.tags == null ? null : item_r12.location.tags[0]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r12.distanceKm, " km");
  }
}
function LocationDetailComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "h4", 48);
    \u0275\u0275text(2, "Closest Spots");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49);
    \u0275\u0275template(4, LocationDetailComponent_div_17_div_4_Template, 10, 5, "div", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.closestLocations);
  }
}
var LocationDetailComponent = class _LocationDetailComponent {
  constructor() {
    this.location = null;
    this.userLat = null;
    this.userLon = null;
    this.close = new EventEmitter();
    this.explore = new EventEmitter();
    this.navRequested = new EventEmitter();
    this.providerSelected = new EventEmitter();
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.confirmingClose = false;
    this.nearbyMode = false;
    this.showNearbyPrompt = false;
    this.closestLocations = [];
    this.nearbyProviders = [];
    this.prevLocationId = null;
    this.dismissedNearby = false;
    this.router = inject(Router);
    this.activatedRoute = inject(ActivatedRoute);
    this.analyticsService = inject(AnalyticsService);
  }
  ngOnChanges() {
    const location = this.location;
    if (location && location.id !== this.prevLocationId) {
      this.prevLocationId = location.id;
      this.confirmingClose = false;
      this.nearbyMode = false;
      this.showNearbyPrompt = false;
      this.dismissedNearby = false;
      this.closestLocations = this.getClosestLocations();
      this.nearbyProviders = FEATURES.PROMOTIONS ? providers.filter((p) => p.nearLocationIds?.includes(location.id)) : [];
      if (isPlatformBrowser(this.platformId)) {
        const srcs = location.images?.length ? location.images : [location.img];
        srcs.forEach((src) => {
          new Image().src = src;
        });
      }
    }
    this.checkProximity();
  }
  get galleryImages() {
    const loc = this.location;
    if (!loc)
      return [];
    return loc.images?.length ? loc.images : [loc.img];
  }
  requestClose(onLeave) {
    this.pendingLeave = onLeave;
    if (this.nearbyMode) {
      this.confirmingClose = true;
    } else {
      this.executeLeave();
    }
  }
  confirmClose() {
    this.confirmingClose = false;
    this.executeLeave();
  }
  cancelClose() {
    this.confirmingClose = false;
    this.pendingLeave = void 0;
  }
  executeLeave() {
    if (this.pendingLeave) {
      const action = this.pendingLeave;
      this.pendingLeave = void 0;
      action();
    } else {
      this.close.emit();
    }
  }
  activateHikingMode() {
    this.nearbyMode = true;
    this.showNearbyPrompt = false;
  }
  dismissNearbyPrompt() {
    this.dismissedNearby = true;
    this.showNearbyPrompt = false;
  }
  get shareUrl() {
    if (!this.location?.id)
      return "";
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    return `${origin}/malta?locationId=${this.location.id}`;
  }
  hasRecordedRoute() {
    return (this.location?.mapPoints ?? []).some((p) => p.type === "waypoint");
  }
  visibleMapPoints() {
    return (this.location?.mapPoints ?? []).filter((p) => p.type !== "waypoint" && p.showButton !== false);
  }
  navigateTo(point, index) {
    const visible = this.visibleMapPoints();
    const prev = index > 0 ? visible[index - 1] : null;
    const mode = point.type === "parking" ? "driving" : "walking";
    let url = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lon}&travelmode=${mode}`;
    if (prev && point.type !== "destination")
      url += `&origin=${prev.lat},${prev.lon}`;
    this.analyticsService.event("navigate_to_point", { location_title: this.location?.title, point_type: point.type });
    this.navRequested.emit(url);
  }
  pointLabel(point, index) {
    const isOnly = index === 0;
    switch (point.type) {
      case "parking":
        return "\u{1F697} Drive to Parking";
      case "checkpoint":
        return "\u{1F6B6} Walk to " + (point.label ?? "Checkpoint");
      case "destination":
        return isOnly ? "\u{1F5FA}\uFE0F Get Directions" : "\u{1F6B6} Walk to " + (point.label ?? "Final Destination");
      default:
        return "\u{1F4CD} " + (point.label ?? "Get Directions");
    }
  }
  clickon(loc) {
    this.analyticsService.event("recommendation_click", { from_location: this.location?.title, to_location: loc.title });
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { locationId: loc.id } });
  }
  onExplore() {
    this.analyticsService.event("explore_malta_click", { from_location: this.location?.title });
    this.explore.emit();
  }
  formatTag(tag) {
    return tag.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }
  ngOnDestroy() {
  }
  checkProximity() {
    const location = this.location;
    if (!location || this.userLat === null || this.nearbyMode || this.dismissedNearby)
      return;
    const points = location.mapPoints?.length ? location.mapPoints : [location];
    this.showNearbyPrompt = points.some((p) => haversineM(this.userLat, this.userLon, p.lat, p.lon) <= 500);
  }
  getClosestLocations() {
    const location = this.location;
    if (!location)
      return [];
    const currentIsland = getIsland(location);
    return locations.filter((l) => l.id !== location.id && getIsland(l) === currentIsland).map((l) => ({
      location: l,
      distanceKm: (haversineM(location.lat, location.lon, l.lat, l.lon) / 1e3).toFixed(1)
    })).sort((a, b) => parseFloat(a.distanceKm) - parseFloat(b.distanceKm)).slice(0, 4);
  }
  static {
    this.\u0275fac = function LocationDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LocationDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocationDetailComponent, selectors: [["app-location-detail"]], inputs: { location: "location", userLat: "userLat", userLon: "userLon" }, outputs: { close: "close", explore: "explore", navRequested: "navRequested", providerSelected: "providerSelected" }, features: [\u0275\u0275NgOnChangesFeature], decls: 18, vars: 11, consts: [["class", "confirm-banner", 4, "ngIf"], ["class", "nearby-banner", 4, "ngIf"], ["class", "hiking-active", 4, "ngIf"], [1, "px-header"], ["class", "meta", 4, "ngIf"], [3, "src"], [1, "px-2"], [1, "description", 3, "innerHTML"], ["class", "nearby-experiences", 4, "ngIf"], [1, "actions"], [1, "actions-row"], [1, "button", 3, "click"], [1, "fa", "fa-map"], ["label", "Share", 3, "url", "shareTitle"], [1, "divider"], ["class", "nav-section", 4, "ngIf"], ["class", "closest-section", 4, "ngIf"], [1, "confirm-banner"], [1, "confirm-text"], [1, "confirm-actions"], [1, "confirm-stay", 3, "click"], [1, "confirm-leave", 3, "click"], [1, "nearby-banner"], [1, "nearby-banner__text"], [1, "fa", "fa-map-marker"], [1, "nearby-banner__actions"], [1, "nearby-btn", "nearby-btn--stay", 3, "click"], [1, "nearby-btn", "nearby-btn--start", 3, "click"], [1, "hiking-active"], [1, "fa", "fa-street-view"], [1, "meta"], ["class", "tag", 4, "ngFor", "ngForOf"], ["class", "rating", 4, "ngIf"], [1, "tag"], [1, "rating"], [1, "fa", "fa-star"], [1, "nearby-experiences"], [1, "nearby-experiences__label"], [3, "provider", "selected", 4, "ngFor", "ngForOf"], [3, "selected", "provider"], [1, "nav-section"], ["class", "route-alert", 4, "ngIf"], [1, "nav-section__label"], ["class", "button nav-btn", 3, "click", 4, "ngFor", "ngForOf"], [1, "route-alert"], [1, "button", "nav-btn", 3, "click"], [1, "nav-btn__hint"], [1, "closest-section"], [1, "closest-title"], [1, "closest-list"], ["class", "closest-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "closest-card", 3, "click"], [1, "closest-thumb", 3, "src", "alt"], [1, "closest-info"], [1, "closest-name"], ["class", "closest-tag", 4, "ngIf"], [1, "closest-dist"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "closest-arrow"], ["points", "9 18 15 12 9 6"], [1, "closest-tag"]], template: function LocationDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, LocationDetailComponent_div_0_Template, 8, 0, "div", 0)(1, LocationDetailComponent_div_1_Template, 9, 0, "div", 1)(2, LocationDetailComponent_div_2_Template, 3, 0, "div", 2);
        \u0275\u0275elementStart(3, "div", 3);
        \u0275\u0275template(4, LocationDetailComponent_div_4_Template, 3, 2, "div", 4);
        \u0275\u0275element(5, "app-image-gallery", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 6);
        \u0275\u0275element(7, "div", 7);
        \u0275\u0275template(8, LocationDetailComponent_div_8_Template, 4, 1, "div", 8);
        \u0275\u0275elementStart(9, "div", 9)(10, "div", 10)(11, "div", 11);
        \u0275\u0275listener("click", function LocationDetailComponent_Template_div_click_11_listener() {
          return ctx.onExplore();
        });
        \u0275\u0275text(12, "Explore Malta ");
        \u0275\u0275element(13, "i", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "app-share-btn", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "hr", 14);
        \u0275\u0275template(16, LocationDetailComponent_div_16_Template, 5, 2, "div", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, LocationDetailComponent_div_17_Template, 5, 1, "div", 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_8_0;
        \u0275\u0275property("ngIf", ctx.confirmingClose);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showNearbyPrompt);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.nearbyMode);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", (ctx.location == null ? null : ctx.location.tags == null ? null : ctx.location.tags.length) || (ctx.location == null ? null : ctx.location.rating));
        \u0275\u0275advance();
        \u0275\u0275property("src", ctx.galleryImages);
        \u0275\u0275advance(2);
        \u0275\u0275property("innerHTML", ctx.location == null ? null : ctx.location.description, \u0275\u0275sanitizeHtml);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.nearbyProviders.length);
        \u0275\u0275advance(6);
        \u0275\u0275property("url", ctx.shareUrl)("shareTitle", (tmp_8_0 = ctx.location == null ? null : ctx.location.title) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : "");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.visibleMapPoints().length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.closestLocations.length);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ImageGalleryComponent, ProviderCardComponent, ShareButtonComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n.confirm-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  background: #fff8ec;\n  border: 1px solid #fde68a;\n  border-radius: 10px;\n  padding: 10px 14px;\n  margin-bottom: 12px;\n}\n.confirm-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #92400e;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.confirm-stay[_ngcontent-%COMP%] {\n  height: 32px;\n  padding: 0 14px;\n  border-radius: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 500;\n  background: #f3f4f6;\n  color: #374151;\n  cursor: pointer;\n}\n.confirm-stay[_ngcontent-%COMP%]:hover {\n  background: #e5e7eb;\n}\n.confirm-leave[_ngcontent-%COMP%] {\n  height: 32px;\n  padding: 0 14px;\n  border-radius: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 500;\n  background: #F4A922;\n  color: #fff;\n  cursor: pointer;\n}\n.confirm-leave[_ngcontent-%COMP%]:hover {\n  background: #e09914;\n}\n.nearby-banner[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: 10px;\n  padding: 12px 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.nearby-banner__text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #92400e;\n  line-height: 1.45;\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n}\n.nearby-banner__text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #F4A922;\n  margin-top: 1px;\n  flex-shrink: 0;\n}\n.nearby-banner__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.nearby-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 34px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition: opacity 0.15s;\n}\n.nearby-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.nearby-btn--stay[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.nearby-btn--start[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #fff;\n}\n.hiking-active[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  color: #92400e;\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: 8px;\n  padding: 8px 12px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.hiking-active[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #F4A922;\n}\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  padding-inline: 20px;\n}\n.meta[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  color: #6b7280;\n  background: #f3f4f6;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 3px 10px;\n  letter-spacing: 0.2px;\n}\n.meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #1a1a1a;\n}\n.meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]   .fa-star[_ngcontent-%COMP%] {\n  color: #F4A922;\n  font-size: 11px;\n}\n.description[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #4b5563;\n  line-height: 1.65;\n  margin-bottom: 10px;\n}\napp-ad-banner[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.nearby-experiences[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.nearby-experiences__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: #9ca3af;\n}\n.divider[_ngcontent-%COMP%] {\n  border: none;\n  border-top: 1px solid #f3f4f6;\n  margin: 0 -20px 20px;\n}\n.actions[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  margin: 4px 0 8px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n  border-radius: 10px;\n  height: 42px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.15s, box-shadow 0.15s;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  color: #374151;\n}\n.actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);\n}\n.actions[_ngcontent-%COMP%]   .nav-btn[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: 2px !important;\n  height: auto !important;\n  padding: 10px 0 !important;\n}\n.actions[_ngcontent-%COMP%]   .nav-btn[_ngcontent-%COMP%]   .nav-btn__hint[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 400;\n  opacity: 0.55;\n}\n.actions[_ngcontent-%COMP%]   .actions-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   .actions-row[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n  padding: 0 8px;\n  min-width: 0;\n}\n.actions[_ngcontent-%COMP%]   .nav-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   .nav-section__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  color: #9ca3af;\n}\n.route-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-left: 3px solid #F4A922;\n  border-radius: 8px;\n  padding: 10px 12px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #92400e;\n  line-height: 1.45;\n}\n.route-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #F4A922;\n  margin-top: 1px;\n  flex-shrink: 0;\n}\n.closest-section[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.closest-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: #9ca3af;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  margin: 0 0 10px;\n}\n.closest-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.closest-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 12px;\n  background: #f9fafb;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\n.closest-card[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  border-color: #e5e7eb;\n}\n.closest-thumb[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 8px;\n  flex-shrink: 0;\n}\n.closest-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  min-width: 0;\n}\n.closest-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #111827;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.closest-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n}\n.closest-dist[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #F4A922;\n  flex-shrink: 0;\n}\n.closest-arrow[_ngcontent-%COMP%] {\n  color: #d1d5db;\n  flex-shrink: 0;\n}\n.px-2[_ngcontent-%COMP%] {\n  padding-top: 20px;\n  padding-inline: 20px;\n}\n.px-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n/*# sourceMappingURL=location-panel.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocationDetailComponent, { className: "LocationDetailComponent", filePath: "src/app/components/location-panel/location-panel.component.ts", lineNumber: 22 });
})();

// src/app/platform/malta-map/malta-map.component.ts
function MaltaMapComponent_app_location_detail_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-location-detail", 4);
    \u0275\u0275listener("close", function MaltaMapComponent_app_location_detail_2_Template_app_location_detail_close_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePanel());
    })("explore", function MaltaMapComponent_app_location_detail_2_Template_app_location_detail_explore_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exploreMap());
    })("navRequested", function MaltaMapComponent_app_location_detail_2_Template_app_location_detail_navRequested_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNavRequested($event));
    })("providerSelected", function MaltaMapComponent_app_location_detail_2_Template_app_location_detail_providerSelected_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openProvider($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("location", ctx_r1.selectedLocation)("userLat", ctx_r1.userLat)("userLon", ctx_r1.userLon);
  }
}
function MaltaMapComponent_app_provider_detail_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-detail", 5);
    \u0275\u0275listener("navRequested", function MaltaMapComponent_app_provider_detail_3_Template_app_provider_detail_navRequested_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNavRequested($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("provider", ctx_r1.selectedProvider);
  }
}
var MaltaMapComponent = class _MaltaMapComponent {
  constructor() {
    this.selectedLocation = null;
    this.selectedProvider = null;
    this.userLat = null;
    this.userLon = null;
    this.backTo = null;
    this.navDuration = 3;
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.document = inject(DOCUMENT);
    this.seo = inject(SeoService);
    this.bridge = inject(MapBridgeService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
  }
  get currentShareUrl() {
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    if (this.selectedProvider)
      return `${origin}/malta?provider=${this.selectedProvider.id}`;
    if (this.selectedLocation)
      return `${origin}/malta?locationId=${this.selectedLocation.id}`;
    return "";
  }
  get panelTitle() {
    if (this.selectedProvider)
      return this.selectedProvider.name;
    return this.selectedLocation?.title ?? "";
  }
  ngOnInit() {
    this.seo.setPage("map");
    this.backTo = this.route.snapshot.queryParamMap.get("backTo");
    if (!isPlatformBrowser(this.platformId))
      return;
    const params = this.route.snapshot.queryParamMap;
    const hasInitialContent = !!(params.get("locationId") || params.get("provider"));
    this.bridge.showFilterBar.set(!hasInitialContent);
    this.bridge.filters.set([]);
    this.bridge.providerPins.set([]);
    this.bridge.selectedLocation.set(null);
    this.bridge.panelOpen.set(hasInitialContent);
    this.bridge.mapOnly.set(false);
    this.bridge.interstitialProviders.set([]);
    this.bridge.pendingNavUrl.set(null);
    this.syncFloatingBackBtn();
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params2) => {
      const id = params2["provider"];
      const locId = params2["locationId"] ? parseInt(params2["locationId"], 10) : null;
      this.selectedProvider = id ? providers.find((p) => p.id === id) ?? null : null;
      if (this.selectedProvider && !this.selectedLocation) {
        this.bridge.panelOpen.set(true);
        this.bridge.openPanel();
        this.bridge.scrollToTop$.next();
      } else if (!this.selectedProvider && !this.selectedLocation && !locId) {
        this.bridge.panelOpen.set(false);
      }
      if (locId && this.selectedLocation?.id !== locId) {
        const loc = locations.find((l) => l.id === locId) ?? null;
        if (loc) {
          this.onLocationSelected(loc);
          return;
        }
      }
      this.syncFloatingBackBtn();
      this.syncFilterBar();
    });
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => this.onLocationSelected(loc));
    this.bridge.gpsCoord$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((coord) => {
      this.userLat = coord.lat;
      this.userLon = coord.lon;
    });
    this.bridge.interstitialProviderSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => this.openProvider(p));
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.backTo ? this.goBack() : this.onPanelCloseRequested());
  }
  onLocationSelected(location) {
    if (location?.id === this.selectedLocation?.id)
      return;
    this.selectedLocation = location;
    this.bridge.selectedLocation.set(location);
    if (!location) {
      this.bridge.mapOnly.set(false);
      if (!this.selectedProvider)
        this.bridge.panelOpen.set(false);
      this.seo.setPage("map");
    } else {
      this.bridge.panelOpen.set(true);
      this.seo.updateMetaData(location);
      this.bridge.panel.expand();
      this.syncInterstitialProviders();
      setTimeout(() => this.bridge.scrollToTop$.next());
    }
    this.syncFloatingBackBtn();
    this.syncFilterBar();
  }
  onNavRequested(url) {
    this.bridge.pendingNavUrl.set(url);
  }
  onPanelCloseRequested() {
    if (this.selectedProvider) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { provider: null },
        queryParamsHandling: "merge"
      });
      return;
    }
    this.revealPanelIfHidden();
    this.locationDetail?.requestClose();
  }
  openProvider(provider) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { provider: provider.id },
      queryParamsHandling: "merge"
    });
  }
  // Called via (close) from location-detail — always fires AFTER any confirmation
  closePanel() {
    this.bridge.closeLocation();
    this.bridge.mapOnly.set(false);
  }
  exploreMap() {
    const doExplore = () => {
      this.bridge.closeLocation();
      this.bridge.resetToMalta();
      this.bridge.mapOnly.set(false);
    };
    if (this.locationDetail?.nearbyMode) {
      this.revealPanelIfHidden();
      this.locationDetail.requestClose(doExplore);
    } else {
      doExplore();
    }
  }
  goBack() {
    const navigate = () => {
      if (this.backTo === "30-places-2026")
        this.router.navigate(["/malta/30-places-2026"]);
      else
        this.router.navigate(["/malta/list"]);
    };
    if (this.locationDetail?.nearbyMode) {
      this.revealPanelIfHidden();
      this.locationDetail.requestClose(navigate);
    } else {
      navigate();
    }
  }
  // Reveals the panel if mapOnly so the confirmation banner is visible to the user
  revealPanelIfHidden() {
    if (this.bridge.mapOnly())
      this.bridge.openPanel();
  }
  syncFilterBar() {
    this.bridge.showFilterBar.set(!this.bridge.panelOpen());
  }
  syncFloatingBackBtn() {
    if (this.backTo) {
      const label = this.backTo === "30-places-2026" ? "Back to list" : "Back";
      this.bridge.floatingBackBtn.set({ label, accent: true });
    } else if (this.selectedLocation || this.selectedProvider) {
      const label = this.selectedProvider ? this.selectedLocation?.title ?? "Back to map" : "Back to map";
      this.bridge.floatingBackBtn.set({ label });
    } else {
      this.bridge.floatingBackBtn.set(null);
    }
  }
  syncInterstitialProviders() {
    if (!FEATURES.PROMOTIONS || !this.selectedLocation) {
      this.bridge.interstitialProviders.set([]);
      return;
    }
    const result = providers.filter((p) => p.nearLocationIds?.includes(this.selectedLocation.id)).slice(0, 2);
    this.bridge.interstitialProviders.set(result);
    this.bridge.navDuration.set(this.navDuration);
  }
  static {
    this.\u0275fac = function MaltaMapComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MaltaMapComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaltaMapComponent, selectors: [["app-malta-map"]], viewQuery: function MaltaMapComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(LocationDetailComponent, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.locationDetail = _t.first);
      }
    }, decls: 4, vars: 6, consts: [[3, "closeRequested", "dragStart", "dragMove", "dragEnd", "toggleCollapse", "bodyDragStart", "bodyDragMove", "bodyDragEnd", "title", "minimized"], ["panelActions", "", 3, "url", "shareTitle"], [3, "location", "userLat", "userLon", "close", "explore", "navRequested", "providerSelected", 4, "ngIf"], [3, "provider", "navRequested", 4, "ngIf"], [3, "close", "explore", "navRequested", "providerSelected", "location", "userLat", "userLon"], [3, "navRequested", "provider"]], template: function MaltaMapComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function MaltaMapComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.onPanelCloseRequested();
        })("dragStart", function MaltaMapComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function MaltaMapComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function MaltaMapComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("toggleCollapse", function MaltaMapComponent_Template_app_panel_shell_toggleCollapse_0_listener() {
          return ctx.bridge.toggleMinimize();
        })("bodyDragStart", function MaltaMapComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function MaltaMapComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function MaltaMapComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275element(1, "app-share-btn", 1);
        \u0275\u0275template(2, MaltaMapComponent_app_location_detail_2_Template, 1, 3, "app-location-detail", 2)(3, MaltaMapComponent_app_provider_detail_3_Template, 1, 1, "app-provider-detail", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("title", ctx.panelTitle)("minimized", ctx.bridge.panel.minimized());
        \u0275\u0275advance();
        \u0275\u0275property("url", ctx.currentShareUrl)("shareTitle", ctx.panelTitle);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.selectedProvider);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedProvider);
      }
    }, dependencies: [CommonModule, NgIf, PanelShellComponent, LocationDetailComponent, ProviderDetailComponent, ShareButtonComponent], styles: ["\n\n/*# sourceMappingURL=malta-map.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaltaMapComponent, { className: "MaltaMapComponent", filePath: "src/app/platform/malta-map/malta-map.component.ts", lineNumber: 23 });
})();
export {
  MaltaMapComponent
};
//# sourceMappingURL=chunk-23FAL6MK.js.map
