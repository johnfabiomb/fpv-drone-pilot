import { Component, DestroyRef, OnInit, PLATFORM_ID, computed, signal, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelShellComponent } from '@map/ui/panel-shell/panel-shell.component';
import { ExperienceCardComponent } from '@map/features/experiences/experience-card/experience-card.component';
import { SeoService } from '@map/core/services/seo.service';
import { MapBridgeService } from '@map/core/services/map-bridge.service';
import { NavigationService } from '@map/core/services/navigation.service';
import { Experience, Location, Provider } from '@map/core/models';
import { haversineKm } from '@map/core/utils/geo.utils';
import { getAllExperiences, getExperiencePins } from '@map/core/utils/experience.utils';
import { providers } from '@assets/providers.json';

interface ExperienceEntry { experience: Experience; provider: Provider; }

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, ExperienceCardComponent],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss',
})
export class DealsComponent implements OnInit {
  private readonly userLat = signal<number | null>(null);
  private readonly userLon = signal<number | null>(null);

  private readonly allProviders = providers as Provider[];

  /** Experiences sorted by nearest spot to the user (unsorted until GPS resolves). */
  readonly sortedExperiences = computed<ExperienceEntry[]>(() => {
    const all = getAllExperiences(this.allProviders);
    const lat = this.userLat();
    const lon = this.userLon();
    if (lat === null || lon === null) return all;
    return [...all].sort((a, b) => this.nearestSpotKm(a, lat, lon) - this.nearestSpotKm(b, lat, lon));
  });

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route      = inject(ActivatedRoute);
  private readonly router     = inject(Router);
  private readonly nav        = inject(NavigationService);
  private readonly seo        = inject(SeoService);
  readonly bridge             = inject(MapBridgeService);

  ngOnInit(): void {
    this.seo.setPage('deals');

    if (!isPlatformBrowser(this.platformId)) return;

    const backTo = this.route.snapshot.queryParamMap.get('backTo');
    const backBtn = backTo === 'list' ? { label: 'Back', accent: true } : { label: 'Back to map' };
    // Panel open, but the map shows experience pins (not provider self-pins) — individually, no clusters.
    this.bridge.enterPanelMode([], backBtn);
    this.bridge.clusterPins.set(false);
    this.bridge.experiencePins.set(getExperiencePins(this.allProviders));

    this.bridge.experienceSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(e => this.openExperience(e));

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc: Location | null) => {
        if (loc) this.router.navigate(['/malta/locations', loc.slug]);
      });

    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.navigateBack());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.userLat.set(pos.coords.latitude);
          this.userLon.set(pos.coords.longitude);
        },
        () => {},
        { maximumAge: 60000, timeout: 10000 },
      );
    }
  }

  openExperience(experience: Experience): void {
    this.router.navigate(['/malta/experiences', experience.id]);
  }

  onPanelCloseRequested(): void {
    this.navigateBack();
  }

  private nearestSpotKm(entry: ExperienceEntry, lat: number, lon: number): number {
    return entry.experience.spots.reduce(
      (min, s) => Math.min(min, haversineKm(lat, lon, s.lat, s.lon)),
      Infinity,
    );
  }

  private navigateBack(): void {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
}
