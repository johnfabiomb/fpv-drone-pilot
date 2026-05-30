import { Injectable, computed, effect, inject, signal } from '@angular/core';
import {
  Firestore,
  QueryDocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AnalyticsService } from './analytics.service';
import { UserDataService } from './user-data.service';
import {
  AlreadyHasActiveGroupError,
  CooldownError,
  CreateGroupPayload,
  Group,
  GroupFullError,
  GroupMember,
  GroupMessage,
  LeaderMustTransferError,
  SpamMutedError,
  UpdateGroupPayload,
} from '../models/group.model';
import { Provider } from '../models';
import { locations } from '../../../assets/locations.json';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private readonly firestore        = inject(Firestore);
  private readonly authService      = inject(AuthService);
  private readonly analytics        = inject(AnalyticsService);
  private readonly userDataService  = inject(UserDataService);

  // ── Public signals ────────────────────────────────────────────────────────
  readonly groups             = signal<Group[]>([]);
  readonly loading            = signal(false);
  readonly detailGroup        = signal<Group | null>(null);
  readonly detailMembers      = signal<GroupMember[]>([]);
  readonly messages           = signal<GroupMessage[]>([]);

  // Older messages loaded on demand (prepended to messages() for display)
  private readonly earlierMessages = signal<GroupMessage[]>([]);
  // Oldest snapshot doc from the real-time window — used as cursor for pagination
  private messagesOldestDoc: QueryDocumentSnapshot | null = null;
  readonly hasMoreMessages  = signal(false);
  readonly loadingEarlier   = signal(false);
  // Combined view: older pages + real-time window, in chronological order
  readonly allMessages = computed(() => [...this.earlierMessages(), ...this.messages()]);

  // Current user's own member doc — 1-doc listener, always active while on detail page.
  // Used for isMember + mutedUntil without loading the full subcollection.
  readonly currentUserMember  = signal<GroupMember | null>(null);
  readonly currentUserIsMember = computed(() => !!this.currentUserMember());

  // ── Rate limiting (in-memory per session) ────────────────────────────────
  private messageSentAt: number[] = [];

  // ── Computed ──────────────────────────────────────────────────────────────
  // Groups visible on the list/map: open/full (future), or actively exploring
  readonly openGroups = computed(() =>
    this.groups().filter(g =>
      g.status === 'exploring' ||
      ((g.status === 'open' || g.status === 'full') && !GroupsService.isGroupPast(g)),
    )
  );

  // Past groups from the last 7 days — for the history section in Explore Together
  readonly recentPastGroups = computed(() => {
    const weekAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return this.groups()
      .filter(g => {
        const isPast = g.status === 'completed' || g.status === 'cancelled' ||
                       ((g.status === 'open' || g.status === 'full') && GroupsService.isGroupPast(g));
        return isPast && g.date.toMillis() >= weekAgoMs;
      })
      .sort((a, b) => b.date.toMillis() - a.date.toMillis());
  });

  // Derived from the 1-doc listener, not the full subcollection
  readonly mutedUntil = computed<Timestamp | null>(() =>
    this.currentUserMember()?.mutedUntil ?? null
  );

  readonly groupsAsProviderPins = computed<Provider[]>(() =>
    this.openGroups()
      .filter(g => g.spotLat !== null && g.spotLon !== null)
      .map(g => {
        const loc = locations.find(l => l.slug === g.spotSlug);
        return {
          id:             g.id,
          name:           g.title,
          tagline:        `${g.memberCount} explorer${g.memberCount === 1 ? '' : 's'}`,
          category:       'group',
          lat:            g.spotLat!,
          lon:            g.spotLon!,
          showOnMap:      true,
          mapLabel:       'Group',
          coverImage:     loc?.thumb ?? loc?.img ?? undefined,
          pinBorderColor: '#F4A922',
        };
      }),
  );

  // ── Listener state ────────────────────────────────────────────────────────
  private groupsUnsub:          (() => void) | null = null;
  private detailUnsub:          (() => void) | null = null;
  private currentMemberUnsub:   (() => void) | null = null; // 1-doc, always-on
  private membersUnsub:         (() => void) | null = null; // full subcollection, on-demand
  private messagesUnsub:        (() => void) | null = null;
  private currentDetailId       = '';
  // Tracks the last group loaded — lets us preserve detailGroup+messages
  // signals when the user navigates back to the same group (blank-free UX).
  private cachedDetailId        = '';

  constructor() {
    // Firebase auth resolves asynchronously. If startDetailListener() fired before
    // the auth state was ready, the 1-doc member listener was skipped.
    // This effect re-starts it whenever the user becomes available.
    effect(() => {
      const user = this.authService.user();
      if (user && this.currentDetailId) {
        this.startCurrentUserMemberListener(this.currentDetailId);
      } else if (!user) {
        this.currentMemberUnsub?.();
        this.currentMemberUnsub = null;
        this.currentUserMember.set(null);
      }
    });
  }

  // ── Groups list listener ──────────────────────────────────────────────────
  startGroupsListener(): void {
    this.stopGroupsListener();
    this.loading.set(true);

    // Only fetch groups from the last 7 days onward — excludes all stale history.
    // openGroups + recentPastGroups computed filters narrow further client-side.
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const q = query(
      collection(this.firestore, 'groups'),
      where('date', '>=', Timestamp.fromDate(weekAgo)),
      orderBy('date', 'asc'),
    );

    this.groupsUnsub = onSnapshot(q, snapshot => {
      this.groups.set(
        snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Group)),
      );
      this.loading.set(false);
    }, () => this.loading.set(false));
  }

  stopGroupsListener(): void {
    this.groupsUnsub?.();
    this.groupsUnsub = null;
  }

  // ── Group detail listener ─────────────────────────────────────────────────
  // Starts the group doc + messages listeners, plus a 1-doc listener on the
  // current user's member document (isMember + mutedUntil, 1 read instead of N).
  // The full members subcollection is loaded separately, on demand.
  startDetailListener(id: string): void {
    // Clear stale data only when switching to a *different* group.
    // Same group (e.g. back-navigation) keeps signals so the panel is instant.
    if (id !== this.cachedDetailId) {
      this.detailGroup.set(null);
      this.messages.set([]);
    }
    this.cachedDetailId = id;
    this.stopDetailListener();
    this.currentDetailId = id;

    // Group document
    this.detailUnsub = onSnapshot(doc(this.firestore, 'groups', id), snap => {
      this.detailGroup.set(snap.exists() ? ({ id: snap.id, ...snap.data() } as Group) : null);
    });

    // Messages — latest 30 only (desc + reverse = chronological).
    // Older pages are loaded on demand via loadEarlierMessages().
    this.messagesUnsub = onSnapshot(
      query(
        collection(this.firestore, 'groups', id, 'messages'),
        orderBy('createdAt', 'desc'),
        limit(30),
      ),
      snap => {
        // Track the oldest doc in the current window as the pagination cursor.
        // Only update when no earlier pages have been loaded yet — prevents the
        // cursor from drifting forward when new messages push docs out of the window.
        if (this.earlierMessages().length === 0) {
          this.messagesOldestDoc = snap.docs[snap.docs.length - 1] ?? null;
          this.hasMoreMessages.set(snap.docs.length >= 30);
        }
        this.messages.set(
          snap.docs
            .map(d => ({ id: d.id, ...d.data() } as GroupMessage))
            .reverse(),
        );
      },
    );

    // Current user's member doc — 1 read, not the full subcollection
    this.startCurrentUserMemberListener(id);
  }

  stopDetailListener(): void {
    this.detailUnsub?.();
    this.messagesUnsub?.();
    this.currentMemberUnsub?.();
    this.stopMembersListener();

    this.detailUnsub        = null;
    this.messagesUnsub      = null;
    this.currentMemberUnsub = null;
    this.currentDetailId    = '';

    // detailGroup + messages are intentionally kept — they serve as an instant
    // cache when the user navigates back to the same group. They are cleared in
    // startDetailListener() when navigating to a *different* group.
    this.detailMembers.set([]);
    this.currentUserMember.set(null);
    this.earlierMessages.set([]);
    this.messagesOldestDoc = null;
    this.hasMoreMessages.set(false);
    this.messageSentAt = [];
  }

  // ── Message pagination ────────────────────────────────────────────────────
  async loadEarlierMessages(groupId: string): Promise<void> {
    if (!this.messagesOldestDoc || this.loadingEarlier()) return;
    this.loadingEarlier.set(true);
    try {
      const snap = await getDocs(query(
        collection(this.firestore, 'groups', groupId, 'messages'),
        orderBy('createdAt', 'desc'),
        startAfter(this.messagesOldestDoc),
        limit(30),
      ));
      if (snap.empty) {
        this.hasMoreMessages.set(false);
        return;
      }
      // Advance the cursor to the oldest doc of this page
      this.messagesOldestDoc = snap.docs[snap.docs.length - 1];
      const older = snap.docs
        .map(d => ({ id: d.id, ...d.data() } as GroupMessage))
        .reverse();
      this.earlierMessages.set([...older, ...this.earlierMessages()]);
      this.hasMoreMessages.set(snap.docs.length >= 30);
    } finally {
      this.loadingEarlier.set(false);
    }
  }

  // ── Members subcollection — on-demand ─────────────────────────────────────
  // Call when the user expands the member list or initiates a leader transfer.
  // Stops automatically in stopDetailListener.
  startMembersListener(id: string): void {
    if (this.membersUnsub) return; // already running
    if (!this.authService.user()) return; // Firestore rules deny guests anyway
    this.membersUnsub = onSnapshot(
      query(collection(this.firestore, 'groups', id, 'members'), orderBy('joinedAt', 'asc')),
      snap => {
        this.detailMembers.set(snap.docs.map(d => d.data() as GroupMember));
      },
    );
  }

  stopMembersListener(): void {
    this.membersUnsub?.();
    this.membersUnsub = null;
    this.detailMembers.set([]);
  }

  // ── Current user's 1-doc member listener ─────────────────────────────────
  private startCurrentUserMemberListener(groupId: string): void {
    this.currentMemberUnsub?.();
    const user = this.authService.user();
    if (!user) {
      this.currentUserMember.set(null);
      return;
    }
    this.currentMemberUnsub = onSnapshot(
      doc(this.firestore, 'groups', groupId, 'members', user.uid),
      snap => {
        this.currentUserMember.set(snap.exists() ? (snap.data() as GroupMember) : null);
      },
    );
  }

  // ── Mutations ─────────────────────────────────────────────────────────────

  async createGroup(data: CreateGroupPayload): Promise<string> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    // Must be at least 24 hours in the future
    const groupDateTime = new Date(data.date);
    const [h, m] = data.time.split(':').map(Number);
    groupDateTime.setHours(h, m, 0, 0);
    if (groupDateTime.getTime() < Date.now() + 24 * 60 * 60 * 1000) {
      throw new Error('Group must be scheduled at least 24 hours in advance.');
    }

    // Leader can only have 1 active group at a time
    const hasActive = this.openGroups().some(g => g.leaderId === user.uid);
    if (hasActive) throw new AlreadyHasActiveGroupError();

    const ref = await addDoc(collection(this.firestore, 'groups'), {
      title:          data.title,
      spotSlug:       data.spotSlug,
      spotTitle:      data.spotTitle,
      spotLat:        data.spotLat,
      spotLon:        data.spotLon,
      date:           Timestamp.fromDate(data.date),
      time:           data.time,
      description:    data.description,
      difficulty:     data.difficulty,
      maxMembers:     data.maxMembers,
      status:         'open',
      leaderId:       user.uid,
      leaderName:     user.displayName ?? 'Explorer',
      leaderPhoto:    user.photoURL ?? '',
      leaderIsAdmin:  this.userDataService.isAdmin(),
      meetingPoint:   data.meetingPoint ?? null,
      memberCount:    1,
      memberPreviews: [{ uid: user.uid, displayName: user.displayName ?? 'Explorer', photoURL: user.photoURL ?? '' }],
      createdAt:      serverTimestamp(),
      updatedAt:      serverTimestamp(),
    });

    await setDoc(doc(this.firestore, 'groups', ref.id, 'members', user.uid), {
      uid:         user.uid,
      displayName: user.displayName ?? 'Explorer',
      photoURL:    user.photoURL ?? '',
      role:        'leader',
      joinedAt:    serverTimestamp(),
      lastActive:  serverTimestamp(),
    });

    this.analytics.event('group_created', { spot: data.spotSlug, difficulty: data.difficulty });
    return ref.id;
  }

  async updateGroup(groupId: string, data: UpdateGroupPayload): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const groupDateTime = new Date(data.date);
    const [h, m] = data.time.split(':').map(Number);
    groupDateTime.setHours(h, m, 0, 0);
    if (groupDateTime.getTime() < Date.now()) {
      throw new Error('Group date must be in the future.');
    }

    // Detect changes before writing so we can post activity messages after
    const old = this.detailGroup();
    const changes: string[] = [];
    if (old) {
      const who = user.displayName ?? 'Someone';
      if (old.title !== data.title) {
        changes.push(`${who} changed the group name to "${data.title}"`);
      }
      const oldSpot = old.spotTitle ?? null;
      const newSpot = data.spotTitle ?? null;
      if (oldSpot !== newSpot) {
        changes.push(newSpot
          ? `${who} set the location to ${newSpot}`
          : `${who} removed the location`);
      }
      const oldDt = old.date.toDate();
      const [oh, om] = old.time.split(':').map(Number);
      oldDt.setHours(oh, om, 0, 0);
      if (oldDt.getTime() !== groupDateTime.getTime()) {
        changes.push(`${who} rescheduled to ${GroupsService.formatDateShort(groupDateTime)} at ${data.time}`);
      }
      if ((old.description ?? '') !== (data.description ?? '')) {
        changes.push(`${who} updated the description`);
      }
      if (old.difficulty !== data.difficulty) {
        changes.push(`${who} changed difficulty to ${data.difficulty}`);
      }
      if (old.maxMembers !== data.maxMembers) {
        changes.push(data.maxMembers !== null
          ? `${who} set the member limit to ${data.maxMembers}`
          : `${who} removed the member limit`);
      }
    }

    await updateDoc(doc(this.firestore, 'groups', groupId), {
      title:        data.title,
      spotSlug:     data.spotSlug,
      spotTitle:    data.spotTitle,
      spotLat:      data.spotLat,
      spotLon:      data.spotLon,
      date:         Timestamp.fromDate(groupDateTime),
      time:         data.time,
      description:  data.description,
      difficulty:   data.difficulty,
      maxMembers:   data.maxMembers,
      meetingPoint: data.meetingPoint ?? null,
      updatedAt:    serverTimestamp(),
    });

    for (const text of changes) {
      this.addSystemMessage(groupId, text).catch(() => {});
    }

    this.analytics.event('group_updated', { groupId });
  }

  private getMemberName(targetUid: string): string {
    return (
      this.detailMembers().find(m => m.uid === targetUid)?.displayName ??
      this.detailGroup()?.memberPreviews.find(p => p.uid === targetUid)?.displayName ??
      'a member'
    );
  }

  private async addSystemMessage(groupId: string, text: string): Promise<void> {
    const user = this.authService.user();
    if (!user) return;
    await addDoc(collection(this.firestore, 'groups', groupId, 'messages'), {
      uid:         user.uid,
      displayName: user.displayName ?? 'Someone',
      photoURL:    user.photoURL ?? '',
      text,
      isSystem:    true,
      createdAt:   serverTimestamp(),
    });
  }

  async joinGroup(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const groupRef  = doc(this.firestore, 'groups', groupId);
    const memberRef = doc(this.firestore, 'groups', groupId, 'members', user.uid);

    await runTransaction(this.firestore, async tx => {
      const groupSnap = await tx.get(groupRef);
      if (!groupSnap.exists()) throw new Error('Group not found');

      const group = groupSnap.data() as Group;
      if (group.status === 'cancelled' || group.status === 'completed' || group.status === 'exploring') {
        throw new Error('This group is no longer accepting members.');
      }
      if (group.maxMembers !== null && group.memberCount >= group.maxMembers) {
        throw new GroupFullError();
      }

      const newCount    = group.memberCount + 1;
      const newPreviews = group.memberPreviews.length < 5
        ? [...group.memberPreviews, { uid: user.uid, displayName: user.displayName ?? 'Explorer', photoURL: user.photoURL ?? '' }]
        : group.memberPreviews;
      const newStatus   = group.maxMembers !== null && newCount >= group.maxMembers ? 'full' : 'open';

      tx.update(groupRef, {
        memberCount:    newCount,
        memberPreviews: newPreviews,
        status:         newStatus,
        updatedAt:      serverTimestamp(),
      });

      tx.set(memberRef, {
        uid:         user.uid,
        displayName: user.displayName ?? 'Explorer',
        photoURL:    user.photoURL ?? '',
        role:        'member',
        joinedAt:    serverTimestamp(),
        lastActive:  serverTimestamp(),
      });
    });

    this.analytics.event('group_joined', { group_id: groupId, spot: this.detailGroup()?.spotSlug });
  }

  // Uses group.memberCount + group.memberPreviews (both on the group doc) so
  // the full members subcollection is never needed just for leaving.
  async leaveGroup(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const group = this.detailGroup();
    if (!group) throw new Error('Group not found');

    if (group.leaderId === user.uid && group.memberCount > 1) {
      throw new LeaderMustTransferError();
    }

    const groupRef  = doc(this.firestore, 'groups', groupId);
    const memberRef = doc(this.firestore, 'groups', groupId, 'members', user.uid);

    if (group.memberCount <= 1) {
      const batch = writeBatch(this.firestore);
      batch.delete(memberRef);
      batch.delete(groupRef);
      await batch.commit();
    } else {
      const newCount    = group.memberCount - 1;
      const newPreviews = group.memberPreviews.filter(p => p.uid !== user.uid);
      const batch = writeBatch(this.firestore);
      batch.update(groupRef, { memberCount: newCount, memberPreviews: newPreviews, updatedAt: serverTimestamp() });
      batch.delete(memberRef);
      await batch.commit();
    }

    this.analytics.event('group_left', { group_id: groupId });
  }

  async assignLeader(groupId: string, targetUid: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    // Use loaded members if available; otherwise fetch just the target doc (1 read)
    let target = this.detailMembers().find(m => m.uid === targetUid);
    if (!target) {
      const snap = await getDoc(doc(this.firestore, 'groups', groupId, 'members', targetUid));
      if (!snap.exists()) throw new Error('Member not found');
      target = snap.data() as GroupMember;
    }

    const groupRef     = doc(this.firestore, 'groups', groupId);
    const oldLeaderRef = doc(this.firestore, 'groups', groupId, 'members', user.uid);
    const newLeaderRef = doc(this.firestore, 'groups', groupId, 'members', targetUid);

    // Check if the incoming leader has admin role so their GM badge shows for all viewers
    const targetUserSnap = await getDoc(doc(this.firestore, 'users', targetUid));
    const targetIsAdmin  = targetUserSnap.exists() && targetUserSnap.data()['role'] === 'admin';

    const batch = writeBatch(this.firestore);
    batch.update(oldLeaderRef, { role: 'member' });
    batch.update(newLeaderRef, { role: 'leader' });
    batch.update(groupRef, {
      leaderId:     targetUid,
      leaderName:   target.displayName,
      leaderPhoto:  target.photoURL,
      leaderIsAdmin: targetIsAdmin,
      updatedAt:    serverTimestamp(),
    });
    await batch.commit();

    this.addSystemMessage(groupId,
      `${user.displayName ?? 'Someone'} made ${target.displayName} the group leader`,
    ).catch(() => {});
  }

  async transferOwnership(groupId: string, targetUid: string): Promise<void> {
    await this.assignLeader(groupId, targetUid);
  }

  async removeMember(groupId: string, targetUid: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const group = this.detailGroup();
    if (!group) throw new Error('Group not found');
    if (group.leaderId === targetUid) throw new Error('Cannot remove the group leader.');

    const targetName = this.getMemberName(targetUid);
    const groupRef   = doc(this.firestore, 'groups', groupId);
    const memberRef  = doc(this.firestore, 'groups', groupId, 'members', targetUid);

    const newCount    = group.memberCount - 1;
    const newPreviews = group.memberPreviews.filter(p => p.uid !== targetUid);

    const batch = writeBatch(this.firestore);
    batch.update(groupRef, { memberCount: newCount, memberPreviews: newPreviews, updatedAt: serverTimestamp() });
    batch.delete(memberRef);
    await batch.commit();

    this.addSystemMessage(groupId,
      `${user.displayName ?? 'Someone'} removed ${targetName} from the group`,
    ).catch(() => {});
    this.analytics.event('group_member_removed', { group_id: groupId });
  }

  async muteMember(groupId: string, targetUid: string, minutes: number): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const targetName = this.getMemberName(targetUid);
    const muteUntil  = Timestamp.fromMillis(Date.now() + minutes * 60_000);
    await updateDoc(doc(this.firestore, 'groups', groupId, 'members', targetUid), {
      mutedUntil: muteUntil,
    });

    const label = minutes >= 60 ? `${minutes / 60}h` : `${minutes} min`;
    this.addSystemMessage(groupId,
      `${user.displayName ?? 'Someone'} muted ${targetName} for ${label}`,
    ).catch(() => {});
    this.analytics.event('group_member_muted', { group_id: groupId, minutes });
  }

  async unmuteMember(groupId: string, targetUid: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const targetName = this.getMemberName(targetUid);
    await updateDoc(doc(this.firestore, 'groups', groupId, 'members', targetUid), {
      mutedUntil: null,
    });

    this.addSystemMessage(groupId,
      `${user.displayName ?? 'Someone'} unmuted ${targetName}`,
    ).catch(() => {});
  }

  async bulkRemoveMembers(groupId: string, uids: string[]): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');
    const group = this.detailGroup();
    if (!group) throw new Error('Group not found');

    const toRemove = uids.filter(uid => uid !== group.leaderId);
    if (!toRemove.length) return;

    const batch = writeBatch(this.firestore);
    const groupRef = doc(this.firestore, 'groups', groupId);
    batch.update(groupRef, {
      memberCount:    group.memberCount - toRemove.length,
      memberPreviews: group.memberPreviews.filter(p => !toRemove.includes(p.uid)),
      updatedAt:      serverTimestamp(),
    });
    for (const uid of toRemove) {
      batch.delete(doc(this.firestore, 'groups', groupId, 'members', uid));
    }
    await batch.commit();

    const who  = user.displayName ?? 'Someone';
    const text = toRemove.length === 1
      ? `${who} removed ${this.getMemberName(toRemove[0])} from the group`
      : `${who} removed ${toRemove.length} members from the group`;
    this.addSystemMessage(groupId, text).catch(() => {});
    this.analytics.event('group_bulk_removed', { group_id: groupId, count: toRemove.length });
  }

  async bulkMuteMembers(groupId: string, uids: string[], minutes: number): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const muteUntil = Timestamp.fromMillis(Date.now() + minutes * 60_000);
    const batch = writeBatch(this.firestore);
    for (const uid of uids) {
      batch.update(doc(this.firestore, 'groups', groupId, 'members', uid), { mutedUntil: muteUntil });
    }
    await batch.commit();

    const who   = user.displayName ?? 'Someone';
    const label = minutes >= 60 ? `${minutes / 60}h` : `${minutes} min`;
    const text  = uids.length === 1
      ? `${who} muted ${this.getMemberName(uids[0])} for ${label}`
      : `${who} muted ${uids.length} members for ${label}`;
    this.addSystemMessage(groupId, text).catch(() => {});
    this.analytics.event('group_bulk_muted', { group_id: groupId, count: uids.length, minutes });
  }

  async startExploring(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');
    await updateDoc(doc(this.firestore, 'groups', groupId), {
      status:    'exploring',
      updatedAt: serverTimestamp(),
    });
    this.analytics.event('group_exploring_started', { groupId });
  }

  async cancelGroup(groupId: string): Promise<void> {
    await updateDoc(doc(this.firestore, 'groups', groupId), {
      status:    'cancelled',
      updatedAt: serverTimestamp(),
    });
  }

  async completeGroup(groupId: string): Promise<void> {
    await updateDoc(doc(this.firestore, 'groups', groupId), {
      status:    'completed',
      updatedAt: serverTimestamp(),
    });
  }

  // Silently re-syncs memberCount + memberPreviews when the denormalized count
  // drifts from the actual subcollection (e.g. members removed via console).
  async correctMemberCount(groupId: string, members: GroupMember[]): Promise<void> {
    const previews = members.slice(0, 5).map(m => ({
      uid: m.uid, displayName: m.displayName, photoURL: m.photoURL,
    }));
    await updateDoc(doc(this.firestore, 'groups', groupId), {
      memberCount:    members.length,
      memberPreviews: previews,
      updatedAt:      serverTimestamp(),
    });
  }

  async sendMessage(groupId: string, text: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');
    if (!text.trim()) return;

    const now = Date.now();

    const mutedUntil = this.mutedUntil();
    if (mutedUntil && mutedUntil.toMillis() > now) {
      throw new SpamMutedError(Math.ceil((mutedUntil.toMillis() - now) / 60_000));
    }

    this.messageSentAt = this.messageSentAt.filter(t => now - t < 60_000);

    const lastSent = this.messageSentAt.at(-1);
    if (lastSent !== undefined && now - lastSent < 5_000) {
      throw new CooldownError(Math.ceil((5_000 - (now - lastSent)) / 1_000));
    }

    if (this.messageSentAt.length >= 8) {
      const muteUntilTs = Timestamp.fromMillis(now + 10 * 60_000);
      await updateDoc(doc(this.firestore, 'groups', groupId, 'members', user.uid), {
        mutedUntil: muteUntilTs,
      });
      throw new SpamMutedError(10);
    }

    await addDoc(collection(this.firestore, 'groups', groupId, 'messages'), {
      uid:         user.uid,
      displayName: user.displayName ?? 'Explorer',
      photoURL:    user.photoURL ?? '',
      text:        text.trim().substring(0, 500),
      createdAt:   serverTimestamp(),
      level:       this.userDataService.levelInfo().id,
      isAdmin:     this.userDataService.isAdmin(),
    });

    this.messageSentAt.push(now);
    this.analytics.event('group_message_sent', { group_id: groupId });
  }

  async pinMessage(groupId: string, msg: import('../models/group.model').GroupMessage): Promise<void> {
    if (!this.authService.user()) throw new Error('Not authenticated');
    await updateDoc(doc(this.firestore, 'groups', groupId), {
      pinnedMessage: {
        id:         msg.id,
        text:       msg.text,
        authorName: msg.displayName,
        pinnedAt:   serverTimestamp(),
      },
      updatedAt: serverTimestamp(),
    });
  }

  async unpinMessage(groupId: string): Promise<void> {
    if (!this.authService.user()) throw new Error('Not authenticated');
    await updateDoc(doc(this.firestore, 'groups', groupId), {
      pinnedMessage: null,
      updatedAt:     serverTimestamp(),
    });
  }

  async updateLastActive(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) return;
    // Skip write if lastActive was updated within the last 5 minutes
    const member = this.currentUserMember();
    if (member?.lastActive) {
      const elapsed = Date.now() - member.lastActive.toMillis();
      if (elapsed < 5 * 60 * 1000) return;
    }
    try {
      await updateDoc(
        doc(this.firestore, 'groups', groupId, 'members', user.uid),
        { lastActive: serverTimestamp() },
      );
    } catch {
      // Silent — presence update should never break the UI
    }
  }

  // ── One-shot spot query (for location detail widget) ──────────────────────
  async fetchGroupsForSpot(slug: string): Promise<Group[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const snap = await getDocs(
      query(
        collection(this.firestore, 'groups'),
        where('spotSlug', '==', slug),
        where('status', 'in', ['open', 'full', 'exploring']),
        where('date', '>=', Timestamp.fromDate(today)),
        orderBy('date', 'asc'),
      ),
    );
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Group));
  }

  // ── One-time migration ────────────────────────────────────────────────────
  // Backfills leaderIsAdmin on all existing group docs.
  // Safe to call multiple times — idempotent.
  async migrateLeaderIsAdmin(): Promise<number> {
    const snap = await getDocs(collection(this.firestore, 'groups'));
    let updated = 0;
    await Promise.all(snap.docs.map(async groupDoc => {
      const leaderId = (groupDoc.data() as { leaderId: string }).leaderId;
      const userSnap = await getDoc(doc(this.firestore, 'users', leaderId));
      const isAdmin  = userSnap.exists() && userSnap.data()['role'] === 'admin';
      await updateDoc(groupDoc.ref, { leaderIsAdmin: isAdmin });
      updated++;
    }));
    return updated;
  }

  // ── Utilities ─────────────────────────────────────────────────────────────

  // True when the group's start time + 24h grace period has passed
  // (keeps the group active while members are still out exploring)
  static isGroupPast(g: Group): boolean {
    const dt = g.date.toDate();
    const [h, m] = g.time.split(':').map(Number);
    dt.setHours(h, m, 0, 0);
    return dt.getTime() + 24 * 60 * 60 * 1000 < Date.now();
  }

  static formatDateShort(d: Date): string {
    const days   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  }

  static formatLastActive(ts: Timestamp): 'Active today' | 'Active this week' | 'Inactive' {
    const now    = Date.now();
    const msAgo  = now - ts.toMillis();
    const dayMs  = 86_400_000;
    const weekMs = 7 * dayMs;

    if (msAgo < dayMs)  return 'Active today';
    if (msAgo < weekMs) return 'Active this week';
    return 'Inactive';
  }
}
