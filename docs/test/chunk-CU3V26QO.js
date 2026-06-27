import {
  RouterLink
} from "./chunk-K7AGV7TU.js";
import {
  DomSanitizer,
  Meta,
  Title
} from "./chunk-AMJW2RV7.js";
import {
  DOCUMENT,
  ElementRef,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  signal,
  viewChild,
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
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-2FJZNSO2.js";
import "./chunk-TWWAJFRB.js";

// src/app/landing/landing.component.ts
var _c0 = ["reelTrack"];
function LandingComponent_For_152_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275element(1, "iframe", 103);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const reel_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", reel_r2, \u0275\u0275sanitizeResourceUrl);
  }
}
var LandingComponent = class _LandingComponent {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.host = inject(ElementRef);
    this.title = inject(Title);
    this.meta = inject(Meta);
    this.sanitizer = inject(DomSanitizer);
    this.doc = inject(DOCUMENT);
    this.reels = ["DTijMDzEfsJ", "DX6jf9tIiGN", "DXyYeh5o8Qm", "DXrMMXiCO97", "DVtwmjlCGzo", "DUThBzlEQ7F"].map((code) => this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.instagram.com/p/${code}/embed`));
    this.year = (/* @__PURE__ */ new Date()).getFullYear();
    this.menuOpen = signal(false);
    this.scrolled = signal(false);
    this.reelTrack = viewChild("reelTrack");
    this.paused = false;
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.isLegacyUrl()) {
      window.location.replace("/malta" + window.location.search + window.location.hash);
      return;
    }
    this.title.setTitle("John Monta\xF1o \u2014 Drone Pilot & Content Creator in Malta");
    const desc = "Malta-based content creator and drone pilot. Cinematic aerial video, social content and destination promotion \u2014 plus an interactive map of the 30 best places to visit in Malta.";
    const ogTitle = "John Monta\xF1o \u2014 Content Creator & Drone Pilot, Malta";
    const img = "https://johnfabiomb.com/assets/og-john.jpg";
    const imgAlt = "John Monta\xF1o in Valletta, Malta \u2014 content creator & drone pilot";
    this.meta.updateTag({ name: "description", content: desc });
    this.meta.updateTag({ property: "og:type", content: "website" });
    this.meta.updateTag({ property: "og:site_name", content: "John Monta\xF1o" });
    this.meta.updateTag({ property: "og:title", content: ogTitle });
    this.meta.updateTag({ property: "og:description", content: desc });
    this.meta.updateTag({ property: "og:url", content: "https://johnfabiomb.com/" });
    this.meta.updateTag({ property: "og:image", content: img });
    this.meta.updateTag({ property: "og:image:width", content: "1200" });
    this.meta.updateTag({ property: "og:image:height", content: "630" });
    this.meta.updateTag({ property: "og:image:type", content: "image/jpeg" });
    this.meta.updateTag({ property: "og:image:alt", content: imgAlt });
    this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" });
    this.meta.updateTag({ name: "twitter:title", content: ogTitle });
    this.meta.updateTag({ name: "twitter:description", content: desc });
    this.meta.updateTag({ name: "twitter:image", content: img });
    this.meta.updateTag({ name: "twitter:image:alt", content: imgAlt });
    this.setCanonical("https://johnfabiomb.com/");
    this.addPersonSchema(img);
  }
  /** Canonical URL — added once (server prerender), reused on the client. */
  setCanonical(url) {
    let link = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement("link");
      link.setAttribute("rel", "canonical");
      this.doc.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }
  /** Person structured data so Google understands who John is (knowledge-graph eligible). */
  addPersonSchema(image) {
    if (this.doc.getElementById("ld-person"))
      return;
    const script = this.doc.createElement("script");
    script.id = "ld-person";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "John Monta\xF1o",
      jobTitle: "Content Creator & Drone Pilot",
      url: "https://johnfabiomb.com/",
      image,
      email: "creator@johnfabiomb.com",
      address: { "@type": "PostalAddress", addressLocality: "Malta", addressCountry: "MT" },
      sameAs: ["https://www.instagram.com/johnfabiomb/"],
      knowsAbout: ["Drone cinematography", "Aerial filming", "Content creation", "Malta travel", "Destination marketing"]
    });
    this.doc.head.appendChild(script);
  }
  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    const el = this.host.nativeElement;
    el.classList.add("is-browser");
    this.observer = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        this.observer?.unobserve(e.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    el.querySelectorAll(".reveal").forEach((n) => this.observer.observe(n));
    this.onScroll = () => this.scrolled.set(window.scrollY > 24);
    this.onScroll();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduce)
      this.autoTimer = setInterval(() => {
        if (!this.paused)
          this.advanceReels(1, false);
      }, 4500);
  }
  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.onScroll)
      window.removeEventListener("scroll", this.onScroll);
    if (this.autoTimer)
      clearInterval(this.autoTimer);
  }
  /** Scroll the reels track by one card; loops back to the start at the end. */
  advanceReels(dir, manual = true) {
    const el = this.reelTrack()?.nativeElement;
    if (!el)
      return;
    const card = el.querySelector(".reel");
    const gap = parseFloat(getComputedStyle(el).columnGap || "20") || 20;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir === 1 && atEnd)
      el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && el.scrollLeft <= 8)
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    if (manual) {
      this.paused = true;
      setTimeout(() => this.paused = false, 8e3);
    }
  }
  /** True for old-style links that belong to the map app, not this landing. */
  isLegacyUrl() {
    const hash = window.location.hash;
    const q = new URLSearchParams(window.location.search);
    return hash.startsWith("#/") || hash.includes("access_token=") || q.has("locationId") || q.has("title") || q.has("redirect") || q.has("code") || q.has("ref");
  }
  scrollTo(id) {
    this.menuOpen.set(false);
    if (!isPlatformBrowser(this.platformId))
      return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  static {
    this.\u0275fac = function LandingComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LandingComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LandingComponent, selectors: [["app-landing"]], viewQuery: function LandingComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuerySignal(ctx.reelTrack, _c0, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance();
      }
    }, decls: 284, vars: 7, consts: [["reelTrack", ""], ["aria-hidden", "true", "focusable", "false", 2, "position", "absolute", "width", "0", "height", "0", "overflow", "hidden"], ["id", "i-pin", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10Z"], ["cx", "12", "cy", "11", "r", "2.2"], ["id", "i-map", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z"], ["d", "M9 4v13M15 6.5v13"], ["id", "i-drone", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "5", "cy", "5", "r", "2.1"], ["cx", "19", "cy", "5", "r", "2.1"], ["cx", "5", "cy", "19", "r", "2.1"], ["cx", "19", "cy", "19", "r", "2.1"], ["d", "m6.6 6.6 2.4 2.4M17.4 6.6 15 9M6.6 17.4 9 15M17.4 17.4 15 15"], ["x", "9", "y", "9", "width", "6", "height", "6", "rx", "1.5"], ["id", "i-film", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "6", "width", "13", "height", "12", "rx", "2"], ["d", "m16 10 5-2.5v9L16 14"], ["id", "i-camera", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "7", "width", "18", "height", "12", "rx", "2.5"], ["cx", "12", "cy", "13", "r", "3.2"], ["d", "M8.6 7 9.8 5h4.4l1.2 2"], ["id", "i-mail", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "5", "width", "18", "height", "14", "rx", "2"], ["d", "m3.5 7 8.5 6 8.5-6"], [1, "nav"], [1, "nav__inner"], [1, "brand", 3, "click"], [1, "brand__mark"], ["src", "assets/landing/john-badge.jpg", "alt", "John Monta\xF1o", "width", "40", "height", "40"], [1, "brand__name"], [1, "nav__links"], [3, "click"], ["routerLink", "/malta", 1, "nav__cta"], ["aria-label", "Menu", 1, "nav__burger", 3, "click"], ["id", "top", 1, "landing"], [1, "hero"], ["aria-hidden", "true", 1, "hero__bg"], [1, "hero__grid"], [1, "hero__copy"], [1, "eyebrow"], [1, "ico"], ["href", "#i-pin"], [1, "hero__title"], [1, "accent"], [1, "hero__sub"], [1, "hero__cta"], ["routerLink", "/malta", 1, "btn", "btn--primary"], ["href", "#i-map"], [1, "btn", "btn--ghost", 3, "click"], [1, "hero__tags"], ["href", "#i-drone"], ["href", "#i-film"], [1, "hero__photo", "reveal"], ["src", "assets/landing/john-hero.jpg", "alt", "John Monta\xF1o in Valletta, Malta", "width", "882", "height", "1040", "fetchpriority", "high"], ["aria-hidden", "true", 1, "hero__photo-glow"], [1, "hero__badge"], ["aria-label", "Scroll down", 1, "hero__scroll", 3, "click"], [1, "strip", "reveal"], [1, "strip__inner"], [1, "strip__item"], ["id", "map", 1, "mapcta", "reveal"], [1, "mapcta__inner"], [1, "kicker", "kicker--light"], [1, "mapcta__cta"], ["routerLink", "/malta/30-places-2026", 1, "btn", "btn--primary", "btn--lg", "mapcta__launch"], ["routerLink", "/malta", 1, "mapcta__alt"], ["id", "work", 1, "section"], [1, "section__head", "reveal"], [1, "kicker"], [1, "section__lead"], [1, "carousel", "reveal", 3, "pointerenter", "pointerleave"], ["aria-label", "Previous reel", 1, "carousel__nav", "carousel__nav--prev", 3, "click"], [1, "reels"], [1, "reel"], ["aria-label", "Next reel", 1, "carousel__nav", "carousel__nav--next", 3, "click"], [1, "reels__more", "reveal"], ["href", "https://www.instagram.com/johnfabiomb/", "target", "_blank", "rel", "noopener", 1, "btn", "btn--ghost", "btn--dark"], ["href", "#i-camera"], ["id", "services", 1, "section"], [1, "cards"], [1, "card", "reveal"], [1, "card__icon"], ["id", "about", 1, "about"], [1, "about__photo", "reveal"], ["src", "assets/landing/john-about.jpg", "alt", "John Monta\xF1o flying FPV at golden hour", "width", "900", "height", "900", "loading", "lazy"], [1, "about__copy", "reveal"], [1, "about__pills"], [1, "btn", "btn--primary", 3, "click"], ["id", "contact", 1, "cta", "reveal"], [1, "cta__inner"], [1, "cta__actions"], ["href", "mailto:creator@johnfabiomb.com", 1, "btn", "btn--primary", "btn--lg"], ["href", "#i-mail"], ["href", "https://www.instagram.com/johnfabiomb/", "target", "_blank", "rel", "noopener", 1, "btn", "btn--ghost", "btn--lg"], [1, "foot"], [1, "foot__inner"], [1, "foot__brand"], [1, "foot__links"], ["routerLink", "/malta"], ["href", "mailto:creator@johnfabiomb.com"], ["href", "https://www.instagram.com/johnfabiomb/", "target", "_blank", "rel", "noopener"], [1, "foot__copy"], ["loading", "lazy", "scrolling", "no", "allowfullscreen", "", "title", "Drone reel by John Monta\xF1o", 3, "src"]], template: function LandingComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(0, "svg", 1)(1, "symbol", 2);
        \u0275\u0275element(2, "path", 3)(3, "circle", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "symbol", 5);
        \u0275\u0275element(5, "path", 6)(6, "path", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "symbol", 8);
        \u0275\u0275element(8, "circle", 9)(9, "circle", 10)(10, "circle", 11)(11, "circle", 12)(12, "path", 13)(13, "rect", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "symbol", 15);
        \u0275\u0275element(15, "rect", 16)(16, "path", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "symbol", 18);
        \u0275\u0275element(18, "rect", 19)(19, "circle", 20)(20, "path", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "symbol", 22);
        \u0275\u0275element(22, "rect", 23)(23, "path", 24);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(24, "header", 25)(25, "div", 26)(26, "a", 27);
        \u0275\u0275listener("click", function LandingComponent_Template_a_click_26_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("top"));
        });
        \u0275\u0275elementStart(27, "span", 28);
        \u0275\u0275element(28, "img", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "span", 30);
        \u0275\u0275text(30, "John\xA0Monta\xF1o");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "nav", 31)(32, "a", 32);
        \u0275\u0275listener("click", function LandingComponent_Template_a_click_32_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("map"));
        });
        \u0275\u0275text(33, "30 Places to Visit");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "a", 32);
        \u0275\u0275listener("click", function LandingComponent_Template_a_click_34_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("work"));
        });
        \u0275\u0275text(35, "Reels");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "a", 32);
        \u0275\u0275listener("click", function LandingComponent_Template_a_click_36_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("services"));
        });
        \u0275\u0275text(37, "Services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "a", 32);
        \u0275\u0275listener("click", function LandingComponent_Template_a_click_38_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("about"));
        });
        \u0275\u0275text(39, "About");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "a", 32);
        \u0275\u0275listener("click", function LandingComponent_Template_a_click_40_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("contact"));
        });
        \u0275\u0275text(41, "Contact");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "a", 33);
        \u0275\u0275text(43, "Launch Malta Map \u2192");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "button", 34);
        \u0275\u0275listener("click", function LandingComponent_Template_button_click_44_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.menuOpen.set(!ctx.menuOpen()));
        });
        \u0275\u0275element(45, "span")(46, "span")(47, "span");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(48, "main", 35)(49, "section", 36);
        \u0275\u0275element(50, "div", 37);
        \u0275\u0275elementStart(51, "div", 38)(52, "div", 39)(53, "p", 40);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(54, "svg", 41);
        \u0275\u0275element(55, "use", 42);
        \u0275\u0275elementEnd();
        \u0275\u0275text(56, " Content creator & drone pilot \xB7 Malta");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(57, "h1", 43);
        \u0275\u0275text(58, " See the most beautiful side of ");
        \u0275\u0275elementStart(59, "span", 44);
        \u0275\u0275text(60, "Malta");
        \u0275\u0275elementEnd();
        \u0275\u0275text(61, ". ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "p", 45);
        \u0275\u0275text(63, " I'm John. Visiting Malta? Explore the 30 best places to see on my interactive map. Running a brand, hotel or experience here? I'll put it in front of the people who matter \u2014 with cinematic drone & content. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "div", 46)(65, "a", 47);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(66, "svg", 41);
        \u0275\u0275element(67, "use", 48);
        \u0275\u0275elementEnd();
        \u0275\u0275text(68, " Launch Malta Map");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(69, "button", 49);
        \u0275\u0275listener("click", function LandingComponent_Template_button_click_69_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("contact"));
        });
        \u0275\u0275text(70, "Work with me");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(71, "ul", 50)(72, "li");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(73, "svg", 41);
        \u0275\u0275element(74, "use", 51);
        \u0275\u0275elementEnd();
        \u0275\u0275text(75, " Aerial & drone");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(76, "li");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(77, "svg", 41);
        \u0275\u0275element(78, "use", 52);
        \u0275\u0275elementEnd();
        \u0275\u0275text(79, " Content creation");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(80, "li");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(81, "svg", 41);
        \u0275\u0275element(82, "use", 42);
        \u0275\u0275elementEnd();
        \u0275\u0275text(83, " Destination promotion");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(84, "li");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(85, "svg", 41);
        \u0275\u0275element(86, "use", 48);
        \u0275\u0275elementEnd();
        \u0275\u0275text(87, " 30 places to visit");
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(88, "div", 53);
        \u0275\u0275element(89, "img", 54)(90, "div", 55);
        \u0275\u0275elementStart(91, "div", 56)(92, "strong");
        \u0275\u0275text(93, "Valletta \xB7 Malta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(94, "span");
        \u0275\u0275text(95, "Content creator & pilot");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(96, "button", 57);
        \u0275\u0275listener("click", function LandingComponent_Template_button_click_96_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("map"));
        });
        \u0275\u0275element(97, "span");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(98, "section", 58)(99, "div", 59)(100, "div", 60)(101, "strong");
        \u0275\u0275text(102, "70+");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(103, "span");
        \u0275\u0275text(104, "Malta spots filmed & mapped");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(105, "div", 60)(106, "strong");
        \u0275\u0275text(107, "30");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(108, "span");
        \u0275\u0275text(109, "must-see places to visit");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(110, "div", 60)(111, "strong");
        \u0275\u0275text(112, "4K");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(113, "span");
        \u0275\u0275text(114, "cinematic aerials");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(115, "div", 60)(116, "strong");
        \u0275\u0275text(117, "Malta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(118, "span");
        \u0275\u0275text(119, "based & explored");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(120, "section", 61)(121, "div", 62)(122, "p", 63);
        \u0275\u0275text(123, "Visiting Malta in 2026?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(124, "h2");
        \u0275\u0275text(125, "The 30 best places to visit in Malta.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "p");
        \u0275\u0275text(127, "My hand-picked ");
        \u0275\u0275elementStart(128, "strong");
        \u0275\u0275text(129, "2026 guide");
        \u0275\u0275elementEnd();
        \u0275\u0275text(130, " to Malta's must-see spots \u2014 sea caves, cliffs, hidden bays and viewpoints \u2014 on a fast, mobile-friendly map I built and filmed myself.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(131, "div", 64)(132, "a", 65);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(133, "svg", 41);
        \u0275\u0275element(134, "use", 48);
        \u0275\u0275elementEnd();
        \u0275\u0275text(135, " See the 30 places \u2192");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(136, "a", 66);
        \u0275\u0275text(137, "or explore the full interactive map \u2192");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(138, "section", 67)(139, "header", 68)(140, "p", 69);
        \u0275\u0275text(141, "Selected reels");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(142, "h2");
        \u0275\u0275text(143, "Malta from above.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(144, "p", 70);
        \u0275\u0275text(145, "A few of my favourite drone shots \u2014 captured, edited and colour-graded by me.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(146, "div", 71);
        \u0275\u0275listener("pointerenter", function LandingComponent_Template_div_pointerenter_146_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.paused = true);
        })("pointerleave", function LandingComponent_Template_div_pointerleave_146_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.paused = false);
        });
        \u0275\u0275elementStart(147, "button", 72);
        \u0275\u0275listener("click", function LandingComponent_Template_button_click_147_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.advanceReels(-1));
        });
        \u0275\u0275text(148, "\u2039");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(149, "div", 73, 0);
        \u0275\u0275repeaterCreate(151, LandingComponent_For_152_Template, 2, 1, "div", 74, \u0275\u0275repeaterTrackByIndex);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(153, "button", 75);
        \u0275\u0275listener("click", function LandingComponent_Template_button_click_153_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.advanceReels(1));
        });
        \u0275\u0275text(154, "\u203A");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(155, "div", 76)(156, "a", 77);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(157, "svg", 41);
        \u0275\u0275element(158, "use", 78);
        \u0275\u0275elementEnd();
        \u0275\u0275text(159, " See more on Instagram \u2192 ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(160, "section", 79)(161, "header", 68)(162, "p", 69);
        \u0275\u0275text(163, "What I do");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(164, "h2");
        \u0275\u0275text(165, "Malta, made unmissable.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(166, "p", 70);
        \u0275\u0275text(167, "Cinematic content that gets places, brands and experiences noticed.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(168, "div", 80)(169, "article", 81)(170, "div", 82);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(171, "svg");
        \u0275\u0275element(172, "use", 51);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(173, "h3");
        \u0275\u0275text(174, "Aerial & Drone");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(175, "p");
        \u0275\u0275text(176, "Cinematic 4K aerials that show Malta \u2014 or your venue \u2014 at its absolute best. My signature look.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(177, "ul")(178, "li");
        \u0275\u0275text(179, "4K aerial filming");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(180, "li");
        \u0275\u0275text(181, "Hotels, venues & real estate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(182, "li");
        \u0275\u0275text(183, "Tourism & events");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(184, "article", 81)(185, "div", 82);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(186, "svg");
        \u0275\u0275element(187, "use", 52);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(188, "h3");
        \u0275\u0275text(189, "Content Creation");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(190, "p");
        \u0275\u0275text(191, "Social-first video & photo built to convert \u2014 reels and stories shot, edited and ready to post.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(192, "ul")(193, "li");
        \u0275\u0275text(194, "Short-form & reels");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(195, "li");
        \u0275\u0275text(196, "Brand & product films");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(197, "li");
        \u0275\u0275text(198, "Photography");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(199, "article", 81)(200, "div", 82);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(201, "svg");
        \u0275\u0275element(202, "use", 42);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(203, "h3");
        \u0275\u0275text(204, "Destination Promotion");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(205, "p");
        \u0275\u0275text(206, "Got a brand, hotel or experience in Malta? I put it in front of the travellers already planning their visit.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(207, "ul")(208, "li");
        \u0275\u0275text(209, "Place & brand promos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(210, "li");
        \u0275\u0275text(211, "UGC & on-camera");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(212, "li");
        \u0275\u0275text(213, "Campaigns for visitors");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(214, "section", 83)(215, "div", 84);
        \u0275\u0275element(216, "img", 85);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(217, "div", 86)(218, "p", 69);
        \u0275\u0275text(219, "About me");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(220, "h2");
        \u0275\u0275text(221, "I don't just film Malta \u2014 ");
        \u0275\u0275elementStart(222, "span", 44);
        \u0275\u0275text(223, "I know it");
        \u0275\u0275elementEnd();
        \u0275\u0275text(224, ".");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(225, "p");
        \u0275\u0275text(226, " I'm a content creator and drone pilot based in Malta. I've explored every corner of these islands \u2014 the caves, the cliffs, the bays most visitors never find \u2014 and I capture them the way they deserve to be seen. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(227, "p");
        \u0275\u0275text(228, " That local eye is what makes the difference: whether you're a traveller planning a trip or a brand that wants Malta's visitors to notice you, you get content from someone who genuinely lives and breathes this place. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(229, "div", 87)(230, "span");
        \u0275\u0275text(231, "Content creator");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(232, "span");
        \u0275\u0275text(233, "Drone pilot");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(234, "span");
        \u0275\u0275text(235, "Aerial cinematography");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(236, "span");
        \u0275\u0275text(237, "Destination promotion");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(238, "span");
        \u0275\u0275text(239, "Malta explorer");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(240, "button", 88);
        \u0275\u0275listener("click", function LandingComponent_Template_button_click_240_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("contact"));
        });
        \u0275\u0275text(241, "Work with me");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(242, "section", 89)(243, "div", 90)(244, "p", 63);
        \u0275\u0275text(245, "Let's talk");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(246, "h2");
        \u0275\u0275text(247, "Got something worth filming in Malta?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(248, "p");
        \u0275\u0275text(249, "Tell me about your brand, hotel, event or experience. I reply personally.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(250, "div", 91)(251, "a", 92);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(252, "svg", 41);
        \u0275\u0275element(253, "use", 93);
        \u0275\u0275elementEnd();
        \u0275\u0275text(254, " creator@johnfabiomb.com");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(255, "a", 94);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(256, "svg", 41);
        \u0275\u0275element(257, "use", 78);
        \u0275\u0275elementEnd();
        \u0275\u0275text(258, " @johnfabiomb");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(259, "footer", 95)(260, "div", 96)(261, "div", 97)(262, "span", 28);
        \u0275\u0275element(263, "img", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(264, "div")(265, "strong");
        \u0275\u0275text(266, "John Monta\xF1o");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(267, "span");
        \u0275\u0275text(268, "Content creator \xB7 Drone pilot \u2014 Malta");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(269, "div", 98)(270, "a", 32);
        \u0275\u0275listener("click", function LandingComponent_Template_a_click_270_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("work"));
        });
        \u0275\u0275text(271, "Reels");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(272, "a", 32);
        \u0275\u0275listener("click", function LandingComponent_Template_a_click_272_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("services"));
        });
        \u0275\u0275text(273, "Services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(274, "a", 32);
        \u0275\u0275listener("click", function LandingComponent_Template_a_click_274_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.scrollTo("about"));
        });
        \u0275\u0275text(275, "About");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(276, "a", 99);
        \u0275\u0275text(277, "Launch Malta Map");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(278, "a", 100);
        \u0275\u0275text(279, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(280, "a", 101);
        \u0275\u0275text(281, "Instagram");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(282, "p", 102);
        \u0275\u0275text(283);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(24);
        \u0275\u0275classProp("nav--solid", ctx.scrolled())("nav--open", ctx.menuOpen());
        \u0275\u0275advance(7);
        \u0275\u0275classProp("open", ctx.menuOpen());
        \u0275\u0275advance(120);
        \u0275\u0275repeater(ctx.reels);
        \u0275\u0275advance(132);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.year, " John Monta\xF1o. Made & shot in Malta.");
      }
    }, dependencies: [RouterLink], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family:\n    Roboto,\n    "Helvetica Neue",\n    sans-serif;\n  color: #21242b;\n  background: #fbf7ef;\n  overflow-x: hidden;\n}\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.is-browser[_nghost-%COMP%]   .reveal[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: translateY(26px);\n  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);\n}\n.is-browser[_nghost-%COMP%]   .reveal.in[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: none;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 14px 26px;\n  border-radius: 999px;\n  border: 2px solid transparent;\n  font: inherit;\n  font-weight: 700;\n  font-size: 15px;\n  cursor: pointer;\n  text-decoration: none;\n  transition:\n    transform 0.15s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #1a1205;\n  box-shadow: 0 10px 26px rgba(244, 169, 34, 0.35);\n}\n.btn--primary[_ngcontent-%COMP%]:hover {\n  background: #d98e12;\n  transform: translateY(-2px);\n  box-shadow: 0 14px 32px rgba(244, 169, 34, 0.45);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: rgba(255, 255, 255, 0.5);\n  color: #fff;\n}\n.btn--ghost[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.12);\n  transform: translateY(-2px);\n}\n.btn--dark[_ngcontent-%COMP%] {\n  background: #fff;\n  border-color: #e7ddca;\n  color: #21242b;\n}\n.btn--dark[_ngcontent-%COMP%]:hover {\n  background: #f7f1e6;\n  border-color: #c7a36b;\n  transform: translateY(-2px);\n}\n.btn--lg[_ngcontent-%COMP%] {\n  padding: 17px 34px;\n  font-size: 16px;\n}\n.accent[_ngcontent-%COMP%] {\n  color: #F4A922;\n}\n.ico[_ngcontent-%COMP%] {\n  width: 1.05em;\n  height: 1.05em;\n  flex: none;\n}\n.kicker[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  letter-spacing: 0.16em;\n  font-size: 12.5px;\n  font-weight: 800;\n  color: #d98e12;\n  margin: 0 0 14px;\n}\n.kicker--light[_ngcontent-%COMP%] {\n  color: #F4A922;\n}\n.section[_ngcontent-%COMP%] {\n  max-width: 1180px;\n  margin: 0 auto;\n  padding: 96px 24px;\n}\n.section__head[_ngcontent-%COMP%] {\n  text-align: center;\n  max-width: 720px;\n  margin: 0 auto 54px;\n}\n.section__head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(28px, 4vw, 44px);\n  font-weight: 800;\n  letter-spacing: -0.02em;\n  margin: 0 0 14px;\n  line-height: 1.1;\n}\n.section__lead[_ngcontent-%COMP%] {\n  color: #6f675b;\n  font-size: 17px;\n  margin: 0;\n}\n.nav[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0 0 auto 0;\n  z-index: 50;\n  transition:\n    background 0.3s ease,\n    box-shadow 0.3s ease,\n    padding 0.3s ease;\n  padding: 18px 0;\n}\n.nav--solid[_ngcontent-%COMP%] {\n  background: rgba(251, 247, 239, 0.92);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  box-shadow: 0 4px 20px rgba(20, 16, 8, 0.07);\n  padding: 10px 0;\n}\n.nav--solid[_ngcontent-%COMP%]   .nav__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #21242b;\n}\n.nav--solid[_ngcontent-%COMP%]   .brand__name[_ngcontent-%COMP%] {\n  color: #21242b;\n}\n.nav__inner[_ngcontent-%COMP%] {\n  max-width: 1180px;\n  margin: 0 auto;\n  padding: 0 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.nav__links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 22px;\n}\n.nav__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #fff;\n  text-decoration: none;\n  font-weight: 600;\n  font-size: 14.5px;\n  cursor: pointer;\n  transition: color 0.15s;\n  white-space: nowrap;\n}\n.nav__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #F4A922;\n}\n.nav__cta[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #1a1205 !important;\n  padding: 9px 18px;\n  border-radius: 999px;\n}\n.nav__cta[_ngcontent-%COMP%]:hover {\n  background: #d98e12;\n}\n.nav__burger[_ngcontent-%COMP%] {\n  display: none;\n  flex-direction: column;\n  gap: 5px;\n  background: none;\n  border: 0;\n  cursor: pointer;\n  padding: 6px;\n}\n.nav__burger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 2px;\n  background: #fff;\n  border-radius: 2px;\n  transition: background 0.3s;\n}\n.nav--solid[_ngcontent-%COMP%]   .nav__burger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #21242b;\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  cursor: pointer;\n  text-decoration: none;\n}\n.brand__mark[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  background: #F4A922;\n  box-shadow: 0 0 0 2px rgba(244, 169, 34, 0.55);\n}\n.brand__mark[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: 50% 20%;\n  display: block;\n}\n.brand__name[_ngcontent-%COMP%] {\n  color: #fff;\n  font-weight: 800;\n  font-size: 17px;\n  letter-spacing: -0.01em;\n}\n.hero[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100svh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 120px 24px 60px;\n  overflow: hidden;\n}\n.hero__bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  background:\n    radial-gradient(\n      120% 90% at 80% 10%,\n      rgba(244, 169, 34, 0.22),\n      transparent 55%),\n    radial-gradient(\n      100% 80% at 10% 90%,\n      rgba(43, 131, 196, 0.22),\n      transparent 55%),\n    linear-gradient(\n      160deg,\n      #11131a 0%,\n      #1a1b22 45%,\n      #241d12 100%);\n}\n.hero__bg[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);\n  background-size: 4px 4px;\n  opacity: 0.5;\n}\n.hero__grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1180px;\n  margin: 0 auto;\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1.1fr 0.9fr;\n  gap: 50px;\n  align-items: center;\n}\n.hero__copy[_ngcontent-%COMP%] {\n  max-width: 600px;\n}\n.hero__title[_ngcontent-%COMP%] {\n  font-size: clamp(34px, 5.2vw, 60px);\n  line-height: 1.04;\n  font-weight: 900;\n  letter-spacing: -0.025em;\n  color: #fff;\n  margin: 0 0 22px;\n}\n.hero__sub[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.78);\n  font-size: 18px;\n  line-height: 1.6;\n  margin: 0 0 30px;\n  max-width: 520px;\n}\n.hero__cta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  flex-wrap: wrap;\n  margin-bottom: 34px;\n}\n.hero__tags[_ngcontent-%COMP%] {\n  list-style: none;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px 18px;\n  padding: 0;\n  margin: 0;\n}\n.hero__tags[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: rgba(255, 255, 255, 0.72);\n  font-size: 14px;\n  font-weight: 600;\n}\n.hero__tags[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {\n  color: #F4A922;\n}\n.hero[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  color: #F4A922;\n  background: rgba(244, 169, 34, 0.12);\n  border: 1px solid rgba(244, 169, 34, 0.3);\n  padding: 7px 14px;\n  border-radius: 999px;\n  font-size: 13px;\n  font-weight: 700;\n  margin: 0 0 22px;\n}\n.hero__photo[_ngcontent-%COMP%] {\n  position: relative;\n  justify-self: center;\n}\n.hero__photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  height: auto;\n  aspect-ratio: 882/1040;\n  object-fit: cover;\n  border-radius: 22px;\n  display: block;\n  position: relative;\n  z-index: 1;\n  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.hero__photo-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: -12% -8%;\n  z-index: 0;\n  border-radius: 40px;\n  background:\n    radial-gradient(\n      circle at 50% 40%,\n      rgba(244, 169, 34, 0.4),\n      transparent 65%);\n  filter: blur(20px);\n}\n.hero__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  left: -14px;\n  bottom: 30px;\n  background: rgba(251, 247, 239, 0.96);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  border-radius: 14px;\n  padding: 12px 16px;\n  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.3);\n}\n.hero__badge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  color: #21242b;\n}\n.hero__badge[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6f675b;\n}\n.hero__scroll[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 22px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 2;\n  width: 26px;\n  height: 42px;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-radius: 14px;\n  background: none;\n  cursor: pointer;\n}\n.hero__scroll[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  left: 50%;\n  width: 4px;\n  height: 8px;\n  margin-left: -2px;\n  border-radius: 2px;\n  background: #F4A922;\n  animation: _ngcontent-%COMP%_scrolldot 1.6s ease infinite;\n}\n@keyframes _ngcontent-%COMP%_scrolldot {\n  0% {\n    opacity: 0;\n    transform: translateY(0);\n  }\n  40% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n}\n.strip[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #fff;\n  border-bottom: 1px solid #e7ddca;\n}\n.strip__inner[_ngcontent-%COMP%] {\n  max-width: 1180px;\n  margin: 0 auto;\n  padding: 30px 24px;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 20px;\n}\n.strip__item[_ngcontent-%COMP%] {\n  text-align: center;\n  position: relative;\n}\n.strip__item[_ngcontent-%COMP%]:not(:last-child)::after {\n  content: "";\n  position: absolute;\n  right: -10px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 1px;\n  height: 34px;\n  background: #e7ddca;\n}\n.strip__item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 27px;\n  font-weight: 900;\n  color: #21242b;\n  letter-spacing: -0.02em;\n}\n.strip__item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6f675b;\n}\n.cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 22px;\n  max-width: 1040px;\n  margin: 0 auto;\n}\n.card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e7ddca;\n  border-radius: 18px;\n  padding: 30px 24px;\n  transition:\n    transform 0.2s ease,\n    box-shadow 0.2s ease,\n    border-color 0.2s ease;\n}\n.card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 22px 44px rgba(120, 90, 30, 0.14);\n  border-color: #c7a36b;\n}\n.card__icon[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 54px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n  color: #21242b;\n  background:\n    linear-gradient(\n      150deg,\n      #fff3da,\n      #fbe3b0);\n  margin-bottom: 18px;\n}\n.card__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 27px;\n  height: 27px;\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 19px;\n  font-weight: 800;\n  margin: 0 0 10px;\n}\n.card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6f675b;\n  font-size: 14.5px;\n  line-height: 1.6;\n  margin: 0 0 14px;\n}\n.card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: #21242b;\n  padding: 5px 0 5px 20px;\n  position: relative;\n}\n.card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2713";\n  position: absolute;\n  left: 0;\n  color: #d98e12;\n  font-weight: 800;\n}\n.about[_ngcontent-%COMP%] {\n  max-width: 1180px;\n  margin: 0 auto;\n  padding: 40px 24px 96px;\n  display: grid;\n  grid-template-columns: 0.9fr 1.1fr;\n  gap: 56px;\n  align-items: center;\n}\n.about__photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  aspect-ratio: 1/1;\n  object-fit: cover;\n  border-radius: 22px;\n  display: block;\n  box-shadow: 0 24px 54px rgba(120, 90, 30, 0.22);\n  border: 6px solid #fff;\n}\n.about__copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(26px, 3.6vw, 40px);\n  font-weight: 800;\n  letter-spacing: -0.02em;\n  line-height: 1.12;\n  margin: 0 0 18px;\n}\n.about__copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6f675b;\n  font-size: 16px;\n  line-height: 1.7;\n  margin: 0 0 16px;\n}\n.about__pills[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 9px;\n  margin: 22px 0 28px;\n}\n.about__pills[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #f7f1e6;\n  border: 1px solid #e7ddca;\n  color: #21242b;\n  font-size: 13px;\n  font-weight: 600;\n  padding: 7px 14px;\n  border-radius: 999px;\n}\n.mapcta[_ngcontent-%COMP%] {\n  position: relative;\n  text-align: center;\n  background: url(/assets/landing/john-skyline.jpg) center 24%/cover no-repeat fixed;\n}\n.mapcta[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(15, 17, 22, 0.82),\n      rgba(15, 17, 22, 0.72));\n}\n.mapcta__inner[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 780px;\n  margin: 0 auto;\n  padding: 100px 24px;\n  color: #fff;\n}\n.mapcta__inner[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(28px, 4.6vw, 48px);\n  font-weight: 900;\n  letter-spacing: -0.02em;\n  margin: 0 0 16px;\n}\n.mapcta__inner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.85);\n  font-size: 17px;\n  line-height: 1.6;\n  margin: 0 auto 30px;\n  max-width: 580px;\n}\n.mapcta__inner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #F4A922;\n}\n.mapcta__cta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.mapcta__launch[_ngcontent-%COMP%] {\n  box-shadow: 0 16px 40px rgba(244, 169, 34, 0.5);\n  font-size: 17px;\n}\n.mapcta__alt[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.72);\n  font-size: 14px;\n  font-weight: 600;\n  text-decoration: none;\n  border-bottom: 1px solid transparent;\n  transition: color 0.15s, border-color 0.15s;\n}\n.mapcta__alt[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  border-color: rgba(255, 255, 255, 0.6);\n}\n.carousel[_ngcontent-%COMP%] {\n  position: relative;\n}\n.reels[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  scroll-behavior: smooth;\n  padding: 6px 2px 18px;\n  scrollbar-width: none;\n}\n.reels[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.reel[_ngcontent-%COMP%] {\n  flex: 0 0 340px;\n  max-width: 340px;\n  scroll-snap-align: center;\n  background: #000;\n  border: 1px solid #e7ddca;\n  border-radius: 18px;\n  overflow: hidden;\n  box-shadow: 0 18px 40px rgba(120, 90, 30, 0.16);\n}\n.reel[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 600px;\n  border: 0;\n  display: block;\n  background: #000;\n}\n.carousel__nav[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 300px;\n  transform: translateY(-50%);\n  z-index: 6;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 1px solid #e7ddca;\n  background: rgba(255, 255, 255, 0.96);\n  color: #21242b;\n  font-size: 26px;\n  line-height: 1;\n  font-weight: 700;\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);\n  transition: transform 0.15s ease, background 0.2s ease;\n}\n.carousel__nav[_ngcontent-%COMP%]:hover {\n  background: #F4A922;\n  transform: translateY(-50%) scale(1.08);\n}\n.carousel__nav--prev[_ngcontent-%COMP%] {\n  left: -10px;\n}\n.carousel__nav--next[_ngcontent-%COMP%] {\n  right: -10px;\n}\n.reels__more[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 40px;\n}\n.cta[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      90% 120% at 85% 0%,\n      rgba(244, 169, 34, 0.2),\n      transparent 55%),\n    radial-gradient(\n      90% 120% at 0% 100%,\n      rgba(43, 131, 196, 0.2),\n      transparent 55%),\n    #15171c;\n  color: #fff;\n  padding: 96px 24px;\n}\n.cta__inner[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 0 auto;\n  text-align: center;\n}\n.cta__inner[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(30px, 4.6vw, 50px);\n  font-weight: 900;\n  letter-spacing: -0.02em;\n  margin: 0 0 14px;\n}\n.cta__inner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n  font-size: 18px;\n  margin: 0 0 32px;\n}\n.cta__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.foot[_ngcontent-%COMP%] {\n  background: #f7f1e6;\n  color: #21242b;\n  padding: 50px 24px 28px;\n}\n.foot__inner[_ngcontent-%COMP%] {\n  max-width: 1180px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  flex-wrap: wrap;\n  padding-bottom: 26px;\n  border-bottom: 1px solid #e7ddca;\n}\n.foot__brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 13px;\n}\n.foot__brand[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 16px;\n}\n.foot__brand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6f675b;\n}\n.foot__links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px 22px;\n}\n.foot__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #6f675b;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.foot__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #d98e12;\n}\n.foot__copy[_ngcontent-%COMP%] {\n  max-width: 1180px;\n  margin: 22px auto 0;\n  text-align: center;\n  font-size: 13px;\n  color: #6f675b;\n}\n@media (max-width: 900px) {\n  .hero__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 40px;\n    text-align: center;\n  }\n  .hero__copy[_ngcontent-%COMP%] {\n    max-width: 640px;\n    margin: 0 auto;\n  }\n  .hero[_ngcontent-%COMP%] {\n    padding: 100px 20px 46px;\n  }\n  .hero__cta[_ngcontent-%COMP%], \n   .hero__tags[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .hero__tags[_ngcontent-%COMP%] {\n    gap: 8px 14px;\n  }\n  .hero__tags[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .hero__photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-width: 300px;\n  }\n  .section[_ngcontent-%COMP%] {\n    padding: 64px 20px;\n  }\n  .mapcta__inner[_ngcontent-%COMP%] {\n    padding: 64px 20px;\n  }\n  .strip__inner[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 28px 20px;\n  }\n  .strip__item[_ngcontent-%COMP%]::after {\n    display: none;\n  }\n  .cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .about[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 32px;\n    text-align: center;\n  }\n  .about__pills[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .about__photo[_ngcontent-%COMP%] {\n    max-width: 420px;\n    margin: 0 auto;\n  }\n  .steps[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .reel[_ngcontent-%COMP%] {\n    flex-basis: 300px;\n    max-width: 300px;\n  }\n  .mapcta[_ngcontent-%COMP%] {\n    background-attachment: scroll;\n  }\n  .nav__links[_ngcontent-%COMP%] {\n    position: fixed;\n    inset: 0 0 0 auto;\n    width: min(80vw, 320px);\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: center;\n    gap: 26px;\n    background: #15171c;\n    padding: 40px;\n    transform: translateX(100%);\n    transition: transform 0.3s ease;\n    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.4);\n  }\n  .nav__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #fff;\n    font-size: 19px;\n  }\n  .nav__links.open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  .nav__burger[_ngcontent-%COMP%] {\n    display: flex;\n    z-index: 60;\n  }\n  .nav--solid[_ngcontent-%COMP%] {\n    backdrop-filter: none;\n    -webkit-backdrop-filter: none;\n    background: rgba(251, 247, 239, 0.98);\n  }\n  .nav--solid[_ngcontent-%COMP%]   .nav__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #fff;\n  }\n  .nav--open[_ngcontent-%COMP%]   .nav__burger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    background: #fff;\n  }\n}\n@media (max-width: 560px) {\n  .reel[_ngcontent-%COMP%] {\n    flex-basis: 86vw;\n    max-width: 86vw;\n  }\n  .reel[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n    height: 540px;\n  }\n  .carousel__nav[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 480px) {\n  .section[_ngcontent-%COMP%], \n   .mapcta__inner[_ngcontent-%COMP%] {\n    padding: 52px 18px;\n  }\n  .cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .strip__inner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .hero__cta[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n  .hero__cta[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    flex: none;\n  }\n  .hero__photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-width: 260px;\n  }\n}\n/*# sourceMappingURL=landing.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LandingComponent, { className: "LandingComponent", filePath: "src/app/landing/landing.component.ts", lineNumber: 22 });
})();
export {
  LandingComponent
};
//# sourceMappingURL=chunk-CU3V26QO.js.map
