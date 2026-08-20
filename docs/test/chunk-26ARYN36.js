import {
  bookingsDb
} from "./chunk-F6LTA4RG.js";
import "./chunk-4746DPCT.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-Q6APD67I.js";
import "./chunk-GHBBMOR7.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  NgIf,
  PLATFORM_ID,
  computed,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
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

// src/app/booking/ui/booking-invoice/booking-invoice.component.ts
function BookingInvoiceComponent_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, ctx_r0.invoice.paidAt, "d MMM yyyy"));
  }
}
function BookingInvoiceComponent_Conditional_0_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.invoice.description);
  }
}
function BookingInvoiceComponent_Conditional_0_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4CD} ", ctx_r0.invoice.location, "");
  }
}
function BookingInvoiceComponent_Conditional_0_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 12);
    \u0275\u0275text(3, "Travel & Expenses");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20AC", ctx_r0.invoice.priceExpenses.toFixed(2), "");
  }
}
function BookingInvoiceComponent_Conditional_0_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "a", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r0.backLink, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.backLabel);
  }
}
function BookingInvoiceComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "div", 3);
    \u0275\u0275text(5, "Payment receipt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 4);
    \u0275\u0275text(7, "For your full tax invoice, open the invoice link.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 5)(9, "div", 6);
    \u0275\u0275text(10, "INVOICE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 7);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, BookingInvoiceComponent_Conditional_0_Conditional_13_Template, 3, 4, "div", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "div", 9);
    \u0275\u0275elementStart(15, "table", 10)(16, "thead")(17, "tr")(18, "th");
    \u0275\u0275text(19, "Service");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 11);
    \u0275\u0275text(21, "Amount");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody")(23, "tr")(24, "td")(25, "div", 12);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, BookingInvoiceComponent_Conditional_0_Conditional_27_Template, 2, 1, "div", 13)(28, BookingInvoiceComponent_Conditional_0_Conditional_28_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(29, "div", 13);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "date");
    \u0275\u0275pipe(32, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "td", 14);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(35, BookingInvoiceComponent_Conditional_0_Conditional_35_Template, 6, 1, "tr");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(36, "div", 9);
    \u0275\u0275elementStart(37, "div", 15)(38, "div", 16)(39, "span");
    \u0275\u0275text(40, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 17)(44, "span");
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "span");
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(48, "div", 18);
    \u0275\u0275elementStart(49, "div", 19)(50, "span");
    \u0275\u0275text(51, "Balance due");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "span");
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(54, "div", 9);
    \u0275\u0275elementStart(55, "div", 20)(56, "span");
    \u0275\u0275text(57, "Payment processed securely via Stripe");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "span", 21);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(60, BookingInvoiceComponent_Conditional_0_Conditional_60_Template, 3, 2, "div", 22);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r0.invoice.ref);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.invoice.paidAt ? 13 : -1);
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(ctx_r0.invoice.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.invoice.description ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.invoice.location ? 28 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(31, 15, ctx_r0.invoice.startAt, "d MMM yyyy, HH:mm"), " \u2013 ", \u0275\u0275pipeBind2(32, 18, ctx_r0.invoice.endAt, "HH:mm"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u20AC", (ctx_r0.invoice.priceTotal - ctx_r0.invoice.priceExpenses).toFixed(2), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.invoice.priceExpenses > 0 ? 35 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("\u20AC", ctx_r0.invoice.priceTotal.toFixed(2), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.typeLabel, " paid");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2212\u20AC", ctx_r0.invoice.amountPaid.toFixed(2), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\u20AC", ctx_r0.invoice.balanceDue.toFixed(2), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Ref: ", ctx_r0.invoice.ref, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.backLink ? 60 : -1);
  }
}
var BookingInvoiceComponent = class _BookingInvoiceComponent {
  constructor() {
    this.invoice = null;
    this.backLink = "/malta";
    this.backLabel = "\u2190 Back to explore";
  }
  get typeLabel() {
    return this.invoice?.paymentType === "deposit" ? "Deposit" : "Full payment";
  }
  static {
    this.\u0275fac = function BookingInvoiceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingInvoiceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingInvoiceComponent, selectors: [["app-booking-invoice"]], inputs: { invoice: "invoice", backLink: "backLink", backLabel: "backLabel" }, decls: 1, vars: 1, consts: [[1, "invoice"], [1, "invoice__header"], [1, "invoice__brand"], [1, "invoice__brand-name"], [1, "invoice__brand-sub"], [1, "invoice__meta"], [1, "invoice__label"], [1, "invoice__ref"], [1, "invoice__date"], [1, "invoice__divider"], [1, "invoice__table"], [1, "text-right"], [1, "service-title"], [1, "service-detail"], [1, "text-right", "amount-cell"], [1, "invoice__totals"], [1, "totals-row"], [1, "totals-row", "totals-row--paid"], [1, "invoice__divider", "invoice__divider--thin"], [1, "totals-row", "totals-row--balance"], [1, "invoice__footer"], [1, "invoice__footer-ref"], [1, "invoice-actions", "no-print"], [1, "back-link", 3, "href"]], template: function BookingInvoiceComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, BookingInvoiceComponent_Conditional_0_Template, 61, 21);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.invoice ? 0 : -1);
      }
    }, dependencies: [DatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 600px;\n}\n.invoice[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  overflow: hidden;\n  box-shadow: var(--shadow-md);\n}\n.invoice__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 28px 32px;\n  background: #0f1117;\n}\n.invoice__brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.invoice__logo[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  font-weight: 800;\n  color: #000;\n  flex-shrink: 0;\n}\n.invoice__brand-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #fff;\n}\n.invoice__brand-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(255, 255, 255, 0.5);\n  margin-top: 2px;\n}\n.invoice__meta[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.invoice__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  color: var(--color-primary);\n}\n.invoice__ref[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: #fff;\n  margin-top: 4px;\n  font-family: monospace;\n  letter-spacing: 1px;\n}\n.invoice__date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(255, 255, 255, 0.45);\n  margin-top: 4px;\n}\n.invoice__divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--color-border);\n}\n.invoice__divider--thin[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  background: var(--color-bg-muted);\n}\n.invoice__table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.invoice__table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-text-light);\n  padding: 20px 32px 12px;\n  border-bottom: 1px solid var(--color-border);\n  text-align: left;\n}\n.invoice__table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 20px 32px;\n  vertical-align: top;\n  border-bottom: 1px solid var(--color-bg-muted);\n}\n.invoice__table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.invoice__totals[_ngcontent-%COMP%] {\n  padding: 20px 32px 24px;\n}\n.invoice__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 32px;\n  background: var(--color-bg-light);\n  font-size: 12px;\n  color: var(--color-text-light);\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.invoice__footer-ref[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 11px;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.service-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--color-text-base);\n}\n.service-detail[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  margin-top: 4px;\n  line-height: 1.5;\n}\n.amount-cell[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  white-space: nowrap;\n}\n.totals-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 14px;\n  color: var(--color-text-secondary);\n  padding: 6px 0;\n}\n.totals-row--paid[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.totals-row--balance[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  padding: 10px 0 0;\n}\n.invoice-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  width: 100%;\n  padding-top: 20px;\n}\n.btn-pdf[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 16px 24px;\n  background: var(--color-primary);\n  color: #000;\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: 15px;\n  font-weight: 700;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  transition: opacity var(--transition), transform 0.12s;\n}\n.btn-pdf[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.btn-pdf[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.back-link[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-light);\n  text-decoration: none;\n  transition: color 0.2s;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n@media print {\n  .no-print[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .invoice[_ngcontent-%COMP%] {\n    max-width: 100%;\n    border: none;\n    border-radius: 0;\n    box-shadow: none;\n  }\n  .invoice__header[_ngcontent-%COMP%] {\n    background: #0f1117 !important;\n    -webkit-print-color-adjust: exact;\n    print-color-adjust: exact;\n  }\n  .invoice__logo[_ngcontent-%COMP%] {\n    background: #F4A922 !important;\n    -webkit-print-color-adjust: exact;\n    print-color-adjust: exact;\n  }\n}\n/*# sourceMappingURL=booking-invoice.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookingInvoiceComponent, { className: "BookingInvoiceComponent", filePath: "src/app/booking/ui/booking-invoice/booking-invoice.component.ts", lineNumber: 26 });
})();

// src/app/booking/public/book-page/book-page.component.ts
function BookPageComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "div", 7);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading your booking\u2026");
    \u0275\u0275elementEnd()();
  }
}
function BookPageComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9);
    \u0275\u0275text(2, "\u{1F517}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Link not found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "This payment link is invalid or has expired. Please contact John for a new link.");
    \u0275\u0275elementEnd()();
  }
}
function BookPageComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9);
    \u0275\u0275text(2, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "This slot is no longer available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "The date for this booking has been taken. Please contact the business to reschedule.");
    \u0275\u0275elementEnd()();
  }
}
function BookPageComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Something went wrong");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Please try refreshing the page or contact John directly.");
    \u0275\u0275elementEnd()();
  }
}
function BookPageComponent_div_5_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " John will arrange payment (cash, Revolut or bank transfer) with you.");
    \u0275\u0275elementEnd();
  }
}
function BookPageComponent_div_5_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Prefer to pay online?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 14);
    \u0275\u0275listener("click", function BookPageComponent_div_5_Conditional_13_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectPayment("full"));
    });
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.cardLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Pay ", \u0275\u0275pipeBind4(4, 2, ctx_r1.remainingAmount, "EUR", "symbol", "1.0-2"), " by card ");
  }
}
function BookPageComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 9);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Booking confirmed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "You're all set! Here's your invoice.");
    \u0275\u0275template(7, BookPageComponent_div_5_span_7_Template, 2, 0, "span", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 10)(9, "a", 11);
    \u0275\u0275text(10, "\u2B07 Download invoice (PDF)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 12);
    \u0275\u0275text(12, "\u{1F5A8} Print invoice");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, BookPageComponent_div_5_Conditional_13_Template, 5, 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.showInperson);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r1.invoiceUrl + "&auto=download", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r1.invoiceUrl + "&auto=print", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showCard && ctx_r1.remainingAmount > 0 ? 13 : -1);
  }
}
function BookPageComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 9);
    \u0275\u0275text(2, "\u{1F4E9}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Request sent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Thanks! John will confirm your booking shortly and arrange cash, Revolut or bank-transfer payment with you. You'll hear back soon \u2014 meanwhile here's your invoice.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 10)(8, "a", 11);
    \u0275\u0275text(9, "\u2B07 Download invoice (PDF)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "a", 12);
    \u0275\u0275text(11, "\u{1F5A8} Print invoice");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("href", ctx_r1.invoiceUrl + "&auto=download", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r1.invoiceUrl + "&auto=print", \u0275\u0275sanitizeUrl);
  }
}
function BookPageComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "div", 17);
    \u0275\u0275text(3, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "Booking confirmed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "This booking has been paid in full. Here's your receipt.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 10)(9, "a", 11);
    \u0275\u0275text(10, "\u2B07 Download invoice (PDF)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 12);
    \u0275\u0275text(12, "\u{1F5A8} Print invoice");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(13, "app-booking-invoice", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("href", ctx_r1.invoiceUrl + "&auto=download", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r1.invoiceUrl + "&auto=print", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("invoice", ctx_r1.paidInvoice());
  }
}
function BookPageComponent_ng_container_8_div_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "span", 28);
    \u0275\u0275text(2, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r3 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(b_r3.location);
  }
}
function BookPageComponent_ng_container_8_div_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "span", 28);
    \u0275\u0275text(2, "Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r3 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(b_r3.description);
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_2_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_2_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.selectPayment("deposit"));
    });
    \u0275\u0275elementStart(1, "div", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 38);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 39);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r3 = \u0275\u0275nextContext(3).ngIf;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Pay ", ctx_r1.depositPercent, "% deposit");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(5, 3, ctx_r1.depositAmount, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Remaining ", \u0275\u0275pipeBind4(8, 8, b_r3.price_total - ctx_r1.depositAmount, "EUR", "symbol", "1.2-2"), " due on the day");
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "h2", 34);
    \u0275\u0275text(2, "How would you like to pay?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 35)(4, "button", 36);
    \u0275\u0275listener("click", function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_2_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectPayment("full"));
    });
    \u0275\u0275elementStart(5, "div", 37);
    \u0275\u0275text(6, "Pay in full");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 38);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 39);
    \u0275\u0275text(11, "One payment, all done");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_2_button_12_Template, 9, 13, "button", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 41);
    \u0275\u0275text(14, "\u{1F512} Secure payment via Stripe");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const b_r3 = \u0275\u0275nextContext(2).ngIf;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(9, 2, b_r3.price_total, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.showDeposit);
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "h2", 34);
    \u0275\u0275text(2, "Confirm your booking");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 44);
    \u0275\u0275listener("click", function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_ng_container_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.acceptInPerson());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 45);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const b_r3 = \u0275\u0275nextContext(3).ngIf;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.confirming());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.confirming() ? "Confirming\u2026" : "Confirm booking", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" By confirming, you accept this booking and agree to pay ", \u0275\u0275pipeBind4(7, 3, b_r3.price_total, "EUR", "symbol", "1.2-2"), " by cash, Revolut or bank transfer. ");
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_ng_template_2_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "span");
    \u0275\u0275text(2, "or");
    \u0275\u0275elementEnd()();
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_ng_template_2_div_0_Template, 3, 0, "div", 46);
    \u0275\u0275elementStart(1, "button", 47);
    \u0275\u0275listener("click", function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_ng_template_2_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.acceptInPerson());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 45);
    \u0275\u0275text(4, "John will confirm your booking and arrange payment with you directly.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngIf", ctx_r1.showCard);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.confirming());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.confirming() ? "Sending\u2026" : "Pay later \u2014 cash, Revolut or bank transfer", " ");
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_ng_container_1_Template, 8, 8, "ng-container", 43)(2, BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_ng_template_2_Template, 5, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const askLater_r8 = \u0275\u0275reference(3);
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.payLaterOnly)("ngIfElse", askLater_r8);
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_25_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "div", 32);
    \u0275\u0275template(2, BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_2_Template, 15, 7, "ng-container", 5)(3, BookPageComponent_ng_container_8_div_1_ng_container_25_ng_container_3_Template, 4, 2, "ng-container", 5)(4, BookPageComponent_ng_container_8_div_1_ng_container_25_p_4_Template, 2, 1, "p", 33);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.showCard);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showInperson);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorMessage());
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "div", 32);
    \u0275\u0275elementStart(2, "div", 50);
    \u0275\u0275element(3, "span", 51);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 35)(7, "button", 36);
    \u0275\u0275listener("click", function BookPageComponent_ng_container_8_div_1_ng_container_26_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectPayment("remainder"));
    });
    \u0275\u0275elementStart(8, "div", 37);
    \u0275\u0275text(9, "Pay remaining balance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 38);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 39);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "p", 41);
    \u0275\u0275text(17, "\u{1F512} Secure payment via Stripe");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 10)(19, "a", 11);
    \u0275\u0275text(20, "\u2B07 Download invoice (PDF)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "a", 12);
    \u0275\u0275text(22, "\u{1F5A8} Print invoice");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const b_r3 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Deposit of ", \u0275\u0275pipeBind4(5, 5, ctx_r1.totalPaid(), "EUR", "symbol", "1.2-2"), " already paid ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(12, 10, ctx_r1.remainingAmount, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Completes your booking \u2014 total ", \u0275\u0275pipeBind4(15, 15, b_r3.price_total, "EUR", "symbol", "1.2-2"), "");
    \u0275\u0275advance(5);
    \u0275\u0275property("href", ctx_r1.invoiceUrl + "&auto=download", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r1.invoiceUrl + "&auto=print", \u0275\u0275sanitizeUrl);
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_27_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275element(1, "span", 60);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Loading secure payment form\u2026");
    \u0275\u0275elementEnd()();
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_27_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_27_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 61);
  }
}
function BookPageComponent_ng_container_8_div_1_ng_container_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "div", 32);
    \u0275\u0275elementStart(2, "div", 52)(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 53);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, BookPageComponent_ng_container_8_div_1_ng_container_27_div_8_Template, 4, 0, "div", 54);
    \u0275\u0275element(9, "div", 55);
    \u0275\u0275template(10, BookPageComponent_ng_container_8_div_1_ng_container_27_p_10_Template, 2, 1, "p", 33);
    \u0275\u0275elementStart(11, "div", 56)(12, "button", 57);
    \u0275\u0275listener("click", function BookPageComponent_ng_container_8_div_1_ng_container_27_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(13, "\u2190 Back");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 14);
    \u0275\u0275listener("click", function BookPageComponent_ng_container_8_div_1_ng_container_27_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.submitPayment());
    });
    \u0275\u0275template(15, BookPageComponent_ng_container_8_div_1_ng_container_27_span_15_Template, 1, 0, "span", 58);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "p", 41);
    \u0275\u0275text(18, "\u{1F512} Secure payment via Stripe");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const b_r3 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedType() === "deposit" ? ctx_r1.depositPercent + "% Deposit" : ctx_r1.selectedType() === "remainder" ? "Remaining balance" : "Full payment");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(7, 10, ctx_r1.selectedType() === "deposit" ? ctx_r1.depositAmount : ctx_r1.selectedType() === "remainder" ? ctx_r1.remainingAmount : b_r3.price_total, "EUR", "symbol", "1.2-2"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.cardLoading());
    \u0275\u0275advance();
    \u0275\u0275classProp("is-hidden", ctx_r1.cardLoading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorMessage());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.processing());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.cardLoading() || ctx_r1.processing());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.processing());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.processing() ? "Processing\u2026" : "Pay now", " ");
  }
}
function BookPageComponent_ng_container_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "div", 22);
    \u0275\u0275text(3, "JM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h1", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 25);
    \u0275\u0275template(10, BookPageComponent_ng_container_8_div_1_div_10_Template, 5, 1, "div", 26)(11, BookPageComponent_ng_container_8_div_1_div_11_Template, 5, 1, "div", 26);
    \u0275\u0275elementStart(12, "div", 27)(13, "span", 28);
    \u0275\u0275text(14, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 29);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 27)(20, "span", 28);
    \u0275\u0275text(21, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 30);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(25, BookPageComponent_ng_container_8_div_1_ng_container_25_Template, 5, 3, "ng-container", 5)(26, BookPageComponent_ng_container_8_div_1_ng_container_26_Template, 23, 20, "ng-container", 5)(27, BookPageComponent_ng_container_8_div_1_ng_container_27_Template, 19, 15, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r3 = ctx.ngIf;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(b_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r3.booking_ref);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", b_r3.location);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", b_r3.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(17, 10, b_r3.start_at, "d MMM yyyy, HH:mm"), " \u2013 ", \u0275\u0275pipeBind2(18, 13, b_r3.end_at, "HH:mm"), "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(24, 16, b_r3.price_total, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.state() === "ready");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.state() === "partial");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.state() === "paying");
  }
}
function BookPageComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, BookPageComponent_ng_container_8_div_1_Template, 28, 21, "div", 19);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.booking());
  }
}
var STRIPE_PK = "pk_live_51ShRJTAXI0tdCXi3HuEvh9PuIVMFTjqRlMQwsg8pqMlhACOXGKAiATxj9MzW268hs9RV6RvCb5FP1bIFHuNlZkBG007LHcSnOB";
var CONFIRMED_STATUSES = ["booked", "in_progress", "done"];
var BookPageComponent = class _BookPageComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.platformId = inject(PLATFORM_ID);
    this.state = signal("loading");
    this.booking = signal(null);
    this.selectedType = signal(null);
    this.errorMessage = signal("");
    this.totalPaid = signal(0);
    this.confirming = signal(false);
    this.cardLoading = signal(false);
    this.processing = signal(false);
    this.token = "";
    this.stripe = null;
    this.elements = null;
    this.paymentElement = null;
    this.paidInvoice = computed(() => {
      const b = this.booking();
      if (!b)
        return null;
      const paid = this.totalPaid();
      return {
        ref: b.booking_ref,
        title: b.title,
        description: b.description,
        location: b.location,
        startAt: b.start_at,
        endAt: b.end_at,
        priceTotal: b.price_total,
        priceExpenses: b.price_expenses,
        amountPaid: paid,
        balanceDue: Math.max(0, b.price_total - paid),
        paymentType: "full",
        paidAt: null
      };
    });
  }
  get isPast() {
    const b = this.booking();
    return b ? new Date(b.start_at) <= /* @__PURE__ */ new Date() : false;
  }
  /** Printable invoice, accessible without login via the booking-link token. */
  get invoiceUrl() {
    return `/book/invoice?token=${this.token}`;
  }
  get showCard() {
    return this.booking()?.allow_card ?? false;
  }
  get showInperson() {
    return this.booking()?.allow_inperson ?? false;
  }
  /** Pay-later is the only option → the in-person button confirms the booking directly. */
  get payLaterOnly() {
    const b = this.booking();
    return !!b && b.allow_inperson && !b.allow_card;
  }
  /** Effective deposit % for this booking (legacy rows with no value fall back to 30). */
  get depositPercent() {
    return this.booking()?.deposit_percent ?? 30;
  }
  /** Whether a deposit may be offered (per-booking; legacy rows default to allowed). */
  get depositAllowed() {
    return this.booking()?.deposit_allowed ?? true;
  }
  /** Show the deposit option only when card is on, a deposit is allowed, and the date is future. */
  get showDeposit() {
    return this.showCard && this.depositAllowed && !this.isPast;
  }
  get depositAmount() {
    return Math.round((this.booking()?.price_total ?? 0) * this.depositPercent) / 100;
  }
  get remainingAmount() {
    return Math.round(((this.booking()?.price_total ?? 0) - this.totalPaid()) * 100) / 100;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId))
        return;
      this.token = this.route.snapshot.paramMap.get("token") ?? "";
      if (!this.token) {
        this.state.set("invalid");
        return;
      }
      yield this.loadBooking();
    });
  }
  loadBooking() {
    return __async(this, null, function* () {
      try {
        const { data: link, error } = yield bookingsDb.from("booking_links").select("is_active, expires_at, bookings(booking_ref, title, description, location, start_at, end_at, price_total, price_expenses, allow_card, allow_inperson, deposit_percent, deposit_allowed, status, google_event_id)").eq("token", this.token).single();
        if (error || !link || !link.is_active) {
          this.state.set("invalid");
          return;
        }
        if (link.expires_at && new Date(link.expires_at) < /* @__PURE__ */ new Date()) {
          this.state.set("invalid");
          return;
        }
        const b = link.bookings;
        this.booking.set(b);
        const { data: availData, error: availError } = yield bookingsDb.functions.invoke("check-availability", {
          body: { token: this.token }
        });
        if (availError)
          throw availError;
        const { available, paymentStatus, totalPaid } = availData;
        this.totalPaid.set(totalPaid);
        if (paymentStatus === "paid") {
          this.state.set("paid");
          return;
        }
        if (paymentStatus === "partial") {
          this.state.set("partial");
          return;
        }
        const confirmed = CONFIRMED_STATUSES.includes(b.status) || !!b.google_event_id;
        if (confirmed) {
          if (b.allow_card && this.remainingAmount > 0)
            yield this.loadStripeJs();
          this.state.set("confirmed");
          return;
        }
        if (!available) {
          this.state.set("unavailable");
          return;
        }
        yield this.loadStripeJs();
        this.state.set("ready");
      } catch {
        this.state.set("error");
      }
    });
  }
  loadStripeJs() {
    return new Promise((resolve, reject) => {
      if (window.Stripe) {
        this.initStripe();
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.onload = () => {
        this.initStripe();
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  // For a direct charge on the org's connected account, Stripe.js must be initialized
  // with { stripeAccount } (known only after the intent is created). The platform
  // fallback (no connected account) uses the plain instance.
  initStripe(stripeAccount) {
    this.stripe = stripeAccount ? window.Stripe(STRIPE_PK, { stripeAccount }) : window.Stripe(STRIPE_PK);
  }
  selectPayment(type) {
    return __async(this, null, function* () {
      this.selectedType.set(type);
      this.state.set("paying");
      this.cardLoading.set(true);
      this.errorMessage.set("");
      try {
        const { data, error } = yield bookingsDb.functions.invoke("create-payment-intent", {
          body: { token: this.token, paymentType: type }
        });
        if (error)
          throw error;
        const { clientSecret, stripeAccount } = data ?? {};
        if (!clientSecret)
          throw new Error("Could not start the payment. Please try again.");
        yield this.loadStripeJs();
        if (stripeAccount)
          this.initStripe(stripeAccount);
        if (!this.stripe)
          throw new Error("Payment could not load. Please refresh and try again.");
        this.elements = this.stripe.elements({ clientSecret, appearance: { theme: "stripe" } });
        this.paymentElement = this.elements.create("payment");
        this.paymentElement.on("ready", () => this.cardLoading.set(false));
        setTimeout(() => {
          this.paymentElement.mount("#payment-element");
        }, 50);
      } catch (err) {
        this.errorMessage.set(err.message ?? "Something went wrong.");
        this.cardLoading.set(false);
        this.state.set("ready");
      }
    });
  }
  submitPayment() {
    return __async(this, null, function* () {
      if (!this.stripe || !this.elements || this.processing())
        return;
      this.processing.set(true);
      this.errorMessage.set("");
      const b = this.booking();
      const type = this.selectedType();
      const amount = type === "deposit" ? this.depositAmount : type === "remainder" ? this.remainingAmount : b.price_total;
      const params = new URLSearchParams({
        ref: b.booking_ref,
        title: b.title,
        amount: amount.toFixed(2),
        type,
        tok: this.token
      });
      const { error } = yield this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: `${window.location.origin}/pay/success?${params.toString()}`
        }
      });
      if (error) {
        this.errorMessage.set(error.message ?? "Payment failed.");
        this.processing.set(false);
      }
    });
  }
  /** Client chooses to settle in person (cash / Revolut / bank). If pay-later is the only
   *  option this confirms the booking directly; otherwise it raises a request John approves. */
  acceptInPerson() {
    return __async(this, null, function* () {
      this.confirming.set(true);
      this.errorMessage.set("");
      try {
        const { data, error } = yield bookingsDb.functions.invoke("accept-inperson", { body: { token: this.token } });
        if (error)
          throw error;
        const res = data ?? {};
        if (res.error) {
          this.errorMessage.set("Could not send your request. Please contact John.");
          return;
        }
        this.state.set(res.confirmed ? "confirmed" : "requested");
      } catch {
        this.errorMessage.set("Could not send your request. Please try again or contact John.");
      } finally {
        this.confirming.set(false);
      }
    });
  }
  goBack() {
    this.state.set("ready");
    this.selectedType.set(null);
    if (this.paymentElement) {
      this.paymentElement.destroy();
      this.paymentElement = null;
    }
  }
  static {
    this.\u0275fac = function BookPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookPageComponent, selectors: [["app-book-page"]], decls: 9, vars: 8, consts: [["askLater", ""], [1, "book-wrap"], ["class", "book-state", 4, "ngIf"], ["class", "book-state book-state--error", 4, "ngIf"], ["class", "paid-page", 4, "ngIf"], [4, "ngIf"], [1, "book-state"], [1, "spinner"], [1, "book-state", "book-state--error"], [1, "state-icon"], [1, "invoice-actions"], ["target", "_blank", "rel", "noopener", 1, "btn", "btn--primary", "invoice-dl", 3, "href"], ["target", "_blank", "rel", "noopener", 1, "btn", "btn--ghost", "invoice-dl", 3, "href"], [1, "pay-optional"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "paid-page"], [1, "paid-banner", "no-print"], [1, "paid-icon"], [3, "invoice"], ["class", "book-card", 4, "ngIf"], [1, "book-card"], [1, "book-header"], [1, "book-logo"], [1, "book-title"], [1, "book-ref"], [1, "book-details"], ["class", "detail-row", 4, "ngIf"], [1, "detail-row"], [1, "detail-label"], [1, "detail-value"], [1, "detail-value", "detail-value--price"], [1, "detail-value", "text-multiline"], [1, "book-divider"], ["class", "book-error", 4, "ngIf"], [1, "book-section-title"], [1, "payment-options"], [1, "pay-option", 3, "click"], [1, "pay-option__label"], [1, "pay-option__amount"], [1, "pay-option__note"], ["class", "pay-option pay-option--deposit", 3, "click", 4, "ngIf"], [1, "book-secure"], [1, "pay-option", "pay-option--deposit", 3, "click"], [4, "ngIf", "ngIfElse"], [1, "inperson-btn", "inperson-btn--primary", 3, "click", "disabled"], [1, "inperson-note"], ["class", "inperson-divider", 4, "ngIf"], [1, "inperson-btn", 3, "click", "disabled"], [1, "inperson-divider"], [1, "book-error"], [1, "deposit-paid-banner"], [1, "deposit-paid-banner__dot"], [1, "pay-summary"], [1, "pay-summary__amount"], ["class", "pay-loading", 4, "ngIf"], ["id", "payment-element", 1, "payment-element-wrap"], [1, "pay-actions"], [1, "btn", "btn--ghost", 3, "click", "disabled"], ["class", "pay-spinner pay-spinner--btn", "aria-hidden", "true", 4, "ngIf"], [1, "pay-loading"], ["aria-hidden", "true", 1, "pay-spinner"], ["aria-hidden", "true", 1, "pay-spinner", "pay-spinner--btn"]], template: function BookPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275template(1, BookPageComponent_div_1_Template, 4, 0, "div", 2)(2, BookPageComponent_div_2_Template, 7, 0, "div", 3)(3, BookPageComponent_div_3_Template, 7, 0, "div", 3)(4, BookPageComponent_div_4_Template, 7, 0, "div", 3)(5, BookPageComponent_div_5_Template, 14, 4, "div", 2)(6, BookPageComponent_div_6_Template, 12, 2, "div", 2)(7, BookPageComponent_div_7_Template, 14, 3, "div", 4)(8, BookPageComponent_ng_container_8_Template, 2, 1, "ng-container", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "loading");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "invalid");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "unavailable");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "error");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "confirmed");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "requested");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "paid");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "ready" || ctx.state() === "paying" || ctx.state() === "partial");
      }
    }, dependencies: [CommonModule, NgIf, CurrencyPipe, DatePipe, BookingInvoiceComponent], styles: ['\n\n.book-wrap[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background: var(--color-bg-light);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 40px 16px 80px;\n}\n.paid-page[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 600px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 28px;\n}\n.paid-banner[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.paid-icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  background: #dcfce7;\n  color: #16a34a;\n  font-size: 22px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 16px;\n}\n.paid-banner[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  margin: 0 0 8px;\n}\n.paid-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-muted);\n  margin: 0;\n}\n@media print {\n  .no-print[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .book-wrap[_ngcontent-%COMP%] {\n    background: #fff;\n    padding: 0;\n  }\n}\n.book-state--success[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.book-state--success[_ngcontent-%COMP%]   .state-ref[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-family: monospace;\n  color: var(--color-text-muted);\n  margin: 0;\n}\n.book-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: 60px 24px;\n  max-width: 420px;\n  width: 100%;\n}\n.book-state[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\n.book-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0 0 10px;\n}\n.book-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  line-height: 1.6;\n  margin: 0 0 24px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin-bottom: 16px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.book-card[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border-radius: var(--radius-xl);\n  box-shadow: var(--shadow-md);\n  width: 100%;\n  max-width: 480px;\n  overflow: hidden;\n}\n.book-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 28px 28px 20px;\n  background: var(--color-text-base);\n  color: #fff;\n}\n.book-logo[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: var(--color-text-base);\n  font-weight: 800;\n  font-size: 15px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.book-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  margin: 0 0 2px;\n  line-height: 1.3;\n}\n.book-ref[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.6;\n  margin: 0;\n  font-family: monospace;\n}\n.book-details[_ngcontent-%COMP%] {\n  padding: 20px 28px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  width: 70px;\n  flex-shrink: 0;\n  padding-top: 1px;\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-base);\n  line-height: 1.5;\n}\n.detail-value--price[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.book-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--color-border);\n  margin: 0 28px;\n}\n.book-section-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  margin: 0;\n  padding: 20px 28px 12px;\n}\n.payment-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 0 28px 8px;\n}\n.pay-option[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 2px;\n  padding: 16px 20px;\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  background: var(--color-bg);\n  cursor: pointer;\n  transition: border-color var(--transition), background var(--transition);\n  text-align: left;\n  width: 100%;\n}\n.pay-option[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  background: rgba(244, 169, 34, 0.04);\n}\n.pay-option--deposit[_ngcontent-%COMP%] {\n  border-style: dashed;\n}\n.pay-option__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.pay-option__amount[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--color-text-base);\n}\n.pay-option__note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n}\n.deposit-paid-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 16px 28px 4px;\n  padding: 12px 16px;\n  background: rgba(22, 163, 74, 0.07);\n  border: 1px solid rgba(22, 163, 74, 0.2);\n  border-radius: var(--radius-md);\n  font-size: 13px;\n  font-weight: 600;\n  color: #16a34a;\n}\n.deposit-paid-banner__dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #16a34a;\n  flex-shrink: 0;\n}\n.book-secure[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  padding: 12px 28px 24px;\n  margin: 0;\n}\n.pay-summary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 28px;\n  font-size: 14px;\n  color: var(--color-text-secondary);\n}\n.pay-summary__amount[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.payment-element-wrap[_ngcontent-%COMP%] {\n  padding: 0 28px;\n  min-height: 200px;\n}\n.pay-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 20px 28px 8px;\n}\n.book-error[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 13px;\n  padding: 8px 28px 0;\n  margin: 0;\n}\n.pay-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 24px 28px;\n  color: var(--color-text-muted);\n  font-size: 14px;\n}\n.payment-element-wrap.is-hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n.pay-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  flex: 0 0 auto;\n}\n.pay-spinner--btn[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  border-color: rgba(0, 0, 0, 0.2);\n  border-top-color: currentColor;\n}\n.btn[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 14px 20px;\n  border-radius: var(--radius-md);\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition: opacity var(--transition);\n}\n.btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: var(--color-text-base);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  flex: 0 0 auto;\n  padding: 14px 16px;\n}\n.inperson-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 0 28px;\n  margin: 4px 0 16px;\n  color: var(--color-text-light);\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.inperson-divider[_ngcontent-%COMP%]::before, \n.inperson-divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: var(--color-border);\n}\n.inperson-btn[_ngcontent-%COMP%] {\n  display: block;\n  width: calc(100% - 56px);\n  margin: 0 28px;\n  padding: 14px 20px;\n  border-radius: var(--radius-md);\n  border: 1.5px solid var(--color-border);\n  background: var(--color-bg);\n  color: var(--color-text-base);\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: border-color var(--transition), background var(--transition);\n}\n.inperson-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: var(--color-primary);\n  background: var(--color-bg-light);\n}\n.inperson-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n.inperson-btn--primary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-text-base);\n}\n.inperson-btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  filter: brightness(0.94);\n  background: var(--color-primary);\n}\n.inperson-note[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  padding: 10px 28px 24px;\n  margin: 0;\n}\n.invoice-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  justify-content: center;\n  margin-bottom: 18px;\n}\n.invoice-actions[_ngcontent-%COMP%]   .invoice-dl[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  width: auto;\n  margin-top: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px 20px;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 1;\n  text-decoration: none;\n}\n.pay-optional[_ngcontent-%COMP%] {\n  margin: 20px 0 8px;\n  font-weight: 600;\n  color: var(--book-muted, #6b7280);\n}\n/*# sourceMappingURL=book-page.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookPageComponent, { className: "BookPageComponent", filePath: "src/app/booking/public/book-page/book-page.component.ts", lineNumber: 39 });
})();
export {
  BookPageComponent
};
//# sourceMappingURL=chunk-26ARYN36.js.map
