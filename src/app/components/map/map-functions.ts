import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature, { FeatureLike } from 'ol/Feature';
import * as layer from 'ol/layer';
import * as geom from 'ol/geom';
import * as style from 'ol/style';
import * as source from 'ol/source';
import * as proj from 'ol/proj';
import RenderFeature from 'ol/render/Feature';
import { Coordinate } from 'ol/coordinate';
import { MapBrowserEvent, Overlay } from 'ol';

/**
 * fromLonLat
 * @param lon 
 * @param lat 
 * @returns 
 */
export const getCoordinatesfromLonLat = (lon: number, lat: number) => proj.fromLonLat([lon, lat]);
export const getCoordinatesfromPixel = (arr: Array<number>) => proj.toLonLat(arr);

/**
 * createMap
 * @param center location
 * @param target HTMLElement
 * @param zoom Number
 * @returns 
 */
export const createMap = (center: Coordinate, zoom: number, target: string) => new Map({
    target,
    layers: [
        new layer.Tile({
            source: new source.OSM()
        })
    ],
    view: createView(center, zoom)
});


/**
 * createView
 * @param center 
 * @param zoom 
 * @returns 
 */
export const createView = (center: Coordinate, zoom: number) => new View({
    center,
    zoom
})

/**
 * getImageMapPinStyle
 * @param text Name or Label
 * @param src Image
 * @returns 
 */
export const getImageMapPinStyle = (src: string) => new style.Style({
    text: new style.Text({ offsetY: 5 }),
    image: new style.Icon({
        width: 40,
        height: 40,
        src
    }),
});

/**
 * createMapPin
 * @param location 
 * @param text 
 * @param src 
 * @returns 
 */
export const createMapPin = (location: Coordinate, id: number, src: string): Feature<geom.Point> => {
    const feature = new Feature({
        geometry: new geom.Point(location),
    });
    feature.setStyle(getImageMapPinStyle(src));
    feature.setId(id);

    // var overlayelement = new Overlay({
    //     stopEvent: false,
    //     positioning: 'center-center',
    //     element: document.getElementById('slika')
    //   });
    //   overlayelement.setPosition(featuresArr[i].getGeometry().getCoordinates());
    return feature;
};

/**
 * createVectorLayer
 * @param features 
 * @returns 
 */
export const createVectorLayer = (features: Feature<geom.Point>[]) => new layer.Vector({
    source: new source.Vector({
        features
    })
});

/**
 * clickOnMapPin
 * @param map 
 * @param even 
 * @returns 
 */
export const clickOnMapPin = (map: Map, even: (pinClicked: FeatureLike, event: MapBrowserEvent<any>) => void) => map.on('singleclick', (evt) => {
    const pinClicked = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => ({feature, layer}));
    console.log(getCoordinatesfromPixel(evt.coordinate), pinClicked);
    if (pinClicked) {
        even(pinClicked.feature, evt);
    }
});