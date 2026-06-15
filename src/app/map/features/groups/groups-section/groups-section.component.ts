import {
  Component, DestroyRef, Input, OnDestroy, OnInit,
  PLATFORM_ID, computed, inject, signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GroupCardComponent } from '@map/features/groups/group-card/group-card.component';
import { ConfirmPopupComponent } from '@map/ui/confirm-popup/confirm-popup.component';
import { MapBridgeService } from '@map/core/services/map-bridge.service';
import { GroupsService } from '@map/core/services/groups.service';
import { AuthService } from '@map/core/services/auth.service';
import { UserDataService } from '@map/core/services/user-data.service';
import {
  AlreadyHasActiveGroupError,
  CreateGroupPayload,
  Group,
  MeetingPoint,
} from '@map/core/models/group.model';
import { GroupStatus, Location } from '@map/core/models';

export interface LockedSpot {
  slug: string;
  title: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-groups-section',
  standalone: true,
  imports: [CommonModule, FormsModule, GroupCardComponent, ConfirmPopupComponent],
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
  readonly groupsUnlocked  = computed(() => this.userDataService.groupsUnlocked());
  readonly maxMembersCap   = computed(() => this.userDataService.levelInfo().maxGroupMembers);
  readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  // Groups specific to a locked spot
  readonly spotGroups = signal<Group[]>([]);
  readonly loadingGroups = signal(false);

  // UI state
  readonly showCreateForm         = signal(false);
  readonly formError              = signal<string | null>(null);
  readonly formSubmitting         = signal(false);
  readonly pickingMeetingPoint    = signal(false);
  readonly pendingMeetingPoint    = signal<{ lat: number; lon: number } | null>(null);
  readonly showPastGroups         = signal(false);
  readonly showMyGroups           = signal(true);
  readonly confirmingArchiveId    = signal<string | null>(null);
  readonly pastBulkMode           = signal(false);
  readonly pastBulkSelected       = signal<Set<string>>(new Set());
  readonly confirmingBulkArchive  = signal(false);
  /** True while the user is tapping a location pin to fill the spot field. */
  readonly pickingSpot            = signal(false);

  readonly isAdmin      = computed(() => this.userDataService.isAdmin());
  readonly canSetPrice  = computed(() => this.userDataService.canSetPrice());
  readonly currentUid   = computed(() => this.authService.user()?.id ?? null);

  /** Open groups the current user leads or is a member of. */
  readonly myGroups = computed(() => {
    if (this.lockedLocation) return [];
    const uid = this.currentUid();
    if (!uid) return [];
    const myIds = this.groupsService.myGroupIds();
    return this.groupsService.openGroups().filter(g => myIds.has(g.id));
  });

  /** Open groups the current user is NOT part of. */
  readonly exploreGroups = computed(() => {
    if (this.lockedLocation) return [];
    const uid = this.currentUid();
    const myIds = uid ? this.groupsService.myGroupIds() : new Set<string>();
    return this.groupsService.openGroups().filter(g => !myIds.has(g.id));
  });

  // Form fields
  formTitle        = '';
  formDate         = '';
  formTime         = '08:00';
  formDescription  = '';
  formDifficulty: 'easy' | 'moderate' | 'hard' = 'easy';
  formMaxMembers   = '';
  formPrice        = '';
  formSpotSlug     = '';
  formSpotTitle    = '';
  formSpotLat      = 0;
  formSpotLon      = 0;
  formMeetingPoint: MeetingPoint | null = null;

  get groups(): Group[] {
    const all = this.lockedLocation ? this.spotGroups() : this.groupsService.openGroups();
    const uid = this.authService.user()?.id;
    const score = (g: Group) => {
      if (g.leaderIsAdmin)                      return 3; // admin first
      if (g.leaderIsGuide)                      return 2; // guide second
      if (uid && g.leaderId === uid)             return 1; // own group third
      return 0;
    };
    return [...all].sort((a, b) => score(b) - score(a));
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

    // Handle location pin clicks — auto-fill spot only when actively picking
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc: Location | null) => {
        if (!this.pickingSpot() || !loc) return;
        this.selectSpot(loc);
      });
  }

  ngOnDestroy(): void {
    this.bridge.pickMode.set(false);
    this.bridge.meetingPointMarker.set(null);
    this.bridge.spotPickMode.set(false);
    if (this.formSpotSlug) {
      this.bridge.selectedLocation.set(null);
      this.bridge.closeLocation();
    }
  }

  // ── Create form ───────────────────────────────────────────────────────────

  openCreateForm(): void {
    if (!this.authService.isLoggedIn()) {
      this.authService.openLoginModal();
      return;
    }
    if (this.userDataService.levelInfo().id < 1) {
      this.formError.set('Level up first — explore the map for your first 24 hours to create groups.');
      this.showCreateForm.set(true);
      return;
    }
    if (this.lockedLocation) {
      this.formSpotSlug  = this.lockedLocation.slug;
      this.formSpotTitle = this.lockedLocation.title;
      this.formSpotLat   = this.lockedLocation.lat;
      this.formSpotLon   = this.lockedLocation.lon;
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

  // ── Spot picker ───────────────────────────────────────────────────────────

  startPickingSpot(): void {
    this.pickingSpot.set(true);
    this.bridge.spotPickMode.set(true);
    this.bridge.panel.minimize();
  }

  cancelPickSpot(): void {
    this.pickingSpot.set(false);
    this.bridge.spotPickMode.set(false);
    this.bridge.panel.expand();
  }

  /** Called when a location pin is tapped while in spot-pick mode. */
  selectSpot(loc: Location): void {
    this.formSpotSlug  = loc.slug;
    this.formSpotTitle = loc.title;
    this.formSpotLat   = loc.lat;
    this.formSpotLon   = loc.lon;
    this.pickingSpot.set(false);
    this.bridge.spotPickMode.set(false);
    this.bridge.selectedLocation.set(loc); // show location route on map
    this.bridge.panel.expand();
  }

  clearSpot(): void {
    this.formSpotSlug  = '';
    this.formSpotTitle = '';
    this.formSpotLat   = 0;
    this.formSpotLon   = 0;
    this.pickingSpot.set(false);
    this.bridge.spotPickMode.set(false);
    this.bridge.selectedLocation.set(null);
    this.bridge.closeLocation();
  }

  // ── Meeting point ─────────────────────────────────────────────────────────

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

  // ── Submit ────────────────────────────────────────────────────────────────

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

    const cap = this.maxMembersCap();
    let maxMembers = this.formMaxMembers ? parseInt(this.formMaxMembers, 10) : null;
    if (cap !== null) {
      maxMembers = maxMembers !== null ? Math.min(maxMembers, cap) : cap;
    }

    const priceVal = this.canSetPrice() && this.formPrice ? parseFloat(this.formPrice) : null;
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
      maxMembers,
      price:        priceVal !== null && !isNaN(priceVal) && priceVal > 0 ? priceVal : null,
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

  get cancelledPastGroups(): Group[] {
    return this.pastGroups.filter(g => g.status === GroupStatus.Cancelled);
  }

  // ── Single archive ────────────────────────────────────────────────────────

  confirmArchive(id: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.confirmingArchiveId.set(id);
  }

  async executeArchive(): Promise<void> {
    const id = this.confirmingArchiveId();
    if (!id) return;
    await this.groupsService.archiveGroup(id);
    this.confirmingArchiveId.set(null);
  }

  // ── Bulk archive ──────────────────────────────────────────────────────────

  isPastBulkSelected(id: string): boolean {
    return this.pastBulkSelected().has(id);
  }

  togglePastBulkSelect(id: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.pastBulkSelected.update(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  selectAllPastCancelled(): void {
    this.pastBulkSelected.set(new Set(this.cancelledPastGroups.map(g => g.id)));
  }

  exitPastBulk(): void {
    this.pastBulkMode.set(false);
    this.pastBulkSelected.set(new Set());
    this.confirmingBulkArchive.set(false);
  }

  async executeBulkArchive(): Promise<void> {
    const ids = [...this.pastBulkSelected()];
    await Promise.all(ids.map(id => this.groupsService.archiveGroup(id)));
    this.exitPastBulk();
  }

  private resetForm(): void {
    this.formTitle        = '';
    this.formDate         = '';
    this.formTime         = '08:00';
    this.formDescription  = '';
    this.formDifficulty   = 'easy';
    this.formMaxMembers   = '';
    this.formPrice        = '';
    this.formMeetingPoint = null;
    this.pendingMeetingPoint.set(null);
    this.pickingMeetingPoint.set(false);
    if (!this.lockedLocation) {
      this.clearSpot();
    }
  }
}
