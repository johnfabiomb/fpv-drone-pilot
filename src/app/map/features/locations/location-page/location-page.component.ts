import { Component, DestroyRef, HostListener, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BackButton } from '@map/core/services/map-bridge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelShellComponent } from '@map/ui/panel-shell/panel-shell.component';
import { LocationDetailComponent } from '@map/features/locations/location-detail/location-detail.component';
import { ShareButtonComponent } from '@map/ui/share-button/share-button.component';
import { ConfirmPopupComponent } from '@map/ui/confirm-popup/confirm-popup.component';
import { SeoService } from '@map/core/services/seo.service';
import { MapBridgeService } from '@map/core/services/map-bridge.service';
import { NavigationService } from '@map/core/services/navigation.service';
import { AuthService } from '@map/core/services/auth.service';
import { UserDataService } from '@map/core/services/user-data.service';
import { InteractionTrackingService } from '@map/core/services/interaction-tracking.service';
import { Location as AppLocation, Provider } from '@map/core/models';
import { FEATURES } from '../../../feature-flags';
import { haversineKm } from '@map/core/utils/geo.utils';
import { getProvidersNearLocation } from '@map/core/utils/provider.utils';
import { LocationPublicStats, locationPublicStats, fmtStatCount } from '@map/core/utils/location-filter.util';
import { locations } from '@assets/locations.json';
import { providers } from '@assets/providers.json';

@Component({
  selector: 'app-location-page',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, LocationDetailComponent, ShareButtonComponent, ConfirmPopupComponent],
  template: `
    <app-panel-shell
      [title]="location?.title ?? ''"
      (closeRequested)="onClose()"
      (dragStart)="bridge.panel.onDragStart($event)"
      (dragMove)="bridge.panel.onDragMove($event)"
      (dragEnd)="bridge.panel.onDragEnd($event)"
      (bodyDragStart)="bridge.panel.startDrag($event)"
      (bodyDragMove)="bridge.panel.onDragMove($event)"
      (bodyDragEnd)="bridge.panel.onDragEnd($event)">

      <app-share-btn
        *ngIf="location"
        panelActions
        [url]="shareUrl"
        [shareTitle]="location.title"
        (shared)="tracking.trackLocation(location.slug, 'shared')">
      </app-share-btn>

      <div *ngIf="location" panelActions class="save-wrap">
        <button
          class="header-save-btn"
          [class.header-save-btn--saved]="isSaved"
          (click)="onSaveClick($event)"
          [title]="isSaved ? 'Remove from saved' : 'Save'">
          <svg width="15" height="15" viewBox="0 0 24 24"
            [attr.fill]="isSaved ? 'currentColor' : 'none'"
            stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <app-confirm-popup
          *ngIf="confirmingUnsave"
          message="Remove from saved?"
          confirmLabel="Remove"
          cancelLabel="Keep"
          [danger]="true"
          (confirmed)="confirmUnsave()"
          (cancelled)="confirmingUnsave = false">
        </app-confirm-popup>
      </div>

      <div *ngIf="location" class="lp-stats-bar">
        <span class="lp-stats-bar__item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          {{ fmt(publicStats.views) }}
        </span>
        <span class="lp-stats-bar__sep">·</span>
        <span class="lp-stats-bar__item">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
          {{ publicStats.saves }} saves
        </span>
        <span class="lp-stats-bar__sep">·</span>
        <span class="lp-stats-bar__item">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          {{ publicStats.shares }} shares
        </span>
        <ng-container *ngIf="visitCount > 1">
          <span class="lp-stats-bar__sep">·</span>
          <span class="lp-stats-bar__item lp-stats-bar__item--personal">
            You've visited {{ visitCount }}×
          </span>
        </ng-container>
      </div>

      <app-location-detail
        *ngIf="location"
        [location]="location"
        [userLat]="userLat"
        [userLon]="userLon"
        [activeRouteIndex]="bridge.activeRouteIndex()"
        (close)="onClose()"
        (explore)="onClose()"
        (navRequested)="onNavRequested($event)"
        (providerSelected)="openProvider($event)">
      </app-location-detail>

    </app-panel-shell>
  `,
  styles: [`
    :host { display: contents; }
    .header-save-btn {
      width: 32px; height: 32px;
      border-radius: var(--radius-md);
      background: var(--color-bg-muted);
      border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0;
      transition: background var(--transition), color var(--transition);
      color: var(--color-text-muted);
      animation: deals-pulse 2.4s ease-in-out infinite;
    }
    .header-save-btn:hover { background: var(--color-border); }
    .header-save-btn--saved {
      background: rgba(244, 169, 34, 0.12);
      color: var(--color-primary);
      animation: none;
    }
    .header-save-btn--saved:hover { background: rgba(244, 169, 34, 0.2); }
    .lp-stats-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 4px 6px;
      padding: 6px 16px;
      font-size: 11.5px;
      color: var(--color-text-muted);
      background: var(--color-bg-light);
      border-bottom: 1px solid var(--color-border);
    }
    .lp-stats-bar__item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .lp-stats-bar__item--personal {
      color: var(--color-primary);
      font-weight: 500;
    }
    .lp-stats-bar__sep { color: var(--color-border); }
    .save-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
  `],
})
export class LocationPageComponent implements OnInit {
  location: AppLocation | null = null;
  userLat: number | null = null;
  userLon: number | null = null;

  private readonly route      = inject(ActivatedRoute);
  private readonly router     = inject(Router);
  private readonly nav        = inject(NavigationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly seo        = inject(SeoService);
  private readonly auth       = inject(AuthService);
  private readonly userData   = inject(UserDataService);
  readonly bridge             = inject(MapBridgeService);
  readonly tracking           = inject(InteractionTrackingService);

  get shareUrl(): string {
    if (!this.location) return '';
    return `https://johnfabiomb.com/malta/locations/${this.location.slug}`;
  }

  confirmingUnsave = false;
  private unsaveTimer?: ReturnType<typeof setTimeout>;

  get isSaved(): boolean {
    return !!this.location?.slug && this.userData.isLocationSaved(this.location.slug);
  }

  get visitCount(): number {
    return this.tracking.statsFor('location', this.location?.slug ?? '')?.viewCount ?? 0;
  }

  get publicStats(): LocationPublicStats {
    const agg = this.tracking.aggregateStatsFor(this.location?.slug ?? '');
    if (agg) return { views: agg.totalViews, saves: agg.totalSaves, shares: agg.totalShares };
    return locationPublicStats(this.location?.slug ?? '');
  }

  fmt(n: number): string { return fmtStatCount(n); }

  onSaveClick(e: Event): void {
    e.stopPropagation();
    if (!this.location?.slug) return;
    if (!this.auth.isLoggedIn()) { this.auth.openLoginModal(); return; }
    if (this.isSaved) {
      this.confirmingUnsave = true;
      clearTimeout(this.unsaveTimer);
      this.unsaveTimer = setTimeout(() => { this.confirmingUnsave = false; }, 4000);
    } else {
      this.userData.toggleSaveLocation(this.location.slug);
      this.tracking.trackLocation(this.location.slug, 'saved');
    }
  }

  confirmUnsave(): void {
    if (!this.location?.slug) return;
    clearTimeout(this.unsaveTimer);
    this.confirmingUnsave = false;
    this.userData.toggleSaveLocation(this.location.slug);
  }

  @HostListener('document:click')
  dismissUnsavePopup(): void {
    if (this.confirmingUnsave) {
      this.confirmingUnsave = false;
      clearTimeout(this.unsaveTimer);
    }
  }

  ngOnInit(): void {
    // Wire bridge events once — component is reused across slug navigations
    if (isPlatformBrowser(this.platformId)) {
      this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.navigateBack());

      this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(p => this.router.navigate(['/malta/providers', p.id], {
          queryParams: this.buildProviderParams(),
        }));

      this.bridge.gpsCoord$.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(coord => {
          this.userLat = coord.lat;
          this.userLon = coord.lon;
          this.syncInterstitialProviders();
        });

      this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(loc => { if (loc) this.router.navigate(['/malta/locations', loc.slug]); });
    }

    // Fires on first load and on every slug-to-slug navigation
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => this.loadLocation(params.get('slug') ?? ''));
  }

  private loadLocation(slug: string): void {
    // Support both slug and numeric-id (for any lingering old links)
    const numId = parseInt(slug, 10);
    this.location = isNaN(numId)
      ? (locations as AppLocation[]).find(l => l.slug === slug) ?? null
      : (locations as AppLocation[]).find(l => l.id === numId) ?? null;

    if (!this.location) {
      this.router.navigate(['/malta']);
      return;
    }

    // Canonical redirect: numeric id → slug URL (paramMap will fire again with the slug)
    if (!isNaN(numId)) {
      this.router.navigate(
        ['/malta/locations', this.location.slug],
        { replaceUrl: true, queryParamsHandling: 'preserve' },
      );
      return;
    }

    this.seo.updateMetaData(this.location);

    if (!isPlatformBrowser(this.platformId)) return;

    void this.userData.awardXp('location_viewed', this.location.slug);
    this.tracking.trackLocation(this.location.slug, 'viewed');
    this.bridge.enterLocationMode(this.location, this.resolveBackBtn());
    this.syncInterstitialProviders();
  }

  onClose(): void {
    this.navigateBack();
  }

  onNavRequested(url: string): void {
    if (this.auth.isLoggedIn()) {
      if (isPlatformBrowser(this.platformId)) window.open(url, '_blank');
      return;
    }
    this.bridge.navDuration.set(10);
    this.bridge.pendingNavUrl.set(url);
  }

  openProvider(provider: Provider): void {
    this.router.navigate(['/malta/providers', provider.id], {
      queryParams: this.buildProviderParams(),
    });
  }

  private buildProviderParams(): Record<string, string> {
    const params: Record<string, string> = {
      fromLocation: this.location!.slug,
      backTo: 'location',
    };
    const upstream = this.route.snapshot.queryParamMap.get('backTo');
    if (upstream) params['locationBackTo'] = upstream;
    return params;
  }

  private navigateBack(): void {
    this.nav.back(this.route.snapshot.queryParamMap);
  }

  private resolveBackBtn(): BackButton {
    const backTo = this.route.snapshot.queryParamMap.get('backTo');
    if (backTo === '30-places-2026') return { label: 'Back to list', accent: true };
    if (backTo === 'list')           return { label: 'Back', accent: true };
    return { label: 'Back' };
  }

  private syncInterstitialProviders(): void {
    if (!FEATURES.PROMOTIONS || !this.location) {
      this.bridge.interstitialProviders.set([]);
      this.bridge.interstitialLabel.set(null);
      this.bridge.providerPins.set(
        (providers as Provider[]).filter(p => p.showOnMap && p.lat && p.lon),
      );
      return;
    }

    const loc = this.location;
    const all = providers as Provider[];
    const nearSpot = getProvidersNearLocation(loc, all);

    if (nearSpot.length > 0) {
      this.bridge.interstitialProviders.set(nearSpot.slice(0, 2));
      this.bridge.interstitialLabel.set(null);
    } else if (this.userLat !== null && this.userLon !== null) {
      const nearUser = all
        .filter(p => p.lat && p.lon)
        .sort((a, b) =>
          haversineKm(this.userLat!, this.userLon!, a.lat!, a.lon!) -
          haversineKm(this.userLat!, this.userLon!, b.lat!, b.lon!),
        );
      this.bridge.interstitialProviders.set(nearUser.slice(0, 2));
      this.bridge.interstitialLabel.set(nearUser.length > 0 ? 'Near you' : null);
    } else {
      this.bridge.interstitialProviders.set([]);
      this.bridge.interstitialLabel.set(null);
    }

    this.bridge.navDuration.set(3);

    this.bridge.providerPins.set(all.filter(p => p.showOnMap && p.lat && p.lon));
  }
}
