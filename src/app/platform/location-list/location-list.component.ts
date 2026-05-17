import { Component, DestroyRef, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { locations } from '../../../assets/locations.json';
import { providers } from '../../../assets/providers.json';
import { SeoService } from '../../shared/services/seo.service';
import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { ProviderCardComponent } from '../../components/provider-card/provider-card.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { Difficulty, Location, Provider } from '../../shared/models';
import { haversineKm } from '../../shared/utils/geo.utils';
import { matchesFilter, FilterId, getIslandLabel, difficultyColor as getDifficultyColor } from '../../shared/utils/location-filter.util';
import { FEATURES } from '../../feature-flags';

interface FilterOption { id: string; label: string; emoji: string; }
type SortMode = 'distance' | 'rating' | 'alpha';
type ListItem = { type: 'location'; data: Location } | { type: 'provider'; data: Provider };

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PanelShellComponent, ProviderCardComponent],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss',
})
export class LocationListComponent implements OnInit {
  readonly allLocations = locations as Location[];
  readonly allProviders = providers as Provider[];
  readonly FEATURES = FEATURES;

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

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  readonly bridge = inject(MapBridgeService);

  ngOnInit(): void {
    this.seo.setPage('list');

    // Configure bridge for this route
    this.bridge.showFilterBar.set(false);
    this.bridge.filters.set([]);
    this.bridge.providerPins.set([]);
    this.bridge.selectedLocation.set(null);
    this.bridge.panelOpen.set(true);
    this.bridge.mapOnly.set(false);
    this.bridge.floatingBackBtn.set(null);
    this.bridge.panel.expand();

    // Navigate to the map view when a pin is tapped — the map's clickon() lands on
    // /malta/list?locationId=X (same route), so we do the second leg here to /malta?locationId=X
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loc => {
        if (loc) this.router.navigate(['/malta'], { queryParams: { locationId: loc.id } });
      });

    if (isPlatformBrowser(this.platformId) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.userLat = pos.coords.latitude;
          this.userLon = pos.coords.longitude;
          if (this.sortMode === 'rating') this.sortMode = 'distance';
        },
        () => {},
        { maximumAge: 60000, timeout: 10000 }
      );
    }
  }

  get filteredLocations(): Location[] {
    const q = this.searchQuery.trim().toLowerCase();

    let list = this.activeFilters.size === 0
      ? [...this.allLocations]
      : this.allLocations.filter(loc =>
          [...this.activeFilters].some(f => matchesFilter(loc, f as FilterId))
        );

    if (q) list = list.filter(loc => loc.title.toLowerCase().includes(q));

    if (this.sortMode === 'distance' && this.userLat !== null) {
      return list
        .map(loc => ({ loc, dist: haversineKm(this.userLat!, this.userLon!, loc.lat, loc.lon) }))
        .sort((a, b) => a.dist - b.dist)
        .map(x => x.loc);
    }
    if (this.sortMode === 'rating') return list.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  get displayList(): ListItem[] {
    const locs = this.filteredLocations;
    if (!FEATURES.PROMOTIONS || this.allProviders.length === 0) {
      return locs.map(l => ({ type: 'location', data: l }));
    }
    const result: ListItem[] = [];
    let pi = 0;
    for (let i = 0; i < locs.length; i++) {
      result.push({ type: 'location', data: locs[i] });
      if ((i + 1) % 4 === 0) {
        result.push({ type: 'provider', data: this.allProviders[pi % this.allProviders.length] });
        pi++;
      }
    }
    return result;
  }

  toggleFilter(id: string): void {
    this.activeFilters.has(id) ? this.activeFilters.delete(id) : this.activeFilters.add(id);
  }

  setSort(mode: SortMode): void { this.sortMode = mode; }

  distanceLabel(loc: Location): string | null {
    if (this.userLat === null) return null;
    const km = haversineKm(this.userLat, this.userLon!, loc.lat, loc.lon);
    return km < 1 ? `${Math.round(km * 1000)} m away` : `${km.toFixed(1)} km away`;
  }

  islandLabel(loc: Location): string | null {
    return getIslandLabel(loc);
  }

  difficultyColor(difficulty: Difficulty): string {
    return getDifficultyColor(difficulty);
  }

  openLocation(loc: Location): void {
    const title = encodeURIComponent(loc.title.replace(' ', '-'));
    this.router.navigate(['/malta'], { queryParams: { title } });
  }

  openProvider(provider: Provider): void {
    this.router.navigate(['/malta'], { queryParams: { provider: provider.id } });
  }

  browseDeals(): void {
    this.router.navigate(['/malta/deals']);
  }

  goToMap(): void {
    this.router.navigate(['/malta']);
  }
}
