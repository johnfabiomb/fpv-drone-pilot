import {
  SeoService
} from "./chunk-2WBO6UKF.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-JZVCYE4P.js";
import "./chunk-UEIPWXE7.js";
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
} from "./chunk-435XO7VF.js";
import "./chunk-TWWAJFRB.js";

// src/app/pages/privacy/privacy.component.ts
var PrivacyComponent = class _PrivacyComponent {
  constructor() {
    this.lastUpdated = "June 2026";
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PrivacyComponent, selectors: [["app-privacy"]], decls: 245, vars: 1, consts: [[1, "legal-page"], [1, "legal-inner"], ["routerLink", "/malta", 1, "back-link"], [1, "legal-title"], [1, "legal-updated"], ["href", "mailto:creator@johnfabiomb.com"], ["routerLink", "/cookies"], ["href", "https://policies.google.com/privacy", "target", "_blank", "rel", "noopener"], ["href", "https://www.google.com/settings/ads", "target", "_blank", "rel", "noopener"], ["href", "https://www.aboutads.info", "target", "_blank", "rel", "noopener"], ["href", "https://stripe.com/privacy", "target", "_blank", "rel", "noopener"], ["href", "https://idpc.org.mt", "target", "_blank", "rel", "noopener"]], template: function PrivacyComponent_Template(rf, ctx) {
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
        \u0275\u0275text(17, "creator@johnfabiomb.com");
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
        \u0275\u0275text(28, " \u2014 when you sign in with Google, we receive your name, email address, and profile photo URL. We store this to personalise your experience.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "li")(30, "strong");
        \u0275\u0275text(31, "Saved places");
        \u0275\u0275elementEnd();
        \u0275\u0275text(32, " \u2014 locations you bookmark are stored against your account so they are available across devices and sessions.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "li")(34, "strong");
        \u0275\u0275text(35, "Activity data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(36, ` \u2014 how often you visit, save, or share a location or partner deal. Used to personalise your experience (e.g. "You've visited this 5 times") and to power the XP and level system.`);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "li")(38, "strong");
        \u0275\u0275text(39, "Group data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(40, " \u2014 if you create or join an Explore Together hiking group, we store your group membership, role, and any chat messages you send within the group.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "li")(42, "strong");
        \u0275\u0275text(43, "Referral data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(44, " \u2014 a unique referral code is generated for your account when you sign in. If you refer a friend, both accounts are linked in our database to attribute the referral reward.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "li")(46, "strong");
        \u0275\u0275text(47, "Usage data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(48, " \u2014 pages visited, time on site, browser type, and device information, collected automatically via Google Analytics.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "li")(50, "strong");
        \u0275\u0275text(51, "Location data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(52, " \u2014 only if you explicitly grant permission through your browser. Used solely to show your position on the map and find nearby spots. Never stored or transmitted to our servers.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "li")(54, "strong");
        \u0275\u0275text(55, "Cookies and local storage");
        \u0275\u0275elementEnd();
        \u0275\u0275text(56, " \u2014 see our ");
        \u0275\u0275elementStart(57, "a", 6);
        \u0275\u0275text(58, "Cookie Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(59, " for full details.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(60, "section")(61, "h2");
        \u0275\u0275text(62, "3. User Accounts and Google Sign-In");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "p");
        \u0275\u0275text(64, "We use ");
        \u0275\u0275elementStart(65, "strong");
        \u0275\u0275text(66, "Google Sign-In");
        \u0275\u0275elementEnd();
        \u0275\u0275text(67, " (via Supabase Auth) to allow you to create an account. By signing in you authorise us to receive your basic Google profile information (name, email address, and profile photo). We do not receive your Google password.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "p");
        \u0275\u0275text(69, "Your account data is stored securely in ");
        \u0275\u0275elementStart(70, "strong");
        \u0275\u0275text(71, "Supabase");
        \u0275\u0275elementEnd();
        \u0275\u0275text(72, ", a cloud database service. Data stored includes your display name, email address, profile photo URL, saved locations, XP and experience level, email notification preference, and referral code. We do not store payment card details.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "p");
        \u0275\u0275text(74, "You may delete your account at any time by contacting us at ");
        \u0275\u0275elementStart(75, "a", 5);
        \u0275\u0275text(76, "creator@johnfabiomb.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(77, ". Upon deletion we will remove your account record and all associated data including saved places, activity history, group memberships, and group messages.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(78, "section")(79, "h2");
        \u0275\u0275text(80, "4. XP, Levels, and Interaction History");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "p");
        \u0275\u0275text(82, "Explore Malta includes a progression system that awards XP (experience points) for actions such as visiting locations, saving spots, signing in daily, and referring friends. We store:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "ul")(84, "li");
        \u0275\u0275text(85, "Your current XP total and experience level.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "li");
        \u0275\u0275text(87, "A log of XP-earning events (action type, reference ID, and timestamp) to prevent duplicate awards.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "li");
        \u0275\u0275text(89, "Interaction counts per location and partner deal (how many times you have viewed, saved, shared, or clicked Book Now on an item).");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(90, "p");
        \u0275\u0275text(91, "This data is used solely to personalise your experience within the app and is visible only to you. It is never sold or shared with third parties for advertising.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(92, "section")(93, "h2");
        \u0275\u0275text(94, "5. Marketing and Promotional Communications");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "p");
        \u0275\u0275text(96, "By creating an account on Explore Malta, you agree to receive occasional communications from us, including:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "ul")(98, "li");
        \u0275\u0275text(99, "Deals, discounts, and offers from our partner providers in Malta and Gozo.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(100, "li");
        \u0275\u0275text(101, 'New location announcements and editorial content (e.g. "Top 30 places" guides).');
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(102, "li");
        \u0275\u0275text(103, "Platform updates and new feature announcements.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(104, "li");
        \u0275\u0275text(105, "Seasonal promotions and travel inspiration.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(106, "p");
        \u0275\u0275text(107, "You can opt out of marketing communications at any time by toggling off ");
        \u0275\u0275elementStart(108, "strong");
        \u0275\u0275text(109, "New spot updates");
        \u0275\u0275elementEnd();
        \u0275\u0275text(110, " in your profile settings (tap your profile picture in the footer), by clicking the unsubscribe link in any email we send, or by contacting us at ");
        \u0275\u0275elementStart(111, "a", 5);
        \u0275\u0275text(112, "creator@johnfabiomb.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(113, ". Opting out will not affect transactional messages (e.g. account-related notifications).");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(114, "section")(115, "h2");
        \u0275\u0275text(116, "6. How We Use Your Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(117, "ul")(118, "li");
        \u0275\u0275text(119, "To provide and personalise the interactive map, location guides, saved places, and partner deals features.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(120, "li");
        \u0275\u0275text(121, "To power the XP and level progression system.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(122, "li");
        \u0275\u0275text(123, "To operate Explore Together groups, including member lists and in-group chat.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(124, "li");
        \u0275\u0275text(125, "To understand how visitors use the site (Google Analytics).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "li");
        \u0275\u0275text(127, "To serve relevant advertisements (Google AdSense).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(128, "li");
        \u0275\u0275text(129, "To send you promotional and editorial communications (see section 5).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(130, "li");
        \u0275\u0275text(131, "To comply with legal obligations.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(132, "section")(133, "h2");
        \u0275\u0275text(134, "7. Google Analytics");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(135, "p");
        \u0275\u0275text(136, "We use Google Analytics to collect anonymised data about site usage. Google Analytics uses cookies to measure visitor behaviour. Data collected is processed by Google LLC and may be transferred to servers in the United States. We have enabled IP anonymisation. For more information, see ");
        \u0275\u0275elementStart(137, "a", 7);
        \u0275\u0275text(138, "Google's Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(139, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(140, "section")(141, "h2");
        \u0275\u0275text(142, "8. Google AdSense and Advertising");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(143, "p");
        \u0275\u0275text(144, "We use Google AdSense to display advertisements on this site. Google and its partners may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising by visiting ");
        \u0275\u0275elementStart(145, "a", 8);
        \u0275\u0275text(146, "Google Ads Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(147, " or ");
        \u0275\u0275elementStart(148, "a", 9);
        \u0275\u0275text(149, "aboutads.info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(150, ".");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(151, "p");
        \u0275\u0275text(152, "For EEA visitors, we use Google's Funding Choices consent management platform to obtain your consent before serving personalised ads.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(153, "section")(154, "h2");
        \u0275\u0275text(155, "9. Payments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(156, "p");
        \u0275\u0275text(157, "Payment processing is handled entirely by Stripe. We do not collect, store, or process any payment card data. Please review ");
        \u0275\u0275elementStart(158, "a", 10);
        \u0275\u0275text(159, "Stripe's Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(160, " for details.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(161, "section")(162, "h2");
        \u0275\u0275text(163, "10. Data Sharing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(164, "p");
        \u0275\u0275text(165, "We do not sell or rent your personal data. We share data only with the following service providers where necessary to operate the site:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(166, "ul")(167, "li")(168, "strong");
        \u0275\u0275text(169, "Supabase Inc.");
        \u0275\u0275elementEnd();
        \u0275\u0275text(170, " \u2014 Authentication, database, and real-time features (account data, saved places, XP, groups, interaction history)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(171, "li")(172, "strong");
        \u0275\u0275text(173, "Google LLC");
        \u0275\u0275elementEnd();
        \u0275\u0275text(174, " \u2014 Analytics (Google Analytics), advertising (AdSense), and fonts");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(175, "li")(176, "strong");
        \u0275\u0275text(177, "Stripe Inc.");
        \u0275\u0275elementEnd();
        \u0275\u0275text(178, " \u2014 Payment processing");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(179, "p");
        \u0275\u0275text(180, "All third parties are required to handle your data in accordance with applicable data protection law.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(181, "section")(182, "h2");
        \u0275\u0275text(183, "11. Data Retention");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(184, "p");
        \u0275\u0275text(185, "Analytics data is retained for 26 months as configured in Google Analytics. Account data stored in Supabase (name, email, saved places, XP, level, interaction history, group memberships, group messages) is retained for as long as your account is active. You may request deletion at any time (see section 3). We do not store personal data beyond what is listed above.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(186, "section")(187, "h2");
        \u0275\u0275text(188, "12. Your Rights (GDPR)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(189, "p");
        \u0275\u0275text(190, "If you are located in the European Economic Area, you have the following rights regarding your personal data:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(191, "ul")(192, "li")(193, "strong");
        \u0275\u0275text(194, "Right of access");
        \u0275\u0275elementEnd();
        \u0275\u0275text(195, " \u2014 request a copy of the data we hold about you.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(196, "li")(197, "strong");
        \u0275\u0275text(198, "Right to rectification");
        \u0275\u0275elementEnd();
        \u0275\u0275text(199, " \u2014 request correction of inaccurate data.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(200, "li")(201, "strong");
        \u0275\u0275text(202, "Right to erasure");
        \u0275\u0275elementEnd();
        \u0275\u0275text(203, " \u2014 request deletion of your data where there is no legitimate reason to continue processing it.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(204, "li")(205, "strong");
        \u0275\u0275text(206, "Right to restrict processing");
        \u0275\u0275elementEnd();
        \u0275\u0275text(207, " \u2014 request that we limit how we use your data.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(208, "li")(209, "strong");
        \u0275\u0275text(210, "Right to data portability");
        \u0275\u0275elementEnd();
        \u0275\u0275text(211, " \u2014 receive your data in a structured, machine-readable format.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(212, "li")(213, "strong");
        \u0275\u0275text(214, "Right to object");
        \u0275\u0275elementEnd();
        \u0275\u0275text(215, " \u2014 object to processing based on legitimate interests or for direct marketing.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(216, "li")(217, "strong");
        \u0275\u0275text(218, "Right to withdraw consent");
        \u0275\u0275elementEnd();
        \u0275\u0275text(219, " \u2014 where processing is based on consent (including marketing communications), you may withdraw it at any time without affecting prior processing.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(220, "p");
        \u0275\u0275text(221, "To exercise any of these rights, contact us at ");
        \u0275\u0275elementStart(222, "a", 5);
        \u0275\u0275text(223, "creator@johnfabiomb.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(224, ". You also have the right to lodge a complaint with the ");
        \u0275\u0275elementStart(225, "a", 11);
        \u0275\u0275text(226, "Information and Data Protection Commissioner (Malta)");
        \u0275\u0275elementEnd();
        \u0275\u0275text(227, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(228, "section")(229, "h2");
        \u0275\u0275text(230, "13. Children's Privacy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(231, "p");
        \u0275\u0275text(232, "This site is not directed at children under the age of 13. We do not knowingly collect personal data from children.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(233, "section")(234, "h2");
        \u0275\u0275text(235, "14. Changes to This Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(236, "p");
        \u0275\u0275text(237, "We may update this policy from time to time. The date at the top of this page reflects the latest revision. Continued use of the site after changes constitutes acceptance of the updated policy.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(238, "section")(239, "h2");
        \u0275\u0275text(240, "15. Contact");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(241, "p");
        \u0275\u0275text(242, "For any privacy-related questions, contact: ");
        \u0275\u0275elementStart(243, "a", 5);
        \u0275\u0275text(244, "creator@johnfabiomb.com");
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PrivacyComponent, { className: "PrivacyComponent", filePath: "src/app/pages/privacy/privacy.component.ts", lineNumber: 13 });
})();
export {
  PrivacyComponent
};
//# sourceMappingURL=chunk-NSZ2U24T.js.map
