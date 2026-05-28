import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT, DatePipe, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { ProviderCardComponent } from '../provider-card/provider-card.component';
import { ShareButtonComponent } from '../share-button/share-button.component';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { UserDataService } from '../../shared/services/user-data.service';
import { AuthService } from '../../shared/services/auth.service';
import { GroupsService } from '../../shared/services/groups.service';
import { Group } from '../../shared/models/group.model';
import { Location, Provider, MapPoint, Route } from '../../shared/models';
import { haversineM } from '../../shared/utils/geo.utils';
import { getProvidersNearLocation } from '../../shared/utils/provider-utils';
import { getIsland } from '../../shared/utils/location-filter.util';
import { locations } from '../../../assets/locations.json';
import { providers } from '../../../assets/providers.json';
import { FEATURES } from '../../feature-flags';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, ImageGalleryComponent, ProviderCardComponent, ShareButtonComponent, ConfirmPopupComponent],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.scss',
})
export class LocationDetailComponent implements OnChanges, OnDestroy {
  @Input() location: Location | null = null;
  @Input() userLat: number | null = null;
  @Input() userLon: number | null = null;

  @Input() activeRouteIndex: number = -1;

  @Output() close = new EventEmitter<void>();
  @Output() explore = new EventEmitter<void>();
  @Output() navRequested = new EventEmitter<string>();
  @Output() providerSelected = new EventEmitter<Provider>();

  readonly userDataService  = inject(UserDataService);
  readonly authService      = inject(AuthService);
  private readonly groupsService = inject(GroupsService);

  readonly spotGroups       = signal<Group[]>([]);
  readonly features         = FEATURES;

  confirmingUnsave = false;
  private unsaveTimer?: ReturnType<typeof setTimeout>;

  get isSaved(): boolean {
    return !!this.location?.slug && this.userDataService.isLocationSaved(this.location.slug);
  }

  onSaveClick(e: Event): void {
    e.stopPropagation();
    if (!this.location?.slug) return;
    if (!this.authService.isLoggedIn()) { this.authService.openLoginModal(); return; }
    if (this.isSaved) {
      this.confirmingUnsave = true;
      clearTimeout(this.unsaveTimer);
      this.unsaveTimer = setTimeout(() => { this.confirmingUnsave = false; }, 4000);
    } else {
      this.userDataService.toggleSaveLocation(this.location.slug);
    }
  }

  confirmUnsave(): void {
    if (!this.location?.slug) return;
    clearTimeout(this.unsaveTimer);
    this.confirmingUnsave = false;
    this.userDataService.toggleSaveLocation(this.location.slug);
  }

  private getActiveMapPoints(): MapPoint[] {
    const loc = this.location;
    if (!loc) return [];
    if (loc.routes && loc.routes.length >= 2) {
      const idx = this.activeRouteIndex >= 0 ? this.activeRouteIndex : 0;
      return loc.routes[idx]?.mapPoints ?? [];
    }
    return loc.mapPoints ?? [];
  }

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  confirmingClose = false;
  nearbyMode = false;
  showNearbyPrompt = false;
  closestLocations: { location: Location; distanceKm: string }[] = [];
  nearbyProviders: Provider[] = [];

  private prevLocationId: number | null = null;
  private dismissedNearby = false;

  // Cached per-location — recomputed only in ngOnChanges when location.id changes.
  // allRoutesVisiblePoints() must NOT create new object references on every CD cycle:
  // OL animations tick via rAF through zone.js at ~60fps, and *ngFor without stable
  // references destroys + recreates all DOM nodes every frame, saturating the JS thread
  // and making every button in the panel unresponsive.
  private _routeGroups: { route: Route; points: MapPoint[] }[] = [];
  private _sharedDest: MapPoint | null = null;
  private _anyRouteRecorded = false;

  private readonly router = inject(Router);
  private readonly analyticsService = inject(AnalyticsService);

  ngOnChanges(): void {
    const location = this.location;
    if (location && location.id !== this.prevLocationId) {
      this.prevLocationId = location.id;
      this.confirmingClose = false;
      this.nearbyMode = false;
      this.showNearbyPrompt = false;
      this.dismissedNearby = false;
      this.closestLocations = this.getClosestLocations();
      this.nearbyProviders = FEATURES.PROMOTIONS
        ? getProvidersNearLocation(location, providers as Provider[])
        : [];

      if (isPlatformBrowser(this.platformId)) {
        const srcs = location.images?.length ? location.images : [location.img];
        srcs.forEach(src => { new Image().src = src; });
      }

      this._routeGroups = this.buildRouteGroups();
      this._sharedDest  = this.buildSharedDest();
      this._anyRouteRecorded = (location.routes ?? []).some(r => r.mapPoints.some(p => p.type === 'waypoint'));

      if (FEATURES.GROUPS && isPlatformBrowser(this.platformId)) {
        this.spotGroups.set([]);
        this.groupsService.fetchGroupsForSpot(location.slug).then(groups => this.spotGroups.set(groups));
      }
    }
    this.checkProximity();
  }

  get galleryImages(): string[] {
    const loc = this.location;
    if (!loc) return [];
    return loc.images?.length ? loc.images : [loc.img];
  }

  private pendingLeave?: () => void;

  requestClose(onLeave?: () => void): void {
    this.pendingLeave = onLeave;
    if (this.nearbyMode) {
      this.confirmingClose = true;
    } else {
      this.executeLeave();
    }
  }

  confirmClose(): void {
    this.confirmingClose = false;
    this.executeLeave();
  }

  cancelClose(): void {
    this.confirmingClose = false;
    this.pendingLeave = undefined;
  }

  private executeLeave(): void {
    if (this.pendingLeave) {
      const action = this.pendingLeave;
      this.pendingLeave = undefined;
      action();
    } else {
      this.close.emit();
    }
  }

  activateHikingMode(): void {
    this.nearbyMode = true;
    this.showNearbyPrompt = false;
  }

  dismissNearbyPrompt(): void {
    this.dismissedNearby = true;
    this.showNearbyPrompt = false;
  }

  get shareUrl(): string {
    if (!this.location) return '';
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    return `${origin}/malta/locations/${this.location.slug}`;
  }

  hasRecordedRoute(): boolean {
    return this.getActiveMapPoints().some((p: MapPoint) => p.type === 'waypoint');
  }

  visibleMapPoints(): MapPoint[] {
    return this.getActiveMapPoints().filter((p: MapPoint) =>
      p.type !== 'waypoint' && p.showButton !== false
    );
  }

  allRoutesVisiblePoints(): { route: Route; points: MapPoint[] }[] { return this._routeGroups; }
  sharedRouteDestination(): MapPoint | null { return this._sharedDest; }
  anyRouteHasRecordedRoute(): boolean { return this._anyRouteRecorded; }
  trackByRouteGroup(_i: number, g: { route: Route; points: MapPoint[] }): string { return g.route.label; }

  private buildRouteGroups(): { route: Route; points: MapPoint[] }[] {
    const loc = this.location;
    if (!loc?.routes || loc.routes.length < 2) return [];
    return loc.routes
      .map(route => ({
        route,
        points: route.mapPoints.filter(p =>
          p.type !== 'waypoint' && p.type !== 'destination' && p.showButton !== false
        ),
      }))
      .filter(r => r.points.length > 0);
  }

  private buildSharedDest(): MapPoint | null {
    const routes = this.location?.routes;
    if (!routes || routes.length < 2) return null;
    return routes[0].mapPoints.find(p => p.type === 'destination' && p.showButton !== false) ?? null;
  }

  navigateTo(point: MapPoint, index: number, pointsOverride?: MapPoint[]): void {
    const visible = pointsOverride ?? this.visibleMapPoints();
    const prev = index > 0 ? visible[index - 1] : null;
    const mode = point.type === 'parking' ? 'driving' : 'walking';
    let url = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lon}&travelmode=${mode}`;
    if (prev && point.type !== 'destination') url += `&origin=${prev.lat},${prev.lon}`;
    this.analyticsService.event('navigate_to_point', { location_title: this.location?.title, point_type: point.type });
    this.navRequested.emit(url);
  }

  pointLabel(point: MapPoint, index: number): string {
    const isOnly = index === 0;
    switch (point.type) {
      case 'parking':     return '🚗 Drive to ' + (point.label ?? 'Parking');
      case 'checkpoint':  return '🚶 Walk to ' + (point.label ?? 'Checkpoint');
      case 'destination': return isOnly ? '🗺️ Get Directions' : '🚶 Walk to ' + (point.label ?? 'Final Destination');
      default:            return '📍 ' + (point.label ?? 'Get Directions');
    }
  }

  clickon(loc: Location): void {
    this.analyticsService.event('recommendation_click', { from_location: this.location?.title, to_location: loc.title });
    this.router.navigate(['/malta/locations', loc.slug]);
  }

  onExplore(): void {
    this.analyticsService.event('explore_malta_click', { from_location: this.location?.title });
    this.explore.emit();
  }

  formatTag(tag: string): string {
    return tag.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  ngOnDestroy(): void { clearTimeout(this.unsaveTimer); }

  private checkProximity(): void {
    const location = this.location;
    if (!location || this.userLat === null || this.nearbyMode || this.dismissedNearby) return;
    const active = this.getActiveMapPoints();
    const points = active.length ? active : [location];
    this.showNearbyPrompt = points.some(
      p => haversineM(this.userLat!, this.userLon!, p.lat, p.lon) <= 500
    );
  }

  private getClosestLocations(): { location: Location; distanceKm: string }[] {
    const location = this.location;
    if (!location) return [];
    const currentIsland = getIsland(location);
    return (locations as Location[])
      .filter(l => l.id !== location.id && getIsland(l) === currentIsland)
      .map(l => ({
        location: l,
        distanceKm: (haversineM(location.lat, location.lon, l.lat, l.lon) / 1000).toFixed(1),
      }))
      .sort((a, b) => parseFloat(a.distanceKm) - parseFloat(b.distanceKm))
      .slice(0, 4);
  }
}
