import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { locations } from '../../../assets/locations.json';

interface FilterOption { id: string; label: string; emoji: string; }
type SortMode = 'distance' | 'rating' | 'alpha';

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss',
})
export class LocationListComponent implements OnInit, OnDestroy {
  readonly allLocations = [...locations];

  filters: FilterOption[] = [
    { id: 'hidden',     label: 'Hidden Gems', emoji: '💎' },
    { id: 'cave',       label: 'Caves',       emoji: '🪨' },
    { id: 'beach',      label: 'Beaches',     emoji: '🏖️' },
    { id: 'historical', label: 'Historical',  emoji: '🏛️' },
    { id: 'easy',       label: 'Easy',        emoji: '🚶' },
    { id: 'hard',       label: 'Hard',        emoji: '🥾' },
    { id: 'gozo',       label: 'Gozo',        emoji: '⛵' },
    { id: 'comino',     label: 'Comino',      emoji: '🏝️' },
  ];

  activeFilters = new Set<string>();
  sortMode: SortMode = 'rating';
  searchQuery = '';
  userLat: number | null = null;
  userLon: number | null = null;
  private watchId: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        pos => {
          this.userLat = pos.coords.latitude;
          this.userLon = pos.coords.longitude;
          if (this.sortMode === 'rating') this.sortMode = 'distance';
        },
        () => {},
        { maximumAge: 15000, timeout: 10000 }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.watchId !== null) navigator.geolocation.clearWatch(this.watchId);
  }

  get filteredLocations(): any[] {
    const q = this.searchQuery.trim().toLowerCase();

    let list = this.activeFilters.size === 0
      ? [...this.allLocations]
      : this.allLocations.filter(loc => [...this.activeFilters].some(f => this.matchesFilter(loc, f)));

    if (q) {
      list = list.filter(loc => loc.title.toLowerCase().includes(q));
    }

    if (this.sortMode === 'distance' && this.userLat !== null) {
      list = list.map(loc => ({
        ...loc,
        _dist: haversineKm(this.userLat!, this.userLon!, loc.lat, loc.lon),
      })).sort((a, b) => a._dist - b._dist);
    } else if (this.sortMode === 'rating') {
      list = list.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else {
      list = list.slice().sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }

  private matchesFilter(loc: any, filter: string): boolean {
    const tags: string[] = loc.tags ?? [];
    switch (filter) {
      case 'beach':      return tags.includes('beach') || tags.includes('bay');
      case 'cave':       return tags.includes('cave') || tags.includes('sea-cave');
      case 'historical': return tags.includes('historical') || tags.includes('religious') || tags.includes('fortress') || tags.includes('fortification') || tags.includes('cultural');
      case 'hidden':     return tags.includes('hidden');
      case 'easy':       return tags.includes('easy');
      case 'hard':       return tags.includes('hard');
      case 'gozo':       return tags.includes('gozo');
      case 'comino':     return tags.includes('comino');
      default:           return true;
    }
  }

  toggleFilter(id: string): void {
    this.activeFilters.has(id) ? this.activeFilters.delete(id) : this.activeFilters.add(id);
  }

  setSort(mode: SortMode): void {
    this.sortMode = mode;
  }

  distanceLabel(loc: any): string | null {
    if (this.userLat === null) return null;
    const km = haversineKm(this.userLat, this.userLon!, loc.lat, loc.lon);
    return km < 1 ? `${Math.round(km * 1000)} m away` : `${km.toFixed(1)} km away`;
  }

  islandLabel(loc: any): string | null {
    const tags: string[] = loc.tags ?? [];
    if (tags.includes('gozo'))   return 'Gozo';
    if (tags.includes('comino')) return 'Comino';
    return null;
  }

  difficultyColor(d: string): string {
    return d === 'easy' ? '#22c55e' : d === 'hard' ? '#ef4444' : '#f59e0b';
  }

  openLocation(loc: any): void {
    const title = encodeURIComponent(loc.title.replace(' ', '-'));
    this.router.navigate(['/malta'], { queryParams: { title } });
  }

  goToMap(): void {
    this.router.navigate(['/malta']);
  }
}
