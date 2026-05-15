import {
  ImageGalleryComponent,
  NavInterstitialComponent,
  PanelShellComponent,
  ProviderDetailComponent,
  ShareButtonComponent,
  takeUntilDestroyed
} from "./chunk-4YFLQSXN.js";
import {
  ProviderCardComponent,
  providers
} from "./chunk-B2WVATZD.js";
import {
  AnalyticsService,
  ComponentsModule,
  FilterBarComponent,
  FooterComponent,
  MapComponent
} from "./chunk-OQY75EMK.js";
import {
  FEATURES
} from "./chunk-D7BDNDUA.js";
import {
  locations
} from "./chunk-6GHA6ZUF.js";
import {
  SeoService
} from "./chunk-2GPRS4FM.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-Q62LWOG6.js";
import {
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf,
  isPlatformBrowser
} from "./chunk-URSMAVCK.js";
import {
  DestroyRef,
  EventEmitter,
  PLATFORM_ID,
  inject,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-H2WNOMV3.js";
import "./chunk-TXDUYLVM.js";

// src/app/components/location-panel/location-panel.component.ts
var _c0 = (a0) => [a0];
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
    \u0275\u0275textInterpolate1(" ", ctx_r1.location.rating, "");
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
  constructor(router, activatedRoute, analyticsService) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.analyticsService = analyticsService;
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
  }
  ngOnChanges() {
    if (this.location && this.location.id !== this.prevLocationId) {
      this.prevLocationId = this.location.id;
      this.confirmingClose = false;
      this.nearbyMode = false;
      this.showNearbyPrompt = false;
      this.dismissedNearby = false;
      this.closestLocations = this.getClosestLocations();
      this.nearbyProviders = FEATURES.PROMOTIONS ? providers.filter((p) => p.nearLocationIds?.includes(this.location.id)) : [];
    }
    this.checkProximity();
  }
  requestClose() {
    if (this.nearbyMode) {
      this.confirmingClose = true;
    } else {
      this.close.emit();
    }
  }
  confirmClose() {
    this.confirmingClose = false;
    this.close.emit();
  }
  cancelClose() {
    this.confirmingClose = false;
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
    if (!loc?.id)
      return;
    this.analyticsService.event("recommendation_click", { from_location: this.location?.title, to_location: loc?.title });
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
    if (!this.location || this.userLat === null || this.nearbyMode || this.dismissedNearby)
      return;
    const target = this.location.mapPoints?.[0] ?? this.location;
    this.showNearbyPrompt = this.haversineM(this.userLat, this.userLon, target.lat, target.lon) <= 500;
  }
  haversineM(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  getIsland(loc) {
    const tags = loc.tags ?? [];
    if (tags.includes("comino"))
      return "comino";
    if (tags.includes("gozo"))
      return "gozo";
    return "malta";
  }
  getClosestLocations() {
    if (!this.location)
      return [];
    const currentIsland = this.getIsland(this.location);
    return locations.filter((l) => l.id !== this.location.id && this.getIsland(l) === currentIsland).map((l) => ({
      location: l,
      distanceKm: (this.haversineM(this.location.lat, this.location.lon, l.lat, l.lon) / 1e3).toFixed(1)
    })).sort((a, b) => parseFloat(a.distanceKm) - parseFloat(b.distanceKm)).slice(0, 4);
  }
  static {
    this.\u0275fac = function LocationDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LocationDetailComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(AnalyticsService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocationDetailComponent, selectors: [["app-location-detail"]], inputs: { location: "location", userLat: "userLat", userLon: "userLon" }, outputs: { close: "close", explore: "explore", navRequested: "navRequested", providerSelected: "providerSelected" }, features: [\u0275\u0275NgOnChangesFeature], decls: 18, vars: 13, consts: [["class", "confirm-banner", 4, "ngIf"], ["class", "nearby-banner", 4, "ngIf"], ["class", "hiking-active", 4, "ngIf"], [1, "px-header"], ["class", "meta", 4, "ngIf"], [3, "src"], [1, "px-2"], [1, "description", 3, "innerHTML"], ["class", "nearby-experiences", 4, "ngIf"], [1, "actions"], [1, "actions-row"], [1, "button", 3, "click"], [1, "fa", "fa-map"], ["label", "Share", 3, "url", "shareTitle"], [1, "divider"], ["class", "nav-section", 4, "ngIf"], ["class", "closest-section", 4, "ngIf"], [1, "confirm-banner"], [1, "confirm-text"], [1, "confirm-actions"], [1, "confirm-stay", 3, "click"], [1, "confirm-leave", 3, "click"], [1, "nearby-banner"], [1, "nearby-banner__text"], [1, "fa", "fa-map-marker"], [1, "nearby-banner__actions"], [1, "nearby-btn", "nearby-btn--stay", 3, "click"], [1, "nearby-btn", "nearby-btn--start", 3, "click"], [1, "hiking-active"], [1, "fa", "fa-street-view"], [1, "meta"], ["class", "tag", 4, "ngFor", "ngForOf"], ["class", "rating", 4, "ngIf"], [1, "tag"], [1, "rating"], [1, "fa", "fa-star"], [1, "nearby-experiences"], [1, "nearby-experiences__label"], [3, "provider", "selected", 4, "ngFor", "ngForOf"], [3, "selected", "provider"], [1, "nav-section"], ["class", "route-alert", 4, "ngIf"], [1, "nav-section__label"], ["class", "button nav-btn", 3, "click", 4, "ngFor", "ngForOf"], [1, "route-alert"], [1, "button", "nav-btn", 3, "click"], [1, "nav-btn__hint"], [1, "closest-section"], [1, "closest-title"], [1, "closest-list"], ["class", "closest-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "closest-card", 3, "click"], [1, "closest-thumb", 3, "src", "alt"], [1, "closest-info"], [1, "closest-name"], ["class", "closest-tag", 4, "ngIf"], [1, "closest-dist"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "closest-arrow"], ["points", "9 18 15 12 9 6"], [1, "closest-tag"]], template: function LocationDetailComponent_Template(rf, ctx) {
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
        \u0275\u0275property("src", (ctx.location == null ? null : ctx.location.images == null ? null : ctx.location.images.length) ? ctx.location.images : \u0275\u0275pureFunction1(11, _c0, ctx.location == null ? null : ctx.location.img));
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
    }, dependencies: [CommonModule, NgForOf, NgIf, ImageGalleryComponent, ProviderCardComponent, ShareButtonComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n.confirm-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  background: #fff8ec;\n  border: 1px solid #fde68a;\n  border-radius: 10px;\n  padding: 10px 14px;\n  margin-bottom: 12px;\n}\n.confirm-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #92400e;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.confirm-stay[_ngcontent-%COMP%] {\n  height: 32px;\n  padding: 0 14px;\n  border-radius: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 500;\n  background: #f3f4f6;\n  color: #374151;\n  cursor: pointer;\n}\n.confirm-stay[_ngcontent-%COMP%]:hover {\n  background: #e5e7eb;\n}\n.confirm-leave[_ngcontent-%COMP%] {\n  height: 32px;\n  padding: 0 14px;\n  border-radius: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 500;\n  background: #F4A922;\n  color: #fff;\n  cursor: pointer;\n}\n.confirm-leave[_ngcontent-%COMP%]:hover {\n  background: #e09914;\n}\n.nearby-banner[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: 10px;\n  padding: 12px 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.nearby-banner__text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #92400e;\n  line-height: 1.45;\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n}\n.nearby-banner__text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #F4A922;\n  margin-top: 1px;\n  flex-shrink: 0;\n}\n.nearby-banner__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.nearby-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 34px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition: opacity 0.15s;\n}\n.nearby-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.nearby-btn--stay[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.nearby-btn--start[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #fff;\n}\n.hiking-active[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  color: #92400e;\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: 8px;\n  padding: 8px 12px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.hiking-active[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #F4A922;\n}\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.meta[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  color: #6b7280;\n  background: #f3f4f6;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 3px 10px;\n  letter-spacing: 0.2px;\n}\n.meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #1a1a1a;\n}\n.meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]   .fa-star[_ngcontent-%COMP%] {\n  color: #F4A922;\n  font-size: 11px;\n}\n.description[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #4b5563;\n  line-height: 1.65;\n  margin-bottom: 0;\n}\napp-ad-banner[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.nearby-experiences[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.nearby-experiences__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: #9ca3af;\n}\n.divider[_ngcontent-%COMP%] {\n  border: none;\n  border-top: 1px solid #f3f4f6;\n  margin: 0 -20px 20px;\n}\n.actions[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  margin: 4px 0 8px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n  border-radius: 10px;\n  height: 42px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.15s, box-shadow 0.15s;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  color: #374151;\n}\n.actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);\n}\n.actions[_ngcontent-%COMP%]   .nav-btn[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: 2px !important;\n  height: auto !important;\n  padding: 10px 0 !important;\n}\n.actions[_ngcontent-%COMP%]   .nav-btn[_ngcontent-%COMP%]   .nav-btn__hint[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 400;\n  opacity: 0.55;\n}\n.actions[_ngcontent-%COMP%]   .actions-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   .actions-row[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n  padding: 0 8px;\n  min-width: 0;\n}\n.actions[_ngcontent-%COMP%]   .nav-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   .nav-section__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  color: #9ca3af;\n}\n.route-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-left: 3px solid #F4A922;\n  border-radius: 8px;\n  padding: 10px 12px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #92400e;\n  line-height: 1.45;\n}\n.route-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #F4A922;\n  margin-top: 1px;\n  flex-shrink: 0;\n}\n.closest-section[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.closest-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: #9ca3af;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  margin: 0 0 10px;\n}\n.closest-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.closest-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 12px;\n  background: #f9fafb;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\n.closest-card[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  border-color: #e5e7eb;\n}\n.closest-thumb[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 8px;\n  flex-shrink: 0;\n}\n.closest-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  min-width: 0;\n}\n.closest-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #111827;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.closest-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n}\n.closest-dist[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #F4A922;\n  flex-shrink: 0;\n}\n.closest-arrow[_ngcontent-%COMP%] {\n  color: #d1d5db;\n  flex-shrink: 0;\n}\n.px-2[_ngcontent-%COMP%] {\n  padding-top: 20px;\n  padding-inline: 20px;\n}\n.px-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n/*# sourceMappingURL=location-panel.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocationDetailComponent, { className: "LocationDetailComponent", filePath: "src/app/components/location-panel/location-panel.component.ts", lineNumber: 19 });
})();

// src/app/platform/malta-map/malta-map.component.ts
var _c02 = ["panelWrap"];
function MaltaMapComponent_app_nav_interstitial_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-nav-interstitial", 12);
    \u0275\u0275listener("providerSelected", function MaltaMapComponent_app_nav_interstitial_0_Template_app_nav_interstitial_providerSelected_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.openProvider($event);
      return \u0275\u0275resetView(ctx_r1.pendingNavUrl = null);
    })("closed", function MaltaMapComponent_app_nav_interstitial_0_Template_app_nav_interstitial_closed_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pendingNavUrl = null);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("url", ctx_r1.pendingNavUrl)("duration", ctx_r1.navDuration)("providers", ctx_r1.interstitialProviders);
  }
}
function MaltaMapComponent_app_filter_bar_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-filter-bar", 13);
    \u0275\u0275listener("filterChange", function MaltaMapComponent_app_filter_bar_4_Template_app_filter_bar_filterChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeFilters = $event);
    });
    \u0275\u0275elementEnd();
  }
}
function MaltaMapComponent_app_map_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-map", 14);
    \u0275\u0275listener("locationSelected", function MaltaMapComponent_app_map_5_Template_app_map_locationSelected_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onLocationSelected($event));
    })("mapTapped", function MaltaMapComponent_app_map_5_Template_app_map_mapTapped_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onMapTapped());
    })("gpsCoord", function MaltaMapComponent_app_map_5_Template_app_map_gpsCoord_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onGpsUpdate($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("activeFilters", ctx_r1.activeFilters)("selectedLocation", ctx_r1.selectedLocation);
  }
}
function MaltaMapComponent_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function MaltaMapComponent_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPanelCloseRequested());
    });
    \u0275\u0275element(1, "i", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedProvider ? (tmp_1_0 = ctx_r1.selectedLocation == null ? null : ctx_r1.selectedLocation.title) !== null && tmp_1_0 !== void 0 ? tmp_1_0 : "Back to map" : "Back to map", " ");
  }
}
function MaltaMapComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function MaltaMapComponent_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275element(1, "i", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.backTo === "30-places-2026" ? "Back to list" : "Back", " ");
  }
}
function MaltaMapComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function MaltaMapComponent_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mapOnly = false);
    });
    \u0275\u0275element(1, "i", 19);
    \u0275\u0275elementEnd();
  }
}
function MaltaMapComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "span", 21);
    \u0275\u0275text(2, " Offline \u2014 cached map active ");
    \u0275\u0275elementEnd();
  }
}
function MaltaMapComponent_div_10_app_location_detail_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-location-detail", 29);
    \u0275\u0275listener("close", function MaltaMapComponent_div_10_app_location_detail_6_Template_app_location_detail_close_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closePanel());
    })("explore", function MaltaMapComponent_div_10_app_location_detail_6_Template_app_location_detail_explore_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.exploreMap());
    })("navRequested", function MaltaMapComponent_div_10_app_location_detail_6_Template_app_location_detail_navRequested_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onNavRequested($event));
    })("providerSelected", function MaltaMapComponent_div_10_app_location_detail_6_Template_app_location_detail_providerSelected_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openProvider($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("location", ctx_r1.selectedLocation)("userLat", ctx_r1.userLat)("userLon", ctx_r1.userLon);
  }
}
function MaltaMapComponent_div_10_app_provider_detail_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-detail", 30);
    \u0275\u0275listener("navRequested", function MaltaMapComponent_div_10_app_provider_detail_7_Template_app_provider_detail_navRequested_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onNavRequested($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("provider", ctx_r1.selectedProvider);
  }
}
function MaltaMapComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22, 0)(2, "button", 23);
    \u0275\u0275listener("click", function MaltaMapComponent_div_10_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mapOnly = true);
    });
    \u0275\u0275element(3, "i", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-panel-shell", 25);
    \u0275\u0275listener("closeRequested", function MaltaMapComponent_div_10_Template_app_panel_shell_closeRequested_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPanelCloseRequested());
    })("dragStart", function MaltaMapComponent_div_10_Template_app_panel_shell_dragStart_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragStart($event));
    })("dragMove", function MaltaMapComponent_div_10_Template_app_panel_shell_dragMove_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragMove($event));
    })("dragEnd", function MaltaMapComponent_div_10_Template_app_panel_shell_dragEnd_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragEnd($event));
    })("toggleCollapse", function MaltaMapComponent_div_10_Template_app_panel_shell_toggleCollapse_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelMinimized ? ctx_r1.expandPanel() : ctx_r1.minimizePanel());
    });
    \u0275\u0275element(5, "app-share-btn", 26);
    \u0275\u0275template(6, MaltaMapComponent_div_10_app_location_detail_6_Template, 1, 3, "app-location-detail", 27)(7, MaltaMapComponent_div_10_app_provider_detail_7_Template, 1, 1, "app-provider-detail", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("title", ctx_r1.panelTitle)("minimized", ctx_r1.panelMinimized);
    \u0275\u0275advance();
    \u0275\u0275property("url", ctx_r1.currentShareUrl)("shareTitle", ctx_r1.panelTitle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.selectedProvider);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedProvider);
  }
}
var PANEL_MIN_H = 80;
var PANEL_EXPANDED_VH = 0.6;
var MaltaMapComponent = class _MaltaMapComponent {
  get interstitialProviders() {
    if (!FEATURES.PROMOTIONS || !this.selectedLocation)
      return [];
    return providers.filter((p) => p.nearLocationIds?.includes(this.selectedLocation.id)).slice(0, 2);
  }
  get currentShareUrl() {
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    if (this.selectedProvider)
      return `${origin}/malta?provider=${this.selectedProvider.id}`;
    if (this.selectedLocation)
      return `${origin}/malta?locationId=${this.selectedLocation.id}`;
    return "";
  }
  constructor(seo, route, router) {
    this.seo = seo;
    this.route = route;
    this.router = router;
    this.map = true;
    this.selectedLocation = null;
    this.selectedProvider = null;
    this.mapOnly = false;
    this.isOnline = true;
    this.panelMinimized = false;
    this.userLat = null;
    this.userLon = null;
    this.activeFilters = [];
    this.backTo = null;
    this.pendingNavUrl = null;
    this.navDuration = 3;
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.document = inject(DOCUMENT);
    this.isDragging = false;
    this.dragStartY = 0;
    this.dragBaseHeight = 0;
  }
  ngOnInit() {
    this.seo.setPage("map");
    this.backTo = this.route.snapshot.queryParamMap.get("backTo");
    if (isPlatformBrowser(this.platformId))
      this.isOnline = navigator.onLine;
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params["provider"];
      this.selectedProvider = id ? providers.find((p) => p.id === id) ?? null : null;
      if (this.selectedProvider && !this.selectedLocation) {
        this.mapOnly = false;
        this.panelMinimized = false;
        setTimeout(() => {
          this.panelWrap?.nativeElement?.scrollTo({ top: 0 });
          this.applyPanelHeight(this.expandedHeight());
          this.mapComp?.updateSize();
        });
      }
    });
  }
  get panelTitle() {
    if (this.selectedProvider)
      return this.selectedProvider.name;
    return this.selectedLocation?.title ?? "";
  }
  goBack() {
    if (this.backTo === "30-places-2026")
      this.router.navigate(["/malta/30-places-2026"]);
    else
      this.router.navigate(["/malta/list"]);
  }
  onOnline() {
    this.isOnline = true;
  }
  onOffline() {
    this.isOnline = false;
  }
  openProvider(provider) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { provider: provider.id },
      queryParamsHandling: "merge"
    });
  }
  onLocationSelected(location) {
    this.selectedLocation = location;
    if (!location) {
      this.mapOnly = false;
      this.panelMinimized = false;
      this.seo.setPage("map");
    } else {
      this.seo.updateMetaData(location);
      this.panelMinimized = false;
      setTimeout(() => {
        this.panelWrap?.nativeElement.scrollTo({ top: 0 });
        this.applyPanelHeight(this.expandedHeight());
        this.mapComp?.updateSize();
        this.mapComp?.refitRoute();
      });
    }
  }
  onGpsUpdate(coord) {
    this.userLat = coord.lat;
    this.userLon = coord.lon;
  }
  onMapTapped() {
    if (window.innerWidth > 768)
      return;
    if (!this.selectedLocation && !this.selectedProvider || this.mapOnly)
      return;
    this.minimizePanel();
  }
  onNavRequested(url) {
    this.pendingNavUrl = url;
  }
  /** Shell close button pressed — navigate back through the panel stack. */
  onPanelCloseRequested() {
    if (this.selectedProvider) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { provider: null },
        queryParamsHandling: "merge"
      });
    } else {
      this.locationDetail?.requestClose();
    }
  }
  closePanel() {
    this.mapComp.closeLocation();
    this.mapOnly = false;
    this.panelMinimized = false;
  }
  exploreMap() {
    this.mapComp.closeLocation();
    this.mapComp.resetToMalta();
    this.mapOnly = false;
    this.panelMinimized = false;
  }
  // ── Drag handlers ──────────────────────────────────────────────────────────
  onDragStart(e) {
    if (window.innerWidth > 768)
      return;
    this.isDragging = true;
    this.dragStartY = e.touches[0].clientY;
    this.dragBaseHeight = this.panelWrap?.nativeElement.offsetHeight ?? this.expandedHeight();
    const el = this.panelWrap?.nativeElement;
    if (el)
      el.style.transition = "none";
  }
  onDragMove(e) {
    if (!this.isDragging)
      return;
    const dy = e.touches[0].clientY - this.dragStartY;
    const newH = Math.min(Math.max(this.dragBaseHeight - dy, PANEL_MIN_H), this.expandedHeight());
    this.applyPanelHeight(newH, false);
    this.mapComp?.updateSize();
  }
  onDragEnd(_e) {
    if (!this.isDragging)
      return;
    this.isDragging = false;
    const currentH = this.panelWrap?.nativeElement.offsetHeight ?? this.expandedHeight();
    if (currentH < (this.expandedHeight() + PANEL_MIN_H) / 2) {
      this.minimizePanel();
    } else {
      this.expandPanel();
    }
  }
  expandPanel() {
    this.panelMinimized = false;
    this.applyPanelHeight(this.expandedHeight());
    setTimeout(() => {
      this.mapComp?.updateSize();
      this.mapComp?.refitRoute();
    }, 300);
  }
  minimizePanel() {
    this.panelMinimized = true;
    this.applyPanelHeight(PANEL_MIN_H);
    setTimeout(() => {
      this.mapComp?.updateSize();
      this.mapComp?.refitRoute();
    }, 300);
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  expandedHeight() {
    return Math.round(window.innerHeight * PANEL_EXPANDED_VH);
  }
  applyPanelHeight(h, animated = true) {
    const el = this.panelWrap?.nativeElement;
    if (!el)
      return;
    if (window.innerWidth > 768) {
      el.style.transition = "";
      el.style.height = "";
      return;
    }
    el.style.transition = animated ? "height 0.28s cubic-bezier(0.4, 0, 0.2, 1)" : "none";
    el.style.height = `${h}px`;
  }
  static {
    this.\u0275fac = function MaltaMapComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MaltaMapComponent)(\u0275\u0275directiveInject(SeoService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaltaMapComponent, selectors: [["app-malta-map"]], viewQuery: function MaltaMapComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MapComponent, 5);
        \u0275\u0275viewQuery(LocationDetailComponent, 5);
        \u0275\u0275viewQuery(_c02, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapComp = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.locationDetail = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panelWrap = _t.first);
      }
    }, hostBindings: function MaltaMapComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("online", function MaltaMapComponent_online_HostBindingHandler() {
          return ctx.onOnline();
        }, false, \u0275\u0275resolveWindow)("offline", function MaltaMapComponent_offline_HostBindingHandler() {
          return ctx.onOffline();
        }, false, \u0275\u0275resolveWindow);
      }
    }, decls: 12, vars: 8, consts: [["panelWrap", ""], [3, "url", "duration", "providers", "providerSelected", "closed", 4, "ngIf"], [1, "app"], [1, "main-area"], [1, "map-wrap"], [3, "filterChange", 4, "ngIf"], [3, "activeFilters", "selectedLocation", "locationSelected", "mapTapped", "gpsCoord", 4, "ngIf"], ["class", "floating-back-btn", 3, "click", 4, "ngIf"], ["class", "floating-back-btn floating-back-btn--trend", 3, "click", 4, "ngIf"], ["class", "show-panel-btn", "title", "Show details", 3, "click", 4, "ngIf"], ["class", "offline-pill", 4, "ngIf"], ["class", "location-panel-wrap", 4, "ngIf"], [3, "providerSelected", "closed", "url", "duration", "providers"], [3, "filterChange"], [3, "locationSelected", "mapTapped", "gpsCoord", "activeFilters", "selectedLocation"], [1, "floating-back-btn", 3, "click"], [1, "fa", "fa-chevron-left"], [1, "floating-back-btn", "floating-back-btn--trend", 3, "click"], ["title", "Show details", 1, "show-panel-btn", 3, "click"], [1, "fa", "fa-info-circle"], [1, "offline-pill"], [1, "offline-dot"], [1, "location-panel-wrap"], ["title", "Fullscreen map", 1, "collapse-btn", 3, "click"], [1, "fa", "fa-chevron-right"], [3, "closeRequested", "dragStart", "dragMove", "dragEnd", "toggleCollapse", "title", "minimized"], ["panelActions", "", 3, "url", "shareTitle"], [3, "location", "userLat", "userLon", "close", "explore", "navRequested", "providerSelected", 4, "ngIf"], [3, "provider", "navRequested", 4, "ngIf"], [3, "close", "explore", "navRequested", "providerSelected", "location", "userLat", "userLon"], [3, "navRequested", "provider"]], template: function MaltaMapComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MaltaMapComponent_app_nav_interstitial_0_Template, 1, 3, "app-nav-interstitial", 1);
        \u0275\u0275elementStart(1, "div", 2)(2, "div", 3)(3, "div", 4);
        \u0275\u0275template(4, MaltaMapComponent_app_filter_bar_4_Template, 1, 0, "app-filter-bar", 5)(5, MaltaMapComponent_app_map_5_Template, 1, 2, "app-map", 6)(6, MaltaMapComponent_button_6_Template, 3, 1, "button", 7)(7, MaltaMapComponent_button_7_Template, 3, 1, "button", 8)(8, MaltaMapComponent_button_8_Template, 2, 0, "button", 9)(9, MaltaMapComponent_div_9_Template, 3, 0, "div", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, MaltaMapComponent_div_10_Template, 8, 6, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275element(11, "app-footer");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.pendingNavUrl);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", !ctx.selectedLocation && !ctx.backTo);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.map);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (ctx.selectedLocation || ctx.selectedProvider) && !ctx.mapOnly && !ctx.backTo);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.backTo);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (ctx.selectedLocation || ctx.selectedProvider) && ctx.mapOnly);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isOnline);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (ctx.selectedLocation || ctx.selectedProvider) && !ctx.mapOnly);
      }
    }, dependencies: [CommonModule, NgIf, ComponentsModule, MapComponent, FooterComponent, FilterBarComponent, PanelShellComponent, LocationDetailComponent, ProviderDetailComponent, NavInterstitialComponent, ShareButtonComponent], styles: ["\n\n.app[_ngcontent-%COMP%] {\n  height: 100dvh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: row;\n  overflow: hidden;\n  position: relative;\n}\n.map-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\napp-filter-bar[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 10;\n  pointer-events: auto;\n  max-width: calc(100vw - 24px);\n  width: max-content;\n}\n.location-panel-wrap[_ngcontent-%COMP%] {\n  width: 380px;\n  height: 100%;\n  flex-shrink: 0;\n  overflow-y: auto;\n  background: #fff;\n  border-left: 1px solid #e5e7eb;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.collapse-btn[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (min-width: 769px) {\n  .collapse-btn[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: absolute;\n    top: 14px;\n    left: -14px;\n    width: 28px;\n    height: 28px;\n    border-radius: 50% 0 0 50%;\n    background: #fff;\n    border: 1px solid #e5e7eb;\n    border-right: none;\n    cursor: pointer;\n    color: #9ca3af;\n    font-size: 11px;\n    box-shadow: -2px 1px 6px rgba(0, 0, 0, 0.08);\n    transition: color 0.15s;\n    z-index: 5;\n  }\n  .collapse-btn[_ngcontent-%COMP%]:hover {\n    color: #374151;\n  }\n}\n.show-panel-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 8px;\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  background: #fff;\n  border: none;\n  cursor: pointer;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #555;\n  font-size: 15px;\n  z-index: 10;\n  transition: background 0.15s, color 0.15s;\n}\n.show-panel-btn[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n  color: #111;\n}\n.floating-back-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 20;\n  background: #fff;\n  border: none;\n  border-radius: 10px;\n  padding: 9px 18px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #374151;\n  cursor: pointer;\n  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.14);\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  white-space: nowrap;\n  transition: box-shadow 0.15s, background 0.15s;\n}\n.floating-back-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n}\n.floating-back-btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);\n}\n.floating-back-btn--trend[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #fff;\n  box-shadow: 0 2px 14px rgba(244, 169, 34, 0.35);\n}\n.floating-back-btn--trend[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n}\n.floating-back-btn--trend[_ngcontent-%COMP%]:hover {\n  background: #e09a1a;\n  box-shadow: 0 4px 20px rgba(244, 169, 34, 0.45);\n}\n.offline-pill[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 25px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 10;\n  background: rgba(30, 30, 30, 0.88);\n  color: #fff;\n  font-size: 12px;\n  font-weight: 500;\n  padding: 6px 14px;\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  white-space: nowrap;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  pointer-events: none;\n}\n.offline-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #f87171;\n  flex-shrink: 0;\n}\n@media (max-width: 768px) {\n  .main-area[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .map-wrap[_ngcontent-%COMP%] {\n    position: relative;\n    flex: 1;\n    min-height: 0;\n    width: 100%;\n    height: auto;\n  }\n  .location-panel-wrap[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 60vh;\n    flex-shrink: 0;\n    position: relative;\n    margin-top: -20px;\n    z-index: 300;\n    border-left: none;\n    border-top: none;\n    border-radius: 14px 14px 0 0;\n    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.12);\n    will-change: height;\n    overflow-y: auto;\n    overflow-x: hidden;\n  }\n  .show-panel-btn[_ngcontent-%COMP%] {\n    bottom: 16px;\n    top: auto;\n    right: 12px;\n  }\n}\n/*# sourceMappingURL=malta-map.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaltaMapComponent, { className: "MaltaMapComponent", filePath: "src/app/platform/malta-map/malta-map.component.ts", lineNumber: 26 });
})();
export {
  MaltaMapComponent
};
//# sourceMappingURL=chunk-4HM463TY.js.map
