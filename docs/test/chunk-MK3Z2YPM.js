import {
  FEATURES
} from "./chunk-AFV7OAE7.js";
import {
  SeoService
} from "./chunk-Z752YGBW.js";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-ZPEFIUFS.js";
import "./chunk-ADG4HADG.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-7275G3GP.js";
import "./chunk-TWWAJFRB.js";

// src/app/pages/top-places/top-places.component.ts
function TopPlacesComponent_a_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 37)(1, "span", 20);
    \u0275\u0275text(2, "\u{1F3F7}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 21)(4, "span", 22);
    \u0275\u0275text(5, "Exclusive Deals");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 23);
    \u0275\u0275text(7, "Real discounts from local partners I personally trust \u2014 watersports, tours and more");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 24);
    \u0275\u0275element(9, "line", 25)(10, "polyline", 26);
    \u0275\u0275elementEnd()();
  }
}
function TopPlacesComponent_button_63__svg_svg_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 44);
    \u0275\u0275element(1, "line", 25)(2, "polyline", 26);
    \u0275\u0275elementEnd();
  }
}
function TopPlacesComponent_button_63__svg_svg_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 45);
    \u0275\u0275element(1, "circle", 46)(2, "line", 47)(3, "line", 48);
    \u0275\u0275elementEnd();
  }
}
function TopPlacesComponent_button_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function TopPlacesComponent_button_63_Template_button_click_0_listener() {
      const loc_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.open(loc_r2));
    });
    \u0275\u0275elementStart(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 40);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 41);
    \u0275\u0275template(6, TopPlacesComponent_button_63__svg_svg_6_Template, 3, 0, "svg", 42)(7, TopPlacesComponent_button_63__svg_svg_7_Template, 4, 0, "svg", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const loc_r2 = ctx.$implicit;
    \u0275\u0275classProp("no-map", loc_r2.id === null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", loc_r2.num, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(loc_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", loc_r2.id !== null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", loc_r2.id === null);
  }
}
function TopPlacesComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "span", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 51);
    \u0275\u0275element(4, "span", 52)(5, "span", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 54);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 55);
    \u0275\u0275element(8, "path", 56);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const n_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", n_r4, "");
  }
}
var REVEALED = [
  { num: 1, name: "Gozo Salt Pans, Xwejni", id: 65 },
  { num: 2, name: "Ramla Bay, Gozo", id: 66 },
  { num: 3, name: "Argotti Botanic Gardens", id: 67 },
  { num: 4, name: "Qarraba Cliffs Trail, Mellie\u0127a", id: 72 },
  { num: 5, name: "Hondoq ir-Rummien", id: 68 },
  { num: 6, name: "Rdum il-Qammieh Viewpoint", id: 69 },
  { num: 7, name: "Wied il-Miela\u0127 Window", id: 23 },
  { num: 8, name: "Ta' Kalanka Sea Cave", id: 49 },
  { num: 9, name: "Fomm ir-Ri\u0127", id: 36 },
  { num: 10, name: "Ta' Marija Cave", id: 44 },
  { num: 11, name: "Tal-Mixta Cave", id: 41 },
  { num: 12, name: "Wied il-G\u0127asri", id: 63 },
  { num: 13, name: "Hidden Rocky Beach near \u0120nejna", id: 70 },
  { num: 14, name: "G\u0127ar ir-Ri\u0127", id: 3 },
  { num: 15, name: "Blata tal-Mel\u0127 Rock Passage", id: 40 },
  { num: 16, name: "Ix-Xaqqa Valley", id: 24 },
  { num: 17, name: "Babu Valley / Wied Babu", id: 59 },
  { num: 18, name: "L-G\u0127ar ta' Bla Saqaf", id: 16 },
  { num: 19, name: "Xlendi Tower Coastal Path", id: 73 },
  { num: 20, name: "Mini Inland Sea", id: 52 },
  { num: 21, name: "G\u0127ar \u0126anex Sea Cave", id: 74 }
];
var TOTAL = 30;
var TopPlacesComponent = class _TopPlacesComponent {
  constructor() {
    this.revealed = REVEALED;
    this.locked = Array.from({ length: TOTAL - REVEALED.length }, (_, i) => REVEALED.length + i + 1);
    this.total = TOTAL;
    this.features = FEATURES;
    this.router = inject(Router);
    this.seo = inject(SeoService);
    this.seo.setTrendPage(REVEALED);
  }
  open(loc) {
    if (loc.id !== null) {
      this.router.navigate(["/malta/locations", loc.id], { queryParams: { backTo: "30-places-2026" } });
    } else {
      this.router.navigate(["/malta"], { queryParams: { backTo: "30-places-2026" } });
    }
  }
  static {
    this.\u0275fac = function TopPlacesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TopPlacesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TopPlacesComponent, selectors: [["app-top-places"]], decls: 72, vars: 7, consts: [[1, "trend-page"], [1, "trend-header"], [1, "trend-badge"], [1, "trend-title"], [1, "trend-sub"], [1, "progress-wrap"], [1, "progress-bar"], [1, "progress-fill"], [1, "progress-label"], ["routerLink", "/malta", 1, "map-btn"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"], ["x1", "9", "y1", "3", "x2", "9", "y2", "18"], ["x1", "15", "y1", "6", "x2", "15", "y2", "21"], [1, "trend-intro"], [1, "trend-intro-text"], [1, "trend-chips"], [1, "trend-chip"], [1, "trend-ctas"], ["routerLink", "/malta/groups", 1, "trend-cta", "trend-cta--groups"], [1, "trend-cta__emoji"], [1, "trend-cta__body"], [1, "trend-cta__label"], [1, "trend-cta__desc"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "trend-cta__arrow"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"], ["class", "trend-cta trend-cta--deals", "routerLink", "/malta/deals", 4, "ngIf"], ["routerLink", "/malta", 1, "trend-cta", "trend-cta--map"], [1, "trend-list"], ["class", "trend-card", 3, "no-map", "click", 4, "ngFor", "ngForOf"], ["class", "trend-card trend-card--locked", 4, "ngFor", "ngForOf"], [1, "trend-footer"], ["href", "https://www.instagram.com/johnfabiomb/", "target", "_blank", "rel", "noopener", 1, "trend-ig"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"], [1, "trend-footer-copy"], ["routerLink", "/malta/deals", 1, "trend-cta", "trend-cta--deals"], [1, "trend-card", 3, "click"], [1, "card-num"], [1, "card-name"], [1, "card-arrow"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "trend-card", "trend-card--locked"], [1, "card-num", "card-num--locked"], [1, "card-name", "card-name--locked"], [1, "redacted"], [1, "redacted", "redacted--sm"], [1, "card-lock"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M18 10h-1V7A5 5 0 0 0 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM9 7a3 3 0 0 1 6 0v3H9V7zm9 13H6v-8h12v8zm-6-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"]], template: function TopPlacesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2);
        \u0275\u0275text(3, "v2026");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "30 Places to Visit");
        \u0275\u0275element(6, "br");
        \u0275\u0275text(7, "in Malta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 4);
        \u0275\u0275text(9, "by ");
        \u0275\u0275elementStart(10, "strong");
        \u0275\u0275text(11, "@johnfabiomb");
        \u0275\u0275elementEnd();
        \u0275\u0275text(12, " \xB7 Explorer");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 5)(14, "div", 6);
        \u0275\u0275element(15, "div", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 8);
        \u0275\u0275text(17);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "a", 9);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(19, "svg", 10);
        \u0275\u0275element(20, "polygon", 11)(21, "line", 12)(22, "line", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275text(23, " Explore full map ");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(24, "section", 14)(25, "p", 15);
        \u0275\u0275text(26, " A handpicked bucket-list of Malta and Gozo's most breathtaking spots \u2014 explored firsthand and curated for curious travellers. Expect dramatic sea caves, hidden valley trails, panoramic clifftop viewpoints and remote coastlines most tourists never find. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "div", 16)(28, "span", 17);
        \u0275\u0275text(29, "Malta & Gozo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "span", 17);
        \u0275\u0275text(31, "Sea caves");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "span", 17);
        \u0275\u0275text(33, "Cliff trails");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "span", 17);
        \u0275\u0275text(35, "Drone spots");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "span", 17);
        \u0275\u0275text(37, "Updated 2026");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(38, "div", 18)(39, "a", 19)(40, "span", 20);
        \u0275\u0275text(41, "\u{1F9ED}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "div", 21)(43, "span", 22);
        \u0275\u0275text(44, "Explore Together");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "span", 23);
        \u0275\u0275text(46, "Find a group heading to the same places \u2014 plan the day, chat live, never explore alone");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(47, "svg", 24);
        \u0275\u0275element(48, "line", 25)(49, "polyline", 26);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(50, TopPlacesComponent_a_50_Template, 11, 0, "a", 27);
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(51, "a", 28)(52, "span", 20);
        \u0275\u0275text(53, "\u{1F5FA}\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "div", 21)(55, "span", 22);
        \u0275\u0275text(56, "Explore Full Map");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "span", 23);
        \u0275\u0275text(58, "See all locations pinned on the interactive map \u2014 filter by type, difficulty or island");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(59, "svg", 24);
        \u0275\u0275element(60, "line", 25)(61, "polyline", 26);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(62, "div", 29);
        \u0275\u0275template(63, TopPlacesComponent_button_63_Template, 8, 6, "button", 30)(64, TopPlacesComponent_div_64_Template, 9, 1, "div", 31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "footer", 32)(66, "a", 33);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(67, "svg", 34);
        \u0275\u0275element(68, "path", 35);
        \u0275\u0275elementEnd();
        \u0275\u0275text(69, " @johnfabiomb ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(70, "span", 36);
        \u0275\u0275text(71, "Explore Malta \xB7 Interactive Map");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275styleProp("width", ctx.revealed.length / ctx.total * 100, "%");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate2("", ctx.revealed.length, " of ", ctx.total, " revealed");
        \u0275\u0275advance(33);
        \u0275\u0275property("ngIf", ctx.features.PROMOTIONS);
        \u0275\u0275advance(13);
        \u0275\u0275property("ngForOf", ctx.revealed);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.locked);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterModule, RouterLink], styles: ['\n\n.trend-page[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background: #f6f7f9;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 0 0 48px;\n  overflow-x: hidden;\n  padding: 20px !important;\n  padding-top: 0px !important;\n}\n.trend-header[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 100%;\n  padding: 72px 24px 52px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0;\n  position: relative;\n  overflow: hidden;\n  border-radius: 0 0 28px 28px;\n}\n.trend-header[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: url("./media/TaMarijaCave.webp") center/cover no-repeat;\n  filter: blur(2px);\n  transform: scale(1.15);\n  z-index: 0;\n}\n.trend-header[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(0, 0, 0, 0.5) 0%,\n      rgba(0, 0, 0, 0.7) 100%);\n  z-index: 0;\n}\n.trend-header[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.trend-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 12px;\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  border-radius: var(--radius-sm);\n  margin-bottom: 16px;\n  text-transform: uppercase;\n}\n.trend-title[_ngcontent-%COMP%] {\n  font-size: 30px;\n  font-weight: 800;\n  color: #fff;\n  letter-spacing: -0.6px;\n  line-height: 1.25;\n  margin: 0 0 10px;\n  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);\n}\n.trend-sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: rgba(255, 255, 255, 0.65);\n  margin: 0 0 28px;\n}\n.trend-sub[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.9);\n  font-weight: 600;\n}\n.progress-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 240px;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.22);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--color-primary);\n  border-radius: 4px;\n  transition: width 0.6s ease;\n}\n.progress-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.55);\n  letter-spacing: 0.3px;\n}\n.map-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  margin-top: 24px;\n  padding: 10px 20px;\n  background: rgba(255, 255, 255, 0.12);\n  border: 1.5px solid rgba(255, 255, 255, 0.35);\n  border-radius: var(--radius-lg);\n  font-size: 13px;\n  font-weight: 600;\n  color: #fff;\n  text-decoration: none;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  transition:\n    background var(--transition),\n    border-color var(--transition),\n    box-shadow var(--transition);\n}\n.map-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--color-primary);\n}\n.map-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.22);\n  border-color: rgba(244, 169, 34, 0.7);\n  box-shadow: 0 2px 14px rgba(244, 169, 34, 0.2);\n}\n.trend-intro[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  padding: 28px 24px 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.trend-intro-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.65;\n  color: #4b5563;\n  margin: 0;\n  text-align: center;\n}\n.trend-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 8px;\n}\n.trend-chip[_ngcontent-%COMP%] {\n  padding: 5px 12px;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  letter-spacing: 0.2px;\n}\n.trend-ctas[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  padding: 0 24px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.trend-cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 14px;\n  border-radius: var(--radius-xl);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg);\n  text-decoration: none;\n  transition:\n    box-shadow var(--transition),\n    border-color var(--transition),\n    transform 0.12s;\n}\n.trend-cta[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);\n  border-color: var(--color-primary);\n  transform: translateY(-1px);\n}\n.trend-cta[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n.trend-cta--groups[_ngcontent-%COMP%], \n.trend-cta--deals[_ngcontent-%COMP%], \n.trend-cta--map[_ngcontent-%COMP%] {\n  border-left: 3px solid var(--color-primary);\n}\n.trend-cta--deals[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n}\n.trend-cta--map[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n}\n.trend-cta__emoji[_ngcontent-%COMP%] {\n  font-size: 20px;\n  flex-shrink: 0;\n  line-height: 1;\n}\n.trend-cta__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.trend-cta__label[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.trend-cta__desc[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n  line-height: 1.4;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n  -webkit-box-orient: vertical;\n}\n.trend-cta__arrow[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--color-text-light);\n  display: flex;\n  align-items: center;\n  transition: color var(--transition), transform var(--transition);\n}\n.trend-cta[_ngcontent-%COMP%]:hover   .trend-cta__arrow[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  transform: translateX(2px);\n}\n.trend-list[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  padding: 0 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.trend-card[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 14px 16px;\n  cursor: pointer;\n  text-align: left;\n  transition:\n    box-shadow var(--transition),\n    border-color var(--transition),\n    transform 0.12s;\n}\n.trend-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n  border-color: #d1d5db;\n  transform: translateY(-1px);\n}\n.trend-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n.trend-card.no-map[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.trend-card.no-map[_ngcontent-%COMP%]   .card-arrow[_ngcontent-%COMP%] {\n  color: #d1d5db;\n}\n.trend-card.no-map[_ngcontent-%COMP%]:hover {\n  transform: none;\n  box-shadow: none;\n}\n.card-num[_ngcontent-%COMP%] {\n  min-width: 36px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-primary);\n  letter-spacing: -0.2px;\n  flex-shrink: 0;\n}\n.card-name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  line-height: 1.3;\n}\n.card-arrow[_ngcontent-%COMP%] {\n  color: var(--color-text-light);\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  transition: color var(--transition), transform var(--transition);\n}\n.trend-card[_ngcontent-%COMP%]:hover   .card-arrow[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  transform: translateX(2px);\n}\n.trend-card--locked[_ngcontent-%COMP%] {\n  cursor: default;\n  background: #fafafa;\n  border-color: #f0f0f0;\n}\n.trend-card--locked[_ngcontent-%COMP%]:hover {\n  box-shadow: none;\n  border-color: #f0f0f0;\n  transform: none;\n}\n.card-num--locked[_ngcontent-%COMP%] {\n  color: #d1d5db;\n}\n.card-name--locked[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.redacted[_ngcontent-%COMP%] {\n  display: block;\n  height: 10px;\n  width: 160px;\n  background: #e9eaec;\n  border-radius: 4px;\n}\n.redacted--sm[_ngcontent-%COMP%] {\n  width: 90px;\n}\n.card-lock[_ngcontent-%COMP%] {\n  color: #d1d5db;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n}\n.trend-footer[_ngcontent-%COMP%] {\n  margin-top: 40px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.trend-ig[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-primary);\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.trend-ig[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.trend-footer-copy[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--color-text-light);\n}\n/*# sourceMappingURL=top-places.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TopPlacesComponent, { className: "TopPlacesComponent", filePath: "src/app/pages/top-places/top-places.component.ts", lineNumber: 46 });
})();
export {
  TopPlacesComponent
};
//# sourceMappingURL=chunk-MK3Z2YPM.js.map
