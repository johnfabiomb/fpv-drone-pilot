import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { MapBridgeService, MapLayers } from '@map/core/services/map-bridge.service';
import { FEATURES } from '../../../feature-flags';

interface Chip { id: string; emoji: string; label: string; promo?: boolean; }

/** One simple single-select row. Content types first, then a few gem themes. */
const CHIPS: Chip[] = [
  { id: 'all',         emoji: '🗺️', label: 'All' },
  { id: 'gems',        emoji: '💎',  label: 'Gems' },
  { id: 'experiences', emoji: '🤿',  label: 'Experiences', promo: true },
  { id: 'events',      emoji: '🎟️', label: 'Events',      promo: true },
  { id: 'cave',        emoji: '🪨',  label: 'Caves' },
  { id: 'beach',       emoji: '🏖️', label: 'Beaches' },
  { id: 'historical',  emoji: '🏛️', label: 'Historical' },
  { id: 'gozo',        emoji: '⛵',  label: 'Gozo' },
  { id: 'comino',      emoji: '🏝️', label: 'Comino' },
];

const TYPE_IDS = ['all', 'gems', 'experiences', 'events'];

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent {
  readonly bridge = inject(MapBridgeService);

  readonly chips: Chip[] = CHIPS.filter(c => FEATURES.PROMOTIONS || !c.promo);

  /** Derived from bridge state so the bar always reflects the map (survives re-creation). */
  get selected(): string {
    const f = this.bridge.filters();
    if (f.length) return f[0]; // a gem theme is active
    const l = this.bridge.mapLayers();
    if (l.gems && l.experiences && l.events) return 'all';
    if (l.gems && !l.experiences && !l.events) return 'gems';
    if (l.experiences && !l.gems && !l.events) return 'experiences';
    if (l.events && !l.gems && !l.experiences) return 'events';
    return 'all';
  }

  isActive(id: string): boolean { return this.selected === id; }

  select(id: string): void {
    const isTheme = !TYPE_IDS.includes(id);
    const layers: MapLayers =
      id === 'all'         ? { gems: true,  experiences: true,  events: true }
      : id === 'experiences' ? { gems: false, experiences: true,  events: false }
      : id === 'events'      ? { gems: false, experiences: false, events: true }
      : /* gems or a theme */  { gems: true,  experiences: false, events: false };

    this.bridge.mapLayers.set(layers);
    this.bridge.filters.set(isTheme ? [id] : []);
  }
}
