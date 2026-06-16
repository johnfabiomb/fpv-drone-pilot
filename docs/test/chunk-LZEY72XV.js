import {
  ImageGalleryComponent,
  InteractionTrackingService
} from "./chunk-CI6TOYEM.js";
import {
  GroupsSectionComponent
} from "./chunk-NBJR4RRB.js";
import {
  ShareButtonComponent
} from "./chunk-3N4S2VW7.js";
import {
  ConfirmPopupComponent
} from "./chunk-6DHQSLVT.js";
import {
  AnalyticsService
} from "./chunk-JI4QVBYG.js";
import {
  FEATURES
} from "./chunk-TRSB2AWX.js";
import {
  fmtStatCount,
  getIsland,
  locationPublicStats
} from "./chunk-ZDYHF2FQ.js";
import {
  NavigationService
} from "./chunk-3XVIUE4J.js";
import {
  PanelShellComponent
} from "./chunk-TJZD2Y33.js";
import {
  ProviderCardComponent
} from "./chunk-CFTTVKJV.js";
import {
  getClosestProviders,
  getProvidersNearLocation,
  haversineKm,
  haversineM
} from "./chunk-V7N54URF.js";
import {
  providers
} from "./chunk-72UWX26Y.js";
import {
  MapBridgeService,
  takeUntilDestroyed
} from "./chunk-5VBZGDTT.js";
import "./chunk-E4ERKGY7.js";
import {
  UserDataService
} from "./chunk-BMUH7F5Q.js";
import "./chunk-HHUPO22U.js";
import "./chunk-A3YPDJEV.js";
import {
  AuthService
} from "./chunk-KHB26QZQ.js";
import "./chunk-JQO4RH2X.js";
import {
  MapPointType
} from "./chunk-IIDAMI5Y.js";
import {
  locations
} from "./chunk-QS4OYXJB.js";
import {
  SeoService
} from "./chunk-NWMV7NZP.js";
import "./chunk-K4JTNS7E.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-ZDNO6UPP.js";
import "./chunk-KJHSNOMD.js";
import "./chunk-XS6RPKEZ.js";
import {
  CommonModule,
  DOCUMENT,
  DestroyRef,
  EventEmitter,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction4,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-W3IDOWRJ.js";
import "./chunk-TWWAJFRB.js";

// src/app/map/features/locations/location-detail/location-detail.component.ts
var _c0 = (a0, a1, a2, a3) => ({ slug: a0, title: a1, lat: a2, lon: a3 });
function LocationDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2, "Leave your route?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 26)(4, "button", 27);
    \u0275\u0275listener("click", function LocationDetailComponent_div_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelClose());
    });
    \u0275\u0275text(5, "Stay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 28);
    \u0275\u0275listener("click", function LocationDetailComponent_div_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmClose());
    });
    \u0275\u0275text(7, "Leave");
    \u0275\u0275elementEnd()()();
  }
}
function LocationDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30);
    \u0275\u0275element(2, "i", 31);
    \u0275\u0275text(3, " You're close to this location \u2014 are you starting your hike? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32)(5, "button", 33);
    \u0275\u0275listener("click", function LocationDetailComponent_div_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dismissNearbyPrompt());
    });
    \u0275\u0275text(6, "Just exploring");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 34);
    \u0275\u0275listener("click", function LocationDetailComponent_div_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activateHikingMode());
    });
    \u0275\u0275text(8, "I'm heading there!");
    \u0275\u0275elementEnd()()();
  }
}
function LocationDetailComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "i", 36);
    \u0275\u0275text(2, " Route active \u2014 closing will ask for confirmation\n");
    \u0275\u0275elementEnd();
  }
}
function LocationDetailComponent_div_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatTag(tag_r5));
  }
}
function LocationDetailComponent_div_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275element(1, "i", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.location == null ? null : ctx_r2.location.rating, "");
  }
}
function LocationDetailComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275template(1, LocationDetailComponent_div_4_span_1_Template, 2, 1, "span", 38)(2, LocationDetailComponent_div_4_span_2_Template, 3, 1, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.location == null ? null : ctx_r2.location.tags);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.location == null ? null : ctx_r2.location.rating);
  }
}
function LocationDetailComponent_div_8_app_provider_card_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-card", 47);
    \u0275\u0275listener("selected", function LocationDetailComponent_div_8_app_provider_card_3_Template_app_provider_card_selected_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.providerSelected.emit($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    \u0275\u0275property("provider", p_r7);
  }
}
function LocationDetailComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44);
    \u0275\u0275text(2, "Deals near this spot");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, LocationDetailComponent_div_8_app_provider_card_3_Template, 1, 1, "app-provider-card", 45);
    \u0275\u0275elementStart(4, "a", 46);
    \u0275\u0275text(5, "See all deals \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.nearbyProviders);
  }
}
function LocationDetailComponent_app_confirm_popup_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 48);
    \u0275\u0275listener("confirmed", function LocationDetailComponent_app_confirm_popup_19_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmUnsave());
    })("cancelled", function LocationDetailComponent_app_confirm_popup_19_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmingUnsave = false);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("danger", true);
  }
}
function LocationDetailComponent_ng_container_21_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 53);
    \u0275\u0275element(2, "path", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Follow the routes on the map above \u2014 Google Maps may take different paths. ");
    \u0275\u0275elementEnd();
  }
}
function LocationDetailComponent_ng_container_21_ng_container_2_div_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const group_r9 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", group_r9.route.emoji, "\xA0");
  }
}
function LocationDetailComponent_ng_container_21_ng_container_2_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275listener("click", function LocationDetailComponent_ng_container_21_ng_container_2_div_1_div_4_Template_div_click_0_listener() {
      const ctx_r10 = \u0275\u0275restoreView(_r10);
      const point_r12 = ctx_r10.$implicit;
      const i_r13 = ctx_r10.index;
      const group_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.navigateTo(point_r12, i_r13, group_r9.points));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 60);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const point_r12 = ctx.$implicit;
    const i_r13 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.pointLabel(point_r12, i_r13));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.authService.isLoggedIn() ? "Opens Google Maps" : "Opens in 10s \xB7 sign in to skip");
  }
}
function LocationDetailComponent_ng_container_21_ng_container_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 56);
    \u0275\u0275template(2, LocationDetailComponent_ng_container_21_ng_container_2_div_1_ng_container_2_Template, 2, 1, "ng-container", 57);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, LocationDetailComponent_ng_container_21_ng_container_2_div_1_div_4_Template, 5, 2, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", group_r9.route.emoji);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", group_r9.route.label, " \u2014 Google Maps ");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", group_r9.points);
  }
}
function LocationDetailComponent_ng_container_21_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, LocationDetailComponent_ng_container_21_ng_container_2_div_1_Template, 5, 3, "div", 51);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const group_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", group_r9.points.length);
  }
}
function LocationDetailComponent_ng_container_21_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 56);
    \u0275\u0275text(2, "Final destination \u2014 Google Maps");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 59);
    \u0275\u0275listener("click", function LocationDetailComponent_ng_container_21_div_3_Template_div_click_3_listener() {
      const dest_r15 = \u0275\u0275restoreView(_r14).ngIf;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.navigateTo(dest_r15, 0));
    });
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 60);
    \u0275\u0275text(7, "Opens Google Maps");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const dest_r15 = ctx.ngIf;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.pointLabel(dest_r15, 1));
  }
}
function LocationDetailComponent_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, LocationDetailComponent_ng_container_21_div_1_Template, 4, 0, "div", 49)(2, LocationDetailComponent_ng_container_21_ng_container_2_Template, 2, 1, "ng-container", 50)(3, LocationDetailComponent_ng_container_21_div_3_Template, 8, 1, "div", 51);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.anyRouteHasRecordedRoute());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.allRoutesVisiblePoints())("ngForTrackBy", ctx_r2.trackByRouteGroup);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.sharedRouteDestination());
  }
}
function LocationDetailComponent_ng_template_22_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 53);
    \u0275\u0275element(2, "path", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Follow the route on the map above \u2014 Google Maps may take a different path. ");
    \u0275\u0275elementEnd();
  }
}
function LocationDetailComponent_ng_template_22_div_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275listener("click", function LocationDetailComponent_ng_template_22_div_0_div_4_Template_div_click_0_listener() {
      const ctx_r16 = \u0275\u0275restoreView(_r16);
      const point_r18 = ctx_r16.$implicit;
      const i_r19 = ctx_r16.index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.navigateTo(point_r18, i_r19));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 60);
    \u0275\u0275text(4, "Opens Google Maps");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const point_r18 = ctx.$implicit;
    const i_r19 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.pointLabel(point_r18, i_r19));
  }
}
function LocationDetailComponent_ng_template_22_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275template(1, LocationDetailComponent_ng_template_22_div_0_div_1_Template, 4, 0, "div", 49);
    \u0275\u0275elementStart(2, "div", 56);
    \u0275\u0275text(3, "Google Maps directions");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, LocationDetailComponent_ng_template_22_div_0_div_4_Template, 5, 1, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.hasRecordedRoute());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.visibleMapPoints());
  }
}
function LocationDetailComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, LocationDetailComponent_ng_template_22_div_0_Template, 5, 2, "div", 51);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", ctx_r2.visibleMapPoints().length);
  }
}
function LocationDetailComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "h4", 62);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 63);
    \u0275\u0275element(3, "path", 64)(4, "circle", 65)(5, "path", 66)(6, "path", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Explore Together ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "span", 68);
    \u0275\u0275text(9, "New");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(10, "app-groups-section", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("lockedLocation", \u0275\u0275pureFunction4(1, _c0, ctx_r2.location.slug, ctx_r2.location.title, ctx_r2.location.lat, ctx_r2.location.lon));
  }
}
function LocationDetailComponent_div_25_div_4_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r21 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatTag(item_r21.location.tags[0]));
  }
}
function LocationDetailComponent_div_25_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275listener("click", function LocationDetailComponent_div_25_div_4_Template_div_click_0_listener() {
      const item_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.clickon(item_r21.location));
    });
    \u0275\u0275element(1, "img", 75);
    \u0275\u0275elementStart(2, "div", 76)(3, "span", 77);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, LocationDetailComponent_div_25_div_4_span_5_Template, 2, 1, "span", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 79);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 80);
    \u0275\u0275element(9, "polyline", 81);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r21 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r21.location.img, \u0275\u0275sanitizeUrl)("alt", item_r21.location.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r21.location.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r21.location.tags[0]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r21.distanceKm, " km");
  }
}
function LocationDetailComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "h4", 71);
    \u0275\u0275text(2, "Closest Spots");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 72);
    \u0275\u0275template(4, LocationDetailComponent_div_25_div_4_Template, 10, 5, "div", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.closestLocations);
  }
}
var LocationDetailComponent = class _LocationDetailComponent {
  constructor() {
    this.location = null;
    this.userLat = null;
    this.userLon = null;
    this.activeRouteIndex = -1;
    this.close = new EventEmitter();
    this.explore = new EventEmitter();
    this.navRequested = new EventEmitter();
    this.providerSelected = new EventEmitter();
    this.userDataService = inject(UserDataService);
    this.authService = inject(AuthService);
    this.features = FEATURES;
    this.confirmingUnsave = false;
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.confirmingClose = false;
    this.nearbyMode = false;
    this.showNearbyPrompt = false;
    this.closestLocations = [];
    this.nearbyProviders = [];
    this.prevLocationId = null;
    this.dismissedNearby = false;
    this._routeGroups = [];
    this._sharedDest = null;
    this._anyRouteRecorded = false;
    this.router = inject(Router);
    this.analyticsService = inject(AnalyticsService);
  }
  get isSaved() {
    return !!this.location?.slug && this.userDataService.isLocationSaved(this.location.slug);
  }
  onSaveClick(e) {
    e.stopPropagation();
    if (!this.location?.slug)
      return;
    if (!this.authService.isLoggedIn()) {
      this.authService.openLoginModal();
      return;
    }
    if (this.isSaved) {
      this.confirmingUnsave = true;
      clearTimeout(this.unsaveTimer);
      this.unsaveTimer = setTimeout(() => {
        this.confirmingUnsave = false;
      }, 4e3);
    } else {
      this.userDataService.toggleSaveLocation(this.location.slug);
    }
  }
  confirmUnsave() {
    if (!this.location?.slug)
      return;
    clearTimeout(this.unsaveTimer);
    this.confirmingUnsave = false;
    this.userDataService.toggleSaveLocation(this.location.slug);
  }
  getActiveMapPoints() {
    const loc = this.location;
    if (!loc)
      return [];
    if (loc.routes && loc.routes.length >= 2) {
      const idx = this.activeRouteIndex >= 0 ? this.activeRouteIndex : 0;
      return loc.routes[idx]?.mapPoints ?? [];
    }
    return loc.mapPoints ?? [];
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
      if (FEATURES.PROMOTIONS) {
        const near = getProvidersNearLocation(location, providers);
        this.nearbyProviders = near.length > 0 ? near : getClosestProviders(location, providers, 2);
      } else {
        this.nearbyProviders = [];
      }
      if (isPlatformBrowser(this.platformId)) {
        const srcs = location.images?.length ? location.images : [location.img];
        srcs.forEach((src) => {
          new Image().src = src;
        });
      }
      this._routeGroups = this.buildRouteGroups();
      this._sharedDest = this.buildSharedDest();
      this._anyRouteRecorded = (location.routes ?? []).some((r) => r.mapPoints.some((p) => p.type === MapPointType.Waypoint));
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
    if (!this.location)
      return "";
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    return `${origin}/malta/locations/${this.location.slug}`;
  }
  hasRecordedRoute() {
    return this.getActiveMapPoints().some((p) => p.type === MapPointType.Waypoint);
  }
  visibleMapPoints() {
    return this.getActiveMapPoints().filter((p) => p.type !== MapPointType.Waypoint && p.showButton !== false);
  }
  allRoutesVisiblePoints() {
    return this._routeGroups;
  }
  sharedRouteDestination() {
    return this._sharedDest;
  }
  anyRouteHasRecordedRoute() {
    return this._anyRouteRecorded;
  }
  trackByRouteGroup(_i, g) {
    return g.route.label;
  }
  buildRouteGroups() {
    const loc = this.location;
    if (!loc?.routes || loc.routes.length < 2)
      return [];
    return loc.routes.map((route) => ({
      route,
      points: route.mapPoints.filter((p) => p.type !== MapPointType.Waypoint && p.type !== MapPointType.Destination && p.showButton !== false)
    })).filter((r) => r.points.length > 0);
  }
  buildSharedDest() {
    const routes = this.location?.routes;
    if (!routes || routes.length < 2)
      return null;
    return routes[0].mapPoints.find((p) => p.type === MapPointType.Destination && p.showButton !== false) ?? null;
  }
  navigateTo(point, index, pointsOverride) {
    const visible = pointsOverride ?? this.visibleMapPoints();
    const prev = index > 0 ? visible[index - 1] : null;
    const mode = point.type === MapPointType.Parking ? "driving" : "walking";
    let url = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lon}&travelmode=${mode}`;
    if (prev && point.type !== MapPointType.Destination)
      url += `&origin=${prev.lat},${prev.lon}`;
    this.analyticsService.event("navigate_to_point", { location_title: this.location?.title, point_type: point.type });
    this.navRequested.emit(url);
  }
  pointLabel(point, index) {
    const isOnly = index === 0;
    switch (point.type) {
      case MapPointType.Parking:
        return "\u{1F697} Drive to " + (point.label ?? "Parking");
      case MapPointType.Destination:
        return isOnly ? "\u{1F5FA}\uFE0F Get Directions" : "\u{1F6B6} Walk to " + (point.label ?? "Final Destination");
      default:
        return "\u{1F4CD} " + (point.label ?? "Get Directions");
    }
  }
  clickon(loc) {
    this.analyticsService.event("recommendation_click", { from_location: this.location?.title, to_location: loc.title });
    this.router.navigate(["/malta/locations", loc.slug]);
  }
  onExplore() {
    this.analyticsService.event("explore_malta_click", { from_location: this.location?.title });
    this.explore.emit();
  }
  formatTag(tag) {
    return tag.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }
  ngOnDestroy() {
    clearTimeout(this.unsaveTimer);
  }
  checkProximity() {
    const location = this.location;
    if (!location || this.userLat === null || this.nearbyMode || this.dismissedNearby)
      return;
    const active = this.getActiveMapPoints();
    const points = active.length ? active : [location];
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocationDetailComponent, selectors: [["app-location-detail"]], inputs: { location: "location", userLat: "userLat", userLon: "userLon", activeRouteIndex: "activeRouteIndex" }, outputs: { close: "close", explore: "explore", navRequested: "navRequested", providerSelected: "providerSelected" }, features: [\u0275\u0275NgOnChangesFeature], decls: 26, vars: 18, consts: [["singleRouteNav", ""], ["class", "confirm-banner", 4, "ngIf"], ["class", "nearby-banner", 4, "ngIf"], ["class", "hiking-active", 4, "ngIf"], [1, "px-header"], ["class", "meta", 4, "ngIf"], [3, "src"], [1, "px-2"], [1, "description", 3, "innerHTML"], ["class", "nearby-experiences", 4, "ngIf"], [1, "actions"], [1, "actions-row"], [1, "button", 3, "click"], [1, "fa", "fa-map"], ["label", "Share", 3, "url", "shareTitle"], [1, "save-wrap"], [1, "save-btn", 3, "click", "title"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"], ["message", "Remove from saved?", "confirmLabel", "Remove", "cancelLabel", "Keep", 3, "danger", "confirmed", "cancelled", 4, "ngIf"], [1, "divider"], [4, "ngIf", "ngIfElse"], ["class", "exploring-section", 4, "ngIf"], ["class", "closest-section", 4, "ngIf"], [1, "confirm-banner"], [1, "confirm-text"], [1, "confirm-actions"], [1, "confirm-stay", 3, "click"], [1, "confirm-leave", 3, "click"], [1, "nearby-banner"], [1, "nearby-banner__text"], [1, "fa", "fa-map-marker"], [1, "nearby-banner__actions"], [1, "nearby-btn", "nearby-btn--stay", 3, "click"], [1, "nearby-btn", "nearby-btn--start", 3, "click"], [1, "hiking-active"], [1, "fa", "fa-street-view"], [1, "meta"], ["class", "tag", 4, "ngFor", "ngForOf"], ["class", "rating", 4, "ngIf"], [1, "tag"], [1, "rating"], [1, "fa", "fa-star"], [1, "nearby-experiences"], [1, "nearby-experiences__label"], [3, "provider", "selected", 4, "ngFor", "ngForOf"], ["routerLink", "/malta/deals", 1, "nearby-experiences__all"], [3, "selected", "provider"], ["message", "Remove from saved?", "confirmLabel", "Remove", "cancelLabel", "Keep", 3, "confirmed", "cancelled", "danger"], ["class", "route-alert", 4, "ngIf"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "nav-section", 4, "ngIf"], [1, "route-alert"], ["width", "18", "height", "24", "viewBox", "0 0 24 30", "fill", "#EA4335", "xmlns", "http://www.w3.org/2000/svg", 2, "flex-shrink", "0"], ["d", "M12 0C7.58 0 4 3.58 4 8c0 5.5 8 22 8 22s8-16.5 8-22c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"], [1, "nav-section"], [1, "nav-section__label"], [4, "ngIf"], ["class", "button nav-btn", 3, "click", 4, "ngFor", "ngForOf"], [1, "button", "nav-btn", 3, "click"], [1, "nav-btn__hint"], [1, "exploring-section"], [1, "exploring-title"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "exploring-new-badge"], [3, "lockedLocation"], [1, "closest-section"], [1, "closest-title"], [1, "closest-list"], ["class", "closest-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "closest-card", 3, "click"], [1, "closest-thumb", 3, "src", "alt"], [1, "closest-info"], [1, "closest-name"], ["class", "closest-tag", 4, "ngIf"], [1, "closest-dist"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "closest-arrow"], ["points", "9 18 15 12 9 6"], [1, "closest-tag"]], template: function LocationDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275template(0, LocationDetailComponent_div_0_Template, 8, 0, "div", 1)(1, LocationDetailComponent_div_1_Template, 9, 0, "div", 2)(2, LocationDetailComponent_div_2_Template, 3, 0, "div", 3);
        \u0275\u0275elementStart(3, "div", 4);
        \u0275\u0275template(4, LocationDetailComponent_div_4_Template, 3, 2, "div", 5);
        \u0275\u0275element(5, "app-image-gallery", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 7);
        \u0275\u0275element(7, "div", 8);
        \u0275\u0275template(8, LocationDetailComponent_div_8_Template, 6, 1, "div", 9);
        \u0275\u0275elementStart(9, "div", 10)(10, "div", 11)(11, "div", 12);
        \u0275\u0275listener("click", function LocationDetailComponent_Template_div_click_11_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onExplore());
        });
        \u0275\u0275text(12, "Explore Malta ");
        \u0275\u0275element(13, "i", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "app-share-btn", 14);
        \u0275\u0275elementStart(15, "div", 15)(16, "button", 16);
        \u0275\u0275listener("click", function LocationDetailComponent_Template_button_click_16_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSaveClick($event));
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(17, "svg", 17);
        \u0275\u0275element(18, "path", 18);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(19, LocationDetailComponent_app_confirm_popup_19_Template, 1, 1, "app-confirm-popup", 19);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(20, "hr", 20);
        \u0275\u0275template(21, LocationDetailComponent_ng_container_21_Template, 4, 4, "ng-container", 21)(22, LocationDetailComponent_ng_template_22_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
        \u0275\u0275template(24, LocationDetailComponent_div_24_Template, 11, 6, "div", 22)(25, LocationDetailComponent_div_25_Template, 5, 1, "div", 23);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_9_0;
        let tmp_14_0;
        const singleRouteNav_r22 = \u0275\u0275reference(23);
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
        \u0275\u0275property("url", ctx.shareUrl)("shareTitle", (tmp_9_0 = ctx.location == null ? null : ctx.location.title) !== null && tmp_9_0 !== void 0 ? tmp_9_0 : "");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("saved", ctx.isSaved);
        \u0275\u0275property("title", ctx.isSaved ? "Remove from saved" : "Save");
        \u0275\u0275advance();
        \u0275\u0275attribute("fill", ctx.isSaved ? "currentColor" : "none");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.confirmingUnsave);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.activeRouteIndex < 0 && ((tmp_14_0 = ctx.location == null ? null : ctx.location.routes == null ? null : ctx.location.routes.length) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : 0) >= 2)("ngIfElse", singleRouteNav_r22);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.features.GROUPS && ctx.location);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.closestLocations.length);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterLink, ImageGalleryComponent, ProviderCardComponent, ShareButtonComponent, ConfirmPopupComponent, GroupsSectionComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n.confirm-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  background: #fff8ec;\n  border: 1px solid #fde68a;\n  border-radius: var(--radius-lg);\n  padding: 10px 14px;\n  margin-bottom: 12px;\n}\n.confirm-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #92400e;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.confirm-stay[_ngcontent-%COMP%] {\n  height: 32px;\n  padding: 0 14px;\n  border-radius: var(--radius-md);\n  border: none;\n  font-size: 13px;\n  font-weight: 500;\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  cursor: pointer;\n}\n.confirm-stay[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.confirm-leave[_ngcontent-%COMP%] {\n  height: 32px;\n  padding: 0 14px;\n  border-radius: var(--radius-md);\n  border: none;\n  font-size: 13px;\n  font-weight: 500;\n  background: var(--color-primary);\n  color: #fff;\n  cursor: pointer;\n}\n.confirm-leave[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n.nearby-banner[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: var(--radius-lg);\n  padding: 12px 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.nearby-banner__text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #92400e;\n  line-height: 1.45;\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n}\n.nearby-banner__text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  margin-top: 1px;\n  flex-shrink: 0;\n}\n.nearby-banner__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.nearby-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 34px;\n  border-radius: var(--radius-md);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition: opacity var(--transition);\n}\n.nearby-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.nearby-btn--stay[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n.nearby-btn--start[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n}\n.hiking-active[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  color: #92400e;\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: var(--radius-md);\n  padding: 8px 12px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.hiking-active[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  padding-inline: 20px;\n}\n.meta[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  background: var(--color-bg-muted);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 3px 10px;\n  letter-spacing: 0.2px;\n}\n.meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-base);\n}\n.meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]   .fa-star[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: 11px;\n}\n.description[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #4b5563;\n  line-height: 1.65;\n  margin-bottom: 10px;\n}\napp-ad-banner[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.nearby-experiences[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.nearby-experiences__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--color-text-light);\n}\n.nearby-experiences__all[_ngcontent-%COMP%] {\n  display: block;\n  text-align: right;\n  font-size: 0.78rem;\n  color: var(--color-text-muted);\n  padding: 2px 0;\n  text-decoration: none;\n}\n.nearby-experiences__all[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.divider[_ngcontent-%COMP%] {\n  border: none;\n  border-top: 1px solid var(--color-bg-muted);\n  margin: 0 -20px 20px;\n}\n.actions[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  margin: 4px 0 8px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n  border-radius: var(--radius-lg);\n  height: 42px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background var(--transition), box-shadow var(--transition);\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  color: var(--color-text-secondary);\n}\n.actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);\n}\n.actions[_ngcontent-%COMP%]   .save-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n}\n.actions[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  background: var(--color-bg-light);\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    color var(--transition),\n    border-color var(--transition);\n  animation: deals-pulse 2.4s ease-in-out infinite;\n}\n.actions[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.actions[_ngcontent-%COMP%]   .save-btn.saved[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.1);\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n  animation: none;\n}\n.actions[_ngcontent-%COMP%]   .nav-btn[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: 2px !important;\n  height: auto !important;\n  padding: 10px 0 !important;\n  position: relative;\n}\n.actions[_ngcontent-%COMP%]   .nav-btn[_ngcontent-%COMP%]   .nav-btn__hint[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 400;\n  opacity: 0.65;\n}\n.actions[_ngcontent-%COMP%]   .actions-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   .actions-row[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n  padding: 0 8px;\n  min-width: 0;\n}\n.actions[_ngcontent-%COMP%]   .nav-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   .nav-section__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  color: var(--color-text-light);\n}\n.route-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-left: 3px solid var(--color-primary);\n  border-radius: var(--radius-md);\n  padding: 10px 12px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #92400e;\n  line-height: 1.45;\n}\n.route-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  margin-top: 1px;\n  flex-shrink: 0;\n}\n.closest-section[_ngcontent-%COMP%] {\n  margin-top: 28px;\n  padding-top: 20px;\n  border-top: 1px solid var(--color-bg-muted);\n}\n.closest-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text-light);\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  margin: 0 0 10px;\n}\n.closest-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.closest-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 12px;\n  background: var(--color-bg-light);\n  border: 1px solid #f0f0f0;\n  border-radius: var(--radius-xl);\n  cursor: pointer;\n  transition: background var(--transition), border-color var(--transition);\n}\n.closest-card[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  border-color: var(--color-border);\n}\n.closest-thumb[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: var(--radius-md);\n  flex-shrink: 0;\n}\n.closest-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  min-width: 0;\n}\n.closest-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.closest-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--color-text-light);\n}\n.closest-dist[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.closest-arrow[_ngcontent-%COMP%] {\n  color: #d1d5db;\n  flex-shrink: 0;\n}\n.px-2[_ngcontent-%COMP%] {\n  padding-top: 20px;\n  padding-inline: 20px;\n}\n.px-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.exploring-section[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.exploring-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0 0 10px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.exploring-new-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: #fff;\n  background: var(--color-primary);\n  border-radius: 4px;\n  padding: 2px 6px;\n  animation: deals-pulse 2.4s ease-in-out infinite;\n}\n.exploring-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  text-decoration: none;\n  margin-bottom: 8px;\n  transition: box-shadow var(--transition), border-color var(--transition);\n}\n.exploring-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-sm);\n  border-color: var(--color-primary);\n}\n.exploring-card__photo[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  border: 1.5px solid var(--color-border);\n}\n.exploring-card__info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.exploring-card__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.exploring-card__meta[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n/*# sourceMappingURL=location-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocationDetailComponent, { className: "LocationDetailComponent", filePath: "src/app/map/features/locations/location-detail/location-detail.component.ts", lineNumber: 27 });
})();

// src/app/map/features/locations/location-page/location-page.component.ts
function LocationPageComponent_app_share_btn_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-share-btn", 5);
    \u0275\u0275listener("shared", function LocationPageComponent_app_share_btn_1_Template_app_share_btn_shared_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.tracking.trackLocation(ctx_r1.location.slug, "shared"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("url", ctx_r1.shareUrl)("shareTitle", ctx_r1.location.title);
  }
}
function LocationPageComponent_div_2_app_confirm_popup_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 11);
    \u0275\u0275listener("confirmed", function LocationPageComponent_div_2_app_confirm_popup_4_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmUnsave());
    })("cancelled", function LocationPageComponent_div_2_app_confirm_popup_4_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmingUnsave = false);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("danger", true);
  }
}
function LocationPageComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "button", 7);
    \u0275\u0275listener("click", function LocationPageComponent_div_2_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSaveClick($event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 8);
    \u0275\u0275element(3, "path", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, LocationPageComponent_div_2_app_confirm_popup_4_Template, 1, 1, "app-confirm-popup", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("header-save-btn--saved", ctx_r1.isSaved);
    \u0275\u0275property("title", ctx_r1.isSaved ? "Remove from saved" : "Save");
    \u0275\u0275advance();
    \u0275\u0275attribute("fill", ctx_r1.isSaved ? "currentColor" : "none");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.confirmingUnsave);
  }
}
function LocationPageComponent_div_3_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 17);
    \u0275\u0275text(2, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" You've visited ", ctx_r1.visitCount, "\xD7 ");
  }
}
function LocationPageComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 14);
    \u0275\u0275element(3, "path", 15)(4, "circle", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span", 17);
    \u0275\u0275text(7, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 18);
    \u0275\u0275element(10, "path", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(12, "span", 17);
    \u0275\u0275text(13, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 18);
    \u0275\u0275element(16, "circle", 19)(17, "circle", 20)(18, "circle", 21)(19, "line", 22)(20, "line", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, LocationPageComponent_div_3_ng_container_22_Template, 5, 1, "ng-container", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.fmt(ctx_r1.publicStats.views), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.publicStats.saves, " saves ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", ctx_r1.publicStats.shares, " shares ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.visitCount > 1);
  }
}
function LocationPageComponent_app_location_detail_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-location-detail", 26);
    \u0275\u0275listener("close", function LocationPageComponent_app_location_detail_4_Template_app_location_detail_close_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    })("explore", function LocationPageComponent_app_location_detail_4_Template_app_location_detail_explore_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    })("navRequested", function LocationPageComponent_app_location_detail_4_Template_app_location_detail_navRequested_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNavRequested($event));
    })("providerSelected", function LocationPageComponent_app_location_detail_4_Template_app_location_detail_providerSelected_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openProvider($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("location", ctx_r1.location)("userLat", ctx_r1.userLat)("userLon", ctx_r1.userLon)("activeRouteIndex", ctx_r1.bridge.activeRouteIndex());
  }
}
var LocationPageComponent = class _LocationPageComponent {
  constructor() {
    this.location = null;
    this.userLat = null;
    this.userLon = null;
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.nav = inject(NavigationService);
    this.destroyRef = inject(DestroyRef);
    this.platformId = inject(PLATFORM_ID);
    this.seo = inject(SeoService);
    this.auth = inject(AuthService);
    this.userData = inject(UserDataService);
    this.bridge = inject(MapBridgeService);
    this.tracking = inject(InteractionTrackingService);
    this.confirmingUnsave = false;
  }
  get shareUrl() {
    if (!this.location)
      return "";
    return `https://johnfabiomb.com/malta/locations/${this.location.slug}`;
  }
  get isSaved() {
    return !!this.location?.slug && this.userData.isLocationSaved(this.location.slug);
  }
  get visitCount() {
    return this.tracking.statsFor("location", this.location?.slug ?? "")?.viewCount ?? 0;
  }
  get publicStats() {
    const agg = this.tracking.aggregateStatsFor(this.location?.slug ?? "");
    if (agg)
      return { views: agg.totalViews, saves: agg.totalSaves, shares: agg.totalShares };
    return locationPublicStats(this.location?.slug ?? "");
  }
  fmt(n) {
    return fmtStatCount(n);
  }
  onSaveClick(e) {
    e.stopPropagation();
    if (!this.location?.slug)
      return;
    if (!this.auth.isLoggedIn()) {
      this.auth.openLoginModal();
      return;
    }
    if (this.isSaved) {
      this.confirmingUnsave = true;
      clearTimeout(this.unsaveTimer);
      this.unsaveTimer = setTimeout(() => {
        this.confirmingUnsave = false;
      }, 4e3);
    } else {
      this.userData.toggleSaveLocation(this.location.slug);
      this.tracking.trackLocation(this.location.slug, "saved");
    }
  }
  confirmUnsave() {
    if (!this.location?.slug)
      return;
    clearTimeout(this.unsaveTimer);
    this.confirmingUnsave = false;
    this.userData.toggleSaveLocation(this.location.slug);
  }
  dismissUnsavePopup() {
    if (this.confirmingUnsave) {
      this.confirmingUnsave = false;
      clearTimeout(this.unsaveTimer);
    }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.navigateBack());
      this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => this.router.navigate(["/malta/providers", p.id], {
        queryParams: this.buildProviderParams()
      }));
      this.bridge.gpsCoord$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((coord) => {
        this.userLat = coord.lat;
        this.userLon = coord.lon;
        this.syncInterstitialProviders();
      });
      this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
        if (loc)
          this.router.navigate(["/malta/locations", loc.slug]);
      });
    }
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => this.loadLocation(params.get("slug") ?? ""));
  }
  loadLocation(slug) {
    const numId = parseInt(slug, 10);
    this.location = isNaN(numId) ? locations.find((l) => l.slug === slug) ?? null : locations.find((l) => l.id === numId) ?? null;
    if (!this.location) {
      this.router.navigate(["/malta"]);
      return;
    }
    if (!isNaN(numId)) {
      this.router.navigate(["/malta/locations", this.location.slug], { replaceUrl: true, queryParamsHandling: "preserve" });
      return;
    }
    this.seo.updateMetaData(this.location);
    if (!isPlatformBrowser(this.platformId))
      return;
    void this.userData.awardXp("location_viewed", this.location.slug);
    this.tracking.trackLocation(this.location.slug, "viewed");
    this.bridge.enterLocationMode(this.location, this.resolveBackBtn());
    this.syncInterstitialProviders();
  }
  onClose() {
    this.navigateBack();
  }
  onNavRequested(url) {
    if (this.auth.isLoggedIn()) {
      if (isPlatformBrowser(this.platformId))
        window.open(url, "_blank");
      return;
    }
    this.bridge.navDuration.set(10);
    this.bridge.pendingNavUrl.set(url);
  }
  openProvider(provider) {
    this.router.navigate(["/malta/providers", provider.id], {
      queryParams: this.buildProviderParams()
    });
  }
  buildProviderParams() {
    const params = {
      fromLocation: this.location.slug,
      backTo: "location"
    };
    const upstream = this.route.snapshot.queryParamMap.get("backTo");
    if (upstream)
      params["locationBackTo"] = upstream;
    return params;
  }
  navigateBack() {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
  resolveBackBtn() {
    const backTo = this.route.snapshot.queryParamMap.get("backTo");
    if (backTo === "30-places-2026")
      return { label: "Back to list", accent: true };
    if (backTo === "list")
      return { label: "Back", accent: true };
    return { label: "Back" };
  }
  syncInterstitialProviders() {
    if (!FEATURES.PROMOTIONS || !this.location) {
      this.bridge.interstitialProviders.set([]);
      this.bridge.interstitialLabel.set(null);
      this.bridge.providerPins.set(providers.filter((p) => p.showOnMap && p.lat && p.lon));
      return;
    }
    const loc = this.location;
    const all = providers;
    const nearSpot = getProvidersNearLocation(loc, all);
    if (nearSpot.length > 0) {
      this.bridge.interstitialProviders.set(nearSpot.slice(0, 2));
      this.bridge.interstitialLabel.set(null);
    } else if (this.userLat !== null && this.userLon !== null) {
      const nearUser = all.filter((p) => p.lat && p.lon).sort((a, b) => haversineKm(this.userLat, this.userLon, a.lat, a.lon) - haversineKm(this.userLat, this.userLon, b.lat, b.lon));
      this.bridge.interstitialProviders.set(nearUser.slice(0, 2));
      this.bridge.interstitialLabel.set(nearUser.length > 0 ? "Near you" : null);
    } else {
      this.bridge.interstitialProviders.set([]);
      this.bridge.interstitialLabel.set(null);
    }
    this.bridge.navDuration.set(3);
    this.bridge.providerPins.set(all.filter((p) => p.showOnMap && p.lat && p.lon));
  }
  static {
    this.\u0275fac = function LocationPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LocationPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocationPageComponent, selectors: [["app-location-page"]], hostBindings: function LocationPageComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function LocationPageComponent_click_HostBindingHandler() {
          return ctx.dismissUnsavePopup();
        }, false, \u0275\u0275resolveDocument);
      }
    }, decls: 5, vars: 5, consts: [[3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd", "title"], ["panelActions", "", 3, "url", "shareTitle", "shared", 4, "ngIf"], ["panelActions", "", "class", "save-wrap", 4, "ngIf"], ["class", "lp-stats-bar", 4, "ngIf"], [3, "location", "userLat", "userLon", "activeRouteIndex", "close", "explore", "navRequested", "providerSelected", 4, "ngIf"], ["panelActions", "", 3, "shared", "url", "shareTitle"], ["panelActions", "", 1, "save-wrap"], [1, "header-save-btn", 3, "click", "title"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"], ["message", "Remove from saved?", "confirmLabel", "Remove", "cancelLabel", "Keep", 3, "danger", "confirmed", "cancelled", 4, "ngIf"], ["message", "Remove from saved?", "confirmLabel", "Remove", "cancelLabel", "Keep", 3, "confirmed", "cancelled", "danger"], [1, "lp-stats-bar"], [1, "lp-stats-bar__item"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], [1, "lp-stats-bar__sep"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], [4, "ngIf"], [1, "lp-stats-bar__item", "lp-stats-bar__item--personal"], [3, "close", "explore", "navRequested", "providerSelected", "location", "userLat", "userLon", "activeRouteIndex"]], template: function LocationPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function LocationPageComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.onClose();
        })("dragStart", function LocationPageComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function LocationPageComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function LocationPageComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function LocationPageComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function LocationPageComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function LocationPageComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275template(1, LocationPageComponent_app_share_btn_1_Template, 1, 2, "app-share-btn", 1)(2, LocationPageComponent_div_2_Template, 5, 5, "div", 2)(3, LocationPageComponent_div_3_Template, 23, 4, "div", 3)(4, LocationPageComponent_app_location_detail_4_Template, 1, 4, "app-location-detail", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275property("title", (tmp_0_0 = ctx.location == null ? null : ctx.location.title) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : "");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.location);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.location);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.location);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.location);
      }
    }, dependencies: [CommonModule, NgIf, PanelShellComponent, LocationDetailComponent, ShareButtonComponent, ConfirmPopupComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: contents;\n}\n.header-save-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: var(--radius-md);\n  background: var(--color-bg-muted);\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background var(--transition), color var(--transition);\n  color: var(--color-text-muted);\n  animation: deals-pulse 2.4s ease-in-out infinite;\n}\n.header-save-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.header-save-btn--saved[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.12);\n  color: var(--color-primary);\n  animation: none;\n}\n.header-save-btn--saved[_ngcontent-%COMP%]:hover {\n  background: rgba(244, 169, 34, 0.2);\n}\n.lp-stats-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 4px 6px;\n  padding: 6px 16px;\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n  background: var(--color-bg-light);\n  border-bottom: 1px solid var(--color-border);\n}\n.lp-stats-bar__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.lp-stats-bar__item--personal[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 500;\n}\n.lp-stats-bar__sep[_ngcontent-%COMP%] {\n  color: var(--color-border);\n}\n.save-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n/*# sourceMappingURL=location-page.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocationPageComponent, { className: "LocationPageComponent", filePath: "src/app/map/features/locations/location-page/location-page.component.ts", lineNumber: 164 });
})();
export {
  LocationPageComponent
};
//# sourceMappingURL=chunk-LZEY72XV.js.map
