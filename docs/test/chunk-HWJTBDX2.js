import {
  UserRole
} from "./chunk-PHYDDMB4.js";
import {
  AuthService,
  supabase
} from "./chunk-HMI5MUHL.js";
import {
  PLATFORM_ID,
  computed,
  effect,
  inject,
  isPlatformBrowser,
  signal,
  ɵɵdefineInjectable
} from "./chunk-7275G3GP.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/core/utils/level.utils.ts
var LEVELS = [
  {
    id: 0,
    name: "New",
    emoji: "\u2728",
    minXp: 0,
    minDays: 0,
    maxGroupMembers: null,
    description: "Welcome! Explore the map for your first 24 hours.",
    perk: "Levelling up unlocks after your first 24 hours"
  },
  {
    id: 1,
    name: "Explorer",
    emoji: "\u{1F9ED}",
    minXp: 0,
    minDays: 0,
    maxGroupMembers: 5,
    description: "You've just arrived on the island.",
    perk: "Full map access \u2014 create groups with up to 5 members"
  },
  {
    id: 2,
    name: "Wanderer",
    emoji: "\u{1F6B6}",
    minXp: 150,
    minDays: 5,
    maxGroupMembers: 10,
    description: "Venturing beyond the tourist trail.",
    perk: "Groups up to 10 members + hidden gem badge"
  },
  {
    id: 3,
    name: "Scout",
    emoji: "\u{1F52D}",
    minXp: 500,
    minDays: 14,
    maxGroupMembers: 15,
    description: "You've got a nose for hidden spots.",
    perk: "Groups up to 15 members + priority leader ranking"
  },
  {
    id: 4,
    name: "Navigator",
    emoji: "\u2693",
    minXp: 1500,
    minDays: 30,
    maxGroupMembers: 25,
    description: "You know the coastline by heart.",
    perk: "Groups up to 25 members + gold profile badge"
  },
  {
    id: 5,
    name: "Pioneer",
    emoji: "\u{1F525}",
    minXp: 4e3,
    minDays: 60,
    maxGroupMembers: 40,
    description: "Discovered Malta's best kept secrets.",
    perk: "Groups up to 40 members + exclusive fire badge"
  },
  {
    id: 6,
    name: "Legend",
    emoji: "\u{1F451}",
    minXp: 1e4,
    minDays: 120,
    maxGroupMembers: null,
    description: "A true islander. Malta runs in your veins.",
    perk: "Unlimited groups + permanent Legend status"
  }
];
var XP_ACTIONS = {
  location_viewed: 15,
  location_saved: 25,
  group_joined: 60,
  group_created: 80,
  group_completed: 50,
  message_sent: 2,
  session_active: 5,
  daily_active: 20,
  friend_referred: 150
};
function getLevelForXp(xp, daysSince = 0) {
  const progressionLevels = LEVELS.filter((l) => l.id > 0);
  let result = progressionLevels[0];
  for (const level of progressionLevels) {
    if (xp >= level.minXp && daysSince >= level.minDays)
      result = level;
  }
  return result;
}
function getNewLevel() {
  return LEVELS.find((l) => l.id === 0);
}
var NEW_LEVEL_DURATION_MS = 24 * 60 * 60 * 1e3;
function getNextLevel(currentId) {
  return LEVELS.find((l) => l.id === currentId + 1) ?? null;
}

// src/app/core/services/user-data.service.ts
var CACHE_KEY = "vm_ud";
var CACHE_TTL = 24 * 60 * 60 * 1e3;
var UserDataService = class _UserDataService {
  constructor() {
    this.authService = inject(AuthService);
    this.platformId = inject(PLATFORM_ID);
    this.savedLocations = signal(/* @__PURE__ */ new Set());
    this.role = signal(UserRole.Explorer);
    this.level = signal(1);
    this.xp = signal(0);
    this.receiveUpdates = signal(true);
    this.createdAt = signal(null);
    this.referralCode = signal(null);
    this.levelUpToast = signal(null);
    this._featureAccess = signal(null);
    this.groupsUnlocked = computed(() => this._featureAccess()?.groups !== false);
    this.isAdmin = computed(() => this.role() === UserRole.Admin);
    this.isGuide = computed(() => this.role() === UserRole.Guide);
    this.canSetPrice = computed(() => this.isAdmin() || this.isGuide());
    this.daysSinceRegistration = computed(() => {
      const createdAt = this.createdAt();
      return createdAt !== null ? (Date.now() - createdAt) / 864e5 : 0;
    });
    this.levelInfo = computed(() => {
      if (this.isAdmin())
        return LEVELS.find((l) => l.id === 6);
      const createdAt = this.createdAt();
      if (createdAt !== null && Date.now() - createdAt < NEW_LEVEL_DURATION_MS) {
        return getNewLevel();
      }
      return getLevelForXp(this.xp(), this.daysSinceRegistration());
    });
    this.xpProgress = computed(() => {
      const current = this.levelInfo();
      if (current.id === 0 || current.id === 6)
        return 0;
      const next = LEVELS.find((l) => l.id === current.id + 1);
      if (!next)
        return 1;
      const range = next.minXp - current.minXp;
      if (range <= 0)
        return 1;
      return Math.min(1, Math.max(0, (this.xp() - current.minXp) / range));
    });
    this.nextLevelXp = computed(() => {
      const current = this.levelInfo();
      if (current.id === 0 || current.id === 6)
        return null;
      const next = LEVELS.find((l) => l.id === current.id + 1);
      if (!next)
        return null;
      return Math.max(0, next.minXp - this.xp());
    });
    this.nextLevelDaysLeft = computed(() => {
      const current = this.levelInfo();
      const next = LEVELS.find((l) => l.id === current.id + 1);
      if (!next || next.minDays === 0)
        return 0;
      return Math.max(0, Math.ceil(next.minDays - this.daysSinceRegistration()));
    });
    this.referralLink = computed(() => {
      const code = this.referralCode();
      return code ? `https://johnfabiomb.com?ref=${code}` : null;
    });
    this.saveDebounceTimer = null;
    this.heartbeatTimer = null;
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const user = this.authService.user();
        if (user) {
          this.loadUserData(user.id);
        } else {
          this.clearAllCaches();
          this.stopHeartbeat();
          this.savedLocations.set(/* @__PURE__ */ new Set());
          this.role.set(UserRole.Explorer);
          this.level.set(1);
          this.xp.set(0);
          this.receiveUpdates.set(true);
          this.createdAt.set(null);
          this.referralCode.set(null);
          this._featureAccess.set(null);
        }
      });
    }
  }
  readCache(uid) {
    try {
      const raw = localStorage.getItem(`${CACHE_KEY}_${uid}`);
      if (!raw)
        return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL)
        return null;
      return data;
    } catch {
      return null;
    }
  }
  writeCache(uid, data) {
    try {
      localStorage.setItem(`${CACHE_KEY}_${uid}`, JSON.stringify({ data, ts: Date.now() }));
    } catch {
    }
  }
  clearAllCaches() {
    try {
      Object.keys(localStorage).filter((k) => k.startsWith(CACHE_KEY)).forEach((k) => localStorage.removeItem(k));
    } catch {
    }
  }
  applyData(data) {
    this.savedLocations.set(new Set(data.savedLocations));
    this.role.set(data.role);
    this.level.set(data.level);
    this.xp.set(data.xp ?? 0);
    this.receiveUpdates.set(data.receiveUpdates);
    this.createdAt.set(data.createdAt);
    this._featureAccess.set(data.featureAccess ?? null);
    this.referralCode.set(data.referralCode ?? null);
  }
  loadUserData(uid) {
    return __async(this, null, function* () {
      const cached = this.readCache(uid);
      if (cached) {
        this.applyData(cached);
        this.fetchAndApply(uid).catch(() => {
        });
        return;
      }
      yield this.fetchAndApply(uid);
    });
  }
  fetchAndApply(uid) {
    return __async(this, null, function* () {
      const { data } = yield supabase.from("users").select("saved_locations, role, level, xp, receive_updates, feature_access, created_at, referral_code").eq("id", uid).maybeSingle();
      if (data) {
        const createdAt = data["created_at"] ? new Date(data["created_at"]).getTime() : null;
        const xp = data["xp"] ?? 0;
        const savedSlugs = data["saved_locations"] ?? [];
        const userData = {
          savedLocations: savedSlugs,
          role: data["role"] ?? UserRole.Explorer,
          level: data["level"] ?? 1,
          xp,
          receiveUpdates: data["receive_updates"] ?? true,
          createdAt,
          featureAccess: data["feature_access"],
          referralCode: data["referral_code"] ?? null
        };
        this.applyData(userData);
        this.writeCache(uid, userData);
        if (xp === 0 && savedSlugs.length > 0) {
          yield Promise.all(savedSlugs.map((slug) => supabase.rpc("award_xp", { p_action: "location_saved", p_ref_id: slug })));
          const { data: refreshed } = yield supabase.from("users").select("xp, level").eq("id", uid).maybeSingle();
          if (refreshed) {
            const newXp = refreshed["xp"] ?? 0;
            const newLevel = refreshed["level"] ?? 1;
            this.xp.set(newXp);
            this.level.set(newLevel);
            this.writeCache(uid, __spreadProps(__spreadValues({}, userData), { xp: newXp, level: newLevel }));
          }
        }
        const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        void this.awardXp("daily_active", today);
        this.startHeartbeat();
      } else {
        const user = this.authService.user();
        const now = Date.now();
        const userData = {
          savedLocations: [],
          role: UserRole.Explorer,
          level: 1,
          xp: 0,
          receiveUpdates: true,
          createdAt: now
        };
        yield supabase.from("users").upsert({
          id: uid,
          email: user.email ?? "",
          display_name: user.user_metadata?.["full_name"] ?? null,
          photo_url: user.user_metadata?.["avatar_url"] ?? null,
          role: UserRole.Explorer,
          level: 1,
          saved_locations: [],
          receive_updates: true
        });
        this.applyData(userData);
        this.writeCache(uid, userData);
      }
    });
  }
  startHeartbeat() {
    if (!isPlatformBrowser(this.platformId) || this.heartbeatTimer !== null)
      return;
    this.heartbeatTimer = setInterval(() => {
      void this.awardXp("session_active");
    }, 10 * 60 * 1e3);
  }
  stopHeartbeat() {
    if (this.heartbeatTimer !== null) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
  awardXp(action, refId) {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId))
        return;
      const user = this.authService.user();
      if (!user)
        return;
      const prevLevel = this.level();
      const { data, error } = yield supabase.rpc("award_xp", {
        p_action: action,
        p_ref_id: refId ?? null
      });
      if (error || !data || data["error"] || data["capped"] || data["duplicate"])
        return;
      const newXp = data["xp"];
      const newLevel = data["level"];
      this.xp.set(newXp);
      this.level.set(newLevel);
      const cached = this.readCache(user.id);
      if (cached)
        this.writeCache(user.id, __spreadProps(__spreadValues({}, cached), { xp: newXp, level: newLevel }));
      if (newLevel > prevLevel) {
        const levelDef = LEVELS.find((l) => l.id === newLevel);
        if (levelDef) {
          this.levelUpToast.set(levelDef);
          setTimeout(() => {
            if (this.levelUpToast()?.id === levelDef.id)
              this.levelUpToast.set(null);
          }, 3500);
        }
      }
    });
  }
  toggleSaveLocation(slug) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user) {
        this.authService.openLoginModal();
        return;
      }
      const isSaved = this.savedLocations().has(slug);
      this.savedLocations.update((s) => {
        const n = new Set(s);
        isSaved ? n.delete(slug) : n.add(slug);
        return n;
      });
      if (!isSaved) {
        void this.awardXp("location_saved", slug);
      }
      if (this.saveDebounceTimer !== null)
        clearTimeout(this.saveDebounceTimer);
      this.saveDebounceTimer = setTimeout(() => __async(this, null, function* () {
        this.saveDebounceTimer = null;
        const slugs = [...this.savedLocations()];
        yield supabase.from("users").update({ saved_locations: slugs }).eq("id", user.id);
        const cached = this.readCache(user.id);
        if (cached)
          this.writeCache(user.id, __spreadProps(__spreadValues({}, cached), { savedLocations: slugs }));
      }), 800);
    });
  }
  isLocationSaved(slug) {
    return this.savedLocations().has(slug);
  }
  setReceiveUpdates(value) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user || this.receiveUpdates() === value)
        return;
      this.receiveUpdates.set(value);
      yield supabase.from("users").update({ receive_updates: value }).eq("id", user.id);
      const cached = this.readCache(user.id);
      if (cached)
        this.writeCache(user.id, __spreadProps(__spreadValues({}, cached), { receiveUpdates: value }));
    });
  }
  static {
    this.\u0275fac = function UserDataService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserDataService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserDataService, factory: _UserDataService.\u0275fac, providedIn: "root" });
  }
};

export {
  LEVELS,
  XP_ACTIONS,
  NEW_LEVEL_DURATION_MS,
  getNextLevel,
  UserDataService
};
//# sourceMappingURL=chunk-HWJTBDX2.js.map
