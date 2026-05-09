import OlMap from 'ol/Map';
import Feature from 'ol/Feature';
import { Point, Circle as OlCircle } from 'ol/geom';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

export interface LocationTrackerOptions {
  showHeadingCone?: boolean;
  followZoom?: number;
  onFirstFix?: (coord: [number, number]) => void;
}

export class LocationTracker {
  lastCoord: [number, number] | null = null;
  following = false;
  unavailable = false;

  private watchId: number | null = null;
  private source: VectorSource;
  private map: OlMap;
  private opts: LocationTrackerOptions & { showHeadingCone: boolean; followZoom: number };
  private coneCanvas: HTMLCanvasElement | null = null;
  private firstFixFired = false;

  constructor(source: VectorSource, map: OlMap, options: LocationTrackerOptions = {}) {
    this.source = source;
    this.map = map;
    this.opts = { showHeadingCone: false, followZoom: 17, ...options };
  }

  get hasGps(): boolean { return this.lastCoord !== null; }

  start(): void {
    if (!navigator.geolocation) { this.unavailable = true; return; }
    this.startWatch(true);
  }

  private triedFallback = false;

  private startWatch(highAccuracy: boolean): void {
    this.watchId = navigator.geolocation.watchPosition(
      pos => { this.unavailable = false; this.onPosition(pos); },
      () => {
        if (highAccuracy && !this.triedFallback) {
          this.triedFallback = true;
          if (this.watchId !== null) navigator.geolocation.clearWatch(this.watchId);
          this.startWatch(false);
        } else {
          this.unavailable = true;
        }
      },
      {
        enableHighAccuracy: highAccuracy,
        maximumAge: highAccuracy ? 10000 : 30000,
        timeout: highAccuracy ? 8000 : 15000,
      }
    );
  }

  private onPosition(pos: GeolocationPosition): void {
    this.unavailable = false;
    const coord = fromLonLat([pos.coords.longitude, pos.coords.latitude]) as [number, number];
    this.lastCoord = coord;
    this.updateFeatures(coord, pos.coords.accuracy, pos.coords.heading ?? null);
    if (!this.firstFixFired) {
      this.firstFixFired = true;
      this.opts.onFirstFix?.(coord);
    }
    if (this.following) {
      this.map.getView().animate({ center: coord, duration: 300 });
    }
  }

  private updateFeatures(coord: [number, number], accuracy: number, heading: number | null): void {
    // Accuracy ring
    let ring = this.source.getFeatureById('accuracy') as Feature | null;
    const r = Math.min(accuracy ?? 50, 200);
    if (!ring) {
      ring = new Feature(new OlCircle(coord, r));
      ring.setId('accuracy');
      ring.setStyle(new Style({
        fill: new Fill({ color: 'rgba(66,133,244,0.10)' }),
        stroke: new Stroke({ color: 'rgba(66,133,244,0.30)', width: 1.5 }),
      }));
      this.source.addFeature(ring);
    } else {
      (ring.getGeometry() as OlCircle).setCenterAndRadius(coord, r);
    }

    // Heading cone (before dot so dot renders on top)
    if (this.opts.showHeadingCone && heading != null && !isNaN(heading)) {
      const headingRad = (heading * Math.PI) / 180;
      let cone = this.source.getFeatureById('cone') as Feature | null;
      if (!cone) {
        cone = new Feature(new Point(coord));
        cone.setId('cone');
        this.source.addFeature(cone);
      } else {
        (cone.getGeometry() as Point).setCoordinates(coord);
      }
      cone.setStyle(new Style({
        image: new Icon({
          img: this.getConeCanvas(),
          size: [60, 60],
          anchor: [0.5, 0.5],
          rotation: headingRad,
        }),
        zIndex: 198,
      }));
    }

    // Blue dot
    let dot = this.source.getFeatureById('gps') as Feature | null;
    if (!dot) {
      dot = new Feature(new Point(coord));
      dot.setId('gps');
      dot.setStyle(new Style({
        image: new CircleStyle({
          radius: 9,
          fill: new Fill({ color: '#4285F4' }),
          stroke: new Stroke({ color: '#ffffff', width: 2.5 }),
        }),
        zIndex: 200,
      }));
      this.source.addFeature(dot);
    } else {
      (dot.getGeometry() as Point).setCoordinates(coord);
    }
  }

  private getConeCanvas(): HTMLCanvasElement {
    if (this.coneCanvas) return this.coneCanvas;
    const size = 60;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const cx = size / 2, cy = size / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, size / 2 - 2, -Math.PI / 2 - Math.PI / 2.6, -Math.PI / 2 + Math.PI / 2.6);
    ctx.closePath();
    ctx.fillStyle = 'rgba(66,133,244,0.35)';
    ctx.fill();
    this.coneCanvas = canvas;
    return canvas;
  }

  locateMe(): void {
    if (this.lastCoord) {
      this.following = true;
      this.map.getView().animate({ center: this.lastCoord, zoom: this.opts.followZoom, duration: 400 });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const coord = fromLonLat([pos.coords.longitude, pos.coords.latitude]) as [number, number];
          this.lastCoord = coord;
          this.following = true;
          this.updateFeatures(coord, pos.coords.accuracy, pos.coords.heading ?? null);
          this.map.getView().animate({ center: coord, zoom: this.opts.followZoom, duration: 400 });
        },
        () => {}
      );
    }
  }

  stopFollowing(): void { this.following = false; }

  destroy(): void {
    if (this.watchId !== null) navigator.geolocation.clearWatch(this.watchId);
  }
}
