import {
  LineItemsEditorComponent
} from "./chunk-IICV7HJH.js";
import {
  ClientEditorComponent
} from "./chunk-Q7QSWBGD.js";
import "./chunk-2PKC7M3P.js";
import {
  BookingAdminService
} from "./chunk-DT3HMCUA.js";
import {
  BookingDataService
} from "./chunk-VAMOUJOZ.js";
import "./chunk-FSJG3SUO.js";
import {
  ToastService
} from "./chunk-C7UDYKXR.js";
import {
  BookingsAuthService
} from "./chunk-KKHOHJA2.js";
import {
  AvailabilityCalendarComponent,
  nextRange
} from "./chunk-FOM5H6WH.js";
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
} from "./chunk-3H6OUIAT.js";
import "./chunk-F6LTA4RG.js";
import "./chunk-4746DPCT.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-Q6APD67I.js";
import "./chunk-GHBBMOR7.js";
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
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-EBVVQ6Y2.js";
import {
  __async,
  __spreadProps,
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
function zonedClockToUtc(dateStr, hour, minute, tz) {
  const [y, m, d] = dateStr.split("-").map(Number);
  let ms = Date.UTC(y, m - 1, d, hour, minute, 0);
  for (let i = 0; i < 2; i++) {
    const corrected = Date.UTC(y, m - 1, d, hour, minute, 0) - tzOffsetMs(new Date(ms), tz);
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
    hour: "2-digit",
    minute: "2-digit"
  });
  const p = {};
  for (const part of dtf.formatToParts(instant))
    p[part.type] = part.value;
  return { dateStr: `${p["year"]}-${p["month"]}-${p["day"]}`, hour: +p["hour"], minute: +p["minute"] };
}

// src/app/booking/platform/bookings/booking-form/availability-picker.component.ts
var _forTrack0 = ($index, $item) => $item.iso;
function AvailabilityPickerComponent_Conditional_0_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "span", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 6);
    \u0275\u0275listener("click", function AvailabilityPickerComponent_Conditional_0_For_6_Template_button_click_3_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeSlot(s_r2));
    });
    \u0275\u0275text(4, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.label);
  }
}
function AvailabilityPickerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 2);
    \u0275\u0275text(2, "Time blocks ");
    \u0275\u0275elementStart(3, "span", 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(5, AvailabilityPickerComponent_Conditional_0_For_6_Template, 5, 1, "div", 4, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.slots().length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.slots());
  }
}
var SLOTS = 48;
var SLOT_MIN = 30;
var pad = (n) => String(n).padStart(2, "0");
var hm = (i) => `${pad(Math.floor(i / 2))}:${pad(i % 2 * SLOT_MIN)}`;
var AvailabilityPickerComponent = class _AvailabilityPickerComponent {
  constructor() {
    this.data = inject(BookingDataService);
    this.staffId = input.required();
    this.timezone = input("Europe/Malta");
    this.initialSlots = input([]);
    this.excludeBookingId = input("");
    this.slotsChange = output();
    this.today = /* @__PURE__ */ new Date();
    this.viewYear = signal(this.today.getFullYear());
    this.viewMonth = signal(this.today.getMonth());
    this.selectedDate = signal(null);
    this.rangeStart = signal(null);
    this.rangeEnd = signal(null);
    this.slots = signal([]);
    this.busy = signal([]);
    this.loading = signal(false);
    this.loadedStaff = "";
    this.seeded = false;
    this.monthLabel = computed(() => new Date(this.viewYear(), this.viewMonth(), 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" }));
    this.canGoPrev = computed(() => true);
    this.cells = computed(() => {
      const y = this.viewYear(), m = this.viewMonth();
      const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;
      const dim = new Date(y, m + 1, 0).getDate();
      const todayStr = toDateStr(this.today);
      const cells = [];
      for (let i = 0; i < firstDow; i++)
        cells.push({ date: null, day: 0, available: false, isPast: false });
      for (let d = 1; d <= dim; d++) {
        const date = toDateStr(new Date(y, m, d));
        cells.push({ date, day: d, available: true, isPast: date < todayStr });
      }
      return cells;
    });
    this.gridSlots = computed(() => {
      const date = this.selectedDate();
      if (!date)
        return [];
      const a = this.rangeStart(), b = this.rangeEnd();
      const mine = this.slots().filter((s) => s.date === date).map((s) => {
        const z = utcToZoned(new Date(s.iso), this.timezone());
        const from = z.hour * 2 + (z.minute >= SLOT_MIN ? 1 : 0);
        return { from, to: from + Math.round(s.hours / 0.5) - 1 };
      });
      return Array.from({ length: SLOTS }, (_, i) => {
        const start = this.slotStart(date, i);
        const occupying = this.bookingAt(start);
        const isMine = mine.some((r) => i >= r.from && i <= r.to);
        const inRange = a !== null && (b !== null ? i >= a && i <= b : i === a);
        return {
          start: start.toISOString(),
          hour: i,
          label: hm(i),
          available: !occupying && !isMine,
          mine: isMine,
          busyReason: occupying ? reason(occupying) : null,
          inRange,
          isStart: i === a,
          isEnd: i === (b ?? a)
        };
      });
    });
    effect(() => {
      const staff = this.staffId();
      const y = this.viewYear(), m = this.viewMonth();
      untracked(() => {
        if (this.loadedStaff && this.loadedStaff !== staff) {
          this.slots.set([]);
          this.rangeStart.set(null);
          this.rangeEnd.set(null);
          this.emit();
        }
        this.loadedStaff = staff;
        void this.loadBusy(staff, y, m);
      });
    });
    effect(() => {
      const init = this.initialSlots();
      if (this.seeded || !init.length)
        return;
      this.seeded = true;
      const tz = this.timezone();
      untracked(() => {
        const ps = init.map((s) => this.toPicked(s.start, s.end)).sort((a, b) => a.iso.localeCompare(b.iso));
        this.slots.set(ps);
        const first = utcToZoned(new Date(ps[0].iso), tz);
        const [yy, mm] = first.dateStr.split("-").map(Number);
        this.viewYear.set(yy);
        this.viewMonth.set(mm - 1);
        this.selectedDate.set(first.dateStr);
        this.emit();
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
  // ── Helpers ─────────────────────────────────────────────────────────
  slotStart(date, i) {
    return zonedClockToUtc(date, Math.floor(i / 2), i % 2 * SLOT_MIN, this.timezone());
  }
  toPicked(startIso, endIso) {
    const z = utcToZoned(new Date(startIso), this.timezone());
    const hours = (new Date(endIso).getTime() - new Date(startIso).getTime()) / 36e5;
    return { iso: startIso, endIso, hours, date: z.dateStr, label: this.label(startIso, endIso) };
  }
  label(startIso, endIso) {
    const tz = this.timezone();
    const day = new Date(startIso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: tz });
    const t = (iso) => new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz });
    return `${day} \xB7 ${t(startIso)}\u2013${t(endIso)}`;
  }
  bookingAt(start) {
    const end = new Date(start.getTime() + SLOT_MIN * 6e4);
    const exclude = this.excludeBookingId();
    return this.busy().find((x) => x.id !== exclude && new Date(x.start_at) < end && new Date(x.end_at) > start);
  }
  emit() {
    this.slotsChange.emit(this.slots());
  }
  // ── Events ──────────────────────────────────────────────────────────
  changeMonth(delta) {
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
  }
  onDay(cell) {
    if (!cell.date)
      return;
    this.selectedDate.set(cell.date);
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
  }
  /** Tap a start slot, then an end slot → adds that block to the list (then pick more). */
  onSlot(slot) {
    if (!slot.available)
      return;
    const free = (i) => this.gridSlots().some((s) => s.hour === i && s.available);
    const r = nextRange({ start: this.rangeStart(), end: this.rangeEnd() }, slot.hour, free, SLOTS);
    if (r.start !== null && r.end !== null) {
      this.addBlock(r.start, r.end);
      this.rangeStart.set(null);
      this.rangeEnd.set(null);
    } else {
      this.rangeStart.set(r.start);
      this.rangeEnd.set(r.end);
    }
  }
  addBlock(a, b) {
    const date = this.selectedDate();
    if (!date)
      return;
    const hours = (b - a + 1) * (SLOT_MIN / 60);
    const start = this.slotStart(date, a);
    const end = new Date(start.getTime() + hours * 36e5);
    const ps = this.toPicked(start.toISOString(), end.toISOString());
    this.slots.update((list) => [...list, ps].sort((x, y) => x.iso.localeCompare(y.iso)));
    this.emit();
  }
  removeSlot(s) {
    this.slots.update((list) => list.filter((x) => x.iso !== s.iso));
    this.emit();
  }
  clearInProgress() {
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
  }
  static {
    this.\u0275fac = function AvailabilityPickerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AvailabilityPickerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AvailabilityPickerComponent, selectors: [["app-availability-picker"]], inputs: { staffId: [1, "staffId"], timezone: [1, "timezone"], initialSlots: [1, "initialSlots"], excludeBookingId: [1, "excludeBookingId"] }, outputs: { slotsChange: "slotsChange" }, decls: 2, vars: 11, consts: [[1, "blocks"], ["dayLabel", "Choose a day", "timeHint", "tap start, then end \xB7 adds a block \xB7 pick other days too", "emptyText", "No times on this day.", 3, "prevMonth", "nextMonth", "daySelected", "slotSelected", "clearSelection", "timeLabel", "showBusyReason", "monthLabel", "canGoPrev", "cells", "selectedDate", "loading", "slots", "allowPast", "hasSelection"], [1, "blocks__head"], [1, "blocks__count"], [1, "block"], [1, "block__label"], ["type", "button", "aria-label", "Remove block", 1, "block__x", 3, "click"]], template: function AvailabilityPickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, AvailabilityPickerComponent_Conditional_0_Template, 7, 1, "div", 0);
        \u0275\u0275elementStart(1, "app-availability-calendar", 1);
        \u0275\u0275listener("prevMonth", function AvailabilityPickerComponent_Template_app_availability_calendar_prevMonth_1_listener() {
          return ctx.changeMonth(-1);
        })("nextMonth", function AvailabilityPickerComponent_Template_app_availability_calendar_nextMonth_1_listener() {
          return ctx.changeMonth(1);
        })("daySelected", function AvailabilityPickerComponent_Template_app_availability_calendar_daySelected_1_listener($event) {
          return ctx.onDay($event);
        })("slotSelected", function AvailabilityPickerComponent_Template_app_availability_calendar_slotSelected_1_listener($event) {
          return ctx.onSlot($event);
        })("clearSelection", function AvailabilityPickerComponent_Template_app_availability_calendar_clearSelection_1_listener() {
          return ctx.clearInProgress();
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.slots().length ? 0 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("timeLabel", ctx.slots().length ? "Add another block" : "Choose a time")("showBusyReason", true)("monthLabel", ctx.monthLabel())("canGoPrev", ctx.canGoPrev())("cells", ctx.cells())("selectedDate", ctx.selectedDate())("loading", ctx.loading())("slots", ctx.gridSlots())("allowPast", true)("hasSelection", ctx.rangeStart() !== null);
      }
    }, dependencies: [AvailabilityCalendarComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.blocks[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.blocks__head[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #6b7280;\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.blocks__count[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #000;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 9px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  font-weight: 700;\n}\n.block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 8px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  margin-bottom: 6px;\n  background: #fff;\n}\n.block__label[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #111827;\n}\n.block__x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 18px;\n  line-height: 1;\n  color: #9ca3af;\n  padding: 0 2px;\n}\n.block__x[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n/*# sourceMappingURL=availability-picker.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AvailabilityPickerComponent, { className: "AvailabilityPickerComponent", filePath: "src/app/booking/platform/bookings/booking-form/availability-picker.component.ts", lineNumber: 80 });
})();
function reason(b) {
  return b.clientName ? `${b.clientName} \xB7 ${b.title}` : b.title;
}
function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// src/app/booking/platform/bookings/booking-form/booking-form.component.ts
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.iso;
function BookingFormComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "div", 6);
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "\u2026or send them the invoice:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 17)(3, "input", 18);
    \u0275\u0275listener("focus", function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Conditional_4_Template_input_focus_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.target.select());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 19);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Conditional_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.copyInvoiceLink());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.invoiceLink);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.copied() === "invoice" ? "\u2713 Copied" : "Copy", " ");
  }
}
function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "input", 18);
    \u0275\u0275listener("focus", function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template_input_focus_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.target.select());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 19);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.copyLink());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Conditional_4_Template, 6, 2);
  }
  if (rf & 2) {
    const done_r5 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("value", done_r5.link);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.copied() === "pay" ? "\u2713 Copied" : "Copy", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.invoiceLink ? 4 : -1);
  }
}
function BookingFormComponent_Conditional_10_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
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
    \u0275\u0275template(7, BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template, 5, 3)(8, BookingFormComponent_Conditional_10_Conditional_0_Conditional_8_Template, 2, 0, "p", 11);
    \u0275\u0275elementStart(9, "div", 12)(10, "a", 13);
    \u0275\u0275text(11, "\u2B07 Download invoice (PDF)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "a", 13);
    \u0275\u0275text(13, "\u{1F5A8} Print invoice");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 14)(15, "button", 15);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_10_Conditional_0_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.reset());
    });
    \u0275\u0275text(16, "Create another");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 16);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_10_Conditional_0_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToList());
    });
    \u0275\u0275text(18, "Done");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const done_r5 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("Booking ", done_r5.ref, " ", ctx_r2.isEditing ? "updated" : "created", "");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(done_r5.link ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275property("href", "/book/invoice/" + done_r5.id + "?auto=download", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", "/book/invoice/" + done_r5.id + "?auto=print", \u0275\u0275sanitizeUrl);
  }
}
function BookingFormComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, BookingFormComponent_Conditional_10_Conditional_0_Template, 19, 5, "div", 7);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r2.created()) ? 0 : -1, tmp_1_0);
  }
}
function BookingFormComponent_Conditional_11_Conditional_10_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    \u0275\u0275property("value", c_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r8.name, "", c_r8.company ? " \xB7 " + c_r8.company : "", "");
  }
}
function BookingFormComponent_Conditional_11_Conditional_10_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "Tip: add this client's VAT & billing address in Clients for VAT-ready invoices.");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "select", 56);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_10_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.clientId, $event) || (ctx_r2.clientId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "option", 27);
    \u0275\u0275text(3, "Select a client\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, BookingFormComponent_Conditional_11_Conditional_10_For_5_Template, 2, 3, "option", 28, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 57);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Conditional_10_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openClientEditor());
    });
    \u0275\u0275text(7, "+ New");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, BookingFormComponent_Conditional_11_Conditional_10_Conditional_8_Template, 2, 0, "span", 30);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.clientId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.data.clients());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.selectedClient && !ctx_r2.selectedClient.vat_number && !ctx_r2.selectedClient.billing_address ? 8 : -1);
  }
}
function BookingFormComponent_Conditional_11_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_11_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.contactName, $event) || (ctx_r2.contactName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "span", 30);
    \u0275\u0275text(2, "A one-off name \u2014 not saved to Clients. The invoice bills to this name only (no company / VAT). Use an existing client if you need a VAT-ready invoice.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.contactName);
  }
}
function BookingFormComponent_Conditional_11_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r10 = ctx.$implicit;
    \u0275\u0275property("value", w_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r10.name);
  }
}
function BookingFormComponent_Conditional_11_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "No bookable workers yet (Staff tab).");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "Pick a worker first \u2014 their calendar appears on the right.");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Conditional_25_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2713 ", s_r11.label, "");
  }
}
function BookingFormComponent_Conditional_11_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, BookingFormComponent_Conditional_11_Conditional_25_For_1_Template, 2, 1, "div", 59, _forTrack1);
    \u0275\u0275elementStart(2, "span", 30);
    \u0275\u0275text(3, "Add more blocks (even on other days) or remove them on the calendar \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r2.selectedSlots);
  }
}
function BookingFormComponent_Conditional_11_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "Tap a start & end time on the worker's calendar \u2192 \u2014 add as many blocks as you need.");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Case_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Client can pay by card now, or ask to pay later (you approve that request). ");
  }
}
function BookingFormComponent_Conditional_11_Case_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Client must pay by card to confirm. ");
  }
}
function BookingFormComponent_Conditional_11_Case_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " No online payment \u2014 the client confirms the booking and agrees to pay by cash / Revolut / bank transfer. Books straight away. ");
  }
}
function BookingFormComponent_Conditional_11_Conditional_59_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
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
function BookingFormComponent_Conditional_11_Conditional_59_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "label");
    \u0275\u0275text(2, "Deposit %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_59_Conditional_11_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.depositPercent, $event) || (ctx_r2.depositPercent = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, BookingFormComponent_Conditional_11_Conditional_59_Conditional_11_Conditional_4_Template, 4, 12, "span", 30);
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
function BookingFormComponent_Conditional_11_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 23)(2, "label");
    \u0275\u0275text(3, "Deposit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 60);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_59_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.depositMode, $event) || (ctx_r2.depositMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 61);
    \u0275\u0275text(6, "Allow a deposit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 62);
    \u0275\u0275text(8, "Require full payment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 30);
    \u0275\u0275text(10, "Prefilled from your default \u2014 change it for this booking if needed.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, BookingFormComponent_Conditional_11_Conditional_59_Conditional_11_Template, 5, 2, "div", 23);
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
function BookingFormComponent_Conditional_11_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 42)(1, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_66_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.confirmed, $event) || (ctx_r2.confirmed = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span")(3, "strong");
    \u0275\u0275text(4, "This booking is already confirmed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 44);
    \u0275\u0275text(6, " Leave unchecked to send it as a ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8, "request");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, ": the slot is held for you, the client sees their invoice and can pay or ask to pay later, and it lands in your ");
    \u0275\u0275elementStart(10, "em");
    \u0275\u0275text(11, "To confirm");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " list to accept. Check it if it's already agreed \u2014 it's added to your Google Calendar now and the client just gets the invoice. ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.confirmed);
  }
}
function BookingFormComponent_Conditional_11_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.errorMsg());
  }
}
function BookingFormComponent_Conditional_11_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-availability-picker", 65);
    \u0275\u0275listener("slotsChange", function BookingFormComponent_Conditional_11_Conditional_84_Template_app_availability_picker_slotsChange_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onSlotsChanged($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("staffId", ctx_r2.staffId)("timezone", ctx_r2.orgTimezone())("initialSlots", ctx_r2.prefillSlots)("excludeBookingId", (tmp_5_0 = ctx_r2.editingId()) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : "");
  }
}
function BookingFormComponent_Conditional_11_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 66);
    \u0275\u0275text(2, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Pick a worker to see their calendar and choose a free time.");
    \u0275\u0275elementEnd()();
  }
}
function BookingFormComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "form", 22);
    \u0275\u0275listener("ngSubmit", function BookingFormComponent_Conditional_11_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submit());
    });
    \u0275\u0275elementStart(2, "div", 23)(3, "label");
    \u0275\u0275text(4, "Customer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 24)(6, "button", 25);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clientMode = "existing");
    });
    \u0275\u0275text(7, "Existing client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 25);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clientMode = "quick");
    });
    \u0275\u0275text(9, "Just a name");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, BookingFormComponent_Conditional_11_Conditional_10_Template, 9, 2)(11, BookingFormComponent_Conditional_11_Conditional_11_Template, 3, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 23)(13, "label");
    \u0275\u0275text(14, "Worker");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 26);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.staffId, $event) || (ctx_r2.staffId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "option", 27);
    \u0275\u0275text(17, "Select a worker\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(18, BookingFormComponent_Conditional_11_For_19_Template, 2, 2, "option", 28, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, BookingFormComponent_Conditional_11_Conditional_20_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 23)(22, "label");
    \u0275\u0275text(23, "Time blocks");
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, BookingFormComponent_Conditional_11_Conditional_24_Template, 2, 0, "span", 30)(25, BookingFormComponent_Conditional_11_Conditional_25_Template, 4, 0)(26, BookingFormComponent_Conditional_11_Conditional_26_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 23)(28, "label");
    \u0275\u0275text(29, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.title, $event) || (ctx_r2.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 23)(32, "label");
    \u0275\u0275text(33, "Charges ");
    \u0275\u0275elementStart(34, "span", 32);
    \u0275\u0275text(35, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "app-line-items-editor", 33);
    \u0275\u0275listener("itemsChange", function BookingFormComponent_Conditional_11_Template_app_line_items_editor_itemsChange_36_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onItemsChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 30);
    \u0275\u0275text(38, "Add a charge: pick one of your services (and how many hours) to pre-fill it, or a custom charge. The total is what the client pays \u2014 and it becomes the invoice.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 23)(40, "label");
    \u0275\u0275text(41, "Location ");
    \u0275\u0275elementStart(42, "span", 34);
    \u0275\u0275text(43, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.location, $event) || (ctx_r2.location = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 23)(46, "label");
    \u0275\u0275text(47, "Payment options on the link");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "select", 36);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.paymentMode, $event) || (ctx_r2.paymentMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(49, "option", 37);
    \u0275\u0275text(50, "Card or pay later (cash / Revolut / bank)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "option", 38);
    \u0275\u0275text(52, "Card only");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "option", 39);
    \u0275\u0275text(54, "Pay later only \u2014 client just confirms the booking");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "span", 30);
    \u0275\u0275template(56, BookingFormComponent_Conditional_11_Case_56_Template, 1, 0)(57, BookingFormComponent_Conditional_11_Case_57_Template, 1, 0)(58, BookingFormComponent_Conditional_11_Case_58_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(59, BookingFormComponent_Conditional_11_Conditional_59_Template, 12, 2, "div", 40);
    \u0275\u0275elementStart(60, "div", 23)(61, "label");
    \u0275\u0275text(62, "Notes ");
    \u0275\u0275elementStart(63, "span", 34);
    \u0275\u0275text(64, "(optional, internal)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "textarea", 41);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_textarea_ngModelChange_65_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.notes, $event) || (ctx_r2.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(66, BookingFormComponent_Conditional_11_Conditional_66_Template, 13, 1, "label", 42);
    \u0275\u0275elementStart(67, "label", 42)(68, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_68_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.needsProduction, $event) || (ctx_r2.needsProduction = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "span")(70, "strong");
    \u0275\u0275text(71, "Needs post-production");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "span", 44);
    \u0275\u0275text(73, "Adds this to the Work board (editing \u2192 delivery). Leave off for meetings or no-edit jobs.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(74, BookingFormComponent_Conditional_11_Conditional_74_Template, 2, 1, "p", 45);
    \u0275\u0275elementStart(75, "div", 46)(76, "button", 47);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Template_button_click_76_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToList());
    });
    \u0275\u0275text(77, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "button", 48);
    \u0275\u0275text(79);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(80, "aside", 49)(81, "div", 50)(82, "h2", 51);
    \u0275\u0275text(83, "Worker availability");
    \u0275\u0275elementEnd();
    \u0275\u0275template(84, BookingFormComponent_Conditional_11_Conditional_84_Template, 1, 4, "app-availability-picker", 52)(85, BookingFormComponent_Conditional_11_Conditional_85_Template, 5, 0, "div", 53);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(86, "app-client-editor", 54);
    \u0275\u0275twoWayListener("openChange", function BookingFormComponent_Conditional_11_Template_app_client_editor_openChange_86_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.clientEditorOpen, $event) || (ctx_r2.clientEditorOpen = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("saved", function BookingFormComponent_Conditional_11_Template_app_client_editor_saved_86_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onClientCreated($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_14_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275classProp("seg__btn--on", ctx_r2.clientMode === "existing");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("seg__btn--on", ctx_r2.clientMode === "quick");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.clientMode === "existing" ? 10 : 11);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.staffId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.workers);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.workers.length === 0 ? 20 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(!ctx_r2.staffId ? 24 : ctx_r2.selectedSlots.length ? 25 : 26);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.title);
    \u0275\u0275advance(6);
    \u0275\u0275property("items", ctx_r2.lineItems)("currency", ctx_r2.currency())("services", ctx_r2.services());
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.location);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.paymentMode);
    \u0275\u0275advance(8);
    \u0275\u0275conditional((tmp_14_0 = ctx_r2.paymentMode) === "both" ? 56 : tmp_14_0 === "card" ? 57 : tmp_14_0 === "later" ? 58 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.paymentMode !== "later" ? 59 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.notes);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.isEditing ? 66 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.needsProduction);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r2.errorMsg() ? 74 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r2.canSubmit);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.saving() ? ctx_r2.isEditing ? "Saving\u2026" : "Creating\u2026" : ctx_r2.isEditing ? "Save changes" : "Create booking", " ");
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.staffId ? 84 : 85);
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
    this.clientMode = "existing";
    this.clientId = "";
    this.contactName = "";
    this.clientEditorOpen = signal(false);
    this.staffId = "";
    this.selectedSlots = [];
    this.prefillSlots = [];
    this.orgTimezone = signal("Europe/Malta");
    this.currency = signal("EUR");
    this.lineItems = [];
    this.title = "";
    this.location = "";
    this.notes = "";
    this.paymentMode = "both";
    this.depositMode = "deposit";
    this.depositPercent = 30;
    this.needsProduction = false;
    this.confirmed = false;
    this.orgDefaults = { depositPercent: 30, depositAllowed: true };
    this.copied = signal(null);
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
      if (b.client_id) {
        this.clientMode = "existing";
        this.clientId = b.client_id;
        this.contactName = "";
      } else if (b.contact_name) {
        this.clientMode = "quick";
        this.contactName = b.contact_name;
        this.clientId = "";
      }
      this.staffId = b.staff_id;
      this.title = b.title;
      this.location = b.location ?? "";
      this.notes = b.notes ?? "";
      this.paymentMode = b.allow_card && b.allow_inperson ? "both" : b.allow_card ? "card" : "later";
      this.depositMode = b.deposit_allowed ?? this.orgDefaults.depositAllowed ? "deposit" : "full";
      this.depositPercent = b.deposit_percent ?? this.orgDefaults.depositPercent;
      this.needsProduction = b.needs_production ?? false;
      this.prefillSlots = yield this.data.getBookingSlots(id);
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
  /** A customer is set when an existing client is picked, or a quick name is typed. */
  get hasCustomer() {
    return this.clientMode === "existing" ? !!this.clientId : this.contactName.trim().length > 0;
  }
  /** The DB slots to persist (one row per chosen block). */
  get slotsValue() {
    return this.selectedSlots.map((s) => ({ start: s.iso, end: s.endIso }));
  }
  // ── Change handlers ─────────────────────────────────────────────────
  // Charges (pricing) are decoupled from the calendar — editing items never touches the time blocks.
  onItemsChange(items) {
    this.lineItems = items;
  }
  // The picker clears its blocks (and emits []) when the worker changes, so no manual reset needed.
  onSlotsChanged(slots) {
    this.selectedSlots = slots;
  }
  // ── Client (reuses the full client editor — never a stub) ────────────
  openClientEditor() {
    this.clientEditorOpen.set(true);
  }
  onClientCreated(c) {
    this.clientMode = "existing";
    this.clientId = c.id;
  }
  // ── Submit ──────────────────────────────────────────────────────────
  get canSubmit() {
    const itemsOk = this.lineItems.length > 0 && this.lineItems.every((i) => i.description.trim().length > 0) && this.priceTotal > 0;
    return !this.saving() && this.hasCustomer && !!this.staffId && this.selectedSlots.length > 0 && itemsOk && this.title.trim().length > 0;
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
          clientId: this.clientMode === "existing" ? this.clientId : null,
          contactName: this.clientMode === "quick" ? this.contactName.trim() : null,
          title: this.title.trim(),
          description: items.map((i) => i.description).join("\n"),
          // client-facing summary on the pay page
          slots: this.slotsValue,
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
            this.created.set({ id: this.editingId(), ref: this.editingRef, link: link2 });
          } else {
            this.goToList();
          }
          return;
        }
        const res = yield this.data.createBooking(__spreadProps(__spreadValues({ orgId: org }, shared), { confirmed: this.confirmed }));
        if (res.error || !res.id) {
          this.errorMsg.set(this.errorText(res.error));
          return;
        }
        yield this.data.saveInvoice(org, res.id, { lineItems: items, notes: null, issueDate: null });
        if (this.confirmed)
          yield this.data.confirmToCalendar(res.id);
        if (this.needsProduction)
          yield this.admin.addWorkItem(org, res.id, "");
        const link = yield this.data.generateLink(res.id);
        this.created.set({ id: res.id, ref: res.ref ?? "", link });
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
  /** Shareable invoice link (anon, token-based) — derived from the payment link. */
  get invoiceLink() {
    const link = this.created()?.link;
    return link ? link.replace("/book/", "/book/invoice?token=") : null;
  }
  copyTo(text, which) {
    return __async(this, null, function* () {
      if (!text)
        return;
      try {
        yield navigator.clipboard.writeText(text);
        this.copied.set(which);
        setTimeout(() => {
          if (this.copied() === which)
            this.copied.set(null);
        }, 1600);
      } catch {
      }
    });
  }
  copyLink() {
    void this.copyTo(this.created()?.link, "pay");
  }
  copyInvoiceLink() {
    void this.copyTo(this.invoiceLink, "invoice");
  }
  reset() {
    this.editingId.set(null);
    this.clientMode = "existing";
    this.clientId = "";
    this.contactName = "";
    this.staffId = "";
    this.selectedSlots = [];
    this.prefillSlots = [];
    this.lineItems = [];
    this.title = "";
    this.location = "";
    this.notes = "";
    this.paymentMode = "both";
    this.depositMode = this.orgDefaults.depositAllowed ? "deposit" : "full";
    this.depositPercent = this.orgDefaults.depositPercent;
    this.needsProduction = false;
    this.confirmed = false;
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingFormComponent, selectors: [["app-booking-form"]], decls: 12, vars: 3, consts: [[1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], ["routerLink", "/bookings/list", 1, "btn", "btn--ghost"], [1, "loading"], [1, "spinner"], [1, "card", "done"], [1, "done__check"], [1, "done__title"], [1, "done__sub"], [1, "muted"], [1, "done__invoice"], ["target", "_blank", "rel", "noopener", 1, "btn", "btn--ghost", "btn--sm", 3, "href"], [1, "done__actions"], [1, "btn", "btn--ghost", 3, "click"], [1, "btn", "btn--primary", 3, "click"], [1, "linkbox"], ["readonly", "", 1, "linkbox__input", 3, "focus", "value"], ["type", "button", 1, "btn", "btn--primary", "linkbox__btn", 3, "click"], [1, "done__sub", "done__sub--gap"], [1, "form-layout"], [1, "card", "form", 3, "ngSubmit"], [1, "field"], [1, "seg"], ["type", "button", 1, "seg__btn", 3, "click"], ["name", "staffId", "required", "", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value"], [1, "hint", "hint--warn"], [1, "hint"], ["name", "title", "placeholder", "e.g. Wedding shoot \u2014 Sliema", "required", "", 3, "ngModelChange", "ngModel"], [1, "req"], [3, "itemsChange", "items", "currency", "services"], [1, "opt"], ["name", "location", "placeholder", "Address or venue", 3, "ngModelChange", "ngModel"], ["name", "paymentMode", 3, "ngModelChange", "ngModel"], ["value", "both"], ["value", "card"], ["value", "later"], [1, "row2"], ["name", "notes", "rows", "2", "placeholder", "Anything to remember about this job", 3, "ngModelChange", "ngModel"], [1, "check"], ["type", "checkbox", "name", "needsProduction", 3, "ngModelChange", "ngModel"], [1, "check__hint"], [1, "error"], [1, "form__actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], [1, "form-aside"], [1, "card", "aside-card"], [1, "aside-card__title"], [3, "staffId", "timezone", "initialSlots", "excludeBookingId"], [1, "aside-empty"], [3, "openChange", "saved", "open", "client"], [1, "client-row"], ["name", "clientId", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["name", "contactName", "placeholder", "e.g. John from Sliema", 3, "ngModelChange", "ngModel"], [1, "picked"], ["name", "depositMode", 3, "ngModelChange", "ngModel"], ["value", "deposit"], ["value", "full"], ["type", "number", "name", "depositPercent", "min", "1", "max", "100", "step", "1", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "name", "confirmed", 3, "ngModelChange", "ngModel"], [3, "slotsChange", "staffId", "timezone", "initialSlots", "excludeBookingId"], [1, "aside-empty__icon"]], template: function BookingFormComponent_Template(rf, ctx) {
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
        \u0275\u0275template(9, BookingFormComponent_Conditional_9_Template, 2, 0, "div", 5)(10, BookingFormComponent_Conditional_10_Template, 1, 1)(11, BookingFormComponent_Conditional_11_Template, 87, 25);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.isEditing ? "Edit booking" : "New booking");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Update the details of this booking." : "Create a booking and send the client a link to confirm or pay.", " ");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.loading() ? 9 : ctx.created() ? 10 : 11);
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, RouterLink, CurrencyPipe, AvailabilityPickerComponent, LineItemsEditorComponent, ClientEditorComponent], styles: [`

.page[_ngcontent-%COMP%] {
  padding: 32px 40px;
  max-width: 1200px;
}
@media (max-width: 760px) {
  .page[_ngcontent-%COMP%] {
    padding: 20px 16px;
  }
}
.page__head[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.head-actions[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex-shrink: 0;
}
@media (max-width: 640px) {
  .head-actions[_ngcontent-%COMP%] {
    width: 100%;
  }
  .head-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
    flex: 1 1 auto;
    justify-content: center;
  }
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
.seg[_ngcontent-%COMP%] {
  display: inline-flex;
  gap: 0;
  margin-bottom: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
.seg__btn[_ngcontent-%COMP%] {
  padding: 7px 14px;
  font-size: 12.5px;
  font-weight: 600;
  font-family: inherit;
  background: #ffffff;
  color: #475569;
  border: none;
  cursor: pointer;
  transition: 0.15s ease;
}
.seg__btn[_ngcontent-%COMP%]    + .seg__btn[_ngcontent-%COMP%] {
  border-left: 1px solid #e2e8f0;
}
.seg__btn[_ngcontent-%COMP%]:hover:not(.seg__btn--on) {
  background: #f8fafc;
}
.seg__btn--on[_ngcontent-%COMP%] {
  background: #F4A922;
  color: #fff;
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
.done__invoice[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
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
  margin: 0 auto 6px;
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
.linkbox__btn[_ngcontent-%COMP%] {
  cursor: pointer;
  min-width: 92px;
  justify-content: center;
}
.done__sub--gap[_ngcontent-%COMP%] {
  margin-top: 14px;
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
//# sourceMappingURL=chunk-DNOFCDPF.js.map
