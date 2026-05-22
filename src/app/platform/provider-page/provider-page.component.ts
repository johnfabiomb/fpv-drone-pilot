import { Component, DestroyRef, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { ProviderDetailComponent } from '../../components/provider-detail/provider-detail.component';
import { ShareButtonComponent } from '../../components/share-button/share-button.component';
import { SeoService } from '../../shared/services/seo.service';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { Location as AppLocation, Provider } from '../../shared/models';
import { providers } from '../../../assets/providers.json';
import { locations } from '../../../assets/locations.json';

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
        [shareTitle]="provider.name">
      </app-share-btn>

      <app-provider-detail
        *ngIf="provider"
        [provider]="provider"
        (bookRequested)="onBookRequested($event)">
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
  readonly bridge             = inject(MapBridgeService);

  get shareUrl(): string {
    if (!this.provider) return '';
    const origin = isPlatformBrowser(this.platformId)
      ? this.document.location.origin
      : 'https://johnfabiomb.com';
    return `${origin}/malta/providers/${this.provider.id}`;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.provider = (providers as Provider[]).find(p => p.id === id) ?? null;

    if (!this.provider) {
      this.router.navigate(['/malta']);
      return;
    }

    this.seo.setProviderPage(this.provider);

    if (!isPlatformBrowser(this.platformId)) return;

    const fromLocationSlug = this.route.snapshot.queryParamMap.get('fromLocation');
    const fromLoc = fromLocationSlug
      ? (locations as AppLocation[]).find(l => l.slug === fromLocationSlug) ?? null
      : null;
    const fitPoint = (fromLoc && this.provider.lat && this.provider.lon)
      ? { lat: this.provider.lat, lon: this.provider.lon }
      : null;

    const mapProviders = (providers as Provider[]).filter(p => p.showOnMap && p.lat && p.lon);
    this.bridge.enterPanelMode(mapProviders, { label: 'Back' }, fromLoc, fitPoint);

    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.goBack());

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc: AppLocation | null) => {
        if (loc) this.router.navigate(['/malta/locations', loc.slug]);
      });
  }

  onBookRequested(provider: Provider): void {
    this.bridge.interstitialProvider.set(provider);
    this.bridge.pendingNavUrl.set(provider.website!);
  }

  goBack(): void {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
}
