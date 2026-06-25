import {
  ExperienceType
} from "./chunk-YQQNS7T3.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/map/core/utils/geo.utils.ts
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

// src/app/map/core/utils/provider.utils.ts
var NEAR_LOCATION_KM = 8;
function getProvidersNearLocation(location, all) {
  return all.filter((p) => p.nearLocationIds?.includes(location.id) || p.lat && p.lon && haversineKm(location.lat, location.lon, p.lat, p.lon) <= NEAR_LOCATION_KM).sort((a, b) => {
    const da = a.lat && a.lon ? haversineKm(location.lat, location.lon, a.lat, a.lon) : Infinity;
    const db = b.lat && b.lon ? haversineKm(location.lat, location.lon, b.lat, b.lon) : Infinity;
    return da - db;
  });
}
function isDiscountValid(discount) {
  if (!discount.validUntil)
    return true;
  return /* @__PURE__ */ new Date() <= /* @__PURE__ */ new Date(discount.validUntil + "T23:59:59");
}
function buildBookingUrl(provider) {
  const cfg = provider.bookingConfig;
  if (!cfg)
    return provider.website ?? null;
  const checkIn = /* @__PURE__ */ new Date();
  checkIn.setDate(checkIn.getDate() + cfg.checkInOffsetDays);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + cfg.nights);
  const fmt = (d) => d.toISOString().split("T")[0];
  const params = new URLSearchParams({
    checkInDate: fmt(checkIn),
    checkOutDate: fmt(checkOut)
  });
  if (provider.discount?.coupon)
    params.set("promocode", provider.discount.coupon);
  return `${cfg.baseUrl}?${params}`;
}
var CATEGORY_COLORS = {
  "water-sports": "#0ea5e9",
  "tour": "#8b5cf6",
  "hotel": "#f59e0b",
  "restaurant": "#ef4444",
  "experience": "#10b981",
  "tours": "#F4A300"
};
var CATEGORY_LABELS = {
  "water-sports": "Water Sports",
  "tour": "Boat Tour",
  "hotel": "Hotel",
  "restaurant": "Restaurant",
  "experience": "Experience",
  "tours": "Tours"
};
function getProviderAccentColor(category) {
  return CATEGORY_COLORS[category] ?? "#F4A922";
}
function resolveProviderColor(provider) {
  return provider?.color ?? getProviderAccentColor(provider?.category);
}
function getProviderCategoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category;
}

// src/app/map/core/utils/experience.utils.ts
var EXPERIENCE_ICONS = {
  [ExperienceType.Wakeboard]: "\u{1F3C4}",
  [ExperienceType.Wakesurf]: "\u{1F30A}",
  [ExperienceType.Wakefoil]: "\u{1FABD}",
  [ExperienceType.Tube]: "\u{1F6DF}",
  [ExperienceType.Buggy]: "\u{1F699}",
  [ExperienceType.Quad]: "\u{1F3CD}\uFE0F",
  [ExperienceType.TukTuk]: "\u{1F6FA}",
  [ExperienceType.Jeep]: "\u{1F6FB}",
  [ExperienceType.Boat]: "\u26F5",
  [ExperienceType.Dive]: "\u{1F93F}",
  [ExperienceType.Stay]: "\u{1F3E8}"
};
function getAllExperiences(providers) {
  return providers.flatMap((provider) => (provider.experiences ?? []).map((experience) => ({ experience, provider })));
}
function getExperiencePins(providers) {
  return getAllExperiences(providers).flatMap(({ experience, provider }) => experience.spots.map((spot) => ({ experience, provider, spot })));
}
function findExperience(providers, id) {
  return getAllExperiences(providers).find(({ experience }) => experience.id === id);
}
function experienceIcon(experience) {
  return experience.emoji ?? EXPERIENCE_ICONS[experience.type] ?? "\u{1F3F7}\uFE0F";
}
function experienceColor(provider) {
  return resolveProviderColor(provider);
}
function resolveExperienceDiscount(experience, provider) {
  return experience.discount ?? provider.discount;
}
function resolveExperienceBookUrl(experience, provider) {
  return experience.bookUrl ?? buildBookingUrl(provider);
}
function getExperiencesNearLocation(location, providers) {
  return getAllExperiences(providers).map((entry) => __spreadProps(__spreadValues({}, entry), { dist: nearestSpotKm(location, entry.experience) })).filter(({ experience, dist }) => experience.spots.some((s) => s.nearLocationIds?.includes(location.id)) || dist <= NEAR_LOCATION_KM).sort((a, b) => a.dist - b.dist).map(({ experience, provider }) => ({ experience, provider }));
}
function nearestSpotKm(location, experience) {
  return experience.spots.reduce((min, s) => Math.min(min, haversineKm(location.lat, location.lon, s.lat, s.lon)), Infinity);
}

export {
  haversineKm,
  haversineM,
  NEAR_LOCATION_KM,
  getProvidersNearLocation,
  isDiscountValid,
  buildBookingUrl,
  resolveProviderColor,
  getProviderCategoryLabel,
  getAllExperiences,
  getExperiencePins,
  findExperience,
  experienceIcon,
  experienceColor,
  resolveExperienceDiscount,
  resolveExperienceBookUrl,
  getExperiencesNearLocation
};
//# sourceMappingURL=chunk-K2AMJ56A.js.map
