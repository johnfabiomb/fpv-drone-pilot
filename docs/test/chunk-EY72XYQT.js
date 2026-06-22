import {
  SeoService
} from "./chunk-Q57PJMJ5.js";
import {
  UserAvatarComponent
} from "./chunk-FC65QG4Y.js";
import {
  LEVELS
} from "./chunk-HHUPO22U.js";
import {
  supabase
} from "./chunk-5SHRFYBE.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-E53NQKQB.js";
import "./chunk-DNKJKTBS.js";
import "./chunk-GQ3SG4V7.js";
import {
  CommonModule,
  DecimalPipe,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-P56CFEJA.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/map/features/leaderboard/leaderboard.component.ts
var _c0 = () => [1, 2, 3, 4, 5];
function LeaderboardComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 12);
  }
}
function LeaderboardComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275template(1, LeaderboardComponent_div_10_div_1_Template, 1, 0, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function LeaderboardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "p");
    \u0275\u0275text(2, "Couldn't load rankings. Try again later.");
    \u0275\u0275elementEnd()();
  }
}
function LeaderboardComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "p");
    \u0275\u0275text(2, "No rankings yet \u2014 start exploring to earn XP!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 14);
    \u0275\u0275text(4, "Open the map \u2192");
    \u0275\u0275elementEnd()();
  }
}
function LeaderboardComponent_div_13_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-user-avatar", 19);
    \u0275\u0275elementStart(4, "div", 20)(5, "span", 21);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 22);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 23)(10, "span", 24);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 25);
    \u0275\u0275text(14, "XP");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    const entry_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("lb-entry--gold", entry_r1.rank === 1)("lb-entry--silver", entry_r1.rank === 2)("lb-entry--bronze", entry_r1.rank === 3);
    \u0275\u0275advance();
    \u0275\u0275classProp("lb-rank--medal", entry_r1.rank <= 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.medal(entry_r1.rank));
    \u0275\u0275advance();
    \u0275\u0275property("photoURL", (tmp_8_0 = entry_r1.photo_url) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : "")("displayName", entry_r1.display_name)("level", entry_r1.level);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r1.display_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.levelInfo(entry_r1.level).emoji, " ", ctx_r1.levelInfo(entry_r1.level).name, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 16, entry_r1.xp));
  }
}
function LeaderboardComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275template(1, LeaderboardComponent_div_13_div_1_Template, 15, 18, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.entries());
  }
}
var LeaderboardComponent = class _LeaderboardComponent {
  constructor() {
    this.seo = inject(SeoService);
    this.platformId = inject(PLATFORM_ID);
    this.entries = signal([]);
    this.loading = signal(true);
    this.error = signal(false);
  }
  ngOnInit() {
    this.seo.setPage("leaderboard");
    if (isPlatformBrowser(this.platformId)) {
      this.load();
    }
  }
  load() {
    return __async(this, null, function* () {
      const { data, error } = yield supabase.rpc("get_leaderboard", { p_limit: 50 });
      if (error || !data) {
        this.error.set(true);
      } else {
        this.entries.set(data);
      }
      this.loading.set(false);
    });
  }
  levelInfo(levelId) {
    return LEVELS.find((l) => l.id === levelId) ?? LEVELS[1];
  }
  medal(rank) {
    if (rank === 1)
      return "\u{1F947}";
    if (rank === 2)
      return "\u{1F948}";
    if (rank === 3)
      return "\u{1F949}";
    return String(rank);
  }
  static {
    this.\u0275fac = function LeaderboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LeaderboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeaderboardComponent, selectors: [["app-leaderboard"]], decls: 14, vars: 4, consts: [[1, "lb-page"], [1, "lb-header"], ["routerLink", "/malta", 1, "lb-back"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "15 18 9 12 15 6"], [1, "lb-title"], [1, "lb-subtitle"], ["class", "lb-loading", 4, "ngIf"], ["class", "lb-state", 4, "ngIf"], ["class", "lb-list", 4, "ngIf"], [1, "lb-loading"], ["class", "lb-skeleton", 4, "ngFor", "ngForOf"], [1, "lb-skeleton"], [1, "lb-state"], ["routerLink", "/malta", 1, "lb-cta"], [1, "lb-list"], ["class", "lb-entry", 3, "lb-entry--gold", "lb-entry--silver", "lb-entry--bronze", 4, "ngFor", "ngForOf"], [1, "lb-entry"], [1, "lb-rank"], ["size", "md", "shape", "circle", 3, "photoURL", "displayName", "level"], [1, "lb-info"], [1, "lb-name"], [1, "lb-level"], [1, "lb-xp"], [1, "lb-xp__val"], [1, "lb-xp__unit"]], template: function LeaderboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "polyline", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275text(5, " Back to map ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "h1", 5);
        \u0275\u0275text(7, "\u{1F3C6} Malta Explorers");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 6);
        \u0275\u0275text(9, "Top explorers ranked by level & XP");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(10, LeaderboardComponent_div_10_Template, 2, 2, "div", 7)(11, LeaderboardComponent_div_11_Template, 3, 0, "div", 8)(12, LeaderboardComponent_div_12_Template, 5, 0, "div", 8)(13, LeaderboardComponent_div_13_Template, 2, 1, "div", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.loading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading() && ctx.error());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading() && !ctx.error() && !ctx.entries().length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading() && ctx.entries().length);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, RouterModule, RouterLink, UserAvatarComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  background: var(--color-bg);\n}\n.lb-page[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 24px 16px 80px;\n}\n.lb-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 0.8rem;\n  color: var(--color-text-muted);\n  text-decoration: none;\n  margin-bottom: 20px;\n}\n.lb-back[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.lb-title[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: var(--color-text-base);\n  margin: 0 0 6px;\n}\n.lb-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--color-text-muted);\n  margin: 0 0 28px;\n}\n.lb-skeleton[_ngcontent-%COMP%] {\n  height: 62px;\n  border-radius: var(--radius-lg);\n  background:\n    linear-gradient(\n      90deg,\n      var(--color-bg-muted) 25%,\n      var(--color-bg-hover) 50%,\n      var(--color-bg-muted) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite;\n  margin-bottom: 10px;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.lb-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 0;\n  color: var(--color-text-muted);\n  font-size: 0.9rem;\n}\n.lb-cta[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 14px;\n  padding: 10px 20px;\n  background: var(--color-primary);\n  color: #fff;\n  border-radius: var(--radius-md);\n  font-size: 0.88rem;\n  font-weight: 600;\n  text-decoration: none;\n}\n.lb-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.lb-entry[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  border-radius: var(--radius-lg);\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n}\n.lb-entry--gold[_ngcontent-%COMP%] {\n  border-color: #f59e0b;\n  background: #fffbeb;\n}\n.lb-entry--silver[_ngcontent-%COMP%] {\n  border-color: #9ca3af;\n  background: #f9fafb;\n}\n.lb-entry--bronze[_ngcontent-%COMP%] {\n  border-color: #d97706;\n  background: #fffdf5;\n}\n.lb-rank[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 32px;\n  text-align: center;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: var(--color-text-muted);\n}\n.lb-rank--medal[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.lb-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.lb-name[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--color-text-base);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.lb-level[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n}\n.lb-xp[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 1px;\n}\n.lb-xp__val[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.lb-xp__unit[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  letter-spacing: 0.05em;\n}\n/*# sourceMappingURL=leaderboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeaderboardComponent, { className: "LeaderboardComponent", filePath: "src/app/map/features/leaderboard/leaderboard.component.ts", lineNumber: 25 });
})();
export {
  LeaderboardComponent
};
//# sourceMappingURL=chunk-EY72XYQT.js.map
