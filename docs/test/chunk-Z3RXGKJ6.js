import {
  AvailabilityCalendarComponent,
  nextRange
} from "./chunk-ABROHROB.js";
import {
  AvailabilityService
} from "./chunk-YD4OGTDQ.js";
import {
  currencySymbol
} from "./chunk-NUQ3PGB2.js";
import {
  servicePrice
} from "./chunk-DEXNZGWM.js";
import {
  BookingOrgService
} from "./chunk-SEGSOSVX.js";
import "./chunk-Y4O5MVSK.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-E53NQKQB.js";
import "./chunk-DNKJKTBS.js";
import "./chunk-GQ3SG4V7.js";
import {
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-P56CFEJA.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/public/booking-calendar/booking-calendar.component.ts
function BookingCalendarComponent_Conditional_9_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 12);
    \u0275\u0275listener("click", function BookingCalendarComponent_Conditional_9_Conditional_6_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.continueToBook());
    });
    \u0275\u0275text(3, "Continue");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sel_r3 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.currencySymbol(), "", sel_r3.price, "");
  }
}
function BookingCalendarComponent_Conditional_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Minimum ", ctx_r1.minHours(), "h");
  }
}
function BookingCalendarComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 6)(1, "div", 7)(2, "div", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, BookingCalendarComponent_Conditional_9_Conditional_6_Template, 4, 2)(7, BookingCalendarComponent_Conditional_9_Conditional_7_Template, 2, 1, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sel_r3 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", sel_r3.from, " \u2013 ", sel_r3.to, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", sel_r3.hours, "h session");
    \u0275\u0275advance();
    \u0275\u0275conditional(sel_r3.price !== null && sel_r3.valid ? 6 : 7);
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
      const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;
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
      return day.slots.map((s) => __spreadProps(__spreadValues({}, s), {
        inRange: a !== null && (b !== null ? s.hour >= a && s.hour <= b : s.hour === a),
        isStart: s.hour === a,
        isEnd: s.hour === (b ?? a)
      }));
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
    const daySlots = this.response()?.days.find((d) => d.date === this.selectedDate())?.slots ?? [];
    const free = (h) => daySlots.some((s) => s.hour === h && s.available);
    const r = nextRange({ start: this.rangeStart(), end: this.rangeEnd() }, slot.hour, free, this.maxHours());
    this.rangeStart.set(r.start);
    this.rangeEnd.set(r.end);
  }
  clearRange() {
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingCalendarComponent, selectors: [["app-booking-calendar"]], decls: 10, vars: 11, consts: [[1, "book"], [1, "book__head"], [1, "book__back", 3, "click"], [1, "book__title"], [1, "book__sub"], ["dayLabel", "1 \xB7 Choose a day", "timeLabel", "2 \xB7 Select your time", "emptyText", "No times available on this day.", 3, "prevMonth", "nextMonth", "daySelected", "slotSelected", "clearSelection", "timeHint", "monthLabel", "canGoPrev", "cells", "selectedDate", "loading", "error", "slots", "hasSelection"], [1, "summary"], [1, "summary__info"], [1, "summary__when"], [1, "summary__dur"], [1, "summary__noprice"], [1, "summary__price"], [1, "summary__cta", 3, "click"]], template: function BookingCalendarComponent_Template(rf, ctx) {
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
        \u0275\u0275elementStart(8, "app-availability-calendar", 5);
        \u0275\u0275listener("prevMonth", function BookingCalendarComponent_Template_app_availability_calendar_prevMonth_8_listener() {
          return ctx.changeMonth(-1);
        })("nextMonth", function BookingCalendarComponent_Template_app_availability_calendar_nextMonth_8_listener() {
          return ctx.changeMonth(1);
        })("daySelected", function BookingCalendarComponent_Template_app_availability_calendar_daySelected_8_listener($event) {
          return ctx.selectDay($event);
        })("slotSelected", function BookingCalendarComponent_Template_app_availability_calendar_slotSelected_8_listener($event) {
          return ctx.selectHour($event);
        })("clearSelection", function BookingCalendarComponent_Template_app_availability_calendar_clearSelection_8_listener() {
          return ctx.clearRange();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, BookingCalendarComponent_Conditional_9_Template, 8, 4, "section", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_10_0;
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.serviceName() || "Book a session");
        \u0275\u0275advance(3);
        \u0275\u0275property("timeHint", "tap start, then end \xB7 up to " + ctx.maxHours() + "h")("monthLabel", ctx.monthLabel())("canGoPrev", ctx.canGoPrev())("cells", ctx.cells())("selectedDate", ctx.selectedDate())("loading", ctx.loading())("error", ctx.error())("slots", ctx.slots())("hasSelection", ctx.rangeStart() !== null);
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_10_0 = ctx.selection()) ? 9 : -1, tmp_10_0);
      }
    }, dependencies: [AvailabilityCalendarComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  background: #f8fafc;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  color: #0f172a;\n}\n.book[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 32px 20px 120px;\n}\n.book__head[_ngcontent-%COMP%] {\n  margin-bottom: 28px;\n}\n.book__back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #475569;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0 0 10px;\n}\n.book__back[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n.book__title[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 800;\n  letter-spacing: -0.03em;\n  margin: 0 0 6px;\n}\n.book__sub[_ngcontent-%COMP%] {\n  font-size: 14.5px;\n  color: #475569;\n  margin: 0;\n}\n.summary[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  max-width: 560px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  background: #0f172a;\n  color: #fff;\n  border-radius: 12px 12px 0 0;\n  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.18);\n}\n.summary__info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.summary__when[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n}\n.summary__dur[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #94a3b8;\n}\n.summary__price[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n}\n.summary__noprice[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #94a3b8;\n}\n.summary__cta[_ngcontent-%COMP%] {\n  padding: 11px 20px;\n  background: #F4A922;\n  color: #0f172a;\n  font-weight: 700;\n  font-size: 14px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: 0.15s ease;\n}\n.summary__cta[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.05);\n}\n/*# sourceMappingURL=booking-calendar.component.css.map */'] });
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
//# sourceMappingURL=chunk-Z3RXGKJ6.js.map
