import {
  SeoService
} from "./chunk-XBIMPO5F.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-WZUM6HQY.js";
import {
  CommonModule
} from "./chunk-FPOQEQN6.js";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-K5PYHWDH.js";

// src/app/platform/cookies/cookies.component.ts
var CookiesComponent = class _CookiesComponent {
  constructor() {
    this.lastUpdated = "May 2026";
    this.seo = inject(SeoService);
  }
  ngOnInit() {
    this.seo.setPage("cookies");
  }
  static {
    this.\u0275fac = function CookiesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CookiesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CookiesComponent, selectors: [["app-cookies"]], decls: 167, vars: 1, consts: [[1, "legal-page"], [1, "legal-inner"], ["routerLink", "/malta", 1, "back-link"], [1, "legal-title"], [1, "legal-updated"], [1, "cookie-table"], ["href", "https://support.google.com/chrome/answer/95647", "target", "_blank", "rel", "noopener"], ["href", "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer", "target", "_blank", "rel", "noopener"], ["href", "https://support.apple.com/guide/safari/manage-cookies-sfri11471", "target", "_blank", "rel", "noopener"], ["href", "https://www.google.com/settings/ads", "target", "_blank", "rel", "noopener"], ["href", "https://www.youronlinechoices.eu", "target", "_blank", "rel", "noopener"], ["href", "https://www.aboutads.info/choices", "target", "_blank", "rel", "noopener"], ["routerLink", "/privacy"], ["href", "mailto:creator@johnfabiomb.com"]], template: function CookiesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
        \u0275\u0275text(3, "\u2190 Back to map");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "Cookie Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "section")(9, "h2");
        \u0275\u0275text(10, "What Are Cookies?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit and can improve your experience on return visits.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "section")(14, "h2");
        \u0275\u0275text(15, "Cookies We Use");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "h3");
        \u0275\u0275text(17, "Essential Cookies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "p");
        \u0275\u0275text(19, "These cookies are necessary for the site to function and cannot be disabled.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "table", 5)(21, "thead")(22, "tr")(23, "th");
        \u0275\u0275text(24, "Cookie");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "th");
        \u0275\u0275text(26, "Purpose");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "th");
        \u0275\u0275text(28, "Duration");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(29, "tbody")(30, "tr")(31, "td");
        \u0275\u0275text(32, "Angular session");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "td");
        \u0275\u0275text(34, "Maintains basic site functionality and state");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "td");
        \u0275\u0275text(36, "Session");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(37, "h3");
        \u0275\u0275text(38, "Analytics Cookies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "p");
        \u0275\u0275text(40, "These cookies help us understand how visitors interact with the site. All data is anonymised.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "table", 5)(42, "thead")(43, "tr")(44, "th");
        \u0275\u0275text(45, "Cookie");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "th");
        \u0275\u0275text(47, "Purpose");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "th");
        \u0275\u0275text(49, "Duration");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(50, "tbody")(51, "tr")(52, "td");
        \u0275\u0275text(53, "_ga");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "td");
        \u0275\u0275text(55, "Google Analytics \u2014 distinguishes users");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "td");
        \u0275\u0275text(57, "2 years");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "tr")(59, "td");
        \u0275\u0275text(60, "_ga_*");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "td");
        \u0275\u0275text(62, "Google Analytics \u2014 session state");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "td");
        \u0275\u0275text(64, "2 years");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(65, "tr")(66, "td");
        \u0275\u0275text(67, "_gid");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "td");
        \u0275\u0275text(69, "Google Analytics \u2014 distinguishes users (short-term)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "td");
        \u0275\u0275text(71, "24 hours");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(72, "h3");
        \u0275\u0275text(73, "Advertising Cookies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "p");
        \u0275\u0275text(75, "These cookies are set by Google AdSense to serve relevant advertisements. For EEA visitors, these are only placed after you give consent via our consent banner.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(76, "table", 5)(77, "thead")(78, "tr")(79, "th");
        \u0275\u0275text(80, "Cookie");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "th");
        \u0275\u0275text(82, "Purpose");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "th");
        \u0275\u0275text(84, "Duration");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(85, "tbody")(86, "tr")(87, "td");
        \u0275\u0275text(88, "IDE");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(89, "td");
        \u0275\u0275text(90, "Google DoubleClick \u2014 ad personalisation");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(91, "td");
        \u0275\u0275text(92, "13 months");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(93, "tr")(94, "td");
        \u0275\u0275text(95, "test_cookie");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(96, "td");
        \u0275\u0275text(97, "Checks if cookies are supported");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(98, "td");
        \u0275\u0275text(99, "Session");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(100, "tr")(101, "td");
        \u0275\u0275text(102, "ANID");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(103, "td");
        \u0275\u0275text(104, "Google \u2014 ad personalisation");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(105, "td");
        \u0275\u0275text(106, "13 months");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(107, "tr")(108, "td");
        \u0275\u0275text(109, "NID");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(110, "td");
        \u0275\u0275text(111, "Google \u2014 stores preferences for ads");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "td");
        \u0275\u0275text(113, "6 months");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(114, "section")(115, "h2");
        \u0275\u0275text(116, "Managing Your Cookies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(117, "p");
        \u0275\u0275text(118, "You can control and manage cookies in several ways:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(119, "ul")(120, "li")(121, "strong");
        \u0275\u0275text(122, "Consent banner");
        \u0275\u0275elementEnd();
        \u0275\u0275text(123, " \u2014 When you first visit the site, you can accept or decline non-essential cookies via our consent banner.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(124, "li")(125, "strong");
        \u0275\u0275text(126, "Browser settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(127, " \u2014 Most browsers allow you to refuse or delete cookies. Refer to your browser's help documentation: ");
        \u0275\u0275elementStart(128, "a", 6);
        \u0275\u0275text(129, "Chrome");
        \u0275\u0275elementEnd();
        \u0275\u0275text(130, ", ");
        \u0275\u0275elementStart(131, "a", 7);
        \u0275\u0275text(132, "Firefox");
        \u0275\u0275elementEnd();
        \u0275\u0275text(133, ", ");
        \u0275\u0275elementStart(134, "a", 8);
        \u0275\u0275text(135, "Safari");
        \u0275\u0275elementEnd();
        \u0275\u0275text(136, ". ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(137, "li")(138, "strong");
        \u0275\u0275text(139, "Google Ads opt-out");
        \u0275\u0275elementEnd();
        \u0275\u0275text(140, " \u2014 Opt out of personalised ads at ");
        \u0275\u0275elementStart(141, "a", 9);
        \u0275\u0275text(142, "google.com/settings/ads");
        \u0275\u0275elementEnd();
        \u0275\u0275text(143, ".");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(144, "li")(145, "strong");
        \u0275\u0275text(146, "Industry opt-out");
        \u0275\u0275elementEnd();
        \u0275\u0275text(147, " \u2014 ");
        \u0275\u0275elementStart(148, "a", 10);
        \u0275\u0275text(149, "youronlinechoices.eu");
        \u0275\u0275elementEnd();
        \u0275\u0275text(150, " (EU) or ");
        \u0275\u0275elementStart(151, "a", 11);
        \u0275\u0275text(152, "aboutads.info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(153, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(154, "p");
        \u0275\u0275text(155, "Note: disabling certain cookies may affect the functionality of the site.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(156, "section")(157, "h2");
        \u0275\u0275text(158, "More Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(159, "p");
        \u0275\u0275text(160, "For more details on how we handle your personal data, see our ");
        \u0275\u0275elementStart(161, "a", 12);
        \u0275\u0275text(162, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(163, ". For questions, contact ");
        \u0275\u0275elementStart(164, "a", 13);
        \u0275\u0275text(165, "johnfabiomb@gmail.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(166, ".");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("Last updated: ", ctx.lastUpdated, "");
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.legal-page[_ngcontent-%COMP%] {\n  padding: 24px;\n  min-height: 100vh;\n  background: #fff;\n}\n.legal-inner[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  color: #111827;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: #111827;\n  text-decoration: none;\n  margin-bottom: 20px;\n  font-weight: 600;\n}\n.legal-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-bottom: 12px;\n}\n.legal-updated[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin-bottom: 30px;\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  font-size: 1.1rem;\n}\na[_ngcontent-%COMP%] {\n  color: #F4A922;\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=cookies.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CookiesComponent, { className: "CookiesComponent", filePath: "src/app/platform/cookies/cookies.component.ts", lineNumber: 13 });
})();
export {
  CookiesComponent
};
//# sourceMappingURL=chunk-22GB4ZEA.js.map
