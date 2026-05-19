import {
  CommonModule,
  NgIf
} from "./chunk-CF7WNDG7.js";
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
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-27FBVOOC.js";

// src/app/shared/utils/provider.utils.ts
var CATEGORY_COLORS = {
  "water-sports": "#0ea5e9",
  "tour": "#8b5cf6",
  "hotel": "#f59e0b",
  "restaurant": "#ef4444",
  "experience": "#10b981"
};
var CATEGORY_LABELS = {
  "water-sports": "Water Sports",
  "tour": "Boat Tour",
  "hotel": "Hotel",
  "restaurant": "Restaurant",
  "experience": "Experience"
};
function getProviderAccentColor(category) {
  return CATEGORY_COLORS[category] ?? "#F4A922";
}
function resolveProviderColor(provider) {
  return provider?.color ?? getProviderAccentColor(provider?.category);
}
function getProviderCategoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category;
}

// src/app/components/provider-avatar/provider-avatar.component.ts
function ProviderAvatarComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "img", 3);
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("border-color", ctx_r0.accentColor);
    \u0275\u0275property("src", ctx_r0.provider.coverImage, \u0275\u0275sanitizeUrl)("alt", ctx_r0.provider.name);
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r0.badgeSize, "px")("height", ctx_r0.badgeSize, "px")("font-size", ctx_r0.badgeFont, "px");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.provider.emoji, " ");
  }
}
function ProviderAvatarComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("font-size", ctx_r0.emojiFont, "px");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.provider.emoji);
  }
}
var ProviderAvatarComponent = class _ProviderAvatarComponent {
  constructor() {
    this.size = 68;
  }
  get accentColor() {
    return resolveProviderColor(this.provider);
  }
  get badgeSize() {
    return Math.round(this.size * 0.38);
  }
  get badgeFont() {
    return Math.round(this.size * 0.22);
  }
  get emojiFont() {
    return Math.round(this.size * 0.6);
  }
  static {
    this.\u0275fac = function ProviderAvatarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProviderAvatarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderAvatarComponent, selectors: [["app-provider-avatar"]], inputs: { provider: "provider", size: "size" }, decls: 4, vars: 6, consts: [["emojiOnly", ""], [1, "avatar"], [4, "ngIf", "ngIfElse"], [1, "avatar__img", 3, "src", "alt"], [1, "avatar__badge"], [1, "avatar__emoji"]], template: function ProviderAvatarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275template(1, ProviderAvatarComponent_ng_container_1_Template, 4, 11, "ng-container", 2)(2, ProviderAvatarComponent_ng_template_2_Template, 2, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const emojiOnly_r2 = \u0275\u0275reference(3);
        \u0275\u0275styleProp("width", ctx.size, "px")("height", ctx.size, "px");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.coverImage)("ngIfElse", emojiOnly_r2);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n[_nghost-%COMP%] {\n  display: contents;\n}\n.avatar[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n}\n.avatar__img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2.5px solid;\n  display: block;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);\n}\n.avatar__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -3px;\n  right: -3px;\n  background: #fff;\n  border-radius: 50%;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n}\n.avatar__emoji[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  line-height: 1;\n}\n/*# sourceMappingURL=provider-avatar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderAvatarComponent, { className: "ProviderAvatarComponent", filePath: "src/app/components/provider-avatar/provider-avatar.component.ts", lineNumber: 67 });
})();

// src/app/components/provider-card/provider-card.component.ts
var ProviderCardComponent = class _ProviderCardComponent {
  constructor() {
    this.selected = new EventEmitter();
  }
  get accentColor() {
    return resolveProviderColor(this.provider);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderCardComponent, selectors: [["app-provider-card"]], inputs: { provider: "provider" }, outputs: { selected: "selected" }, decls: 28, vars: 12, consts: [[1, "provider-card", 3, "click"], [1, "provider-card__stripe"], [1, "provider-card__body"], [1, "provider-card__header"], [3, "provider", "size"], [1, "provider-card__info"], [1, "provider-card__name"], [1, "provider-card__tagline"], [1, "provider-card__exclusive-badge"], [1, "provider-card__deal"], [1, "provider-card__pct"], [1, "pct-num"], [1, "pct-off"], [1, "provider-card__deal-text"], [1, "deal-what"], [1, "deal-exclusive"], [1, "provider-card__cta"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function ProviderCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ProviderCardComponent_Template_div_click_0_listener() {
          return ctx.selected.emit(ctx.provider);
        });
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "app-provider-avatar", 4);
        \u0275\u0275elementStart(5, "div", 5)(6, "span", 6);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "span", 7);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "span", 8);
        \u0275\u0275text(11, "Exclusive");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 9)(13, "div", 10)(14, "span", 11);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 12);
        \u0275\u0275text(17, "OFF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 13)(19, "span", 14);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 15);
        \u0275\u0275text(22, "Only when booked via this guide");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "span", 16);
        \u0275\u0275text(24, " Claim ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(25, "svg", 17);
        \u0275\u0275element(26, "line", 18)(27, "polyline", 19);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance(3);
        \u0275\u0275property("provider", ctx.provider)("size", 46);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.provider.name);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.provider.tagline);
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.discountPct);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.discountWhat);
      }
    }, dependencies: [CommonModule, ProviderAvatarComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.provider-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  border: 1px solid #e5e7eb;\n  border-radius: 14px;\n  background: #fff;\n  overflow: hidden;\n  cursor: pointer;\n  transition: box-shadow 0.18s, transform 0.18s;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.provider-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n@media (hover: hover) {\n  .provider-card[_ngcontent-%COMP%]:hover {\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);\n  }\n}\n.provider-card__stripe[_ngcontent-%COMP%] {\n  width: 5px;\n  flex-shrink: 0;\n}\n.provider-card__body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.provider-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px 10px;\n}\n.provider-card__info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.provider-card__name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #1a1a1a;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.provider-card__tagline[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.provider-card__exclusive-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: #fff;\n  border-radius: 6px;\n  padding: 3px 7px;\n}\n.provider-card__deal[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px 12px;\n}\n.provider-card__pct[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n  flex-shrink: 0;\n  background: rgba(255, 255, 255, 0.22);\n  border-radius: 8px;\n  padding: 5px 9px;\n  color: #fff;\n}\n.pct-num[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n}\n.pct-off[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  opacity: 0.85;\n  margin-top: 1px;\n}\n.provider-card__deal-text[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.deal-what[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.deal-exclusive[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  color: rgba(255, 255, 255, 0.8);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.provider-card__cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 12px;\n  font-weight: 700;\n  white-space: nowrap;\n  flex-shrink: 0;\n  color: #fff;\n}\n/*# sourceMappingURL=provider-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderCardComponent, { className: "ProviderCardComponent", filePath: "src/app/components/provider-card/provider-card.component.ts", lineNumber: 14 });
})();

// src/app/shared/utils/panel-resize.util.ts
var PANEL_HEADER_H = 68;
var PANEL_EXPANDED_VH = 0.62;
var PANEL_FULL_VH = 0.85;
var PanelResize = class {
  constructor(getEl, getMapComp, platformId, minHeight = PANEL_HEADER_H, expandedVh = PANEL_EXPANDED_VH, fullVh = PANEL_FULL_VH) {
    this.getEl = getEl;
    this.getMapComp = getMapComp;
    this.platformId = platformId;
    this.minHeight = minHeight;
    this.expandedVh = expandedVh;
    this.fullVh = fullVh;
    this.minimized = signal(false);
    this.fullscreen = signal(false);
    this.isDragging = false;
    this.dragStartY = 0;
    this.dragBaseHeight = 0;
    this.lastMoveY = 0;
    this.lastMoveTime = 0;
    this.dragVelocity = 0;
  }
  onDragStart(e) {
    this.startDrag(e.touches[0].clientY);
  }
  /** Used when a drag is initiated from the body (pull-down-to-collapse). */
  startDrag(startY) {
    if (!this.isMobile())
      return;
    this.isDragging = true;
    this.dragStartY = startY;
    this.dragBaseHeight = this.getEl()?.offsetHeight ?? this.partialHeight();
    this.lastMoveY = startY;
    this.lastMoveTime = Date.now();
    this.dragVelocity = 0;
    const el = this.getEl();
    if (el)
      el.style.transition = "none";
  }
  onDragMove(e) {
    if (!this.isDragging)
      return;
    const now = Date.now();
    const currentY = e.touches[0].clientY;
    const dt = now - this.lastMoveTime;
    if (dt > 0 && dt < 80) {
      this.dragVelocity = (currentY - this.lastMoveY) / dt;
    }
    this.lastMoveY = currentY;
    this.lastMoveTime = now;
    const dy = currentY - this.dragStartY;
    const newH = Math.min(Math.max(this.dragBaseHeight - dy, this.minHeight), this.fullHeight());
    this.applyHeight(newH, false);
    this.getMapComp()?.updateSize?.();
  }
  onDragEnd(_e) {
    if (!this.isDragging)
      return;
    this.isDragging = false;
    const currentH = this.getEl()?.offsetHeight ?? this.partialHeight();
    const FLICK = 0.4;
    let snap;
    if (this.dragVelocity < -FLICK) {
      snap = this.nextSnap(currentH, "up");
    } else if (this.dragVelocity > FLICK) {
      snap = this.nextSnap(currentH, "down");
    } else {
      snap = this.nearestSnap(currentH);
    }
    this.dragVelocity = 0;
    this.lastMoveTime = 0;
    if (snap <= this.minHeight)
      this.minimize();
    else if (snap >= this.fullHeight())
      this.expandFull();
    else
      this.expand();
  }
  /** Snap to partial (default resting) height */
  expand() {
    this.minimized.set(false);
    this.fullscreen.set(false);
    this.applyHeight(this.partialHeight());
    this.scheduleMapUpdate();
  }
  /** Snap to full-sheet height */
  expandFull() {
    this.minimized.set(false);
    this.fullscreen.set(true);
    this.applyHeight(this.fullHeight());
    this.scheduleMapUpdate();
  }
  /** Snap to header-only height (minimum — panel stays visible) */
  minimize() {
    this.minimized.set(true);
    this.fullscreen.set(false);
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
  nearestSnap(h) {
    const snaps = [this.minHeight, this.partialHeight(), this.fullHeight()];
    return snaps.reduce((a, b) => Math.abs(b - h) < Math.abs(a - h) ? b : a);
  }
  nextSnap(h, dir) {
    const snaps = [this.minHeight, this.partialHeight(), this.fullHeight()];
    if (dir === "up")
      return snaps.find((s) => s > h + 10) ?? this.fullHeight();
    return [...snaps].reverse().find((s) => s < h - 10) ?? this.minHeight;
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
  partialHeight() {
    return Math.round(window.innerHeight * this.expandedVh);
  }
  fullHeight() {
    return Math.round(window.innerHeight * this.fullVh);
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
    this.navDuration = signal(6);
    this.interstitialProviders = signal([]);
    this.interstitialProvider = signal(null);
    this.interstitialLabel = signal(null);
    this.locationSelected$ = new Subject();
    this.providerPinSelected$ = new Subject();
    this.gpsCoord$ = new Subject();
    this.interstitialProviderSelected$ = new Subject();
    this.floatingBackBtnClicked$ = new Subject();
    this.scrollToTop$ = new Subject();
  }
  clearInterstitial() {
    this.pendingNavUrl.set(null);
    this.interstitialProvider.set(null);
    this.interstitialLabel.set(null);
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
    if (this.panel.minimized()) {
      this.panel.expand();
    } else if (this.panel.fullscreen()) {
      this.panel.expand();
    } else {
      this.panel.minimize();
    }
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
  resolveProviderColor,
  getProviderCategoryLabel,
  ProviderAvatarComponent,
  ProviderCardComponent,
  MapBridgeService
};
//# sourceMappingURL=chunk-YORY4IDL.js.map
