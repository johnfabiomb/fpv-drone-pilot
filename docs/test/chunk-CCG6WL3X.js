import {
  PLATFORM_ID,
  Subject,
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-27FBVOOC.js";

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
  // ── Mode presets ────────────────────────────────────────────
  // Each child component calls one of these instead of setting
  // a dozen bridge signals individually.
  /** /malta — map + filter bar, panel closed */
  enterExploreMode(providerPins, backBtn = null) {
    this.filters.set([]);
    this.selectedLocation.set(null);
    this.showFilterBar.set(true);
    this.providerPins.set(providerPins);
    this.panelOpen.set(false);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.clearNavState();
  }
  /** /malta/locations/:slug — location detail, map follows the selected location */
  enterLocationMode(location, backBtn = null) {
    this.filters.set([]);
    this.selectedLocation.set(location);
    this.showFilterBar.set(false);
    this.panelOpen.set(true);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.clearNavState();
    this.panel.expand();
  }
  /** /malta/list, /malta/deals, /malta/providers/:id — panel open, map shows all pins.
   *  Pass `location` to keep a location route visible on the map (e.g. provider opened from a location). */
  enterPanelMode(providerPins, backBtn = null, location = null) {
    this.filters.set([]);
    this.selectedLocation.set(location);
    this.showFilterBar.set(false);
    this.providerPins.set(providerPins);
    this.panelOpen.set(true);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.clearNavState();
    this.panel.expand();
  }
  clearNavState() {
    this.interstitialProviders.set([]);
    this.interstitialProvider.set(null);
    this.interstitialLabel.set(null);
    this.pendingNavUrl.set(null);
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
  MapBridgeService
};
//# sourceMappingURL=chunk-CCG6WL3X.js.map
