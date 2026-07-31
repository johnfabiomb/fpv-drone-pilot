import {
  UserAvatarComponent
} from "./chunk-6YZJQBTJ.js";
import {
  DecimalPipe,
  EventEmitter,
  NgIf,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-EBVVQ6Y2.js";

// src/app/map/layout/user-profile-card/user-profile-card.component.ts
var _c0 = ["*"];
function UserProfileCardComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.email);
  }
}
function UserProfileCardComponent_ng_container_6_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, ctx_r0.nextLevelXp), " XP to next level ");
  }
}
function UserProfileCardComponent_ng_container_6_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275element(2, "circle", 15)(3, "polyline", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r0.nextLevelDaysLeft, " more day", ctx_r0.nextLevelDaysLeft === 1 ? "" : "s", " required ");
  }
}
function UserProfileCardComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 8);
    \u0275\u0275element(2, "div", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, UserProfileCardComponent_ng_container_6_div_3_Template, 3, 3, "div", 10)(4, UserProfileCardComponent_ng_container_6_div_4_Template, 5, 2, "div", 11);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.xpProgress * 100, "%");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.nextLevelXp !== null && ctx_r0.nextLevelXp !== void 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.nextLevelDaysLeft && ctx_r0.nextLevelDaysLeft > 0);
  }
}
function UserProfileCardComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.roleLabel);
  }
}
function UserProfileCardComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserProfileCardComponent, selectors: [["app-user-profile-card"]], inputs: { photoURL: "photoURL", displayName: "displayName", levelId: "levelId", levelLabel: "levelLabel", email: "email", roleLabel: "roleLabel", activeLabel: "activeLabel", levelClickable: "levelClickable", isAdmin: "isAdmin", xpProgress: "xpProgress", nextLevelXp: "nextLevelXp", nextLevelDaysLeft: "nextLevelDaysLeft" }, outputs: { levelClicked: "levelClicked" }, ngContentSelectors: _c0, decls: 10, vars: 13, consts: [["size", "xl", "shape", "circle", 2, "margin-bottom", "18px", 3, "photoURL", "displayName", "level", "isAdmin", "clickable"], [1, "upc__name"], ["class", "upc__email", 4, "ngIf"], [1, "upc__level-badge", 3, "click"], [4, "ngIf"], ["class", "upc__role", 4, "ngIf"], ["class", "upc__active", 4, "ngIf"], [1, "upc__email"], [1, "upc__xp-bar"], [1, "upc__xp-fill"], ["class", "upc__xp-label", 4, "ngIf"], ["class", "upc__days-gate", 4, "ngIf"], [1, "upc__xp-label"], [1, "upc__days-gate"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], [1, "upc__role"], [1, "upc__active"]], template: function UserProfileCardComponent_Template(rf, ctx) {
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
        \u0275\u0275template(6, UserProfileCardComponent_ng_container_6_Template, 5, 4, "ng-container", 4)(7, UserProfileCardComponent_div_7_Template, 2, 1, "div", 5)(8, UserProfileCardComponent_div_8_Template, 2, 1, "div", 6);
        \u0275\u0275projection(9);
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
        \u0275\u0275property("ngIf", ctx.xpProgress !== void 0 && ctx.levelId >= 1 && ctx.levelId < 6);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.roleLabel);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeLabel);
      }
    }, dependencies: [NgIf, DecimalPipe, UserAvatarComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  width: 100%;\n}\n.upc__name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  letter-spacing: -0.3px;\n}\n.upc__email[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n  margin-top: 3px;\n  word-break: break-all;\n}\n.upc__level-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary) 0%,\n      var(--color-primary-hover) 100%);\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 20px;\n  letter-spacing: 0.04em;\n  margin-top: 8px;\n}\n.upc__level-badge--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.upc__xp-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 160px;\n  height: 4px;\n  border-radius: 2px;\n  background: var(--color-bg-muted);\n  margin-top: 8px;\n  overflow: hidden;\n}\n.upc__xp-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  transition: width 0.6s ease;\n  min-width: 3px;\n}\n.upc__xp-label[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  color: var(--color-text-muted);\n  margin-top: 4px;\n}\n.upc__days-gate[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 5px;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: #d97706;\n}\n.upc__role[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n  font-weight: 500;\n  margin-top: 8px;\n}\n.upc__active[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n  margin-top: 3px;\n}\n/*# sourceMappingURL=user-profile-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserProfileCardComponent, { className: "UserProfileCardComponent", filePath: "src/app/map/layout/user-profile-card/user-profile-card.component.ts", lineNumber: 142 });
})();

// src/app/map/core/services/levels-modal.service.ts
var LevelsModalService = class _LevelsModalService {
  constructor() {
    this.isOpen = signal(false);
  }
  open() {
    this.isOpen.set(true);
  }
  close() {
    this.isOpen.set(false);
  }
  static {
    this.\u0275fac = function LevelsModalService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LevelsModalService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LevelsModalService, factory: _LevelsModalService.\u0275fac, providedIn: "root" });
  }
};

// package.json
var version = "2.0.42";

export {
  UserProfileCardComponent,
  LevelsModalService,
  version
};
//# sourceMappingURL=chunk-QPBP53Z3.js.map
