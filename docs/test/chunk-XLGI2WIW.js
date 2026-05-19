import {
  ProviderDetailComponent,
  ShareButtonComponent
} from "./chunk-KL62XDMH.js";
import {
  PanelShellComponent,
  haversineKm,
  providers
} from "./chunk-AI6Z2YBP.js";
import {
  MapBridgeService,
  ProviderCardComponent
} from "./chunk-YORY4IDL.js";
import {
  takeUntilDestroyed
} from "./chunk-B3UEKMO4.js";
import {
  SeoService
} from "./chunk-4VEAU2UI.js";
import {
  Router
} from "./chunk-SFYN2BWV.js";
import {
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf,
  isPlatformBrowser
} from "./chunk-CF7WNDG7.js";
import {
  DestroyRef,
  PLATFORM_ID,
  computed,
  inject,
  signal,
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
} from "./chunk-27FBVOOC.js";

// src/app/platform/deals/deals.component.ts
function DealsComponent_app_share_btn_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-share-btn", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("url", ctx_r0.currentShareUrl)("shareTitle", ctx_r0.panelTitle);
  }
}
function DealsComponent_app_provider_detail_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-detail", 5);
    \u0275\u0275listener("bookRequested", function DealsComponent_app_provider_detail_2_Template_app_provider_detail_bookRequested_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBookRequested($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("provider", ctx_r0.selectedProvider);
  }
}
function DealsComponent_div_3_app_provider_card_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-card", 10);
    \u0275\u0275listener("selected", function DealsComponent_div_3_app_provider_card_4_Template_app_provider_card_selected_0_listener($event) {
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
function DealsComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "p", 8);
    \u0275\u0275text(3, "Exclusive discounts from local partners \u2014 tap a card or a pin on the map to claim your deal.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, DealsComponent_div_3_app_provider_card_4_Template, 1, 1, "app-provider-card", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.sortedProviders());
  }
}
var DealsComponent = class _DealsComponent {
  constructor() {
    this.userLat = signal(null);
    this.userLon = signal(null);
    this.mapProviders = providers.filter((p) => p.showOnMap && p.lat && p.lon);
    this.sortedProviders = computed(() => {
      const lat = this.userLat();
      const lon = this.userLon();
      const all = providers;
      if (lat === null || lon === null)
        return all;
      return [...all].sort((a, b) => {
        const da = a.lat && a.lon ? haversineKm(lat, lon, a.lat, a.lon) : Infinity;
        const db = b.lat && b.lon ? haversineKm(lat, lon, b.lat, b.lon) : Infinity;
        return da - db;
      });
    });
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
    this.bridge.interstitialProviders.set([]);
    this.bridge.pendingNavUrl.set(null);
    this.bridge.panel.expand();
    this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => this.openProvider(p));
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta"], { queryParams: { locationId: loc.id } });
    });
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.goBack());
    if (isPlatformBrowser(this.platformId) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.userLat.set(pos.coords.latitude);
        this.userLon.set(pos.coords.longitude);
      }, () => {
      }, { maximumAge: 6e4, timeout: 1e4 });
    }
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
  onBookRequested(provider) {
    this.bridge.interstitialProvider.set(provider);
    this.bridge.pendingNavUrl.set(provider.website);
  }
  goBack() {
    this.router.navigate(["/malta"]);
  }
  static {
    this.\u0275fac = function DealsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DealsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DealsComponent, selectors: [["app-deals"]], decls: 4, vars: 5, consts: [[3, "closeRequested", "dragStart", "dragMove", "dragEnd", "toggleCollapse", "bodyDragStart", "bodyDragMove", "bodyDragEnd", "title", "minimized"], ["panelActions", "", 3, "url", "shareTitle", 4, "ngIf"], [3, "provider", "bookRequested", 4, "ngIf"], ["class", "deals-list", 4, "ngIf"], ["panelActions", "", 3, "url", "shareTitle"], [3, "bookRequested", "provider"], [1, "deals-list"], [1, "deals-intro"], [1, "deals-intro__text"], [3, "provider", "selected", 4, "ngFor", "ngForOf"], [3, "selected", "provider"]], template: function DealsComponent_Template(rf, ctx) {
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
        })("toggleCollapse", function DealsComponent_Template_app_panel_shell_toggleCollapse_0_listener() {
          return ctx.bridge.toggleMinimize();
        })("bodyDragStart", function DealsComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function DealsComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function DealsComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275template(1, DealsComponent_app_share_btn_1_Template, 1, 2, "app-share-btn", 1)(2, DealsComponent_app_provider_detail_2_Template, 1, 1, "app-provider-detail", 2)(3, DealsComponent_div_3_Template, 5, 1, "div", 3);
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
    }, dependencies: [CommonModule, NgForOf, NgIf, PanelShellComponent, ProviderCardComponent, ProviderDetailComponent, ShareButtonComponent], styles: ["\n\n.deals-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 16px 16px 40px;\n}\n.deals-intro[_ngcontent-%COMP%] {\n  padding: 4px 0 6px;\n}\n.deals-intro__text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.55;\n}\n/*# sourceMappingURL=deals.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DealsComponent, { className: "DealsComponent", filePath: "src/app/platform/deals/deals.component.ts", lineNumber: 22 });
})();
export {
  DealsComponent
};
//# sourceMappingURL=chunk-XLGI2WIW.js.map
