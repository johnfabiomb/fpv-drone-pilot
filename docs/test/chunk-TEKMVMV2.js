import {
  ClientEditorComponent
} from "./chunk-2AAQINJK.js";
import {
  LineItemsEditorComponent
} from "./chunk-P7KQ5C2H.js";
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
import {
  AvailabilityCalendarComponent,
  nextRange
} from "./chunk-63GOS5RZ.js";
import "./chunk-DEXNZGWM.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-RYL5JWPP.js";
import "./chunk-5R6IZFLD.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-23WFKX7T.js";
import "./chunk-2VIPXXQC.js";
import "./chunk-WKMKAAWK.js";
import {
  CurrencyPipe,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-YX7TN7IZ.js";
import {
  __async,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/core/utils/timezone.util.ts
function tzOffsetMs(instant, tz) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const p = {};
  for (const part of dtf.formatToParts(instant))
    p[part.type] = part.value;
  const asUtc = Date.UTC(+p["year"], +p["month"] - 1, +p["day"], +p["hour"], +p["minute"], +p["second"]);
  return asUtc - instant.getTime();
}
function zonedHourToUtc(dateStr, hour, tz) {
  const [y, m, d] = dateStr.split("-").map(Number);
  let ms = Date.UTC(y, m - 1, d, hour, 0, 0);
  for (let i = 0; i < 2; i++) {
    const corrected = Date.UTC(y, m - 1, d, hour, 0, 0) - tzOffsetMs(new Date(ms), tz);
    if (corrected === ms)
      break;
    ms = corrected;
  }
  return new Date(ms);
}
function utcToZoned(instant, tz) {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit"
  });
  const p = {};
  for (const part of dtf.formatToParts(instant))
    p[part.type] = part.value;
  return { dateStr: `${p["year"]}-${p["month"]}-${p["day"]}`, hour: +p["hour"] };
}

// src/app/booking/platform/bookings/booking-form/availability-picker.component.ts
var AvailabilityPickerComponent = class _AvailabilityPickerComponent {
  constructor() {
    this.data = inject(BookingDataService);
    this.staffId = input.required();
    this.timezone = input("Europe/Malta");
    this.value = input("");
    this.durationValue = input(0);
    this.excludeBookingId = input("");
    this.picked = output();
    this.MAX_HOURS = 24;
    this.today = /* @__PURE__ */ new Date();
    this.viewYear = signal(this.today.getFullYear());
    this.viewMonth = signal(this.today.getMonth());
    this.selectedDate = signal(null);
    this.rangeStart = signal(null);
    this.rangeEnd = signal(null);
    this.busy = signal([]);
    this.loading = signal(false);
    this.loadedStaff = "";
    this.monthLabel = computed(() => new Date(this.viewYear(), this.viewMonth(), 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" }));
    this.canGoPrev = computed(() => new Date(this.viewYear(), this.viewMonth(), 1) > new Date(this.today.getFullYear(), this.today.getMonth(), 1));
    this.cells = computed(() => {
      const y = this.viewYear(), m = this.viewMonth();
      const firstDow = new Date(y, m, 1).getDay();
      const dim = new Date(y, m + 1, 0).getDate();
      const todayStr = toDateStr(this.today);
      const cells = [];
      for (let i = 0; i < firstDow; i++)
        cells.push({ date: null, day: 0, available: false, isPast: false });
      for (let d = 1; d <= dim; d++) {
        const date = toDateStr(new Date(y, m, d));
        cells.push({ date, day: d, available: date >= todayStr, isPast: date < todayStr });
      }
      return cells;
    });
    this.slots = computed(() => {
      const date = this.selectedDate();
      if (!date)
        return [];
      const tz = this.timezone(), now = Date.now();
      const a = this.rangeStart(), b = this.rangeEnd();
      return Array.from({ length: 24 }, (_, hr) => {
        const start = zonedHourToUtc(date, hr, tz);
        const occupying = this.bookingAt(start);
        const inRange = a !== null && (b !== null ? hr >= a && hr <= b : hr === a);
        return {
          start: start.toISOString(),
          hour: hr,
          label: `${String(hr).padStart(2, "0")}:00`,
          available: !occupying && start.getTime() >= now,
          busyReason: occupying ? reason(occupying) : null,
          inRange,
          isStart: hr === a,
          isEnd: hr === (b ?? a)
        };
      });
    });
    effect(() => {
      const staff = this.staffId();
      const y = this.viewYear(), m = this.viewMonth();
      untracked(() => {
        if (this.loadedStaff && this.loadedStaff !== staff) {
          this.rangeStart.set(null);
          this.rangeEnd.set(null);
        }
        this.loadedStaff = staff;
        void this.loadBusy(staff, y, m);
      });
    });
    effect(() => {
      const v = this.value();
      if (!v)
        return;
      const dur = Math.max(1, this.durationValue() || 1);
      const z = utcToZoned(new Date(v), this.timezone());
      untracked(() => {
        const [yy, mm] = z.dateStr.split("-").map(Number);
        this.viewYear.set(yy);
        this.viewMonth.set(mm - 1);
        this.selectedDate.set(z.dateStr);
        this.rangeStart.set(z.hour);
        this.rangeEnd.set(z.hour + dur - 1);
      });
    });
  }
  loadBusy(staffId, year, month) {
    return __async(this, null, function* () {
      if (!staffId) {
        this.busy.set([]);
        return;
      }
      this.loading.set(true);
      const from = new Date(Date.UTC(year, month, 1) - 864e5).toISOString();
      const to = new Date(Date.UTC(year, month + 1, 1) + 864e5).toISOString();
      this.busy.set(yield this.data.getWorkerBusy(staffId, from, to));
      this.loading.set(false);
    });
  }
  bookingAt(start) {
    const end = new Date(start.getTime() + 36e5);
    const exclude = this.excludeBookingId();
    return this.busy().find((x) => x.id !== exclude && new Date(x.start_at) < end && new Date(x.end_at) > start);
  }
  // ── Events ──────────────────────────────────────────────────────────
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
    this.emitSelection();
  }
  onDay(cell) {
    if (!cell.date)
      return;
    this.selectedDate.set(cell.date);
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
    this.emitSelection();
  }
  /** Tap a start hour, then an end hour. Once complete, the next tap starts over. */
  onSlot(slot) {
    if (!slot.available)
      return;
    const free = (h) => this.slots().some((s) => s.hour === h && s.available);
    const r = nextRange({ start: this.rangeStart(), end: this.rangeEnd() }, slot.hour, free, this.MAX_HOURS);
    this.rangeStart.set(r.start);
    this.rangeEnd.set(r.end);
    this.emitSelection();
  }
  clear() {
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
    this.emitSelection();
  }
  emitSelection() {
    const date = this.selectedDate(), a = this.rangeStart(), b = this.rangeEnd(), tz = this.timezone();
    if (date && a !== null && b !== null) {
      const hours = b - a + 1;
      const start = zonedHourToUtc(date, a, tz);
      const end = zonedHourToUtc(date, a + hours, tz);
      const label = `${date} \xB7 ${String(a).padStart(2, "0")}:00\u2013${String(a + hours).padStart(2, "0")}:00`;
      this.picked.emit({ iso: start.toISOString(), endIso: end.toISOString(), hours, label });
    } else {
      this.picked.emit({ iso: "", endIso: "", hours: 0, label: "" });
    }
  }
  static {
    this.\u0275fac = function AvailabilityPickerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AvailabilityPickerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AvailabilityPickerComponent, selectors: [["app-availability-picker"]], inputs: { staffId: [1, "staffId"], timezone: [1, "timezone"], value: [1, "value"], durationValue: [1, "durationValue"], excludeBookingId: [1, "excludeBookingId"] }, outputs: { picked: "picked" }, decls: 1, vars: 9, consts: [["dayLabel", "Choose a day", "timeHint", "tap start, then end \xB7 busy slots show who booked them", "emptyText", "No times on this day.", 3, "prevMonth", "nextMonth", "daySelected", "slotSelected", "clearSelection", "timeLabel", "showBusyReason", "monthLabel", "canGoPrev", "cells", "selectedDate", "loading", "slots", "hasSelection"]], template: function AvailabilityPickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-availability-calendar", 0);
        \u0275\u0275listener("prevMonth", function AvailabilityPickerComponent_Template_app_availability_calendar_prevMonth_0_listener() {
          return ctx.changeMonth(-1);
        })("nextMonth", function AvailabilityPickerComponent_Template_app_availability_calendar_nextMonth_0_listener() {
          return ctx.changeMonth(1);
        })("daySelected", function AvailabilityPickerComponent_Template_app_availability_calendar_daySelected_0_listener($event) {
          return ctx.onDay($event);
        })("slotSelected", function AvailabilityPickerComponent_Template_app_availability_calendar_slotSelected_0_listener($event) {
          return ctx.onSlot($event);
        })("clearSelection", function AvailabilityPickerComponent_Template_app_availability_calendar_clearSelection_0_listener() {
          return ctx.clear();
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("timeLabel", "Choose a start time")("showBusyReason", true)("monthLabel", ctx.monthLabel())("canGoPrev", ctx.canGoPrev())("cells", ctx.cells())("selectedDate", ctx.selectedDate())("loading", ctx.loading())("slots", ctx.slots())("hasSelection", ctx.rangeStart() !== null);
      }
    }, dependencies: [AvailabilityCalendarComponent], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AvailabilityPickerComponent, { className: "AvailabilityPickerComponent", filePath: "src/app/booking/platform/bookings/booking-form/availability-picker.component.ts", lineNumber: 44 });
})();
function reason(b) {
  return b.clientName ? `${b.clientName} \xB7 ${b.title}` : b.title;
}
function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// src/app/booking/platform/bookings/booking-form/booking-form.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function BookingFormComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "div", 6);
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "input", 16);
    \u0275\u0275listener("focus", function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template_input_focus_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.target.select());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 15);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.copyLink());
    });
    \u0275\u0275text(3, "Copy");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const done_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", done_r4.link);
  }
}
function BookingFormComponent_Conditional_10_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "Booking saved, but the payment link couldn\u2019t be generated. You can copy it from the bookings list.");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 10);
    \u0275\u0275text(6, "The slot is reserved. Send this payment link to your client:");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template, 4, 1, "div", 11)(8, BookingFormComponent_Conditional_10_Conditional_0_Conditional_8_Template, 2, 0, "p", 12);
    \u0275\u0275elementStart(9, "div", 13)(10, "button", 14);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_10_Conditional_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.reset());
    });
    \u0275\u0275text(11, "Create another");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 15);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_10_Conditional_0_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToList());
    });
    \u0275\u0275text(13, "Done");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const done_r4 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("Booking ", done_r4.ref, " ", ctx_r2.isEditing ? "updated" : "created", "");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(done_r4.link ? 7 : 8);
  }
}
function BookingFormComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, BookingFormComponent_Conditional_10_Conditional_0_Template, 14, 3, "div", 7);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r2.created()) ? 0 : -1, tmp_1_0);
  }
}
function BookingFormComponent_Conditional_11_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    \u0275\u0275property("value", c_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r6.name, "", c_r6.company ? " \xB7 " + c_r6.company : "", "");
  }
}
function BookingFormComponent_Conditional_11_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, "Tip: add this client's VAT & billing address in Clients for VAT-ready invoices.");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = ctx.$implicit;
    \u0275\u0275property("value", w_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r7.name);
  }
}
function BookingFormComponent_Conditional_11_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "No bookable workers yet (Staff tab).");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, "Pick a worker first \u2014 their calendar appears on the right.");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 53);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 25);
    \u0275\u0275text(5, "Change it from the calendar \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2713 ", ctx_r2.selectedSlotLabel, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.orgTimezone());
  }
}
function BookingFormComponent_Conditional_11_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Choose a free time from the worker's calendar \u2192");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Case_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Client can pay by card now, or ask to pay later (you approve that request). ");
  }
}
function BookingFormComponent_Conditional_11_Case_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Client must pay by card to confirm. ");
  }
}
function BookingFormComponent_Conditional_11_Case_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " No online payment \u2014 the client confirms the booking and agrees to pay by cash / Revolut / bank transfer. Books straight away. ");
  }
}
function BookingFormComponent_Conditional_11_Conditional_61_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Client pays ", \u0275\u0275pipeBind4(2, 2, ctx_r2.priceTotal * ctx_r2.depositPercent / 100, "EUR", "symbol", "1.0-2"), " now, ", \u0275\u0275pipeBind4(3, 7, ctx_r2.priceTotal * (100 - ctx_r2.depositPercent) / 100, "EUR", "symbol", "1.0-2"), " later.");
  }
}
function BookingFormComponent_Conditional_11_Conditional_61_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "label");
    \u0275\u0275text(2, "Deposit %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 57);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_61_Conditional_11_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.depositPercent, $event) || (ctx_r2.depositPercent = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, BookingFormComponent_Conditional_11_Conditional_61_Conditional_11_Conditional_4_Template, 4, 12, "span", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.depositPercent);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.priceTotal != null && ctx_r2.priceTotal > 0 ? 4 : -1);
  }
}
function BookingFormComponent_Conditional_11_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 19)(2, "label");
    \u0275\u0275text(3, "Deposit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 54);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_61_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.depositMode, $event) || (ctx_r2.depositMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 55);
    \u0275\u0275text(6, "Allow a deposit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 56);
    \u0275\u0275text(8, "Require full payment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 25);
    \u0275\u0275text(10, "Prefilled from your default \u2014 change it for this booking if needed.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, BookingFormComponent_Conditional_11_Conditional_61_Conditional_11_Template, 5, 2, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.depositMode);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r2.depositMode === "deposit" ? 11 : -1);
  }
}
function BookingFormComponent_Conditional_11_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.errorMsg());
  }
}
function BookingFormComponent_Conditional_11_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-availability-picker", 58);
    \u0275\u0275listener("picked", function BookingFormComponent_Conditional_11_Conditional_85_Template_app_availability_picker_picked_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onSlotPicked($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("staffId", ctx_r2.staffId)("timezone", ctx_r2.orgTimezone())("value", ctx_r2.prefillStartIso)("durationValue", ctx_r2.prefillHours)("excludeBookingId", (tmp_6_0 = ctx_r2.editingId()) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : "");
  }
}
function BookingFormComponent_Conditional_11_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 59);
    \u0275\u0275text(2, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Pick a worker to see their calendar and choose a free time.");
    \u0275\u0275elementEnd()();
  }
}
function BookingFormComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "form", 18);
    \u0275\u0275listener("ngSubmit", function BookingFormComponent_Conditional_11_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submit());
    });
    \u0275\u0275elementStart(2, "div", 19)(3, "label");
    \u0275\u0275text(4, "Client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 20)(6, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.clientId, $event) || (ctx_r2.clientId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(7, "option", 22);
    \u0275\u0275text(8, "Select a client\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, BookingFormComponent_Conditional_11_For_10_Template, 2, 3, "option", 23, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 24);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openClientEditor());
    });
    \u0275\u0275text(12, "+ New");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, BookingFormComponent_Conditional_11_Conditional_13_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 19)(15, "label");
    \u0275\u0275text(16, "Worker");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 26);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.staffId, $event) || (ctx_r2.staffId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_17_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onWorkerChange());
    });
    \u0275\u0275elementStart(18, "option", 22);
    \u0275\u0275text(19, "Select a worker\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(20, BookingFormComponent_Conditional_11_For_21_Template, 2, 2, "option", 23, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, BookingFormComponent_Conditional_11_Conditional_22_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 19)(24, "label");
    \u0275\u0275text(25, "Start");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, BookingFormComponent_Conditional_11_Conditional_26_Template, 2, 0, "span", 25)(27, BookingFormComponent_Conditional_11_Conditional_27_Template, 6, 2)(28, BookingFormComponent_Conditional_11_Conditional_28_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 19)(30, "label");
    \u0275\u0275text(31, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.title, $event) || (ctx_r2.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 19)(34, "label");
    \u0275\u0275text(35, "Charges ");
    \u0275\u0275elementStart(36, "span", 29);
    \u0275\u0275text(37, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "app-line-items-editor", 30);
    \u0275\u0275listener("itemsChange", function BookingFormComponent_Conditional_11_Template_app_line_items_editor_itemsChange_38_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onItemsChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 25);
    \u0275\u0275text(40, "Add a charge: pick one of your services (and how many hours) to pre-fill it, or a custom charge. The total is what the client pays \u2014 and it becomes the invoice.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 19)(42, "label");
    \u0275\u0275text(43, "Location ");
    \u0275\u0275elementStart(44, "span", 31);
    \u0275\u0275text(45, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.location, $event) || (ctx_r2.location = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 19)(48, "label");
    \u0275\u0275text(49, "Payment options on the link");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "select", 33);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.paymentMode, $event) || (ctx_r2.paymentMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(51, "option", 34);
    \u0275\u0275text(52, "Card or pay later (cash / Revolut / bank)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "option", 35);
    \u0275\u0275text(54, "Card only");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "option", 36);
    \u0275\u0275text(56, "Pay later only \u2014 client just confirms the booking");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "span", 25);
    \u0275\u0275template(58, BookingFormComponent_Conditional_11_Case_58_Template, 1, 0)(59, BookingFormComponent_Conditional_11_Case_59_Template, 1, 0)(60, BookingFormComponent_Conditional_11_Case_60_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(61, BookingFormComponent_Conditional_11_Conditional_61_Template, 12, 2, "div", 37);
    \u0275\u0275elementStart(62, "div", 19)(63, "label");
    \u0275\u0275text(64, "Notes ");
    \u0275\u0275elementStart(65, "span", 31);
    \u0275\u0275text(66, "(optional, internal)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "textarea", 38);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_textarea_ngModelChange_67_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.notes, $event) || (ctx_r2.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "label", 39)(69, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_69_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.needsProduction, $event) || (ctx_r2.needsProduction = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "span")(71, "strong");
    \u0275\u0275text(72, "Needs post-production");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "span", 41);
    \u0275\u0275text(74, "Adds this to the Work board (editing \u2192 delivery). Leave off for meetings or no-edit jobs.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(75, BookingFormComponent_Conditional_11_Conditional_75_Template, 2, 1, "p", 42);
    \u0275\u0275elementStart(76, "div", 43)(77, "button", 44);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Template_button_click_77_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToList());
    });
    \u0275\u0275text(78, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "button", 45);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(81, "aside", 46)(82, "div", 47)(83, "h2", 48);
    \u0275\u0275text(84, "Worker availability");
    \u0275\u0275elementEnd();
    \u0275\u0275template(85, BookingFormComponent_Conditional_11_Conditional_85_Template, 1, 5, "app-availability-picker", 49)(86, BookingFormComponent_Conditional_11_Conditional_86_Template, 5, 0, "div", 50);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(87, "app-client-editor", 51);
    \u0275\u0275twoWayListener("openChange", function BookingFormComponent_Conditional_11_Template_app_client_editor_openChange_87_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.clientEditorOpen, $event) || (ctx_r2.clientEditorOpen = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("saved", function BookingFormComponent_Conditional_11_Template_app_client_editor_saved_87_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onClientCreated($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_14_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.clientId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.data.clients());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.selectedClient && !ctx_r2.selectedClient.vat_number && !ctx_r2.selectedClient.billing_address ? 13 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.staffId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.workers);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.workers.length === 0 ? 22 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(!ctx_r2.staffId ? 26 : ctx_r2.selectedStartIso ? 27 : 28);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.title);
    \u0275\u0275advance(6);
    \u0275\u0275property("items", ctx_r2.lineItems)("currency", ctx_r2.currency())("services", ctx_r2.services());
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.location);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.paymentMode);
    \u0275\u0275advance(8);
    \u0275\u0275conditional((tmp_14_0 = ctx_r2.paymentMode) === "both" ? 58 : tmp_14_0 === "card" ? 59 : tmp_14_0 === "later" ? 60 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.paymentMode !== "later" ? 61 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.notes);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.needsProduction);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r2.errorMsg() ? 75 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r2.canSubmit);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.saving() ? ctx_r2.isEditing ? "Saving\u2026" : "Creating\u2026" : ctx_r2.isEditing ? "Save changes" : "Create booking", " ");
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.staffId ? 85 : 86);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("open", ctx_r2.clientEditorOpen);
    \u0275\u0275property("client", null);
  }
}
var BookingFormComponent = class _BookingFormComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.admin = inject(BookingAdminService);
    this.auth = inject(BookingsAuthService);
    this.toast = inject(ToastService);
    this.data = inject(BookingDataService);
    this.editingRef = "";
    this.services = signal([]);
    this.staff = signal([]);
    this.loading = signal(true);
    this.saving = signal(false);
    this.errorMsg = signal("");
    this.editingId = signal(null);
    this.created = signal(null);
    this.clientId = "";
    this.clientEditorOpen = signal(false);
    this.staffId = "";
    this.selectedStartIso = "";
    this.selectedHours = 0;
    this.selectedSlotLabel = "";
    this.prefillStartIso = "";
    this.prefillHours = 0;
    this.orgTimezone = signal("Europe/Malta");
    this.currency = signal("EUR");
    this.lineItems = [{ description: "", amount: 0 }];
    this.title = "";
    this.location = "";
    this.notes = "";
    this.paymentMode = "both";
    this.depositMode = "deposit";
    this.depositPercent = 30;
    this.needsProduction = false;
    this.orgDefaults = { depositPercent: 30, depositAllowed: true };
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.auth.initialize();
      const org = this.auth.orgId();
      if (org) {
        const [services, staff, settings] = yield Promise.all([
          this.admin.listServices(org),
          this.admin.listStaff(org),
          this.admin.getOrgSettings(org)
        ]);
        this.services.set(services.filter((s) => s.is_active));
        this.staff.set(staff.filter((s) => s.is_bookable));
        this.orgDefaults = {
          depositPercent: settings?.booking_params?.deposit_percent ?? 30,
          depositAllowed: settings?.booking_params?.deposit_allowed ?? true
        };
        if (settings?.timezone)
          this.orgTimezone.set(settings.timezone);
        if (settings?.currency)
          this.currency.set(settings.currency);
        this.depositPercent = this.orgDefaults.depositPercent;
        this.depositMode = this.orgDefaults.depositAllowed ? "deposit" : "full";
        const id = this.route.snapshot.paramMap.get("id");
        if (id)
          yield this.loadForEdit(id);
      }
      this.loading.set(false);
    });
  }
  loadForEdit(id) {
    return __async(this, null, function* () {
      const b = yield this.data.getBooking(id);
      if (!b) {
        this.errorMsg.set("Booking not found.");
        return;
      }
      this.editingId.set(id);
      this.editingRef = b.booking_ref;
      this.clientId = b.client_id ?? "";
      this.staffId = b.staff_id;
      this.title = b.title;
      this.location = b.location ?? "";
      this.notes = b.notes ?? "";
      this.paymentMode = b.allow_card && b.allow_inperson ? "both" : b.allow_card ? "card" : "later";
      this.depositMode = b.deposit_allowed ?? this.orgDefaults.depositAllowed ? "deposit" : "full";
      this.depositPercent = b.deposit_percent ?? this.orgDefaults.depositPercent;
      this.needsProduction = b.needs_production ?? false;
      const dur = Math.max(1, Math.round((new Date(b.end_at).getTime() - new Date(b.start_at).getTime()) / 36e5));
      this.selectedStartIso = b.start_at;
      this.selectedHours = dur;
      this.prefillStartIso = b.start_at;
      this.prefillHours = dur;
      this.selectedSlotLabel = this.rangeLabel(b.start_at, dur);
      const items = yield this.data.getInvoiceItems(id);
      this.lineItems = items.length ? items : [{ description: b.description ?? b.title, amount: b.price_total }];
    });
  }
  // ── Derived ─────────────────────────────────────────────────────────
  get isEditing() {
    return this.editingId() !== null;
  }
  /** Any bookable worker — availability is worker-based. */
  get workers() {
    return this.staff();
  }
  /** Booking total = sum of the line items (source of truth). */
  get priceTotal() {
    return this.lineItems.reduce((s, i) => s + (Number(i.amount) || 0), 0);
  }
  get selectedClient() {
    return this.data.clients().find((c) => c.id === this.clientId);
  }
  get startAtValue() {
    return this.selectedStartIso;
  }
  /** "20 Jun · 08:00–13:00" in the org's timezone. */
  rangeLabel(startIso, hours) {
    const tz = this.orgTimezone();
    const start = new Date(startIso);
    const end = new Date(start.getTime() + hours * 36e5);
    const day = start.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: tz });
    const t = (d) => d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz });
    return `${day} \xB7 ${t(start)}\u2013${t(end)}`;
  }
  // ── Change handlers ─────────────────────────────────────────────────
  // Charges (pricing) are decoupled from the calendar span — editing items never touches the time.
  onItemsChange(items) {
    this.lineItems = items;
  }
  onWorkerChange() {
    this.resetSlotSelection();
  }
  resetSlotSelection() {
    this.selectedStartIso = "";
    this.selectedHours = 0;
    this.selectedSlotLabel = "";
  }
  onSlotPicked(slot) {
    this.selectedStartIso = slot.iso;
    this.selectedHours = slot.hours;
    this.selectedSlotLabel = slot.label;
  }
  // ── Client (reuses the full client editor — never a stub) ────────────
  openClientEditor() {
    this.clientEditorOpen.set(true);
  }
  onClientCreated(c) {
    this.clientId = c.id;
  }
  // ── Submit ──────────────────────────────────────────────────────────
  get canSubmit() {
    const itemsOk = this.lineItems.length > 0 && this.lineItems.every((i) => i.description.trim().length > 0) && this.priceTotal > 0;
    return !this.saving() && !!this.clientId && !!this.staffId && !!this.startAtValue && this.selectedHours > 0 && itemsOk && this.title.trim().length > 0;
  }
  submit() {
    return __async(this, null, function* () {
      if (!this.canSubmit)
        return;
      const org = this.auth.orgId();
      if (!org) {
        this.errorMsg.set("No organization context.");
        return;
      }
      this.saving.set(true);
      this.errorMsg.set("");
      try {
        const items = this.lineItems.map((i) => __spreadValues(__spreadValues({
          description: i.description.trim(),
          amount: Number(i.amount) || 0
        }, i.serviceId ? { serviceId: i.serviceId } : {}), i.hours ? { hours: i.hours } : {}));
        const shared = {
          staffId: this.staffId,
          serviceId: null,
          clientId: this.clientId,
          title: this.title.trim(),
          description: items.map((i) => i.description).join("\n"),
          // client-facing summary on the pay page
          startAt: this.startAtValue,
          hours: this.selectedHours,
          priceTotal: this.priceTotal,
          allowCard: this.paymentMode !== "later",
          allowInperson: this.paymentMode !== "card",
          depositAllowed: this.depositMode === "deposit",
          depositPercent: this.depositPercent,
          needsProduction: this.needsProduction,
          location: this.location.trim() || null,
          notes: this.notes.trim() || null
        };
        if (this.isEditing) {
          const res2 = yield this.data.updateBooking(this.editingId(), shared);
          if (res2.error) {
            this.errorMsg.set(this.errorText(res2.error));
            return;
          }
          yield this.data.saveInvoice(org, this.editingId(), { lineItems: items, notes: null, issueDate: null });
          this.toast.success(`${this.editingRef || "Booking"} updated`);
          if (this.paymentMode !== "later") {
            const link2 = yield this.data.generateLink(this.editingId());
            this.created.set({ ref: this.editingRef, link: link2 });
          } else {
            this.goToList();
          }
          return;
        }
        const res = yield this.data.createBooking(__spreadValues({ orgId: org }, shared));
        if (res.error || !res.id) {
          this.errorMsg.set(this.errorText(res.error));
          return;
        }
        yield this.data.saveInvoice(org, res.id, { lineItems: items, notes: null, issueDate: null });
        const link = yield this.data.generateLink(res.id);
        this.created.set({ ref: res.ref ?? "", link });
        this.toast.success(`Booking ${res.ref ?? ""} created`);
      } finally {
        this.saving.set(false);
      }
    });
  }
  errorText(error) {
    if (error === "slot_taken")
      return "That worker is already booked for that time. Pick another slot or worker.";
    return error ?? "Something went wrong. Please try again.";
  }
  copyLink() {
    return __async(this, null, function* () {
      const link = this.created()?.link;
      if (link)
        yield navigator.clipboard.writeText(link);
    });
  }
  reset() {
    this.editingId.set(null);
    this.clientId = "";
    this.staffId = "";
    this.resetSlotSelection();
    this.prefillStartIso = "";
    this.prefillHours = 0;
    this.lineItems = [{ description: "", amount: 0 }];
    this.title = "";
    this.location = "";
    this.notes = "";
    this.paymentMode = "both";
    this.depositMode = this.orgDefaults.depositAllowed ? "deposit" : "full";
    this.depositPercent = this.orgDefaults.depositPercent;
    this.needsProduction = false;
    this.created.set(null);
    this.errorMsg.set("");
  }
  goToList() {
    this.router.navigate(["/bookings/list"]);
  }
  static {
    this.\u0275fac = function BookingFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingFormComponent, selectors: [["app-booking-form"]], decls: 12, vars: 3, consts: [[1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], ["routerLink", "/bookings/list", 1, "btn", "btn--ghost"], [1, "loading"], [1, "spinner"], [1, "card", "done"], [1, "done__check"], [1, "done__title"], [1, "done__sub"], [1, "linkbox"], [1, "muted"], [1, "done__actions"], [1, "btn", "btn--ghost", 3, "click"], [1, "btn", "btn--primary", 3, "click"], ["readonly", "", 1, "linkbox__input", 3, "focus", "value"], [1, "form-layout"], [1, "card", "form", 3, "ngSubmit"], [1, "field"], [1, "client-row"], ["name", "clientId", "required", "", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "hint"], ["name", "staffId", "required", "", 3, "ngModelChange", "ngModel"], [1, "hint", "hint--warn"], ["name", "title", "placeholder", "e.g. Wedding shoot \u2014 Sliema", "required", "", 3, "ngModelChange", "ngModel"], [1, "req"], [3, "itemsChange", "items", "currency", "services"], [1, "opt"], ["name", "location", "placeholder", "Address or venue", 3, "ngModelChange", "ngModel"], ["name", "paymentMode", 3, "ngModelChange", "ngModel"], ["value", "both"], ["value", "card"], ["value", "later"], [1, "row2"], ["name", "notes", "rows", "2", "placeholder", "Anything to remember about this job", 3, "ngModelChange", "ngModel"], [1, "check"], ["type", "checkbox", "name", "needsProduction", 3, "ngModelChange", "ngModel"], [1, "check__hint"], [1, "error"], [1, "form__actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], [1, "form-aside"], [1, "card", "aside-card"], [1, "aside-card__title"], [3, "staffId", "timezone", "value", "durationValue", "excludeBookingId"], [1, "aside-empty"], [3, "openChange", "saved", "open", "client"], [1, "picked"], [1, "picked__tz"], ["name", "depositMode", 3, "ngModelChange", "ngModel"], ["value", "deposit"], ["value", "full"], ["type", "number", "name", "depositPercent", "min", "1", "max", "100", "step", "1", 3, "ngModelChange", "ngModel"], [3, "picked", "staffId", "timezone", "value", "durationValue", "excludeBookingId"], [1, "aside-empty__icon"]], template: function BookingFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "a", 4);
        \u0275\u0275text(8, "Back to list");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, BookingFormComponent_Conditional_9_Template, 2, 0, "div", 5)(10, BookingFormComponent_Conditional_10_Template, 1, 1)(11, BookingFormComponent_Conditional_11_Template, 88, 21);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.isEditing ? "Edit booking" : "New booking");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Update the details of this booking." : "Create a confirmed job and send the client a payment link.", " ");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.loading() ? 9 : ctx.created() ? 10 : 11);
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, RouterLink, CurrencyPipe, AvailabilityPickerComponent, LineItemsEditorComponent, ClientEditorComponent], styles: [`

.page[_ngcontent-%COMP%] {
  padding: 32px 36px;
  max-width: 720px;
}
.page__head[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.page__title[_ngcontent-%COMP%] {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 4px;
  letter-spacing: -0.02em;
}
.page__sub[_ngcontent-%COMP%] {
  font-size: 13.5px;
  color: #475569;
  margin: 0;
}
.muted[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 14px;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  border: 1.5px solid transparent;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Inter",
    "Segoe UI",
    sans-serif;
  transition: 0.15s ease;
  text-decoration: none;
}
.btn--primary[_ngcontent-%COMP%] {
  background: #F4A922;
  color: #000;
}
.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  filter: brightness(0.94);
}
.btn--ghost[_ngcontent-%COMP%] {
  background: #ffffff;
  border-color: #e2e8f0;
  color: #475569;
}
.btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {
  border-color: #94a3b8;
}
.btn--sm[_ngcontent-%COMP%] {
  padding: 6px 12px;
  font-size: 12px;
}
.btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: default;
}
.link-btn[_ngcontent-%COMP%] {
  background: none;
  border: none;
  font-size: 12.5px;
  font-weight: 600;
  color: #F4A922;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: inherit;
}
.link-btn[_ngcontent-%COMP%]:hover {
  background: rgba(244, 169, 34, 0.12);
}
.link-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
}
.link-btn--danger[_ngcontent-%COMP%] {
  color: #ef4444;
}
.link-btn--danger[_ngcontent-%COMP%]:hover {
  background: rgba(239, 68, 68, 0.1);
}
.card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}
.field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], 
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], 
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #0f172a;
  background: #ffffff;
  width: 100%;
  box-sizing: border-box;
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, 
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, 
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #F4A922;
}
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  resize: vertical;
}
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  appearance: none;
  cursor: pointer;
  padding-right: 32px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%236b7280' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}
.check[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: #0f172a;
}
.list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
}
.item--off[_ngcontent-%COMP%] {
  opacity: 0.6;
}
.item__name[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.item__meta[_ngcontent-%COMP%] {
  font-size: 12.5px;
  color: #475569;
  margin-top: 2px;
}
.item__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
  white-space: nowrap;
}
.tag[_ngcontent-%COMP%] {
  font-size: 10.5px;
  font-weight: 700;
  background: #eef2f6;
  color: #475569;
  padding: 2px 7px;
  border-radius: 10px;
  vertical-align: middle;
}
.page[_ngcontent-%COMP%] {
  max-width: 1100px;
}
.form-layout[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 20px;
  align-items: start;
}
@media (max-width: 900px) {
  .form-layout[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.form[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.client-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.client-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.btn--sm[_ngcontent-%COMP%] {
  padding: 8px 14px;
  font-size: 12.5px;
  white-space: nowrap;
}
.check[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}
.check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  margin-top: 1px;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: #F4A922;
}
.check[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  display: block;
  font-size: 13.5px;
  color: #0f172a;
}
.check__hint[_ngcontent-%COMP%] {
  display: block;
  font-size: 11.5px;
  color: #94a3b8;
  margin-top: 2px;
}
.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}
.form__actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
}
.row2[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 560px) {
  .row2[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.opt[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-weight: 400;
}
.req[_ngcontent-%COMP%] {
  color: #dc2626;
  font-weight: 600;
}
.hint[_ngcontent-%COMP%] {
  display: inline-block;
  font-size: 11.5px;
  color: #94a3b8;
  margin-top: 5px;
}
.hint--warn[_ngcontent-%COMP%] {
  color: #dc2626;
}
.hint--ok[_ngcontent-%COMP%] {
  color: #16a34a;
  font-weight: 600;
}
.hint.err[_ngcontent-%COMP%] {
  color: #dc2626;
}
.hint--link[_ngcontent-%COMP%] {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #F4A922;
  font-weight: 600;
  font-family: inherit;
}
.picked[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #16a34a;
}
.picked__tz[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
}
.form-aside[_ngcontent-%COMP%] {
  position: sticky;
  top: 16px;
}
@media (max-width: 900px) {
  .form-aside[_ngcontent-%COMP%] {
    position: static;
  }
}
.aside-card[_ngcontent-%COMP%] {
  padding: 18px;
}
.aside-card__title[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 14px;
}
.aside-empty[_ngcontent-%COMP%] {
  text-align: center;
  padding: 32px 16px;
  color: #94a3b8;
}
.aside-empty__icon[_ngcontent-%COMP%] {
  font-size: 30px;
  margin-bottom: 10px;
}
.aside-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  margin: 0;
  line-height: 1.5;
}
.error[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin: 0;
}
.done[_ngcontent-%COMP%] {
  text-align: center;
  padding: 32px 28px;
}
.done__check[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  margin: 0 auto 14px;
  background: #dcfce7;
  color: #16a34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}
.done__title[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 4px;
}
.done__sub[_ngcontent-%COMP%] {
  font-size: 13.5px;
  color: #475569;
  margin: 0 0 18px;
}
.done__actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.linkbox[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  max-width: 460px;
  margin: 0 auto;
}
.linkbox__input[_ngcontent-%COMP%] {
  flex: 1;
  padding: 10px 12px;
  font-size: 13px;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  font-family:
    "SF Mono",
    "Fira Mono",
    monospace;
}
.loading[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  padding: 60px;
}
.spinner[_ngcontent-%COMP%] {
  width: 28px;
  height: 28px;
  border: 2.5px solid #e2e8f0;
  border-top-color: #F4A922;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
/*# sourceMappingURL=booking-form.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookingFormComponent, { className: "BookingFormComponent", filePath: "src/app/booking/platform/bookings/booking-form/booking-form.component.ts", lineNumber: 22 });
})();
export {
  BookingFormComponent
};
//# sourceMappingURL=chunk-TEKMVMV2.js.map
