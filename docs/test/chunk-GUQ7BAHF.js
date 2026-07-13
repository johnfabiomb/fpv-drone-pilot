import {
  AuthService
} from "./chunk-QYGWLPIV.js";
import {
  isDiscountValid,
  resolveProviderColor
} from "./chunk-ETA2JZSR.js";
import {
  CommonModule,
  EventEmitter,
  NgIf,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-EBVVQ6Y2.js";

// src/app/map/features/providers/provider-avatar/provider-avatar.component.ts
function ProviderAvatarComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "img", 3);
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("border-color", (tmp_2_0 = ctx_r0.provider.pinBorderColor) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "#fff");
    \u0275\u0275property("src", ctx_r0.provider.coverImage, \u0275\u0275sanitizeUrl)("alt", ctx_r0.provider.name);
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r0.badgeSize, "px")("height", ctx_r0.badgeSize, "px")("font-size", ctx_r0.badgeFont, "px");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.provider.emoji, " ");
  }
}
function ProviderAvatarComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("font-size", ctx_r0.emojiFont, "px");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.provider.emoji);
  }
}
var ProviderAvatarComponent = class _ProviderAvatarComponent {
  constructor() {
    this.size = 68;
  }
  get accentColor() {
    return resolveProviderColor(this.provider);
  }
  get badgeSize() {
    return Math.round(this.size * 0.38);
  }
  get badgeFont() {
    return Math.round(this.size * 0.22);
  }
  get emojiFont() {
    return Math.round(this.size * 0.6);
  }
  static {
    this.\u0275fac = function ProviderAvatarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProviderAvatarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderAvatarComponent, selectors: [["app-provider-avatar"]], inputs: { provider: "provider", size: "size" }, decls: 4, vars: 6, consts: [["emojiOnly", ""], [1, "avatar"], [4, "ngIf", "ngIfElse"], [1, "avatar__img", 3, "src", "alt"], [1, "avatar__badge"], [1, "avatar__emoji"]], template: function ProviderAvatarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275template(1, ProviderAvatarComponent_ng_container_1_Template, 4, 11, "ng-container", 2)(2, ProviderAvatarComponent_ng_template_2_Template, 2, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const emojiOnly_r2 = \u0275\u0275reference(3);
        \u0275\u0275styleProp("width", ctx.size, "px")("height", ctx.size, "px");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.coverImage)("ngIfElse", emojiOnly_r2);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n[_nghost-%COMP%] {\n  display: contents;\n}\n.avatar[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n}\n.avatar__img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2.5px solid;\n  display: block;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);\n}\n.avatar__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -3px;\n  right: -3px;\n  background: var(--color-bg);\n  border-radius: 50%;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n}\n.avatar__emoji[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  line-height: 1;\n}\n/*# sourceMappingURL=provider-avatar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderAvatarComponent, { className: "ProviderAvatarComponent", filePath: "src/app/map/features/providers/provider-avatar/provider-avatar.component.ts", lineNumber: 67 });
})();

// src/app/map/ui/deal-box/deal-box.component.ts
function DealBoxComponent_div_0_button_7__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 16);
    \u0275\u0275element(1, "rect", 17)(2, "path", 18);
    \u0275\u0275elementEnd();
  }
}
function DealBoxComponent_div_0_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function DealBoxComponent_div_0_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.copyCoupon());
    });
    \u0275\u0275elementStart(1, "span", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275template(4, DealBoxComponent_div_0_button_7__svg_svg_4_Template, 3, 0, "svg", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.discount.coupon);
    \u0275\u0275advance();
    \u0275\u0275classProp("copied", ctx_r1.isCouponCopied);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isCouponCopied);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isCouponCopied ? "\u2713 Copied!" : "Tap to copy", " ");
  }
}
function DealBoxComponent_div_0_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function DealBoxComponent_div_0_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.authService.openLoginModal());
    });
    \u0275\u0275elementStart(1, "span", 20);
    \u0275\u0275text(2, "XXXXXXXX");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 22);
    \u0275\u0275element(5, "rect", 23)(6, "path", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Sign in to reveal ");
    \u0275\u0275elementEnd()();
  }
}
function DealBoxComponent_div_0_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "circle", 27)(3, "polyline", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Valid until ", ctx_r1.expiry, " ");
  }
}
function DealBoxComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 3);
    \u0275\u0275element(3, "path", 4)(4, "line", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 6);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, DealBoxComponent_div_0_button_7_Template, 6, 5, "button", 7)(8, DealBoxComponent_div_0_button_8_Template, 8, 0, "button", 8);
    \u0275\u0275elementStart(9, "div", 9)(10, "p", 10);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, DealBoxComponent_div_0_div_12_Template, 5, 1, "div", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.discount.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275classProp("discount-box__reveal--locked", !ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.discount.instructions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.expiry);
  }
}
var DealBoxComponent = class _DealBoxComponent {
  constructor() {
    this.couponCopied = new EventEmitter();
    this.platformId = inject(PLATFORM_ID);
    this.authService = inject(AuthService);
    this.isCouponCopied = false;
  }
  get isValid() {
    return !!this.discount && isDiscountValid(this.discount);
  }
  get expiry() {
    const v = this.discount?.validUntil;
    return v ? new Date(v).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : null;
  }
  copyCoupon() {
    const code = this.discount?.coupon;
    if (!code || !isPlatformBrowser(this.platformId))
      return;
    navigator.clipboard?.writeText(code).catch(() => {
    });
    clearTimeout(this.copyTimer);
    this.isCouponCopied = true;
    this.copyTimer = setTimeout(() => {
      this.isCouponCopied = false;
    }, 2500);
    this.couponCopied.emit();
  }
  ngOnDestroy() {
    clearTimeout(this.copyTimer);
  }
  static {
    this.\u0275fac = function DealBoxComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DealBoxComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DealBoxComponent, selectors: [["app-deal-box"]], inputs: { discount: "discount" }, outputs: { couponCopied: "couponCopied" }, decls: 1, vars: 1, consts: [["class", "discount-box", 4, "ngIf"], [1, "discount-box"], [1, "discount-box__header"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"], ["x1", "7", "y1", "7", "x2", "7.01", "y2", "7"], [1, "discount-box__label"], ["class", "discount-box__coupon", 3, "click", 4, "ngIf"], ["class", "discount-box__coupon discount-box__coupon--locked", 3, "click", 4, "ngIf"], [1, "discount-box__reveal"], [1, "discount-box__instructions"], ["class", "discount-box__expiry", 4, "ngIf"], [1, "discount-box__coupon", 3, "click"], [1, "coupon-code"], [1, "coupon-copy-hint"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "9", "y", "9", "width", "13", "height", "13", "rx", "2", "ry", "2"], ["d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"], [1, "discount-box__coupon", "discount-box__coupon--locked", 3, "click"], [1, "coupon-code", "coupon-code--blurred"], [1, "coupon-unlock-hint"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "discount-box__expiry"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"]], template: function DealBoxComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DealBoxComponent_div_0_Template, 13, 7, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.isValid);
      }
    }, dependencies: [CommonModule, NgIf], styles: ['\n\n.discount-box[_ngcontent-%COMP%] {\n  margin: 0 16px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #fffbeb 0%,\n      #fef3c7 100%);\n  border: 1.5px solid var(--color-primary);\n  border-radius: 14px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.discount-box__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #92400e;\n}\n.discount-box__header[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.discount-box__label[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n}\n.discount-box__coupon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: var(--color-bg);\n  border: 1.5px dashed var(--color-primary);\n  border-radius: var(--radius-lg);\n  padding: 12px 16px;\n  cursor: pointer;\n  transition: background var(--transition);\n  width: 100%;\n  text-align: left;\n}\n.discount-box__coupon[_ngcontent-%COMP%]:active {\n  background: #fffbeb;\n}\n.coupon-code[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  letter-spacing: 3px;\n  color: #2C1810;\n  font-family: "Courier New", monospace;\n}\n.coupon-code--blurred[_ngcontent-%COMP%] {\n  filter: blur(6px);\n  -webkit-user-select: none;\n  user-select: none;\n  color: #2C1810;\n}\n.coupon-unlock-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11.5px;\n  color: var(--color-primary);\n  font-weight: 600;\n  white-space: nowrap;\n}\n.discount-box__coupon--locked[_ngcontent-%COMP%] {\n  border-style: dashed;\n  opacity: 0.9;\n}\n.discount-box__coupon--locked[_ngcontent-%COMP%]:active {\n  background: #fffbeb;\n}\n.coupon-copy-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11.5px;\n  color: var(--color-text-light);\n  font-weight: 500;\n  white-space: nowrap;\n}\n.coupon-copy-hint.copied[_ngcontent-%COMP%] {\n  color: #22c55e;\n  font-weight: 600;\n}\n.discount-box__reveal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: filter 0.2s;\n}\n.discount-box__reveal--locked[_ngcontent-%COMP%] {\n  filter: blur(4px);\n  -webkit-user-select: none;\n  user-select: none;\n  pointer-events: none;\n}\n.discount-box__instructions[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  color: #92400e;\n  line-height: 1.5;\n  opacity: 0.85;\n}\n.discount-box__expiry[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  font-weight: 600;\n  color: #b45309;\n  opacity: 0.8;\n}\n/*# sourceMappingURL=deal-box.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DealBoxComponent, { className: "DealBoxComponent", filePath: "src/app/map/ui/deal-box/deal-box.component.ts", lineNumber: 19 });
})();

export {
  ProviderAvatarComponent,
  DealBoxComponent
};
//# sourceMappingURL=chunk-GUQ7BAHF.js.map
