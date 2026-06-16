import {
  BookingAdminService
} from "./chunk-S32WTGFX.js";
import {
  ToastService
} from "./chunk-VKQYSGWL.js";
import {
  BookingsAuthService
} from "./chunk-5K3EYFTC.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-K4JTNS7E.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-ZDNO6UPP.js";
import "./chunk-KJHSNOMD.js";
import "./chunk-QQIZI4YX.js";
import "./chunk-XS6RPKEZ.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-W3IDOWRJ.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/settings/settings-admin.component.ts
var _forTrack0 = ($index, $item) => $item.user_id;
function SettingsAdminComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_13_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tz_r4 = ctx.$implicit;
    \u0275\u0275property("value", tz_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tz_r4);
  }
}
function SettingsAdminComponent_Conditional_8_Case_13_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("value", c_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5);
  }
}
function SettingsAdminComponent_Conditional_8_Case_13_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "\u2713 Saved");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "h2", 8);
    \u0275\u0275text(2, "General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9)(4, "label", 10)(5, "span");
    \u0275\u0275text(6, "Timezone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "select", 11);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_13_Template_select_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.timezone, $event) || (ctx_r1.timezone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(8, SettingsAdminComponent_Conditional_8_Case_13_For_9_Template, 2, 2, "option", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "label", 10)(11, "span");
    \u0275\u0275text(12, "Currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 11);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_13_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.currency, $event) || (ctx_r1.currency = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(14, SettingsAdminComponent_Conditional_8_Case_13_For_15_Template, 2, 2, "option", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "label", 13)(17, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_13_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.workBoard, $event) || (ctx_r1.workBoard = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Enable ");
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20, "Work board");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " \u2014 post-production to-do for confirmed jobs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 15)(23, "button", 16);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_13_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, SettingsAdminComponent_Conditional_8_Case_13_Conditional_25_Template, 2, 0, "span", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.timezone);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.timezones);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.currency);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.currencies);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.workBoard);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "Saving\u2026" : "Save settings");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saved() ? 25 : -1);
  }
}
function SettingsAdminComponent_Conditional_8_Case_14_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "\u2713 Saved");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "h2", 8);
    \u0275\u0275text(2, "Booking rules");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9)(4, "label", 10)(5, "span");
    \u0275\u0275text(6, "Deposit %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_14_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.depositPercent, $event) || (ctx_r1.depositPercent = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "label", 10)(9, "span");
    \u0275\u0275text(10, "Hold (minutes)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_14_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.holdMinutes, $event) || (ctx_r1.holdMinutes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label", 10)(13, "span");
    \u0275\u0275text(14, "Min lead time (minutes)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_14_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.minLeadMinutes, $event) || (ctx_r1.minLeadMinutes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "label", 13)(17, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_14_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.depositAllowed, $event) || (ctx_r1.depositAllowed = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Allow deposits by default ");
    \u0275\u0275elementStart(19, "span", 21);
    \u0275\u0275text(20, "(off = clients pay in full; can still be overridden per booking)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "label", 13)(22, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_14_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.cashAllowed, $event) || (ctx_r1.cashAllowed = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " Allow cash requests");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 15)(25, "button", 16);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_14_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, SettingsAdminComponent_Conditional_8_Case_14_Conditional_27_Template, 2, 0, "span", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.depositPercent);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.holdMinutes);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.minLeadMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.depositAllowed);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.cashAllowed);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "Saving\u2026" : "Save settings");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saved() ? 27 : -1);
  }
}
function SettingsAdminComponent_Conditional_8_Case_15_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "label", 10)(2, "span");
    \u0275\u0275text(3, "VAT number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Conditional_29_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.vatNumber, $event) || (ctx_r1.vatNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "label", 10)(6, "span");
    \u0275\u0275text(7, "VAT rate %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Conditional_29_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.vatRate, $event) || (ctx_r1.vatRate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "p", 22);
    \u0275\u0275text(10, "Invoices will show your VAT number and a net / VAT / gross breakdown (prices treated as VAT-inclusive).");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.vatNumber);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.vatRate);
  }
}
function SettingsAdminComponent_Conditional_8_Case_15_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, "No VAT breakdown is shown on invoices. Turn this on once you register for VAT.");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_15_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "\u2713 Saved");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "h2", 8);
    \u0275\u0275text(2, "Company & Invoicing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 22);
    \u0275\u0275text(4, "These details appear on every invoice you issue. Fill them in before sending invoices to clients.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label", 10)(6, "span");
    \u0275\u0275text(7, "Registered business name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.legalName, $event) || (ctx_r1.legalName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "label", 10)(10, "span");
    \u0275\u0275text(11, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "textarea", 24);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Template_textarea_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.companyAddress, $event) || (ctx_r1.companyAddress = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 9)(14, "label", 10)(15, "span");
    \u0275\u0275text(16, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.companyPhone, $event) || (ctx_r1.companyPhone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "label", 10)(19, "span");
    \u0275\u0275text(20, "Invoicing email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.companyEmail, $event) || (ctx_r1.companyEmail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "label", 13)(23, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.vatRegistered, $event) || (ctx_r1.vatRegistered = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " I am ");
    \u0275\u0275elementStart(25, "strong");
    \u0275\u0275text(26, "VAT-registered");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 21);
    \u0275\u0275text(28, "(off = Article 11 small undertaking \u2014 no VAT charged)");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(29, SettingsAdminComponent_Conditional_8_Case_15_Conditional_29_Template, 11, 2)(30, SettingsAdminComponent_Conditional_8_Case_15_Conditional_30_Template, 2, 0, "p", 22);
    \u0275\u0275elementStart(31, "label", 10)(32, "span");
    \u0275\u0275text(33, "VAT / legal note ");
    \u0275\u0275elementStart(34, "span", 21);
    \u0275\u0275text(35, "(printed on every invoice)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "textarea", 27);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Template_textarea_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.vatNote, $event) || (ctx_r1.vatNote = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 9)(38, "label", 10)(39, "span");
    \u0275\u0275text(40, "Invoice number prefix");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Template_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.invoicePrefix, $event) || (ctx_r1.invoicePrefix = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 10)(43, "span");
    \u0275\u0275text(44, "Example invoice number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 29);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "label", 10)(48, "span");
    \u0275\u0275text(49, "Invoice footer ");
    \u0275\u0275elementStart(50, "span", 21);
    \u0275\u0275text(51, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "textarea", 30);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_15_Template_textarea_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.invoiceFooter, $event) || (ctx_r1.invoiceFooter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 15)(54, "button", 16);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_15_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275template(56, SettingsAdminComponent_Conditional_8_Case_15_Conditional_56_Template, 2, 0, "span", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.legalName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.companyAddress);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.companyPhone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.companyEmail);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.vatRegistered);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.vatRegistered ? 29 : 30);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.vatNote);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.invoicePrefix);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.invoicePrefix || "INV", "-2026-007");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.invoiceFooter);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "Saving\u2026" : "Save settings");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saved() ? 56 : -1);
  }
}
function SettingsAdminComponent_Conditional_8_Case_16_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_16_For_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_16_For_8_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const m_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeMember(m_r11));
    });
    \u0275\u0275text(1, "Remove");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_16_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, SettingsAdminComponent_Conditional_8_Case_16_For_8_Conditional_5_Template, 2, 0, "button", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r11.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r11.role);
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r11.role !== "owner" ? 5 : -1);
  }
}
function SettingsAdminComponent_Conditional_8_Case_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "h2", 8);
    \u0275\u0275text(2, "Team");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 22);
    \u0275\u0275text(4, "People who can manage this organization. They must have signed in to the booking app at least once before you can add them.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, SettingsAdminComponent_Conditional_8_Case_16_Conditional_5_Template, 2, 0, "p", 4);
    \u0275\u0275elementStart(6, "div", 32);
    \u0275\u0275repeaterCreate(7, SettingsAdminComponent_Conditional_8_Case_16_For_8_Template, 6, 3, "div", 33, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 9)(10, "label", 10)(11, "span");
    \u0275\u0275text(12, "Add member by email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.newMemberEmail, $event) || (ctx_r1.newMemberEmail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "label", 10)(15, "span");
    \u0275\u0275text(16, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 11);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsAdminComponent_Conditional_8_Case_16_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.newMemberRole, $event) || (ctx_r1.newMemberRole = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(18, "option", 35);
    \u0275\u0275text(19, "Admin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 36);
    \u0275\u0275text(21, "Staff");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 37);
    \u0275\u0275text(23, "Owner");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(24, "div", 15)(25, "button", 16);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_16_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addMember());
    });
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "p", 22);
    \u0275\u0275text(28, "To create or switch organizations, use the org name at the top of the sidebar.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.membersLoading() ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.members());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newMemberEmail);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newMemberRole);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.addingMember());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.addingMember() ? "Adding\u2026" : "Add member");
  }
}
function SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r13 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r13.error);
  }
}
function SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 38);
    \u0275\u0275text(2, "Your Stripe account");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 45);
    \u0275\u0275text(4, "Connected \u2014 charges enabled");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 22);
    \u0275\u0275text(6, "Card payments for your bookings are paid out to your own Stripe account.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 15)(8, "button", 46);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.connectStripe());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.connecting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.connecting() ? "Opening\u2026" : "Manage on Stripe");
  }
}
function SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 38);
    \u0275\u0275text(2, "Your Stripe account");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 47);
    \u0275\u0275text(4, "Setup incomplete");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 22);
    \u0275\u0275text(6, "You started connecting Stripe but haven't finished. Card payments stay disabled until onboarding is complete.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 15)(8, "button", 16);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.connectStripe());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.connecting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.connecting() ? "Opening\u2026" : "Resume Stripe setup");
  }
}
function SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 38);
    \u0275\u0275text(2, "Your Stripe account");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 47);
    \u0275\u0275text(4, "Not connected");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 22);
    \u0275\u0275text(6, "Connect your own Stripe account to receive card payments directly. You'll be taken to Stripe to sign in or create an account \u2014 we never see your Stripe password or keys.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 15)(8, "button", 16);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_3_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.connectStripe());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.connecting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.connecting() ? "Opening\u2026" : "Connect Stripe");
  }
}
function SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_0_Template, 2, 1, "p", 44)(1, SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_1_Template, 10, 2)(2, SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_2_Template, 10, 2)(3, SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Conditional_3_Template, 10, 2);
  }
  if (rf & 2) {
    const c_r13 = ctx;
    \u0275\u0275conditional(c_r13.error ? 0 : c_r13.connected && c_r13.chargesEnabled ? 1 : c_r13.connected && !c_r13.chargesEnabled ? 2 : 3);
  }
}
function SettingsAdminComponent_Conditional_8_Case_17_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "Checking\u2026");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 42)(2, "h2", 8);
    \u0275\u0275text(3, "Payments (Stripe)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 43);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_17_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadConnect());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, SettingsAdminComponent_Conditional_8_Case_17_Conditional_6_Template, 4, 1)(7, SettingsAdminComponent_Conditional_8_Case_17_Conditional_7_Template, 2, 0, "p", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.connectLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.connectLoading() ? "Checking\u2026" : "Refresh");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.connect()) ? 6 : ctx_r1.connectLoading() ? 7 : -1, tmp_4_0);
  }
}
function SettingsAdminComponent_Conditional_8_Case_18_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.intError());
  }
}
function SettingsAdminComponent_Conditional_8_Case_18_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const st_r18 = ctx;
    \u0275\u0275classProp("badge--ok", st_r18.ok)("badge--bad", !st_r18.ok);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(st_r18.ok ? "Connected" : "Not connected");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(st_r18.detail);
  }
}
function SettingsAdminComponent_Conditional_8_Case_18_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "checking\u2026");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_18_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r19 = ctx;
    \u0275\u0275classProp("badge--ok", g_r19.ok)("badge--bad", !g_r19.ok);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(g_r19.ok ? "Connected" : "Not connected");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r19.detail);
  }
}
function SettingsAdminComponent_Conditional_8_Case_18_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "checking\u2026");
    \u0275\u0275elementEnd();
  }
}
function SettingsAdminComponent_Conditional_8_Case_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 42)(2, "h2", 8);
    \u0275\u0275text(3, "Integration status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 43);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Case_18_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.checkIntegrations());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, SettingsAdminComponent_Conditional_8_Case_18_Conditional_6_Template, 2, 1, "p", 44);
    \u0275\u0275elementStart(7, "div", 32)(8, "div", 33)(9, "span", 38);
    \u0275\u0275text(10, "Stripe (card payments)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, SettingsAdminComponent_Conditional_8_Case_18_Conditional_11_Template, 4, 6)(12, SettingsAdminComponent_Conditional_8_Case_18_Conditional_12_Template, 2, 0, "span", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 33)(14, "span", 38);
    \u0275\u0275text(15, "Google Calendar");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, SettingsAdminComponent_Conditional_8_Case_18_Conditional_16_Template, 4, 6)(17, SettingsAdminComponent_Conditional_8_Case_18_Conditional_17_Template, 2, 0, "span", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "p", 22);
    \u0275\u0275text(19, " To connect or fix these, follow the step-by-step guide in ");
    \u0275\u0275elementStart(20, "strong");
    \u0275\u0275text(21, "documentation/BOOKING_SETUP.md");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, " (Stripe keys + webhook, Google OAuth refresh token, and the Supabase secrets each one needs). ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.checking());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.checking() ? "Checking\u2026" : "Re-check");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.intError() ? 6 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.stripe()) ? 11 : ctx_r1.checking() ? 12 : -1, tmp_5_0);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_6_0 = ctx_r1.google()) ? 16 : ctx_r1.checking() ? 17 : -1, tmp_6_0);
  }
}
function SettingsAdminComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 5)(1, "button", 6);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("general"));
    });
    \u0275\u0275text(2, "General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 6);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("booking"));
    });
    \u0275\u0275text(4, "Booking rules");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("company"));
    });
    \u0275\u0275text(6, "Company & Invoicing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 6);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("team"));
    });
    \u0275\u0275text(8, "Team");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 6);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("payments"));
    });
    \u0275\u0275text(10, "Payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 6);
    \u0275\u0275listener("click", function SettingsAdminComponent_Conditional_8_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("integrations"));
    });
    \u0275\u0275text(12, "Integrations");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, SettingsAdminComponent_Conditional_8_Case_13_Template, 26, 6, "div", 7)(14, SettingsAdminComponent_Conditional_8_Case_14_Template, 28, 8, "div", 7)(15, SettingsAdminComponent_Conditional_8_Case_15_Template, 57, 13, "div", 7)(16, SettingsAdminComponent_Conditional_8_Case_16_Template, 29, 5, "div", 7)(17, SettingsAdminComponent_Conditional_8_Case_17_Template, 8, 3, "div", 7)(18, SettingsAdminComponent_Conditional_8_Case_18_Template, 23, 5, "div", 7);
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("tab--active", ctx_r1.tab() === "general");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("tab--active", ctx_r1.tab() === "booking");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("tab--active", ctx_r1.tab() === "company");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("tab--active", ctx_r1.tab() === "team");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("tab--active", ctx_r1.tab() === "payments");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("tab--active", ctx_r1.tab() === "integrations");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_7_0 = ctx_r1.tab()) === "general" ? 13 : tmp_7_0 === "booking" ? 14 : tmp_7_0 === "company" ? 15 : tmp_7_0 === "team" ? 16 : tmp_7_0 === "payments" ? 17 : tmp_7_0 === "integrations" ? 18 : -1);
  }
}
function supportedList(key, fallback) {
  try {
    const fn = Intl.supportedValuesOf;
    if (typeof fn === "function")
      return fn(key);
  } catch {
  }
  return fallback;
}
var SettingsAdminComponent = class _SettingsAdminComponent {
  constructor() {
    this.admin = inject(BookingAdminService);
    this.auth = inject(BookingsAuthService);
    this.toast = inject(ToastService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.loading = signal(true);
    this.saving = signal(false);
    this.saved = signal(false);
    this.tabs = ["general", "booking", "company", "team", "payments", "integrations"];
    this.tab = signal("general");
    this.members = signal([]);
    this.membersLoading = signal(false);
    this.newMemberEmail = "";
    this.newMemberRole = "admin";
    this.addingMember = signal(false);
    this.legalName = "";
    this.companyAddress = "";
    this.companyPhone = "";
    this.companyEmail = "";
    this.vatNumber = "";
    this.vatRegistered = false;
    this.vatRate = 18;
    this.vatNote = "";
    this.invoicePrefix = "INV";
    this.invoiceFooter = "";
    this.connect = signal(null);
    this.connectLoading = signal(false);
    this.connecting = signal(false);
    this.timezone = "Europe/Malta";
    this.currency = "EUR";
    this.timezones = supportedList("timeZone", ["UTC", "Europe/Malta", "Europe/London", "Europe/Madrid", "America/New_York"]);
    this.currencies = supportedList("currency", ["EUR", "USD", "GBP", "CHF", "AUD", "CAD"]);
    this.depositPercent = 30;
    this.depositAllowed = true;
    this.holdMinutes = 15;
    this.minLeadMinutes = 120;
    this.cashAllowed = true;
    this.workBoard = false;
    this.checking = signal(false);
    this.stripe = signal(null);
    this.google = signal(null);
    this.intError = signal(null);
  }
  setTab(t) {
    this.tab.set(t);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.auth.initialize();
      const org = this.auth.orgId();
      if (org) {
        const s = yield this.admin.getOrgSettings(org);
        if (s) {
          this.timezone = s.timezone;
          this.currency = s.currency;
          const p = s.booking_params ?? {};
          this.depositPercent = p.deposit_percent ?? 30;
          this.depositAllowed = p.deposit_allowed ?? true;
          this.holdMinutes = p.hold_minutes ?? 15;
          this.minLeadMinutes = p.min_lead_minutes ?? 120;
          this.cashAllowed = p.cash_allowed ?? true;
          this.workBoard = s.features?.work_board ?? false;
          const inv = s.invoice_details ?? {};
          this.legalName = inv.legal_name ?? "";
          this.companyAddress = inv.address ?? "";
          this.companyPhone = inv.phone ?? "";
          this.companyEmail = inv.email ?? "";
          this.vatNumber = inv.vat_number ?? "";
          this.vatRegistered = inv.vat_registered ?? false;
          this.vatRate = inv.vat_rate ?? 18;
          this.vatNote = inv.vat_note ?? "";
          this.invoicePrefix = (inv.invoice_prefix ?? "INV").toUpperCase();
          this.invoiceFooter = inv.invoice_footer ?? "";
        }
      }
      this.loading.set(false);
      this.checkIntegrations();
      this.loadMembers();
      const stripeParam = this.route.snapshot.queryParamMap.get("stripe");
      if (stripeParam) {
        this.router.navigate([], { queryParams: { stripe: null }, queryParamsHandling: "merge", replaceUrl: true });
        if (stripeParam === "return")
          this.toast.info("Checking your Stripe connection\u2026");
      }
      this.loadConnect();
    });
  }
  loadConnect() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org)
        return;
      this.connectLoading.set(true);
      try {
        this.connect.set(yield this.admin.connectStripeStatus(org));
      } finally {
        this.connectLoading.set(false);
      }
    });
  }
  /** Begin (or resume) onboarding — redirects to Stripe's hosted flow. */
  connectStripe() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org || this.connecting())
        return;
      this.connecting.set(true);
      try {
        const res = yield this.admin.connectStripeStart(org);
        if (res.url) {
          window.location.href = res.url;
          return;
        }
        this.toast.error(res.error ?? "Could not start Stripe onboarding.");
      } catch {
        this.toast.error("Could not start Stripe onboarding. Please try again.");
      } finally {
        this.connecting.set(false);
      }
    });
  }
  save() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org || this.saving())
        return;
      this.saving.set(true);
      this.saved.set(false);
      try {
        yield this.admin.updateOrgSettings(org, {
          timezone: this.timezone.trim(),
          currency: this.currency.trim().toUpperCase(),
          booking_params: {
            deposit_percent: Number(this.depositPercent),
            deposit_allowed: this.depositAllowed,
            hold_minutes: Number(this.holdMinutes),
            min_lead_minutes: Number(this.minLeadMinutes),
            cash_allowed: this.cashAllowed
          },
          features: { work_board: this.workBoard },
          invoice_details: {
            legal_name: this.legalName.trim(),
            address: this.companyAddress.trim(),
            phone: this.companyPhone.trim(),
            email: this.companyEmail.trim(),
            vat_number: this.vatNumber.trim(),
            vat_registered: this.vatRegistered,
            vat_rate: Number(this.vatRate) || 18,
            vat_note: this.vatNote.trim(),
            invoice_prefix: (this.invoicePrefix.trim() || "INV").toUpperCase(),
            invoice_footer: this.invoiceFooter.trim()
          }
        });
        this.saved.set(true);
        setTimeout(() => this.saved.set(false), 2500);
        this.toast.success("Settings saved");
      } catch {
        this.toast.error("Could not save settings. Please try again.");
      } finally {
        this.saving.set(false);
      }
    });
  }
  loadMembers() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org)
        return;
      this.membersLoading.set(true);
      try {
        this.members.set(yield this.admin.listMembers(org));
      } finally {
        this.membersLoading.set(false);
      }
    });
  }
  addMember() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      const email = this.newMemberEmail.trim();
      if (!org || !email || this.addingMember())
        return;
      this.addingMember.set(true);
      try {
        const res = yield this.admin.addMember(org, email, this.newMemberRole);
        if (res === "ok") {
          this.toast.success("Member added");
          this.newMemberEmail = "";
          this.loadMembers();
          this.auth.refresh();
        } else if (res === "no_user") {
          this.toast.error("That person must sign in to the booking app once before you can add them.");
        } else {
          this.toast.error("Could not add member.");
        }
      } finally {
        this.addingMember.set(false);
      }
    });
  }
  removeMember(m) {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org || !confirm(`Remove ${m.email} from this organization?`))
        return;
      const res = yield this.admin.removeMember(org, m.user_id);
      if (res.error) {
        this.toast.error(res.error.includes("last_owner") ? "You can't remove the only owner." : "Could not remove member.");
      } else {
        this.toast.success("Member removed");
        this.loadMembers();
      }
    });
  }
  checkIntegrations() {
    return __async(this, null, function* () {
      this.checking.set(true);
      this.intError.set(null);
      try {
        const res = yield this.admin.checkIntegrations();
        if (res.error) {
          this.intError.set(res.error);
        } else {
          this.stripe.set(res.stripe ?? null);
          this.google.set(res.google ?? null);
        }
      } catch (e) {
        this.intError.set(e.message);
      } finally {
        this.checking.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function SettingsAdminComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SettingsAdminComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsAdminComponent, selectors: [["app-settings-admin"]], decls: 9, vars: 1, consts: [[1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], [1, "muted"], ["role", "tablist", 1, "tabs"], [1, "tab", 3, "click"], [1, "card"], [1, "card__h"], [1, "grid"], [1, "field"], [3, "ngModelChange", "ngModel"], [3, "value"], [1, "check"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "actions"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "ok-tag"], ["type", "number", "min", "0", "max", "100", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], [1, "opt"], [1, "hint"], ["placeholder", "e.g. John F. Monta\xF1o / FPV Drone Malta Ltd", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Street, town, postcode, Malta", 3, "ngModelChange", "ngModel"], ["placeholder", "+356 \u2026", 3, "ngModelChange", "ngModel"], ["type", "email", "placeholder", "billing@\u2026", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "e.g. Reverse charge \u2014 VAT to be accounted for by the recipient. (Ask your accountant for the exact wording.)", 3, "ngModelChange", "ngModel"], ["maxlength", "8", "placeholder", "INV", 3, "ngModelChange", "ngModel"], [1, "field__static"], ["rows", "2", "placeholder", "Payment terms, bank details, thank-you note\u2026", 3, "ngModelChange", "ngModel"], ["placeholder", "MT\u2026", 3, "ngModelChange", "ngModel"], [1, "int"], [1, "int__row"], ["type", "email", "placeholder", "person@email.com", 3, "ngModelChange", "ngModel"], ["value", "admin"], ["value", "staff"], ["value", "owner"], [1, "int__name"], [1, "badge"], [1, "link-btn", "link-btn--danger"], [1, "link-btn", "link-btn--danger", 3, "click"], [1, "card__head"], [1, "link-btn", 3, "click", "disabled"], [1, "err"], [1, "badge", "badge--ok"], [1, "btn", 3, "click", "disabled"], [1, "badge", "badge--bad"], [1, "int__detail"]], template: function SettingsAdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Your organization, booking rules, invoicing and integrations.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(7, SettingsAdminComponent_Conditional_7_Template, 2, 0, "p", 4)(8, SettingsAdminComponent_Conditional_8_Template, 19, 13);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.loading() ? 7 : 8);
      }
    }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel], styles: [`

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
[_nghost-%COMP%] {
  display: block;
}
.err[_ngcontent-%COMP%] {
  color: #ef4444;
  font-size: 13px;
}
.card[_ngcontent-%COMP%] {
  padding: 22px;
  margin-bottom: 18px;
}
.card__h[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 16px;
}
.card__head[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.card__head[_ngcontent-%COMP%]   .card__h[_ngcontent-%COMP%] {
  margin: 0;
}
.grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
  margin-bottom: 14px;
}
.actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}
.ok-tag[_ngcontent-%COMP%] {
  color: #16a34a;
  font-size: 13px;
  font-weight: 600;
}
.int[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.int__row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.int__name[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  min-width: 170px;
}
.int__detail[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #475569;
}
.badge[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
  background: #eef2f6;
  color: #475569;
}
.badge--ok[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #15803d;
}
.badge--bad[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #b91c1c;
}
.hint[_ngcontent-%COMP%] {
  margin-top: 16px;
  font-size: 12.5px;
  color: #94a3b8;
  line-height: 1.5;
}
.opt[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-weight: 400;
}
.tabs[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 18px;
}
.tab[_ngcontent-%COMP%] {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  padding: 9px 14px;
  font-size: 13.5px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  font-family: inherit;
  border-radius: 6px 6px 0 0;
}
.tab[_ngcontent-%COMP%]:hover {
  color: #0f172a;
  background: rgba(244, 169, 34, 0.12);
}
.tab--active[_ngcontent-%COMP%] {
  color: #0f172a;
  border-bottom-color: #F4A922;
}
.field__static[_ngcontent-%COMP%] {
  padding: 10px 12px;
  border: 1.5px dashed #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #475569;
  background: transparent;
  font-variant-numeric: tabular-nums;
}
.card[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {
  margin-bottom: 14px;
}
/*# sourceMappingURL=settings-admin.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsAdminComponent, { className: "SettingsAdminComponent", filePath: "src/app/booking/platform/settings/settings-admin.component.ts", lineNumber: 27 });
})();
export {
  SettingsAdminComponent
};
//# sourceMappingURL=chunk-P7STOHQ6.js.map
