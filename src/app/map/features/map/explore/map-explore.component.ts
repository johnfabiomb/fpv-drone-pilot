import { Component, DestroyRef, OnInit, PLATFORM_ID, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '@map/core/services/seo.service';
import { BackButton, MapBridgeService } from '@map/core/services/map-bridge.service';
import { NavigationService } from '@map/core/services/navigation.service';
import { Location, MaltaEvent, Provider } from '@map/core/models';
import { getExperiencePins } from '@map/core/utils/experience.utils';
import { getEventVenuePins, upcomingEvents } from '@map/core/utils/event.utils';
import { providers } from '@assets/providers.json';
import { locations } from '@assets/locations.json';
import { events } from '@assets/events.json';

@Component({
  selector: 'app-map-explore',
  standalone: true,
  imports: [],
  template: '',
  styleUrl: './map-explore.component.scss',
})
export class MapExploreComponent implements OnInit {
  readonly mapProviders = (providers as Provider[]).filter(p => p.showOnMap && p.lat && p.lon);

  private readonly platformId  = inject(PLATFORM_ID);
  private readonly destroyRef  = inject(DestroyRef);
  private readonly seo         = inject(SeoService);
  readonly bridge              = inject(MapBridgeService);
  private readonly route       = inject(ActivatedRoute);
  private readonly router      = inject(Router);
  private readonly nav         = inject(NavigationService);

  constructor() {
    // Single source of truth for explore overlay pins (experiences + events): reflect which content types are shown.
    const allProviders = providers as Provider[];
    const allEvents = upcomingEvents(events as MaltaEvent[], new Date()); // past events drop out
    effect(() => {
      const layers = this.bridge.mapLayers();
      this.bridge.showGems.set(layers.gems);
      this.bridge.experiencePins.set(layers.experiences ? getExperiencePins(allProviders) : []);
      this.bridge.eventVenuePins.set(layers.events ? getEventVenuePins(allEvents) : []);
    });
  }

  ngOnInit(): void {
    this.seo.setPage('map');

    if (!isPlatformBrowser(this.platformId)) return;

    const params = this.route.snapshot.queryParamMap;
    const locId   = params.get('locationId') ? parseInt(params.get('locationId')!, 10) : null;
    const title   = params.get('title');
    const backTo  = params.get('backTo');

    // Redirect old ?locationId=X → /malta/locations/:slug
    if (locId) {
      const loc = (locations as Location[]).find(l => l.id === locId) ?? null;
      if (loc) {
        const queryParams = backTo ? { backTo } : {};
        this.router.navigate(['/malta/locations', loc.slug], { replaceUrl: true, queryParams });
        return;
      }
    }

    // Redirect old ?title=X → /malta/locations/:slug
    if (title) {
      const loc = (locations as Location[]).find(l =>
        encodeURIComponent(l.title) === title ||
        encodeURIComponent(l.title.replace(' ', '-')) === title,
      ) ?? null;
      if (loc) {
        const queryParams = backTo ? { backTo } : {};
        this.router.navigate(['/malta/locations', loc.slug], { replaceUrl: true, queryParams });
        return;
      }
    }

    // Normal empty-map state
    this.bridge.enterExploreMode(this.mapProviders, this.resolveBackBtn(backTo));

    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.nav.back(params));

    // Provider pin tapped on map → navigate to provider page
    this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(p => this.router.navigate(['/malta/providers', p.id]));

    // Experience pin tapped on map → navigate to the experience page
    this.bridge.experienceSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(e => this.router.navigate(['/malta/experiences', e.id]));

    // Event venue pin tapped on map → open the events page pre-filtered to that venue
    this.bridge.eventVenueSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(pin => this.router.navigate(['/malta/events'], { queryParams: { venue: pin.venue } }));

    // Interstitial: user picks a provider from the nav overlay
    this.bridge.interstitialProviderSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(p => this.router.navigate(['/malta/providers', p.id]));

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loc => { if (loc) this.router.navigate(['/malta/locations', loc.slug]); });
  }

  private resolveBackBtn(backTo: string | null): BackButton | null {
    if (backTo === '30-places-2026') return { label: 'Back to list', accent: true };
    if (backTo === 'list')           return { label: 'Back', accent: true };
    return null;
  }
}
