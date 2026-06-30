import {
  input,
  output,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-EBVVQ6Y2.js";

// src/app/booking/ui/availability-calendar/availability-calendar.component.ts
var _forTrack0 = ($index, $item) => $item.hour;
function AvailabilityCalendarComponent_For_13_Template(rf, ctx) {
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
function AvailabilityCalendarComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, "Loading availability\u2026");
    \u0275\u0275elementEnd();
  }
}
function AvailabilityCalendarComponent_Conditional_15_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 11);
  }
}
function AvailabilityCalendarComponent_Conditional_15_For_2_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
function AvailabilityCalendarComponent_Conditional_15_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function AvailabilityCalendarComponent_Conditional_15_For_2_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const cell_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.daySelected.emit(cell_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, AvailabilityCalendarComponent_Conditional_15_For_2_Conditional_1_Conditional_2_Template, 1, 0, "span", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("cell--available", cell_r3.available)("cell--selected", cell_r3.date === ctx_r3.selectedDate());
    \u0275\u0275property("disabled", !cell_r3.available || cell_r3.isPast && !ctx_r3.allowPast());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r3.day, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r3.available ? 2 : -1);
  }
}
function AvailabilityCalendarComponent_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AvailabilityCalendarComponent_Conditional_15_For_2_Conditional_0_Template, 1, 0, "span", 11)(1, AvailabilityCalendarComponent_Conditional_15_For_2_Conditional_1_Template, 3, 7, "button", 12);
  }
  if (rf & 2) {
    const cell_r3 = ctx.$implicit;
    \u0275\u0275conditional(cell_r3.date === null ? 0 : 1);
  }
}
function AvailabilityCalendarComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AvailabilityCalendarComponent_Conditional_15_For_2_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.cells());
  }
}
function AvailabilityCalendarComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.error());
  }
}
function AvailabilityCalendarComponent_Conditional_17_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.timeHint());
  }
}
function AvailabilityCalendarComponent_Conditional_17_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function AvailabilityCalendarComponent_Conditional_17_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.clearSelection.emit());
    });
    \u0275\u0275text(1, "Clear");
    \u0275\u0275elementEnd();
  }
}
function AvailabilityCalendarComponent_Conditional_17_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.emptyText());
  }
}
function AvailabilityCalendarComponent_Conditional_17_Conditional_6_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r7.busyReason);
  }
}
function AvailabilityCalendarComponent_Conditional_17_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function AvailabilityCalendarComponent_Conditional_17_Conditional_6_For_2_Template_button_click_0_listener() {
      const s_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.slotSelected.emit(s_r7));
    });
    \u0275\u0275elementStart(1, "span", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AvailabilityCalendarComponent_Conditional_17_Conditional_6_For_2_Conditional_3_Template, 2, 1, "span", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("slot--busy", !s_r7.available && !s_r7.mine)("slot--mine", s_r7.mine)("slot--unstartable", s_r7.unstartable)("slot--range", s_r7.inRange)("slot--start", s_r7.isStart)("slot--end", s_r7.isEnd);
    \u0275\u0275property("disabled", !s_r7.available || s_r7.unstartable);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r7.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.showBusyReason() && !s_r7.available && s_r7.busyReason ? 3 : -1);
  }
}
function AvailabilityCalendarComponent_Conditional_17_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275repeaterCreate(1, AvailabilityCalendarComponent_Conditional_17_Conditional_6_For_2_Template, 4, 15, "button", 20, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.slots());
  }
}
function AvailabilityCalendarComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "h2", 1);
    \u0275\u0275text(2);
    \u0275\u0275template(3, AvailabilityCalendarComponent_Conditional_17_Conditional_3_Template, 2, 1, "span", 15)(4, AvailabilityCalendarComponent_Conditional_17_Conditional_4_Template, 2, 0, "button", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AvailabilityCalendarComponent_Conditional_17_Conditional_5_Template, 2, 1, "p", 17)(6, AvailabilityCalendarComponent_Conditional_17_Conditional_6_Template, 3, 0, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.timeLabel(), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.timeHint() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.hasSelection() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.slots().length === 0 ? 5 : 6);
  }
}
var AvailabilityCalendarComponent = class _AvailabilityCalendarComponent {
  constructor() {
    this.monthLabel = input.required();
    this.canGoPrev = input(true);
    this.cells = input.required();
    this.selectedDate = input(null);
    this.loading = input(false);
    this.error = input(null);
    this.dayLabel = input("Choose a day");
    this.slots = input([]);
    this.timeLabel = input("Choose a time");
    this.timeHint = input("");
    this.emptyText = input("No times available on this day.");
    this.showBusyReason = input(false);
    this.hasSelection = input(false);
    this.allowPast = input(false);
    this.prevMonth = output();
    this.nextMonth = output();
    this.daySelected = output();
    this.slotSelected = output();
    this.clearSelection = output();
    this.dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  }
  static {
    this.\u0275fac = function AvailabilityCalendarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AvailabilityCalendarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AvailabilityCalendarComponent, selectors: [["app-availability-calendar"]], inputs: { monthLabel: [1, "monthLabel"], canGoPrev: [1, "canGoPrev"], cells: [1, "cells"], selectedDate: [1, "selectedDate"], loading: [1, "loading"], error: [1, "error"], dayLabel: [1, "dayLabel"], slots: [1, "slots"], timeLabel: [1, "timeLabel"], timeHint: [1, "timeHint"], emptyText: [1, "emptyText"], showBusyReason: [1, "showBusyReason"], hasSelection: [1, "hasSelection"], allowPast: [1, "allowPast"] }, outputs: { prevMonth: "prevMonth", nextMonth: "nextMonth", daySelected: "daySelected", slotSelected: "slotSelected", clearSelection: "clearSelection" }, decls: 18, vars: 6, consts: [[1, "step"], [1, "step__label"], [1, "cal"], [1, "cal__nav"], ["type", "button", "aria-label", "Previous month", 1, "cal__arrow", 3, "click", "disabled"], [1, "cal__month"], ["type", "button", "aria-label", "Next month", 1, "cal__arrow", 3, "click"], [1, "cal__dow"], [1, "cal__loading"], [1, "cal__grid"], [1, "cal__error"], [1, "cell", "cell--blank"], ["type", "button", 1, "cell", 3, "cell--available", "cell--selected", "disabled"], ["type", "button", 1, "cell", 3, "click", "disabled"], [1, "cell__dot"], [1, "step__hint"], ["type", "button", 1, "step__clear"], [1, "cal__empty"], [1, "slots"], ["type", "button", 1, "step__clear", 3, "click"], ["type", "button", 1, "slot", 3, "slot--busy", "slot--mine", "slot--unstartable", "slot--range", "slot--start", "slot--end", "disabled"], ["type", "button", 1, "slot", 3, "click", "disabled"], [1, "slot__time"], [1, "slot__reason"]], template: function AvailabilityCalendarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "h2", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "button", 4);
        \u0275\u0275listener("click", function AvailabilityCalendarComponent_Template_button_click_5_listener() {
          return ctx.prevMonth.emit();
        });
        \u0275\u0275text(6, "\u2039");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "span", 5);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 6);
        \u0275\u0275listener("click", function AvailabilityCalendarComponent_Template_button_click_9_listener() {
          return ctx.nextMonth.emit();
        });
        \u0275\u0275text(10, "\u203A");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 7);
        \u0275\u0275repeaterCreate(12, AvailabilityCalendarComponent_For_13_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, AvailabilityCalendarComponent_Conditional_14_Template, 2, 0, "div", 8)(15, AvailabilityCalendarComponent_Conditional_15_Template, 3, 0, "div", 9)(16, AvailabilityCalendarComponent_Conditional_16_Template, 2, 1, "p", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(17, AvailabilityCalendarComponent_Conditional_17_Template, 7, 4, "section", 0);
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.dayLabel());
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", !ctx.canGoPrev());
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.monthLabel());
        \u0275\u0275advance(4);
        \u0275\u0275repeater(ctx.dow);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.loading() ? 14 : 15);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.error() ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.selectedDate() ? 17 : -1);
      }
    }, styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.step[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.step[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.step__label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #64748b;\n  margin: 0 0 12px;\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.step__hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: none;\n  letter-spacing: 0;\n  color: #94a3b8;\n}\n.step__clear[_ngcontent-%COMP%] {\n  margin-left: auto;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  font-family: inherit;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: none;\n  letter-spacing: 0;\n  color: #F4A922;\n}\n.step__clear[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.cal[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 16px;\n}\n.cal__nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.cal__month[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n}\n.cal__arrow[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  background: #ffffff;\n  font-size: 18px;\n  line-height: 1;\n  cursor: pointer;\n  color: #0f172a;\n  transition: 0.15s ease;\n}\n.cal__arrow[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n}\n.cal__arrow[_ngcontent-%COMP%]:disabled {\n  opacity: 0.3;\n  cursor: default;\n}\n.cal__dow[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n  margin-bottom: 6px;\n}\n.cal__dow[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 11px;\n  font-weight: 600;\n  color: #94a3b8;\n}\n.cal__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n}\n.cal__loading[_ngcontent-%COMP%] {\n  padding: 40px 0;\n  text-align: center;\n  color: #475569;\n  font-size: 14px;\n}\n.cal__error[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 13px;\n  margin: 10px 2px 0;\n}\n.cal__empty[_ngcontent-%COMP%] {\n  color: #475569;\n  font-size: 14px;\n  margin: 4px 2px;\n}\n.cell[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  font-size: 14px;\n  color: #94a3b8;\n  cursor: default;\n}\n.cell--blank[_ngcontent-%COMP%] {\n  visibility: hidden;\n}\n.cell--available[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-weight: 600;\n  cursor: pointer;\n  background: rgba(244, 169, 34, 0.12);\n}\n.cell--available[_ngcontent-%COMP%]:hover {\n  background: rgba(244, 169, 34, 0.22);\n}\n.cell--selected[_ngcontent-%COMP%] {\n  background: #F4A922 !important;\n  color: #fff;\n}\n.cell[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n}\n.cell__dot[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 5px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: #F4A922;\n}\n.cell--selected[_ngcontent-%COMP%]   .cell__dot[_ngcontent-%COMP%] {\n  background: #fff;\n}\n.slots[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));\n  gap: 7px;\n}\n.slot[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n  gap: 2px;\n  min-height: 50px;\n  padding: 11px 12px;\n  text-align: left;\n  background: #ffffff;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 12px;\n  font-size: 15.5px;\n  font-weight: 700;\n  color: #0f172a;\n  cursor: pointer;\n  transition: 0.15s ease;\n}\n.slot__time[_ngcontent-%COMP%] {\n  line-height: 1.1;\n}\n.slot__reason[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: #94a3b8;\n  line-height: 1.25;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n}\n.slot[_ngcontent-%COMP%]:hover:not(:disabled):not(.slot--range) {\n  border-color: #94a3b8;\n  background: #f8fafc;\n}\n.slot--range[_ngcontent-%COMP%] {\n  background: #F4A922;\n  border-color: #F4A922;\n  color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.35);\n}\n.slot--start[_ngcontent-%COMP%] {\n  border-top-left-radius: 12px;\n  border-bottom-left-radius: 12px;\n}\n.slot--end[_ngcontent-%COMP%] {\n  border-top-right-radius: 12px;\n  border-bottom-right-radius: 12px;\n}\n.slot--mine[_ngcontent-%COMP%] {\n  background: #F4A922;\n  border-color: #F4A922;\n  color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.35);\n  cursor: default;\n}\n.slot--unstartable[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-style: dashed;\n  border-color: #e2e8f0;\n  color: #94a3b8;\n  cursor: default;\n}\n.slot--unstartable[_ngcontent-%COMP%]   .slot__time[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.slot--busy[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #94a3b8;\n  border-color: transparent;\n  cursor: default;\n  min-height: 50px;\n}\n.slot--busy[_ngcontent-%COMP%]:not(:has(.slot__reason))   .slot__time[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  opacity: 0.65;\n}\n.slot--busy[_ngcontent-%COMP%]:has(.slot__reason) {\n  background: rgba(220, 38, 38, 0.07);\n  border: 1.5px solid rgba(220, 38, 38, 0.2);\n}\n.slot--busy[_ngcontent-%COMP%]:has(.slot__reason)   .slot__time[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n/*# sourceMappingURL=availability-calendar.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AvailabilityCalendarComponent, { className: "AvailabilityCalendarComponent", filePath: "src/app/booking/ui/availability-calendar/availability-calendar.component.ts", lineNumber: 20 });
})();

// src/app/booking/core/utils/range-select.util.ts
function nextRange(cur, hour, isFree, maxHours = 24) {
  const { start, end } = cur;
  if (start === null || end !== null)
    return { start: hour, end: null };
  if (hour < start)
    return { start: hour, end: null };
  if (hour - start + 1 > maxHours)
    return { start: hour, end: null };
  for (let h = start; h <= hour; h++)
    if (!isFree(h))
      return { start: hour, end: null };
  return { start, end: hour };
}

export {
  AvailabilityCalendarComponent,
  nextRange
};
//# sourceMappingURL=chunk-FOM5H6WH.js.map
