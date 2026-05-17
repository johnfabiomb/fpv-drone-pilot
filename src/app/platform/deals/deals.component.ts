import { Component, DestroyRef, OnInit, PLATFORM_ID, inject } from '@angular/core';
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
import { providers } from '../../../assets/providers.json';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, ProviderCardComponent, ProviderDetailComponent, ShareButtonComponent],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss',
})
export class DealsComponent implements OnInit {
  readonly allProviders = providers as Provider[];
  readonly mapProviders = (providers as Provider[]).filter(p => p.showOnMap && p.lat && p.lon);

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
    this.bridge.navDuration.set(3);
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

  goBack(): void {
    this.router.navigate(['/malta']);
  }
}
