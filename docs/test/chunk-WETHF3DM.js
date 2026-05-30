import {
  LEVELS
} from "./chunk-AUG5IYR7.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E43Y6J77.js";

// src/app/shared/services/profile-modal.service.ts
var ProfileModalService = class _ProfileModalService {
  constructor() {
    this.current = signal(null);
    this.selfOpen = signal(false);
  }
  show(data) {
    this.current.set(data);
  }
  hide() {
    this.current.set(null);
  }
  openSelf() {
    this.selfOpen.set(true);
  }
  closeSelf() {
    this.selfOpen.set(false);
  }
  static {
    this.\u0275fac = function ProfileModalService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProfileModalService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProfileModalService, factory: _ProfileModalService.\u0275fac, providedIn: "root" });
  }
};

// src/app/components/user-avatar/user-avatar.component.ts
function UserAvatarComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.photoURL, \u0275\u0275sanitizeUrl)("alt", ctx_r0.displayName)("width", ctx_r0.sizePx)("height", ctx_r0.sizePx);
  }
}
function UserAvatarComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 2);
    \u0275\u0275element(1, "path", 4)(2, "circle", 5);
    \u0275\u0275elementEnd();
  }
}
function UserAvatarComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap("uav-pill " + ctx_r0.pillClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.pillLabel);
  }
}
var SIZE_PX = { xs: 22, sm: 28, md: 36, lg: 52, xl: 72 };
var UserAvatarComponent = class _UserAvatarComponent {
  constructor() {
    this.photoURL = "";
    this.displayName = "";
    this.size = "md";
    this.shape = "circle";
    this.level = 1;
    this.isAdmin = false;
    this.roleLabel = "";
    this.activeLabel = "";
    this.clickable = true;
    this.isSelf = false;
    this.profileModal = inject(ProfileModalService);
  }
  get sizePx() {
    return SIZE_PX[this.size] ?? 36;
  }
  get cls() {
    let levelCls;
    if (!this.photoURL) {
      levelCls = "uav--guest";
    } else if (this.size === "xs" || this.size === "sm") {
      levelCls = "uav--compact";
    } else if (this.isAdmin) {
      levelCls = "uav--admin";
    } else {
      levelCls = `uav--level-${this.level}`;
    }
    return `uav--${this.size} uav--${this.shape} ${levelCls}`;
  }
  get wrapClass() {
    const clickable = this.clickable && !!this.displayName;
    return clickable ? "uav-wrap uav-wrap--clickable" : "uav-wrap";
  }
  // Only show pill on md/lg/xl — sm and xs are too small (chat bubbles, compact rows)
  get showPill() {
    return (this.size === "md" || this.size === "lg" || this.size === "xl") && (this.isAdmin || !!this.photoURL);
  }
  get pillLabel() {
    if (this.isAdmin)
      return "GM";
    if (this.level === 0)
      return "New";
    return String(this.level);
  }
  get pillClass() {
    if (this.isAdmin)
      return "uav-pill--gm";
    return `uav-pill--level-${this.level}`;
  }
  get levelLabel() {
    if (this.isAdmin)
      return "GM \xB7 Legend";
    const def = LEVELS.find((l) => l.id === this.level);
    return def ? `${def.name} \xB7 Level ${def.id}` : "Explorer \xB7 Level 1";
  }
  onClick(event) {
    if (!this.clickable || !this.displayName)
      return;
    event.stopPropagation();
    event.preventDefault();
    if (this.isSelf) {
      this.profileModal.openSelf();
      return;
    }
    this.profileModal.show({
      photoURL: this.photoURL,
      displayName: this.displayName,
      levelId: this.level,
      levelLabel: this.levelLabel,
      isAdmin: this.isAdmin,
      roleLabel: this.roleLabel || void 0,
      activeLabel: this.activeLabel || void 0
    });
  }
  static {
    this.\u0275fac = function UserAvatarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserAvatarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserAvatarComponent, selectors: [["app-user-avatar"]], inputs: { photoURL: "photoURL", displayName: "displayName", size: "size", shape: "shape", level: "level", isAdmin: "isAdmin", roleLabel: "roleLabel", activeLabel: "activeLabel", clickable: "clickable", isSelf: "isSelf" }, decls: 5, vars: 6, consts: [[3, "click"], ["referrerpolicy", "no-referrer", 3, "src", "alt", "width", "height"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "uav-guest-icon"], [3, "class"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"]], template: function UserAvatarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function UserAvatarComponent_Template_div_click_0_listener($event) {
          return ctx.onClick($event);
        });
        \u0275\u0275elementStart(1, "div");
        \u0275\u0275template(2, UserAvatarComponent_Conditional_2_Template, 1, 4, "img", 1)(3, UserAvatarComponent_Conditional_3_Template, 3, 0, ":svg:svg", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, UserAvatarComponent_Conditional_4_Template, 2, 3, "span", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.wrapClass);
        \u0275\u0275advance();
        \u0275\u0275classMap("uav " + ctx.cls);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.photoURL ? 2 : 3);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.showPill ? 4 : -1);
      }
    }, styles: ["\n\n[_nghost-%COMP%] {\n  display: inline-flex;\n  flex-shrink: 0;\n}\n.uav-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n}\n.uav-wrap--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.uav[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.uav[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center top;\n}\n.uav--xs[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n}\n.uav--sm[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n}\n.uav--md[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n}\n.uav--lg[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n}\n.uav--xl[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n}\n.uav--circle[_ngcontent-%COMP%] {\n  border-radius: 50%;\n}\n.uav--squircle[_ngcontent-%COMP%] {\n  border-radius: var(--radius-lg);\n}\n.uav--guest[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 2px solid var(--color-border);\n  color: var(--color-text-light);\n}\n.uav--compact[_ngcontent-%COMP%] {\n  border: 1.5px solid rgba(0, 0, 0, 0.1);\n}\n.uav-guest-icon[_ngcontent-%COMP%] {\n  width: 55%;\n  height: 55%;\n}\n.uav--level-0[_ngcontent-%COMP%] {\n  border: 2px solid #22c55e;\n  animation: _ngcontent-%COMP%_uavL0 2.5s ease-in-out infinite;\n}\n.uav--level-1[_ngcontent-%COMP%] {\n  border: 2px solid var(--color-primary);\n  animation: _ngcontent-%COMP%_uavL1 3s ease-in-out infinite;\n}\n.uav--level-2[_ngcontent-%COMP%] {\n  border: 2px solid #0ea5e9;\n  animation: _ngcontent-%COMP%_uavL2 2.5s ease-in-out infinite;\n}\n.uav--level-3[_ngcontent-%COMP%] {\n  border: 2px solid #7c3aed;\n  animation: _ngcontent-%COMP%_uavL3 2s ease-in-out infinite;\n}\n.uav--level-4[_ngcontent-%COMP%] {\n  border: 2.5px solid var(--color-primary);\n  animation: _ngcontent-%COMP%_uavL4 1.8s ease-in-out infinite;\n}\n.uav--level-5[_ngcontent-%COMP%] {\n  border: 2.5px solid #f97316;\n  animation: _ngcontent-%COMP%_uavL5 1.2s ease-in-out infinite alternate;\n}\n.uav--level-6[_ngcontent-%COMP%] {\n  border: 3px solid #f43f5e;\n  animation: _ngcontent-%COMP%_uavL6 2.5s linear infinite;\n}\n.uav--admin[_ngcontent-%COMP%] {\n  border: 3px solid #dc2626;\n  animation: _ngcontent-%COMP%_uavAdmin 3s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_uavL0 {\n  0%, 100% {\n    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1), 0 0 6px rgba(34, 197, 94, 0.1);\n  }\n  50% {\n    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3), 0 0 14px rgba(34, 197, 94, 0.35);\n  }\n}\n@keyframes _ngcontent-%COMP%_uavL1 {\n  0%, 100% {\n    box-shadow: 0 0 0 2px rgba(244, 169, 34, 0.1), 0 0 4px rgba(244, 169, 34, 0.08);\n  }\n  50% {\n    box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.28), 0 0 12px rgba(244, 169, 34, 0.22);\n  }\n}\n@keyframes _ngcontent-%COMP%_uavL2 {\n  0%, 100% {\n    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.12), 0 0 6px rgba(14, 165, 233, 0.1);\n  }\n  50% {\n    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.4), 0 0 18px rgba(14, 165, 233, 0.32);\n  }\n}\n@keyframes _ngcontent-%COMP%_uavL3 {\n  0%, 100% {\n    box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.18), 0 0 8px rgba(124, 58, 237, 0.15);\n  }\n  50% {\n    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.52), 0 0 24px rgba(124, 58, 237, 0.48);\n  }\n}\n@keyframes _ngcontent-%COMP%_uavL4 {\n  0%, 100% {\n    box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.2), 0 0 10px rgba(244, 169, 34, 0.2);\n  }\n  50% {\n    box-shadow: 0 0 0 5px rgba(244, 169, 34, 0.58), 0 0 30px rgba(244, 169, 34, 0.55);\n  }\n}\n@keyframes _ngcontent-%COMP%_uavL5 {\n  from {\n    border-color: #f97316;\n    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.28), 0 0 16px rgba(239, 68, 68, 0.32);\n  }\n  to {\n    border-color: #dc2626;\n    box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.58), 0 0 36px rgba(249, 115, 22, 0.68);\n  }\n}\n@keyframes _ngcontent-%COMP%_uavL6 {\n  0% {\n    border-color: #f43f5e;\n    box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.45), 0 0 28px rgba(244, 63, 94, 0.55);\n  }\n  16% {\n    border-color: #f97316;\n    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.45), 0 0 28px rgba(249, 115, 22, 0.55);\n  }\n  33% {\n    border-color: #eab308;\n    box-shadow: 0 0 0 4px rgba(234, 179, 8, 0.45), 0 0 28px rgba(234, 179, 8, 0.55);\n  }\n  50% {\n    border-color: #22c55e;\n    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.45), 0 0 28px rgba(34, 197, 94, 0.55);\n  }\n  66% {\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.45), 0 0 28px rgba(59, 130, 246, 0.55);\n  }\n  83% {\n    border-color: #8b5cf6;\n    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.45), 0 0 28px rgba(139, 92, 246, 0.55);\n  }\n  100% {\n    border-color: #f43f5e;\n    box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.45), 0 0 28px rgba(244, 63, 94, 0.55);\n  }\n}\n@keyframes _ngcontent-%COMP%_uavAdmin {\n  0% {\n    border-color: #dc2626;\n    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.35), 0 0 18px rgba(220, 38, 38, 0.4);\n  }\n  33% {\n    border-color: #ea580c;\n    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.35), 0 0 18px rgba(234, 88, 12, 0.4);\n  }\n  66% {\n    border-color: #d97706;\n    box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.35), 0 0 18px rgba(217, 119, 6, 0.4);\n  }\n  100% {\n    border-color: #dc2626;\n    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.35), 0 0 18px rgba(220, 38, 38, 0.4);\n  }\n}\n.uav-pill[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -7px;\n  left: 50%;\n  transform: translateX(-50%);\n  font-size: 8px;\n  font-weight: 700;\n  line-height: 1;\n  padding: 2px 5px;\n  border-radius: 4px;\n  white-space: nowrap;\n  letter-spacing: 0.04em;\n  pointer-events: none;\n  z-index: 1;\n}\n.uav-pill--level-0[_ngcontent-%COMP%] {\n  background: #22c55e;\n  color: #fff;\n}\n.uav-pill--level-1[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #000;\n}\n.uav-pill--level-2[_ngcontent-%COMP%] {\n  background: #0ea5e9;\n  color: #fff;\n}\n.uav-pill--level-3[_ngcontent-%COMP%] {\n  background: #7c3aed;\n  color: #fff;\n}\n.uav-pill--level-4[_ngcontent-%COMP%] {\n  background: #d97706;\n  color: #fff;\n}\n.uav-pill--level-5[_ngcontent-%COMP%] {\n  background: #f97316;\n  color: #fff;\n}\n.uav-pill--level-6[_ngcontent-%COMP%] {\n  background: #f43f5e;\n  color: #fff;\n}\n.uav-pill--gm[_ngcontent-%COMP%] {\n  font-size: 8.5px;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  color: #fff;\n  animation: _ngcontent-%COMP%_gmPill 3s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_gmPill {\n  0% {\n    background: #dc2626;\n    box-shadow: 0 0 5px 1px rgba(220, 38, 38, 0.6);\n  }\n  33% {\n    background: #ea580c;\n    box-shadow: 0 0 5px 1px rgba(234, 88, 12, 0.6);\n  }\n  66% {\n    background: #d97706;\n    box-shadow: 0 0 5px 1px rgba(217, 119, 6, 0.6);\n  }\n  100% {\n    background: #dc2626;\n    box-shadow: 0 0 5px 1px rgba(220, 38, 38, 0.6);\n  }\n}\n/*# sourceMappingURL=user-avatar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserAvatarComponent, { className: "UserAvatarComponent", filePath: "src/app/components/user-avatar/user-avatar.component.ts", lineNumber: 229 });
})();

export {
  ProfileModalService,
  UserAvatarComponent
};
//# sourceMappingURL=chunk-WETHF3DM.js.map
