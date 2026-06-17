import {
  ToastService
} from "./chunk-WE6LBMFD.js";
import {
  BookingAdminService
} from "./chunk-TC7ZZ7W7.js";
import {
  BookingDataService
} from "./chunk-YN35FWKD.js";
import "./chunk-62WGWY5L.js";
import {
  BookingsAuthService
} from "./chunk-MQ25DMRF.js";
import "./chunk-5R6IZFLD.js";
import {
  RouterLink
} from "./chunk-23WFKX7T.js";
import "./chunk-2VIPXXQC.js";
import "./chunk-WKMKAAWK.js";
import {
  CurrencyPipe,
  DatePipe,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-YX7TN7IZ.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id;
function DashboardComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "div", 8);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_14_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4, "In production");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.inProduction());
  }
}
function DashboardComponent_Conditional_14_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 26);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 27);
    \u0275\u0275element(5, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 29);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r2.total > 0 ? \u0275\u0275pipeBind4(3, 4, m_r2.total, "EUR", "symbol", "1.0-0") : "");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("height", ctx_r0.barHeight(m_r2.total));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r2.label);
  }
}
function DashboardComponent_Conditional_14_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "Nothing scheduled.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_14_Conditional_39_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 30)(1, "div", 31)(2, "span", 32);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 33);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 34)(9, "div", 35);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 36);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "span", 37);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_14_0;
    let tmp_15_0;
    const b_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 10, b_r3.start_at, "d"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 13, b_r3.start_at, "MMM"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_14_0 = b_r3.client_name) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(13, 16, b_r3.start_at, "HH:mm"), " \xB7 ", (tmp_15_0 = b_r3.service_name) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : b_r3.title, "");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("pill--unpaid", b_r3.payment_status === "unpaid")("pill--partial", b_r3.payment_status === "partial");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", b_r3.payment_status === "paid" ? "Paid" : b_r3.payment_status === "partial" ? "Deposit" : b_r3.payment_status === "external" ? "Synced" : "Unpaid", " ");
  }
}
function DashboardComponent_Conditional_14_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 22);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_14_Conditional_39_For_2_Template, 16, 19, "li", 30, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.upcoming().slice(0, 6));
  }
}
function DashboardComponent_Conditional_14_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "All clear \u2014 nothing waiting on you.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_14_Conditional_45_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "div", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 43);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 44)(9, "button", 45);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_14_Conditional_45_For_6_Template_button_click_9_listener() {
      const b_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.approve(b_r5));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 46);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_14_Conditional_45_For_6_Template_button_click_11_listener() {
      const b_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.decline(b_r5));
    });
    \u0275\u0275text(12, "Decline");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const b_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_12_0 = b_r5.client_name) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(6, 6, b_r5.start_at, "EEE d MMM, HH:mm"), " \xB7 ", \u0275\u0275pipeBind4(7, 9, b_r5.price_total, "EUR", "symbol", "1.0-0"), "");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.busyId() === b_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.busyId() === b_r5.id ? "\u2026" : "Approve", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.busyId() === b_r5.id);
  }
}
function DashboardComponent_Conditional_14_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 38);
    \u0275\u0275text(2, "Cash requests ");
    \u0275\u0275elementStart(3, "span", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(5, DashboardComponent_Conditional_14_Conditional_45_For_6_Template, 13, 14, "div", 40, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.requests().length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.requests());
  }
}
function DashboardComponent_Conditional_14_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 24)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 47);
    \u0275\u0275text(5, "Review \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind4(3, 1, ctx_r0.outstanding(), "EUR", "symbol", "1.0-0"), " outstanding across confirmed jobs");
  }
}
function DashboardComponent_Conditional_14_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 25)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 47);
    \u0275\u0275text(4, "Work board \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r0.stageCount().to_edit, " to edit \xB7 ", ctx_r0.stageCount().editing, " editing \xB7 ", ctx_r0.stageCount().to_deliver, " to deliver");
  }
}
function DashboardComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 12);
    \u0275\u0275text(5, "Upcoming \xB7 30 days");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 10)(7, "span", 11);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 12);
    \u0275\u0275text(11, "Collected");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 10)(13, "span", 11);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 12);
    \u0275\u0275text(17, "Outstanding");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 10)(19, "span", 11);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 12);
    \u0275\u0275text(22, "Requests to approve");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, DashboardComponent_Conditional_14_Conditional_23_Template, 5, 1, "div", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "section", 13)(25, "div", 14)(26, "h2", 15);
    \u0275\u0275text(27, "Collected \xB7 last 6 months");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 16);
    \u0275\u0275repeaterCreate(29, DashboardComponent_Conditional_14_For_30_Template, 8, 9, "div", 17, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 18)(32, "section", 19)(33, "div", 14)(34, "h2", 15);
    \u0275\u0275text(35, "Upcoming bookings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "a", 20);
    \u0275\u0275text(37, "All");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(38, DashboardComponent_Conditional_14_Conditional_38_Template, 2, 0, "p", 21)(39, DashboardComponent_Conditional_14_Conditional_39_Template, 3, 0, "ul", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "section", 19)(41, "div", 14)(42, "h2", 15);
    \u0275\u0275text(43, "Needs your attention");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(44, DashboardComponent_Conditional_14_Conditional_44_Template, 2, 0, "p", 21)(45, DashboardComponent_Conditional_14_Conditional_45_Template, 7, 1, "div", 23)(46, DashboardComponent_Conditional_14_Conditional_46_Template, 6, 6, "a", 24)(47, DashboardComponent_Conditional_14_Conditional_47_Template, 5, 3, "a", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.upcoming30());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(9, 14, ctx_r0.collected(), "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("kpi--warn", ctx_r0.outstanding() > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(15, 19, ctx_r0.outstanding(), "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("kpi--accent", ctx_r0.requests().length > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.requests().length);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.workEnabled() ? 23 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r0.revenueByMonth());
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r0.upcoming().length === 0 ? 38 : 39);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r0.requests().length === 0 && ctx_r0.outstanding() === 0 ? 44 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.requests().length > 0 ? 45 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.outstanding() > 0 ? 46 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.workEnabled() && ctx_r0.inProduction() > 0 ? 47 : -1);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor() {
    this.data = inject(BookingDataService);
    this.admin = inject(BookingAdminService);
    this.auth = inject(BookingsAuthService);
    this.toast = inject(ToastService);
    this.jobs = signal([]);
    this.tasks = signal([]);
    this.busyId = signal(null);
    this.CONFIRMED = ["booked", "in_progress", "done"];
    this.confirmed = computed(() => this.data.bookings().filter((b) => this.CONFIRMED.includes(b.status) && !b.is_external));
    this.now = /* @__PURE__ */ new Date();
    this.greeting = (() => {
      const h = (/* @__PURE__ */ new Date()).getHours();
      return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    })();
    this.requests = computed(() => this.data.bookings().filter((b) => b.status === "pending"));
    this.upcoming = computed(() => {
      const now = Date.now();
      return this.confirmed().filter((b) => new Date(b.start_at).getTime() >= now).sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
    });
    this.upcoming30 = computed(() => {
      const limit = Date.now() + 30 * 864e5;
      return this.upcoming().filter((b) => new Date(b.start_at).getTime() <= limit).length;
    });
    this.collected = computed(() => this.confirmed().reduce((s, b) => s + b.total_paid, 0));
    this.outstanding = computed(() => this.confirmed().reduce((s, b) => s + Math.max(0, b.price_total - b.total_paid), 0));
    this.revenueByMonth = computed(() => {
      const ref = /* @__PURE__ */ new Date();
      const buckets = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(ref.getFullYear(), ref.getMonth() - (5 - i), 1);
        return { label: d.toLocaleDateString("en", { month: "short" }), y: d.getFullYear(), m: d.getMonth(), total: 0 };
      });
      for (const b of this.confirmed()) {
        const d = new Date(b.start_at);
        const bucket = buckets.find((x) => x.y === d.getFullYear() && x.m === d.getMonth());
        if (bucket)
          bucket.total += b.total_paid;
      }
      return buckets;
    });
    this.maxMonth = computed(() => Math.max(1, ...this.revenueByMonth().map((m) => m.total)));
    this.inProduction = computed(() => this.jobs().filter((j) => j.production_status !== "delivered").length);
    this.openTasks = computed(() => this.tasks().filter((t) => !t.is_done).length);
    this.stageCount = computed(() => {
      const m = { to_edit: 0, editing: 0, to_deliver: 0, delivered: 0 };
      for (const j of this.jobs())
        m[j.production_status]++;
      return m;
    });
    this.workEnabled = computed(() => !!this.auth.features().work_board);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.auth.initialize();
      yield this.loadProduction();
    });
  }
  loadProduction() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org)
        return;
      const [jobs, tasks] = yield Promise.all([this.admin.loadJobs(org), this.admin.loadTasks(org)]);
      this.jobs.set(jobs);
      this.tasks.set(tasks);
    });
  }
  barHeight(total) {
    return `${Math.round(total / this.maxMonth() * 100)}%`;
  }
  approve(b) {
    return __async(this, null, function* () {
      this.busyId.set(b.id);
      try {
        const res = yield this.data.approveRequest(b.id);
        if (res.error === "slot_taken")
          this.toast.error(`${b.booking_ref}: that slot was just taken \u2014 decline this one.`);
        else if (res.error)
          this.toast.error(`Could not approve ${b.booking_ref}.`);
        else {
          this.toast.success(`${b.booking_ref} approved \u2014 added to your calendar`);
          yield this.loadProduction();
        }
      } catch {
        this.toast.error(`Could not approve ${b.booking_ref}. Please try again.`);
      } finally {
        this.busyId.set(null);
      }
    });
  }
  decline(b) {
    return __async(this, null, function* () {
      if (!confirm(`Decline ${b.booking_ref}?`))
        return;
      this.busyId.set(b.id);
      try {
        yield this.data.declineRequest(b.id);
        this.toast.info(`${b.booking_ref} declined`);
      } catch {
        this.toast.error(`Could not decline ${b.booking_ref}.`);
      } finally {
        this.busyId.set(null);
      }
    });
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 15, vars: 6, consts: [[1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], [1, "head-actions"], ["routerLink", "/bookings/list", 1, "btn", "btn--ghost"], ["routerLink", "/bookings/new", 1, "btn", "btn--primary"], [1, "loading"], [1, "spinner"], [1, "kpis"], [1, "kpi"], [1, "kpi__value"], [1, "kpi__label"], [1, "card", "chart"], [1, "card__head"], [1, "card__title"], [1, "chart__bars"], [1, "chart__col"], [1, "grid"], [1, "card"], ["routerLink", "/bookings/list", 1, "card__link"], [1, "empty-line"], [1, "list"], [1, "attn"], ["routerLink", "/bookings/list", 1, "attn-line"], ["routerLink", "/bookings/work", 1, "attn-line"], [1, "chart__amount"], [1, "chart__track"], [1, "chart__bar"], [1, "chart__label"], [1, "row"], [1, "row__date"], [1, "row__day"], [1, "row__mon"], [1, "row__main"], [1, "row__who"], [1, "row__meta"], [1, "pill"], [1, "attn__head"], [1, "attn__count"], [1, "req"], [1, "req__main"], [1, "req__who"], [1, "req__meta"], [1, "req__actions"], [1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"], [1, "btn", "btn--sm", "btn--ghost", 3, "click", "disabled"], [1, "attn-line__cta"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6);
        \u0275\u0275pipe(7, "date");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "a", 5);
        \u0275\u0275text(10, "All bookings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "a", 6);
        \u0275\u0275text(12, "+ New booking");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(13, DashboardComponent_Conditional_13_Template, 2, 0, "div", 7)(14, DashboardComponent_Conditional_14_Template, 48, 24);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.greeting);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 3, ctx.now, "EEEE, d MMMM y"));
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.data.loading() ? 13 : 14);
      }
    }, dependencies: [RouterLink, CurrencyPipe, DatePipe], styles: ['\n\n.page[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  padding: 36px 48px;\n}\n@media (max-width: 900px) {\n  .page[_ngcontent-%COMP%] {\n    padding: 24px 20px;\n  }\n}\n.page__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 28px;\n}\n.head-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-shrink: 0;\n}\n.page__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0 0 4px;\n  letter-spacing: -0.02em;\n}\n.page__sub[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: #475569;\n  margin: 0;\n}\n.kpis[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.kpi[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 18px 22px;\n}\n.kpi__value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 24px;\n  font-weight: 700;\n  color: #0f172a;\n  letter-spacing: -0.03em;\n  line-height: 1.1;\n}\n.kpi__label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: #94a3b8;\n  margin-top: 6px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.kpi--warn[_ngcontent-%COMP%]   .kpi__value[_ngcontent-%COMP%] {\n  color: #f97316;\n}\n.kpi--accent[_ngcontent-%COMP%] {\n  border-color: #F4A922;\n}\n.kpi--accent[_ngcontent-%COMP%]   .kpi__value[_ngcontent-%COMP%] {\n  color: #F4A922;\n}\n.card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 20px 22px;\n  margin-bottom: 24px;\n}\n.card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.card__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\n.card__link[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #F4A922;\n  text-decoration: none;\n}\n.card__link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.chart__bars[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 14px;\n  height: 160px;\n}\n.chart__col[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n}\n.chart__amount[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: #475569;\n  height: 16px;\n}\n.chart__track[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 100%;\n  max-width: 46px;\n  display: flex;\n  align-items: flex-end;\n  margin: 4px 0 8px;\n}\n.chart__bar[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 2px;\n  background:\n    linear-gradient(\n      to top,\n      #F4A922,\n      #f7bb4d);\n  border-radius: 6px 6px 0 0;\n  transition: height 0.15s ease;\n}\n.chart__label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #94a3b8;\n  font-weight: 600;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n@media (max-width: 860px) {\n  .grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.grid[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.empty-line[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #94a3b8;\n  margin: 4px 0;\n}\n.list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 11px 0;\n}\n.row[_ngcontent-%COMP%]    + .row[_ngcontent-%COMP%] {\n  border-top: 1px solid #e2e8f0;\n}\n.row__date[_ngcontent-%COMP%] {\n  width: 42px;\n  flex-shrink: 0;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  line-height: 1;\n}\n.row__day[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: #0f172a;\n}\n.row__mon[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 600;\n  color: #94a3b8;\n  text-transform: uppercase;\n  margin-top: 2px;\n}\n.row__main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.row__who[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #0f172a;\n}\n.row__meta[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #475569;\n  margin-top: 1px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.pill[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 3px 9px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  background: #dcfce7;\n  color: #16a34a;\n}\n.pill--partial[_ngcontent-%COMP%] {\n  background: #fef9c3;\n  color: #a16207;\n}\n.pill--unpaid[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.attn[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n.attn__head[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #94a3b8;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.attn__count[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #000;\n  font-size: 11px;\n  font-weight: 700;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 9px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.req[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 0;\n}\n.req[_ngcontent-%COMP%]    + .req[_ngcontent-%COMP%] {\n  border-top: 1px solid #e2e8f0;\n}\n.req__main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.req__who[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #0f172a;\n}\n.req__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #475569;\n}\n.req__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.attn-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 12px 14px;\n  margin-top: 10px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 13px;\n  color: #475569;\n  text-decoration: none;\n}\n.attn-line[_ngcontent-%COMP%]:hover {\n  border-color: #94a3b8;\n}\n.attn-line__cta[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #F4A922;\n  white-space: nowrap;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 9px 18px;\n  border-radius: 8px;\n  font-size: 13.5px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  border: 1.5px solid transparent;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  text-decoration: none;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #F4A922;\n  border-color: #F4A922;\n  color: #000;\n}\n.btn--primary[_ngcontent-%COMP%]:hover {\n  filter: brightness(0.92);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-color: #e2e8f0;\n  color: #475569;\n}\n.btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #94a3b8;\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 7px 13px;\n  font-size: 12.5px;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 2.5px solid #e2e8f0;\n  border-top-color: #F4A922;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/booking/platform/dashboard/dashboard.component.ts", lineNumber: 17 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-KANQJVTZ.js.map
