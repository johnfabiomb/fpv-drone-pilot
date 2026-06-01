import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { supabase } from '@core/config/supabase.config';
import { AuthService } from '@core/services/auth.service';
import { AnalyticsService } from '@core/services/analytics.service';
import { UserDataService } from '@core/services/user-data.service';
import { Timestamp } from '@core/models/timestamp';
import {
  AlreadyHasActiveGroupError,
  CooldownError,
  CreateGroupPayload,
  Group,
  GroupFullError,
  GroupMember,
  GroupMessage,
  LeaderMustTransferError,
  ReportRow,
  SpamMutedError,
  UpdateGroupPayload,
} from '@core/models/group.model';
import { GroupStatus, UserRole, Provider } from '@core/models';
import { locations } from '@assets/locations.json';

type RealtimeChannel = ReturnType<typeof supabase.channel>;

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private readonly authService     = inject(AuthService);
  private readonly analytics       = inject(AnalyticsService);
  private readonly userDataService = inject(UserDataService);

  // ── Public signals ──────────────────────────────────────────────────────────
  readonly groups        = signal<Group[]>([]);
  readonly loading       = signal(false);
  /** Group IDs the current user leads or is a member of (for My Groups section). */
  readonly myGroupIds    = signal<Set<string>>(new Set());
  readonly detailGroup   = signal<Group | null>(null);
  readonly detailMembers = signal<GroupMember[]>([]);
  readonly messages      = signal<GroupMessage[]>([]);

  private readonly earlierMessages = signal<GroupMessage[]>([]);
  private messagesOldestAt: string | null = null;
  readonly hasMoreMessages = signal(false);
  readonly loadingEarlier  = signal(false);
  readonly allMessages     = computed(() => [...this.earlierMessages(), ...this.messages()]);

  readonly currentUserMember   = signal<GroupMember | null>(null);
  readonly currentUserIsMember = computed(() => !!this.currentUserMember());

  private messageSentAt: number[] = [];

  // ── Computed ─────────────────────────────────────────────────────────────────
  readonly openGroups = computed(() =>
    this.groups()
      .filter(g =>
        g.status !== GroupStatus.Archived && (
          g.status === GroupStatus.Exploring ||
          ((g.status === GroupStatus.Open || g.status === GroupStatus.Full) && !GroupsService.isGroupPast(g))
        ),
      )
      .sort((a, b) => {
        const rank = (g: Group) => g.leaderIsAdmin ? 8 : g.leaderIsGuide ? 7 : g.leaderLevel;
        const diff = rank(b) - rank(a);
        if (diff !== 0) return diff;
        return a.date.toMillis() - b.date.toMillis();
      })
  );

  readonly recentPastGroups = computed(() => {
    const weekAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return this.groups()
      .filter(g => {
        if (g.status === GroupStatus.Archived) return false;
        const isPast = g.status === GroupStatus.Completed || g.status === GroupStatus.Cancelled ||
                       ((g.status === GroupStatus.Open || g.status === GroupStatus.Full) && GroupsService.isGroupPast(g));
        return isPast && g.date.toMillis() >= weekAgoMs;
      })
      .sort((a, b) => b.date.toMillis() - a.date.toMillis());
  });

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

  // ── Channel references ───────────────────────────────────────────────────────
  private groupsChannel:        RealtimeChannel | null = null;
  private detailChannel:        RealtimeChannel | null = null;
  private currentMemberChannel: RealtimeChannel | null = null;
  private membersChannel:       RealtimeChannel | null = null;
  private messagesChannel:      RealtimeChannel | null = null;
  private currentDetailId       = '';
  private cachedDetailId        = '';
  private currentUserMemberRowId: string | null = null;
  private currentMemberKey      = ''; // tracks active groupId+userId to prevent duplicate channel setup

  constructor() {
    effect(() => {
      const user = this.authService.user();
      if (user && this.currentDetailId) {
        void this.startCurrentUserMemberListener(this.currentDetailId);
      } else if (!user) {
        this.removeChannel('currentMember');
        this.currentUserMember.set(null);
        this.currentUserMemberRowId = null;
        this.myGroupIds.set(new Set());
      }
    });

    // Award XP to all members watching when a group completes
    effect(() => {
      const group  = this.detailGroup();
      const member = this.currentUserMember();
      if (group?.status === GroupStatus.Completed && member) {
        void this.userDataService.awardXp('group_completed', group.id);
      }
    });
  }

  // ── Row → model helpers ──────────────────────────────────────────────────────

  private rowToGroup(row: Record<string, unknown>): Group {
    const pm = row['pinned_message'] as Record<string, unknown> | null;
    // leader profile comes from the user_profiles JOIN
    const leader = (row['leader'] as Record<string, unknown>) ?? {};
    return {
      id:            row['id'] as string,
      title:         row['title'] as string,
      spotSlug:      row['spot_slug'] as string | null,
      spotTitle:     row['spot_title'] as string | null,
      spotLat:       row['spot_lat'] as number | null,
      spotLon:       row['spot_lon'] as number | null,
      date:          Timestamp.fromISO(row['date'] as string),
      time:          row['time'] as string,
      description:   (row['description'] as string) ?? '',
      difficulty:    row['difficulty'] as 'easy' | 'moderate' | 'hard',
      maxMembers:    row['max_members'] as number | null,
      price:         (row['price_eur'] as number | null) ?? null,
      status:        row['status'] as Group['status'],
      leaderId:      row['leader_id'] as string,
      leaderName:    (leader['display_name'] as string) ?? '',
      leaderPhoto:   (leader['photo_url'] as string) ?? '',
      leaderIsAdmin: (leader['role'] as string) === UserRole.Admin,
      leaderIsGuide: (leader['role'] as string) === UserRole.Guide,
      leaderLevel:   (leader['level'] as number) ?? 1,
      memberCount:   (row['member_count'] as number) ?? 0,
      memberPreviews: (row['member_previews'] as Group['memberPreviews']) ?? [],
      meetingPoint:  row['meeting_point'] as Group['meetingPoint'],
      pinnedMessage: pm ? {
        id:         pm['id'] as string,
        text:       pm['text'] as string,
        authorName: pm['authorName'] as string,
        pinnedAt:   Timestamp.fromISO(pm['pinnedAt'] as string),
      } : null,
      completedAt:   row['completed_at'] ? Timestamp.fromISO(row['completed_at'] as string) : undefined,
      createdAt:     Timestamp.fromISO(row['created_at'] as string),
      updatedAt:     Timestamp.fromISO(row['updated_at'] as string),
    };
  }

  private rowToMember(row: Record<string, unknown>): GroupMember {
    // profile comes from the user_profiles JOIN
    const profile = (row['profile'] as Record<string, unknown>) ?? {};
    return {
      uid:         row['uid'] as string,
      displayName: (profile['display_name'] as string) ?? '',
      photoURL:    (profile['photo_url'] as string) ?? '',
      level:       (profile['level'] as number) ?? 1,
      isAdmin:     (profile['role'] as string) === UserRole.Admin,
      role:        row['role'] as GroupMember['role'],
      joinedAt:    Timestamp.fromISO(row['joined_at'] as string),
      lastActive:  Timestamp.fromISO(row['last_active'] as string),
      mutedUntil:   row['muted_until'] ? Timestamp.fromISO(row['muted_until'] as string) : undefined,
      contactPhone: (row['contact_phone'] as string | null) ?? null,
    };
  }

  private rowToMessage(row: Record<string, unknown>): GroupMessage {
    return {
      id:          row['id'] as string,
      uid:         row['uid'] as string,
      displayName: (row['display_name'] as string) ?? '',
      photoURL:    (row['photo_url'] as string) ?? '',
      text:        row['text'] as string,
      createdAt:   row['created_at'] ? Timestamp.fromISO(row['created_at'] as string) : null,
      isSystem:    (row['is_system'] as boolean) ?? false,
      level:       row['level'] as number | undefined,
      isAdmin:     (row['is_admin'] as boolean) ?? false,
    };
  }

  // ── Groups list listener ─────────────────────────────────────────────────────
  startGroupsListener(): void {
    this.stopGroupsListener();
    this.loading.set(true);
    const uid = this.authService.user()?.id;
    if (uid) { void this.loadMyMemberships(uid); }

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoISO = weekAgo.toISOString();

    const groupSelect = '*, leader:user_profiles!leader_id(display_name, photo_url, level, role)';

    // Initial fetch
    supabase
      .from('groups')
      .select(groupSelect)
      .gte('date', weekAgoISO)
      .order('date', { ascending: true })
      .then(
        ({ data }) => {
          this.groups.set(data?.map(r => this.rowToGroup(r as Record<string, unknown>)) ?? []);
          this.loading.set(false);
        },
        () => this.loading.set(false),
      );

    // Realtime — payload.new has no joined data, so re-fetch the row with JOIN on INSERT/UPDATE
    this.groupsChannel = supabase
      .channel('groups-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'groups' }, payload => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          const id = (payload.new as Record<string, unknown>)['id'] as string;
          supabase.from('groups').select(groupSelect).eq('id', id).maybeSingle()
            .then(({ data }) => {
              if (!data) return;
              const g = this.rowToGroup(data as Record<string, unknown>);
              if (payload.eventType === 'INSERT') {
                if (g.date.toDate() >= weekAgo) {
                  this.groups.update(gs =>
                    [...gs, g].sort((a, b) => a.date.toMillis() - b.date.toMillis()),
                  );
                }
              } else {
                this.groups.update(gs => gs.map(existing => existing.id === g.id ? g : existing));
              }
            });
        } else if (payload.eventType === 'DELETE') {
          const deletedId = (payload.old as Record<string, unknown>)['id'] as string;
          this.groups.update(gs => gs.filter(g => g.id !== deletedId));
        }
      })
      .subscribe();
  }

  stopGroupsListener(): void {
    this.removeChannel('groups');
  }

  private async loadMyMemberships(uid: string): Promise<void> {
    const { data } = await supabase
      .from('group_members')
      .select('group_id')
      .eq('uid', uid);
    if (data) {
      this.myGroupIds.set(new Set(data.map((r: Record<string, unknown>) => r['group_id'] as string)));
    }
  }

  async archiveGroup(id: string): Promise<void> {
    await supabase.from('groups')
      .update({ status: 'archived', updated_at: new Date().toISOString() })
      .eq('id', id);
  }

  // ── Group detail listener ────────────────────────────────────────────────────
  startDetailListener(id: string): void {
    if (id !== this.cachedDetailId) {
      this.detailGroup.set(null);
      this.messages.set([]);
    }
    this.cachedDetailId = id;
    this.stopDetailListener();
    this.currentDetailId = id;

    const groupSelect = '*, leader:user_profiles!leader_id(display_name, photo_url, level, role)';

    // Fetch initial group doc
    supabase
      .from('groups').select(groupSelect).eq('id', id).maybeSingle()
      .then(({ data }) => {
        this.detailGroup.set(data ? this.rowToGroup(data as Record<string, unknown>) : null);
      });

    // Subscribe to group doc changes — re-fetch with JOIN on any change
    this.detailChannel = supabase
      .channel(`group-detail-${id}`)
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'groups', filter: `id=eq.${id}`,
      }, payload => {
        if (payload.eventType === 'DELETE') {
          this.detailGroup.set(null);
        } else {
          supabase.from('groups').select(groupSelect).eq('id', id).maybeSingle()
            .then(({ data }) => {
              this.detailGroup.set(data ? this.rowToGroup(data as Record<string, unknown>) : null);
            });
        }
      })
      .subscribe();

    // Fetch initial messages + subscribe to new ones
    void this.fetchLatestMessages(id);

    this.messagesChannel = supabase
      .channel(`group-messages-${id}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'group_messages',
        filter: `group_id=eq.${id}`,
      }, payload => {
        const msg = this.rowToMessage(payload.new as Record<string, unknown>);
        this.messages.update(msgs => [...msgs, msg]);
      })
      .subscribe();

    // Current user's 1-doc member listener
    void this.startCurrentUserMemberListener(id);
  }

  stopDetailListener(): void {
    this.removeChannel('detail');
    this.removeChannel('messages');
    this.removeChannel('currentMember');
    this.stopMembersListener();

    this.currentDetailId         = '';
    this.currentMemberKey        = '';
    this.currentUserMemberRowId  = null;
    this.detailMembers.set([]);
    this.currentUserMember.set(null);
    this.earlierMessages.set([]);
    this.messagesOldestAt        = null;
    this.hasMoreMessages.set(false);
    this.messageSentAt           = [];
  }

  // ── Message pagination ───────────────────────────────────────────────────────
  async loadEarlierMessages(groupId: string): Promise<void> {
    if (!this.messagesOldestAt || this.loadingEarlier()) return;
    this.loadingEarlier.set(true);
    try {
      const { data } = await supabase
        .from('group_messages').select('*')
        .eq('group_id', groupId)
        .lt('created_at', this.messagesOldestAt)
        .order('created_at', { ascending: false })
        .limit(30);

      if (!data || data.length === 0) {
        this.hasMoreMessages.set(false);
        return;
      }
      this.messagesOldestAt = data[data.length - 1]['created_at'] as string;
      const older = data.map(r => this.rowToMessage(r as Record<string, unknown>)).reverse();
      this.earlierMessages.set([...older, ...this.earlierMessages()]);
      this.hasMoreMessages.set(data.length >= 30);
    } finally {
      this.loadingEarlier.set(false);
    }
  }

  // ── Members subcollection — on-demand ────────────────────────────────────────
  startMembersListener(id: string): void {
    if (this.membersChannel) return;
    if (!this.authService.user()) return;

    const memberSelect = '*, profile:user_profiles!uid(display_name, photo_url, level, role)';

    void supabase
      .from('group_members').select(memberSelect)
      .eq('group_id', id).order('joined_at', { ascending: true })
      .then(({ data }) => {
        this.detailMembers.set(data?.map(r => this.rowToMember(r as Record<string, unknown>)) ?? []);
      });

    this.membersChannel = supabase
      .channel(`group-members-list-${id}`)
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'group_members', filter: `group_id=eq.${id}`,
      }, payload => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          // Re-fetch this specific member with JOIN since payload.new has no profile data
          const uid = (payload.new as Record<string, unknown>)['uid'] as string;
          supabase.from('group_members').select(memberSelect)
            .eq('group_id', id).eq('uid', uid).maybeSingle()
            .then(({ data }) => {
              if (!data) return;
              const m = this.rowToMember(data as Record<string, unknown>);
              if (payload.eventType === 'INSERT') {
                this.detailMembers.update(ms => [...ms, m]);
              } else {
                this.detailMembers.update(ms => ms.map(e => e.uid === m.uid ? m : e));
              }
            });
        } else {
          // DELETE: re-fetch all since payload.old only has PK without REPLICA IDENTITY FULL
          supabase
            .from('group_members').select(memberSelect)
            .eq('group_id', id).order('joined_at', { ascending: true })
            .then(({ data }) => {
              this.detailMembers.set(data?.map(r => this.rowToMember(r as Record<string, unknown>)) ?? []);
            });
        }
      })
      .subscribe();
  }

  stopMembersListener(): void {
    this.removeChannel('members');
    this.detailMembers.set([]);
  }

  // ── Current user's 1-doc member listener ────────────────────────────────────
  private async startCurrentUserMemberListener(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) { this.currentUserMember.set(null); return; }

    const key = `${groupId}-${user.id}`;
    if (this.currentMemberKey === key) return; // already subscribed for this group+user
    this.currentMemberKey = key;

    this.removeChannel('currentMember');

    // Initial fetch
    const { data } = await supabase
      .from('group_members').select('*')
      .eq('group_id', groupId).eq('uid', user.id).maybeSingle();
    this.currentUserMember.set(data ? this.rowToMember(data as Record<string, unknown>) : null);
    this.currentUserMemberRowId = (data as Record<string, unknown> | null)?.['id'] as string ?? null;

    // Subscribe to changes on this group's members
    this.currentMemberChannel = supabase
      .channel(`member-${groupId}-${user.id}`)
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'group_members', filter: `group_id=eq.${groupId}`,
      }, payload => {
        if (payload.eventType === 'DELETE') {
          const deletedId = (payload.old as Record<string, unknown>)['id'] as string;
          if (deletedId === this.currentUserMemberRowId) {
            this.currentUserMember.set(null);
            this.currentUserMemberRowId = null;
          }
        } else {
          const row = payload.new as Record<string, unknown>;
          if ((row['uid'] as string) === user.id) {
            this.currentUserMember.set(this.rowToMember(row));
          }
        }
      })
      .subscribe();
  }

  // ── Channel removal helper ───────────────────────────────────────────────────
  private removeChannel(key: 'groups' | 'detail' | 'messages' | 'currentMember' | 'members'): void {
    const map: Record<string, RealtimeChannel | null> = {
      groups:        this.groupsChannel,
      detail:        this.detailChannel,
      messages:      this.messagesChannel,
      currentMember: this.currentMemberChannel,
      members:       this.membersChannel,
    };
    const ch = map[key];
    if (ch) supabase.removeChannel(ch);
    switch (key) {
      case 'groups':        this.groupsChannel        = null; break;
      case 'detail':        this.detailChannel        = null; break;
      case 'messages':      this.messagesChannel      = null; break;
      case 'currentMember': this.currentMemberChannel = null; break;
      case 'members':       this.membersChannel       = null; break;
    }
  }

  // ── Private helpers ──────────────────────────────────────────────────────────
  private async fetchLatestMessages(groupId: string): Promise<void> {
    const { data } = await supabase
      .from('group_messages').select('*')
      .eq('group_id', groupId)
      .order('created_at', { ascending: false })
      .limit(30);

    if (data) {
      if (this.earlierMessages().length === 0) {
        this.messagesOldestAt = data.length > 0 ? data[data.length - 1]['created_at'] as string : null;
        this.hasMoreMessages.set(data.length >= 30);
      }
      this.messages.set(data.map(r => this.rowToMessage(r as Record<string, unknown>)).reverse());
    }
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
    await supabase.from('group_messages').insert({
      group_id:     groupId,
      uid:          user.id,
      display_name: this.authService.userDisplayName(),
      photo_url:    this.authService.userPhotoURL(),
      text,
      is_system:    true,
    });
  }

  // ── Mutations ─────────────────────────────────────────────────────────────────

  async createGroup(data: CreateGroupPayload): Promise<string> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const groupDateTime = new Date(data.date);
    const [h, m] = data.time.split(':').map(Number);
    groupDateTime.setHours(h, m, 0, 0);
    if (groupDateTime.getTime() < Date.now() + 24 * 60 * 60 * 1000) {
      throw new Error('Group must be scheduled at least 24 hours in advance.');
    }

    const hasActive = this.openGroups().some(g => g.leaderId === user.id);
    if (hasActive) throw new AlreadyHasActiveGroupError();

    const displayName = this.authService.userDisplayName();
    const photoURL    = this.authService.userPhotoURL();

    const { data: row, error } = await supabase
      .from('groups')
      .insert({
        title:           data.title,
        spot_slug:       data.spotSlug,
        spot_title:      data.spotTitle,
        spot_lat:        data.spotLat,
        spot_lon:        data.spotLon,
        date:            groupDateTime.toISOString(),
        time:            data.time,
        description:     data.description,
        difficulty:      data.difficulty,
        max_members:     data.maxMembers,
        price_eur:       data.price ?? null,
        status:          'open',
        leader_id:       user.id,
        meeting_point:   data.meetingPoint ?? null,
        member_count:    1,
        member_previews: [{ uid: user.id, displayName, photoURL }],
      })
      .select('id')
      .single();

    if (error) throw error;

    await supabase.from('group_members').insert({
      group_id:     row.id,
      uid:          user.id,
      display_name: displayName,
      photo_url:    photoURL,
      role:         'leader',
    });

    this.myGroupIds.update(s => new Set([...s, row.id]));
    this.analytics.event('group_created', { spot: data.spotSlug, difficulty: data.difficulty });
    void this.userDataService.awardXp('group_created', row.id);
    return row.id;
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

    const old    = this.detailGroup();
    const changes: string[] = [];
    const who    = this.authService.userDisplayName() || 'Someone';

    if (old) {
      if (old.title !== data.title) {
        changes.push(`${who} changed the group name to "${data.title}"`);
      }
      if ((old.spotTitle ?? null) !== (data.spotTitle ?? null)) {
        changes.push(data.spotTitle
          ? `${who} set the location to ${data.spotTitle}`
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

    await supabase.from('groups').update({
      title:         data.title,
      spot_slug:     data.spotSlug,
      spot_title:    data.spotTitle,
      spot_lat:      data.spotLat,
      spot_lon:      data.spotLon,
      date:          groupDateTime.toISOString(),
      time:          data.time,
      description:   data.description,
      difficulty:    data.difficulty,
      max_members:   data.maxMembers,
      price_eur:     data.price ?? null,
      meeting_point: data.meetingPoint ?? null,
      updated_at:    new Date().toISOString(),
    }).eq('id', groupId);

    for (const text of changes) {
      this.addSystemMessage(groupId, text).catch(() => {});
    }

    this.analytics.event('group_updated', { groupId });
  }

  async joinGroup(groupId: string, phone?: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase.rpc('join_group', {
      p_group_id: groupId,
      p_phone:    phone ?? null,
    });

    if (error) {
      if (error.message.includes('group_full'))         throw new GroupFullError();
      if (error.message.includes('group_not_accepting')) throw new Error('This group is no longer accepting members.');
      throw error;
    }

    this.myGroupIds.update(s => new Set([...s, groupId]));
    this.analytics.event('group_joined', { group_id: groupId, spot: this.detailGroup()?.spotSlug });
    void this.userDataService.awardXp('group_joined', groupId);
  }

  async leaveGroup(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const group = this.detailGroup();
    if (!group) throw new Error('Group not found');

    if (group.leaderId === user.id && group.memberCount > 1) {
      throw new LeaderMustTransferError();
    }

    const { error } = await supabase.rpc('leave_group', {
      p_group_id: groupId,
      p_uid:      user.id,
    });

    if (error) throw error;

    this.myGroupIds.update(s => { const n = new Set(s); n.delete(groupId); return n; });
    this.analytics.event('group_left', { group_id: groupId });
  }

  async assignLeader(groupId: string, targetUid: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    let target = this.detailMembers().find(m => m.uid === targetUid);
    if (!target) {
      const { data } = await supabase
        .from('group_members').select('*')
        .eq('group_id', groupId).eq('uid', targetUid).maybeSingle();
      if (!data) throw new Error('Member not found');
      target = this.rowToMember(data as Record<string, unknown>);
    }

    await supabase.from('groups').update({
      leader_id:  targetUid,
      updated_at: new Date().toISOString(),
    }).eq('id', groupId);

    await supabase.from('group_members').update({ role: 'member' })
      .eq('group_id', groupId).eq('uid', user.id);
    await supabase.from('group_members').update({ role: 'leader' })
      .eq('group_id', groupId).eq('uid', targetUid);

    this.addSystemMessage(groupId,
      `${this.authService.userDisplayName() || 'Someone'} made ${target.displayName} the group leader`,
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

    const targetName  = this.getMemberName(targetUid);
    const newCount    = group.memberCount - 1;
    const newPreviews = group.memberPreviews.filter(p => p.uid !== targetUid);

    await supabase.from('group_members').delete()
      .eq('group_id', groupId).eq('uid', targetUid);
    await supabase.from('groups').update({
      member_count:    newCount,
      member_previews: newPreviews,
      updated_at:      new Date().toISOString(),
    }).eq('id', groupId);

    this.addSystemMessage(groupId,
      `${this.authService.userDisplayName() || 'Someone'} removed ${targetName} from the group`,
    ).catch(() => {});
    this.analytics.event('group_member_removed', { group_id: groupId });
  }

  async muteMember(groupId: string, targetUid: string, minutes: number): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const targetName = this.getMemberName(targetUid);
    const muteUntil  = new Date(Date.now() + minutes * 60_000).toISOString();

    await supabase.from('group_members').update({ muted_until: muteUntil })
      .eq('group_id', groupId).eq('uid', targetUid);

    const label = minutes >= 60 ? `${minutes / 60}h` : `${minutes} min`;
    this.addSystemMessage(groupId,
      `${this.authService.userDisplayName() || 'Someone'} muted ${targetName} for ${label}`,
    ).catch(() => {});
    this.analytics.event('group_member_muted', { group_id: groupId, minutes });
  }

  async unmuteMember(groupId: string, targetUid: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const targetName = this.getMemberName(targetUid);
    await supabase.from('group_members').update({ muted_until: null })
      .eq('group_id', groupId).eq('uid', targetUid);

    this.addSystemMessage(groupId,
      `${this.authService.userDisplayName() || 'Someone'} unmuted ${targetName}`,
    ).catch(() => {});
  }

  async bulkRemoveMembers(groupId: string, uids: string[]): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');
    const group = this.detailGroup();
    if (!group) throw new Error('Group not found');

    const toRemove = uids.filter(uid => uid !== group.leaderId && uid !== user.id);
    if (!toRemove.length) return;

    await supabase.from('group_members').delete()
      .eq('group_id', groupId).in('uid', toRemove);
    await supabase.from('groups').update({
      member_count:    group.memberCount - toRemove.length,
      member_previews: group.memberPreviews.filter(p => !toRemove.includes(p.uid)),
      updated_at:      new Date().toISOString(),
    }).eq('id', groupId);

    const who  = this.authService.userDisplayName() || 'Someone';
    const text = toRemove.length === 1
      ? `${who} removed ${this.getMemberName(toRemove[0])} from the group`
      : `${who} removed ${toRemove.length} members from the group`;
    this.addSystemMessage(groupId, text).catch(() => {});
    this.analytics.event('group_bulk_removed', { group_id: groupId, count: toRemove.length });
  }

  async bulkMuteMembers(groupId: string, uids: string[], minutes: number): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const muteUntil = new Date(Date.now() + minutes * 60_000).toISOString();
    await Promise.all(uids.map(uid =>
      supabase.from('group_members').update({ muted_until: muteUntil })
        .eq('group_id', groupId).eq('uid', uid),
    ));

    const who   = this.authService.userDisplayName() || 'Someone';
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
    await supabase.from('groups').update({ status: 'exploring', updated_at: new Date().toISOString() })
      .eq('id', groupId);
    this.addSystemMessage(groupId, '🧭 The group has started exploring!').catch(() => {});
    this.analytics.event('group_exploring_started', { groupId });
  }

  async cancelGroup(groupId: string): Promise<void> {
    await supabase.from('groups').update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', groupId);
    this.addSystemMessage(groupId, '❌ This group has been cancelled.').catch(() => {});
  }

  async completeGroup(groupId: string): Promise<void> {
    const now = new Date().toISOString();
    await supabase.from('groups').update({ status: 'completed', completed_at: now, updated_at: now })
      .eq('id', groupId);
    this.addSystemMessage(groupId, '🏁 This group has been completed! The chat will remain open for 12 hours.').catch(() => {});
  }

  async correctMemberCount(groupId: string, members: GroupMember[]): Promise<void> {
    const previews = members.slice(0, 5).map(m => ({
      uid: m.uid, displayName: m.displayName, photoURL: m.photoURL,
    }));
    await supabase.from('groups').update({
      member_count:    members.length,
      member_previews: previews,
      updated_at:      new Date().toISOString(),
    }).eq('id', groupId);
  }

  async sendMessage(groupId: string, text: string): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');
    if (!text.trim()) return;

    const now      = Date.now();
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
      const muteUntil = new Date(now + 10 * 60_000).toISOString();
      await supabase.from('group_members').update({ muted_until: muteUntil })
        .eq('group_id', groupId).eq('uid', user.id);
      throw new SpamMutedError(10);
    }

    await supabase.from('group_messages').insert({
      group_id:     groupId,
      uid:          user.id,
      display_name: this.authService.userDisplayName(),
      photo_url:    this.authService.userPhotoURL(),
      text:         text.trim().substring(0, 500),
      level:        this.userDataService.levelInfo().id,
      is_admin:     this.userDataService.isAdmin(),
    });

    this.messageSentAt.push(now);
    this.analytics.event('group_message_sent', { group_id: groupId });
    void this.userDataService.awardXp('message_sent');
  }

  async pinMessage(groupId: string, msg: GroupMessage): Promise<void> {
    if (!this.authService.user()) throw new Error('Not authenticated');
    await supabase.from('groups').update({
      pinned_message: {
        id:         msg.id,
        text:       msg.text,
        authorName: msg.displayName,
        pinnedAt:   new Date().toISOString(),
      },
      updated_at: new Date().toISOString(),
    }).eq('id', groupId);
  }

  async unpinMessage(groupId: string): Promise<void> {
    if (!this.authService.user()) throw new Error('Not authenticated');
    await supabase.from('groups').update({
      pinned_message: null,
      updated_at:     new Date().toISOString(),
    }).eq('id', groupId);
  }

  async updateLastActive(groupId: string): Promise<void> {
    const user = this.authService.user();
    if (!user) return;
    const member = this.currentUserMember();
    if (member?.lastActive) {
      const elapsed = Date.now() - member.lastActive.toMillis();
      if (elapsed < 5 * 60 * 1000) return;
    }
    try {
      await supabase.from('group_members')
        .update({ last_active: new Date().toISOString() })
        .eq('group_id', groupId).eq('uid', user.id);
    } catch {
      // Silent — presence update should never break the UI
    }
  }

  // ── One-shot spot query ──────────────────────────────────────────────────────
  async fetchGroupsForSpot(slug: string): Promise<Group[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data } = await supabase
      .from('groups')
      .select('*, leader:user_profiles!leader_id(display_name, photo_url, level, role)')
      .eq('spot_slug', slug)
      .in('status', ['open', 'full', 'exploring'])
      .gte('date', today.toISOString())
      .order('date', { ascending: true });

    return data?.map(r => this.rowToGroup(r as Record<string, unknown>)) ?? [];
  }

  // ── Admin: per-user feature activation ───────────────────────────────────────
  async activateGroupsAccess(email: string): Promise<'ok' | 'not_found'> {
    const { data, error } = await supabase.rpc('activate_groups_access', { p_email: email });
    if (error) throw error;
    return data as 'ok' | 'not_found';
  }

  async activateGuideRole(email: string): Promise<'ok' | 'not_found'> {
    const { data, error } = await supabase.rpc('activate_guide_role', { p_email: email });
    if (error) throw error;
    return data as 'ok' | 'not_found';
  }

  // ── Admin: one-time migrations ─────────────────────────────────────────────

  async migrateCompletedAt(): Promise<number> {
    const { data: groups } = await supabase
      .from('groups').select('id, completed_at, updated_at').eq('status', 'completed');
    if (!groups) return 0;

    let updated = 0;
    await Promise.all((groups as Record<string, unknown>[]).map(async group => {
      if (!group['completed_at'] && group['updated_at']) {
        await supabase.from('groups').update({ completed_at: group['updated_at'] }).eq('id', group['id']);
        updated++;
      }
    }));
    return updated;
  }

  // ── Utilities ────────────────────────────────────────────────────────────────
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
    const msAgo  = Date.now() - ts.toMillis();
    const dayMs  = 86_400_000;
    const weekMs = 7 * dayMs;
    if (msAgo < dayMs)  return 'Active today';
    if (msAgo < weekMs) return 'Active this week';
    return 'Inactive';
  }

  // ── Reports ──────────────────────────────────────────────────────────────────

  async reportMessage(
    groupId: string, groupTitle: string,
    messageId: string, messageText: string,
  ): Promise<void> {
    const user = this.authService.user();
    if (!user) return;
    await supabase.from('reports').insert({
      reporter_id:   user.id,
      reporter_name: user.user_metadata?.['full_name'] ?? 'Unknown',
      group_id:      groupId,
      group_title:   groupTitle,
      message_id:    messageId,
      message_text:  messageText.slice(0, 500),
    });
  }

  async fetchReports(): Promise<ReportRow[]> {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as ReportRow[];
  }

  async dismissReport(reportId: string): Promise<void> {
    await supabase.from('reports').delete().eq('id', reportId);
  }

  async deleteReportedMessage(groupId: string, messageId: string, reportId: string): Promise<void> {
    await supabase.from('group_messages').delete().eq('id', messageId).eq('group_id', groupId);
    await supabase.from('reports').delete().eq('id', reportId);
  }
}
