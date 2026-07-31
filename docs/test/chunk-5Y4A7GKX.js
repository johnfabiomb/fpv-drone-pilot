import {
  DealBoxComponent,
  ProviderAvatarComponent
} from "./chunk-GUQ7BAHF.js";
import {
  ImageGalleryComponent,
  InteractionTrackingService
} from "./chunk-UE5RIJ3O.js";
import {
  ShareButtonComponent
} from "./chunk-V57ZMLW4.js";
import {
  PanelShellComponent
} from "./chunk-MPKSAMEJ.js";
import {
  AuthService
} from "./chunk-QYGWLPIV.js";
import "./chunk-YDLK2X2B.js";
import {
  events
} from "./chunk-S3HAMASV.js";
import {
  NavigationService
} from "./chunk-372PF7SV.js";
import {
  providers
} from "./chunk-TQBWL2QT.js";
import {
  SeoService
} from "./chunk-WFXQZ6RY.js";
import {
  getEventVenuePins,
  upcomingEvents
} from "./chunk-BU7ZDQCB.js";
import {
  buildBookingUrl,
  getExperiencePins,
  getProviderCategoryLabel,
  resolveProviderColor
} from "./chunk-ETA2JZSR.js";
import {
  MapBridgeService
} from "./chunk-USW22R6T.js";
import {
  locations
} from "./chunk-2SBWNCG7.js";
import "./chunk-5FMFH5XE.js";
import {
  takeUntilDestroyed
} from "./chunk-Q5BD35NP.js";
import "./chunk-4746DPCT.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-Q6APD67I.js";
import "./chunk-GHBBMOR7.js";
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
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-EBVVQ6Y2.js";
import "./chunk-TWWAJFRB.js";

// src/app/map/features/providers/provider-detail/provider-detail.component.ts
function ProviderDetailComponent_app_image_gallery_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-image-gallery", 18);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.provider.images);
  }
}
function ProviderDetailComponent_ul_12_li_1_Template(rf, ctx) {
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
function ProviderDetailComponent_ul_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 19);
    \u0275\u0275template(1, ProviderDetailComponent_ul_12_li_1_Template, 4, 1, "li", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.provider.highlights);
  }
}
function ProviderDetailComponent_app_deal_box_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-deal-box", 24);
    \u0275\u0275listener("couponCopied", function ProviderDetailComponent_app_deal_box_13_Template_app_deal_box_couponCopied_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.couponCopied.emit());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("discount", ctx_r0.provider.discount);
  }
}
function ProviderDetailComponent_a_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "path", 27);
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
function ProviderDetailComponent_a_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 28);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 29);
    \u0275\u0275element(2, "path", 30);
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
function ProviderDetailComponent_button_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function ProviderDetailComponent_button_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openWebsite());
    });
    \u0275\u0275text(1, " Book Now ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 32);
    \u0275\u0275element(3, "line", 33)(4, "polyline", 34);
    \u0275\u0275elementEnd()();
  }
}
var ProviderDetailComponent = class _ProviderDetailComponent {
  constructor() {
    this.bookRequested = new EventEmitter();
    this.couponCopied = new EventEmitter();
    this.providerShared = new EventEmitter();
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.router = inject(Router);
    this.authService = inject(AuthService);
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
  static {
    this.\u0275fac = function ProviderDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProviderDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderDetailComponent, selectors: [["app-provider-detail"]], inputs: { provider: "provider" }, outputs: { bookRequested: "bookRequested", couponCopied: "couponCopied", providerShared: "providerShared" }, decls: 23, vars: 20, consts: [[1, "provider-hero"], [1, "provider-hero__badge"], [1, "provider-hero__main"], [3, "provider", "size"], [1, "provider-hero__name"], [1, "provider-hero__tagline"], [3, "src", 4, "ngIf"], [1, "provider-desc", 3, "innerHTML"], ["class", "provider-highlights", 4, "ngIf"], [3, "discount", "couponCopied", 4, "ngIf"], [1, "provider-links"], ["target", "_blank", "rel", "noopener", "class", "provider-link provider-link--ig", 3, "href", 4, "ngIf"], ["class", "provider-link provider-link--phone", 3, "href", 4, "ngIf"], [1, "provider-actions"], ["label", "Share", 3, "shared", "url", "shareTitle"], [1, "provider-action-btn", 3, "click"], [1, "fa", "fa-tag"], ["class", "book-btn", 3, "click", 4, "ngIf"], [3, "src"], [1, "provider-highlights"], ["class", "highlight-item", 4, "ngFor", "ngForOf"], [1, "highlight-item"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "highlight-check"], ["points", "20 6 9 17 4 12"], [3, "couponCopied", "discount"], ["target", "_blank", "rel", "noopener", 1, "provider-link", "provider-link--ig", 3, "href"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"], [1, "provider-link", "provider-link--phone", 3, "href"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"], [1, "book-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function ProviderDetailComponent_Template(rf, ctx) {
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
        \u0275\u0275element(11, "div", 7);
        \u0275\u0275template(12, ProviderDetailComponent_ul_12_Template, 2, 1, "ul", 8)(13, ProviderDetailComponent_app_deal_box_13_Template, 1, 1, "app-deal-box", 9);
        \u0275\u0275elementStart(14, "div", 10);
        \u0275\u0275template(15, ProviderDetailComponent_a_15_Template, 4, 2, "a", 11)(16, ProviderDetailComponent_a_16_Template, 4, 2, "a", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 13)(18, "app-share-btn", 14);
        \u0275\u0275listener("shared", function ProviderDetailComponent_Template_app_share_btn_shared_18_listener() {
          return ctx.providerShared.emit();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "button", 15);
        \u0275\u0275listener("click", function ProviderDetailComponent_Template_button_click_19_listener() {
          return ctx.browseDeals();
        });
        \u0275\u0275element(20, "i", 16);
        \u0275\u0275text(21, " Browse Deals ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(22, ProviderDetailComponent_button_22_Template, 5, 0, "button", 17);
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
        \u0275\u0275advance();
        \u0275\u0275property("innerHTML", ctx.provider.description, \u0275\u0275sanitizeHtml);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.highlights == null ? null : ctx.provider.highlights.length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.discount);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.provider.instagram);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.phone);
        \u0275\u0275advance(2);
        \u0275\u0275property("url", ctx.shareUrl)("shareTitle", ctx.provider.name);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.provider.website);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ImageGalleryComponent, ShareButtonComponent, ProviderAvatarComponent, DealBoxComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  padding-bottom: 32px;\n}\n.provider-hero[_ngcontent-%COMP%] {\n  padding: 16px 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 10px;\n}\n.provider-hero__badge[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  padding: 4px 10px;\n  border-radius: 20px;\n}\n.provider-hero__main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.provider-hero__name[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  line-height: 1.2;\n}\n.provider-hero__tagline[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  color: var(--color-text-muted);\n  line-height: 1.4;\n}\n.provider-desc[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 16px 16px 4px;\n  font-size: 14px;\n  color: var(--color-text-secondary);\n  line-height: 1.6;\n}\n.provider-desc[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n}\n.provider-desc[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.provider-desc[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 4px 0 8px;\n  padding-left: 18px;\n}\n.provider-desc[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.provider-desc[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-base);\n}\n.provider-desc[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  opacity: 0.8;\n}\n.provider-highlights[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 12px 16px;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.highlight-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 13.5px;\n  color: var(--color-text-secondary);\n  font-weight: 500;\n}\n.highlight-check[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #22c55e;\n}\n.provider-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 0 16px 8px;\n}\n.provider-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 11px 14px;\n  border-radius: var(--radius-lg);\n  font-size: 13.5px;\n  font-weight: 500;\n  text-decoration: none;\n  transition: background var(--transition);\n}\n.provider-link[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.provider-link--ig[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n}\n.provider-link--ig[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.provider-link--phone[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n}\n.provider-link--phone[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.provider-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 4px 16px 4px;\n}\n.provider-action-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 42px;\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg-light);\n  color: var(--color-text-secondary);\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  transition: background var(--transition);\n}\n.provider-action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n}\n.provider-action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.book-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  width: calc(100% - 32px);\n  margin: 8px 16px 0;\n  padding: 14px 20px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-xl);\n  font-size: 15px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background 0.18s, transform 0.1s;\n}\n.book-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n.book-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=provider-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderDetailComponent, { className: "ProviderDetailComponent", filePath: "src/app/map/features/providers/provider-detail/provider-detail.component.ts", lineNumber: 19 });
})();

// src/app/map/features/providers/provider-page/provider-page.component.ts
function ProviderPageComponent_app_share_btn_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-share-btn", 3);
    \u0275\u0275listener("shared", function ProviderPageComponent_app_share_btn_1_Template_app_share_btn_shared_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.tracking.trackProvider(ctx_r1.provider.id, "shared"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("url", ctx_r1.shareUrl)("shareTitle", ctx_r1.provider.name);
  }
}
function ProviderPageComponent_app_provider_detail_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-provider-detail", 4);
    \u0275\u0275listener("bookRequested", function ProviderPageComponent_app_provider_detail_2_Template_app_provider_detail_bookRequested_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBookRequested($event));
    })("couponCopied", function ProviderPageComponent_app_provider_detail_2_Template_app_provider_detail_couponCopied_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.tracking.trackProvider(ctx_r1.provider.id, "coupon_copy"));
    })("providerShared", function ProviderPageComponent_app_provider_detail_2_Template_app_provider_detail_providerShared_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.tracking.trackProvider(ctx_r1.provider.id, "shared"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("provider", ctx_r1.provider);
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
    this.tracking = inject(InteractionTrackingService);
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
      const fromLocationSlug = this.route.snapshot.queryParamMap.get("fromLocation");
      const fromLoc = fromLocationSlug ? locations.find((l) => l.slug === fromLocationSlug) ?? null : null;
      this.bridge.enterPanelMode([], { label: "Back" }, fromLoc, null);
      this.bridge.showGems.set(false);
      this.bridge.experiencePins.set(getExperiencePins(providers));
      this.bridge.eventVenuePins.set(getEventVenuePins(upcomingEvents(events, /* @__PURE__ */ new Date())));
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
      if (isPlatformBrowser(this.platformId)) {
        this.tracking.trackProvider(this.provider.id, "viewed");
      }
      if (isPlatformBrowser(this.platformId) && this.provider.lat && this.provider.lon) {
        this.bridge.fitPoint.set({ lat: this.provider.lat, lon: this.provider.lon });
      }
    });
  }
  onBookRequested(provider) {
    const url = buildBookingUrl(provider);
    if (!url)
      return;
    this.tracking.trackProvider(provider.id, "book_now");
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderPageComponent, selectors: [["app-provider-page"]], decls: 3, vars: 3, consts: [[3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd", "title"], ["panelActions", "", 3, "url", "shareTitle", "shared", 4, "ngIf"], [3, "provider", "bookRequested", "couponCopied", "providerShared", 4, "ngIf"], ["panelActions", "", 3, "shared", "url", "shareTitle"], [3, "bookRequested", "couponCopied", "providerShared", "provider"]], template: function ProviderPageComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderPageComponent, { className: "ProviderPageComponent", filePath: "src/app/map/features/providers/provider-page/provider-page.component.ts", lineNumber: 55 });
})();
export {
  ProviderPageComponent
};
//# sourceMappingURL=chunk-5Y4A7GKX.js.map
