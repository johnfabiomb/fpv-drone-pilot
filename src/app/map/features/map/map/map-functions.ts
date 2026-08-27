import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { defaults as defaultControls } from 'ol/control';
import * as proj from 'ol/proj';
import { Coordinate } from 'ol/coordinate';

export const getCoordinatesfromLonLat = (lon: number, lat: number) => proj.fromLonLat([lon, lat]);
export const getCoordinatesfromPixel = (arr: Array<number>) => proj.toLonLat(arr);

const createView = (center: Coordinate, zoom: number) => new View({
    center,
    zoom,
    maxZoom: 20,
});

export const createMap = (center: Coordinate, zoom: number, target: string) => new Map({
    target,
    controls: defaultControls({ rotate: false, zoom: false }),
    layers: [
        new TileLayer({
            // Standard OpenStreetMap raster tiles — keyless. Replaced CARTO Voyager,
            // which retired free anonymous tiles and now stamps unauthenticated
            // requests with an "API KEY REQUIRED" watermark. To restore the cleaner
            // Voyager look, get a free key at carto.com/basemaps/apikey and append
            // `?api_key=…` to the rastertiles/voyager URLs.
            source: new XYZ({
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                attributions: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
                maxZoom: 19,
            })
        })
    ],
    view: createView(center, zoom)
});