// src/app/shared/utils/location-filter.util.ts
var FILTER_OPTIONS = [
  { id: "deals", label: "Deals", emoji: "\u{1F3F7}\uFE0F" },
  { id: "hidden", label: "Hidden Gems", emoji: "\u{1F48E}" },
  { id: "cave", label: "Caves", emoji: "\u{1FAA8}" },
  { id: "beach", label: "Beaches", emoji: "\u{1F3D6}\uFE0F" },
  { id: "historical", label: "Historical", emoji: "\u{1F3DB}\uFE0F" },
  { id: "easy", label: "Easy", emoji: "\u{1F6B6}" },
  { id: "hard", label: "Hard", emoji: "\u{1F97E}" },
  { id: "gozo", label: "Gozo", emoji: "\u26F5" },
  { id: "comino", label: "Comino", emoji: "\u{1F3DD}\uFE0F" }
];
function matchesFilter(location, filter, ctx) {
  const tags = location.tags;
  switch (filter) {
    case "deals":
      return ctx?.dealLocationIds?.has(location.id) ?? false;
    case "beach":
      return tags.includes("beach") || tags.includes("bay");
    case "cave":
      return tags.includes("cave") || tags.includes("sea-cave");
    case "historical":
      return tags.includes("historical") || tags.includes("religious") || tags.includes("fortress") || tags.includes("fortification") || tags.includes("cultural");
    case "hidden":
      return tags.includes("hidden");
    case "easy":
      return tags.includes("easy");
    case "hard":
      return tags.includes("hard");
    case "gozo":
      return tags.includes("gozo");
    case "comino":
      return tags.includes("comino");
  }
}
function getIsland(location) {
  if (location.tags.includes("gozo"))
    return "gozo";
  if (location.tags.includes("comino"))
    return "comino";
  return null;
}
function getIslandLabel(location) {
  const island = getIsland(location);
  if (island === "gozo")
    return "Gozo";
  if (island === "comino")
    return "Comino";
  return null;
}
function difficultyColor(difficulty) {
  switch (difficulty) {
    case "easy":
      return "#22c55e";
    case "hard":
      return "#ef4444";
    case "moderate":
      return "#f59e0b";
  }
}

export {
  FILTER_OPTIONS,
  matchesFilter,
  getIsland,
  getIslandLabel,
  difficultyColor
};
//# sourceMappingURL=chunk-WSUVHV4Q.js.map
