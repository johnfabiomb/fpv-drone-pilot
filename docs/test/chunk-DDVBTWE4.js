import {
  PLATFORM_ID,
  Subject,
  inject,
  isPlatformBrowser,
  signal,
  ɵɵdefineInjectable
} from "./chunk-2FJZNSO2.js";

// src/app/map/core/utils/panel-resize.util.ts
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
  /**
   * Blocks panel interaction for `ms` milliseconds on touch devices only.
   *
   * WHY THIS EXISTS (do not remove):
   *   iOS Safari / Instagram in-app browser fires a synthetic "ghost" click
   *   ~300ms after touchend. When a map pin tap opens the panel, that ghost
   *   click lands on whatever is now under the finger (gallery, share button,
   *   provider card, etc.) and triggers it — a single tap would open a
   *   location AND fire a random panel action.
   *
   * WHY THIS IS JS AND NOT A CSS ANIMATION:
   *   The original implementation used a CSS animation on
   *   .map-layout__panel:not(.panel--hidden) to block pointer-events for
   *   350ms. WebKit restarts CSS animations whenever inline styles change on
   *   the same element. PanelResize.applyHeight() modifies el.style.height
   *   and el.style.transition on every expand()/minimize() call (e.g. when
   *   the user switches route tabs). Each call restarted the 350ms block,
   *   making the close and back buttons unresponsive every time "All routes"
   *   was selected. A JS one-shot targeted only at enterLocationMode() avoids
   *   this entirely.
   *
   * CALL SITE: MapBridgeService.enterLocationMode() only — not expand() or
   * minimize(), which are called on route-tab switches and must never block.
   */
  blockInteractionBriefly(ms = 350) {
    if (typeof window === "undefined")
      return;
    if (!window.matchMedia("(hover: none)").matches)
      return;
    const el = this.getEl();
    if (!el)
      return;
    el.style.pointerEvents = "none";
    setTimeout(() => {
      el.style.pointerEvents = "";
    }, ms);
  }
  destroy() {
    clearTimeout(this.animationTimer);
  }
};

// src/app/map/core/services/map-bridge.service.ts
var MapBridgeService = class _MapBridgeService {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.panel = new PanelResize(() => this.getPanelEl?.()?.nativeElement, () => this.mapRef, this.platformId);
    this.filters = signal([]);
    this.providerPins = signal([]);
    this.experiencePins = signal([]);
    this.eventVenuePins = signal([]);
    this.mapLayers = signal({ gems: true, experiences: true, events: true });
    this.showGems = signal(true);
    this.clusterPins = signal(true);
    this.selectedLocation = signal(null);
    this.fitPoint = signal(null);
    this.activeRouteIndex = signal(-1);
    this.showFilterBar = signal(false);
    this.panelOpen = signal(false);
    this.mapOnly = signal(false);
    this.floatingBackBtn = signal(null);
    this.pendingNavUrl = signal(null);
    this.navDuration = signal(3);
    this.interstitialExperience = signal(null);
    this.interstitialProvider = signal(null);
    this.interstitialEvent = signal(null);
    this.interstitialLabel = signal(null);
    this.pickMode = signal(false);
    this.meetingPointMarker = signal(null);
    this.spotPickMode = signal(false);
    this.locationSelected$ = new Subject();
    this.providerPinSelected$ = new Subject();
    this.experienceSelected$ = new Subject();
    this.eventVenueSelected$ = new Subject();
    this.gpsCoord$ = new Subject();
    this.coordPicked$ = new Subject();
    this.meetingPointClicked$ = new Subject();
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
  setRoute(points) {
    this.mapRef?.setRoute?.(points);
  }
  drawAllRoutes() {
    this.mapRef?.drawAllRoutes?.();
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
  /** Frame the currently-visible pins. Deferred so the map's inputs reflect the new layer first. */
  fitVisiblePins() {
    if (!isPlatformBrowser(this.platformId))
      return;
    requestAnimationFrame(() => this.mapRef?.fitVisiblePins?.());
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
  /** /malta — map + filter bar, panel closed. Layer pins are owned by the explore effect. */
  enterExploreMode(_providers, backBtn = null) {
    this.filters.set([]);
    this.selectedLocation.set(null);
    this.fitPoint.set(null);
    this.activeRouteIndex.set(-1);
    this.showFilterBar.set(true);
    this.showGems.set(true);
    this.clusterPins.set(true);
    this.providerPins.set([]);
    this.panelOpen.set(false);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.clearNavState();
  }
  /** /malta/locations/:slug — location detail, map follows the selected location */
  enterLocationMode(location, backBtn = null) {
    this.filters.set([]);
    this.selectedLocation.set(location);
    this.fitPoint.set(null);
    this.activeRouteIndex.set(-1);
    this.showFilterBar.set(false);
    this.showGems.set(true);
    this.clusterPins.set(true);
    this.panelOpen.set(true);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.experiencePins.set([]);
    this.eventVenuePins.set([]);
    this.clearNavState();
    this.panel.expand();
    this.panel.blockInteractionBriefly();
  }
  /** /malta/list, /malta/deals, /malta/providers/:id — panel open, map shows all pins.
   *  Pass `location` to keep a location route visible on the map.
   *  Pass `fitPoint` to fit the view to the route + a specific coordinate (e.g. provider pin). */
  enterPanelMode(providerPins, backBtn = null, location = null, fitPoint = null) {
    this.filters.set([]);
    this.selectedLocation.set(location);
    this.fitPoint.set(fitPoint);
    this.showFilterBar.set(false);
    this.showGems.set(true);
    this.clusterPins.set(true);
    this.providerPins.set(providerPins);
    this.experiencePins.set([]);
    this.eventVenuePins.set([]);
    this.panelOpen.set(true);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.clearNavState();
    this.panel.expand();
  }
  clearNavState() {
    this.interstitialExperience.set(null);
    this.interstitialEvent.set(null);
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
//# sourceMappingURL=chunk-DDVBTWE4.js.map
