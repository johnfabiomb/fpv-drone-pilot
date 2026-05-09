import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { locations } from '../../../assets/locations.json';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { FEATURES } from '../../feature-flags';
import { RouteMapComponent } from '../route-map/route-map.component';

export enum ModalActions {
  EXPLORE = 'EXPLORE',
  GOOGLE_MAPS = 'GOOGLE_MAPS'
}

@Component({
  selector: 'app-map-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    PipesModule,
    ImageGalleryComponent,
    RouteMapComponent,
  ],
  templateUrl: './map-modal.component.html',
  styleUrl: './map-modal.component.scss'
})
export class MapModalComponent {

  readonly features = FEATURES;
  shareLabel = 'Share';
  shareLabelTimer: any;

  @ViewChild('content') content!: ElementRef<any>;
  @ViewChild('frame') frame!: ElementRef<any>;


  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dialogRef.close();
    }
  }

  public recommendedLocations: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<MapModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eRef: ElementRef,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public seoService: SeoService,
    public analyticsService: AnalyticsService,
    @Inject(DOCUMENT) public document: Document) {
    document.body.style.overflow = 'hidden';
    this.recommendedLocations = this.getRandomLocations
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
    clearTimeout(this.frameTimer);
  }

  private frameTimer: any;

  ngAfterViewInit() {
    this.frame.nativeElement.style.display = 'none';
    this.content.nativeElement.style.flexDirection = 'row';
    this.frameTimer = setTimeout(() => this.showFrame(), 5000);
  }

  loaded() {
    clearTimeout(this.frameTimer);
    setTimeout(() => this.showFrame(), 800);
  }

  private showFrame() {
    this.frame.nativeElement.style.display = 'block';
    this.content.nativeElement.style.flexDirection = 'column';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  explore() {
    this.analyticsService.event('explore_malta_click', { from_location: this.data?.title });
    this.dialogRef.close(ModalActions.EXPLORE);
  }

  buildTripFrom() {
    this.analyticsService.event('build_trip_from', { location_title: this.data?.title, location_id: this.data?.id });
    this.router.navigate(['/plan'], { queryParams: { from: this.data.id } });
    this.dialogRef.close('__navigated__');
  }

  hasRecordedRoute(): boolean {
    return (this.data?.mapPoints ?? []).some((p: any) => p.type === 'waypoint');
  }

  visibleMapPoints(): any[] {
    return (this.data?.mapPoints ?? []).filter((p: any) =>
      p.type !== 'waypoint' && p.showButton !== false
    );
  }

  navigateTo(point: any, index: number) {
    const visible = this.visibleMapPoints();
    const prev = index > 0 ? visible[index - 1] : null;
    const mode = point.type === 'parking' ? 'driving' : 'walking';
    let url = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lon}&travelmode=${mode}`;
    if (prev && point.type !== 'destination') url += `&origin=${prev.lat},${prev.lon}`;
    this.analyticsService.event('navigate_to_point', { location_title: this.data?.title, point_type: point.type });
    window.open(url, '_blank');
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

  share() {
    const title = encodeURIComponent(this.data.title.replace(/ /g, '-'));
    const url = `${location.origin}/#/malta?title=${title}`;
    const share = () => {
      clearTimeout(this.shareLabelTimer);
      this.shareLabel = 'Copied!';
      this.shareLabelTimer = setTimeout(() => this.shareLabel = 'Share', 2500);
    };
    if (navigator.share) {
      navigator.share({ title: this.data.title, url }).catch(() => {});
      return;
    }
    navigator.clipboard.writeText(url).then(share).catch(() => {
      // fallback for browsers without clipboard API
      const el = document.createElement('input');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      share();
    });
    this.analyticsService.event('location_share', { location_title: this.data?.title, location_id: this.data?.id });
  }

  clickon(data: any) {
    this.analyticsService.event('recommendation_click', { from_location: this.data?.title, to_location: data?.title });
    const queryParams = { title: encodeURIComponent(data.title.replace(' ', '-')) };
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams });
  }

  formatTag(tag: string): string {
    return tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  public get getRandomLocations() {
    const uniqueLocations = [...new Set(locations)]; // Ensure unique values
    if (uniqueLocations.length <= 9) {
      return uniqueLocations; // Return all if fewer than 10 locations exist
    }

    // Fisher-Yates Shuffle Algorithm for randomness
    for (let i = uniqueLocations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueLocations[i], uniqueLocations[j]] = [uniqueLocations[j], uniqueLocations[i]];
    }

    return uniqueLocations.slice(0, 9);// Return first 10 unique items 
  }
}
