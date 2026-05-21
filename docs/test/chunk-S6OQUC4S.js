// src/app/shared/utils/location-filter.util.ts
function matchesFilter(location, filter) {
  const tags = location.tags;
  switch (filter) {
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
  matchesFilter,
  getIsland,
  getIslandLabel,
  difficultyColor
};
//# sourceMappingURL=chunk-S6OQUC4S.js.map
