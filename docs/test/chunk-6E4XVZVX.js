import {
  CommonModule
} from "./chunk-AVMQEWGR.js";
import {
  EventEmitter,
  PLATFORM_ID,
  Subject,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-PGBPO7BH.js";

// src/app/components/provider-card/provider-card.component.ts
var ProviderCardComponent = class _ProviderCardComponent {
  constructor() {
    this.selected = new EventEmitter();
  }
  get accentColor() {
    const map = {
      "water-sports": "#0ea5e9",
      "tour": "#8b5cf6",
      "hotel": "#f59e0b",
      "restaurant": "#ef4444",
      "experience": "#10b981"
    };
    return map[this.provider?.category] ?? "#F4A922";
  }
  get discountPct() {
    const m = this.provider?.discount?.label?.match(/\d+%/);
    return m ? m[0] : "";
  }
  get discountWhat() {
    return this.provider?.discount?.label?.replace(/^\d+%\s*off\s*/i, "") ?? this.provider?.discount?.label ?? "";
  }
  static {
    this.\u0275fac = function ProviderCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProviderCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderCardComponent, selectors: [["app-provider-card"]], inputs: { provider: "provider" }, outputs: { selected: "selected" }, decls: 29, vars: 7, consts: [[1, "provider-card", 3, "click"], [1, "provider-card__stripe"], [1, "provider-card__body"], [1, "provider-card__header"], [1, "provider-card__emoji"], [1, "provider-card__info"], [1, "provider-card__name"], [1, "provider-card__tagline"], [1, "provider-card__exclusive-badge"], [1, "provider-card__deal"], [1, "provider-card__pct"], [1, "pct-num"], [1, "pct-off"], [1, "provider-card__deal-text"], [1, "deal-what"], [1, "deal-exclusive"], [1, "provider-card__cta"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function ProviderCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ProviderCardComponent_Template_div_click_0_listener() {
          return ctx.selected.emit(ctx.provider);
        });
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "span", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 5)(7, "span", 6);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 7);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "span", 8);
        \u0275\u0275text(12, "Exclusive");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 9)(14, "div", 10)(15, "span", 11);
        \u0275\u0275text(16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "span", 12);
        \u0275\u0275text(18, "OFF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "div", 13)(20, "span", 14);
        \u0275\u0275text(21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "span", 15);
        \u0275\u0275text(23, "Only when booked via this guide");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "span", 16);
        \u0275\u0275text(25, " Claim ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(26, "svg", 17);
        \u0275\u0275element(27, "line", 18)(28, "polyline", 19);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.provider.emoji);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.provider.name);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.provider.tagline);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.discountPct);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.discountWhat);
      }
    }, dependencies: [CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.provider-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  border: 1px solid #e5e7eb;\n  border-radius: 14px;\n  background: #fff;\n  overflow: hidden;\n  cursor: pointer;\n  transition: box-shadow 0.18s, transform 0.18s;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.provider-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n@media (hover: hover) {\n  .provider-card[_ngcontent-%COMP%]:hover {\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);\n  }\n}\n.provider-card__stripe[_ngcontent-%COMP%] {\n  width: 5px;\n  flex-shrink: 0;\n}\n.provider-card__body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.provider-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px 10px;\n}\n.provider-card__emoji[_ngcontent-%COMP%] {\n  font-size: 28px;\n  flex-shrink: 0;\n  line-height: 1;\n}\n.provider-card__info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.provider-card__name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #1a1a1a;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.provider-card__tagline[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.provider-card__exclusive-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: #fff;\n  background: #F4A922;\n  border-radius: 6px;\n  padding: 3px 7px;\n}\n.provider-card__deal[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px 12px;\n  background: #F4A922;\n}\n.provider-card__pct[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n  flex-shrink: 0;\n  background: rgba(255, 255, 255, 0.22);\n  border-radius: 8px;\n  padding: 5px 9px;\n  color: #fff;\n}\n.pct-num[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n}\n.pct-off[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  opacity: 0.85;\n  margin-top: 1px;\n}\n.provider-card__deal-text[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.deal-what[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.deal-exclusive[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  color: rgba(255, 255, 255, 0.8);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.provider-card__cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 12px;\n  font-weight: 700;\n  white-space: nowrap;\n  flex-shrink: 0;\n  color: #fff;\n}\n/*# sourceMappingURL=provider-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderCardComponent, { className: "ProviderCardComponent", filePath: "src/app/components/provider-card/provider-card.component.ts", lineNumber: 12 });
})();

// src/app/shared/utils/panel-resize.util.ts
var PANEL_MIN_H = 80;
var PANEL_EXPANDED_VH = 0.62;
var PanelResize = class {
  constructor(getEl, getMapComp, platformId, minHeight = PANEL_MIN_H, expandedVh = PANEL_EXPANDED_VH) {
    this.getEl = getEl;
    this.getMapComp = getMapComp;
    this.platformId = platformId;
    this.minHeight = minHeight;
    this.expandedVh = expandedVh;
    this.minimized = signal(false);
    this.isDragging = false;
    this.dragStartY = 0;
    this.dragBaseHeight = 0;
  }
  onDragStart(e) {
    if (!this.isMobile())
      return;
    this.isDragging = true;
    this.dragStartY = e.touches[0].clientY;
    this.dragBaseHeight = this.getEl()?.offsetHeight ?? this.expandedHeight();
    const el = this.getEl();
    if (el)
      el.style.transition = "none";
  }
  onDragMove(e) {
    if (!this.isDragging)
      return;
    const dy = e.touches[0].clientY - this.dragStartY;
    const newH = Math.min(Math.max(this.dragBaseHeight - dy, this.minHeight), this.expandedHeight());
    this.applyHeight(newH, false);
    this.getMapComp()?.updateSize?.();
  }
  onDragEnd(_e) {
    if (!this.isDragging)
      return;
    this.isDragging = false;
    const currentH = this.getEl()?.offsetHeight ?? this.expandedHeight();
    if (currentH < (this.expandedHeight() + this.minHeight) / 2) {
      this.minimize();
    } else {
      this.expand();
    }
  }
  expand() {
    this.minimized.set(false);
    this.applyHeight(this.expandedHeight());
    this.scheduleMapUpdate();
  }
  minimize() {
    this.minimized.set(true);
    this.applyHeight(this.minHeight);
    this.scheduleMapUpdate();
  }
  resetHeight() {
    const el = this.getEl();
    if (!el)
      return;
    el.style.transition = "";
    el.style.height = "";
  }
  scheduleMapUpdate() {
    clearTimeout(this.animationTimer);
    this.animationTimer = setTimeout(() => {
      this.getMapComp()?.updateSize?.();
      this.getMapComp()?.refitRoute?.();
    }, 300);
  }
  applyHeight(h, animated = true) {
    const el = this.getEl();
    if (!el)
      return;
    if (!this.isMobile()) {
      el.style.transition = "";
      el.style.height = "";
      return;
    }
    el.style.transition = animated ? "height 0.28s cubic-bezier(0.4, 0, 0.2, 1)" : "none";
    el.style.height = `${h}px`;
  }
  expandedHeight() {
    return Math.round(window.innerHeight * this.expandedVh);
  }
  isMobile() {
    return typeof window !== "undefined" && window.innerWidth <= 768;
  }
  destroy() {
    clearTimeout(this.animationTimer);
  }
};

// src/app/shared/services/map-bridge.service.ts
var MapBridgeService = class _MapBridgeService {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.panel = new PanelResize(() => this.getPanelEl?.()?.nativeElement, () => this.mapRef, this.platformId);
    this.filters = signal([]);
    this.providerPins = signal([]);
    this.selectedLocation = signal(null);
    this.showFilterBar = signal(false);
    this.panelOpen = signal(false);
    this.mapOnly = signal(false);
    this.floatingBackBtn = signal(null);
    this.pendingNavUrl = signal(null);
    this.navDuration = signal(3);
    this.interstitialProviders = signal([]);
    this.locationSelected$ = new Subject();
    this.providerPinSelected$ = new Subject();
    this.gpsCoord$ = new Subject();
    this.interstitialProviderSelected$ = new Subject();
    this.floatingBackBtnClicked$ = new Subject();
    this.scrollToTop$ = new Subject();
  }
  // ── Shell registration (called in ngAfterViewInit) ─────────
  registerPanelGetter(fn) {
    this.getPanelEl = fn;
  }
  registerMap(ref) {
    this.mapRef = ref;
  }
  destroy() {
    this.panel.destroy();
  }
  // ── Map commands (children call) ───────────────────────────
  refitRoute() {
    this.mapRef?.refitRoute?.();
  }
  resetToMalta() {
    this.mapRef?.resetToMalta?.();
  }
  closeLocation() {
    this.mapRef?.closeLocation?.();
  }
  updateSize() {
    this.mapRef?.updateSize?.();
  }
  // ── Panel helpers ──────────────────────────────────────────
  openPanel() {
    this.mapOnly.set(false);
    this.panel.expand();
  }
  toggleMinimize() {
    if (this.panel.minimized())
      this.panel.expand();
    else
      this.panel.minimize();
  }
  static {
    this.\u0275fac = function MapBridgeService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MapBridgeService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MapBridgeService, factory: _MapBridgeService.\u0275fac });
  }
};

export {
  ProviderCardComponent,
  MapBridgeService
};
//# sourceMappingURL=chunk-6E4XVZVX.js.map
