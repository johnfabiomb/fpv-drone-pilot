import {
  ToastService
} from "./chunk-VKQYSGWL.js";
import {
  BookingDataService
} from "./chunk-ZUGMEISK.js";
import "./chunk-LUKEY4LQ.js";
import "./chunk-5K3EYFTC.js";
import {
  DefaultValueAccessor,
  FormsModule,
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
  DatePipe,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
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
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
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
} from "./chunk-W3IDOWRJ.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/bookings/booking-detail/booking-detail.component.ts
var _c0 = (a0) => ["/bookings/invoice-edit", a0];
var _forTrack0 = ($index, $item) => $item.id;
function BookingDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 3);
    \u0275\u0275elementEnd();
  }
}
function BookingDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "p");
    \u0275\u0275text(2, "Booking not found.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 4);
    \u0275\u0275text(4, "Back to bookings");
    \u0275\u0275elementEnd()();
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(b_r3.client_email);
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "No payments recorded yet.");
    \u0275\u0275elementEnd();
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 ", p_r4.note, "");
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "refunded");
    \u0275\u0275elementEnd();
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "pending");
    \u0275\u0275elementEnd();
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const p_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deletePayment(p_r4));
    });
    \u0275\u0275text(1, "\u2715");
    \u0275\u0275elementEnd();
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 43)(1, "div", 44);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 45)(5, "span", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Conditional_7_Template, 2, 1, "span", 47)(8, BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Conditional_8_Template, 2, 0, "span", 48)(9, BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Conditional_9_Template, 2, 0, "span", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 50);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Conditional_13_Template, 2, 0, "button", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_20_0;
    const p_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("pay--refunded", p_r4.status === "refunded");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(3, 9, p_r4.amount, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.methodLabel(p_r4.method));
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r4.note ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r4.status === "refunded" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r4.status === "pending" ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 14, (tmp_20_0 = p_r4.paid_at) !== null && tmp_20_0 !== void 0 ? tmp_20_0 : p_r4.created_at, "d MMM y"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!p_r4.stripe_payment_intent_id ? 13 : -1);
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 28);
    \u0275\u0275repeaterCreate(1, BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_For_2_Template, 14, 17, "li", 42, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.payments());
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function BookingDetailComponent_Conditional_3_Conditional_0_Conditional_75_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.prefillBalance());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Pay full balance (", \u0275\u0275pipeBind4(2, 1, ctx_r1.balance(), "EUR", "symbol", "1.0-2"), ")");
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_For_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", m_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.methodLabel(m_r7));
  }
}
function BookingDetailComponent_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div")(2, "a", 6);
    \u0275\u0275text(3, "\u2190 All bookings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1", 7);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 9)(9, "button", 10);
    \u0275\u0275listener("click", function BookingDetailComponent_Conditional_3_Conditional_0_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.copyLink());
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 11);
    \u0275\u0275text(12, "Invoice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "a", 12);
    \u0275\u0275text(14, "Edit invoice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 10);
    \u0275\u0275listener("click", function BookingDetailComponent_Conditional_3_Conditional_0_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goEdit());
    });
    \u0275\u0275text(16, "Edit");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 13)(18, "div", 14)(19, "span", 15);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 16);
    \u0275\u0275text(23, "Total");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 14)(25, "span", 17);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 16);
    \u0275\u0275text(29, "Paid");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 14)(31, "span", 15);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 16);
    \u0275\u0275text(35, "Balance due");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 18)(37, "span");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 19)(40, "div", 20)(41, "span", 21);
    \u0275\u0275text(42, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span", 22);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "date");
    \u0275\u0275pipe(46, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 20)(48, "span", 21);
    \u0275\u0275text(49, "Service");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 22);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 20)(53, "span", 21);
    \u0275\u0275text(54, "Worker");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "span", 22);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 20)(58, "span", 21);
    \u0275\u0275text(59, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "span", 22);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(62, BookingDetailComponent_Conditional_3_Conditional_0_Conditional_62_Template, 5, 1, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 23)(64, "div", 24)(65, "h2", 25);
    \u0275\u0275text(66, "Payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "span", 26);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(69, BookingDetailComponent_Conditional_3_Conditional_0_Conditional_69_Template, 2, 0, "p", 27)(70, BookingDetailComponent_Conditional_3_Conditional_0_Conditional_70_Template, 3, 0, "ul", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "div", 23)(72, "div", 24)(73, "h2", 25);
    \u0275\u0275text(74, "Record a payment");
    \u0275\u0275elementEnd();
    \u0275\u0275template(75, BookingDetailComponent_Conditional_3_Conditional_0_Conditional_75_Template, 3, 6, "button", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "form", 30);
    \u0275\u0275listener("ngSubmit", function BookingDetailComponent_Conditional_3_Conditional_0_Template_form_ngSubmit_76_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addPayment());
    });
    \u0275\u0275elementStart(77, "div", 31)(78, "div", 32)(79, "label");
    \u0275\u0275text(80, "Amount (\u20AC)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function BookingDetailComponent_Conditional_3_Conditional_0_Template_input_ngModelChange_81_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.payAmount, $event) || (ctx_r1.payAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "div", 32)(83, "label");
    \u0275\u0275text(84, "Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "select", 34);
    \u0275\u0275twoWayListener("ngModelChange", function BookingDetailComponent_Conditional_3_Conditional_0_Template_select_ngModelChange_85_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.payMethod, $event) || (ctx_r1.payMethod = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(86, BookingDetailComponent_Conditional_3_Conditional_0_For_87_Template, 2, 2, "option", 35, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(88, "div", 32)(89, "label");
    \u0275\u0275text(90, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function BookingDetailComponent_Conditional_3_Conditional_0_Template_input_ngModelChange_91_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.payDate, $event) || (ctx_r1.payDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div", 37)(93, "label");
    \u0275\u0275text(94, "Note ");
    \u0275\u0275elementStart(95, "span", 38);
    \u0275\u0275text(96, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(97, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function BookingDetailComponent_Conditional_3_Conditional_0_Template_input_ngModelChange_97_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.payNote, $event) || (ctx_r1.payNote = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(98, "div", 40)(99, "button", 41);
    \u0275\u0275text(100);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_15_0;
    let tmp_16_0;
    const b_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(b_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", b_r3.booking_ref, " \xB7 ", (tmp_4_0 = b_r3.client_name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "No client", "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.copied() ? "\u2713 Copied" : "Copy link");
    \u0275\u0275advance();
    \u0275\u0275property("href", "/book/invoice/" + ctx_r1.id, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(52, _c0, ctx_r1.id));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(21, 31, b_r3.price_total, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(27, 36, b_r3.total_paid, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("money__value--due", ctx_r1.balance() > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(33, 41, ctx_r1.balance(), "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(5);
    \u0275\u0275classMapInterpolate1("badge badge--", b_r3.payment_status, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", b_r3.payment_status === "paid" ? "Paid in full" : b_r3.payment_status === "partial" ? "Partially paid" : b_r3.payment_status === "external" ? "External" : "Unpaid", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(45, 46, b_r3.start_at, "EEE d MMM y, HH:mm"), " \u2013 ", \u0275\u0275pipeBind2(46, 49, b_r3.end_at, "HH:mm"), "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate((tmp_15_0 = b_r3.service_name) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_16_0 = b_r3.staff_name) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(b_r3.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(b_r3.client_email ? 62 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", ctx_r1.payments().length, " record", ctx_r1.payments().length === 1 ? "" : "s", "");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.payments().length === 0 ? 69 : 70);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.balance() > 0 ? 75 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.payAmount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.payMethod);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.methods);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.payDate);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.payNote);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.adding());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.adding() ? "Recording\u2026" : "Record payment", " ");
  }
}
function BookingDetailComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, BookingDetailComponent_Conditional_3_Conditional_0_Template, 101, 54);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.booking()) ? 0 : -1, tmp_1_0);
  }
}
var METHOD_LABEL = {
  card: "Card",
  cash: "Cash",
  revolut: "Revolut",
  bank: "Bank transfer",
  other: "Other"
};
var BookingDetailComponent = class _BookingDetailComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.data = inject(BookingDataService);
    this.id = "";
    this.payments = signal([]);
    this.copied = signal(false);
    this.adding = signal(false);
    this.payAmount = null;
    this.payMethod = "cash";
    this.payNote = "";
    this.payDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    this.methods = ["cash", "revolut", "bank", "card", "other"];
    this.booking = computed(() => this.data.bookings().find((b) => b.id === this.id));
    this.balance = computed(() => {
      const b = this.booking();
      return b ? Math.max(0, Math.round((b.price_total - b.total_paid) * 100) / 100) : 0;
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.id = this.route.snapshot.paramMap.get("id") ?? "";
      if (this.id)
        this.payments.set(yield this.data.getPayments(this.id));
    });
  }
  methodLabel(m) {
    return METHOD_LABEL[m] ?? m;
  }
  prefillBalance() {
    this.payAmount = this.balance();
  }
  addPayment() {
    return __async(this, null, function* () {
      const amount = Number(this.payAmount);
      if (!isFinite(amount) || amount <= 0) {
        this.toast.error("Enter a valid amount.");
        return;
      }
      this.adding.set(true);
      try {
        const paidAt = this.payDate ? (/* @__PURE__ */ new Date(`${this.payDate}T12:00:00`)).toISOString() : null;
        const res = yield this.data.addPayment(this.id, {
          amount,
          method: this.payMethod,
          note: this.payNote.trim() || null,
          paidAt
        });
        if (res.error) {
          this.toast.error("Could not record the payment.");
          return;
        }
        this.payments.set(yield this.data.getPayments(this.id));
        const ref = this.booking()?.booking_ref ?? "";
        this.toast.success(`\u20AC${amount} payment recorded${ref ? ` for ${ref}` : ""}`);
        this.payAmount = null;
        this.payNote = "";
      } finally {
        this.adding.set(false);
      }
    });
  }
  deletePayment(p) {
    return __async(this, null, function* () {
      if (p.stripe_payment_intent_id) {
        this.toast.error("Card payments are managed in Stripe and can\u2019t be removed here.");
        return;
      }
      if (!confirm(`Remove this \u20AC${p.amount} payment? This only fixes the record \u2014 it does not refund anyone.`))
        return;
      yield this.data.deletePayment(p.id, this.id);
      this.payments.set(yield this.data.getPayments(this.id));
      this.toast.info("Payment removed");
    });
  }
  copyLink() {
    return __async(this, null, function* () {
      const url = yield this.data.generateLink(this.id);
      if (!url) {
        this.toast.error("Could not generate the payment link.");
        return;
      }
      yield navigator.clipboard.writeText(url);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2e3);
      this.toast.success("Payment link copied to clipboard");
    });
  }
  goEdit() {
    this.router.navigate(["/bookings", this.id, "edit"]);
  }
  static {
    this.\u0275fac = function BookingDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingDetailComponent, selectors: [["app-booking-detail"]], decls: 4, vars: 1, consts: [[1, "page"], [1, "loading"], [1, "empty"], [1, "spinner"], ["routerLink", "/bookings/list", 1, "btn", "btn--ghost"], [1, "page__head"], ["routerLink", "/bookings/list", 1, "back"], [1, "page__title"], [1, "page__sub"], [1, "head-actions"], [1, "btn", "btn--ghost", 3, "click"], ["target", "_blank", "rel", "noopener", 1, "btn", "btn--ghost", 3, "href"], [1, "btn", "btn--ghost", 3, "routerLink"], [1, "money"], [1, "money__stat"], [1, "money__value"], [1, "money__label"], [1, "money__value", "money__value--paid"], [1, "money__badge"], [1, "card", "facts"], [1, "fact"], [1, "fact__k"], [1, "fact__v"], [1, "card"], [1, "card__head"], [1, "card__title"], [1, "muted"], [1, "empty-line"], [1, "pays"], ["type", "button", 1, "link-btn"], [1, "payform", 3, "ngSubmit"], [1, "payform__grid"], [1, "field"], ["type", "number", "name", "payAmount", "min", "0", "step", "0.01", "placeholder", "0.00", "required", "", 3, "ngModelChange", "ngModel"], ["name", "payMethod", 3, "ngModelChange", "ngModel"], [3, "value"], ["type", "date", "name", "payDate", 3, "ngModelChange", "ngModel"], [1, "field", "field--note"], [1, "opt"], ["name", "payNote", "placeholder", "e.g. Deposit, Final payment", 3, "ngModelChange", "ngModel"], [1, "payform__actions"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], [1, "pay", 3, "pay--refunded"], [1, "pay"], [1, "pay__amount"], [1, "pay__main"], [1, "pay__method"], [1, "pay__note"], [1, "pay__tag"], [1, "pay__tag", "pay__tag--pending"], [1, "pay__date"], ["title", "Remove payment", 1, "pay__del"], ["title", "Remove payment", 1, "pay__del", 3, "click"], ["type", "button", 1, "link-btn", 3, "click"]], template: function BookingDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, BookingDetailComponent_Conditional_1_Template, 2, 0, "div", 1)(2, BookingDetailComponent_Conditional_2_Template, 5, 0, "div", 2)(3, BookingDetailComponent_Conditional_3_Template, 1, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.data.loading() && !ctx.booking() ? 1 : !ctx.booking() ? 2 : 3);
      }
    }, dependencies: [RouterLink, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, NgModel, NgForm, DatePipe, CurrencyPipe], styles: [`

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
  max-width: 820px;
}
.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}
.back[_ngcontent-%COMP%] {
  font-size: 12.5px;
  font-weight: 600;
  color: #F4A922;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 8px;
}
.back[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
.head-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}
.card[_ngcontent-%COMP%]    + .card[_ngcontent-%COMP%] {
  margin-top: 18px;
}
.card__head[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.card__title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.empty-line[_ngcontent-%COMP%] {
  font-size: 13.5px;
  color: #94a3b8;
  margin: 4px 0;
}
.money[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  align-items: center;
  gap: 18px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px 22px;
  margin-bottom: 18px;
}
@media (max-width: 560px) {
  .money[_ngcontent-%COMP%] {
    grid-template-columns: repeat(3, 1fr);
  }
  .money[_ngcontent-%COMP%]   .money__badge[_ngcontent-%COMP%] {
    grid-column: 1/-1;
  }
}
.money__stat[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.money__value[_ngcontent-%COMP%] {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
}
.money__value--paid[_ngcontent-%COMP%] {
  color: #16a34a;
}
.money__value--due[_ngcontent-%COMP%] {
  color: #f97316;
}
.money__label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.money__badge[_ngcontent-%COMP%] {
  justify-self: end;
}
.facts[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.fact[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 9px 0;
  font-size: 13.5px;
}
.fact[_ngcontent-%COMP%]    + .fact[_ngcontent-%COMP%] {
  border-top: 1px solid #e2e8f0;
}
.fact__k[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-weight: 600;
}
.fact__v[_ngcontent-%COMP%] {
  color: #0f172a;
  text-align: right;
}
.pays[_ngcontent-%COMP%] {
  list-style: none;
  margin: 0;
  padding: 0;
}
.pay[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 0;
}
.pay[_ngcontent-%COMP%]    + .pay[_ngcontent-%COMP%] {
  border-top: 1px solid #e2e8f0;
}
.pay--refunded[_ngcontent-%COMP%] {
  opacity: 0.55;
}
.pay__amount[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  min-width: 84px;
}
.pay__main[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
  font-size: 13.5px;
  color: #475569;
}
.pay__method[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #0f172a;
}
.pay__note[_ngcontent-%COMP%] {
  color: #475569;
}
.pay__tag[_ngcontent-%COMP%] {
  margin-left: 6px;
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #ef4444;
}
.pay__tag--pending[_ngcontent-%COMP%] {
  color: #a16207;
}
.pay__date[_ngcontent-%COMP%] {
  font-size: 12.5px;
  color: #94a3b8;
  white-space: nowrap;
}
.pay__del[_ngcontent-%COMP%] {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 14px;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  flex-shrink: 0;
}
.pay__del[_ngcontent-%COMP%]:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.payform__grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
}
@media (max-width: 620px) {
  .payform__grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 420px) {
  .payform__grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.field--note[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.opt[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-weight: 400;
}
.payform__actions[_ngcontent-%COMP%] {
  margin-top: 14px;
  display: flex;
  justify-content: flex-end;
}
.badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.badge--paid[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #16a34a;
}
.badge--partial[_ngcontent-%COMP%] {
  background: #fef9c3;
  color: #a16207;
}
.badge--unpaid[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #dc2626;
}
.badge--external[_ngcontent-%COMP%] {
  background: #f1f5f9;
  color: #64748b;
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
.empty[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 40px 0;
  color: #94a3b8;
}
/*# sourceMappingURL=booking-detail.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookingDetailComponent, { className: "BookingDetailComponent", filePath: "src/app/booking/platform/bookings/booking-detail/booking-detail.component.ts", lineNumber: 20 });
})();
export {
  BookingDetailComponent
};
//# sourceMappingURL=chunk-4ZKVYG24.js.map
