import { AfterViewInit, Component } from '@angular/core';
import Map from 'ol/Map';
import RenderFeature from 'ol/render/Feature';
import { MatDialog } from '@angular/material/dialog';

// Custom functions and components imported for managing map interactions
import {
  clickOnMapPin,
  createMap,
  createView,
  getCoordinatesfromLonLat,
  getCoordinatesfromPixel,
} from './map-functions';
import { MapModalComponent, ModalActions } from '../map-modal/map-modal.component';
import { locations } from '../../../assets/locations.json';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Overlay } from 'ol';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: false
})
export class MapComponent implements AfterViewInit {
  public map!: Map;
  private maltaCoordinates = [14.363354400245052, 35.95195406978092];
  locations = locations.reverse();
  markerSize = 10;
  markerMode: 'dot' | 'image' = 'dot';

  constructor(
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public seoService: SeoService
  ) {

  }

  ngAfterViewInit(): void {
    this.map = createMap(
      getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]),
      10.2,
      'ol-map'
    );

    this.updateMarkerStyle();

    this.map.on('moveend', () => {
      this.updateMarkerStyle();
    });

    locations.forEach((location, index) => {
      var overlayelement = new Overlay({
        stopEvent: false,
        positioning: 'bottom-center',
        element: document.getElementById(`${location.id}`) as HTMLElement
      });

      overlayelement.setPosition(this.getLocationMapCoordinates(location));
      this.map.addOverlay(overlayelement);

    }
    );

    this.handleClickOnMapPin();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['title']) {
        const place = locations.find(loc => encodeURIComponent(loc.title) === params['title']) ?? locations.find(loc => encodeURIComponent(loc.title.replace(' ', '-')) === params['title']);
        this.seoService.updateMetaData(place);
        this.openDialog(place, this.getLocationMapCoordinates(place))
      } else {
        this.seoService.updateMetaData();
      }
    })
  }

  private handleClickOnMapPin(): void {
    clickOnMapPin(this.map, (pinClicked, event) => {
      const geometry = pinClicked?.getGeometry() as RenderFeature;
      const flatCoordinates = geometry?.getFlatCoordinates();

      const num = pinClicked.getId() as number;

      console.log(getCoordinatesfromPixel(flatCoordinates));


    });
  }

  clickon(data: any) {
    console.log(data)
    const queryParams = { title: encodeURIComponent(data.title.replace(' ', '-')) };
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {} }).then(res => {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams,
          queryParamsHandling: 'merge',
        }
      );
    });


  }

  private openDialog(location: any, flatCoordinates: number[]) {
    setTimeout(() => {

      this.dialog.open(MapModalComponent, {
        data: location
      }).afterClosed().subscribe(res => {
        if (res === ModalActions.EXPLORE) {
          this.map.setView(
            createView(this.getMaltaViewCoordinates(), 10.2)
          );
          this.updateMarkerStyle();
        }
        if (res === ModalActions.GOOGLE_MAPS) {
          window.open(this.getGoogleMapsUrl(location, flatCoordinates), '_blank');
        }
      });
    }, 1);

    if ((this.map.getView().getZoom() ?? 0) <= 13) {
      this.map.setView(createView(flatCoordinates, 13));
      this.updateMarkerStyle();
    }
  }

  private getLocationMapCoordinates(location: any) {
    const locationPoint = this.getFinalLocationPoint(location);

    return getCoordinatesfromLonLat(locationPoint.lon, locationPoint.lat);
  }

  private getFinalLocationPoint(location: any) {
    if (location?.mapPoints?.length) {
      return location.mapPoints.find((point: any) => point.type === 'destination') ?? location.mapPoints[location.mapPoints.length - 1];
    }

    return location;
  }

  private getGoogleMapsUrl(location: any, flatCoordinates: number[]) {
    if (location?.mapPoints?.length > 1) {
      const origin = location.mapPoints[0];
      const destination = location.mapPoints[location.mapPoints.length - 1];
      const waypoints = location.mapPoints.slice(1, -1).map((point: any) => `${point.lat},${point.lon}`).join('|');

      return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lon}&destination=${destination.lat},${destination.lon}${waypoints ? `&waypoints=${waypoints}` : ''}`;
    }

    return "https://maps.google.com/?q=" + getCoordinatesfromPixel(flatCoordinates).reverse().join(',');
  }

  private updateMarkerStyle() {
    const zoom = this.map.getView().getZoom() ?? 10;

    if (zoom <= 10.8) {
      this.markerMode = 'dot';
      this.markerSize = 14;
    } else if (zoom <= 11.5) {
      this.markerMode = 'dot';
      this.markerSize = 20;
    } else if (zoom <= 12.3) {
      this.markerMode = 'image';
      this.markerSize = 28;
    } else if (zoom <= 13.3) {
      this.markerMode = 'image';
      this.markerSize = 42;
    } else {
      this.markerMode = 'image';
      this.markerSize = 68;
    }
  }

  private getMaltaViewCoordinates() {
    return getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]);
  }


}