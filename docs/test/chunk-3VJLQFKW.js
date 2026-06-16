import {
  DatePipe,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-W3IDOWRJ.js";

// src/app/booking/ui/booking-invoice/booking-invoice.component.ts
function BookingInvoiceComponent_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, ctx_r1.invoice.paidAt, "d MMM yyyy"));
  }
}
function BookingInvoiceComponent_Conditional_0_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.invoice.description);
  }
}
function BookingInvoiceComponent_Conditional_0_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4CD} ", ctx_r1.invoice.location, "");
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
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20AC", ctx_r1.invoice.priceExpenses.toFixed(2), "");
  }
}
function BookingInvoiceComponent_Conditional_0_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.backLink, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.backLabel);
  }
}
function BookingInvoiceComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
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
    \u0275\u0275elementStart(60, "div", 22)(61, "button", 23);
    \u0275\u0275listener("click", function BookingInvoiceComponent_Conditional_0_Template_button_click_61_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloadPdf());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(62, "svg", 24);
    \u0275\u0275element(63, "path", 25)(64, "polyline", 26)(65, "line", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(66, " Download Invoice (PDF) ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(67, BookingInvoiceComponent_Conditional_0_Conditional_67_Template, 2, 2, "a", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.invoice.ref);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.invoice.paidAt ? 13 : -1);
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(ctx_r1.invoice.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.invoice.description ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.invoice.location ? 28 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(31, 15, ctx_r1.invoice.startAt, "d MMM yyyy, HH:mm"), " \u2013 ", \u0275\u0275pipeBind2(32, 18, ctx_r1.invoice.endAt, "HH:mm"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u20AC", (ctx_r1.invoice.priceTotal - ctx_r1.invoice.priceExpenses).toFixed(2), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.invoice.priceExpenses > 0 ? 35 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("\u20AC", ctx_r1.invoice.priceTotal.toFixed(2), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.typeLabel, " paid");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2212\u20AC", ctx_r1.invoice.amountPaid.toFixed(2), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\u20AC", ctx_r1.invoice.balanceDue.toFixed(2), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Ref: ", ctx_r1.invoice.ref, "");
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.backLink ? 67 : -1);
  }
}
var BookingInvoiceComponent = class _BookingInvoiceComponent {
  constructor() {
    this.invoice = null;
    this.backLink = "/malta";
    this.backLabel = "\u2190 Back to explore";
    this.platformId = inject(PLATFORM_ID);
  }
  get typeLabel() {
    return this.invoice?.paymentType === "deposit" ? "Deposit (30%)" : "Full payment";
  }
  downloadPdf() {
    if (isPlatformBrowser(this.platformId))
      window.print();
  }
  static {
    this.\u0275fac = function BookingInvoiceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BookingInvoiceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingInvoiceComponent, selectors: [["app-booking-invoice"]], inputs: { invoice: "invoice", backLink: "backLink", backLabel: "backLabel" }, decls: 1, vars: 1, consts: [[1, "invoice"], [1, "invoice__header"], [1, "invoice__brand"], [1, "invoice__brand-name"], [1, "invoice__brand-sub"], [1, "invoice__meta"], [1, "invoice__label"], [1, "invoice__ref"], [1, "invoice__date"], [1, "invoice__divider"], [1, "invoice__table"], [1, "text-right"], [1, "service-title"], [1, "service-detail"], [1, "text-right", "amount-cell"], [1, "invoice__totals"], [1, "totals-row"], [1, "totals-row", "totals-row--paid"], [1, "invoice__divider", "invoice__divider--thin"], [1, "totals-row", "totals-row--balance"], [1, "invoice__footer"], [1, "invoice__footer-ref"], [1, "invoice-actions", "no-print"], [1, "btn-pdf", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "7 10 12 15 17 10"], ["x1", "12", "y1", "15", "x2", "12", "y2", "3"], [1, "back-link", 3, "href"]], template: function BookingInvoiceComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, BookingInvoiceComponent_Conditional_0_Template, 68, 21);
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

export {
  BookingInvoiceComponent
};
//# sourceMappingURL=chunk-3VJLQFKW.js.map
