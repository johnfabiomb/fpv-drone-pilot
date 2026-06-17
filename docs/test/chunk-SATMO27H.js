import {
  ProviderAvatarComponent,
  resolveProviderColor
} from "./chunk-UMCJSMWF.js";
import {
  CommonModule,
  EventEmitter,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-YX7TN7IZ.js";

// src/app/map/features/providers/provider-card/provider-card.component.ts
var ProviderCardComponent = class _ProviderCardComponent {
  constructor() {
    this.selected = new EventEmitter();
  }
  get accentColor() {
    return resolveProviderColor(this.provider);
  }
  get discountPct() {
    const m = this.provider?.discount?.label?.match(/\d+%/);
    return m ? m[0] : "";
  }
  get discountWhat() {
    return this.provider?.discount?.label?.replace(/^\d+%\s*off\s*/i, "") ?? this.provider?.discount?.label ?? "";
  }
  static {
    this.\u0275fac = function ProviderCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProviderCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderCardComponent, selectors: [["app-provider-card"]], inputs: { provider: "provider" }, outputs: { selected: "selected" }, decls: 28, vars: 12, consts: [[1, "provider-card", 3, "click"], [1, "provider-card__stripe"], [1, "provider-card__body"], [1, "provider-card__header"], [3, "provider", "size"], [1, "provider-card__info"], [1, "provider-card__name"], [1, "provider-card__tagline"], [1, "provider-card__exclusive-badge"], [1, "provider-card__deal"], [1, "provider-card__pct"], [1, "pct-num"], [1, "pct-off"], [1, "provider-card__deal-text"], [1, "deal-what"], [1, "deal-exclusive"], [1, "provider-card__cta"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function ProviderCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ProviderCardComponent_Template_div_click_0_listener() {
          return ctx.selected.emit(ctx.provider);
        });
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "app-provider-avatar", 4);
        \u0275\u0275elementStart(5, "div", 5)(6, "span", 6);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "span", 7);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "span", 8);
        \u0275\u0275text(11, "Partner deal");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 9)(13, "div", 10)(14, "span", 11);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 12);
        \u0275\u0275text(17, "OFF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 13)(19, "span", 14);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 15);
        \u0275\u0275text(22, "Only when booked via this guide");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "span", 16);
        \u0275\u0275text(24, " Claim ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(25, "svg", 17);
        \u0275\u0275element(26, "line", 18)(27, "polyline", 19);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance(3);
        \u0275\u0275property("provider", ctx.provider)("size", 46);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.provider.name);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.provider.tagline);
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("background", ctx.accentColor);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.discountPct);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.discountWhat);
      }
    }, dependencies: [CommonModule, ProviderAvatarComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.provider-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  background: var(--color-bg);\n  overflow: hidden;\n  cursor: pointer;\n  transition: box-shadow 0.18s, transform 0.18s;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.provider-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n@media (hover: hover) {\n  .provider-card[_ngcontent-%COMP%]:hover {\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);\n  }\n}\n.provider-card__stripe[_ngcontent-%COMP%] {\n  width: 5px;\n  flex-shrink: 0;\n}\n.provider-card__body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.provider-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px 10px;\n}\n.provider-card__info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.provider-card__name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.provider-card__tagline[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.provider-card__exclusive-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: #fff;\n  border-radius: var(--radius-sm);\n  padding: 3px 7px;\n}\n.provider-card__deal[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px 12px;\n}\n.provider-card__pct[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n  flex-shrink: 0;\n  background: rgba(255, 255, 255, 0.22);\n  border-radius: var(--radius-md);\n  padding: 5px 9px;\n  color: #fff;\n}\n.pct-num[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n}\n.pct-off[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  opacity: 0.85;\n  margin-top: 1px;\n}\n.provider-card__deal-text[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.deal-what[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.deal-exclusive[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  color: rgba(255, 255, 255, 0.8);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.provider-card__cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 12px;\n  font-weight: 700;\n  white-space: nowrap;\n  flex-shrink: 0;\n  color: #fff;\n}\n/*# sourceMappingURL=provider-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderCardComponent, { className: "ProviderCardComponent", filePath: "src/app/map/features/providers/provider-card/provider-card.component.ts", lineNumber: 14 });
})();

export {
  ProviderCardComponent
};
//# sourceMappingURL=chunk-SATMO27H.js.map
