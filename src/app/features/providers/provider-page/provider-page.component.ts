import { Component, DestroyRef, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelShellComponent } from '@ui/panel-shell/panel-shell.component';
import { ProviderDetailComponent } from '@features/providers/provider-detail/provider-detail.component';
import { ShareButtonComponent } from '@ui/share-button/share-button.component';
import { SeoService } from '@core/services/seo.service';
import { InteractionTrackingService } from '@core/services/interaction-tracking.service';
import { MapBridgeService } from '@core/services/map-bridge.service';
import { NavigationService } from '@core/services/navigation.service';
import { Location as AppLocation, Provider } from '@core/models';
import { providers } from '@assets/providers.json';
import { locations } from '@assets/locations.json';
import { buildBookingUrl } from '@core/utils/provider.utils';

@Component({
  selector: 'app-provider-page',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, ProviderDetailComponent, ShareButtonComponent],
  template: `
    <app-panel-shell
      [title]="provider?.name ?? ''"
      (closeRequested)="goBack()"
      (dragStart)="bridge.panel.onDragStart($event)"
      (dragMove)="bridge.panel.onDragMove($event)"
      (dragEnd)="bridge.panel.onDragEnd($event)"
      (bodyDragStart)="bridge.panel.startDrag($event)"
      (bodyDragMove)="bridge.panel.onDragMove($event)"
      (bodyDragEnd)="bridge.panel.onDragEnd($event)">

      <app-share-btn
        *ngIf="provider"
        panelActions
        [url]="shareUrl"
        [shareTitle]="provider.name"
        (shared)="tracking.trackProvider(provider.id, 'shared')">
      </app-share-btn>

      <app-provider-detail
        *ngIf="provider"
        [provider]="provider"
        (bookRequested)="onBookRequested($event)"
        (couponCopied)="tracking.trackProvider(provider.id, 'coupon_copy')"
        (providerShared)="tracking.trackProvider(provider.id, 'shared')">
      </app-provider-detail>

    </app-panel-shell>
  `,
  styles: [':host { display: contents; }'],
})
export class ProviderPageComponent implements OnInit {
  provider: Provider | null = null;

  private readonly route      = inject(ActivatedRoute);
  private readonly router     = inject(Router);
  private readonly nav        = inject(NavigationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document   = inject(DOCUMENT);
  private readonly seo        = inject(SeoService);
  readonly tracking           = inject(InteractionTrackingService);
  readonly bridge             = inject(MapBridgeService);

  get shareUrl(): string {
    if (!this.provider) return '';
    const origin = isPlatformBrowser(this.platformId)
      ? this.document.location.origin
      : 'https://johnfabiomb.com';
    return `${origin}/malta/providers/${this.provider.id}`;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const mapProviders = (providers as Provider[]).filter(p => p.showOnMap && p.lat && p.lon);
      const fromLocationSlug = this.route.snapshot.queryParamMap.get('fromLocation');
      const fromLoc = fromLocationSlug
        ? (locations as AppLocation[]).find(l => l.slug === fromLocationSlug) ?? null
        : null;

      this.bridge.enterPanelMode(mapProviders, { label: 'Back' }, fromLoc, null);

      this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.goBack());

      this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((loc: AppLocation | null) => {
          if (loc) this.router.navigate(['/malta/locations', loc.slug]);
        });

      this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(p => this.router.navigate(['/malta/providers', p.id]));
    }

    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const id = params.get('id');
      this.provider = (providers as Provider[]).find(p => p.id === id) ?? null;

      if (!this.provider) {
        this.router.navigate(['/malta']);
        return;
      }

      this.seo.setProviderPage(this.provider);

      if (isPlatformBrowser(this.platformId)) {
        this.tracking.trackProvider(this.provider.id, 'viewed');
      }

      if (isPlatformBrowser(this.platformId) && this.provider.lat && this.provider.lon) {
        this.bridge.fitPoint.set({ lat: this.provider.lat, lon: this.provider.lon });
      }
    });
  }

  onBookRequested(provider: Provider): void {
    const url = buildBookingUrl(provider);
    if (!url) return;
    this.tracking.trackProvider(provider.id, 'book_now');
    this.bridge.interstitialProvider.set(provider);
    this.bridge.pendingNavUrl.set(url);
  }

  goBack(): void {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
}
