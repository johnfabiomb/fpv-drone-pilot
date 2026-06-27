import { ElementRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { Experience, EventVenuePin, Location, MaltaEvent, MapPoint, Provider } from '@map/core/models';
import { PanelResize } from '@map/core/utils/panel-resize.util';
import { ExperiencePin } from '@map/core/utils/experience.utils';

export interface BackButton { label: string; accent?: boolean; }

/** Content layers toggleable on the explore map. */
export type MapLayer = 'gems' | 'experiences' | 'events';
export interface MapLayers { gems: boolean; experiences: boolean; events: boolean; }

interface MapRef {
  updateSize?(): void;
  refitRoute?(): void;
  setRoute?(points: MapPoint[]): void;
  drawAllRoutes?(): void;
  closeLocation?(): void;
  resetToMalta?(): void;
  fitVisiblePins?(): void;
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
  /** Experience pins on the explore map, one per experience spot (replaces provider self-pins). */
  readonly experiencePins   = signal<ExperiencePin[]>([]);
  /** Event pins on the map, one per venue (the events page sets these). */
  readonly eventVenuePins   = signal<EventVenuePin[]>([]);
  /** Which content types show on the explore map (single-select bar; all on by default). */
  readonly mapLayers        = signal<MapLayers>({ gems: true, experiences: true, events: true });
  /** Whether location (gem) pins show. Explore follows mapLayers; the events/provider/experience pages turn it off. */
  readonly showGems         = signal(true);
  /** Whether promo pins cluster by proximity. The Events/Deals pages turn it off (show every pin). */
  readonly clusterPins      = signal(true);
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
  /** Nearest experience deal shown as the top ad card in the nav interstitial. */
  readonly interstitialExperience = signal<{ experience: Experience; provider: Provider } | null>(null);
  /** Set when Book Now triggers the interstitial — shows coupon instead of ads. */
  readonly interstitialProvider  = signal<Provider | null>(null);
  /** Nearest upcoming event shown as the second ad card in the nav interstitial. */
  readonly interstitialEvent     = signal<MaltaEvent | null>(null);
  /** "Near you" when the fallback (GPS-nearest) deal is shown; null for spot-based ads. */
  readonly interstitialLabel     = signal<string | null>(null);

  clearInterstitial(): void {
    this.pendingNavUrl.set(null);
    this.interstitialProvider.set(null);
    this.interstitialLabel.set(null);
  }

  // ── Meeting point pick mode ────────────────────────────────
  /** When true, map clicks emit coordPicked$ instead of selecting locations. */
  readonly pickMode             = signal(false);
  /** Marker position shown on map (set by form after pick, or by group detail). */
  readonly meetingPointMarker   = signal<{ lat: number; lon: number } | null>(null);

  // ── Spot pick mode ─────────────────────────────────────────
  /** When true, the user is selecting a location pin to set as group spot. */
  readonly spotPickMode         = signal(false);

  // ── Events: map → panels ───────────────────────────────────
  readonly locationSelected$    = new Subject<Location | null>();
  readonly providerPinSelected$ = new Subject<Provider>();
  /** Emitted when an experience pin is tapped on the map. */
  readonly experienceSelected$  = new Subject<Experience>();
  /** Emitted when an event venue pin is tapped on the map. */
  readonly eventVenueSelected$  = new Subject<EventVenuePin>();
  readonly gpsCoord$            = new Subject<{ lat: number; lon: number }>();
  /** Emitted when user taps the map while pickMode is true. */
  readonly coordPicked$           = new Subject<{ lat: number; lon: number }>();
  /** Emitted when the user taps the meeting point marker on the map. */
  readonly meetingPointClicked$   = new Subject<{ lat: number; lon: number }>();

  // ── Events: panels → shell ─────────────────────────────────
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
  /** Frame the currently-visible pins. Deferred so the map's inputs reflect the new layer first. */
  fitVisiblePins(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    requestAnimationFrame(() => this.mapRef?.fitVisiblePins?.());
  }

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

  /** /malta — map + filter bar, panel closed. Layer pins are owned by the explore effect. */
  enterExploreMode(_providers: Provider[], backBtn: BackButton | null = null): void {
    this.filters.set([]);
    this.selectedLocation.set(null);
    this.fitPoint.set(null);
    this.activeRouteIndex.set(-1);
    this.showFilterBar.set(true);
    this.showGems.set(true); // explore effect refines this from mapLayers
    this.clusterPins.set(true);
    this.providerPins.set([]);
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
    this.showGems.set(true); // events/provider/experience pages override to false after calling this
    this.clusterPins.set(true); // Events/Deals pages override to false after calling this
    this.providerPins.set(providerPins);
    this.experiencePins.set([]);
    this.eventVenuePins.set([]);
    this.panelOpen.set(true);
    this.mapOnly.set(false);
    this.floatingBackBtn.set(backBtn);
    this.clearNavState();
    this.panel.expand();
  }

  private clearNavState(): void {
    this.interstitialExperience.set(null);
    this.interstitialEvent.set(null);
    this.interstitialProvider.set(null);
    this.interstitialLabel.set(null);
    this.pendingNavUrl.set(null);
  }
}
