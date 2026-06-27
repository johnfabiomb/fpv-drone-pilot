import {
  BookingsAuthService
} from "./chunk-RCLK272Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-TEK6OFIA.js";
import "./chunk-3A2C4JCE.js";
import "./chunk-5PW2HKAJ.js";
import {
  Router
} from "./chunk-3RXOOUTX.js";
import "./chunk-AMJW2RV7.js";
import {
  CommonModule,
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-2FJZNSO2.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/auth/login/login.component.ts
function LoginComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 1);
  }
}
function LoginComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3);
    \u0275\u0275text(2, "JM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Access denied");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Your account does not have access to this system.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 4);
    \u0275\u0275listener("click", function LoginComponent_Conditional_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signOut());
    });
    \u0275\u0275text(8, "Sign out");
    \u0275\u0275elementEnd()();
  }
}
function LoginComponent_Conditional_3_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 13);
    \u0275\u0275listener("ngModelChange", function LoginComponent_Conditional_3_Conditional_17_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.email.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "button", 4);
    \u0275\u0275listener("click", function LoginComponent_Conditional_3_Conditional_17_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sendMagicLink());
    });
    \u0275\u0275text(2, "Send magic link");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngModel", ctx_r1.email());
  }
}
function LoginComponent_Conditional_3_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "Check your inbox \u2014 a sign-in link is on its way.");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3);
    \u0275\u0275text(2, "JM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Studio Bookings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Sign in to manage your bookings.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 5);
    \u0275\u0275listener("click", function LoginComponent_Conditional_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signInWithGoogle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 6);
    \u0275\u0275element(9, "path", 7)(10, "path", 8)(11, "path", 9)(12, "path", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Continue with Google ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(14, "div", 11)(15, "span");
    \u0275\u0275text(16, "or use email link");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, LoginComponent_Conditional_3_Conditional_17_Template, 3, 1)(18, LoginComponent_Conditional_3_Conditional_18_Template, 2, 0, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275conditional(!ctx_r1.sent() ? 17 : 18);
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.router = inject(Router);
    this.auth = inject(BookingsAuthService);
    this.email = signal("");
    this.sent = signal(false);
    effect(() => {
      if (this.auth.state() === "admin") {
        this.router.navigate(["/bookings"], { replaceUrl: true });
      }
    });
  }
  ngOnInit() {
    this.auth.initialize();
  }
  signInWithGoogle() {
    return __async(this, null, function* () {
      yield this.auth.signInWithGoogle();
    });
  }
  sendMagicLink() {
    return __async(this, null, function* () {
      const e = this.email();
      if (!e)
        return;
      yield this.auth.signIn(e);
      this.sent.set(true);
    });
  }
  signOut() {
    return __async(this, null, function* () {
      yield this.auth.signOut();
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-booking-login"]], decls: 4, vars: 3, consts: [[1, "gate"], [1, "spinner"], [1, "card"], [1, "mark"], [1, "btn", "btn--ghost", "btn--full", 3, "click"], [1, "btn", "btn--google", "btn--full", 3, "click"], ["viewBox", "0 0 24 24", "width", "18", "height", "18"], ["fill", "#4285F4", "d", "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"], ["fill", "#34A853", "d", "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"], ["fill", "#FBBC05", "d", "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"], ["fill", "#EA4335", "d", "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"], [1, "divider"], [1, "sent-msg"], ["type", "email", "placeholder", "your@email.com", 1, "input", 3, "ngModelChange", "ngModel"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, LoginComponent_Conditional_1_Template, 1, 0, "div", 1)(2, LoginComponent_Conditional_2_Template, 9, 0, "div", 2)(3, LoginComponent_Conditional_3_Template, 19, 1, "div", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.auth.state() === "loading" ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.auth.state() === "no-access" ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.auth.state() === "signed-out" ? 3 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.gate[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100dvh;\n  background: #f8fafc;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n}\n.card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 40px 36px;\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  text-align: center;\n}\n.mark[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  background: #F4A922;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 800;\n  color: #000;\n  margin: 0 auto;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\np[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: #475569;\n  margin: 0;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 10px 18px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  border: 1.5px solid transparent;\n  font-family: inherit;\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-color: #e2e8f0;\n  color: #475569;\n}\n.btn--ghost[_ngcontent-%COMP%]:hover {\n  border-color: #334155;\n  color: #0f172a;\n}\n.btn--google[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-color: #e2e8f0;\n  color: #0f172a;\n}\n.btn--google[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}\n.btn--full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.input[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 13.5px;\n  color: #0f172a;\n  background: #ffffff;\n  outline: none;\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n  width: 100%;\n  box-sizing: border-box;\n  font-family: inherit;\n  text-align: left;\n}\n.input[_ngcontent-%COMP%]:focus {\n  border-color: #F4A922;\n  box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.12);\n}\n.input[_ngcontent-%COMP%]::placeholder {\n  color: #94a3b8;\n}\n.divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  color: #94a3b8;\n  font-size: 12px;\n}\n.divider[_ngcontent-%COMP%]::before, \n.divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: #e2e8f0;\n}\n.sent-msg[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: #f0fdf4;\n  border: 1px solid #bbf7d0;\n  border-radius: 8px;\n  font-size: 13.5px;\n  color: #16a34a;\n  font-weight: 500;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 2.5px solid #e2e8f0;\n  border-top-color: #F4A922;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/booking/auth/login/login.component.ts", lineNumber: 14 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-XFELWCSA.js.map
