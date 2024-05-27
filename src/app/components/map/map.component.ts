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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  public map!: Map;
  private maltaCoordinates = [14.363354400245052, 35.95195406978092]; // Central coordinates for Malta
  locations = locations.reverse();

  constructor(
    public dialog: MatDialog, 
    public activatedRoute:ActivatedRoute,
    public router: Router
  ) {
    
  }

  ngAfterViewInit(): void {
    // Initialize the map with predefined coordinates and zoom level
    this.map = createMap(
      getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]),
      10.2,
      'ol-map'
    );

    // Create map pins for each location stored in the locations array
    locations.forEach((location, index) => {
        var overlayelement = new Overlay({
          stopEvent: false,
          positioning: 'bottom-center',
          element: document.getElementById(location.img) as HTMLElement
        });
        
        overlayelement.setPosition( getCoordinatesfromLonLat(location.lon, location.lat));
        this.map.addOverlay(overlayelement);

      }
    );

    // Add a vector layer containing all pins to the map
    // const vectorLayer = createVectorLayer(pins);
   

    // Set up event handling for clicking on map pins
    this.handleClickOnMapPin();

    this.activatedRoute.queryParams.subscribe((params:Params)=>{
      if(params['title']){
        const place = locations.find(loc=> encodeURIComponent(loc.title) === params['title']);
        this.openDialog(place, getCoordinatesfromLonLat(place?.lon as number, place?.lat as number))
      }
    })
  }

  private handleClickOnMapPin(): void {
    clickOnMapPin(this.map, (pinClicked, event) => {
      const geometry = pinClicked?.getGeometry() as RenderFeature;
      const flatCoordinates = geometry?.getFlatCoordinates();
      
      const num = pinClicked.getId() as number; // Assuming the ID is a number

      console.log(getCoordinatesfromPixel(flatCoordinates));

      
    });
  }

  clickon(data:any){
    console.log(data)
    const queryParams = { title: encodeURIComponent(data.title) };
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );

  }

  private openDialog(location:any, flatCoordinates:number[]){
    setTimeout(() => {
      
      // Open a modal dialog with the location details when a pin is clicked
      this.dialog.open(MapModalComponent, {
        data: location
      }).afterClosed().subscribe(res => {
        // On modal close, check if the user wants to explore more (reset view)
        if (res === ModalActions.EXPLORE) {
          this.map.setView(
            createView(this.getMaltaViewCoordinates(), 10.2)
          );
        }
        if(res === ModalActions.GOOGLE_MAPS){
          const url = "https://maps.google.com/?q="+  getCoordinatesfromPixel(flatCoordinates).reverse().join(',');
          window.open(url, '_blank');
        }
      });
    }, 1);

    // // Optionally adjust the map view to zoom closer to the selected pin
    if ((this.map.getView().getZoom() ?? 0) <= 13) {
      this.map.setView(createView(flatCoordinates, 13));
    }
  }

  private getMaltaViewCoordinates() {
    return getCoordinatesfromLonLat(this.maltaCoordinates[0], this.maltaCoordinates[1]);
  }

  
}
