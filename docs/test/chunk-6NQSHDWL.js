import {
  SeoService
} from "./chunk-NO2KK3DI.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-GBUZQIWY.js";
import "./chunk-2O5DCFN6.js";
import {
  CommonModule,
  inject,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-DMXQYC6T.js";

// src/app/platform/about/about.component.ts
var AboutComponent = class _AboutComponent {
  constructor() {
    this.seo = inject(SeoService);
  }
  ngOnInit() {
    this.seo.setPage("about");
  }
  static {
    this.\u0275fac = function AboutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AboutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AboutComponent, selectors: [["app-about"]], decls: 51, vars: 0, consts: [[1, "legal-page"], [1, "legal-inner"], ["routerLink", "/malta", 1, "back-link"], [1, "legal-title"], [1, "legal-updated"], ["routerLink", "/privacy"], ["href", "mailto:creator@johnfabiomb.com"], ["routerLink", "/contact"]], template: function AboutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
        \u0275\u0275text(3, "\u2190 Back to map");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "About Explore Malta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Created by explorer and content creator John Monta\xF1o.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "section")(9, "p");
        \u0275\u0275text(10, "Explore Malta is an original travel resource for Malta and Gozo. It was built to help visitors discover hidden caves, coastal viewpoints, valley trails and off-the-beaten-path locations with carefully curated content and an interactive map.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "The site is owned and maintained by John Monta\xF1o, who produces and owns the source code, images, and location research published here.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "section")(14, "h2");
        \u0275\u0275text(15, "What you will find here");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "ul")(17, "li");
        \u0275\u0275text(18, "More than 60 unique Malta and Gozo locations.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "li");
        \u0275\u0275text(20, "Original guides, photos and route suggestions.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "li");
        \u0275\u0275text(22, "Fast mobile-friendly navigation and map tools.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "li");
        \u0275\u0275text(24, "Privacy and cookie policies for visitor transparency.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "section")(26, "h2");
        \u0275\u0275text(27, "Why this site exists");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "p");
        \u0275\u0275text(29, "This site was created to share real travel inspiration and local exploration tips. It provides useful, authentic content for people who want to explore Malta's natural and cultural highlights \u2014 not just the tourist trail.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "section")(31, "h2");
        \u0275\u0275text(32, "Advertising");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "p");
        \u0275\u0275text(34, "Explore Malta uses Google AdSense to display advertisements. These help cover the costs of running the site. For EEA visitors, ads are only served after you give your consent via the cookie banner. You can review how data is used in the ");
        \u0275\u0275elementStart(35, "a", 5);
        \u0275\u0275text(36, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(37, " and manage your preferences at any time.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "section")(39, "h2");
        \u0275\u0275text(40, "Contact");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "p");
        \u0275\u0275text(42, "For questions, corrections, partnership requests, or privacy matters, reach out directly:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "p")(44, "a", 6);
        \u0275\u0275text(45, "creator@johnfabiomb.com");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "p");
        \u0275\u0275text(47, "Or visit the ");
        \u0275\u0275elementStart(48, "a", 7);
        \u0275\u0275text(49, "Contact page");
        \u0275\u0275elementEnd();
        \u0275\u0275text(50, " for more details.");
        \u0275\u0275elementEnd()()()();
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.legal-page[_ngcontent-%COMP%] {\n  padding: 24px;\n  min-height: 100vh;\n}\n.legal-inner[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  color: #111827;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: #111827;\n  text-decoration: none;\n  margin-bottom: 20px;\n  font-weight: 600;\n}\n.legal-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-bottom: 12px;\n}\n.legal-updated[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin-bottom: 30px;\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  font-size: 1.1rem;\n}\nul[_ngcontent-%COMP%] {\n  padding-left: 20px;\n  list-style-type: disc;\n}\np[_ngcontent-%COMP%], \nli[_ngcontent-%COMP%] {\n  line-height: 1.8;\n  margin-bottom: 12px;\n}\na[_ngcontent-%COMP%] {\n  color: #F4A922;\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=about.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AboutComponent, { className: "AboutComponent", filePath: "src/app/platform/about/about.component.ts", lineNumber: 13 });
})();
export {
  AboutComponent
};
//# sourceMappingURL=chunk-6NQSHDWL.js.map
