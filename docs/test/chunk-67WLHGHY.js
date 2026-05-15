import {
  SeoService
} from "./chunk-25R47I5C.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-GXMQ7NKC.js";
import {
  CommonModule
} from "./chunk-QICNAPY4.js";
import {
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-FZOYICSM.js";
import "./chunk-TXDUYLVM.js";

// src/app/platform/contact/contact.component.ts
var ContactComponent = class _ContactComponent {
  constructor(seo) {
    this.seo = seo;
  }
  ngOnInit() {
    this.seo.setPage("contact");
  }
  static {
    this.\u0275fac = function ContactComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ContactComponent)(\u0275\u0275directiveInject(SeoService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContactComponent, selectors: [["app-contact"]], decls: 33, vars: 0, consts: [[1, "legal-page"], [1, "legal-inner"], ["routerLink", "/malta", 1, "back-link"], [1, "legal-title"], [1, "legal-updated"], ["href", "mailto:creator@johnfabiomb.com"], ["href", "https://www.instagram.com/johnfabiomb/", "target", "_blank", "rel", "noopener"]], template: function ContactComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
        \u0275\u0275text(3, "\u2190 Back to map");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "Contact");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Last updated: May 2026");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "section")(9, "p");
        \u0275\u0275text(10, "If you want to get in touch about the Explore Malta site, hidden locations, FPV drone services, or privacy and advertising questions, please use the details below.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "section")(12, "h2");
        \u0275\u0275text(13, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p")(15, "a", 5);
        \u0275\u0275text(16, "creator@johnfabiomb.com");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "section")(18, "h2");
        \u0275\u0275text(19, "Phone");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "p");
        \u0275\u0275text(21, "+356 99381350");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "section")(23, "h2");
        \u0275\u0275text(24, "Social");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p")(26, "a", 6);
        \u0275\u0275text(27, "@johnfabiomb on Instagram");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "section")(29, "h2");
        \u0275\u0275text(30, "Response time");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "p");
        \u0275\u0275text(32, "I typically respond within 2\u20133 business days. For privacy or cookie-related requests, please mention it in the subject line so I can prioritise accordingly.");
        \u0275\u0275elementEnd()()()();
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.legal-page[_ngcontent-%COMP%] {\n  padding: 24px;\n  min-height: 100vh;\n}\n.legal-inner[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  color: #111827;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: #111827;\n  text-decoration: none;\n  margin-bottom: 20px;\n  font-weight: 600;\n}\n.legal-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-bottom: 12px;\n}\n.legal-updated[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin-bottom: 30px;\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  font-size: 1.1rem;\n}\np[_ngcontent-%COMP%], \nli[_ngcontent-%COMP%] {\n  line-height: 1.8;\n  margin-bottom: 12px;\n}\na[_ngcontent-%COMP%] {\n  color: #F4A922;\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=contact.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContactComponent, { className: "ContactComponent", filePath: "src/app/platform/contact/contact.component.ts", lineNumber: 13 });
})();
export {
  ContactComponent
};
//# sourceMappingURL=chunk-67WLHGHY.js.map
