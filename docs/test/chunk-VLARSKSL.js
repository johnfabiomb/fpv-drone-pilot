import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "./chunk-3PSU7TQQ.js";
import {
  AuthService
} from "./chunk-B55ERDNS.js";
import {
  PLATFORM_ID,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  inject,
  isPlatformBrowser,
  signal,
  ɵɵdefineInjectable
} from "./chunk-UX7WDOQ6.js";

// src/app/shared/services/user-data.service.ts
var CACHE_KEY = "vm_ud";
var CACHE_TTL = 24 * 60 * 60 * 1e3;
var UserDataService = class _UserDataService {
  constructor() {
    this.firestore = inject(Firestore);
    this.authService = inject(AuthService);
    this.platformId = inject(PLATFORM_ID);
    this.savedLocations = signal(/* @__PURE__ */ new Set());
    this.role = signal("explorer");
    this.level = signal(1);
    this.receiveUpdates = signal(true);
    this.isAdmin = computed(() => this.role() === "admin");
    this.saveDebounceTimer = null;
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const user = this.authService.user();
        if (user) {
          this.loadUserData(user.uid);
        } else {
          this.savedLocations.set(/* @__PURE__ */ new Set());
          this.role.set("explorer");
          this.level.set(1);
          this.receiveUpdates.set(true);
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
  applyData(data) {
    this.savedLocations.set(new Set(data.savedLocations));
    this.role.set(data.role);
    this.level.set(data.level);
    this.receiveUpdates.set(data.receiveUpdates);
  }
  loadUserData(uid) {
    return __async(this, null, function* () {
      const cached = this.readCache(uid);
      if (cached) {
        this.applyData(cached);
        return;
      }
      const ref = doc(this.firestore, "users", uid);
      const snap = yield getDoc(ref);
      if (snap.exists()) {
        const d = snap.data();
        const data = {
          savedLocations: d["savedLocations"] ?? [],
          role: d["role"] ?? "explorer",
          level: d["level"] ?? 1,
          receiveUpdates: d["receiveUpdates"] ?? true
        };
        this.applyData(data);
        this.writeCache(uid, data);
      } else {
        const user = this.authService.user();
        const data = { savedLocations: [], role: "explorer", level: 1, receiveUpdates: true };
        yield setDoc(ref, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: "explorer",
          level: 1,
          savedLocations: [],
          receiveUpdates: true,
          createdAt: /* @__PURE__ */ new Date()
        });
        this.applyData(data);
        this.writeCache(uid, data);
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
      if (this.saveDebounceTimer !== null)
        clearTimeout(this.saveDebounceTimer);
      this.saveDebounceTimer = setTimeout(() => __async(this, null, function* () {
        this.saveDebounceTimer = null;
        const slugs = [...this.savedLocations()];
        const ref = doc(this.firestore, "users", user.uid);
        yield updateDoc(ref, { savedLocations: slugs });
        const cached = this.readCache(user.uid);
        if (cached)
          this.writeCache(user.uid, __spreadProps(__spreadValues({}, cached), { savedLocations: slugs }));
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
      const ref = doc(this.firestore, "users", user.uid);
      yield updateDoc(ref, { receiveUpdates: value });
      const cached = this.readCache(user.uid);
      if (cached)
        this.writeCache(user.uid, __spreadProps(__spreadValues({}, cached), { receiveUpdates: value }));
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
  UserDataService
};
//# sourceMappingURL=chunk-VLARSKSL.js.map
