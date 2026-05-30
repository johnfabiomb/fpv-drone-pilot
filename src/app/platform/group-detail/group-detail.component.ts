import {
  AfterViewChecked, Component, DestroyRef, ElementRef, HostListener,
  OnDestroy, OnInit, PLATFORM_ID, ViewChild, computed, effect, inject, signal,
} from '@angular/core';
import { CommonModule, DOCUMENT, DatePipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar.component';
import { ConfirmPopupComponent } from '../../components/confirm-popup/confirm-popup.component';
import { MemberAvatarsComponent } from '../../components/member-avatars/member-avatars.component';
import { AppModalComponent } from '../../components/app-modal/app-modal.component';
import { ShareButtonComponent } from '../../components/share-button/share-button.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { GroupsService } from '../../shared/services/groups.service';
import { AuthService } from '../../shared/services/auth.service';
import { UserDataService } from '../../shared/services/user-data.service';
import { SeoService } from '../../shared/services/seo.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { CooldownError, GroupFullError, GroupMember, GroupMessage, LeaderMustTransferError, MeetingPoint, SpamMutedError, UpdateGroupPayload } from '../../shared/models/group.model';
import { Location } from '../../shared/models';
import { normalizeForSearch } from '../../shared/utils/location-filter.util';

import { locations } from '../../../assets/locations.json';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, PanelShellComponent, UserAvatarComponent, ConfirmPopupComponent, MemberAvatarsComponent, AppModalComponent, ShareButtonComponent],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.scss',
})
export class GroupDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesEnd')       private messagesEnd!: ElementRef<HTMLDivElement>;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;

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

  // ── UI state ──────────────────────────────────────────────────────────────
  readonly actionError      = signal<string | null>(null);
  readonly actionBusy       = signal(false);
  readonly showTransfer      = signal(false);
  readonly confirmingAction  = signal<'leave' | 'cancel' | 'explore' | null>(null);

  // Member management (leader / admin)
  readonly memberActionMenu       = signal<string | null>(null); // uid of member with open ⋮ menu
  readonly confirmingMemberAction = signal<{ action: 'remove' | 'make-leader' | 'mute' | 'unmute'; member: GroupMember } | null>(null);

  // Bulk selection
  readonly bulkSelectMode        = signal(false);
  private  bulkSelectedUids      = signal<Set<string>>(new Set());
  readonly bulkCount             = computed(() => this.bulkSelectedUids().size);
  readonly confirmingBulkAction  = signal<'mute' | 'remove' | null>(null);
  readonly messageText      = signal('');
  readonly sendingMessage   = signal(false);
  readonly hoveredMessageId  = signal<string | null>(null);
  readonly pinnedExpanded    = signal(false);
  readonly confirmingPinMsg  = signal<GroupMessage | null>(null);
  readonly cooldownSecs     = signal(0);
  readonly chatError        = signal<string | null>(null);
  readonly autoJoining        = signal(false);
  readonly showMeetingModal   = signal(false);

  // ── Edit form state ───────────────────────────────────────────────────────
  readonly showEditForm        = signal(false);
  readonly editError           = signal<string | null>(null);
  readonly editBusy            = signal(false);
  readonly editPickingPoint       = signal(false);
  readonly editPendingMeetingPoint = signal<{ lat: number; lon: number } | null>(null);
  readonly editSpotResults     = signal<{ slug: string; title: string; lat: number; lon: number }[]>([]);
  editTitle        = '';
  editDate         = '';
  editTime         = '';
  editDescription  = '';
  editDifficulty: 'easy' | 'moderate' | 'hard' = 'easy';
  editMaxMembers   = '';
  editMeetingPoint: MeetingPoint | null = null;
  editSpotSearch   = '';
  editSpotSlug     = '';
  editSpotTitle    = '';
  editSpotLat      = 0;
  editSpotLon      = 0;

  private readonly allSpots = (locations as Location[]).map(l => ({
    slug: l.slug, title: l.title, lat: l.lat, lon: l.lon,
  }));

  readonly showMembersModal = signal(false);
  readonly activeTab = signal<'info' | 'chat'>('info');

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
  // Exploring groups are exempt — the leader is still out; they'll cancel or it'll be cleaned up later.
  private autoCompleted = false;
  private readonly _autoCompleteEffect = effect(() => {
    const group = this.groupsService.detailGroup();
    if (!group || this.autoCompleted) return;
    if ((group.status === 'open' || group.status === 'full')
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
    // currentUserIsMember is already set by the 1-doc listener — safe to read
    const already = this.groupsService.currentUserIsMember();
    if (!user || !group || !this.pendingAutoJoin || already) return;
    if (group.status === 'open') {
      this.pendingAutoJoin = false;
      queueMicrotask(() => this.doAutoJoin());
    }
  });

  // Auto-heal memberCount drift: when the leader opens the full member list and
  // the denormalized count doesn't match the subcollection, silently correct it.
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

  // Reactively sync the meeting point marker. Hides it when exploring has started
  // (the group is moving — no fixed meeting point), and respects the edit form's
  // temporary state by skipping when the form is open.
  private readonly _meetingPointEffect = effect(() => {
    const group = this.groupsService.detailGroup();
    if (!group || this.showEditForm()) return;
    const show = !!group.meetingPoint && (group.status === 'open' || group.status === 'full');
    this.bridge.meetingPointMarker.set(show ? group.meetingPoint : null);
  });

  // Scroll rules:
  // - Switching TO the chat tab → always scroll to bottom (first view should show latest)
  // - New message arrives while already on chat → scroll only if user was near the bottom
  //   (so reading history isn't interrupted)
  // Tracks messages() only (live window) — load-earlier updates earlierMessages(), not
  // messages(), so pagination never triggers an unwanted scroll.
  private _wasOnChat = false;
  private readonly _chatScrollEffect = effect(() => {
    this.groupsService.messages(); // track live message window
    const onChat = this.activeTab() === 'chat';
    const justSwitched = onChat && !this._wasOnChat;
    this._wasOnChat = onChat;

    if (!onChat) return;
    if (justSwitched || this.isNearBottom()) {
      this.shouldScrollToBottom = true;
    }
  });

  private isNearBottom(): boolean {
    const el = this.messagesContainer?.nativeElement;
    if (!el) return true; // not yet in DOM → default to scroll on first render
    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  }

  private groupId = '';
  private shouldScrollToBottom = false;
  private cooldownTimer: ReturnType<typeof setInterval> | null = null;

  // ── Computed helpers ──────────────────────────────────────────────────────
  get currentUser() { return this.authService.user(); }
  get group()       { return this.groupsService.detailGroup(); }
  get members()     { return this.groupsService.detailMembers(); }
  get messages()    { return this.groupsService.allMessages(); }

  get isLeader(): boolean {
    return !!this.currentUser && this.group?.leaderId === this.currentUser.uid;
  }

  // Derived from the 1-doc member listener — no subcollection needed
  get isMember(): boolean {
    return !!this.currentUser && this.groupsService.currentUserIsMember();
  }

  get canJoin(): boolean {
    const g = this.group;
    if (!g) return false;
    return g.status === 'open' && !this.isMember && !this.isLeader;
  }

  get canEdit(): boolean {
    const g = this.group;
    if (!g || g.status === 'cancelled' || g.status === 'completed') return false;
    return this.isLeader || this.userDataService.isAdmin();
  }

  get canStartExploring(): boolean {
    const g = this.group;
    if (!g || (g.status !== 'open' && g.status !== 'full')) return false;
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

    this.bridge.coordPicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ lat, lon }) => {
        this.editPendingMeetingPoint.set({ lat, lon });
        this.bridge.meetingPointMarker.set({ lat, lon }); // preview on map
        this.bridge.pickMode.set(false);
        this.editPickingPoint.set(false);
        this.bridge.panel.expand();
      });

    this.bridge.meetingPointClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.showMeetingModal.set(true));

    if (this.isMember) this.groupsService.updateLastActive(this.groupId);

    this.analytics.pageView(window.location.href, 'Group Detail');
  }

  ngOnDestroy(): void {
    this.groupsService.stopDetailListener();
    this.bridge.meetingPointMarker.set(null);
    this.bridge.pickMode.set(false);
    this.clearCooldownTimer();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
      this.shouldScrollToBottom = false;
    }
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (!document.hidden && this.isMember) {
      this.groupsService.updateLastActive(this.groupId);
    }
  }

  // ── Actions ───────────────────────────────────────────────────────────────
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
    if (this.confirmingAction() === 'leave')   this.leave();
    if (this.confirmingAction() === 'cancel')  this.cancelGroup();
    if (this.confirmingAction() === 'explore') this.startExploring();
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
    const g = this.group;
    if (!g) return;
    const d = g.date.toDate();
    this.editTitle        = g.title;
    this.editDate         = d.toISOString().split('T')[0];
    this.editTime         = g.time;
    this.editDescription  = g.description;
    this.editDifficulty   = g.difficulty;
    this.editMaxMembers   = g.maxMembers != null ? String(g.maxMembers) : '';
    this.editMeetingPoint = g.meetingPoint ?? null;
    this.editSpotSlug     = g.spotSlug   ?? '';
    this.editSpotTitle    = g.spotTitle  ?? '';
    this.editSpotLat      = g.spotLat    ?? 0;
    this.editSpotLon      = g.spotLon    ?? 0;
    this.editSpotSearch   = g.spotTitle  ?? '';
    this.editSpotResults.set([]);
    this.editError.set(null);
    this.showEditForm.set(true);
    if (this.editMeetingPoint) {
      this.bridge.meetingPointMarker.set(this.editMeetingPoint);
    }
  }

  cancelEdit(): void {
    this.showEditForm.set(false);
    this.editError.set(null);
    if (this.editPickingPoint()) this.bridge.panel.expand();
    this.bridge.pickMode.set(false);
    this.editPickingPoint.set(false);
    // Restore the saved meeting point (not the draft one)
    this.bridge.meetingPointMarker.set(this.group?.meetingPoint ?? null);
  }

  async submitEdit(): Promise<void> {
    const g = this.group;
    if (!g) return;

    if (!this.editTitle.trim() || !this.editDate) {
      this.editError.set('Title and date are required.');
      return;
    }

    const dateObj = new Date(this.editDate + 'T' + this.editTime);
    if (isNaN(dateObj.getTime())) {
      this.editError.set('Invalid date or time.');
      return;
    }

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
      meetingPoint: this.editMeetingPoint,
    };

    this.editError.set(null);
    this.editBusy.set(true);
    try {
      await this.groupsService.updateGroup(this.groupId, payload);
      this.showEditForm.set(false);
      this.bridge.pickMode.set(false);
      this.editPickingPoint.set(false);
      // Re-sync map only if there's still a spot selected
      if (this.editSpotSlug) {
        this.locationApplied = false;
        this.showSpotOnMap();
      }
    } catch (e) {
      this.editError.set(e instanceof Error ? e.message : 'Could not save changes.');
    } finally {
      this.editBusy.set(false);
    }
  }

  startEditPickingPoint(): void {
    this.editPickingPoint.set(true);
    this.bridge.pickMode.set(true);
    this.bridge.panel.minimize();
  }

  clearEditMeetingPoint(): void {
    if (this.editPickingPoint()) this.bridge.panel.expand();
    this.editMeetingPoint = null;
    this.editPendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(null);
    this.editPickingPoint.set(false);
    this.bridge.pickMode.set(false);
  }

  confirmEditMeetingPoint(): void {
    const p = this.editPendingMeetingPoint();
    if (!p) return;
    this.editMeetingPoint = p;
    this.editPendingMeetingPoint.set(null);
  }

  retryEditMeetingPoint(): void {
    this.editPendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(this.editMeetingPoint); // restore previous
    this.startEditPickingPoint();
  }

  onEditSpotInput(): void {
    const q = normalizeForSearch(this.editSpotSearch.trim());
    if (!q) { this.editSpotResults.set([]); return; }
    this.editSpotResults.set(
      this.allSpots.filter(s => normalizeForSearch(s.title).includes(q)).slice(0, 6),
    );
  }

  selectEditSpot(spot: { slug: string; title: string; lat: number; lon: number }): void {
    this.editSpotSlug   = spot.slug;
    this.editSpotTitle  = spot.title;
    this.editSpotLat    = spot.lat;
    this.editSpotLon    = spot.lon;
    this.editSpotSearch = spot.title;
    this.editSpotResults.set([]);
  }

  // Opens the login modal and marks that the user wants to join on sign-in
  openJoinLogin(): void {
    this.pendingAutoJoin = true;
    this.authService.openLoginModal();
  }

  closeMembersModal(): void {
    this.showMembersModal.set(false);
    this.exitBulkMode();
  }

  async sendMessage(): Promise<void> {
    const text = this.messageText().trim();
    if (!text || this.sendingMessage() || this.cooldownSecs() > 0 || this.isMuted) return;

    this.chatError.set(null);
    this.sendingMessage.set(true);
    try {
      await this.groupsService.sendMessage(this.groupId, text);
      this.messageText.set('');
      this.shouldScrollToBottom = true;
      this.startCooldown(5);
    } catch (e) {
      if (e instanceof CooldownError) {
        this.startCooldown(e.secondsLeft);
      } else if (e instanceof SpamMutedError) {
        this.chatError.set(`You've been muted for ${e.minutesLeft} min${e.minutesLeft === 1 ? '' : 's'} for sending too many messages.`);
      } else {
        this.chatError.set('Could not send message. Check your connection and try again.');
        console.error('[sendMessage]', e);
      }
    } finally {
      this.sendingMessage.set(false);
    }
  }

  onMessageKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
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

  private startCooldown(seconds: number): void {
    this.cooldownSecs.set(seconds);
    this.clearCooldownTimer();
    this.cooldownTimer = setInterval(() => {
      const remaining = this.cooldownSecs() - 1;
      if (remaining <= 0) {
        this.cooldownSecs.set(0);
        this.clearCooldownTimer();
      } else {
        this.cooldownSecs.set(remaining);
      }
    }, 1000);
  }

  private clearCooldownTimer(): void {
    if (this.cooldownTimer !== null) {
      clearInterval(this.cooldownTimer);
      this.cooldownTimer = null;
    }
  }

  formatLastActive(ts: unknown): string {
    if (!ts) return '';
    return GroupsService.formatLastActive(ts as Parameters<typeof GroupsService.formatLastActive>[0]);
  }

  get nonLeaderMembers() {
    return this.members.filter(m => m.uid !== this.group?.leaderId);
  }

  get canManageMembers(): boolean {
    const g = this.group;
    if (!g || g.status === 'cancelled' || g.status === 'completed') return false;
    return this.isLeader || this.userDataService.isAdmin();
  }

  isMemberMuted(m: GroupMember): boolean {
    return !!m.mutedUntil && m.mutedUntil.toMillis() > Date.now();
  }

  toggleMemberMenu(uid: string, event: MouseEvent): void {
    event.stopPropagation();
    this.memberActionMenu.set(this.memberActionMenu() === uid ? null : uid);
  }

  pickMemberAction(action: 'remove' | 'make-leader' | 'mute' | 'unmute', member: GroupMember, event: MouseEvent): void {
    event.stopPropagation();
    this.memberActionMenu.set(null);

    // make-leader and unmute stay as single-confirm actions
    if (action === 'make-leader' || action === 'unmute') {
      this.confirmingMemberAction.set({ action, member });
      return;
    }

    // mute / remove: enter bulk mode with this member pre-selected
    // so the leader can add more before confirming — single writeBatch regardless
    const s = new Set(this.bulkSelectedUids());
    s.add(member.uid);
    this.bulkSelectedUids.set(s);
    this.bulkSelectMode.set(true);
  }

  async executeMemberAction(): Promise<void> {
    const target = this.confirmingMemberAction();
    if (!target) return;
    this.confirmingMemberAction.set(null);
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      const { action, member } = target;
      if (action === 'remove')      await this.groupsService.removeMember(this.groupId, member.uid);
      if (action === 'make-leader') await this.groupsService.transferOwnership(this.groupId, member.uid);
      if (action === 'mute')        await this.groupsService.muteMember(this.groupId, member.uid, 60);
      if (action === 'unmute')      await this.groupsService.unmuteMember(this.groupId, member.uid);
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Action failed.');
    } finally {
      this.actionBusy.set(false);
    }
  }

  @HostListener('document:click')
  closeMemberMenu(): void {
    if (this.memberActionMenu()) this.memberActionMenu.set(null);
  }

  // ── Bulk selection ────────────────────────────────────────────────────────

  get bulkEligibleMembers(): GroupMember[] {
    return this.members.filter(m => m.uid !== this.group?.leaderId && m.uid !== this.currentUser?.uid);
  }

  isBulkSelected(uid: string): boolean {
    return this.bulkSelectedUids().has(uid);
  }

  toggleBulkSelect(uid: string): void {
    const s = new Set(this.bulkSelectedUids());
    s.has(uid) ? s.delete(uid) : s.add(uid);
    this.bulkSelectedUids.set(s);
  }

  selectAllMembers(): void {
    this.bulkSelectedUids.set(new Set(this.bulkEligibleMembers.map(m => m.uid)));
  }

  exitBulkMode(): void {
    this.bulkSelectMode.set(false);
    this.bulkSelectedUids.set(new Set());
    this.confirmingBulkAction.set(null);
  }

  async executeBulkAction(): Promise<void> {
    const action = this.confirmingBulkAction();
    const uids   = [...this.bulkSelectedUids()];
    if (!action || !uids.length) return;
    this.confirmingBulkAction.set(null);
    this.actionBusy.set(true);
    try {
      if (action === 'remove') await this.groupsService.bulkRemoveMembers(this.groupId, uids);
      if (action === 'mute')   await this.groupsService.bulkMuteMembers(this.groupId, uids, 60);
      this.exitBulkMode();
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Action failed.');
    } finally {
      this.actionBusy.set(false);
    }
  }

  loadEarlier(): void {
    this.groupsService.loadEarlierMessages(this.groupId);
  }

  showSpotOnMap(): void {
    const group = this.group;
    if (!group) return;
    const loc = (locations as Location[]).find(l => l.slug === group.spotSlug) ?? null;
    if (loc) this.bridge.selectedLocation.set(loc);
  }

  memberRoleLabel(m: GroupMember): string {
    return m.role === 'leader' ? '👑 Group leader' : 'Member';
  }

  setTab(tab: 'info' | 'chat'): void {
    this.activeTab.set(tab);
    const base = window.location.pathname;
    window.history.replaceState(null, '', tab === 'chat' ? `${base}?tab=chat` : base);
  }

  // ── Pinned message ────────────────────────────────────────────────────────

  get canPin(): boolean {
    return this.isLeader || this.userDataService.isAdmin();
  }

  async pinMessage(msg: GroupMessage): Promise<void> {
    try {
      await this.groupsService.pinMessage(this.groupId, msg);
      this.pinnedExpanded.set(false);
    } catch { /* silent */ }
  }

  async unpinMessage(): Promise<void> {
    try { await this.groupsService.unpinMessage(this.groupId); }
    catch { /* silent */ }
  }
}
