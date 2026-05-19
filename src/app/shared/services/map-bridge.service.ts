import { ElementRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Location, Provider } from '../models';
import { PanelResize } from '../utils/panel-resize.util';

interface MapRef {
  updateSize?(): void;
  refitRoute?(): void;
  closeLocation?(): void;
  resetToMalta?(): void;
}

/**
 * Scoped to MaltaShellComponent. Bridges the persistent map (owned by the shell)
 * with the swappable panel children (malta-map, location-list, coupons).
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

  // ── Panel / UI state ───────────────────────────────────────
  readonly showFilterBar   = signal(false);
  readonly panelOpen       = signal(false);
  readonly mapOnly         = signal(false);
  readonly floatingBackBtn = signal<{ label: string; accent?: boolean } | null>(null);

  // ── Nav interstitial ───────────────────────────────────────
  readonly pendingNavUrl         = signal<string | null>(null);
  readonly navDuration           = signal(6);
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
  refitRoute():    void { this.mapRef?.refitRoute?.(); }
  resetToMalta():  void { this.mapRef?.resetToMalta?.(); }
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
}
