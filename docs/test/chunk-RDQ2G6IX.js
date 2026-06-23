import {
  SeoService
} from "./chunk-MHTJLQEP.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-E53NQKQB.js";
import "./chunk-DNKJKTBS.js";
import {
  CommonModule,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-P56CFEJA.js";
import "./chunk-TWWAJFRB.js";

// src/app/map/pages/cookies/cookies.component.ts
var CookiesComponent = class _CookiesComponent {
  constructor() {
    this.lastUpdated = "June 2026";
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CookiesComponent, selectors: [["app-cookies"]], decls: 184, vars: 1, consts: [[1, "legal-page"], [1, "legal-inner"], ["routerLink", "/malta", 1, "back-link"], [1, "legal-title"], [1, "legal-updated"], [1, "cookie-table"], ["href", "https://support.google.com/chrome/answer/95647", "target", "_blank", "rel", "noopener"], ["href", "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer", "target", "_blank", "rel", "noopener"], ["href", "https://support.apple.com/guide/safari/manage-cookies-sfri11471", "target", "_blank", "rel", "noopener"], ["href", "https://www.google.com/settings/ads", "target", "_blank", "rel", "noopener"], ["href", "https://www.youronlinechoices.eu", "target", "_blank", "rel", "noopener"], ["href", "https://www.aboutads.info/choices", "target", "_blank", "rel", "noopener"], ["routerLink", "/privacy"], ["href", "mailto:creator@johnfabiomb.com"]], template: function CookiesComponent_Template(rf, ctx) {
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
        \u0275\u0275text(12, "Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit and can improve your experience on return visits. Some features also use browser ");
        \u0275\u0275elementStart(13, "strong");
        \u0275\u0275text(14, "localStorage");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, ", which works similarly but stores data locally on your device without an expiry date unless cleared manually.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "section")(17, "h2");
        \u0275\u0275text(18, "Cookies We Use");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "h3");
        \u0275\u0275text(20, "Essential Cookies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "p");
        \u0275\u0275text(22, "These cookies and storage entries are necessary for the site to function and cannot be disabled.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "table", 5)(24, "thead")(25, "tr")(26, "th");
        \u0275\u0275text(27, "Cookie / Storage key");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "th");
        \u0275\u0275text(29, "Purpose");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "th");
        \u0275\u0275text(31, "Duration");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(32, "tbody")(33, "tr")(34, "td");
        \u0275\u0275text(35, "Angular session");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "td");
        \u0275\u0275text(37, "Maintains basic site functionality and state");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "td");
        \u0275\u0275text(39, "Session");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "tr")(41, "td");
        \u0275\u0275text(42, "sb-[ref]-auth-token (localStorage)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "td");
        \u0275\u0275text(44, "Supabase \u2014 stores your signed-in session so you stay logged in across page reloads. Set only after you sign in.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "td");
        \u0275\u0275text(46, "Until sign-out or manual clear");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(47, "tr")(48, "td");
        \u0275\u0275text(49, "vm_welcome_shown (localStorage)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "td");
        \u0275\u0275text(51, "Remembers whether you have dismissed the welcome popup so it is not shown again");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "td");
        \u0275\u0275text(53, "Until manual clear");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(54, "h3");
        \u0275\u0275text(55, "Analytics Cookies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "p");
        \u0275\u0275text(57, "These cookies help us understand how visitors interact with the site. All data is anonymised.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "table", 5)(59, "thead")(60, "tr")(61, "th");
        \u0275\u0275text(62, "Cookie");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "th");
        \u0275\u0275text(64, "Purpose");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "th");
        \u0275\u0275text(66, "Duration");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(67, "tbody")(68, "tr")(69, "td");
        \u0275\u0275text(70, "_ga");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "td");
        \u0275\u0275text(72, "Google Analytics \u2014 distinguishes users");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "td");
        \u0275\u0275text(74, "2 years");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(75, "tr")(76, "td");
        \u0275\u0275text(77, "_ga_*");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "td");
        \u0275\u0275text(79, "Google Analytics \u2014 session state");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "td");
        \u0275\u0275text(81, "2 years");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(82, "tr")(83, "td");
        \u0275\u0275text(84, "_gid");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "td");
        \u0275\u0275text(86, "Google Analytics \u2014 distinguishes users (short-term)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(87, "td");
        \u0275\u0275text(88, "24 hours");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(89, "h3");
        \u0275\u0275text(90, "Advertising Cookies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(91, "p");
        \u0275\u0275text(92, "These cookies are set by Google AdSense to serve relevant advertisements. For EEA visitors, these are only placed after you give consent via our consent banner.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(93, "table", 5)(94, "thead")(95, "tr")(96, "th");
        \u0275\u0275text(97, "Cookie");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(98, "th");
        \u0275\u0275text(99, "Purpose");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(100, "th");
        \u0275\u0275text(101, "Duration");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(102, "tbody")(103, "tr")(104, "td");
        \u0275\u0275text(105, "IDE");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(106, "td");
        \u0275\u0275text(107, "Google DoubleClick \u2014 ad personalisation");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(108, "td");
        \u0275\u0275text(109, "13 months");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(110, "tr")(111, "td");
        \u0275\u0275text(112, "test_cookie");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(113, "td");
        \u0275\u0275text(114, "Checks if cookies are supported");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(115, "td");
        \u0275\u0275text(116, "Session");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(117, "tr")(118, "td");
        \u0275\u0275text(119, "ANID");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(120, "td");
        \u0275\u0275text(121, "Google \u2014 ad personalisation");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(122, "td");
        \u0275\u0275text(123, "13 months");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(124, "tr")(125, "td");
        \u0275\u0275text(126, "NID");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(127, "td");
        \u0275\u0275text(128, "Google \u2014 stores preferences for ads");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(129, "td");
        \u0275\u0275text(130, "6 months");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(131, "section")(132, "h2");
        \u0275\u0275text(133, "Managing Your Cookies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(134, "p");
        \u0275\u0275text(135, "You can control and manage cookies in several ways:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(136, "ul")(137, "li")(138, "strong");
        \u0275\u0275text(139, "Consent banner");
        \u0275\u0275elementEnd();
        \u0275\u0275text(140, " \u2014 When you first visit the site, you can accept or decline non-essential cookies via our consent banner.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(141, "li")(142, "strong");
        \u0275\u0275text(143, "Browser settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(144, " \u2014 Most browsers allow you to refuse or delete cookies and clear localStorage. Refer to your browser's help documentation: ");
        \u0275\u0275elementStart(145, "a", 6);
        \u0275\u0275text(146, "Chrome");
        \u0275\u0275elementEnd();
        \u0275\u0275text(147, ", ");
        \u0275\u0275elementStart(148, "a", 7);
        \u0275\u0275text(149, "Firefox");
        \u0275\u0275elementEnd();
        \u0275\u0275text(150, ", ");
        \u0275\u0275elementStart(151, "a", 8);
        \u0275\u0275text(152, "Safari");
        \u0275\u0275elementEnd();
        \u0275\u0275text(153, ". ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(154, "li")(155, "strong");
        \u0275\u0275text(156, "Google Ads opt-out");
        \u0275\u0275elementEnd();
        \u0275\u0275text(157, " \u2014 Opt out of personalised ads at ");
        \u0275\u0275elementStart(158, "a", 9);
        \u0275\u0275text(159, "google.com/settings/ads");
        \u0275\u0275elementEnd();
        \u0275\u0275text(160, ".");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(161, "li")(162, "strong");
        \u0275\u0275text(163, "Industry opt-out");
        \u0275\u0275elementEnd();
        \u0275\u0275text(164, " \u2014 ");
        \u0275\u0275elementStart(165, "a", 10);
        \u0275\u0275text(166, "youronlinechoices.eu");
        \u0275\u0275elementEnd();
        \u0275\u0275text(167, " (EU) or ");
        \u0275\u0275elementStart(168, "a", 11);
        \u0275\u0275text(169, "aboutads.info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(170, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(171, "p");
        \u0275\u0275text(172, "Note: clearing essential cookies or localStorage will sign you out and remove your local preferences. Disabling analytics or advertising cookies may affect ad relevance but will not affect the core functionality of the site.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(173, "section")(174, "h2");
        \u0275\u0275text(175, "More Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(176, "p");
        \u0275\u0275text(177, "For more details on how we handle your personal data, see our ");
        \u0275\u0275elementStart(178, "a", 12);
        \u0275\u0275text(179, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(180, ". For questions, contact ");
        \u0275\u0275elementStart(181, "a", 13);
        \u0275\u0275text(182, "creator@johnfabiomb.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(183, ".");
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CookiesComponent, { className: "CookiesComponent", filePath: "src/app/map/pages/cookies/cookies.component.ts", lineNumber: 13 });
})();
export {
  CookiesComponent
};
//# sourceMappingURL=chunk-RDQ2G6IX.js.map
