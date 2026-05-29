import {
  EventEmitter,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵstyleProp
} from "./chunk-EBDCVLEQ.js";

// src/app/components/app-modal/app-modal.component.ts
var _c0 = ["*"];
var AppModalComponent = class _AppModalComponent {
  constructor() {
    this.maxWidth = "380px";
    this.closeRequested = new EventEmitter();
  }
  close() {
    this.closeRequested.emit();
  }
  static {
    this.\u0275fac = function AppModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppModalComponent, selectors: [["app-modal"]], inputs: { maxWidth: "maxWidth" }, outputs: { closeRequested: "closeRequested" }, ngContentSelectors: _c0, decls: 7, vars: 2, consts: [[1, "am-backdrop", 3, "click"], [1, "am-card", 3, "click"], ["aria-label", "Close", 1, "am-close", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"]], template: function AppModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function AppModalComponent_Template_div_click_0_listener() {
          return ctx.close();
        });
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275listener("click", function AppModalComponent_Template_div_click_1_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275elementStart(2, "button", 2);
        \u0275\u0275listener("click", function AppModalComponent_Template_button_click_2_listener() {
          return ctx.close();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "line", 4)(5, "line", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275projection(6);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleProp("max-width", ctx.maxWidth);
      }
    }, styles: ["\n\n.am-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  padding: 20px;\n  animation: _ngcontent-%COMP%_amFade 0.2s ease;\n}\n.am-card[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border-radius: 22px;\n  padding: 28px 24px 24px;\n  width: 100%;\n  max-height: 90dvh;\n  overflow-y: auto;\n  position: relative;\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_amSlide 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.am-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 6px;\n  color: var(--color-text-muted);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background var(--transition);\n}\n.am-close[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n@keyframes _ngcontent-%COMP%_amFade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_amSlide {\n  from {\n    opacity: 0;\n    transform: translateY(16px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n/*# sourceMappingURL=app-modal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppModalComponent, { className: "AppModalComponent", filePath: "src/app/components/app-modal/app-modal.component.ts", lineNumber: 72 });
})();

export {
  AppModalComponent
};
//# sourceMappingURL=chunk-WMRGVXS4.js.map
