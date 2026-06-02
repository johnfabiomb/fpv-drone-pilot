import {
  SeoService
} from "./chunk-Z752YGBW.js";
import "./chunk-ADG4HADG.js";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtrustConstantResourceUrl
} from "./chunk-7275G3GP.js";
import "./chunk-TWWAJFRB.js";

// src/app/pages/home/home.component.ts
var HomeComponent = class _HomeComponent {
  constructor() {
    this.seo = inject(SeoService);
  }
  ngOnInit() {
    this.seo.setPage("map");
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 18, vars: 0, consts: [[1, "app"], ["src", "assets/images/bg.webp", "alt", "", 1, "bg"], ["src", "assets/images/me.webp", "alt", "", 1, "me"], [1, "container"], [1, "section-data"], [1, "main-title"], [1, "main-details"], [1, "fa", "fa-envelope"], [1, "fa", "fa-phone"], [1, "ig-section"], ["width", "100%", "height", "auto", "src", \u0275\u0275trustConstantResourceUrl`https://www.instagram.com/johnfabiomb/embed`, "frameborder", "0"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "img", 1)(2, "img", 2);
        \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "div", 5);
        \u0275\u0275text(6, " Explorer & Creator ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 6)(8, "b");
        \u0275\u0275text(9, "Contact information");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 6);
        \u0275\u0275element(11, "i", 7);
        \u0275\u0275text(12, " johnfabiomb@gmail.com ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 6);
        \u0275\u0275element(14, "i", 8);
        \u0275\u0275text(15, " +356 99381350 ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 9);
        \u0275\u0275element(17, "iframe", 10);
        \u0275\u0275elementEnd()()();
      }
    }, styles: ["\n\n  .cdk-overlay-pane.mat-mdc-dialog-panel {\n  position: absolute !important;\n  padding: 15px !important;\n  top: 0px;\n  max-width: 470px !important;\n  min-width: 0px !important;\n  right: 0;\n}\n  .mat-mdc-dialog-container {\n  max-height: calc(100dvh - 90px);\n}\na[_ngcontent-%COMP%]:link {\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:visited {\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:hover {\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:active {\n  text-decoration: none;\n}\n.app[_ngcontent-%COMP%] {\n  height: 100dvh;\n  display: flex;\n  position: relative;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n.app[_ngcontent-%COMP%]   .me[_ngcontent-%COMP%] {\n  left: -35px;\n  position: absolute;\n  max-height: 100%;\n  z-index: 1;\n}\n.app[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] {\n  position: absolute;\n  max-height: 100%;\n  z-index: 0;\n  opacity: 0.1;\n  width: auto;\n  height: 100%;\n  overflow: hidden;\n}\n@media (min-width: 1400px) {\n  .app[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media (min-width: 1200px) and (max-width: 1399px) {\n  .app[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .app[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.9);\n  padding: 20px;\n  border-radius: 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  z-index: 2;\n  gap: 20px;\n  max-width: 400px;\n  margin: 20px;\n}\n@media (min-width: 1400px) {\n  .app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: 30px;\n    width: 70%;\n    right: 10%;\n    max-width: none;\n  }\n}\n@media (min-width: 1200px) and (max-width: 1399px) {\n  .app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: 30px;\n    width: 70%;\n    right: 10%;\n    max-width: none;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: 30px;\n    width: 70%;\n    right: 10%;\n    max-width: none;\n  }\n}\n.app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .section-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .section-data[_ngcontent-%COMP%]   .main-title[_ngcontent-%COMP%] {\n  font-size: 40px;\n  font-weight: 700;\n}\n.app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .section-data[_ngcontent-%COMP%]   .main-details[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n.app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .ig-section[_ngcontent-%COMP%] {\n  flex-grow: 0.3;\n}\n.app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .ig-section[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n  width: 100%;\n}\n@media (min-width: 1400px) {\n  .app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .ig-section[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n    min-width: 350px;\n  }\n}\n@media (min-width: 1200px) and (max-width: 1399px) {\n  .app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .ig-section[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n    min-width: 350px;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .app[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .ig-section[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n    min-width: 350px;\n  }\n}\n/*# sourceMappingURL=home.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/pages/home/home.component.ts", lineNumber: 11 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-CMTHEGZX.js.map
