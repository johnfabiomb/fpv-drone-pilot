import {
  supabase
} from "./chunk-Q2ZTODBY.js";
import {
  PLATFORM_ID,
  computed,
  inject,
  isPlatformBrowser,
  signal,
  ɵɵdefineInjectable
} from "./chunk-2FJZNSO2.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/map/core/services/auth.service.ts
var AuthService = class _AuthService {
  static {
    this.RETURN_PATH_KEY = "auth_return_path";
  }
  get redirectUrl() {
    return `${window.location.origin}/malta`;
  }
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.user = signal(null);
    this.isLoggedIn = computed(() => !!this.user());
    this.showLoginModal = signal(false);
    this.userDisplayName = computed(() => this.user()?.user_metadata?.["full_name"] ?? this.user()?.email ?? "");
    this.userPhotoURL = computed(() => this.user()?.user_metadata?.["avatar_url"] ?? "");
    this.userEmail = computed(() => this.user()?.email ?? "");
    if (isPlatformBrowser(this.platformId)) {
      supabase.auth.onAuthStateChange((event, session) => {
        this.user.set(session?.user ?? null);
        if (event === "SIGNED_IN" && session?.user) {
          void this.processReferral(session.user.id);
        }
      });
    }
  }
  signInWithGoogle() {
    return __async(this, null, function* () {
      sessionStorage.setItem(_AuthService.RETURN_PATH_KEY, window.location.pathname + window.location.search);
      yield supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: this.redirectUrl }
      });
    });
  }
  sendEmailSignInLink(email) {
    return __async(this, null, function* () {
      const { error } = yield supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: this.redirectUrl }
      });
      if (error)
        throw error;
    });
  }
  consumeReturnPath() {
    const path = sessionStorage.getItem(_AuthService.RETURN_PATH_KEY) || "/malta";
    sessionStorage.removeItem(_AuthService.RETURN_PATH_KEY);
    return path;
  }
  /** True when the URL contains Supabase auth tokens (magic link or OAuth redirect). */
  isEmailSignInLink(href) {
    return href.includes("access_token=") || new URL(href).searchParams.has("code");
  }
  completeEmailSignIn(_href) {
    return __async(this, null, function* () {
      const { data } = yield supabase.auth.getSession();
      return !!data.session;
    });
  }
  currentSignedInUser() {
    return this.user();
  }
  signOut() {
    return __async(this, null, function* () {
      yield supabase.auth.signOut();
    });
  }
  openLoginModal() {
    if (this.isLoggedIn())
      return;
    this.showLoginModal.set(true);
  }
  closeLoginModal() {
    this.showLoginModal.set(false);
  }
  processReferral(uid) {
    return __async(this, null, function* () {
      const ref = sessionStorage.getItem("vm_ref");
      if (!ref)
        return;
      sessionStorage.removeItem("vm_ref");
      const { data: referrer } = yield supabase.from("users").select("id").eq("referral_code", ref.toUpperCase()).maybeSingle();
      if (!referrer || referrer["id"] === uid)
        return;
      const referrerId = referrer["id"];
      yield supabase.rpc("process_referral", { p_referrer_id: referrerId });
    });
  }
  static {
    this.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-YNLBUE2Q.js.map
