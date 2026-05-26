import { AfterViewInit, Component, EventEmitter, HostBinding, Input, NgZone, OnDestroy, Output, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { fromLonLat } from 'ol/proj';
import OlMap from 'ol/Map';
import Feature, { FeatureLike } from 'ol/Feature';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Point } from 'ol/geom';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { boundingExtent } from 'ol/extent';

import { createMap, getCoordinatesfromLonLat, getCoordinatesfromPixel } from './map-functions';
import { buildRouteFeatures, makePinStyle, ROUTE_COLORS } from '../../shared/utils/route-drawing';
import { LocationTracker } from '../../shared/utils/location-tracker';
import { locations } from '../../../assets/locations.json';
import { Router } from '@angular/router';
import { Location, MapPoint, Provider } from '../../shared/models';
import { matchesFilter, FilterId } from '../../shared/utils/location-filter.util';
import { resolveProviderColor } from '../../shared/utils/provider.utils';
import { FEATURES } from '../../feature-flags';

const ICON_CANVAS_SIZE = 80;
const ICON_TAIL_H = 18;
const PROVIDER_PIN_SIZE = 80;
const CLUSTER_ZOOM = 12; // below this zoom → locality clusters; above → individual pins

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgIf],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  public map!: OlMap;
  private maltaCoordinates = [14.363354400245052, 35.95195406978092];
  private clusterSource!: VectorSource;
  private clusterLayer!: VectorLayer<VectorSource>;
  private iconCache = new Map<string, HTMLCanvasElement>();
  private rawImageCache = new Map<string, HTMLImageElement>();
  private localityIconCache = new Map<string, HTMLCanvasElement>();
  private allFeatures: Feature[] = [];
  private filteredFeatures: Feature[] = [];
  private localityFeatures: Feature[] = [];
  private showingClusters: boolean | null = null;

  private providerSource = new VectorSource();
  private providerLayer!: VectorLayer<VectorSource>;
  private providerCanvasCache = new Map<string, HTMLCanvasElement>();

  private routeSource = new VectorSource();
  private routeLabelSource = new VectorSource();
  private currentLocation: Location | null = null;
  private hasRouteFeatures = false;
  tracker: LocationTracker | null = null;
  compassMode = false;
  private absoluteHandler: ((e: Event) => void) | null = null;
  private relativeHandler: ((e: DeviceOrientationEvent) => void) | null = null;

  @Input() set selectedLocation(loc: Location | null) {
    if (loc === this._selectedLocation) return;
    this._selectedLocation = loc;
    if (!this.map) return;
    if (loc) {
      this.showLocation(loc);
    } else {
      this.clearRoute();
    }
  }
  get selectedLocation(): Location | null { return this._selectedLocation; }
  private _selectedLocation: Location | null = null;

  // Stored and consumed by refitRoute() — which fires ~300ms later via scheduleMapUpdate.
  private pendingFitPoint: { lat: number; lon: number } | null = null;
  @Input() set fitPoint(p: { lat: number; lon: number } | null) {
    this.pendingFitPoint = p;
  }
  @HostBinding('class.map-rotated') isRotated = false;

  @Input() set providerPins(providers: Provider[]) {
    this._providerPins = providers ?? [];
    if (this.map && FEATURES.PROMOTIONS) this.rebuildProviderLayer();
  }
  private _providerPins: Provider[] = [];

  @Input() set activeFilters(filters: string[]) {
    if (filters.length === 1 && filters[0] === 'deals') {
      this.filteredFeatures = [];
    } else {
      this.filteredFeatures = filters.length === 0
        ? this.allFeatures
        : this.allFeatures.filter(f =>
            filters.some(flt => matchesFilter(f.get('location') as Location, flt as FilterId))
          );
    }
    this.localityIconCache.clear();
    this.refreshLayer(true);
    // Only zoom to Malta overview when a filter is actively applied, not when clearing.
    // Clearing happens during navigation (e.g. LocationPageComponent sets filters=[]) and
    // we must not override the subsequent zoom-to-location animation.
    if (this.map && filters.length > 0) {
      this.map.getView().animate({ center: this.getMaltaViewCoordinates(), zoom: 10.2, duration: 600 });
    }
  }

  @Output() locationSelected = new EventEmitter<Location | null>();
  @Output() mapTapped = new EventEmitter<void>();
  @Output() gpsCoord = new EventEmitter<{ lat: number; lon: number }>();
  @Output() providerPinSelected = new EventEmitter<Provider>();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly router = inject(Router);

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;
    this.map = createMap(
      getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]),
      10.2,
      'ol-map'
    );

    this.setupClusterLayer();
    this.setupProviderLayer();
    this.setupLocationLayer();
    this.setupRouteLayer();
    this.preloadIcons();
    requestAnimationFrame(() => this.map.updateSize());

    this.map.on('moveend', () => this.refreshLayer());
    this.map.getView().on('change:rotation', () => {
      const rotated = Math.abs(this.map.getView().getRotation()) > 0.001;
      if (rotated !== this.isRotated) {
        this.ngZone.run(() => { this.isRotated = rotated; });
      }
    });

    this.map.on('click', (evt: MapBrowserEvent<UIEvent>) => {
      const [lon, lat] = getCoordinatesfromPixel(evt.coordinate);
      console.log(`📍 lat: ${lat}, lon: ${lon}`);
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (f: FeatureLike) => f);
      if (!feature) { this.mapTapped.emit(); return; }

      if (feature.get('type') === 'provider-pin') {
        this.providerPinSelected.emit(feature.get('provider'));
        return;
      }

      if (feature.get('type') === 'locality-cluster') {
        const sub: Feature[] = feature.get('features');
        const coords = sub.map(f => (f.getGeometry() as Point).getCoordinates());
        const extent = boundingExtent(coords);
        this.map.getView().fit(extent, {
          padding: [80, 80, 80, 80], duration: 400, maxZoom: 14, callback: () => {
            const z = this.map.getView().getZoom() ?? 0;
            if (z < CLUSTER_ZOOM) {
              this.map.getView().animate({ zoom: CLUSTER_ZOOM, duration: 200 });
            }
          },
        });
      } else {
        const location = feature.get('location');
        if (location) this.clickon(location);
        else this.mapTapped.emit();
      }
    });

    this.map.on('pointermove', (evt: MapBrowserEvent<UIEvent>) => {
      const hit = this.map.hasFeatureAtPixel(evt.pixel);
      (this.map.getTargetElement() as HTMLElement).style.cursor = hit ? 'pointer' : '';
    });

    // If selectedLocation was set before the map finished initializing, show it now.
    if (this._selectedLocation) this.showLocation(this._selectedLocation);
  }

  private showLocation(location: Location): void {
    if (!location) return;
    this.currentLocation = location;
    this.clusterLayer.setVisible(false);
    this.drawRoute(location);
  }

  closeLocation(): void {
    this.router.navigate(['/malta']);
  }

  resetToMalta(): void {
    this.map.getView().animate({ center: this.getMaltaViewCoordinates(), zoom: 10.2, duration: 600 });
  }

  // ── Icon preloading ───────────────────────────────────────

  private preloadIcons(): void {
    locations.forEach(location => {
      const img = new Image();
      const pinSrc = location.thumb || location.img;
      img.onload = () => {
        this.rawImageCache.set(location.img, img);
        this.localityIconCache.clear();

        const pin = this.buildTeardropPin(img, ICON_CANVAS_SIZE, '#fff');

        // ── Name pill (only if showLabel is true) ────────────
        let finalCanvas = pin;

        if (location.showLabel) {
          finalCanvas = this.buildPillPin(pin, location.title);
        }

        this.iconCache.set(String(location.id), finalCanvas);
        this.clusterLayer.changed();
      };
      img.src = pinSrc;
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
      style: (feature: FeatureLike) => this.featureStyle(feature),
      zIndex: 10,
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

  private featureStyle(feature: FeatureLike): Style {
    return feature.get('type') === 'locality-cluster'
      ? this.localityClusterStyle(feature)
      : this.individualPinStyle(feature);
  }

  private individualPinStyle(feature: FeatureLike): Style {
    const location = feature.get('location');
    const zoom = this.map.getView().getZoom() ?? 10;
    const iconSize = this.getIconSize(zoom);
    const canvas = this.iconCache.get(String(location.id));

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

  private localityClusterStyle(feature: FeatureLike): Style {
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

  // ── Provider pin layer ────────────────────────────────────

  private setupProviderLayer(): void {
    this.providerLayer = new VectorLayer({
      source: this.providerSource,
      style: (f: FeatureLike) => this.providerPinStyle(f),
      zIndex: 5,
    });
    this.map.addLayer(this.providerLayer);
    if (this._providerPins.length && FEATURES.PROMOTIONS) this.rebuildProviderLayer();
  }

  private rebuildProviderLayer(): void {
    this.providerSource.clear();
    for (const p of this._providerPins) {
      if (!p.lat || !p.lon) continue;
      this.providerSource.addFeature(new Feature({
        geometry: new Point(getCoordinatesfromLonLat(p.lon, p.lat)),
        type: 'provider-pin',
        provider: p,
      }));
      if (this.providerCanvasCache.has(p.id)) continue;

      const savings = p.discount?.shortLabel;
      const label = savings ?? p.mapLabel ?? '🏷️ Deal';
      const pillColor = savings ? '#D4A017' : undefined;
      if (p.coverImage) {
        const img = new Image();
        img.onload = () => {
          const pin = this.buildTeardropPin(img, PROVIDER_PIN_SIZE, resolveProviderColor(p));
          if (p.emoji) this.addEmojiBadge(pin, p.emoji);
          this.providerCanvasCache.set(p.id, this.buildPillPin(pin, label, true, pillColor));
          this.providerLayer.changed();
        };
        img.src = p.coverImage;
      } else {
        this.providerCanvasCache.set(p.id, this.buildPillPin(this.buildProviderEmojiPin(p), label, true, pillColor));
      }
    }
  }

  private providerPinStyle(feature: FeatureLike): Style {
    const provider = feature.get('provider');
    const canvas = this.providerCanvasCache.get(provider.id);
    const zoom = this.map.getView().getZoom() ?? 10;
    const scale = zoom < CLUSTER_ZOOM
      ? this.getLocalityScale(zoom)
      : this.getIconSize(zoom) / ICON_CANVAS_SIZE;
    if (!canvas) {
      const r = Math.round(36 * scale);
      return new Style({ image: new CircleStyle({ radius: r, fill: new Fill({ color: resolveProviderColor(provider) }), stroke: new Stroke({ color: '#fff', width: 2 }) }) });
    }
    return new Style({
      image: new Icon({
        img: canvas,
        size: [canvas.width, canvas.height],
        scale,
        anchor: [0.5, 1.0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
      }),
    });
  }

  // Emoji fallback — teardrop shape with amber fill, no photo
  private buildProviderEmojiPin(provider: Provider): HTMLCanvasElement {
    const W = PROVIDER_PIN_SIZE;
    const tailH = Math.round(W * ICON_TAIL_H / ICON_CANVAS_SIZE);
    const H = W + tailH;
    const cx = W / 2, cy = W / 2;
    const r = W / 2 - 2;
    const tailAngle = Math.PI / 8;

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const pc = canvas.getContext('2d')!;

    pc.save();
    pc.shadowColor = 'rgba(0,0,0,0.22)';
    pc.shadowBlur = 8;
    pc.shadowOffsetY = 3;
    pc.beginPath();
    pc.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
    pc.lineTo(cx, H - 1);
    pc.closePath();
    pc.fillStyle = resolveProviderColor(provider);
    pc.fill();
    pc.restore();

    pc.beginPath();
    pc.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
    pc.strokeStyle = '#fff';
    pc.lineWidth = 3;
    pc.stroke();

    pc.font = `${Math.round(W * 0.38)}px serif`;
    pc.textAlign = 'center';
    pc.textBaseline = 'middle';
    pc.fillText(provider.emoji ?? '🏷️', cx, cy + 1);

    return canvas;
  }

  // Wraps any pin canvas with a label pill above it (shared by location + provider pins).
  // large=true uses a bigger font so provider pills match the cluster label size visually.
  private buildPillPin(pin: HTMLCanvasElement, label: string, large = false, bgColor?: string): HTMLCanvasElement {
    const PILL_H = large ? 28 : 22, PILL_GAP = large ? 7 : 6, TOP_PAD = 4;
    const font = large ? '600 17px Roboto, sans-serif' : '600 11px Roboto, sans-serif';
    const probe = document.createElement('canvas').getContext('2d')!;
    probe.font = font;
    const pillW = Math.min(probe.measureText(label).width + 18, large ? 180 : 140);
    const cw = Math.max(pin.width, pillW + 8);
    const ch = TOP_PAD + PILL_H + PILL_GAP + pin.height;

    const composite = document.createElement('canvas');
    composite.width = cw;
    composite.height = ch;
    const ctx = composite.getContext('2d')!;

    const pillX = cw / 2 - pillW / 2;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.14)';
    ctx.shadowBlur = 4;
    ctx.fillStyle = bgColor ?? '#fff';
    this.fillRoundRect(ctx, pillX, TOP_PAD, pillW, PILL_H, large ? 14 : 11);
    ctx.restore();

    ctx.font = font;
    ctx.fillStyle = bgColor ? '#fff' : '#374151';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, cw / 2, TOP_PAD + PILL_H / 2, pillW - 8);

    ctx.drawImage(pin, (cw - pin.width) / 2, TOP_PAD + PILL_H + PILL_GAP);
    return composite;
  }

  // ── Shared pin builder ────────────────────────────────────
  // Used by both location pins (size=80, border='#fff') and
  // provider photo pins (size=80, border='#F4A922').
  private buildTeardropPin(img: HTMLImageElement, size: number, borderColor: string): HTMLCanvasElement {
    const tailH = Math.round(size * ICON_TAIL_H / ICON_CANVAS_SIZE);
    const W = size, H = size + tailH;
    const cx = W / 2, cy = W / 2;
    const r = W / 2 - 2;
    const tailAngle = Math.PI / 8;

    const pin = document.createElement('canvas');
    pin.width = W;
    pin.height = H;
    const pc = pin.getContext('2d')!;

    pc.save();
    pc.shadowColor = 'rgba(0,0,0,0.22)';
    pc.shadowBlur = 8;
    pc.shadowOffsetY = 3;
    pc.beginPath();
    pc.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
    pc.lineTo(cx, H - 1);
    pc.closePath();
    pc.fillStyle = '#fff';
    pc.fill();
    pc.restore();

    pc.beginPath();
    pc.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
    pc.lineTo(cx, H - 1);
    pc.closePath();
    pc.strokeStyle = 'rgba(0,0,0,0.10)';
    pc.lineWidth = 1;
    pc.stroke();

    pc.save();
    pc.beginPath();
    pc.arc(cx, cy, r - 2, 0, Math.PI * 2);
    pc.clip();
    pc.drawImage(img, 0, 0, W, W);
    pc.restore();

    pc.beginPath();
    pc.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
    pc.strokeStyle = borderColor;
    pc.lineWidth = 3;
    pc.stroke();

    return pin;
  }

  private addEmojiBadge(pin: HTMLCanvasElement, emoji: string): void {
    const W = PROVIDER_PIN_SIZE;
    const cx = W / 2, cy = W / 2;
    const r = W / 2 - 2;
    const badgeR = Math.round(W * 0.15);
    const bx = Math.round(cx + r * Math.cos(Math.PI / 4));
    const by = Math.round(cy + r * Math.sin(Math.PI / 4));

    const pc = pin.getContext('2d')!;
    pc.save();
    pc.shadowColor = 'rgba(0,0,0,0.18)';
    pc.shadowBlur = 4;
    pc.shadowOffsetY = 1;
    pc.beginPath();
    pc.arc(bx, by, badgeR, 0, Math.PI * 2);
    pc.fillStyle = '#fff';
    pc.fill();
    pc.restore();

    pc.font = `${Math.round(W * 0.18)}px serif`;
    pc.textAlign = 'center';
    pc.textBaseline = 'middle';
    pc.fillText(emoji, bx, by + 1);
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
    if (zoom <= 11) return 0.62;
    if (zoom <= 11.5) return 0.74;
    if (zoom <= 12) return 0.86;
    return 1.0;
  }

  private getIconSize(zoom: number): number {
    if (zoom <= 10.8) return 14;
    if (zoom <= 11.5) return 30;
    if (zoom <= 12.3) return 35;
    if (zoom <= 13.3) return 35;
    return 52;
  }

  // ── Route layer ───────────────────────────────────────────

  private setupRouteLayer(): void {
    this.map.addLayer(new VectorLayer({ source: this.routeSource, zIndex: 50 }));
    // Labels on a separate decluttered layer — OL auto-hides overlapping text while icons always show
    this.map.addLayer(new VectorLayer({ source: this.routeLabelSource, zIndex: 51, declutter: true }));
  }

  private drawRoute(location: Location): void {
    this.routeSource.clear();
    this.routeLabelSource.clear();
    if (location.routes && location.routes.length >= 2) {
      this.drawAllRoutesForLocation(location);
    } else {
      const points = location.mapPoints ?? [];
      const { graphics, labels } = buildRouteFeatures(points);
      this.hasRouteFeatures = graphics.length > 0;
      if (this.hasRouteFeatures) {
        this.routeSource.addFeatures(graphics);
        this.routeLabelSource.addFeatures(labels);
      } else {
        const pin = new Feature({ geometry: new Point(getCoordinatesfromLonLat(location.lon, location.lat)) });
        pin.setStyle(makePinStyle('#F4A922'));
        this.routeSource.addFeature(pin);
      }
    }
  }

  private drawAllRoutesForLocation(location: Location): void {
    let anyFeatures = false;
    const route0Last = location.routes![0].mapPoints.at(-1);
    // Draw in reverse order so route 0 is added last and renders on top.
    // When paths overlap (e.g. identical routes), the primary route (0) stays visible.
    [...location.routes!].reverse().forEach((route, reversedI) => {
      const i = location.routes!.length - 1 - reversedI;
      const color = ROUTE_COLORS[i % ROUTE_COLORS.length];
      const thisLast = route.mapPoints.at(-1);
      const sharedDest = i > 0 && !!thisLast && !!route0Last
        && thisLast.lon === route0Last.lon && thisLast.lat === route0Last.lat;
      const { graphics, labels } = buildRouteFeatures(route.mapPoints, { lineColor: color, skipEndPin: sharedDest, skipSegmentColors: true });
      if (graphics.length > 0) {
        this.routeSource.addFeatures(graphics);
        anyFeatures = true;
      }
      this.routeLabelSource.addFeatures(labels);
    });
    this.hasRouteFeatures = anyFeatures;
    if (!anyFeatures) {
      const pin = new Feature({ geometry: new Point(getCoordinatesfromLonLat(location.lon, location.lat)) });
      pin.setStyle(makePinStyle('#F4A922'));
      this.routeSource.addFeature(pin);
    }
  }

  drawAllRoutes(): void {
    if (!this.currentLocation) return;
    this.routeSource.clear();
    this.routeLabelSource.clear();
    this.drawAllRoutesForLocation(this.currentLocation);
    if (this.hasRouteFeatures) {
      this.map.getView().fit(this.routeSource.getExtent(), {
        padding: [90, 70, 80, 40], duration: 450, maxZoom: 15,
      });
    }
  }

  private clearRoute(): void {
    this.routeSource.clear();
    this.routeLabelSource.clear();
    this.currentLocation = null;
    this.hasRouteFeatures = false;
    this.clusterLayer.setVisible(true);
    if (!this.compassMode) {
      this.map.getView().animate({ rotation: 0, duration: 400 });
    }
  }

  setRoute(points: MapPoint[]): void {
    this.routeSource.clear();
    this.routeLabelSource.clear();
    const { graphics, labels } = buildRouteFeatures(points);
    this.hasRouteFeatures = graphics.length > 0;
    if (this.hasRouteFeatures) {
      this.routeSource.addFeatures(graphics);
      this.routeLabelSource.addFeatures(labels);
      this.map.getView().fit(this.routeSource.getExtent(), {
        padding: [90, 70, 80, 40], duration: 450, maxZoom: 15,
      });
    } else if (this.currentLocation) {
      const pin = new Feature({
        geometry: new Point(getCoordinatesfromLonLat(this.currentLocation.lon, this.currentLocation.lat)),
      });
      pin.setStyle(makePinStyle('#F4A922'));
      this.routeSource.addFeature(pin);
    }
  }

  refitRoute(): void {
    if (!this.currentLocation) return;
    if (this.pendingFitPoint) {
      const p = this.pendingFitPoint;
      this.pendingFitPoint = null;
      this.fitRouteAndPoint(p.lat, p.lon);
      return;
    }
    if (this.hasRouteFeatures) {
      this.map.getView().fit(this.routeSource.getExtent(), {
        padding: [90, 70, 80, 40],
        duration: 450,
        maxZoom: 15,
      });
    } else {
      const flatCoords = this.getLocationMapCoordinates(this.currentLocation);
      this.map.getView().animate({ center: flatCoords, zoom: 14, duration: 450 });
    }
  }

  fitRouteAndPoint(lat: number, lon: number): void {
    const providerCoord = fromLonLat([lon, lat]) as [number, number];
    if (this.hasRouteFeatures) {
      const re = this.routeSource.getExtent();
      const extent = boundingExtent([[re[0], re[1]], [re[2], re[3]], providerCoord]);
      this.map.getView().fit(extent, { padding: [80, 40, 80, 40], duration: 600, maxZoom: 15 });
    } else if (this.currentLocation) {
      const locCoord = fromLonLat([this.currentLocation.lon, this.currentLocation.lat]) as [number, number];
      const extent = boundingExtent([locCoord, providerCoord]);
      this.map.getView().fit(extent, { padding: [80, 80, 80, 80], maxZoom: 15, duration: 600 });
    } else {
      this.map.getView().animate({ center: providerCoord, zoom: 14, duration: 450 });
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
    this.setupCompass();
  }

  ngOnDestroy(): void {
    this.tracker?.destroy();
    if (this.absoluteHandler)
      window.removeEventListener('deviceorientationabsolute' as any, this.absoluteHandler, true);
    if (this.relativeHandler)
      window.removeEventListener('deviceorientation', this.relativeHandler, true);
  }

  // ── Compass ───────────────────────────────────────────────

  private setupCompass(): void {
    let lastAbsoluteTs = 0;

    const applyHeading = (heading: number) => {
      if (!this.compassMode) return;
      this.map.getView().setRotation(-(heading * Math.PI) / 180);
    };

    const absoluteHandler = (e: Event) => {
      const oe = e as DeviceOrientationEvent;
      if (oe.alpha == null) return;
      lastAbsoluteTs = Date.now();
      applyHeading(oe.alpha);
    };

    const relativeHandler = (e: DeviceOrientationEvent) => {
      if ((e as any).webkitCompassHeading != null) {
        applyHeading((e as any).webkitCompassHeading);
      } else if (Date.now() - lastAbsoluteTs > 200 && e.alpha != null) {
        applyHeading(e.alpha);
      }
    };

    this.absoluteHandler = absoluteHandler;
    this.relativeHandler = relativeHandler;
    window.addEventListener('deviceorientationabsolute' as any, absoluteHandler, true);
    window.addEventListener('deviceorientation', relativeHandler, true);
  }

  async toggleCompass(): Promise<void> {
    if (this.compassMode) {
      this.compassMode = false;
      this.map.getView().animate({ rotation: 0, duration: 300 });
      return;
    }
    if (this.isRotated) {
      this.map.getView().animate({ rotation: 0, duration: 300 });
      return;
    }
    const iosRequest = (DeviceOrientationEvent as any).requestPermission;
    if (typeof iosRequest === 'function') {
      const state = await iosRequest().catch(() => 'denied');
      if (state !== 'granted') return;
    }
    this.compassMode = true;
  }

  // ── Public API ────────────────────────────────────────────

  updateSize(): void {
    this.map?.updateSize();
  }

  locationDenied = false;
  private locationDeniedTimer?: ReturnType<typeof setTimeout>;

  locateMe(): void {
    const last = this.tracker?.lastCoord;
    if (last) {
      this.fitGpsAndLocation(last);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coord = this.tracker?.lastCoord
          ?? fromLonLat([pos.coords.longitude, pos.coords.latitude]) as [number, number];
        this.fitGpsAndLocation(coord);
      }, () => this.showLocationDenied());
    } else {
      this.showLocationDenied();
    }
  }

  private fitGpsAndLocation(gpsCoord: [number, number]): void {
    if (this.selectedLocation) {
      const locCoord = fromLonLat([this.selectedLocation.lon, this.selectedLocation.lat]) as [number, number];
      const extent = boundingExtent([gpsCoord, locCoord]);
      this.map.getView().fit(extent, { padding: [80, 80, 80, 80], maxZoom: 15, duration: 600 });
    } else {
      this.map.getView().animate({ center: gpsCoord, zoom: 15, duration: 400 });
    }
  }

  private showLocationDenied(): void {
    this.locationDenied = true;
    clearTimeout(this.locationDeniedTimer);
    this.locationDeniedTimer = setTimeout(() => { this.locationDenied = false; }, 4000);
  }

  clickon(data: Location): void {
    this.router.navigate(['/malta/locations', data.slug]);
  }

  // ── Helpers ───────────────────────────────────────────────

  private getLocationMapCoordinates(location: Location): number[] {
    const points = location.routes?.[0]?.mapPoints ?? location.mapPoints;
    if (points?.length) {
      const dest = points.find(p => p.type === 'destination') ?? points[points.length - 1];
      return getCoordinatesfromLonLat(dest.lon, dest.lat);
    }
    return getCoordinatesfromLonLat(location.lon, location.lat);
  }

  private getMaltaViewCoordinates(): number[] {
    return getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]);
  }
}
