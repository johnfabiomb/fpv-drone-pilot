import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ImageGalleryComponent } from '@map/ui/image-gallery/image-gallery.component';
import { ExperienceCardComponent } from '@map/features/experiences/experience-card/experience-card.component';
import { ShareButtonComponent } from '@map/ui/share-button/share-button.component';
import { ConfirmPopupComponent } from '@map/ui/confirm-popup/confirm-popup.component';
import { AnalyticsService } from '@map/core/services/analytics.service';
import { UserDataService } from '@map/core/services/user-data.service';
import { AuthService } from '@map/core/services/auth.service';
import { GroupsSectionComponent } from '@map/features/groups/groups-section/groups-section.component';
import { Experience, Location, Provider, MapPoint, MapPointType, Route } from '@map/core/models';
import { haversineKm, haversineM } from '@map/core/utils/geo.utils';
import { getAllExperiences, getExperiencesNearLocation } from '@map/core/utils/experience.utils';
import { getIsland } from '@map/core/utils/location-filter.util';
import { locations } from '@assets/locations.json';
import { providers } from '@assets/providers.json';
import { FEATURES } from '../../../feature-flags';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageGalleryComponent, ExperienceCardComponent, ShareButtonComponent, ConfirmPopupComponent, GroupsSectionComponent],
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
  @Output() experienceSelected = new EventEmitter<Experience>();

  readonly userDataService  = inject(UserDataService);
  readonly authService      = inject(AuthService);

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
  nearbyExperiences: { experience: Experience; provider: Provider }[] = [];

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
      if (FEATURES.PROMOTIONS) {
        const all = providers as Provider[];
        const near = getExperiencesNearLocation(location, all);
        this.nearbyExperiences = (near.length > 0 ? near : this.getClosestExperiences(location, all)).slice(0, 3);
      } else {
        this.nearbyExperiences = [];
      }

      if (isPlatformBrowser(this.platformId)) {
        const srcs = location.images?.length ? location.images : [location.img];
        srcs.forEach(src => { new Image().src = src; });
      }

      this._routeGroups = this.buildRouteGroups();
      this._sharedDest  = this.buildSharedDest();
      this._anyRouteRecorded = (location.routes ?? []).some(r => r.mapPoints.some(p => p.type === MapPointType.Waypoint));

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
    return this.getActiveMapPoints().some((p: MapPoint) => p.type === MapPointType.Waypoint);
  }

  visibleMapPoints(): MapPoint[] {
    return this.getActiveMapPoints().filter((p: MapPoint) =>
      p.type !== MapPointType.Waypoint && p.showButton !== false
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
          p.type !== MapPointType.Waypoint && p.type !== MapPointType.Destination && p.showButton !== false
        ),
      }))
      .filter(r => r.points.length > 0);
  }

  private buildSharedDest(): MapPoint | null {
    const routes = this.location?.routes;
    if (!routes || routes.length < 2) return null;
    return routes[0].mapPoints.find(p => p.type === MapPointType.Destination && p.showButton !== false) ?? null;
  }

  navigateTo(point: MapPoint, index: number, pointsOverride?: MapPoint[]): void {
    const visible = pointsOverride ?? this.visibleMapPoints();
    const prev = index > 0 ? visible[index - 1] : null;
    const mode = point.type === MapPointType.Parking ? 'driving' : 'walking';
    let url = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lon}&travelmode=${mode}`;
    if (prev && point.type !== MapPointType.Destination) url += `&origin=${prev.lat},${prev.lon}`;
    this.analyticsService.event('navigate_to_point', { location_title: this.location?.title, point_type: point.type });
    this.navRequested.emit(url);
  }

  pointLabel(point: MapPoint, index: number): string {
    const isOnly = index === 0;
    switch (point.type) {
      case MapPointType.Parking:     return '🚗 Drive to ' + (point.label ?? 'Parking');
      case MapPointType.Destination: return isOnly ? '🗺️ Get Directions' : '🚶 Walk to ' + (point.label ?? 'Final Destination');
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

  // Fallback when no experience is within range — the globally closest by nearest spot.
  private getClosestExperiences(
    location: Location,
    all: Provider[],
  ): { experience: Experience; provider: Provider }[] {
    return getAllExperiences(all)
      .map(entry => ({
        ...entry,
        dist: entry.experience.spots.reduce(
          (min, s) => Math.min(min, haversineKm(location.lat, location.lon, s.lat, s.lon)),
          Infinity,
        ),
      }))
      .sort((a, b) => a.dist - b.dist)
      .map(({ experience, provider }) => ({ experience, provider }));
  }
}
