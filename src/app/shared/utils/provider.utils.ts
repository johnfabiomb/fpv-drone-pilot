import { Provider } from '../models';

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
