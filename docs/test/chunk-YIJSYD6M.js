import {
  takeUntilDestroyed
} from "./chunk-HRBQLXCV.js";
import {
  NavigationEnd,
  NavigationStart,
  Router
} from "./chunk-GZJOKFRP.js";
import {
  CommonModule
} from "./chunk-AVMQEWGR.js";
import {
  DestroyRef,
  EventEmitter,
  Injector,
  afterNextRender,
  filter,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-PGBPO7BH.js";

// src/app/components/panel-shell/panel-shell.component.ts
var _c0 = ["panelBody"];
var _c1 = [[["", "panelActions", ""]], "*"];
var _c2 = ["[panelActions]", "*"];
var PanelShellComponent = class _PanelShellComponent {
  constructor() {
    this.title = "";
    this.minimized = false;
    this.closeRequested = new EventEmitter();
    this.dragStart = new EventEmitter();
    this.dragMove = new EventEmitter();
    this.dragEnd = new EventEmitter();
    this.toggleCollapse = new EventEmitter();
    this.bodyDragStart = new EventEmitter();
    this.bodyDragMove = new EventEmitter();
    this.bodyDragEnd = new EventEmitter();
    this.scrollCache = /* @__PURE__ */ new Map();
    this.isPopstate = false;
    this.destroyRef = inject(DestroyRef);
    this.injector = inject(Injector);
    this.router = inject(Router);
    this.router.events.pipe(filter((e) => e instanceof NavigationStart), takeUntilDestroyed(this.destroyRef)).subscribe((e) => {
      this.isPopstate = e.navigationTrigger === "popstate";
      this.scrollCache.set(this.router.url, this.panelBody?.nativeElement?.scrollTop ?? 0);
    });
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      afterNextRender(() => {
        const target = this.isPopstate ? this.scrollCache.get(this.router.url) ?? 0 : 0;
        this.panelBody?.nativeElement?.scrollTo({ top: target, behavior: "instant" });
      }, { injector: this.injector });
    });
  }
  ngAfterViewInit() {
    const body = this.panelBody.nativeElement;
    let touchStartY = 0;
    let isIntercepting = false;
    const onStart = (e) => {
      touchStartY = e.touches[0].clientY;
      isIntercepting = false;
    };
    const onMove = (e) => {
      const dy = e.touches[0].clientY - touchStartY;
      if (dy > 0 && body.scrollTop <= 0) {
        e.preventDefault();
        if (!isIntercepting) {
          isIntercepting = true;
          this.bodyDragStart.emit(e.touches[0].clientY);
        }
        this.bodyDragMove.emit(e);
      }
    };
    const onEnd = (e) => {
      if (isIntercepting) {
        isIntercepting = false;
        this.bodyDragEnd.emit(e);
      }
    };
    body.addEventListener("touchstart", onStart, { passive: true });
    body.addEventListener("touchmove", onMove, { passive: false });
    body.addEventListener("touchend", onEnd, { passive: true });
    this.destroyRef.onDestroy(() => {
      body.removeEventListener("touchstart", onStart);
      body.removeEventListener("touchmove", onMove);
      body.removeEventListener("touchend", onEnd);
    });
  }
  static {
    this.\u0275fac = function PanelShellComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PanelShellComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PanelShellComponent, selectors: [["app-panel-shell"]], viewQuery: function PanelShellComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panelBody = _t.first);
      }
    }, inputs: { title: "title", minimized: "minimized" }, outputs: { closeRequested: "closeRequested", dragStart: "dragStart", dragMove: "dragMove", dragEnd: "dragEnd", toggleCollapse: "toggleCollapse", bodyDragStart: "bodyDragStart", bodyDragMove: "bodyDragMove", bodyDragEnd: "bodyDragEnd" }, ngContentSelectors: _c2, decls: 14, vars: 5, consts: [["panelBody", ""], [1, "panel-header", 3, "touchstart", "touchmove", "touchend"], [1, "drag-bar"], [1, "panel-header__row"], ["title", "Close", 1, "close-btn", 3, "click"], [1, "fa", "fa-times"], [1, "panel-header__left"], [1, "panel-title"], ["title", "Expand / collapse", 1, "toggle-btn", 3, "click"], [1, "fa"], [1, "panel-body"]], template: function PanelShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef(_c1);
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275listener("touchstart", function PanelShellComponent_Template_div_touchstart_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.dragStart.emit($event));
        })("touchmove", function PanelShellComponent_Template_div_touchmove_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.dragMove.emit($event));
        })("touchend", function PanelShellComponent_Template_div_touchend_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.dragEnd.emit($event));
        });
        \u0275\u0275element(1, "div", 2);
        \u0275\u0275elementStart(2, "div", 3)(3, "button", 4);
        \u0275\u0275listener("click", function PanelShellComponent_Template_button_click_3_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeRequested.emit());
        });
        \u0275\u0275element(4, "i", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 6)(6, "span", 7);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275projection(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 8);
        \u0275\u0275listener("click", function PanelShellComponent_Template_button_click_9_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleCollapse.emit());
        });
        \u0275\u0275element(10, "i", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "div", 10, 0);
        \u0275\u0275projection(13, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.title);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("fa-chevron-up", ctx.minimized)("fa-chevron-down", !ctx.minimized);
      }
    }, dependencies: [CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n  background: var(--color-surface, #fff);\n}\n.panel-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  background: var(--color-surface, #fff);\n  border-bottom: 1px solid var(--color-bg-muted, #f3f4f6);\n  flex-shrink: 0;\n}\n@media (max-width: 768px) {\n  .panel-header[_ngcontent-%COMP%] {\n    touch-action: none;\n    cursor: grab;\n  }\n  .panel-header[_ngcontent-%COMP%]:active {\n    cursor: grabbing;\n  }\n}\n.drag-bar[_ngcontent-%COMP%] {\n  display: none;\n  width: 32px;\n  height: 3px;\n  border-radius: 2px;\n  background: var(--color-border, #e5e7eb);\n  margin: 10px auto 2px;\n}\n@media (max-width: 768px) {\n  .drag-bar[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n.panel-header__row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 12px 0 16px;\n  height: 52px;\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: var(--radius-md, 8px);\n  background: var(--color-bg-muted, #f3f4f6);\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background var(--transition, 0.15s);\n  color: var(--color-text-muted, #6b7280);\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-border, #e5e7eb);\n}\n.close-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.panel-header__left[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n}\n.panel-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--color-text-base, #111827);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  flex-shrink: 1;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: var(--radius-md, 8px);\n  background: var(--color-bg-muted, #f3f4f6);\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background var(--transition, 0.15s);\n  color: var(--color-text-muted, #6b7280);\n}\n.toggle-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-border, #e5e7eb);\n}\n.toggle-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.panel-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n/*# sourceMappingURL=panel-shell.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PanelShellComponent, { className: "PanelShellComponent", filePath: "src/app/components/panel-shell/panel-shell.component.ts", lineNumber: 14 });
})();

// src/assets/providers.json
var providers = [
  {
    id: "malta-kayak-co",
    name: "Malta Kayak Co.",
    category: "water-sports",
    emoji: "\u{1F6F6}",
    tagline: "Paddle into Malta's hidden sea caves",
    description: "Malta Kayak Co. offers guided and self-guided kayak tours that take you directly into the sea caves and hidden lagoons that are impossible to reach on foot. Glide through crystal-clear Mediterranean waters and explore the coastline the way it was meant to be discovered \u2014 from the sea.",
    coverImage: null,
    images: [
      "/assets/images/places/blue-grotto.webp",
      "/assets/images/places/santa-maria-caves.webp",
      "/assets/images/places/ta-kalanka-sea-cave.webp"
    ],
    website: "https://www.maltakayak.com",
    instagram: "@maltakayakco",
    phone: "+356 9900 1122",
    lat: 35.9291,
    lon: 14.3989,
    showOnMap: true,
    mapLabel: "\u{1F3F7}\uFE0F Deal",
    nearLocationIds: [44, 13, 18, 58, 61],
    discount: {
      label: "10% off any rental or guided tour",
      coupon: "EXPLORE10",
      instructions: "Show this screen at the counter or mention the code when booking by phone or online. Valid throughout 2026."
    },
    highlights: [
      "Guided & self-guided options",
      "All equipment included",
      "No experience required",
      "Open daily 8am \u2013 6pm"
    ]
  },
  {
    id: "gozo-sea-adventures",
    name: "Gozo Sea Adventures",
    category: "water-sports",
    emoji: "\u{1F93F}",
    tagline: "Snorkelling, diving & kayak on Gozo's wild coast",
    description: "Gozo Sea Adventures runs small-group snorkelling and scuba diving sessions in the crystal waters around Gozo and Comino. Their expert local guides know every hidden cave, arch and reef on the Gozitan coastline \u2014 spots that only a boat can reach.",
    coverImage: null,
    website: "https://www.gozoseaadventures.com",
    instagram: "@gozoseaadv",
    phone: "+356 9911 2233",
    lat: 36.033,
    lon: 14.2119,
    showOnMap: true,
    mapLabel: "\u{1F3F7}\uFE0F Deal",
    nearLocationIds: [38, 63, 68, 50, 46, 58],
    discount: {
      label: "10% off any snorkelling or diving session",
      coupon: "EXPLORE10",
      instructions: "Mention 'Explore Malta' when booking or show this screen at the dive centre in Xlendi Bay."
    },
    highlights: [
      "Small groups (max 8 people)",
      "PADI-certified instructors",
      "Equipment hire available",
      "Pick-up from Gozo ferry"
    ]
  },
  {
    id: "comino-express",
    name: "Comino Express",
    category: "tour",
    emoji: "\u26F5",
    tagline: "Private boat transfers to Comino's secret spots",
    description: "Skip the overcrowded ferry and reach the hidden corners of Comino on a private or small-group boat with Comino Express. They drop you at the Natural Window, the Santa Maria Caves and quiet eastern bays that public boats never stop at.",
    coverImage: null,
    website: "https://www.cominoexpress.com",
    instagram: "@cominoexpress",
    phone: "+356 9922 3344",
    lat: null,
    lon: null,
    showOnMap: false,
    nearLocationIds: [7, 14, 17, 62],
    discount: {
      label: "10% off any private boat charter",
      coupon: "EXPLORE10",
      instructions: "Book via their website or WhatsApp and enter code EXPLORE10 in the notes field. Cannot be combined with other offers."
    },
    highlights: [
      "Private & shared charters",
      "Access to uncrowded bays",
      "Departures from Sliema & St. Julian's",
      "Book 24 h in advance"
    ]
  }
];

export {
  PanelShellComponent,
  providers
};
//# sourceMappingURL=chunk-YIJSYD6M.js.map
