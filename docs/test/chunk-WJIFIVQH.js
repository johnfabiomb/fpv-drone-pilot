import {
  Firestore,
  Timestamp,
  UserDataService,
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
  writeBatch
} from "./chunk-AUG5IYR7.js";
import {
  AuthService
} from "./chunk-HPOPY4XD.js";
import {
  locations
} from "./chunk-ZGA5L2H3.js";
import {
  __async,
  __spreadValues,
  computed,
  effect,
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E43Y6J77.js";

// src/app/shared/services/analytics.service.ts
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

// src/app/shared/models/group.model.ts
var CooldownError = class extends Error {
  constructor(secondsLeft) {
    super(`Please wait ${secondsLeft}s before sending again.`);
    this.secondsLeft = secondsLeft;
    this.name = "CooldownError";
  }
};
var SpamMutedError = class extends Error {
  constructor(minutesLeft) {
    super(`You've been muted for ${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`);
    this.minutesLeft = minutesLeft;
    this.name = "SpamMutedError";
  }
};
var GroupFullError = class extends Error {
  constructor() {
    super("This group is already full.");
    this.name = "GroupFullError";
  }
};
var LeaderMustTransferError = class extends Error {
  constructor() {
    super("You must transfer leadership before leaving the group.");
    this.name = "LeaderMustTransferError";
  }
};
var AlreadyHasActiveGroupError = class extends Error {
  constructor() {
    super("You already have an active group. Cancel or complete it before creating a new one.");
    this.name = "AlreadyHasActiveGroupError";
  }
};

// src/app/shared/services/groups.service.ts
var GroupsService = class _GroupsService {
  constructor() {
    this.firestore = inject(Firestore);
    this.authService = inject(AuthService);
    this.analytics = inject(AnalyticsService);
    this.userDataService = inject(UserDataService);
    this.groups = signal([]);
    this.loading = signal(false);
    this.detailGroup = signal(null);
    this.detailMembers = signal([]);
    this.messages = signal([]);
    this.earlierMessages = signal([]);
    this.messagesOldestDoc = null;
    this.hasMoreMessages = signal(false);
    this.loadingEarlier = signal(false);
    this.allMessages = computed(() => [...this.earlierMessages(), ...this.messages()]);
    this.currentUserMember = signal(null);
    this.currentUserIsMember = computed(() => !!this.currentUserMember());
    this.messageSentAt = [];
    this.openGroups = computed(() => this.groups().filter((g) => g.status === "exploring" || (g.status === "open" || g.status === "full") && !_GroupsService.isGroupPast(g)));
    this.recentPastGroups = computed(() => {
      const weekAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1e3;
      return this.groups().filter((g) => {
        const isPast = g.status === "completed" || g.status === "cancelled" || (g.status === "open" || g.status === "full") && _GroupsService.isGroupPast(g);
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
    this.groupsUnsub = null;
    this.detailUnsub = null;
    this.currentMemberUnsub = null;
    this.membersUnsub = null;
    this.messagesUnsub = null;
    this.currentDetailId = "";
    this.cachedDetailId = "";
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
  startGroupsListener() {
    this.stopGroupsListener();
    this.loading.set(true);
    const weekAgo = /* @__PURE__ */ new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const q = query(collection(this.firestore, "groups"), where("date", ">=", Timestamp.fromDate(weekAgo)), orderBy("date", "asc"));
    this.groupsUnsub = onSnapshot(q, (snapshot) => {
      this.groups.set(snapshot.docs.map((d) => __spreadValues({ id: d.id }, d.data())));
      this.loading.set(false);
    }, () => this.loading.set(false));
  }
  stopGroupsListener() {
    this.groupsUnsub?.();
    this.groupsUnsub = null;
  }
  // ── Group detail listener ─────────────────────────────────────────────────
  // Starts the group doc + messages listeners, plus a 1-doc listener on the
  // current user's member document (isMember + mutedUntil, 1 read instead of N).
  // The full members subcollection is loaded separately, on demand.
  startDetailListener(id) {
    if (id !== this.cachedDetailId) {
      this.detailGroup.set(null);
      this.messages.set([]);
    }
    this.cachedDetailId = id;
    this.stopDetailListener();
    this.currentDetailId = id;
    this.detailUnsub = onSnapshot(doc(this.firestore, "groups", id), (snap) => {
      this.detailGroup.set(snap.exists() ? __spreadValues({ id: snap.id }, snap.data()) : null);
    });
    this.messagesUnsub = onSnapshot(query(collection(this.firestore, "groups", id, "messages"), orderBy("createdAt", "desc"), limit(30)), (snap) => {
      if (this.earlierMessages().length === 0) {
        this.messagesOldestDoc = snap.docs[snap.docs.length - 1] ?? null;
        this.hasMoreMessages.set(snap.docs.length >= 30);
      }
      this.messages.set(snap.docs.map((d) => __spreadValues({ id: d.id }, d.data())).reverse());
    });
    this.startCurrentUserMemberListener(id);
  }
  stopDetailListener() {
    this.detailUnsub?.();
    this.messagesUnsub?.();
    this.currentMemberUnsub?.();
    this.stopMembersListener();
    this.detailUnsub = null;
    this.messagesUnsub = null;
    this.currentMemberUnsub = null;
    this.currentDetailId = "";
    this.detailMembers.set([]);
    this.currentUserMember.set(null);
    this.earlierMessages.set([]);
    this.messagesOldestDoc = null;
    this.hasMoreMessages.set(false);
    this.messageSentAt = [];
  }
  // ── Message pagination ────────────────────────────────────────────────────
  loadEarlierMessages(groupId) {
    return __async(this, null, function* () {
      if (!this.messagesOldestDoc || this.loadingEarlier())
        return;
      this.loadingEarlier.set(true);
      try {
        const snap = yield getDocs(query(collection(this.firestore, "groups", groupId, "messages"), orderBy("createdAt", "desc"), startAfter(this.messagesOldestDoc), limit(30)));
        if (snap.empty) {
          this.hasMoreMessages.set(false);
          return;
        }
        this.messagesOldestDoc = snap.docs[snap.docs.length - 1];
        const older = snap.docs.map((d) => __spreadValues({ id: d.id }, d.data())).reverse();
        this.earlierMessages.set([...older, ...this.earlierMessages()]);
        this.hasMoreMessages.set(snap.docs.length >= 30);
      } finally {
        this.loadingEarlier.set(false);
      }
    });
  }
  // ── Members subcollection — on-demand ─────────────────────────────────────
  // Call when the user expands the member list or initiates a leader transfer.
  // Stops automatically in stopDetailListener.
  startMembersListener(id) {
    if (this.membersUnsub)
      return;
    if (!this.authService.user())
      return;
    this.membersUnsub = onSnapshot(query(collection(this.firestore, "groups", id, "members"), orderBy("joinedAt", "asc")), (snap) => {
      this.detailMembers.set(snap.docs.map((d) => d.data()));
    });
  }
  stopMembersListener() {
    this.membersUnsub?.();
    this.membersUnsub = null;
    this.detailMembers.set([]);
  }
  // ── Current user's 1-doc member listener ─────────────────────────────────
  startCurrentUserMemberListener(groupId) {
    this.currentMemberUnsub?.();
    const user = this.authService.user();
    if (!user) {
      this.currentUserMember.set(null);
      return;
    }
    this.currentMemberUnsub = onSnapshot(doc(this.firestore, "groups", groupId, "members", user.uid), (snap) => {
      this.currentUserMember.set(snap.exists() ? snap.data() : null);
    });
  }
  // ── Mutations ─────────────────────────────────────────────────────────────
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
      const hasActive = this.openGroups().some((g) => g.leaderId === user.uid);
      if (hasActive)
        throw new AlreadyHasActiveGroupError();
      const ref = yield addDoc(collection(this.firestore, "groups"), {
        title: data.title,
        spotSlug: data.spotSlug,
        spotTitle: data.spotTitle,
        spotLat: data.spotLat,
        spotLon: data.spotLon,
        date: Timestamp.fromDate(data.date),
        time: data.time,
        description: data.description,
        difficulty: data.difficulty,
        maxMembers: data.maxMembers,
        status: "open",
        leaderId: user.uid,
        leaderName: user.displayName ?? "Explorer",
        leaderPhoto: user.photoURL ?? "",
        leaderIsAdmin: this.userDataService.isAdmin(),
        meetingPoint: data.meetingPoint ?? null,
        memberCount: 1,
        memberPreviews: [{ uid: user.uid, displayName: user.displayName ?? "Explorer", photoURL: user.photoURL ?? "" }],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      yield setDoc(doc(this.firestore, "groups", ref.id, "members", user.uid), {
        uid: user.uid,
        displayName: user.displayName ?? "Explorer",
        photoURL: user.photoURL ?? "",
        role: "leader",
        joinedAt: serverTimestamp(),
        lastActive: serverTimestamp()
      });
      this.analytics.event("group_created", { spot: data.spotSlug, difficulty: data.difficulty });
      return ref.id;
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
      if (old) {
        const who = user.displayName ?? "Someone";
        if (old.title !== data.title) {
          changes.push(`${who} changed the group name to "${data.title}"`);
        }
        const oldSpot = old.spotTitle ?? null;
        const newSpot = data.spotTitle ?? null;
        if (oldSpot !== newSpot) {
          changes.push(newSpot ? `${who} set the location to ${newSpot}` : `${who} removed the location`);
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
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        title: data.title,
        spotSlug: data.spotSlug,
        spotTitle: data.spotTitle,
        spotLat: data.spotLat,
        spotLon: data.spotLon,
        date: Timestamp.fromDate(groupDateTime),
        time: data.time,
        description: data.description,
        difficulty: data.difficulty,
        maxMembers: data.maxMembers,
        meetingPoint: data.meetingPoint ?? null,
        updatedAt: serverTimestamp()
      });
      for (const text of changes) {
        this.addSystemMessage(groupId, text).catch(() => {
        });
      }
      this.analytics.event("group_updated", { groupId });
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
      yield addDoc(collection(this.firestore, "groups", groupId, "messages"), {
        uid: user.uid,
        displayName: user.displayName ?? "Someone",
        photoURL: user.photoURL ?? "",
        text,
        isSystem: true,
        createdAt: serverTimestamp()
      });
    });
  }
  joinGroup(groupId) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const groupRef = doc(this.firestore, "groups", groupId);
      const memberRef = doc(this.firestore, "groups", groupId, "members", user.uid);
      yield runTransaction(this.firestore, (tx) => __async(this, null, function* () {
        const groupSnap = yield tx.get(groupRef);
        if (!groupSnap.exists())
          throw new Error("Group not found");
        const group = groupSnap.data();
        if (group.status === "cancelled" || group.status === "completed" || group.status === "exploring") {
          throw new Error("This group is no longer accepting members.");
        }
        if (group.maxMembers !== null && group.memberCount >= group.maxMembers) {
          throw new GroupFullError();
        }
        const newCount = group.memberCount + 1;
        const newPreviews = group.memberPreviews.length < 5 ? [...group.memberPreviews, { uid: user.uid, displayName: user.displayName ?? "Explorer", photoURL: user.photoURL ?? "" }] : group.memberPreviews;
        const newStatus = group.maxMembers !== null && newCount >= group.maxMembers ? "full" : "open";
        tx.update(groupRef, {
          memberCount: newCount,
          memberPreviews: newPreviews,
          status: newStatus,
          updatedAt: serverTimestamp()
        });
        tx.set(memberRef, {
          uid: user.uid,
          displayName: user.displayName ?? "Explorer",
          photoURL: user.photoURL ?? "",
          role: "member",
          joinedAt: serverTimestamp(),
          lastActive: serverTimestamp()
        });
      }));
      this.analytics.event("group_joined", { group_id: groupId, spot: this.detailGroup()?.spotSlug });
    });
  }
  // Uses group.memberCount + group.memberPreviews (both on the group doc) so
  // the full members subcollection is never needed just for leaving.
  leaveGroup(groupId) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const group = this.detailGroup();
      if (!group)
        throw new Error("Group not found");
      if (group.leaderId === user.uid && group.memberCount > 1) {
        throw new LeaderMustTransferError();
      }
      const groupRef = doc(this.firestore, "groups", groupId);
      const memberRef = doc(this.firestore, "groups", groupId, "members", user.uid);
      if (group.memberCount <= 1) {
        const batch = writeBatch(this.firestore);
        batch.delete(memberRef);
        batch.delete(groupRef);
        yield batch.commit();
      } else {
        const newCount = group.memberCount - 1;
        const newPreviews = group.memberPreviews.filter((p) => p.uid !== user.uid);
        const batch = writeBatch(this.firestore);
        batch.update(groupRef, { memberCount: newCount, memberPreviews: newPreviews, updatedAt: serverTimestamp() });
        batch.delete(memberRef);
        yield batch.commit();
      }
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
        const snap = yield getDoc(doc(this.firestore, "groups", groupId, "members", targetUid));
        if (!snap.exists())
          throw new Error("Member not found");
        target = snap.data();
      }
      const groupRef = doc(this.firestore, "groups", groupId);
      const oldLeaderRef = doc(this.firestore, "groups", groupId, "members", user.uid);
      const newLeaderRef = doc(this.firestore, "groups", groupId, "members", targetUid);
      const targetUserSnap = yield getDoc(doc(this.firestore, "users", targetUid));
      const targetIsAdmin = targetUserSnap.exists() && targetUserSnap.data()["role"] === "admin";
      const batch = writeBatch(this.firestore);
      batch.update(oldLeaderRef, { role: "member" });
      batch.update(newLeaderRef, { role: "leader" });
      batch.update(groupRef, {
        leaderId: targetUid,
        leaderName: target.displayName,
        leaderPhoto: target.photoURL,
        leaderIsAdmin: targetIsAdmin,
        updatedAt: serverTimestamp()
      });
      yield batch.commit();
      this.addSystemMessage(groupId, `${user.displayName ?? "Someone"} made ${target.displayName} the group leader`).catch(() => {
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
      const groupRef = doc(this.firestore, "groups", groupId);
      const memberRef = doc(this.firestore, "groups", groupId, "members", targetUid);
      const newCount = group.memberCount - 1;
      const newPreviews = group.memberPreviews.filter((p) => p.uid !== targetUid);
      const batch = writeBatch(this.firestore);
      batch.update(groupRef, { memberCount: newCount, memberPreviews: newPreviews, updatedAt: serverTimestamp() });
      batch.delete(memberRef);
      yield batch.commit();
      this.addSystemMessage(groupId, `${user.displayName ?? "Someone"} removed ${targetName} from the group`).catch(() => {
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
      const muteUntil = Timestamp.fromMillis(Date.now() + minutes * 6e4);
      yield updateDoc(doc(this.firestore, "groups", groupId, "members", targetUid), {
        mutedUntil: muteUntil
      });
      const label = minutes >= 60 ? `${minutes / 60}h` : `${minutes} min`;
      this.addSystemMessage(groupId, `${user.displayName ?? "Someone"} muted ${targetName} for ${label}`).catch(() => {
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
      yield updateDoc(doc(this.firestore, "groups", groupId, "members", targetUid), {
        mutedUntil: null
      });
      this.addSystemMessage(groupId, `${user.displayName ?? "Someone"} unmuted ${targetName}`).catch(() => {
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
      const toRemove = uids.filter((uid) => uid !== group.leaderId);
      if (!toRemove.length)
        return;
      const batch = writeBatch(this.firestore);
      const groupRef = doc(this.firestore, "groups", groupId);
      batch.update(groupRef, {
        memberCount: group.memberCount - toRemove.length,
        memberPreviews: group.memberPreviews.filter((p) => !toRemove.includes(p.uid)),
        updatedAt: serverTimestamp()
      });
      for (const uid of toRemove) {
        batch.delete(doc(this.firestore, "groups", groupId, "members", uid));
      }
      yield batch.commit();
      const who = user.displayName ?? "Someone";
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
      const muteUntil = Timestamp.fromMillis(Date.now() + minutes * 6e4);
      const batch = writeBatch(this.firestore);
      for (const uid of uids) {
        batch.update(doc(this.firestore, "groups", groupId, "members", uid), { mutedUntil: muteUntil });
      }
      yield batch.commit();
      const who = user.displayName ?? "Someone";
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
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        status: "exploring",
        updatedAt: serverTimestamp()
      });
      this.addSystemMessage(groupId, "\u{1F9ED} The group has started exploring!").catch(() => {
      });
      this.analytics.event("group_exploring_started", { groupId });
    });
  }
  cancelGroup(groupId) {
    return __async(this, null, function* () {
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        status: "cancelled",
        updatedAt: serverTimestamp()
      });
      this.addSystemMessage(groupId, "\u274C This group has been cancelled.").catch(() => {
      });
    });
  }
  completeGroup(groupId) {
    return __async(this, null, function* () {
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        status: "completed",
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      this.addSystemMessage(groupId, "\u{1F3C1} This group has been completed! The chat will remain open for 12 hours.").catch(() => {
      });
    });
  }
  // Silently re-syncs memberCount + memberPreviews when the denormalized count
  // drifts from the actual subcollection (e.g. members removed via console).
  correctMemberCount(groupId, members) {
    return __async(this, null, function* () {
      const previews = members.slice(0, 5).map((m) => ({
        uid: m.uid,
        displayName: m.displayName,
        photoURL: m.photoURL
      }));
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        memberCount: members.length,
        memberPreviews: previews,
        updatedAt: serverTimestamp()
      });
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
        const muteUntilTs = Timestamp.fromMillis(now + 10 * 6e4);
        yield updateDoc(doc(this.firestore, "groups", groupId, "members", user.uid), {
          mutedUntil: muteUntilTs
        });
        throw new SpamMutedError(10);
      }
      yield addDoc(collection(this.firestore, "groups", groupId, "messages"), {
        uid: user.uid,
        displayName: user.displayName ?? "Explorer",
        photoURL: user.photoURL ?? "",
        text: text.trim().substring(0, 500),
        createdAt: serverTimestamp(),
        level: this.userDataService.levelInfo().id,
        isAdmin: this.userDataService.isAdmin()
      });
      this.messageSentAt.push(now);
      this.analytics.event("group_message_sent", { group_id: groupId });
    });
  }
  pinMessage(groupId, msg) {
    return __async(this, null, function* () {
      if (!this.authService.user())
        throw new Error("Not authenticated");
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        pinnedMessage: {
          id: msg.id,
          text: msg.text,
          authorName: msg.displayName,
          pinnedAt: serverTimestamp()
        },
        updatedAt: serverTimestamp()
      });
    });
  }
  unpinMessage(groupId) {
    return __async(this, null, function* () {
      if (!this.authService.user())
        throw new Error("Not authenticated");
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        pinnedMessage: null,
        updatedAt: serverTimestamp()
      });
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
        yield updateDoc(doc(this.firestore, "groups", groupId, "members", user.uid), { lastActive: serverTimestamp() });
      } catch {
      }
    });
  }
  // ── One-shot spot query (for location detail widget) ──────────────────────
  fetchGroupsForSpot(slug) {
    return __async(this, null, function* () {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const snap = yield getDocs(query(collection(this.firestore, "groups"), where("spotSlug", "==", slug), where("status", "in", ["open", "full", "exploring"]), where("date", ">=", Timestamp.fromDate(today)), orderBy("date", "asc")));
      return snap.docs.map((d) => __spreadValues({ id: d.id }, d.data()));
    });
  }
  // ── Admin: per-user feature activation ───────────────────────────────────
  /** Finds a user doc by email and sets featureAccess.groups = true. */
  activateGroupsAccess(email) {
    return __async(this, null, function* () {
      const q = query(collection(this.firestore, "users"), where("email", "==", email), limit(1));
      const snap = yield getDocs(q);
      if (snap.empty)
        return "not_found";
      yield updateDoc(snap.docs[0].ref, { "featureAccess.groups": true });
      return "ok";
    });
  }
  // ── One-time migration ────────────────────────────────────────────────────
  // Backfills leaderIsAdmin on all existing group docs.
  // Safe to call multiple times — idempotent.
  migrateLeaderIsAdmin() {
    return __async(this, null, function* () {
      const snap = yield getDocs(collection(this.firestore, "groups"));
      let updated = 0;
      yield Promise.all(snap.docs.map((groupDoc) => __async(this, null, function* () {
        const leaderId = groupDoc.data().leaderId;
        const userSnap = yield getDoc(doc(this.firestore, "users", leaderId));
        const isAdmin = userSnap.exists() && userSnap.data()["role"] === "admin";
        yield updateDoc(groupDoc.ref, { leaderIsAdmin: isAdmin });
        updated++;
      })));
      return updated;
    });
  }
  // Backfills completedAt for groups that were completed before the field was introduced.
  // Uses updatedAt as the best available proxy for when the group was completed.
  migrateCompletedAt() {
    return __async(this, null, function* () {
      const snap = yield getDocs(query(collection(this.firestore, "groups"), where("status", "==", "completed")));
      let updated = 0;
      yield Promise.all(snap.docs.map((groupDoc) => __async(this, null, function* () {
        const data = groupDoc.data();
        if (!data.completedAt && data.updatedAt) {
          yield updateDoc(groupDoc.ref, { completedAt: data.updatedAt });
          updated++;
        }
      })));
      return updated;
    });
  }
  // ── Utilities ─────────────────────────────────────────────────────────────
  // True when the group's start time + 24h grace period has passed
  // (keeps the group active while members are still out exploring)
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
    const now = Date.now();
    const msAgo = now - ts.toMillis();
    const dayMs = 864e5;
    const weekMs = 7 * dayMs;
    if (msAgo < dayMs)
      return "Active today";
    if (msAgo < weekMs)
      return "Active this week";
    return "Inactive";
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
  CooldownError,
  SpamMutedError,
  GroupFullError,
  LeaderMustTransferError,
  AlreadyHasActiveGroupError,
  GroupsService
};
//# sourceMappingURL=chunk-WJIFIVQH.js.map
