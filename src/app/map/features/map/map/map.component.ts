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

import { createMap, getCoordinatesfromLonLat, getCoordinatesfromPixel } from '@map/features/map/map/map-functions';
import { buildRouteFeatures, makePinCanvas, makePinStyle, ROUTE_COLORS } from '@map/core/utils/route-drawing';
import { LocationTracker } from '@map/core/utils/location-tracker';
import { locations } from '@assets/locations.json';
import { Router } from '@angular/router';
import { Experience, EventVenuePin, Location, MapPoint, MapPointType, Provider } from '@map/core/models';
import { matchesFilter, FilterId } from '@map/core/utils/location-filter.util';
import { resolveProviderColor, isDiscountValid } from '@map/core/utils/provider.utils';
import {
  ExperiencePin,
  experienceColor,
  experienceIcon,
  resolveExperienceDiscount,
} from '@map/core/utils/experience.utils';
import { EVENTS_ACCENT } from '@map/core/utils/event.utils';
import { FEATURES } from '../../../feature-flags';

const ICON_CANVAS_SIZE = 80;
const ICON_TAIL_H = 18;
const PROVIDER_PIN_SIZE = 80;
const CLUSTER_ZOOM = 12; // below this zoom → locality clusters; above → individual pins
const PROVIDER_PIN_CLUSTER_SCALE = 0.7; // scale multiplier applied to provider pins when clusters are visible
const PIN_CLUSTER_PX = 64; // overlay pins within this many screen px merge into a count cluster
// view.fit padding [top, right, bottom, left] for promo pin/cluster fits — extra top so pins
// (and their pills) clear the overlaid filter bar. One place to tweak it.
const PIN_FIT_PADDING = [150, 60, 80, 60];
// Base z-offset so promo (experience/event) pins + clusters always sit ABOVE the location
// pins/clusters in the shared cluster layer, while keeping their own latitude ordering.
const PROMO_Z_BASE = 1_000_000;

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
  private providerImageCache = new Map<string, HTMLImageElement>();

  // Experience & event pins live in the cluster layer/source so they interleave with
  // location pins by latitude (separate layers can't z-order against each other in OL).
  private experienceFeatures: Feature[] = [];
  private experienceCanvasCache = new Map<string, HTMLCanvasElement>();
  private experienceImageCache = new Map<string, HTMLImageElement>();

  // Event pins (one per venue) — also live in the cluster layer/source.
  private eventFeatures: Feature[] = [];
  private eventCanvasCache = new Map<string, HTMLCanvasElement>();
  private eventImageCache = new Map<string, HTMLImageElement>();
  private pinClusterCanvasCache = new Map<string, HTMLCanvasElement>();
  private clusterCoverCache = new Map<string, HTMLImageElement>(); // decoded cluster cover images by src
  private clusterCoverLoading = new Set<string>();

  private routeSource = new VectorSource();
  private routeLabelSource = new VectorSource();
  private meetingSource = new VectorSource();
  private currentLocation: Location | null = null;
  private hasRouteFeatures = false;
  private _pickModeActive = false;
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

  @Input() set experiencePins(pins: ExperiencePin[]) {
    this._experiencePins = pins ?? [];
    if (this.map && FEATURES.PROMOTIONS) this.rebuildExperienceFeatures();
  }
  private _experiencePins: ExperiencePin[] = [];

  @Input() set eventPins(pins: EventVenuePin[]) {
    this._eventPins = pins ?? [];
    if (this.map && FEATURES.PROMOTIONS) this.rebuildEventFeatures();
  }
  private _eventPins: EventVenuePin[] = [];

  /** Gems layer toggle — when false the location/cluster pins are hidden (overlay pins stay). */
  @Input() set showGems(v: boolean) {
    this._showGems = v;
    if (this.map) this.refreshLayer(true);
  }
  private _showGems = true;

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
    // Framing is handled by fitVisiblePins(), triggered explicitly when the user taps a
    // filter chip — so we don't fight the zoom-to-location animation during navigation.
  }

  /** Fits the view to whatever pins are currently visible (gems + experiences + events). */
  fitVisiblePins(): void {
    if (!this.map) return;
    const coords: number[][] = [];
    if (this._showGems) {
      for (const f of this.filteredFeatures) coords.push((f.getGeometry() as Point).getCoordinates());
    }
    for (const p of this._experiencePins) coords.push(getCoordinatesfromLonLat(p.spot.lon, p.spot.lat));
    for (const pin of this._eventPins) coords.push(getCoordinatesfromLonLat(pin.lon, pin.lat));
    if (coords.length === 0) return;
    this.map.getView().fit(boundingExtent(coords), {
      padding: PIN_FIT_PADDING,
      duration: 500,
      maxZoom: 15,
    });
  }

  @Input() set pickModeActive(v: boolean) {
    this._pickModeActive = v;
    if (this.map) {
      (this.map.getTargetElement() as HTMLElement).style.cursor = v ? 'crosshair' : '';
    }
  }

  @Input() set meetingPointMarker(p: { lat: number; lon: number } | null) {
    this._meetingPoint = p;
    if (this.map) this.drawMeetingPoint(p);
  }
  private _meetingPoint: { lat: number; lon: number } | null = null;

  @Output() locationSelected = new EventEmitter<Location | null>();
  @Output() mapTapped = new EventEmitter<void>();
  @Output() gpsCoord = new EventEmitter<{ lat: number; lon: number }>();
  @Output() providerPinSelected = new EventEmitter<Provider>();
  @Output() experienceSelected = new EventEmitter<Experience>();
  @Output() eventVenueSelected = new EventEmitter<EventVenuePin>();
  @Output() controlTapped = new EventEmitter<void>();
  @Output() coordPicked        = new EventEmitter<{ lat: number; lon: number }>();
  @Output() meetingPointTapped = new EventEmitter<{ lat: number; lon: number }>();

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
    this.setupExperienceLayer();
    this.setupLocationLayer();
    this.setupRouteLayer();
    this.setupMeetingLayer();
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

      if (this._pickModeActive) {
        this.coordPicked.emit({ lat, lon });
        return;
      }

      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (f: FeatureLike) => f);
      if (!feature) { this.mapTapped.emit(); return; }

      if (feature.get('type') === 'meeting-point') {
        this.meetingPointTapped.emit(feature.get('meetingPoint'));
        return;
      }

      if (feature.get('type') === 'provider-pin') {
        this.providerPinSelected.emit(feature.get('provider'));
        return;
      }

      if (feature.get('type') === 'experience-pin') {
        this.experienceSelected.emit(feature.get('experience'));
        return;
      }

      if (feature.get('type') === 'event-pin') {
        this.eventVenueSelected.emit(feature.get('venuePin'));
        return;
      }

      if (feature.get('type') === 'pin-cluster') {
        this.expandPinCluster(feature.get('members'));
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
    // Only cache the loaded bitmap here. The teardrop pin canvas is built lazily at
    // render time in individualPinStyle — building eagerly inside onload/decode is too
    // early in Safari: drawImage() paints the white backing but not the photo, and that
    // blank pin gets cached for the session.
    (locations as Location[]).forEach(location => {
      this.loadPinImage(location.thumb || location.img, img => {
        this.rawImageCache.set(location.img, img);
        this.iconCache.delete(String(location.id)); // force rebuild from the ready bitmap
        this.localityIconCache.clear();
        this.clusterLayer.changed();
      });
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

  // Rebuilds the cluster layer: locality vs individual gem pins by zoom, plus
  // proximity-clustered overlay pins (which re-cluster as you zoom, so it runs every refresh).
  private refreshLayer(_force = false): void {
    if (!this.clusterSource || !this.map) return;
    const zoom = this.map.getView().getZoom() ?? 10;
    const shouldCluster = zoom < CLUSTER_ZOOM;
    this.showingClusters = shouldCluster;
    this.clusterSource.clear();
    if (this._showGems) {
      if (shouldCluster) {
        this.buildLocalityFeatures();
        this.clusterSource.addFeatures(this.localityFeatures);
      } else {
        this.clusterSource.addFeatures(this.filteredFeatures);
      }
    }
    // Overlay pins cluster by proximity with a count badge, so dense areas don't pile up.
    if (FEATURES.PROMOTIONS) {
      if (this.experienceFeatures.length) this.clusterSource.addFeatures(this.clusterNearbyPins(this.experienceFeatures, 'experience'));
      if (this.eventFeatures.length) this.clusterSource.addFeatures(this.clusterNearbyPins(this.eventFeatures, 'event'));
    }
  }

  // Greedy proximity clustering for overlay pins at the current resolution.
  // Returns individual features for singletons, or a 'pin-cluster' feature with a count.
  private clusterNearbyPins(features: Feature[], kind: 'event' | 'experience'): Feature[] {
    const res = this.map.getView().getResolution() ?? 1;
    const dist = PIN_CLUSTER_PX * res;
    const out: Feature[] = [];
    const used = new Set<number>();
    for (let i = 0; i < features.length; i++) {
      if (used.has(i)) continue;
      used.add(i);
      const ci = (features[i].getGeometry() as Point).getCoordinates();
      const group = [features[i]];
      for (let j = i + 1; j < features.length; j++) {
        if (used.has(j)) continue;
        const cj = (features[j].getGeometry() as Point).getCoordinates();
        if (Math.hypot(ci[0] - cj[0], ci[1] - cj[1]) <= dist) { group.push(features[j]); used.add(j); }
      }
      if (group.length === 1) { out.push(features[i]); continue; }
      const cx = group.reduce((s, f) => s + (f.getGeometry() as Point).getCoordinates()[0], 0) / group.length;
      const cy = group.reduce((s, f) => s + (f.getGeometry() as Point).getCoordinates()[1], 0) / group.length;
      const count = kind === 'event'
        ? group.reduce((s, f) => s + (f.get('venuePin') as EventVenuePin).events.length, 0)
        : group.length;
      const image = this.clusterRepImage(group, kind);
      this.ensureClusterCover(image);
      // Use a real member's icon (events are all tickets; experiences vary by activity).
      const icon = kind === 'event' ? '🎟️' : experienceIcon(group[0].get('experience') as Experience);
      out.push(new Feature({ geometry: new Point([cx, cy]), type: 'pin-cluster', kind, count, members: group, image, icon }));
    }
    return out;
  }

  // Frame exactly the cluster's members — no more, no less. Fitting their bounding box
  // spreads them across the viewport, which also drops them out of the cluster. maxZoom
  // only caps the tiny-extent case (near-identical coords) so a tap never slams all the
  // way in. Single member → just centre on it.
  private expandPinCluster(members: Feature[]): void {
    const view = this.map.getView();
    const coords = members.map(f => (f.getGeometry() as Point).getCoordinates());
    if (coords.length === 1) {
      view.animate({ center: coords[0], zoom: Math.max(view.getZoom() ?? 14, 15), duration: 400 });
      return;
    }
    view.fit(boundingExtent(coords), {
      padding: PIN_FIT_PADDING,
      duration: 400,
      maxZoom: 17,
    });
  }

  // Representative cover for a cluster: soonest event's poster, or any experience image.
  private clusterRepImage(group: Feature[], kind: 'event' | 'experience'): string | null {
    if (kind === 'event') {
      const all = group.flatMap(f => (f.get('venuePin') as EventVenuePin).events);
      const minStart = (e: { dates: { start: string | null }[] }) =>
        e.dates.map(d => d.start).filter((s): s is string => !!s).sort()[0] ?? '￿';
      const soonest = [...all].sort((a, b) => minStart(a).localeCompare(minStart(b)))[0];
      return soonest?.image ?? null;
    }
    const withImg = group.map(f => f.get('experience') as Experience).find(e => e.coverImage);
    return withImg?.coverImage ?? null;
  }

  private ensureClusterCover(src: string | null): void {
    if (!src || this.clusterCoverCache.has(src) || this.clusterCoverLoading.has(src)) return;
    this.clusterCoverLoading.add(src);
    this.loadPinImage(src, img => {
      this.clusterCoverCache.set(src, img);
      this.clusterCoverLoading.delete(src);
      this.clusterLayer.changed();
    });
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
    const type = feature.get('type');
    if (type === 'locality-cluster') return this.localityClusterStyle(feature);
    if (type === 'pin-cluster') return this.pinClusterStyle(feature);
    if (type === 'experience-pin') return this.experiencePinStyle(feature);
    if (type === 'event-pin') return this.eventPinStyle(feature);
    return this.individualPinStyle(feature);
  }

  // ── Shared pin-style helpers (provider/experience/event/cluster pins share this) ──
  /** Zoom-aware scale for the overlay pin family (matches the locality cluster sizing). */
  private pinScale(): number {
    const zoom = this.map.getView().getZoom() ?? 10;
    return zoom < CLUSTER_ZOOM
      ? this.getLocalityScale(zoom) * PROVIDER_PIN_CLUSTER_SCALE
      : this.getIconSize(zoom) / ICON_CANVAS_SIZE;
  }

  /** A bottom-anchored Icon style with latitude-based z-index (so pins interleave by position). */
  private pinIconStyle(canvas: HTMLCanvasElement, feature: FeatureLike): Style {
    const coords = (feature.getGeometry() as Point).getCoordinates();
    return new Style({
      image: new Icon({
        img: canvas,
        size: [canvas.width, canvas.height],
        scale: this.pinScale(),
        anchor: [0.5, 1.0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
      }),
      // Above location pins/clusters; latitude keeps southern promo pins in front of northern ones.
      zIndex: PROMO_Z_BASE - Math.round(coords[1] / 1000),
    });
  }

  /** Loads + decodes a pin image, calling back once it's canvas-ready (Safari-safe deferral). */
  private loadPinImage(src: string, onReady: (img: HTMLImageElement) => void): void {
    const img = new Image();
    const done = () => { if (img.naturalWidth) onReady(img); };
    img.onload = done;
    img.src = src;
    img.decode?.().then(done).catch(() => { /* onload covers it */ });
  }

  // Cluster pin: a cover photo (with type badge) + the count pill above; icon disc until the image loads.
  private buildPinClusterCanvas(count: number, kind: 'event' | 'experience', icon: string, img?: HTMLImageElement): HTMLCanvasElement {
    const color = kind === 'event' ? EVENTS_ACCENT : '#0ea5e9';
    const label = `${count} ${kind === 'event' ? 'events' : 'experiences'}`;
    let pin: HTMLCanvasElement;
    if (img) {
      pin = this.buildCirclePin(img, PROVIDER_PIN_SIZE, '#fff');
      this.addEmojiBadge(pin, icon);
    } else {
      pin = this.buildEmojiTeardropPin(color, icon, 0.5);
    }
    return this.buildPillPin(pin, label, true, color);
  }

  private pinClusterStyle(feature: FeatureLike): Style {
    const kind: 'event' | 'experience' = feature.get('kind');
    const count: number = feature.get('count');
    const icon: string = feature.get('icon');
    const src: string | null = feature.get('image');
    const img = src ? this.clusterCoverCache.get(src) : undefined;
    const ready = img?.complete && img.naturalWidth ? img : undefined;

    const key = `${kind}-${count}-${icon}-${ready ? src : 'icon'}`;
    let canvas = this.pinClusterCanvasCache.get(key);
    if (!canvas) {
      canvas = this.buildPinClusterCanvas(count, kind, icon, ready);
      if (ready || !src) this.pinClusterCanvasCache.set(key, canvas); // don't cache the loading state
    }
    return this.pinIconStyle(canvas, feature);
  }

  private individualPinStyle(feature: FeatureLike): Style {
    const location = feature.get('location');
    const zoom = this.map.getView().getZoom() ?? 10;
    const iconSize = this.getIconSize(zoom);

    let canvas = this.iconCache.get(String(location.id));
    if (!canvas) {
      // Build the teardrop lazily from the loaded bitmap — deferred to render
      // time so Safari has decoded it. Guarded like the cluster canvas; until
      // the image is ready we fall through to the neutral placeholder below and
      // re-render once preloadIcons' onReady fires clusterLayer.changed().
      const rawImg = this.rawImageCache.get(location.img);
      if (rawImg?.complete && rawImg.naturalWidth) {
        const pin = this.buildTeardropPin(rawImg, ICON_CANVAS_SIZE, '#fff');
        canvas = location.showLabel ? this.buildPillPin(pin, location.title) : pin;
        this.iconCache.set(String(location.id), canvas);
      }
    }

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
      zIndex: 15,
    });
    this.map.addLayer(this.providerLayer);
    if (this._providerPins.length && FEATURES.PROMOTIONS) this.rebuildProviderLayer();
  }

  // Builds a provider's full pin canvas — photo circle (with group/emoji badge)
  // or emoji/group fallback, plus the deal pill. Called synchronously for emoji
  // pins, and lazily at render time for photo pins once the cover is decoded.
  private buildProviderCanvas(p: Provider, img?: HTMLImageElement): HTMLCanvasElement {
    const savings = p.discount && isDiscountValid(p.discount) ? p.discount.shortLabel : undefined;
    const label = savings ?? p.mapLabel ?? '🏷️ Deal';
    const pillColor = p.category === 'group' ? '#D4900A' : (savings ? '#D4A017' : undefined);

    let pin: HTMLCanvasElement;
    if (img) {
      pin = this.buildCirclePin(img, PROVIDER_PIN_SIZE, p.pinBorderColor ?? '#fff');
      if (p.category === 'group') {
        this.addGroupIconOverlay(pin);
      } else if (p.emoji) {
        this.addEmojiBadge(pin, p.emoji);
      }
    } else {
      pin = p.category === 'group'
        ? this.buildGroupFallbackPin()
        : this.buildProviderEmojiPin(p);
    }
    return this.buildPillPin(pin, label, true, pillColor);
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

      if (p.coverImage) {
        // Defer the canvas build to render time (providerPinStyle) so the cover
        // photo is only drawn once Safari has decoded it — same fix as preloadIcons.
        this.loadPinImage(p.coverImage, img => {
          this.providerImageCache.set(p.id, img);
          this.providerCanvasCache.delete(p.id);
          this.providerLayer.changed();
        });
      } else {
        // No photo → no decode race; build synchronously.
        this.providerCanvasCache.set(p.id, this.buildProviderCanvas(p));
      }
    }
  }

  private providerPinStyle(feature: FeatureLike): Style {
    const provider = feature.get('provider');
    let canvas = this.providerCanvasCache.get(provider.id);
    if (!canvas && provider.coverImage) {
      // Build lazily from the decoded cover bitmap — deferred for Safari, which
      // paints nothing if drawImage runs before the image is canvas-ready.
      const img = this.providerImageCache.get(provider.id);
      if (img?.complete && img.naturalWidth) {
        canvas = this.buildProviderCanvas(provider, img);
        this.providerCanvasCache.set(provider.id, canvas);
      }
    }
    const zoom = this.map.getView().getZoom() ?? 10;
    const scale = zoom < CLUSTER_ZOOM
      ? this.getLocalityScale(zoom) * PROVIDER_PIN_CLUSTER_SCALE
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
    return this.buildEmojiTeardropPin(resolveProviderColor(provider), provider.emoji ?? '🏷️');
  }

  // Coloured teardrop pin with a centred emoji — shared by provider and experience pins.
  // fontScale controls the emoji size relative to the pin width.
  private buildEmojiTeardropPin(color: string, emoji: string, fontScale = 0.38): HTMLCanvasElement {
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
    pc.fillStyle = color;
    pc.fill();
    pc.restore();

    pc.beginPath();
    pc.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
    pc.strokeStyle = '#fff';
    pc.lineWidth = 3;
    pc.stroke();

    pc.font = `${Math.round(W * fontScale)}px serif`;
    pc.textAlign = 'center';
    pc.textBaseline = 'middle';
    // Re-centre by the glyph's actual ink box: iOS gives some emoji (e.g. 🎟️) an
    // asymmetric left bearing that otherwise pushes them off-centre / out of the pin.
    const m = pc.measureText(emoji);
    const dx = Number.isFinite(m.actualBoundingBoxLeft) && Number.isFinite(m.actualBoundingBoxRight)
      ? (m.actualBoundingBoxLeft - m.actualBoundingBoxRight) / 2
      : 0;
    pc.fillText(emoji, cx + dx, cy + 1);

    return canvas;
  }

  // Blends a hex colour toward white (amount 0–1) for the softer experience pins.
  private lightenColor(hex: string, amount: number): string {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex);
    if (!m) return hex;
    const n = parseInt(m[1], 16);
    const mix = (c: number) => Math.round(c + (255 - c) * amount);
    return `rgb(${mix((n >> 16) & 255)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)})`;
  }

  // ── Experience pin layer ──────────────────────────────────
  // Mirrors the provider layer but draws one pin per experience spot. Icon-only
  // (coloured emoji teardrop) until an experience gets a coverImage, then a photo
  // circle with the activity-type icon badged in the corner.

  private setupExperienceLayer(): void {
    // No separate layer — features go into the cluster layer (see rebuildExperienceFeatures).
    if (this._experiencePins.length && FEATURES.PROMOTIONS) this.rebuildExperienceFeatures();
    if (this._eventPins.length && FEATURES.PROMOTIONS) this.rebuildEventFeatures();
  }

  private buildExperienceCanvas(experience: Experience, provider: Provider, img?: HTMLImageElement): HTMLCanvasElement {
    const discount = resolveExperienceDiscount(experience, provider);
    const savings = discount && isDiscountValid(discount) ? discount.shortLabel : undefined;
    const label = savings ?? '🏷️ Deal';
    const pillColor = savings ? '#D4A017' : undefined;

    let canvas: HTMLCanvasElement;
    if (img) {
      canvas = this.buildCirclePin(img, PROVIDER_PIN_SIZE, '#fff');
      this.addEmojiBadge(canvas, experienceIcon(experience));
    } else {
      // Softer (lightened) brand colour + a larger icon for the icon-only pins.
      const fill = this.lightenColor(experienceColor(provider), 0.55);
      canvas = this.buildEmojiTeardropPin(fill, experienceIcon(experience), 0.52);
    }
    return this.buildPillPin(canvas, label, true, pillColor);
  }

  private rebuildExperienceFeatures(): void {
    this.experienceFeatures = [];
    for (const pin of this._experiencePins) {
      const { experience, spot } = pin;
      this.experienceFeatures.push(new Feature({
        geometry: new Point(getCoordinatesfromLonLat(spot.lon, spot.lat)),
        type: 'experience-pin',
        experience,
        provider: pin.provider,
      }));
      if (this.experienceCanvasCache.has(experience.id)) continue;

      if (experience.coverImage) {
        // Defer canvas build until the cover is decoded (Safari paints nothing otherwise).
        this.loadPinImage(experience.coverImage, img => {
          this.experienceImageCache.set(experience.id, img);
          this.experienceCanvasCache.delete(experience.id);
          this.clusterLayer.changed();
        });
      } else {
        // Icon-only → no decode race; build synchronously.
        this.experienceCanvasCache.set(experience.id, this.buildExperienceCanvas(experience, pin.provider));
      }
    }
    this.refreshLayer(true);
  }

  private experiencePinStyle(feature: FeatureLike): Style {
    const experience: Experience = feature.get('experience');
    const provider: Provider = feature.get('provider');
    let canvas = this.experienceCanvasCache.get(experience.id);
    if (!canvas && experience.coverImage) {
      const img = this.experienceImageCache.get(experience.id);
      if (img?.complete && img.naturalWidth) {
        canvas = this.buildExperienceCanvas(experience, provider, img);
        this.experienceCanvasCache.set(experience.id, canvas);
      }
    }
    if (!canvas) {
      // Neutral placeholder dot while the cover photo decodes.
      const coords = (feature.getGeometry() as Point).getCoordinates();
      const r = Math.round(36 * this.pinScale());
      return new Style({
        image: new CircleStyle({ radius: r, fill: new Fill({ color: this.lightenColor(experienceColor(provider), 0.55) }), stroke: new Stroke({ color: '#fff', width: 2 }) }),
        zIndex: -Math.round(coords[1] / 1000),
      });
    }
    return this.pinIconStyle(canvas, feature);
  }

  // ── Event venue pins ──────────────────────────────────────
  // One pin per venue: a photo circle (the next event's poster) with a 🎟️ badge,
  // falling back to a ticket disc until the local image decodes.

  private eventKey(pin: EventVenuePin): string { return pin.venue || `${pin.lat},${pin.lon}`; }

  private buildEventCanvas(pin: EventVenuePin, img?: HTMLImageElement): HTMLCanvasElement {
    const n = pin.events.length;
    const label = `${n} event${n === 1 ? '' : 's'}`; // ticket lives in the corner badge, not the pill
    let canvas: HTMLCanvasElement;
    if (img) {
      canvas = this.buildCirclePin(img, PROVIDER_PIN_SIZE, '#fff');
      this.addEmojiBadge(canvas, '🎟️');
    } else {
      canvas = this.buildEmojiTeardropPin(EVENTS_ACCENT, '🎟️', 0.5);
    }
    return this.buildPillPin(canvas, label, true, EVENTS_ACCENT);
  }

  private rebuildEventFeatures(): void {
    this.eventFeatures = this._eventPins.map(pin => new Feature({
      geometry: new Point(getCoordinatesfromLonLat(pin.lon, pin.lat)),
      type: 'event-pin',
      venuePin: pin,
    }));
    for (const pin of this._eventPins) {
      const key = this.eventKey(pin);
      const src = pin.events[0]?.image;
      if (!src || this.eventCanvasCache.has(key) || this.eventImageCache.has(key)) continue;
      // Defer the photo build until the image decodes (local asset → no CORS taint).
      this.loadPinImage(src, img => {
        this.eventImageCache.set(key, img);
        this.clusterLayer.changed();
      });
    }
    this.refreshLayer(true);
  }

  private eventPinStyle(feature: FeatureLike): Style {
    const pin: EventVenuePin = feature.get('venuePin');
    const key = this.eventKey(pin);
    let canvas = this.eventCanvasCache.get(key);
    if (!canvas) {
      const img = this.eventImageCache.get(key);
      const ready = img?.complete && img.naturalWidth ? img : undefined;
      canvas = this.buildEventCanvas(pin, ready);
      if (ready) this.eventCanvasCache.set(key, canvas); // cache only the final photo pin
    }
    return this.pinIconStyle(canvas, feature);
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

  private buildCirclePin(img: HTMLImageElement, size: number, borderColor: string): HTMLCanvasElement {
    const W = size, H = size;
    const pad = 2;
    const cr = Math.round(W * 0.22); // corner radius — ~22% gives a squircle look

    const pin = document.createElement('canvas');
    pin.width = W;
    pin.height = H;
    const pc = pin.getContext('2d')!;

    pc.save();
    pc.shadowColor = 'rgba(0,0,0,0.22)';
    pc.shadowBlur = 8;
    pc.shadowOffsetY = 3;
    pc.beginPath();
    pc.roundRect(pad, pad, W - pad * 2, H - pad * 2, cr);
    pc.fillStyle = '#fff';
    pc.fill();
    pc.restore();

    pc.save();
    pc.beginPath();
    pc.roundRect(pad + 2, pad + 2, W - (pad + 2) * 2, H - (pad + 2) * 2, Math.max(1, cr - 2));
    pc.clip();
    pc.drawImage(img, 0, 0, W, H);
    pc.restore();

    pc.beginPath();
    pc.roundRect(pad + 0.5, pad + 0.5, W - (pad * 2) - 1, H - (pad * 2) - 1, cr);
    pc.strokeStyle = borderColor;
    pc.lineWidth = 3;
    pc.stroke();

    return pin;
  }

  // ── Shared pin builder ────────────────────────────────────
  // Used by location pins (size=80, border='#fff').
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
    // Centre by the glyph's actual ink box — iOS gives some emoji (🎟️) a left bearing.
    const m = pc.measureText(emoji);
    const dx = Number.isFinite(m.actualBoundingBoxLeft) && Number.isFinite(m.actualBoundingBoxRight)
      ? (m.actualBoundingBoxLeft - m.actualBoundingBoxRight) / 2
      : 0;
    pc.fillText(emoji, bx + dx, by + 1);
  }

  // Draws a dark scrim + white "users" SVG icon over an existing pin canvas (group pins).
  private addGroupIconOverlay(pin: HTMLCanvasElement): void {
    const W  = PROVIDER_PIN_SIZE;
    const cx = W / 2, cy = W / 2;
    const pad = 2;
    const cr  = Math.round(W * 0.22); // must match buildCirclePin
    const pc  = pin.getContext('2d')!;

    // Scrim clipped to the same squircle shape as the image
    pc.save();
    pc.beginPath();
    pc.roundRect(pad + 2, pad + 2, W - (pad + 2) * 2, W - (pad + 2) * 2, Math.max(1, cr - 2));
    pc.fillStyle = 'rgba(0, 0, 0, 0.45)';
    pc.fill();
    pc.restore();

    // "Users" icon (Feather-style, 24×24 viewBox) centered in the circle
    const iconSize = Math.round(W * 0.52);
    const scale    = iconSize / 24;
    const tx       = cx - 12 * scale;
    const ty       = cy - 11 * scale;

    pc.save();
    pc.translate(tx, ty);
    pc.scale(scale, scale);
    pc.strokeStyle = '#ffffff';
    pc.lineWidth   = 2.2 / scale;
    pc.lineCap     = 'round';
    pc.lineJoin    = 'round';

    // Primary person (left group)
    pc.stroke(new Path2D('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'));
    const head = new Path2D(); head.arc(9, 7, 4, 0, Math.PI * 2); pc.stroke(head);
    // Secondary person (right, slightly behind)
    pc.stroke(new Path2D('M23 21v-2a4 4 0 0 0-3-3.87'));
    pc.stroke(new Path2D('M16 3.13a4 4 0 0 1 0 7.75'));

    pc.restore();
  }

  // Fallback group pin when no spot image is available — amber teardrop + users icon.
  private buildGroupFallbackPin(): HTMLCanvasElement {
    const W = PROVIDER_PIN_SIZE;
    const tailH = Math.round(W * ICON_TAIL_H / ICON_CANVAS_SIZE);
    const H = W + tailH;
    const cx = W / 2, cy = W / 2;
    const r  = W / 2 - 2;
    const tailAngle = Math.PI / 8;

    const canvas = document.createElement('canvas');
    canvas.width  = W;
    canvas.height = H;
    const pc = canvas.getContext('2d')!;

    // Teardrop shape filled with brand amber
    pc.save();
    pc.shadowColor   = 'rgba(0,0,0,0.22)';
    pc.shadowBlur    = 8;
    pc.shadowOffsetY = 3;
    pc.beginPath();
    pc.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
    pc.lineTo(cx, H - 1);
    pc.closePath();
    pc.fillStyle = '#F4A922';
    pc.fill();
    pc.restore();

    pc.beginPath();
    pc.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
    pc.strokeStyle = '#fff';
    pc.lineWidth   = 3;
    pc.stroke();

    // Users icon centered
    const iconSize = Math.round(W * 0.52);
    const scale    = iconSize / 24;
    const tx       = cx - 12 * scale;
    const ty       = cy - 11 * scale;

    pc.save();
    pc.translate(tx, ty);
    pc.scale(scale, scale);
    pc.strokeStyle = '#fff';
    pc.lineWidth   = 2.2 / scale;
    pc.lineCap     = 'round';
    pc.lineJoin    = 'round';

    pc.stroke(new Path2D('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'));
    const head = new Path2D(); head.arc(9, 7, 4, 0, Math.PI * 2); pc.stroke(head);
    pc.stroke(new Path2D('M23 21v-2a4 4 0 0 0-3-3.87'));
    pc.stroke(new Path2D('M16 3.13a4 4 0 0 1 0 7.75'));

    pc.restore();
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

  private setupMeetingLayer(): void {
    this.map.addLayer(new VectorLayer({ source: this.meetingSource, zIndex: 60 }));
    if (this._meetingPoint) this.drawMeetingPoint(this._meetingPoint);
  }

  private drawMeetingPoint(p: { lat: number; lon: number } | null): void {
    this.meetingSource.clear();
    if (!p) return;
    const pin = makePinCanvas('#F4A922');
    const composite = this.buildPillPin(pin, 'Meeting point');
    const marker = new Feature({
      geometry: new Point(getCoordinatesfromLonLat(p.lon, p.lat)),
      type: 'meeting-point',
      meetingPoint: p,
    });
    marker.setStyle(new Style({
      image: new Icon({
        img: composite,
        size: [composite.width, composite.height],
        scale: 1,
        anchor: [0.5, 1.0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
      }),
    }));
    this.meetingSource.addFeature(marker);
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
    this.controlTapped.emit();
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
    this.controlTapped.emit();
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
    this.locationSelected.emit(data);
  }

  // ── Helpers ───────────────────────────────────────────────

  private getLocationMapCoordinates(location: Location): number[] {
    const points = location.routes?.[0]?.mapPoints ?? location.mapPoints;
    if (points?.length) {
      const dest = points.find(p => p.type === MapPointType.Destination) ?? points[points.length - 1];
      return getCoordinatesfromLonLat(dest.lon, dest.lat);
    }
    return getCoordinatesfromLonLat(location.lon, location.lat);
  }

  private getMaltaViewCoordinates(): number[] {
    return getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]);
  }
}
