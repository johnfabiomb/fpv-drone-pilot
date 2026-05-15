import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { ProviderCardComponent } from '../provider-card/provider-card.component';
import { ShareButtonComponent } from '../share-button/share-button.component';
import { AnalyticsService } from '../../shared/services/analytics.service';
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
  @Input() location: any = null;
  @Input() userLat: number | null = null;
  @Input() userLon: number | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() explore = new EventEmitter<void>();
  @Output() navRequested = new EventEmitter<string>();
  @Output() providerSelected = new EventEmitter<any>();

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  confirmingClose = false;
  nearbyMode = false;
  showNearbyPrompt = false;
  closestLocations: { location: any; distanceKm: string }[] = [];
  nearbyProviders: any[] = [];

  private prevLocationId: any = null;
  private dismissedNearby = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private analyticsService: AnalyticsService,
  ) {}

  ngOnChanges(): void {
    if (this.location && this.location.id !== this.prevLocationId) {
      this.prevLocationId = this.location.id;
      this.confirmingClose = false;
      this.nearbyMode = false;
      this.showNearbyPrompt = false;
      this.dismissedNearby = false;
      this.closestLocations = this.getClosestLocations();
      this.nearbyProviders = FEATURES.PROMOTIONS
        ? (providers as any[]).filter(p => p.nearLocationIds?.includes(this.location.id))
        : [];
    }
    this.checkProximity();
  }

  requestClose(): void {
    if (this.nearbyMode) {
      this.confirmingClose = true;
    } else {
      this.close.emit();
    }
  }

  confirmClose(): void {
    this.confirmingClose = false;
    this.close.emit();
  }

  cancelClose(): void {
    this.confirmingClose = false;
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
    return (this.location?.mapPoints ?? []).some((p: any) => p.type === 'waypoint');
  }

  visibleMapPoints(): any[] {
    return (this.location?.mapPoints ?? []).filter((p: any) =>
      p.type !== 'waypoint' && p.showButton !== false
    );
  }

  navigateTo(point: any, index: number): void {
    const visible = this.visibleMapPoints();
    const prev = index > 0 ? visible[index - 1] : null;
    const mode = point.type === 'parking' ? 'driving' : 'walking';
    let url = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lon}&travelmode=${mode}`;
    if (prev && point.type !== 'destination') url += `&origin=${prev.lat},${prev.lon}`;
    this.analyticsService.event('navigate_to_point', { location_title: this.location?.title, point_type: point.type });
    this.navRequested.emit(url);
  }

  pointLabel(point: any, index: number): string {
    const isOnly = index === 0;
    switch (point.type) {
      case 'parking':     return '🚗 Drive to Parking';
      case 'checkpoint':  return '🚶 Walk to ' + (point.label ?? 'Checkpoint');
      case 'destination': return isOnly ? '🗺️ Get Directions' : '🚶 Walk to ' + (point.label ?? 'Final Destination');
      default:            return '📍 ' + (point.label ?? 'Get Directions');
    }
  }

  clickon(loc: any): void {
    if (!loc?.id) return;
    this.analyticsService.event('recommendation_click', { from_location: this.location?.title, to_location: loc?.title });
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
    if (!this.location || this.userLat === null || this.nearbyMode || this.dismissedNearby) return;
    const target = this.location.mapPoints?.[0] ?? this.location;
    this.showNearbyPrompt = this.haversineM(this.userLat, this.userLon!, target.lat, target.lon) <= 500;
  }

  private haversineM(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2
      + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private getIsland(loc: any): string {
    const tags = loc.tags ?? [];
    if (tags.includes('comino')) return 'comino';
    if (tags.includes('gozo')) return 'gozo';
    return 'malta';
  }

  private getClosestLocations(): { location: any; distanceKm: string }[] {
    if (!this.location) return [];
    const currentIsland = this.getIsland(this.location);
    return (locations as any[])
      .filter(l => l.id !== this.location.id && this.getIsland(l) === currentIsland)
      .map(l => ({
        location: l,
        distanceKm: (this.haversineM(this.location.lat, this.location.lon, l.lat, l.lon) / 1000).toFixed(1),
      }))
      .sort((a, b) => parseFloat(a.distanceKm) - parseFloat(b.distanceKm))
      .slice(0, 4);
  }
}
