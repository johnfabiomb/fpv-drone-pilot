import { Difficulty, Island, Location } from '@map/core/models';

export function toLocationSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ħ/g, 'h')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Strips Maltese-specific characters so users can search with a plain English
// keyboard. Għ→gh and Ħ→h must be replaced before NFD decomposition.
// NFD + combining-mark removal then handles Ċ→c, Ġ→g, Ż→z automatically.
// Applied to both the query AND the candidate title — originals are never changed.
export function normalizeForSearch(str: string): string {
  return str
    .toLowerCase()
    .replace(/għ/gi, 'gh')
    .replace(/ħ/gi, 'h')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export interface FilterOption {
  id: FilterId;
  label: string;
  emoji: string;
}

export interface FilterContext {
  dealLocationIds?: Set<number>;
}

export type FilterId = 'deals' | 'beach' | 'cave' | 'historical' | 'hidden' | 'easy' | 'hard' | 'gozo' | 'comino';

export const FILTER_OPTIONS: FilterOption[] = [
  { id: 'deals',      label: 'Deals',       emoji: '🏷️' },
  { id: 'hidden',     label: 'Hidden Gems', emoji: '💎' },
  { id: 'cave',       label: 'Caves',       emoji: '🪨' },
  { id: 'beach',      label: 'Beaches',     emoji: '🏖️' },
  { id: 'historical', label: 'Historical',  emoji: '🏛️' },
  { id: 'easy',       label: 'Easy',        emoji: '🚶' },
  { id: 'hard',       label: 'Hard',        emoji: '🥾' },
  { id: 'gozo',       label: 'Gozo',        emoji: '⛵' },
  { id: 'comino',     label: 'Comino',      emoji: '🏝️' },
];

export function matchesFilter(location: Location, filter: FilterId, ctx?: FilterContext): boolean {
  const tags = location.tags;
  switch (filter) {
    case 'deals':      return ctx?.dealLocationIds?.has(location.id) ?? false;
    case 'beach':      return tags.includes('beach') || tags.includes('bay');
    case 'cave':       return tags.includes('cave') || tags.includes('sea-cave');
    case 'historical': return tags.includes('historical') || tags.includes('religious')
                           || tags.includes('fortress') || tags.includes('fortification')
                           || tags.includes('cultural');
    case 'hidden':     return tags.includes('hidden');
    case 'easy':       return tags.includes('easy');
    case 'hard':       return tags.includes('hard');
    case 'gozo':       return tags.includes('gozo');
    case 'comino':     return tags.includes('comino');
  }
}

export function getIsland(location: Location): Island | null {
  if (location.tags.includes('gozo'))   return Island.Gozo;
  if (location.tags.includes('comino')) return Island.Comino;
  return null;
}

export function getIslandLabel(location: Location): string | null {
  const island = getIsland(location);
  if (island === Island.Gozo)   return 'Gozo';
  if (island === Island.Comino) return 'Comino';
  return null;
}

export function difficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case Difficulty.Easy:     return '#22c55e';
    case Difficulty.Hard:     return '#ef4444';
    case Difficulty.Moderate: return '#f59e0b';
  }
}

export interface LocationPublicStats {
  views: number;
  saves: number;
  shares: number;
}

function slugHash(slug: string, seed: number): number {
  let h = seed;
  for (let i = 0; i < slug.length; i++) {
    h = ((h * 31) + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Deterministic simulated public stats for a location slug. */
export function locationPublicStats(slug: string): LocationPublicStats {
  return {
    views:  slugHash(slug, 5381) % 2000 + 500,   // 500–2499
    saves:  slugHash(slug, 7919) % 270  + 30,     // 30–299
    shares: slugHash(slug, 3307) % 95   + 8,      // 8–102
  };
}

export function fmtStatCount(n: number): string {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : String(n);
}
