import { Injectable } from '@angular/core';
import { locations } from '../../../assets/locations.json';
import { Location } from '../models';

export type Difficulty = 'easy' | 'moderate' | 'hard';
export type Pace = 'relaxed' | 'balanced' | 'full-explorer';

export interface PlanInput {
  days: number;
  preferences: string[];
  difficulty: Difficulty;
  pace: Pace;
}

export interface ItineraryStop {
  location: Location;
  reason: string;
  estimatedTime: string;
  safetyNote: string | null;
}

export interface ItineraryDay {
  day: number;
  label: string;
  theme: string;
  stops: ItineraryStop[];
}

type ScoredLocation = Location & { _score: number };

const STOPS_PER_DAY: Record<Pace, Record<Difficulty, number>> = {
  relaxed: { easy: 3, moderate: 2, hard: 2 },
  balanced: { easy: 4, moderate: 3, hard: 2 },
  'full-explorer': { easy: 5, moderate: 4, hard: 3 },
};

const REASON_MAP: Record<string, string> = {
  hidden: 'A hidden gem most tourists never find — locals keep this one quiet',
  beach: 'A beautiful beach worth every minute — plan at least 2 hours here',
  cave: 'Shelters an impressive cave formation that rewards the effort to reach it',
  'sea-cave': 'A stunning sea cave — best explored by kayak or during calm mornings',
  viewpoint: "One of Malta's most cinematic viewpoints — cameras out",
  hiking: 'A rewarding trail where the scenery earns its reputation',
  swimming: 'Crystal-clear water with visibility that makes every swim memorable',
  snorkeling: 'Rich marine life just below the surface — bring a mask',
  historical: 'Layers of Maltese history you can actually feel underfoot',
  cultural: 'Woven into the fabric of daily Maltese life',
  easy: 'Accessible to everyone — a relaxed stop the whole group will enjoy',
  adventure: 'Built for explorers who want the full, unfiltered Malta experience',
  gozo: "One of Gozo's standout spots — the ferry crossing is absolutely worth it",
  comino: 'A rare gem on car-free Comino — unspoiled and unforgettable',
  sunset: 'One of the finest sunset vantage points in the Maltese archipelago',
  photography: 'A dream composition for photographers and drone pilots alike',
};

const THEME_TAG_MAP: Record<string, string> = {
  cave: 'Cave & Coastline Day',
  'sea-cave': 'Sea Cave Discovery',
  beach: 'Beach & Bays',
  historical: 'History & Heritage',
  cultural: 'Culture & Architecture',
  hiking: 'Trails & Views',
  hidden: 'Hidden Malta',
  viewpoint: 'Cinematic Viewpoints',
  sunset: 'Golden Hour Spots',
  photography: "Photographer's Route",
  adventure: 'Wild Malta',
  swimming: 'Coast & Crystal Waters',
};

const THEME_TAG_ORDER = [
  'cave', 'sea-cave', 'beach', 'historical', 'cultural',
  'hiking', 'hidden', 'viewpoint', 'sunset', 'photography',
  'adventure', 'swimming',
];

@Injectable({ providedIn: 'root' })
export class RouteBuilderService {

  getLocationById(id: number): Location | null {
    return (locations as Location[]).find(l => l.id === id) ?? null;
  }

  buildPlan(input: PlanInput, anchorLocation?: Location): ItineraryDay[] {
    const { days, preferences, difficulty, pace } = input;
    const stopsPerDay = STOPS_PER_DAY[pace][difficulty];

    // 1. Filter by difficulty — anchor bypasses this filter (user chose it explicitly)
    const filteredPool = (locations as Location[]).filter(loc => {
      if (anchorLocation && loc.id === anchorLocation.id) return false; // handled separately
      if (difficulty === 'easy') return loc.difficulty === 'easy';
      if (difficulty === 'moderate') return loc.difficulty === 'easy' || loc.difficulty === 'moderate';
      return true;
    });

    // 2. Score
    const pool: ScoredLocation[] = filteredPool.map(loc => {
      let score: number;
      if (preferences.length === 0) {
        score = (loc.rating ?? 0) * 10;
      } else {
        const matchingTags = preferences.filter(p => (loc.tags || []).includes(p));
        score = matchingTags.length * 20 + (loc.rating ?? 0) * 2;
      }
      return { ...loc, _score: score };
    });

    // 3. Sort by score descending
    pool.sort((a, b) => b._score - a._score);

    // 4. Build day groups
    const days_result: ItineraryDay[] = [];
    const usedIds = new Set<number>();
    let cominoUsed = false;

    // Pre-mark anchor as used so it never appears as a normal pool stop
    if (anchorLocation) usedIds.add(anchorLocation.id);

    for (let d = 0; d < days; d++) {
      let dayAnchor: Location;

      if (d === 0 && anchorLocation) {
        // Day 1 always starts from the chosen location
        dayAnchor = anchorLocation;
      } else {
        // Comino has no hotels — once its day is built, exclude remaining Comino spots
        const remaining = pool.filter(loc => {
          if (usedIds.has(loc.id)) return false;
          if (cominoUsed && this.getIsland(loc) === 'comino') return false;
          return true;
        });
        if (remaining.length === 0) break;
        dayAnchor = remaining[0];
        usedIds.add(dayAnchor.id);
      }

      // Only pick neighbors from the same island — Malta, Gozo, and Comino
      // require separate ferry crossings so must never be mixed in one day
      const anchorIsland = this.getIsland(dayAnchor);
      const afterAnchor = pool.filter(
        loc => !usedIds.has(loc.id) && this.getIsland(loc) === anchorIsland
      );

      const withDistance = afterAnchor.map(loc => ({
        loc,
        dist: this.haversine(dayAnchor.lat, dayAnchor.lon, loc.lat, loc.lon),
      }));
      withDistance.sort((a, b) => a.dist - b.dist);

      const dayLocs: Location[] = [dayAnchor];
      const needed = stopsPerDay - 1;
      for (let i = 0; i < Math.min(needed, withDistance.length); i++) {
        dayLocs.push(withDistance[i].loc);
        usedIds.add(withDistance[i].loc.id);
      }

      const ordered = this.nearestNeighborOrder(dayLocs);

      const stops: ItineraryStop[] = ordered.map(loc => ({
        location: loc,
        reason: this.getReason(loc, preferences),
        estimatedTime: this.getEstimatedTime(loc),
        safetyNote: this.getSafetyNote(loc),
      }));

      days_result.push({
        day: d + 1,
        label: `Day ${d + 1}`,
        theme: this.getDayTheme(ordered),
        stops,
      });

      // Comino is a day-trip island only — no overnight stays possible
      if (anchorIsland === 'comino') {
        cominoUsed = true;
        pool.forEach(loc => {
          if (!usedIds.has(loc.id) && this.getIsland(loc) === 'comino') usedIds.add(loc.id);
        });
      }
    }

    // Group days by island so travellers never ferry back and forth.
    // Natural order: Malta → Comino (same ferry port area) → Gozo.
    // If the trip starts from a Gozo anchor, flip: Gozo first then Malta.
    const maltaDays  = days_result.filter(d => this.getDayIsland(d) === 'malta');
    const gozoDays   = days_result.filter(d => this.getDayIsland(d) === 'gozo');
    const cominoDays = days_result.filter(d => this.getDayIsland(d) === 'comino');

    const grouped =
      anchorLocation && this.getIsland(anchorLocation) === 'gozo'
        ? [...gozoDays, ...maltaDays, ...cominoDays]
        : [...maltaDays, ...cominoDays, ...gozoDays];

    return grouped.map((day, i) => ({ ...day, day: i + 1, label: `Day ${i + 1}` }));
  }

  private getDayIsland(day: ItineraryDay): 'malta' | 'gozo' | 'comino' {
    return day.stops.length > 0 ? this.getIsland(day.stops[0].location) : 'malta';
  }

  private getIsland(loc: Location): 'malta' | 'gozo' | 'comino' {
    const tags: string[] = loc.tags || [];
    if (tags.includes('comino')) return 'comino';
    if (tags.includes('gozo')) return 'gozo';
    return 'malta';
  }

  private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private nearestNeighborOrder(locs: Location[]): Location[] {
    if (locs.length <= 1) return locs;
    const result: Location[] = [locs[0]];
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

  private getEstimatedTime(loc: Location): string {
    const tags: string[] = loc.tags || [];
    let minutes: number;

    // Primary type determines base time — ordered by most time-demanding first
    if (tags.includes('city')) {
      // Mdina, Victoria (Gozo) — half a day minimum
      minutes = 180;
    } else if (tags.includes('fortress')) {
      // Citadel Victoria, major fortresses
      minutes = 120;
    } else if (tags.includes('urban-walk') && (tags.includes('historical') || tags.includes('cultural'))) {
      // Birgu/Vittoriosa, Three Cities — walking historical areas
      minutes = 120;
    } else if (tags.includes('hiking') || tags.includes('trail')) {
      // Actual hikes — scaled by difficulty
      minutes = loc.difficulty === 'hard' ? 180 : loc.difficulty === 'moderate' ? 120 : 90;
    } else if (tags.includes('beach')) {
      // Beaches need proper time — never worth going for less than 90 min
      minutes = loc.difficulty === 'hard' ? 150 : 120;
    } else if (tags.includes('boat-trip')) {
      // Boat trips include queuing and the ride — Blue Grotto, Inland Sea etc.
      minutes = 75;
    } else if (tags.includes('swimming') || tags.includes('snorkeling') || tags.includes('diving')) {
      // Dedicated water-activity spots (no boat or beach tag)
      minutes = 90;
    } else if (tags.includes('fortification') && (tags.includes('historical') || tags.includes('cultural'))) {
      // Fort St Angelo, bastions, Victoria Lines sections
      minutes = 75;
    } else if (tags.includes('historical') || tags.includes('cultural')) {
      // Smaller historical stops: towers, churches, small museums
      if (tags.includes('tower') || tags.includes('church') || tags.includes('religious') || tags.includes('bastion')) {
        minutes = 30;
      } else {
        minutes = 60;
      }
    } else if (tags.includes('cave') || tags.includes('sea-cave')) {
      // Sea caves and inland caves
      minutes = 60;
    } else if (tags.includes('coastal-walk') || tags.includes('scenic-walk')) {
      // Short scenic walks (not full hikes)
      minutes = 45;
    } else if (tags.includes('garden') || tags.includes('park')) {
      minutes = 45;
    } else if (
      tags.includes('viewpoint') || tags.includes('sunset') ||
      tags.includes('rock-formation') || tags.includes('natural-arch') ||
      tags.includes('landscape') || tags.includes('landmark')
    ) {
      // Pure viewpoints and geological features — quick visits
      minutes = 30;
    } else {
      minutes = loc.difficulty === 'easy' ? 45 : loc.difficulty === 'moderate' ? 75 : 120;
    }

    // Addons: only bump up if the activity isn't already factored into the base
    if ((tags.includes('swimming') || tags.includes('snorkeling')) && !tags.includes('boat-trip') && minutes < 90) {
      minutes = 90;
    }
    if ((tags.includes('cave') || tags.includes('sea-cave')) && minutes < 60) {
      minutes += 20;
    }
    if (tags.includes('photography') && minutes < 45) {
      minutes += 15;
    }

    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  }

  private getSafetyNote(loc: Location): string | null {
    const tags: string[] = loc.tags || [];

    // Comino: day-trip only — always worth flagging booking requirement
    if (tags.includes('comino')) {
      return 'Day-trip island — no hotels. Pre-book your free time slot at blcomino.com before travelling.';
    }
    // Most dangerous activities first
    if (tags.includes('cliff-jumping')) {
      return 'Only jump from known safe spots — assess currents and depth every time.';
    }
    if (tags.includes('diving')) {
      return 'Use a certified local dive guide — some Malta sites have strong underwater currents.';
    }
    // Hard hikes with cliffs
    if (loc.difficulty === 'hard' && (tags.includes('hiking') || tags.includes('trail') || tags.includes('cliffs'))) {
      return 'Unmarked rugged terrain — bring water, sturdy footwear and an offline map.';
    }
    // Weather-dependent activities
    if (tags.includes('boat-trip')) {
      return 'Boat trips cancel in rough sea — confirm on the morning, especially Oct–Mar.';
    }
    if (tags.includes('cave') || tags.includes('sea-cave')) {
      return 'Watch for waves and slippery rocks at cave entrances — check conditions before entering.';
    }
    if (tags.includes('swimming') || tags.includes('snorkeling')) {
      return 'Check sea conditions before entering — follow any posted flags or local advice.';
    }
    if (loc.difficulty === 'hard') {
      return 'Challenging terrain — bring plenty of water and sturdy footwear.';
    }
    if (tags.includes('hidden') && loc.difficulty !== 'easy') {
      return 'Off the beaten path — download an offline map before heading out.';
    }
    return null;
  }

  private getReason(loc: Location, preferences: string[]): string {
    const tags: string[] = loc.tags || [];
    const checkList = preferences.length > 0 ? preferences : Object.keys(REASON_MAP);
    for (const pref of checkList) {
      if (tags.includes(pref) && REASON_MAP[pref]) {
        return REASON_MAP[pref];
      }
    }
    if ((loc.rating ?? 0) >= 4.5) return 'Highly rated — not to be missed';
    return 'A notable stop that adds depth to your route';
  }

  private getDayTheme(locs: Location[]): string {
    const allTags: string[] = locs.flatMap(loc => loc.tags || []);
    if (allTags.includes('gozo')) return 'Explore Gozo';
    if (allTags.includes('comino')) return 'Comino Adventure';

    const counts: Record<string, number> = {};
    for (const tag of allTags) {
      if (THEME_TAG_ORDER.includes(tag)) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    }

    let bestTag = '';
    let bestCount = 0;
    for (const tag of THEME_TAG_ORDER) {
      if ((counts[tag] || 0) > bestCount) {
        bestCount = counts[tag] || 0;
        bestTag = tag;
      }
    }

    return bestTag ? (THEME_TAG_MAP[bestTag] || 'Malta Explorer') : 'Malta Explorer';
  }
}
