import {
  AvailabilityService
} from "./chunk-QDE3O2RP.js";
import {
  currencySymbol
} from "./chunk-NUQ3PGB2.js";
import {
  servicePrice
} from "./chunk-DEXNZGWM.js";
import {
  ClientPortalService
} from "./chunk-VT7SHWSZ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-TEK6OFIA.js";
import {
  BookingOrgService
} from "./chunk-73RTIDAE.js";
import "./chunk-3A2C4JCE.js";
import "./chunk-5PW2HKAJ.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-K7AGV7TU.js";
import "./chunk-AMJW2RV7.js";
import {
  computed,
  inject,
  signal,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2FJZNSO2.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/public/booking-checkout/booking-checkout.component.ts
function BookingCheckoutComponent_Conditional_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.currencySymbol(), "", ctx_r1.price(), "");
  }
}
function BookingCheckoutComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "button", 4);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Conditional_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToCalendar());
    });
    \u0275\u0275text(2, "\u2039");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 5)(4, "div", 6);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 7);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, BookingCheckoutComponent_Conditional_1_Conditional_8_Template, 2, 2, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.slotDay());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.slotTime(), " \xB7 ", ctx_r1.hours, "h");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.price() !== null ? 8 : -1);
  }
}
function BookingCheckoutComponent_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1, "Checking the slot\u2026");
    \u0275\u0275elementEnd();
  }
}
function BookingCheckoutComponent_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "h2", 9);
    \u0275\u0275text(2, "That slot was just taken");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 10);
    \u0275\u0275text(4, "Someone grabbed this time while you were deciding. Pick another \u2014 there's plenty.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 11);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Case_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToCalendar());
    });
    \u0275\u0275text(6, "Back to calendar");
    \u0275\u0275elementEnd()();
  }
}
function BookingCheckoutComponent_Case_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "\u2713 Check your inbox \u2014 we sent a sign-in link to ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ".");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.email);
  }
}
function BookingCheckoutComponent_Case_4_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 15)(1, "span");
    \u0275\u0275text(2, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function BookingCheckoutComponent_Case_4_Conditional_10_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.email, $event) || (ctx_r1.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 17);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Case_4_Conditional_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sendMagicLink());
    });
    \u0275\u0275text(5, "Email me a sign-in link");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.email);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.email.trim());
  }
}
function BookingCheckoutComponent_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 9);
    \u0275\u0275text(1, "Sign in to book");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 10);
    \u0275\u0275text(3, "Just so we know who the booking is for \u2014 and so we can send your confirmation and invoice.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 12);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Case_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signInGoogle());
    });
    \u0275\u0275text(5, "Continue with Google");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 13)(7, "span");
    \u0275\u0275text(8, "or");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, BookingCheckoutComponent_Case_4_Conditional_9_Template, 5, 1, "p", 14)(10, BookingCheckoutComponent_Case_4_Conditional_10_Template, 6, 2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r1.magicSent() ? 9 : 10);
  }
}
function BookingCheckoutComponent_Case_5_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Case_5_Conditional_33_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startCard("deposit"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.canSubmit() || ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" Pay ", ctx_r1.depositPct(), "% deposit \xB7 ", ctx_r1.currencySymbol(), "", ctx_r1.deposit(), " ");
  }
}
function BookingCheckoutComponent_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 9);
    \u0275\u0275text(1, "Your details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 10);
    \u0275\u0275text(3, "For your invoice. You can reuse these next time.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label", 15)(5, "span");
    \u0275\u0275text(6, "Full name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function BookingCheckoutComponent_Case_5_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.name, $event) || (ctx_r1.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "label", 15)(9, "span");
    \u0275\u0275text(10, "Email (invoice)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function BookingCheckoutComponent_Case_5_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.email, $event) || (ctx_r1.form.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label", 15)(13, "span");
    \u0275\u0275text(14, "Company ");
    \u0275\u0275elementStart(15, "em", 19);
    \u0275\u0275text(16, "optional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function BookingCheckoutComponent_Case_5_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.company, $event) || (ctx_r1.form.company = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "label", 15)(19, "span");
    \u0275\u0275text(20, "VAT / tax number ");
    \u0275\u0275elementStart(21, "em", 19);
    \u0275\u0275text(22, "optional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function BookingCheckoutComponent_Case_5_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.vat, $event) || (ctx_r1.form.vat = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "label", 15)(25, "span");
    \u0275\u0275text(26, "Billing address ");
    \u0275\u0275elementStart(27, "em", 19);
    \u0275\u0275text(28, "optional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "textarea", 22);
    \u0275\u0275twoWayListener("ngModelChange", function BookingCheckoutComponent_Case_5_Template_textarea_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.address, $event) || (ctx_r1.form.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 23)(31, "button", 17);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Case_5_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startCard("full"));
    });
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, BookingCheckoutComponent_Case_5_Conditional_33_Template, 2, 4, "button", 24);
    \u0275\u0275elementStart(34, "div", 13)(35, "span");
    \u0275\u0275text(36, "or");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "button", 25);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Case_5_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitCashRequest());
    });
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "p", 26);
    \u0275\u0275text(40, "Card: deposit or full confirms your booking instantly. Cash: we confirm before the slot is reserved.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.email);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.company);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.vat);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.address);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.canSubmit() || ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Pay in full \xB7 ", ctx_r1.currencySymbol(), "", ctx_r1.price(), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.depositAllowed() ? 33 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.canSubmit() || ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitting() ? "Sending\u2026" : "Request & pay cash on the day", " ");
  }
}
function BookingCheckoutComponent_Case_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.cardError());
  }
}
function BookingCheckoutComponent_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 9);
    \u0275\u0275text(1, "Payment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 28);
    \u0275\u0275template(5, BookingCheckoutComponent_Case_6_Conditional_5_Template, 2, 1, "p", 29);
    \u0275\u0275elementStart(6, "button", 11);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Case_6_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.payNow());
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Paying ", ctx_r1.currencySymbol(), "", ctx_r1.cardAmount.toFixed(2), " \u2014 your slot is held for 15 minutes.");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.cardError() ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Pay ", ctx_r1.currencySymbol(), "", ctx_r1.cardAmount.toFixed(2), "");
  }
}
function BookingCheckoutComponent_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 30);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 9);
    \u0275\u0275text(4, "Request sent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 10);
    \u0275\u0275text(6, " Your request ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " is in. We'll confirm it shortly and the slot is held for you once approved. You'll get an email either way. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "a", 31);
    \u0275\u0275text(11, "View my bookings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 32);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Case_7_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToCalendar());
    });
    \u0275\u0275text(13, "Book another");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.bookingRef());
  }
}
function BookingCheckoutComponent_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "h2", 9);
    \u0275\u0275text(2, "Something went wrong");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 10);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 11);
    \u0275\u0275listener("click", function BookingCheckoutComponent_Case_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToCalendar());
    });
    \u0275\u0275text(6, "Back to calendar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.errorMsg());
  }
}
var STRIPE_PK = "pk_live_51ShRJTAXI0tdCXi3HuEvh9PuIVMFTjqRlMQwsg8pqMlhACOXGKAiATxj9MzW268hs9RV6RvCb5FP1bIFHuNlZkBG007LHcSnOB";
var BookingCheckoutComponent = class _BookingCheckoutComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.portal = inject(ClientPortalService);
    this.availability = inject(AvailabilityService);
    this.bookingOrg = inject(BookingOrgService);
    this.step = signal("loading");
    this.errorMsg = signal(null);
    this.orgId = "";
    this.orgSlug = "";
    this.serviceId = "";
    this.staffId = "";
    this.startIso = "";
    this.hours = 0;
    this.price = signal(null);
    this.timezone = signal("Europe/Malta");
    this.currencySymbol = signal("\u20AC");
    this.depositPct = signal(30);
    this.depositAllowed = signal(true);
    this.email = "";
    this.magicSent = signal(false);
    this.form = { name: "", email: "", company: "", vat: "", address: "" };
    this.submitting = signal(false);
    this.bookingRef = signal(null);
    this.deposit = computed(() => Math.round((this.price() ?? 0) * this.depositPct()) / 100);
    this.cardError = signal(null);
    this.cardAmount = 0;
    this.stripe = null;
    this.elements = null;
    this.paymentElement = null;
    this.slotDay = computed(() => this.startIso ? new Date(this.startIso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: this.timezone() }) : "");
    this.slotTime = computed(() => this.startIso ? new Date(this.startIso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: this.timezone() }) : "");
  }
  /** Build a path into the booking flow, prefixed with the org slug when present. */
  bookPath(...rest) {
    return this.orgSlug ? ["/", this.orgSlug, "book", ...rest] : ["/book", ...rest];
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const qp = this.route.snapshot.queryParamMap;
      this.orgSlug = this.route.snapshot.paramMap.get("org") ?? "";
      this.serviceId = qp.get("service") ?? "";
      this.staffId = qp.get("staff") ?? "";
      this.startIso = qp.get("start") ?? "";
      this.hours = Number(qp.get("hours") ?? 0);
      if (!this.serviceId || !this.staffId || !this.startIso || !this.hours) {
        this.router.navigate(this.bookPath());
        return;
      }
      yield this.portal.init();
      const orgData = yield this.bookingOrg.load(this.orgSlug || void 0);
      if (!orgData) {
        this.errorMsg.set("Could not load the booking page.");
        this.step.set("error");
        return;
      }
      this.orgId = orgData.org.id;
      this.currencySymbol.set(currencySymbol(orgData.org.currency) ?? "\u20AC");
      this.depositPct.set(orgData.org.booking_params.deposit_percent ?? 30);
      this.depositAllowed.set(orgData.org.booking_params.deposit_allowed ?? true);
      try {
        const date = new Date(this.startIso).toLocaleDateString("en-CA", { timeZone: orgData.org.timezone });
        const res = yield this.availability.getAvailability(this.staffId, this.serviceId, date, date);
        this.timezone.set(res.timezone);
        this.price.set(servicePrice(res.pricing, this.hours));
        const daySlots = res.days.find((d) => d.date === date)?.slots ?? [];
        const startIdx = daySlots.findIndex((s) => s.start === this.startIso);
        const span = startIdx >= 0 ? daySlots.slice(startIdx, startIdx + this.hours) : [];
        const stillFree = span.length === this.hours && span.every((s) => s.available) && span.every((s, i) => i === 0 || s.hour === span[i - 1].hour + 1);
        if (!stillFree) {
          this.step.set("unavailable");
          return;
        }
      } catch (err) {
        console.error("[Checkout] slot check failed:", err);
        this.errorMsg.set("Could not load this slot. Please try again.");
        this.step.set("error");
        return;
      }
      if (this.portal.signedIn())
        yield this.enterDetails();
      else
        this.step.set("signin");
    });
  }
  enterDetails() {
    return __async(this, null, function* () {
      const p = yield this.portal.loadMyProfile(this.orgId);
      this.form = {
        name: p?.name ?? "",
        email: p?.email ?? this.portal.user()?.email ?? "",
        company: p?.company ?? "",
        vat: p?.vat_number ?? "",
        address: p?.billing_address ?? ""
      };
      this.step.set("details");
    });
  }
  redirectPath() {
    return window.location.pathname + window.location.search;
  }
  signInGoogle() {
    return __async(this, null, function* () {
      yield this.portal.signInWithGoogle(this.redirectPath());
    });
  }
  sendMagicLink() {
    return __async(this, null, function* () {
      const e = this.email.trim();
      if (!e)
        return;
      yield this.portal.signInWithEmail(e, this.redirectPath());
      this.magicSent.set(true);
    });
  }
  canSubmit() {
    const f = this.form;
    return !!(f.name.trim() && f.email.trim());
  }
  submitCashRequest() {
    return __async(this, null, function* () {
      if (!this.canSubmit() || this.submitting())
        return;
      this.submitting.set(true);
      this.errorMsg.set(null);
      try {
        yield this.portal.upsertProfile(this.orgId, this.form);
        const { booking_ref } = yield this.portal.createBookingRequest(this.orgId, this.staffId, this.serviceId, this.startIso, this.hours);
        this.bookingRef.set(booking_ref);
        this.step.set("done");
      } catch (err) {
        console.error("[Checkout] request failed:", err);
        this.errorMsg.set(err?.message ?? "Could not submit your request.");
        this.step.set("error");
      } finally {
        this.submitting.set(false);
      }
    });
  }
  startCard(type) {
    return __async(this, null, function* () {
      if (!this.canSubmit() || this.submitting())
        return;
      this.submitting.set(true);
      this.errorMsg.set(null);
      this.cardError.set(null);
      try {
        yield this.portal.upsertProfile(this.orgId, this.form);
        const res = yield this.portal.startCardBooking(this.staffId, this.serviceId, this.startIso, this.hours, type);
        if (res.error === "slot_taken") {
          this.step.set("unavailable");
          return;
        }
        if (res.error || !res.clientSecret)
          throw new Error(res.error ?? "Could not start payment.");
        this.cardAmount = type === "deposit" ? this.deposit() : this.price() ?? 0;
        this.bookingRef.set(res.bookingRef ?? null);
        yield this.loadStripe(res.stripeAccount);
        this.elements = this.stripe.elements({ clientSecret: res.clientSecret, appearance: { theme: "stripe" } });
        this.paymentElement = this.elements.create("payment");
        this.step.set("paying");
        setTimeout(() => this.paymentElement.mount("#payment-element"), 50);
      } catch (err) {
        console.error("[Checkout] startCard failed:", err);
        this.errorMsg.set(err?.message ?? "Could not start payment.");
        this.step.set("error");
      } finally {
        this.submitting.set(false);
      }
    });
  }
  payNow() {
    return __async(this, null, function* () {
      if (!this.stripe || !this.elements)
        return;
      this.cardError.set(null);
      const params = new URLSearchParams({ ref: this.bookingRef() ?? "", amount: this.cardAmount.toFixed(2), type: "self-serve" });
      const { error } = yield this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: { return_url: `${window.location.origin}/pay/success?${params.toString()}` }
      });
      if (error)
        this.cardError.set(error.message ?? "Payment failed.");
    });
  }
  // For a direct charge on the org's connected account, Stripe.js MUST be initialized
  // with { stripeAccount }; for the platform fallback (no connected account) it isn't.
  loadStripe(stripeAccount) {
    return __async(this, null, function* () {
      if (!window.Stripe) {
        yield new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://js.stripe.com/v3/";
          s.onload = () => resolve();
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      if (!this.stripe) {
        this.stripe = stripeAccount ? window.Stripe(STRIPE_PK, { stripeAccount }) : window.Stripe(STRIPE_PK);
      }
    });
  }
  backToCalendar() {
    this.router.navigate(this.bookPath("calendar"), { queryParams: { service: this.serviceId, staff: this.staffId } });
  }
  static {
    this.\u0275fac = function BookingCheckoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingCheckoutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingCheckoutComponent, selectors: [["app-booking-checkout"]], decls: 9, vars: 2, consts: [[1, "co"], [1, "slot"], [1, "co__msg"], [1, "co__center"], ["aria-label", "Back", 1, "slot__back", 3, "click"], [1, "slot__info"], [1, "slot__day"], [1, "slot__time"], [1, "slot__price"], [1, "co__h"], [1, "co__p"], [1, "btn", "btn--primary", 3, "click"], [1, "btn", "btn--google", 3, "click"], [1, "divider"], [1, "co__sent"], [1, "field"], ["type", "email", "placeholder", "you@example.com", 3, "ngModelChange", "ngModel"], [1, "btn", "btn--primary", 3, "click", "disabled"], ["type", "text", "placeholder", "Jane Doe", 3, "ngModelChange", "ngModel"], [1, "field__opt"], ["type", "text", "placeholder", "Company name", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "MT12345678", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "Street, city, postcode, country", 3, "ngModelChange", "ngModel"], [1, "actions"], [1, "btn", "btn--outline", 3, "disabled"], [1, "btn", "btn--ghost", 3, "click", "disabled"], [1, "actions__note"], [1, "btn", "btn--outline", 3, "click", "disabled"], ["id", "payment-element", 1, "stripe-mount"], [1, "book__error", "co__cardErr"], [1, "co__tick"], ["href", "/book/mine", 1, "btn", "btn--primary"], [1, "btn", "btn--ghost", 3, "click"]], template: function BookingCheckoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, BookingCheckoutComponent_Conditional_1_Template, 9, 4, "div", 1)(2, BookingCheckoutComponent_Case_2_Template, 2, 0, "p", 2)(3, BookingCheckoutComponent_Case_3_Template, 7, 0, "div", 3)(4, BookingCheckoutComponent_Case_4_Template, 11, 1)(5, BookingCheckoutComponent_Case_5_Template, 41, 11)(6, BookingCheckoutComponent_Case_6_Template, 8, 5)(7, BookingCheckoutComponent_Case_7_Template, 14, 1, "div", 3)(8, BookingCheckoutComponent_Case_8_Template, 7, 1, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_1_0;
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.step() !== "loading" && ctx.step() !== "error" ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_1_0 = ctx.step()) === "loading" ? 2 : tmp_1_0 === "unavailable" ? 3 : tmp_1_0 === "signin" ? 4 : tmp_1_0 === "details" ? 5 : tmp_1_0 === "paying" ? 6 : tmp_1_0 === "done" ? 7 : tmp_1_0 === "error" ? 8 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  background: #f8fafc;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  color: #0f172a;\n}\n.co[_ngcontent-%COMP%] {\n  max-width: 460px;\n  margin: 0 auto;\n  padding: 24px 20px 80px;\n}\n.co__msg[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #475569;\n  padding: 60px 0;\n}\n.co__h[_ngcontent-%COMP%] {\n  font-size: 21px;\n  font-weight: 800;\n  letter-spacing: -0.02em;\n  margin: 4px 0 6px;\n}\n.co__p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #475569;\n  margin: 0 0 20px;\n  line-height: 1.5;\n}\n.co__center[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 30px 0;\n}\n.co__sent[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #0f172a;\n  background: rgba(244, 169, 34, 0.12);\n  padding: 14px;\n  border-radius: 8px;\n}\n.co__tick[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  margin: 0 auto 14px;\n  border-radius: 50%;\n  background: #F4A922;\n  color: #fff;\n  font-size: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.slot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 12px 14px;\n  margin-bottom: 22px;\n}\n.slot__back[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex: none;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  background: #ffffff;\n  font-size: 18px;\n  line-height: 1;\n  cursor: pointer;\n  color: #0f172a;\n}\n.slot__info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.slot__day[_ngcontent-%COMP%] {\n  font-size: 14.5px;\n  font-weight: 700;\n}\n.slot__time[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #475569;\n}\n.slot__price[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 800;\n  color: #F4A922;\n}\n.field[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 14px;\n}\n.field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: #475569;\n  margin-bottom: 5px;\n}\n.field__opt[_ngcontent-%COMP%] {\n  font-style: normal;\n  font-weight: 500;\n  color: #94a3b8;\n  font-size: 11px;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 11px 12px;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14.5px;\n  font-family: inherit;\n  color: #0f172a;\n  background: #ffffff;\n  transition: 0.15s ease;\n  resize: vertical;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #F4A922;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: #94a3b8;\n}\n.btn[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 13px 16px;\n  border-radius: 8px;\n  font-size: 14.5px;\n  font-weight: 700;\n  cursor: pointer;\n  border: 1.5px solid transparent;\n  transition: 0.15s ease;\n  margin-bottom: 10px;\n  text-align: center;\n  text-decoration: none;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #0f172a;\n}\n.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  filter: brightness(1.05);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: #0f172a;\n  border-color: #e2e8f0;\n}\n.btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #94a3b8;\n}\n.btn--outline[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.12);\n  color: #0f172a;\n  border-color: #F4A922;\n}\n.btn--outline[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(244, 169, 34, 0.2);\n}\n.btn--google[_ngcontent-%COMP%] {\n  background: #0f172a;\n  color: #fff;\n}\n.btn--google[_ngcontent-%COMP%]:hover {\n  background: #1e293b;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.stripe-mount[_ngcontent-%COMP%] {\n  margin: 6px 0 18px;\n  min-height: 40px;\n}\n.co__cardErr[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.actions[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.actions__note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n  text-align: center;\n  margin: 4px 0 0;\n}\n.divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 18px 0;\n  color: #94a3b8;\n  font-size: 12px;\n}\n.divider[_ngcontent-%COMP%]::before, \n.divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: #e2e8f0;\n}\n/*# sourceMappingURL=booking-checkout.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookingCheckoutComponent, { className: "BookingCheckoutComponent", filePath: "src/app/booking/public/booking-checkout/booking-checkout.component.ts", lineNumber: 22 });
})();
export {
  BookingCheckoutComponent
};
//# sourceMappingURL=chunk-HCN7V7PW.js.map
