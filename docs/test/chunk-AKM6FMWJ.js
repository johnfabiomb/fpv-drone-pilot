import {
  CommonModule,
  EventEmitter,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E43Y6J77.js";

// src/app/components/confirm-popup/confirm-popup.component.ts
var ConfirmPopupComponent = class _ConfirmPopupComponent {
  constructor() {
    this.message = "Are you sure?";
    this.confirmLabel = "Yes";
    this.cancelLabel = "No";
    this.danger = true;
    this._fixed = false;
    this.confirmed = new EventEmitter();
    this.cancelled = new EventEmitter();
  }
  /** Use fixed centering when the popup is inside a large action block (not a small anchor). */
  set fixed(v) {
    this._fixed = v;
  }
  static {
    this.\u0275fac = function ConfirmPopupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ConfirmPopupComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmPopupComponent, selectors: [["app-confirm-popup"]], hostVars: 2, hostBindings: function ConfirmPopupComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("is-fixed", ctx._fixed);
      }
    }, inputs: { message: "message", confirmLabel: "confirmLabel", cancelLabel: "cancelLabel", danger: "danger", fixed: "fixed" }, outputs: { confirmed: "confirmed", cancelled: "cancelled" }, decls: 8, vars: 7, consts: [[1, "confirm-popup", 3, "click"], [1, "confirm-popup__text"], [1, "confirm-popup__actions"], [1, "confirm-popup__btn", "confirm-popup__btn--cancel", 3, "click"], [1, "confirm-popup__btn", 3, "click"]], template: function ConfirmPopupComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ConfirmPopupComponent_Template_div_click_0_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275elementStart(1, "span", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 2)(4, "button", 3);
        \u0275\u0275listener("click", function ConfirmPopupComponent_Template_button_click_4_listener() {
          return ctx.cancelled.emit();
        });
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "button", 4);
        \u0275\u0275listener("click", function ConfirmPopupComponent_Template_button_click_6_listener() {
          return ctx.confirmed.emit();
        });
        \u0275\u0275text(7);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.message);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.cancelLabel, " ");
        \u0275\u0275advance();
        \u0275\u0275classProp("confirm-popup__btn--danger", ctx.danger)("confirm-popup__btn--primary", !ctx.danger);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.confirmLabel, " ");
      }
    }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  position: absolute;\n  top: calc(100% + 10px);\n  right: 0;\n  z-index: 200;\n}\n.is-fixed[_nghost-%COMP%] {\n  position: fixed;\n  top: auto;\n  right: auto;\n  bottom: 90px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 500;\n}\n.is-fixed[_nghost-%COMP%]   .confirm-popup[_ngcontent-%COMP%] {\n  width: min(260px, 80vw);\n}\n.confirm-popup[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 12px 14px;\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.16);\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  width: 168px;\n  animation: _ngcontent-%COMP%_cpPopUp 0.15s ease;\n}\n.confirm-popup__text[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  line-height: 1.45;\n}\n.confirm-popup__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.confirm-popup__btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 32px;\n  border-radius: var(--radius-sm);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition: opacity 0.15s;\n}\n.confirm-popup__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.confirm-popup__btn--cancel[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.confirm-popup__btn--danger[_ngcontent-%COMP%] {\n  background: #e11d48;\n  color: #fff;\n}\n.confirm-popup__btn--primary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n}\n@keyframes _ngcontent-%COMP%_cpPopUp {\n  from {\n    opacity: 0;\n    transform: translateY(-4px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_cpPopUpFixed {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) scale(1);\n  }\n}\n.is-fixed[_nghost-%COMP%]   .confirm-popup[_ngcontent-%COMP%] {\n  animation-name: _ngcontent-%COMP%_cpPopUpFixed;\n}\n/*# sourceMappingURL=confirm-popup.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmPopupComponent, { className: "ConfirmPopupComponent", filePath: "src/app/components/confirm-popup/confirm-popup.component.ts", lineNumber: 96 });
})();

export {
  ConfirmPopupComponent
};
//# sourceMappingURL=chunk-AKM6FMWJ.js.map
