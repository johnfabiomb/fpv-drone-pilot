import {
  UserAvatarComponent
} from "./chunk-O7RR7VM6.js";
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
  updateDoc,
  where,
  writeBatch
} from "./chunk-6LXICVCO.js";
import {
  AuthService
} from "./chunk-3P7EVM2E.js";
import {
  locations
} from "./chunk-ZGA5L2H3.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  __async,
  __spreadValues,
  computed,
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-EBDCVLEQ.js";

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

// src/app/components/member-avatars/member-avatars.component.ts
function MemberAvatarsComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "app-user-avatar", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("z-index", ctx_r2.visible().length - i_r2);
    \u0275\u0275advance();
    \u0275\u0275property("photoURL", p_r1.photoURL)("displayName", p_r1.displayName)("level", 1);
  }
}
function MemberAvatarsComponent_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", ctx_r2.overflow(), "");
  }
}
var MemberAvatarsComponent = class _MemberAvatarsComponent {
  constructor() {
    this._previews = signal([]);
    this._total = signal(0);
    this.visible = computed(() => this._previews().slice(0, 5));
    this.overflow = computed(() => Math.max(0, this._total() - this.visible().length));
  }
  set previews(v) {
    this._previews.set(v ?? []);
  }
  set total(v) {
    this._total.set(v ?? 0);
  }
  static {
    this.\u0275fac = function MemberAvatarsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MemberAvatarsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MemberAvatarsComponent, selectors: [["app-member-avatars"]], inputs: { previews: "previews", total: "total" }, decls: 3, vars: 2, consts: [[1, "avatars"], ["class", "avatars__wrap", 3, "z-index", 4, "ngFor", "ngForOf"], ["class", "avatars__more", 4, "ngIf"], [1, "avatars__wrap"], ["size", "sm", "shape", "circle", 3, "photoURL", "displayName", "level"], [1, "avatars__more"]], template: function MemberAvatarsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, MemberAvatarsComponent_div_1_Template, 2, 5, "div", 1)(2, MemberAvatarsComponent_span_2_Template, 2, 1, "span", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.visible());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.overflow() > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, UserAvatarComponent], styles: ["\n\n.avatars[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.avatars__wrap[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-shrink: 0;\n  border-radius: 50%;\n  box-shadow: 0 0 0 2px var(--color-bg);\n}\n.avatars__wrap[_ngcontent-%COMP%]    + .avatars__wrap[_ngcontent-%COMP%] {\n  margin-left: -8px;\n}\n.avatars__more[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--color-bg-muted);\n  box-shadow: 0 0 0 2px var(--color-bg);\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-left: -8px;\n}\n/*# sourceMappingURL=member-avatars.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MemberAvatarsComponent, { className: "MemberAvatarsComponent", filePath: "src/app/components/member-avatars/member-avatars.component.ts", lineNumber: 59 });
})();

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
    this.groupsAsProviderPins = computed(() => this.openGroups().map((g) => {
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
  // Starts the group doc + messages listeners, plus a 1-doc listener on the
  // current user's member document (isMember + mutedUntil, 1 read instead of N).
  // The full members subcollection is loaded separately, on demand.
  startDetailListener(id) {
    this.stopDetailListener();
    this.currentDetailId = id;
    this.detailUnsub = onSnapshot(doc(this.firestore, "groups", id), (snap) => {
      this.detailGroup.set(snap.exists() ? __spreadValues({ id: snap.id }, snap.data()) : null);
    });
    this.messagesUnsub = onSnapshot(query(collection(this.firestore, "groups", id, "messages"), orderBy("createdAt", "desc"), limit(100)), (snap) => {
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
    this.detailGroup.set(null);
    this.detailMembers.set([]);
    this.messages.set([]);
    this.currentUserMember.set(null);
    this.messageSentAt = [];
  }
  // ── Members subcollection — on-demand ─────────────────────────────────────
  // Call when the user expands the member list or initiates a leader transfer.
  // Stops automatically in stopDetailListener.
  startMembersListener(id) {
    if (this.membersUnsub)
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
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        title: data.title,
        date: Timestamp.fromDate(data.date),
        time: data.time,
        description: data.description,
        difficulty: data.difficulty,
        maxMembers: data.maxMembers,
        meetingPoint: data.meetingPoint ?? null,
        updatedAt: serverTimestamp()
      });
      this.analytics.event("group_updated", { groupId });
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
      const groupRef = doc(this.firestore, "groups", groupId);
      const memberRef = doc(this.firestore, "groups", groupId, "members", targetUid);
      const newCount = group.memberCount - 1;
      const newPreviews = group.memberPreviews.filter((p) => p.uid !== targetUid);
      const batch = writeBatch(this.firestore);
      batch.update(groupRef, { memberCount: newCount, memberPreviews: newPreviews, updatedAt: serverTimestamp() });
      batch.delete(memberRef);
      yield batch.commit();
      this.analytics.event("group_member_removed", { group_id: groupId });
    });
  }
  muteMember(groupId, targetUid, minutes) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      const muteUntil = Timestamp.fromMillis(Date.now() + minutes * 6e4);
      yield updateDoc(doc(this.firestore, "groups", groupId, "members", targetUid), {
        mutedUntil: muteUntil
      });
      this.analytics.event("group_member_muted", { group_id: groupId, minutes });
    });
  }
  unmuteMember(groupId, targetUid) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        throw new Error("Not authenticated");
      yield updateDoc(doc(this.firestore, "groups", groupId, "members", targetUid), {
        mutedUntil: null
      });
    });
  }
  bulkRemoveMembers(groupId, uids) {
    return __async(this, null, function* () {
      if (!this.authService.user())
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
      this.analytics.event("group_bulk_removed", { group_id: groupId, count: toRemove.length });
    });
  }
  bulkMuteMembers(groupId, uids, minutes) {
    return __async(this, null, function* () {
      if (!this.authService.user())
        throw new Error("Not authenticated");
      const muteUntil = Timestamp.fromMillis(Date.now() + minutes * 6e4);
      const batch = writeBatch(this.firestore);
      for (const uid of uids) {
        batch.update(doc(this.firestore, "groups", groupId, "members", uid), { mutedUntil: muteUntil });
      }
      yield batch.commit();
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
      this.analytics.event("group_exploring_started", { groupId });
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
  completeGroup(groupId) {
    return __async(this, null, function* () {
      yield updateDoc(doc(this.firestore, "groups", groupId), {
        status: "completed",
        updatedAt: serverTimestamp()
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
        createdAt: serverTimestamp()
      });
      this.messageSentAt.push(now);
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
      const snap = yield getDocs(query(collection(this.firestore, "groups"), where("spotSlug", "==", slug), where("status", "in", ["open", "full", "exploring"]), where("date", ">=", Timestamp.fromDate(today)), orderBy("date", "asc")));
      return snap.docs.map((d) => __spreadValues({ id: d.id }, d.data()));
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
  // ── Utilities ─────────────────────────────────────────────────────────────
  // True when the group's start time + 24h grace period has passed
  // (keeps the group active while members are still out exploring)
  static isGroupPast(g) {
    const dt = g.date.toDate();
    const [h, m] = g.time.split(":").map(Number);
    dt.setHours(h, m, 0, 0);
    return dt.getTime() + 24 * 60 * 60 * 1e3 < Date.now();
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
  MemberAvatarsComponent,
  CooldownError,
  SpamMutedError,
  GroupFullError,
  LeaderMustTransferError,
  AlreadyHasActiveGroupError,
  GroupsService
};
//# sourceMappingURL=chunk-N6BDKNKS.js.map
