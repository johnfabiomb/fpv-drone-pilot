import {
  UserAvatarComponent
} from "./chunk-WETHF3DM.js";
import {
  EventEmitter,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E43Y6J77.js";

// package.json
var version = "1.1.30";

// src/app/components/user-profile-card/user-profile-card.component.ts
var _c0 = ["*"];
function UserProfileCardComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.email);
  }
}
function UserProfileCardComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.roleLabel);
  }
}
function UserProfileCardComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.activeLabel);
  }
}
var UserProfileCardComponent = class _UserProfileCardComponent {
  constructor() {
    this.photoURL = "";
    this.displayName = "";
    this.levelId = 1;
    this.levelLabel = "Explorer \xB7 Level 1";
    this.levelClickable = false;
    this.isAdmin = false;
    this.levelClicked = new EventEmitter();
  }
  static {
    this.\u0275fac = function UserProfileCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserProfileCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserProfileCardComponent, selectors: [["app-user-profile-card"]], inputs: { photoURL: "photoURL", displayName: "displayName", levelId: "levelId", levelLabel: "levelLabel", email: "email", roleLabel: "roleLabel", activeLabel: "activeLabel", levelClickable: "levelClickable", isAdmin: "isAdmin" }, outputs: { levelClicked: "levelClicked" }, ngContentSelectors: _c0, decls: 9, vars: 12, consts: [["size", "xl", "shape", "circle", 2, "margin-bottom", "18px", 3, "photoURL", "displayName", "level", "isAdmin", "clickable"], [1, "upc__name"], ["class", "upc__email", 4, "ngIf"], [1, "upc__level-badge", 3, "click"], ["class", "upc__role", 4, "ngIf"], ["class", "upc__active", 4, "ngIf"], [1, "upc__email"], [1, "upc__role"], [1, "upc__active"]], template: function UserProfileCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275element(0, "app-user-avatar", 0);
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, UserProfileCardComponent_div_3_Template, 2, 1, "div", 2);
        \u0275\u0275elementStart(4, "div", 3);
        \u0275\u0275listener("click", function UserProfileCardComponent_Template_div_click_4_listener() {
          return ctx.levelClickable && ctx.levelClicked.emit();
        });
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, UserProfileCardComponent_div_6_Template, 2, 1, "div", 4)(7, UserProfileCardComponent_div_7_Template, 2, 1, "div", 5);
        \u0275\u0275projection(8);
      }
      if (rf & 2) {
        \u0275\u0275property("photoURL", ctx.photoURL)("displayName", ctx.displayName)("level", ctx.levelId)("isAdmin", ctx.isAdmin)("clickable", false);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.displayName);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.email);
        \u0275\u0275advance();
        \u0275\u0275classProp("upc__level-badge--clickable", ctx.levelClickable);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.levelLabel, " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.roleLabel);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeLabel);
      }
    }, dependencies: [NgIf, UserAvatarComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  width: 100%;\n}\n.upc__name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  letter-spacing: -0.3px;\n}\n.upc__email[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n  margin-top: 3px;\n  word-break: break-all;\n}\n.upc__level-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary) 0%,\n      var(--color-primary-hover) 100%);\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 20px;\n  letter-spacing: 0.04em;\n  margin-top: 8px;\n}\n.upc__level-badge--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.upc__role[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n  font-weight: 500;\n  margin-top: 8px;\n}\n.upc__active[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n  margin-top: 3px;\n}\n/*# sourceMappingURL=user-profile-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserProfileCardComponent, { className: "UserProfileCardComponent", filePath: "src/app/components/user-profile-card/user-profile-card.component.ts", lineNumber: 92 });
})();

export {
  version,
  UserProfileCardComponent
};
//# sourceMappingURL=chunk-2RWEJCW4.js.map
