import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { locations } from '@assets/locations.json';
import { providers } from '@assets/providers.json';
import { SeoService } from '@core/services/seo.service';
import { PanelShellComponent } from '@ui/panel-shell/panel-shell.component';
import { ProviderCardComponent } from '@features/providers/provider-card/provider-card.component';
import { MapBridgeService } from '@core/services/map-bridge.service';
import { Difficulty, Location, Provider } from '@core/models';
import { haversineKm } from '@core/utils/geo.utils';
import { matchesFilter, normalizeForSearch, FilterId, FilterOption, FILTER_OPTIONS, getIslandLabel, difficultyColor as getDifficultyColor } from '@core/utils/location-filter.util';
import { isDiscountValid } from '@core/utils/provider.utils';
import { FEATURES } from '../../../feature-flags';

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

  readonly filters: FilterOption[] = FEATURES.PROMOTIONS
    ? FILTER_OPTIONS
    : FILTER_OPTIONS.filter(f => f.id !== 'deals');

  readonly activeFilter = signal<string | null>(null);
  readonly sortMode = signal<SortMode>('rating');
  readonly searchQuery = signal('');
  readonly searchFocused = signal(false);
  private readonly userLat = signal<number | null>(null);
  private readonly userLon = signal<number | null>(null);
  readonly hasGps = computed(() => this.userLat() !== null);

  private readonly activeProviders = computed(() =>
    this.allProviders.filter(p => !p.discount || isDiscountValid(p.discount))
  );

  private readonly dealLocationIds = computed(() =>
    new Set<number>(this.activeProviders().flatMap(p => p.nearLocationIds ?? []))
  );

  readonly filteredLocations = computed(() => {
    const q = normalizeForSearch(this.searchQuery().trim());
    const activeFilter = this.activeFilter();
    const lat = this.userLat();
    const lon = this.userLon();
    const mode = this.sortMode();
    const dealIds = this.dealLocationIds();

    let list = activeFilter === null
      ? [...this.allLocations]
      : this.allLocations.filter(loc =>
          matchesFilter(loc, activeFilter as FilterId, { dealLocationIds: dealIds })
        );

    if (q) list = list.filter(loc => normalizeForSearch(loc.title).includes(q));

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

    if (this.activeFilter() === 'deals') {
      return this.activeProviders().map(p => ({ type: 'provider' as const, data: p }));
    }

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

    if (!isPlatformBrowser(this.platformId)) return;

    this.bridge.enterPanelMode(this.mapProviders);

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loc => {
        if (loc) this.router.navigate(['/malta/locations', loc.slug], { queryParams: { backTo: 'list' } });
      });

    if (navigator.geolocation) {
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
    this.activeFilter.update(current => current === id ? null : id);
  }

  setSort(mode: SortMode): void { this.sortMode.set(mode); }

  islandLabel(loc: Location): string | null { return getIslandLabel(loc); }
  difficultyColor(difficulty: Difficulty): string { return getDifficultyColor(difficulty); }

  openLocation(loc: Location): void {
    this.router.navigate(['/malta/locations', loc.slug], { queryParams: { backTo: 'list' } });
  }

  openProvider(provider: Provider): void {
    this.router.navigate(['/malta/providers', provider.id]);
  }

  browseDeals(): void { this.router.navigate(['/malta/deals'], { queryParams: { backTo: 'list' } }); }
  goToMap(): void { this.router.navigate(['/malta']); }
}
