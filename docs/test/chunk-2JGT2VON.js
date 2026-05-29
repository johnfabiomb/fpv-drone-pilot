import {
  PanelShellComponent
} from "./chunk-HNZ54JIB.js";
import {
  difficultyColor,
  getIslandLabel
} from "./chunk-WSUVHV4Q.js";
import {
  UserDataService
} from "./chunk-6LXICVCO.js";
import {
  AuthService
} from "./chunk-3P7EVM2E.js";
import {
  locations
} from "./chunk-ZGA5L2H3.js";
import {
  MapBridgeService
} from "./chunk-A5AJB22R.js";
import {
  takeUntilDestroyed
} from "./chunk-KCTK3G3F.js";
import {
  Router
} from "./chunk-QWUZPIEQ.js";
import "./chunk-N3IMGYOF.js";
import {
  CommonModule,
  DestroyRef,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  computed,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-EBDCVLEQ.js";

// src/app/platform/saved-places/saved-places.component.ts
function SavedPlacesComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5);
    \u0275\u0275text(2, "\u{1F516}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 6);
    \u0275\u0275text(4, "Sign in to start saving spots");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 7);
    \u0275\u0275text(6, "I'll remember your favourite places so you don't have to.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 8);
    \u0275\u0275listener("click", function SavedPlacesComponent_div_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.authService.openLoginModal());
    });
    \u0275\u0275text(8, "Sign in");
    \u0275\u0275elementEnd()();
  }
}
function SavedPlacesComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5);
    \u0275\u0275text(2, "\u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 6);
    \u0275\u0275text(4, "No saved places yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 7);
    \u0275\u0275text(6, "Tap the bookmark icon on any location to save it here.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 8);
    \u0275\u0275listener("click", function SavedPlacesComponent_div_4_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.browseAll());
    });
    \u0275\u0275text(8, "Browse locations");
    \u0275\u0275elementEnd()();
  }
}
function SavedPlacesComponent_div_5_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loc_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2B50 ", loc_r5.rating, "");
  }
}
function SavedPlacesComponent_div_5_div_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loc_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.islandLabel(loc_r5));
  }
}
function SavedPlacesComponent_div_5_div_1_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "hidden gem");
    \u0275\u0275elementEnd();
  }
}
function SavedPlacesComponent_div_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275listener("click", function SavedPlacesComponent_div_5_div_1_Template_div_click_0_listener() {
      const loc_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openLocation(loc_r5));
    });
    \u0275\u0275element(1, "img", 12);
    \u0275\u0275elementStart(2, "div", 13)(3, "div", 14)(4, "span", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, SavedPlacesComponent_div_5_div_1_span_6_Template, 2, 1, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 17)(8, "span", 18);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, SavedPlacesComponent_div_5_div_1_span_10_Template, 2, 1, "span", 19)(11, SavedPlacesComponent_div_5_div_1_span_11_Template, 2, 0, "span", 20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const loc_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", loc_r5.img, \u0275\u0275sanitizeUrl)("alt", loc_r5.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(loc_r5.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", loc_r5.rating);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", ctx_r1.difficultyColor(loc_r5.difficulty));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(loc_r5.difficulty);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.islandLabel(loc_r5));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", loc_r5.hidden);
  }
}
function SavedPlacesComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, SavedPlacesComponent_div_5_div_1_Template, 12, 9, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.savedLocations());
  }
}
var SavedPlacesComponent = class _SavedPlacesComponent {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.router = inject(Router);
    this.bridge = inject(MapBridgeService);
    this.authService = inject(AuthService);
    this.userDataService = inject(UserDataService);
    this.savedLocations = computed(() => {
      const slugs = this.userDataService.savedLocations();
      return locations.filter((loc) => loc.slug && slugs.has(loc.slug));
    });
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    this.bridge.enterPanelMode([]);
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta/locations", loc.slug], { queryParams: { backTo: "saved" } });
    });
  }
  openLocation(loc) {
    this.router.navigate(["/malta/locations", loc.slug], { queryParams: { backTo: "saved" } });
  }
  difficultyColor(d) {
    return difficultyColor(d);
  }
  islandLabel(loc) {
    return getIslandLabel(loc);
  }
  goToMap() {
    this.router.navigate(["/malta"]);
  }
  browseAll() {
    this.router.navigate(["/malta/list"]);
  }
  static {
    this.\u0275fac = function SavedPlacesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SavedPlacesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SavedPlacesComponent, selectors: [["app-saved-places"]], decls: 6, vars: 4, consts: [["title", "Saved Places", 3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd"], ["panelActions", "", 1, "list-count"], ["class", "empty-state", 4, "ngIf"], ["class", "location-list", 4, "ngIf"], [1, "empty-state"], [1, "empty-state__icon"], [1, "empty-state__title"], [1, "empty-state__sub"], [1, "empty-state__btn", 3, "click"], [1, "location-list"], ["class", "loc-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "loc-card", 3, "click"], ["loading", "lazy", 1, "loc-thumb", 3, "src", "alt"], [1, "loc-info"], [1, "loc-top"], [1, "loc-title"], ["class", "loc-rating", 4, "ngIf"], [1, "loc-badges"], [1, "badge"], ["class", "badge badge--island", 4, "ngIf"], ["class", "badge badge--hidden", 4, "ngIf"], [1, "loc-rating"], [1, "badge", "badge--island"], [1, "badge", "badge--hidden"]], template: function SavedPlacesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function SavedPlacesComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.goToMap();
        })("dragStart", function SavedPlacesComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function SavedPlacesComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function SavedPlacesComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function SavedPlacesComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function SavedPlacesComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function SavedPlacesComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275elementStart(1, "span", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, SavedPlacesComponent_div_3_Template, 9, 0, "div", 2)(4, SavedPlacesComponent_div_4_Template, 9, 0, "div", 2)(5, SavedPlacesComponent_div_5_Template, 2, 1, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.savedLocations().length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.authService.isLoggedIn());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.isLoggedIn() && ctx.savedLocations().length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.isLoggedIn() && ctx.savedLocations().length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, PanelShellComponent], styles: ["\n\n.list-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #fff;\n  background: var(--color-primary);\n  border-radius: var(--radius-sm);\n  padding: 2px 10px;\n  flex-shrink: 0;\n}\n.location-list[_ngcontent-%COMP%] {\n  padding: 8px 12px 80px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.loc-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  background: var(--color-bg);\n  border-radius: var(--radius-lg);\n  padding: 10px;\n  cursor: pointer;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: box-shadow var(--transition), transform var(--transition);\n}\n.loc-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n@media (hover: hover) {\n  .loc-card[_ngcontent-%COMP%]:hover {\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n    transform: translateY(-1px);\n  }\n}\n.loc-thumb[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: var(--radius-md);\n  object-fit: cover;\n  flex-shrink: 0;\n  background: var(--color-border);\n}\n.loc-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.loc-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n}\n.loc-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  line-height: 1.3;\n}\n.loc-rating[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.loc-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 64px 32px 48px;\n  gap: 8px;\n}\n.empty-state__icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  line-height: 1;\n  margin-bottom: 8px;\n}\n.empty-state__title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.empty-state__sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n  max-width: 240px;\n}\n.empty-state__btn[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 10px 24px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.empty-state__btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n/*# sourceMappingURL=saved-places.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SavedPlacesComponent, { className: "SavedPlacesComponent", filePath: "src/app/platform/saved-places/saved-places.component.ts", lineNumber: 20 });
})();
export {
  SavedPlacesComponent
};
//# sourceMappingURL=chunk-2JGT2VON.js.map
