import {
  BookingInvoiceComponent
} from "./chunk-3VJLQFKW.js";
import {
  ActivatedRoute
} from "./chunk-ZDNO6UPP.js";
import "./chunk-KJHSNOMD.js";
import {
  bookingsDb
} from "./chunk-QQIZI4YX.js";
import "./chunk-XS6RPKEZ.js";
import {
  CommonModule,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-W3IDOWRJ.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/public/payment-success/payment-success.component.ts
function PaymentSuccessComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 2);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading invoice\u2026");
    \u0275\u0275elementEnd()();
  }
}
function PaymentSuccessComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 5);
    \u0275\u0275element(3, "circle", 6)(4, "path", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h1", 8);
    \u0275\u0275text(6, "Payment received!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 9);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(9, "app-booking-invoice", 10);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.depositMessage);
    \u0275\u0275advance();
    \u0275\u0275property("invoice", ctx_r0.invoice());
  }
}
function toSingle(val) {
  if (!val)
    return null;
  return Array.isArray(val) ? val[0] ?? null : val;
}
function toInvoice(b, amountPaid, paymentType) {
  return {
    ref: b.booking_ref,
    title: b.title,
    description: b.description,
    location: b.location,
    startAt: b.start_at,
    endAt: b.end_at,
    priceTotal: b.price_total,
    priceExpenses: b.price_expenses,
    amountPaid,
    balanceDue: Math.max(0, b.price_total - amountPaid),
    paymentType,
    paidAt: /* @__PURE__ */ new Date()
  };
}
var PaymentSuccessComponent = class _PaymentSuccessComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.platformId = inject(PLATFORM_ID);
    this.invoice = signal(null);
    this.loading = signal(true);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      if (isPlatformBrowser(this.platformId)) {
        document.title = "Payment Confirmed | JM Bookings";
      }
      if (!isPlatformBrowser(this.platformId))
        return;
      const params = this.route.snapshot.queryParamMap;
      const tok = params.get("tok");
      const amountPaid = parseFloat(params.get("amount") ?? "0");
      const paymentType = params.get("type") ?? "full";
      if (tok) {
        yield this.loadFromToken(tok, amountPaid, paymentType);
      } else {
        const intentId = params.get("payment_intent");
        if (intentId)
          yield this.loadFromPaymentIntent(intentId);
        else
          this.loading.set(false);
      }
    });
  }
  loadFromToken(tok, amountPaid, paymentType) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("booking_links").select("bookings(booking_ref, title, description, location, start_at, end_at, price_total, price_expenses)").eq("token", tok).single();
      const b = toSingle(data?.bookings);
      if (b)
        this.invoice.set(toInvoice(b, amountPaid, paymentType));
      this.loading.set(false);
    });
  }
  loadFromPaymentIntent(intentId) {
    return __async(this, null, function* () {
      const { data } = yield bookingsDb.from("payments").select("amount, type, bookings(booking_ref, title, description, location, start_at, end_at, price_total, price_expenses)").eq("stripe_payment_intent_id", intentId).single();
      const b = toSingle(data?.bookings);
      if (b && data) {
        this.invoice.set(toInvoice(b, data.amount, data.type));
      }
      this.loading.set(false);
    });
  }
  get depositMessage() {
    const inv = this.invoice();
    if (!inv)
      return "";
    return inv.paymentType === "deposit" ? `Your 30% deposit has been received. The remaining balance of \u20AC${inv.balanceDue.toFixed(2)} is due on the day.` : `Full payment confirmed. You're all set \u2014 see you soon!`;
  }
  static {
    this.\u0275fac = function PaymentSuccessComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaymentSuccessComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentSuccessComponent, selectors: [["app-payment-success"]], decls: 3, vars: 1, consts: [[1, "success-page"], [1, "loading-state"], [1, "spinner"], [1, "success-banner", "no-print"], [1, "check-wrap"], ["viewBox", "0 0 52 52", "fill", "none", 1, "check-icon"], ["cx", "26", "cy", "26", "r", "25", "stroke", "#F4A922", "stroke-width", "2", 1, "check-circle"], ["d", "M14 26l9 9 15-17", "stroke", "#F4A922", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "check-mark"], [1, "success-title"], [1, "success-sub"], [3, "invoice"]], template: function PaymentSuccessComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, PaymentSuccessComponent_Conditional_1_Template, 4, 0, "div", 1)(2, PaymentSuccessComponent_Conditional_2_Template, 10, 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 1 : 2);
      }
    }, dependencies: [CommonModule, BookingInvoiceComponent], styles: ["\n\n.success-page[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background: var(--color-bg-light);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 48px 24px 64px;\n  gap: 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  gap: 16px;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-muted);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.success-banner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.check-wrap[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.check-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n}\n.check-circle[_ngcontent-%COMP%] {\n  stroke-dasharray: 160;\n  stroke-dashoffset: 160;\n  animation: _ngcontent-%COMP%_draw-circle 0.6s ease forwards;\n}\n.check-mark[_ngcontent-%COMP%] {\n  stroke-dasharray: 40;\n  stroke-dashoffset: 40;\n  animation: _ngcontent-%COMP%_draw-check 0.4s ease 0.55s forwards;\n}\n@keyframes _ngcontent-%COMP%_draw-circle {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_draw-check {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n.success-title[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  letter-spacing: -0.5px;\n  margin: 0 0 10px;\n}\n.success-sub[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-muted);\n  line-height: 1.7;\n  margin: 0;\n  max-width: 360px;\n}\n@media print {\n  .no-print[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .success-page[_ngcontent-%COMP%] {\n    background: #fff;\n    padding: 0;\n    min-height: auto;\n  }\n}\n/*# sourceMappingURL=payment-success.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentSuccessComponent, { className: "PaymentSuccessComponent", filePath: "src/app/booking/public/payment-success/payment-success.component.ts", lineNumber: 47 });
})();
export {
  PaymentSuccessComponent
};
//# sourceMappingURL=chunk-BKGIHS4P.js.map
