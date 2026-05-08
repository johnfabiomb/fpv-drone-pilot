import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import OlMap from 'ol/Map';
import Feature from 'ol/Feature';
import { Point, Circle as OlCircle } from 'ol/geom';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { boundingExtent } from 'ol/extent';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { createMap, getCoordinatesfromLonLat, getCoordinatesfromPixel } from './map-functions';
import { MapModalComponent, ModalActions } from '../map-modal/map-modal.component';
import { locations } from '../../../assets/locations.json';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';
import { AnalyticsService } from '../../shared/services/analytics.service';

const ICON_CANVAS_SIZE = 80;
const ICON_TAIL_H = 18;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: false
})
export class MapComponent implements AfterViewInit, OnDestroy {
  public map!: OlMap;
  private maltaCoordinates = [14.363354400245052, 35.95195406978092];
  private clusterSource!: any;
  private clusterLayer!: any;
  private iconCache = new Map<string, HTMLCanvasElement>();
  private allFeatures: Feature[] = [];
  private currentDialogRef: MatDialogRef<MapModalComponent> | null = null;

  private locationFeature = new Feature<Point>();
  private accuracyFeature = new Feature<OlCircle>();
  private headingFeature = new Feature<Point>();
  private watchId: number | null = null;
  private lastKnownCoords: number[] | null = null;
  private currentHeadingRad = 0;
  private coneCanvas: HTMLCanvasElement | null = null;

  @Input() set activeFilters(value: string[]) {
    if (this.clusterSource) this.applyFilters(value);
  }

  @Output() modalOpenChange = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public seoService: SeoService,
    public analyticsService: AnalyticsService
  ) {}

  ngAfterViewInit(): void {
    this.map = createMap(
      getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]),
      10.2,
      'ol-map'
    );

    this.setupClusterLayer();
    this.setupLocationLayer();
    this.preloadIcons();

    this.map.on('moveend', () => {
      const zoom = this.map.getView().getZoom() ?? 10;
      this.clusterSource.setDistance(this.getClusterDistance(zoom));
    });

    this.map.on('click', (evt: any) => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (f: any) => f);
      if (!feature) return;
      const subFeatures: Feature[] = feature.get('features');
      if (!subFeatures?.length) return;

      if (subFeatures.length > 1) {
        const coords = subFeatures.map(f => (f.getGeometry() as Point).getCoordinates());
        const extent = boundingExtent(coords);
        this.map.getView().fit(extent, { padding: [100, 100, 100, 100], duration: 400, maxZoom: 17 });
      } else {
        const location = subFeatures[0].get('location');
        this.clickon(location);
      }
    });

    this.map.on('pointermove', (evt: any) => {
      const hit = this.map.hasFeatureAtPixel(evt.pixel);
      (this.map.getTargetElement() as HTMLElement).style.cursor = hit ? 'pointer' : '';
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['title']) {
        const place = locations.find(loc => encodeURIComponent(loc.title) === params['title'])
          ?? locations.find(loc => encodeURIComponent(loc.title.replace(' ', '-')) === params['title']);
        this.seoService.updateMetaData(place);
        this.analyticsService.pageView(window.location.href, place?.title ?? params['title']);
        this.analyticsService.event('location_view', {
          location_title: place?.title,
          location_id: place?.id,
          location_tags: place?.tags,
        });
        this.openDialog(place, this.getLocationMapCoordinates(place));
      } else {
        this.seoService.updateMetaData();
        this.analyticsService.pageView(window.location.href, 'Explore Malta - Map');
      }
    });
  }

  private preloadIcons(): void {
    locations.forEach(location => {
      const img = new Image();
      img.onload = () => {
        const W = ICON_CANVAS_SIZE;
        const H = ICON_CANVAS_SIZE + ICON_TAIL_H;
        const cx = W / 2;
        const cy = W / 2;
        const r = W / 2 - 2;
        const tailAngle = Math.PI / 8; // narrow tail ~22.5°

        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d')!;

        // Teardrop background with soft shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.22)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
        ctx.lineTo(cx, H - 1);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.restore();

        // Subtle stroke to define edges
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
        ctx.lineTo(cx, H - 1);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(0,0,0,0.10)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Photo clipped to circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 0, 0, W, W);
        ctx.restore();

        // Border ring around photo
        ctx.beginPath();
        ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        this.iconCache.set(location.img, canvas);
        this.clusterLayer.changed();
      };
      img.src = location.img;
    });
  }

  private setupClusterLayer(): void {
    this.allFeatures = locations.map(location =>
      new Feature({
        geometry: new Point(getCoordinatesfromLonLat(location.lon, location.lat)),
        location,
      })
    );

    this.clusterSource = new Cluster({
      distance: this.getClusterDistance(10.2),
      minDistance: 25,
      source: new VectorSource({ features: [...this.allFeatures] }),
    });

    this.clusterLayer = new VectorLayer({
      source: this.clusterSource,
      style: (feature) => this.clusterStyle(feature),
    });

    this.map.addLayer(this.clusterLayer);
  }

  private applyFilters(filters: string[]): void {
    const filtered = filters.length === 0
      ? this.allFeatures
      : this.allFeatures.filter(f => filters.some(filter => this.matchesFilter(f.get('location'), filter)));
    const source = this.clusterSource.getSource();
    source.clear(true);
    source.addFeatures(filtered);
  }

  private matchesFilter(location: any, filter: string): boolean {
    const tags: string[] = location.tags ?? [];
    switch (filter) {
      case 'beach':      return tags.includes('beach') || tags.includes('bay');
      case 'cave':       return tags.includes('cave') || tags.includes('sea-cave') || tags.includes('grotto');
      case 'historical': return tags.includes('historical') || tags.includes('religious') || tags.includes('fortress') || tags.includes('fortification') || tags.includes('church') || tags.includes('cultural');
      case 'hidden':     return tags.includes('hidden');
      case 'easy':       return tags.includes('easy');
      case 'hard':       return tags.includes('hard');
      default:           return true;
    }
  }

  private clusterStyle(feature: any): Style {
    const subFeatures: Feature[] = feature.get('features');
    const size = subFeatures.length;
    const zoom = this.map.getView().getZoom() ?? 10;
    const iconSize = this.getIconSize(zoom);

    if (size === 1) {
      const location = subFeatures[0].get('location');
      const canvas = this.iconCache.get(location.img);

      if (canvas) {
        const coords = (subFeatures[0].getGeometry() as Point).getCoordinates();
        return new Style({
          image: new Icon({
            img: canvas,
            size: [canvas.width, canvas.height],
            scale: iconSize / ICON_CANVAS_SIZE,
            anchor: [0.5, 1.0],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
          }),
          zIndex: -Math.round(coords[1] / 1000),
        });
      }

      // placeholder while image loads
      return new Style({
        image: new CircleStyle({
          radius: iconSize / 2,
          fill: new Fill({ color: '#d1d5db' }),
          stroke: new Stroke({ color: 'white', width: 2 }),
        }),
      });
    }

    const radius = size > 99 ? 26 : 22;
    return new Style({
      image: new CircleStyle({
        radius,
        fill: new Fill({ color: '#ffffff' }),
        stroke: new Stroke({ color: '#F4A922', width: 2.5 }),
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({ color: '#F4A922' }),
        font: 'bold 13px Roboto, sans-serif',
        offsetY: 1,
      }),
      zIndex: 10,
    });
  }

  private getClusterDistance(zoom: number): number {
    if (zoom <= 11) return 50;
    if (zoom <= 12) return 35;
    if (zoom <= 13) return 25;
    if (zoom <= 14) return 18;
    if (zoom <= 15) return 10;
    return 5;
  }

  private getIconSize(zoom: number): number {
    if (zoom <= 10.8) return 14;
    if (zoom <= 11.5) return 20;
    if (zoom <= 12.3) return 28;
    if (zoom <= 13.3) return 42;
    return 60;
  }

  private setupLocationLayer(): void {
    const source = new VectorSource({
      features: [this.accuracyFeature, this.headingFeature, this.locationFeature],
    });

    const locationLayer = new VectorLayer({
      source,
      style: (feature) => {
        if (feature === this.locationFeature) {
          return new Style({
            image: new CircleStyle({
              radius: 9,
              fill: new Fill({ color: '#4285F4' }),
              stroke: new Stroke({ color: '#ffffff', width: 2.5 }),
            }),
            zIndex: 200,
          });
        }
        if (feature === this.headingFeature) {
          return new Style({
            image: new Icon({
              img: this.getConeCanvas(),
              size: [60, 60],
              anchor: [0.5, 0.5],
              rotation: this.currentHeadingRad,
            }),
            zIndex: 198,
          });
        }
        // accuracy ring
        return new Style({
          fill: new Fill({ color: 'rgba(66,133,244,0.10)' }),
          stroke: new Stroke({ color: 'rgba(66,133,244,0.30)', width: 1.5 }),
          zIndex: 197,
        });
      },
      zIndex: 200,
    });

    this.map.addLayer(locationLayer);
    this.startWatchingLocation();
  }

  private getConeCanvas(): HTMLCanvasElement {
    if (this.coneCanvas) return this.coneCanvas;
    const size = 60;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const cx = size / 2;
    const cy = size / 2;
    // Cone fans upward from center (~70° wide)
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, size / 2 - 2, -Math.PI / 2 - Math.PI / 2.6, -Math.PI / 2 + Math.PI / 2.6);
    ctx.closePath();
    ctx.fillStyle = 'rgba(66,133,244,0.35)';
    ctx.fill();
    this.coneCanvas = canvas;
    return canvas;
  }

  private startWatchingLocation(): void {
    if (!navigator.geolocation) return;
    this.watchId = navigator.geolocation.watchPosition(
      pos => this.updateLocationDot(pos),
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );
  }

  private updateLocationDot(pos: GeolocationPosition): void {
    const coords = getCoordinatesfromLonLat(pos.coords.longitude, pos.coords.latitude);
    this.lastKnownCoords = coords;
    this.locationFeature.setGeometry(new Point(coords));
    if (pos.coords.accuracy) {
      this.accuracyFeature.setGeometry(new OlCircle(coords, pos.coords.accuracy));
    }
    if (pos.coords.heading != null && !isNaN(pos.coords.heading)) {
      this.currentHeadingRad = (pos.coords.heading * Math.PI) / 180;
      this.headingFeature.setGeometry(new Point(coords));
    } else {
      this.headingFeature.setGeometry(null as any);
    }
  }

  ngOnDestroy(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  locateMe(): void {
    if (this.lastKnownCoords) {
      this.map.getView().animate({ center: this.lastKnownCoords, zoom: 15, duration: 500 });
      return;
    }
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = getCoordinatesfromLonLat(pos.coords.longitude, pos.coords.latitude);
        this.map.getView().animate({ center: coords, zoom: 15, duration: 500 });
      },
      () => {}
    );
  }

  clickon(data: any): void {
    const queryParams = { title: encodeURIComponent(data.title.replace(' ', '-')) };
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams });
  }

  private openDialog(location: any, flatCoordinates: number[]): void {
    if (this.currentDialogRef) {
      this.currentDialogRef.close('__navigated__');
      this.currentDialogRef = null;
    }

    setTimeout(() => this.modalOpenChange.emit(true), 0);
    setTimeout(() => {
      this.currentDialogRef = this.dialog.open(MapModalComponent, { data: location });
      this.currentDialogRef.afterClosed().subscribe(res => {
        this.currentDialogRef = null;
        if (res !== '__navigated__') {
          setTimeout(() => this.modalOpenChange.emit(false), 0);
          this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {} });
        }
        if (res === ModalActions.EXPLORE) {
          this.map.getView().animate({ center: this.getMaltaViewCoordinates(), zoom: 10.2, duration: 600 });
        }
        if (res === ModalActions.GOOGLE_MAPS) {
          window.open(this.getGoogleMapsUrl(location, flatCoordinates), '_blank');
        }
      });
    }, 1);

    if ((this.map.getView().getZoom() ?? 0) <= 13) {
      this.map.getView().animate({ center: flatCoordinates, zoom: 13, duration: 500 });
    }
  }

  private getLocationMapCoordinates(location: any): number[] {
    if (location?.mapPoints?.length) {
      const dest = location.mapPoints.find((p: any) => p.type === 'destination')
        ?? location.mapPoints[location.mapPoints.length - 1];
      return getCoordinatesfromLonLat(dest.lon, dest.lat);
    }
    return getCoordinatesfromLonLat(location.lon, location.lat);
  }

  private getGoogleMapsUrl(location: any, flatCoordinates: number[]): string {
    if (location?.mapPoints?.length > 1) {
      const origin = location.mapPoints[0];
      const destination = location.mapPoints[location.mapPoints.length - 1];
      const waypoints = location.mapPoints.slice(1, -1)
        .map((p: any) => `${p.lat},${p.lon}`).join('|');
      return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lon}&destination=${destination.lat},${destination.lon}${waypoints ? `&waypoints=${waypoints}` : ''}`;
    }
    return 'https://maps.google.com/?q=' + getCoordinatesfromPixel(flatCoordinates).reverse().join(',');
  }

  private getMaltaViewCoordinates(): number[] {
    return getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]);
  }
}
