import { Injectable, computed, inject, signal } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AnalyticsService } from './analytics.service';
import {
  CreateGroupPayload,
  Group,
  GroupFullError,
  GroupMember,
  GroupMessage,
  LeaderMustTransferError,
} from '../models/group.model';
import { Provider } from '../models';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private readonly firestore   = inject(Firestore);
  private readonly authService = inject(AuthService);
  private readonly analytics   = inject(AnalyticsService);

  // ── Public signals ────────────────────────────────────────────────────────
  readonly groups        = signal<Group[]>([]);
  readonly loading       = signal(false);
  readonly detailGroup   = signal<Group | null>(null);
  readonly detailMembers = signal<GroupMember[]>([]);
  readonly messages      = signal<GroupMessage[]>([]);

  // ── Computed ──────────────────────────────────────────────────────────────
  readonly openGroups = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.groups().filter(g =>
      (g.status === 'open' || g.status === 'full') &&
      g.date.toDate() >= today,
    );
  });

  readonly groupsAsProviderPins = computed<Provider[]>(() =>
    this.openGroups().map(g => ({
      id:        g.id,
      name:      g.title,
      tagline:   `${g.memberCount} explorer${g.memberCount === 1 ? '' : 's'}`,
      emoji:     '👥',
      category:  'group',
      lat:       g.spotLat,
      lon:       g.spotLon,
      showOnMap: true,
      mapLabel:  '👥 Group',
    })),
  );

  // ── Listener state ────────────────────────────────────────────────────────
  private groupsUnsub:  (() => void) | null = null;
  private detailUnsub:  (() => void) | null = null;
  private membersUnsub: (() => void) | null = null;
  private messagesUnsub:(() => void) | null = null;

  // ── Groups list listener ──────────────────────────────────────────────────
  startGroupsListener(): void {
    this.stopGroupsListener();
    this.loading.set(true);

    const q = query(
      collection(this.firestore, 'groups'),
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
  startDetailListener(id: string): void {
    this.stopDetailListener();

    // Group doc
    this.detailUnsub = onSnapshot(doc(this.firestore, 'groups', id), snap => {
      this.detailGroup.set(snap.exists() ? ({ id: snap.id, ...snap.data() } as Group) : null);
    });

    // Members subcollection
    this.membersUnsub = onSnapshot(
      query(collection(this.firestore, 'groups', id, 'members'), orderBy('joinedAt', 'asc')),
      snap => {
        this.detailMembers.set(snap.docs.map(d => d.data() as GroupMember));
      },
    );

    // Messages — last 100, ordered ascending so they display top-to-bottom
    this.messagesUnsub = onSnapshot(
      query(
        collection(this.firestore, 'groups', id, 'messages'),
        orderBy('createdAt', 'asc'),
        // Firestore doesn't support limitToLast in onSnapshot without cursor;
        // we order asc and slice client-side to keep it simple at this scale
      ),
      snap => {
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as GroupMessage));
        this.messages.set(all.slice(-100));
      },
    );
  }

  stopDetailListener(): void {
    this.detailUnsub?.();
    this.membersUnsub?.();
    this.messagesUnsub?.();
    this.detailUnsub  = null;
    this.membersUnsub = null;
    this.messagesUnsub = null;
    this.detailGroup.set(null);
    this.detailMembers.set([]);
    this.messages.set([]);
  }

  // ── Mutations ─────────────────────────────────────────────────────────────

  async createGroup(data: CreateGroupPayload): Promise<string> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

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
      memberCount:    1,
      memberPreviews: [{ uid: user.uid, displayName: user.displayName ?? 'Explorer', photoURL: user.photoURL ?? '' }],
      createdAt:      serverTimestamp(),
      updatedAt:      serverTimestamp(),
    });

    // Add leader as member
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

  async joinGroup(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const groupRef  = doc(this.firestore, 'groups', groupId);
    const memberRef = doc(this.firestore, 'groups', groupId, 'members', user.uid);

    await runTransaction(this.firestore, async tx => {
      const groupSnap = await tx.get(groupRef);
      if (!groupSnap.exists()) throw new Error('Group not found');

      const group = groupSnap.data() as Group;
      if (group.status === 'cancelled' || group.status === 'completed') {
        throw new Error('This group is no longer active.');
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

  async leaveGroup(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const group   = this.detailGroup();
    const members = this.detailMembers();

    if (group?.leaderId === user.uid && members.length > 1) {
      throw new LeaderMustTransferError();
    }

    const groupRef  = doc(this.firestore, 'groups', groupId);
    const memberRef = doc(this.firestore, 'groups', groupId, 'members', user.uid);

    if (members.length <= 1) {
      // Last member — delete the group
      const batch = writeBatch(this.firestore);
      batch.delete(memberRef);
      batch.delete(groupRef);
      await batch.commit();
    } else {
      const newCount    = (group?.memberCount ?? 1) - 1;
      const newPreviews = (group?.memberPreviews ?? []).filter(p => p.uid !== user.uid);
      const batch = writeBatch(this.firestore);
      batch.update(groupRef, { memberCount: newCount, memberPreviews: newPreviews, updatedAt: serverTimestamp() });
      batch.delete(memberRef);
      await batch.commit();
    }

    this.analytics.event('group_left', { group_id: groupId });
  }

  async assignLeader(groupId: string, targetUid: string): Promise<void> {
    const members  = this.detailMembers();
    const target   = members.find(m => m.uid === targetUid);
    if (!target) throw new Error('Member not found');

    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const groupRef     = doc(this.firestore, 'groups', groupId);
    const oldLeaderRef = doc(this.firestore, 'groups', groupId, 'members', user.uid);
    const newLeaderRef = doc(this.firestore, 'groups', groupId, 'members', targetUid);

    const batch = writeBatch(this.firestore);
    batch.update(oldLeaderRef, { role: 'member' });
    batch.update(newLeaderRef, { role: 'leader' });
    batch.update(groupRef, {
      leaderId:    targetUid,
      leaderName:  target.displayName,
      leaderPhoto: target.photoURL,
      updatedAt:   serverTimestamp(),
    });
    await batch.commit();
  }

  async transferOwnership(groupId: string, targetUid: string): Promise<void> {
    await this.assignLeader(groupId, targetUid);
  }

  async cancelGroup(groupId: string): Promise<void> {
    await updateDoc(doc(this.firestore, 'groups', groupId), {
      status:    'cancelled',
      updatedAt: serverTimestamp(),
    });
  }

  async sendMessage(groupId: string, text: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');
    if (!text.trim()) return;

    await addDoc(collection(this.firestore, 'groups', groupId, 'messages'), {
      uid:         user.uid,
      displayName: user.displayName ?? 'Explorer',
      photoURL:    user.photoURL ?? '',
      text:        text.trim().substring(0, 500),
      createdAt:   serverTimestamp(),
    });

    this.analytics.event('group_message_sent', { group_id: groupId });
  }

  async updateLastActive(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) return;
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
        where('status', 'in', ['open', 'full']),
        where('date', '>=', Timestamp.fromDate(today)),
        orderBy('date', 'asc'),
      ),
    );
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Group));
  }

  // ── Utilities ─────────────────────────────────────────────────────────────

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
