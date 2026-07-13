import {
  AuthService
} from "./chunk-QYGWLPIV.js";
import {
  supabase
} from "./chunk-YDLK2X2B.js";
import {
  ApplicationRef,
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-EBVVQ6Y2.js";

// src/app/map/core/services/interaction-tracking.service.ts
var InteractionTrackingService = class _InteractionTrackingService {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.auth = inject(AuthService);
    this.stats = signal(/* @__PURE__ */ new Map());
    this.aggregateStats = signal(/* @__PURE__ */ new Map());
  }
  trackLocation(slug, event) {
    this.track("location", slug, event);
  }
  trackProvider(id, event) {
    this.track("provider", id, event);
  }
  statsFor(entityType, entityId) {
    return this.stats().get(`${entityType}:${entityId}`);
  }
  aggregateStatsFor(slug) {
    return this.aggregateStats().get(`location:${slug}`);
  }
  track(entityType, entityId, event) {
    if (!isPlatformBrowser(this.platformId))
      return;
    if (event === "saved" && !this.auth.isLoggedIn())
      return;
    if (entityType === "provider" && !this.auth.isLoggedIn())
      return;
    void supabase.rpc("track_interaction", {
      p_entity_type: entityType,
      p_entity_id: entityId,
      p_event: event
    }).then(({ data, error }) => {
      if (error || !data)
        return;
      const response = data;
      const key = `${entityType}:${entityId}`;
      if (response.stats) {
        const row = response.stats;
        this.stats.update((m) => {
          const next = new Map(m);
          next.set(key, {
            viewCount: row["view_count"] ?? 0,
            saveCount: row["save_count"] ?? 0,
            shareCount: row["share_count"] ?? 0,
            bookNowCount: row["book_now_count"] ?? 0,
            couponCopyCount: row["coupon_copy_count"] ?? 0,
            firstViewedAt: row["first_viewed_at"] ?? null,
            lastViewedAt: row["last_viewed_at"] ?? null
          });
          return next;
        });
      }
      if (response.aggregate) {
        const agg = response.aggregate;
        this.aggregateStats.update((m) => {
          const next = new Map(m);
          next.set(key, {
            totalViews: agg["total_views"] ?? 0,
            totalSaves: agg["total_saves"] ?? 0,
            totalShares: agg["total_shares"] ?? 0
          });
          return next;
        });
      }
    });
  }
  static {
    this.\u0275fac = function InteractionTrackingService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InteractionTrackingService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InteractionTrackingService, factory: _InteractionTrackingService.\u0275fac, providedIn: "root" });
  }
};

// src/app/map/ui/image-gallery/image-gallery.component.ts
var _c0 = ["lightboxTpl"];
function ImageGalleryComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275listener("click", function ImageGalleryComponent_div_2_Template_div_click_0_listener() {
      const i_r3 = \u0275\u0275restoreView(_r2).index;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goTo(i_r3));
    });
    \u0275\u0275element(1, "div", 9);
    \u0275\u0275elementStart(2, "img", 10);
    \u0275\u0275listener("load", function ImageGalleryComponent_div_2_Template_img_load_2_listener() {
      const img_r5 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.markLoaded(img_r5));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const img_r5 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("is-active", i_r3 === ctx_r3.active);
    \u0275\u0275attribute("data-offset", ctx_r3.circularOffset(i_r3));
    \u0275\u0275advance();
    \u0275\u0275classProp("hidden", ctx_r3.isLoaded(img_r5));
    \u0275\u0275advance();
    \u0275\u0275classProp("loaded", ctx_r3.isLoaded(img_r5));
    \u0275\u0275property("src", img_r5, \u0275\u0275sanitizeUrl);
  }
}
function ImageGalleryComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275listener("click", function ImageGalleryComponent_div_3_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.prev());
    });
    \u0275\u0275elementEnd();
  }
}
function ImageGalleryComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275listener("click", function ImageGalleryComponent_div_4_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.next());
    });
    \u0275\u0275elementEnd();
  }
}
function ImageGalleryComponent_span_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275listener("click", function ImageGalleryComponent_span_6_Template_span_click_0_listener() {
      const i_r9 = \u0275\u0275restoreView(_r8).index;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goTo(i_r9));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r9 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", i_r9 === ctx_r3.active);
  }
}
function ImageGalleryComponent_ng_template_7_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function ImageGalleryComponent_ng_template_7_button_7_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.lightboxPrev();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 33);
    \u0275\u0275element(2, "polyline", 34);
    \u0275\u0275elementEnd()();
  }
}
function ImageGalleryComponent_ng_template_7_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ImageGalleryComponent_ng_template_7_button_8_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.lightboxNext();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 33);
    \u0275\u0275element(2, "polyline", 36);
    \u0275\u0275elementEnd()();
  }
}
function ImageGalleryComponent_ng_template_7_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r3.lightboxIndex + 1, " / ", ctx_r3.images.length, "");
  }
}
function ImageGalleryComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275listener("click", function ImageGalleryComponent_ng_template_7_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeLightbox());
    })("touchstart", function ImageGalleryComponent_ng_template_7_Template_div_touchstart_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onLightboxTouchStart($event));
    })("touchend", function ImageGalleryComponent_ng_template_7_Template_div_touchend_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onLightboxTouchEnd($event));
    });
    \u0275\u0275elementStart(1, "button", 15);
    \u0275\u0275listener("click", function ImageGalleryComponent_ng_template_7_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeLightbox());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 16);
    \u0275\u0275element(3, "line", 17)(4, "line", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 19);
    \u0275\u0275listener("click", function ImageGalleryComponent_ng_template_7_Template_div_click_5_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(6, "img", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ImageGalleryComponent_ng_template_7_button_7_Template, 3, 0, "button", 21)(8, ImageGalleryComponent_ng_template_7_button_8_Template, 3, 0, "button", 22);
    \u0275\u0275elementStart(9, "div", 23);
    \u0275\u0275listener("click", function ImageGalleryComponent_ng_template_7_Template_div_click_9_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(10, "button", 24);
    \u0275\u0275listener("click", function ImageGalleryComponent_ng_template_7_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.zoomOut());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 25);
    \u0275\u0275element(12, "circle", 26)(13, "line", 27)(14, "line", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "span", 29);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 24);
    \u0275\u0275listener("click", function ImageGalleryComponent_ng_template_7_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.zoomIn());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 25);
    \u0275\u0275element(19, "circle", 26)(20, "line", 27)(21, "line", 30)(22, "line", 28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(23, ImageGalleryComponent_ng_template_7_div_23_Template, 2, 2, "div", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275styleProp("transform", "scale(" + ctx_r3.lightboxScale + ")");
    \u0275\u0275property("src", ctx_r3.images[ctx_r3.lightboxIndex], \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.images.length > 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.images.length > 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.lightboxScale <= 1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", (ctx_r3.lightboxScale * 100).toFixed(0), "%");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.lightboxScale >= 4);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r3.images.length > 1);
  }
}
var AUTO_MS = 2500;
var RESUME_MS = 5e3;
var ImageGalleryComponent = class _ImageGalleryComponent {
  constructor() {
    this.images = [];
    this.active = 0;
    this.loadedImgs = /* @__PURE__ */ new Set();
    this.autoTimer = null;
    this.resumeTimer = null;
    this.touchStartX = 0;
    this.appRef = inject(ApplicationRef);
    this.document = inject(DOCUMENT);
    this.platformId = inject(PLATFORM_ID);
    this.lightboxViewRef = null;
    this.lightboxIndex = 0;
    this.lightboxScale = 1;
    this.lbTouchStartX = 0;
    this.lbLastTap = 0;
  }
  set src(value) {
    const next = value ?? [];
    if (next.length === this.images.length && next.every((u, i) => u === this.images[i]))
      return;
    this.images = next;
    this.active = 0;
    this.loadedImgs.clear();
    if (!isPlatformBrowser(this.platformId))
      return;
    this.restartAuto();
    const toCheck = [...new Set(this.images)];
    setTimeout(() => {
      toCheck.forEach((url) => {
        const probe = new Image();
        probe.src = url;
        if (probe.complete && probe.naturalWidth > 0) {
          this.markLoaded(url);
        }
      });
    }, 0);
  }
  markLoaded(img) {
    this.loadedImgs.add(img);
  }
  isLoaded(img) {
    return this.loadedImgs.has(img);
  }
  // ── Auto-play ─────────────────────────────────────────────
  restartAuto() {
    this.clearTimers();
    if (this.images.length > 1) {
      this.autoTimer = setInterval(() => {
        this.active = (this.active + 1) % this.images.length;
      }, AUTO_MS);
    }
  }
  pauseAndResume() {
    this.clearTimers();
    this.resumeTimer = setTimeout(() => this.restartAuto(), RESUME_MS);
  }
  clearTimers() {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }
    if (this.resumeTimer) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = null;
    }
  }
  ngOnDestroy() {
    this.clearTimers();
    this.destroyLightboxView();
  }
  // ── Navigation ────────────────────────────────────────────
  next() {
    if (!this.canNavigate)
      return;
    this.active = (this.active + 1) % this.images.length;
    this.pauseAndResume();
  }
  prev() {
    if (!this.canNavigate)
      return;
    this.active = (this.active - 1 + this.images.length) % this.images.length;
    this.pauseAndResume();
  }
  goTo(index) {
    if (index === this.active) {
      this.openLightbox(index);
      return;
    }
    if (!this.canNavigate)
      return;
    this.active = index;
    this.pauseAndResume();
  }
  get lightboxOpen() {
    return this.lightboxViewRef !== null;
  }
  openLightbox(index) {
    if (!isPlatformBrowser(this.platformId))
      return;
    this.lightboxIndex = index;
    this.lightboxScale = 1;
    this.destroyLightboxView();
    const viewRef = this.lightboxTpl.createEmbeddedView({});
    this.appRef.attachView(viewRef);
    viewRef.rootNodes.forEach((n) => this.document.body.appendChild(n));
    this.lightboxViewRef = viewRef;
  }
  closeLightbox() {
    this.lightboxScale = 1;
    this.destroyLightboxView();
  }
  destroyLightboxView() {
    if (!this.lightboxViewRef)
      return;
    this.lightboxViewRef.rootNodes.forEach((n) => {
      if (n.parentNode)
        n.parentNode.removeChild(n);
    });
    this.appRef.detachView(this.lightboxViewRef);
    this.lightboxViewRef.destroy();
    this.lightboxViewRef = null;
  }
  onEscape() {
    if (this.lightboxOpen)
      this.closeLightbox();
  }
  zoomIn() {
    this.lightboxScale = Math.min(+(this.lightboxScale * 1.5).toFixed(2), 4);
  }
  zoomOut() {
    this.lightboxScale = Math.max(+(this.lightboxScale / 1.5).toFixed(2), 1);
  }
  lightboxPrev() {
    this.lightboxIndex = (this.lightboxIndex - 1 + this.images.length) % this.images.length;
    this.lightboxScale = 1;
  }
  lightboxNext() {
    this.lightboxIndex = (this.lightboxIndex + 1) % this.images.length;
    this.lightboxScale = 1;
  }
  onLightboxTouchStart(e) {
    this.lbTouchStartX = e.touches[0].clientX;
  }
  onLightboxTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - this.lbTouchStartX;
    const now = Date.now();
    if (Math.abs(dx) < 10) {
      if (now - this.lbLastTap < 300) {
        this.lightboxScale = this.lightboxScale > 1 ? 1 : 2;
        this.lbLastTap = 0;
        return;
      }
      this.lbLastTap = now;
    } else if (this.lightboxScale === 1 && Math.abs(dx) > 40) {
      dx < 0 ? this.lightboxNext() : this.lightboxPrev();
    }
  }
  // ── Touch ─────────────────────────────────────────────────
  onTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.clearTimers();
  }
  onTouchEnd(e) {
    const delta = e.changedTouches[0].clientX - this.touchStartX;
    if (this.canNavigate && Math.abs(delta) > 40) {
      delta < 0 ? this.next() : this.prev();
    } else {
      this.pauseAndResume();
    }
  }
  // ── Helpers ───────────────────────────────────────────────
  get stackImages() {
    return this.images.length === 1 ? [this.images[0], this.images[0], this.images[0]] : this.images;
  }
  get canNavigate() {
    return this.images.length > 1;
  }
  circularOffset(index) {
    const n = this.stackImages.length;
    let d = index - this.active;
    if (d > Math.floor(n / 2))
      d -= n;
    if (d < -Math.floor(n / 2))
      d += n;
    return d;
  }
  static {
    this.\u0275fac = function ImageGalleryComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ImageGalleryComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImageGalleryComponent, selectors: [["app-image-gallery"]], viewQuery: function ImageGalleryComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.lightboxTpl = _t.first);
      }
    }, hostBindings: function ImageGalleryComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown.escape", function ImageGalleryComponent_keydown_escape_HostBindingHandler() {
          return ctx.onEscape();
        }, false, \u0275\u0275resolveDocument);
      }
    }, inputs: { src: "src" }, decls: 9, vars: 4, consts: [["lightboxTpl", ""], [1, "gallery"], [1, "stack", 3, "touchstart", "touchend"], ["class", "card", 3, "is-active", "click", 4, "ngFor", "ngForOf"], ["class", "nav nav--left", 3, "click", 4, "ngIf"], ["class", "nav nav--right", 3, "click", 4, "ngIf"], [1, "dots"], ["class", "dot", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "card", 3, "click"], [1, "skeleton"], ["alt", "", 3, "load", "src"], [1, "nav", "nav--left", 3, "click"], [1, "nav", "nav--right", 3, "click"], [1, "dot", 3, "click"], [1, "lightbox", 3, "click", "touchstart", "touchend"], [1, "lightbox__close", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "lightbox__stage", 3, "click"], ["alt", "", "draggable", "false", 1, "lightbox__img", 3, "src"], ["class", "lightbox__nav lightbox__nav--prev", 3, "click", 4, "ngIf"], ["class", "lightbox__nav lightbox__nav--next", 3, "click", 4, "ngIf"], [1, "lightbox__controls", 3, "click"], [1, "lightbox__zoom-btn", 3, "click", "disabled"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["x1", "8", "y1", "11", "x2", "14", "y2", "11"], [1, "lightbox__zoom-label"], ["x1", "11", "y1", "8", "x2", "11", "y2", "14"], ["class", "lightbox__counter", 4, "ngIf"], [1, "lightbox__nav", "lightbox__nav--prev", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "15 18 9 12 15 6"], [1, "lightbox__nav", "lightbox__nav--next", 3, "click"], ["points", "9 18 15 12 9 6"], [1, "lightbox__counter"]], template: function ImageGalleryComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
        \u0275\u0275listener("touchstart", function ImageGalleryComponent_Template_div_touchstart_1_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onTouchStart($event));
        })("touchend", function ImageGalleryComponent_Template_div_touchend_1_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onTouchEnd($event));
        });
        \u0275\u0275template(2, ImageGalleryComponent_div_2_Template, 3, 8, "div", 3)(3, ImageGalleryComponent_div_3_Template, 1, 0, "div", 4)(4, ImageGalleryComponent_div_4_Template, 1, 0, "div", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 6);
        \u0275\u0275template(6, ImageGalleryComponent_span_6_Template, 1, 2, "span", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, ImageGalleryComponent_ng_template_7_Template, 24, 9, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.stackImages);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.canNavigate);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.canNavigate);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.images);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['\n\n.gallery[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 14px;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.gallery.single[_ngcontent-%COMP%]   .hero[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 16/9;\n  border-radius: var(--radius-xl);\n  overflow: hidden;\n}\n.gallery.single[_ngcontent-%COMP%]   .hero[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 220px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  touch-action: pan-y;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 68%;\n  aspect-ratio: 4/3;\n  border-radius: var(--radius-xl);\n  overflow: hidden;\n  cursor: pointer;\n  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.22);\n  transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.38s ease;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .skeleton[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      90deg,\n      #d1d5db 25%,\n      #e9ebee 50%,\n      #d1d5db 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite linear;\n  border-radius: inherit;\n  transition: opacity 0.3s ease;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .skeleton.hidden[_ngcontent-%COMP%] {\n  opacity: 0;\n  pointer-events: none;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.35s ease;\n  -webkit-user-drag: none;\n  user-drag: none;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img.loaded[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card.is-active[_ngcontent-%COMP%] {\n  transform: translateX(0) rotate(0deg) scale(1);\n  z-index: 5;\n  opacity: 1;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="1"][_ngcontent-%COMP%] {\n  transform: translateX(52%) rotate(6deg) scale(0.82);\n  z-index: 4;\n  opacity: 0.85;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="-1"][_ngcontent-%COMP%] {\n  transform: translateX(-52%) rotate(-6deg) scale(0.82);\n  z-index: 4;\n  opacity: 0.85;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="2"][_ngcontent-%COMP%] {\n  transform: translateX(82%) rotate(12deg) scale(0.66);\n  z-index: 3;\n  opacity: 0.5;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="-2"][_ngcontent-%COMP%] {\n  transform: translateX(-82%) rotate(-12deg) scale(0.66);\n  z-index: 3;\n  opacity: 0.5;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="3"][_ngcontent-%COMP%], \n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="-3"][_ngcontent-%COMP%], \n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="4"][_ngcontent-%COMP%], \n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="-4"][_ngcontent-%COMP%] {\n  transform: scale(0.5);\n  opacity: 0;\n  pointer-events: none;\n  z-index: 1;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 30%;\n  z-index: 10;\n  cursor: pointer;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .nav--left[_ngcontent-%COMP%] {\n  left: 0;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .nav--right[_ngcontent-%COMP%] {\n  right: 0;\n}\n.gallery[_ngcontent-%COMP%]   .card.is-active[_ngcontent-%COMP%] {\n  cursor: zoom-in;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.gallery[_ngcontent-%COMP%]   .dots[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.gallery[_ngcontent-%COMP%]   .dots[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #d1d5db;\n  cursor: pointer;\n  transition: background 0.2s, transform 0.2s;\n}\n.gallery[_ngcontent-%COMP%]   .dots[_ngcontent-%COMP%]   .dot.active[_ngcontent-%COMP%] {\n  background: var(--color-blue);\n  transform: scale(1.3);\n}\n/*# sourceMappingURL=image-gallery.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImageGalleryComponent, { className: "ImageGalleryComponent", filePath: "src/app/map/ui/image-gallery/image-gallery.component.ts", lineNumber: 14 });
})();

export {
  ImageGalleryComponent,
  InteractionTrackingService
};
//# sourceMappingURL=chunk-UE5RIJ3O.js.map
