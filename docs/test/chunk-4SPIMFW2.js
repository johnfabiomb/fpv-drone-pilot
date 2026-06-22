import {
  input,
  model,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-P56CFEJA.js";

// src/app/booking/ui/modal/modal.component.ts
var _c0 = ["*"];
function ModalComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.title());
  }
}
function ModalComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function ModalComponent_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdrop());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function ModalComponent_Conditional_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3);
    \u0275\u0275template(3, ModalComponent_Conditional_0_Conditional_3_Template, 2, 1, "h2", 4);
    \u0275\u0275elementStart(4, "button", 5);
    \u0275\u0275listener("click", function ModalComponent_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275text(5, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 6);
    \u0275\u0275projection(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.title() ? 3 : -1);
  }
}
var ModalComponent = class _ModalComponent {
  constructor() {
    this.open = model(false);
    this.title = input("");
    this.dismissable = input(false);
  }
  close() {
    this.open.set(false);
  }
  onBackdrop() {
    if (this.dismissable())
      this.close();
  }
  static {
    this.\u0275fac = function ModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ModalComponent, selectors: [["app-modal"]], inputs: { open: [1, "open"], title: [1, "title"], dismissable: [1, "dismissable"] }, outputs: { open: "openChange" }, ngContentSelectors: _c0, decls: 1, vars: 1, consts: [[1, "modal-overlay"], [1, "modal-overlay", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "modal", 3, "click"], [1, "modal__head"], [1, "modal__title"], ["type", "button", "aria-label", "Close", 1, "modal__x", 3, "click"], [1, "modal__body"]], template: function ModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275template(0, ModalComponent_Conditional_0_Template, 8, 1, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.open() ? 0 : -1);
      }
    }, styles: ["\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(15, 23, 42, 0.45);\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 6vh 20px;\n  overflow-y: auto;\n}\n.modal[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.25);\n  width: 100%;\n  max-width: 520px;\n}\n.modal__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 22px 24px 0;\n}\n.modal__title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: #0f172a;\n  margin: 0;\n}\n.modal__x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0 2px;\n  font-size: 26px;\n  line-height: 1;\n  color: #94a3b8;\n}\n.modal__x[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n.modal__body[_ngcontent-%COMP%] {\n  padding: 6px 24px 24px;\n}\n/*# sourceMappingURL=modal.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ModalComponent, { className: "ModalComponent", filePath: "src/app/booking/ui/modal/modal.component.ts", lineNumber: 18 });
})();

export {
  ModalComponent
};
//# sourceMappingURL=chunk-4SPIMFW2.js.map
