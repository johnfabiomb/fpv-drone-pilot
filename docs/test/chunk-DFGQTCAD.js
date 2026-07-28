import {
  UserDataService
} from "./chunk-Y4EYH3YN.js";
import {
  AlreadyHasActiveGroupError,
  CooldownError,
  GroupFullError,
  LeaderMustTransferError,
  SpamMutedError
} from "./chunk-GCGHXSHH.js";
import {
  AuthService
} from "./chunk-QYGWLPIV.js";
import {
  supabase
} from "./chunk-YDLK2X2B.js";
import {
  locations
} from "./chunk-PIDQOFLT.js";
import {
  GroupStatus,
  UserRole
} from "./chunk-5FMFH5XE.js";
import {
  computed,
  effect,
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-EBVVQ6Y2.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/map/core/services/analytics.service.ts
var AnalyticsService = class _AnalyticsService {
  pageView(url, title) {
    if (typeof gtag === "undefined")
      return;
    gtag("event", "page_view", { page_title: title, page_location: url });
  }
  event(name, params = {}) {
    if (typeof gtag === "undefined")
      return;
    gtag("event", name, params);
  }
  static {
    this.\u0275fac = function AnalyticsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AnalyticsService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AnalyticsService, factory: _AnalyticsService.\u0275fac, providedIn: "root" });
  }
};

// src/app/map/core/models/timestamp.ts
var Timestamp = class _Timestamp {
  constructor(_date) {
    this._date = _date;
  }
  static fromDate(d) {
    return new _Timestamp(new Date(d));
  }
  static fromMillis(ms) {
    return new _Timestamp(new Date(ms));
  }
  static fromISO(iso) {
    return new _Timestamp(new Date(iso));
  }
  toDate() {
    return new Date(this._date);
  }
  toMillis() {
    return this._date.getTime();
  }
  get seconds() {
    return Math.floor(this._date.getTime() / 1e3);
  }
  toJSON() {
    return this._date.toISOString();
  }
  toISOString() {
    return this._date.toISOString();
  }
};

// src/app/map/core/services/groups.service.ts
var GroupsService = class _GroupsService {
  constructor() {
    this.authService = inject(AuthService);
    this.analytics = inject(AnalyticsService);
    this.userDataService = inject(UserDataService);
    this.groups = signal([]);
    this.loading = signal(false);
    this.myGroupIds = signal(/* @__PURE__ */ new Set());
    this.detailGroup = signal(null);
    this.detailMembers = signal([]);
    this.messages = signal([]);
    this.earlierMessages = signal([]);
    this.messagesOldestAt = null;
    this.hasMoreMessages = signal(false);
    this.loadingEarlier = signal(false);
    this.allMessages = computed(() => [...this.earlierMessages(), ...this.messages()]);
    this.currentUserMember = signal(null);
    this.currentUserIsMember = computed(() => !!this.currentUserMember());
    this.messageSentAt = [];
    this.openGroups = computed(() => this.groups().filter((g) => g.status !== GroupStatus.Archived && (g.status === GroupStatus.Exploring || (g.status === GroupStatus.Open || g.status === GroupStatus.Full) && !_GroupsService.isGroupPast(g))).sort((a, b) => {
      const rank = (g) => g.leaderIsAdmin ? 8 : g.leaderIsGuide ? 7 : g.leaderLevel;
      const diff = rank(b) - rank(a);
      if (diff !== 0)
        return diff;
      return a.date.toMillis() - b.date.toMillis();
    }));
    this.recentPastGroups = computed(() => {
      const weekAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1e3;
      return this.groups().filter((g) => {
        if (g.status === GroupStatus.Archived)
          return false;
        const isPast = g.status === GroupStatus.Completed || g.status === GroupStatus.Cancelled || (g.status === GroupStatus.Open || g.status === GroupStatus.Full) && _GroupsService.isGroupPast(g);
        return isPast && g.date.toMillis() >= weekAgoMs;
      }).sort((a, b) => b.date.toMillis() - a.date.toMillis());
    });
    this.mutedUntil = computed(() => this.currentUserMember()?.mutedUntil ?? null);
    this.groupsAsProviderPins = computed(() => this.openGroups().filter((g) => g.spotLat !== null && g.spotLon !== null).map((g) => {
      const loc = locations.find((l) => l.slug === g.spotSlug);
      return {
        id: g.id,
        name: g.title,
        tagline: `${g.memberCount} explorer${g.memberCount === 1 ? "" : "s"}`,
        category: "group",
        lat: g.spotLat,
        lon: g.spotLon,
        showOnMap: true,
        mapLabel: "Group",
        coverImage: loc?.thumb ?? loc?.img ?? void 0,
        pinBorderColor: "#F4A922"
      };
    }));
    this.groupsChannel = null;
    this.detailChannel = null;
    this.currentMemberChannel = null;
    this.membersChannel = null;
    this.messagesChannel = null;
    this.currentDetailId = "";
    this.cachedDetailId = "";
    this.currentUserMemberRowId = null;
    this.currentMemberKey = "";
    effect(() => {
      const user = this.authService.user();
      if (user && this.currentDetailId) {
        void this.startCurrentUserMemberListener(this.currentDetailId);
      } else if (!user) {
        this.removeChannel("currentMember");
        this.currentUserMember.set(null);
        this.currentUserMemberRowId = null;
        this.myGroupIds.set(/* @__PURE__ */ new Set());
      }
    });
    effect(() => {
      const group = this.detailGroup();
      const member = this.currentUserMember();
      if (group?.status === GroupStatus.Completed && member) {
        void this.userDataService.awardXp("group_completed", group.id);
      }
    });
  }
  // ── Row → model helpers ──────────────────────────────────────────────────────
  rowToGroup(row) {
    const pm = row["pinned_message"];
    const leader = row["leader"] ?? {};
    return {
      id: row["id"],
      title: row["title"],
      spotSlug: row["spot_slug"],
      spotTitle: row["spot_title"],
      spotLat: row["spot_lat"],
      spotLon: row["spot_lon"],
      date: Timestamp.fromISO(row["date"]),
      time: row["time"],
      description: row["description"] ?? "",
      difficulty: row["difficulty"],
      maxMembers: row["max_members"],
      price: row["price_eur"] ?? null,
      status: row["status"],
      leaderId: row["leader_id"],
      leaderName: leader["display_name"] ?? "",
      leaderPhoto: leader["photo_url"] ?? "",
      leaderIsAdmin: leader["role"] === UserRole.Admin,
      leaderIsGuide: leader["role"] === UserRole.Guide,
      leaderLevel: leader["level"] ?? 1,
      memberCount: row["member_count"] ?? 0,
      memberPreviews: row["member_previews"] ?? [],
      meetingPoint: row["meeting_point"],
      pinnedMessage: pm ? {
        id: pm["id"],
        text: pm["text"],
        authorName: pm["authorName"],
        pinnedAt: Timestamp.fromISO(pm["pinnedAt"])
      } : null,
      completedAt: row["completed_at"] ? Timestamp.fromISO(row["completed_at"]) : void 0,
      createdAt: Timestamp.fromISO(row["created_at"]),
      updatedAt: Timestamp.fromISO(row["updated_at"])
    };
  }
  rowToMember(row) {
    const profile = row["profile"] ?? {};
    return {
      uid: row["uid"],
      displayName: profile["display_name"] ?? "",
      photoURL: profile["photo_url"] ?? "",
      level: profile["level"] ?? 1,
      isAdmin: profile["role"] === UserRole.Admin,
      role: row["role"],
      joinedAt: Timestamp.fromISO(row["joined_at"]),
      lastActive: Timestamp.fromISO(row["last_active"]),
      mutedUntil: row["muted_until"] ? Timestamp.fromISO(row["muted_until"]) : void 0,
      contactPhone: row["contact_phone"] ?? null
    };
  }
  rowToMessage(row) {
    return {
      id: row["id"],
      uid: row["uid"],
      displayName: row["display_name"] ?? "",
      photoURL: row["photo_url"] ?? "",
      text: row["text"],
      createdAt: row["created_at"] ? Timestamp.fromISO(row["created_at"]) : null,
      isSystem: row["is_system"] ?? false,
      level: row["level"],
      isAdmin: row["is_admin"] ?? false
    };
  }
  // ── Groups list listener ─────────────────────────────────────────────────────
  startGroupsListener() {
    this.stopGroupsListener();
    this.loading.set(true);
    const uid = this.authService.user()?.id;
    if (uid) {
      void this.loadMyMemberships(uid);
    }
    const weekAgo = /* @__PURE__ */ new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoISO = weekAgo.toISOString();
    const groupSelect = "*, leader:user_profiles!leader_id(display_name, photo_url, level, role)";
    supabase.from("groups").select(groupSelect).gte("date", weekAgoISO).order("date", { ascending: true }).then(({ data }) => {
      this.groups.set(data?.map((r) => this.rowToGroup(r)) ?? []);
      this.loading.set(false);
    }, () => this.loading.set(false));
    this.groupsChannel = supabase.channel("groups-list").on("postgres_changes", { event: "*", schema: "public", table: "groups" }, (payload) => {
      if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
        const id = payload.new["id"];
        supabase.from("groups").select(groupSelect).eq("id", id).maybeSingle().then(({ data }) => {
          if (!data)
            return;
          const g = this.rowToGroup(data);
          if (payload.eventType === "INSERT") {
            if (g.date.toDate() >= weekAgo) {
              this.groups.update((gs) => [...gs, g].sort((a, b) => a.date.toMillis() - b.date.toMillis()));
            }
          } else {
            this.groups.update((gs) => gs.map((existing) => existing.id === g.id ? g : existing));
          }
        });
      } else if (payload.eventType === "DELETE") {
        const deletedId = payload.old["id"];
        this.groups.update((gs) => gs.filter((g) => g.id !== deletedId));
      }
    }).subscribe();
  }
  stopGroupsListener() {
    this.removeChannel("groups");
  }
  loadMyMemberships(uid) {
    return __async(this, null, function* () {
      const { data } = yield supabase.from("group_members").select("group_id").eq("uid", uid);
      if (data) {
        this.myGroupIds.set(new Set(data.map((r) => r["group_id"])));
      }
    });
  }
  archiveGroup(id) {
    return __async(this, null, function* () {
      yield supabase.from("groups").update({ status: "archived", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
    });
  }
  // ── Group detail listener ────────────────────────────────────────────────────
  startDetailListener(id) {
    if (id !== this.cachedDetailId) {
      this.detailGroup.set(null);
      this.messages.set([]);
    }
    this.cachedDetailId = id;
    this.stopDetailListener();
    this.currentDetailId = id;
    const groupSelect = "*, leader:user_profiles!leader_id(display_name, photo_url, level, role)";
    supabase.from("groups").select(groupSelect).eq("id", id).maybeSingle().then(({ data }) => {
      this.detailGroup.set(data ? this.rowToGroup(data) : null);
    });
    this.detailChannel = supabase.channel(`group-detail-${id}`).on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "groups",
      filter: `id=eq.${id}`
    }, (payload) => {
      if (payload.eventType === "DELETE") {
        this.detailGroup.set(null);
      } else {
        supabase.from("groups").select(groupSelect).eq("id", id).maybeSingle().then(({ data }) => {
          this.detailGroup.set(data ? this.rowToGroup(data) : null);
        });
      }
    }).subscribe();
    void this.fetchLatestMessages(id);
    this.messagesChannel = supabase.channel(`group-messages-${id}`).on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "group_messages",
      filter: `group_id=eq.${id}`
    }, (payload) => {
      const msg = this.rowToMessage(payload.new);
      this.messages.update((msgs) => [...msgs, msg]);
    }).subscribe();
    void this.startCurrentUserMemberListener(id);
  }
  stopDetailListener() {
    this.removeChannel("detail");
    this.removeChannel("messages");
    this.removeChannel("currentMember");
    this.stopMembersListener();
    this.currentDetailId = "";
    this.currentMemberKey = "";
    this.currentUserMemberRowId = null;
    this.detailMembers.set([]);
    this.currentUserMember.set(null);
    this.earlierMessages.set([]);
    this.messagesOldestAt = null;
    this.hasMoreMessages.set(false);
    this.messageSentAt = [];
  }
  // ── Message pagination ───────────────────────────────────────────────────────
  loadEarlierMessages(groupId) {
    return __async(this, null, function* () {
      if (!this.messagesOldestAt || this.loadingEarlier())
        return;
      this.loadingEarlier.set(true);
      try {
        const { data } = yield supabase.from("group_messages").select("*").eq("group_id", groupId).lt("created_at", this.messagesOldestAt).order("created_at", { ascending: false }).limit(30);
        if (!data || data.length === 0) {
          this.hasMoreMessages.set(false);
          return;
        }
        this.messagesOldestAt = data[data.length - 1]["created_at"];
        const older = data.map((r) => this.rowToMessage(r)).reverse();
        this.earlierMessages.set([...older, ...this.earlierMessages()]);
        this.hasMoreMessages.set(data.length >= 30);
      } finally {
        this.loadingEarlier.set(false);
      }
    });
  }
  // ── Members subcollection — on-demand ────────────────────────────────────────
  startMembersListener(id) {
    if (this.membersChannel)
      return;
    if (!this.authService.user())
      return;
    const memberSelect = "*, profile:user_profiles!uid(display_name, photo_url, level, role)";
    void supabase.from("group_members").select(memberSelect).eq("group_id", id).order("joined_at", { ascending: true }).then(({ data }) => {
      this.detailMembers.set(data?.map((r) => this.rowToMember(r)) ?? []);
    });
    this.membersChannel = supabase.channel(`group-members-list-${id}`).on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "group_members",
      filter: `group_id=eq.${id}`
    }, (payload) => {
      if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
        const uid = payload.new["uid"];
        supabase.from("group_members").select(memberSelect).eq("group_id", id).eq("uid", uid).maybeSingle().then(({ data }) => {
          if (!data)
            return;
          const m = this.rowToMember(data);
          if (payload.eventType === "INSERT") {
            this.detailMembers.update((ms) => [...ms, m]);
          } else {
            this.detailMembers.update((ms) => ms.map((e) => e.uid === m.uid ? m : e));
          }
        });
      } else {
        supabase.from("group_members").select(memberSelect).eq("group_id", id).order("joined_at", { ascending: true }).then(({ data }) => {
          this.detailMembers.set(data?.map((r) => this.rowToMember(r)) ?? []);
        });
      }
    }).subscribe();
  }
  stopMembersListener() {
    this.removeChannel("members");
    this.detailMembers.set([]);
  }
  // ── Current user's 1-doc member listener ────────────────────────────────────
  startCurrentUserMemberListener(groupId) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user) {
        this.currentUserMember.set(null);
        return;
      }
      const key = `${groupId}-${user.id}`;
      if (this.currentMemberKey === key)
        return;
      this.currentMemberKey = key;
      this.removeChannel("currentMember");
      const { data } = yield supabase.from("group_members").select("*").eq("group_id", groupId).eq("uid", user.id).maybeSingle();
      this.currentUserMember.set(data ? this.rowToMember(data) : null);
      this.currentUserMemberRowId = data?.["id"] ?? null;
      this.currentMemberChannel = supabase.channel(`member-${groupId}-${user.id}`).on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "group_members",
        filter: `group_id=eq.${groupId}`
      }, (payload) => {
        if (payload.eventType === "DELETE") {
          const deletedId = payload.old["id"];
          if (deletedId === this.currentUserMemberRowId) {
            this.currentUserMember.set(null);
            this.currentUserMemberRowId = null;
          }
        } else {
          const row = payload.new;
          if (row["uid"] === user.id) {
            this.currentUserMember.set(this.rowToMember(row));
          }
        }
      }).subscribe();
    });
  }
  // ── Channel removal helper ───────────────────────────────────────────────────
  removeChannel(key) {
    const map = {
      groups: this.groupsChannel,
      detail: this.detailChannel,
      messages: this.messagesChannel,
      currentMember: this.currentMemberChannel,
      members: this.membersChannel
    };
    const ch = map[key];
    if (ch)
      supabase.removeChannel(ch);
    switch (key) {
      case "groups":
        this.groupsChannel = null;
        break;
      case "detail":
        this.detailChannel = null;
        break;
      case "messages":
        this.messagesChannel = null;
        break;
      case "currentMember":
        this.currentMemberChannel = null;
        break;
      case "members":
        this.membersChannel = null;
        break;
    }
  }
  // ── Private helpers ──────────────────────────────────────────────────────────
  fetchLatestMessages(groupId) {
    return __async(this, null, function* () {
      const { data } = yield supabase.from("group_messages").select("*").eq("group_id", groupId).order("created_at", { ascending: false }).limit(30);
      if (data) {
        if (this.earlierMessages().length === 0) {
          this.messagesOldestAt = data.length > 0 ? data[data.length - 1]["created_at"] : null;
          this.hasMoreMessages.set(data.length >= 30);
        }
        this.messages.set(data.map((r) => this.rowToMessage(r)).reverse());
      }
    });
  }
  getMemberName(targetUid) {
    return this.detailMembers().find((m) => m.uid === targetUid)?.displayName ?? this.detailGroup()?.memberPreviews.find((p) => p.uid === targetUid)?.displayName ?? "a member";
  }
  addSystemMessage(groupId, text) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        return;
      yield supabase.from("group_messages").insert({
        group_id: groupId,
        uid: user.id,
        display_name: this.authService.userDisplayName(),
        photo_url: this.authService.userPhotoURL(),
        text,
        is_system: true
      });
    });
  }
  // ── Mutations ─────────────────────────────────────────────────────────────────
  createGroup(data) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const groupDateTime = new Date(data.date);
      const [h, m] = data.time.split(":").map(Number);
      groupDateTime.setHours(h, m, 0, 0);
      if (groupDateTime.getTime() < Date.now() + 24 * 60 * 60 * 1e3) {
        throw new Error("Group must be scheduled at least 24 hours in advance.");
      }
      const hasActive = this.openGroups().some((g) => g.leaderId === user.id);
      if (hasActive)
        throw new AlreadyHasActiveGroupError();
      const displayName = this.authService.userDisplayName();
      const photoURL = this.authService.userPhotoURL();
      const { data: row, error } = yield supabase.from("groups").insert({
        title: data.title,
        spot_slug: data.spotSlug,
        spot_title: data.spotTitle,
        spot_lat: data.spotLat,
        spot_lon: data.spotLon,
        date: groupDateTime.toISOString(),
        time: data.time,
        description: data.description,
        difficulty: data.difficulty,
        max_members: data.maxMembers,
        price_eur: data.price ?? null,
        status: "open",
        leader_id: user.id,
        meeting_point: data.meetingPoint ?? null,
        member_count: 1,
        member_previews: [{ uid: user.id, displayName, photoURL }]
      }).select("id").single();
      if (error)
        throw error;
      yield supabase.from("group_members").insert({
        group_id: row.id,
        uid: user.id,
        display_name: displayName,
        photo_url: photoURL,
        role: "leader"
      });
      this.myGroupIds.update((s) => /* @__PURE__ */ new Set([...s, row.id]));
      this.analytics.event("group_created", { spot: data.spotSlug, difficulty: data.difficulty });
      void this.userDataService.awardXp("group_created", row.id);
      return row.id;
    });
  }
  updateGroup(groupId, data) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const groupDateTime = new Date(data.date);
      const [h, m] = data.time.split(":").map(Number);
      groupDateTime.setHours(h, m, 0, 0);
      if (groupDateTime.getTime() < Date.now()) {
        throw new Error("Group date must be in the future.");
      }
      const old = this.detailGroup();
      const changes = [];
      const who = this.authService.userDisplayName() || "Someone";
      if (old) {
        if (old.title !== data.title) {
          changes.push(`${who} changed the group name to "${data.title}"`);
        }
        if ((old.spotTitle ?? null) !== (data.spotTitle ?? null)) {
          changes.push(data.spotTitle ? `${who} set the location to ${data.spotTitle}` : `${who} removed the location`);
        }
        const oldDt = old.date.toDate();
        const [oh, om] = old.time.split(":").map(Number);
        oldDt.setHours(oh, om, 0, 0);
        if (oldDt.getTime() !== groupDateTime.getTime()) {
          changes.push(`${who} rescheduled to ${_GroupsService.formatDateShort(groupDateTime)} at ${data.time}`);
        }
        if ((old.description ?? "") !== (data.description ?? "")) {
          changes.push(`${who} updated the description`);
        }
        if (old.difficulty !== data.difficulty) {
          changes.push(`${who} changed difficulty to ${data.difficulty}`);
        }
        if (old.maxMembers !== data.maxMembers) {
          changes.push(data.maxMembers !== null ? `${who} set the member limit to ${data.maxMembers}` : `${who} removed the member limit`);
        }
      }
      yield supabase.from("groups").update({
        title: data.title,
        spot_slug: data.spotSlug,
        spot_title: data.spotTitle,
        spot_lat: data.spotLat,
        spot_lon: data.spotLon,
        date: groupDateTime.toISOString(),
        time: data.time,
        description: data.description,
        difficulty: data.difficulty,
        max_members: data.maxMembers,
        price_eur: data.price ?? null,
        meeting_point: data.meetingPoint ?? null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", groupId);
      for (const text of changes) {
        this.addSystemMessage(groupId, text).catch(() => {
        });
      }
      this.analytics.event("group_updated", { groupId });
    });
  }
  joinGroup(groupId, phone) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const { error } = yield supabase.rpc("join_group", {
        p_group_id: groupId,
        p_phone: phone ?? null
      });
      if (error) {
        if (error.message.includes("group_full"))
          throw new GroupFullError();
        if (error.message.includes("group_not_accepting"))
          throw new Error("This group is no longer accepting members.");
        throw error;
      }
      this.myGroupIds.update((s) => /* @__PURE__ */ new Set([...s, groupId]));
      this.analytics.event("group_joined", { group_id: groupId, spot: this.detailGroup()?.spotSlug });
      void this.userDataService.awardXp("group_joined", groupId);
    });
  }
  leaveGroup(groupId) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const group = this.detailGroup();
      if (!group)
        throw new Error("Group not found");
      if (group.leaderId === user.id && group.memberCount > 1) {
        throw new LeaderMustTransferError();
      }
      const { error } = yield supabase.rpc("leave_group", {
        p_group_id: groupId,
        p_uid: user.id
      });
      if (error)
        throw error;
      this.myGroupIds.update((s) => {
        const n = new Set(s);
        n.delete(groupId);
        return n;
      });
      this.analytics.event("group_left", { group_id: groupId });
    });
  }
  assignLeader(groupId, targetUid) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      let target = this.detailMembers().find((m) => m.uid === targetUid);
      if (!target) {
        const { data } = yield supabase.from("group_members").select("*").eq("group_id", groupId).eq("uid", targetUid).maybeSingle();
        if (!data)
          throw new Error("Member not found");
        target = this.rowToMember(data);
      }
      yield supabase.from("groups").update({
        leader_id: targetUid,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", groupId);
      yield supabase.from("group_members").update({ role: "member" }).eq("group_id", groupId).eq("uid", user.id);
      yield supabase.from("group_members").update({ role: "leader" }).eq("group_id", groupId).eq("uid", targetUid);
      this.addSystemMessage(groupId, `${this.authService.userDisplayName() || "Someone"} made ${target.displayName} the group leader`).catch(() => {
      });
    });
  }
  transferOwnership(groupId, targetUid) {
    return __async(this, null, function* () {
      yield this.assignLeader(groupId, targetUid);
    });
  }
  removeMember(groupId, targetUid) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const group = this.detailGroup();
      if (!group)
        throw new Error("Group not found");
      if (group.leaderId === targetUid)
        throw new Error("Cannot remove the group leader.");
      const targetName = this.getMemberName(targetUid);
      const newCount = group.memberCount - 1;
      const newPreviews = group.memberPreviews.filter((p) => p.uid !== targetUid);
      yield supabase.from("group_members").delete().eq("group_id", groupId).eq("uid", targetUid);
      yield supabase.from("groups").update({
        member_count: newCount,
        member_previews: newPreviews,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", groupId);
      this.addSystemMessage(groupId, `${this.authService.userDisplayName() || "Someone"} removed ${targetName} from the group`).catch(() => {
      });
      this.analytics.event("group_member_removed", { group_id: groupId });
    });
  }
  muteMember(groupId, targetUid, minutes) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const targetName = this.getMemberName(targetUid);
      const muteUntil = new Date(Date.now() + minutes * 6e4).toISOString();
      yield supabase.from("group_members").update({ muted_until: muteUntil }).eq("group_id", groupId).eq("uid", targetUid);
      const label = minutes >= 60 ? `${minutes / 60}h` : `${minutes} min`;
      this.addSystemMessage(groupId, `${this.authService.userDisplayName() || "Someone"} muted ${targetName} for ${label}`).catch(() => {
      });
      this.analytics.event("group_member_muted", { group_id: groupId, minutes });
    });
  }
  unmuteMember(groupId, targetUid) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const targetName = this.getMemberName(targetUid);
      yield supabase.from("group_members").update({ muted_until: null }).eq("group_id", groupId).eq("uid", targetUid);
      this.addSystemMessage(groupId, `${this.authService.userDisplayName() || "Someone"} unmuted ${targetName}`).catch(() => {
      });
    });
  }
  bulkRemoveMembers(groupId, uids) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const group = this.detailGroup();
      if (!group)
        throw new Error("Group not found");
      const toRemove = uids.filter((uid) => uid !== group.leaderId && uid !== user.id);
      if (!toRemove.length)
        return;
      yield supabase.from("group_members").delete().eq("group_id", groupId).in("uid", toRemove);
      yield supabase.from("groups").update({
        member_count: group.memberCount - toRemove.length,
        member_previews: group.memberPreviews.filter((p) => !toRemove.includes(p.uid)),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", groupId);
      const who = this.authService.userDisplayName() || "Someone";
      const text = toRemove.length === 1 ? `${who} removed ${this.getMemberName(toRemove[0])} from the group` : `${who} removed ${toRemove.length} members from the group`;
      this.addSystemMessage(groupId, text).catch(() => {
      });
      this.analytics.event("group_bulk_removed", { group_id: groupId, count: toRemove.length });
    });
  }
  bulkMuteMembers(groupId, uids, minutes) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const muteUntil = new Date(Date.now() + minutes * 6e4).toISOString();
      yield Promise.all(uids.map((uid) => supabase.from("group_members").update({ muted_until: muteUntil }).eq("group_id", groupId).eq("uid", uid)));
      const who = this.authService.userDisplayName() || "Someone";
      const label = minutes >= 60 ? `${minutes / 60}h` : `${minutes} min`;
      const text = uids.length === 1 ? `${who} muted ${this.getMemberName(uids[0])} for ${label}` : `${who} muted ${uids.length} members for ${label}`;
      this.addSystemMessage(groupId, text).catch(() => {
      });
      this.analytics.event("group_bulk_muted", { group_id: groupId, count: uids.length, minutes });
    });
  }
  startExploring(groupId) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      yield supabase.from("groups").update({ status: "exploring", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", groupId);
      this.addSystemMessage(groupId, "\u{1F9ED} The group has started exploring!").catch(() => {
      });
      this.analytics.event("group_exploring_started", { groupId });
    });
  }
  cancelGroup(groupId) {
    return __async(this, null, function* () {
      yield supabase.from("groups").update({ status: "cancelled", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", groupId);
      this.addSystemMessage(groupId, "\u274C This group has been cancelled.").catch(() => {
      });
    });
  }
  completeGroup(groupId) {
    return __async(this, null, function* () {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      yield supabase.from("groups").update({ status: "completed", completed_at: now, updated_at: now }).eq("id", groupId);
      this.addSystemMessage(groupId, "\u{1F3C1} This group has been completed! The chat will remain open for 12 hours.").catch(() => {
      });
    });
  }
  correctMemberCount(groupId, members) {
    return __async(this, null, function* () {
      const previews = members.slice(0, 5).map((m) => ({
        uid: m.uid,
        displayName: m.displayName,
        photoURL: m.photoURL
      }));
      yield supabase.from("groups").update({
        member_count: members.length,
        member_previews: previews,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", groupId);
    });
  }
  sendMessage(groupId, text) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      if (!text.trim())
        return;
      const now = Date.now();
      const mutedUntil = this.mutedUntil();
      if (mutedUntil && mutedUntil.toMillis() > now) {
        throw new SpamMutedError(Math.ceil((mutedUntil.toMillis() - now) / 6e4));
      }
      this.messageSentAt = this.messageSentAt.filter((t) => now - t < 6e4);
      const lastSent = this.messageSentAt.at(-1);
      if (lastSent !== void 0 && now - lastSent < 5e3) {
        throw new CooldownError(Math.ceil((5e3 - (now - lastSent)) / 1e3));
      }
      if (this.messageSentAt.length >= 8) {
        const muteUntil = new Date(now + 10 * 6e4).toISOString();
        yield supabase.from("group_members").update({ muted_until: muteUntil }).eq("group_id", groupId).eq("uid", user.id);
        throw new SpamMutedError(10);
      }
      yield supabase.from("group_messages").insert({
        group_id: groupId,
        uid: user.id,
        display_name: this.authService.userDisplayName(),
        photo_url: this.authService.userPhotoURL(),
        text: text.trim().substring(0, 500),
        level: this.userDataService.levelInfo().id,
        is_admin: this.userDataService.isAdmin()
      });
      this.messageSentAt.push(now);
      this.analytics.event("group_message_sent", { group_id: groupId });
      void this.userDataService.awardXp("message_sent");
    });
  }
  pinMessage(groupId, msg) {
    return __async(this, null, function* () {
      if (!this.authService.user())
        throw new Error("Not authenticated");
      yield supabase.from("groups").update({
        pinned_message: {
          id: msg.id,
          text: msg.text,
          authorName: msg.displayName,
          pinnedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", groupId);
    });
  }
  unpinMessage(groupId) {
    return __async(this, null, function* () {
      if (!this.authService.user())
        throw new Error("Not authenticated");
      yield supabase.from("groups").update({
        pinned_message: null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", groupId);
    });
  }
  updateLastActive(groupId) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        return;
      const member = this.currentUserMember();
      if (member?.lastActive) {
        const elapsed = Date.now() - member.lastActive.toMillis();
        if (elapsed < 5 * 60 * 1e3)
          return;
      }
      try {
        yield supabase.from("group_members").update({ last_active: (/* @__PURE__ */ new Date()).toISOString() }).eq("group_id", groupId).eq("uid", user.id);
      } catch {
      }
    });
  }
  // ── One-shot spot query ──────────────────────────────────────────────────────
  fetchGroupsForSpot(slug) {
    return __async(this, null, function* () {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const { data } = yield supabase.from("groups").select("*, leader:user_profiles!leader_id(display_name, photo_url, level, role)").eq("spot_slug", slug).in("status", ["open", "full", "exploring"]).gte("date", today.toISOString()).order("date", { ascending: true });
      return data?.map((r) => this.rowToGroup(r)) ?? [];
    });
  }
  // ── Admin: per-user feature activation ───────────────────────────────────────
  activateGroupsAccess(email) {
    return __async(this, null, function* () {
      const { data, error } = yield supabase.rpc("activate_groups_access", { p_email: email });
      if (error)
        throw error;
      return data;
    });
  }
  activateGuideRole(email) {
    return __async(this, null, function* () {
      const { data, error } = yield supabase.rpc("activate_guide_role", { p_email: email });
      if (error)
        throw error;
      return data;
    });
  }
  // ── Admin: one-time migrations ─────────────────────────────────────────────
  migrateCompletedAt() {
    return __async(this, null, function* () {
      const { data: groups } = yield supabase.from("groups").select("id, completed_at, updated_at").eq("status", "completed");
      if (!groups)
        return 0;
      let updated = 0;
      yield Promise.all(groups.map((group) => __async(this, null, function* () {
        if (!group["completed_at"] && group["updated_at"]) {
          yield supabase.from("groups").update({ completed_at: group["updated_at"] }).eq("id", group["id"]);
          updated++;
        }
      })));
      return updated;
    });
  }
  // ── Utilities ────────────────────────────────────────────────────────────────
  static isGroupPast(g) {
    const dt = g.date.toDate();
    const [h, m] = g.time.split(":").map(Number);
    dt.setHours(h, m, 0, 0);
    return dt.getTime() + 24 * 60 * 60 * 1e3 < Date.now();
  }
  static formatDateShort(d) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  }
  static formatLastActive(ts) {
    const msAgo = Date.now() - ts.toMillis();
    const dayMs = 864e5;
    const weekMs = 7 * dayMs;
    if (msAgo < dayMs)
      return "Active today";
    if (msAgo < weekMs)
      return "Active this week";
    return "Inactive";
  }
  // ── Reports ──────────────────────────────────────────────────────────────────
  reportMessage(groupId, groupTitle, messageId, messageText) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        return;
      yield supabase.from("reports").insert({
        reporter_id: user.id,
        reporter_name: user.user_metadata?.["full_name"] ?? "Unknown",
        group_id: groupId,
        group_title: groupTitle,
        message_id: messageId,
        message_text: messageText.slice(0, 500)
      });
    });
  }
  fetchReports() {
    return __async(this, null, function* () {
      const { data, error } = yield supabase.from("reports").select("*").order("created_at", { ascending: false });
      if (error)
        throw error;
      return data ?? [];
    });
  }
  dismissReport(reportId) {
    return __async(this, null, function* () {
      yield supabase.from("reports").delete().eq("id", reportId);
    });
  }
  deleteReportedMessage(groupId, messageId, reportId) {
    return __async(this, null, function* () {
      yield supabase.from("group_messages").delete().eq("id", messageId).eq("group_id", groupId);
      yield supabase.from("reports").delete().eq("id", reportId);
    });
  }
  static {
    this.\u0275fac = function GroupsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupsService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GroupsService, factory: _GroupsService.\u0275fac, providedIn: "root" });
  }
};

export {
  AnalyticsService,
  GroupsService
};
//# sourceMappingURL=chunk-DFGQTCAD.js.map
