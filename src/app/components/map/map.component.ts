import { AfterViewInit, Component } from '@angular/core';
import OlMap from 'ol/Map';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { boundingExtent } from 'ol/extent';
import { MatDialog } from '@angular/material/dialog';

import { createMap, createView, getCoordinatesfromLonLat, getCoordinatesfromPixel } from './map-functions';
import { MapModalComponent, ModalActions } from '../map-modal/map-modal.component';
import { locations } from '../../../assets/locations.json';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

const ICON_CANVAS_SIZE = 80;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: false
})
export class MapComponent implements AfterViewInit {
  public map!: OlMap;
  private maltaCoordinates = [14.363354400245052, 35.95195406978092];
  private clusterSource!: any;
  private clusterLayer!: any;
  private iconCache = new Map<string, HTMLCanvasElement>();

  constructor(
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public seoService: SeoService
  ) {}

  ngAfterViewInit(): void {
    this.map = createMap(
      getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]),
      10.2,
      'ol-map'
    );

    this.setupClusterLayer();
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
        this.map.getView().fit(extent, { padding: [80, 80, 80, 80], duration: 400, maxZoom: 14 });
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
        this.openDialog(place, this.getLocationMapCoordinates(place));
      } else {
        this.seoService.updateMetaData();
      }
    });
  }

  private preloadIcons(): void {
    locations.forEach(location => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = ICON_CANVAS_SIZE;
        canvas.height = ICON_CANVAS_SIZE;
        const ctx = canvas.getContext('2d')!;
        const r = ICON_CANVAS_SIZE / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r, r, r - 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, ICON_CANVAS_SIZE, ICON_CANVAS_SIZE);
        ctx.restore();

        ctx.beginPath();
        ctx.arc(r, r, r - 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();

        this.iconCache.set(location.img, canvas);
        this.clusterLayer.changed();
      };
      img.src = location.img;
    });
  }

  private setupClusterLayer(): void {
    const features = locations.map(location =>
      new Feature({
        geometry: new Point(getCoordinatesfromLonLat(location.lon, location.lat)),
        location,
      })
    );

    this.clusterSource = new Cluster({
      distance: this.getClusterDistance(10.2),
      minDistance: 25,
      source: new VectorSource({ features }),
    });

    this.clusterLayer = new VectorLayer({
      source: this.clusterSource,
      style: (feature) => this.clusterStyle(feature),
    });

    this.map.addLayer(this.clusterLayer);
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
        return new Style({
          image: new Icon({
            img: canvas,
            size: [ICON_CANVAS_SIZE, ICON_CANVAS_SIZE],
            scale: iconSize / ICON_CANVAS_SIZE,
          }),
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
        fill: new Fill({ color: '#1B5E99' }),
        stroke: new Stroke({ color: '#ffffff', width: 2 }),
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({ color: '#ffffff' }),
        font: 'bold 13px Roboto, sans-serif',
        offsetY: 1,
      }),
    });
  }

  private getClusterDistance(zoom: number): number {
    if (zoom <= 11) return 50;
    if (zoom <= 12) return 35;
    if (zoom <= 13) return 20;
    return 0;
  }

  private getIconSize(zoom: number): number {
    if (zoom <= 10.8) return 14;
    if (zoom <= 11.5) return 20;
    if (zoom <= 12.3) return 28;
    if (zoom <= 13.3) return 42;
    return 60;
  }

  clickon(data: any): void {
    const queryParams = { title: encodeURIComponent(data.title.replace(' ', '-')) };
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {} }).then(() => {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge',
      });
    });
  }

  private openDialog(location: any, flatCoordinates: number[]): void {
    setTimeout(() => {
      this.dialog.open(MapModalComponent, { data: location })
        .afterClosed().subscribe(res => {
          if (res === ModalActions.EXPLORE) {
            this.map.setView(createView(this.getMaltaViewCoordinates(), 10.2));
          }
          if (res === ModalActions.GOOGLE_MAPS) {
            window.open(this.getGoogleMapsUrl(location, flatCoordinates), '_blank');
          }
        });
    }, 1);

    if ((this.map.getView().getZoom() ?? 0) <= 13) {
      this.map.setView(createView(flatCoordinates, 13));
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
