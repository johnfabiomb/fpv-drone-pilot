import {
  BookingAdminService
} from "./chunk-S32WTGFX.js";
import {
  ToastService
} from "./chunk-VKQYSGWL.js";
import {
  BookingDataService
} from "./chunk-ZUGMEISK.js";
import "./chunk-LUKEY4LQ.js";
import {
  BookingsAuthService
} from "./chunk-5K3EYFTC.js";
import {
  servicePrice
} from "./chunk-DEXNZGWM.js";
import {
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
} from "./chunk-K4JTNS7E.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-ZDNO6UPP.js";
import "./chunk-KJHSNOMD.js";
import "./chunk-QQIZI4YX.js";
import "./chunk-XS6RPKEZ.js";
import {
  CurrencyPipe,
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
} from "./chunk-W3IDOWRJ.js";
import {
  __async,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/bookings/booking-form/booking-form.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function BookingFormComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "div", 7);
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "input", 17);
    \u0275\u0275listener("focus", function BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template_input_focus_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.target.select());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 16);
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
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Booking saved, but the payment link couldn\u2019t be generated. You can copy it from the bookings list.");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 10);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 11);
    \u0275\u0275text(6, "The slot is reserved. Send this payment link to your client:");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, BookingFormComponent_Conditional_10_Conditional_0_Conditional_7_Template, 4, 1, "div", 12)(8, BookingFormComponent_Conditional_10_Conditional_0_Conditional_8_Template, 2, 0, "p", 13);
    \u0275\u0275elementStart(9, "div", 14)(10, "button", 15);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_10_Conditional_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.reset());
    });
    \u0275\u0275text(11, "Create another");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 16);
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
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Booking ", done_r4.ref, " created");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(done_r4.link ? 7 : 8);
  }
}
function BookingFormComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, BookingFormComponent_Conditional_10_Conditional_0_Template, 14, 2, "div", 8);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r2.created()) ? 0 : -1, tmp_1_0);
  }
}
function BookingFormComponent_Conditional_11_Conditional_9_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r7 = ctx.$implicit;
    \u0275\u0275property("value", c_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r7.name, "", c_r7.email ? " \xB7 " + c_r7.email : "", "");
  }
}
function BookingFormComponent_Conditional_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "select", 49);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_9_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.clientId, $event) || (ctx_r2.clientId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "option", 25);
    \u0275\u0275text(3, "Select a client\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, BookingFormComponent_Conditional_11_Conditional_9_For_5_Template, 2, 3, "option", 26, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.clientId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.data.clients());
  }
}
function BookingFormComponent_Conditional_11_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 19)(2, "label");
    \u0275\u0275text(3, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_10_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.newClientName, $event) || (ctx_r2.newClientName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 19)(6, "label");
    \u0275\u0275text(7, "Email ");
    \u0275\u0275elementStart(8, "span", 38);
    \u0275\u0275text(9, "(for the payment link)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_10_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.newClientEmail, $event) || (ctx_r2.newClientEmail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newClientName);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newClientEmail);
  }
}
function BookingFormComponent_Conditional_11_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    \u0275\u0275property("value", s_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r9.name);
  }
}
function BookingFormComponent_Conditional_11_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
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
function BookingFormComponent_Conditional_11_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "No worker is assigned to this service yet (Staff tab).");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r2.selectedService.min_hours, "\u2013", ctx_r2.selectedService.max_hours, " h");
  }
}
function BookingFormComponent_Conditional_11_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "Any duration");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "Required \u2014 describe the work; the client sees this when they pay.");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Conditional_53_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.resetDescription());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Reset to \u201C", ctx_r2.autoDescription, "\u201D");
  }
}
function BookingFormComponent_Conditional_11_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "Auto-filled from the service \u2014 edit it if needed. The client sees this when they pay.");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Conditional_60_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.syncPrice());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Reset to ", \u0275\u0275pipeBind4(2, 1, ctx_r2.computedPrice, "EUR", "symbol", "1.0-0"), " ");
  }
}
function BookingFormComponent_Conditional_11_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Standard rate for ", ctx_r2.hours, " h");
  }
}
function BookingFormComponent_Conditional_11_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "Set the price for this custom job");
    \u0275\u0275elementEnd();
  }
}
function BookingFormComponent_Conditional_11_Case_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Client can pay by card now, or ask to pay later (you approve that request). ");
  }
}
function BookingFormComponent_Conditional_11_Case_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Client must pay by card to confirm. ");
  }
}
function BookingFormComponent_Conditional_11_Case_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " No online payment \u2014 the client confirms the booking and agrees to pay by cash / Revolut / bank transfer. Books straight away. ");
  }
}
function BookingFormComponent_Conditional_11_Conditional_83_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
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
function BookingFormComponent_Conditional_11_Conditional_83_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "label");
    \u0275\u0275text(2, "Deposit %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_83_Conditional_11_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.depositPercent, $event) || (ctx_r2.depositPercent = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, BookingFormComponent_Conditional_11_Conditional_83_Conditional_11_Conditional_4_Template, 4, 12, "span", 32);
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
function BookingFormComponent_Conditional_11_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 19)(2, "label");
    \u0275\u0275text(3, "Deposit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 53);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Conditional_83_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.depositMode, $event) || (ctx_r2.depositMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 54);
    \u0275\u0275text(6, "Allow a deposit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 55);
    \u0275\u0275text(8, "Require full payment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 32);
    \u0275\u0275text(10, "Prefilled from your default \u2014 change it for this booking if needed.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, BookingFormComponent_Conditional_11_Conditional_83_Conditional_11_Template, 5, 2, "div", 19);
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
function BookingFormComponent_Conditional_11_Conditional_90_Template(rf, ctx) {
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
function BookingFormComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 18);
    \u0275\u0275listener("ngSubmit", function BookingFormComponent_Conditional_11_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submit());
    });
    \u0275\u0275elementStart(1, "div", 19)(2, "label");
    \u0275\u0275text(3, "Client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20)(5, "button", 21);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clientMode = "existing");
    });
    \u0275\u0275text(6, "Existing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 22);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clientMode = "new");
    });
    \u0275\u0275text(8, "New client");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, BookingFormComponent_Conditional_11_Conditional_9_Template, 6, 1, "div", 19)(10, BookingFormComponent_Conditional_11_Conditional_10_Template, 11, 2, "div", 23);
    \u0275\u0275elementStart(11, "div", 23)(12, "div", 19)(13, "label");
    \u0275\u0275text(14, "Service");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.serviceId, $event) || (ctx_r2.serviceId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_15_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onServiceChange());
    });
    \u0275\u0275elementStart(16, "option", 25);
    \u0275\u0275text(17, "Select a service\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(18, BookingFormComponent_Conditional_11_For_19_Template, 2, 2, "option", 26, _forTrack0);
    \u0275\u0275elementStart(20, "option", 27);
    \u0275\u0275text(21, "Custom \u2014 set your own price");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 19)(23, "label");
    \u0275\u0275text(24, "Worker");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 28);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.staffId, $event) || (ctx_r2.staffId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(26, "option", 25);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(28, BookingFormComponent_Conditional_11_For_29_Template, 2, 2, "option", 26, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, BookingFormComponent_Conditional_11_Conditional_30_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 23)(32, "div", 19)(33, "label");
    \u0275\u0275text(34, "Start");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.startLocal, $event) || (ctx_r2.startLocal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 19)(37, "label");
    \u0275\u0275text(38, "Hours");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.hours, $event) || (ctx_r2.hours = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_39_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onHoursChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(40, BookingFormComponent_Conditional_11_Conditional_40_Template, 2, 2, "span", 32)(41, BookingFormComponent_Conditional_11_Conditional_41_Template, 2, 0, "span", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 19)(43, "label");
    \u0275\u0275text(44, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.title, $event) || (ctx_r2.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 19)(47, "label");
    \u0275\u0275text(48, "Description ");
    \u0275\u0275elementStart(49, "span", 34);
    \u0275\u0275text(50, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "textarea", 35);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_textarea_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.description, $event) || (ctx_r2.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(52, BookingFormComponent_Conditional_11_Conditional_52_Template, 2, 0, "span", 32)(53, BookingFormComponent_Conditional_11_Conditional_53_Template, 2, 1, "button", 36)(54, BookingFormComponent_Conditional_11_Conditional_54_Template, 2, 0, "span", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 23)(56, "div", 19)(57, "label");
    \u0275\u0275text(58, "Price (\u20AC)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_59_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.priceTotal, $event) || (ctx_r2.priceTotal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(60, BookingFormComponent_Conditional_11_Conditional_60_Template, 3, 6, "button", 36)(61, BookingFormComponent_Conditional_11_Conditional_61_Template, 2, 1, "span", 32)(62, BookingFormComponent_Conditional_11_Conditional_62_Template, 2, 0, "span", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 19)(64, "label");
    \u0275\u0275text(65, "Location ");
    \u0275\u0275elementStart(66, "span", 38);
    \u0275\u0275text(67, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_input_ngModelChange_68_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.location, $event) || (ctx_r2.location = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "div", 19)(70, "label");
    \u0275\u0275text(71, "Payment options on the link");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_select_ngModelChange_72_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.paymentMode, $event) || (ctx_r2.paymentMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(73, "option", 41);
    \u0275\u0275text(74, "Card or pay later (cash / Revolut / bank)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "option", 42);
    \u0275\u0275text(76, "Card only");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "option", 43);
    \u0275\u0275text(78, "Pay later only \u2014 client just confirms the booking");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "span", 32);
    \u0275\u0275template(80, BookingFormComponent_Conditional_11_Case_80_Template, 1, 0)(81, BookingFormComponent_Conditional_11_Case_81_Template, 1, 0)(82, BookingFormComponent_Conditional_11_Case_82_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(83, BookingFormComponent_Conditional_11_Conditional_83_Template, 12, 2, "div", 23);
    \u0275\u0275elementStart(84, "div", 19)(85, "label");
    \u0275\u0275text(86, "Notes ");
    \u0275\u0275elementStart(87, "span", 38);
    \u0275\u0275text(88, "(optional, internal)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "textarea", 44);
    \u0275\u0275twoWayListener("ngModelChange", function BookingFormComponent_Conditional_11_Template_textarea_ngModelChange_89_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.notes, $event) || (ctx_r2.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(90, BookingFormComponent_Conditional_11_Conditional_90_Template, 2, 1, "p", 45);
    \u0275\u0275elementStart(91, "div", 46)(92, "button", 47);
    \u0275\u0275listener("click", function BookingFormComponent_Conditional_11_Template_button_click_92_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToList());
    });
    \u0275\u0275text(93, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "button", 48);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    let tmp_16_0;
    let tmp_26_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275classProp("seg__btn--on", ctx_r2.clientMode === "existing");
    \u0275\u0275property("disabled", ctx_r2.data.clients().length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("seg__btn--on", ctx_r2.clientMode === "new");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.clientMode === "existing" ? 9 : 10);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.serviceId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.services());
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.staffId);
    \u0275\u0275property("disabled", !ctx_r2.serviceId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.serviceId ? "Select a worker\u2026" : "Pick a service first");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.workers);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.serviceId && !ctx_r2.isCustom && ctx_r2.workers.length === 0 ? 30 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.startLocal);
    \u0275\u0275property("min", ctx_r2.minDateTime);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.hours);
    \u0275\u0275property("min", (tmp_15_0 = ctx_r2.selectedService == null ? null : ctx_r2.selectedService.min_hours) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : 1)("max", (tmp_16_0 = ctx_r2.selectedService == null ? null : ctx_r2.selectedService.max_hours) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : 24);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedService ? 40 : ctx_r2.isCustom ? 41 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.title);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.description);
    \u0275\u0275property("placeholder", ctx_r2.isCustom ? "Describe the work (required for a custom job)" : "What the client is paying for");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isCustom ? 52 : ctx_r2.autoDescription && ctx_r2.description !== ctx_r2.autoDescription ? 53 : 54);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.priceTotal);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.computedPrice != null && ctx_r2.priceTotal !== ctx_r2.computedPrice ? 60 : ctx_r2.computedPrice != null ? 61 : ctx_r2.isCustom ? 62 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.location);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.paymentMode);
    \u0275\u0275advance(8);
    \u0275\u0275conditional((tmp_26_0 = ctx_r2.paymentMode) === "both" ? 80 : tmp_26_0 === "card" ? 81 : tmp_26_0 === "later" ? 82 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.paymentMode !== "later" ? 83 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.notes);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.errorMsg() ? 90 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r2.canSubmit);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.saving() ? ctx_r2.isEditing ? "Saving\u2026" : "Creating\u2026" : ctx_r2.isEditing ? "Save changes" : "Create booking", " ");
  }
}
var CUSTOM = "custom";
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
    this.staffServices = signal([]);
    this.loading = signal(true);
    this.saving = signal(false);
    this.errorMsg = signal("");
    this.editingId = signal(null);
    this.created = signal(null);
    this.clientMode = "existing";
    this.clientId = "";
    this.newClientName = "";
    this.newClientEmail = "";
    this.serviceId = "";
    this.staffId = "";
    this.startLocal = "";
    this.hours = 1;
    this.title = "";
    this.description = "";
    this.lastAutoDescription = "";
    this.priceTotal = null;
    this.location = "";
    this.notes = "";
    this.paymentMode = "both";
    this.depositMode = "deposit";
    this.depositPercent = 30;
    this.orgDefaults = { depositPercent: 30, depositAllowed: true };
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.auth.initialize();
      const org = this.auth.orgId();
      if (org) {
        const [services, staff, ss, settings] = yield Promise.all([
          this.admin.listServices(org),
          this.admin.listStaff(org),
          this.admin.listStaffServices(),
          this.admin.getOrgSettings(org)
        ]);
        this.services.set(services.filter((s) => s.is_active));
        this.staff.set(staff);
        this.staffServices.set(ss);
        this.orgDefaults = {
          depositPercent: settings?.booking_params?.deposit_percent ?? 30,
          depositAllowed: settings?.booking_params?.deposit_allowed ?? true
        };
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
      this.clientMode = "existing";
      this.clientId = b.client_id ?? "";
      this.serviceId = b.service_id ?? CUSTOM;
      this.staffId = b.staff_id;
      this.startLocal = this.toLocalInput(b.start_at);
      this.hours = Math.max(1, Math.round((new Date(b.end_at).getTime() - new Date(b.start_at).getTime()) / 36e5));
      this.title = b.title;
      this.description = b.description ?? "";
      this.lastAutoDescription = this.autoDescription;
      this.priceTotal = b.price_total;
      this.location = b.location ?? "";
      this.notes = b.notes ?? "";
      this.paymentMode = b.allow_card && b.allow_inperson ? "both" : b.allow_card ? "card" : "later";
      this.depositMode = b.deposit_allowed ?? this.orgDefaults.depositAllowed ? "deposit" : "full";
      this.depositPercent = b.deposit_percent ?? this.orgDefaults.depositPercent;
    });
  }
  // ── Derived ─────────────────────────────────────────────────────────
  get isCustom() {
    return this.serviceId === CUSTOM;
  }
  get isEditing() {
    return this.editingId() !== null;
  }
  get selectedService() {
    return this.services().find((s) => s.id === this.serviceId);
  }
  /** Workers for the chosen service (or every bookable worker when custom). */
  get workers() {
    if (this.isCustom)
      return this.staff().filter((s) => s.is_bookable);
    const ids = new Set(this.staffServices().filter((ss) => ss.service_id === this.serviceId).map((ss) => ss.staff_id));
    return this.staff().filter((s) => ids.has(s.id) && s.is_bookable);
  }
  get computedPrice() {
    const svc = this.selectedService;
    return svc ? servicePrice(svc.pricing, this.hours) : null;
  }
  get minDateTime() {
    return this.toLocalInput((/* @__PURE__ */ new Date()).toISOString());
  }
  toLocalInput(iso) {
    const d = new Date(iso);
    return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16);
  }
  // ── Change handlers ─────────────────────────────────────────────────
  onServiceChange() {
    const svc = this.selectedService;
    if (svc) {
      this.hours = Math.min(Math.max(this.hours, svc.min_hours), svc.max_hours);
      this.title = svc.name;
    }
    const ws = this.workers;
    this.staffId = ws.length === 1 ? ws[0].id : ws.some((w) => w.id === this.staffId) ? this.staffId : "";
    this.syncPrice();
    this.maybeSyncDescription();
  }
  onHoursChange() {
    this.syncPrice();
    this.maybeSyncDescription();
  }
  /** Reset to the service's computed price (clears it for custom — admin sets their own). */
  syncPrice() {
    this.priceTotal = this.computedPrice;
  }
  /** Suggested client-facing description from the service + hours (empty for custom). */
  get autoDescription() {
    const svc = this.selectedService;
    if (!svc)
      return "";
    return `${svc.name} \u2014 ${this.hours} ${this.hours === 1 ? "hour" : "hours"}`;
  }
  /** Refresh the description from service/hours, unless the admin has manually edited it. */
  maybeSyncDescription() {
    if (this.description.trim() === "" || this.description === this.lastAutoDescription) {
      this.description = this.autoDescription;
      this.lastAutoDescription = this.autoDescription;
    }
  }
  /** Manually pull the suggested description (used by the "Reset to suggested" link). */
  resetDescription() {
    this.description = this.autoDescription;
    this.lastAutoDescription = this.autoDescription;
  }
  // ── Submit ──────────────────────────────────────────────────────────
  get canSubmit() {
    const clientOk = this.clientMode === "existing" ? !!this.clientId : this.newClientName.trim().length > 0;
    return !this.saving() && clientOk && !!this.serviceId && !!this.staffId && !!this.startLocal && this.hours > 0 && this.priceTotal != null && this.priceTotal >= 0 && this.title.trim().length > 0 && this.description.trim().length > 0;
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
      const svc = this.selectedService;
      if (svc && (this.hours < svc.min_hours || this.hours > svc.max_hours)) {
        this.errorMsg.set(`This service is ${svc.min_hours}\u2013${svc.max_hours} hours.`);
        return;
      }
      this.saving.set(true);
      this.errorMsg.set("");
      try {
        let clientId = this.clientId;
        if (this.clientMode === "new") {
          const c = yield this.data.createClient(org, this.newClientName.trim(), this.newClientEmail.trim() || null);
          if (!c) {
            this.errorMsg.set("Could not create the client.");
            return;
          }
          clientId = c.id;
        }
        const serviceId = this.isCustom ? null : this.serviceId;
        const shared = {
          staffId: this.staffId,
          serviceId,
          clientId,
          title: this.title.trim(),
          description: this.description.trim(),
          startAt: this.startLocal,
          hours: this.hours,
          priceTotal: this.priceTotal,
          allowCard: this.paymentMode !== "later",
          allowInperson: this.paymentMode !== "card",
          depositAllowed: this.depositMode === "deposit",
          depositPercent: this.depositPercent,
          location: this.location.trim() || null,
          notes: this.notes.trim() || null
        };
        if (this.isEditing) {
          const res2 = yield this.data.updateBooking(this.editingId(), shared);
          if (res2.error) {
            this.errorMsg.set(this.errorText(res2.error));
            return;
          }
          this.toast.success(`${this.editingRef || "Booking"} updated`);
          this.goToList();
          return;
        }
        const res = yield this.data.createBooking(__spreadValues({ orgId: org }, shared));
        if (res.error || !res.id) {
          this.errorMsg.set(this.errorText(res.error));
          return;
        }
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
    this.clientMode = "existing";
    this.clientId = "";
    this.newClientName = "";
    this.newClientEmail = "";
    this.serviceId = "";
    this.staffId = "";
    this.startLocal = "";
    this.hours = 1;
    this.title = "";
    this.description = "";
    this.lastAutoDescription = "";
    this.priceTotal = null;
    this.location = "";
    this.notes = "";
    this.paymentMode = "both";
    this.depositMode = this.orgDefaults.depositAllowed ? "deposit" : "full";
    this.depositPercent = this.orgDefaults.depositPercent;
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingFormComponent, selectors: [["app-booking-form"]], decls: 12, vars: 3, consts: [[1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], ["routerLink", "/bookings/list", 1, "btn", "btn--ghost"], [1, "loading"], [1, "card", "form"], [1, "spinner"], [1, "card", "done"], [1, "done__check"], [1, "done__title"], [1, "done__sub"], [1, "linkbox"], [1, "muted"], [1, "done__actions"], [1, "btn", "btn--ghost", 3, "click"], [1, "btn", "btn--primary", 3, "click"], ["readonly", "", 1, "linkbox__input", 3, "focus", "value"], [1, "card", "form", 3, "ngSubmit"], [1, "field"], [1, "seg"], ["type", "button", 1, "seg__btn", 3, "click", "disabled"], ["type", "button", 1, "seg__btn", 3, "click"], [1, "row2"], ["name", "serviceId", "required", "", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value"], ["value", "custom"], ["name", "staffId", "required", "", 3, "ngModelChange", "ngModel", "disabled"], [1, "hint", "hint--warn"], ["type", "datetime-local", "name", "startLocal", "required", "", 3, "ngModelChange", "ngModel", "min"], ["type", "number", "name", "hours", "step", "1", "required", "", 3, "ngModelChange", "ngModel", "min", "max"], [1, "hint"], ["name", "title", "placeholder", "e.g. Wedding shoot \u2014 Sliema", "required", "", 3, "ngModelChange", "ngModel"], [1, "req"], ["name", "description", "rows", "2", "required", "", 3, "ngModelChange", "ngModel", "placeholder"], ["type", "button", 1, "hint", "hint--link"], ["type", "number", "name", "priceTotal", "min", "0", "step", "1", "required", "", 3, "ngModelChange", "ngModel"], [1, "opt"], ["name", "location", "placeholder", "Address or venue", 3, "ngModelChange", "ngModel"], ["name", "paymentMode", 3, "ngModelChange", "ngModel"], ["value", "both"], ["value", "card"], ["value", "later"], ["name", "notes", "rows", "2", "placeholder", "Anything to remember about this job", 3, "ngModelChange", "ngModel"], [1, "error"], [1, "form__actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], ["name", "clientId", "required", "", 3, "ngModelChange", "ngModel"], ["name", "newClientName", "placeholder", "Client name", "required", "", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "newClientEmail", "placeholder", "name@email.com", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "hint", "hint--link", 3, "click"], ["name", "depositMode", 3, "ngModelChange", "ngModel"], ["value", "deposit"], ["value", "full"], ["type", "number", "name", "depositPercent", "min", "1", "max", "100", "step", "1", 3, "ngModelChange", "ngModel"]], template: function BookingFormComponent_Template(rf, ctx) {
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
        \u0275\u0275template(9, BookingFormComponent_Conditional_9_Template, 2, 0, "div", 5)(10, BookingFormComponent_Conditional_10_Template, 1, 1)(11, BookingFormComponent_Conditional_11_Template, 96, 31, "form", 6);
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
    }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, RouterLink, CurrencyPipe], styles: [`

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
  max-width: 720px;
}
.form[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
.hint--link[_ngcontent-%COMP%] {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #F4A922;
  font-weight: 600;
  font-family: inherit;
}
.seg[_ngcontent-%COMP%] {
  display: inline-flex;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
.seg__btn[_ngcontent-%COMP%] {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  background: #ffffff;
  color: #475569;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}
.seg__btn[_ngcontent-%COMP%]    + .seg__btn[_ngcontent-%COMP%] {
  border-left: 1px solid #e2e8f0;
}
.seg__btn--on[_ngcontent-%COMP%] {
  background: #F4A922;
  color: #000;
}
.seg__btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: default;
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookingFormComponent, { className: "BookingFormComponent", filePath: "src/app/booking/platform/bookings/booking-form/booking-form.component.ts", lineNumber: 20 });
})();
export {
  BookingFormComponent
};
//# sourceMappingURL=chunk-Q2ETTGFW.js.map
