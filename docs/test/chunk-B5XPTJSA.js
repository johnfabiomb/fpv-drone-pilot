import {
  toObservable,
  toSignal
} from "./chunk-Q5BD35NP.js";
import {
  ConfirmService
} from "./chunk-2IDKTD3Z.js";
import {
  ModalComponent
} from "./chunk-2PKC7M3P.js";
import {
  CdkMenu,
  CdkMenuItem,
  CdkMenuTrigger
} from "./chunk-B445Y36X.js";
import "./chunk-IH6BS7I3.js";
import {
  BookingDataService
} from "./chunk-74TTJQQS.js";
import "./chunk-FSJG3SUO.js";
import {
  ToastService
} from "./chunk-C7UDYKXR.js";
import "./chunk-KKHOHJA2.js";
import {
  CheckboxControlValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
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
  DatePipe,
  NgClass,
  computed,
  debounceTime,
  effect,
  inject,
  map,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-EBVVQ6Y2.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/bookings/booking-list/booking-list.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function BookingListComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "div", 17);
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 18);
    \u0275\u0275element(2, "rect", 19)(3, "path", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No bookings yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "a", 7);
    \u0275\u0275text(7, "Create your first booking");
    \u0275\u0275elementEnd()();
  }
}
function BookingListComponent_Conditional_37_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 31);
  }
}
function BookingListComponent_Conditional_37_For_3_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("tab__count--alert", t_r3.key === "pending");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.counts()[t_r3.key]);
  }
}
function BookingListComponent_Conditional_37_For_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_For_3_For_2_Template_button_click_0_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.setTab(t_r3.key));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BookingListComponent_Conditional_37_For_3_For_2_Conditional_3_Template, 2, 3, "span", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("tab--active", ctx_r3.tab() === t_r3.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.counts()[t_r3.key] ? 3 : -1);
  }
}
function BookingListComponent_Conditional_37_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, BookingListComponent_Conditional_37_For_3_Conditional_0_Template, 1, 0, "span", 31);
    \u0275\u0275repeaterCreate(1, BookingListComponent_Conditional_37_For_3_For_2_Template, 4, 4, "button", 32, _forTrack0);
  }
  if (rf & 2) {
    const group_r5 = ctx.$implicit;
    const \u0275$index_83_r6 = ctx.$index;
    \u0275\u0275conditional(\u0275$index_83_r6 > 0 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(group_r5);
  }
}
function BookingListComponent_Conditional_37_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "div", 17);
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_37_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.emptyText());
  }
}
function BookingListComponent_Conditional_37_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37)(2, "div", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 39);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 40);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 41)(11, "button", 42);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_11_For_2_Template_button_click_11_listener() {
      const b_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.approve(b_r8));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 43);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_11_For_2_Template_button_click_13_listener() {
      const b_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.decline(b_r8));
    });
    \u0275\u0275text(14, "Decline");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const b_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_12_0 = b_r8.client_name) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(6, 7, b_r8.start_at, "EEE d MMM, HH:mm"), " \xB7 ", b_r8.title, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(9, 10, b_r8.price_total, "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r3.busyId() === b_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.busyId() === b_r8.id ? "\u2026" : "Confirm", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.busyId() === b_r8.id);
  }
}
function BookingListComponent_Conditional_37_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275repeaterCreate(1, BookingListComponent_Conditional_37_Conditional_11_For_2_Template, 15, 15, "div", 36, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.rows());
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "NEXT");
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("+", b_r10.slot_count - 1, " block", b_r10.slot_count > 2 ? "s" : "", "");
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.relative(b_r10));
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind4(2, 2, b_r10.total_paid, "EUR", "symbol", "1.0-0"), " / ", \u0275\u0275pipeBind4(3, 7, b_r10.price_total, "EUR", "symbol", "1.0-0"), "");
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 71);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const b_r10 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goDetail(b_r10));
    });
    \u0275\u0275text(1, "Record payment\u2026");
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 74);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const b_r10 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.cancel(b_r10));
    });
    \u0275\u0275text(1, "Cancel booking");
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "button", 71);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const b_r10 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goDetail(b_r10));
    });
    \u0275\u0275text(2, "View details & payments");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Conditional_3_Template, 2, 0, "button", 72);
    \u0275\u0275elementStart(4, "button", 71);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const b_r10 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goEdit(b_r10));
    });
    \u0275\u0275text(5, "Edit booking");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Conditional_6_Template, 2, 0, "button", 73);
    \u0275\u0275elementStart(7, "button", 74);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const b_r10 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.askDelete(b_r10));
    });
    \u0275\u0275text(8, "Delete booking");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r10 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275conditional(b_r10.payment_status !== "paid" && b_r10.payment_status !== "external" ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(b_r10.status !== "cancelled" ? 6 : -1);
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "button", 64);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const b_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.copyLink(b_r10.id));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 65);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 66);
    \u0275\u0275element(5, "circle", 67)(6, "circle", 68)(7, "circle", 69);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(8, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_ng_template_8_Template, 9, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const rowMenu_r15 = \u0275\u0275reference(9);
    const b_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.copiedId() === b_r10.id ? "\u2713 Copied" : "Copy link");
    \u0275\u0275advance();
    \u0275\u0275property("cdkMenuTriggerFor", rowMenu_r15)("disabled", ctx_r3.busyId() === b_r10.id);
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_28_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "button", 71);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_28_ng_template_5_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r16);
      const b_r10 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goEdit(b_r10));
    });
    \u0275\u0275text(2, "Edit / enrich");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 74);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_28_ng_template_5_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r16);
      const b_r10 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.askDelete(b_r10));
    });
    \u0275\u0275text(4, "Delete");
    \u0275\u0275elementEnd()();
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 66);
    \u0275\u0275element(2, "circle", 67)(3, "circle", 68)(4, "circle", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_28_ng_template_5_Template, 5, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const extMenu_r17 = \u0275\u0275reference(6);
    const b_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("cdkMenuTriggerFor", extMenu_r17)("disabled", ctx_r3.busyId() === b_r10.id);
  }
}
function BookingListComponent_Conditional_37_Conditional_12_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 46)(2, "button", 47);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_37_Conditional_12_For_21_Template_button_click_2_listener() {
      const b_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goDetail(b_r10));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_4_Template, 2, 0, "span", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 50);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 51)(10, "span", 52);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_13_Template, 2, 2, "span", 53)(14, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_14_Template, 2, 1, "span", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 55);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 56)(19, "div", 57)(20, "span", 58);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_22_Template, 4, 12, "span", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "td", 60)(24, "span", 61);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td", 62);
    \u0275\u0275template(27, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_27_Template, 10, 3)(28, BookingListComponent_Conditional_37_Conditional_12_For_21_Conditional_28_Template, 7, 2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_17_0;
    const b_r10 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("row--external", b_r10.is_external)("row--next", b_r10.id === ctx_r3.nextId());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(b_r10.booking_ref);
    \u0275\u0275advance();
    \u0275\u0275conditional(b_r10.id === ctx_r3.nextId() ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_17_0 = b_r10.client_name) !== null && tmp_17_0 !== void 0 ? tmp_17_0 : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 17, b_r10.start_at, "EEE d MMM, HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(b_r10.slot_count > 1 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.relative(b_r10) ? 14 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(17, 20, b_r10.price_total, "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r3.paymentClass(b_r10.payment_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.paymentLabel(b_r10.payment_status));
    \u0275\u0275advance();
    \u0275\u0275conditional(!b_r10.is_external && b_r10.payment_status !== "paid" ? 22 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(b_r10.status);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!b_r10.is_external ? 27 : 28);
  }
}
function BookingListComponent_Conditional_37_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "table", 44)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Ref");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Job");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "When");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Payment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275repeaterCreate(20, BookingListComponent_Conditional_37_Conditional_12_For_21_Template, 29, 25, "tr", 45, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(20);
    \u0275\u0275repeater(ctx_r3.rows());
  }
}
function BookingListComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275repeaterCreate(2, BookingListComponent_Conditional_37_For_3_Template, 3, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 24);
    \u0275\u0275element(6, "circle", 25)(7, "path", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "input", 27);
    \u0275\u0275listener("input", function BookingListComponent_Conditional_37_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.search.set($event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, BookingListComponent_Conditional_37_Conditional_9_Template, 2, 0, "div", 14)(10, BookingListComponent_Conditional_37_Conditional_10_Template, 2, 1, "div", 28)(11, BookingListComponent_Conditional_37_Conditional_11_Template, 3, 0, "div", 29)(12, BookingListComponent_Conditional_37_Conditional_12_Template, 22, 0, "div", 30);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.tabGroups);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r3.search());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.rowsLoading() ? 9 : ctx_r3.rows().length === 0 ? 10 : ctx_r3.tab() === "pending" ? 11 : 12);
  }
}
function BookingListComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 75);
    \u0275\u0275text(1, "Delete ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, "?");
    \u0275\u0275element(5, "br");
    \u0275\u0275text(6, "This removes it from your bookings and can't be undone.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "label", 76)(8, "input", 77);
    \u0275\u0275listener("ngModelChange", function BookingListComponent_Conditional_39_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.removeEvent.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Also remove the event from Google Calendar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 78)(12, "button", 79);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_39_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeDelete());
    });
    \u0275\u0275text(13, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 80);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_39_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.confirmDelete());
    });
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.title);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r3.removeEvent());
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r3.deleting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.deleting() ? "Deleting\u2026" : "Delete", " ");
  }
}
var PAYMENT_LABELS = {
  unpaid: "Unpaid",
  partial: "Deposit paid",
  paid: "Paid",
  external: "External"
};
var PAYMENT_CLASSES = {
  unpaid: "badge--unpaid",
  partial: "badge--partial",
  paid: "badge--paid",
  external: "badge--external"
};
var TAB_KEYS = ["upcoming", "pending", "unpaid", "paid", "past", "cancelled", "all"];
var EMPTY_COUNTS = { upcoming: 0, pending: 0, unpaid: 0, paid: 0, past: 0, external: 0, cancelled: 0, all: 0 };
var EMPTY_TEXT = {
  upcoming: "No upcoming bookings. Your schedule is clear.",
  pending: "No bookings waiting to be confirmed.",
  unpaid: "Nothing outstanding \u2014 every job is paid. \u{1F389}",
  paid: "No fully-paid bookings yet.",
  past: "No past bookings.",
  external: "No imported calendar events. Use \u201CSync Calendar\u201D to pull them in.",
  cancelled: "No cancelled bookings.",
  all: "No bookings match your search."
};
var BookingListComponent = class _BookingListComponent {
  goEdit(b) {
    this.router.navigate(["/bookings", b.id, "edit"]);
  }
  goDetail(b) {
    this.router.navigate(["/bookings", b.id]);
  }
  readPersistedTab() {
    try {
      const t = localStorage.getItem(this.TAB_STORE);
      if (t && TAB_KEYS.includes(t))
        return t;
    } catch {
    }
    return "upcoming";
  }
  constructor() {
    this.data = inject(BookingDataService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.confirm = inject(ConfirmService);
    this.copiedId = signal(null);
    this.busyId = signal(null);
    this.tabGroups = [
      [{ key: "upcoming", label: "Upcoming" }, { key: "past", label: "Past" }],
      [{ key: "pending", label: "To confirm" }, { key: "unpaid", label: "Unpaid" }, { key: "paid", label: "Paid" }],
      [{ key: "cancelled", label: "Cancelled" }, { key: "all", label: "All" }]
    ];
    this.TAB_STORE = "jm.bookings.tab";
    this.tab = toSignal(this.route.queryParamMap.pipe(map((p) => {
      const t = p.get("tab");
      return t && TAB_KEYS.includes(t) ? t : this.readPersistedTab();
    })), { initialValue: this.readPersistedTab() });
    this.search = signal("");
    this.debouncedSearch = toSignal(toObservable(this.search).pipe(debounceTime(250)), { initialValue: "" });
    this.rows = signal([]);
    this.rowsLoading = signal(true);
    this.counts = signal(EMPTY_COUNTS);
    this.nextId = computed(() => {
      const now = Date.now();
      const up = this.data.bookings().filter((b) => (b.status === "booked" || b.status === "in_progress") && this.endMs(b) >= now).sort((a, b) => this.startMs(a) - this.startMs(b));
      return up.length ? up[0].id : null;
    });
    this.CONFIRMED_STATES = ["booked", "in_progress", "done"];
    this.confirmedJobs = computed(() => this.data.bookings().filter((b) => this.CONFIRMED_STATES.includes(b.status) && !b.is_external));
    this.expectedRevenue = computed(() => this.confirmedJobs().reduce((s, b) => s + b.price_revenue, 0));
    this.collected = computed(() => this.confirmedJobs().reduce((s, b) => s + b.total_paid, 0));
    this.unpaidCount = computed(() => this.confirmedJobs().filter((b) => b.payment_status === "unpaid" || b.payment_status === "partial").length);
    this.deleteOpen = signal(false);
    this.deleteTarget = signal(null);
    this.removeEvent = signal(true);
    this.deleting = signal(false);
    if (!this.route.snapshot.queryParamMap.get("tab")) {
      const restored = this.readPersistedTab();
      if (restored !== "upcoming") {
        void this.router.navigate([], { queryParams: { tab: restored }, queryParamsHandling: "merge", replaceUrl: true });
      }
    }
    effect(() => {
      const tab = this.tab();
      const q = this.debouncedSearch();
      void this.loadRows(tab, q);
    });
    void this.refreshCounts();
  }
  /** Navigate to a tab — pushes ?tab=… so it's a real, linkable URL, and remembers it. */
  setTab(tab) {
    try {
      localStorage.setItem(this.TAB_STORE, tab);
    } catch {
    }
    this.router.navigate([], { queryParams: { tab }, queryParamsHandling: "merge" });
  }
  loadRows(tab, search) {
    return __async(this, null, function* () {
      this.rowsLoading.set(true);
      this.rows.set(yield this.data.queryBookings(tab, search));
      this.rowsLoading.set(false);
    });
  }
  refreshCounts() {
    return __async(this, null, function* () {
      this.counts.set(yield this.data.bookingTabCounts());
    });
  }
  /** After a mutation, re-pull the current tab's rows + the counts (stay fresh, no local edits). */
  refresh() {
    return __async(this, null, function* () {
      yield Promise.all([this.loadRows(this.tab(), this.debouncedSearch()), this.refreshCounts()]);
    });
  }
  startMs(b) {
    return new Date(b.start_at).getTime();
  }
  endMs(b) {
    return new Date(b.end_at).getTime();
  }
  emptyText() {
    return EMPTY_TEXT[this.tab()];
  }
  /** Friendly relative day for the schedule ("Today", "Tomorrow", "in 3 days"). */
  relative(b) {
    const days = Math.round((this.startMs(b) - Date.now()) / 864e5);
    if (days === 0)
      return "Today";
    if (days === 1)
      return "Tomorrow";
    if (days === -1)
      return "Yesterday";
    if (days > 1 && days <= 14)
      return `in ${days} days`;
    if (days < -1 && days >= -14)
      return `${-days} days ago`;
    return "";
  }
  copyLink(bookingId) {
    return __async(this, null, function* () {
      const url = yield this.data.generateLink(bookingId);
      if (!url) {
        this.toast.error("Could not generate the payment link.");
        return;
      }
      yield navigator.clipboard.writeText(url);
      this.copiedId.set(bookingId);
      setTimeout(() => this.copiedId.set(null), 2e3);
      this.toast.success("Payment link copied to clipboard");
    });
  }
  approve(b) {
    return __async(this, null, function* () {
      this.busyId.set(b.id);
      try {
        const res = yield this.data.approveRequest(b.id);
        if (res.error === "slot_taken")
          this.toast.error(`${b.booking_ref}: that slot was just taken \u2014 decline this one.`);
        else if (res.error === "not_pending")
          this.toast.error(`${b.booking_ref} is no longer pending.`);
        else if (res.error)
          this.toast.error(`Could not approve ${b.booking_ref}.`);
        else {
          this.toast.success(`${b.booking_ref} approved \u2014 added to your calendar`);
          yield this.refresh();
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
      if (!(yield this.confirm.ask({ title: "Decline request", message: `Decline ${b.booking_ref}?`, confirmLabel: "Decline", danger: true })))
        return;
      this.busyId.set(b.id);
      try {
        yield this.data.declineRequest(b.id);
        this.toast.info(`${b.booking_ref} declined`);
        yield this.refresh();
      } catch {
        this.toast.error(`Could not decline ${b.booking_ref}.`);
      } finally {
        this.busyId.set(null);
      }
    });
  }
  cancel(b) {
    return __async(this, null, function* () {
      if (!(yield this.confirm.ask({
        title: "Cancel booking",
        message: `Cancel ${b.booking_ref} (${b.client_name ?? "no client"})? This frees the slot and removes it from your calendar. This cannot be undone.`,
        confirmLabel: "Cancel booking",
        cancelLabel: "Keep it",
        danger: true
      })))
        return;
      let refund = false;
      if (b.total_paid > 0) {
        refund = yield this.confirm.ask({
          title: "Refund card payments?",
          message: `\u20AC${b.total_paid} has been paid on this booking. Refund any CARD payments via Stripe now? (Cash / Revolut / bank payments are settled by you directly.)`,
          confirmLabel: "Refund now",
          cancelLabel: "Don\u2019t refund"
        });
      }
      this.busyId.set(b.id);
      try {
        const res = yield this.data.cancelBooking(b.id, refund);
        if (res.error) {
          this.toast.error(`Could not cancel ${b.booking_ref}.`);
          return;
        }
        yield this.refresh();
        if (res.calendar_cleared === false) {
          this.toast.error(`${b.booking_ref} cancelled, but its calendar event couldn't be removed \u2014 delete it manually.`);
        } else if (res.refunded) {
          this.toast.success(`${b.booking_ref} cancelled \u2014 \u20AC${res.refunded} refunded`);
        } else {
          this.toast.success(`${b.booking_ref} cancelled`);
        }
      } catch {
        this.toast.error(`Could not cancel ${b.booking_ref}. Please try again.`);
      } finally {
        this.busyId.set(null);
      }
    });
  }
  askDelete(b) {
    this.deleteTarget.set(b);
    this.removeEvent.set(true);
    this.deleteOpen.set(true);
  }
  closeDelete() {
    this.deleteOpen.set(false);
    this.deleteTarget.set(null);
  }
  confirmDelete() {
    return __async(this, null, function* () {
      const b = this.deleteTarget();
      if (!b)
        return;
      this.deleting.set(true);
      try {
        const remove = this.removeEvent();
        const res = yield this.data.deleteBooking(b.id, remove);
        if (res.error) {
          this.toast.error(`Could not delete ${b.booking_ref}.`);
          return;
        }
        if (remove && res.calendarCleared === false) {
          this.toast.error(`${b.booking_ref} deleted, but its Google Calendar event could NOT be removed \u2014 check the calendar connection.`);
        } else {
          this.toast.success(`${b.booking_ref} deleted${remove ? " \xB7 removed from Google Calendar" : ""}`);
        }
        yield this.refresh();
        this.closeDelete();
      } catch {
        this.toast.error(`Could not delete ${b.booking_ref}. Please try again.`);
      } finally {
        this.deleting.set(false);
      }
    });
  }
  paymentLabel(status) {
    return PAYMENT_LABELS[status] ?? status;
  }
  paymentClass(status) {
    return PAYMENT_CLASSES[status] ?? "";
  }
  static {
    this.\u0275fac = function BookingListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingListComponent, selectors: [["app-booking-list"]], decls: 40, vars: 19, consts: [["rowMenu", ""], ["extMenu", ""], [1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], [1, "head-actions"], ["routerLink", "/bookings/new", 1, "btn", "btn--primary"], ["viewBox", "0 0 16 16", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M8 3v10M3 8h10"], [1, "stats"], [1, "stat"], [1, "stat__value"], [1, "stat__label"], [1, "loading"], [1, "empty"], ["title", "Delete booking", 3, "openChange", "open"], [1, "spinner"], ["viewBox", "0 0 48 48", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "8", "y", "10", "width", "32", "height", "30", "rx", "4"], ["d", "M16 6v8M32 6v8M8 22h32"], [1, "toolbar"], ["role", "tablist", 1, "tabs"], [1, "search"], ["viewBox", "0 0 16 16", "fill", "none", "stroke", "currentColor", "stroke-width", "1.6"], ["cx", "7", "cy", "7", "r", "4.5"], ["d", "M11 11l3 3"], ["type", "search", "placeholder", "Search ref, client or job\u2026", 3, "input", "value"], [1, "empty-tab"], [1, "requests"], [1, "table-wrap"], ["aria-hidden", "true", 1, "tabs__sep"], ["role", "tab", 1, "tab", 3, "tab--active"], ["role", "tab", 1, "tab", 3, "click"], [1, "tab__count", 3, "tab__count--alert"], [1, "tab__count"], [1, "request"], [1, "request__main"], [1, "request__who"], [1, "request__when"], [1, "request__price"], [1, "request__actions"], [1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"], [1, "btn", "btn--sm", "btn--ghost", 3, "click", "disabled"], [1, "table"], [3, "row--external", "row--next"], ["data-label", "Ref", 1, "cell--mono"], [1, "ref-link", 3, "click"], [1, "next-badge"], ["data-label", "Job", 1, "cell--title"], ["data-label", "Client", 1, "cell--client"], ["data-label", "When", 1, "cell--date"], [1, "when__abs"], ["title", "Split into multiple time blocks", 1, "when__blocks"], [1, "when__rel"], ["data-label", "Total"], ["data-label", "Payment"], [1, "pay-cell"], [1, "badge", 3, "ngClass"], [1, "pay-cell__amt"], ["data-label", "Status"], [1, "badge", "badge--status"], ["data-label", "", 1, "cell--actions"], [1, "row-actions"], [1, "link-btn", 3, "click"], ["aria-label", "More actions", 1, "kebab", 3, "cdkMenuTriggerFor", "disabled"], ["viewBox", "0 0 20 20", "width", "18", "height", "18", "fill", "currentColor"], ["cx", "10", "cy", "4", "r", "1.7"], ["cx", "10", "cy", "10", "r", "1.7"], ["cx", "10", "cy", "16", "r", "1.7"], ["cdkMenu", "", 1, "menu"], ["cdkMenuItem", "", 1, "menu__item", 3, "click"], ["cdkMenuItem", "", 1, "menu__item"], ["cdkMenuItem", "", 1, "menu__item", "menu__item--danger"], ["cdkMenuItem", "", 1, "menu__item", "menu__item--danger", 3, "click"], [1, "del-text"], [1, "del-check"], ["type", "checkbox", "name", "removeEvent", 3, "ngModelChange", "ngModel"], [1, "del-actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--danger", 3, "click", "disabled"]], template: function BookingListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div")(3, "h1", 4);
        \u0275\u0275text(4, "Bookings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 5);
        \u0275\u0275text(6, "All jobs, shoots and appointments");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 6)(8, "a", 7);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 8);
        \u0275\u0275element(10, "path", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " New booking ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(12, "div", 10)(13, "div", 11)(14, "span", 12);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 13);
        \u0275\u0275text(17, "Confirmed bookings");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 11)(19, "span", 12);
        \u0275\u0275text(20);
        \u0275\u0275pipe(21, "currency");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "span", 13);
        \u0275\u0275text(23, "Expected revenue");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 11)(25, "span", 12);
        \u0275\u0275text(26);
        \u0275\u0275pipe(27, "currency");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span", 13);
        \u0275\u0275text(29, "Collected");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "div", 11)(31, "span", 12);
        \u0275\u0275text(32);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "span", 13);
        \u0275\u0275text(34, "Awaiting payment");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(35, BookingListComponent_Conditional_35_Template, 2, 0, "div", 14)(36, BookingListComponent_Conditional_36_Template, 8, 0, "div", 15)(37, BookingListComponent_Conditional_37_Template, 13, 2);
        \u0275\u0275elementStart(38, "app-modal", 16);
        \u0275\u0275listener("openChange", function BookingListComponent_Template_app_modal_openChange_38_listener($event) {
          return $event || ctx.closeDelete();
        });
        \u0275\u0275template(39, BookingListComponent_Conditional_39_Template, 16, 4);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        let tmp_7_0;
        \u0275\u0275advance(15);
        \u0275\u0275textInterpolate(ctx.confirmedJobs().length);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(21, 9, ctx.expectedRevenue(), "EUR", "symbol", "1.0-0"));
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(27, 14, ctx.collected(), "EUR", "symbol", "1.0-0"));
        \u0275\u0275advance(4);
        \u0275\u0275classProp("stat--warn", ctx.unpaidCount() > 0);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.unpaidCount());
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.data.loading() ? 35 : ctx.data.bookings().length === 0 ? 36 : 37);
        \u0275\u0275advance(3);
        \u0275\u0275property("open", ctx.deleteOpen());
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_7_0 = ctx.deleteTarget()) ? 39 : -1, tmp_7_0);
      }
    }, dependencies: [RouterLink, NgClass, DatePipe, CurrencyPipe, CdkMenuTrigger, CdkMenu, CdkMenuItem, FormsModule, CheckboxControlValueAccessor, NgControlStatus, NgModel, ModalComponent], styles: [`

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
  max-width: 1600px;
  padding: 36px 48px;
}
@media (max-width: 900px) {
  .page[_ngcontent-%COMP%] {
    padding: 24px 20px;
  }
}
.stats[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.stat[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 22px;
  min-width: 140px;
  flex: 1;
}
.stat__value[_ngcontent-%COMP%] {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.03em;
  line-height: 1.1;
}
.stat__label[_ngcontent-%COMP%] {
  display: block;
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.stat--warn[_ngcontent-%COMP%]   .stat__value[_ngcontent-%COMP%] {
  color: #f97316;
}
.toolbar[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.tabs[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 2px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 4px;
  flex-wrap: nowrap;
  overflow-x: auto;
  max-width: 100%;
  min-width: 0;
  scrollbar-width: none;
}
.tabs[_ngcontent-%COMP%]::-webkit-scrollbar {
  display: none;
}
.tabs__sep[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  align-self: stretch;
  width: 1px;
  margin: 3px 5px;
  background: #e2e8f0;
}
.tab[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border: none;
  background: none;
  cursor: pointer;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Inter",
    "Segoe UI",
    sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  border-radius: 8px;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.tab[_ngcontent-%COMP%]:hover {
  color: #0f172a;
}
.tab--active[_ngcontent-%COMP%] {
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}
.tab__count[_ngcontent-%COMP%] {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  background: #e2e8f0;
  color: #475569;
}
.tab--active[_ngcontent-%COMP%]   .tab__count[_ngcontent-%COMP%] {
  background: rgba(244, 169, 34, 0.12);
  color: #0f172a;
}
.tab__count--alert[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #dc2626;
}
.search[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 12px;
  min-width: 220px;
  transition: border-color 0.15s ease;
}
.search[_ngcontent-%COMP%]:focus-within {
  border-color: #F4A922;
}
.search[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 15px;
  height: 15px;
  color: #94a3b8;
  flex-shrink: 0;
}
.search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  border: none;
  outline: none;
  background: none;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Inter",
    "Segoe UI",
    sans-serif;
  font-size: 13.5px;
  color: #0f172a;
  padding: 9px 0;
  width: 100%;
}
.search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.empty-tab[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
}
.table-wrap[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  overflow-x: auto;
}
@media (max-width: 760px) {
  .table-wrap[_ngcontent-%COMP%] {
    border: none;
    background: none;
    overflow: visible;
  }
}
.table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
}
@media (max-width: 760px) {
  .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {
    display: none;
  }
  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
    display: block;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 10px 14px;
    margin: 0 0 10px;
  }
  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {
    margin-bottom: 0;
  }
  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 0;
    border: none;
    text-align: right;
    white-space: normal;
  }
  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]    + td[_ngcontent-%COMP%] {
    border-top: 1px solid #e2e8f0;
  }
  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {
    content: attr(data-label);
    margin-right: auto;
    flex: none;
    font-size: 12px;
    font-weight: 600;
    color: #475569;
    text-align: left;
  }
  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[data-label][_ngcontent-%COMP%] {
    max-width: none;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[data-label=""][_ngcontent-%COMP%] {
    justify-content: flex-end;
  }
  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[data-label=""][_ngcontent-%COMP%]::before {
    content: none;
  }
}
.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  padding: 10px 14px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}
.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 11px 14px;
  font-size: 13.5px;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}
.table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {
  border-bottom: none;
}
.table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {
  background: #fafbfc;
}
.row--external[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  color: #94a3b8;
}
.cell--mono[_ngcontent-%COMP%] {
  font-family:
    "SF Mono",
    "Fira Mono",
    monospace;
  font-size: 12.5px;
  color: #0f172a;
  font-weight: 600;
  white-space: nowrap;
}
.cell--title[_ngcontent-%COMP%] {
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.cell--client[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 500;
  color: #475569;
}
.cell--date[_ngcontent-%COMP%]   .when__abs[_ngcontent-%COMP%] {
  display: block;
  color: #0f172a;
}
.cell--date[_ngcontent-%COMP%]   .when__rel[_ngcontent-%COMP%] {
  display: block;
  font-size: 11.5px;
  color: #94a3b8;
  margin-top: 1px;
}
.cell--date[_ngcontent-%COMP%]   .when__blocks[_ngcontent-%COMP%] {
  display: inline-block;
  margin-top: 2px;
  padding: 1px 6px;
  border-radius: 6px;
  font-size: 10.5px;
  font-weight: 700;
  background: rgba(244, 169, 34, 0.12);
  color: #F4A922;
}
.row--next[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  background: rgba(244, 169, 34, 0.12);
}
.row--next[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {
  background: rgba(244, 169, 34, 0.12);
}
.next-badge[_ngcontent-%COMP%] {
  margin-left: 8px;
  padding: 1px 7px;
  border-radius: 20px;
  background: #F4A922;
  color: #000;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.06em;
  vertical-align: middle;
}
.badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 11.5px;
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
.badge--status[_ngcontent-%COMP%] {
  background: #f1f5f9;
  color: #64748b;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1.5px solid transparent;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Inter",
    "Segoe UI",
    sans-serif;
  text-decoration: none;
}
.btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 14px;
  height: 14px;
}
.btn--primary[_ngcontent-%COMP%] {
  background: #F4A922;
  border-color: #F4A922;
  color: #000;
}
.btn--primary[_ngcontent-%COMP%]:hover {
  filter: brightness(0.92);
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
  padding: 7px 14px;
  font-size: 12.5px;
}
.btn--danger[_ngcontent-%COMP%] {
  background: #dc2626;
  border-color: #dc2626;
  color: #fff;
}
.btn--danger[_ngcontent-%COMP%]:hover:not(:disabled) {
  filter: brightness(0.92);
}
.btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: default;
}
.del-text[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
  margin: 0 0 16px;
}
.del-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #0f172a;
}
.del-check[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 4px;
  font-size: 13.5px;
  color: #0f172a;
}
.del-check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  margin-top: 1px;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: #F4A922;
}
.del-actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
}
.requests[_ngcontent-%COMP%] {
  margin-bottom: 26px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 3px solid #F4A922;
  border-radius: 12px;
  padding: 16px 18px;
}
.requests__title[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.requests__count[_ngcontent-%COMP%] {
  background: #F4A922;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.request[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
}
.request[_ngcontent-%COMP%]    + .request[_ngcontent-%COMP%] {
  border-top: 1px solid #e2e8f0;
}
.request__main[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.request__who[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
}
.request__when[_ngcontent-%COMP%] {
  font-size: 12.5px;
  color: #475569;
}
.request__price[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
}
.request__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.cell--actions[_ngcontent-%COMP%] {
  white-space: nowrap;
}
.ref-link[_ngcontent-%COMP%] {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family:
    "SF Mono",
    "Fira Mono",
    monospace;
  font-size: 12.5px;
  font-weight: 600;
  color: #0f172a;
}
.ref-link[_ngcontent-%COMP%]:hover {
  color: #F4A922;
  text-decoration: underline;
}
.pay-cell[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: flex-start;
}
.pay-cell__amt[_ngcontent-%COMP%] {
  font-size: 11.5px;
  color: #94a3b8;
  font-weight: 600;
}
.row-actions[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
.kebab[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s ease;
}
.kebab[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #f8fafc;
  color: #0f172a;
}
.kebab[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: default;
}
.kebab[aria-expanded=true][_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #0f172a;
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
  transition: background 0.15s ease;
  font-family: inherit;
}
.link-btn[_ngcontent-%COMP%]:hover {
  background: rgba(244, 169, 34, 0.12);
}
.link-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: default;
}
.link-btn--danger[_ngcontent-%COMP%] {
  color: #ef4444;
}
.link-btn--danger[_ngcontent-%COMP%]:hover {
  background: rgba(239, 68, 68, 0.1);
}
.menu[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  min-width: 168px;
  padding: 6px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.14);
}
.menu__item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  text-align: left;
  background: none;
  border: none;
  border-radius: 6px;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: background 0.15s ease;
}
.menu__item[_ngcontent-%COMP%]:hover, 
.menu__item[_ngcontent-%COMP%]:focus-visible {
  background: #f8fafc;
  color: #0f172a;
  outline: none;
}
.menu__item--danger[_ngcontent-%COMP%] {
  color: #ef4444;
}
.menu__item--danger[_ngcontent-%COMP%]:hover, 
.menu__item--danger[_ngcontent-%COMP%]:focus-visible {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
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
  align-items: center;
  gap: 14px;
  padding: 64px 40px;
  color: #94a3b8;
  text-align: center;
}
.empty[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  opacity: 0.35;
}
.empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  margin: 0;
  max-width: 300px;
}
/*# sourceMappingURL=booking-list.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookingListComponent, { className: "BookingListComponent", filePath: "src/app/booking/platform/bookings/booking-list/booking-list.component.ts", lineNumber: 44 });
})();
export {
  BookingListComponent
};
//# sourceMappingURL=chunk-B5XPTJSA.js.map
