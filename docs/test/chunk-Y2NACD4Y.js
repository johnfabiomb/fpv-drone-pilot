import {
  AvailabilityService
} from "./chunk-IVRFX72Z.js";
import {
  currencySymbol
} from "./chunk-NUQ3PGB2.js";
import {
  servicePrice
} from "./chunk-DEXNZGWM.js";
import {
  BookingOrgService
} from "./chunk-XH7FL5WJ.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-ZDNO6UPP.js";
import "./chunk-KJHSNOMD.js";
import "./chunk-QQIZI4YX.js";
import "./chunk-XS6RPKEZ.js";
import {
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
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-W3IDOWRJ.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/public/booking-calendar/booking-calendar.component.ts
var _c0 = () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var _forTrack0 = ($index, $item) => $item.hour;
function BookingCalendarComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r1);
  }
}
function BookingCalendarComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "Loading availability\u2026");
    \u0275\u0275elementEnd();
  }
}
function BookingCalendarComponent_Conditional_23_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 17);
  }
}
function BookingCalendarComponent_Conditional_23_For_2_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 20);
  }
}
function BookingCalendarComponent_Conditional_23_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function BookingCalendarComponent_Conditional_23_For_2_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const cell_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectDay(cell_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, BookingCalendarComponent_Conditional_23_For_2_Conditional_1_Conditional_2_Template, 1, 0, "span", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("cell--available", cell_r3.available)("cell--selected", cell_r3.date === ctx_r3.selectedDate());
    \u0275\u0275property("disabled", !cell_r3.available || cell_r3.isPast);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r3.day, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r3.available ? 2 : -1);
  }
}
function BookingCalendarComponent_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, BookingCalendarComponent_Conditional_23_For_2_Conditional_0_Template, 1, 0, "span", 17)(1, BookingCalendarComponent_Conditional_23_For_2_Conditional_1_Template, 3, 7, "button", 18);
  }
  if (rf & 2) {
    const cell_r3 = ctx.$implicit;
    \u0275\u0275conditional(cell_r3.date === null ? 0 : 1);
  }
}
function BookingCalendarComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, BookingCalendarComponent_Conditional_23_For_2_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.cells());
  }
}
function BookingCalendarComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.error());
  }
}
function BookingCalendarComponent_Conditional_25_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, "No times available on this day.");
    \u0275\u0275elementEnd();
  }
}
function BookingCalendarComponent_Conditional_25_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function BookingCalendarComponent_Conditional_25_Conditional_6_For_2_Template_button_click_0_listener() {
      const s_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.selectHour(s_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    \u0275\u0275classProp("slot--busy", !s_r6.available)("slot--range", s_r6.inRange)("slot--start", s_r6.isStart)("slot--end", s_r6.isEnd);
    \u0275\u0275property("disabled", !s_r6.available);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r6.label);
  }
}
function BookingCalendarComponent_Conditional_25_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275repeaterCreate(1, BookingCalendarComponent_Conditional_25_Conditional_6_For_2_Template, 2, 10, "button", 24, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.slots());
  }
}
function BookingCalendarComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 5)(1, "h2", 6);
    \u0275\u0275text(2, "2 \xB7 Select your time ");
    \u0275\u0275elementStart(3, "span", 21);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, BookingCalendarComponent_Conditional_25_Conditional_5_Template, 2, 0, "p", 22)(6, BookingCalendarComponent_Conditional_25_Conditional_6_Template, 3, 0, "div", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("tap start, then end \xB7 up to ", ctx_r3.maxHours(), "h");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.slots().length === 0 ? 5 : 6);
  }
}
function BookingCalendarComponent_Conditional_26_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 31);
    \u0275\u0275listener("click", function BookingCalendarComponent_Conditional_26_Conditional_6_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.continueToBook());
    });
    \u0275\u0275text(3, "Continue");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sel_r8 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r3.currencySymbol(), "", sel_r8.price, "");
  }
}
function BookingCalendarComponent_Conditional_26_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Minimum ", ctx_r3.minHours(), "h");
  }
}
function BookingCalendarComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 16)(1, "div", 26)(2, "div", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, BookingCalendarComponent_Conditional_26_Conditional_6_Template, 4, 2)(7, BookingCalendarComponent_Conditional_26_Conditional_7_Template, 2, 1, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sel_r8 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", sel_r8.from, " \u2013 ", sel_r8.to, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", sel_r8.hours, "h session");
    \u0275\u0275advance();
    \u0275\u0275conditional(sel_r8.price !== null && sel_r8.valid ? 6 : 7);
  }
}
var BookingCalendarComponent = class _BookingCalendarComponent {
  constructor() {
    this.availability = inject(AvailabilityService);
    this.bookingOrg = inject(BookingOrgService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.serviceId = "";
    this.staffId = "";
    this.orgSlug = "";
    this.loading = signal(false);
    this.error = signal(null);
    this.response = signal(null);
    this.selectedDate = signal(null);
    this.rangeStart = signal(null);
    this.rangeEnd = signal(null);
    this.today = /* @__PURE__ */ new Date();
    this.viewYear = signal(this.today.getFullYear());
    this.viewMonth = signal(this.today.getMonth());
    this.serviceName = computed(() => this.response()?.serviceName ?? "");
    this.currencySymbol = computed(() => currencySymbol(this.bookingOrg.org()?.currency));
    this.minHours = computed(() => this.response()?.minHours ?? 1);
    this.maxHours = computed(() => this.response()?.maxHours ?? 8);
    this.monthLabel = computed(() => new Date(this.viewYear(), this.viewMonth(), 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" }));
    this.canGoPrev = computed(() => new Date(this.viewYear(), this.viewMonth(), 1) > new Date(this.today.getFullYear(), this.today.getMonth(), 1));
    this.cells = computed(() => {
      const y = this.viewYear(), m = this.viewMonth();
      const avail = new Set((this.response()?.days ?? []).filter((d) => d.slots.some((s) => s.available)).map((d) => d.date));
      const firstDow = new Date(y, m, 1).getDay();
      const dim = new Date(y, m + 1, 0).getDate();
      const todayStr = toDateStr(this.today);
      const cells = [];
      for (let i = 0; i < firstDow; i++)
        cells.push({ date: null, day: 0, available: false, isPast: false });
      for (let d = 1; d <= dim; d++) {
        const date = toDateStr(new Date(y, m, d));
        cells.push({ date, day: d, available: avail.has(date), isPast: date < todayStr });
      }
      return cells;
    });
    this.slots = computed(() => {
      const day = this.response()?.days.find((d) => d.date === this.selectedDate());
      if (!day)
        return [];
      const a = this.rangeStart(), b = this.rangeEnd();
      return day.slots.map((s) => __spreadProps(__spreadValues({}, s), { inRange: a !== null && b !== null && s.hour >= a && s.hour <= b, isStart: s.hour === a, isEnd: s.hour === b }));
    });
    this.selection = computed(() => {
      const a = this.rangeStart(), b = this.rangeEnd(), res = this.response();
      const day = res?.days.find((d) => d.date === this.selectedDate());
      if (a === null || b === null || !day || !res)
        return null;
      const startSlot = day.slots.find((s) => s.hour === a);
      if (!startSlot)
        return null;
      const hours = b - a + 1;
      return {
        startIso: startSlot.start,
        hours,
        from: `${String(a).padStart(2, "0")}:00`,
        to: `${String(b + 1).padStart(2, "0")}:00`,
        price: servicePrice(res.pricing, hours),
        valid: hours >= res.minHours
      };
    });
  }
  ngOnInit() {
    const qp = this.route.snapshot.queryParamMap;
    this.orgSlug = this.route.snapshot.paramMap.get("org") ?? "";
    this.serviceId = qp.get("service") ?? "";
    this.staffId = qp.get("staff") ?? "";
    if (!this.serviceId || !this.staffId) {
      this.router.navigate(this.bookPath());
      return;
    }
    this.bookingOrg.load(this.orgSlug || void 0);
    this.load();
  }
  /** Build a path into the booking flow, prefixed with the org slug when present. */
  bookPath(...rest) {
    return this.orgSlug ? ["/", this.orgSlug, "book", ...rest] : ["/book", ...rest];
  }
  load() {
    return __async(this, null, function* () {
      this.loading.set(true);
      this.error.set(null);
      const y = this.viewYear(), m = this.viewMonth();
      const isCur = y === this.today.getFullYear() && m === this.today.getMonth();
      const from = toDateStr(isCur ? this.today : new Date(y, m, 1));
      const to = toDateStr(new Date(y, m + 1, 0));
      try {
        this.response.set(yield this.availability.getAvailability(this.staffId, this.serviceId, from, to));
      } catch (err) {
        this.error.set("Could not load availability. Please try again.");
        console.error("[BookingCalendar] availability failed:", err);
      } finally {
        this.loading.set(false);
      }
    });
  }
  changeMonth(delta) {
    if (delta < 0 && !this.canGoPrev())
      return;
    let m = this.viewMonth() + delta, y = this.viewYear();
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    this.viewMonth.set(m);
    this.viewYear.set(y);
    this.selectedDate.set(null);
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
    this.load();
  }
  selectDay(cell) {
    if (!cell.date || !cell.available)
      return;
    this.selectedDate.set(cell.date);
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
  }
  selectHour(slot) {
    if (!slot.available)
      return;
    const a = this.rangeStart(), b = this.rangeEnd(), h = slot.hour;
    if (a === null) {
      this.rangeStart.set(h);
      this.rangeEnd.set(h);
      return;
    }
    if (h === a && h === b) {
      this.rangeStart.set(null);
      this.rangeEnd.set(null);
      return;
    }
    const newStart = Math.min(a, h), newEnd = Math.max(b ?? a, h);
    const span = newEnd - newStart + 1;
    const daySlots = this.response()?.days.find((d) => d.date === this.selectedDate())?.slots ?? [];
    const allFree = Array.from({ length: span }, (_, i) => newStart + i).every((hr) => daySlots.some((s) => s.hour === hr && s.available));
    if (span <= this.maxHours() && allFree) {
      this.rangeStart.set(newStart);
      this.rangeEnd.set(newEnd);
    } else {
      this.rangeStart.set(h);
      this.rangeEnd.set(h);
    }
  }
  continueToBook() {
    const sel = this.selection();
    if (!sel || !sel.valid)
      return;
    this.router.navigate(this.bookPath("checkout"), {
      queryParams: { service: this.serviceId, staff: this.staffId, start: sel.startIso, hours: sel.hours }
    });
  }
  backToServices() {
    this.router.navigate(this.bookPath());
  }
  static {
    this.\u0275fac = function BookingCalendarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingCalendarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingCalendarComponent, selectors: [["app-booking-calendar"]], decls: 27, vars: 8, consts: [[1, "book"], [1, "book__head"], [1, "book__back", 3, "click"], [1, "book__title"], [1, "book__sub"], [1, "step"], [1, "step__label"], [1, "cal"], [1, "cal__nav"], ["aria-label", "Previous month", 1, "cal__arrow", 3, "click", "disabled"], [1, "cal__month"], ["aria-label", "Next month", 1, "cal__arrow", 3, "click"], [1, "cal__dow"], [1, "cal__loading"], [1, "cal__grid"], [1, "book__error"], [1, "summary"], [1, "cell", "cell--blank"], [1, "cell", 3, "cell--available", "cell--selected", "disabled"], [1, "cell", 3, "click", "disabled"], [1, "cell__dot"], [1, "step__hint"], [1, "book__empty"], [1, "slots"], [1, "slot", 3, "slot--busy", "slot--range", "slot--start", "slot--end", "disabled"], [1, "slot", 3, "click", "disabled"], [1, "summary__info"], [1, "summary__when"], [1, "summary__dur"], [1, "summary__noprice"], [1, "summary__price"], [1, "summary__cta", 3, "click"]], template: function BookingCalendarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "button", 2);
        \u0275\u0275listener("click", function BookingCalendarComponent_Template_button_click_2_listener() {
          return ctx.backToServices();
        });
        \u0275\u0275text(3, "\u2039 Services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Pick a day, then select your start and end time.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "section", 5)(9, "h2", 6);
        \u0275\u0275text(10, "1 \xB7 Choose a day");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 7)(12, "div", 8)(13, "button", 9);
        \u0275\u0275listener("click", function BookingCalendarComponent_Template_button_click_13_listener() {
          return ctx.changeMonth(-1);
        });
        \u0275\u0275text(14, "\u2039");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "span", 10);
        \u0275\u0275text(16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "button", 11);
        \u0275\u0275listener("click", function BookingCalendarComponent_Template_button_click_17_listener() {
          return ctx.changeMonth(1);
        });
        \u0275\u0275text(18, "\u203A");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "div", 12);
        \u0275\u0275repeaterCreate(20, BookingCalendarComponent_For_21_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275template(22, BookingCalendarComponent_Conditional_22_Template, 2, 0, "div", 13)(23, BookingCalendarComponent_Conditional_23_Template, 3, 0, "div", 14)(24, BookingCalendarComponent_Conditional_24_Template, 2, 1, "p", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(25, BookingCalendarComponent_Conditional_25_Template, 7, 2, "section", 5)(26, BookingCalendarComponent_Conditional_26_Template, 8, 4, "section", 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_7_0;
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.serviceName() || "Book a session");
        \u0275\u0275advance(8);
        \u0275\u0275property("disabled", !ctx.canGoPrev());
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.monthLabel());
        \u0275\u0275advance(4);
        \u0275\u0275repeater(\u0275\u0275pureFunction0(7, _c0));
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.loading() ? 22 : 23);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.error() ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.selectedDate() ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_7_0 = ctx.selection()) ? 26 : -1, tmp_7_0);
      }
    }, styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  background: #f8fafc;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  color: #0f172a;\n}\n.book[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 32px 20px 120px;\n}\n.book__head[_ngcontent-%COMP%] {\n  margin-bottom: 28px;\n}\n.book__back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #475569;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0 0 10px;\n}\n.book__back[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n.book__title[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 800;\n  letter-spacing: -0.03em;\n  margin: 0 0 6px;\n}\n.book__sub[_ngcontent-%COMP%] {\n  font-size: 14.5px;\n  color: #475569;\n  margin: 0;\n}\n.book__error[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 13px;\n  margin: 10px 2px 0;\n}\n.book__empty[_ngcontent-%COMP%] {\n  color: #475569;\n  font-size: 14px;\n  margin: 4px 2px;\n}\n.step[_ngcontent-%COMP%] {\n  margin-bottom: 28px;\n}\n.step__label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #64748b;\n  margin: 0 0 12px;\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.step__hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: none;\n  letter-spacing: 0;\n  color: #94a3b8;\n}\n.cal[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 16px;\n}\n.cal__nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.cal__month[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n}\n.cal__arrow[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  background: #ffffff;\n  font-size: 18px;\n  line-height: 1;\n  cursor: pointer;\n  color: #0f172a;\n  transition: 0.15s ease;\n}\n.cal__arrow[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n}\n.cal__arrow[_ngcontent-%COMP%]:disabled {\n  opacity: 0.3;\n  cursor: default;\n}\n.cal__dow[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n  margin-bottom: 6px;\n}\n.cal__dow[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 11px;\n  font-weight: 600;\n  color: #94a3b8;\n}\n.cal__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n}\n.cal__loading[_ngcontent-%COMP%] {\n  padding: 40px 0;\n  text-align: center;\n  color: #475569;\n  font-size: 14px;\n}\n.cell[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  font-size: 14px;\n  color: #94a3b8;\n  cursor: default;\n}\n.cell--blank[_ngcontent-%COMP%] {\n  visibility: hidden;\n}\n.cell--available[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-weight: 600;\n  cursor: pointer;\n  background: rgba(244, 169, 34, 0.12);\n}\n.cell--available[_ngcontent-%COMP%]:hover {\n  background: rgba(244, 169, 34, 0.22);\n}\n.cell--selected[_ngcontent-%COMP%] {\n  background: #F4A922 !important;\n  color: #fff;\n}\n.cell[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n}\n.cell__dot[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 5px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: #F4A922;\n}\n.cell--selected[_ngcontent-%COMP%]   .cell__dot[_ngcontent-%COMP%] {\n  background: #fff;\n}\n.slots[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));\n  gap: 7px;\n}\n.slot[_ngcontent-%COMP%] {\n  min-height: 50px;\n  padding: 14px 10px;\n  background: #ffffff;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 12px;\n  font-size: 15.5px;\n  font-weight: 700;\n  color: #0f172a;\n  cursor: pointer;\n  transition: 0.15s ease;\n}\n.slot[_ngcontent-%COMP%]:hover:not(:disabled):not(.slot--range) {\n  border-color: #94a3b8;\n  background: #f8fafc;\n}\n.slot--range[_ngcontent-%COMP%] {\n  background: #F4A922;\n  border-color: #F4A922;\n  color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.35);\n}\n.slot--start[_ngcontent-%COMP%] {\n  border-top-left-radius: 12px;\n  border-bottom-left-radius: 12px;\n}\n.slot--end[_ngcontent-%COMP%] {\n  border-top-right-radius: 12px;\n  border-bottom-right-radius: 12px;\n}\n.slot--busy[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #94a3b8;\n  border-color: transparent;\n  cursor: default;\n  text-decoration: line-through;\n  opacity: 0.65;\n  min-height: 50px;\n}\n.summary[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  max-width: 560px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  background: #0f172a;\n  color: #fff;\n  border-radius: 12px 12px 0 0;\n  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.18);\n}\n.summary__info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.summary__when[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n}\n.summary__dur[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #94a3b8;\n}\n.summary__price[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n}\n.summary__noprice[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #94a3b8;\n}\n.summary__cta[_ngcontent-%COMP%] {\n  padding: 11px 20px;\n  background: #F4A922;\n  color: #0f172a;\n  font-weight: 700;\n  font-size: 14px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: 0.15s ease;\n}\n.summary__cta[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.05);\n}\n/*# sourceMappingURL=booking-calendar.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookingCalendarComponent, { className: "BookingCalendarComponent", filePath: "src/app/booking/public/booking-calendar/booking-calendar.component.ts", lineNumber: 18 });
})();
function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export {
  BookingCalendarComponent
};
//# sourceMappingURL=chunk-Y2NACD4Y.js.map
