import { Location } from '../models';
import { Provider } from '../models';
import { haversineKm } from './geo.utils';

export const NEAR_LOCATION_KM = 8;

export function getProvidersNearLocation(location: Location, all: Provider[]): Provider[] {
  return all
    .filter(p =>
      p.nearLocationIds?.includes(location.id) ||
      (p.lat && p.lon && haversineKm(location.lat, location.lon, p.lat, p.lon) <= NEAR_LOCATION_KM),
    )
    .sort((a, b) => {
      const da = a.lat && a.lon ? haversineKm(location.lat, location.lon, a.lat, a.lon) : Infinity;
      const db = b.lat && b.lon ? haversineKm(location.lat, location.lon, b.lat, b.lon) : Infinity;
      return da - db;
    });
}
