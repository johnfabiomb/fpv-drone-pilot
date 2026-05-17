import {
  Router
} from "./chunk-WZUM6HQY.js";
import {
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf,
  isPlatformBrowser
} from "./chunk-FPOQEQN6.js";
import {
  ApplicationRef,
  EventEmitter,
  PLATFORM_ID,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-K5PYHWDH.js";

// src/app/components/share-button/share-button.component.ts
function ShareButtonComponent__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "circle", 5)(2, "circle", 6)(3, "circle", 7)(4, "line", 8)(5, "line", 9);
    \u0275\u0275elementEnd();
  }
}
function ShareButtonComponent__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 10);
    \u0275\u0275element(1, "polyline", 11);
    \u0275\u0275elementEnd();
  }
}
function ShareButtonComponent_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.copied ? "Copied!" : ctx_r0.label);
  }
}
var ShareButtonComponent = class _ShareButtonComponent {
  constructor() {
    this.url = "";
    this.shareTitle = "";
    this.label = "";
    this.copied = false;
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
  }
  get _flex() {
    return this.label ? "1" : null;
  }
  get _minWidth() {
    return this.label ? "0" : null;
  }
  share() {
    if (!isPlatformBrowser(this.platformId) || !this.url)
      return;
    const onCopied = () => {
      clearTimeout(this.timer);
      this.copied = true;
      this.timer = setTimeout(() => {
        this.copied = false;
      }, 2500);
    };
    if (navigator.share) {
      navigator.share({ title: this.shareTitle, url: this.url }).catch(() => {
      });
      return;
    }
    const fallback = () => {
      const el = this.document.createElement("input");
      el.value = this.url;
      this.document.body.appendChild(el);
      el.select();
      this.document.execCommand("copy");
      this.document.body.removeChild(el);
      onCopied();
    };
    navigator.clipboard?.writeText(this.url).then(onCopied).catch(fallback) ?? fallback();
  }
  ngOnDestroy() {
    clearTimeout(this.timer);
  }
  static {
    this.\u0275fac = function ShareButtonComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShareButtonComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShareButtonComponent, selectors: [["app-share-btn"]], hostVars: 4, hostBindings: function ShareButtonComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275styleProp("flex", ctx._flex)("min-width", ctx._minWidth);
      }
    }, inputs: { url: "url", shareTitle: "shareTitle", label: "label" }, decls: 4, vars: 6, consts: [[1, "share-btn", 3, "click", "title"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#22c55e", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], [4, "ngIf"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#22c55e", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"]], template: function ShareButtonComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "button", 0);
        \u0275\u0275listener("click", function ShareButtonComponent_Template_button_click_0_listener() {
          return ctx.share();
        });
        \u0275\u0275template(1, ShareButtonComponent__svg_svg_1_Template, 6, 0, "svg", 1)(2, ShareButtonComponent__svg_svg_2_Template, 2, 0, "svg", 2)(3, ShareButtonComponent_span_3_Template, 2, 1, "span", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("share-btn--labeled", ctx.label);
        \u0275\u0275property("title", ctx.copied ? "Copied!" : "Share");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.copied);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.copied);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.label);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.share-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: #f3f4f6;\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background 0.15s;\n  color: #6b7280;\n}\n.share-btn[_ngcontent-%COMP%]:hover {\n  background: #e5e7eb;\n}\n.share-btn--labeled[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  border-radius: 10px;\n  border: 1px solid #e5e7eb;\n  background: #f9fafb;\n  color: #374151;\n  font-size: 13px;\n  font-weight: 500;\n  padding: 0 14px;\n  gap: 7px;\n}\n.share-btn--labeled[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n}\n/*# sourceMappingURL=share-button.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShareButtonComponent, { className: "ShareButtonComponent", filePath: "src/app/components/share-button/share-button.component.ts", lineNumber: 56 });
})();

// src/app/components/image-gallery/image-gallery.component.ts
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
    this.restartAuto();
    if (isPlatformBrowser(this.platformId)) {
      const toCheck = [...new Set(this.images)];
      setTimeout(() => {
        toCheck.forEach((src) => {
          const probe = new Image();
          probe.src = src;
          if (probe.complete && probe.naturalWidth > 0) {
            this.markLoaded(src);
          }
        });
      }, 0);
    }
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
    }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['\n\n.gallery[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 14px;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.gallery.single[_ngcontent-%COMP%]   .hero[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 16/9;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.gallery.single[_ngcontent-%COMP%]   .hero[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 220px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  touch-action: pan-y;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 68%;\n  aspect-ratio: 4/3;\n  border-radius: 12px;\n  overflow: hidden;\n  cursor: pointer;\n  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.22);\n  transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.38s ease;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .skeleton[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      90deg,\n      #d1d5db 25%,\n      #e9ebee 50%,\n      #d1d5db 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite linear;\n  border-radius: inherit;\n  transition: opacity 0.3s ease;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .skeleton.hidden[_ngcontent-%COMP%] {\n  opacity: 0;\n  pointer-events: none;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.35s ease;\n  -webkit-user-drag: none;\n  user-drag: none;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img.loaded[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card.is-active[_ngcontent-%COMP%] {\n  transform: translateX(0) rotate(0deg) scale(1);\n  z-index: 5;\n  opacity: 1;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="1"][_ngcontent-%COMP%] {\n  transform: translateX(52%) rotate(6deg) scale(0.82);\n  z-index: 4;\n  opacity: 0.85;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="-1"][_ngcontent-%COMP%] {\n  transform: translateX(-52%) rotate(-6deg) scale(0.82);\n  z-index: 4;\n  opacity: 0.85;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="2"][_ngcontent-%COMP%] {\n  transform: translateX(82%) rotate(12deg) scale(0.66);\n  z-index: 3;\n  opacity: 0.5;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="-2"][_ngcontent-%COMP%] {\n  transform: translateX(-82%) rotate(-12deg) scale(0.66);\n  z-index: 3;\n  opacity: 0.5;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="3"][_ngcontent-%COMP%], \n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="-3"][_ngcontent-%COMP%], \n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="4"][_ngcontent-%COMP%], \n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .card[data-offset="-4"][_ngcontent-%COMP%] {\n  transform: scale(0.5);\n  opacity: 0;\n  pointer-events: none;\n  z-index: 1;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 30%;\n  z-index: 10;\n  cursor: pointer;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .nav--left[_ngcontent-%COMP%] {\n  left: 0;\n}\n.gallery[_ngcontent-%COMP%]   .stack[_ngcontent-%COMP%]   .nav--right[_ngcontent-%COMP%] {\n  right: 0;\n}\n.gallery[_ngcontent-%COMP%]   .card.is-active[_ngcontent-%COMP%] {\n  cursor: zoom-in;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.gallery[_ngcontent-%COMP%]   .dots[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.gallery[_ngcontent-%COMP%]   .dots[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #d1d5db;\n  cursor: pointer;\n  transition: background 0.2s, transform 0.2s;\n}\n.gallery[_ngcontent-%COMP%]   .dots[_ngcontent-%COMP%]   .dot.active[_ngcontent-%COMP%] {\n  background: var(--color-blue);\n  transform: scale(1.3);\n}\n/*# sourceMappingURL=image-gallery.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImageGalleryComponent, { className: "ImageGalleryComponent", filePath: "src/app/components/image-gallery/image-gallery.component.ts", lineNumber: 14 });
})();

// src/app/components/provider-panel/provider-panel.component.ts
function ProviderDetailComponent_app_image_gallery_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-image-gallery", 18);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.provider.images);
  }
}
function ProviderDetailComponent_ul_14_li_1_Template(rf, ctx) {
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
function ProviderDetailComponent_ul_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 19);
    \u0275\u0275template(1, ProviderDetailComponent_ul_14_li_1_Template, 4, 1, "li", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.provider.highlights);
  }
}
function ProviderDetailComponent_div_15__svg_svg_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "rect", 36)(2, "path", 37);
    \u0275\u0275elementEnd();
  }
}
function ProviderDetailComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 26);
    \u0275\u0275element(3, "path", 27)(4, "line", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 30);
    \u0275\u0275listener("click", function ProviderDetailComponent_div_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.copyCoupon());
    });
    \u0275\u0275elementStart(8, "span", 31);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 32);
    \u0275\u0275template(11, ProviderDetailComponent_div_15__svg_svg_11_Template, 3, 0, "svg", 33);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p", 34);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.provider.discount == null ? null : ctx_r0.provider.discount.label);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.provider.discount == null ? null : ctx_r0.provider.discount.coupon);
    \u0275\u0275advance();
    \u0275\u0275classProp("copied", ctx_r0.couponCopied);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.couponCopied);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.couponCopied ? "\u2713 Copied!" : "Tap to copy", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.provider.discount == null ? null : ctx_r0.provider.discount.instructions);
  }
}
function ProviderDetailComponent_a_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 38);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 39);
    \u0275\u0275element(2, "path", 40);
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
function ProviderDetailComponent_a_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 41);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 42);
    \u0275\u0275element(2, "path", 43);
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
function ProviderDetailComponent_button_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function ProviderDetailComponent_button_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openWebsite());
    });
    \u0275\u0275text(1, " Book Now ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 45);
    \u0275\u0275element(3, "line", 46)(4, "polyline", 47);
    \u0275\u0275elementEnd()();
  }
}
var ProviderDetailComponent = class _ProviderDetailComponent {
  constructor() {
    this.navRequested = new EventEmitter();
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.router = inject(Router);
    this.couponCopied = false;
  }
  get shareUrl() {
    if (!this.provider?.id)
      return "";
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : "https://johnfabiomb.com";
    return `${origin}/malta?provider=${this.provider.id}`;
  }
  get accentColor() {
    const map = {
      "water-sports": "#0ea5e9",
      "tour": "#8b5cf6",
      "hotel": "#f59e0b",
      "restaurant": "#ef4444",
      "experience": "#10b981"
    };
    return map[this.provider?.category] ?? "#F4A922";
  }
  get categoryLabel() {
    const map = {
      "water-sports": "Water Sports",
      "tour": "Boat Tour",
      "hotel": "Hotel",
      "restaurant": "Restaurant",
      "experience": "Experience"
    };
    return map[this.provider?.category] ?? this.provider?.category;
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
    if (this.provider?.website)
      this.navRequested.emit(this.provider.website);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderDetailComponent, selectors: [["app-provider-detail"]], inputs: { provider: "provider" }, outputs: { navRequested: "navRequested" }, decls: 25, vars: 19, consts: [[1, "provider-hero"], [1, "provider-hero__badge"], [1, "provider-hero__main"], [1, "provider-hero__emoji"], [1, "provider-hero__name"], [1, "provider-hero__tagline"], [3, "src", 4, "ngIf"], [1, "provider-desc"], ["class", "provider-highlights", 4, "ngIf"], ["class", "discount-box", 4, "ngIf"], [1, "provider-links"], ["target", "_blank", "rel", "noopener", "class", "provider-link provider-link--ig", 3, "href", 4, "ngIf"], ["class", "provider-link provider-link--phone", 3, "href", 4, "ngIf"], [1, "provider-actions"], ["label", "Share", 3, "url", "shareTitle"], [1, "provider-action-btn", 3, "click"], [1, "fa", "fa-tag"], ["class", "book-btn", 3, "click", 4, "ngIf"], [3, "src"], [1, "provider-highlights"], ["class", "highlight-item", 4, "ngFor", "ngForOf"], [1, "highlight-item"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "highlight-check"], ["points", "20 6 9 17 4 12"], [1, "discount-box"], [1, "discount-box__header"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"], ["x1", "7", "y1", "7", "x2", "7.01", "y2", "7"], [1, "discount-box__label"], [1, "discount-box__coupon", 3, "click"], [1, "coupon-code"], [1, "coupon-copy-hint"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], [1, "discount-box__instructions"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "9", "y", "9", "width", "13", "height", "13", "rx", "2", "ry", "2"], ["d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"], ["target", "_blank", "rel", "noopener", 1, "provider-link", "provider-link--ig", 3, "href"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"], [1, "provider-link", "provider-link--phone", 3, "href"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"], [1, "book-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function ProviderDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 2)(4, "span", 3);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div")(7, "h2", 4);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "p", 5);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(11, ProviderDetailComponent_app_image_gallery_11_Template, 1, 1, "app-image-gallery", 6);
        \u0275\u0275elementStart(12, "p", 7);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, ProviderDetailComponent_ul_14_Template, 2, 1, "ul", 8)(15, ProviderDetailComponent_div_15_Template, 15, 7, "div", 9);
        \u0275\u0275elementStart(16, "div", 10);
        \u0275\u0275template(17, ProviderDetailComponent_a_17_Template, 4, 2, "a", 11)(18, ProviderDetailComponent_a_18_Template, 4, 2, "a", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 13);
        \u0275\u0275element(20, "app-share-btn", 14);
        \u0275\u0275elementStart(21, "button", 15);
        \u0275\u0275listener("click", function ProviderDetailComponent_Template_button_click_21_listener() {
          return ctx.browseDeals();
        });
        \u0275\u0275element(22, "i", 16);
        \u0275\u0275text(23, " Browse Deals ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(24, ProviderDetailComponent_button_24_Template, 5, 0, "button", 17);
      }
      if (rf & 2) {
        let tmp_14_0;
        \u0275\u0275styleProp("background", "linear-gradient(135deg, " + ctx.accentColor + "1a 0%, " + ctx.accentColor + "08 100%)");
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.accentColor + "1a")("color", ctx.accentColor);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.categoryLabel, " ");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.provider == null ? null : ctx.provider.emoji);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.provider == null ? null : ctx.provider.name);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.provider == null ? null : ctx.provider.tagline);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider == null ? null : ctx.provider.images == null ? null : ctx.provider.images.length);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.provider == null ? null : ctx.provider.description);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider == null ? null : ctx.provider.highlights == null ? null : ctx.provider.highlights.length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider == null ? null : ctx.provider.discount);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.provider == null ? null : ctx.provider.instagram);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider == null ? null : ctx.provider.phone);
        \u0275\u0275advance(2);
        \u0275\u0275property("url", ctx.shareUrl)("shareTitle", (tmp_14_0 = ctx.provider == null ? null : ctx.provider.name) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : "");
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.provider == null ? null : ctx.provider.website);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ImageGalleryComponent, ShareButtonComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  padding-bottom: 32px;\n}\n.provider-hero[_ngcontent-%COMP%] {\n  padding: 16px 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 10px;\n}\n.provider-hero__badge[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  padding: 4px 10px;\n  border-radius: 20px;\n}\n.provider-hero__main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.provider-hero__emoji[_ngcontent-%COMP%] {\n  font-size: 42px;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.provider-hero__name[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 20px;\n  font-weight: 800;\n  color: #1a1a1a;\n  line-height: 1.2;\n}\n.provider-hero__tagline[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  color: #6b7280;\n  line-height: 1.4;\n}\n.provider-desc[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 16px 16px 4px;\n  font-size: 14px;\n  color: #374151;\n  line-height: 1.6;\n}\n.provider-highlights[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 12px 16px;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.highlight-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 13.5px;\n  color: #374151;\n  font-weight: 500;\n}\n.highlight-check[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #22c55e;\n}\n.discount-box[_ngcontent-%COMP%] {\n  margin: 0 16px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #fffbeb 0%,\n      #fef3c7 100%);\n  border: 1.5px solid #F4A922;\n  border-radius: 14px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.discount-box__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #92400e;\n}\n.discount-box__header[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.discount-box__label[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n}\n.discount-box__coupon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: #fff;\n  border: 1.5px dashed #F4A922;\n  border-radius: 10px;\n  padding: 12px 16px;\n  cursor: pointer;\n  transition: background 0.15s;\n  width: 100%;\n  text-align: left;\n}\n.discount-box__coupon[_ngcontent-%COMP%]:active {\n  background: #fffbeb;\n}\n.coupon-code[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  letter-spacing: 3px;\n  color: #2C1810;\n  font-family: "Courier New", monospace;\n}\n.coupon-copy-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11.5px;\n  color: #9ca3af;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.coupon-copy-hint.copied[_ngcontent-%COMP%] {\n  color: #22c55e;\n  font-weight: 600;\n}\n.discount-box__instructions[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  color: #92400e;\n  line-height: 1.5;\n  opacity: 0.85;\n}\n.provider-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 0 16px 8px;\n}\n.provider-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 11px 14px;\n  border-radius: 10px;\n  font-size: 13.5px;\n  font-weight: 500;\n  text-decoration: none;\n  transition: background 0.15s;\n}\n.provider-link[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.provider-link--ig[_ngcontent-%COMP%] {\n  background: #fdf2f8;\n  color: #9d174d;\n}\n.provider-link--ig[_ngcontent-%COMP%]:hover {\n  background: #fce7f3;\n}\n.provider-link--phone[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n}\n.provider-link--phone[_ngcontent-%COMP%]:hover {\n  background: #dcfce7;\n}\n.provider-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 4px 16px 4px;\n}\n.provider-action-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 42px;\n  border-radius: 10px;\n  border: 1px solid #e5e7eb;\n  background: #f9fafb;\n  color: #374151;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  transition: background 0.15s;\n}\n.provider-action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.provider-action-btn[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n}\n.book-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  width: calc(100% - 32px);\n  margin: 8px 16px 0;\n  padding: 14px 20px;\n  background: #F4A922;\n  color: #fff;\n  border: none;\n  border-radius: 12px;\n  font-size: 15px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background 0.18s, transform 0.1s;\n}\n.book-btn[_ngcontent-%COMP%]:hover {\n  background: #e09914;\n}\n.book-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=provider-panel.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderDetailComponent, { className: "ProviderDetailComponent", filePath: "src/app/components/provider-panel/provider-panel.component.ts", lineNumber: 15 });
})();

export {
  ImageGalleryComponent,
  ShareButtonComponent,
  ProviderDetailComponent
};
//# sourceMappingURL=chunk-4QKWZUWB.js.map
