import {
  ProviderDetailComponent,
  ShareButtonComponent
} from "./chunk-4QKWZUWB.js";
import {
  PanelShellComponent,
  providers
} from "./chunk-NYUUALVY.js";
import {
  MapBridgeService,
  ProviderCardComponent
} from "./chunk-3AG4AUWK.js";
import {
  takeUntilDestroyed
} from "./chunk-WNH6LXZJ.js";
import {
  SeoService
} from "./chunk-XBIMPO5F.js";
import {
  Router
} from "./chunk-WZUM6HQY.js";
import {
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf,
  isPlatformBrowser
} from "./chunk-FPOQEQN6.js";
import {
  DestroyRef,
  PLATFORM_ID,
  inject,
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
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-K5PYHWDH.js";

// src/app/platform/coupons/coupons.component.ts
function CouponsComponent_app_share_btn_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-share-btn", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("url", ctx_r0.currentShareUrl)("shareTitle", ctx_r0.panelTitle);
  }
}
function CouponsComponent_app_provider_detail_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-detail", 5);
    \u0275\u0275listener("navRequested", function CouponsComponent_app_provider_detail_2_Template_app_provider_detail_navRequested_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onNavRequested($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("provider", ctx_r0.selectedProvider);
  }
}
function CouponsComponent_div_3_app_provider_card_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-card", 10);
    \u0275\u0275listener("selected", function CouponsComponent_div_3_app_provider_card_4_Template_app_provider_card_selected_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openProvider($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    \u0275\u0275property("provider", p_r4);
  }
}
function CouponsComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "p", 8);
    \u0275\u0275text(3, "Exclusive discounts from local partners \u2014 tap a card or a pin on the map to claim your deal.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, CouponsComponent_div_3_app_provider_card_4_Template, 1, 1, "app-provider-card", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.allProviders);
  }
}
var CouponsComponent = class _CouponsComponent {
  constructor() {
    this.allProviders = providers;
    this.mapProviders = providers.filter((p) => p.showOnMap && p.lat && p.lon);
    this.selectedProvider = null;
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.document = inject(DOCUMENT);
    this.router = inject(Router);
    this.seo = inject(SeoService);
    this.bridge = inject(MapBridgeService);
  }
  get currentShareUrl() {
    if (!this.selectedProvider)
      return "";
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    return `${origin}/malta?provider=${this.selectedProvider.id}`;
  }
  get panelTitle() {
    return this.selectedProvider ? this.selectedProvider.name : "Exclusive Deals";
  }
  ngOnInit() {
    this.seo.setPage("deals");
    this.bridge.providerPins.set(this.mapProviders);
    this.bridge.filters.set([]);
    this.bridge.selectedLocation.set(null);
    this.bridge.showFilterBar.set(false);
    this.bridge.panelOpen.set(true);
    this.bridge.mapOnly.set(false);
    this.bridge.floatingBackBtn.set({ label: "Back to map" });
    this.bridge.navDuration.set(3);
    this.bridge.interstitialProviders.set([]);
    this.bridge.pendingNavUrl.set(null);
    this.bridge.panel.expand();
    this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => this.openProvider(p));
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta"], { queryParams: { locationId: loc.id } });
    });
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.goBack());
  }
  openProvider(provider) {
    this.selectedProvider = provider;
    this.bridge.openPanel();
    this.bridge.scrollToTop$.next();
  }
  onPanelCloseRequested() {
    if (this.selectedProvider) {
      this.selectedProvider = null;
    } else {
      this.router.navigate(["/malta"]);
    }
  }
  onNavRequested(url) {
    this.bridge.pendingNavUrl.set(url);
  }
  goBack() {
    this.router.navigate(["/malta"]);
  }
  static {
    this.\u0275fac = function CouponsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CouponsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CouponsComponent, selectors: [["app-coupons"]], decls: 4, vars: 5, consts: [[3, "closeRequested", "dragStart", "dragMove", "dragEnd", "toggleCollapse", "title", "minimized"], ["panelActions", "", 3, "url", "shareTitle", 4, "ngIf"], [3, "provider", "navRequested", 4, "ngIf"], ["class", "deals-list", 4, "ngIf"], ["panelActions", "", 3, "url", "shareTitle"], [3, "navRequested", "provider"], [1, "deals-list"], [1, "deals-intro"], [1, "deals-intro__text"], [3, "provider", "selected", 4, "ngFor", "ngForOf"], [3, "selected", "provider"]], template: function CouponsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function CouponsComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.onPanelCloseRequested();
        })("dragStart", function CouponsComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function CouponsComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function CouponsComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("toggleCollapse", function CouponsComponent_Template_app_panel_shell_toggleCollapse_0_listener() {
          return ctx.bridge.toggleMinimize();
        });
        \u0275\u0275template(1, CouponsComponent_app_share_btn_1_Template, 1, 2, "app-share-btn", 1)(2, CouponsComponent_app_provider_detail_2_Template, 1, 1, "app-provider-detail", 2)(3, CouponsComponent_div_3_Template, 5, 1, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("title", ctx.panelTitle)("minimized", ctx.bridge.panel.minimized());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedProvider);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedProvider);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.selectedProvider);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, PanelShellComponent, ProviderCardComponent, ProviderDetailComponent, ShareButtonComponent], styles: ["\n\n.deals-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 16px 16px 40px;\n}\n.deals-intro[_ngcontent-%COMP%] {\n  padding: 4px 0 6px;\n}\n.deals-intro__text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.55;\n}\n/*# sourceMappingURL=coupons.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CouponsComponent, { className: "CouponsComponent", filePath: "src/app/platform/coupons/coupons.component.ts", lineNumber: 21 });
})();
export {
  CouponsComponent
};
//# sourceMappingURL=chunk-PDZO3N6H.js.map
