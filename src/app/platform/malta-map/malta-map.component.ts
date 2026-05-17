import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { LocationDetailComponent } from '../../components/location-panel/location-panel.component';
import { ProviderDetailComponent } from '../../components/provider-panel/provider-panel.component';
import { ShareButtonComponent } from '../../components/share-button/share-button.component';
import { SeoService } from '../../shared/services/seo.service';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { Location, Provider } from '../../shared/models';
import { FEATURES } from '../../feature-flags';
import { providers } from '../../../assets/providers.json';
import { locations } from '../../../assets/locations.json';

@Component({
  selector: 'app-malta-map',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, LocationDetailComponent, ProviderDetailComponent, ShareButtonComponent],
  templateUrl: './malta-map.component.html',
  styleUrl: './malta-map.component.scss'
})
export class MaltaMapComponent implements OnInit {
  selectedLocation: Location | null = null;
  selectedProvider: Provider | null = null;
  userLat: number | null = null;
  userLon: number | null = null;
  backTo: string | null = null;

  readonly navDuration = 3;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly seo = inject(SeoService);
  readonly bridge = inject(MapBridgeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  @ViewChild(LocationDetailComponent) private locationDetail?: LocationDetailComponent;

  get currentShareUrl(): string {
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    if (this.selectedProvider) return `${origin}/malta?provider=${this.selectedProvider.id}`;
    if (this.selectedLocation) return `${origin}/malta?locationId=${this.selectedLocation.id}`;
    return '';
  }

  get panelTitle(): string {
    if (this.selectedProvider) return this.selectedProvider.name;
    return this.selectedLocation?.title ?? '';
  }

  ngOnInit(): void {
    this.seo.setPage('map');
    this.backTo = this.route.snapshot.queryParamMap.get('backTo');

    if (!isPlatformBrowser(this.platformId)) return;

    // Configure bridge signals for this route
    const params = this.route.snapshot.queryParamMap;
    const hasInitialContent = !!(params.get('locationId') || params.get('provider'));
    this.bridge.showFilterBar.set(!hasInitialContent);
    this.bridge.filters.set([]);
    this.bridge.providerPins.set([]);
    this.bridge.selectedLocation.set(null);
    this.bridge.panelOpen.set(hasInitialContent);
    this.bridge.mapOnly.set(false);
    this.bridge.interstitialProviders.set([]);
    this.bridge.pendingNavUrl.set(null);
    this.syncFloatingBackBtn();

    // Query param changes → sync provider + location state
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const id = params['provider'];
      const locId = params['locationId'] ? parseInt(params['locationId'], 10) : null;
      this.selectedProvider = id
        ? ((providers as Provider[]).find(p => p.id === id) ?? null)
        : null;

      if (this.selectedProvider && !this.selectedLocation) {
        this.bridge.panelOpen.set(true);
        this.bridge.openPanel();
        this.bridge.scrollToTop$.next();
      } else if (!this.selectedProvider && !this.selectedLocation && !locId) {
        this.bridge.panelOpen.set(false);
      }

      // If locationId is in the URL but the location isn't loaded yet (e.g. navigated here
      // from /malta/list where locationSelected$ fired before we subscribed), resolve it now.
      if (locId && this.selectedLocation?.id !== locId) {
        const loc = (locations as Location[]).find(l => l.id === locId) ?? null;
        if (loc) { this.onLocationSelected(loc); return; }
      }

      this.syncFloatingBackBtn();
      this.syncFilterBar();
    });

    // Map location click → update panel
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loc => this.onLocationSelected(loc));

    // GPS position for distance display and proximity detection in location detail
    this.bridge.gpsCoord$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(coord => { this.userLat = coord.lat; this.userLon = coord.lon; });

    // Interstitial: user picks a provider from the nav overlay
    this.bridge.interstitialProviderSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(p => this.openProvider(p));

    // Floating back button click
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.backTo ? this.goBack() : this.onPanelCloseRequested());
  }

  onLocationSelected(location: Location | null): void {
    if (location?.id === this.selectedLocation?.id) return;
    this.selectedLocation = location;
    this.bridge.selectedLocation.set(location);

    if (!location) {
      this.bridge.mapOnly.set(false);
      if (!this.selectedProvider) this.bridge.panelOpen.set(false);
      this.seo.setPage('map');
    } else {
      this.bridge.panelOpen.set(true);
      this.seo.updateMetaData(location);
      this.bridge.panel.expand();
      this.syncInterstitialProviders();
      // scrollToTop deferred so panel content has rendered; expand() handles updateSize + refitRoute
      setTimeout(() => this.bridge.scrollToTop$.next());
    }
    this.syncFloatingBackBtn();
    this.syncFilterBar();
  }

  onNavRequested(url: string): void {
    this.bridge.pendingNavUrl.set(url);
  }

  onPanelCloseRequested(): void {
    if (this.selectedProvider) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { provider: null },
        queryParamsHandling: 'merge',
      });
      return;
    }
    // Ensure the panel is visible so the confirmation banner can be seen
    this.revealPanelIfHidden();
    this.locationDetail?.requestClose();
  }

  openProvider(provider: Provider): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { provider: provider.id },
      queryParamsHandling: 'merge',
    });
  }

  // Called via (close) from location-detail — always fires AFTER any confirmation
  closePanel(): void {
    this.bridge.closeLocation();
    this.bridge.mapOnly.set(false);
  }

  exploreMap(): void {
    const doExplore = () => {
      this.bridge.closeLocation();
      this.bridge.resetToMalta();
      this.bridge.mapOnly.set(false);
    };
    if (this.locationDetail?.nearbyMode) {
      this.revealPanelIfHidden();
      this.locationDetail.requestClose(doExplore);
    } else {
      doExplore();
    }
  }

  goBack(): void {
    const navigate = () => {
      if (this.backTo === '30-places-2026') this.router.navigate(['/malta/30-places-2026']);
      else this.router.navigate(['/malta/list']);
    };
    if (this.locationDetail?.nearbyMode) {
      this.revealPanelIfHidden();
      this.locationDetail.requestClose(navigate);
    } else {
      navigate();
    }
  }

  // Reveals the panel if mapOnly so the confirmation banner is visible to the user
  private revealPanelIfHidden(): void {
    if (this.bridge.mapOnly()) this.bridge.openPanel();
  }

  private syncFilterBar(): void {
    this.bridge.showFilterBar.set(!this.bridge.panelOpen());
  }

  private syncFloatingBackBtn(): void {
    if (this.backTo) {
      const label = this.backTo === '30-places-2026' ? 'Back to list' : 'Back';
      this.bridge.floatingBackBtn.set({ label, accent: true });
    } else if (this.selectedLocation || this.selectedProvider) {
      const label = this.selectedProvider
        ? (this.selectedLocation?.title ?? 'Back to map')
        : 'Back to map';
      this.bridge.floatingBackBtn.set({ label });
    } else {
      this.bridge.floatingBackBtn.set(null);
    }
  }

  private syncInterstitialProviders(): void {
    if (!FEATURES.PROMOTIONS || !this.selectedLocation) {
      this.bridge.interstitialProviders.set([]);
      return;
    }
    const result = (providers as Provider[])
      .filter(p => p.nearLocationIds?.includes(this.selectedLocation!.id))
      .slice(0, 2);
    this.bridge.interstitialProviders.set(result);
    this.bridge.navDuration.set(this.navDuration);
  }
}
