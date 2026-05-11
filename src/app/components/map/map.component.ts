import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { fromLonLat } from 'ol/proj';
import OlMap from 'ol/Map';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { boundingExtent } from 'ol/extent';

import { createMap, getCoordinatesfromLonLat, getCoordinatesfromPixel } from './map-functions';
import { buildRouteFeatures, makePinStyle } from '../../shared/utils/route-drawing';
import { LocationTracker } from '../../shared/utils/location-tracker';
import { locations } from '../../../assets/locations.json';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';
import { AnalyticsService } from '../../shared/services/analytics.service';

const ICON_CANVAS_SIZE = 80;
const ICON_TAIL_H = 18;
const CLUSTER_ZOOM = 13; // below this zoom → locality clusters; above → individual pins

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: false
})
export class MapComponent implements AfterViewInit, OnDestroy {
  public map!: OlMap;
  private maltaCoordinates = [14.363354400245052, 35.95195406978092];
  private clusterSource!: VectorSource;
  private clusterLayer!: any;
  private iconCache = new Map<string, HTMLCanvasElement>();       // teardrop pin canvases
  private rawImageCache = new Map<string, HTMLImageElement>();    // raw images for cluster circles
  private localityIconCache = new Map<string, HTMLCanvasElement>(); // locality cluster canvases
  private allFeatures: Feature[] = [];
  private filteredFeatures: Feature[] = [];
  private localityFeatures: Feature[] = [];
  private showingClusters: boolean | null = null;

  private routeSource = new VectorSource();
  private currentLocation: any = null;
  private hasRouteFeatures = false;
  tracker: LocationTracker | null = null;

  @Input() set activeFilters(filters: string[]) {
    this.filteredFeatures = filters.length === 0
      ? this.allFeatures
      : this.allFeatures.filter(f => filters.some(flt => this.matchesFilter(f.get('location'), flt)));
    this.localityIconCache.clear();
    this.refreshLayer(true);
    if (this.map) {
      this.map.getView().animate({ center: this.getMaltaViewCoordinates(), zoom: 10.2, duration: 600 });
    }
  }

  @Output() locationSelected = new EventEmitter<any | null>();
  @Output() mapTapped = new EventEmitter<void>();
  @Output() gpsCoord = new EventEmitter<{ lat: number; lon: number }>();

  constructor(
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
    this.setupRouteLayer();
    this.preloadIcons();
    requestAnimationFrame(() => this.map.updateSize());

    this.map.on('moveend', () => this.refreshLayer());

    this.map.on('click', (evt: any) => {
      const [lon, lat] = getCoordinatesfromPixel(evt.coordinate);
      console.log(`📍 lat: ${lat}, lon: ${lon}`);
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (f: any) => f);
      if (!feature) { this.mapTapped.emit(); return; }

      if (feature.get('type') === 'locality-cluster') {
        const sub: Feature[] = feature.get('features');
        const coords = sub.map(f => (f.getGeometry() as Point).getCoordinates());
        const extent = boundingExtent(coords);
        this.map.getView().fit(extent, { padding: [80, 80, 80, 80], duration: 400, maxZoom: 15 });
      } else {
        const location = feature.get('location');
        if (location) this.clickon(location);
        else this.mapTapped.emit();
      }
    });

    this.map.on('pointermove', (evt: any) => {
      const hit = this.map.hasFeatureAtPixel(evt.pixel);
      (this.map.getTargetElement() as HTMLElement).style.cursor = hit ? 'pointer' : '';
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let place: any = null;

      if (params['locationId']) {
        const id = parseInt(params['locationId'], 10);
        place = (locations as any[]).find((loc: any) => loc.id === id);
      } else if (params['title']) {
        place = locations.find(loc => encodeURIComponent(loc.title) === params['title'])
          ?? locations.find(loc => encodeURIComponent(loc.title.replace(' ', '-')) === params['title']);
      }

      if (place) {
        this.seoService.updateMetaData(place);
        this.analyticsService.pageView(window.location.href, place.title);
        this.analyticsService.event('location_view', {
          location_title: place.title,
          location_id: place.id,
          location_tags: place.tags,
        });
        this.showLocation(place);
        setTimeout(() => this.locationSelected.emit(place));
      } else if (!params['locationId'] && !params['title']) {
        this.seoService.updateMetaData();
        this.analyticsService.pageView(window.location.href, 'Explore Malta - Map');
        this.clearRoute();
        setTimeout(() => this.locationSelected.emit(null));
      }
    });
  }

  private showLocation(location: any): void {
    if (!location) return;
    this.currentLocation = location;
    this.clusterLayer.setVisible(false);
    this.drawRoute(location);
    requestAnimationFrame(() => this.refitRoute());
  }

  closeLocation(): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {} });
  }

  resetToMalta(): void {
    this.map.getView().animate({ center: this.getMaltaViewCoordinates(), zoom: 10.2, duration: 600 });
  }

  // ── Icon preloading ───────────────────────────────────────

  private preloadIcons(): void {
    locations.forEach(location => {
      const img = new Image();
      img.onload = () => {
        this.rawImageCache.set(location.img, img);
        this.localityIconCache.clear(); // rebuild cluster canvases with real images

        // Build teardrop pin canvas
        const W = ICON_CANVAS_SIZE;
        const H = ICON_CANVAS_SIZE + ICON_TAIL_H;
        const cx = W / 2;
        const cy = W / 2;
        const r = W / 2 - 2;
        const tailAngle = Math.PI / 8;

        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d')!;

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

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
        ctx.lineTo(cx, H - 1);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(0,0,0,0.10)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 0, 0, W, W);
        ctx.restore();

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

  // ── Cluster layer setup ───────────────────────────────────

  private setupClusterLayer(): void {
    this.allFeatures = locations.map(location =>
      new Feature({
        geometry: new Point(getCoordinatesfromLonLat(location.lon, location.lat)),
        location,
      })
    );
    this.filteredFeatures = [...this.allFeatures];

    this.clusterSource = new VectorSource();
    this.clusterLayer = new VectorLayer({
      source: this.clusterSource,
      style: (feature: any) => this.featureStyle(feature),
    });
    this.map.addLayer(this.clusterLayer);
    this.refreshLayer(true);
  }

  // Switches between locality-cluster features and individual pin features based on zoom
  private refreshLayer(force = false): void {
    if (!this.clusterSource || !this.map) return;
    const zoom = this.map.getView().getZoom() ?? 10;
    const shouldCluster = zoom < CLUSTER_ZOOM;
    if (!force && shouldCluster === this.showingClusters) return;
    this.showingClusters = shouldCluster;
    this.clusterSource.clear();
    if (shouldCluster) {
      this.buildLocalityFeatures();
      this.clusterSource.addFeatures(this.localityFeatures);
    } else {
      this.clusterSource.addFeatures(this.filteredFeatures);
    }
  }

  // One feature per locality, positioned at centroid, with highest-id location as representative
  private buildLocalityFeatures(): void {
    const groups = new Map<string, Feature[]>();
    for (const f of this.filteredFeatures) {
      const key: string = f.get('location').locality ?? 'Other';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(f);
    }

    this.localityFeatures = [];
    for (const [locality, features] of groups) {
      const coords = features.map(f => (f.getGeometry() as Point).getCoordinates());
      const cx = coords.reduce((s, c) => s + c[0], 0) / coords.length;
      const cy = coords.reduce((s, c) => s + c[1], 0) / coords.length;

      const rep = features.find(f => f.get('location').clusterPriority)
        ?? features.reduce((a, b) =>
          b.get('location').id > a.get('location').id ? b : a
        );

      this.localityFeatures.push(new Feature({
        geometry: new Point([cx, cy]),
        type: 'locality-cluster',
        locality,
        features,
        img: rep.get('location').img,
        count: features.length,
      }));
    }
  }

  // ── Style dispatch ────────────────────────────────────────

  private featureStyle(feature: any): Style {
    return feature.get('type') === 'locality-cluster'
      ? this.localityClusterStyle(feature)
      : this.individualPinStyle(feature);
  }

  private individualPinStyle(feature: any): Style {
    const location = feature.get('location');
    const zoom = this.map.getView().getZoom() ?? 10;
    const iconSize = this.getIconSize(zoom);
    const canvas = this.iconCache.get(location.img);

    if (canvas) {
      const coords = (feature.getGeometry() as Point).getCoordinates();
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

    return new Style({
      image: new CircleStyle({
        radius: iconSize / 2,
        fill: new Fill({ color: '#d1d5db' }),
        stroke: new Stroke({ color: 'white', width: 2 }),
      }),
    });
  }

  private localityClusterStyle(feature: any): Style {
    const img: string = feature.get('img');
    const count: number = feature.get('count');
    const locality: string = feature.get('locality');
    const key = `${img}|${count}|${locality}`;

    let canvas = this.localityIconCache.get(key);
    if (!canvas) {
      canvas = this.buildLocalityCanvas(img, count, locality);
      this.localityIconCache.set(key, canvas);
    }

    const zoom = this.map.getView().getZoom() ?? 10;
    const scale = this.getLocalityScale(zoom);
    const circleCenter = 42; // CY in buildLocalityCanvas
    return new Style({
      image: new Icon({
        img: canvas,
        size: [canvas.width, canvas.height],
        scale,
        anchor: [0.5, circleCenter / canvas.height],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
      }),
      zIndex: 10,
    });
  }

  // Draws: circular photo + count badge (bottom-right) + locality name pill below
  private buildLocalityCanvas(imgSrc: string, count: number, locality: string): HTMLCanvasElement {
    const R = 36;
    const CX = 50;
    const CY = 42; // circle center Y (top padding for shadow)
    const W = 100;
    const pillH = 22;
    const pillGap = 7;
    const H = CY + R + pillGap + pillH + 4;

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // Shadow + white backing circle
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.28)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    ctx.beginPath();
    ctx.arc(CX, CY, R + 2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.restore();

    // Photo clipped to circle
    const rawImg = this.rawImageCache.get(imgSrc);
    if (rawImg?.complete && rawImg.naturalWidth) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.clip();
      const side = R * 2;
      const scale = Math.max(side / rawImg.naturalWidth, side / rawImg.naturalHeight);
      const sw = side / scale;
      const sh = side / scale;
      const sx = (rawImg.naturalWidth - sw) / 2;
      const sy = (rawImg.naturalHeight - sh) / 2;
      ctx.drawImage(rawImg, sx, sy, sw, sh, CX - R, CY - R, side, side);
      ctx.restore();
    } else {
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = '#d1d5db';
      ctx.fill();
      ctx.restore();
    }

    // White border ring
    ctx.beginPath();
    ctx.arc(CX, CY, R + 2, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Count badge (bottom-right of circle)
    const badgeR = count > 9 ? 13 : 11;
    const badgeX = CX + R - 2;
    const badgeY = CY + R - 2;
    ctx.beginPath();
    ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
    ctx.fillStyle = '#F4A922';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = `bold ${count > 9 ? 10 : 11}px Roboto, sans-serif`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(count), badgeX, badgeY + 0.5);

    // Locality name pill
    ctx.font = '600 11px Roboto, sans-serif';
    const textW = ctx.measureText(locality).width;
    const pillW = Math.min(textW + 16, W - 4);
    const pillX = CX - pillW / 2;
    const pillY = CY + R + pillGap;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.14)';
    ctx.shadowBlur = 4;
    ctx.fillStyle = '#fff';
    this.fillRoundRect(ctx, pillX, pillY, pillW, pillH, 11);
    ctx.restore();

    ctx.fillStyle = '#374151';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(locality, CX, pillY + pillH / 2, pillW - 8);

    return canvas;
  }

  private fillRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
    ctx.fill();
  }

  private getLocalityScale(zoom: number): number {
    if (zoom <= 10.5) return 0.52;
    if (zoom <= 11)   return 0.62;
    if (zoom <= 11.5) return 0.74;
    if (zoom <= 12)   return 0.86;
    return 1.0;
  }

  private getIconSize(zoom: number): number {
    if (zoom <= 10.8) return 14;
    if (zoom <= 11.5) return 20;
    if (zoom <= 12.3) return 28;
    if (zoom <= 13.3) return 42;
    return 60;
  }

  // ── Route layer ───────────────────────────────────────────

  private setupRouteLayer(): void {
    this.map.addLayer(new VectorLayer({ source: this.routeSource, zIndex: 50 }));
  }

  private drawRoute(location: any): void {
    this.routeSource.clear();
    const features = buildRouteFeatures(location.mapPoints ?? []);
    this.hasRouteFeatures = features.length > 0;
    if (this.hasRouteFeatures) {
      this.routeSource.addFeatures(features);
    } else {
      const pin = new Feature({ geometry: new Point(getCoordinatesfromLonLat(location.lon, location.lat)) });
      pin.setStyle(makePinStyle('#F4A922'));
      this.routeSource.addFeature(pin);
    }
  }

  private clearRoute(): void {
    this.routeSource.clear();
    this.currentLocation = null;
    this.hasRouteFeatures = false;
    this.clusterLayer.setVisible(true);
  }

  refitRoute(): void {
    if (!this.currentLocation) return;
    if (this.hasRouteFeatures) {
      this.map.getView().fit(this.routeSource.getExtent(), {
        padding: [70, 40, 50, 40],
        duration: 450,
        maxZoom: 16,
      });
    } else {
      const flatCoords = this.getLocationMapCoordinates(this.currentLocation);
      this.map.getView().animate({ center: flatCoords, zoom: 14, duration: 450 });
    }
  }

  // ── GPS location layer ────────────────────────────────────

  private setupLocationLayer(): void {
    const source = new VectorSource();
    this.map.addLayer(new VectorLayer({ source, zIndex: 200 }));
    this.tracker = new LocationTracker(source, this.map, {
      showHeadingCone: true,
      followZoom: 15,
      onPositionUpdate: (lat, lon) => this.gpsCoord.emit({ lat, lon }),
    });
    this.tracker.start();
  }

  ngOnDestroy(): void {
    this.tracker?.destroy();
  }

  // ── Public API ────────────────────────────────────────────

  updateSize(): void {
    this.map?.updateSize();
  }

  locateMe(): void {
    const last = this.tracker?.lastCoord;
    if (last) {
      this.map.getView().animate({ center: last, zoom: 15, duration: 400 });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coord = this.tracker?.lastCoord
          ?? fromLonLat([pos.coords.longitude, pos.coords.latitude]) as [number, number];
        this.map.getView().animate({ center: coord, zoom: 15, duration: 400 });
      }, () => {});
    }
  }

  clickon(data: any): void {
    const queryParams = { title: encodeURIComponent(data.title.replace(' ', '-')) };
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams });
  }

  // ── Helpers ───────────────────────────────────────────────

  private matchesFilter(loc: any, filter: string): boolean {
    const tags: string[] = loc.tags ?? [];
    switch (filter) {
      case 'beach':      return tags.includes('beach') || tags.includes('bay');
      case 'cave':       return tags.includes('cave') || tags.includes('sea-cave');
      case 'historical': return tags.includes('historical') || tags.includes('religious') || tags.includes('fortress') || tags.includes('fortification') || tags.includes('cultural');
      case 'hidden':     return tags.includes('hidden');
      case 'easy':       return tags.includes('easy');
      case 'hard':       return tags.includes('hard');
      case 'gozo':       return tags.includes('gozo');
      case 'comino':     return tags.includes('comino');
      default:           return true;
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

  private getMaltaViewCoordinates(): number[] {
    return getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]);
  }
}
