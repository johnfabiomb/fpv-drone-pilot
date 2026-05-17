// src/app/shared/utils/geo.utils.ts
var EARTH_RADIUS_KM = 6371;
function haversineRad(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function haversineKm(lat1, lon1, lat2, lon2) {
  return EARTH_RADIUS_KM * haversineRad(lat1, lon1, lat2, lon2);
}
function haversineM(lat1, lon1, lat2, lon2) {
  return EARTH_RADIUS_KM * 1e3 * haversineRad(lat1, lon1, lat2, lon2);
}

export {
  haversineKm,
  haversineM
};
//# sourceMappingURL=chunk-6PGXQTC4.js.map
