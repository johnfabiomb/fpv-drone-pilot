import {
  experienceColor,
  experienceIcon,
  resolveExperienceDiscount
} from "./chunk-T2SPBSC6.js";
import {
  CommonModule,
  EventEmitter,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-P56CFEJA.js";

// src/app/map/features/experiences/experience-card/experience-card.component.ts
function ExperienceCardComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11)(2, "span", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 13);
    \u0275\u0275text(5, "OFF");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 14)(7, "span", 15);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 16);
    \u0275\u0275text(10, "Only when booked via this guide");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 17);
    \u0275\u0275text(12, " Claim ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 18);
    \u0275\u0275element(14, "line", 19)(15, "polyline", 20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background", ctx_r0.accentColor);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.discountPct);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.discountWhat);
  }
}
var ExperienceCardComponent = class _ExperienceCardComponent {
  constructor() {
    this.selected = new EventEmitter();
  }
  get accentColor() {
    return experienceColor(this.provider);
  }
  get icon() {
    return experienceIcon(this.experience);
  }
  get discountLabel() {
    return resolveExperienceDiscount(this.experience, this.provider)?.label ?? "";
  }
  get discountPct() {
    return this.discountLabel.match(/\d+%/)?.[0] ?? "";
  }
  get discountWhat() {
    return this.discountLabel.replace(/^\d+%\s*off\s*/i, "") || this.discountLabel;
  }
  static {
    this.\u0275fac = function ExperienceCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ExperienceCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExperienceCardComponent, selectors: [["app-experience-card"]], inputs: { experience: "experience", provider: "provider" }, outputs: { selected: "selected" }, decls: 14, vars: 9, consts: [[1, "exp-card", 3, "click"], [1, "exp-card__stripe"], [1, "exp-card__body"], [1, "exp-card__header"], [1, "exp-card__icon"], [1, "exp-card__info"], [1, "exp-card__title"], [1, "exp-card__by"], [1, "exp-card__tagline"], ["class", "exp-card__deal", 3, "background", 4, "ngIf"], [1, "exp-card__deal"], [1, "exp-card__pct"], [1, "pct-num"], [1, "pct-off"], [1, "exp-card__deal-text"], [1, "deal-what"], [1, "deal-exclusive"], [1, "exp-card__cta"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function ExperienceCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ExperienceCardComponent_Template_div_click_0_listener() {
          return ctx.selected.emit(ctx.experience);
        });
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "span", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 5)(7, "span", 6);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 7);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "p", 8);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, ExperienceCardComponent_div_13_Template, 16, 4, "div", 9);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance(3);
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.icon);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.experience.title);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("with ", ctx.provider.name, "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.experience.tagline);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.discountPct);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.exp-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  background: var(--color-bg);\n  overflow: hidden;\n  cursor: pointer;\n  transition: box-shadow 0.18s, transform 0.18s;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.exp-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n@media (hover: hover) {\n  .exp-card[_ngcontent-%COMP%]:hover {\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);\n  }\n}\n.exp-card__stripe[_ngcontent-%COMP%] {\n  width: 5px;\n  flex-shrink: 0;\n}\n.exp-card__body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.exp-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px 6px;\n}\n.exp-card__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n}\n.exp-card__info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.exp-card__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.exp-card__by[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-light);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.exp-card__tagline[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0 14px 10px;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  line-height: 1.4;\n}\n.exp-card__deal[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px 12px;\n}\n.exp-card__pct[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n  flex-shrink: 0;\n  background: rgba(255, 255, 255, 0.22);\n  border-radius: var(--radius-md);\n  padding: 5px 9px;\n  color: #fff;\n}\n.pct-num[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n}\n.pct-off[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  opacity: 0.85;\n  margin-top: 1px;\n}\n.exp-card__deal-text[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.deal-what[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.deal-exclusive[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  color: rgba(255, 255, 255, 0.8);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.exp-card__cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 12px;\n  font-weight: 700;\n  white-space: nowrap;\n  flex-shrink: 0;\n  color: #fff;\n}\n/*# sourceMappingURL=experience-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExperienceCardComponent, { className: "ExperienceCardComponent", filePath: "src/app/map/features/experiences/experience-card/experience-card.component.ts", lineNumber: 13 });
})();

export {
  ExperienceCardComponent
};
//# sourceMappingURL=chunk-EX2BKPE3.js.map
