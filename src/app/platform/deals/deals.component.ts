import { Component, DestroyRef, OnInit, PLATFORM_ID, computed, signal, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { ProviderCardComponent } from '../../components/provider-card/provider-card.component';
import { ProviderDetailComponent } from '../../components/provider-panel/provider-panel.component';
import { ShareButtonComponent } from '../../components/share-button/share-button.component';
import { SeoService } from '../../shared/services/seo.service';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { Location, Provider } from '../../shared/models';
import { haversineKm } from '../../shared/utils/geo.utils';
import { providers } from '../../../assets/providers.json';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, ProviderCardComponent, ProviderDetailComponent, ShareButtonComponent],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss',
})
export class DealsComponent implements OnInit {
  private readonly userLat = signal<number | null>(null);
  private readonly userLon = signal<number | null>(null);

  readonly mapProviders = (providers as Provider[]).filter(p => p.showOnMap && p.lat && p.lon);

  readonly sortedProviders = computed(() => {
    const lat = this.userLat();
    const lon = this.userLon();
    const all = providers as Provider[];
    if (lat === null || lon === null) return all;
    return [...all].sort((a, b) => {
      const da = a.lat && a.lon ? haversineKm(lat, lon, a.lat, a.lon) : Infinity;
      const db = b.lat && b.lon ? haversineKm(lat, lon, b.lat, b.lon) : Infinity;
      return da - db;
    });
  });

  selectedProvider: Provider | null = null;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  readonly bridge = inject(MapBridgeService);

  get currentShareUrl(): string {
    if (!this.selectedProvider) return '';
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    return `${origin}/malta?provider=${this.selectedProvider.id}`;
  }

  get panelTitle(): string {
    return this.selectedProvider ? this.selectedProvider.name : 'Exclusive Deals';
  }

  ngOnInit(): void {
    this.seo.setPage('deals');

    // Configure bridge for this route
    this.bridge.providerPins.set(this.mapProviders);
    this.bridge.filters.set([]);
    this.bridge.selectedLocation.set(null);
    this.bridge.showFilterBar.set(false);
    this.bridge.panelOpen.set(true);
    this.bridge.mapOnly.set(false);
    this.bridge.floatingBackBtn.set({ label: 'Back to map' });

    this.bridge.interstitialProviders.set([]);
    this.bridge.pendingNavUrl.set(null);
    this.bridge.panel.expand();

    // Map provider pin tapped → open provider panel
    this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(p => this.openProvider(p));

    // Map location tapped → navigate to location detail
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc: Location | null) => {
        if (loc) this.router.navigate(['/malta'], { queryParams: { locationId: loc.id } });
      });

    // Floating back button click
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.goBack());

    // Fetch user location once to enable distance sorting
    if (isPlatformBrowser(this.platformId) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.userLat.set(pos.coords.latitude);
          this.userLon.set(pos.coords.longitude);
        },
        () => {},
        { maximumAge: 60000, timeout: 10000 },
      );
    }
  }

  openProvider(provider: Provider): void {
    this.selectedProvider = provider;
    this.bridge.openPanel();
    this.bridge.scrollToTop$.next();
  }

  onPanelCloseRequested(): void {
    if (this.selectedProvider) {
      this.selectedProvider = null;
    } else {
      this.router.navigate(['/malta']);
    }
  }

  onNavRequested(url: string): void {
    this.bridge.pendingNavUrl.set(url);
  }

  onBookRequested(provider: Provider): void {
    this.bridge.interstitialProvider.set(provider);
    this.bridge.pendingNavUrl.set(provider.website!);
  }

  goBack(): void {
    this.router.navigate(['/malta']);
  }
}
