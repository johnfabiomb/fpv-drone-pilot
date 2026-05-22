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
    controls: defaultControls({ rotate: false }),
    layers: [
        new TileLayer({
            source: new XYZ({
                urls: [
                    'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
                    'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
                    'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
                    'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
                ],
                attributions: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
                maxZoom: 19,
            })
        })
    ],
    view: createView(center, zoom)
});