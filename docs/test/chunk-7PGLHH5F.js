import {
  GroupsService
} from "./chunk-WJIFIVQH.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-GAHH5VWE.js";
import {
  PanelShellComponent
} from "./chunk-I4S6X6HF.js";
import "./chunk-AUG5IYR7.js";
import "./chunk-HPOPY4XD.js";
import "./chunk-ZGA5L2H3.js";
import {
  MapBridgeService
} from "./chunk-ZNYX4FBW.js";
import "./chunk-YJYHGMFB.js";
import {
  Router
} from "./chunk-6DNTZJP4.js";
import "./chunk-CGA4Y22O.js";
import {
  PLATFORM_ID,
  __async,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E43Y6J77.js";

// src/app/platform/admin-panel/admin-panel.component.ts
function AdminPanelComponent_Conditional_7_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.migrateResult());
  }
}
function AdminPanelComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "p", 5);
    \u0275\u0275text(2, "Data maintenance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 6)(4, "div", 7)(5, "span", 8);
    \u0275\u0275text(6, "Fix groups data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 9);
    \u0275\u0275text(8, "Backfill leaderIsAdmin + completedAt on all group docs");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 10);
    \u0275\u0275listener("click", function AdminPanelComponent_Conditional_7_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runMigration());
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, AdminPanelComponent_Conditional_7_Conditional_11_Template, 2, 1, "p", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r1.migrating());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.migrating() ? "Updating\u2026" : "\u{1F527} Run", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.migrateResult() ? 11 : -1);
  }
}
function AdminPanelComponent_Conditional_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.activateResult());
  }
}
function AdminPanelComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "p", 5);
    \u0275\u0275text(2, "Early access");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 12);
    \u0275\u0275text(4, "Enter the user's email to grant Groups access. Takes effect on their next login.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 13)(6, "input", 14);
    \u0275\u0275listener("ngModelChange", function AdminPanelComponent_Conditional_8_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activateEmail.set($event));
    })("keydown.enter", function AdminPanelComponent_Conditional_8_Template_input_keydown_enter_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activateGroupsForUser());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 15);
    \u0275\u0275listener("click", function AdminPanelComponent_Conditional_8_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activateGroupsForUser());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, AdminPanelComponent_Conditional_8_Conditional_9_Template, 2, 1, "p", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r1.activateEmail());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.activating() || !ctx_r1.activateEmail().trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.activating() ? "\u2026" : "Activate", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activateResult() ? 9 : -1);
  }
}
var AdminPanelComponent = class _AdminPanelComponent {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.router = inject(Router);
    this.bridge = inject(MapBridgeService);
    this.groupsService = inject(GroupsService);
    this.adminView = signal("groups");
    this.migrating = signal(false);
    this.migrateResult = signal(null);
    this.activating = signal(false);
    this.activateEmail = signal("");
    this.activateResult = signal(null);
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    this.bridge.enterPanelMode([]);
    this.bridge.floatingBackBtn.set(null);
  }
  runMigration() {
    return __async(this, null, function* () {
      this.migrating.set(true);
      this.migrateResult.set(null);
      try {
        const [leaderCount, completedAtCount] = yield Promise.all([
          this.groupsService.migrateLeaderIsAdmin(),
          this.groupsService.migrateCompletedAt()
        ]);
        const parts = [];
        if (leaderCount > 0)
          parts.push(`${leaderCount} leaderIsAdmin updated`);
        if (completedAtCount > 0)
          parts.push(`${completedAtCount} completedAt backfilled`);
        this.migrateResult.set(parts.length ? `\u2705 Done \u2014 ${parts.join(", ")}.` : "\u2705 Nothing to fix \u2014 all data is up to date.");
      } catch (e) {
        this.migrateResult.set(`\u274C Error: ${e instanceof Error ? e.message : "Unknown error"}`);
      } finally {
        this.migrating.set(false);
      }
    });
  }
  activateGroupsForUser() {
    return __async(this, null, function* () {
      const email = this.activateEmail().trim();
      if (!email)
        return;
      this.activating.set(true);
      this.activateResult.set(null);
      try {
        const result = yield this.groupsService.activateGroupsAccess(email);
        if (result === "not_found") {
          this.activateResult.set("\u274C No user found with that email.");
        } else {
          this.activateResult.set(`\u2705 Groups activated for ${email}`);
          this.activateEmail.set("");
        }
      } catch (e) {
        this.activateResult.set(`\u274C Error: ${e instanceof Error ? e.message : "Unknown error"}`);
      } finally {
        this.activating.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function AdminPanelComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminPanelComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPanelComponent, selectors: [["app-admin-panel"]], decls: 9, vars: 6, consts: [["title", "Admin Panel", 3, "closeRequested"], [1, "ap-content"], [1, "ap-tabs"], [1, "ap-tab", 3, "click"], [1, "ap-view"], [1, "ap-view__title"], [1, "ap-action"], [1, "ap-action__info"], [1, "ap-action__label"], [1, "ap-action__desc"], [1, "ap-action__btn", 3, "click", "disabled"], [1, "ap-result"], [1, "ap-view__desc"], [1, "ap-input-row"], ["type", "email", "placeholder", "user@email.com", 1, "ap-email-input", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "ap-submit-btn", 3, "click", "disabled"]], template: function AdminPanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function AdminPanelComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.router.navigate(["/malta"]);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "button", 3);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_button_click_3_listener() {
          return ctx.adminView.set("groups");
        });
        \u0275\u0275text(4, " Groups ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 3);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_button_click_5_listener() {
          return ctx.adminView.set("users");
        });
        \u0275\u0275text(6, " Users ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, AdminPanelComponent_Conditional_7_Template, 12, 3, "div", 4)(8, AdminPanelComponent_Conditional_8_Template, 10, 4, "div", 4);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275classProp("ap-tab--active", ctx.adminView() === "groups");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("ap-tab--active", ctx.adminView() === "users");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.adminView() === "groups" ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.adminView() === "users" ? 8 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, PanelShellComponent], styles: ["\n\n.ap-content[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.ap-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 1px solid var(--color-border);\n  background: var(--color-bg-light);\n}\n.ap-tab[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 0;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  cursor: pointer;\n  transition: all var(--transition);\n}\n.ap-tab[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n  background: var(--color-bg-muted);\n}\n.ap-tab--active[_ngcontent-%COMP%] {\n  color: var(--color-text-base);\n  background: var(--color-bg);\n  border-bottom-color: var(--color-primary);\n}\n.ap-view[_ngcontent-%COMP%] {\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.ap-view__title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: var(--color-text-muted);\n  margin: 0;\n}\n.ap-view__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n  margin: 0;\n}\n.ap-action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 12px 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n}\n.ap-action__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n  min-width: 0;\n}\n.ap-action__label[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: var(--color-text-base);\n}\n.ap-action__desc[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.ap-action__btn[_ngcontent-%COMP%] {\n  padding: 7px 14px;\n  font-size: 12.5px;\n  font-weight: 600;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background var(--transition);\n}\n.ap-action__btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.ap-action__btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.ap-input-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.ap-email-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  padding: 9px 12px;\n  font-size: 13px;\n  font-family: inherit;\n  color: var(--color-text-base);\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  outline: none;\n}\n.ap-email-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n}\n.ap-email-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-text-light);\n}\n.ap-submit-btn[_ngcontent-%COMP%] {\n  padding: 9px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  border-radius: var(--radius-md);\n  border: none;\n  background: var(--color-primary);\n  color: #fff;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: opacity var(--transition);\n}\n.ap-submit-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.ap-submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.ap-result[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  margin: 0;\n  padding: 10px 14px;\n  background: var(--color-bg-light);\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n}\n/*# sourceMappingURL=admin-panel.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPanelComponent, { className: "AdminPanelComponent", filePath: "src/app/platform/admin-panel/admin-panel.component.ts", lineNumber: 222 });
})();
export {
  AdminPanelComponent
};
//# sourceMappingURL=chunk-7PGLHH5F.js.map
