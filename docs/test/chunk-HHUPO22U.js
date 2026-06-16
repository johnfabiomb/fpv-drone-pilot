// src/app/map/core/utils/level.utils.ts
var LEVELS = [
  {
    id: 0,
    name: "New",
    emoji: "\u2728",
    minXp: 0,
    minDays: 0,
    maxGroupMembers: null,
    description: "Welcome! Explore the map for your first 24 hours.",
    perk: "Levelling up unlocks after your first 24 hours"
  },
  {
    id: 1,
    name: "Explorer",
    emoji: "\u{1F9ED}",
    minXp: 0,
    minDays: 0,
    maxGroupMembers: 5,
    description: "You've just arrived on the island.",
    perk: "Full map access \u2014 create groups with up to 5 members"
  },
  {
    id: 2,
    name: "Wanderer",
    emoji: "\u{1F6B6}",
    minXp: 150,
    minDays: 5,
    maxGroupMembers: 10,
    description: "Venturing beyond the tourist trail.",
    perk: "Groups up to 10 members + hidden gem badge"
  },
  {
    id: 3,
    name: "Scout",
    emoji: "\u{1F52D}",
    minXp: 500,
    minDays: 14,
    maxGroupMembers: 15,
    description: "You've got a nose for hidden spots.",
    perk: "Groups up to 15 members + priority leader ranking"
  },
  {
    id: 4,
    name: "Navigator",
    emoji: "\u2693",
    minXp: 1500,
    minDays: 30,
    maxGroupMembers: 25,
    description: "You know the coastline by heart.",
    perk: "Groups up to 25 members + gold profile badge"
  },
  {
    id: 5,
    name: "Pioneer",
    emoji: "\u{1F525}",
    minXp: 4e3,
    minDays: 60,
    maxGroupMembers: 40,
    description: "Discovered Malta's best kept secrets.",
    perk: "Groups up to 40 members + exclusive fire badge"
  },
  {
    id: 6,
    name: "Legend",
    emoji: "\u{1F451}",
    minXp: 1e4,
    minDays: 120,
    maxGroupMembers: null,
    description: "A true islander. Malta runs in your veins.",
    perk: "Unlimited groups + permanent Legend status"
  }
];
var XP_ACTIONS = {
  location_viewed: 15,
  location_saved: 25,
  group_joined: 60,
  group_created: 80,
  group_completed: 50,
  message_sent: 2,
  session_active: 5,
  daily_active: 20,
  friend_referred: 150
};
function getLevelForXp(xp, daysSince = 0) {
  const progressionLevels = LEVELS.filter((l) => l.id > 0);
  let result = progressionLevels[0];
  for (const level of progressionLevels) {
    if (xp >= level.minXp && daysSince >= level.minDays)
      result = level;
  }
  return result;
}
function getNewLevel() {
  return LEVELS.find((l) => l.id === 0);
}
var NEW_LEVEL_DURATION_MS = 24 * 60 * 60 * 1e3;
function getNextLevel(currentId) {
  return LEVELS.find((l) => l.id === currentId + 1) ?? null;
}

export {
  LEVELS,
  XP_ACTIONS,
  getLevelForXp,
  getNewLevel,
  NEW_LEVEL_DURATION_MS,
  getNextLevel
};
//# sourceMappingURL=chunk-HHUPO22U.js.map
