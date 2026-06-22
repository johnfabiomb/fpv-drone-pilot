import {
  AuthService
} from "./chunk-KDEYYX4X.js";
import {
  supabase
} from "./chunk-5SHRFYBE.js";
import {
  PLATFORM_ID,
  computed,
  effect,
  inject,
  isPlatformBrowser,
  signal,
  ɵɵdefineInjectable
} from "./chunk-P56CFEJA.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/map/core/services/notification.service.ts
var NOTIF_ICONS = {
  info: "\u{1F514}",
  level_up: "\u{1F389}",
  achievement: "\u{1F3C6}",
  new_location: "\u{1F4CD}",
  deal: "\u{1F3F7}\uFE0F",
  announcement: "\u{1F4E2}"
};
var NotificationService = class _NotificationService {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.authService = inject(AuthService);
    this.channel = null;
    this.notifications = signal([]);
    this.unreadCount = computed(() => this.notifications().filter((n) => !n.is_read).length);
    this.loaded = signal(false);
    effect(() => {
      if (this.authService.isLoggedIn()) {
        void this.load();
      } else {
        this.clear();
      }
    });
  }
  load() {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId) || !this.authService.isLoggedIn())
        return;
      const { data, error } = yield supabase.rpc("get_my_notifications", { p_limit: 50 });
      if (!error && data)
        this.notifications.set(data);
      this.loaded.set(true);
      void this.subscribeRealtime();
    });
  }
  markRead(id) {
    return __async(this, null, function* () {
      yield supabase.rpc("mark_notification_read", { p_notification_id: id });
      this.notifications.update((list) => list.map((n) => n.id === id ? __spreadProps(__spreadValues({}, n), { is_read: true, read_at: (/* @__PURE__ */ new Date()).toISOString() }) : n));
    });
  }
  markAllRead() {
    return __async(this, null, function* () {
      yield supabase.rpc("mark_all_notifications_read");
      const now = (/* @__PURE__ */ new Date()).toISOString();
      this.notifications.update((list) => list.map((n) => __spreadProps(__spreadValues({}, n), { is_read: true, read_at: n.read_at ?? now })));
    });
  }
  createLevelUpNotification(level) {
    return __async(this, null, function* () {
      const user = this.authService.user();
      if (!user)
        return;
      yield supabase.rpc("create_system_notification", {
        p_user_id: user.id,
        p_type: "level_up",
        p_title: `You reached ${level.emoji} ${level.name}!`,
        p_body: `<p><strong>${level.description}</strong></p><p>\u{1F381} New perk: ${level.perk}</p>`,
        p_action_url: "/malta"
      });
    });
  }
  clear() {
    if (this.channel) {
      supabase.removeChannel(this.channel);
      this.channel = null;
    }
    this.notifications.set([]);
    this.loaded.set(false);
  }
  subscribeRealtime() {
    return __async(this, null, function* () {
      if (this.channel)
        return;
      const userId = this.authService.user()?.id;
      if (!userId)
        return;
      const { data: { session } } = yield supabase.auth.getSession();
      if (session)
        supabase.realtime.setAuth(session.access_token);
      this.channel = supabase.channel(`notif:${userId}`).on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "notifications"
      }, (payload) => {
        const n = payload.new;
        if (n.target_user !== null && n.target_user !== userId)
          return;
        if (this.notifications().some((x) => x.id === n.id))
          return;
        this.notifications.update((list) => [__spreadProps(__spreadValues({}, n), { is_read: false, read_at: null }), ...list]);
      }).subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
          if (this.channel) {
            supabase.removeChannel(this.channel);
            this.channel = null;
          }
        }
      });
    });
  }
  static {
    this.\u0275fac = function NotificationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
  }
};

export {
  NOTIF_ICONS,
  NotificationService
};
//# sourceMappingURL=chunk-Q2XFGS4H.js.map
