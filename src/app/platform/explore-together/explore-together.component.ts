import {
  Component, DestroyRef, HostListener, OnDestroy, OnInit,
  PLATFORM_ID, effect, inject, signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { GroupCardComponent } from '../../components/group-card/group-card.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { GroupsService } from '../../shared/services/groups.service';
import { AuthService } from '../../shared/services/auth.service';
import { SeoService } from '../../shared/services/seo.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { CreateGroupPayload } from '../../shared/models/group.model';
import { Location } from '../../shared/models';

import { locations } from '../../../assets/locations.json';

@Component({
  selector: 'app-explore-together',
  standalone: true,
  imports: [CommonModule, FormsModule, PanelShellComponent, GroupCardComponent],
  templateUrl: './explore-together.component.html',
  styleUrl: './explore-together.component.scss',
})
export class ExploreTogetherComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router     = inject(Router);
  private readonly seo        = inject(SeoService);
  private readonly analytics  = inject(AnalyticsService);
  readonly bridge             = inject(MapBridgeService);
  readonly groupsService      = inject(GroupsService);
  readonly authService        = inject(AuthService);

  // ── UI state ──────────────────────────────────────────────────────────────
  readonly showCreateForm = signal(false);
  readonly formError      = signal<string | null>(null);
  readonly formSubmitting = signal(false);
  readonly spotResults    = signal<Array<{ slug: string; title: string; lat: number; lon: number }>>([]);

  // ── Create form fields ────────────────────────────────────────────────────
  formTitle       = '';
  formDate        = '';
  formTime        = '08:00';
  formDescription = '';
  formDifficulty: 'easy' | 'moderate' | 'hard' = 'easy';
  formMaxMembers  = '';
  formSpotSearch  = '';
  formSpotSlug    = '';
  formSpotTitle   = '';
  formSpotLat     = 0;
  formSpotLon     = 0;

  private readonly allSpots = (locations as Location[]).map(l => ({
    slug: l.slug, title: l.title, lat: l.lat, lon: l.lon,
  }));

  constructor() {
    // Keep map group pins in sync reactively as groups load
    effect(() => {
      this.bridge.providerPins.set(this.groupsService.groupsAsProviderPins());
    });
  }

  ngOnInit(): void {
    this.seo.setPage('groups');

    if (!isPlatformBrowser(this.platformId)) return;

    this.groupsService.startGroupsListener();
    this.bridge.enterPanelMode(this.groupsService.groupsAsProviderPins());

    this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(p => {
        if (p.category === 'group') {
          this.router.navigate(['/malta/groups', p.id]);
        }
      });

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc: Location | null) => {
        if (loc) this.router.navigate(['/malta/locations', loc.slug]);
      });

    this.analytics.pageView(window.location.href, 'Explore Together');
  }

  ngOnDestroy(): void {
    this.groupsService.stopGroupsListener();
  }

  // ── Spot search ───────────────────────────────────────────────────────────
  onSpotSearchInput(): void {
    const q = this.formSpotSearch.trim().toLowerCase();
    if (!q) { this.spotResults.set([]); return; }
    this.spotResults.set(
      this.allSpots.filter(s => s.title.toLowerCase().includes(q)).slice(0, 6),
    );
  }

  selectSpot(spot: { slug: string; title: string; lat: number; lon: number }): void {
    this.formSpotSlug   = spot.slug;
    this.formSpotTitle  = spot.title;
    this.formSpotLat    = spot.lat;
    this.formSpotLon    = spot.lon;
    this.formSpotSearch = spot.title;
    this.spotResults.set([]);
  }

  // ── Create form ───────────────────────────────────────────────────────────
  openCreateForm(): void {
    if (!this.authService.isLoggedIn()) {
      this.authService.openLoginModal();
      return;
    }
    this.showCreateForm.set(true);
  }

  cancelCreate(): void {
    this.showCreateForm.set(false);
    this.formError.set(null);
    this.resetForm();
  }

  async submitCreate(): Promise<void> {
    if (!this.formTitle.trim() || !this.formSpotSlug || !this.formDate) {
      this.formError.set('Please fill in title, spot, and date.');
      return;
    }

    const dateObj = new Date(this.formDate + 'T' + this.formTime);
    if (isNaN(dateObj.getTime())) {
      this.formError.set('Invalid date or time.');
      return;
    }

    const payload: CreateGroupPayload = {
      title:       this.formTitle.trim(),
      spotSlug:    this.formSpotSlug,
      spotTitle:   this.formSpotTitle,
      spotLat:     this.formSpotLat,
      spotLon:     this.formSpotLon,
      date:        dateObj,
      time:        this.formTime,
      description: this.formDescription.trim(),
      difficulty:  this.formDifficulty,
      maxMembers:  this.formMaxMembers ? parseInt(this.formMaxMembers, 10) : null,
    };

    this.formError.set(null);
    this.formSubmitting.set(true);

    try {
      const groupId = await this.groupsService.createGroup(payload);
      this.showCreateForm.set(false);
      this.resetForm();
      this.router.navigate(['/malta/groups', groupId]);
    } catch (e) {
      this.formError.set(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      this.formSubmitting.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.showCreateForm()) this.cancelCreate();
  }

  get todayMin(): string {
    return new Date().toISOString().split('T')[0];
  }

  private resetForm(): void {
    this.formTitle       = '';
    this.formDate        = '';
    this.formTime        = '08:00';
    this.formDescription = '';
    this.formDifficulty  = 'easy';
    this.formMaxMembers  = '';
    this.formSpotSearch  = '';
    this.formSpotSlug    = '';
    this.formSpotTitle   = '';
    this.formSpotLat     = 0;
    this.formSpotLon     = 0;
    this.spotResults.set([]);
  }
}
