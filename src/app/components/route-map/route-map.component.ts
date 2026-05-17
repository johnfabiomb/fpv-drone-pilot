import { Component, Input, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPoint } from '../../shared/models';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Fill, Stroke, Circle as CircleStyle, Text } from 'ol/style';
import { fromLonLat } from 'ol/proj';
// Feature/Point/Style imports retained for the single-point marker below
import { boundingExtent, buffer, containsCoordinate } from 'ol/extent';
import { defaults as defaultInteractions } from 'ol/interaction';
import { buildRouteFeatures } from '../../shared/utils/route-drawing';
import { LocationTracker } from '../../shared/utils/location-tracker';

@Component({
  selector: 'app-route-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="route-map-wrapper">
      <div class="route-map" #mapEl></div>
      <div class="map-controls">
        <button class="ctrl-btn" (click)="resetView()" title="Reset view">⌖</button>
        <button class="ctrl-btn" (click)="toggleCompass()" [class.active]="compassMode" title="Compass mode">🧭</button>
        <button class="ctrl-btn locate-btn" (click)="locateMe()" [class.active]="isFollowing" title="My location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
            <circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .route-map-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      border-radius: 12px;
      overflow: hidden;
      background: #e8e8e8;
    }
    .route-map { width: 100%; height: 100%; }

    .map-controls {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 100;
    }
    .ctrl-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: none;
      background: rgba(255,255,255,0.95);
      box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      cursor: pointer;
      font-size: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      line-height: 1;
      color: #374151;

      svg { width: 18px; height: 18px; }
    }
    .ctrl-btn.active {
      background: #3b82f6;
      color: #fff;
    }
    .locate-btn.active {
      background: #3b82f6;
      animation: pulse-btn 2s infinite;
    }
    @keyframes pulse-btn {
      0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
      50%       { box-shadow: 0 0 0 6px rgba(59,130,246,0);  }
    }

  `],
})
export class RouteMapComponent implements AfterViewInit, OnDestroy {
  @Input() mapPoints: MapPoint[] = [];
  @ViewChild('mapEl') mapEl!: ElementRef<HTMLDivElement>;

  compassMode = false;
  get isFollowing(): boolean { return this.tracker?.following ?? false; }

  private map!: Map;
  tracker!: LocationTracker;
  private locationSource = new VectorSource();
  private absoluteHandler: ((e: Event) => void) | null = null;
  private relativeHandler: ((e: DeviceOrientationEvent) => void) | null = null;
  private defaultCenter!: [number, number];
  private defaultZoom = 15;
  private fitCoords: number[][] = [];

  ngAfterViewInit(): void {
    const coords = this.mapPoints.map(p => fromLonLat([p.lon, p.lat]));
    this.fitCoords = coords;

    const routeFeatures = buildRouteFeatures(this.mapPoints);

    if (this.mapPoints.length === 1) {
      const p = this.mapPoints[0];
      const marker = new Feature(new Point(coords[0]));
      marker.setStyle(new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: '#F4A922' }),
          stroke: new Stroke({ color: '#fff', width: 2 }),
        }),
        text: new Text({
          text: p.label ?? 'Destination',
          font: 'bold 11px sans-serif',
          fill: new Fill({ color: '#1a1a1a' }),
          stroke: new Stroke({ color: '#ffffff', width: 3 }),
          offsetY: 18,
          textAlign: 'center',
          textBaseline: 'middle',
        }),
      }));
      routeFeatures.push(marker);
    }

    const routeSource = new VectorSource({ features: routeFeatures });

    this.defaultCenter = coords.length
      ? (coords.reduce((a, c) => [a[0] + c[0], a[1] + c[1]], [0, 0]).map(v => v / coords.length) as [number, number])
      : (fromLonLat([14.37, 35.9]) as [number, number]);

    this.map = new Map({
      target: this.mapEl.nativeElement,
      controls: [],
      interactions: defaultInteractions({
        mouseWheelZoom: true,
        doubleClickZoom: false,
        dragPan: true,
        pinchZoom: true,
        pinchRotate: false,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            urls: [
              'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
              'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
              'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
              'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
            ],
            maxZoom: 19,
          }),
        }),
        new VectorLayer({ source: routeSource, zIndex: 10 }),
        new VectorLayer({ source: this.locationSource, zIndex: 20 }),
      ],
      view: new View({
        center: this.defaultCenter,
        zoom: 15,
        minZoom: 11,
        maxZoom: 18,
      }),
    });

    // Dynamic soft constraint: after each pan/zoom, bounce back if center
    // drifts outside the bounding box of (route + current GPS position).
    this.map.on('moveend', () => {
      const ext = this.dynamicExtent();
      if (!ext) return;
      const center = this.map.getView().getCenter()!;
      if (!containsCoordinate(ext, center)) {
        this.map.getView().animate({
          center: [
            Math.max(ext[0], Math.min(ext[2], center[0])),
            Math.max(ext[1], Math.min(ext[3], center[1])),
          ],
          duration: 250,
        });
      }
    });

    if (coords.length >= 2) {
      const ext = boundingExtent(coords);
      this.map.getView().fit(ext, { padding: [48, 48, 48, 48], maxZoom: 16 });
    } else if (coords.length === 1) {
      this.map.getView().setCenter(coords[0]);
      this.map.getView().setZoom(16);
    }
    this.defaultZoom = this.map.getView().getZoom() ?? 15;

    this.tracker = new LocationTracker(this.locationSource, this.map, { followZoom: 17 });
    this.tracker.start();

    // Stop auto-follow when user manually pans
    this.map.on('pointerdrag', () => { this.tracker.stopFollowing(); });
    this.setupCompass();
  }

  locateMe(): void {
    this.tracker.locateMe();
  }

  private setupCompass(): void {
    let lastAbsoluteTs = 0;

    const applyHeading = (heading: number) => {
      if (!this.compassMode) return;
      this.map.getView().setRotation(-(heading * Math.PI) / 180);
    };

    // Android Chrome 50+: e.alpha is absolute heading (magnetic north = 0)
    const absoluteHandler = (e: Event) => {
      const oe = e as DeviceOrientationEvent;
      if (oe.alpha == null) return;
      lastAbsoluteTs = Date.now();
      applyHeading(oe.alpha);
    };

    // iOS: webkitCompassHeading is absolute heading.
    // Falls back to e.alpha only when no absolute event has fired recently
    // (prevents double-firing on Android which may emit both events).
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
    // requestPermission() must NOT be called here — it requires a user gesture.
  }

  async toggleCompass(): Promise<void> {
    if (this.compassMode) {
      this.compassMode = false;
      this.map.getView().animate({ rotation: 0, duration: 300 });
      return;
    }
    // Request iOS permission from this user-gesture context
    const iosRequest = (DeviceOrientationEvent as any).requestPermission;
    if (typeof iosRequest === 'function') {
      const state = await iosRequest().catch(() => 'denied');
      if (state !== 'granted') return;
    }
    this.compassMode = true;
  }

  private dynamicExtent(): number[] | null {
    const all = [...this.fitCoords];
    if (this.tracker?.lastCoord) all.push(this.tracker.lastCoord);
    if (all.length === 0) return null;
    const base = all.length === 1
      ? [all[0][0], all[0][1], all[0][0], all[0][1]]
      : boundingExtent(all);
    return buffer(base, 400);
  }

  resetView(): void {
    this.tracker?.stopFollowing();
    const view = this.map.getView();
    if (this.fitCoords.length >= 2) {
      view.fit(boundingExtent(this.fitCoords), { padding: [48, 48, 48, 48], maxZoom: 16, duration: 400 });
    } else {
      view.animate({ center: this.defaultCenter, zoom: this.defaultZoom, duration: 400 });
    }
    if (!this.compassMode) {
      view.animate({ rotation: 0, duration: 400 });
    }
  }

  ngOnDestroy(): void {
    this.map?.setTarget(undefined as any);
    this.tracker?.destroy();
    if (this.absoluteHandler)
      window.removeEventListener('deviceorientationabsolute' as any, this.absoluteHandler, true);
    if (this.relativeHandler)
      window.removeEventListener('deviceorientation', this.relativeHandler, true);
  }
}
