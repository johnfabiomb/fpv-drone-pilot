import "./chunk-GCGHXSHH.js";
import {
  locations
} from "./chunk-BDFMM2X7.js";
import {
  Difficulty,
  Island
} from "./chunk-YQQNS7T3.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-E53NQKQB.js";
import "./chunk-DNKJKTBS.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  TitleCasePipe,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4
} from "./chunk-P56CFEJA.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/map/core/services/route-builder.service.ts
var STOPS_PER_DAY = {
  relaxed: { easy: 3, moderate: 2, hard: 2 },
  balanced: { easy: 4, moderate: 3, hard: 2 },
  "full-explorer": { easy: 5, moderate: 4, hard: 3 }
};
var REASON_MAP = {
  hidden: "A hidden gem most tourists never find \u2014 locals keep this one quiet",
  beach: "A beautiful beach worth every minute \u2014 plan at least 2 hours here",
  cave: "Shelters an impressive cave formation that rewards the effort to reach it",
  "sea-cave": "A stunning sea cave \u2014 best explored by kayak or during calm mornings",
  viewpoint: "One of Malta's most cinematic viewpoints \u2014 cameras out",
  hiking: "A rewarding trail where the scenery earns its reputation",
  swimming: "Crystal-clear water with visibility that makes every swim memorable",
  snorkeling: "Rich marine life just below the surface \u2014 bring a mask",
  historical: "Layers of Maltese history you can actually feel underfoot",
  cultural: "Woven into the fabric of daily Maltese life",
  easy: "Accessible to everyone \u2014 a relaxed stop the whole group will enjoy",
  adventure: "Built for explorers who want the full, unfiltered Malta experience",
  gozo: "One of Gozo's standout spots \u2014 the ferry crossing is absolutely worth it",
  comino: "A rare gem on car-free Comino \u2014 unspoiled and unforgettable",
  sunset: "One of the finest sunset vantage points in the Maltese archipelago",
  photography: "A dream composition for photographers and drone pilots alike"
};
var THEME_TAG_MAP = {
  cave: "Cave & Coastline Day",
  "sea-cave": "Sea Cave Discovery",
  beach: "Beach & Bays",
  historical: "History & Heritage",
  cultural: "Culture & Architecture",
  hiking: "Trails & Views",
  hidden: "Hidden Malta",
  viewpoint: "Cinematic Viewpoints",
  sunset: "Golden Hour Spots",
  photography: "Photographer's Route",
  adventure: "Wild Malta",
  swimming: "Coast & Crystal Waters"
};
var THEME_TAG_ORDER = [
  "cave",
  "sea-cave",
  "beach",
  "historical",
  "cultural",
  "hiking",
  "hidden",
  "viewpoint",
  "sunset",
  "photography",
  "adventure",
  "swimming"
];
var RouteBuilderService = class _RouteBuilderService {
  getLocationById(id) {
    return locations.find((l) => l.id === id) ?? null;
  }
  buildPlan(input, anchorLocation) {
    const { days, preferences, difficulty, pace } = input;
    const stopsPerDay = STOPS_PER_DAY[pace][difficulty];
    const filteredPool = locations.filter((loc) => {
      if (anchorLocation && loc.id === anchorLocation.id)
        return false;
      if (difficulty === Difficulty.Easy)
        return loc.difficulty === Difficulty.Easy;
      if (difficulty === Difficulty.Moderate)
        return loc.difficulty === Difficulty.Easy || loc.difficulty === Difficulty.Moderate;
      return true;
    });
    const pool = filteredPool.map((loc) => {
      let score;
      if (preferences.length === 0) {
        score = (loc.rating ?? 0) * 10;
      } else {
        const matchingTags = preferences.filter((p) => (loc.tags || []).includes(p));
        score = matchingTags.length * 20 + (loc.rating ?? 0) * 2;
      }
      return __spreadProps(__spreadValues({}, loc), { _score: score });
    });
    pool.sort((a, b) => b._score - a._score);
    const days_result = [];
    const usedIds = /* @__PURE__ */ new Set();
    let cominoUsed = false;
    if (anchorLocation)
      usedIds.add(anchorLocation.id);
    for (let d = 0; d < days; d++) {
      let dayAnchor;
      if (d === 0 && anchorLocation) {
        dayAnchor = anchorLocation;
      } else {
        const remaining = pool.filter((loc) => {
          if (usedIds.has(loc.id))
            return false;
          if (cominoUsed && this.getIsland(loc) === Island.Comino)
            return false;
          return true;
        });
        if (remaining.length === 0)
          break;
        dayAnchor = remaining[0];
        usedIds.add(dayAnchor.id);
      }
      const anchorIsland = this.getIsland(dayAnchor);
      const afterAnchor = pool.filter((loc) => !usedIds.has(loc.id) && this.getIsland(loc) === anchorIsland);
      const withDistance = afterAnchor.map((loc) => ({
        loc,
        dist: this.haversine(dayAnchor.lat, dayAnchor.lon, loc.lat, loc.lon)
      }));
      withDistance.sort((a, b) => a.dist - b.dist);
      const dayLocs = [dayAnchor];
      const needed = stopsPerDay - 1;
      for (let i = 0; i < Math.min(needed, withDistance.length); i++) {
        dayLocs.push(withDistance[i].loc);
        usedIds.add(withDistance[i].loc.id);
      }
      const ordered = this.nearestNeighborOrder(dayLocs);
      const stops = ordered.map((loc) => ({
        location: loc,
        reason: this.getReason(loc, preferences),
        estimatedTime: this.getEstimatedTime(loc),
        safetyNote: this.getSafetyNote(loc)
      }));
      days_result.push({
        day: d + 1,
        label: `Day ${d + 1}`,
        theme: this.getDayTheme(ordered),
        stops
      });
      if (anchorIsland === Island.Comino) {
        cominoUsed = true;
        pool.forEach((loc) => {
          if (!usedIds.has(loc.id) && this.getIsland(loc) === Island.Comino)
            usedIds.add(loc.id);
        });
      }
    }
    const maltaDays = days_result.filter((d) => this.getDayIsland(d) === Island.Malta);
    const gozoDays = days_result.filter((d) => this.getDayIsland(d) === Island.Gozo);
    const cominoDays = days_result.filter((d) => this.getDayIsland(d) === Island.Comino);
    const grouped = anchorLocation && this.getIsland(anchorLocation) === Island.Gozo ? [...gozoDays, ...maltaDays, ...cominoDays] : [...maltaDays, ...cominoDays, ...gozoDays];
    return grouped.map((day, i) => __spreadProps(__spreadValues({}, day), { day: i + 1, label: `Day ${i + 1}` }));
  }
  getDayIsland(day) {
    return day.stops.length > 0 ? this.getIsland(day.stops[0].location) : Island.Malta;
  }
  getIsland(loc) {
    const tags = loc.tags || [];
    if (tags.includes("comino"))
      return Island.Comino;
    if (tags.includes("gozo"))
      return Island.Gozo;
    return Island.Malta;
  }
  haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  nearestNeighborOrder(locs) {
    if (locs.length <= 1)
      return locs;
    const result = [locs[0]];
    const remaining = locs.slice(1);
    while (remaining.length > 0) {
      const last = result[result.length - 1];
      let minDist = Infinity;
      let minIdx = 0;
      for (let i = 0; i < remaining.length; i++) {
        const d = this.haversine(last.lat, last.lon, remaining[i].lat, remaining[i].lon);
        if (d < minDist) {
          minDist = d;
          minIdx = i;
        }
      }
      result.push(remaining[minIdx]);
      remaining.splice(minIdx, 1);
    }
    return result;
  }
  getEstimatedTime(loc) {
    const tags = loc.tags || [];
    let minutes;
    if (tags.includes("city")) {
      minutes = 180;
    } else if (tags.includes("fortress")) {
      minutes = 120;
    } else if (tags.includes("urban-walk") && (tags.includes("historical") || tags.includes("cultural"))) {
      minutes = 120;
    } else if (tags.includes("hiking") || tags.includes("trail")) {
      minutes = loc.difficulty === Difficulty.Hard ? 180 : loc.difficulty === Difficulty.Moderate ? 120 : 90;
    } else if (tags.includes("beach")) {
      minutes = loc.difficulty === Difficulty.Hard ? 150 : 120;
    } else if (tags.includes("boat-trip")) {
      minutes = 75;
    } else if (tags.includes("swimming") || tags.includes("snorkeling") || tags.includes("diving")) {
      minutes = 90;
    } else if (tags.includes("fortification") && (tags.includes("historical") || tags.includes("cultural"))) {
      minutes = 75;
    } else if (tags.includes("historical") || tags.includes("cultural")) {
      if (tags.includes("tower") || tags.includes("church") || tags.includes("religious") || tags.includes("bastion")) {
        minutes = 30;
      } else {
        minutes = 60;
      }
    } else if (tags.includes("cave") || tags.includes("sea-cave")) {
      minutes = 60;
    } else if (tags.includes("coastal-walk") || tags.includes("scenic-walk")) {
      minutes = 45;
    } else if (tags.includes("garden") || tags.includes("park")) {
      minutes = 45;
    } else if (tags.includes("viewpoint") || tags.includes("sunset") || tags.includes("rock-formation") || tags.includes("natural-arch") || tags.includes("landscape") || tags.includes("landmark")) {
      minutes = 30;
    } else {
      minutes = loc.difficulty === Difficulty.Easy ? 45 : loc.difficulty === Difficulty.Moderate ? 75 : 120;
    }
    if ((tags.includes("swimming") || tags.includes("snorkeling")) && !tags.includes("boat-trip") && minutes < 90) {
      minutes = 90;
    }
    if ((tags.includes("cave") || tags.includes("sea-cave")) && minutes < 60) {
      minutes += 20;
    }
    if (tags.includes("photography") && minutes < 45) {
      minutes += 15;
    }
    if (minutes < 60)
      return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0)
      return `${hours}h`;
    return `${hours}h ${mins}min`;
  }
  getSafetyNote(loc) {
    const tags = loc.tags || [];
    if (tags.includes("comino")) {
      return "Day-trip island \u2014 no hotels. Pre-book your free time slot at blcomino.com before travelling.";
    }
    if (tags.includes("cliff-jumping")) {
      return "Only jump from known safe spots \u2014 assess currents and depth every time.";
    }
    if (tags.includes("diving")) {
      return "Use a certified local dive guide \u2014 some Malta sites have strong underwater currents.";
    }
    if (loc.difficulty === Difficulty.Hard && (tags.includes("hiking") || tags.includes("trail") || tags.includes("cliffs"))) {
      return "Unmarked rugged terrain \u2014 bring water, sturdy footwear and an offline map.";
    }
    if (tags.includes("boat-trip")) {
      return "Boat trips cancel in rough sea \u2014 confirm on the morning, especially Oct\u2013Mar.";
    }
    if (tags.includes("cave") || tags.includes("sea-cave")) {
      return "Watch for waves and slippery rocks at cave entrances \u2014 check conditions before entering.";
    }
    if (tags.includes("swimming") || tags.includes("snorkeling")) {
      return "Check sea conditions before entering \u2014 follow any posted flags or local advice.";
    }
    if (loc.difficulty === Difficulty.Hard) {
      return "Challenging terrain \u2014 bring plenty of water and sturdy footwear.";
    }
    if (tags.includes("hidden") && loc.difficulty !== "easy") {
      return "Off the beaten path \u2014 download an offline map before heading out.";
    }
    return null;
  }
  getReason(loc, preferences) {
    const tags = loc.tags || [];
    const checkList = preferences.length > 0 ? preferences : Object.keys(REASON_MAP);
    for (const pref of checkList) {
      if (tags.includes(pref) && REASON_MAP[pref]) {
        return REASON_MAP[pref];
      }
    }
    if ((loc.rating ?? 0) >= 4.5)
      return "Highly rated \u2014 not to be missed";
    return "A notable stop that adds depth to your route";
  }
  getDayTheme(locs) {
    const allTags = locs.flatMap((loc) => loc.tags || []);
    if (allTags.includes("gozo"))
      return "Explore Gozo";
    if (allTags.includes("comino"))
      return "Comino Adventure";
    const counts = {};
    for (const tag of allTags) {
      if (THEME_TAG_ORDER.includes(tag)) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    }
    let bestTag = "";
    let bestCount = 0;
    for (const tag of THEME_TAG_ORDER) {
      if ((counts[tag] || 0) > bestCount) {
        bestCount = counts[tag] || 0;
        bestTag = tag;
      }
    }
    return bestTag ? THEME_TAG_MAP[bestTag] || "Malta Explorer" : "Malta Explorer";
  }
  static {
    this.\u0275fac = function RouteBuilderService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RouteBuilderService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RouteBuilderService, factory: _RouteBuilderService.\u0275fac, providedIn: "root" });
  }
};

// src/app/map/features/route-builder/route-builder.component.ts
function RouteBuilderComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "My Plans");
    \u0275\u0275elementContainerEnd();
  }
}
function RouteBuilderComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "Build My Route");
    \u0275\u0275elementContainerEnd();
  }
}
function RouteBuilderComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "Your Route");
    \u0275\u0275elementContainerEnd();
  }
}
function RouteBuilderComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "div", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r0.progressWidth);
  }
}
function RouteBuilderComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "img", 15);
    \u0275\u0275elementStart(2, "div", 16)(3, "div", 17);
    \u0275\u0275text(4, "\u{1F4CD} Starting from");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 20);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_10_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearAnchor());
    });
    \u0275\u0275text(10, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.anchorLocation.img, \u0275\u0275sanitizeUrl)("alt", ctx_r0.anchorLocation.title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.anchorLocation.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.anchorTagLine());
  }
}
function RouteBuilderComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27);
    \u0275\u0275text(2, "\u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28);
    \u0275\u0275text(4, "No routes yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 29);
    \u0275\u0275text(6, "Build your first Malta itinerary below");
    \u0275\u0275elementEnd()();
  }
}
function RouteBuilderComponent_div_11_div_2_div_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \xB7 ", plan_r5.inputs.preferences.length, " interest", plan_r5.inputs.preferences.length === 1 ? "" : "s", "");
  }
}
function RouteBuilderComponent_div_11_div_2_div_1_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "span", 44);
    \u0275\u0275text(2, "Delete this route?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 45);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_11_div_2_div_1_div_18_Template_button_click_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.cancelDelete($event));
    });
    \u0275\u0275text(4, "Keep");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 46);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_11_div_2_div_1_div_18_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const plan_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.confirmDelete(plan_r5.id, $event));
    });
    \u0275\u0275text(6, "Delete");
    \u0275\u0275elementEnd()();
  }
}
function RouteBuilderComponent_div_11_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_11_div_2_div_1_Template_div_click_0_listener() {
      const plan_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openPlan(plan_r5));
    });
    \u0275\u0275elementStart(1, "div", 33)(2, "button", 34);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_11_div_2_div_1_Template_button_click_2_listener($event) {
      const plan_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggleFavorite(plan_r5.id, $event));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 35)(5, "div", 36);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 37);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "titlecase");
    \u0275\u0275template(10, RouteBuilderComponent_div_11_div_2_div_1_span_10_Template, 2, 2, "span", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 38);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 39)(14, "button", 40);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_11_div_2_div_1_Template_button_click_14_listener($event) {
      const plan_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.requestDelete(plan_r5.id, $event));
    });
    \u0275\u0275text(15, "\xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 41);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_11_div_2_div_1_Template_button_click_16_listener() {
      const plan_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openPlan(plan_r5));
    });
    \u0275\u0275text(17, "View \u2192");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(18, RouteBuilderComponent_div_11_div_2_div_1_div_18_Template, 7, 0, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("confirming", ctx_r0.pendingDeleteId === plan_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", plan_r5.isFavorite);
    \u0275\u0275property("title", plan_r5.isFavorite ? "Remove favourite" : "Mark as favourite");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(plan_r5.isFavorite ? "\u2B50" : "\u2606");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(plan_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4(" ", plan_r5.inputs.days, " ", plan_r5.inputs.days === 1 ? "day" : "days", " \xB7 ", \u0275\u0275pipeBind1(9, 14, plan_r5.inputs.difficulty), " \xB7 ", ctx_r0.formatPace(plan_r5.inputs.pace), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", plan_r5.inputs.preferences.length > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatSavedDate(plan_r5.savedAt));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r0.pendingDeleteId === plan_r5.id);
  }
}
function RouteBuilderComponent_div_11_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275template(1, RouteBuilderComponent_div_11_div_2_div_1_Template, 19, 16, "div", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.sortedPlans);
  }
}
function RouteBuilderComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275template(1, RouteBuilderComponent_div_11_div_1_Template, 7, 0, "div", 22)(2, RouteBuilderComponent_div_11_div_2_Template, 2, 1, "div", 23);
    \u0275\u0275elementStart(3, "div", 24)(4, "button", 25);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_11_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.createNew());
    });
    \u0275\u0275text(5, "+ Create New Route");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.savedPlans.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.savedPlans.length > 0);
  }
}
function RouteBuilderComponent_div_12_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_12_div_6_Template_div_click_0_listener() {
      const opt_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectedDays = opt_r8.value);
    });
    \u0275\u0275elementStart(1, "div", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r0.selectedDays === opt_r8.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r8.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r8.sublabel);
  }
}
function RouteBuilderComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48);
    \u0275\u0275text(2, "How many days are you exploring Malta?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49);
    \u0275\u0275text(4, "Choose the duration of your trip");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 50);
    \u0275\u0275template(6, RouteBuilderComponent_div_12_div_6_Template, 5, 4, "div", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r0.dayOptions);
  }
}
function RouteBuilderComponent_div_13_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_13_div_6_Template_div_click_0_listener() {
      const opt_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePreference(opt_r10.value));
    });
    \u0275\u0275elementStart(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r10 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r0.isPreferenceSelected(opt_r10.value));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r10.emoji);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r10.label);
  }
}
function RouteBuilderComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48);
    \u0275\u0275text(2, "What interests you most?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49);
    \u0275\u0275text(4, "Select all that apply \u2014 or skip to explore everything");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 55);
    \u0275\u0275template(6, RouteBuilderComponent_div_13_div_6_Template, 5, 4, "div", 56);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r0.preferenceOptions);
  }
}
function RouteBuilderComponent_div_14_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_14_div_6_Template_div_click_0_listener() {
      const opt_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectedDifficulty = opt_r12.value);
    });
    \u0275\u0275elementStart(1, "div", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 61)(4, "div", 53);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 54);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const opt_r12 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r0.selectedDifficulty === opt_r12.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r12.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(opt_r12.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r12.sublabel);
  }
}
function RouteBuilderComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48);
    \u0275\u0275text(2, "What's your fitness level?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49);
    \u0275\u0275text(4, "We'll filter locations to match your comfort zone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 50);
    \u0275\u0275template(6, RouteBuilderComponent_div_14_div_6_Template, 8, 5, "div", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r0.difficultyOptions);
  }
}
function RouteBuilderComponent_div_15_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_15_div_6_Template_div_click_0_listener() {
      const opt_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectedPace = opt_r14.value);
    });
    \u0275\u0275elementStart(1, "div", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 61)(4, "div", 53);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 54);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const opt_r14 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r0.selectedPace === opt_r14.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r14.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(opt_r14.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r14.sublabel);
  }
}
function RouteBuilderComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48);
    \u0275\u0275text(2, "How do you like to explore?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49);
    \u0275\u0275text(4, "This sets how many stops you get per day");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 50);
    \u0275\u0275template(6, RouteBuilderComponent_div_15_div_6_Template, 8, 5, "div", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r0.paceOptions);
  }
}
function RouteBuilderComponent_div_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275element(1, "div", 66);
    \u0275\u0275elementStart(2, "div", 67);
    \u0275\u0275text(3, "Building your route...");
    \u0275\u0275elementEnd()();
  }
}
function RouteBuilderComponent_div_16_div_2_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \xB7 ", ctx_r0.selectedPreferences.length, " interest", ctx_r0.selectedPreferences.length === 1 ? "" : "s", "");
  }
}
function RouteBuilderComponent_div_16_div_2_div_11_div_7_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275text(1, "\u{1F4CD} Your starting point");
    \u0275\u0275elementEnd();
  }
}
function RouteBuilderComponent_div_16_div_2_div_11_div_7_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "span", 94);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stop_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", stop_r17.safetyNote, " ");
  }
}
function RouteBuilderComponent_div_16_div_2_div_11_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275element(1, "img", 84);
    \u0275\u0275elementStart(2, "div", 85)(3, "div", 86);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, RouteBuilderComponent_div_16_div_2_div_11_div_7_div_5_Template, 2, 0, "div", 87);
    \u0275\u0275elementStart(6, "div", 88);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 89);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, RouteBuilderComponent_div_16_div_2_div_11_div_7_div_10_Template, 4, 1, "div", 90);
    \u0275\u0275elementStart(11, "button", 91);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_16_div_2_div_11_div_7_Template_button_click_11_listener() {
      const stop_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.openOnMap(stop_r17.location));
    });
    \u0275\u0275text(12, "View on Map \u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const stop_r17 = ctx.$implicit;
    const last_r18 = ctx.last;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("stop--last", last_r18);
    \u0275\u0275advance();
    \u0275\u0275property("src", stop_r17.location.img, \u0275\u0275sanitizeUrl)("alt", stop_r17.location.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stop_r17.location.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.anchorLocation && stop_r17.location.id === ctx_r0.anchorLocation.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u23F1 ", stop_r17.estimatedTime, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stop_r17.reason);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", stop_r17.safetyNote);
  }
}
function RouteBuilderComponent_div_16_div_2_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77)(1, "div", 78)(2, "span", 79);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 80);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 81);
    \u0275\u0275template(7, RouteBuilderComponent_div_16_div_2_div_11_div_7_Template, 13, 9, "div", 82);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const day_r19 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(day_r19.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(day_r19.theme);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", day_r19.stops);
  }
}
function RouteBuilderComponent_div_16_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "div", 69);
    \u0275\u0275text(2, "\u2713 Route saved to My Plans");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 70)(4, "div", 71);
    \u0275\u0275text(5, "Your Malta Route");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 72);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "titlecase");
    \u0275\u0275pipe(9, "titlecase");
    \u0275\u0275template(10, RouteBuilderComponent_div_16_div_2_span_10_Template, 2, 2, "span", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, RouteBuilderComponent_div_16_div_2_div_11_Template, 8, 3, "div", 73);
    \u0275\u0275elementStart(12, "div", 74)(13, "button", 75);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_16_div_2_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.prev());
    });
    \u0275\u0275text(14, "My Plans");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 76);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_16_div_2_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToMap());
    });
    \u0275\u0275text(16, "Back to Map \u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate4(" ", ctx_r0.selectedDays, " ", ctx_r0.selectedDays === 1 ? "day" : "days", " \xB7 ", \u0275\u0275pipeBind1(8, 6, ctx_r0.selectedDifficulty), " \xB7 ", ctx_r0.selectedPace === "full-explorer" ? "Full Explorer" : \u0275\u0275pipeBind1(9, 8, ctx_r0.selectedPace), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.selectedPreferences.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.itinerary);
  }
}
function RouteBuilderComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275template(1, RouteBuilderComponent_div_16_div_1_Template, 4, 0, "div", 63)(2, RouteBuilderComponent_div_16_div_2_Template, 17, 10, "div", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loading);
  }
}
function RouteBuilderComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 95)(1, "button", 75);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_17_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.prev());
    });
    \u0275\u0275text(2, "Back");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 76);
    \u0275\u0275listener("click", function RouteBuilderComponent_div_17_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.next());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.step === 4 ? "Build My Route \u{1F5FA}\uFE0F" : "Continue \u2192", " ");
  }
}
var STORAGE_KEY = "malta_plans_v1";
var RouteBuilderComponent = class _RouteBuilderComponent {
  constructor() {
    this.view = "list";
    this.step = 1;
    this.selectedDays = 2;
    this.selectedPreferences = [];
    this.selectedDifficulty = "moderate";
    this.selectedPace = "balanced";
    this.itinerary = [];
    this.loading = false;
    this.savedPlans = [];
    this.currentPlanId = null;
    this.pendingDeleteId = null;
    this.anchorLocation = null;
    this.dayOptions = [
      { value: 1, label: "1 Day", sublabel: "Quick escape" },
      { value: 2, label: "2 Days", sublabel: "Weekend trip" },
      { value: 3, label: "3 Days", sublabel: "Short break" },
      { value: 7, label: "1 Week", sublabel: "Full explorer" }
    ];
    this.preferenceOptions = [
      { value: "hidden", label: "Hidden Gems", emoji: "\u{1F48E}" },
      { value: "beach", label: "Beaches", emoji: "\u{1F3D6}\uFE0F" },
      { value: "cave", label: "Caves", emoji: "\u{1FAA8}" },
      { value: "sea-cave", label: "Sea Caves", emoji: "\u{1F30A}" },
      { value: "viewpoint", label: "Viewpoints", emoji: "\u{1F52D}" },
      { value: "hiking", label: "Hiking", emoji: "\u{1F97E}" },
      { value: "swimming", label: "Swimming", emoji: "\u{1F3CA}" },
      { value: "snorkeling", label: "Snorkeling", emoji: "\u{1F93F}" },
      { value: "historical", label: "History", emoji: "\u{1F3DB}\uFE0F" },
      { value: "cultural", label: "Culture", emoji: "\u{1F3AD}" },
      { value: "easy", label: "Easy Access", emoji: "\u{1F6B6}" },
      { value: "adventure", label: "Adventure", emoji: "\u26A1" },
      { value: "gozo", label: "Gozo", emoji: "\u26F5" },
      { value: "comino", label: "Comino", emoji: "\u{1F33F}" },
      { value: "sunset", label: "Sunset", emoji: "\u{1F305}" },
      { value: "photography", label: "Photography", emoji: "\u{1F4F8}" }
    ];
    this.difficultyOptions = [
      { value: "easy", label: "Easy", sublabel: "Accessible to everyone", icon: "\u{1F6B6}" },
      { value: "moderate", label: "Moderate", sublabel: "Some walking required", icon: "\u{1F97E}" },
      { value: "hard", label: "Hard", sublabel: "Challenging terrain", icon: "\u26F0\uFE0F" }
    ];
    this.paceOptions = [
      { value: "relaxed", label: "Relaxed", sublabel: "Fewer stops, more time per place", icon: "\u{1F60C}" },
      { value: "balanced", label: "Balanced", sublabel: "The perfect mix", icon: "\u2696\uFE0F" },
      { value: "full-explorer", label: "Full Explorer", sublabel: "See as much as possible", icon: "\u{1F5FA}\uFE0F" }
    ];
    this.router = inject(Router);
    this.activatedRoute = inject(ActivatedRoute);
    this.routeBuilderService = inject(RouteBuilderService);
  }
  ngOnInit() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw)
        this.savedPlans = JSON.parse(raw);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    const fromId = this.activatedRoute.snapshot.queryParamMap.get("from");
    if (fromId !== null) {
      const loc = this.routeBuilderService.getLocationById(Number(fromId));
      if (loc)
        this.anchorLocation = loc;
    }
    if (this.savedPlans.length === 0 || this.anchorLocation) {
      this.view = "wizard";
    }
  }
  get sortedPlans() {
    return [...this.savedPlans].sort((a, b) => {
      if (a.isFavorite !== b.isFavorite)
        return a.isFavorite ? -1 : 1;
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    });
  }
  clearAnchor() {
    this.anchorLocation = null;
  }
  anchorTagLine() {
    if (!this.anchorLocation)
      return "";
    const tags = (this.anchorLocation.tags || []).filter((t) => !["easy", "moderate", "hard"].includes(t)).slice(0, 2).map((t) => t.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "));
    return [this.anchorLocation.difficulty.charAt(0).toUpperCase() + this.anchorLocation.difficulty.slice(1), ...tags].join(" \xB7 ");
  }
  openPlan(plan) {
    if (this.pendingDeleteId === plan.id) {
      this.pendingDeleteId = null;
      return;
    }
    this.anchorLocation = null;
    this.itinerary = plan.itinerary;
    this.selectedDays = plan.inputs.days;
    this.selectedPreferences = plan.inputs.preferences;
    this.selectedDifficulty = plan.inputs.difficulty;
    this.selectedPace = plan.inputs.pace;
    this.currentPlanId = plan.id;
    this.view = "result";
  }
  requestDelete(id, event) {
    event.stopPropagation();
    this.pendingDeleteId = id;
  }
  cancelDelete(event) {
    event.stopPropagation();
    this.pendingDeleteId = null;
  }
  confirmDelete(id, event) {
    event.stopPropagation();
    this.savedPlans = this.savedPlans.filter((p) => p.id !== id);
    this.persistPlans();
    this.pendingDeleteId = null;
  }
  toggleFavorite(id, event) {
    event.stopPropagation();
    const plan = this.savedPlans.find((p) => p.id === id);
    if (plan) {
      plan.isFavorite = !plan.isFavorite;
      this.persistPlans();
    }
  }
  createNew() {
    this.step = 1;
    this.selectedDays = 2;
    this.selectedPreferences = [];
    this.selectedDifficulty = "moderate";
    this.selectedPace = "balanced";
    this.itinerary = [];
    this.loading = false;
    this.currentPlanId = null;
    this.anchorLocation = null;
    this.view = "wizard";
  }
  togglePreference(value) {
    const idx = this.selectedPreferences.indexOf(value);
    if (idx >= 0) {
      this.selectedPreferences.splice(idx, 1);
    } else {
      this.selectedPreferences.push(value);
    }
  }
  isPreferenceSelected(value) {
    return this.selectedPreferences.includes(value);
  }
  next() {
    if (this.step < 4) {
      this.step++;
    } else if (this.step === 4) {
      this.generate();
    }
  }
  prev() {
    if (this.view === "list") {
      this.router.navigate(["/malta"]);
    } else if (this.view === "wizard") {
      if (this.step > 1) {
        this.step--;
      } else {
        if (this.savedPlans.length > 0) {
          this.view = "list";
        } else {
          this.router.navigate(["/malta"]);
        }
      }
    } else if (this.view === "result") {
      this.anchorLocation = null;
      this.view = "list";
    }
  }
  generate() {
    this.loading = true;
    this.view = "result";
    setTimeout(() => {
      const input = {
        days: this.selectedDays,
        preferences: this.selectedPreferences,
        difficulty: this.selectedDifficulty,
        pace: this.selectedPace
      };
      this.itinerary = this.routeBuilderService.buildPlan(input, this.anchorLocation || void 0);
      const entry = {
        id: Date.now().toString(),
        name: this.generatePlanName(input),
        itinerary: this.itinerary,
        inputs: input,
        savedAt: (/* @__PURE__ */ new Date()).toISOString(),
        isFavorite: false
      };
      this.savedPlans.push(entry);
      this.currentPlanId = entry.id;
      this.persistPlans();
      this.loading = false;
    }, 600);
  }
  generatePlanName(input) {
    const dayStr = input.days === 1 ? "1-Day" : `${input.days}-Day`;
    const diff = input.difficulty.charAt(0).toUpperCase() + input.difficulty.slice(1);
    const pace = this.formatPace(input.pace);
    return `${dayStr} ${diff} \xB7 ${pace}`;
  }
  persistPlans() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.savedPlans));
  }
  formatSavedDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  }
  formatPace(pace) {
    return pace === "full-explorer" ? "Full Explorer" : pace.charAt(0).toUpperCase() + pace.slice(1);
  }
  openOnMap(location) {
    this.router.navigate(["/malta"], {
      queryParams: { title: encodeURIComponent(location.title.replace(" ", "-")) }
    });
  }
  goToMap() {
    this.router.navigate(["/malta"]);
  }
  get progressWidth() {
    const pct = Math.min(this.step, 4) / 4 * 100;
    return `${pct}%`;
  }
  static {
    this.\u0275fac = function RouteBuilderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RouteBuilderComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RouteBuilderComponent, selectors: [["app-route-builder"]], decls: 18, vars: 12, consts: [[1, "planner"], [1, "planner__header"], [1, "back-btn", 3, "click"], [1, "title"], [4, "ngIf"], [1, "spacer"], ["class", "progress-bar", 4, "ngIf"], ["class", "anchor-banner", 4, "ngIf"], ["class", "plans-view", 4, "ngIf"], ["class", "step", 4, "ngIf"], ["class", "step step--result", 4, "ngIf"], ["class", "planner__nav", 4, "ngIf"], [1, "progress-bar"], [1, "progress-fill"], [1, "anchor-banner"], ["onerror", "this.src='/assets/images/places/1.webp'", 1, "anchor-banner__img", 3, "src", "alt"], [1, "anchor-banner__info"], [1, "anchor-banner__label"], [1, "anchor-banner__name"], [1, "anchor-banner__meta"], ["title", "Remove anchor", 1, "anchor-banner__remove", 3, "click"], [1, "plans-view"], ["class", "plans-empty", 4, "ngIf"], ["class", "plans-list", 4, "ngIf"], [1, "plans-footer"], [1, "btn", "btn--primary", "plans-create-btn", 3, "click"], [1, "plans-empty"], [1, "plans-empty__icon"], [1, "plans-empty__text"], [1, "plans-empty__sub"], [1, "plans-list"], ["class", "plan-card", 3, "confirming", "click", 4, "ngFor", "ngForOf"], [1, "plan-card", 3, "click"], [1, "plan-card__main"], [1, "plan-card__fav", 3, "click", "title"], [1, "plan-card__info"], [1, "plan-card__name"], [1, "plan-card__meta"], [1, "plan-card__date"], [1, "plan-card__actions"], ["title", "Delete route", 1, "plan-card__close-btn", "mb-4", 3, "click"], [1, "plan-card__view-btn", 3, "click"], ["class", "plan-card__confirm", 4, "ngIf"], [1, "plan-card__confirm"], [1, "plan-card__confirm-text"], [1, "plan-card__confirm-keep", 3, "click"], [1, "plan-card__confirm-del", 3, "click"], [1, "step"], [1, "step__title"], [1, "step__subtitle"], [1, "options-list"], ["class", "option-card", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "option-card", 3, "click"], [1, "option-card__label"], [1, "option-card__sublabel"], [1, "pref-grid"], ["class", "pref-chip", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "pref-chip", 3, "click"], [1, "pref-chip__emoji"], [1, "pref-chip__label"], [1, "option-card__icon"], [1, "option-card__content"], [1, "step", "step--result"], ["class", "loading-state", 4, "ngIf"], ["class", "result", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "loading-text"], [1, "result"], [1, "saved-indicator"], [1, "result__header"], [1, "result__title"], [1, "result__summary"], ["class", "day-card", 4, "ngFor", "ngForOf"], [1, "result__actions"], [1, "btn", "btn--secondary", 3, "click"], [1, "btn", "btn--primary", 3, "click"], [1, "day-card"], [1, "day-card__header"], [1, "day-card__day"], [1, "day-card__theme"], [1, "day-card__stops"], ["class", "stop", 3, "stop--last", 4, "ngFor", "ngForOf"], [1, "stop"], ["onerror", "this.src='/assets/images/places/1.webp'", 1, "stop__thumb", 3, "src", "alt"], [1, "stop__details"], [1, "stop__name"], ["class", "stop__anchor-badge", 4, "ngIf"], [1, "stop__time"], [1, "stop__reason"], ["class", "stop__safety", 4, "ngIf"], [1, "stop__map-btn", 3, "click"], [1, "stop__anchor-badge"], [1, "stop__safety"], [1, "stop__safety-icon"], [1, "planner__nav"]], template: function RouteBuilderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
        \u0275\u0275listener("click", function RouteBuilderComponent_Template_button_click_2_listener() {
          return ctx.prev();
        });
        \u0275\u0275text(3, "\u2190 Back");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 3);
        \u0275\u0275template(5, RouteBuilderComponent_ng_container_5_Template, 2, 0, "ng-container", 4)(6, RouteBuilderComponent_ng_container_6_Template, 2, 0, "ng-container", 4)(7, RouteBuilderComponent_ng_container_7_Template, 2, 0, "ng-container", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275element(8, "div", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, RouteBuilderComponent_div_9_Template, 2, 2, "div", 6)(10, RouteBuilderComponent_div_10_Template, 11, 4, "div", 7)(11, RouteBuilderComponent_div_11_Template, 6, 2, "div", 8)(12, RouteBuilderComponent_div_12_Template, 7, 1, "div", 9)(13, RouteBuilderComponent_div_13_Template, 7, 1, "div", 9)(14, RouteBuilderComponent_div_14_Template, 7, 1, "div", 9)(15, RouteBuilderComponent_div_15_Template, 7, 1, "div", 9)(16, RouteBuilderComponent_div_16_Template, 3, 2, "div", 10)(17, RouteBuilderComponent_div_17_Template, 5, 1, "div", 11);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.view === "list");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "wizard");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "result");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.view === "wizard");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "wizard" && ctx.anchorLocation);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "list");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "wizard" && ctx.step === 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "wizard" && ctx.step === 2);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "wizard" && ctx.step === 3);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "wizard" && ctx.step === 4);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "result");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.view === "wizard");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, TitleCasePipe], styles: ['\n\n.planner[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background: var(--color-bg);\n  display: flex;\n  flex-direction: column;\n  max-width: 600px;\n  margin: 0 auto;\n  font-family: "Roboto", sans-serif;\n  padding-bottom: 80px;\n}\n.planner__header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  background: var(--color-bg);\n  border-bottom: 1px solid var(--color-border);\n  padding: 14px 16px;\n  display: flex;\n  align-items: center;\n}\n.planner__header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.planner__header[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%] {\n  width: 60px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--color-primary);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 4px 0;\n  width: 60px;\n  white-space: nowrap;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  height: 4px;\n  background: var(--color-border);\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--color-primary);\n  transition: width 0.3s ease;\n  border-radius: 0 2px 2px 0;\n}\n.step[_ngcontent-%COMP%] {\n  padding: 24px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  flex: 1;\n}\n.step--result[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.step__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  line-height: 1.3;\n}\n.step__subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-muted);\n  margin-top: -8px;\n}\n.options-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.option-card[_ngcontent-%COMP%] {\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 16px;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.option-card[_ngcontent-%COMP%]:hover, \n.option-card.selected[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  background: rgba(244, 169, 34, 0.08);\n}\n.option-card.selected[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 1px rgba(244, 169, 34, 0.2);\n}\n.option-card__icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  flex-shrink: 0;\n}\n.option-card__label[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--color-text-base);\n}\n.option-card__sublabel[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  margin-top: 2px;\n}\n.pref-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n}\n.pref-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  border: 1.5px solid var(--color-border);\n  border-radius: 24px;\n  padding: 8px 10px;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n  background: var(--color-bg);\n}\n.pref-chip[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n}\n.pref-chip.selected[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: #fff;\n}\n.pref-chip.selected[_ngcontent-%COMP%]   .pref-chip__label[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.pref-chip__emoji[_ngcontent-%COMP%] {\n  font-size: 16px;\n  flex-shrink: 0;\n}\n.pref-chip__label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  color: var(--color-text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.btn[_ngcontent-%COMP%] {\n  flex: 1;\n  border-radius: var(--radius-xl);\n  padding: 14px 24px;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  font-family: "Roboto", sans-serif;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n}\n.btn--secondary[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  color: var(--color-primary);\n  border: 1.5px solid var(--color-primary);\n}\n.planner__nav[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 100%;\n  max-width: 600px;\n  background: var(--color-bg);\n  border-top: 1px solid var(--color-border);\n  padding: 12px 16px;\n  display: flex;\n  gap: 8px;\n  z-index: 20;\n  box-sizing: border-box;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n  min-height: 300px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-text[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--color-text-muted);\n  font-weight: 500;\n}\n.result__header[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.result__title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.result__summary[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  margin-top: 4px;\n}\n.day-card[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border-radius: 16px;\n  border: 1px solid #f0f0f0;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);\n  margin-bottom: 16px;\n  overflow: hidden;\n}\n.day-card__header[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  padding: 12px 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.day-card__day[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #fff;\n}\n.day-card__theme[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(255, 255, 255, 0.9);\n  font-weight: 500;\n}\n.stop[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 14px 16px;\n  border-bottom: 1px solid #f5f5f5;\n  align-items: flex-start;\n}\n.stop--last[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.stop__thumb[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.stop__details[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.stop__name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  line-height: 1.3;\n}\n.stop__time[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 11px;\n  color: var(--color-primary);\n  border: 1px solid var(--color-primary);\n  border-radius: var(--radius-xl);\n  padding: 2px 8px;\n  width: fit-content;\n  font-weight: 500;\n}\n.stop__reason[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-style: italic;\n  color: var(--color-text-muted);\n  line-height: 1.4;\n}\n.stop__safety[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #d97706;\n  background: #fffbeb;\n  border-radius: var(--radius-sm);\n  padding: 6px 8px;\n  display: flex;\n  gap: 4px;\n  align-items: flex-start;\n  line-height: 1.4;\n}\n.stop__map-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--color-primary);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  font-family: "Roboto", sans-serif;\n}\n.stop__map-btn[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.result__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 8px 0 16px;\n}\n.saved-indicator[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #16a34a;\n  background: #f0fdf4;\n  border: 1px solid #bbf7d0;\n  border-radius: var(--radius-md);\n  padding: 7px 12px;\n  margin-bottom: 12px;\n  font-weight: 500;\n}\n.anchor-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 12px 16px 0;\n  border: 1.5px solid var(--color-primary);\n  border-radius: var(--radius-xl);\n  background: rgba(244, 169, 34, 0.08);\n  padding: 12px 14px;\n}\n.anchor-banner__img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  border: 2px solid var(--color-primary);\n}\n.anchor-banner__info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.anchor-banner__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 2px;\n}\n.anchor-banner__name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.anchor-banner__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n  margin-top: 1px;\n}\n.anchor-banner__remove[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 18px;\n  color: var(--color-text-light);\n  cursor: pointer;\n  padding: 0;\n  line-height: 1;\n  flex-shrink: 0;\n  transition: color 0.15s;\n  font-family: system-ui, sans-serif;\n}\n.anchor-banner__remove[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.stop__anchor-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-primary);\n  margin-bottom: 2px;\n}\n.plans-view[_ngcontent-%COMP%] {\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  flex: 1;\n}\n.plans-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 60px 16px;\n  text-align: center;\n}\n.plans-empty__icon[_ngcontent-%COMP%] {\n  font-size: 52px;\n}\n.plans-empty__text[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.plans-empty__sub[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-muted);\n}\n.plans-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.plan-card[_ngcontent-%COMP%] {\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n}\n.plan-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  background: rgba(244, 169, 34, 0.08);\n}\n.plan-card.confirming[_ngcontent-%COMP%] {\n  border-color: #fca5a5;\n  background: #fff5f5;\n}\n.plan-card__main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.plan-card__fav[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 0;\n  flex-shrink: 0;\n  line-height: 1;\n  opacity: 0.45;\n  transition: opacity 0.15s;\n  font-family:\n    "Apple Color Emoji",\n    "Segoe UI Emoji",\n    sans-serif;\n}\n.plan-card__fav.active[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.plan-card__info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.plan-card__name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.plan-card__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n  margin-top: 3px;\n}\n.plan-card__date[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--color-text-muted);\n  margin-top: 2px;\n  font-style: italic;\n}\n.plan-card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  align-items: flex-end;\n  flex-shrink: 0;\n}\n.plan-card__view-btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-md);\n  padding: 7px 14px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  font-family: "Roboto", sans-serif;\n}\n.plan-card__close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 17px;\n  line-height: 1;\n  color: var(--color-text-light);\n  cursor: pointer;\n  padding: 0;\n  transition: background 0.15s, color 0.15s;\n  font-family: system-ui, sans-serif;\n  margin-bottom: 20px;\n}\n.plan-card__close-btn[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.plan-card__confirm[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 12px;\n  padding-top: 10px;\n  border-top: 1px solid #fecaca;\n}\n.plan-card__confirm-text[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 12px;\n  font-weight: 600;\n  color: #dc2626;\n}\n.plan-card__confirm-keep[_ngcontent-%COMP%] {\n  background: none;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 5px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  color: var(--color-text-muted);\n  font-family: "Roboto", sans-serif;\n  transition: border-color 0.15s;\n}\n.plan-card__confirm-keep[_ngcontent-%COMP%]:hover {\n  border-color: #9ca3af;\n}\n.plan-card__confirm-del[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-md);\n  padding: 5px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: "Roboto", sans-serif;\n  transition: background 0.15s;\n}\n.plan-card__confirm-del[_ngcontent-%COMP%]:hover {\n  background: #b91c1c;\n}\n.plans-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 4px;\n}\n.plans-create-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  flex: none;\n}\n/*# sourceMappingURL=route-builder.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RouteBuilderComponent, { className: "RouteBuilderComponent", filePath: "src/app/map/features/route-builder/route-builder.component.ts", lineNumber: 27 });
})();
export {
  RouteBuilderComponent
};
//# sourceMappingURL=chunk-HYPVT4FW.js.map
