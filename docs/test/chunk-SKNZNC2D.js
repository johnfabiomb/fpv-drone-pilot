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
  ActivatedRoute
} from "./chunk-K7AGV7TU.js";
import "./chunk-AMJW2RV7.js";
import {
  DatePipe,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2FJZNSO2.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/public/my-bookings/my-bookings.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function MyBookingsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function MyBookingsComponent_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signOut());
    });
    \u0275\u0275text(1, "Sign out");
    \u0275\u0275elementEnd();
  }
}
function MyBookingsComponent_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function MyBookingsComponent_Case_6_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
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
function MyBookingsComponent_Case_6_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 10)(1, "span");
    \u0275\u0275text(2, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function MyBookingsComponent_Case_6_Conditional_8_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.email, $event) || (ctx_r1.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 12);
    \u0275\u0275listener("click", function MyBookingsComponent_Case_6_Conditional_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
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
function MyBookingsComponent_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Sign in to see your bookings and invoices.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 7);
    \u0275\u0275listener("click", function MyBookingsComponent_Case_6_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signInGoogle());
    });
    \u0275\u0275text(3, "Continue with Google");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "span");
    \u0275\u0275text(6, "or");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, MyBookingsComponent_Case_6_Conditional_7_Template, 5, 1, "p", 9)(8, MyBookingsComponent_Case_6_Conditional_8_Template, 6, 2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.magicSent() ? 7 : 8);
  }
}
function MyBookingsComponent_Case_7_Conditional_5_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, "\u2713 Saved");
    \u0275\u0275elementEnd();
  }
}
function MyBookingsComponent_Case_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 10)(2, "span");
    \u0275\u0275text(3, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function MyBookingsComponent_Case_7_Conditional_5_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.billing.name, $event) || (ctx_r1.billing.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "label", 10)(6, "span");
    \u0275\u0275text(7, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function MyBookingsComponent_Case_7_Conditional_5_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.billing.email, $event) || (ctx_r1.billing.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "label", 10)(10, "span");
    \u0275\u0275text(11, "Company ");
    \u0275\u0275elementStart(12, "em");
    \u0275\u0275text(13, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function MyBookingsComponent_Case_7_Conditional_5_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.billing.company, $event) || (ctx_r1.billing.company = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label", 10)(16, "span");
    \u0275\u0275text(17, "VAT number ");
    \u0275\u0275elementStart(18, "em");
    \u0275\u0275text(19, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function MyBookingsComponent_Case_7_Conditional_5_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.billing.vat, $event) || (ctx_r1.billing.vat = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "label", 22)(22, "span");
    \u0275\u0275text(23, "Billing address ");
    \u0275\u0275elementStart(24, "em");
    \u0275\u0275text(25, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "textarea", 23);
    \u0275\u0275twoWayListener("ngModelChange", function MyBookingsComponent_Case_7_Conditional_5_Template_textarea_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.billing.address, $event) || (ctx_r1.billing.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 24)(28, "button", 12);
    \u0275\u0275listener("click", function MyBookingsComponent_Case_7_Conditional_5_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveBilling());
    });
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, MyBookingsComponent_Case_7_Conditional_5_Conditional_30_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.billing.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.billing.email);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.billing.company);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.billing.vat);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.billing.address);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.canSaveBilling);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingProfile() ? "Saving\u2026" : "Save billing details", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.profileSaved() ? 30 : -1);
  }
}
function MyBookingsComponent_Case_7_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "p");
    \u0275\u0275text(2, "You don't have any bookings yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 26);
    \u0275\u0275text(4, "Book a session");
    \u0275\u0275elementEnd()();
  }
}
function MyBookingsComponent_Case_7_Conditional_7_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 \u20AC", b_r8.balance_due, " due");
  }
}
function MyBookingsComponent_Case_7_Conditional_7_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "\xB7 Paid");
    \u0275\u0275elementEnd();
  }
}
function MyBookingsComponent_Case_7_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28)(2, "span", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 32);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 33)(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, MyBookingsComponent_Case_7_Conditional_7_For_2_Conditional_14_Template, 2, 1, "span", 34)(15, MyBookingsComponent_Case_7_Conditional_7_For_2_Conditional_15_Template, 2, 0, "span", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 36);
    \u0275\u0275listener("click", function MyBookingsComponent_Case_7_Conditional_7_For_2_Template_button_click_16_listener() {
      const b_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openInvoice(b_r8));
    });
    \u0275\u0275text(17, "Invoice (PDF)");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(b_r8.booking_ref);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.statusClass(b_r8.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(b_r8.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 8, b_r8.start_at, "EEE d MMM y, HH:mm"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u20AC", b_r8.price_total, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(b_r8.balance_due > 0 && b_r8.total_paid > 0 ? 14 : b_r8.balance_due === 0 ? 15 : -1);
  }
}
function MyBookingsComponent_Case_7_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275repeaterCreate(1, MyBookingsComponent_Case_7_Conditional_7_For_2_Template, 18, 11, "div", 27, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.bookings());
  }
}
function MyBookingsComponent_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "button", 14);
    \u0275\u0275listener("click", function MyBookingsComponent_Case_7_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showBilling.set(!ctx_r1.showBilling()));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4, "(shown on your invoices)");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, MyBookingsComponent_Case_7_Conditional_5_Template, 31, 8, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, MyBookingsComponent_Case_7_Conditional_6_Template, 5, 0, "div", 17)(7, MyBookingsComponent_Case_7_Conditional_7_Template, 3, 0, "div", 18);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.showBilling() ? "\u25BE" : "\u25B8", " Billing details ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.showBilling() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.bookings().length === 0 ? 6 : 7);
  }
}
var STATUS_LABELS = {
  pending: "Awaiting approval",
  hold: "Reserving\u2026",
  booked: "Confirmed",
  in_progress: "In progress",
  done: "Completed",
  cancelled: "Cancelled",
  expired: "Expired"
};
var MyBookingsComponent = class _MyBookingsComponent {
  constructor() {
    this.portal = inject(ClientPortalService);
    this.bookingOrg = inject(BookingOrgService);
    this.route = inject(ActivatedRoute);
    this.step = signal("loading");
    this.bookings = signal([]);
    this.orgId = "";
    this.orgSlug = "";
    this.email = "";
    this.magicSent = signal(false);
    this.showBilling = signal(false);
    this.savingProfile = signal(false);
    this.profileSaved = signal(false);
    this.billing = { name: "", email: "", company: "", vat: "", address: "" };
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.orgSlug = this.route.snapshot.paramMap.get("org") ?? "";
      yield this.portal.init();
      if (this.portal.signedIn())
        yield this.load();
      else
        this.step.set("signin");
    });
  }
  load() {
    return __async(this, null, function* () {
      const org = yield this.bookingOrg.load(this.orgSlug || void 0);
      if (org) {
        this.orgId = org.org.id;
        this.bookings.set(yield this.portal.loadMyBookings(this.orgId));
        const p = yield this.portal.loadMyProfile(this.orgId);
        this.billing = {
          name: p?.name ?? "",
          email: p?.email ?? this.portal.user()?.email ?? "",
          company: p?.company ?? "",
          vat: p?.vat_number ?? "",
          address: p?.billing_address ?? ""
        };
      }
      this.step.set("list");
    });
  }
  redirectPath() {
    return this.orgSlug ? `/${this.orgSlug}/book/mine` : "/book/mine";
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
  signOut() {
    return __async(this, null, function* () {
      yield this.portal.signOut();
      this.bookings.set([]);
      this.step.set("signin");
    });
  }
  statusLabel(s) {
    return STATUS_LABELS[s] ?? s;
  }
  statusClass(s) {
    return `pill--${s}`;
  }
  /** Open the printable invoice (the get_invoice RPC authorizes this client). */
  openInvoice(b) {
    window.open(`/book/invoice/${b.id}`, "_blank", "noopener");
  }
  get canSaveBilling() {
    return !this.savingProfile() && this.billing.name.trim().length > 0 && this.billing.email.trim().length > 0;
  }
  saveBilling() {
    return __async(this, null, function* () {
      if (!this.orgId || !this.canSaveBilling)
        return;
      this.savingProfile.set(true);
      this.profileSaved.set(false);
      try {
        yield this.portal.upsertProfile(this.orgId, this.billing);
        this.profileSaved.set(true);
        setTimeout(() => this.profileSaved.set(false), 2500);
      } finally {
        this.savingProfile.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function MyBookingsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MyBookingsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyBookingsComponent, selectors: [["app-my-bookings"]], decls: 8, vars: 2, consts: [[1, "mb"], [1, "mb__head"], [1, "mb__title"], [1, "mb__signout"], [1, "mb__msg"], [1, "mb__signout", 3, "click"], [1, "mb__p"], [1, "btn", "btn--google", 3, "click"], [1, "divider"], [1, "mb__sent"], [1, "field"], ["type", "email", "placeholder", "you@example.com", 3, "ngModelChange", "ngModel"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "billing"], [1, "billing__toggle", 3, "click"], [1, "billing__hint"], [1, "billing__form"], [1, "mb__empty"], [1, "cards"], [3, "ngModelChange", "ngModel"], ["type", "email", 3, "ngModelChange", "ngModel"], ["placeholder", "MT\u2026", 3, "ngModelChange", "ngModel"], [1, "field", "field--wide"], ["rows", "2", "placeholder", "Street, town, postcode, country", 3, "ngModelChange", "ngModel"], [1, "billing__actions"], [1, "billing__ok"], ["href", "/book", 1, "btn", "btn--primary"], [1, "card"], [1, "card__top"], [1, "card__ref"], [1, "pill"], [1, "card__title"], [1, "card__when"], [1, "card__pay"], [1, "card__bal"], [1, "card__paid"], [1, "card__invoice", 3, "click"]], template: function MyBookingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1", 2);
        \u0275\u0275text(3, "My bookings");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, MyBookingsComponent_Conditional_4_Template, 2, 0, "button", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, MyBookingsComponent_Case_5_Template, 2, 0, "p", 4)(6, MyBookingsComponent_Case_6_Template, 9, 1)(7, MyBookingsComponent_Case_7_Template, 8, 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_1_0;
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.step() === "list" ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_1_0 = ctx.step()) === "loading" ? 5 : tmp_1_0 === "signin" ? 6 : tmp_1_0 === "list" ? 7 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  background: #f8fafc;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  color: #0f172a;\n}\n.mb[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 28px 20px 80px;\n}\n.mb__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.mb__title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  letter-spacing: -0.03em;\n  margin: 0;\n}\n.mb__signout[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #475569;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.mb__signout[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n.mb__msg[_ngcontent-%COMP%] {\n  color: #475569;\n  padding: 50px 0;\n  text-align: center;\n}\n.mb__p[_ngcontent-%COMP%] {\n  font-size: 14.5px;\n  color: #475569;\n  margin: 0 0 18px;\n}\n.mb__sent[_ngcontent-%COMP%] {\n  font-size: 14px;\n  background: rgba(244, 169, 34, 0.12);\n  padding: 14px;\n  border-radius: 8px;\n}\n.mb__empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 0;\n  color: #475569;\n}\n.mb__empty[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  display: inline-block;\n}\n.cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 16px;\n}\n.card__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.card__ref[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #94a3b8;\n  font-family: monospace;\n}\n.card__title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  margin-bottom: 2px;\n}\n.card__when[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #475569;\n  margin-bottom: 8px;\n}\n.card__pay[_ngcontent-%COMP%] {\n  font-size: 14.5px;\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.card__bal[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-weight: 600;\n  font-size: 13px;\n}\n.card__paid[_ngcontent-%COMP%] {\n  color: #16a34a;\n  font-weight: 600;\n  font-size: 13px;\n}\n.card__invoice[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.12);\n  border: none;\n  color: #0f172a;\n  font-size: 13px;\n  font-weight: 700;\n  padding: 9px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: 0.15s ease;\n}\n.card__invoice[_ngcontent-%COMP%]:hover {\n  background: rgba(244, 169, 34, 0.22);\n}\n.pill[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 20px;\n  background: #eef2f6;\n  color: #475569;\n}\n.pill--booked[_ngcontent-%COMP%], \n.pill--done[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n}\n.pill--pending[_ngcontent-%COMP%], \n.pill--hold[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.12);\n  color: #92600a;\n}\n.pill--cancelled[_ngcontent-%COMP%], \n.pill--expired[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n.pill--in_progress[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1d4ed8;\n}\n.btn[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 13px 16px;\n  border-radius: 8px;\n  font-size: 14.5px;\n  font-weight: 700;\n  cursor: pointer;\n  border: 1.5px solid transparent;\n  transition: 0.15s ease;\n  margin-bottom: 10px;\n  text-align: center;\n  text-decoration: none;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #0f172a;\n}\n.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  filter: brightness(1.05);\n}\n.btn--google[_ngcontent-%COMP%] {\n  background: #0f172a;\n  color: #fff;\n}\n.btn--google[_ngcontent-%COMP%]:hover {\n  background: #1e293b;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.field[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 14px;\n}\n.field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: #475569;\n  margin-bottom: 5px;\n}\n.field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  font-weight: 400;\n  color: #94a3b8;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 11px 12px;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14.5px;\n  font-family: inherit;\n  color: #0f172a;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #F4A922;\n}\n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.billing[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  background: #fff;\n}\n.billing__toggle[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 14px 16px;\n  font-size: 14px;\n  font-weight: 700;\n  color: #0f172a;\n  font-family: inherit;\n}\n.billing__hint[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #94a3b8;\n  font-size: 12.5px;\n}\n.billing__form[_ngcontent-%COMP%] {\n  padding: 0 16px 16px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0 14px;\n}\n.billing__actions[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.billing__actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  width: auto;\n  margin-bottom: 0;\n}\n.billing__ok[_ngcontent-%COMP%] {\n  color: #16a34a;\n  font-size: 13px;\n  font-weight: 600;\n}\n.field--wide[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n@media (max-width: 520px) {\n  .billing__form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 16px 0;\n  color: #94a3b8;\n  font-size: 12px;\n}\n.divider[_ngcontent-%COMP%]::before, \n.divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: #e2e8f0;\n}\n.invoice-view[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background: #f8fafc;\n}\n.invoice-view__back[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto;\n  max-width: 720px;\n  width: 100%;\n  background: none;\n  border: none;\n  color: #475569;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 18px 20px 0;\n  text-align: left;\n}\n.invoice-view__back[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n/*# sourceMappingURL=my-bookings.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyBookingsComponent, { className: "MyBookingsComponent", filePath: "src/app/booking/public/my-bookings/my-bookings.component.ts", lineNumber: 22 });
})();
export {
  MyBookingsComponent
};
//# sourceMappingURL=chunk-SKNZNC2D.js.map
