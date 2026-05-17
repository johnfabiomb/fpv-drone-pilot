import {
  SeoService
} from "./chunk-3T5F7SK7.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-GZJOKFRP.js";
import {
  CommonModule
} from "./chunk-AVMQEWGR.js";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-PGBPO7BH.js";

// src/app/platform/privacy/privacy.component.ts
var PrivacyComponent = class _PrivacyComponent {
  constructor() {
    this.lastUpdated = "May 2026";
    this.seo = inject(SeoService);
  }
  ngOnInit() {
    this.seo.setPage("privacy");
  }
  static {
    this.\u0275fac = function PrivacyComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PrivacyComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PrivacyComponent, selectors: [["app-privacy"]], decls: 155, vars: 1, consts: [[1, "legal-page"], [1, "legal-inner"], ["routerLink", "/malta", 1, "back-link"], [1, "legal-title"], [1, "legal-updated"], ["href", "mailto:creator@johnfabiomb.com"], ["routerLink", "/cookies"], ["href", "https://policies.google.com/privacy", "target", "_blank", "rel", "noopener"], ["href", "https://www.google.com/settings/ads", "target", "_blank", "rel", "noopener"], ["href", "https://www.aboutads.info", "target", "_blank", "rel", "noopener"], ["href", "https://stripe.com/privacy", "target", "_blank", "rel", "noopener"], ["href", "https://idpc.org.mt", "target", "_blank", "rel", "noopener"]], template: function PrivacyComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
        \u0275\u0275text(3, "\u2190 Back to map");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "section")(9, "h2");
        \u0275\u0275text(10, "1. Who We Are");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "This website is operated by John Monta\xF1o (");
        \u0275\u0275elementStart(13, "strong");
        \u0275\u0275text(14, "johnfabiomb.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, "), an explorer and content creator based in Malta. You can contact us at ");
        \u0275\u0275elementStart(16, "a", 5);
        \u0275\u0275text(17, "johnfabiomb@gmail.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(18, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "section")(20, "h2");
        \u0275\u0275text(21, "2. Information We Collect");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "p");
        \u0275\u0275text(23, "We collect the following types of information:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "ul")(25, "li")(26, "strong");
        \u0275\u0275text(27, "Usage data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " \u2014 pages visited, time on site, browser type, and device information, collected automatically via Google Analytics.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "li")(30, "strong");
        \u0275\u0275text(31, "Location data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(32, " \u2014 only if you explicitly grant permission through your browser. This is used solely to show your position on the map and find nearby spots. It is never stored or transmitted to our servers.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "li")(34, "strong");
        \u0275\u0275text(35, "Cookies and tracking data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(36, " \u2014 see our ");
        \u0275\u0275elementStart(37, "a", 6);
        \u0275\u0275text(38, "Cookie Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(39, " for full details.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(40, "section")(41, "h2");
        \u0275\u0275text(42, "3. How We Use Your Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "ul")(44, "li");
        \u0275\u0275text(45, "To operate and improve the interactive map and location guides.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "li");
        \u0275\u0275text(47, "To understand how visitors use the site (Google Analytics).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "li");
        \u0275\u0275text(49, "To serve relevant advertisements (Google AdSense).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "li");
        \u0275\u0275text(51, "To comply with legal obligations.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(52, "section")(53, "h2");
        \u0275\u0275text(54, "4. Google Analytics");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "p");
        \u0275\u0275text(56, "We use Google Analytics to collect anonymised data about site usage. Google Analytics uses cookies to measure visitor behaviour. Data collected is processed by Google Inc. and may be transferred to servers in the United States. We have enabled IP anonymisation. For more information, see ");
        \u0275\u0275elementStart(57, "a", 7);
        \u0275\u0275text(58, "Google's Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(59, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(60, "section")(61, "h2");
        \u0275\u0275text(62, "5. Google AdSense and Advertising");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "p");
        \u0275\u0275text(64, "We use Google AdSense to display advertisements on this site. Google and its partners may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising by visiting ");
        \u0275\u0275elementStart(65, "a", 8);
        \u0275\u0275text(66, "Google Ads Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(67, " or ");
        \u0275\u0275elementStart(68, "a", 9);
        \u0275\u0275text(69, "aboutads.info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(70, ".");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "p");
        \u0275\u0275text(72, "For EEA visitors, we use Google's Funding Choices consent management platform to obtain your consent before serving personalised ads.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(73, "section")(74, "h2");
        \u0275\u0275text(75, "6. Payments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(76, "p");
        \u0275\u0275text(77, "Payment processing is handled entirely by Stripe. We do not collect, store, or process any payment card data. Please review ");
        \u0275\u0275elementStart(78, "a", 10);
        \u0275\u0275text(79, "Stripe's Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(80, " for details.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(81, "section")(82, "h2");
        \u0275\u0275text(83, "7. Data Sharing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(84, "p");
        \u0275\u0275text(85, "We do not sell or rent your personal data. We share data only with the following service providers where necessary to operate the site:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "ul")(87, "li");
        \u0275\u0275text(88, "Google LLC (Analytics, AdSense, Fonts, Maps)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(89, "li");
        \u0275\u0275text(90, "Stripe Inc. (Payment processing)");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(91, "section")(92, "h2");
        \u0275\u0275text(93, "8. Data Retention");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(94, "p");
        \u0275\u0275text(95, "Analytics data is retained for 26 months as configured in Google Analytics. We do not store personal data on our own servers.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(96, "section")(97, "h2");
        \u0275\u0275text(98, "9. Your Rights (GDPR)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(99, "p");
        \u0275\u0275text(100, "If you are located in the European Economic Area, you have the following rights regarding your personal data:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(101, "ul")(102, "li")(103, "strong");
        \u0275\u0275text(104, "Right of access");
        \u0275\u0275elementEnd();
        \u0275\u0275text(105, " \u2014 request a copy of the data we hold about you.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(106, "li")(107, "strong");
        \u0275\u0275text(108, "Right to rectification");
        \u0275\u0275elementEnd();
        \u0275\u0275text(109, " \u2014 request correction of inaccurate data.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(110, "li")(111, "strong");
        \u0275\u0275text(112, "Right to erasure");
        \u0275\u0275elementEnd();
        \u0275\u0275text(113, " \u2014 request deletion of your data where there is no legitimate reason to continue processing it.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(114, "li")(115, "strong");
        \u0275\u0275text(116, "Right to restrict processing");
        \u0275\u0275elementEnd();
        \u0275\u0275text(117, " \u2014 request that we limit how we use your data.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(118, "li")(119, "strong");
        \u0275\u0275text(120, "Right to data portability");
        \u0275\u0275elementEnd();
        \u0275\u0275text(121, " \u2014 receive your data in a structured, machine-readable format.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(122, "li")(123, "strong");
        \u0275\u0275text(124, "Right to object");
        \u0275\u0275elementEnd();
        \u0275\u0275text(125, " \u2014 object to processing based on legitimate interests or for direct marketing.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "li")(127, "strong");
        \u0275\u0275text(128, "Right to withdraw consent");
        \u0275\u0275elementEnd();
        \u0275\u0275text(129, " \u2014 where processing is based on consent, you may withdraw it at any time.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(130, "p");
        \u0275\u0275text(131, "To exercise any of these rights, contact us at ");
        \u0275\u0275elementStart(132, "a", 5);
        \u0275\u0275text(133, "johnfabiomb@gmail.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(134, ". You also have the right to lodge a complaint with the ");
        \u0275\u0275elementStart(135, "a", 11);
        \u0275\u0275text(136, "Information and Data Protection Commissioner (Malta)");
        \u0275\u0275elementEnd();
        \u0275\u0275text(137, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(138, "section")(139, "h2");
        \u0275\u0275text(140, "10. Children's Privacy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(141, "p");
        \u0275\u0275text(142, "This site is not directed at children under the age of 13. We do not knowingly collect personal data from children.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(143, "section")(144, "h2");
        \u0275\u0275text(145, "11. Changes to This Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(146, "p");
        \u0275\u0275text(147, "We may update this policy from time to time. The date at the top of this page reflects the latest revision. Continued use of the site after changes constitutes acceptance of the updated policy.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(148, "section")(149, "h2");
        \u0275\u0275text(150, "12. Contact");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(151, "p");
        \u0275\u0275text(152, "For any privacy-related questions, contact: ");
        \u0275\u0275elementStart(153, "a", 5);
        \u0275\u0275text(154, "johnfabiomb@gmail.com");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("Last updated: ", ctx.lastUpdated, "");
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.legal-page[_ngcontent-%COMP%] {\n  padding: 24px;\n  min-height: 100vh;\n  background: #fff;\n}\n.legal-inner[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  color: #111827;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: #111827;\n  text-decoration: none;\n  margin-bottom: 20px;\n  font-weight: 600;\n}\n.legal-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-bottom: 12px;\n}\n.legal-updated[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin-bottom: 30px;\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  font-size: 1.1rem;\n}\na[_ngcontent-%COMP%] {\n  color: #F4A922;\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=privacy.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PrivacyComponent, { className: "PrivacyComponent", filePath: "src/app/platform/privacy/privacy.component.ts", lineNumber: 13 });
})();
export {
  PrivacyComponent
};
//# sourceMappingURL=chunk-NSAE66XJ.js.map
