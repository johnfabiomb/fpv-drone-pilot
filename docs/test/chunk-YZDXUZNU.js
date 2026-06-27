import {
  ConfirmService
} from "./chunk-QZKORCKD.js";
import {
  ModalComponent
} from "./chunk-LGPNOOCE.js";
import {
  BookingDataService
} from "./chunk-Q2V34T34.js";
import "./chunk-ZRSGIAGG.js";
import {
  ToastService
} from "./chunk-WPLJ2PYK.js";
import {
  BookingsAuthService
} from "./chunk-RCLK272Z.js";
import "./chunk-3A2C4JCE.js";
import "./chunk-5PW2HKAJ.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-K7AGV7TU.js";
import "./chunk-AMJW2RV7.js";
import {
  computed,
  effect,
  inject,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2FJZNSO2.js";
import "./chunk-TWWAJFRB.js";

// src/app/booking/ui/toast/toast-host.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ToastHostComponent_For_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2713 ");
  }
}
function ToastHostComponent_For_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2715 ");
  }
}
function ToastHostComponent_For_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " i ");
  }
}
function ToastHostComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function ToastHostComponent_For_2_Template_button_click_0_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toast.dismiss(t_r2.id));
    });
    \u0275\u0275elementStart(1, "span", 3);
    \u0275\u0275template(2, ToastHostComponent_For_2_Case_2_Template, 1, 0)(3, ToastHostComponent_For_2_Case_3_Template, 1, 0)(4, ToastHostComponent_For_2_Case_4_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 4);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const t_r2 = ctx.$implicit;
    \u0275\u0275classMapInterpolate1("toast toast--", t_r2.type, "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_11_0 = t_r2.type) === "success" ? 2 : tmp_11_0 === "error" ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2.message);
  }
}
var ToastHostComponent = class _ToastHostComponent {
  constructor() {
    this.toast = inject(ToastService);
  }
  static {
    this.\u0275fac = function ToastHostComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastHostComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastHostComponent, selectors: [["app-toast-host"]], decls: 3, vars: 0, consts: [["aria-live", "polite", "aria-atomic", "false", 1, "toasts"], ["type", "button", "role", "status", 3, "class"], ["type", "button", "role", "status", 3, "click"], [1, "toast__icon"], [1, "toast__msg"]], template: function ToastHostComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275repeaterCreate(1, ToastHostComponent_For_2_Template, 7, 5, "button", 1, _forTrack0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.toast.toasts());
      }
    }, styles: ['\n\n.toasts[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  z-index: 11000;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  pointer-events: none;\n  max-width: min(380px, 100vw - 32px);\n}\n@media (max-width: 600px) {\n  .toasts[_ngcontent-%COMP%] {\n    left: 12px;\n    right: 12px;\n    bottom: 12px;\n    max-width: none;\n  }\n}\n.toast[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  width: 100%;\n  text-align: left;\n  padding: 13px 15px;\n  border: 1px solid #e2e8f0;\n  border-left: 4px solid #94a3b8;\n  border-radius: 8px;\n  background: #ffffff;\n  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.16);\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  cursor: pointer;\n  animation: _ngcontent-%COMP%_toast-in 0.22s cubic-bezier(0.21, 1.02, 0.73, 1);\n}\n.toast__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 700;\n  color: #fff;\n  background: #64748b;\n}\n.toast__msg[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #0f172a;\n  line-height: 1.35;\n}\n.toast--success[_ngcontent-%COMP%] {\n  border-left-color: #16a34a;\n}\n.toast--success[_ngcontent-%COMP%]   .toast__icon[_ngcontent-%COMP%] {\n  background: #16a34a;\n}\n.toast--error[_ngcontent-%COMP%] {\n  border-left-color: #ef4444;\n}\n.toast--error[_ngcontent-%COMP%]   .toast__icon[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.toast--info[_ngcontent-%COMP%] {\n  border-left-color: #F4A922;\n}\n.toast--info[_ngcontent-%COMP%]   .toast__icon[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #000;\n}\n@keyframes _ngcontent-%COMP%_toast-in {\n  from {\n    opacity: 0;\n    transform: translateY(10px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .toast[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=toast-host.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastHostComponent, { className: "ToastHostComponent", filePath: "src/app/booking/ui/toast/toast-host.component.ts", lineNumber: 27 });
})();

// src/app/booking/ui/confirm/confirm-host.component.ts
function ConfirmHostComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-modal", 1);
    \u0275\u0275listener("openChange", function ConfirmHostComponent_Conditional_0_Template_app_modal_openChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView($event || ctx_r1.svc.resolve(false));
    });
    \u0275\u0275elementStart(1, "p", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "button", 4);
    \u0275\u0275listener("click", function ConfirmHostComponent_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.svc.resolve(false));
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 5);
    \u0275\u0275listener("click", function ConfirmHostComponent_Conditional_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.svc.resolve(true));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r3 = ctx;
    \u0275\u0275property("open", true)("title", r_r3.title || "Please confirm");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r3.message);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r3.cancelLabel || "Cancel");
    \u0275\u0275advance();
    \u0275\u0275classProp("btn--danger", r_r3.danger)("btn--primary", !r_r3.danger);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r3.confirmLabel || "Confirm");
  }
}
var ConfirmHostComponent = class _ConfirmHostComponent {
  constructor() {
    this.svc = inject(ConfirmService);
  }
  static {
    this.\u0275fac = function ConfirmHostComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ConfirmHostComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmHostComponent, selectors: [["app-confirm-host"]], decls: 1, vars: 1, consts: [[3, "open", "title"], [3, "openChange", "open", "title"], [1, "confirm__msg"], [1, "confirm__actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", 3, "click"]], template: function ConfirmHostComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ConfirmHostComponent_Conditional_0_Template, 8, 9, "app-modal", 0);
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275conditional((tmp_0_0 = ctx.svc.request()) ? 0 : -1, tmp_0_0);
      }
    }, dependencies: [ModalComponent], styles: [`

.page[_ngcontent-%COMP%] {
  padding: 32px 36px;
  max-width: 720px;
}
.page__head[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.page__title[_ngcontent-%COMP%] {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 4px;
  letter-spacing: -0.02em;
}
.page__sub[_ngcontent-%COMP%] {
  font-size: 13.5px;
  color: #475569;
  margin: 0;
}
.muted[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 14px;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  border: 1.5px solid transparent;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Inter",
    "Segoe UI",
    sans-serif;
  transition: 0.15s ease;
  text-decoration: none;
}
.btn--primary[_ngcontent-%COMP%] {
  background: #F4A922;
  color: #000;
}
.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  filter: brightness(0.94);
}
.btn--ghost[_ngcontent-%COMP%] {
  background: #ffffff;
  border-color: #e2e8f0;
  color: #475569;
}
.btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {
  border-color: #94a3b8;
}
.btn--sm[_ngcontent-%COMP%] {
  padding: 6px 12px;
  font-size: 12px;
}
.btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: default;
}
.link-btn[_ngcontent-%COMP%] {
  background: none;
  border: none;
  font-size: 12.5px;
  font-weight: 600;
  color: #F4A922;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: inherit;
}
.link-btn[_ngcontent-%COMP%]:hover {
  background: rgba(244, 169, 34, 0.12);
}
.link-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
}
.link-btn--danger[_ngcontent-%COMP%] {
  color: #ef4444;
}
.link-btn--danger[_ngcontent-%COMP%]:hover {
  background: rgba(239, 68, 68, 0.1);
}
.card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}
.field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], 
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], 
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #0f172a;
  background: #ffffff;
  width: 100%;
  box-sizing: border-box;
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, 
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, 
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #F4A922;
}
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  resize: vertical;
}
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  appearance: none;
  cursor: pointer;
  padding-right: 32px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%236b7280' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}
.check[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: #0f172a;
}
.list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
}
.item--off[_ngcontent-%COMP%] {
  opacity: 0.6;
}
.item__name[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.item__meta[_ngcontent-%COMP%] {
  font-size: 12.5px;
  color: #475569;
  margin-top: 2px;
}
.item__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
  white-space: nowrap;
}
.tag[_ngcontent-%COMP%] {
  font-size: 10.5px;
  font-weight: 700;
  background: #eef2f6;
  color: #475569;
  padding: 2px 7px;
  border-radius: 10px;
  vertical-align: middle;
}
.confirm__msg[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #475569;
  line-height: 1.55;
  margin: 0 0 18px;
}
.confirm__actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.btn--danger[_ngcontent-%COMP%] {
  background: #ef4444;
  color: #fff;
}
.btn--danger[_ngcontent-%COMP%]:hover:not(:disabled) {
  filter: brightness(0.94);
}
/*# sourceMappingURL=confirm-host.component.css.map */`], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmHostComponent, { className: "ConfirmHostComponent", filePath: "src/app/booking/ui/confirm/confirm-host.component.ts", lineNumber: 28 });
})();

// src/app/booking/platform/platform-shell/platform-shell.component.ts
function PlatformShellComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "div", 2);
    \u0275\u0275elementEnd();
  }
}
function PlatformShellComponent_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8)(1, "span", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 47);
    \u0275\u0275element(4, "path", 48);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.name);
  }
}
function PlatformShellComponent_Conditional_1_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.data.bookings().length);
  }
}
function PlatformShellComponent_Conditional_1_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 11);
    \u0275\u0275element(2, "path", 49)(3, "circle", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Work");
    \u0275\u0275elementEnd()();
  }
}
function PlatformShellComponent_Conditional_1_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.data.clients().length);
  }
}
function PlatformShellComponent_Conditional_1_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.data.syncResult());
  }
}
function PlatformShellComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "aside", 3)(2, "div", 4)(3, "div", 5);
    \u0275\u0275text(4, "JM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "div", 6);
    \u0275\u0275text(7, "Studio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 7);
    \u0275\u0275text(9, "Booking manager");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(10, PlatformShellComponent_Conditional_1_Conditional_10_Template, 5, 1, "a", 8);
    \u0275\u0275elementStart(11, "nav", 9)(12, "a", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 11);
    \u0275\u0275element(14, "rect", 12)(15, "rect", 13)(16, "rect", 14)(17, "rect", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "Dashboard");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "a", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(21, "svg", 11);
    \u0275\u0275element(22, "rect", 17)(23, "path", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "Bookings");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, PlatformShellComponent_Conditional_1_Conditional_26_Template, 2, 1, "span", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, PlatformShellComponent_Conditional_1_Conditional_27_Template, 6, 0, "a", 20);
    \u0275\u0275elementStart(28, "a", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(29, "svg", 11);
    \u0275\u0275element(30, "path", 22)(31, "path", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33, "Invoices");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "a", 24);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(35, "svg", 11);
    \u0275\u0275element(36, "circle", 25)(37, "path", 26)(38, "circle", 27)(39, "path", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(40, "span");
    \u0275\u0275text(41, "Clients");
    \u0275\u0275elementEnd();
    \u0275\u0275template(42, PlatformShellComponent_Conditional_1_Conditional_42_Template, 2, 1, "span", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "a", 29);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(44, "svg", 11);
    \u0275\u0275element(45, "path", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(46, "span");
    \u0275\u0275text(47, "Services");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "a", 31);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(49, "svg", 11);
    \u0275\u0275element(50, "circle", 32)(51, "path", 33)(52, "circle", 34)(53, "path", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(54, "span");
    \u0275\u0275text(55, "Staff");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "a", 36);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(57, "svg", 11);
    \u0275\u0275element(58, "circle", 37)(59, "path", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(60, "span");
    \u0275\u0275text(61, "Settings");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(62, "div", 39)(63, "button", 40);
    \u0275\u0275listener("click", function PlatformShellComponent_Conditional_1_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.data.syncCalendar());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(64, "svg", 41);
    \u0275\u0275element(65, "path", 42)(66, "path", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275template(68, PlatformShellComponent_Conditional_1_Conditional_68_Template, 2, 1, "div", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(69, "main", 45);
    \u0275\u0275element(70, "router-outlet");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.activeOrg()) ? 10 : -1, tmp_1_0);
    \u0275\u0275advance(16);
    \u0275\u0275conditional(ctx_r1.data.bookings().length > 0 ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.auth.features().work_board ? 27 : -1);
    \u0275\u0275advance(15);
    \u0275\u0275conditional(ctx_r1.data.clients().length > 0 ? 42 : -1);
    \u0275\u0275advance(21);
    \u0275\u0275property("disabled", ctx_r1.data.syncing());
    \u0275\u0275advance();
    \u0275\u0275classProp("sync-btn__icon--spinning", ctx_r1.data.syncing());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.data.syncing() ? "Syncing\u2026" : "Sync Calendar", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.data.syncResult() ? 68 : -1);
  }
}
var PlatformShellComponent = class _PlatformShellComponent {
  constructor() {
    this.auth = inject(BookingsAuthService);
    this.data = inject(BookingDataService);
    this.router = inject(Router);
    this.activeOrg = computed(() => this.auth.orgs().find((o) => o.id === this.auth.orgId()) ?? null);
    effect(() => {
      const s = this.auth.state();
      if (s !== "loading" && s !== "admin") {
        this.router.navigate(["/bookings", "login"], { replaceUrl: true });
      }
    });
  }
  ngOnInit() {
    this.auth.initialize().then(() => {
      if (this.auth.state() === "admin") {
        this.data.load();
      }
    });
  }
  static {
    this.\u0275fac = function PlatformShellComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PlatformShellComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlatformShellComponent, selectors: [["app-platform-shell"]], features: [\u0275\u0275ProvidersFeature([BookingDataService])], decls: 4, vars: 2, consts: [[1, "auth-loading"], [1, "shell"], [1, "auth-loading__spinner"], [1, "sidebar"], [1, "brand"], [1, "brand__mark"], [1, "brand__title"], [1, "brand__sub"], ["routerLink", "/bookings/organizations", "routerLinkActive", "org-link--active", "title", "Switch or manage organizations", 1, "org-link"], [1, "nav"], ["routerLink", "/bookings/dashboard", "routerLinkActive", "nav__item--active", 1, "nav__item"], ["viewBox", "0 0 20 20", "fill", "none", "stroke", "currentColor", "stroke-width", "1.6", 1, "nav__icon"], ["x", "3", "y", "3", "width", "6", "height", "8", "rx", "1.5"], ["x", "11", "y", "3", "width", "6", "height", "5", "rx", "1.5"], ["x", "3", "y", "13", "width", "6", "height", "4", "rx", "1.5"], ["x", "11", "y", "10", "width", "6", "height", "7", "rx", "1.5"], ["routerLink", "/bookings/list", "routerLinkActive", "nav__item--active", 1, "nav__item"], ["x", "3", "y", "4", "width", "14", "height", "13", "rx", "2"], ["d", "M7 2v4M13 2v4M3 9h14"], [1, "nav__count"], ["routerLink", "/bookings/work", "routerLinkActive", "nav__item--active", 1, "nav__item"], ["routerLink", "/bookings/invoices", "routerLinkActive", "nav__item--active", 1, "nav__item"], ["d", "M5 2h7l3 3v13H5z"], ["d", "M8 8h4M8 11h4M8 14h2"], ["routerLink", "/bookings/clients", "routerLinkActive", "nav__item--active", 1, "nav__item"], ["cx", "8", "cy", "7", "r", "3"], ["d", "M2 17c0-3.314 2.686-5 6-5s6 1.686 6 5"], ["cx", "15", "cy", "7", "r", "2.5"], ["d", "M18 17c0-2.5-1.5-4-3-4.5"], ["routerLink", "/bookings/services", "routerLinkActive", "nav__item--active", 1, "nav__item"], ["d", "M3 7l7-4 7 4-7 4-7-4zM3 7v6l7 4 7-4V7"], ["routerLink", "/bookings/staff", "routerLinkActive", "nav__item--active", 1, "nav__item"], ["cx", "7", "cy", "7", "r", "3"], ["d", "M2 17c0-3 2.5-5 5-5s5 2 5 5"], ["cx", "14.5", "cy", "7.5", "r", "2.5"], ["d", "M13 12.2c2 .4 4 2 4 4.8"], ["routerLink", "/bookings/settings", "routerLinkActive", "nav__item--active", 1, "nav__item"], ["cx", "10", "cy", "10", "r", "2.5"], ["d", "M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15 5l-1.4 1.4M6.4 13.6L5 15M15 15l-1.4-1.4M6.4 6.4L5 5"], [1, "sidebar__footer"], [1, "sync-btn", 3, "click", "disabled"], ["viewBox", "0 0 20 20", "fill", "none", "stroke", "currentColor", "stroke-width", "1.6"], ["d", "M4 10a6 6 0 0 1 10.196-4.314M16 10a6 6 0 0 1-10.196 4.314"], ["d", "M14 5.5l.196.186L16 4M6 14.5l-.196-.186L4 16"], [1, "sync-result"], [1, "main"], [1, "org-link__name"], ["viewBox", "0 0 20 20", "fill", "none", "stroke", "currentColor", "stroke-width", "1.6", 1, "org-link__chevron"], ["d", "M7 8l3 3 3-3"], ["d", "M4 5h12M4 10h12M4 15h7"], ["cx", "16", "cy", "15", "r", "1.5", "fill", "currentColor", "stroke", "none"]], template: function PlatformShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, PlatformShellComponent_Conditional_0_Template, 2, 0, "div", 0)(1, PlatformShellComponent_Conditional_1_Template, 71, 9, "div", 1);
        \u0275\u0275element(2, "app-toast-host")(3, "app-confirm-host");
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.auth.state() === "loading" ? 0 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.auth.state() === "admin" ? 1 : -1);
      }
    }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, ToastHostComponent, ConfirmHostComponent], styles: ['\n\n.auth-loading[_ngcontent-%COMP%] {\n  height: 100dvh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #0f172a;\n}\n.auth-loading__spinner[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top-color: #F4A922;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n.shell[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100dvh;\n  overflow: hidden;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 14px;\n  color: #0f172a;\n  background: #f8fafc;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 230px;\n  flex-shrink: 0;\n  background: #0f172a;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 22px 20px 18px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n.brand__mark[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  background: #F4A922;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 800;\n  color: #000;\n  letter-spacing: -0.03em;\n  flex-shrink: 0;\n}\n.brand__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #fff;\n  line-height: 1.2;\n}\n.brand__sub[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #94a3b8;\n  line-height: 1.2;\n  margin-top: 1px;\n}\n.org-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 12px 14px 0;\n  padding: 9px 12px;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 8px;\n  text-decoration: none;\n  cursor: pointer;\n}\n.org-link[_ngcontent-%COMP%]:hover, \n.org-link--active[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.12);\n}\n.org-link__name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #fff;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.org-link__chevron[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  color: rgba(255, 255, 255, 0.6);\n  flex-shrink: 0;\n}\n.nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 10px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  overflow-y: auto;\n}\n.nav__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 9px 12px;\n  border-radius: 8px;\n  color: #94a3b8;\n  font-size: 13.5px;\n  font-weight: 500;\n  text-decoration: none;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n.nav__item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.06);\n  color: #fff;\n}\n.nav__item--active[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.12);\n  color: #F4A922;\n}\n.nav__item--active[_ngcontent-%COMP%]   .nav__icon[_ngcontent-%COMP%] {\n  color: #F4A922;\n}\n.nav__icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n  color: #64748b;\n  transition: color 0.15s ease;\n}\n.nav__count[_ngcontent-%COMP%] {\n  margin-left: auto;\n  background: rgba(255, 255, 255, 0.1);\n  color: #94a3b8;\n  font-size: 11px;\n  font-weight: 600;\n  padding: 1px 7px;\n  border-radius: 20px;\n}\n.nav__item--active[_ngcontent-%COMP%]   .nav__count[_ngcontent-%COMP%] {\n  background: rgba(244, 169, 34, 0.12);\n  color: #F4A922;\n}\n.sidebar__footer[_ngcontent-%COMP%] {\n  padding: 12px 10px 16px;\n  border-top: 1px solid rgba(255, 255, 255, 0.06);\n}\n.sync-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 8px 12px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 8px;\n  color: #94a3b8;\n  font-size: 12.5px;\n  font-weight: 500;\n  font-family: inherit;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.sync-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n}\n.sync-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.sync-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  flex-shrink: 0;\n}\n.sync-btn__icon--spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1.2s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.sync-result[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  font-size: 11.5px;\n  color: #94a3b8;\n  padding: 0 4px;\n  line-height: 1.4;\n}\n.main[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  background: #f8fafc;\n}\n@media (max-width: 700px) {\n  .shell[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    height: auto;\n    flex-direction: row;\n    align-items: center;\n  }\n  .brand[_ngcontent-%COMP%] {\n    border-bottom: none;\n    border-right: 1px solid rgba(255, 255, 255, 0.06);\n    padding: 10px 14px;\n  }\n  .nav[_ngcontent-%COMP%] {\n    flex-direction: row;\n    padding: 6px;\n    gap: 2px;\n    flex: 1;\n    overflow-x: auto;\n  }\n  .nav__item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 2px;\n    padding: 6px 10px;\n    font-size: 10px;\n    white-space: nowrap;\n  }\n  .nav__icon[_ngcontent-%COMP%] {\n    width: 18px;\n    height: 18px;\n  }\n  .nav__count[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .sidebar__footer[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .main[_ngcontent-%COMP%] {\n    flex: 1;\n    overflow-y: auto;\n  }\n}\n/*# sourceMappingURL=platform-shell.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlatformShellComponent, { className: "PlatformShellComponent", filePath: "src/app/booking/platform/platform-shell/platform-shell.component.ts", lineNumber: 16 });
})();
export {
  PlatformShellComponent
};
//# sourceMappingURL=chunk-YZDXUZNU.js.map
