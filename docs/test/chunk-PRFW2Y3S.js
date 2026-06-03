import {
  GroupsService
} from "./chunk-VJHN52IH.js";
import {
  PanelShellComponent
} from "./chunk-OCC7J5OB.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-Z3QOGP5K.js";
import "./chunk-HSUZIJJG.js";
import "./chunk-4VPY4RR2.js";
import "./chunk-YJZWMVU3.js";
import "./chunk-PHYDDMB4.js";
import "./chunk-LZQGUYST.js";
import {
  supabase
} from "./chunk-ETILE57P.js";
import "./chunk-57Q4R6WH.js";
import {
  MapBridgeService
} from "./chunk-3RZU6AR3.js";
import {
  takeUntilDestroyed
} from "./chunk-3HMSICCD.js";
import {
  Router
} from "./chunk-JZVCYE4P.js";
import "./chunk-UEIPWXE7.js";
import {
  CommonModule,
  DatePipe,
  DestroyRef,
  PLATFORM_ID,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-435XO7VF.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/pages/admin/admin-panel.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminPanelComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.reports().length);
  }
}
function AdminPanelComponent_Conditional_12_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.migrateResult());
  }
}
function AdminPanelComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "p", 6);
    \u0275\u0275text(2, "Data maintenance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 7)(4, "div", 8)(5, "span", 9);
    \u0275\u0275text(6, "Fix groups data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 10);
    \u0275\u0275text(8, "Backfill leaderIsAdmin + completedAt on all group docs");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 11);
    \u0275\u0275listener("click", function AdminPanelComponent_Conditional_12_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.runMigration());
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, AdminPanelComponent_Conditional_12_Conditional_11_Template, 2, 1, "p", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r0.migrating());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.migrating() ? "Updating\u2026" : "\u{1F527} Run", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.migrateResult() ? 11 : -1);
  }
}
function AdminPanelComponent_Conditional_13_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.activateResult());
  }
}
function AdminPanelComponent_Conditional_13_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.guideResult());
  }
}
function AdminPanelComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "p", 6);
    \u0275\u0275text(2, "Early access");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, "Enter the user's email to grant Groups access. Takes effect on their next login.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14)(6, "input", 15);
    \u0275\u0275listener("ngModelChange", function AdminPanelComponent_Conditional_13_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activateEmail.set($event));
    })("keydown.enter", function AdminPanelComponent_Conditional_13_Template_input_keydown_enter_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activateGroupsForUser());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 16);
    \u0275\u0275listener("click", function AdminPanelComponent_Conditional_13_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activateGroupsForUser());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, AdminPanelComponent_Conditional_13_Conditional_9_Template, 2, 1, "p", 12);
    \u0275\u0275elementStart(10, "p", 17);
    \u0275\u0275text(11, "Grant guide role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 13);
    \u0275\u0275text(13, "Guides can set a price on their group tours. Takes effect on their next login.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 14)(15, "input", 15);
    \u0275\u0275listener("ngModelChange", function AdminPanelComponent_Conditional_13_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.guideEmail.set($event));
    })("keydown.enter", function AdminPanelComponent_Conditional_13_Template_input_keydown_enter_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activateGuideForUser());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 16);
    \u0275\u0275listener("click", function AdminPanelComponent_Conditional_13_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activateGuideForUser());
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, AdminPanelComponent_Conditional_13_Conditional_18_Template, 2, 1, "p", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r0.activateEmail());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.activating() || !ctx_r0.activateEmail().trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.activating() ? "\u2026" : "Activate", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.activateResult() ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r0.guideEmail());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.activatingGuide() || !ctx_r0.guideEmail().trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.activatingGuide() ? "\u2026" : "Grant", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.guideResult() ? 18 : -1);
  }
}
function AdminPanelComponent_Conditional_14_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.notifResult());
  }
}
function AdminPanelComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "p", 6);
    \u0275\u0275text(2, "Send notification");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, "Leave target email blank to broadcast to all users.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 18);
    \u0275\u0275listener("ngModelChange", function AdminPanelComponent_Conditional_14_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.notifType.set($event));
    });
    \u0275\u0275elementStart(6, "option", 19);
    \u0275\u0275text(7, "\u{1F4E2} Announcement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 20);
    \u0275\u0275text(9, "\u{1F514} Info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 21);
    \u0275\u0275text(11, "\u{1F4CD} New location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 22);
    \u0275\u0275text(13, "\u{1F3F7}\uFE0F Deal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 23);
    \u0275\u0275text(15, "\u{1F3C6} Achievement");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "input", 24);
    \u0275\u0275listener("ngModelChange", function AdminPanelComponent_Conditional_14_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.notifTitle.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 25);
    \u0275\u0275listener("ngModelChange", function AdminPanelComponent_Conditional_14_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.notifBody.set($event));
    });
    \u0275\u0275text(18, "            ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 26);
    \u0275\u0275listener("ngModelChange", function AdminPanelComponent_Conditional_14_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.notifTarget.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 27);
    \u0275\u0275listener("ngModelChange", function AdminPanelComponent_Conditional_14_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.notifActionUrl.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 28);
    \u0275\u0275listener("ngModelChange", function AdminPanelComponent_Conditional_14_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.notifActionLabel.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 29);
    \u0275\u0275listener("click", function AdminPanelComponent_Conditional_14_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sendNotification());
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, AdminPanelComponent_Conditional_14_Conditional_24_Template, 2, 1, "p", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r0.notifType());
    \u0275\u0275advance(11);
    \u0275\u0275property("ngModel", ctx_r0.notifTitle());
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r0.notifBody());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r0.notifTarget());
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r0.notifActionUrl());
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r0.notifActionLabel());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.notifSending() || !ctx_r0.notifTitle().trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.notifSending() ? "Sending\u2026" : "\u{1F514} Send", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.notifResult() ? 24 : -1);
  }
}
function AdminPanelComponent_Conditional_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelComponent_Conditional_15_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "No reports \u2014 all clear \u2705");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelComponent_Conditional_15_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "span", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 34);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 35);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 36);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 37)(12, "button", 38);
    \u0275\u0275listener("click", function AdminPanelComponent_Conditional_15_Conditional_5_For_2_Template_button_click_12_listener() {
      const r_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.dismissReport(r_r6.id));
    });
    \u0275\u0275text(13, "Dismiss");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 39);
    \u0275\u0275listener("click", function AdminPanelComponent_Conditional_15_Conditional_5_For_2_Template_button_click_14_listener() {
      const r_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteReportedMessage(r_r6));
    });
    \u0275\u0275text(15, "Delete message");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r6.group_title || r_r6.group_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 4, r_r6.created_at, "d MMM \xB7 HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1('"', r_r6.message_text, '"');
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Reported by ", r_r6.reporter_name, "");
  }
}
function AdminPanelComponent_Conditional_15_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275repeaterCreate(1, AdminPanelComponent_Conditional_15_Conditional_5_For_2_Template, 16, 7, "div", 31, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.reports());
  }
}
function AdminPanelComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "p", 6);
    \u0275\u0275text(2, "Reported messages");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminPanelComponent_Conditional_15_Conditional_3_Template, 2, 0, "p", 13)(4, AdminPanelComponent_Conditional_15_Conditional_4_Template, 2, 0, "p", 13)(5, AdminPanelComponent_Conditional_15_Conditional_5_Template, 3, 0, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.reportsLoading() ? 3 : ctx_r0.reports().length === 0 ? 4 : 5);
  }
}
var AdminPanelComponent = class _AdminPanelComponent {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.router = inject(Router);
    this.bridge = inject(MapBridgeService);
    this.destroyRef = inject(DestroyRef);
    this.groupsService = inject(GroupsService);
    this.adminView = signal("groups");
    this.migrating = signal(false);
    this.migrateResult = signal(null);
    this.activating = signal(false);
    this.activateEmail = signal("");
    this.activateResult = signal(null);
    this.activatingGuide = signal(false);
    this.guideEmail = signal("");
    this.guideResult = signal(null);
    this.reports = signal([]);
    this.reportsLoading = signal(false);
    this.notifType = signal("announcement");
    this.notifTitle = signal("");
    this.notifBody = signal("");
    this.notifTarget = signal("");
    this.notifActionUrl = signal("");
    this.notifActionLabel = signal("");
    this.notifSending = signal(false);
    this.notifResult = signal(null);
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    this.bridge.enterPanelMode([]);
    this.bridge.floatingBackBtn.set(null);
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta/locations", loc.slug]);
    });
  }
  runMigration() {
    return __async(this, null, function* () {
      this.migrating.set(true);
      this.migrateResult.set(null);
      try {
        const completedAtCount = yield this.groupsService.migrateCompletedAt();
        const parts = [];
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
  loadReports() {
    return __async(this, null, function* () {
      if (this.reportsLoading())
        return;
      this.reportsLoading.set(true);
      try {
        this.reports.set(yield this.groupsService.fetchReports());
      } finally {
        this.reportsLoading.set(false);
      }
    });
  }
  dismissReport(reportId) {
    return __async(this, null, function* () {
      yield this.groupsService.dismissReport(reportId);
      this.reports.update((rs) => rs.filter((r) => r.id !== reportId));
    });
  }
  deleteReportedMessage(r) {
    return __async(this, null, function* () {
      yield this.groupsService.deleteReportedMessage(r.group_id, r.message_id, r.id);
      this.reports.update((rs) => rs.filter((x) => x.id !== r.id));
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
  activateGuideForUser() {
    return __async(this, null, function* () {
      const email = this.guideEmail().trim();
      if (!email)
        return;
      this.activatingGuide.set(true);
      this.guideResult.set(null);
      try {
        const result = yield this.groupsService.activateGuideRole(email);
        if (result === "not_found") {
          this.guideResult.set("\u274C No user found with that email.");
        } else {
          this.guideResult.set(`\u2705 Guide role granted to ${email}`);
          this.guideEmail.set("");
        }
      } catch (e) {
        this.guideResult.set(`\u274C Error: ${e instanceof Error ? e.message : "Unknown error"}`);
      } finally {
        this.activatingGuide.set(false);
      }
    });
  }
  sendNotification() {
    return __async(this, null, function* () {
      const title = this.notifTitle().trim();
      if (!title)
        return;
      this.notifSending.set(true);
      this.notifResult.set(null);
      try {
        let targetUserId = null;
        const email = this.notifTarget().trim();
        if (email) {
          const { data } = yield supabase.from("users").select("id").eq("email", email).maybeSingle();
          if (!data) {
            this.notifResult.set("\u274C No user found with that email.");
            return;
          }
          targetUserId = data["id"];
        }
        const { error } = yield supabase.rpc("admin_create_notification", {
          p_type: this.notifType(),
          p_title: title,
          p_body: this.notifBody().trim() || null,
          p_target_user: targetUserId,
          p_action_url: this.notifActionUrl().trim() || null,
          p_action_label: this.notifActionLabel().trim() || null,
          p_image_url: null,
          p_expires_at: null
        });
        if (error)
          throw error;
        this.notifResult.set(targetUserId ? `\u2705 Notification sent to ${email}` : "\u2705 Broadcast sent to all users");
        this.notifTitle.set("");
        this.notifBody.set("");
        this.notifTarget.set("");
        this.notifActionUrl.set("");
        this.notifActionLabel.set("");
      } catch (e) {
        this.notifResult.set(`\u274C Error: ${e instanceof Error ? e.message : "Unknown error"}`);
      } finally {
        this.notifSending.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function AdminPanelComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminPanelComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPanelComponent, selectors: [["app-admin-panel"]], decls: 16, vars: 13, consts: [["title", "Admin Panel", 3, "closeRequested"], [1, "ap-content"], [1, "ap-tabs"], [1, "ap-tab", 3, "click"], [1, "ap-tab__badge"], [1, "ap-view"], [1, "ap-view__title"], [1, "ap-action"], [1, "ap-action__info"], [1, "ap-action__label"], [1, "ap-action__desc"], [1, "ap-action__btn", 3, "click", "disabled"], [1, "ap-result"], [1, "ap-view__desc"], [1, "ap-input-row"], ["type", "email", "placeholder", "user@email.com", 1, "ap-email-input", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "ap-submit-btn", 3, "click", "disabled"], [1, "ap-view__title", 2, "margin-top", "20px"], [1, "ap-email-input", 2, "height", "38px", 3, "ngModelChange", "ngModel"], ["value", "announcement"], ["value", "info"], ["value", "new_location"], ["value", "deal"], ["value", "achievement"], ["type", "text", "placeholder", "Title *", 1, "ap-email-input", 3, "ngModelChange", "ngModel"], ["rows", "4", "placeholder", "Body (HTML supported)", 1, "ap-email-input", 2, "height", "auto", "padding", "9px 12px", "resize", "vertical", 3, "ngModelChange", "ngModel"], ["type", "email", "placeholder", "Target email (blank = everyone)", 1, "ap-email-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Action URL (e.g. /malta/locations/babu-valley)", 1, "ap-email-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Action label (e.g. View location)", 1, "ap-email-input", 3, "ngModelChange", "ngModel"], [1, "ap-submit-btn", 2, "align-self", "flex-start", "padding", "9px 20px", 3, "click", "disabled"], [1, "ap-reports"], [1, "ap-report"], [1, "ap-report__meta"], [1, "ap-report__group"], [1, "ap-report__time"], [1, "ap-report__text"], [1, "ap-report__reporter"], [1, "ap-report__actions"], [1, "ap-report__btn", "ap-report__btn--dismiss", 3, "click"], [1, "ap-report__btn", "ap-report__btn--delete", 3, "click"]], template: function AdminPanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function AdminPanelComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.router.navigate(["/malta"]);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "button", 3);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_button_click_3_listener() {
          return ctx.adminView.set("groups");
        });
        \u0275\u0275text(4, "Groups");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 3);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_button_click_5_listener() {
          return ctx.adminView.set("users");
        });
        \u0275\u0275text(6, "Users");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 3);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_button_click_7_listener() {
          ctx.adminView.set("reports");
          return ctx.loadReports();
        });
        \u0275\u0275text(8, " Reports ");
        \u0275\u0275template(9, AdminPanelComponent_Conditional_9_Template, 2, 1, "span", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 3);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_button_click_10_listener() {
          return ctx.adminView.set("notifications");
        });
        \u0275\u0275text(11, "Notify");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(12, AdminPanelComponent_Conditional_12_Template, 12, 3, "div", 5)(13, AdminPanelComponent_Conditional_13_Template, 19, 8, "div", 5)(14, AdminPanelComponent_Conditional_14_Template, 25, 9, "div", 5)(15, AdminPanelComponent_Conditional_15_Template, 6, 1, "div", 5);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275classProp("ap-tab--active", ctx.adminView() === "groups");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("ap-tab--active", ctx.adminView() === "users");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("ap-tab--active", ctx.adminView() === "reports");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.reports().length ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("ap-tab--active", ctx.adminView() === "notifications");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.adminView() === "groups" ? 12 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.adminView() === "users" ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.adminView() === "notifications" ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.adminView() === "reports" ? 15 : -1);
      }
    }, dependencies: [CommonModule, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, PanelShellComponent], styles: ["\n\n.ap-content[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.ap-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 1px solid var(--color-border);\n  background: var(--color-bg-light);\n}\n.ap-tab[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 0;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  cursor: pointer;\n  transition: all var(--transition);\n}\n.ap-tab[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n  background: var(--color-bg-muted);\n}\n.ap-tab--active[_ngcontent-%COMP%] {\n  color: var(--color-text-base);\n  background: var(--color-bg);\n  border-bottom-color: var(--color-primary);\n}\n.ap-view[_ngcontent-%COMP%] {\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.ap-view__title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: var(--color-text-muted);\n  margin: 0;\n}\n.ap-view__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n  margin: 0;\n}\n.ap-action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 12px 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n}\n.ap-action__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n  min-width: 0;\n}\n.ap-action__label[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: var(--color-text-base);\n}\n.ap-action__desc[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.ap-action__btn[_ngcontent-%COMP%] {\n  padding: 7px 14px;\n  font-size: 12.5px;\n  font-weight: 600;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background var(--transition);\n}\n.ap-action__btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.ap-action__btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.ap-input-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.ap-email-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  padding: 9px 12px;\n  font-size: 13px;\n  font-family: inherit;\n  color: var(--color-text-base);\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  outline: none;\n}\n.ap-email-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n}\n.ap-email-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-text-light);\n}\n.ap-submit-btn[_ngcontent-%COMP%] {\n  padding: 9px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  border-radius: var(--radius-md);\n  border: none;\n  background: var(--color-primary);\n  color: #fff;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: opacity var(--transition);\n}\n.ap-submit-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.ap-submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.ap-result[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  margin: 0;\n  padding: 10px 14px;\n  background: var(--color-bg-light);\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n}\n.ap-tab__badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  border-radius: 8px;\n  background: #ef4444;\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  margin-left: 5px;\n  line-height: 1;\n}\n.ap-reports[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.ap-report[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 12px 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n}\n.ap-report__meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n}\n.ap-report__group[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 700;\n  color: var(--color-text-secondary);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ap-report__time[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  color: var(--color-text-light);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.ap-report__text[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-base);\n  margin: 0;\n  line-height: 1.45;\n  word-break: break-word;\n}\n.ap-report__reporter[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--color-text-muted);\n  margin: 0;\n}\n.ap-report__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  margin-top: 2px;\n}\n.ap-report__btn[_ngcontent-%COMP%] {\n  padding: 5px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.ap-report__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.ap-report__btn--dismiss[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n}\n.ap-report__btn--delete[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n  border-color: #fecaca;\n}\n/*# sourceMappingURL=admin-panel.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPanelComponent, { className: "AdminPanelComponent", filePath: "src/app/pages/admin/admin-panel.component.ts", lineNumber: 423 });
})();
export {
  AdminPanelComponent
};
//# sourceMappingURL=chunk-PRFW2Y3S.js.map
