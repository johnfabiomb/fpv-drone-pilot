import Feature from 'ol/Feature';
import { MapPoint } from '../models';
import { LineString, Point } from 'ol/geom';
import { Style, Stroke, Fill, Icon, Text } from 'ol/style';
import { fromLonLat } from 'ol/proj';

const PIN_W = 22;
const PIN_H = 32;

function makePinCanvas(color: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width  = PIN_W;
  canvas.height = PIN_H;
  const ctx = canvas.getContext('2d')!;
  const cx = PIN_W / 2;
  const r  = PIN_W / 2 - 1.5;
  const cy = r + 1.5;
  const tailAngle = Math.PI / 8;

  ctx.save();
  ctx.shadowColor   = 'rgba(0,0,0,0.22)';
  ctx.shadowBlur    = 5;
  ctx.shadowOffsetY = 2;

  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
  ctx.lineTo(cx, PIN_H - 1);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI / 2 + tailAngle, Math.PI / 2 - tailAngle, false);
  ctx.lineTo(cx, PIN_H - 1);
  ctx.closePath();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.stroke();

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

export const ROUTE_COLORS = ['#F4A922', '#22c55e', '#a855f7', '#ef4444'];

/**
 * graphics — line segments + pin icons (rendered on a non-decluttered layer, always visible)
 * labels   — text-only features for pin names (rendered on a decluttered layer; OL auto-hides
 *             overlapping labels while keeping all icons intact)
 */
export interface RouteFeatures {
  graphics: Feature[];
  labels: Feature[];
}

export function buildRouteFeatures(
  mapPoints: MapPoint[],
  options: { dashed?: boolean; lineColor?: string; skipEndPin?: boolean } = {}
): RouteFeatures {
  if (!mapPoints || mapPoints.length < 2) return { graphics: [], labels: [] };

  const color = options.lineColor ?? '#F4A922';
  const coords = mapPoints.map(p => fromLonLat([p.lon, p.lat]));

  const graphics: Feature[] = [];
  const labels: Feature[] = [];

  // ── Lines ────────────────────────────────────────────────────────────────
  for (let i = 0; i < coords.length - 1; i++) {
    const segCoords = [coords[i], coords[i + 1]];
    const point = mapPoints[i + 1];
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
        color: color,
        width: 3,
        lineDash: isDashed ? [12, 8] : undefined,
      }),
    }));

    graphics.push(segOutline, segLine);
  }

  // ── Dots ─────────────────────────────────────────────────────────────────
  coords.forEach((coord, i) => {
    const isFirst = i === 0;
    const isLast  = i === coords.length - 1;

    if (isLast && options.skipEndPin) return;

    if (isFirst || isLast) {
      const label    = isFirst ? (mapPoints[i]?.label ?? 'Parking') : (mapPoints[i]?.label ?? 'Destination');
      const pinColor = isFirst ? '#3b82f6' : color;
      const zIdx     = isLast ? 2 : 1;

      // Icon — always visible (non-decluttered layer)
      const iconFeature = new Feature(new Point(coord));
      iconFeature.setStyle(new Style({
        image: new Icon({
          img: makePinCanvas(pinColor),
          size: [PIN_W, PIN_H],
          anchor: [0.5, 1.0],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
        }),
        zIndex: zIdx,
      }));
      graphics.push(iconFeature);

      // Label — decluttered (OL hides it if another label is too close)
      const labelFeature = new Feature(new Point(coord));
      labelFeature.setStyle(new Style({
        text: new Text({
          text: label,
          font: 'bold 11px sans-serif',
          fill: new Fill({ color: '#1a1a1a' }),
          stroke: new Stroke({ color: '#ffffff', width: 3 }),
          offsetX: 0,
          offsetY: -(PIN_H + 10),
          textAlign: 'center',
          textBaseline: 'middle',
          padding: [2, 4, 2, 4],
        }),
        zIndex: zIdx,
      }));
      labels.push(labelFeature);

    } else {
      // Waypoint dot (no label)
      const dot = new Feature(new Point(coord));
      dot.setStyle(new Style({
        image: new Icon({
          img: (() => {
            const c = document.createElement('canvas');
            c.width = c.height = 8;
            const ctx = c.getContext('2d')!;
            ctx.beginPath();
            ctx.arc(4, 4, 2.5, 0, Math.PI * 2);
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = color;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeStyle = 'rgba(255,255,255,0.7)';
            ctx.lineWidth = 1;
            ctx.stroke();
            return c;
          })(),
          size: [8, 8],
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
        }),
        zIndex: 0,
      }));
      graphics.push(dot);
    }
  });

  return { graphics, labels };
}
