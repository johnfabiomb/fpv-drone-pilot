import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { ProviderCardComponent } from '../provider-card/provider-card.component';
import { ShareButtonComponent } from '../share-button/share-button.component';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { Location, Provider, MapPoint } from '../../shared/models';
import { haversineM } from '../../shared/utils/geo.utils';
import { getIsland } from '../../shared/utils/location-filter.util';
import { locations } from '../../../assets/locations.json';
import { providers } from '../../../assets/providers.json';
import { FEATURES } from '../../feature-flags';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, ImageGalleryComponent, ProviderCardComponent, ShareButtonComponent],
  templateUrl: './location-panel.component.html',
  styleUrl: './location-panel.component.scss',
})
export class LocationDetailComponent implements OnChanges, OnDestroy {
  @Input() location: Location | null = null;
  @Input() userLat: number | null = null;
  @Input() userLon: number | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() explore = new EventEmitter<void>();
  @Output() navRequested = new EventEmitter<string>();
  @Output() providerSelected = new EventEmitter<Provider>();

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  confirmingClose = false;
  nearbyMode = false;
  showNearbyPrompt = false;
  closestLocations: { location: Location; distanceKm: string }[] = [];
  nearbyProviders: Provider[] = [];

  private prevLocationId: number | null = null;
  private dismissedNearby = false;

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
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
        ? (providers as Provider[]).filter(p => p.nearLocationIds?.includes(location.id))
        : [];

      if (isPlatformBrowser(this.platformId)) {
        const srcs = location.images?.length ? location.images : [location.img];
        srcs.forEach(src => { new Image().src = src; });
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
    if (!this.location?.id) return '';
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    return `${origin}/malta?locationId=${this.location.id}`;
  }

  hasRecordedRoute(): boolean {
    return (this.location?.mapPoints ?? []).some(p => p.type === 'waypoint');
  }

  visibleMapPoints(): MapPoint[] {
    return (this.location?.mapPoints ?? []).filter(p =>
      p.type !== 'waypoint' && p.showButton !== false
    );
  }

  navigateTo(point: MapPoint, index: number): void {
    const visible = this.visibleMapPoints();
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
      case 'parking':     return '🚗 Drive to Parking';
      case 'checkpoint':  return '🚶 Walk to ' + (point.label ?? 'Checkpoint');
      case 'destination': return isOnly ? '🗺️ Get Directions' : '🚶 Walk to ' + (point.label ?? 'Final Destination');
      default:            return '📍 ' + (point.label ?? 'Get Directions');
    }
  }

  clickon(loc: Location): void {
    this.analyticsService.event('recommendation_click', { from_location: this.location?.title, to_location: loc.title });
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { locationId: loc.id } });
  }

  onExplore(): void {
    this.analyticsService.event('explore_malta_click', { from_location: this.location?.title });
    this.explore.emit();
  }

  formatTag(tag: string): string {
    return tag.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  ngOnDestroy(): void {}

  private checkProximity(): void {
    const location = this.location;
    if (!location || this.userLat === null || this.nearbyMode || this.dismissedNearby) return;
    const points = location.mapPoints?.length ? location.mapPoints : [location];
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
