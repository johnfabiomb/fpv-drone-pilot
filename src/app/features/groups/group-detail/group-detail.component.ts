import {
  Component, DestroyRef, HostListener, OnDestroy, OnInit, PLATFORM_ID,
  computed, effect, inject, signal,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PanelShellComponent } from '@ui/panel-shell/panel-shell.component';
import { UserAvatarComponent } from '@ui/user-avatar/user-avatar.component';
import { ConfirmPopupComponent } from '@ui/confirm-popup/confirm-popup.component';
import { MemberAvatarsComponent } from '@features/groups/member-avatars/member-avatars.component';
import { AppModalComponent } from '@ui/modal/app-modal.component';
import { ShareButtonComponent } from '@ui/share-button/share-button.component';
import { GroupChatComponent } from '@features/groups/group-detail/group-chat/group-chat.component';
import { GroupMembersModalComponent } from '@features/groups/group-detail/group-members-modal/group-members-modal.component';
import { GroupEditFormComponent } from '@features/groups/group-detail/group-edit-form/group-edit-form.component';
import { MapBridgeService } from '@core/services/map-bridge.service';
import { GroupsService } from '@core/services/groups.service';
import { AuthService } from '@core/services/auth.service';
import { UserDataService } from '@core/services/user-data.service';
import { SeoService } from '@core/services/seo.service';
import { AnalyticsService } from '@core/services/analytics.service';
import { GroupFullError, GroupMember, LeaderMustTransferError } from '@core/models/group.model';
import { GroupStatus, Location } from '@core/models';

import { locations } from '@assets/locations.json';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [
    CommonModule,
    PanelShellComponent, UserAvatarComponent, ConfirmPopupComponent,
    MemberAvatarsComponent, AppModalComponent, ShareButtonComponent,
    GroupChatComponent, GroupMembersModalComponent, GroupEditFormComponent,
  ],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.scss',
})
export class GroupDetailComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document   = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route      = inject(ActivatedRoute);
  readonly router             = inject(Router);
  private readonly seo        = inject(SeoService);
  private readonly analytics  = inject(AnalyticsService);
  readonly bridge             = inject(MapBridgeService);
  readonly groupsService      = inject(GroupsService);
  readonly authService        = inject(AuthService);
  readonly userDataService    = inject(UserDataService);

  readonly groupsUnlocked = computed(() => this.userDataService.groupsUnlocked());

  // ── UI state ──────────────────────────────────────────────────────────────
  readonly actionError     = signal<string | null>(null);
  readonly actionBusy      = signal(false);
  readonly showTransfer    = signal(false);
  readonly confirmingAction = signal<'leave' | 'cancel' | 'explore' | 'complete' | null>(null);
  readonly autoJoining     = signal(false);
  readonly showMeetingModal = signal(false);
  readonly showMembersModal = signal(false);
  readonly showEditForm     = signal(false);
  readonly activeTab        = signal<'info' | 'chat'>('info');
  readonly unreadCount      = signal(0);

  private lastSeenMessageCount = 0;
  private messagesInitialized  = false;

  // Set to true when a non-logged-in user clicks "Sign in to join"
  private pendingAutoJoin = false;

  // Start/stop the full members subcollection listener when the modal is open
  // or the transfer-ownership flow is active.
  private readonly _membersListenerEffect = effect(() => {
    const needFullList = this.showMembersModal() || this.showTransfer();
    if (!this.groupId) return;
    if (needFullList) {
      this.groupsService.startMembersListener(this.groupId);
    } else {
      this.groupsService.stopMembersListener();
    }
  });

  // When the leader views a group whose time has passed (and it's not exploring), auto-complete it.
  private autoCompleted = false;
  private readonly _autoCompleteEffect = effect(() => {
    const group = this.groupsService.detailGroup();
    if (!group || this.autoCompleted) return;
    if ((group.status === GroupStatus.Open || group.status === GroupStatus.Full)
      && GroupsService.isGroupPast(group)
      && this.isLeader) {
      this.autoCompleted = true;
      queueMicrotask(() => this.groupsService.completeGroup(group.id).catch(() => {}));
    }
  });

  // Auto-join when a non-logged-in user signs in after clicking "Sign in to join"
  private readonly _autoJoinEffect = effect(() => {
    const user    = this.authService.user();
    const group   = this.groupsService.detailGroup();
    const already = this.groupsService.currentUserIsMember();
    if (!user || !group || !this.pendingAutoJoin || already) return;
    if (group.status === GroupStatus.Open) {
      this.pendingAutoJoin = false;
      queueMicrotask(() => this.doAutoJoin());
    }
  });

  // Auto-heal memberCount drift when the leader opens the full member list.
  private readonly _memberCountHealEffect = effect(() => {
    const members = this.groupsService.detailMembers();
    const group   = this.groupsService.detailGroup();
    if (!group || members.length === 0 || !this.isLeader) return;
    if (members.length !== group.memberCount) {
      queueMicrotask(() =>
        this.groupsService.correctMemberCount(group.id, members).catch(() => {})
      );
    }
  });

  // Fit the map to the spot once the group doc first loads.
  private locationApplied = false;
  private readonly _spotLocationEffect = effect(() => {
    const group = this.groupsService.detailGroup();
    if (!group || this.locationApplied || !group.spotSlug) return;
    const loc = (locations as Location[]).find(l => l.slug === group.spotSlug) ?? null;
    if (!loc) return;
    this.locationApplied = true;
    this.bridge.selectedLocation.set(loc);
  });

  // Reactively sync the meeting point marker — skips while edit form is open (it manages the marker).
  private readonly _meetingPointEffect = effect(() => {
    const group = this.groupsService.detailGroup();
    if (!group || this.showEditForm()) return;
    const show = !!group.meetingPoint && group.status !== GroupStatus.Cancelled && group.status !== GroupStatus.Completed;
    this.bridge.meetingPointMarker.set(show ? group.meetingPoint : null);
  });

  // Track new messages arriving while the user is on the Details tab.
  private readonly _unreadEffect = effect(() => {
    const count  = this.groupsService.messages().length;
    const onChat = this.activeTab() === 'chat';
    if (!this.messagesInitialized) {
      if (count > 0) {
        this.lastSeenMessageCount = count;
        this.messagesInitialized  = true;
      }
      return;
    }
    if (onChat) {
      this.lastSeenMessageCount = count;
      this.unreadCount.set(0);
    } else {
      this.unreadCount.set(Math.max(0, count - this.lastSeenMessageCount));
    }
  });

  groupId = '';

  // ── Computed helpers ──────────────────────────────────────────────────────
  get currentUser() { return this.authService.user(); }
  get group()       { return this.groupsService.detailGroup(); }
  get members()     { return this.groupsService.detailMembers(); }

  get isLeader(): boolean {
    return !!this.currentUser && this.group?.leaderId === this.currentUser.id;
  }

  get isMember(): boolean {
    return !!this.currentUser && this.groupsService.currentUserIsMember();
  }

  get canJoin(): boolean {
    const g = this.group;
    if (!g) return false;
    return g.status === GroupStatus.Open && !this.isMember && !this.isLeader;
  }

  get canEdit(): boolean {
    const g = this.group;
    if (!g || g.status === GroupStatus.Cancelled || g.status === GroupStatus.Completed) return false;
    return this.isLeader || this.userDataService.isAdmin();
  }

  get canStartExploring(): boolean {
    const g = this.group;
    if (!g || (g.status !== GroupStatus.Open && g.status !== GroupStatus.Full)) return false;
    return this.isLeader || this.userDataService.isAdmin();
  }

  get canPin(): boolean {
    return this.isLeader || this.userDataService.isAdmin();
  }

  get shareUrl(): string {
    if (!isPlatformBrowser(this.platformId)) return '';
    return `${this.document.location.origin}/malta/groups/${this.groupId}`;
  }

  get meetingPointMapsUrl(): string {
    const mp = this.group?.meetingPoint;
    if (!mp) return '';
    return `https://www.google.com/maps?q=${mp.lat},${mp.lon}`;
  }

  get isMuted(): boolean {
    const ts = this.groupsService.mutedUntil();
    return !!ts && ts.toMillis() > Date.now();
  }

  get mutedMinutesLeft(): number {
    const ts = this.groupsService.mutedUntil();
    if (!ts) return 0;
    return Math.max(1, Math.ceil((ts.toMillis() - Date.now()) / 60_000));
  }

  get canManageMembers(): boolean {
    const g = this.group;
    if (!g || g.status === GroupStatus.Cancelled || g.status === GroupStatus.Completed) return false;
    return this.isLeader || this.userDataService.isAdmin();
  }

  get nonLeaderMembers(): GroupMember[] {
    return this.members.filter(m => m.uid !== this.group?.leaderId);
  }

  // Returns the ms timestamp when the post-group chat window closes:
  //   null  → active group (no close time)
  //   0     → cancelled (archived immediately)
  //   N     → completedAt + 24 h
  get chatClosesAt(): number | null {
    const g = this.group;
    if (!g) return null;
    if (g.status === GroupStatus.Cancelled) return 0;
    if (g.status === GroupStatus.Completed) {
      // Fall back to updatedAt for groups completed before completedAt field was added.
      const base = g.completedAt ?? g.updatedAt;
      return base ? base.toMillis() + 43_200_000 : null;
    }
    return null;
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.groupId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.groupId) { this.router.navigate(['/malta/groups']); return; }

    if (this.route.snapshot.queryParamMap.get('tab') === 'chat') {
      this.activeTab.set('chat');
    }

    this.groupsService.startDetailListener(this.groupId);

    this.bridge.enterPanelMode([], { label: 'Back to groups' });

    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/malta/groups']));

    this.bridge.meetingPointClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.showMeetingModal.set(true));

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loc => { if (loc) this.router.navigate(['/malta/locations', loc.slug]); });

    if (this.isMember) this.groupsService.updateLastActive(this.groupId);

    this.analytics.pageView(window.location.href, 'Group Detail');
  }

  ngOnDestroy(): void {
    this.groupsService.stopDetailListener();
    this.bridge.meetingPointMarker.set(null);
    this.bridge.pickMode.set(false);
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (!document.hidden && this.isMember) {
      this.groupsService.updateLastActive(this.groupId);
    }
  }

  // ── Group actions ─────────────────────────────────────────────────────────
  async join(): Promise<void> {
    if (!this.authService.isLoggedIn()) { this.authService.openLoginModal(); return; }
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.joinGroup(this.groupId);
      await this.groupsService.updateLastActive(this.groupId);
    } catch (e) {
      if (e instanceof GroupFullError) {
        this.actionError.set('This group is now full.');
      } else {
        this.actionError.set(e instanceof Error ? e.message : 'Could not join group.');
      }
    } finally {
      this.actionBusy.set(false);
    }
  }

  async leave(): Promise<void> {
    this.confirmingAction.set(null);
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.leaveGroup(this.groupId);
      this.router.navigate(['/malta/groups']);
    } catch (e) {
      if (e instanceof LeaderMustTransferError) {
        this.showTransfer.set(true);
        this.actionError.set('Transfer leadership before leaving.');
      } else {
        this.actionError.set(e instanceof Error ? e.message : 'Could not leave group.');
      }
    } finally {
      this.actionBusy.set(false);
    }
  }

  async transferTo(uid: string): Promise<void> {
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.transferOwnership(this.groupId, uid);
      this.showTransfer.set(false);
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Transfer failed.');
    } finally {
      this.actionBusy.set(false);
    }
  }

  async cancelGroup(): Promise<void> {
    this.confirmingAction.set(null);
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.cancelGroup(this.groupId);
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Could not cancel group.');
    } finally {
      this.actionBusy.set(false);
    }
  }

  executeConfirmedAction(): void {
    if (this.confirmingAction() === 'leave')    this.leave();
    if (this.confirmingAction() === 'cancel')   this.cancelGroup();
    if (this.confirmingAction() === 'explore')  this.startExploring();
    if (this.confirmingAction() === 'complete') this.completeGroup();
  }

  async completeGroup(): Promise<void> {
    this.confirmingAction.set(null);
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.completeGroup(this.groupId);
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Could not complete group.');
    } finally {
      this.actionBusy.set(false);
    }
  }

  async startExploring(): Promise<void> {
    this.confirmingAction.set(null);
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.startExploring(this.groupId);
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Could not start exploring.');
    } finally {
      this.actionBusy.set(false);
    }
  }

  openEdit(): void {
    this.showEditForm.set(true);
  }

  onEditSaved(spotSlug: string | null): void {
    this.showEditForm.set(false);
    if (spotSlug) {
      this.locationApplied = false; // let _spotLocationEffect re-apply when Firestore propagates
    }
  }

  onEditCancelled(): void {
    this.showEditForm.set(false);
  }

  openJoinLogin(): void {
    this.pendingAutoJoin = true;
    this.authService.openLoginModal();
  }

  showSpotOnMap(): void {
    const group = this.group;
    if (!group) return;
    const loc = (locations as Location[]).find(l => l.slug === group.spotSlug) ?? null;
    if (loc) this.bridge.selectedLocation.set(loc);
  }

  setTab(tab: 'info' | 'chat'): void {
    if (tab === 'chat') {
      this.lastSeenMessageCount = this.groupsService.messages().length;
      this.unreadCount.set(0);
    }
    this.activeTab.set(tab);
    const base = window.location.pathname;
    window.history.replaceState(null, '', tab === 'chat' ? `${base}?tab=chat` : base);
  }

  private async doAutoJoin(): Promise<void> {
    this.autoJoining.set(true);
    try {
      await this.groupsService.joinGroup(this.groupId);
      await this.groupsService.updateLastActive(this.groupId);
    } catch { /* silent — the group state updates reactively */ } finally {
      this.autoJoining.set(false);
    }
  }
}
