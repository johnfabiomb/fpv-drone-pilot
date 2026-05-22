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

export type FilterId = 'beach' | 'cave' | 'historical' | 'hidden' | 'easy' | 'hard' | 'gozo' | 'comino';

export function matchesFilter(location: Location, filter: FilterId): boolean {
  const tags = location.tags;
  switch (filter) {
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
