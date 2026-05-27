import { ElementRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Location, MapPoint, Provider } from '../models';
import { PanelResize } from '../utils/panel-resize.util';

export interface BackButton { label: string; accent?: boolean; }

interface MapRef {
  updateSize?(): void;
  refitRoute?(): void;
  setRoute?(points: MapPoint[]): void;
  drawAllRoutes?(): void;
  closeLocation?(): void;
  resetToMalta?(): void;
}

/**
 * Scoped to MapShellComponent. Bridges the persistent map (owned by the shell)
 * with the swappable panel children (map-explore, location-list, coupons).
 *
 * Children inject this service, configure map inputs via signals, and subscribe
 * to map events via Subjects. The shell registers its ViewChild refs after init.
 */
@Injectable()
export class MapBridgeService {
  private readonly platformId = inject(PLATFORM_ID);
  private getPanelEl?: () => ElementRef<HTMLDivElement> | undefined;
  private mapRef?: MapRef;

  // Created immediately; element + map refs registered lazily via closures
  readonly panel = new PanelResize(
    () => this.getPanelEl?.()?.nativeElement,
    () => this.mapRef,
    this.platformId,
  );

  // ── Map inputs (children write, shell binds to <app-map>) ──
  readonly filters          = signal<string[]>([]);
  readonly providerPins     = signal<Provider[]>([]);
  readonly selectedLocation = signal<Location | null>(null);
  /** When set, map fits view to the route (or location pin) AND this coordinate. Cleared by mode presets. */
  readonly fitPoint         = signal<{ lat: number; lon: number } | null>(null);
  /** -1 = all routes shown simultaneously; ≥0 = index of the single active route. */
  readonly activeRouteIndex = signal(-1);

  // ── Panel / UI state ───────────────────────────────────────
  readonly showFilterBar   = signal(false);
  readonly panelOpen       = signal(false);
  readonly mapOnly         = signal(false);
  readonly floatingBackBtn = signal<BackButton | null>(null);

  // ── Nav interstitial ───────────────────────────────────────
  readonly pendingNavUrl         = signal<string | null>(null);
  readonly navDuration           = signal(3);
  readonly interstitialProviders = signal<Provider[]>([]);
  /** Set when Book Now triggers the interstitial — shows coupon instead of ads. */
  readonly interstitialProvider  = signal<Provider | null>(null);
  /** "Near you" when fallback GPS providers are shown; null for spot-based ads. */
  readonly interstitialLabel     = signal<string | null>(null);

  clearInterstitial(): void {
    this.pendingNavUrl.set(null);
    this.interstitialProvider.set(null);
    this.interstitialLabel.set(null);
  }

  // ── Events: map → panels ───────────────────────────────────
  readonly locationSelected$    = new Subject<Location | null>();
  readonly providerPinSelected$ = new Subject<Provider>();
  readonly gpsCoord$            = new Subject<{ lat: number; lon: number }>();

  // ── Events: panels → shell ─────────────────────────────────
  readonly interstitialProviderSelected$ = new Subject<Provider>();
  readonly floatingBackBtnClicked$       = new Subject<void>();
  readonly scrollToTop$                  = new Subject<void>();

  // ── Shell registration (called in ngAfterViewInit) ─────────
  registerPanelGetter(fn: () => ElementRef<HTMLDivElement> | undefined): void {
    this.getPanelEl = fn;
  }

  registerMap(ref: MapRef): void { this.mapRef = ref; }

  destroy(): void { this.panel.destroy(); }

  // ── Map commands (children call) ───────────────────────────
  refitRoute():                        void { this.mapRef?.refitRoute?.(); }
  setRoute(points: MapPoint[]):        void { this.mapRef?.setRoute?.(points); }
  drawAllRoutes():                     void { this.mapRef?.drawAllRoutes?.(); }
  resetToMalta():                      void { this.mapRef?.resetToMalta?.(); }
  closeLocation(): void { this.mapRef?.closeLocation?.(); }
  updateSize():    void { this.mapRef?.updateSize?.(); }

  // ── Panel helpers ──────────────────────────────────────────
  openPanel(): void {
    this.mapOnly.set(false);
    this.panel.expand();
  }

  toggleMinimize(): void {
    if (this.panel.minimized()) {
      this.panel.expand();        // header-only → partial
    } else if (this.panel.fullscreen()) {
      this.panel.expand();        // full-sheet  → partial
    } else {
      this.panel.minimize();      // partial     → header-only
    }
  }

  // ── Mode presets ────────────────────────────────────────────
  // Each child component calls one of these instead of setting
  // a dozen bridge signals individually.

  /** /malta — map + filter bar, panel closed */
  enterExploreMode(providerPins: Provider[], backBtn: BackButton | null = null): void {
    this.filters.set([]);
    this.selectedLocation.set(null);
    this.fitPoint.set(null);
    this.activeRouteIndex.set(-1);
    this.showFilterBar.set(true);
    this.providerPins.set(providerPins);
    this.panelOpen.set(false);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.clearNavState();
  }

  /** /malta/locations/:slug — location detail, map follows the selected location */
  enterLocationMode(location: Location, backBtn: BackButton | null = null): void {
    this.filters.set([]);
    this.selectedLocation.set(location);
    this.fitPoint.set(null);
    this.activeRouteIndex.set(-1);
    this.showFilterBar.set(false);
    this.panelOpen.set(true);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.clearNavState();
    this.panel.expand();
    this.panel.blockInteractionBriefly();
  }

  /** /malta/list, /malta/deals, /malta/providers/:id — panel open, map shows all pins.
   *  Pass `location` to keep a location route visible on the map.
   *  Pass `fitPoint` to fit the view to the route + a specific coordinate (e.g. provider pin). */
  enterPanelMode(
    providerPins: Provider[],
    backBtn: BackButton | null = null,
    location: Location | null = null,
    fitPoint: { lat: number; lon: number } | null = null,
  ): void {
    this.filters.set([]);
    this.selectedLocation.set(location);
    this.fitPoint.set(fitPoint);
    this.showFilterBar.set(false);
    this.providerPins.set(providerPins);
    this.panelOpen.set(true);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.clearNavState();
    this.panel.expand();
  }

  private clearNavState(): void {
    this.interstitialProviders.set([]);
    this.interstitialProvider.set(null);
    this.interstitialLabel.set(null);
    this.pendingNavUrl.set(null);
  }
}
