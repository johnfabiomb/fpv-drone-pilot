import {
  UserAvatarComponent
} from "./chunk-SZHWLQUX.js";
import {
  CommonModule,
  ElementRef,
  EventEmitter,
  NgForOf,
  NgIf,
  Renderer2,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2FJZNSO2.js";

// src/app/map/ui/confirm-popup/confirm-popup.component.ts
var ConfirmPopupComponent = class _ConfirmPopupComponent {
  constructor() {
    this.el = inject(ElementRef);
    this.renderer = inject(Renderer2);
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
  ngOnInit() {
    if (this._fixed) {
      this.renderer.appendChild(document.body, this.el.nativeElement);
    }
  }
  ngOnDestroy() {
    if (this._fixed && document.body.contains(this.el.nativeElement)) {
      this.renderer.removeChild(document.body, this.el.nativeElement);
    }
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
    }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  position: absolute;\n  top: calc(100% + 10px);\n  right: 0;\n  z-index: 200;\n}\n.is-fixed[_nghost-%COMP%] {\n  position: fixed;\n  top: auto;\n  right: auto;\n  bottom: 90px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 10000;\n}\n.is-fixed[_nghost-%COMP%]   .confirm-popup[_ngcontent-%COMP%] {\n  width: min(260px, 80vw);\n}\n.confirm-popup[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 12px 14px;\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.16);\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  width: 168px;\n  animation: _ngcontent-%COMP%_cpPopUp 0.15s ease;\n}\n.confirm-popup__text[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  line-height: 1.45;\n}\n.confirm-popup__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.confirm-popup__btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 32px;\n  border-radius: var(--radius-sm);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition: opacity 0.15s;\n}\n.confirm-popup__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.confirm-popup__btn--cancel[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.confirm-popup__btn--danger[_ngcontent-%COMP%] {\n  background: #e11d48;\n  color: #fff;\n}\n.confirm-popup__btn--primary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n}\n@keyframes _ngcontent-%COMP%_cpPopUp {\n  from {\n    opacity: 0;\n    transform: translateY(-4px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_cpPopUpFixed {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) scale(1);\n  }\n}\n.is-fixed[_nghost-%COMP%]   .confirm-popup[_ngcontent-%COMP%] {\n  animation-name: _ngcontent-%COMP%_cpPopUpFixed;\n}\n/*# sourceMappingURL=confirm-popup.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmPopupComponent, { className: "ConfirmPopupComponent", filePath: "src/app/map/ui/confirm-popup/confirm-popup.component.ts", lineNumber: 96 });
})();

// src/app/map/features/groups/member-avatars/member-avatars.component.ts
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
    \u0275\u0275property("photoURL", p_r1.photoURL)("displayName", p_r1.displayName)("level", 1)("clickable", false);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MemberAvatarsComponent, selectors: [["app-member-avatars"]], inputs: { previews: "previews", total: "total" }, decls: 3, vars: 2, consts: [[1, "avatars"], ["class", "avatars__wrap", 3, "z-index", 4, "ngFor", "ngForOf"], ["class", "avatars__more", 4, "ngIf"], [1, "avatars__wrap"], ["size", "sm", "shape", "circle", 3, "photoURL", "displayName", "level", "clickable"], [1, "avatars__more"]], template: function MemberAvatarsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, MemberAvatarsComponent_div_1_Template, 2, 6, "div", 1)(2, MemberAvatarsComponent_span_2_Template, 2, 1, "span", 2);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MemberAvatarsComponent, { className: "MemberAvatarsComponent", filePath: "src/app/map/features/groups/member-avatars/member-avatars.component.ts", lineNumber: 60 });
})();

export {
  ConfirmPopupComponent,
  MemberAvatarsComponent
};
//# sourceMappingURL=chunk-J447LAHW.js.map
