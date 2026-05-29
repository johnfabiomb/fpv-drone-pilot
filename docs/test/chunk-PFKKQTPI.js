import {
  AlreadyHasActiveGroupError,
  GroupsService,
  MemberAvatarsComponent
} from "./chunk-N6BDKNKS.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-TOLKKFSR.js";
import {
  UserAvatarComponent
} from "./chunk-O7RR7VM6.js";
import {
  AuthService
} from "./chunk-3P7EVM2E.js";
import {
  locations
} from "./chunk-ZGA5L2H3.js";
import {
  MapBridgeService
} from "./chunk-A5AJB22R.js";
import {
  takeUntilDestroyed
} from "./chunk-KCTK3G3F.js";
import {
  Router,
  RouterLink
} from "./chunk-QWUZPIEQ.js";
import {
  CommonModule,
  DatePipe,
  DestroyRef,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  __async,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
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
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-EBDCVLEQ.js";

// src/app/components/group-card/group-card.component.ts
var _c0 = (a0) => ["/malta/groups", a0];
function GroupCardComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
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
function GroupCardComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap("group-card__when--" + ctx_r0.whenVariant);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.whenLabel);
  }
}
var GroupCardComponent = class _GroupCardComponent {
  get whenLabel() {
    if (this.group.status === "exploring")
      return "\u{1F9ED} Exploring now";
    if (this.group.status === "completed")
      return "Completed";
    if (this.group.status === "cancelled")
      return "Cancelled";
    const dt = this.group.date.toDate();
    const [h, m] = this.group.time.split(":").map(Number);
    dt.setHours(h, m, 0, 0);
    const diffMs = dt.getTime() - Date.now();
    const diffH = diffMs / 36e5;
    const diffD = diffMs / 864e5;
    if (diffMs < 0) {
      const agoH = Math.abs(diffH);
      if (agoH < 1)
        return "Just now";
      if (agoH < 24)
        return `${Math.round(agoH)}h ago`;
      const agoD = Math.round(Math.abs(diffD));
      return agoD === 1 ? "Yesterday" : `${agoD} days ago`;
    }
    if (diffH < 2)
      return "Starting soon!";
    const today = /* @__PURE__ */ new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (dt.toDateString() === today.toDateString())
      return "Today";
    if (dt.toDateString() === tomorrow.toDateString())
      return "Tomorrow";
    if (diffD < 7)
      return `In ${Math.ceil(diffD)} days`;
    return null;
  }
  get whenVariant() {
    const s = this.group.status;
    if (s === "exploring")
      return "exploring";
    if (s === "completed" || s === "cancelled")
      return "past";
    const dt = this.group.date.toDate();
    const [h, m] = this.group.time.split(":").map(Number);
    dt.setHours(h, m, 0, 0);
    const diffMs = dt.getTime() - Date.now();
    if (diffMs < 0)
      return "past";
    const diffH = diffMs / 36e5;
    if (diffH < 2)
      return "soon";
    const today = /* @__PURE__ */ new Date();
    if (dt.toDateString() === today.toDateString())
      return "today";
    return "upcoming";
  }
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupCardComponent, selectors: [["app-group-card"]], inputs: { group: "group" }, decls: 34, vars: 23, consts: [[1, "group-card", 3, "routerLink"], [1, "group-card__top"], ["size", "md", "shape", "circle", "roleLabel", "\u{1F451} Group leader", 3, "photoURL", "displayName", "level", "isAdmin"], [1, "group-card__main"], [1, "group-card__title-row"], [1, "group-card__title"], ["class", "group-card__status", 3, "class", 4, "ngIf"], [1, "group-card__date-row"], [1, "group-card__date"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], ["class", "group-card__when", 3, "class", 4, "ngIf"], [1, "group-card__divider"], [1, "group-card__bottom"], [1, "group-card__meta-row"], [1, "badge"], [1, "group-card__leader"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], [1, "group-card__members"], [3, "previews", "total"], [1, "group-card__count"], [1, "group-card__count-label"], [1, "group-card__status"], [1, "group-card__when"]], template: function GroupCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "a", 0)(1, "div", 1);
        \u0275\u0275element(2, "app-user-avatar", 2);
        \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "span", 5);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275template(7, GroupCardComponent_span_7_Template, 2, 3, "span", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 7)(9, "span", 8);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(10, "svg", 9);
        \u0275\u0275element(11, "rect", 10)(12, "line", 11)(13, "line", 12)(14, "line", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275text(15);
        \u0275\u0275pipe(16, "date");
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, GroupCardComponent_span_17_Template, 2, 3, "span", 14);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(18, "div", 15);
        \u0275\u0275elementStart(19, "div", 16)(20, "div", 17)(21, "span", 18);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span", 19);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(24, "svg", 9);
        \u0275\u0275element(25, "path", 20)(26, "circle", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275text(27);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(28, "div", 22);
        \u0275\u0275element(29, "app-member-avatars", 23);
        \u0275\u0275elementStart(30, "span", 24);
        \u0275\u0275text(31);
        \u0275\u0275elementStart(32, "span", 25);
        \u0275\u0275text(33, "joining");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(21, _c0, ctx.group.id));
        \u0275\u0275advance(2);
        \u0275\u0275property("photoURL", ctx.group.leaderPhoto)("displayName", ctx.group.leaderName)("level", ctx.group.leaderIsAdmin ? 6 : 1)("isAdmin", ctx.group.leaderIsAdmin);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.group.title);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.group.status !== "open");
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(16, 18, ctx.group.date.toDate(), "EEE d MMM"), " \xB7 ", ctx.group.time, " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.whenLabel);
        \u0275\u0275advance(4);
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
    }, dependencies: [CommonModule, NgIf, DatePipe, RouterLink, MemberAvatarsComponent, UserAvatarComponent], styles: ["\n\n.group-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 14px;\n  text-decoration: none;\n  transition: box-shadow var(--transition), border-color var(--transition);\n  cursor: pointer;\n}\n.group-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.09);\n  border-color: rgba(244, 169, 34, 0.5);\n}\n.group-card__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.group-card__main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.group-card__title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 7px;\n}\n.group-card__title[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  line-height: 1.3;\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.group-card__date[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.group-card__date[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  opacity: 0.7;\n}\n.group-card__status[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 20px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  margin-top: 1px;\n}\n.group-card__status--full[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.group-card__status--exploring[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1d4ed8;\n}\n.group-card__status--cancelled[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.group-card__status--completed[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n.group-card__divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--color-border);\n  margin-bottom: 10px;\n}\n.group-card__bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n}\n.group-card__meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.group-card__leader[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.group-card__leader[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  opacity: 0.6;\n}\n.group-card__members[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  flex-shrink: 0;\n}\n.group-card__count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-text-secondary);\n}\n.group-card__count-label[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-muted);\n}\n.group-card__date-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  flex-wrap: wrap;\n}\n.group-card__when[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 20px;\n  white-space: nowrap;\n}\n.group-card__when--upcoming[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n}\n.group-card__when--today[_ngcontent-%COMP%] {\n  background: #fef9c3;\n  color: #a16207;\n}\n.group-card__when--soon[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #b45309;\n}\n.group-card__when--exploring[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1d4ed8;\n}\n.group-card__when--past[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n/*# sourceMappingURL=group-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupCardComponent, { className: "GroupCardComponent", filePath: "src/app/components/group-card/group-card.component.ts", lineNumber: 208 });
})();

// src/app/components/groups-section/groups-section.component.ts
function GroupsSectionComponent_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1, " Find fellow explorers for Malta's best spots \u2014 join a group or start your own. ");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1, " Planning a visit to ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, "? Join a group or start your own. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.lockedLocation.title);
  }
}
function GroupsSectionComponent_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function GroupsSectionComponent_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openCreateForm());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "line", 14)(3, "line", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " New group ");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function GroupsSectionComponent_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.authService.openLoginModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 17);
    \u0275\u0275element(2, "rect", 18)(3, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Sign in to join ");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_div_6_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 46);
    \u0275\u0275element(2, "path", 47)(3, "circle", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.lockedLocation.title, " ");
  }
}
function GroupsSectionComponent_div_6_div_16_ul_2_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 55);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_6_div_16_ul_2_li_1_Template_li_click_0_listener() {
      const s_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.selectSpot(s_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r7.title);
  }
}
function GroupsSectionComponent_div_6_div_16_ul_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 53);
    \u0275\u0275template(1, GroupsSectionComponent_div_6_div_16_ul_2_li_1_Template, 2, 1, "li", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.spotResults());
  }
}
function GroupsSectionComponent_div_6_div_16_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 57);
    \u0275\u0275element(2, "polyline", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formSpotTitle, " ");
  }
}
function GroupsSectionComponent_div_6_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_div_6_div_16_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.formSpotSearch, $event) || (ctx_r0.formSpotSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function GroupsSectionComponent_div_6_div_16_Template_input_input_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onSpotSearchInput());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(2, GroupsSectionComponent_div_6_div_16_ul_2_Template, 2, 1, "ul", 51)(3, GroupsSectionComponent_div_6_div_16_span_3_Template, 4, 1, "span", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formSpotSearch);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.spotResults().length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.formSpotSlug);
  }
}
function GroupsSectionComponent_div_6_div_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "button", 60);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_6_div_53_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.startPickingMeetingPoint());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 17);
    \u0275\u0275element(3, "path", 47)(4, "circle", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("picking", ctx_r0.pickingMeetingPoint());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.pickingMeetingPoint() ? "Tap anywhere on the map\u2026" : "Pin on map", " ");
  }
}
function GroupsSectionComponent_div_6_div_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 17);
    \u0275\u0275element(2, "polyline", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Meeting point set ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "button", 62);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_6_div_54_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.clearMeetingPoint());
    });
    \u0275\u0275text(5, "Remove");
    \u0275\u0275elementEnd()();
  }
}
function GroupsSectionComponent_div_6_p_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.formError());
  }
}
function GroupsSectionComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "h3", 22);
    \u0275\u0275text(3, "Create a group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 23);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_6_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelCreate());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 24);
    \u0275\u0275element(6, "line", 25)(7, "line", 26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 27)(9, "label");
    \u0275\u0275text(10, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_div_6_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formTitle, $event) || (ctx_r0.formTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 27)(13, "label");
    \u0275\u0275text(14, "Spot");
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, GroupsSectionComponent_div_6_div_15_Template, 5, 1, "div", 29)(16, GroupsSectionComponent_div_6_div_16_Template, 4, 3, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 31)(18, "div", 27)(19, "label");
    \u0275\u0275text(20, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_div_6_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formDate, $event) || (ctx_r0.formDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 27)(23, "label");
    \u0275\u0275text(24, "Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_div_6_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formTime, $event) || (ctx_r0.formTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 27)(27, "label");
    \u0275\u0275text(28, "Difficulty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 34)(30, "span", 35);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_6_Template_span_click_30_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.formDifficulty = "easy");
    });
    \u0275\u0275text(31, "Easy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 35);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_6_Template_span_click_32_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.formDifficulty = "moderate");
    });
    \u0275\u0275text(33, "Moderate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 35);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_6_Template_span_click_34_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.formDifficulty = "hard");
    });
    \u0275\u0275text(35, "Hard");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 27)(37, "label");
    \u0275\u0275text(38, "Description ");
    \u0275\u0275elementStart(39, "span", 36);
    \u0275\u0275text(40, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "textarea", 37);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_div_6_Template_textarea_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formDescription, $event) || (ctx_r0.formDescription = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 27)(43, "label");
    \u0275\u0275text(44, "Max members ");
    \u0275\u0275elementStart(45, "span", 36);
    \u0275\u0275text(46, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_div_6_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formMaxMembers, $event) || (ctx_r0.formMaxMembers = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 27)(49, "label");
    \u0275\u0275text(50, "Meeting point ");
    \u0275\u0275elementStart(51, "span", 36);
    \u0275\u0275text(52, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(53, GroupsSectionComponent_div_6_div_53_Template, 6, 3, "div", 39)(54, GroupsSectionComponent_div_6_div_54_Template, 6, 0, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275template(55, GroupsSectionComponent_div_6_p_55_Template, 2, 1, "p", 41);
    \u0275\u0275elementStart(56, "div", 42)(57, "button", 43);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_6_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelCreate());
    });
    \u0275\u0275text(58, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "button", 44);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_6_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitCreate());
    });
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formTitle);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.lockedLocation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.lockedLocation);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formDate);
    \u0275\u0275property("min", ctx_r0.minDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formTime);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r0.formDifficulty === "easy");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.formDifficulty === "moderate");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.formDifficulty === "hard");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formDescription);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formMaxMembers);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", !ctx_r0.formMeetingPoint);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.formMeetingPoint);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.formError());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.formSubmitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formSubmitting() ? "Creating\u2026" : "Create group", " ");
  }
}
function GroupsSectionComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "span", 65)(2, "span", 65)(3, "span", 65);
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_div_8_app_group_card_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-group-card", 69);
  }
  if (rf & 2) {
    const g_r10 = ctx.$implicit;
    \u0275\u0275property("group", g_r10);
  }
}
function GroupsSectionComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "div", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupsSectionComponent_div_8_app_group_card_3_Template, 1, 1, "app-group-card", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.groups.length, " upcoming group", ctx_r0.groups.length === 1 ? "" : "s", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.groups);
  }
}
function GroupsSectionComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function GroupsSectionComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.authService.openLoginModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 71);
    \u0275\u0275element(2, "rect", 18)(3, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Sign in to join a group or create your own ");
    \u0275\u0275elementStart(5, "svg", 72);
    \u0275\u0275element(6, "polyline", 73);
    \u0275\u0275elementEnd()();
  }
}
function GroupsSectionComponent_div_10_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 79);
    \u0275\u0275text(1, "No upcoming groups yet");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_div_10_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 79);
    \u0275\u0275text(1, "No groups at this spot yet");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "div", 75);
    \u0275\u0275text(2, "\u{1F97E}");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupsSectionComponent_div_10_p_3_Template, 2, 0, "p", 76)(4, GroupsSectionComponent_div_10_p_4_Template, 2, 0, "p", 76);
    \u0275\u0275elementStart(5, "p", 77);
    \u0275\u0275text(6, "Be the first to organise one!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 78);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_10_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openCreateForm());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 13);
    \u0275\u0275element(9, "line", 14)(10, "line", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Create the first group ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r0.lockedLocation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.lockedLocation);
  }
}
function GroupsSectionComponent_div_11_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 79);
    \u0275\u0275text(1, "No upcoming groups yet");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_div_11_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 79);
    \u0275\u0275text(1, "No groups at this spot yet");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "div", 75);
    \u0275\u0275text(2, "\u{1F97E}");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupsSectionComponent_div_11_p_3_Template, 2, 0, "p", 76)(4, GroupsSectionComponent_div_11_p_4_Template, 2, 0, "p", 76);
    \u0275\u0275elementStart(5, "p", 77);
    \u0275\u0275text(6, "Sign in to be the first to organise one!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 80);
    \u0275\u0275listener("click", function GroupsSectionComponent_div_11_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.authService.openLoginModal());
    });
    \u0275\u0275text(8, "Sign in");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r0.lockedLocation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.lockedLocation);
  }
}
function GroupsSectionComponent_ng_container_12_div_1_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275element(1, "app-group-card", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("group", g_r15);
  }
}
function GroupsSectionComponent_ng_container_12_div_1_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89);
    \u0275\u0275template(1, GroupsSectionComponent_ng_container_12_div_1_div_8_div_1_Template, 2, 1, "div", 90);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.pastGroups);
  }
}
function GroupsSectionComponent_ng_container_12_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 82)(1, "button", 83);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_12_div_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.showPastGroups.set(!ctx_r0.showPastGroups()));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 71);
    \u0275\u0275element(3, "circle", 84)(4, "polyline", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "svg", 86);
    \u0275\u0275element(7, "polyline", 87);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, GroupsSectionComponent_ng_container_12_div_1_div_8_Template, 2, 1, "div", 88);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", ctx_r0.pastGroups.length, " past group", ctx_r0.pastGroups.length === 1 ? "" : "s", " this week ");
    \u0275\u0275advance();
    \u0275\u0275classProp("gs-past__chevron--open", ctx_r0.showPastGroups());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.showPastGroups());
  }
}
function GroupsSectionComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, GroupsSectionComponent_ng_container_12_div_1_Template, 9, 5, "div", 81);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.lockedLocation && ctx_r0.pastGroups.length > 0);
  }
}
var GroupsSectionComponent = class _GroupsSectionComponent {
  constructor() {
    this.bridge = inject(MapBridgeService);
    this.groupsService = inject(GroupsService);
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.destroyRef = inject(DestroyRef);
    this.platformId = inject(PLATFORM_ID);
    this.spotGroups = signal([]);
    this.loadingGroups = signal(false);
    this.showCreateForm = signal(false);
    this.formError = signal(null);
    this.formSubmitting = signal(false);
    this.spotResults = signal([]);
    this.pickingMeetingPoint = signal(false);
    this.showPastGroups = signal(false);
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
    this.formMeetingPoint = null;
    this.allSpots = locations.map((l) => ({
      slug: l.slug,
      title: l.title,
      lat: l.lat,
      lon: l.lon
    }));
  }
  get groups() {
    const all = this.lockedLocation ? this.spotGroups() : this.groupsService.openGroups();
    const uid = this.authService.user()?.uid;
    if (!uid)
      return all;
    return [...all].sort((a, b) => {
      if (a.leaderId === uid)
        return -1;
      if (b.leaderId === uid)
        return 1;
      return 0;
    });
  }
  get pastGroups() {
    return this.lockedLocation ? [] : this.groupsService.recentPastGroups();
  }
  get isLoading() {
    return this.lockedLocation ? this.loadingGroups() : this.groupsService.loading();
  }
  get minDate() {
    return new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString().split("T")[0];
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    if (this.lockedLocation) {
      this.loadingGroups.set(true);
      this.groupsService.fetchGroupsForSpot(this.lockedLocation.slug).then((groups) => {
        this.spotGroups.set(groups);
        this.loadingGroups.set(false);
      });
    }
    this.bridge.coordPicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ lat, lon }) => {
      if (!this.showCreateForm())
        return;
      this.formMeetingPoint = { lat, lon };
      this.bridge.meetingPointMarker.set({ lat, lon });
      this.bridge.pickMode.set(false);
      this.pickingMeetingPoint.set(false);
    });
  }
  ngOnDestroy() {
    if (this.showCreateForm()) {
      this.bridge.pickMode.set(false);
      this.bridge.meetingPointMarker.set(null);
    }
  }
  // ── Create form ───────────────────────────────────────────────────────────
  openCreateForm() {
    if (!this.authService.isLoggedIn()) {
      this.authService.openLoginModal();
      return;
    }
    if (this.lockedLocation) {
      this.formSpotSlug = this.lockedLocation.slug;
      this.formSpotTitle = this.lockedLocation.title;
      this.formSpotLat = this.lockedLocation.lat;
      this.formSpotLon = this.lockedLocation.lon;
      this.formSpotSearch = this.lockedLocation.title;
    }
    this.showCreateForm.set(true);
  }
  cancelCreate() {
    this.showCreateForm.set(false);
    this.formError.set(null);
    this.bridge.pickMode.set(false);
    this.bridge.meetingPointMarker.set(null);
    this.resetForm();
  }
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
  startPickingMeetingPoint() {
    this.pickingMeetingPoint.set(true);
    this.bridge.pickMode.set(true);
  }
  clearMeetingPoint() {
    this.formMeetingPoint = null;
    this.bridge.meetingPointMarker.set(null);
    this.pickingMeetingPoint.set(false);
    this.bridge.pickMode.set(false);
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
        maxMembers: this.formMaxMembers ? parseInt(this.formMaxMembers, 10) : null,
        meetingPoint: this.formMeetingPoint
      };
      this.formError.set(null);
      this.formSubmitting.set(true);
      try {
        const groupId = yield this.groupsService.createGroup(payload);
        this.showCreateForm.set(false);
        this.resetForm();
        this.router.navigate(["/malta/groups", groupId]);
      } catch (e) {
        this.formError.set(e instanceof AlreadyHasActiveGroupError || e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        this.formSubmitting.set(false);
      }
    });
  }
  resetForm() {
    this.formTitle = "";
    this.formDate = "";
    this.formTime = "08:00";
    this.formDescription = "";
    this.formDifficulty = "easy";
    this.formMaxMembers = "";
    this.formMeetingPoint = null;
    this.pickingMeetingPoint.set(false);
    this.spotResults.set([]);
    if (!this.lockedLocation) {
      this.formSpotSearch = "";
      this.formSpotSlug = "";
      this.formSpotTitle = "";
      this.formSpotLat = 0;
      this.formSpotLon = 0;
    }
  }
  static {
    this.\u0275fac = function GroupsSectionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupsSectionComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupsSectionComponent, selectors: [["app-groups-section"]], inputs: { lockedLocation: "lockedLocation" }, decls: 13, vars: 11, consts: [[1, "gs-intro"], [1, "gs-intro__text"], ["class", "gs-intro__desc", 4, "ngIf"], ["class", "gs-create-btn", 3, "click", 4, "ngIf"], ["class", "gs-create-btn gs-create-btn--locked", 3, "click", 4, "ngIf"], ["class", "gs-form", 4, "ngIf"], ["class", "gs-loading", 4, "ngIf"], ["class", "gs-list", 4, "ngIf"], ["class", "gs-join-strip", 3, "click", 4, "ngIf"], ["class", "gs-empty", 4, "ngIf"], [4, "ngIf"], [1, "gs-intro__desc"], [1, "gs-create-btn", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "gs-create-btn", "gs-create-btn--locked", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "gs-form"], [1, "gs-form__header"], [1, "gs-form__title"], ["aria-label", "Cancel", 1, "gs-form__close", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "gs-form__field"], ["type", "text", "placeholder", "e.g. Blue Grotto sunrise hike", "maxlength", "80", 3, "ngModelChange", "ngModel"], ["class", "gs-form__locked-spot", 4, "ngIf"], ["class", "gs-form__field--spot", 4, "ngIf"], [1, "gs-form__row"], ["type", "date", 3, "ngModelChange", "ngModel", "min"], ["type", "time", 3, "ngModelChange", "ngModel"], [1, "gs-form__chips"], [1, "chip", 3, "click"], [1, "gs-form__opt"], ["rows", "3", "maxlength", "400", "placeholder", "What's the plan? Anything to know beforehand?", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "2", "max", "50", "placeholder", "Unlimited", 3, "ngModelChange", "ngModel"], ["class", "gs-meeting-pick", 4, "ngIf"], ["class", "gs-meeting-set", 4, "ngIf"], ["class", "gs-form__error", 4, "ngIf"], [1, "gs-form__actions"], [1, "gs-form__cancel", 3, "click"], [1, "gs-form__submit", 3, "click", "disabled"], [1, "gs-form__locked-spot"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "gs-form__field--spot"], ["type", "text", "placeholder", "Search a location\u2026", "autocomplete", "off", 3, "ngModelChange", "input", "ngModel"], ["class", "gs-spot-results", 4, "ngIf"], ["class", "gs-form__selected-spot", 4, "ngIf"], [1, "gs-spot-results"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "gs-form__selected-spot"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["points", "20 6 9 17 4 12"], [1, "gs-meeting-pick"], [1, "gs-meeting-pick__btn", 3, "click"], [1, "gs-meeting-set"], [1, "gs-meeting-set__remove", 3, "click"], [1, "gs-form__error"], [1, "gs-loading"], [1, "gs-loading__dot"], [1, "gs-list"], [1, "gs-list__count"], [3, "group", 4, "ngFor", "ngForOf"], [3, "group"], [1, "gs-join-strip", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "gs-join-strip__chevron"], ["points", "9 18 15 12 9 6"], [1, "gs-empty"], [1, "gs-empty__icon"], ["class", "gs-empty__msg", 4, "ngIf"], [1, "gs-empty__sub"], [1, "gs-empty__cta", 3, "click"], [1, "gs-empty__msg"], [1, "gs-gate__btn", 3, "click"], ["class", "gs-past", 4, "ngIf"], [1, "gs-past"], [1, "gs-past__toggle", 3, "click"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "gs-past__chevron"], ["points", "6 9 12 15 18 9"], ["class", "gs-past__list", 4, "ngIf"], [1, "gs-past__list"], ["class", "gs-past__item", 4, "ngFor", "ngForOf"], [1, "gs-past__item"]], template: function GroupsSectionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275template(2, GroupsSectionComponent_p_2_Template, 2, 0, "p", 2)(3, GroupsSectionComponent_p_3_Template, 5, 1, "p", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, GroupsSectionComponent_button_4_Template, 5, 0, "button", 3)(5, GroupsSectionComponent_button_5_Template, 5, 0, "button", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, GroupsSectionComponent_div_6_Template, 61, 19, "div", 5)(7, GroupsSectionComponent_div_7_Template, 4, 0, "div", 6)(8, GroupsSectionComponent_div_8_Template, 4, 3, "div", 7)(9, GroupsSectionComponent_button_9_Template, 7, 0, "button", 8)(10, GroupsSectionComponent_div_10_Template, 12, 2, "div", 9)(11, GroupsSectionComponent_div_11_Template, 9, 2, "div", 9)(12, GroupsSectionComponent_ng_container_12_Template, 2, 1, "ng-container", 10);
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.lockedLocation);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.lockedLocation);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.isLoggedIn());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.authService.isLoggedIn());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showCreateForm());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading && ctx.groups.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.authService.isLoggedIn() && !ctx.isLoading && ctx.groups.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading && ctx.groups.length === 0 && !ctx.showCreateForm() && ctx.authService.isLoggedIn());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading && ctx.groups.length === 0 && !ctx.authService.isLoggedIn());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.isLoggedIn());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, GroupCardComponent], styles: ["\n\n.gs-intro[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 12px 14px;\n  margin-bottom: 16px;\n}\n.gs-intro__text[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.gs-intro__desc[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  margin: 0;\n  line-height: 1.45;\n}\n.gs-intro__desc[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n}\n.gs-create-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 8px 13px;\n  font-weight: 700;\n  font-size: 12.5px;\n  cursor: pointer;\n  flex-shrink: 0;\n  white-space: nowrap;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.28);\n  transition: opacity var(--transition), box-shadow var(--transition);\n}\n.gs-create-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  box-shadow: 0 4px 12px rgba(244, 169, 34, 0.38);\n}\n.gs-create-btn--locked[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n  box-shadow: none;\n}\n.gs-create-btn--locked[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n  opacity: 1;\n  box-shadow: none;\n}\n.gs-join-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  margin-top: 6px;\n  padding: 10px 14px;\n  border: 1px dashed var(--color-border);\n  border-radius: var(--radius-lg);\n  background: transparent;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    border-color var(--transition),\n    color var(--transition);\n  text-align: left;\n}\n.gs-join-strip[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:first-child {\n  flex-shrink: 0;\n  opacity: 0.7;\n}\n.gs-join-strip[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  border-color: var(--color-primary);\n  color: var(--color-text-secondary);\n}\n.gs-join-strip__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  flex-shrink: 0;\n}\n.gs-gate__btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 9px 20px;\n  font-weight: 700;\n  font-size: 13px;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.28);\n  transition: opacity var(--transition);\n}\n.gs-gate__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.gs-form[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 16px;\n  margin-bottom: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  animation: _ngcontent-%COMP%_gsSlideDown 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_gsSlideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.gs-form__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.gs-form__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0;\n}\n.gs-form__close[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: none;\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-md);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--color-text-muted);\n  transition: background var(--transition);\n}\n.gs-form__close[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.gs-form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  position: relative;\n}\n.gs-form__field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  letter-spacing: 0.02em;\n}\n.gs-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.gs-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 8px 10px;\n  font-size: 13px;\n  background: var(--color-bg);\n  color: var(--color-text-base);\n  transition: border-color var(--transition);\n  width: 100%;\n  box-sizing: border-box;\n}\n.gs-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.gs-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n}\n.gs-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 72px;\n}\n.gs-form__opt[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-light);\n}\n.gs-form__row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.gs-form__chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.gs-form__locked-spot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: var(--color-bg-muted);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 7px 10px;\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n.gs-form__locked-spot[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.gs-spot-results[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  box-shadow: var(--shadow-md);\n  list-style: none;\n  margin: 2px 0 0;\n  padding: 4px 0;\n  z-index: 50;\n  max-height: 180px;\n  overflow-y: auto;\n}\n.gs-spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  font-size: 13px;\n  cursor: pointer;\n  color: var(--color-text-base);\n}\n.gs-spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gs-form__selected-spot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: #22c55e;\n  font-weight: 600;\n}\n.gs-meeting-pick__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border: 1px dashed var(--color-border);\n  border-radius: var(--radius-md);\n  background: transparent;\n  padding: 7px 12px;\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition: border-color var(--transition), color var(--transition);\n}\n.gs-meeting-pick__btn[_ngcontent-%COMP%]:hover, \n.gs-meeting-pick__btn.picking[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.gs-meeting-set[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12.5px;\n  color: #22c55e;\n  font-weight: 500;\n}\n.gs-meeting-set__remove[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--color-text-muted);\n  font-size: 11.5px;\n  cursor: pointer;\n  text-decoration: underline;\n  padding: 0;\n  margin-left: 4px;\n}\n.gs-meeting-set__remove[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n.gs-form__error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #dc2626;\n  margin: 0;\n}\n.gs-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n}\n.gs-form__cancel[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: transparent;\n  color: var(--color-text-muted);\n  font-size: 13px;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gs-form__cancel[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gs-form__submit[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: var(--radius-md);\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gs-form__submit[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.gs-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.gs-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 6px;\n  padding: 24px 0;\n}\n.gs-loading__dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--color-border);\n  animation: _ngcontent-%COMP%_gsDotPulse 1.2s ease-in-out infinite;\n}\n.gs-loading__dot[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.gs-loading__dot[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_gsDotPulse {\n  0%, 80%, 100% {\n    transform: scale(0.8);\n    opacity: 0.4;\n  }\n  40% {\n    transform: scale(1.1);\n    opacity: 1;\n  }\n}\n.gs-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.gs-list__count[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  color: var(--color-text-light);\n  margin-bottom: 2px;\n}\n.gs-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 6px;\n  padding: 28px 16px;\n}\n.gs-empty__icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  line-height: 1;\n  margin-bottom: 4px;\n}\n.gs-empty__msg[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  margin: 0;\n}\n.gs-empty__sub[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  margin: 0;\n}\n.gs-empty__cta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  margin-top: 8px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 8px 16px;\n  font-weight: 700;\n  font-size: 12.5px;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.28);\n  transition: opacity var(--transition);\n}\n.gs-empty__cta[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.gs-past[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.gs-past__toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  width: 100%;\n  padding: 9px 12px;\n  border: 1px dashed var(--color-border);\n  border-radius: var(--radius-lg);\n  background: transparent;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    border-color var(--transition),\n    color var(--transition);\n}\n.gs-past__toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:first-child {\n  flex-shrink: 0;\n  opacity: 0.7;\n}\n.gs-past__toggle[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  border-color: var(--color-text-light);\n  color: var(--color-text-secondary);\n}\n.gs-past__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  flex-shrink: 0;\n  transition: transform var(--transition);\n}\n.gs-past__chevron--open[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.gs-past__list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 10px;\n  opacity: 0.72;\n  animation: _ngcontent-%COMP%_gsSlideDown 0.18s ease;\n}\n/*# sourceMappingURL=groups-section.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupsSectionComponent, { className: "GroupsSectionComponent", filePath: "src/app/components/groups-section/groups-section.component.ts", lineNumber: 44 });
})();

export {
  GroupsSectionComponent
};
//# sourceMappingURL=chunk-PFKKQTPI.js.map
