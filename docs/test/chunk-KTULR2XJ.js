import {
  SeoService
} from "./chunk-GMGNEI7O.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-ZPEFIUFS.js";
import "./chunk-ADG4HADG.js";
import {
  CommonModule,
  inject,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-7275G3GP.js";
import "./chunk-TWWAJFRB.js";

// src/app/pages/about/about.component.ts
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AboutComponent, selectors: [["app-about"]], decls: 55, vars: 0, consts: [[1, "legal-page"], [1, "legal-inner"], ["routerLink", "/malta", 1, "back-link"], [1, "legal-title"], [1, "legal-updated"], ["routerLink", "/privacy"], ["href", "mailto:creator@johnfabiomb.com"], ["routerLink", "/contact"]], template: function AboutComponent_Template(rf, ctx) {
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
        \u0275\u0275text(10, "Explore Malta is an original travel resource for Malta and Gozo. It was built to help visitors discover hidden caves, coastal viewpoints, valley trails and off-the-beaten-path locations \u2014 with carefully researched content, an interactive map, and a community of explorers who go there together.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "The site is owned and maintained by John Monta\xF1o, who produces and owns the source code, images, and location research published here.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "section")(14, "h2");
        \u0275\u0275text(15, "What you will find here");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "ul")(17, "li");
        \u0275\u0275text(18, "More than 70 unique Malta and Gozo locations \u2014 sea caves, cliff trails, hidden bays, historical sites, and valleys most tourists never find.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "li");
        \u0275\u0275text(20, "Original guides, photos and GPS route suggestions for each spot.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "li");
        \u0275\u0275text(22, "Partner deals \u2014 real discounts from local businesses I've personally connected with, including water sports, boat tours, hotels and experiences.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "li");
        \u0275\u0275text(24, "Explore Together \u2014 join or create small hiking groups so you never have to explore alone.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "li");
        \u0275\u0275text(26, "Fast, mobile-friendly navigation and map tools \u2014 works offline once loaded.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "li");
        \u0275\u0275text(28, "Privacy and cookie policies for visitor transparency.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(29, "section")(30, "h2");
        \u0275\u0275text(31, "Why this site exists");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p");
        \u0275\u0275text(33, "This site was created to share real travel inspiration and local exploration tips. It provides useful, authentic content for people who want to explore Malta's natural and cultural highlights \u2014 not just the tourist trail. The partner deals featured here are businesses I trust and have visited personally.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "section")(35, "h2");
        \u0275\u0275text(36, "Advertising");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "p");
        \u0275\u0275text(38, "Explore Malta uses Google AdSense to display advertisements. These help cover the costs of running the site. For EEA visitors, ads are only served after you give your consent via the cookie banner. You can review how data is used in the ");
        \u0275\u0275elementStart(39, "a", 5);
        \u0275\u0275text(40, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(41, " and manage your preferences at any time.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "section")(43, "h2");
        \u0275\u0275text(44, "Contact");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "p");
        \u0275\u0275text(46, "For questions, corrections, partnership requests, or privacy matters, reach out directly:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "p")(48, "a", 6);
        \u0275\u0275text(49, "creator@johnfabiomb.com");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(50, "p");
        \u0275\u0275text(51, "Or visit the ");
        \u0275\u0275elementStart(52, "a", 7);
        \u0275\u0275text(53, "Contact page");
        \u0275\u0275elementEnd();
        \u0275\u0275text(54, " for more details.");
        \u0275\u0275elementEnd()()()();
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.legal-page[_ngcontent-%COMP%] {\n  padding: 24px;\n  min-height: 100vh;\n}\n.legal-inner[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  color: var(--color-text-base);\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: var(--color-text-base);\n  text-decoration: none;\n  margin-bottom: 20px;\n  font-weight: 600;\n}\n.legal-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-bottom: 12px;\n}\n.legal-updated[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  margin-bottom: 30px;\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  font-size: 1.1rem;\n}\nul[_ngcontent-%COMP%] {\n  padding-left: 20px;\n  list-style-type: disc;\n}\np[_ngcontent-%COMP%], \nli[_ngcontent-%COMP%] {\n  line-height: 1.8;\n  margin-bottom: 12px;\n}\na[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=about.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AboutComponent, { className: "AboutComponent", filePath: "src/app/pages/about/about.component.ts", lineNumber: 13 });
})();
export {
  AboutComponent
};
//# sourceMappingURL=chunk-KTULR2XJ.js.map
