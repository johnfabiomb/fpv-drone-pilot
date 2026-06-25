import {
  NavigationService
} from "./chunk-WUOM5WYJ.js";
import {
  ExperienceCardComponent
} from "./chunk-6FSIYCBP.js";
import {
  PanelShellComponent
} from "./chunk-RX7SKMBG.js";
import {
  providers
} from "./chunk-IHP72ZWL.js";
import {
  SeoService
} from "./chunk-MHTJLQEP.js";
import {
  getAllExperiences,
  getExperiencePins,
  haversineKm
} from "./chunk-K2AMJ56A.js";
import {
  MapBridgeService
} from "./chunk-75K55547.js";
import "./chunk-YQQNS7T3.js";
import {
  takeUntilDestroyed
} from "./chunk-TP5FMXQB.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-E53NQKQB.js";
import "./chunk-DNKJKTBS.js";
import {
  CommonModule,
  DestroyRef,
  NgForOf,
  PLATFORM_ID,
  computed,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-P56CFEJA.js";
import "./chunk-TWWAJFRB.js";

// src/app/map/features/map/deals/deals.component.ts
function DealsComponent_app_experience_card_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-experience-card", 5);
    \u0275\u0275listener("selected", function DealsComponent_app_experience_card_5_Template_app_experience_card_selected_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openExperience($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r3 = ctx.$implicit;
    \u0275\u0275property("experience", e_r3.experience)("provider", e_r3.provider);
  }
}
var DealsComponent = class _DealsComponent {
  constructor() {
    this.userLat = signal(null);
    this.userLon = signal(null);
    this.allProviders = providers;
    this.sortedExperiences = computed(() => {
      const all = getAllExperiences(this.allProviders);
      const lat = this.userLat();
      const lon = this.userLon();
      if (lat === null || lon === null)
        return all;
      return [...all].sort((a, b) => this.nearestSpotKm(a, lat, lon) - this.nearestSpotKm(b, lat, lon));
    });
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.nav = inject(NavigationService);
    this.seo = inject(SeoService);
    this.bridge = inject(MapBridgeService);
  }
  ngOnInit() {
    this.seo.setPage("deals");
    if (!isPlatformBrowser(this.platformId))
      return;
    const backTo = this.route.snapshot.queryParamMap.get("backTo");
    const backBtn = backTo === "list" ? { label: "Back", accent: true } : { label: "Back to map" };
    this.bridge.enterPanelMode([], backBtn);
    this.bridge.experiencePins.set(getExperiencePins(this.allProviders));
    this.bridge.experienceSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((e) => this.openExperience(e));
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta/locations", loc.slug]);
    });
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.navigateBack());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.userLat.set(pos.coords.latitude);
        this.userLon.set(pos.coords.longitude);
      }, () => {
      }, { maximumAge: 6e4, timeout: 1e4 });
    }
  }
  openExperience(experience) {
    this.router.navigate(["/malta/experiences", experience.id]);
  }
  onPanelCloseRequested() {
    this.navigateBack();
  }
  nearestSpotKm(entry, lat, lon) {
    return entry.experience.spots.reduce((min, s) => Math.min(min, haversineKm(lat, lon, s.lat, s.lon)), Infinity);
  }
  navigateBack() {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
  static {
    this.\u0275fac = function DealsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DealsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DealsComponent, selectors: [["app-deals"]], decls: 6, vars: 1, consts: [["title", "Local Deals", 3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd"], [1, "deals-list"], [1, "deals-intro"], [1, "deals-intro__text"], [3, "experience", "provider", "selected", 4, "ngFor", "ngForOf"], [3, "selected", "experience", "provider"]], template: function DealsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function DealsComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.onPanelCloseRequested();
        })("dragStart", function DealsComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function DealsComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function DealsComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function DealsComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function DealsComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function DealsComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "p", 3);
        \u0275\u0275text(4, "Hand-picked experiences from local partners I've personally connected with \u2014 tap a card or a map pin to grab the offer.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(5, DealsComponent_app_experience_card_5_Template, 1, 2, "app-experience-card", 4);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.sortedExperiences());
      }
    }, dependencies: [CommonModule, NgForOf, PanelShellComponent, ExperienceCardComponent], styles: ["\n\n.deals-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 16px 16px 40px;\n}\n.deals-intro[_ngcontent-%COMP%] {\n  padding: 4px 0 6px;\n}\n.deals-intro__text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.55;\n}\n/*# sourceMappingURL=deals.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DealsComponent, { className: "DealsComponent", filePath: "src/app/map/features/map/deals/deals.component.ts", lineNumber: 24 });
})();
export {
  DealsComponent
};
//# sourceMappingURL=chunk-SHOYFIFD.js.map
