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
  experienceColor,
  experienceIcon,
  findExperience,
  getExperiencePins,
  getProviderCategoryLabel,
  resolveExperienceBookUrl,
  resolveExperienceDiscount
} from "./chunk-ETA2JZSR.js";
import {
  MapBridgeService
} from "./chunk-USW22R6T.js";
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
  NgIf,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-EBVVQ6Y2.js";
import "./chunk-TWWAJFRB.js";

// src/app/map/features/experiences/experience-detail/experience-detail.component.ts
function ExperienceDetailComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "img", 21);
    \u0275\u0275elementStart(2, "span", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.experience.coverImage, \u0275\u0275sanitizeUrl)("alt", ctx_r1.experience.title);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r1.accentColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.icon);
  }
}
function ExperienceDetailComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate(ctx_r1.icon);
  }
}
function ExperienceDetailComponent_app_image_gallery_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-image-gallery", 23);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.experience.images);
  }
}
function ExperienceDetailComponent_app_deal_box_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-deal-box", 24);
    \u0275\u0275listener("couponCopied", function ExperienceDetailComponent_app_deal_box_15_Template_app_deal_box_couponCopied_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.couponCopied.emit());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("discount", ctx_r1.discount);
  }
}
function ExperienceDetailComponent_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function ExperienceDetailComponent_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.book());
    });
    \u0275\u0275text(1, " Book this experience ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 26);
    \u0275\u0275element(3, "line", 27)(4, "polyline", 28);
    \u0275\u0275elementEnd()();
  }
}
var ExperienceDetailComponent = class _ExperienceDetailComponent {
  constructor() {
    this.bookRequested = new EventEmitter();
    this.couponCopied = new EventEmitter();
    this.experienceShared = new EventEmitter();
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.router = inject(Router);
    this.authService = inject(AuthService);
  }
  get accentColor() {
    return experienceColor(this.provider);
  }
  get icon() {
    return experienceIcon(this.experience);
  }
  get categoryLabel() {
    return getProviderCategoryLabel(this.provider?.category);
  }
  get discount() {
    return resolveExperienceDiscount(this.experience, this.provider);
  }
  get shareUrl() {
    if (!this.experience?.id)
      return "";
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    return `${origin}/malta/experiences/${this.experience.id}`;
  }
  openProvider() {
    this.router.navigate(["/malta/providers", this.provider.id]);
  }
  book() {
    if (!this.discount) {
      const url = resolveExperienceBookUrl(this.experience, this.provider);
      if (url && isPlatformBrowser(this.platformId))
        window.open(url, "_blank", "noopener");
      return;
    }
    if (!this.authService.isLoggedIn()) {
      this.authService.openLoginModal();
      return;
    }
    this.bookRequested.emit(this.provider);
  }
  static {
    this.\u0275fac = function ExperienceDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ExperienceDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExperienceDetailComponent, selectors: [["app-experience-detail"]], inputs: { experience: "experience", provider: "provider" }, outputs: { bookRequested: "bookRequested", couponCopied: "couponCopied", experienceShared: "experienceShared" }, decls: 28, vars: 22, consts: [["iconOnly", ""], [1, "exp-hero"], [1, "exp-hero__badge"], [1, "exp-hero__main"], [1, "exp-hero__icon"], [4, "ngIf", "ngIfElse"], [1, "exp-hero__name"], [1, "exp-hero__tagline"], [3, "src", 4, "ngIf"], [1, "exp-desc", 3, "innerHTML"], [3, "discount", "couponCopied", 4, "ngIf"], [1, "offered-by", 3, "click"], [3, "provider", "size"], [1, "offered-by__text"], [1, "offered-by__label"], [1, "offered-by__name"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "offered-by__chevron"], ["points", "9 18 15 12 9 6"], [1, "exp-actions"], ["label", "Share", 3, "shared", "url", "shareTitle"], ["class", "book-btn", 3, "click", 4, "ngIf"], [1, "exp-hero__icon-img", 3, "src", "alt"], [1, "exp-hero__icon-badge"], [3, "src"], [3, "couponCopied", "discount"], [1, "book-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function ExperienceDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 3)(4, "span", 4);
        \u0275\u0275template(5, ExperienceDetailComponent_ng_container_5_Template, 4, 5, "ng-container", 5)(6, ExperienceDetailComponent_ng_template_6_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div")(9, "h2", 6);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p", 7);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(13, ExperienceDetailComponent_app_image_gallery_13_Template, 1, 1, "app-image-gallery", 8);
        \u0275\u0275element(14, "div", 9);
        \u0275\u0275template(15, ExperienceDetailComponent_app_deal_box_15_Template, 1, 1, "app-deal-box", 10);
        \u0275\u0275elementStart(16, "button", 11);
        \u0275\u0275listener("click", function ExperienceDetailComponent_Template_button_click_16_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.openProvider());
        });
        \u0275\u0275element(17, "app-provider-avatar", 12);
        \u0275\u0275elementStart(18, "span", 13)(19, "span", 14);
        \u0275\u0275text(20, "Offered by");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 15);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(23, "svg", 16);
        \u0275\u0275element(24, "polyline", 17);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(25, "div", 18)(26, "app-share-btn", 19);
        \u0275\u0275listener("shared", function ExperienceDetailComponent_Template_app_share_btn_shared_26_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.experienceShared.emit());
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(27, ExperienceDetailComponent_button_27_Template, 5, 0, "button", 20);
      }
      if (rf & 2) {
        const iconOnly_r5 = \u0275\u0275reference(7);
        \u0275\u0275styleProp("background", "linear-gradient(135deg, " + ctx.accentColor + "1a 0%, " + ctx.accentColor + "08 100%)");
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.accentColor + "1a")("color", ctx.accentColor);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.categoryLabel, " ");
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.experience.coverImage)("ngIfElse", iconOnly_r5);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.experience.title);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.experience.tagline);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.experience.images == null ? null : ctx.experience.images.length);
        \u0275\u0275advance();
        \u0275\u0275property("innerHTML", ctx.experience.description, \u0275\u0275sanitizeHtml);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.discount);
        \u0275\u0275advance(2);
        \u0275\u0275property("provider", ctx.provider)("size", 44);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.provider.name);
        \u0275\u0275advance(4);
        \u0275\u0275property("url", ctx.shareUrl)("shareTitle", ctx.experience.title);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.website || ctx.experience.bookUrl);
      }
    }, dependencies: [CommonModule, NgIf, ImageGalleryComponent, ShareButtonComponent, ProviderAvatarComponent, DealBoxComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.exp-hero[_ngcontent-%COMP%] {\n  padding: 18px 16px 16px;\n}\n.exp-hero__badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.4px;\n  text-transform: uppercase;\n  padding: 3px 9px;\n  border-radius: 999px;\n  margin-bottom: 12px;\n}\n.exp-hero__main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.exp-hero__icon[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n  box-shadow: var(--shadow-sm);\n}\n.exp-hero__icon-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 16px;\n  object-fit: cover;\n  display: block;\n}\n.exp-hero__icon-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -5px;\n  bottom: -5px;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: 2px solid #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  box-shadow: var(--shadow-sm);\n}\n.exp-hero__name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  line-height: 1.2;\n}\n.exp-hero__tagline[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.4;\n}\n.exp-desc[_ngcontent-%COMP%] {\n  padding: 4px 16px 16px;\n  font-size: 14px;\n  line-height: 1.6;\n  color: var(--color-text-secondary);\n}\n.exp-desc[_ngcontent-%COMP%]     b {\n  color: var(--color-text-base);\n}\n.offered-by[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: calc(100% - 32px);\n  margin: 0 16px 16px;\n  padding: 10px 12px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  cursor: pointer;\n  text-align: left;\n  transition: background var(--transition);\n}\n.offered-by[_ngcontent-%COMP%]:active {\n  background: var(--color-bg-muted);\n}\n.offered-by__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-width: 0;\n}\n.offered-by__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--color-text-light);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.offered-by__name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.offered-by__chevron[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--color-text-light);\n}\n.exp-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 0 16px 8px;\n}\n.book-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  width: calc(100% - 32px);\n  margin: 8px 16px 20px;\n  padding: 14px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-xl);\n  font-size: 15px;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 2px 10px var(--color-primary-shadow);\n  transition: background var(--transition);\n}\n.book-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n/*# sourceMappingURL=experience-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExperienceDetailComponent, { className: "ExperienceDetailComponent", filePath: "src/app/map/features/experiences/experience-detail/experience-detail.component.ts", lineNumber: 20 });
})();

// src/app/map/features/experiences/experience-page/experience-page.component.ts
function ExperiencePageComponent_app_share_btn_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-share-btn", 3);
    \u0275\u0275listener("shared", function ExperiencePageComponent_app_share_btn_1_Template_app_share_btn_shared_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.tracking.trackProvider(ctx_r1.provider.id, "shared"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("url", ctx_r1.shareUrl)("shareTitle", ctx_r1.experience.title);
  }
}
function ExperiencePageComponent_app_experience_detail_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-experience-detail", 4);
    \u0275\u0275listener("bookRequested", function ExperiencePageComponent_app_experience_detail_2_Template_app_experience_detail_bookRequested_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBookRequested());
    })("couponCopied", function ExperiencePageComponent_app_experience_detail_2_Template_app_experience_detail_couponCopied_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.tracking.trackProvider(ctx_r1.provider.id, "coupon_copy"));
    })("experienceShared", function ExperiencePageComponent_app_experience_detail_2_Template_app_experience_detail_experienceShared_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.tracking.trackProvider(ctx_r1.provider.id, "shared"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("experience", ctx_r1.experience)("provider", ctx_r1.provider);
  }
}
var ExperiencePageComponent = class _ExperiencePageComponent {
  constructor() {
    this.experience = null;
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
    if (!this.experience)
      return "";
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    return `${origin}/malta/experiences/${this.experience.id}`;
  }
  ngOnInit() {
    const all = providers;
    if (isPlatformBrowser(this.platformId)) {
      this.bridge.enterPanelMode([], { label: "Back" });
      this.bridge.showGems.set(false);
      this.bridge.experiencePins.set(getExperiencePins(all));
      this.bridge.eventVenuePins.set(getEventVenuePins(upcomingEvents(events, /* @__PURE__ */ new Date())));
      this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.goBack());
      this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
        if (loc)
          this.router.navigate(["/malta/locations", loc.slug]);
      });
    }
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const found = findExperience(all, params.get("id") ?? "");
      if (!found) {
        this.router.navigate(["/malta"]);
        return;
      }
      this.experience = found.experience;
      this.provider = found.provider;
      this.seo.setExperiencePage(this.experience, this.provider);
      if (isPlatformBrowser(this.platformId)) {
        this.tracking.trackProvider(this.provider.id, "viewed");
        const spot = this.experience.spots[0];
        if (spot)
          this.bridge.fitPoint.set({ lat: spot.lat, lon: spot.lon });
      }
    });
  }
  onBookRequested() {
    if (!this.experience || !this.provider)
      return;
    const url = resolveExperienceBookUrl(this.experience, this.provider);
    if (!url)
      return;
    this.tracking.trackProvider(this.provider.id, "book_now");
    this.bridge.interstitialProvider.set(this.provider);
    this.bridge.pendingNavUrl.set(url);
  }
  goBack() {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
  static {
    this.\u0275fac = function ExperiencePageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ExperiencePageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExperiencePageComponent, selectors: [["app-experience-page"]], decls: 3, vars: 3, consts: [[3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd", "title"], ["panelActions", "", 3, "url", "shareTitle", "shared", 4, "ngIf"], [3, "experience", "provider", "bookRequested", "couponCopied", "experienceShared", 4, "ngIf"], ["panelActions", "", 3, "shared", "url", "shareTitle"], [3, "bookRequested", "couponCopied", "experienceShared", "experience", "provider"]], template: function ExperiencePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function ExperiencePageComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.goBack();
        })("dragStart", function ExperiencePageComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function ExperiencePageComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function ExperiencePageComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function ExperiencePageComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function ExperiencePageComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function ExperiencePageComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275template(1, ExperiencePageComponent_app_share_btn_1_Template, 1, 2, "app-share-btn", 1)(2, ExperiencePageComponent_app_experience_detail_2_Template, 1, 2, "app-experience-detail", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275property("title", (tmp_0_0 = ctx.experience == null ? null : ctx.experience.title) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : "");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.experience);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.experience && ctx.provider);
      }
    }, dependencies: [CommonModule, NgIf, PanelShellComponent, ExperienceDetailComponent, ShareButtonComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: contents;\n}\n/*# sourceMappingURL=experience-page.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExperiencePageComponent, { className: "ExperiencePageComponent", filePath: "src/app/map/features/experiences/experience-page/experience-page.component.ts", lineNumber: 54 });
})();
export {
  ExperiencePageComponent
};
//# sourceMappingURL=chunk-UXYV5RPR.js.map
