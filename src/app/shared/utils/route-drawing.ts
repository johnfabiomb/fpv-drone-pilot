import Feature from 'ol/Feature';
import { LineString, Point } from 'ol/geom';
import { Style, Stroke, Fill, Circle as CircleStyle, Text } from 'ol/style';
import { fromLonLat } from 'ol/proj';

/**
 * Builds all OL features needed to draw a route from a mapPoints array.
 * Returns an empty array when fewer than 2 points are provided.
 *
 * Solid line  → at least one point has type "waypoint" (path was manually recorded)
 * Dashed line → only named stops, no recorded trail coords
 */
export function buildRouteFeatures(mapPoints: any[]): Feature[] {
  if (!mapPoints || mapPoints.length < 2) return [];

  const coords = mapPoints.map(p => fromLonLat([p.lon, p.lat]));
  const hasRecordedPath = mapPoints.some(p => p.type === 'waypoint');

  const features: Feature[] = [];

  // ── Line ─────────────────────────────────────────────────────────────────
  const outline = new Feature(new LineString(coords));
  outline.setStyle(new Style({
    stroke: new Stroke({ color: 'rgba(255,255,255,0.75)', width: 6 }),
  }));

  const line = new Feature(new LineString(coords));
  line.setStyle(new Style({
    stroke: new Stroke({
      color: '#F4A922',
      width: 3,
      lineDash: hasRecordedPath ? undefined : [12, 8],
    }),
  }));

  features.push(outline, line);

  // ── Dots ──────────────────────────────────────────────────────────────────
  coords.forEach((coord, i) => {
    const isFirst = i === 0;
    const isLast  = i === coords.length - 1;
    const dot = new Feature(new Point(coord));

    if (isFirst || isLast) {
      const label = isFirst
        ? (mapPoints[i]?.label ?? 'Parking')
        : (mapPoints[i]?.label ?? 'Destination');

      dot.setStyle(new Style({
        image: new CircleStyle({
          radius: isFirst ? 7 : 8,
          fill: new Fill({ color: isFirst ? '#3b82f6' : '#F4A922' }),
          stroke: new Stroke({ color: '#fff', width: 2 }),
        }),
        text: new Text({
          text: label,
          font: 'bold 11px sans-serif',
          fill: new Fill({ color: '#1a1a1a' }),
          stroke: new Stroke({ color: '#ffffff', width: 3 }),
          offsetX: isFirst ? 14 : 0,
          offsetY: isFirst ? -14 : 18,
          textAlign: isFirst ? 'left' : 'center',
          textBaseline: 'middle',
        }),
        zIndex: isLast ? 2 : 1,
      }));
    } else {
      dot.setStyle(new Style({
        image: new CircleStyle({
          radius: 2,
          fill: new Fill({ color: 'rgba(244,169,34,0.5)' }),
          stroke: new Stroke({ color: 'rgba(255,255,255,0.6)', width: 1 }),
        }),
        zIndex: 0,
      }));
    }

    features.push(dot);
  });

  return features;
}
