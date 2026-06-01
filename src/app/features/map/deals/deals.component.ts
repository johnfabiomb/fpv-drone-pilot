import { Component, DestroyRef, OnInit, PLATFORM_ID, computed, signal, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelShellComponent } from '@ui/panel-shell/panel-shell.component';
import { ProviderCardComponent } from '@features/providers/provider-card/provider-card.component';
import { SeoService } from '@core/services/seo.service';
import { MapBridgeService } from '@core/services/map-bridge.service';
import { NavigationService } from '@core/services/navigation.service';
import { Location, Provider } from '@core/models';
import { haversineKm } from '@core/utils/geo.utils';
import { providers } from '@assets/providers.json';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, ProviderCardComponent],
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

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route      = inject(ActivatedRoute);
  private readonly router     = inject(Router);
  private readonly nav        = inject(NavigationService);
  private readonly seo        = inject(SeoService);
  readonly bridge             = inject(MapBridgeService);

  ngOnInit(): void {
    this.seo.setPage('deals');

    if (!isPlatformBrowser(this.platformId)) return;

    const backTo = this.route.snapshot.queryParamMap.get('backTo');
    const backBtn = backTo === 'list' ? { label: 'Back', accent: true } : { label: 'Back to map' };
    this.bridge.enterPanelMode(this.mapProviders, backBtn);

    this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(p => this.openProvider(p));

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc: Location | null) => {
        if (loc) this.router.navigate(['/malta/locations', loc.slug]);
      });

    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.navigateBack());

    if (navigator.geolocation) {
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
    this.router.navigate(['/malta/providers', provider.id]);
  }

  onPanelCloseRequested(): void {
    this.navigateBack();
  }

  private navigateBack(): void {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
}
