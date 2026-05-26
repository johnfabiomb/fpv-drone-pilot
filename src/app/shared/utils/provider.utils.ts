import { Provider, ProviderDiscount } from '../models';

export function isDiscountValid(discount: ProviderDiscount): boolean {
  if (!discount.validUntil) return true;
  return new Date() <= new Date(discount.validUntil + 'T23:59:59');
}

export function buildBookingUrl(provider: Provider): string | null {
  const cfg = provider.bookingConfig;
  if (!cfg) return provider.website ?? null;

  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + cfg.checkInOffsetDays);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + cfg.nights);

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  const params = new URLSearchParams({
    checkInDate: fmt(checkIn),
    checkOutDate: fmt(checkOut),
  });

  if (provider.discount?.coupon) params.set('promocode', provider.discount.coupon);

  return `${cfg.baseUrl}?${params}`;
}

const CATEGORY_COLORS: Record<string, string> = {
  'water-sports': '#0ea5e9',
  'tour':         '#8b5cf6',
  'hotel':        '#f59e0b',
  'restaurant':   '#ef4444',
  'experience':   '#10b981',
};

const CATEGORY_LABELS: Record<string, string> = {
  'water-sports': 'Water Sports',
  'tour':         'Boat Tour',
  'hotel':        'Hotel',
  'restaurant':   'Restaurant',
  'experience':   'Experience',
};

export function getProviderAccentColor(category: string): string {
  return CATEGORY_COLORS[category] ?? '#F4A922';
}

export function resolveProviderColor(provider: Provider): string {
  return provider?.color ?? getProviderAccentColor(provider?.category);
}

export function getProviderCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
