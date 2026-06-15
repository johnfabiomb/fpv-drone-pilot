import {
  Component, DestroyRef, EventEmitter, Input, OnDestroy, OnInit, Output, computed, inject, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MapBridgeService } from '@map/core/services/map-bridge.service';
import { GroupsService } from '@map/core/services/groups.service';
import { UserDataService } from '@map/core/services/user-data.service';
import { Group, MeetingPoint, UpdateGroupPayload } from '@map/core/models/group.model';
import { Location } from '@map/core/models';
import { normalizeForSearch } from '@map/core/utils/location-filter.util';

import { locations } from '@assets/locations.json';

@Component({
  selector: 'app-group-edit-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-edit-form.component.html',
  styleUrl: './group-edit-form.component.scss',
})
export class GroupEditFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) group!: Group;
  @Input({ required: true }) groupId!: string;

  @Output() saved     = new EventEmitter<string | null>();
  @Output() cancelled = new EventEmitter<void>();

  private readonly bridge          = inject(MapBridgeService);
  private readonly groupsService   = inject(GroupsService);
  private readonly userDataService = inject(UserDataService);
  private readonly destroyRef      = inject(DestroyRef);

  readonly canSetPrice = computed(() => this.userDataService.canSetPrice());

  readonly editError            = signal<string | null>(null);
  readonly editBusy             = signal(false);
  readonly editPickingPoint     = signal(false);
  readonly editPendingMeetingPoint = signal<{ lat: number; lon: number } | null>(null);
  readonly editSpotResults      = signal<{ slug: string; title: string; lat: number; lon: number }[]>([]);

  editTitle        = '';
  editDate         = '';
  editTime         = '';
  editDescription  = '';
  editDifficulty: 'easy' | 'moderate' | 'hard' = 'easy';
  editMaxMembers   = '';
  editPrice        = '';
  editMeetingPoint: MeetingPoint | null = null;
  editSpotSearch   = '';
  editSpotSlug     = '';
  editSpotTitle    = '';
  editSpotLat      = 0;
  editSpotLon      = 0;

  private readonly allSpots = (locations as Location[]).map(l => ({
    slug: l.slug, title: l.title, lat: l.lat, lon: l.lon,
  }));

  ngOnInit(): void {
    const g = this.group;
    const d = g.date.toDate();
    this.editTitle        = g.title;
    this.editDate         = d.toISOString().split('T')[0];
    this.editTime         = g.time;
    this.editDescription  = g.description;
    this.editDifficulty   = g.difficulty;
    this.editMaxMembers   = g.maxMembers != null ? String(g.maxMembers) : '';
    this.editPrice        = g.price != null ? String(g.price) : '';
    this.editMeetingPoint = g.meetingPoint ?? null;
    this.editSpotSlug     = g.spotSlug   ?? '';
    this.editSpotTitle    = g.spotTitle  ?? '';
    this.editSpotLat      = g.spotLat    ?? 0;
    this.editSpotLon      = g.spotLon    ?? 0;
    this.editSpotSearch   = g.spotTitle  ?? '';
    this.editSpotResults.set([]);
    this.editError.set(null);

    if (this.editMeetingPoint) {
      this.bridge.meetingPointMarker.set(this.editMeetingPoint);
    }

    this.bridge.coordPicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ lat, lon }) => {
        this.editPendingMeetingPoint.set({ lat, lon });
        this.bridge.meetingPointMarker.set({ lat, lon });
        this.bridge.pickMode.set(false);
        this.editPickingPoint.set(false);
        this.bridge.panel.expand();
      });
  }

  ngOnDestroy(): void {
    if (this.editPickingPoint()) {
      this.bridge.pickMode.set(false);
      this.bridge.panel.expand();
    }
  }

  cancel(): void {
    if (this.editPickingPoint()) this.bridge.panel.expand();
    this.bridge.pickMode.set(false);
    this.editPickingPoint.set(false);
    this.cancelled.emit();
  }

  async submit(): Promise<void> {
    if (!this.editTitle.trim() || !this.editDate) {
      this.editError.set('Title and date are required.');
      return;
    }

    const dateObj = new Date(this.editDate + 'T' + this.editTime);
    if (isNaN(dateObj.getTime())) {
      this.editError.set('Invalid date or time.');
      return;
    }

    const priceVal = this.canSetPrice() && this.editPrice ? parseFloat(this.editPrice) : null;
    const payload: UpdateGroupPayload = {
      title:        this.editTitle.trim(),
      spotSlug:     this.editSpotSlug  || null,
      spotTitle:    this.editSpotTitle || null,
      spotLat:      this.editSpotSlug  ? this.editSpotLat : null,
      spotLon:      this.editSpotSlug  ? this.editSpotLon : null,
      date:         dateObj,
      time:         this.editTime,
      description:  this.editDescription.trim(),
      difficulty:   this.editDifficulty,
      maxMembers:   this.editMaxMembers ? parseInt(this.editMaxMembers, 10) : null,
      price:        priceVal !== null && !isNaN(priceVal) && priceVal > 0 ? priceVal : null,
      meetingPoint: this.editMeetingPoint,
    };

    this.editError.set(null);
    this.editBusy.set(true);
    try {
      await this.groupsService.updateGroup(this.groupId, payload);
      this.bridge.pickMode.set(false);
      this.editPickingPoint.set(false);
      this.saved.emit(this.editSpotSlug || null);
    } catch (e) {
      this.editError.set(e instanceof Error ? e.message : 'Could not save changes.');
    } finally {
      this.editBusy.set(false);
    }
  }

  startPickingPoint(): void {
    this.editPickingPoint.set(true);
    this.bridge.pickMode.set(true);
    this.bridge.panel.minimize();
  }

  clearMeetingPoint(): void {
    if (this.editPickingPoint()) this.bridge.panel.expand();
    this.editMeetingPoint = null;
    this.editPendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(null);
    this.editPickingPoint.set(false);
    this.bridge.pickMode.set(false);
  }

  confirmPendingPoint(): void {
    const p = this.editPendingMeetingPoint();
    if (!p) return;
    this.editMeetingPoint = p;
    this.editPendingMeetingPoint.set(null);
  }

  retryPoint(): void {
    this.editPendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(this.editMeetingPoint);
    this.startPickingPoint();
  }

  onSpotInput(): void {
    const q = normalizeForSearch(this.editSpotSearch.trim());
    if (!q) { this.editSpotResults.set([]); return; }
    this.editSpotResults.set(
      this.allSpots.filter(s => normalizeForSearch(s.title).includes(q)).slice(0, 6),
    );
  }

  selectSpot(spot: { slug: string; title: string; lat: number; lon: number }): void {
    this.editSpotSlug   = spot.slug;
    this.editSpotTitle  = spot.title;
    this.editSpotLat    = spot.lat;
    this.editSpotLon    = spot.lon;
    this.editSpotSearch = spot.title;
    this.editSpotResults.set([]);
  }
}
