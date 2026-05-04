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
  ],
  templateUrl: './map-modal.component.html',
  styleUrl: './map-modal.component.scss'
})
export class MapModalComponent {

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

  googleMaps() {
    this.analyticsService.event('google_maps_open', { location_title: this.data?.title, location_id: this.data?.id });
    this.dialogRef.close(ModalActions.GOOGLE_MAPS);
  }

  openPointOnMap(point: any) {
    this.analyticsService.event('map_point_open', { location_title: this.data?.title, point_label: point.label });
    const url = `https://maps.google.com/?q=${point.lat},${point.lon}`;
    window.open(url, '_blank');
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
