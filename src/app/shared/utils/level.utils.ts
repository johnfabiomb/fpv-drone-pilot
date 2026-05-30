export interface LevelDefinition {
  id: number;
  name: string;
  emoji: string;
  minSaved: number;
  description: string;
  perk: string;
}

export const LEVELS: LevelDefinition[] = [
  {
    id: 0, name: 'New', emoji: '✨', minSaved: 0,
    description: 'Welcome! Explore the map for your first 24 hours.',
    perk: 'Levelling up unlocks after your first 24 hours',
  },
  {
    id: 1, name: 'Explorer', emoji: '🧭', minSaved: 0,
    description: "You've just arrived on the island.",
    perk: 'Full access to the map and all public spots',
  },
  {
    id: 2, name: 'Wanderer', emoji: '🚶', minSaved: 3,
    description: 'Venturing beyond the tourist trail.',
    perk: 'Unlock group hikes and Explore Together',
  },
  {
    id: 3, name: 'Scout', emoji: '🔭', minSaved: 8,
    description: "You've got a nose for hidden spots.",
    perk: 'Priority listing in group leader rankings',
  },
  {
    id: 4, name: 'Navigator', emoji: '⚓', minSaved: 20,
    description: 'You know the coastline by heart.',
    perk: 'Gold profile badge visible to all explorers',
  },
  {
    id: 5, name: 'Pioneer', emoji: '🔥', minSaved: 38,
    description: "Discovered Malta's best kept secrets.",
    perk: 'Exclusive fire badge on your profile',
  },
  {
    id: 6, name: 'Legend', emoji: '👑', minSaved: 58,
    description: 'A true islander. Malta runs in your veins.',
    perk: 'Permanent Legend status — the highest honour',
  },
];

export function getLevelForSaved(savedCount: number): LevelDefinition {
  // Level 0 ("New") is time-gated — skip it in save-count progression
  const progressionLevels = LEVELS.filter(l => l.id > 0);
  let result = progressionLevels[0];
  for (const level of progressionLevels) {
    if (savedCount >= level.minSaved) result = level;
  }
  return result;
}

export function getNewLevel(): LevelDefinition {
  return LEVELS.find(l => l.id === 0)!;
}

export const NEW_LEVEL_DURATION_MS = 24 * 60 * 60 * 1000;

export function getNextLevel(currentId: number): LevelDefinition | null {
  return LEVELS.find(l => l.id === currentId + 1) ?? null;
}
