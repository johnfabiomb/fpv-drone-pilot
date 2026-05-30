import {
  SeoService
} from "./chunk-VC44GQGP.js";
import {
  ActivatedRoute
} from "./chunk-6DNTZJP4.js";
import "./chunk-CGA4Y22O.js";
import {
  CommonModule,
  NgIf,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E43Y6J77.js";

// src/app/platform/payment/payment.component.ts
function PaymentComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Amount to pay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.formattedAmount);
  }
}
function PaymentComponent_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, " Looking forward to working on your project.");
    \u0275\u0275element(2, "br");
    \u0275\u0275text(3, " Complete your payment securely below");
    \u0275\u0275element(4, "br");
    \u0275\u0275text(5, " and book your slot once done. ");
    \u0275\u0275elementEnd();
  }
}
var PaymentComponent = class _PaymentComponent {
  constructor() {
    this.amount = null;
    this.route = inject(ActivatedRoute);
    this.seo = inject(SeoService);
  }
  ngOnInit() {
    this.seo.setPage("pay");
    this.amount = this.parseAmount(this.route.snapshot.queryParamMap.get("amount"));
  }
  get formattedAmount() {
    if (this.amount === null)
      return "";
    return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(this.amount);
  }
  parseAmount(raw) {
    if (!raw)
      return null;
    const value = parseFloat(raw.replace(",", "."));
    if (isNaN(value) || value < 0.5 || value > 999999)
      return null;
    return Math.round(value * 100) / 100;
  }
  static {
    this.\u0275fac = function PaymentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaymentComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentComponent, selectors: [["app-payment"]], decls: 16, vars: 2, consts: [[1, "pay-page"], [1, "pay-inner"], [1, "brand-text"], [1, "brand-name"], [1, "brand-title"], [1, "brand-divider"], ["class", "amount-banner", 4, "ngIf"], ["class", "brand-copy", 4, "ngIf"], [1, "stripe-wrap"], ["buy-button-id", "buy_btn_1TVg2KAXI0tdCXi36J3eOyL4", "publishable-key", "pk_live_51ShRJTAXI0tdCXi3HuEvh9PuIVMFTjqRlMQwsg8pqMlhACOXGKAiATxj9MzW268hs9RV6RvCb5FP1bIFHuNlZkBG007LHcSnOB"], [1, "brand-secure"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"], [1, "amount-banner"], [1, "amount-label"], [1, "amount-value"], [1, "brand-copy"]], template: function PaymentComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "@Johnfabiomb");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 4);
        \u0275\u0275text(6, "Explorer \xB7 Content Creator");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(7, "div", 5);
        \u0275\u0275template(8, PaymentComponent_div_8_Template, 5, 1, "div", 6)(9, PaymentComponent_p_9_Template, 6, 0, "p", 7);
        \u0275\u0275elementStart(10, "div", 8);
        \u0275\u0275element(11, "stripe-buy-button", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 10);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(13, "svg", 11);
        \u0275\u0275element(14, "path", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " 256-bit SSL \xB7 Secured by Stripe ");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.amount !== null);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.amount === null);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.pay-page[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background: #f6f7f9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 56px 24px 48px;\n}\n.pay-inner[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.brand-monogram[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 14px;\n  border: 2px solid var(--color-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--color-primary);\n  letter-spacing: 1px;\n  margin-bottom: 16px;\n  background: var(--color-bg);\n  box-shadow: 0 2px 12px rgba(244, 169, 34, 0.15);\n}\n.brand-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.brand-name[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  letter-spacing: -0.5px;\n}\n.brand-title[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-size: 9px;\n  color: var(--color-text-light);\n  letter-spacing: 0.6px;\n  text-transform: uppercase;\n}\n.brand-divider[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 1px;\n  background: var(--color-border);\n  margin: 24px auto;\n}\n.amount-banner[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--color-bg);\n  border: 1.5px solid var(--color-primary);\n  border-radius: 14px;\n  padding: 20px 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  margin-bottom: 24px;\n  box-shadow: 0 2px 12px rgba(244, 169, 34, 0.1);\n}\n.amount-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-primary);\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n}\n.amount-value[_ngcontent-%COMP%] {\n  font-size: 38px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  letter-spacing: -1.5px;\n  line-height: 1;\n}\n.brand-copy[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-text-muted);\n  line-height: 1.75;\n  margin: 0 0 24px;\n}\n.redirecting[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 24px 0;\n  color: var(--color-text-muted);\n  font-size: 14px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(244, 169, 34, 0.2);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.75s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.pay-error[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 14px;\n  padding: 16px;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: var(--radius-xl);\n  font-size: 13px;\n  color: #dc2626;\n  width: 100%;\n  margin-bottom: 20px;\n}\n.retry-btn[_ngcontent-%COMP%] {\n  padding: 8px 20px;\n  background: var(--color-bg);\n  border: 1px solid var(--color-primary);\n  border-radius: var(--radius-md);\n  color: var(--color-primary);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.retry-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(244, 169, 34, 0.06);\n}\n.stripe-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 20px;\n}\n.stripe-wrap[_ngcontent-%COMP%]   stripe-buy-button[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.brand-secure[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-light);\n  letter-spacing: 0.3px;\n}\n.brand-secure[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-text-light);\n}\n/*# sourceMappingURL=payment.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentComponent, { className: "PaymentComponent", filePath: "src/app/platform/payment/payment.component.ts", lineNumber: 14 });
})();
export {
  PaymentComponent
};
//# sourceMappingURL=chunk-F4RGLCW2.js.map
