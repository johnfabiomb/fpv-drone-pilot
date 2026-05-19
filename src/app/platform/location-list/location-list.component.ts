import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
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
type LocationItem = { type: 'location'; data: Location; distance: string | null };
type ListItem = LocationItem | { type: 'provider'; data: Provider };

@Component({
  selector: 'app-location-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, PanelShellComponent, ProviderCardComponent],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss',
})
export class LocationListComponent implements OnInit {
  readonly allLocations = locations as Location[];
  readonly allProviders = providers as Provider[];
  readonly mapProviders = (providers as Provider[]).filter(p => p.showOnMap && p.lat && p.lon);
  readonly FEATURES = FEATURES;

  readonly filters: FilterOption[] = [
    { id: 'hidden',     label: 'Hidden Gems', emoji: '💎' },
    { id: 'cave',       label: 'Caves',       emoji: '🪨' },
    { id: 'beach',      label: 'Beaches',     emoji: '🏖️' },
    { id: 'historical', label: 'Historical',  emoji: '🏛️' },
    { id: 'easy',       label: 'Easy',        emoji: '🚶' },
    { id: 'hard',       label: 'Hard',        emoji: '🥾' },
    { id: 'gozo',       label: 'Gozo',        emoji: '⛵' },
    { id: 'comino',     label: 'Comino',      emoji: '🏝️' },
  ];

  readonly activeFilters = signal(new Set<string>());
  readonly sortMode = signal<SortMode>('rating');
  readonly searchQuery = signal('');
  private readonly userLat = signal<number | null>(null);
  private readonly userLon = signal<number | null>(null);
  readonly hasGps = computed(() => this.userLat() !== null);

  readonly filteredLocations = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const filters = this.activeFilters();
    const lat = this.userLat();
    const lon = this.userLon();
    const mode = this.sortMode();

    let list = filters.size === 0
      ? [...this.allLocations]
      : this.allLocations.filter(loc =>
          [...filters].some(f => matchesFilter(loc, f as FilterId))
        );

    if (q) list = list.filter(loc => loc.title.toLowerCase().includes(q));

    if (mode === 'distance' && lat !== null) {
      return list
        .map(loc => ({ loc, dist: haversineKm(lat, lon!, loc.lat, loc.lon) }))
        .sort((a, b) => a.dist - b.dist)
        .map(x => x.loc);
    }
    if (mode === 'rating') return list.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list.slice().sort((a, b) => a.title.localeCompare(b.title));
  });

  readonly displayList = computed((): ListItem[] => {
    const locs = this.filteredLocations();
    const lat = this.userLat();
    const lon = this.userLon();

    const toItem = (loc: Location): LocationItem => {
      let distance: string | null = null;
      if (lat !== null) {
        const km = haversineKm(lat, lon!, loc.lat, loc.lon);
        distance = km < 1 ? `${Math.round(km * 1000)} m away` : `${km.toFixed(1)} km away`;
      }
      return { type: 'location', data: loc, distance };
    };

    if (!FEATURES.PROMOTIONS || this.allProviders.length === 0) {
      return locs.map(toItem);
    }

    const result: ListItem[] = [];
    let pi = 0;
    for (let i = 0; i < locs.length; i++) {
      result.push(toItem(locs[i]));
      if ((i + 1) % 4 === 0) {
        result.push({ type: 'provider', data: this.allProviders[pi % this.allProviders.length] });
        pi++;
      }
    }
    return result;
  });

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  readonly bridge = inject(MapBridgeService);

  ngOnInit(): void {
    this.seo.setPage('list');

    this.bridge.showFilterBar.set(false);
    this.bridge.filters.set([]);
    this.bridge.providerPins.set(this.mapProviders);
    this.bridge.selectedLocation.set(null);
    this.bridge.panelOpen.set(true);
    this.bridge.mapOnly.set(false);
    this.bridge.floatingBackBtn.set(null);
    this.bridge.panel.expand();

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loc => {
        if (loc) this.router.navigate(['/malta'], { queryParams: { locationId: loc.id } });
      });

    if (isPlatformBrowser(this.platformId) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.userLat.set(pos.coords.latitude);
          this.userLon.set(pos.coords.longitude);
          if (this.sortMode() === 'rating') this.sortMode.set('distance');
        },
        () => {},
        { maximumAge: 60000, timeout: 10000 }
      );
    }
  }

  toggleFilter(id: string): void {
    this.activeFilters.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  setSort(mode: SortMode): void { this.sortMode.set(mode); }

  islandLabel(loc: Location): string | null { return getIslandLabel(loc); }
  difficultyColor(difficulty: Difficulty): string { return getDifficultyColor(difficulty); }

  openLocation(loc: Location): void {
    const title = encodeURIComponent(loc.title.replace(' ', '-'));
    this.router.navigate(['/malta'], { queryParams: { title } });
  }

  openProvider(provider: Provider): void {
    this.router.navigate(['/malta'], { queryParams: { provider: provider.id } });
  }

  browseDeals(): void { this.router.navigate(['/malta/deals']); }
  goToMap(): void { this.router.navigate(['/malta']); }
}
