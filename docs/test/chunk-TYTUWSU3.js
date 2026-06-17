import {
  CdkMenu,
  CdkMenuItem,
  CdkMenuTrigger
} from "./chunk-6SW56VGB.js";
import "./chunk-U4HI27BX.js";
import {
  ToastService
} from "./chunk-WE6LBMFD.js";
import {
  BookingDataService
} from "./chunk-YN35FWKD.js";
import "./chunk-62WGWY5L.js";
import "./chunk-MQ25DMRF.js";
import "./chunk-5R6IZFLD.js";
import {
  Router,
  RouterLink
} from "./chunk-23WFKX7T.js";
import "./chunk-2VIPXXQC.js";
import "./chunk-WKMKAAWK.js";
import {
  CurrencyPipe,
  DatePipe,
  NgClass,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-YX7TN7IZ.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/bookings/booking-list/booking-list.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function BookingListComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "div", 14);
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 15);
    \u0275\u0275element(2, "rect", 16)(3, "path", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No bookings yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "a", 5);
    \u0275\u0275text(7, "Create your first booking");
    \u0275\u0275elementEnd()();
  }
}
function BookingListComponent_Conditional_36_For_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("tab__count--alert", t_r3.key === "pending");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.counts()[t_r3.key]);
  }
}
function BookingListComponent_Conditional_36_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_For_3_Template_button_click_0_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.tab.set(t_r3.key));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BookingListComponent_Conditional_36_For_3_Conditional_3_Template, 2, 3, "span", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("tab--active", ctx_r3.tab() === t_r3.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.counts()[t_r3.key] ? 3 : -1);
  }
}
function BookingListComponent_Conditional_36_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.emptyText());
  }
}
function BookingListComponent_Conditional_36_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "div", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 35);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 36);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 37)(11, "button", 38);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_Conditional_10_For_2_Template_button_click_11_listener() {
      const b_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.approve(b_r6));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 39);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_Conditional_10_For_2_Template_button_click_13_listener() {
      const b_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.decline(b_r6));
    });
    \u0275\u0275text(14, "Decline");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const b_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_12_0 = b_r6.client_name) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(6, 7, b_r6.start_at, "EEE d MMM, HH:mm"), " \xB7 ", b_r6.title, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(9, 10, b_r6.price_total, "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r3.busyId() === b_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.busyId() === b_r6.id ? "\u2026" : "Approve", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.busyId() === b_r6.id);
  }
}
function BookingListComponent_Conditional_36_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275repeaterCreate(1, BookingListComponent_Conditional_36_Conditional_10_For_2_Template, 15, 15, "div", 32, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.rows());
  }
}
function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "NEXT");
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.relative(b_r8));
  }
}
function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind4(2, 2, b_r8.total_paid, "EUR", "symbol", "1.0-0"), " / ", \u0275\u0275pipeBind4(3, 7, b_r8.price_total, "EUR", "symbol", "1.0-0"), "");
  }
}
function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const b_r8 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goDetail(b_r8));
    });
    \u0275\u0275text(1, "Record payment\u2026");
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const b_r8 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.cancel(b_r8));
    });
    \u0275\u0275text(1, "Cancel booking");
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "button", 64);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const b_r8 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goDetail(b_r8));
    });
    \u0275\u0275text(2, "View details & payments");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Conditional_3_Template, 2, 0, "button", 65);
    \u0275\u0275elementStart(4, "button", 64);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r10);
      const b_r8 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goEdit(b_r8));
    });
    \u0275\u0275text(5, "Edit booking");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Conditional_6_Template, 2, 0, "button", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275conditional(b_r8.payment_status !== "paid" && b_r8.payment_status !== "external" ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(b_r8.status !== "cancelled" ? 6 : -1);
  }
}
function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56)(1, "button", 57);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const b_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.copyLink(b_r8.id));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 58);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 59);
    \u0275\u0275element(5, "circle", 60)(6, "circle", 61)(7, "circle", 62);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(8, BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_ng_template_8_Template, 7, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const rowMenu_r13 = \u0275\u0275reference(9);
    const b_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.copiedId() === b_r8.id ? "\u2713 Copied" : "Copy link");
    \u0275\u0275advance();
    \u0275\u0275property("cdkMenuTriggerFor", rowMenu_r13)("disabled", ctx_r3.busyId() === b_r8.id);
  }
}
function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_30_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const b_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goEdit(b_r8));
    });
    \u0275\u0275text(1, "Edit / enrich");
    \u0275\u0275elementEnd();
  }
}
function BookingListComponent_Conditional_36_Conditional_11_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 42)(2, "button", 43);
    \u0275\u0275listener("click", function BookingListComponent_Conditional_36_Conditional_11_For_23_Template_button_click_2_listener() {
      const b_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.goDetail(b_r8));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_4_Template, 2, 0, "span", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 45);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 46);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 47)(10, "span", 48);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_13_Template, 2, 1, "span", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td")(21, "div", 50)(22, "span", 51);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_24_Template, 4, 12, "span", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "td")(26, "span", 53);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "td", 54);
    \u0275\u0275template(29, BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_29_Template, 10, 3)(30, BookingListComponent_Conditional_36_Conditional_11_For_23_Conditional_30_Template, 2, 0, "button", 55);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_16_0;
    const b_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("row--external", b_r8.is_external)("row--next", b_r8.id === ctx_r3.nextId());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(b_r8.booking_ref);
    \u0275\u0275advance();
    \u0275\u0275conditional(b_r8.id === ctx_r3.nextId() ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_16_0 = b_r8.client_name) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r8.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 17, b_r8.start_at, "EEE d MMM, HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.relative(b_r8) ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(16, 20, b_r8.price_total, "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(19, 25, b_r8.price_revenue, "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r3.paymentClass(b_r8.payment_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.paymentLabel(b_r8.payment_status));
    \u0275\u0275advance();
    \u0275\u0275conditional(!b_r8.is_external && b_r8.payment_status !== "paid" ? 24 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(b_r8.status);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!b_r8.is_external ? 29 : 30);
  }
}
function BookingListComponent_Conditional_36_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "table", 40)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Ref");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Job");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "When");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Revenue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Payment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275repeaterCreate(22, BookingListComponent_Conditional_36_Conditional_11_For_23_Template, 31, 30, "tr", 41, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r3.rows());
  }
}
function BookingListComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19);
    \u0275\u0275repeaterCreate(2, BookingListComponent_Conditional_36_For_3_Template, 4, 4, "button", 20, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 22);
    \u0275\u0275element(6, "circle", 23)(7, "path", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "input", 25);
    \u0275\u0275listener("input", function BookingListComponent_Conditional_36_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.search.set($event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, BookingListComponent_Conditional_36_Conditional_9_Template, 2, 1, "div", 26)(10, BookingListComponent_Conditional_36_Conditional_10_Template, 3, 0, "div", 27)(11, BookingListComponent_Conditional_36_Conditional_11_Template, 24, 0, "div", 28);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.tabs);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r3.search());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.rows().length === 0 ? 9 : ctx_r3.tab() === "pending" ? 10 : 11);
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
var EMPTY_TEXT = {
  upcoming: "No upcoming bookings. Your schedule is clear.",
  pending: "No requests waiting for approval.",
  unpaid: "Nothing outstanding \u2014 every job is paid. \u{1F389}",
  paid: "No fully-paid bookings yet.",
  past: "No past bookings.",
  external: "No imported calendar events. Use \u201CSync Calendar\u201D to pull them in.",
  cancelled: "No cancelled bookings.",
  all: "No bookings match your search."
};
var BookingListComponent = class _BookingListComponent {
  constructor() {
    this.data = inject(BookingDataService);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.copiedId = signal(null);
    this.busyId = signal(null);
    this.tabs = [
      { key: "upcoming", label: "Upcoming" },
      { key: "pending", label: "Pending" },
      { key: "unpaid", label: "Unpaid" },
      { key: "paid", label: "Paid" },
      { key: "past", label: "Past" },
      { key: "external", label: "External" },
      { key: "cancelled", label: "Cancelled" },
      { key: "all", label: "All" }
    ];
    this.tab = signal("upcoming");
    this.search = signal("");
    this.counts = computed(() => {
      const now = Date.now();
      const c = { upcoming: 0, pending: 0, unpaid: 0, paid: 0, past: 0, external: 0, cancelled: 0, all: 0 };
      for (const b of this.data.bookings())
        for (const t of this.tabs)
          if (this.inTab(b, t.key, now))
            c[t.key]++;
      return c;
    });
    this.rows = computed(() => {
      const tab = this.tab(), now = Date.now();
      const q = this.search().trim().toLowerCase();
      let list = this.data.bookings().filter((b) => this.inTab(b, tab, now));
      if (q)
        list = list.filter((b) => !!b.booking_ref?.toLowerCase().includes(q) || !!b.client_name?.toLowerCase().includes(q) || !!b.title?.toLowerCase().includes(q));
      return list.sort(this.comparatorFor(tab));
    });
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
  }
  goEdit(b) {
    this.router.navigate(["/bookings", b.id, "edit"]);
  }
  goDetail(b) {
    this.router.navigate(["/bookings", b.id]);
  }
  static {
    this.ACTIVE = ["booked", "in_progress", "done"];
  }
  startMs(b) {
    return new Date(b.start_at).getTime();
  }
  endMs(b) {
    return new Date(b.end_at).getTime();
  }
  /** Local midnight today — "upcoming" includes everything from today onward. */
  todayStartMs() {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }
  /** Whether a booking belongs in a given tab. */
  inTab(b, tab, now) {
    const active = _BookingListComponent.ACTIVE.includes(b.status);
    switch (tab) {
      // Upcoming = anything happening today or later — real OR imported (external) events.
      case "upcoming":
        return (b.status === "booked" || b.status === "in_progress") && this.endMs(b) >= this.todayStartMs();
      case "past":
        return !b.is_external && active && this.endMs(b) < this.todayStartMs();
      case "pending":
        return b.status === "pending";
      case "unpaid":
        return active && !b.is_external && (b.payment_status === "unpaid" || b.payment_status === "partial");
      case "paid":
        return active && !b.is_external && b.payment_status === "paid";
      case "external":
        return b.is_external;
      case "cancelled":
        return b.status === "cancelled" || b.status === "expired";
      case "all":
        return true;
    }
  }
  /** Every tab is strictly chronological. Forward-looking tabs run soonest→latest; history runs most-recent→oldest. */
  comparatorFor(tab) {
    const asc = (a, b) => this.startMs(a) - this.startMs(b);
    const desc = (a, b) => this.startMs(b) - this.startMs(a);
    switch (tab) {
      case "upcoming":
      case "pending":
      case "unpaid":
      case "external":
        return asc;
      default:
        return desc;
    }
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
        else
          this.toast.success(`${b.booking_ref} approved \u2014 added to your calendar`);
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
  cancel(b) {
    return __async(this, null, function* () {
      if (!confirm(`Cancel ${b.booking_ref} (${b.client_name ?? "no client"})?

This frees the slot and removes it from your calendar.
This cannot be undone.`))
        return;
      let refund = false;
      if (b.total_paid > 0) {
        refund = confirm(`\u20AC${b.total_paid} has been paid on this booking.

OK = refund any CARD payments via Stripe now.
Cancel = cancel without refunding.

(Cash / Revolut / bank payments are settled by you directly.)`);
      }
      this.busyId.set(b.id);
      try {
        const res = yield this.data.cancelBooking(b.id, refund);
        if (res.error) {
          this.toast.error(`Could not cancel ${b.booking_ref}.`);
          return;
        }
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingListComponent, selectors: [["app-booking-list"]], decls: 37, vars: 17, consts: [["rowMenu", ""], [1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], ["routerLink", "/bookings/new", 1, "btn", "btn--primary"], ["viewBox", "0 0 16 16", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M8 3v10M3 8h10"], [1, "stats"], [1, "stat"], [1, "stat__value"], [1, "stat__label"], [1, "loading"], [1, "empty"], [1, "spinner"], ["viewBox", "0 0 48 48", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "8", "y", "10", "width", "32", "height", "30", "rx", "4"], ["d", "M16 6v8M32 6v8M8 22h32"], [1, "toolbar"], ["role", "tablist", 1, "tabs"], ["role", "tab", 1, "tab", 3, "tab--active"], [1, "search"], ["viewBox", "0 0 16 16", "fill", "none", "stroke", "currentColor", "stroke-width", "1.6"], ["cx", "7", "cy", "7", "r", "4.5"], ["d", "M11 11l3 3"], ["type", "search", "placeholder", "Search ref, client or job\u2026", 3, "input", "value"], [1, "empty-tab"], [1, "requests"], [1, "table-wrap"], ["role", "tab", 1, "tab", 3, "click"], [1, "tab__count", 3, "tab__count--alert"], [1, "tab__count"], [1, "request"], [1, "request__main"], [1, "request__who"], [1, "request__when"], [1, "request__price"], [1, "request__actions"], [1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"], [1, "btn", "btn--sm", "btn--ghost", 3, "click", "disabled"], [1, "table"], [3, "row--external", "row--next"], [1, "cell--mono"], [1, "ref-link", 3, "click"], [1, "next-badge"], [1, "cell--client"], [1, "cell--title"], [1, "cell--date"], [1, "when__abs"], [1, "when__rel"], [1, "pay-cell"], [1, "badge", 3, "ngClass"], [1, "pay-cell__amt"], [1, "badge", "badge--status"], [1, "cell--actions"], [1, "link-btn"], [1, "row-actions"], [1, "link-btn", 3, "click"], ["aria-label", "More actions", 1, "kebab", 3, "cdkMenuTriggerFor", "disabled"], ["viewBox", "0 0 20 20", "width", "18", "height", "18", "fill", "currentColor"], ["cx", "10", "cy", "4", "r", "1.7"], ["cx", "10", "cy", "10", "r", "1.7"], ["cx", "10", "cy", "16", "r", "1.7"], ["cdkMenu", "", 1, "menu"], ["cdkMenuItem", "", 1, "menu__item", 3, "click"], ["cdkMenuItem", "", 1, "menu__item"], ["cdkMenuItem", "", 1, "menu__item", "menu__item--danger"], ["cdkMenuItem", "", 1, "menu__item", "menu__item--danger", 3, "click"]], template: function BookingListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
        \u0275\u0275text(4, "Bookings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "All jobs, shoots and appointments");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "a", 5);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 6);
        \u0275\u0275element(9, "path", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275text(10, " New booking ");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "span", 10);
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "span", 11);
        \u0275\u0275text(16, "Confirmed bookings");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 9)(18, "span", 10);
        \u0275\u0275text(19);
        \u0275\u0275pipe(20, "currency");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 11);
        \u0275\u0275text(22, "Expected revenue");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div", 9)(24, "span", 10);
        \u0275\u0275text(25);
        \u0275\u0275pipe(26, "currency");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "span", 11);
        \u0275\u0275text(28, "Collected");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 9)(30, "span", 10);
        \u0275\u0275text(31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "span", 11);
        \u0275\u0275text(33, "Awaiting payment");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(34, BookingListComponent_Conditional_34_Template, 2, 0, "div", 12)(35, BookingListComponent_Conditional_35_Template, 8, 0, "div", 13)(36, BookingListComponent_Conditional_36_Template, 12, 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(14);
        \u0275\u0275textInterpolate(ctx.confirmedJobs().length);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(20, 7, ctx.expectedRevenue(), "EUR", "symbol", "1.0-0"));
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(26, 12, ctx.collected(), "EUR", "symbol", "1.0-0"));
        \u0275\u0275advance(4);
        \u0275\u0275classProp("stat--warn", ctx.unpaidCount() > 0);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.unpaidCount());
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.data.loading() ? 34 : ctx.data.bookings().length === 0 ? 35 : 36);
      }
    }, dependencies: [RouterLink, NgClass, DatePipe, CurrencyPipe, CdkMenuTrigger, CdkMenu, CdkMenuItem], styles: ['\n\n.page[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  padding: 36px 48px;\n}\n@media (max-width: 900px) {\n  .page[_ngcontent-%COMP%] {\n    padding: 24px 20px;\n  }\n}\n.page__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 28px;\n}\n.page__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0 0 4px;\n  letter-spacing: -0.02em;\n}\n.page__sub[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: #475569;\n  margin: 0;\n}\n.stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n}\n.stat[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 18px 22px;\n  min-width: 140px;\n  flex: 1;\n}\n.stat__value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 24px;\n  font-weight: 700;\n  color: #0f172a;\n  letter-spacing: -0.03em;\n  line-height: 1.1;\n}\n.stat__label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: #94a3b8;\n  margin-top: 4px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.stat--warn[_ngcontent-%COMP%]   .stat__value[_ngcontent-%COMP%] {\n  color: #f97316;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 18px;\n  flex-wrap: wrap;\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n  flex-wrap: wrap;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 4px;\n}\n.tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 7px 14px;\n  border: none;\n  background: none;\n  cursor: pointer;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 13px;\n  font-weight: 600;\n  color: #475569;\n  border-radius: 8px;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.tab[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n.tab--active[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: #0f172a;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);\n}\n.tab__count[_ngcontent-%COMP%] {\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 9px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  font-weight: 700;\n  background: #e2e8f0;\n  color: #475569;\n}\n.tab--active[_ngcontent-%COMP%]   .tab__count[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.12);\n  color: #0f172a;\n}\n.tab__count--alert[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.search[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 0 12px;\n  min-width: 220px;\n  transition: border-color 0.15s ease;\n}\n.search[_ngcontent-%COMP%]:focus-within {\n  border-color: #F4A922;\n}\n.search[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  color: #94a3b8;\n  flex-shrink: 0;\n}\n.search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  outline: none;\n  background: none;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 13.5px;\n  color: #0f172a;\n  padding: 9px 0;\n  width: 100%;\n}\n.search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #94a3b8;\n}\n.empty-tab[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 48px 24px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 14px;\n}\n.table-wrap[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  overflow: hidden;\n  overflow-x: auto;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  text-align: left;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #94a3b8;\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n  white-space: nowrap;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 11px 14px;\n  font-size: 13.5px;\n  color: #475569;\n  border-bottom: 1px solid #e2e8f0;\n  white-space: nowrap;\n}\n.table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #fafbfc;\n}\n.row--external[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n.cell--mono[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Mono",\n    monospace;\n  font-size: 12.5px;\n  color: #0f172a;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.cell--client[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n}\n.cell--title[_ngcontent-%COMP%] {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #0f172a;\n}\n.cell--date[_ngcontent-%COMP%]   .when__abs[_ngcontent-%COMP%] {\n  display: block;\n  color: #0f172a;\n}\n.cell--date[_ngcontent-%COMP%]   .when__rel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11.5px;\n  color: #94a3b8;\n  margin-top: 1px;\n}\n.row--next[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.12);\n}\n.row--next[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.12);\n}\n.next-badge[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  padding: 1px 7px;\n  border-radius: 20px;\n  background: #F4A922;\n  color: #000;\n  font-size: 9.5px;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  vertical-align: middle;\n}\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 3px 9px;\n  border-radius: 20px;\n  font-size: 11.5px;\n  font-weight: 600;\n}\n.badge--paid[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.badge--partial[_ngcontent-%COMP%] {\n  background: #fef9c3;\n  color: #a16207;\n}\n.badge--unpaid[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.badge--external[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.badge--status[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 9px 18px;\n  border-radius: 8px;\n  font-size: 13.5px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  border: 1.5px solid transparent;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  text-decoration: none;\n}\n.btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #F4A922;\n  border-color: #F4A922;\n  color: #000;\n}\n.btn--primary[_ngcontent-%COMP%]:hover {\n  filter: brightness(0.92);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-color: #e2e8f0;\n  color: #475569;\n}\n.btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #94a3b8;\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 7px 14px;\n  font-size: 12.5px;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.requests[_ngcontent-%COMP%] {\n  margin-bottom: 26px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-left: 3px solid #F4A922;\n  border-radius: 12px;\n  padding: 16px 18px;\n}\n.requests__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  margin: 0 0 12px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.requests__count[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #000;\n  font-size: 12px;\n  font-weight: 700;\n  min-width: 20px;\n  height: 20px;\n  padding: 0 6px;\n  border-radius: 10px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.request[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 10px 0;\n}\n.request[_ngcontent-%COMP%]    + .request[_ngcontent-%COMP%] {\n  border-top: 1px solid #e2e8f0;\n}\n.request__main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.request__who[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n}\n.request__when[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #475569;\n}\n.request__price[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.request__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.cell--actions[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.ref-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  font-family:\n    "SF Mono",\n    "Fira Mono",\n    monospace;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #0f172a;\n}\n.ref-link[_ngcontent-%COMP%]:hover {\n  color: #F4A922;\n  text-decoration: underline;\n}\n.pay-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  align-items: flex-start;\n}\n.pay-cell__amt[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #94a3b8;\n  font-weight: 600;\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n}\n.kebab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  padding: 0;\n  background: none;\n  border: none;\n  border-radius: 6px;\n  color: #64748b;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.kebab[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n  color: #0f172a;\n}\n.kebab[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.kebab[aria-expanded=true][_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #0f172a;\n}\n.link-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #F4A922;\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 6px;\n  transition: background 0.15s ease;\n  font-family: inherit;\n}\n.link-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(244, 169, 34, 0.12);\n}\n.link-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.link-btn--danger[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.link-btn--danger[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.menu[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 168px;\n  padding: 6px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.14);\n}\n.menu__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 12px;\n  text-align: left;\n  background: none;\n  border: none;\n  border-radius: 6px;\n  font-family: inherit;\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #475569;\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.menu__item[_ngcontent-%COMP%]:hover, \n.menu__item[_ngcontent-%COMP%]:focus-visible {\n  background: #f8fafc;\n  color: #0f172a;\n  outline: none;\n}\n.menu__item--danger[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.menu__item--danger[_ngcontent-%COMP%]:hover, \n.menu__item--danger[_ngcontent-%COMP%]:focus-visible {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 2.5px solid #e2e8f0;\n  border-top-color: #F4A922;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 14px;\n  padding: 64px 40px;\n  color: #94a3b8;\n  text-align: center;\n}\n.empty[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  opacity: 0.35;\n}\n.empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n  max-width: 300px;\n}\n/*# sourceMappingURL=booking-list.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookingListComponent, { className: "BookingListComponent", filePath: "src/app/booking/platform/bookings/booking-list/booking-list.component.ts", lineNumber: 36 });
})();
export {
  BookingListComponent
};
//# sourceMappingURL=chunk-TYTUWSU3.js.map
