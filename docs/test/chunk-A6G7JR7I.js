import {
  ConfirmPopupComponent,
  MemberAvatarsComponent
} from "./chunk-2H6FXFNJ.js";
import {
  GroupsService
} from "./chunk-EQRF7B5Q.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-Z3QOGP5K.js";
import {
  UserAvatarComponent
} from "./chunk-WCQ2L7X5.js";
import {
  UserDataService
} from "./chunk-JEMGPZZW.js";
import {
  AlreadyHasActiveGroupError,
  GroupStatus
} from "./chunk-PHYDDMB4.js";
import {
  AuthService
} from "./chunk-LZQGUYST.js";
import {
  MapBridgeService
} from "./chunk-3RZU6AR3.js";
import {
  takeUntilDestroyed
} from "./chunk-3HMSICCD.js";
import {
  Router,
  RouterLink
} from "./chunk-JZVCYE4P.js";
import {
  CommonModule,
  DatePipe,
  DestroyRef,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  computed,
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
} from "./chunk-435XO7VF.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/features/groups/group-card/group-card.component.ts
var _c0 = (a0) => ["/malta/groups", a0];
function GroupCardComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
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
    \u0275\u0275elementStart(0, "span", 29);
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
function GroupCardComponent_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u20AC", ctx_r0.group.price, "");
  }
}
function GroupCardComponent_span_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "Free");
    \u0275\u0275elementEnd();
  }
}
var GroupCardComponent = class _GroupCardComponent {
  get whenLabel() {
    if (this.group.status === GroupStatus.Exploring)
      return "\u{1F9ED} Exploring now";
    if (this.group.status === GroupStatus.Completed)
      return "Completed";
    if (this.group.status === GroupStatus.Cancelled)
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
    if (s === GroupStatus.Exploring)
      return "exploring";
    if (s === GroupStatus.Completed || s === GroupStatus.Cancelled)
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupCardComponent, selectors: [["app-group-card"]], inputs: { group: "group" }, decls: 36, vars: 25, consts: [[1, "group-card", 3, "routerLink"], [1, "group-card__top"], ["size", "md", "shape", "circle", "roleLabel", "\u{1F451} Group leader", 3, "photoURL", "displayName", "level", "isAdmin"], [1, "group-card__main"], [1, "group-card__title-row"], [1, "group-card__title"], ["class", "group-card__status", 3, "class", 4, "ngIf"], [1, "group-card__date-row"], [1, "group-card__date"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], ["class", "group-card__when", 3, "class", 4, "ngIf"], [1, "group-card__divider"], [1, "group-card__bottom"], [1, "group-card__meta-row"], [1, "badge"], ["class", "group-card__price", 4, "ngIf"], ["class", "group-card__price group-card__price--free", 4, "ngIf"], [1, "group-card__leader"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], [1, "group-card__members"], [3, "previews", "total"], [1, "group-card__count"], [1, "group-card__count-label"], [1, "group-card__status"], [1, "group-card__when"], [1, "group-card__price"], [1, "group-card__price", "group-card__price--free"]], template: function GroupCardComponent_Template(rf, ctx) {
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
        \u0275\u0275template(23, GroupCardComponent_span_23_Template, 2, 1, "span", 19)(24, GroupCardComponent_span_24_Template, 2, 0, "span", 20);
        \u0275\u0275elementStart(25, "span", 21);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(26, "svg", 9);
        \u0275\u0275element(27, "path", 22)(28, "circle", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275text(29);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(30, "div", 24);
        \u0275\u0275element(31, "app-member-avatars", 25);
        \u0275\u0275elementStart(32, "span", 26);
        \u0275\u0275text(33);
        \u0275\u0275elementStart(34, "span", 27);
        \u0275\u0275text(35, "joining");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(23, _c0, ctx.group.id));
        \u0275\u0275advance(2);
        \u0275\u0275property("photoURL", ctx.group.leaderPhoto)("displayName", ctx.group.leaderName)("level", ctx.group.leaderLevel)("isAdmin", ctx.group.leaderIsAdmin);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.group.title);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.group.status !== "open");
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(16, 20, ctx.group.date.toDate(), "EEE d MMM"), " \xB7 ", ctx.group.time, " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.whenLabel);
        \u0275\u0275advance(4);
        \u0275\u0275classMap("badge--" + ctx.group.difficulty);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.group.difficulty);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.group.price);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.group.price);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.shortName(ctx.group.leaderName), " leading ");
        \u0275\u0275advance(2);
        \u0275\u0275property("previews", ctx.group.memberPreviews)("total", ctx.group.memberCount);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate2(" ", ctx.group.memberCount, "", ctx.group.maxMembers ? " / " + ctx.group.maxMembers : "", " ");
      }
    }, dependencies: [CommonModule, NgIf, DatePipe, RouterLink, MemberAvatarsComponent, UserAvatarComponent], styles: ["\n\n.group-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 14px;\n  text-decoration: none;\n  transition: box-shadow var(--transition), border-color var(--transition);\n  cursor: pointer;\n}\n.group-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.09);\n  border-color: rgba(244, 169, 34, 0.5);\n}\n.group-card__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.group-card__main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.group-card__title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 7px;\n}\n.group-card__title[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  line-height: 1.3;\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.group-card__date[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.group-card__date[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  opacity: 0.7;\n}\n.group-card__status[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 20px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  margin-top: 1px;\n}\n.group-card__status--full[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.group-card__status--exploring[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1d4ed8;\n}\n.group-card__status--cancelled[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.group-card__status--completed[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n.group-card__divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--color-border);\n  margin-bottom: 10px;\n}\n.group-card__bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n}\n.group-card__meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.group-card__price[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 10.5px;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 20px;\n  background: rgba(244, 169, 34, 0.12);\n  color: #92620a;\n}\n.group-card__price--free[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n  font-weight: 600;\n}\n.group-card__leader[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.group-card__leader[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  opacity: 0.6;\n}\n.group-card__members[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  flex-shrink: 0;\n}\n.group-card__count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-text-secondary);\n}\n.group-card__count-label[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-muted);\n}\n.group-card__date-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  flex-wrap: wrap;\n}\n.group-card__when[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 20px;\n  white-space: nowrap;\n}\n.group-card__when--upcoming[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n}\n.group-card__when--today[_ngcontent-%COMP%] {\n  background: #fef9c3;\n  color: #a16207;\n}\n.group-card__when--soon[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #b45309;\n}\n.group-card__when--exploring[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1d4ed8;\n}\n.group-card__when--past[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n/*# sourceMappingURL=group-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupCardComponent, { className: "GroupCardComponent", filePath: "src/app/features/groups/group-card/group-card.component.ts", lineNumber: 227 });
})();

// src/app/features/groups/groups-section/groups-section.component.ts
function GroupsSectionComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 3);
    \u0275\u0275element(2, "path", 4)(3, "circle", 5)(4, "path", 6)(5, "path", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Explore Together \u2014 ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9, "Coming soon");
    \u0275\u0275elementEnd()()();
  }
}
function GroupsSectionComponent_ng_container_1_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, " Find fellow explorers for Malta's best spots \u2014 join a group or start your own. ");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, " Planning a visit to ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, "? Join a group or start your own. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.lockedLocation.title);
  }
}
function GroupsSectionComponent_ng_container_1_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openCreateForm());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 22);
    \u0275\u0275element(2, "line", 23)(3, "line", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " New group ");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.authService.openLoginModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "rect", 27)(3, "path", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Sign in to join ");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_div_7_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 61);
    \u0275\u0275element(2, "path", 62)(3, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.lockedLocation.title, " ");
  }
}
function GroupsSectionComponent_ng_container_1_div_7_div_18_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "button", 69);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_div_18_div_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.startPickingSpot());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 26);
    \u0275\u0275element(3, "path", 62)(4, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Pick from map ");
    \u0275\u0275elementEnd()();
  }
}
function GroupsSectionComponent_ng_container_1_div_7_div_18_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "span", 71);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 26);
    \u0275\u0275element(3, "path", 62)(4, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Tap a location pin on the map\u2026 ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 72);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_div_18_div_2_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.cancelPickSpot());
    });
    \u0275\u0275text(7, "Cancel");
    \u0275\u0275elementEnd()();
  }
}
function GroupsSectionComponent_ng_container_1_div_7_div_18_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "path", 62)(3, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 74);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 75)(7, "button", 76);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_div_18_div_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      ctx_r0.clearSpot();
      return \u0275\u0275resetView(ctx_r0.startPickingSpot());
    });
    \u0275\u0275text(8, "Change");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 77);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_div_18_div_3_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.clearSpot());
    });
    \u0275\u0275text(10, "Remove");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formSpotTitle);
  }
}
function GroupsSectionComponent_ng_container_1_div_7_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275template(1, GroupsSectionComponent_ng_container_1_div_7_div_18_div_1_Template, 6, 0, "div", 65)(2, GroupsSectionComponent_ng_container_1_div_7_div_18_div_2_Template, 8, 0, "div", 66)(3, GroupsSectionComponent_ng_container_1_div_7_div_18_div_3_Template, 11, 1, "div", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.formSpotSlug && !ctx_r0.pickingSpot());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.pickingSpot());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.formSpotSlug);
  }
}
function GroupsSectionComponent_ng_container_1_div_7_span_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Your level allows up to ", ctx_r0.maxMembersCap(), " members ");
  }
}
function GroupsSectionComponent_ng_container_1_div_7_span_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1, " No member limit \u2014 Legend tier ");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_div_7_span_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1, "\u{1F512} Guide or admin only");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_div_7_div_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 80)(1, "span", 81);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 26);
    \u0275\u0275element(3, "path", 62)(4, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Is this the right spot? ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 82)(7, "button", 83);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_div_67_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.retryMeetingPoint());
    });
    \u0275\u0275text(8, "Try again");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 84);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_div_67_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.confirmMeetingPoint());
    });
    \u0275\u0275text(10, "Confirm");
    \u0275\u0275elementEnd()()();
  }
}
function GroupsSectionComponent_ng_container_1_div_7_div_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "button", 86);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_div_68_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.startPickingMeetingPoint());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 26);
    \u0275\u0275element(3, "path", 62)(4, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Pin on map ");
    \u0275\u0275elementEnd()();
  }
}
function GroupsSectionComponent_ng_container_1_div_7_div_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 87);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "polyline", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Meeting point set ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "button", 89);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_div_69_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.clearMeetingPoint());
    });
    \u0275\u0275text(5, "Remove");
    \u0275\u0275elementEnd()();
  }
}
function GroupsSectionComponent_ng_container_1_div_7_p_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 90);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.formError());
  }
}
function GroupsSectionComponent_ng_container_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30)(2, "h3", 31);
    \u0275\u0275text(3, "Create a group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 32);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancelCreate());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 33);
    \u0275\u0275element(6, "line", 34)(7, "line", 35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 36)(9, "label");
    \u0275\u0275text(10, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_ng_container_1_div_7_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.formTitle, $event) || (ctx_r0.formTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 36)(13, "label");
    \u0275\u0275text(14, "Spot ");
    \u0275\u0275elementStart(15, "span", 38);
    \u0275\u0275text(16, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, GroupsSectionComponent_ng_container_1_div_7_div_17_Template, 5, 1, "div", 39)(18, GroupsSectionComponent_ng_container_1_div_7_div_18_Template, 4, 3, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 41)(20, "div", 36)(21, "label");
    \u0275\u0275text(22, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 42);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_ng_container_1_div_7_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.formDate, $event) || (ctx_r0.formDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 36)(25, "label");
    \u0275\u0275text(26, "Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_ng_container_1_div_7_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.formTime, $event) || (ctx_r0.formTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 36)(29, "label");
    \u0275\u0275text(30, "Difficulty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 44)(32, "span", 45);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_Template_span_click_32_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.formDifficulty = "easy");
    });
    \u0275\u0275text(33, "Easy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 45);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_Template_span_click_34_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.formDifficulty = "moderate");
    });
    \u0275\u0275text(35, "Moderate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "span", 45);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_Template_span_click_36_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.formDifficulty = "hard");
    });
    \u0275\u0275text(37, "Hard");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 36)(39, "label");
    \u0275\u0275text(40, "Description ");
    \u0275\u0275elementStart(41, "span", 38);
    \u0275\u0275text(42, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "textarea", 46);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_ng_container_1_div_7_Template_textarea_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.formDescription, $event) || (ctx_r0.formDescription = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 36)(45, "label");
    \u0275\u0275text(46, "Max members ");
    \u0275\u0275elementStart(47, "span", 38);
    \u0275\u0275text(48, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_ng_container_1_div_7_Template_input_ngModelChange_49_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.formMaxMembers, $event) || (ctx_r0.formMaxMembers = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(50, GroupsSectionComponent_ng_container_1_div_7_span_50_Template, 2, 1, "span", 48)(51, GroupsSectionComponent_ng_container_1_div_7_span_51_Template, 2, 0, "span", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 36)(53, "label");
    \u0275\u0275text(54, " Tour price ");
    \u0275\u0275elementStart(55, "span", 38);
    \u0275\u0275text(56, "(optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(57, GroupsSectionComponent_ng_container_1_div_7_span_57_Template, 2, 0, "span", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 50)(59, "span", 51);
    \u0275\u0275text(60, "\u20AC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function GroupsSectionComponent_ng_container_1_div_7_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.formPrice, $event) || (ctx_r0.formPrice = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(62, "div", 36)(63, "label");
    \u0275\u0275text(64, "Meeting point ");
    \u0275\u0275elementStart(65, "span", 38);
    \u0275\u0275text(66, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(67, GroupsSectionComponent_ng_container_1_div_7_div_67_Template, 11, 0, "div", 53)(68, GroupsSectionComponent_ng_container_1_div_7_div_68_Template, 6, 0, "div", 54)(69, GroupsSectionComponent_ng_container_1_div_7_div_69_Template, 6, 0, "div", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275template(70, GroupsSectionComponent_ng_container_1_div_7_p_70_Template, 2, 1, "p", 56);
    \u0275\u0275elementStart(71, "div", 57)(72, "button", 58);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_Template_button_click_72_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancelCreate());
    });
    \u0275\u0275text(73, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "button", 59);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_7_Template_button_click_74_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.submitCreate());
    });
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formTitle);
    \u0275\u0275advance(6);
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
    \u0275\u0275property("max", (tmp_13_0 = ctx_r0.maxMembersCap()) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : 999);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.maxMembersCap() !== null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.maxMembersCap() === null);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", !ctx_r0.canSetPrice());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formPrice);
    \u0275\u0275property("disabled", !ctx_r0.canSetPrice());
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r0.pendingMeetingPoint());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.formMeetingPoint && !ctx_r0.pendingMeetingPoint());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.formMeetingPoint && !ctx_r0.pendingMeetingPoint());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.formError());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.formSubmitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formSubmitting() ? "Creating\u2026" : "Create group", " ");
  }
}
function GroupsSectionComponent_ng_container_1_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275element(1, "span", 92)(2, "span", 92)(3, "span", 92);
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_div_9_app_group_card_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-group-card", 96);
  }
  if (rf & 2) {
    const g_r11 = ctx.$implicit;
    \u0275\u0275property("group", g_r11);
  }
}
function GroupsSectionComponent_ng_container_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "div", 94);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupsSectionComponent_ng_container_1_div_9_app_group_card_3_Template, 1, 1, "app-group-card", 95);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.groups.length, " upcoming group", ctx_r0.groups.length === 1 ? "" : "s", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.groups);
  }
}
function GroupsSectionComponent_ng_container_1_div_10_div_8_app_group_card_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-group-card", 96);
  }
  if (rf & 2) {
    const g_r13 = ctx.$implicit;
    \u0275\u0275property("group", g_r13);
  }
}
function GroupsSectionComponent_ng_container_1_div_10_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 104);
    \u0275\u0275template(1, GroupsSectionComponent_ng_container_1_div_10_div_8_app_group_card_1_Template, 1, 1, "app-group-card", 95);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.myGroups());
  }
}
function GroupsSectionComponent_ng_container_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 97)(1, "button", 98);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.showMyGroups.set(!ctx_r0.showMyGroups()));
    });
    \u0275\u0275elementStart(2, "span", 99);
    \u0275\u0275text(3, "My groups");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 100);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 101);
    \u0275\u0275element(7, "polyline", 102);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, GroupsSectionComponent_ng_container_1_div_10_div_8_Template, 2, 1, "div", 103);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.myGroups().length);
    \u0275\u0275advance();
    \u0275\u0275classProp("gs-section-chevron--open", ctx_r0.showMyGroups());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.showMyGroups());
  }
}
function GroupsSectionComponent_ng_container_1_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 94);
    \u0275\u0275text(1, "Explore");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_div_11_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 94);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.groupsService.openGroups().length, " upcoming group", ctx_r0.groupsService.openGroups().length === 1 ? "" : "s", " ");
  }
}
function GroupsSectionComponent_ng_container_1_div_11_app_group_card_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-group-card", 96);
  }
  if (rf & 2) {
    const g_r14 = ctx.$implicit;
    \u0275\u0275property("group", g_r14);
  }
}
function GroupsSectionComponent_ng_container_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93);
    \u0275\u0275template(1, GroupsSectionComponent_ng_container_1_div_11_div_1_Template, 2, 0, "div", 105)(2, GroupsSectionComponent_ng_container_1_div_11_div_2_Template, 2, 2, "div", 105)(3, GroupsSectionComponent_ng_container_1_div_11_app_group_card_3_Template, 1, 1, "app-group-card", 95);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.myGroups().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.myGroups().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.exploreGroups());
  }
}
function GroupsSectionComponent_ng_container_1_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 106);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.authService.openLoginModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 107);
    \u0275\u0275element(2, "rect", 27)(3, "path", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Sign in to join a group or create your own ");
    \u0275\u0275elementStart(5, "svg", 108);
    \u0275\u0275element(6, "polyline", 109);
    \u0275\u0275elementEnd()();
  }
}
function GroupsSectionComponent_ng_container_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 110)(1, "div", 111);
    \u0275\u0275text(2, "\u{1F97E}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 112);
    \u0275\u0275text(4, "No upcoming groups yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 113);
    \u0275\u0275text(6, "Be the first to organise one!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 114);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_13_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openCreateForm());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 22);
    \u0275\u0275element(9, "line", 23)(10, "line", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Create the first group ");
    \u0275\u0275elementEnd()();
  }
}
function GroupsSectionComponent_ng_container_1_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 110)(1, "div", 111);
    \u0275\u0275text(2, "\u{1F97E}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 112);
    \u0275\u0275text(4, "No upcoming groups yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 113);
    \u0275\u0275text(6, "Sign in to be the first to organise one!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 115);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_14_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.authService.openLoginModal());
    });
    \u0275\u0275text(8, "Sign in");
    \u0275\u0275elementEnd()();
  }
}
function GroupsSectionComponent_ng_container_1_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 116)(1, "div", 111);
    \u0275\u0275text(2, "\u{1F4AC}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 112);
    \u0275\u0275text(4, "No groups at this spot yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 113);
    \u0275\u0275text(6, "Meet other explorers, share tips and plan visits together in the groups chat.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 117);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_div_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.router.navigate(["/malta/groups"]));
    });
    \u0275\u0275text(8, " See all groups & chat ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 118);
    \u0275\u0275element(10, "polyline", 109);
    \u0275\u0275elementEnd()()();
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 131);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.pastBulkMode() ? ctx_r0.exitPastBulk() : ctx_r0.pastBulkMode.set(true));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("gs-bulk-select-btn--active", ctx_r0.pastBulkMode());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.pastBulkMode() ? "Cancel" : "Select", " ");
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_div_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 140);
    \u0275\u0275element(1, "polyline", 88);
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138);
    \u0275\u0275template(1, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_div_1__svg_svg_1_Template, 2, 0, "svg", 139);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275classProp("gs-past__checkbox--checked", ctx_r0.isPastBulkSelected(g_r22.id));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isPastBulkSelected(g_r22.id));
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 141);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_button_4_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r23);
      const g_r22 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.confirmArchive(g_r22.id, $event));
    });
    \u0275\u0275text(1, "\xD7");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 134);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_Template_div_click_0_listener($event) {
      const g_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.pastBulkMode() && g_r22.status === "cancelled" ? ctx_r0.togglePastBulkSelect(g_r22.id, $event) : null);
    });
    \u0275\u0275template(1, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_div_1_Template, 2, 3, "div", 135);
    \u0275\u0275elementStart(2, "div", 136);
    \u0275\u0275element(3, "app-group-card", 96);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_button_4_Template, 2, 0, "button", 137);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r22 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275classProp("gs-past__item--selectable", ctx_r0.pastBulkMode() && g_r22.status === "cancelled")("gs-past__item--selected", ctx_r0.isPastBulkSelected(g_r22.id));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.pastBulkMode() && g_r22.status === "cancelled");
    \u0275\u0275advance(2);
    \u0275\u0275property("group", g_r22);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isAdmin() && g_r22.status === "cancelled" && !ctx_r0.pastBulkMode());
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 132);
    \u0275\u0275template(1, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_div_1_Template, 5, 7, "div", 133);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.pastGroups);
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_app_confirm_popup_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 142);
    \u0275\u0275listener("confirmed", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_app_confirm_popup_11_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.executeArchive());
    })("cancelled", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_app_confirm_popup_11_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.confirmingArchiveId.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("fixed", true)("danger", false);
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_12_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 147);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_12_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.selectAllPastCancelled());
    });
    \u0275\u0275text(1, "Select all");
    \u0275\u0275elementEnd();
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_12_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 148);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_12_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.confirmingBulkArchive.set(true));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Remove ", ctx_r0.pastBulkSelected().size, " ");
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "span", 144);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_12_button_3_Template, 2, 0, "button", 145)(4, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_12_button_4_Template, 2, 1, "button", 146);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.pastBulkSelected().size > 0 ? ctx_r0.pastBulkSelected().size + " selected" : "Tap groups to select", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.pastBulkSelected().size < ctx_r0.cancelledPastGroups.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.pastBulkSelected().size > 0);
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_app_confirm_popup_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 149);
    \u0275\u0275listener("confirmed", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_app_confirm_popup_13_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.executeBulkArchive());
    })("cancelled", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_app_confirm_popup_13_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.confirmingBulkArchive.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("fixed", true)("message", "Remove " + ctx_r0.pastBulkSelected().size + " cancelled group" + (ctx_r0.pastBulkSelected().size === 1 ? "" : "s") + " from the list?")("danger", false);
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 120)(1, "div", 121)(2, "button", 122);
    \u0275\u0275listener("click", function GroupsSectionComponent_ng_container_1_ng_container_16_div_1_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(3);
      ctx_r0.showPastGroups.set(!ctx_r0.showPastGroups());
      return \u0275\u0275resetView(ctx_r0.exitPastBulk());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 107);
    \u0275\u0275element(4, "circle", 123)(5, "polyline", 124);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementStart(7, "svg", 125);
    \u0275\u0275element(8, "polyline", 102);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_button_9_Template, 2, 3, "button", 126);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_10_Template, 2, 1, "div", 127)(11, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_app_confirm_popup_11_Template, 1, 2, "app-confirm-popup", 128)(12, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_div_12_Template, 5, 3, "div", 129)(13, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_app_confirm_popup_13_Template, 1, 3, "app-confirm-popup", 130);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" ", ctx_r0.pastGroups.length, " past group", ctx_r0.pastGroups.length === 1 ? "" : "s", " this week ");
    \u0275\u0275advance();
    \u0275\u0275classProp("gs-past__chevron--open", ctx_r0.showPastGroups());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.isAdmin() && ctx_r0.cancelledPastGroups.length >= 1 && ctx_r0.showPastGroups());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.showPastGroups());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.confirmingArchiveId());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.pastBulkMode());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.confirmingBulkArchive());
  }
}
function GroupsSectionComponent_ng_container_1_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, GroupsSectionComponent_ng_container_1_ng_container_16_div_1_Template, 14, 9, "div", 119);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.lockedLocation && ctx_r0.pastGroups.length > 0);
  }
}
function GroupsSectionComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9);
    \u0275\u0275template(3, GroupsSectionComponent_ng_container_1_p_3_Template, 2, 0, "p", 10)(4, GroupsSectionComponent_ng_container_1_p_4_Template, 5, 1, "p", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, GroupsSectionComponent_ng_container_1_button_5_Template, 5, 0, "button", 11)(6, GroupsSectionComponent_ng_container_1_button_6_Template, 5, 0, "button", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, GroupsSectionComponent_ng_container_1_div_7_Template, 76, 26, "div", 13)(8, GroupsSectionComponent_ng_container_1_div_8_Template, 4, 0, "div", 14)(9, GroupsSectionComponent_ng_container_1_div_9_Template, 4, 3, "div", 15)(10, GroupsSectionComponent_ng_container_1_div_10_Template, 9, 4, "div", 16)(11, GroupsSectionComponent_ng_container_1_div_11_Template, 4, 3, "div", 15)(12, GroupsSectionComponent_ng_container_1_button_12_Template, 7, 0, "button", 17)(13, GroupsSectionComponent_ng_container_1_div_13_Template, 12, 0, "div", 18)(14, GroupsSectionComponent_ng_container_1_div_14_Template, 9, 0, "div", 18)(15, GroupsSectionComponent_ng_container_1_div_15_Template, 11, 0, "div", 19)(16, GroupsSectionComponent_ng_container_1_ng_container_16_Template, 2, 1, "ng-container", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r0.lockedLocation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.lockedLocation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.showCreateForm());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.lockedLocation && !ctx_r0.isLoading && ctx_r0.groups.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.lockedLocation && !ctx_r0.isLoading && ctx_r0.authService.isLoggedIn() && ctx_r0.myGroups().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.lockedLocation && !ctx_r0.isLoading && ctx_r0.exploreGroups().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.authService.isLoggedIn() && !ctx_r0.isLoading && ctx_r0.groupsService.openGroups().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isLoading && !ctx_r0.showCreateForm() && !ctx_r0.lockedLocation && ctx_r0.authService.isLoggedIn() && ctx_r0.groupsService.openGroups().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isLoading && !ctx_r0.lockedLocation && !ctx_r0.authService.isLoggedIn() && ctx_r0.groupsService.openGroups().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isLoading && !ctx_r0.showCreateForm() && ctx_r0.lockedLocation && ctx_r0.groups.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.authService.isLoggedIn());
  }
}
var GroupsSectionComponent = class _GroupsSectionComponent {
  constructor() {
    this.bridge = inject(MapBridgeService);
    this.groupsService = inject(GroupsService);
    this.authService = inject(AuthService);
    this.userDataService = inject(UserDataService);
    this.groupsUnlocked = computed(() => this.userDataService.groupsUnlocked());
    this.maxMembersCap = computed(() => this.userDataService.levelInfo().maxGroupMembers);
    this.router = inject(Router);
    this.destroyRef = inject(DestroyRef);
    this.platformId = inject(PLATFORM_ID);
    this.spotGroups = signal([]);
    this.loadingGroups = signal(false);
    this.showCreateForm = signal(false);
    this.formError = signal(null);
    this.formSubmitting = signal(false);
    this.pickingMeetingPoint = signal(false);
    this.pendingMeetingPoint = signal(null);
    this.showPastGroups = signal(false);
    this.showMyGroups = signal(true);
    this.confirmingArchiveId = signal(null);
    this.pastBulkMode = signal(false);
    this.pastBulkSelected = signal(/* @__PURE__ */ new Set());
    this.confirmingBulkArchive = signal(false);
    this.pickingSpot = signal(false);
    this.isAdmin = computed(() => this.userDataService.isAdmin());
    this.canSetPrice = computed(() => this.userDataService.canSetPrice());
    this.currentUid = computed(() => this.authService.user()?.id ?? null);
    this.myGroups = computed(() => {
      if (this.lockedLocation)
        return [];
      const uid = this.currentUid();
      if (!uid)
        return [];
      const myIds = this.groupsService.myGroupIds();
      return this.groupsService.openGroups().filter((g) => myIds.has(g.id));
    });
    this.exploreGroups = computed(() => {
      if (this.lockedLocation)
        return [];
      const uid = this.currentUid();
      const myIds = uid ? this.groupsService.myGroupIds() : /* @__PURE__ */ new Set();
      return this.groupsService.openGroups().filter((g) => !myIds.has(g.id));
    });
    this.formTitle = "";
    this.formDate = "";
    this.formTime = "08:00";
    this.formDescription = "";
    this.formDifficulty = "easy";
    this.formMaxMembers = "";
    this.formPrice = "";
    this.formSpotSlug = "";
    this.formSpotTitle = "";
    this.formSpotLat = 0;
    this.formSpotLon = 0;
    this.formMeetingPoint = null;
  }
  get groups() {
    const all = this.lockedLocation ? this.spotGroups() : this.groupsService.openGroups();
    const uid = this.authService.user()?.id;
    const score = (g) => {
      if (g.leaderIsAdmin)
        return 3;
      if (g.leaderIsGuide)
        return 2;
      if (uid && g.leaderId === uid)
        return 1;
      return 0;
    };
    return [...all].sort((a, b) => score(b) - score(a));
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
      this.pendingMeetingPoint.set({ lat, lon });
      this.bridge.meetingPointMarker.set({ lat, lon });
      this.bridge.pickMode.set(false);
      this.pickingMeetingPoint.set(false);
      this.bridge.panel.expand();
    });
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (!this.pickingSpot() || !loc)
        return;
      this.selectSpot(loc);
    });
  }
  ngOnDestroy() {
    this.bridge.pickMode.set(false);
    this.bridge.meetingPointMarker.set(null);
    this.bridge.spotPickMode.set(false);
    if (this.formSpotSlug) {
      this.bridge.selectedLocation.set(null);
      this.bridge.closeLocation();
    }
  }
  // ── Create form ───────────────────────────────────────────────────────────
  openCreateForm() {
    if (!this.authService.isLoggedIn()) {
      this.authService.openLoginModal();
      return;
    }
    if (this.userDataService.levelInfo().id < 1) {
      this.formError.set("Level up first \u2014 explore the map for your first 24 hours to create groups.");
      this.showCreateForm.set(true);
      return;
    }
    if (this.lockedLocation) {
      this.formSpotSlug = this.lockedLocation.slug;
      this.formSpotTitle = this.lockedLocation.title;
      this.formSpotLat = this.lockedLocation.lat;
      this.formSpotLon = this.lockedLocation.lon;
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
  // ── Spot picker ───────────────────────────────────────────────────────────
  startPickingSpot() {
    this.pickingSpot.set(true);
    this.bridge.spotPickMode.set(true);
    this.bridge.panel.minimize();
  }
  cancelPickSpot() {
    this.pickingSpot.set(false);
    this.bridge.spotPickMode.set(false);
    this.bridge.panel.expand();
  }
  /** Called when a location pin is tapped while in spot-pick mode. */
  selectSpot(loc) {
    this.formSpotSlug = loc.slug;
    this.formSpotTitle = loc.title;
    this.formSpotLat = loc.lat;
    this.formSpotLon = loc.lon;
    this.pickingSpot.set(false);
    this.bridge.spotPickMode.set(false);
    this.bridge.selectedLocation.set(loc);
    this.bridge.panel.expand();
  }
  clearSpot() {
    this.formSpotSlug = "";
    this.formSpotTitle = "";
    this.formSpotLat = 0;
    this.formSpotLon = 0;
    this.pickingSpot.set(false);
    this.bridge.spotPickMode.set(false);
    this.bridge.selectedLocation.set(null);
    this.bridge.closeLocation();
  }
  // ── Meeting point ─────────────────────────────────────────────────────────
  startPickingMeetingPoint() {
    this.pickingMeetingPoint.set(true);
    this.bridge.pickMode.set(true);
    this.bridge.panel.minimize();
  }
  clearMeetingPoint() {
    if (this.pickingMeetingPoint())
      this.bridge.panel.expand();
    this.formMeetingPoint = null;
    this.pendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(null);
    this.pickingMeetingPoint.set(false);
    this.bridge.pickMode.set(false);
  }
  confirmMeetingPoint() {
    const p = this.pendingMeetingPoint();
    if (!p)
      return;
    this.formMeetingPoint = p;
    this.pendingMeetingPoint.set(null);
  }
  retryMeetingPoint() {
    this.pendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(this.formMeetingPoint);
    this.startPickingMeetingPoint();
  }
  // ── Submit ────────────────────────────────────────────────────────────────
  submitCreate() {
    return __async(this, null, function* () {
      if (!this.formTitle.trim() || !this.formDate) {
        this.formError.set("Please fill in title and date.");
        return;
      }
      const dateObj = /* @__PURE__ */ new Date(this.formDate + "T" + this.formTime);
      if (isNaN(dateObj.getTime())) {
        this.formError.set("Invalid date or time.");
        return;
      }
      const cap = this.maxMembersCap();
      let maxMembers = this.formMaxMembers ? parseInt(this.formMaxMembers, 10) : null;
      if (cap !== null) {
        maxMembers = maxMembers !== null ? Math.min(maxMembers, cap) : cap;
      }
      const priceVal = this.canSetPrice() && this.formPrice ? parseFloat(this.formPrice) : null;
      const payload = {
        title: this.formTitle.trim(),
        spotSlug: this.formSpotSlug || null,
        spotTitle: this.formSpotTitle || null,
        spotLat: this.formSpotSlug ? this.formSpotLat : null,
        spotLon: this.formSpotSlug ? this.formSpotLon : null,
        date: dateObj,
        time: this.formTime,
        description: this.formDescription.trim(),
        difficulty: this.formDifficulty,
        maxMembers,
        price: priceVal !== null && !isNaN(priceVal) && priceVal > 0 ? priceVal : null,
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
  get cancelledPastGroups() {
    return this.pastGroups.filter((g) => g.status === GroupStatus.Cancelled);
  }
  // ── Single archive ────────────────────────────────────────────────────────
  confirmArchive(id, event) {
    event.preventDefault();
    event.stopPropagation();
    this.confirmingArchiveId.set(id);
  }
  executeArchive() {
    return __async(this, null, function* () {
      const id = this.confirmingArchiveId();
      if (!id)
        return;
      yield this.groupsService.archiveGroup(id);
      this.confirmingArchiveId.set(null);
    });
  }
  // ── Bulk archive ──────────────────────────────────────────────────────────
  isPastBulkSelected(id) {
    return this.pastBulkSelected().has(id);
  }
  togglePastBulkSelect(id, event) {
    event.preventDefault();
    event.stopPropagation();
    this.pastBulkSelected.update((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }
  selectAllPastCancelled() {
    this.pastBulkSelected.set(new Set(this.cancelledPastGroups.map((g) => g.id)));
  }
  exitPastBulk() {
    this.pastBulkMode.set(false);
    this.pastBulkSelected.set(/* @__PURE__ */ new Set());
    this.confirmingBulkArchive.set(false);
  }
  executeBulkArchive() {
    return __async(this, null, function* () {
      const ids = [...this.pastBulkSelected()];
      yield Promise.all(ids.map((id) => this.groupsService.archiveGroup(id)));
      this.exitPastBulk();
    });
  }
  resetForm() {
    this.formTitle = "";
    this.formDate = "";
    this.formTime = "08:00";
    this.formDescription = "";
    this.formDifficulty = "easy";
    this.formMaxMembers = "";
    this.formPrice = "";
    this.formMeetingPoint = null;
    this.pendingMeetingPoint.set(null);
    this.pickingMeetingPoint.set(false);
    if (!this.lockedLocation) {
      this.clearSpot();
    }
  }
  static {
    this.\u0275fac = function GroupsSectionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupsSectionComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupsSectionComponent, selectors: [["app-groups-section"]], inputs: { lockedLocation: "lockedLocation" }, decls: 2, vars: 2, consts: [["class", "gs-locked", 4, "ngIf"], [4, "ngIf"], [1, "gs-locked"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "gs-intro"], [1, "gs-intro__text"], ["class", "gs-intro__desc", 4, "ngIf"], ["class", "gs-create-btn", 3, "click", 4, "ngIf"], ["class", "gs-create-btn gs-create-btn--locked", 3, "click", 4, "ngIf"], ["class", "gs-form", 4, "ngIf"], ["class", "gs-loading", 4, "ngIf"], ["class", "gs-list", 4, "ngIf"], ["class", "gs-my-groups", 4, "ngIf"], ["class", "gs-join-strip", 3, "click", 4, "ngIf"], ["class", "gs-empty", 4, "ngIf"], ["class", "gs-empty gs-empty--spot", 4, "ngIf"], [1, "gs-intro__desc"], [1, "gs-create-btn", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "gs-create-btn", "gs-create-btn--locked", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "gs-form"], [1, "gs-form__header"], [1, "gs-form__title"], ["aria-label", "Cancel", 1, "gs-form__close", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "gs-form__field"], ["type", "text", "placeholder", "e.g. Blue Grotto sunrise hike", "maxlength", "80", 3, "ngModelChange", "ngModel"], [1, "gs-form__opt"], ["class", "gs-form__locked-spot", 4, "ngIf"], ["class", "gs-form__field--spot", 4, "ngIf"], [1, "gs-form__row"], ["type", "date", 3, "ngModelChange", "ngModel", "min"], ["type", "time", 3, "ngModelChange", "ngModel"], [1, "gs-form__chips"], [1, "chip", 3, "click"], ["rows", "3", "maxlength", "400", "placeholder", "What's the plan? Anything to know beforehand?", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "2", "placeholder", "Unlimited", 3, "ngModelChange", "ngModel", "max"], ["class", "gs-form__hint", 4, "ngIf"], ["class", "gs-form__lock-hint", 4, "ngIf"], [1, "gs-price-wrap"], [1, "gs-price-euro"], ["type", "number", "min", "0", "step", "0.01", "placeholder", "Free", 3, "ngModelChange", "ngModel", "disabled"], ["class", "gs-meeting-confirm", 4, "ngIf"], ["class", "gs-meeting-pick", 4, "ngIf"], ["class", "gs-meeting-set", 4, "ngIf"], ["class", "gs-form__error", 4, "ngIf"], [1, "gs-form__actions"], [1, "gs-form__cancel", 3, "click"], [1, "gs-form__submit", 3, "click", "disabled"], [1, "gs-form__locked-spot"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "gs-form__field--spot"], ["class", "gs-spot-pick", 4, "ngIf"], ["class", "gs-spot-picking", 4, "ngIf"], ["class", "gs-spot-selected", 4, "ngIf"], [1, "gs-spot-pick"], ["type", "button", 1, "gs-spot-pick__btn", 3, "click"], [1, "gs-spot-picking"], [1, "gs-spot-picking__msg"], ["type", "button", 1, "gs-spot-picking__cancel", 3, "click"], [1, "gs-spot-selected"], [1, "gs-spot-selected__name"], [1, "gs-spot-selected__actions"], ["type", "button", 1, "gs-spot-selected__change", 3, "click"], ["type", "button", 1, "gs-spot-selected__remove", 3, "click"], [1, "gs-form__hint"], [1, "gs-form__lock-hint"], [1, "gs-meeting-confirm"], [1, "gs-meeting-confirm__msg"], [1, "gs-meeting-confirm__actions"], [1, "gs-meeting-confirm__retry", 3, "click"], [1, "gs-meeting-confirm__ok", 3, "click"], [1, "gs-meeting-pick"], [1, "gs-meeting-pick__btn", 3, "click"], [1, "gs-meeting-set"], ["points", "20 6 9 17 4 12"], [1, "gs-meeting-set__remove", 3, "click"], [1, "gs-form__error"], [1, "gs-loading"], [1, "gs-loading__dot"], [1, "gs-list"], [1, "gs-list__count"], [3, "group", 4, "ngFor", "ngForOf"], [3, "group"], [1, "gs-my-groups"], [1, "gs-section-toggle", 3, "click"], [1, "gs-section-label"], [1, "gs-section-badge"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "gs-section-chevron"], ["points", "6 9 12 15 18 9"], ["class", "gs-section-list", 4, "ngIf"], [1, "gs-section-list"], ["class", "gs-list__count", 4, "ngIf"], [1, "gs-join-strip", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "gs-join-strip__chevron"], ["points", "9 18 15 12 9 6"], [1, "gs-empty"], [1, "gs-empty__icon"], [1, "gs-empty__msg"], [1, "gs-empty__sub"], [1, "gs-empty__cta", 3, "click"], [1, "gs-gate__btn", 3, "click"], [1, "gs-empty", "gs-empty--spot"], [1, "gs-empty__explore", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["class", "gs-past", 4, "ngIf"], [1, "gs-past"], [1, "gs-past__header"], [1, "gs-past__toggle", 3, "click"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "gs-past__chevron"], ["class", "gs-bulk-select-btn", 3, "gs-bulk-select-btn--active", "click", 4, "ngIf"], ["class", "gs-past__list", 4, "ngIf"], ["message", "Remove this cancelled group from the list?", "confirmLabel", "Remove", "cancelLabel", "Keep", 3, "fixed", "danger", "confirmed", "cancelled", 4, "ngIf"], ["class", "gs-bulk-bar", 4, "ngIf"], ["confirmLabel", "Remove all", "cancelLabel", "Cancel", 3, "fixed", "message", "danger", "confirmed", "cancelled", 4, "ngIf"], [1, "gs-bulk-select-btn", 3, "click"], [1, "gs-past__list"], ["class", "gs-past__item", 3, "gs-past__item--selectable", "gs-past__item--selected", "click", 4, "ngFor", "ngForOf"], [1, "gs-past__item", 3, "click"], ["class", "gs-past__checkbox", 3, "gs-past__checkbox--checked", 4, "ngIf"], [1, "gs-card-wrap"], ["class", "gs-archive-btn", "title", "Remove from view", 3, "click", 4, "ngIf"], [1, "gs-past__checkbox"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["title", "Remove from view", 1, "gs-archive-btn", 3, "click"], ["message", "Remove this cancelled group from the list?", "confirmLabel", "Remove", "cancelLabel", "Keep", 3, "confirmed", "cancelled", "fixed", "danger"], [1, "gs-bulk-bar"], [1, "gs-bulk-bar__count"], ["class", "gs-bulk-bar__select-all", 3, "click", 4, "ngIf"], ["class", "gs-bulk-bar__btn gs-bulk-bar__btn--danger", 3, "click", 4, "ngIf"], [1, "gs-bulk-bar__select-all", 3, "click"], [1, "gs-bulk-bar__btn", "gs-bulk-bar__btn--danger", 3, "click"], ["confirmLabel", "Remove all", "cancelLabel", "Cancel", 3, "confirmed", "cancelled", "fixed", "message", "danger"]], template: function GroupsSectionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, GroupsSectionComponent_div_0_Template, 10, 0, "div", 0)(1, GroupsSectionComponent_ng_container_1_Template, 17, 14, "ng-container", 1);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", !ctx.groupsUnlocked());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.groupsUnlocked());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, GroupCardComponent, ConfirmPopupComponent], styles: ["\n\n.gs-locked[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  font-size: 13px;\n  color: var(--color-text-muted);\n}\n.gs-locked[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--color-text-light);\n}\n.gs-intro[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 12px 14px;\n  margin-bottom: 16px;\n}\n.gs-intro__text[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.gs-intro__desc[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  margin: 0;\n  line-height: 1.45;\n}\n.gs-intro__desc[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n}\n.gs-create-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 8px 13px;\n  font-weight: 700;\n  font-size: 12.5px;\n  cursor: pointer;\n  flex-shrink: 0;\n  white-space: nowrap;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.28);\n  transition: opacity var(--transition), box-shadow var(--transition);\n}\n.gs-create-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  box-shadow: 0 4px 12px rgba(244, 169, 34, 0.38);\n}\n.gs-create-btn--locked[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n  box-shadow: none;\n}\n.gs-create-btn--locked[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n  opacity: 1;\n  box-shadow: none;\n}\n.gs-join-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  margin-top: 6px;\n  padding: 10px 14px;\n  border: 1px dashed var(--color-border);\n  border-radius: var(--radius-lg);\n  background: transparent;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    border-color var(--transition),\n    color var(--transition);\n  text-align: left;\n}\n.gs-join-strip[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:first-child {\n  flex-shrink: 0;\n  opacity: 0.7;\n}\n.gs-join-strip[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  border-color: var(--color-primary);\n  color: var(--color-text-secondary);\n}\n.gs-join-strip__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  flex-shrink: 0;\n}\n.gs-gate__btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 9px 20px;\n  font-weight: 700;\n  font-size: 13px;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.28);\n  transition: opacity var(--transition);\n}\n.gs-gate__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.gs-form[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 16px;\n  margin-bottom: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  animation: _ngcontent-%COMP%_gsSlideDown 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_gsSlideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.gs-form__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.gs-form__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0;\n}\n.gs-form__close[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: none;\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-md);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--color-text-muted);\n  transition: background var(--transition);\n}\n.gs-form__close[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.gs-form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  position: relative;\n}\n.gs-form__field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  letter-spacing: 0.02em;\n}\n.gs-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.gs-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 8px 10px;\n  font-size: 13px;\n  background: var(--color-bg);\n  color: var(--color-text-base);\n  transition: border-color var(--transition);\n  width: 100%;\n  box-sizing: border-box;\n}\n.gs-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.gs-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n}\n.gs-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 72px;\n}\n.gs-form__opt[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-light);\n}\n.gs-form__lock-hint[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-left: 6px;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-light);\n  vertical-align: middle;\n}\n.gs-price-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.gs-price-wrap[_ngcontent-%COMP%]   .gs-price-euro[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  pointer-events: none;\n}\n.gs-price-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-left: 24px;\n  width: 100%;\n}\n.gs-form__hint[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: var(--color-text-muted);\n  margin-top: 4px;\n}\n.gs-form__row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.gs-form__chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.gs-form__locked-spot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: var(--color-bg-muted);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 7px 10px;\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n.gs-form__locked-spot[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.gs-form__field--spot[_ngcontent-%COMP%] {\n  position: relative;\n}\n.gs-spot-pick__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border: 1px dashed var(--color-border);\n  border-radius: var(--radius-md);\n  background: transparent;\n  padding: 7px 12px;\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition: border-color var(--transition), color var(--transition);\n}\n.gs-spot-pick__btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.gs-spot-picking[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 8px 12px;\n  background: rgba(244, 169, 34, 0.08);\n  border: 1px solid rgba(244, 169, 34, 0.3);\n  border-radius: var(--radius-md);\n}\n.gs-spot-picking__msg[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: var(--color-primary);\n}\n.gs-spot-picking__msg[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.gs-spot-picking__cancel[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--color-text-muted);\n  font-size: 12px;\n  cursor: pointer;\n  padding: 0;\n  flex-shrink: 0;\n  text-decoration: underline;\n}\n.gs-spot-picking__cancel[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.gs-spot-selected[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 7px 10px;\n  background: var(--color-bg-muted);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n}\n.gs-spot-selected[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--color-primary);\n}\n.gs-spot-selected__name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.gs-spot-selected__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.gs-spot-selected__change[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 11.5px;\n  color: var(--color-primary);\n  cursor: pointer;\n  padding: 0;\n  font-weight: 600;\n}\n.gs-spot-selected__change[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.gs-spot-selected__remove[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  padding: 0;\n  text-decoration: underline;\n}\n.gs-spot-selected__remove[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n.gs-meeting-pick__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border: 1px dashed var(--color-border);\n  border-radius: var(--radius-md);\n  background: transparent;\n  padding: 7px 12px;\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition: border-color var(--transition), color var(--transition);\n}\n.gs-meeting-pick__btn[_ngcontent-%COMP%]:hover, \n.gs-meeting-pick__btn.picking[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.gs-meeting-set[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12.5px;\n  color: #22c55e;\n  font-weight: 500;\n}\n.gs-meeting-set__remove[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--color-text-muted);\n  font-size: 11.5px;\n  cursor: pointer;\n  text-decoration: underline;\n  padding: 0;\n  margin-left: 4px;\n}\n.gs-meeting-set__remove[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n.gs-meeting-confirm[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.gs-meeting-confirm__msg[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: var(--color-text-base);\n}\n.gs-meeting-confirm__msg[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.gs-meeting-confirm__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.gs-meeting-confirm__retry[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 6px 10px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: none;\n  font-size: 12.5px;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n}\n.gs-meeting-confirm__retry[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gs-meeting-confirm__ok[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 6px 10px;\n  border: none;\n  border-radius: var(--radius-md);\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 12.5px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.gs-meeting-confirm__ok[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n.gs-form__error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #dc2626;\n  margin: 0;\n}\n.gs-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n}\n.gs-form__cancel[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: transparent;\n  color: var(--color-text-muted);\n  font-size: 13px;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gs-form__cancel[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gs-form__submit[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: var(--radius-md);\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gs-form__submit[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.gs-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.gs-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 6px;\n  padding: 24px 0;\n}\n.gs-loading__dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--color-border);\n  animation: _ngcontent-%COMP%_gsDotPulse 1.2s ease-in-out infinite;\n}\n.gs-loading__dot[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.gs-loading__dot[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_gsDotPulse {\n  0%, 80%, 100% {\n    transform: scale(0.8);\n    opacity: 0.4;\n  }\n  40% {\n    transform: scale(1.1);\n    opacity: 1;\n  }\n}\n.gs-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.gs-list__count[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  color: var(--color-text-light);\n  margin-bottom: 2px;\n}\n.gs-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 6px;\n  padding: 28px 16px;\n}\n.gs-empty__icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  line-height: 1;\n  margin-bottom: 4px;\n}\n.gs-empty__msg[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  margin: 0;\n}\n.gs-empty__sub[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  margin: 0;\n}\n.gs-empty__cta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  margin-top: 8px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 8px 16px;\n  font-weight: 700;\n  font-size: 12.5px;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.28);\n  transition: opacity var(--transition);\n}\n.gs-empty__cta[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.gs-empty--spot[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(244, 169, 34, 0.05) 0%,\n      transparent 70%);\n  border: 1px dashed rgba(244, 169, 34, 0.25);\n  border-radius: var(--radius-xl);\n  padding: 24px 16px;\n}\n.gs-empty--spot[_ngcontent-%COMP%]   .gs-empty__sub[_ngcontent-%COMP%] {\n  max-width: 230px;\n  line-height: 1.5;\n}\n.gs-empty__explore[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  margin-top: 10px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 9px 18px;\n  font-weight: 700;\n  font-size: 13px;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.28);\n  transition: opacity var(--transition);\n}\n.gs-empty__explore[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.gs-my-groups[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.gs-section-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  width: 100%;\n  border: none;\n  background: none;\n  padding: 2px 0 8px;\n  cursor: pointer;\n  text-align: left;\n}\n.gs-section-label[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  color: var(--color-text-light);\n}\n.gs-section-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  border-radius: 8px;\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 9.5px;\n  font-weight: 700;\n}\n.gs-section-chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  flex-shrink: 0;\n  transition: transform var(--transition);\n  color: var(--color-text-light);\n}\n.gs-section-chevron--open[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.gs-section-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  animation: _ngcontent-%COMP%_gsSlideDown 0.18s ease;\n}\n.gs-card-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-width: 0;\n}\n.gs-archive-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  align-self: center;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: 1px solid var(--color-danger-border);\n  background: var(--color-danger-bg);\n  color: var(--color-danger);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  font-weight: 400;\n  transition: background var(--transition);\n}\n.gs-archive-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-danger-bg-hover);\n}\n.gs-past[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.gs-past__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.gs-bulk-select-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 4px 10px;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: transparent;\n  color: var(--color-text-muted);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    color var(--transition),\n    border-color var(--transition);\n}\n.gs-bulk-select-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n}\n.gs-bulk-select-btn--active[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  border-color: var(--color-text-light);\n}\n.gs-past__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n}\n.gs-past__item--selectable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.gs-past__item--selected[_ngcontent-%COMP%]   .gs-card-wrap[_ngcontent-%COMP%] {\n  outline: 2px solid var(--color-primary);\n  border-radius: var(--radius-xl);\n}\n.gs-past__checkbox[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--radius-sm);\n  border: 2px solid var(--color-border);\n  background: var(--color-bg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-top: 14px;\n  transition: border-color var(--transition), background var(--transition);\n}\n.gs-past__checkbox--checked[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: #fff;\n}\n.gs-bulk-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  padding: 10px 12px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  margin-top: 8px;\n}\n.gs-bulk-bar__count[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  flex: 1;\n  min-width: 80px;\n}\n.gs-bulk-bar__select-all[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n.gs-bulk-bar__select-all[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.gs-bulk-bar__btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n  font-size: 12.5px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition:\n    background var(--transition),\n    border-color var(--transition),\n    color var(--transition);\n}\n.gs-bulk-bar__btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gs-bulk-bar__btn--danger[_ngcontent-%COMP%] {\n  color: var(--color-danger);\n  border-color: var(--color-danger-border);\n  background: var(--color-danger-bg);\n}\n.gs-bulk-bar__btn--danger[_ngcontent-%COMP%]:hover {\n  background: var(--color-danger-bg-hover);\n}\n.gs-past__toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  flex: 1;\n  min-width: 0;\n  padding: 9px 12px;\n  border: 1px dashed var(--color-border);\n  border-radius: var(--radius-lg);\n  background: transparent;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    border-color var(--transition),\n    color var(--transition);\n}\n.gs-past__toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:first-child {\n  flex-shrink: 0;\n  opacity: 0.7;\n}\n.gs-past__toggle[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  border-color: var(--color-text-light);\n  color: var(--color-text-secondary);\n}\n.gs-past__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  flex-shrink: 0;\n  transition: transform var(--transition);\n}\n.gs-past__chevron--open[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.gs-past__list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 10px;\n  opacity: 0.72;\n  animation: _ngcontent-%COMP%_gsSlideDown 0.18s ease;\n}\n/*# sourceMappingURL=groups-section.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupsSectionComponent, { className: "GroupsSectionComponent", filePath: "src/app/features/groups/groups-section/groups-section.component.ts", lineNumber: 38 });
})();

export {
  GroupsSectionComponent
};
//# sourceMappingURL=chunk-A6G7JR7I.js.map
