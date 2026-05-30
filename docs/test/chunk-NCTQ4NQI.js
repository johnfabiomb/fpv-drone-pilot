import {
  UserAvatarComponent
} from "./chunk-WETHF3DM.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  computed,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-E43Y6J77.js";

// src/app/components/member-avatars/member-avatars.component.ts
function MemberAvatarsComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "app-user-avatar", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("z-index", ctx_r2.visible().length - i_r2);
    \u0275\u0275advance();
    \u0275\u0275property("photoURL", p_r1.photoURL)("displayName", p_r1.displayName)("level", 1);
  }
}
function MemberAvatarsComponent_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", ctx_r2.overflow(), "");
  }
}
var MemberAvatarsComponent = class _MemberAvatarsComponent {
  constructor() {
    this._previews = signal([]);
    this._total = signal(0);
    this.visible = computed(() => this._previews().slice(0, 5));
    this.overflow = computed(() => Math.max(0, this._total() - this.visible().length));
  }
  set previews(v) {
    this._previews.set(v ?? []);
  }
  set total(v) {
    this._total.set(v ?? 0);
  }
  static {
    this.\u0275fac = function MemberAvatarsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MemberAvatarsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MemberAvatarsComponent, selectors: [["app-member-avatars"]], inputs: { previews: "previews", total: "total" }, decls: 3, vars: 2, consts: [[1, "avatars"], ["class", "avatars__wrap", 3, "z-index", 4, "ngFor", "ngForOf"], ["class", "avatars__more", 4, "ngIf"], [1, "avatars__wrap"], ["size", "sm", "shape", "circle", 3, "photoURL", "displayName", "level"], [1, "avatars__more"]], template: function MemberAvatarsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, MemberAvatarsComponent_div_1_Template, 2, 5, "div", 1)(2, MemberAvatarsComponent_span_2_Template, 2, 1, "span", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.visible());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.overflow() > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, UserAvatarComponent], styles: ["\n\n.avatars[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.avatars__wrap[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-shrink: 0;\n  border-radius: 50%;\n  box-shadow: 0 0 0 2px var(--color-bg);\n}\n.avatars__wrap[_ngcontent-%COMP%]    + .avatars__wrap[_ngcontent-%COMP%] {\n  margin-left: -8px;\n}\n.avatars__more[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--color-bg-muted);\n  box-shadow: 0 0 0 2px var(--color-bg);\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-left: -8px;\n}\n/*# sourceMappingURL=member-avatars.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MemberAvatarsComponent, { className: "MemberAvatarsComponent", filePath: "src/app/components/member-avatars/member-avatars.component.ts", lineNumber: 59 });
})();

export {
  MemberAvatarsComponent
};
//# sourceMappingURL=chunk-NCTQ4NQI.js.map
