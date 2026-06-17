// src/app/booking/core/interfaces/org.interface.ts
function servicePrice(pricing, hours) {
  const exact = pricing.tiers.find((t) => t.hours === hours);
  if (exact)
    return exact.price;
  const lower = pricing.tiers.filter((t) => t.hours <= hours).sort((a, b) => b.hours - a.hours)[0];
  if (!lower)
    return null;
  return lower.price + (hours - lower.hours) * (pricing.extra_hour_price ?? 0);
}

export {
  servicePrice
};
//# sourceMappingURL=chunk-DEXNZGWM.js.map
