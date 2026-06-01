// ── Difficulty ────────────────────────────────────────────────────────────────
export const Difficulty = { Easy: 'easy', Moderate: 'moderate', Hard: 'hard' } as const;
export type Difficulty = typeof Difficulty[keyof typeof Difficulty];

// ── Island ────────────────────────────────────────────────────────────────────
export const Island = { Malta: 'malta', Gozo: 'gozo', Comino: 'comino' } as const;
export type Island = typeof Island[keyof typeof Island];

// ── MapPointType ──────────────────────────────────────────────────────────────
export const MapPointType = { Destination: 'destination', Parking: 'parking', Waypoint: 'waypoint' } as const;
export type MapPointType = typeof MapPointType[keyof typeof MapPointType];

// ── GroupStatus ───────────────────────────────────────────────────────────────
export const GroupStatus = {
  Open:      'open',
  Full:      'full',
  Exploring: 'exploring',
  Cancelled: 'cancelled',
  Completed: 'completed',
  Archived:  'archived',
} as const;
export type GroupStatus = typeof GroupStatus[keyof typeof GroupStatus];

// ── GroupRole ─────────────────────────────────────────────────────────────────
export const GroupRole = { Leader: 'leader', Member: 'member' } as const;
export type GroupRole = typeof GroupRole[keyof typeof GroupRole];

// ── UserRole ──────────────────────────────────────────────────────────────────
export const UserRole = { Explorer: 'explorer', Admin: 'admin' } as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];
