import { Component, Input, Output, EventEmitter, Inject, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { AdBannerComponent } from '../ad-banner/ad-banner.component';
import { NavInterstitialComponent } from '../nav-interstitial/nav-interstitial.component';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { locations } from '../../../assets/locations.json';

@Component({
  selector: 'app-location-panel',
  standalone: true,
  imports: [CommonModule, ImageGalleryComponent, AdBannerComponent, NavInterstitialComponent],
  templateUrl: './location-panel.component.html',
  styleUrl: './location-panel.component.scss',
})
export class LocationPanelComponent implements OnChanges, OnDestroy {
  @Input() location: any = null;
  @Input() minimized = false;
  @Input() userLat: number | null = null;
  @Input() userLon: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() explore = new EventEmitter<void>();
  @Output() headerDragStart = new EventEmitter<TouchEvent>();
  @Output() headerDragMove = new EventEmitter<TouchEvent>();
  @Output() headerDragEnd = new EventEmitter<TouchEvent>();
  @Output() toggleCollapse = new EventEmitter<void>();

  shareLabel = 'Share';
  shareFeedbackVisible = false;

  confirmingClose = false;
  nearbyMode = false;
  showNearbyPrompt = false;
  closestLocations: { location: any; distanceKm: string }[] = [];
  private prevLocationId: any = null;
  private dismissedNearby = false;

  private shareLabelTimer: any;
  private shareFeedbackTimer: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private analyticsService: AnalyticsService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnChanges(): void {
    if (this.location && this.location.id !== this.prevLocationId) {
      this.prevLocationId = this.location.id;
      this.confirmingClose = false;
      this.nearbyMode = false;
      this.showNearbyPrompt = false;
      this.dismissedNearby = false;
      this.shareLabel = 'Share';
      this.shareFeedbackVisible = false;
      this.closestLocations = this.getClosestLocations();
    }
    this.checkProximity();
  }

  onConfirmClose(): void {
    this.confirmingClose = false;
    this.close.emit();
  }

  onCloseRequested(): void {
    if (this.nearbyMode) {
      this.confirmingClose = true;
    } else {
      this.close.emit();
    }
  }

  requestClose(): void {
    this.onCloseRequested();
  }

  activateHikingMode(): void {
    this.nearbyMode = true;
    this.showNearbyPrompt = false;
  }

  dismissNearbyPrompt(): void {
    this.dismissedNearby = true;
    this.showNearbyPrompt = false;
  }

  private checkProximity(): void {
    if (!this.location || this.userLat === null || this.nearbyMode || this.dismissedNearby) return;
    const target = this.location.mapPoints?.[0] ?? this.location;
    const dist = this.haversineM(this.userLat, this.userLon!, target.lat, target.lon);
    this.showNearbyPrompt = dist <= 500;
  }

  private haversineM(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2
      + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  ngOnDestroy(): void {
    clearTimeout(this.shareLabelTimer);
    clearTimeout(this.shareFeedbackTimer);
  }

  hasRecordedRoute(): boolean {
    return (this.location?.mapPoints ?? []).some((p: any) => p.type === 'waypoint');
  }

  visibleMapPoints(): any[] {
    return (this.location?.mapPoints ?? []).filter((p: any) =>
      p.type !== 'waypoint' && p.showButton !== false
    );
  }

  pendingNavUrl: string | null = null;

  navigateTo(point: any, index: number): void {
    const visible = this.visibleMapPoints();
    const prev = index > 0 ? visible[index - 1] : null;
    const mode = point.type === 'parking' ? 'driving' : 'walking';
    let url = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lon}&travelmode=${mode}`;
    if (prev && point.type !== 'destination') url += `&origin=${prev.lat},${prev.lon}`;
    this.analyticsService.event('navigate_to_point', { location_title: this.location?.title, point_type: point.type });
    this.pendingNavUrl = url;
  }

  pointLabel(point: any, index: number): string {
    const isOnly = index === 0;
    switch (point.type) {
      case 'parking': return '🚗 Drive to Parking';
      case 'checkpoint': return '🚶 Walk to ' + (point.label ?? 'Checkpoint');
      case 'destination': return isOnly ? '🗺️ Get Directions' : '🚶 Walk to ' + (point.label ?? 'Final Destination');
      default: return '📍 ' + (point.label ?? 'Get Directions');
    }
  }

  share(): void {
    const url = new URL(`${this.document.location.origin}/malta`);
    url.searchParams.set('locationId', String(this.location.id));

    const shareUrl = url.toString();

    const confirm = () => {
      clearTimeout(this.shareLabelTimer);
      this.shareLabel = 'Copied!';
      this.showShareFeedback();
      this.shareLabelTimer = setTimeout(() => { this.shareLabel = 'Share'; }, 2500);
    };

    this.analyticsService.event('location_share', {
      location_title: this.location?.title,
      location_id: this.location?.id
    });

    if (navigator.share) {
      this.showShareFeedback();

      navigator.share({
        title: this.location.title,
        text: `Check this place in Malta: ${this.location.title}`,
        url: shareUrl
      }).catch(() => { });

      return;
    }

    const clipboardWrite = navigator.clipboard && typeof navigator.clipboard.writeText === 'function';

    const fallbackCopy = () => {
      const el = this.document.createElement('input') as HTMLInputElement;
      el.value = shareUrl;
      this.document.body.appendChild(el);
      el.select();
      this.document.execCommand('copy');
      this.document.body.removeChild(el);
      confirm();
    };

    if (clipboardWrite) {
      navigator.clipboard.writeText(shareUrl).then(confirm).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  }

  private showShareFeedback(): void {
    clearTimeout(this.shareFeedbackTimer);

    this.shareFeedbackVisible = true;

    this.shareFeedbackTimer = setTimeout(() => {
      this.shareFeedbackVisible = false;
    }, 3500);
  }

  clickon(loc: any): void {
    if (!loc || !loc.id) return;
    console.log('Clicking on closest spot:', loc.id);
    this.analyticsService.event('recommendation_click', { from_location: this.location?.title, to_location: loc?.title });
    const queryParams = { locationId: loc.id };
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams });
  }

  onExplore(): void {
    this.analyticsService.event('explore_malta_click', { from_location: this.location?.title });
    this.explore.emit();
  }

  formatTag(tag: string): string {
    return tag.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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

  private getLocationSlug(title: string): string {
    return title.trim().replace(/ /g, '-');
  }
}