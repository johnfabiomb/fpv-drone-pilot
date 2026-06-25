import { Component, DestroyRef, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelShellComponent } from '@map/ui/panel-shell/panel-shell.component';
import { EventCardComponent } from '@map/features/events/event-card/event-card.component';
import { SeoService } from '@map/core/services/seo.service';
import { MapBridgeService } from '@map/core/services/map-bridge.service';
import { NavigationService } from '@map/core/services/navigation.service';
import { EventVenuePin, Location, MaltaEvent, Provider } from '@map/core/models';
import {
  DAY_FILTERS, EVENT_FILTERS, PERIOD_FILTERS, eventBookUrl, getEventVenuePins,
  matchesDay, matchesPeriod, nextDate, upcomingEvents,
} from '@map/core/utils/event.utils';
import { getExperiencePins } from '@map/core/utils/experience.utils';
import { events as rawEvents } from '@assets/events.json';
import { providers } from '@assets/providers.json';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, EventCardComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  readonly now = new Date();
  // Past events drop out automatically.
  private readonly allEvents = upcomingEvents(rawEvents as MaltaEvent[], this.now);

  readonly categoryFilters = EVENT_FILTERS;
  readonly periodFilters = PERIOD_FILTERS;
  readonly dayFilters = DAY_FILTERS;
  readonly activeCategory = signal<string>('all');
  readonly activePeriod = signal<string>('all');
  readonly activeDay = signal<string>('all');
  readonly selectedVenue = signal<string | null>(null);

  readonly filtered = computed<MaltaEvent[]>(() => {
    const cat = this.activeCategory();
    const period = this.activePeriod();
    const day = this.activeDay();
    const venue = this.selectedVenue();
    return this.allEvents
      .filter(e => cat === 'all' || e.category === cat)
      .filter(e => matchesPeriod(e, period, this.now))
      .filter(e => matchesDay(e, day))
      .filter(e => !venue || e.venue === venue)
      .sort((a, b) => (nextDate(a, this.now) ?? '').localeCompare(nextDate(b, this.now) ?? ''));
  });

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route      = inject(ActivatedRoute);
  private readonly router     = inject(Router);
  private readonly nav        = inject(NavigationService);
  private readonly seo        = inject(SeoService);
  readonly bridge             = inject(MapBridgeService);

  ngOnInit(): void {
    this.seo.setPage('events');

    if (!isPlatformBrowser(this.platformId)) return;

    const backTo = this.route.snapshot.queryParamMap.get('backTo');
    const backBtn = backTo === 'list' ? { label: 'Back', accent: true } : { label: 'Back to map' };
    this.bridge.enterPanelMode([], backBtn);
    // This view shows events + experiences (providers), no gems.
    this.bridge.showGems.set(false);
    this.bridge.experiencePins.set(getExperiencePins(providers as Provider[]));
    this.bridge.eventVenuePins.set(getEventVenuePins(this.allEvents));

    // Opened from a venue pin on the map → start filtered to that venue.
    const venue = this.route.snapshot.queryParamMap.get('venue');
    if (venue) this.selectedVenue.set(venue);

    // Tap a venue pin → filter the list to that venue.
    this.bridge.eventVenueSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pin: EventVenuePin) => {
        this.selectedVenue.set(pin.venue);
        this.bridge.scrollToTop$.next();
      });

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc: Location | null) => { if (loc) this.router.navigate(['/malta/locations', loc.slug]); });

    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.navigateBack());
  }

  setCategory(id: string): void { this.activeCategory.set(id); }
  setPeriod(id: string): void { this.activePeriod.set(id); }
  setDay(id: string): void { this.activeDay.set(id); }
  clearVenue(): void { this.selectedVenue.set(null); }

  openEvent(event: MaltaEvent): void {
    if (isPlatformBrowser(this.platformId)) window.open(eventBookUrl(event), '_blank', 'noopener');
  }

  onPanelCloseRequested(): void { this.navigateBack(); }

  private navigateBack(): void { this.nav.back(this.route.snapshot.queryParamMap); }
}
