import {
  PanelShellComponent
} from "./chunk-RX7SKMBG.js";
import {
  SeoService
} from "./chunk-MHTJLQEP.js";
import {
  MapBridgeService
} from "./chunk-PH3BTFK4.js";
import {
  EditProfileModalService
} from "./chunk-C4XVVHF6.js";
import {
  NOTIF_ICONS,
  NotificationService
} from "./chunk-Q2XFGS4H.js";
import "./chunk-KDEYYX4X.js";
import "./chunk-5SHRFYBE.js";
import {
  takeUntilDestroyed
} from "./chunk-TP5FMXQB.js";
import {
  Router
} from "./chunk-E53NQKQB.js";
import "./chunk-DNKJKTBS.js";
import "./chunk-GQ3SG4V7.js";
import {
  CommonModule,
  DestroyRef,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
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
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-P56CFEJA.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/map/features/notifications/notifications.component.ts
var _c0 = () => [1, 2, 3];
function NotificationsComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 8);
    \u0275\u0275listener("click", function NotificationsComponent_div_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.notifService.markAllRead());
    });
    \u0275\u0275text(4, "Mark all read");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.notifService.unreadCount(), " unread");
  }
}
function NotificationsComponent_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 11);
  }
}
function NotificationsComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, NotificationsComponent_div_3_div_1_Template, 1, 0, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function NotificationsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "path", 14)(3, "path", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 16);
    \u0275\u0275text(5, "No notifications yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 17);
    \u0275\u0275text(7, "We'll notify you about level-ups, new spots and exclusive deals.");
    \u0275\u0275elementEnd()();
  }
}
function NotificationsComponent_div_5_div_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 29);
  }
  if (rf & 2) {
    const notif_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("innerHTML", notif_r4.body, \u0275\u0275sanitizeHtml);
  }
}
function NotificationsComponent_div_5_div_1_button_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notif_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", notif_r4.action_label, " \u2192 ");
  }
}
function NotificationsComponent_div_5_div_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 31);
  }
}
function NotificationsComponent_div_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275listener("click", function NotificationsComponent_div_5_div_1_Template_div_click_0_listener() {
      const notif_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onNotifClick(notif_r4));
    });
    \u0275\u0275elementStart(1, "div", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 22)(4, "div", 23)(5, "span", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, NotificationsComponent_div_5_div_1_div_9_Template, 1, 1, "div", 26)(10, NotificationsComponent_div_5_div_1_button_10_Template, 2, 1, "button", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, NotificationsComponent_div_5_div_1_div_11_Template, 1, 0, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notif_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("nf-item--unread", !notif_r4.is_read)("nf-item--clickable", !!notif_r4.action_url);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.icons[notif_r4.type]);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(notif_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.timeAgo(notif_r4.created_at));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", notif_r4.body);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", notif_r4.action_url && notif_r4.action_label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !notif_r4.is_read);
  }
}
function NotificationsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275template(1, NotificationsComponent_div_5_div_1_Template, 12, 10, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.notifService.notifications());
  }
}
var NotificationsComponent = class _NotificationsComponent {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.seo = inject(SeoService);
    this.editProfileModal = inject(EditProfileModalService);
    this.bridge = inject(MapBridgeService);
    this.router = inject(Router);
    this.notifService = inject(NotificationService);
    this.icons = NOTIF_ICONS;
  }
  ngOnInit() {
    this.seo.setPage("notifications");
    if (!isPlatformBrowser(this.platformId))
      return;
    void this.notifService.load();
    this.bridge.enterPanelMode([]);
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta/locations", loc.slug]);
    });
  }
  onNotifClick(notif) {
    return __async(this, null, function* () {
      if (!notif.is_read)
        yield this.notifService.markRead(notif.id);
      if (!notif.action_url)
        return;
      if (notif.action_url === "#edit-profile") {
        this.router.navigate(["/malta"]);
        setTimeout(() => this.editProfileModal.open("edit"), 150);
      } else {
        this.router.navigateByUrl(notif.action_url);
      }
    });
  }
  timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1e3);
    if (diff < 60)
      return "just now";
    if (diff < 3600)
      return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)
      return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800)
      return `${Math.floor(diff / 86400)}d ago`;
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }
  static {
    this.\u0275fac = function NotificationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationsComponent, selectors: [["app-notifications"]], decls: 6, vars: 4, consts: [["title", "Notifications", 3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd"], [1, "nf-content"], ["class", "nf-topbar", 4, "ngIf"], ["class", "nf-skeleton-list", 4, "ngIf"], ["class", "nf-empty", 4, "ngIf"], ["class", "nf-list", 4, "ngIf"], [1, "nf-topbar"], [1, "nf-topbar__count"], [1, "nf-topbar__all", 3, "click"], [1, "nf-skeleton-list"], ["class", "nf-skeleton", 4, "ngFor", "ngForOf"], [1, "nf-skeleton"], [1, "nf-empty"], ["width", "36", "height", "36", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.4", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "nf-empty__icon"], ["d", "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"], ["d", "M13.73 21a2 2 0 0 1-3.46 0"], [1, "nf-empty__msg"], [1, "nf-empty__sub"], [1, "nf-list"], ["class", "nf-item", 3, "nf-item--unread", "nf-item--clickable", "click", 4, "ngFor", "ngForOf"], [1, "nf-item", 3, "click"], [1, "nf-item__icon"], [1, "nf-item__body"], [1, "nf-item__header"], [1, "nf-item__title"], [1, "nf-item__time"], ["class", "nf-item__text", 3, "innerHTML", 4, "ngIf"], ["class", "nf-item__action", 4, "ngIf"], ["class", "nf-item__dot", 4, "ngIf"], [1, "nf-item__text", 3, "innerHTML"], [1, "nf-item__action"], [1, "nf-item__dot"]], template: function NotificationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function NotificationsComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.router.navigate(["/malta"]);
        })("dragStart", function NotificationsComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function NotificationsComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function NotificationsComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function NotificationsComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function NotificationsComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function NotificationsComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275template(2, NotificationsComponent_div_2_Template, 5, 1, "div", 2)(3, NotificationsComponent_div_3_Template, 2, 2, "div", 3)(4, NotificationsComponent_div_4_Template, 8, 0, "div", 4)(5, NotificationsComponent_div_5_Template, 2, 1, "div", 5);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.notifService.unreadCount() > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.notifService.loaded());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.notifService.loaded() && !ctx.notifService.notifications().length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.notifService.notifications().length);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, PanelShellComponent], styles: ["\n\n.nf-content[_ngcontent-%COMP%] {\n  padding: 0 0 40px;\n}\n.nf-topbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 16px;\n  border-bottom: 1px solid var(--color-border);\n}\n.nf-topbar__count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.nf-topbar__all[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-primary);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n}\n.nf-topbar__all[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.nf-skeleton-list[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.nf-skeleton[_ngcontent-%COMP%] {\n  height: 68px;\n  border-radius: var(--radius-lg);\n  background:\n    linear-gradient(\n      90deg,\n      var(--color-bg-muted) 25%,\n      var(--color-bg-hover) 50%,\n      var(--color-bg-muted) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.nf-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 56px 24px;\n  gap: 8px;\n  text-align: center;\n}\n.nf-empty__icon[_ngcontent-%COMP%] {\n  color: var(--color-text-light);\n}\n.nf-empty__msg[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0;\n}\n.nf-empty__sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.nf-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.nf-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 14px 16px;\n  border-bottom: 1px solid var(--color-border);\n  position: relative;\n  transition: background var(--transition);\n}\n.nf-item--unread[_ngcontent-%COMP%] {\n  background: #fafaf7;\n}\n.nf-item--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.nf-item--clickable[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-hover);\n}\n.nf-item__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 1.3rem;\n  margin-top: 1px;\n}\n.nf-item__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.nf-item__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n}\n.nf-item__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  line-height: 1.35;\n  flex: 1;\n}\n.nf-item--unread[_ngcontent-%COMP%]   .nf-item__title[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.nf-item__time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--color-text-light);\n  white-space: nowrap;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.nf-item__text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  line-height: 1.5;\n}\n.nf-item__text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n}\n.nf-item__text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.nf-item__text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-base);\n}\n.nf-item__action[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-primary);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  margin-top: 2px;\n}\n.nf-item__dot[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  margin-top: 5px;\n}\n/*# sourceMappingURL=notifications.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationsComponent, { className: "NotificationsComponent", filePath: "src/app/map/features/notifications/notifications.component.ts", lineNumber: 19 });
})();
export {
  NotificationsComponent
};
//# sourceMappingURL=chunk-H4C7SLCO.js.map
