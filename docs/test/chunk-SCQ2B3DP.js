import {
  SeoService
} from "./chunk-SE2YQ4NB.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-U3AVTKB7.js";
import "./chunk-UJ3FFGCN.js";
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
} from "./chunk-QFIZ3IRG.js";

// src/app/platform/privacy/privacy.component.ts
var PrivacyComponent = class _PrivacyComponent {
  constructor() {
    this.lastUpdated = "May 2026 (revised)";
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PrivacyComponent, selectors: [["app-privacy"]], decls: 216, vars: 1, consts: [[1, "legal-page"], [1, "legal-inner"], ["routerLink", "/malta", 1, "back-link"], [1, "legal-title"], [1, "legal-updated"], ["href", "mailto:johnfabiomb@gmail.com"], ["routerLink", "/cookies"], ["href", "https://policies.google.com/privacy", "target", "_blank", "rel", "noopener"], ["href", "https://www.google.com/settings/ads", "target", "_blank", "rel", "noopener"], ["href", "https://www.aboutads.info", "target", "_blank", "rel", "noopener"], ["href", "https://stripe.com/privacy", "target", "_blank", "rel", "noopener"], ["href", "https://idpc.org.mt", "target", "_blank", "rel", "noopener"]], template: function PrivacyComponent_Template(rf, ctx) {
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
        \u0275\u0275text(27, "Account data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " \u2014 when you sign in with Google, we receive your name, email address, and profile photo URL from Google. We store this to personalise your experience.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "li")(30, "strong");
        \u0275\u0275text(31, "Saved places");
        \u0275\u0275elementEnd();
        \u0275\u0275text(32, " \u2014 locations you bookmark are stored against your account in our database so they are available across devices and sessions.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "li")(34, "strong");
        \u0275\u0275text(35, "Usage data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(36, " \u2014 pages visited, time on site, browser type, and device information, collected automatically via Google Analytics.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "li")(38, "strong");
        \u0275\u0275text(39, "Location data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(40, " \u2014 only if you explicitly grant permission through your browser. Used solely to show your position on the map and find nearby spots. Never stored or transmitted to our servers.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "li")(42, "strong");
        \u0275\u0275text(43, "Cookies and tracking data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(44, " \u2014 see our ");
        \u0275\u0275elementStart(45, "a", 6);
        \u0275\u0275text(46, "Cookie Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(47, " for full details.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(48, "section")(49, "h2");
        \u0275\u0275text(50, "3. User Accounts and Google Sign-In");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "p");
        \u0275\u0275text(52, "We use ");
        \u0275\u0275elementStart(53, "strong");
        \u0275\u0275text(54, "Google Sign-In");
        \u0275\u0275elementEnd();
        \u0275\u0275text(55, " (via Firebase Authentication) to allow you to create an account. By signing in you authorise us to receive your basic Google profile information (name, email address, and profile photo). We do not receive your Google password.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "p");
        \u0275\u0275text(57, "Your account data is stored securely in ");
        \u0275\u0275elementStart(58, "strong");
        \u0275\u0275text(59, "Google Firestore");
        \u0275\u0275elementEnd();
        \u0275\u0275text(60, ", a cloud database provided by Google LLC. Data stored includes your display name, email address, profile photo URL, saved locations, account level, and your email notification preference (");
        \u0275\u0275elementStart(61, "em");
        \u0275\u0275text(62, "receiveUpdates");
        \u0275\u0275elementEnd();
        \u0275\u0275text(63, "). We do not store payment card details.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "p");
        \u0275\u0275text(65, "You may delete your account at any time by contacting us at ");
        \u0275\u0275elementStart(66, "a", 5);
        \u0275\u0275text(67, "johnfabiomb@gmail.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(68, ". Upon deletion we will remove your Firestore record and all associated saved data.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(69, "section")(70, "h2");
        \u0275\u0275text(71, "4. Marketing and Promotional Communications");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "p");
        \u0275\u0275text(73, "By creating an account on Venture Map, you agree to receive occasional communications from us, including:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "ul")(75, "li");
        \u0275\u0275text(76, "Exclusive deals, discounts, and offers from our partner providers in Malta and Gozo.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "li");
        \u0275\u0275text(78, 'New location announcements and editorial content (e.g. "Top 30 places" guides).');
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(79, "li");
        \u0275\u0275text(80, "Platform updates and new feature announcements.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "li");
        \u0275\u0275text(82, "Seasonal promotions and travel inspiration.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(83, "p");
        \u0275\u0275text(84, "You can opt out of marketing communications at any time by toggling off ");
        \u0275\u0275elementStart(85, "strong");
        \u0275\u0275text(86, "New spot updates");
        \u0275\u0275elementEnd();
        \u0275\u0275text(87, " in your profile settings (tap your profile picture in the footer), by clicking the unsubscribe link in any email we send, or by contacting us at ");
        \u0275\u0275elementStart(88, "a", 5);
        \u0275\u0275text(89, "johnfabiomb@gmail.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(90, ". Opting out will not affect transactional messages (e.g. account-related notifications).");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(91, "section")(92, "h2");
        \u0275\u0275text(93, "5. How We Use Your Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(94, "ul")(95, "li");
        \u0275\u0275text(96, "To provide and personalise the interactive map, location guides, and saved places features.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "li");
        \u0275\u0275text(98, "To understand how visitors use the site (Google Analytics).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(99, "li");
        \u0275\u0275text(100, "To serve relevant advertisements (Google AdSense).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(101, "li");
        \u0275\u0275text(102, "To send you promotional and editorial communications (see section 4).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(103, "li");
        \u0275\u0275text(104, "To display exclusive deals and partner offers available near your saved locations.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(105, "li");
        \u0275\u0275text(106, "To comply with legal obligations.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(107, "section")(108, "h2");
        \u0275\u0275text(109, "6. Google Analytics");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(110, "p");
        \u0275\u0275text(111, "We use Google Analytics to collect anonymised data about site usage. Google Analytics uses cookies to measure visitor behaviour. Data collected is processed by Google Inc. and may be transferred to servers in the United States. We have enabled IP anonymisation. For more information, see ");
        \u0275\u0275elementStart(112, "a", 7);
        \u0275\u0275text(113, "Google's Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(114, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(115, "section")(116, "h2");
        \u0275\u0275text(117, "7. Google AdSense and Advertising");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(118, "p");
        \u0275\u0275text(119, "We use Google AdSense to display advertisements on this site. Google and its partners may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising by visiting ");
        \u0275\u0275elementStart(120, "a", 8);
        \u0275\u0275text(121, "Google Ads Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(122, " or ");
        \u0275\u0275elementStart(123, "a", 9);
        \u0275\u0275text(124, "aboutads.info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(125, ".");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "p");
        \u0275\u0275text(127, "For EEA visitors, we use Google's Funding Choices consent management platform to obtain your consent before serving personalised ads.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(128, "section")(129, "h2");
        \u0275\u0275text(130, "8. Payments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(131, "p");
        \u0275\u0275text(132, "Payment processing is handled entirely by Stripe. We do not collect, store, or process any payment card data. Please review ");
        \u0275\u0275elementStart(133, "a", 10);
        \u0275\u0275text(134, "Stripe's Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(135, " for details.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(136, "section")(137, "h2");
        \u0275\u0275text(138, "9. Data Sharing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(139, "p");
        \u0275\u0275text(140, "We do not sell or rent your personal data. We share data only with the following service providers where necessary to operate the site:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(141, "ul")(142, "li")(143, "strong");
        \u0275\u0275text(144, "Google LLC");
        \u0275\u0275elementEnd();
        \u0275\u0275text(145, " \u2014 Analytics, AdSense, Firebase Authentication, Firestore, Fonts");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(146, "li")(147, "strong");
        \u0275\u0275text(148, "Stripe Inc.");
        \u0275\u0275elementEnd();
        \u0275\u0275text(149, " \u2014 Payment processing");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(150, "p");
        \u0275\u0275text(151, "All third parties are required to handle your data in accordance with applicable data protection law.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(152, "section")(153, "h2");
        \u0275\u0275text(154, "10. Data Retention");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(155, "p");
        \u0275\u0275text(156, "Analytics data is retained for 26 months as configured in Google Analytics. Account data stored in Firestore (name, email, saved places, level) is retained for as long as your account is active. You may request deletion at any time (see section 3). We do not store personal data on our own servers beyond what is listed above.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(157, "section")(158, "h2");
        \u0275\u0275text(159, "11. Your Rights (GDPR)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(160, "p");
        \u0275\u0275text(161, "If you are located in the European Economic Area, you have the following rights regarding your personal data:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(162, "ul")(163, "li")(164, "strong");
        \u0275\u0275text(165, "Right of access");
        \u0275\u0275elementEnd();
        \u0275\u0275text(166, " \u2014 request a copy of the data we hold about you.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(167, "li")(168, "strong");
        \u0275\u0275text(169, "Right to rectification");
        \u0275\u0275elementEnd();
        \u0275\u0275text(170, " \u2014 request correction of inaccurate data.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(171, "li")(172, "strong");
        \u0275\u0275text(173, "Right to erasure");
        \u0275\u0275elementEnd();
        \u0275\u0275text(174, " \u2014 request deletion of your data where there is no legitimate reason to continue processing it.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(175, "li")(176, "strong");
        \u0275\u0275text(177, "Right to restrict processing");
        \u0275\u0275elementEnd();
        \u0275\u0275text(178, " \u2014 request that we limit how we use your data.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(179, "li")(180, "strong");
        \u0275\u0275text(181, "Right to data portability");
        \u0275\u0275elementEnd();
        \u0275\u0275text(182, " \u2014 receive your data in a structured, machine-readable format.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(183, "li")(184, "strong");
        \u0275\u0275text(185, "Right to object");
        \u0275\u0275elementEnd();
        \u0275\u0275text(186, " \u2014 object to processing based on legitimate interests or for direct marketing.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(187, "li")(188, "strong");
        \u0275\u0275text(189, "Right to withdraw consent");
        \u0275\u0275elementEnd();
        \u0275\u0275text(190, " \u2014 where processing is based on consent (including marketing communications), you may withdraw it at any time without affecting prior processing.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(191, "p");
        \u0275\u0275text(192, "To exercise any of these rights, contact us at ");
        \u0275\u0275elementStart(193, "a", 5);
        \u0275\u0275text(194, "johnfabiomb@gmail.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(195, ". You also have the right to lodge a complaint with the ");
        \u0275\u0275elementStart(196, "a", 11);
        \u0275\u0275text(197, "Information and Data Protection Commissioner (Malta)");
        \u0275\u0275elementEnd();
        \u0275\u0275text(198, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(199, "section")(200, "h2");
        \u0275\u0275text(201, "12. Children's Privacy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(202, "p");
        \u0275\u0275text(203, "This site is not directed at children under the age of 13. We do not knowingly collect personal data from children.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(204, "section")(205, "h2");
        \u0275\u0275text(206, "13. Changes to This Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(207, "p");
        \u0275\u0275text(208, "We may update this policy from time to time. The date at the top of this page reflects the latest revision. Continued use of the site after changes constitutes acceptance of the updated policy.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(209, "section")(210, "h2");
        \u0275\u0275text(211, "14. Contact");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(212, "p");
        \u0275\u0275text(213, "For any privacy-related questions, contact: ");
        \u0275\u0275elementStart(214, "a", 5);
        \u0275\u0275text(215, "johnfabiomb@gmail.com");
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
//# sourceMappingURL=chunk-SCQ2B3DP.js.map
