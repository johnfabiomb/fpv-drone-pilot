import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
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
  writeBatch
} from "./chunk-3PSU7TQQ.js";
import {
  AuthService
} from "./chunk-B55ERDNS.js";
import {
  __async,
  __spreadValues,
  computed,
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-UX7WDOQ6.js";

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

// src/app/shared/services/groups.service.ts
var GroupsService = class _GroupsService {
  constructor() {
    this.firestore = inject(Firestore);
    this.authService = inject(AuthService);
    this.analytics = inject(AnalyticsService);
    this.groups = signal([]);
    this.loading = signal(false);
    this.detailGroup = signal(null);
    this.detailMembers = signal([]);
    this.messages = signal([]);
    this.openGroups = computed(() => {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      return this.groups().filter((g) => (g.status === "open" || g.status === "full") && g.date.toDate() >= today);
    });
    this.groupsAsProviderPins = computed(() => this.openGroups().map((g) => ({
      id: g.id,
      name: g.title,
      tagline: `${g.memberCount} explorer${g.memberCount === 1 ? "" : "s"}`,
      emoji: "\u{1F465}",
      category: "group",
      lat: g.spotLat,
      lon: g.spotLon,
      showOnMap: true,
      mapLabel: "\u{1F465} Group"
    })));
    this.groupsUnsub = null;
    this.detailUnsub = null;
    this.membersUnsub = null;
    this.messagesUnsub = null;
  }
  // ── Groups list listener ──────────────────────────────────────────────────
  startGroupsListener() {
    this.stopGroupsListener();
    this.loading.set(true);
    const q = query(collection(this.firestore, "groups"), orderBy("date", "asc"));
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
  startDetailListener(id) {
    this.stopDetailListener();
    this.detailUnsub = onSnapshot(doc(this.firestore, "groups", id), (snap) => {
      this.detailGroup.set(snap.exists() ? __spreadValues({ id: snap.id }, snap.data()) : null);
    });
    this.membersUnsub = onSnapshot(query(collection(this.firestore, "groups", id, "members"), orderBy("joinedAt", "asc")), (snap) => {
      this.detailMembers.set(snap.docs.map((d) => d.data()));
    });
    this.messagesUnsub = onSnapshot(query(collection(this.firestore, "groups", id, "messages"), orderBy("createdAt", "asc")), (snap) => {
      const all = snap.docs.map((d) => __spreadValues({ id: d.id }, d.data()));
      this.messages.set(all.slice(-100));
    });
  }
  stopDetailListener() {
    this.detailUnsub?.();
    this.membersUnsub?.();
    this.messagesUnsub?.();
    this.detailUnsub = null;
    this.membersUnsub = null;
    this.messagesUnsub = null;
    this.detailGroup.set(null);
    this.detailMembers.set([]);
    this.messages.set([]);
  }
  // ── Mutations ─────────────────────────────────────────────────────────────
  createGroup(data) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
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
        if (group.status === "cancelled" || group.status === "completed") {
          throw new Error("This group is no longer active.");
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
  leaveGroup(groupId) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const group = this.detailGroup();
      const members = this.detailMembers();
      if (group?.leaderId === user.uid && members.length > 1) {
        throw new LeaderMustTransferError();
      }
      const groupRef = doc(this.firestore, "groups", groupId);
      const memberRef = doc(this.firestore, "groups", groupId, "members", user.uid);
      if (members.length <= 1) {
        const batch = writeBatch(this.firestore);
        batch.delete(memberRef);
        batch.delete(groupRef);
        yield batch.commit();
      } else {
        const newCount = (group?.memberCount ?? 1) - 1;
        const newPreviews = (group?.memberPreviews ?? []).filter((p) => p.uid !== user.uid);
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
      const members = this.detailMembers();
      const target = members.find((m) => m.uid === targetUid);
      if (!target)
        throw new Error("Member not found");
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const groupRef = doc(this.firestore, "groups", groupId);
      const oldLeaderRef = doc(this.firestore, "groups", groupId, "members", user.uid);
      const newLeaderRef = doc(this.firestore, "groups", groupId, "members", targetUid);
      const batch = writeBatch(this.firestore);
      batch.update(oldLeaderRef, { role: "member" });
      batch.update(newLeaderRef, { role: "leader" });
      batch.update(groupRef, {
        leaderId: targetUid,
        leaderName: target.displayName,
        leaderPhoto: target.photoURL,
        updatedAt: serverTimestamp()
      });
      yield batch.commit();
    });
  }
  transferOwnership(groupId, targetUid) {
    return __async(this, null, function* () {
      yield this.assignLeader(groupId, targetUid);
    });
  }
  cancelGroup(groupId) {
    return __async(this, null, function* () {
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        status: "cancelled",
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
      yield addDoc(collection(this.firestore, "groups", groupId, "messages"), {
        uid: user.uid,
        displayName: user.displayName ?? "Explorer",
        photoURL: user.photoURL ?? "",
        text: text.trim().substring(0, 500),
        createdAt: serverTimestamp()
      });
      this.analytics.event("group_message_sent", { group_id: groupId });
    });
  }
  updateLastActive(groupId) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        return;
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
      const snap = yield getDocs(query(collection(this.firestore, "groups"), where("spotSlug", "==", slug), where("status", "in", ["open", "full"]), where("date", ">=", Timestamp.fromDate(today)), orderBy("date", "asc")));
      return snap.docs.map((d) => __spreadValues({ id: d.id }, d.data()));
    });
  }
  // ── Utilities ─────────────────────────────────────────────────────────────
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
  GroupFullError,
  LeaderMustTransferError,
  GroupsService
};
//# sourceMappingURL=chunk-ICA2IC5M.js.map
