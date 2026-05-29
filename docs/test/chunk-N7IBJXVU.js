import {
  ImageGalleryComponent
} from "./chunk-SKPUVJTY.js";
import {
  ShareButtonComponent
} from "./chunk-OSOLSZMF.js";
import {
  PanelShellComponent
} from "./chunk-HNZ54JIB.js";
import {
  ProviderAvatarComponent,
  buildBookingUrl,
  getProviderCategoryLabel,
  isDiscountValid,
  resolveProviderColor
} from "./chunk-ALZX7YLZ.js";
import {
  AuthService
} from "./chunk-3P7EVM2E.js";
import {
  NavigationService
} from "./chunk-ESEX7V6F.js";
import {
  providers
} from "./chunk-D7QO6DLY.js";
import {
  SeoService
} from "./chunk-TGQXGTXP.js";
import {
  locations
} from "./chunk-ZGA5L2H3.js";
import {
  MapBridgeService
} from "./chunk-A5AJB22R.js";
import {
  takeUntilDestroyed
} from "./chunk-KCTK3G3F.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-QWUZPIEQ.js";
import "./chunk-N3IMGYOF.js";
import {
  CommonModule,
  DOCUMENT,
  DestroyRef,
  EventEmitter,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-EBDCVLEQ.js";

// src/app/components/provider-detail/provider-detail.component.ts
function ProviderDetailComponent_app_image_gallery_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-image-gallery", 18);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.provider.images);
  }
}
function ProviderDetailComponent_ul_13_li_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 22);
    \u0275\u0275element(2, "polyline", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", h_r2, " ");
  }
}
function ProviderDetailComponent_ul_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 19);
    \u0275\u0275template(1, ProviderDetailComponent_ul_13_li_1_Template, 4, 1, "li", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.provider.highlights);
  }
}
function ProviderDetailComponent_div_14_button_7__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 39);
    \u0275\u0275element(1, "rect", 40)(2, "path", 41);
    \u0275\u0275elementEnd();
  }
}
function ProviderDetailComponent_div_14_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ProviderDetailComponent_div_14_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copyCoupon());
    });
    \u0275\u0275elementStart(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 37);
    \u0275\u0275template(4, ProviderDetailComponent_div_14_button_7__svg_svg_4_Template, 3, 0, "svg", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.provider.discount.coupon);
    \u0275\u0275advance();
    \u0275\u0275classProp("copied", ctx_r0.couponCopied);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.couponCopied);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.couponCopied ? "\u2713 Copied!" : "Tap to copy", " ");
  }
}
function ProviderDetailComponent_div_14_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function ProviderDetailComponent_div_14_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.authService.openLoginModal());
    });
    \u0275\u0275elementStart(1, "span", 43);
    \u0275\u0275text(2, "XXXXXXXX");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 45);
    \u0275\u0275element(5, "rect", 46)(6, "path", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Sign in to reveal ");
    \u0275\u0275elementEnd()();
  }
}
function ProviderDetailComponent_div_14_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "circle", 50)(3, "polyline", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Valid until ", ctx_r0.discountExpiry, " ");
  }
}
function ProviderDetailComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 26);
    \u0275\u0275element(3, "path", 27)(4, "line", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, ProviderDetailComponent_div_14_button_7_Template, 6, 5, "button", 30)(8, ProviderDetailComponent_div_14_button_8_Template, 8, 0, "button", 31);
    \u0275\u0275elementStart(9, "div", 32)(10, "p", 33);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, ProviderDetailComponent_div_14_div_12_Template, 5, 1, "div", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.provider.discount.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275classProp("discount-box__reveal--locked", !ctx_r0.authService.isLoggedIn());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.provider.discount.instructions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.discountExpiry);
  }
}
function ProviderDetailComponent_a_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 52);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 53);
    \u0275\u0275element(2, "path", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", "https://instagram.com/" + ctx_r0.provider.instagram.replace("@", ""), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.provider.instagram, " ");
  }
}
function ProviderDetailComponent_a_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 55);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 56);
    \u0275\u0275element(2, "path", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", "tel:" + ctx_r0.provider.phone, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.provider.phone, " ");
  }
}
function ProviderDetailComponent_button_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function ProviderDetailComponent_button_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openWebsite());
    });
    \u0275\u0275text(1, " Book Now ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 59);
    \u0275\u0275element(3, "line", 60)(4, "polyline", 61);
    \u0275\u0275elementEnd()();
  }
}
var ProviderDetailComponent = class _ProviderDetailComponent {
  constructor() {
    this.bookRequested = new EventEmitter();
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.router = inject(Router);
    this.authService = inject(AuthService);
    this.couponCopied = false;
  }
  get shareUrl() {
    if (!this.provider?.id)
      return "";
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    return `${origin}/malta?provider=${this.provider.id}`;
  }
  get accentColor() {
    return resolveProviderColor(this.provider);
  }
  get categoryLabel() {
    return getProviderCategoryLabel(this.provider?.category);
  }
  get hasValidDiscount() {
    return !!this.provider.discount && isDiscountValid(this.provider.discount);
  }
  get discountExpiry() {
    const v = this.provider.discount?.validUntil;
    if (!v)
      return null;
    return new Date(v).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  }
  copyCoupon() {
    const code = this.provider?.discount?.coupon;
    if (!code || !isPlatformBrowser(this.platformId))
      return;
    navigator.clipboard?.writeText(code).catch(() => {
    });
    clearTimeout(this.copyTimer);
    this.couponCopied = true;
    this.copyTimer = setTimeout(() => {
      this.couponCopied = false;
    }, 2500);
  }
  openWebsite() {
    if (!this.authService.isLoggedIn()) {
      this.authService.openLoginModal();
      return;
    }
    if (this.provider?.website)
      this.bookRequested.emit(this.provider);
  }
  browseDeals() {
    this.router.navigate(["/malta/deals"]);
  }
  ngOnDestroy() {
    clearTimeout(this.copyTimer);
  }
  static {
    this.\u0275fac = function ProviderDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProviderDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderDetailComponent, selectors: [["app-provider-detail"]], inputs: { provider: "provider" }, outputs: { bookRequested: "bookRequested" }, decls: 24, vars: 20, consts: [[1, "provider-hero"], [1, "provider-hero__badge"], [1, "provider-hero__main"], [3, "provider", "size"], [1, "provider-hero__name"], [1, "provider-hero__tagline"], [3, "src", 4, "ngIf"], [1, "provider-desc"], ["class", "provider-highlights", 4, "ngIf"], ["class", "discount-box", 4, "ngIf"], [1, "provider-links"], ["target", "_blank", "rel", "noopener", "class", "provider-link provider-link--ig", 3, "href", 4, "ngIf"], ["class", "provider-link provider-link--phone", 3, "href", 4, "ngIf"], [1, "provider-actions"], ["label", "Share", 3, "url", "shareTitle"], [1, "provider-action-btn", 3, "click"], [1, "fa", "fa-tag"], ["class", "book-btn", 3, "click", 4, "ngIf"], [3, "src"], [1, "provider-highlights"], ["class", "highlight-item", 4, "ngFor", "ngForOf"], [1, "highlight-item"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "highlight-check"], ["points", "20 6 9 17 4 12"], [1, "discount-box"], [1, "discount-box__header"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"], ["x1", "7", "y1", "7", "x2", "7.01", "y2", "7"], [1, "discount-box__label"], ["class", "discount-box__coupon", 3, "click", 4, "ngIf"], ["class", "discount-box__coupon discount-box__coupon--locked", 3, "click", 4, "ngIf"], [1, "discount-box__reveal"], [1, "discount-box__instructions"], ["class", "discount-box__expiry", 4, "ngIf"], [1, "discount-box__coupon", 3, "click"], [1, "coupon-code"], [1, "coupon-copy-hint"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "9", "y", "9", "width", "13", "height", "13", "rx", "2", "ry", "2"], ["d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"], [1, "discount-box__coupon", "discount-box__coupon--locked", 3, "click"], [1, "coupon-code", "coupon-code--blurred"], [1, "coupon-unlock-hint"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "discount-box__expiry"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], ["target", "_blank", "rel", "noopener", 1, "provider-link", "provider-link--ig", 3, "href"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"], [1, "provider-link", "provider-link--phone", 3, "href"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"], [1, "book-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function ProviderDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 2);
        \u0275\u0275element(4, "app-provider-avatar", 3);
        \u0275\u0275elementStart(5, "div")(6, "h2", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 5);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(10, ProviderDetailComponent_app_image_gallery_10_Template, 1, 1, "app-image-gallery", 6);
        \u0275\u0275elementStart(11, "p", 7);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, ProviderDetailComponent_ul_13_Template, 2, 1, "ul", 8)(14, ProviderDetailComponent_div_14_Template, 13, 7, "div", 9);
        \u0275\u0275elementStart(15, "div", 10);
        \u0275\u0275template(16, ProviderDetailComponent_a_16_Template, 4, 2, "a", 11)(17, ProviderDetailComponent_a_17_Template, 4, 2, "a", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 13);
        \u0275\u0275element(19, "app-share-btn", 14);
        \u0275\u0275elementStart(20, "button", 15);
        \u0275\u0275listener("click", function ProviderDetailComponent_Template_button_click_20_listener() {
          return ctx.browseDeals();
        });
        \u0275\u0275element(21, "i", 16);
        \u0275\u0275text(22, " Browse Deals ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(23, ProviderDetailComponent_button_23_Template, 5, 0, "button", 17);
      }
      if (rf & 2) {
        \u0275\u0275styleProp("background", "linear-gradient(135deg, " + ctx.accentColor + "1a 0%, " + ctx.accentColor + "08 100%)");
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.accentColor + "1a")("color", ctx.accentColor);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.categoryLabel, " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("provider", ctx.provider)("size", 68);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.provider.name);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.provider.tagline);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.images == null ? null : ctx.provider.images.length);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.provider.description);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.highlights == null ? null : ctx.provider.highlights.length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.hasValidDiscount);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.provider.instagram);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.phone);
        \u0275\u0275advance(2);
        \u0275\u0275property("url", ctx.shareUrl)("shareTitle", ctx.provider.name);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.provider.website);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ImageGalleryComponent, ShareButtonComponent, ProviderAvatarComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  padding-bottom: 32px;\n}\n.provider-hero[_ngcontent-%COMP%] {\n  padding: 16px 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 10px;\n}\n.provider-hero__badge[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  padding: 4px 10px;\n  border-radius: 20px;\n}\n.provider-hero__main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.provider-hero__name[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  line-height: 1.2;\n}\n.provider-hero__tagline[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  color: var(--color-text-muted);\n  line-height: 1.4;\n}\n.provider-desc[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 16px 16px 4px;\n  font-size: 14px;\n  color: var(--color-text-secondary);\n  line-height: 1.6;\n}\n.provider-highlights[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 12px 16px;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.highlight-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 13.5px;\n  color: var(--color-text-secondary);\n  font-weight: 500;\n}\n.highlight-check[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #22c55e;\n}\n.discount-box[_ngcontent-%COMP%] {\n  margin: 0 16px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #fffbeb 0%,\n      #fef3c7 100%);\n  border: 1.5px solid var(--color-primary);\n  border-radius: 14px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.discount-box__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #92400e;\n}\n.discount-box__header[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.discount-box__label[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n}\n.discount-box__coupon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: var(--color-bg);\n  border: 1.5px dashed var(--color-primary);\n  border-radius: var(--radius-lg);\n  padding: 12px 16px;\n  cursor: pointer;\n  transition: background var(--transition);\n  width: 100%;\n  text-align: left;\n}\n.discount-box__coupon[_ngcontent-%COMP%]:active {\n  background: #fffbeb;\n}\n.coupon-code[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  letter-spacing: 3px;\n  color: #2C1810;\n  font-family: "Courier New", monospace;\n}\n.coupon-code--blurred[_ngcontent-%COMP%] {\n  filter: blur(6px);\n  -webkit-user-select: none;\n  user-select: none;\n  color: #2C1810;\n}\n.coupon-unlock-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11.5px;\n  color: var(--color-primary);\n  font-weight: 600;\n  white-space: nowrap;\n}\n.discount-box__coupon--locked[_ngcontent-%COMP%] {\n  border-style: dashed;\n  opacity: 0.9;\n}\n.discount-box__coupon--locked[_ngcontent-%COMP%]:active {\n  background: #fffbeb;\n}\n.coupon-copy-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11.5px;\n  color: var(--color-text-light);\n  font-weight: 500;\n  white-space: nowrap;\n}\n.coupon-copy-hint.copied[_ngcontent-%COMP%] {\n  color: #22c55e;\n  font-weight: 600;\n}\n.discount-box__reveal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: filter 0.2s;\n}\n.discount-box__reveal--locked[_ngcontent-%COMP%] {\n  filter: blur(4px);\n  -webkit-user-select: none;\n  user-select: none;\n  pointer-events: none;\n}\n.discount-box__instructions[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  color: #92400e;\n  line-height: 1.5;\n  opacity: 0.85;\n}\n.discount-box__expiry[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  font-weight: 600;\n  color: #b45309;\n  opacity: 0.8;\n}\n.provider-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 0 16px 8px;\n}\n.provider-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 11px 14px;\n  border-radius: var(--radius-lg);\n  font-size: 13.5px;\n  font-weight: 500;\n  text-decoration: none;\n  transition: background var(--transition);\n}\n.provider-link[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.provider-link--ig[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n}\n.provider-link--ig[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.provider-link--phone[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n}\n.provider-link--phone[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.provider-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 4px 16px 4px;\n}\n.provider-action-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 42px;\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg-light);\n  color: var(--color-text-secondary);\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  transition: background var(--transition);\n}\n.provider-action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n}\n.provider-action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.book-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  width: calc(100% - 32px);\n  margin: 8px 16px 0;\n  padding: 14px 20px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-xl);\n  font-size: 15px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background 0.18s, transform 0.1s;\n}\n.book-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n.book-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=provider-detail.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderDetailComponent, { className: "ProviderDetailComponent", filePath: "src/app/components/provider-detail/provider-detail.component.ts", lineNumber: 18 });
})();

// src/app/platform/provider-page/provider-page.component.ts
function ProviderPageComponent_app_share_btn_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-share-btn", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("url", ctx_r0.shareUrl)("shareTitle", ctx_r0.provider.name);
  }
}
function ProviderPageComponent_app_provider_detail_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-detail", 4);
    \u0275\u0275listener("bookRequested", function ProviderPageComponent_app_provider_detail_2_Template_app_provider_detail_bookRequested_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBookRequested($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("provider", ctx_r0.provider);
  }
}
var ProviderPageComponent = class _ProviderPageComponent {
  constructor() {
    this.provider = null;
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.nav = inject(NavigationService);
    this.destroyRef = inject(DestroyRef);
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.seo = inject(SeoService);
    this.bridge = inject(MapBridgeService);
  }
  get shareUrl() {
    if (!this.provider)
      return "";
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    return `${origin}/malta/providers/${this.provider.id}`;
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const mapProviders = providers.filter((p) => p.showOnMap && p.lat && p.lon);
      const fromLocationSlug = this.route.snapshot.queryParamMap.get("fromLocation");
      const fromLoc = fromLocationSlug ? locations.find((l) => l.slug === fromLocationSlug) ?? null : null;
      this.bridge.enterPanelMode(mapProviders, { label: "Back" }, fromLoc, null);
      this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.goBack());
      this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
        if (loc)
          this.router.navigate(["/malta/locations", loc.slug]);
      });
      this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => this.router.navigate(["/malta/providers", p.id]));
    }
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get("id");
      this.provider = providers.find((p) => p.id === id) ?? null;
      if (!this.provider) {
        this.router.navigate(["/malta"]);
        return;
      }
      this.seo.setProviderPage(this.provider);
      if (isPlatformBrowser(this.platformId) && this.provider.lat && this.provider.lon) {
        this.bridge.fitPoint.set({ lat: this.provider.lat, lon: this.provider.lon });
      }
    });
  }
  onBookRequested(provider) {
    const url = buildBookingUrl(provider);
    if (!url)
      return;
    this.bridge.interstitialProvider.set(provider);
    this.bridge.pendingNavUrl.set(url);
  }
  goBack() {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
  static {
    this.\u0275fac = function ProviderPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProviderPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderPageComponent, selectors: [["app-provider-page"]], decls: 3, vars: 3, consts: [[3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd", "title"], ["panelActions", "", 3, "url", "shareTitle", 4, "ngIf"], [3, "provider", "bookRequested", 4, "ngIf"], ["panelActions", "", 3, "url", "shareTitle"], [3, "bookRequested", "provider"]], template: function ProviderPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function ProviderPageComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.goBack();
        })("dragStart", function ProviderPageComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function ProviderPageComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function ProviderPageComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function ProviderPageComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function ProviderPageComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function ProviderPageComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275template(1, ProviderPageComponent_app_share_btn_1_Template, 1, 2, "app-share-btn", 1)(2, ProviderPageComponent_app_provider_detail_2_Template, 1, 1, "app-provider-detail", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275property("title", (tmp_0_0 = ctx.provider == null ? null : ctx.provider.name) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : "");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider);
      }
    }, dependencies: [CommonModule, NgIf, PanelShellComponent, ProviderDetailComponent, ShareButtonComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: contents;\n}\n/*# sourceMappingURL=provider-page.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderPageComponent, { className: "ProviderPageComponent", filePath: "src/app/platform/provider-page/provider-page.component.ts", lineNumber: 48 });
})();
export {
  ProviderPageComponent
};
//# sourceMappingURL=chunk-N7IBJXVU.js.map
