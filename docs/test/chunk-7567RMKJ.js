import {
  bookingsDb
} from "./chunk-5R6IZFLD.js";
import {
  ActivatedRoute
} from "./chunk-23WFKX7T.js";
import "./chunk-2VIPXXQC.js";
import "./chunk-WKMKAAWK.js";
import {
  CurrencyPipe,
  DatePipe,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-YX7TN7IZ.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/public/payment-success/payment-success.component.ts
function PaymentSuccessComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 2);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading your receipt\u2026");
    \u0275\u0275elementEnd()();
  }
}
function PaymentSuccessComponent_Conditional_2_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 19);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(6, 2, item_r1.amount, ctx_r1.currency, "symbol", "1.2-2"));
  }
}
function PaymentSuccessComponent_Conditional_2_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, "PAID");
    \u0275\u0275elementEnd();
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
    \u0275\u0275elementStart(9, "div", 10)(10, "div", 11)(11, "div", 12)(12, "div", 13);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 14);
    \u0275\u0275text(15, "Payment receipt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 15)(17, "div", 16);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 17);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "table", 18)(23, "thead")(24, "tr")(25, "th");
    \u0275\u0275text(26, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 19);
    \u0275\u0275text(28, "Amount");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "tbody");
    \u0275\u0275repeaterCreate(30, PaymentSuccessComponent_Conditional_2_For_31_Template, 7, 7, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 20)(33, "div", 21)(34, "span");
    \u0275\u0275text(35, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "span");
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 22)(40, "span");
    \u0275\u0275text(41, "Paid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span");
    \u0275\u0275text(43);
    \u0275\u0275pipe(44, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 23)(46, "span");
    \u0275\u0275text(47, "Balance due");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span");
    \u0275\u0275text(49);
    \u0275\u0275pipe(50, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(51, PaymentSuccessComponent_Conditional_2_Conditional_51_Template, 2, 0, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "a", 25);
    \u0275\u0275text(53, "\u2B07 Download Invoice (PDF)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "a", 26);
    \u0275\u0275text(55, "\u2190 Back to explore");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.headline);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.supplierName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.invoiceNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 9, ctx_r1.issueDate, "d MMM yyyy"));
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.lineItems);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(38, 12, ctx_r1.total, ctx_r1.currency, "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\u2212", \u0275\u0275pipeBind4(44, 17, ctx_r1.paid, ctx_r1.currency, "symbol", "1.2-2"), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(50, 22, ctx_r1.balance, ctx_r1.currency, "symbol", "1.2-2"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.fullyPaid ? 51 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r1.invoiceLink, \u0275\u0275sanitizeUrl);
  }
}
function PaymentSuccessComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "h2");
    \u0275\u0275text(2, "Payment received");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "We couldn't load the receipt details here, but your payment went through.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 26);
    \u0275\u0275text(6, "\u2190 Back to explore");
    \u0275\u0275elementEnd()();
  }
}
var PaymentSuccessComponent = class _PaymentSuccessComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.platformId = inject(PLATFORM_ID);
    this.loading = signal(true);
    this.bundle = signal(null);
    this.issueDate = /* @__PURE__ */ new Date();
    this.tok = "";
    this.bookingId = "";
  }
  ngOnInit() {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId))
        return;
      document.title = "Payment Confirmed | JM Bookings";
      const p = this.route.snapshot.queryParamMap;
      this.tok = p.get("tok") ?? "";
      const intent = p.get("payment_intent") ?? "";
      let data = null;
      if (this.tok) {
        ({ data } = yield bookingsDb.rpc("get_invoice_by_token", { p_token: this.tok }));
      } else if (intent) {
        const { data: pay } = yield bookingsDb.from("payments").select("booking_id").eq("stripe_payment_intent_id", intent).maybeSingle();
        const bid = pay?.booking_id;
        if (bid)
          ({ data } = yield bookingsDb.rpc("get_invoice", { p_booking: bid }));
      }
      if (data) {
        this.bundle.set(data);
        this.bookingId = data.booking.id;
      }
      this.loading.set(false);
    });
  }
  // ── Derived ─────────────────────────────────────────────────────────
  get inv() {
    return this.bundle()?.org.invoice_details ?? {};
  }
  get currency() {
    return this.bundle()?.org.currency ?? "EUR";
  }
  get supplierName() {
    return this.inv.legal_name?.trim() || this.bundle()?.org.name || "";
  }
  get lineItems() {
    return this.bundle()?.invoice.line_items ?? [];
  }
  get total() {
    return this.bundle()?.invoice.total ?? 0;
  }
  get paid() {
    return this.bundle()?.total_paid ?? 0;
  }
  get balance() {
    return Math.max(0, this.total - this.paid);
  }
  get fullyPaid() {
    return this.total > 0 && this.paid >= this.total - 5e-3;
  }
  /** Invoice number = booking ref with the org's prefix swapped (BK-2026-007 → JFMB-2026-007). */
  get invoiceNumber() {
    const ref = this.bundle()?.booking.booking_ref ?? "";
    const prefix = (this.inv.invoice_prefix || "INV").toUpperCase();
    const dash = ref.indexOf("-");
    return dash >= 0 ? `${prefix}-${ref.slice(dash + 1)}` : `${prefix}-${ref}`;
  }
  /** Full printable invoice — by token for anon customers, by id for signed-in. */
  get invoiceLink() {
    return this.tok ? `/book/invoice?token=${this.tok}` : `/book/invoice/${this.bookingId}`;
  }
  get headline() {
    return this.fullyPaid ? "Full payment confirmed. You're all set \u2014 see you soon!" : `Deposit received. The remaining balance of ${this.fmt(this.balance)} is due on the day.`;
  }
  fmt(n) {
    return `${this.currency === "EUR" ? "\u20AC" : ""}${n.toFixed(2)}`;
  }
  static {
    this.\u0275fac = function PaymentSuccessComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaymentSuccessComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentSuccessComponent, selectors: [["app-payment-success"]], decls: 4, vars: 1, consts: [[1, "success-page"], [1, "loading-state"], [1, "spinner"], [1, "success-banner"], [1, "check-wrap"], ["viewBox", "0 0 52 52", "fill", "none", 1, "check-icon"], ["cx", "26", "cy", "26", "r", "25", "stroke", "#F4A922", "stroke-width", "2", 1, "check-circle"], ["d", "M14 26l9 9 15-17", "stroke", "#F4A922", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "check-mark"], [1, "success-title"], [1, "success-sub"], [1, "receipt"], [1, "receipt__head"], [1, "receipt__supplier"], [1, "receipt__name"], [1, "receipt__label"], [1, "receipt__meta"], [1, "receipt__inv"], [1, "receipt__date"], [1, "receipt__items"], [1, "num"], [1, "receipt__totals"], [1, "receipt__row"], [1, "receipt__row", "receipt__row--ok"], [1, "receipt__row", "receipt__row--grand"], [1, "receipt__paid"], ["target", "_blank", "rel", "noopener", 1, "dl-btn", 3, "href"], ["href", "/malta", 1, "back-link"], [1, "receipt__desc", "pre"]], template: function PaymentSuccessComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, PaymentSuccessComponent_Conditional_1_Template, 4, 0, "div", 1)(2, PaymentSuccessComponent_Conditional_2_Template, 56, 27)(3, PaymentSuccessComponent_Conditional_3_Template, 7, 0, "div", 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 1 : ctx.bundle() ? 2 : 3);
      }
    }, dependencies: [CurrencyPipe, DatePipe], styles: ["\n\n.success-page[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background: var(--color-bg-light);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 48px 24px 64px;\n  gap: 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  gap: 16px;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-muted);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.success-banner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.check-wrap[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.check-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n}\n.check-circle[_ngcontent-%COMP%] {\n  stroke-dasharray: 160;\n  stroke-dashoffset: 160;\n  animation: _ngcontent-%COMP%_draw-circle 0.6s ease forwards;\n}\n.check-mark[_ngcontent-%COMP%] {\n  stroke-dasharray: 40;\n  stroke-dashoffset: 40;\n  animation: _ngcontent-%COMP%_draw-check 0.4s ease 0.55s forwards;\n}\n@keyframes _ngcontent-%COMP%_draw-circle {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_draw-check {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n.success-title[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  letter-spacing: -0.5px;\n  margin: 0 0 10px;\n}\n.success-sub[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-muted);\n  line-height: 1.7;\n  margin: 0;\n  max-width: 360px;\n}\n.receipt[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 560px;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-md);\n  overflow: hidden;\n}\n.receipt__head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  background: var(--color-text-base);\n  color: #fff;\n  padding: 20px 24px;\n}\n.receipt__name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n}\n.receipt__label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.7;\n  margin-top: 2px;\n}\n.receipt__meta[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.receipt__inv[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n  color: var(--color-primary);\n}\n.receipt__date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.7;\n  margin-top: 2px;\n}\n.receipt__items[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  padding: 0 24px;\n}\n.receipt__items[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--color-text-muted);\n  padding: 14px 24px 8px;\n  border-bottom: 1px solid var(--color-border);\n}\n.receipt__items[_ngcontent-%COMP%]   th.num[_ngcontent-%COMP%], \n.receipt__items[_ngcontent-%COMP%]   td.num[_ngcontent-%COMP%] {\n  text-align: right;\n  white-space: nowrap;\n}\n.receipt__items[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border-bottom: 1px solid var(--color-bg-muted);\n  vertical-align: top;\n}\n.receipt__desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-base);\n  white-space: pre-line;\n}\n.pre[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n.receipt__totals[_ngcontent-%COMP%] {\n  padding: 14px 24px 18px;\n}\n.receipt__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 13.5px;\n  padding: 5px 0;\n}\n.receipt__row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  color: var(--color-text-muted);\n}\n.receipt__row--ok[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.receipt__row--grand[_ngcontent-%COMP%] {\n  border-top: 1.5px solid var(--color-text-base);\n  margin-top: 6px;\n  padding-top: 10px;\n  font-weight: 800;\n  font-size: 16px;\n}\n.receipt__row--grand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  color: var(--color-text-base);\n}\n.receipt__paid[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 24px 20px;\n  border: 2px solid #16a34a;\n  color: #16a34a;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  font-size: 13px;\n  padding: 3px 12px;\n  border-radius: 6px;\n  transform: rotate(-3deg);\n}\n.dl-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  width: 100%;\n  max-width: 560px;\n  box-sizing: border-box;\n  background: var(--color-primary);\n  color: var(--color-text-base);\n  font-size: 15px;\n  font-weight: 700;\n  text-decoration: none;\n  padding: 15px 20px;\n  border-radius: var(--radius-md);\n}\n.dl-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n.back-link[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: var(--color-text-muted);\n  text-decoration: none;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-base);\n}\n@media print {\n  .no-print[_ngcontent-%COMP%], \n   .dl-btn[_ngcontent-%COMP%], \n   .back-link[_ngcontent-%COMP%], \n   .success-banner[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .success-page[_ngcontent-%COMP%] {\n    background: #fff;\n    padding: 0;\n    min-height: auto;\n  }\n}\n/*# sourceMappingURL=payment-success.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentSuccessComponent, { className: "PaymentSuccessComponent", filePath: "src/app/booking/public/payment-success/payment-success.component.ts", lineNumber: 25 });
})();
export {
  PaymentSuccessComponent
};
//# sourceMappingURL=chunk-7567RMKJ.js.map
