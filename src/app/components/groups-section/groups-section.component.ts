import {
  Component, DestroyRef, Input, OnDestroy, OnInit,
  PLATFORM_ID, computed, inject, signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GroupCardComponent } from '../group-card/group-card.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { GroupsService } from '../../shared/services/groups.service';
import { AuthService } from '../../shared/services/auth.service';
import { UserDataService } from '../../shared/services/user-data.service';
import {
  AlreadyHasActiveGroupError,
  CreateGroupPayload,
  Group,
  MeetingPoint,
} from '../../shared/models/group.model';
import { Location } from '../../shared/models';
import { normalizeForSearch } from '../../shared/utils/location-filter.util';
import { locations } from '../../../assets/locations.json';

export interface LockedSpot {
  slug: string;
  title: string;
  lat: number;
  lon: number;
}

interface SpotOption {
  slug: string;
  title: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-groups-section',
  standalone: true,
  imports: [CommonModule, FormsModule, GroupCardComponent],
  templateUrl: './groups-section.component.html',
  styleUrl: './groups-section.component.scss',
})
export class GroupsSectionComponent implements OnInit, OnDestroy {
  /** When set, the spot is pre-filled and locked throughout the create flow. */
  @Input() lockedLocation?: LockedSpot;

  private readonly bridge = inject(MapBridgeService);
  readonly groupsService = inject(GroupsService);
  readonly authService = inject(AuthService);
  readonly userDataService = inject(UserDataService);
  readonly groupsUnlocked = computed(() => this.userDataService.groupsUnlocked());
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  // Groups specific to a locked spot
  readonly spotGroups = signal<Group[]>([]);
  readonly loadingGroups = signal(false);

  // UI state
  readonly showCreateForm    = signal(false);
  readonly formError         = signal<string | null>(null);
  readonly formSubmitting    = signal(false);
  readonly spotResults       = signal<SpotOption[]>([]);
  readonly pickingMeetingPoint    = signal(false);
  readonly pendingMeetingPoint    = signal<{ lat: number; lon: number } | null>(null);
  readonly showPastGroups    = signal(false);

  // Form fields
  formTitle        = '';
  formDate         = '';
  formTime         = '08:00';
  formDescription  = '';
  formDifficulty: 'easy' | 'moderate' | 'hard' = 'easy';
  formMaxMembers   = '';
  formSpotSearch   = '';
  formSpotSlug     = '';
  formSpotTitle    = '';
  formSpotLat      = 0;
  formSpotLon      = 0;
  formMeetingPoint: MeetingPoint | null = null;

  private readonly allSpots: SpotOption[] = (locations as Location[]).map(l => ({
    slug: l.slug, title: l.title, lat: l.lat, lon: l.lon,
  }));

  get groups(): Group[] {
    const all = this.lockedLocation ? this.spotGroups() : this.groupsService.openGroups();
    const uid = this.authService.user()?.uid;
    if (!uid) return all;
    return [...all].sort((a, b) => {
      if (a.leaderId === uid) return -1;
      if (b.leaderId === uid) return 1;
      return 0;
    });
  }

  get pastGroups(): Group[] {
    return this.lockedLocation ? [] : this.groupsService.recentPastGroups();
  }

  get isLoading(): boolean {
    return this.lockedLocation ? this.loadingGroups() : this.groupsService.loading();
  }

  get minDate(): string {
    return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.lockedLocation) {
      this.loadingGroups.set(true);
      this.groupsService.fetchGroupsForSpot(this.lockedLocation.slug)
        .then(groups => { this.spotGroups.set(groups); this.loadingGroups.set(false); });
    }

    // Handle map coordinate picks for meeting point (only when form is open)
    this.bridge.coordPicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ lat, lon }) => {
        if (!this.showCreateForm()) return;
        this.pendingMeetingPoint.set({ lat, lon });
        this.bridge.meetingPointMarker.set({ lat, lon }); // preview on map
        this.bridge.pickMode.set(false);
        this.pickingMeetingPoint.set(false);
        this.bridge.panel.expand();
      });
  }

  ngOnDestroy(): void {
    if (this.showCreateForm()) {
      this.bridge.pickMode.set(false);
      this.bridge.meetingPointMarker.set(null);
    }
  }

  // ── Create form ───────────────────────────────────────────────────────────

  openCreateForm(): void {
    if (!this.authService.isLoggedIn()) {
      this.authService.openLoginModal();
      return;
    }
    if (this.lockedLocation) {
      this.formSpotSlug  = this.lockedLocation.slug;
      this.formSpotTitle = this.lockedLocation.title;
      this.formSpotLat   = this.lockedLocation.lat;
      this.formSpotLon   = this.lockedLocation.lon;
      this.formSpotSearch = this.lockedLocation.title;
    }
    this.showCreateForm.set(true);
  }

  cancelCreate(): void {
    this.showCreateForm.set(false);
    this.formError.set(null);
    this.bridge.pickMode.set(false);
    this.bridge.meetingPointMarker.set(null);
    this.resetForm();
  }

  onSpotSearchInput(): void {
    const q = normalizeForSearch(this.formSpotSearch.trim());
    if (!q) { this.spotResults.set([]); return; }
    this.spotResults.set(
      this.allSpots.filter(s => normalizeForSearch(s.title).includes(q)).slice(0, 6),
    );
  }

  selectSpot(spot: SpotOption): void {
    this.formSpotSlug   = spot.slug;
    this.formSpotTitle  = spot.title;
    this.formSpotLat    = spot.lat;
    this.formSpotLon    = spot.lon;
    this.formSpotSearch = spot.title;
    this.spotResults.set([]);
  }

  startPickingMeetingPoint(): void {
    this.pickingMeetingPoint.set(true);
    this.bridge.pickMode.set(true);
    this.bridge.panel.minimize();
  }

  clearMeetingPoint(): void {
    if (this.pickingMeetingPoint()) this.bridge.panel.expand();
    this.formMeetingPoint = null;
    this.pendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(null);
    this.pickingMeetingPoint.set(false);
    this.bridge.pickMode.set(false);
  }

  confirmMeetingPoint(): void {
    const p = this.pendingMeetingPoint();
    if (!p) return;
    this.formMeetingPoint = p;
    this.pendingMeetingPoint.set(null);
  }

  retryMeetingPoint(): void {
    this.pendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(this.formMeetingPoint);
    this.startPickingMeetingPoint();
  }

  async submitCreate(): Promise<void> {
    if (!this.formTitle.trim() || !this.formDate) {
      this.formError.set('Please fill in title and date.');
      return;
    }
    const dateObj = new Date(this.formDate + 'T' + this.formTime);
    if (isNaN(dateObj.getTime())) {
      this.formError.set('Invalid date or time.');
      return;
    }

    const payload: CreateGroupPayload = {
      title:        this.formTitle.trim(),
      spotSlug:     this.formSpotSlug  || null,
      spotTitle:    this.formSpotTitle || null,
      spotLat:      this.formSpotSlug  ? this.formSpotLat : null,
      spotLon:      this.formSpotSlug  ? this.formSpotLon : null,
      date:         dateObj,
      time:         this.formTime,
      description:  this.formDescription.trim(),
      difficulty:   this.formDifficulty,
      maxMembers:   this.formMaxMembers ? parseInt(this.formMaxMembers, 10) : null,
      meetingPoint: this.formMeetingPoint,
    };

    this.formError.set(null);
    this.formSubmitting.set(true);
    try {
      const groupId = await this.groupsService.createGroup(payload);
      this.showCreateForm.set(false);
      this.resetForm();
      this.router.navigate(['/malta/groups', groupId]);
    } catch (e) {
      this.formError.set(
        e instanceof AlreadyHasActiveGroupError || e instanceof Error
          ? (e as Error).message
          : 'Something went wrong.',
      );
    } finally {
      this.formSubmitting.set(false);
    }
  }

  private resetForm(): void {
    this.formTitle       = '';
    this.formDate        = '';
    this.formTime        = '08:00';
    this.formDescription = '';
    this.formDifficulty  = 'easy';
    this.formMaxMembers  = '';
    this.formMeetingPoint = null;
    this.pickingMeetingPoint.set(false);
    this.spotResults.set([]);
    if (!this.lockedLocation) {
      this.formSpotSearch = '';
      this.formSpotSlug   = '';
      this.formSpotTitle  = '';
      this.formSpotLat    = 0;
      this.formSpotLon    = 0;
    }
  }
}
