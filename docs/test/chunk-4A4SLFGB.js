import {
  CommonModule,
  DOCUMENT,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-YX7TN7IZ.js";

// src/app/map/ui/share-button/share-button.component.ts
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
    this.shared = new EventEmitter();
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
      this.shared.emit();
    };
    if (navigator.share) {
      navigator.share({ title: this.shareTitle, url: this.url }).then(() => this.shared.emit()).catch(() => {
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
    }, inputs: { url: "url", shareTitle: "shareTitle", label: "label" }, outputs: { shared: "shared" }, decls: 4, vars: 6, consts: [[1, "share-btn", 3, "click", "title"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#22c55e", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], [4, "ngIf"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#22c55e", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"]], template: function ShareButtonComponent_Template(rf, ctx) {
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
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.share-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: var(--radius-md);\n  background: var(--color-bg-muted);\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background var(--transition);\n  color: var(--color-text-muted);\n}\n.share-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.share-btn--labeled[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg-light);\n  color: var(--color-text-secondary);\n  font-size: 13px;\n  font-weight: 500;\n  padding: 0 14px;\n  gap: 7px;\n}\n.share-btn--labeled[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n/*# sourceMappingURL=share-button.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShareButtonComponent, { className: "ShareButtonComponent", filePath: "src/app/map/ui/share-button/share-button.component.ts", lineNumber: 56 });
})();

export {
  ShareButtonComponent
};
//# sourceMappingURL=chunk-4A4SLFGB.js.map
