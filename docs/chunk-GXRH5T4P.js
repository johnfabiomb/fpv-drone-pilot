import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-DMA37V7A.js";
import {
  AnalyticsService,
  GroupsService
} from "./chunk-ICA2IC5M.js";
import {
  PanelShellComponent
} from "./chunk-WK3JL2DF.js";
import "./chunk-3PSU7TQQ.js";
import {
  AuthService
} from "./chunk-B55ERDNS.js";
import {
  SeoService
} from "./chunk-5OB6OUFV.js";
import {
  locations
} from "./chunk-ZGA5L2H3.js";
import {
  MapBridgeService
} from "./chunk-MJA2VSFQ.js";
import {
  takeUntilDestroyed
} from "./chunk-VNFAWDNY.js";
import {
  Router,
  RouterLink
} from "./chunk-NTCFQ4HP.js";
import "./chunk-FNGRSLW3.js";
import {
  CommonModule,
  DatePipe,
  DestroyRef,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  __async,
  computed,
  effect,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UX7WDOQ6.js";

// src/app/components/member-avatars/member-avatars.component.ts
function MemberAvatarsComponent_img_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 3);
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("z-index", ctx_r2.visible().length - i_r2);
    \u0275\u0275property("src", p_r1.photoURL || "/assets/images/default-avatar.svg", \u0275\u0275sanitizeUrl)("alt", p_r1.displayName);
  }
}
function MemberAvatarsComponent_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", ctx_r2.overflow(), "");
  }
}
var MemberAvatarsComponent = class _MemberAvatarsComponent {
  constructor() {
    this._previews = signal([]);
    this._total = signal(0);
    this.visible = computed(() => this._previews().slice(0, 5));
    this.overflow = computed(() => Math.max(0, this._total() - this.visible().length));
  }
  set previews(v) {
    this._previews.set(v ?? []);
  }
  set total(v) {
    this._total.set(v ?? 0);
  }
  static {
    this.\u0275fac = function MemberAvatarsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MemberAvatarsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MemberAvatarsComponent, selectors: [["app-member-avatars"]], inputs: { previews: "previews", total: "total" }, decls: 3, vars: 2, consts: [[1, "avatars"], ["class", "avatars__bubble", "width", "28", "height", "28", "referrerpolicy", "no-referrer", 3, "src", "alt", "z-index", 4, "ngFor", "ngForOf"], ["class", "avatars__more", 4, "ngIf"], ["width", "28", "height", "28", "referrerpolicy", "no-referrer", 1, "avatars__bubble", 3, "src", "alt"], [1, "avatars__more"]], template: function MemberAvatarsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, MemberAvatarsComponent_img_1_Template, 1, 4, "img", 1)(2, MemberAvatarsComponent_span_2_Template, 2, 1, "span", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.visible());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.overflow() > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], styles: ["\n\n.avatars[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.avatars__bubble[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid var(--color-bg);\n  box-sizing: border-box;\n  flex-shrink: 0;\n}\n.avatars__bubble[_ngcontent-%COMP%]    + .avatars__bubble[_ngcontent-%COMP%] {\n  margin-left: -8px;\n}\n.avatars__more[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--color-bg-muted);\n  border: 2px solid var(--color-bg);\n  box-sizing: border-box;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-left: -8px;\n}\n/*# sourceMappingURL=member-avatars.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MemberAvatarsComponent, { className: "MemberAvatarsComponent", filePath: "src/app/components/member-avatars/member-avatars.component.ts", lineNumber: 57 });
})();

// src/app/components/group-card/group-card.component.ts
var _c0 = (a0) => ["/malta/groups", a0];
function GroupCardComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap("group-card__status--" + ctx_r0.group.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.group.status);
  }
}
var GroupCardComponent = class _GroupCardComponent {
  shortName(fullName) {
    const parts = fullName.trim().split(" ");
    if (parts.length === 1)
      return fullName;
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  }
  static {
    this.\u0275fac = function GroupCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupCardComponent, selectors: [["app-group-card"]], inputs: { group: "group" }, decls: 32, vars: 20, consts: [[1, "group-card", 3, "routerLink"], [1, "group-card__top"], ["width", "36", "height", "36", "referrerpolicy", "no-referrer", 1, "group-card__avatar", 3, "src", "alt"], [1, "group-card__main"], [1, "group-card__title-row"], [1, "group-card__title"], ["class", "group-card__status", 3, "class", 4, "ngIf"], [1, "group-card__date"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], [1, "group-card__divider"], [1, "group-card__bottom"], [1, "group-card__meta-row"], [1, "badge"], [1, "group-card__leader"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], [1, "group-card__members"], [3, "previews", "total"], [1, "group-card__count"], [1, "group-card__count-label"], [1, "group-card__status"]], template: function GroupCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "a", 0)(1, "div", 1);
        \u0275\u0275element(2, "img", 2);
        \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "span", 5);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275template(7, GroupCardComponent_span_7_Template, 2, 3, "span", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "span", 7);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 8);
        \u0275\u0275element(10, "rect", 9)(11, "line", 10)(12, "line", 11)(13, "line", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275text(14);
        \u0275\u0275pipe(15, "date");
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(16, "div", 13);
        \u0275\u0275elementStart(17, "div", 14)(18, "div", 15)(19, "span", 16);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 17);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(22, "svg", 8);
        \u0275\u0275element(23, "path", 18)(24, "circle", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275text(25);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(26, "div", 20);
        \u0275\u0275element(27, "app-member-avatars", 21);
        \u0275\u0275elementStart(28, "span", 22);
        \u0275\u0275text(29);
        \u0275\u0275elementStart(30, "span", 23);
        \u0275\u0275text(31, "joining");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(18, _c0, ctx.group.id));
        \u0275\u0275advance(2);
        \u0275\u0275property("src", ctx.group.leaderPhoto || "/assets/images/default-avatar.svg", \u0275\u0275sanitizeUrl)("alt", ctx.group.leaderName);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.group.title);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.group.status !== "open");
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(15, 15, ctx.group.date.toDate(), "EEE d MMM"), " \xB7 ", ctx.group.time, " ");
        \u0275\u0275advance(5);
        \u0275\u0275classMap("badge--" + ctx.group.difficulty);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.group.difficulty);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.shortName(ctx.group.leaderName), " leading ");
        \u0275\u0275advance(2);
        \u0275\u0275property("previews", ctx.group.memberPreviews)("total", ctx.group.memberCount);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate2(" ", ctx.group.memberCount, "", ctx.group.maxMembers ? " / " + ctx.group.maxMembers : "", " ");
      }
    }, dependencies: [CommonModule, NgIf, DatePipe, RouterLink, MemberAvatarsComponent], styles: ["\n\n.group-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 14px;\n  text-decoration: none;\n  transition: box-shadow var(--transition), border-color var(--transition);\n  cursor: pointer;\n}\n.group-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.09);\n  border-color: rgba(244, 169, 34, 0.5);\n}\n.group-card__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.group-card__avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  border: 2px solid var(--color-bg-muted);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);\n}\n.group-card__main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.group-card__title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 7px;\n}\n.group-card__title[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  line-height: 1.3;\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.group-card__date[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.group-card__date[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  opacity: 0.7;\n}\n.group-card__status[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 20px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  margin-top: 1px;\n}\n.group-card__status--full[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.group-card__status--cancelled[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.group-card__status--completed[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n.group-card__divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--color-border);\n  margin-bottom: 10px;\n}\n.group-card__bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n}\n.group-card__meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.group-card__leader[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.group-card__leader[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  opacity: 0.6;\n}\n.group-card__members[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  flex-shrink: 0;\n}\n.group-card__count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-text-secondary);\n}\n.group-card__count-label[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-muted);\n}\n/*# sourceMappingURL=group-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupCardComponent, { className: "GroupCardComponent", filePath: "src/app/components/group-card/group-card.component.ts", lineNumber: 188 });
})();

// src/app/platform/explore-together/explore-together.component.ts
function ExploreTogetherComponent_div_10_ul_16_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 39);
    \u0275\u0275listener("click", function ExploreTogetherComponent_div_10_ul_16_li_1_Template_li_click_0_listener() {
      const s_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectSpot(s_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r4.title);
  }
}
function ExploreTogetherComponent_div_10_ul_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 37);
    \u0275\u0275template(1, ExploreTogetherComponent_div_10_ul_16_li_1_Template, 2, 1, "li", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.spotResults());
  }
}
function ExploreTogetherComponent_div_10_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 41);
    \u0275\u0275element(2, "polyline", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formSpotTitle, " ");
  }
}
function ExploreTogetherComponent_div_10_p_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function ExploreTogetherComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "h3", 14);
    \u0275\u0275text(3, "Create a hiking group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 15);
    \u0275\u0275listener("click", function ExploreTogetherComponent_div_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelCreate());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 16);
    \u0275\u0275element(6, "line", 17)(7, "line", 18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 19)(9, "label");
    \u0275\u0275text(10, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function ExploreTogetherComponent_div_10_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formTitle, $event) || (ctx_r1.formTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 21)(13, "label");
    \u0275\u0275text(14, "Spot");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function ExploreTogetherComponent_div_10_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formSpotSearch, $event) || (ctx_r1.formSpotSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ExploreTogetherComponent_div_10_Template_input_input_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSpotSearchInput());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ExploreTogetherComponent_div_10_ul_16_Template, 2, 1, "ul", 23)(17, ExploreTogetherComponent_div_10_span_17_Template, 4, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 25)(19, "div", 19)(20, "label");
    \u0275\u0275text(21, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function ExploreTogetherComponent_div_10_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formDate, $event) || (ctx_r1.formDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 19)(24, "label");
    \u0275\u0275text(25, "Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function ExploreTogetherComponent_div_10_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formTime, $event) || (ctx_r1.formTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 19)(28, "label");
    \u0275\u0275text(29, "Difficulty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 28)(31, "span", 29);
    \u0275\u0275listener("click", function ExploreTogetherComponent_div_10_Template_span_click_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.formDifficulty = "easy");
    });
    \u0275\u0275text(32, "Easy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 29);
    \u0275\u0275listener("click", function ExploreTogetherComponent_div_10_Template_span_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.formDifficulty = "moderate");
    });
    \u0275\u0275text(34, "Moderate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 29);
    \u0275\u0275listener("click", function ExploreTogetherComponent_div_10_Template_span_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.formDifficulty = "hard");
    });
    \u0275\u0275text(36, "Hard");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 19)(38, "label");
    \u0275\u0275text(39, "Description ");
    \u0275\u0275elementStart(40, "span", 30);
    \u0275\u0275text(41, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "textarea", 31);
    \u0275\u0275twoWayListener("ngModelChange", function ExploreTogetherComponent_div_10_Template_textarea_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formDescription, $event) || (ctx_r1.formDescription = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 19)(44, "label");
    \u0275\u0275text(45, "Max members ");
    \u0275\u0275elementStart(46, "span", 30);
    \u0275\u0275text(47, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function ExploreTogetherComponent_div_10_Template_input_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formMaxMembers, $event) || (ctx_r1.formMaxMembers = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(49, ExploreTogetherComponent_div_10_p_49_Template, 2, 1, "p", 33);
    \u0275\u0275elementStart(50, "div", 34)(51, "button", 35);
    \u0275\u0275listener("click", function ExploreTogetherComponent_div_10_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelCreate());
    });
    \u0275\u0275text(52, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "button", 36);
    \u0275\u0275listener("click", function ExploreTogetherComponent_div_10_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitCreate());
    });
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTitle);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formSpotSearch);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.spotResults().length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formSpotSlug);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formDate);
    \u0275\u0275property("min", ctx_r1.todayMin);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTime);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r1.formDifficulty === "easy");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.formDifficulty === "moderate");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.formDifficulty === "hard");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formDescription);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formMaxMembers);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formError());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.formSubmitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formSubmitting() ? "Creating\u2026" : "Create group", " ");
  }
}
function ExploreTogetherComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "span", 45)(2, "span", 45)(3, "span", 45);
    \u0275\u0275elementEnd();
  }
}
function ExploreTogetherComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47);
    \u0275\u0275text(2, "\u{1F97E}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 48);
    \u0275\u0275text(4, "No upcoming groups yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 49);
    \u0275\u0275text(6, "Create one and invite others to explore Malta with you");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 50);
    \u0275\u0275listener("click", function ExploreTogetherComponent_div_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreateForm());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 5);
    \u0275\u0275element(9, "line", 6)(10, "line", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Create the first group ");
    \u0275\u0275elementEnd()();
  }
}
function ExploreTogetherComponent_div_13_app_group_card_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-group-card", 54);
  }
  if (rf & 2) {
    const group_r6 = ctx.$implicit;
    \u0275\u0275property("group", group_r6);
  }
}
function ExploreTogetherComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ExploreTogetherComponent_div_13_app_group_card_3_Template, 1, 1, "app-group-card", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.groupsService.openGroups().length, " upcoming group", ctx_r1.groupsService.openGroups().length === 1 ? "" : "s", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.groupsService.openGroups());
  }
}
var ExploreTogetherComponent = class _ExploreTogetherComponent {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.router = inject(Router);
    this.seo = inject(SeoService);
    this.analytics = inject(AnalyticsService);
    this.bridge = inject(MapBridgeService);
    this.groupsService = inject(GroupsService);
    this.authService = inject(AuthService);
    this.showCreateForm = signal(false);
    this.formError = signal(null);
    this.formSubmitting = signal(false);
    this.spotResults = signal([]);
    this.formTitle = "";
    this.formDate = "";
    this.formTime = "08:00";
    this.formDescription = "";
    this.formDifficulty = "easy";
    this.formMaxMembers = "";
    this.formSpotSearch = "";
    this.formSpotSlug = "";
    this.formSpotTitle = "";
    this.formSpotLat = 0;
    this.formSpotLon = 0;
    this.allSpots = locations.map((l) => ({
      slug: l.slug,
      title: l.title,
      lat: l.lat,
      lon: l.lon
    }));
    effect(() => {
      this.bridge.providerPins.set(this.groupsService.groupsAsProviderPins());
    });
  }
  ngOnInit() {
    this.seo.setPage("groups");
    if (!isPlatformBrowser(this.platformId))
      return;
    this.groupsService.startGroupsListener();
    this.bridge.enterPanelMode(this.groupsService.groupsAsProviderPins());
    this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => {
      if (p.category === "group") {
        this.router.navigate(["/malta/groups", p.id]);
      }
    });
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta/locations", loc.slug]);
    });
    this.analytics.pageView(window.location.href, "Explore Together");
  }
  ngOnDestroy() {
    this.groupsService.stopGroupsListener();
  }
  // ── Spot search ───────────────────────────────────────────────────────────
  onSpotSearchInput() {
    const q = this.formSpotSearch.trim().toLowerCase();
    if (!q) {
      this.spotResults.set([]);
      return;
    }
    this.spotResults.set(this.allSpots.filter((s) => s.title.toLowerCase().includes(q)).slice(0, 6));
  }
  selectSpot(spot) {
    this.formSpotSlug = spot.slug;
    this.formSpotTitle = spot.title;
    this.formSpotLat = spot.lat;
    this.formSpotLon = spot.lon;
    this.formSpotSearch = spot.title;
    this.spotResults.set([]);
  }
  // ── Create form ───────────────────────────────────────────────────────────
  openCreateForm() {
    if (!this.authService.isLoggedIn()) {
      this.authService.openLoginModal();
      return;
    }
    this.showCreateForm.set(true);
  }
  cancelCreate() {
    this.showCreateForm.set(false);
    this.formError.set(null);
    this.resetForm();
  }
  submitCreate() {
    return __async(this, null, function* () {
      if (!this.formTitle.trim() || !this.formSpotSlug || !this.formDate) {
        this.formError.set("Please fill in title, spot, and date.");
        return;
      }
      const dateObj = /* @__PURE__ */ new Date(this.formDate + "T" + this.formTime);
      if (isNaN(dateObj.getTime())) {
        this.formError.set("Invalid date or time.");
        return;
      }
      const payload = {
        title: this.formTitle.trim(),
        spotSlug: this.formSpotSlug,
        spotTitle: this.formSpotTitle,
        spotLat: this.formSpotLat,
        spotLon: this.formSpotLon,
        date: dateObj,
        time: this.formTime,
        description: this.formDescription.trim(),
        difficulty: this.formDifficulty,
        maxMembers: this.formMaxMembers ? parseInt(this.formMaxMembers, 10) : null
      };
      this.formError.set(null);
      this.formSubmitting.set(true);
      try {
        const groupId = yield this.groupsService.createGroup(payload);
        this.showCreateForm.set(false);
        this.resetForm();
        this.router.navigate(["/malta/groups", groupId]);
      } catch (e) {
        this.formError.set(e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        this.formSubmitting.set(false);
      }
    });
  }
  onEscape() {
    if (this.showCreateForm())
      this.cancelCreate();
  }
  get todayMin() {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  resetForm() {
    this.formTitle = "";
    this.formDate = "";
    this.formTime = "08:00";
    this.formDescription = "";
    this.formDifficulty = "easy";
    this.formMaxMembers = "";
    this.formSpotSearch = "";
    this.formSpotSlug = "";
    this.formSpotTitle = "";
    this.formSpotLat = 0;
    this.formSpotLon = 0;
    this.spotResults.set([]);
  }
  static {
    this.\u0275fac = function ExploreTogetherComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ExploreTogetherComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExploreTogetherComponent, selectors: [["app-explore-together"]], hostBindings: function ExploreTogetherComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown.escape", function ExploreTogetherComponent_keydown_escape_HostBindingHandler() {
          return ctx.onEscape();
        }, false, \u0275\u0275resolveDocument);
      }
    }, decls: 14, vars: 4, consts: [["title", "Explore Together", 3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd"], [1, "et-intro"], [1, "et-intro__text"], [1, "et-intro__desc"], [1, "et-create-btn", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["class", "et-form", 4, "ngIf"], ["class", "et-loading", 4, "ngIf"], ["class", "et-empty", 4, "ngIf"], ["class", "et-list", 4, "ngIf"], [1, "et-form"], [1, "et-form__header"], [1, "et-form__title"], ["aria-label", "Cancel", 1, "et-form__close", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "et-form__field"], ["type", "text", "placeholder", "e.g. Blue Grotto sunrise hike", "maxlength", "80", 3, "ngModelChange", "ngModel"], [1, "et-form__field", "et-form__field--spot"], ["type", "text", "placeholder", "Search a location\u2026", "autocomplete", "off", 3, "ngModelChange", "input", "ngModel"], ["class", "et-spot-results", 4, "ngIf"], ["class", "et-form__selected-spot", 4, "ngIf"], [1, "et-form__row"], ["type", "date", 3, "ngModelChange", "ngModel", "min"], ["type", "time", 3, "ngModelChange", "ngModel"], [1, "et-form__chips"], [1, "chip", 3, "click"], [1, "et-form__opt"], ["rows", "3", "maxlength", "400", "placeholder", "What's the plan? Anything to know beforehand?", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "2", "max", "50", "placeholder", "Unlimited", 3, "ngModelChange", "ngModel"], ["class", "et-form__error", 4, "ngIf"], [1, "et-form__actions"], [1, "et-form__cancel", 3, "click"], [1, "et-form__submit", 3, "click", "disabled"], [1, "et-spot-results"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "et-form__selected-spot"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["points", "20 6 9 17 4 12"], [1, "et-form__error"], [1, "et-loading"], [1, "et-loading__dot"], [1, "et-empty"], [1, "et-empty__icon"], [1, "et-empty__msg"], [1, "et-empty__sub"], [1, "et-empty__cta", 3, "click"], [1, "et-list"], [1, "et-list__count"], [3, "group", 4, "ngFor", "ngForOf"], [3, "group"]], template: function ExploreTogetherComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function ExploreTogetherComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.bridge.panelOpen.set(false);
        })("dragStart", function ExploreTogetherComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function ExploreTogetherComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function ExploreTogetherComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function ExploreTogetherComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function ExploreTogetherComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function ExploreTogetherComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "p", 3);
        \u0275\u0275text(4, "Find fellow explorers for Malta's best spots \u2014 join a group or start your own.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "button", 4);
        \u0275\u0275listener("click", function ExploreTogetherComponent_Template_button_click_5_listener() {
          return ctx.openCreateForm();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(6, "svg", 5);
        \u0275\u0275element(7, "line", 6)(8, "line", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275text(9, " New group ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(10, ExploreTogetherComponent_div_10_Template, 55, 18, "div", 8)(11, ExploreTogetherComponent_div_11_Template, 4, 0, "div", 9)(12, ExploreTogetherComponent_div_12_Template, 12, 0, "div", 10)(13, ExploreTogetherComponent_div_13_Template, 4, 3, "div", 11);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.showCreateForm());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.groupsService.loading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.groupsService.loading() && ctx.groupsService.openGroups().length === 0 && !ctx.showCreateForm());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.groupsService.loading() && ctx.groupsService.openGroups().length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, PanelShellComponent, GroupCardComponent], styles: ["\n\n.et-intro[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 12px 14px;\n  margin-bottom: 18px;\n}\n.et-intro__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n  min-width: 0;\n}\n.et-intro__desc[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  margin: 0;\n  line-height: 1.45;\n}\n.et-create-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 8px 13px;\n  font-weight: 700;\n  font-size: 12.5px;\n  cursor: pointer;\n  flex-shrink: 0;\n  white-space: nowrap;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.28);\n  transition: opacity var(--transition), box-shadow var(--transition);\n}\n.et-create-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  box-shadow: 0 4px 12px rgba(244, 169, 34, 0.38);\n}\n.et-form[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 16px;\n  margin-bottom: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  animation: _ngcontent-%COMP%_etSlideDown 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_etSlideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.et-form__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.et-form__title[_ngcontent-%COMP%] {\n  font-size: 14.5px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0;\n}\n.et-form__close[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  border: none;\n  border-radius: 50%;\n  width: 26px;\n  height: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--color-text-muted);\n  transition: background var(--transition);\n}\n.et-form__close[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.et-form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  position: relative;\n}\n.et-form__field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  letter-spacing: 0.01em;\n}\n.et-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.et-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 9px 11px;\n  font-size: 13.5px;\n  color: var(--color-text-base);\n  outline: none;\n  transition: border-color var(--transition);\n  font-family: inherit;\n  width: 100%;\n  box-sizing: border-box;\n}\n.et-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.et-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n}\n.et-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.et-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-text-light);\n}\n.et-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 72px;\n}\n.et-form__opt[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-muted);\n  font-size: 11px;\n}\n.et-form__row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.et-form__chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.et-spot-results[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 2px);\n  left: 0;\n  right: 0;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  box-shadow: var(--shadow-md);\n  z-index: 10;\n  list-style: none;\n  margin: 0;\n  padding: 4px 0;\n  max-height: 180px;\n  overflow-y: auto;\n}\n.et-spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.et-spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.et-form__selected-spot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11.5px;\n  color: #059669;\n  font-weight: 600;\n  margin-top: 2px;\n}\n.et-form__error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #dc2626;\n  background: #fef2f2;\n  border-radius: var(--radius-md);\n  padding: 8px 10px;\n  margin: 0;\n}\n.et-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  padding-top: 2px;\n  border-top: 1px solid var(--color-border);\n}\n.et-form__cancel[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition: color var(--transition);\n}\n.et-form__cancel[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.et-form__submit[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 9px 18px;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.et-form__submit[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.et-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.et-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.et-list__count[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 2px;\n}\n.et-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 36px 20px 32px;\n  text-align: center;\n  border: 1.5px dashed var(--color-border);\n  border-radius: var(--radius-xl);\n  background: var(--color-bg-light);\n}\n.et-empty__icon[_ngcontent-%COMP%] {\n  font-size: 38px;\n  line-height: 1;\n  margin-bottom: 14px;\n  filter: grayscale(20%);\n}\n.et-empty__msg[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0 0 6px;\n  letter-spacing: -0.2px;\n}\n.et-empty__sub[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  margin: 0 0 20px;\n  line-height: 1.5;\n  max-width: 240px;\n}\n.et-empty__cta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 10px 20px;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.3);\n  transition: opacity var(--transition);\n}\n.et-empty__cta[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.et-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  padding: 40px 0;\n}\n.et-loading__dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  animation: _ngcontent-%COMP%_etDotPulse 1.2s ease-in-out infinite;\n}\n.et-loading__dot[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.et-loading__dot[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_etDotPulse {\n  0%, 80%, 100% {\n    opacity: 0.25;\n    transform: scale(0.75);\n  }\n  40% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n/*# sourceMappingURL=explore-together.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExploreTogetherComponent, { className: "ExploreTogetherComponent", filePath: "src/app/platform/explore-together/explore-together.component.ts", lineNumber: 29 });
})();
export {
  ExploreTogetherComponent
};
//# sourceMappingURL=chunk-GXRH5T4P.js.map
