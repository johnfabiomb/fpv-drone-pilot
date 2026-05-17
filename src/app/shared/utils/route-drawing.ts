import Feature from 'ol/Feature';
import { MapPoint } from '../models';
import { LineString, Point } from 'ol/geom';
import { Style, Stroke, Fill, Icon, Text } from 'ol/style';
import { fromLonLat } from 'ol/proj';

const PIN_W = 22;
const PIN_H = 32;
// Circle centre is roughly (PIN_H - cy) pixels above the tip (anchor point)
const PIN_CY = PIN_W / 2 - 1.5 + 1.5; // ≈ 11px from canvas top

function makePinCanvas(color: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width  = PIN_W;
  canvas.height = PIN_H;
  const ctx = canvas.getContext('2d')!;
  const cx = PIN_W / 2;
  const r  = PIN_W / 2 - 1.5;
  const cy = r + 1.5;
  const tailAngle = Math.PI / 8;

  // Drop shadow
  ctx.save();
  ctx.shadowColor   = 'rgba(0,0,0,0.22)';
  ctx.shadowBlur    = 5;
  ctx.shadowOffsetY = 2;

  // Pin body (teardrop)
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
  ctx.lineTo(cx, PIN_H - 1);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();

  // White border
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
  ctx.lineTo(cx, PIN_H - 1);
  ctx.closePath();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner dot
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.32, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fill();

  return canvas;
}

export function makePinStyle(color: string): Style {
  const canvas = makePinCanvas(color);
  return new Style({
    image: new Icon({
      img: canvas,
      size: [PIN_W, PIN_H],
      anchor: [0.5, 1.0],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
    }),
  });
}

/**
 * Builds all OL features needed to draw a route from a mapPoints array.
 * Returns an empty array when fewer than 2 points are provided.
 *
 * Solid line  → at least one point has type "waypoint" (path was manually recorded)
 * Dashed line → only named stops, no recorded trail coords
 */
export function buildRouteFeatures(
  mapPoints: MapPoint[],
  options: { dashed?: boolean } = {}
): Feature[] {
  if (!mapPoints || mapPoints.length < 2) return [];

  const coords = mapPoints.map(p => fromLonLat([p.lon, p.lat]));

  const features: Feature[] = [];

  // ── Lines (one feature per segment so each can be styled independently) ──
  for (let i = 0; i < coords.length - 1; i++) {
    const segCoords = [coords[i], coords[i + 1]];
    const point = mapPoints[i + 1]; // destination point of this segment
    const isDashed = point?.lineStyle === 'dashed'
      ? true
      : point?.lineStyle === 'solid'
      ? false
      : options.dashed ?? false;

    const segOutline = new Feature(new LineString(segCoords));
    segOutline.setStyle(new Style({
      stroke: new Stroke({ color: 'rgba(255,255,255,0.75)', width: 6 }),
    }));

    const segLine = new Feature(new LineString(segCoords));
    segLine.setStyle(new Style({
      stroke: new Stroke({
        color: '#F4A922',
        width: 3,
        lineDash: isDashed ? [12, 8] : undefined,
      }),
    }));

    features.push(segOutline, segLine);
  }

  // ── Dots ──────────────────────────────────────────────────────────────────
  coords.forEach((coord, i) => {
    const isFirst = i === 0;
    const isLast  = i === coords.length - 1;
    const dot = new Feature(new Point(coord));

    if (isFirst || isLast) {
      const label = isFirst
        ? (mapPoints[i]?.label ?? 'Parking')
        : (mapPoints[i]?.label ?? 'Destination');

      const pinColor = isFirst ? '#3b82f6' : '#F4A922';
      const pinCanvas = makePinCanvas(pinColor);

      // Text above the pin circle for destination; to the right for parking
      const textOffsetX =  0;
      const textOffsetY =  -(PIN_H + 10);

      dot.setStyle(new Style({
        image: new Icon({
          img: pinCanvas,
          size: [PIN_W, PIN_H],
          anchor: [0.5, 1.0],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
        }),
        text: new Text({
          text: label,
          font: 'bold 11px sans-serif',
          fill: new Fill({ color: '#1a1a1a' }),
          stroke: new Stroke({ color: '#ffffff', width: 3 }),
          offsetX: textOffsetX,
          offsetY: textOffsetY,
          textAlign: 'center',
          textBaseline: 'middle',
        }),
        zIndex: isLast ? 2 : 1,
      }));
    } else {
      dot.setStyle(new Style({
        image: new Icon({
          img: (() => {
            const c = document.createElement('canvas');
            c.width = c.height = 8;
            const x = c.getContext('2d')!;
            x.beginPath();
            x.arc(4, 4, 2.5, 0, Math.PI * 2);
            x.fillStyle = 'rgba(244,169,34,0.55)';
            x.fill();
            x.strokeStyle = 'rgba(255,255,255,0.7)';
            x.lineWidth = 1;
            x.stroke();
            return c;
          })(),
          size: [8, 8],
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
        }),
        zIndex: 0,
      }));
    }

    features.push(dot);
  });

  return features;
}
