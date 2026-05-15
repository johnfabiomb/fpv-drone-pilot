import {
  NavInterstitialComponent,
  PanelShellComponent,
  ProviderDetailComponent,
  ShareButtonComponent
} from "./chunk-MX6GVQ4R.js";
import {
  ProviderCardComponent,
  providers
} from "./chunk-LPPGMTBT.js";
import {
  ComponentsModule,
  FooterComponent,
  MapComponent
} from "./chunk-G2M3CB6W.js";
import "./chunk-D7BDNDUA.js";
import "./chunk-6GHA6ZUF.js";
import {
  SeoService
} from "./chunk-25R47I5C.js";
import {
  Router
} from "./chunk-GXMQ7NKC.js";
import {
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf,
  isPlatformBrowser
} from "./chunk-QICNAPY4.js";
import {
  PLATFORM_ID,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵviewQuery
} from "./chunk-FZOYICSM.js";
import "./chunk-TXDUYLVM.js";

// src/app/platform/coupons/coupons.component.ts
var _c0 = ["mapComp"];
var _c1 = ["panelWrap"];
var _c2 = () => [];
function CouponsComponent_app_nav_interstitial_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-nav-interstitial", 11);
    \u0275\u0275listener("closed", function CouponsComponent_app_nav_interstitial_0_Template_app_nav_interstitial_closed_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.pendingNavUrl = null);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("url", ctx_r2.pendingNavUrl)("duration", 3)("providers", \u0275\u0275pureFunction0(3, _c2));
  }
}
function CouponsComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function CouponsComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.mapOnly = false);
    });
    \u0275\u0275element(1, "i", 13);
    \u0275\u0275elementEnd();
  }
}
function CouponsComponent_div_10_app_share_btn_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-share-btn", 21);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("url", ctx_r2.currentShareUrl)("shareTitle", ctx_r2.panelTitle);
  }
}
function CouponsComponent_div_10_app_provider_detail_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-detail", 22);
    \u0275\u0275listener("navRequested", function CouponsComponent_div_10_app_provider_detail_6_Template_app_provider_detail_navRequested_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onNavRequested($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("provider", ctx_r2.selectedProvider);
  }
}
function CouponsComponent_div_10_div_7_app_provider_card_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-card", 27);
    \u0275\u0275listener("selected", function CouponsComponent_div_10_div_7_app_provider_card_4_Template_app_provider_card_selected_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openProvider($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    \u0275\u0275property("provider", p_r8);
  }
}
function CouponsComponent_div_10_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "p", 25);
    \u0275\u0275text(3, "Exclusive discounts from local partners \u2014 tap a card or a pin on the map to claim your deal.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, CouponsComponent_div_10_div_7_app_provider_card_4_Template, 1, 1, "app-provider-card", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.allProviders);
  }
}
function CouponsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14, 1)(2, "button", 15);
    \u0275\u0275listener("click", function CouponsComponent_div_10_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.mapOnly = true);
    });
    \u0275\u0275element(3, "i", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-panel-shell", 17);
    \u0275\u0275listener("closeRequested", function CouponsComponent_div_10_Template_app_panel_shell_closeRequested_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPanelCloseRequested());
    })("dragStart", function CouponsComponent_div_10_Template_app_panel_shell_dragStart_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDragStart($event));
    })("dragMove", function CouponsComponent_div_10_Template_app_panel_shell_dragMove_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDragMove($event));
    })("dragEnd", function CouponsComponent_div_10_Template_app_panel_shell_dragEnd_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDragEnd($event));
    })("toggleCollapse", function CouponsComponent_div_10_Template_app_panel_shell_toggleCollapse_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.panelMinimized ? ctx_r2.expandPanel() : ctx_r2.minimizePanel());
    });
    \u0275\u0275template(5, CouponsComponent_div_10_app_share_btn_5_Template, 1, 2, "app-share-btn", 18)(6, CouponsComponent_div_10_app_provider_detail_6_Template, 1, 1, "app-provider-detail", 19)(7, CouponsComponent_div_10_div_7_Template, 5, 1, "div", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("title", ctx_r2.panelTitle)("minimized", ctx_r2.panelMinimized);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.selectedProvider);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.selectedProvider);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.selectedProvider);
  }
}
var PANEL_MIN_H = 80;
var PANEL_EXPANDED_VH = 0.62;
var CouponsComponent = class _CouponsComponent {
  constructor(router, seo) {
    this.router = router;
    this.seo = seo;
    this.allProviders = [...providers];
    this.mapProviders = providers.filter((p) => p.showOnMap && p.lat && p.lon);
    this.selectedProvider = null;
    this.panelMinimized = false;
    this.mapOnly = false;
    this.pendingNavUrl = null;
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.isDragging = false;
    this.dragStartY = 0;
    this.dragBaseHeight = 0;
  }
  ngOnInit() {
    this.seo.setPage("deals");
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
  openProvider(provider) {
    this.selectedProvider = provider;
    this.mapOnly = false;
    this.panelMinimized = false;
    setTimeout(() => {
      this.panelWrap?.nativeElement?.scrollTo({ top: 0 });
      this.applyPanelHeight(this.expandedHeight());
      this.mapComp?.updateSize?.();
    });
  }
  onProviderPinSelected(provider) {
    this.openProvider(provider);
  }
  onPanelCloseRequested() {
    if (this.selectedProvider) {
      this.selectedProvider = null;
    } else {
      this.mapOnly = true;
    }
  }
  onLocationSelected(location) {
    if (location) {
      this.router.navigate(["/malta"], { queryParams: { locationId: location.id } });
    }
  }
  onNavRequested(url) {
    this.pendingNavUrl = url;
  }
  goBack() {
    this.router.navigate(["/malta"]);
  }
  onMapTapped() {
    if (!isPlatformBrowser(this.platformId))
      return;
    if (window.innerWidth > 768 || this.mapOnly)
      return;
    this.minimizePanel();
  }
  // ── Drag handlers ──────────────────────────────────────────────────────────
  onDragStart(e) {
    if (!isPlatformBrowser(this.platformId) || window.innerWidth > 768)
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
    this.mapComp?.updateSize?.();
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
    setTimeout(() => this.mapComp?.updateSize?.(), 300);
  }
  minimizePanel() {
    this.panelMinimized = true;
    this.applyPanelHeight(PANEL_MIN_H);
    setTimeout(() => this.mapComp?.updateSize?.(), 300);
  }
  expandedHeight() {
    if (!isPlatformBrowser(this.platformId))
      return 400;
    return Math.round(window.innerHeight * PANEL_EXPANDED_VH);
  }
  applyPanelHeight(h, animated = true) {
    const el = this.panelWrap?.nativeElement;
    if (!el)
      return;
    if (!isPlatformBrowser(this.platformId) || window.innerWidth > 768) {
      el.style.transition = "";
      el.style.height = "";
      return;
    }
    el.style.transition = animated ? "height 0.28s cubic-bezier(0.4, 0, 0.2, 1)" : "none";
    el.style.height = `${h}px`;
  }
  static {
    this.\u0275fac = function CouponsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CouponsComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(SeoService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CouponsComponent, selectors: [["app-coupons"]], viewQuery: function CouponsComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapComp = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panelWrap = _t.first);
      }
    }, decls: 12, vars: 4, consts: [["mapComp", ""], ["panelWrap", ""], [3, "url", "duration", "providers", "closed", 4, "ngIf"], [1, "app"], [1, "main-area"], [1, "map-wrap"], [3, "providerPinSelected", "locationSelected", "mapTapped", "providerPins"], [1, "floating-back-btn", 3, "click"], [1, "fa", "fa-chevron-left"], ["class", "show-panel-btn", 3, "click", 4, "ngIf"], ["class", "coupons-panel-wrap", 4, "ngIf"], [3, "closed", "url", "duration", "providers"], [1, "show-panel-btn", 3, "click"], [1, "fa", "fa-tag"], [1, "coupons-panel-wrap"], ["title", "Fullscreen map", 1, "collapse-btn", 3, "click"], [1, "fa", "fa-chevron-right"], [3, "closeRequested", "dragStart", "dragMove", "dragEnd", "toggleCollapse", "title", "minimized"], ["panelActions", "", 3, "url", "shareTitle", 4, "ngIf"], [3, "provider", "navRequested", 4, "ngIf"], ["class", "deals-list", 4, "ngIf"], ["panelActions", "", 3, "url", "shareTitle"], [3, "navRequested", "provider"], [1, "deals-list"], [1, "deals-intro"], [1, "deals-intro__text"], [3, "provider", "selected", 4, "ngFor", "ngForOf"], [3, "selected", "provider"]], template: function CouponsComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275template(0, CouponsComponent_app_nav_interstitial_0_Template, 1, 4, "app-nav-interstitial", 2);
        \u0275\u0275elementStart(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "app-map", 6, 0);
        \u0275\u0275listener("providerPinSelected", function CouponsComponent_Template_app_map_providerPinSelected_4_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onProviderPinSelected($event));
        })("locationSelected", function CouponsComponent_Template_app_map_locationSelected_4_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onLocationSelected($event));
        })("mapTapped", function CouponsComponent_Template_app_map_mapTapped_4_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onMapTapped());
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "button", 7);
        \u0275\u0275listener("click", function CouponsComponent_Template_button_click_6_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.goBack());
        });
        \u0275\u0275element(7, "i", 8);
        \u0275\u0275text(8, " Back to map ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, CouponsComponent_button_9_Template, 2, 0, "button", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, CouponsComponent_div_10_Template, 8, 5, "div", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275element(11, "app-footer");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.pendingNavUrl);
        \u0275\u0275advance(4);
        \u0275\u0275property("providerPins", ctx.mapProviders);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.mapOnly);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.mapOnly);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ComponentsModule, MapComponent, FooterComponent, PanelShellComponent, ProviderCardComponent, ProviderDetailComponent, NavInterstitialComponent, ShareButtonComponent], styles: ["\n\n.app[_ngcontent-%COMP%] {\n  height: 100dvh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: row;\n  overflow: hidden;\n  position: relative;\n}\n.map-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.coupons-panel-wrap[_ngcontent-%COMP%] {\n  width: 380px;\n  height: 100%;\n  flex-shrink: 0;\n  overflow-y: auto;\n  background: #fff;\n  border-left: 1px solid #e5e7eb;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.collapse-btn[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (min-width: 769px) {\n  .collapse-btn[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: absolute;\n    top: 14px;\n    left: -14px;\n    width: 28px;\n    height: 28px;\n    border-radius: 50% 0 0 50%;\n    background: #fff;\n    border: 1px solid #e5e7eb;\n    border-right: none;\n    cursor: pointer;\n    color: #9ca3af;\n    font-size: 11px;\n    box-shadow: -2px 1px 6px rgba(0, 0, 0, 0.08);\n    transition: color 0.15s;\n    z-index: 5;\n  }\n  .collapse-btn[_ngcontent-%COMP%]:hover {\n    color: #374151;\n  }\n}\n.floating-back-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 20;\n  background: #fff;\n  border: none;\n  border-radius: 10px;\n  padding: 9px 18px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #374151;\n  cursor: pointer;\n  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.14);\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  white-space: nowrap;\n  transition: box-shadow 0.15s, background 0.15s;\n}\n.floating-back-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n}\n.floating-back-btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);\n}\n.show-panel-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 8px;\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  background: #fff;\n  border: none;\n  cursor: pointer;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #F4A922;\n  font-size: 16px;\n  z-index: 10;\n  transition: background 0.15s;\n}\n.show-panel-btn[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n}\n.deals-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 16px 16px 40px;\n}\n.deals-intro[_ngcontent-%COMP%] {\n  padding: 4px 0 6px;\n}\n.deals-intro__text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  color: #6b7280;\n  line-height: 1.55;\n}\n@media (max-width: 768px) {\n  .main-area[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .map-wrap[_ngcontent-%COMP%] {\n    position: relative;\n    flex: 1;\n    min-height: 0;\n    width: 100%;\n    height: auto;\n  }\n  .coupons-panel-wrap[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 62vh;\n    flex-shrink: 0;\n    position: relative;\n    margin-top: -20px;\n    z-index: 300;\n    border-left: none;\n    border-top: none;\n    border-radius: 14px 14px 0 0;\n    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.12);\n    will-change: height;\n    overflow-y: auto;\n    overflow-x: hidden;\n  }\n  .show-panel-btn[_ngcontent-%COMP%] {\n    bottom: 16px;\n    top: auto;\n    right: 12px;\n  }\n}\n/*# sourceMappingURL=coupons.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CouponsComponent, { className: "CouponsComponent", filePath: "src/app/platform/coupons/coupons.component.ts", lineNumber: 23 });
})();
export {
  CouponsComponent
};
//# sourceMappingURL=chunk-MY2FIUSE.js.map
