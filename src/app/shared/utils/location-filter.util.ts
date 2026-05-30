import { Difficulty, Island, Location } from '../models';

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
  if (location.tags.includes('gozo'))   return 'gozo';
  if (location.tags.includes('comino')) return 'comino';
  return null;
}

export function getIslandLabel(location: Location): string | null {
  const island = getIsland(location);
  if (island === 'gozo')   return 'Gozo';
  if (island === 'comino') return 'Comino';
  return null;
}

export function difficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case 'easy':     return '#22c55e';
    case 'hard':     return '#ef4444';
    case 'moderate': return '#f59e0b';
  }
}
