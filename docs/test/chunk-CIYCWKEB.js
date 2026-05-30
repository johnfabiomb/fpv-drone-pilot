import {
  ConfirmPopupComponent
} from "./chunk-AKM6FMWJ.js";
import {
  ShareButtonComponent
} from "./chunk-QMU2GGOS.js";
import {
  AnalyticsService,
  CooldownError,
  GroupFullError,
  GroupsService,
  LeaderMustTransferError,
  MemberAvatarsComponent,
  SpamMutedError
} from "./chunk-X7IW3OSY.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-GAHH5VWE.js";
import {
  PanelShellComponent
} from "./chunk-I4S6X6HF.js";
import {
  normalizeForSearch
} from "./chunk-SFBGFQ5L.js";
import {
  AppModalComponent
} from "./chunk-6W5N77V2.js";
import {
  UserAvatarComponent
} from "./chunk-P2CHI26T.js";
import {
  UserDataService
} from "./chunk-44EY3WPE.js";
import {
  AuthService
} from "./chunk-HPOPY4XD.js";
import {
  SeoService
} from "./chunk-VC44GQGP.js";
import {
  locations
} from "./chunk-ZGA5L2H3.js";
import {
  MapBridgeService
} from "./chunk-ZNYX4FBW.js";
import {
  takeUntilDestroyed
} from "./chunk-YJYHGMFB.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-6DNTZJP4.js";
import "./chunk-CGA4Y22O.js";
import {
  CommonModule,
  DOCUMENT,
  DatePipe,
  DestroyRef,
  NgForOf,
  NgIf,
  NgTemplateOutlet,
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
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-E43Y6J77.js";

// src/app/platform/group-detail/group-detail.component.ts
var _c0 = ["messagesEnd"];
var _c1 = ["messagesContainer"];
function GroupDetailComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "span", 10)(2, "span", 10)(3, "span", 10);
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_div_1_ul_20_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 45);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_ul_20_li_1_Template_li_click_0_listener() {
      const s_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectEditSpot(s_r4));
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
function GroupDetailComponent_ng_container_4_div_1_ul_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 43);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_div_1_ul_20_li_1_Template, 2, 1, "li", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.editSpotResults());
  }
}
function GroupDetailComponent_ng_container_4_div_1_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 47);
    \u0275\u0275element(2, "polyline", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editSpotTitle, " ");
  }
}
function GroupDetailComponent_ng_container_4_div_1_div_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "span", 50);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 51);
    \u0275\u0275element(3, "path", 52)(4, "circle", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Is this the right spot? ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 54)(7, "button", 55);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_div_58_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.retryEditMeetingPoint());
    });
    \u0275\u0275text(8, "Try again");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 56);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_div_58_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmEditMeetingPoint());
    });
    \u0275\u0275text(10, "Confirm");
    \u0275\u0275elementEnd()()();
  }
}
function GroupDetailComponent_ng_container_4_div_1_div_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "button", 58);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_div_59_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.startEditPickingPoint());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 51);
    \u0275\u0275element(3, "path", 52)(4, "circle", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Pin on map ");
    \u0275\u0275elementEnd()();
  }
}
function GroupDetailComponent_ng_container_4_div_1_div_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 51);
    \u0275\u0275element(2, "polyline", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Meeting point set ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "button", 60);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_div_60_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.clearEditMeetingPoint());
    });
    \u0275\u0275text(5, "Remove");
    \u0275\u0275elementEnd()();
  }
}
function GroupDetailComponent_ng_container_4_div_1_p_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.editError());
  }
}
function GroupDetailComponent_ng_container_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "div", 16)(3, "h3", 17);
    \u0275\u0275text(4, "Edit group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 18);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelEdit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 19);
    \u0275\u0275element(7, "line", 20)(8, "line", 21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 22)(10, "label");
    \u0275\u0275text(11, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function GroupDetailComponent_ng_container_4_div_1_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editTitle, $event) || (ctx_r1.editTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 22)(14, "label");
    \u0275\u0275text(15, "Location ");
    \u0275\u0275elementStart(16, "span", 24);
    \u0275\u0275text(17, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 25)(19, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function GroupDetailComponent_ng_container_4_div_1_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editSpotSearch, $event) || (ctx_r1.editSpotSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function GroupDetailComponent_ng_container_4_div_1_Template_input_input_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEditSpotInput());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, GroupDetailComponent_ng_container_4_div_1_ul_20_Template, 2, 1, "ul", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, GroupDetailComponent_ng_container_4_div_1_span_21_Template, 4, 1, "span", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 29)(23, "div", 22)(24, "label");
    \u0275\u0275text(25, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function GroupDetailComponent_ng_container_4_div_1_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editDate, $event) || (ctx_r1.editDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 22)(28, "label");
    \u0275\u0275text(29, "Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function GroupDetailComponent_ng_container_4_div_1_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editTime, $event) || (ctx_r1.editTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 22)(32, "label");
    \u0275\u0275text(33, "Difficulty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 32)(35, "span", 33);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_Template_span_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editDifficulty = "easy");
    });
    \u0275\u0275text(36, "Easy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 33);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_Template_span_click_37_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editDifficulty = "moderate");
    });
    \u0275\u0275text(38, "Moderate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 33);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_Template_span_click_39_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editDifficulty = "hard");
    });
    \u0275\u0275text(40, "Hard");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 22)(42, "label");
    \u0275\u0275text(43, "Description ");
    \u0275\u0275elementStart(44, "span", 24);
    \u0275\u0275text(45, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "textarea", 34);
    \u0275\u0275twoWayListener("ngModelChange", function GroupDetailComponent_ng_container_4_div_1_Template_textarea_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editDescription, $event) || (ctx_r1.editDescription = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 22)(48, "label");
    \u0275\u0275text(49, "Max members ");
    \u0275\u0275elementStart(50, "span", 24);
    \u0275\u0275text(51, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function GroupDetailComponent_ng_container_4_div_1_Template_input_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editMaxMembers, $event) || (ctx_r1.editMaxMembers = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 22)(54, "label");
    \u0275\u0275text(55, "Meeting point ");
    \u0275\u0275elementStart(56, "span", 24);
    \u0275\u0275text(57, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(58, GroupDetailComponent_ng_container_4_div_1_div_58_Template, 11, 0, "div", 36)(59, GroupDetailComponent_ng_container_4_div_1_div_59_Template, 6, 0, "div", 37)(60, GroupDetailComponent_ng_container_4_div_1_div_60_Template, 6, 0, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275template(61, GroupDetailComponent_ng_container_4_div_1_p_61_Template, 2, 1, "p", 39);
    \u0275\u0275elementStart(62, "div", 40)(63, "button", 41);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelEdit());
    });
    \u0275\u0275text(64, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "button", 42);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_div_1_Template_button_click_65_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitEdit());
    });
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editTitle);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editSpotSearch);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editSpotResults().length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editSpotSlug);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editTime);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r1.editDifficulty === "easy");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.editDifficulty === "moderate");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.editDifficulty === "hard");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editDescription);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editMaxMembers);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.editPendingMeetingPoint());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.editMeetingPoint && !ctx_r1.editPendingMeetingPoint());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editMeetingPoint && !ctx_r1.editPendingMeetingPoint());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editError());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.editBusy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editBusy() ? "Saving\u2026" : "Save changes", " ");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_button_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.showSpotOnMap());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 85);
    \u0275\u0275element(2, "path", 52)(3, "circle", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.group.spotTitle, " ");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275text(1, "No location set");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 87);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.group.description);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88);
    \u0275\u0275text(1, " \u{1F9ED} This group is currently exploring! ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 89);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.showMeetingModal.set(true));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 90);
    \u0275\u0275element(2, "path", 52)(3, "circle", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Meeting point set ");
    \u0275\u0275elementStart(5, "svg", 91);
    \u0275\u0275element(6, "polyline", 92);
    \u0275\u0275elementEnd()();
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 100);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.join());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.actionBusy() ? "Joining\u2026" : "Join group", " ");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 101);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.confirmingAction.set("leave"));
    });
    \u0275\u0275text(1, " Leave group ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_div_3_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 106);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_div_3_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.confirmingAction.set("explore"));
    });
    \u0275\u0275text(1, " \u{1F9ED} Start exploring ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_div_3_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 107);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_div_3_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.confirmingAction.set("cancel"));
    });
    \u0275\u0275text(1, " Cancel group ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 102);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_div_3_button_1_Template, 2, 1, "button", 103);
    \u0275\u0275elementStart(2, "div", 104)(3, "button", 101);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_div_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.confirmingAction.set("leave"));
    });
    \u0275\u0275text(4, " Leave group ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_div_3_button_5_Template, 2, 1, "button", 105);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canStartExploring);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.group.status !== "cancelled" && ctx_r1.group.status !== "exploring");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 108);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.openEdit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 90);
    \u0275\u0275element(2, "path", 109)(3, "path", 110);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Edit group ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_app_confirm_popup_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 111);
    \u0275\u0275listener("confirmed", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_app_confirm_popup_5_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.executeConfirmedAction());
    })("cancelled", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_app_confirm_popup_5_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.confirmingAction.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("fixed", true)("message", ctx_r1.confirmingAction() === "leave" ? "Leave this group?" : ctx_r1.confirmingAction() === "explore" ? "Start exploring? No new members can join once you begin." : "Cancel this group? All members will be notified.")("confirmLabel", ctx_r1.confirmingAction() === "leave" ? "Leave" : ctx_r1.confirmingAction() === "explore" ? "Start exploring" : "Cancel group")("cancelLabel", ctx_r1.confirmingAction() === "leave" ? "Stay" : ctx_r1.confirmingAction() === "explore" ? "Not yet" : "Keep it")("danger", ctx_r1.confirmingAction() !== "explore");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 112);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.actionError());
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_button_1_Template, 2, 2, "button", 94)(2, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_button_2_Template, 2, 1, "button", 95)(3, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_div_3_Template, 6, 3, "div", 96)(4, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_button_4_Template, 5, 0, "button", 97)(5, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_app_confirm_popup_5_Template, 1, 5, "app-confirm-popup", 98)(6, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_p_6_Template, 2, 1, "p", 99);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canJoin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isMember && !ctx_r1.isLeader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isLeader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit && ctx_r1.group.status !== "cancelled");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.confirmingAction());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.actionError());
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_21_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_21_ng_container_1_Template, 1, 0, "ng-container", 113);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const signInGate_r18 = \u0275\u0275reference(11);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", signInGate_r18);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_div_3_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 125);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_div_3_button_3_Template_button_click_0_listener() {
      const m_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.transferTo(m_r22.uid));
    });
    \u0275\u0275element(1, "app-user-avatar", 126);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r22 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
    \u0275\u0275advance();
    \u0275\u0275property("photoURL", m_r22.photoURL)("displayName", m_r22.displayName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r22.displayName, " ");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 121)(1, "p", 122);
    \u0275\u0275text(2, "Choose a new leader before you leave:");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_div_3_button_3_Template, 3, 4, "button", 123);
    \u0275\u0275elementStart(4, "button", 124);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_div_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.showTransfer.set(false));
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.nonLeaderMembers);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 127);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("\xB7 ", ctx_r1.group.maxMembers - ctx_r1.group.memberCount, " spot", ctx_r1.group.maxMembers - ctx_r1.group.memberCount === 1 ? "" : "s", " left");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 114);
    \u0275\u0275text(2, "Members");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_div_3_Template, 6, 1, "div", 115);
    \u0275\u0275elementStart(4, "div", 116);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_Template_div_click_4_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.showMembersModal.set(true));
    });
    \u0275\u0275element(5, "app-member-avatars", 117);
    \u0275\u0275elementStart(6, "span", 118)(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275template(10, GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_span_10_Template, 2, 2, "span", 119);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 120);
    \u0275\u0275element(12, "polyline", 92);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.showTransfer());
    \u0275\u0275advance(2);
    \u0275\u0275property("previews", ctx_r1.group.memberPreviews)("total", ctx_r1.group.memberCount);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.group.memberCount);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" member", ctx_r1.group.memberCount === 1 ? "" : "s", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.group.maxMembers);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "div", 69)(2, "div", 70);
    \u0275\u0275element(3, "app-user-avatar", 71);
    \u0275\u0275elementStart(4, "div", 72)(5, "span", 73);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 74);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 75)(11, "span", 76);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, GroupDetailComponent_ng_container_4_ng_container_2_div_7_button_13_Template, 5, 1, "button", 77)(14, GroupDetailComponent_ng_container_4_ng_container_2_div_7_span_14_Template, 2, 0, "span", 78);
    \u0275\u0275elementStart(15, "span", 79);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(17, GroupDetailComponent_ng_container_4_ng_container_2_div_7_p_17_Template, 2, 1, "p", 80)(18, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_18_Template, 2, 0, "div", 81)(19, GroupDetailComponent_ng_container_4_ng_container_2_div_7_button_19_Template, 7, 0, "button", 82)(20, GroupDetailComponent_ng_container_4_ng_container_2_div_7_div_20_Template, 7, 6, "div", 83)(21, GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_21_Template, 2, 1, "ng-container", 8)(22, GroupDetailComponent_ng_container_4_ng_container_2_div_7_ng_container_22_Template, 13, 6, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("photoURL", ctx_r1.group.leaderPhoto)("displayName", ctx_r1.group.leaderName)("level", ctx_r1.isLeader ? ctx_r1.userDataService.levelInfo().id : ctx_r1.group.leaderIsAdmin ? 6 : 1)("isAdmin", ctx_r1.group.leaderIsAdmin)("isSelf", ctx_r1.isLeader);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.group.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind2(9, 23, ctx_r1.group.date.toDate(), "EEEE d MMMM"), " \xB7 ", ctx_r1.group.time, " \xB7 ", ctx_r1.group.leaderName, " leading");
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge--" + ctx_r1.group.difficulty);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.group.difficulty);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.group.spotTitle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.group.spotTitle);
    \u0275\u0275advance();
    \u0275\u0275classMap("gd-status--" + ctx_r1.group.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.group.status);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.group.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.group.status === "exploring");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.group.meetingPoint && ctx_r1.group.status !== "exploring" && ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.authService.isLoggedIn());
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_1_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 146);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_1_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.unpinMessage());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 147);
    \u0275\u0275element(2, "line", 20)(3, "line", 21);
    \u0275\u0275elementEnd()();
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 138);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 139);
    \u0275\u0275element(2, "path", 140);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "div", 141)(4, "span", 142);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 143);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 144);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.pinnedExpanded.set(!ctx_r1.pinnedExpanded()));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_1_button_10_Template, 4, 0, "button", 145);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.group.pinnedMessage.authorName);
    \u0275\u0275advance();
    \u0275\u0275classProp("gd-pinned__text--expanded", ctx_r1.pinnedExpanded());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.group.pinnedMessage.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.pinnedExpanded() ? "Show less" : "Show more", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canPin);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 148)(1, "button", 149);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.loadEarlier());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.groupsService.loadingEarlier());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.groupsService.loadingEarlier() ? "Loading\u2026" : "Load earlier messages", " ");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 150);
    \u0275\u0275text(1, " Be the first to say something \u{1F44B} ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 152);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const msg_r27 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(msg_r27.text);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_2_app_user_avatar_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-user-avatar", 159);
  }
  if (rf & 2) {
    const msg_r27 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("photoURL", msg_r27.photoURL)("displayName", msg_r27.displayName);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 160);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const msg_r27 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(msg_r27.displayName);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_2_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 161);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_2_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r28);
      const msg_r27 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView((ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r27.id ? ctx_r1.unpinMessage() : ctx_r1.pinMessage(msg_r27));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 162);
    \u0275\u0275element(2, "path", 140);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const msg_r27 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("gd-msg__pin-btn--visible", ctx_r1.hoveredMessageId() === msg_r27.id || (ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r27.id)("gd-msg__pin-btn--active", (ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r27.id);
    \u0275\u0275property("title", (ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r27.id ? "Unpin" : "Pin message");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_2_app_user_avatar_1_Template, 1, 2, "app-user-avatar", 153);
    \u0275\u0275elementStart(2, "div", 154);
    \u0275\u0275template(3, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_2_span_3_Template, 2, 1, "span", 155);
    \u0275\u0275elementStart(4, "span", 156);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 157);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_2_button_9_Template, 3, 5, "button", 158);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const msg_r27 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", msg_r27.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", msg_r27.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(msg_r27.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 5, msg_r27.createdAt == null ? null : msg_r27.createdAt.toDate(), "HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.canPin);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 151);
    \u0275\u0275listener("mouseenter", function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_Template_div_mouseenter_0_listener() {
      const msg_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.canPin && !msg_r27.isSystem ? ctx_r1.hoveredMessageId.set(msg_r27.id) : null);
    })("mouseleave", function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_Template_div_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.hoveredMessageId.set(null));
    });
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_1_Template, 3, 1, "ng-container", 8)(2, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_ng_container_2_Template, 10, 8, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const msg_r27 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("gd-msg--own", !msg_r27.isSystem && msg_r27.uid === (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid))("gd-msg--pinned", !msg_r27.isSystem && (ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r27.id)("gd-msg--system", msg_r27.isSystem);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", msg_r27.isSystem);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !msg_r27.isSystem);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 163);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.chatError());
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 164);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 165);
    \u0275\u0275element(2, "path", 166)(3, "path", 167)(4, "line", 168)(5, "line", 169)(6, "line", 170);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 171)(8, "span", 172);
    \u0275\u0275text(9, "You've been muted by the group leader");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 173);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate2("You can read the chat but can't reply for ", ctx_r1.mutedMinutesLeft, " more minute", ctx_r1.mutedMinutesLeft === 1 ? "" : "s", ".");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_11_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 178);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.cooldownSecs(), "s");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_11_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 179);
    \u0275\u0275element(1, "line", 180)(2, "polygon", 181);
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 174)(1, "textarea", 175);
    \u0275\u0275listener("ngModelChange", function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_11_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.messageText.set($event));
    })("keydown", function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_11_Template_textarea_keydown_1_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onMessageKeydown($event));
    });
    \u0275\u0275text(2, "            ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 176);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_11_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.sendMessage());
    });
    \u0275\u0275template(4, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_11_span_4_Template, 2, 1, "span", 177)(5, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_11_ng_template_5_Template, 3, 0, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sendIcon_r30 = \u0275\u0275reference(6);
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.messageText());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.messageText().trim() || ctx_r1.sendingMessage() || ctx_r1.cooldownSecs() > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.cooldownSecs() > 0)("ngIfElse", sendIcon_r30);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_p_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 182);
    \u0275\u0275text(1, " Join the group to chat ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 128);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_1_Template, 11, 6, "div", 129);
    \u0275\u0275elementStart(2, "div", 130, 1);
    \u0275\u0275template(4, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_4_Template, 3, 2, "div", 131)(5, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_5_Template, 2, 0, "div", 132)(6, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_6_Template, 3, 8, "div", 133);
    \u0275\u0275element(7, "div", null, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, GroupDetailComponent_ng_container_4_ng_container_2_div_8_p_9_Template, 2, 1, "p", 134)(10, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_10_Template, 12, 2, "div", 135)(11, GroupDetailComponent_ng_container_4_ng_container_2_div_8_div_11_Template, 7, 4, "div", 136)(12, GroupDetailComponent_ng_container_4_ng_container_2_div_8_p_12_Template, 2, 0, "p", 137);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.group.pinnedMessage);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.groupsService.hasMoreMessages());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.messages.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.messages);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.chatError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isMuted);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isMember && !ctx_r1.isMuted);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isMember && ctx_r1.authService.isLoggedIn());
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_ng_container_2_div_9_ng_container_1_Template, 1, 0, "ng-container", 113);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const signInGate_r18 = \u0275\u0275reference(11);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", signInGate_r18);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_ng_template_10_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, " at ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.group.spotTitle);
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 183)(1, "p", 184)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " is organising a group");
    \u0275\u0275template(5, GroupDetailComponent_ng_container_4_ng_container_2_ng_template_10_ng_container_5_Template, 4, 1, "ng-container", 8);
    \u0275\u0275text(6, ". Sign in to join the group and chat with the members. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 185);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_ng_template_10_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openJoinLogin());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.group.leaderName);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.group.spotTitle);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.autoJoining());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.autoJoining() ? "Joining\u2026" : "Sign in to join", " ");
  }
}
function GroupDetailComponent_ng_container_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 62)(2, "button", 63);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeTab.set("info"));
    });
    \u0275\u0275text(3, " Details ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 64);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_ng_container_2_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeTab.set("chat"));
    });
    \u0275\u0275text(5, " \u{1F4AC} Chat ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 65);
    \u0275\u0275template(7, GroupDetailComponent_ng_container_4_ng_container_2_div_7_Template, 23, 26, "div", 66)(8, GroupDetailComponent_ng_container_4_ng_container_2_div_8_Template, 13, 8, "div", 67)(9, GroupDetailComponent_ng_container_4_ng_container_2_div_9_Template, 2, 1, "div", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, GroupDetailComponent_ng_container_4_ng_container_2_ng_template_10_Template, 9, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("gd-tab--active", ctx_r1.activeTab() === "info");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("gd-tab--active", ctx_r1.activeTab() === "chat");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.activeTab() === "info");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab() === "chat" && ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab() === "chat" && !ctx_r1.authService.isLoggedIn());
  }
}
function GroupDetailComponent_ng_container_4_app_modal_3_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 193);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.group.meetingPoint.label);
  }
}
function GroupDetailComponent_ng_container_4_app_modal_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-modal", 186);
    \u0275\u0275listener("closeRequested", function GroupDetailComponent_ng_container_4_app_modal_3_Template_app_modal_closeRequested_0_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showMeetingModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 187)(2, "div", 188);
    \u0275\u0275text(3, "\u{1F4CD}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 189);
    \u0275\u0275text(5, "Meeting point");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, GroupDetailComponent_ng_container_4_app_modal_3_div_6_Template, 2, 1, "div", 190);
    \u0275\u0275elementStart(7, "a", 191);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 192);
    \u0275\u0275element(9, "path", 52)(10, "circle", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Open in Google Maps ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.group.meetingPoint == null ? null : ctx_r1.group.meetingPoint.label);
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r1.meetingPointMapsUrl, \u0275\u0275sanitizeUrl);
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 205);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.bulkSelectMode() ? ctx_r1.exitBulkMode() : ctx_r1.bulkSelectMode.set(true));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("gd-bulk-select-btn--active", ctx_r1.bulkSelectMode());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.bulkSelectMode() ? "Cancel" : "Select", " ");
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 218);
    \u0275\u0275element(1, "polyline", 48);
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 216);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_1__svg_svg_1_Template, 2, 0, "svg", 217);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r36 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("gd-member__checkbox--checked", ctx_r1.isBulkSelected(m_r36.uid));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isBulkSelected(m_r36.uid));
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 219);
    \u0275\u0275text(1, "leader");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 220);
    \u0275\u0275text(1, "muted");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 231);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_button_1_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r39);
      const m_r36 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.pickMemberAction("make-leader", m_r36, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 232);
    \u0275\u0275element(2, "polygon", 235);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Make leader ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6__svg_line_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 170);
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 236);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_button_10_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r40);
      const m_r36 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.pickMemberAction("remove", m_r36, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 232);
    \u0275\u0275element(2, "polyline", 237)(3, "path", 238)(4, "path", 239)(5, "path", 240)(6, "path", 241);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Remove ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 229);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r38);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_button_1_Template, 4, 0, "button", 230);
    \u0275\u0275elementStart(2, "button", 231);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r38);
      const m_r36 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.pickMemberAction(ctx_r1.isMemberMuted(m_r36) ? "unmute" : "mute", m_r36, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 232);
    \u0275\u0275element(4, "path", 166)(5, "path", 167)(6, "line", 168)(7, "line", 169);
    \u0275\u0275template(8, GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6__svg_line_8_Template, 1, 0, "line", 233);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_button_10_Template, 8, 0, "button", 234);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r36 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r36.role !== "leader");
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.isMemberMuted(m_r36));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isMemberMuted(m_r36) ? "Unmute" : "Mute 1h", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r36.role !== "leader");
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_app_confirm_popup_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 242);
    \u0275\u0275listener("confirmed", function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_app_confirm_popup_7_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.executeMemberAction());
    })("cancelled", function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_app_confirm_popup_7_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.confirmingMemberAction.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r36 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("message", ctx_r1.confirmingMemberAction().action === "make-leader" ? "Make " + m_r36.displayName + " the new leader? You'll become a regular member." : "Unmute " + m_r36.displayName + "?")("confirmLabel", ctx_r1.confirmingMemberAction().action === "make-leader" ? "Transfer" : "Unmute")("danger", false);
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 221)(1, "button", 222);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r37);
      const m_r36 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleMemberMenu(m_r36.uid, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 223);
    \u0275\u0275element(3, "circle", 224)(4, "circle", 225)(5, "circle", 226);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_div_6_Template, 11, 4, "div", 227)(7, GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_app_confirm_popup_7_Template, 1, 3, "app-confirm-popup", 228);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_7_0;
    const m_r36 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("gd-member__menu-btn--open", ctx_r1.memberActionMenu() === m_r36.uid);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.memberActionMenu() === m_r36.uid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_7_0 = ctx_r1.confirmingMemberAction()) == null ? null : tmp_7_0.member == null ? null : tmp_7_0.member.uid) === m_r36.uid);
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11__svg_svg_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 243);
    \u0275\u0275element(1, "polyline", 92);
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 206);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_div_11_Template_div_click_0_listener() {
      const m_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.bulkSelectMode() && m_r36.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid) && m_r36.role !== "leader" ? ctx_r1.toggleBulkSelect(m_r36.uid) : null);
    });
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_1_Template, 2, 3, "div", 207);
    \u0275\u0275element(2, "app-user-avatar", 208);
    \u0275\u0275elementStart(3, "div", 209)(4, "span", 210);
    \u0275\u0275text(5);
    \u0275\u0275template(6, GroupDetailComponent_ng_container_4_app_modal_4_div_11_span_6_Template, 2, 0, "span", 211)(7, GroupDetailComponent_ng_container_4_app_modal_4_div_11_span_7_Template, 2, 0, "span", 212);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 213);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, GroupDetailComponent_ng_container_4_app_modal_4_div_11_div_10_Template, 8, 4, "div", 214)(11, GroupDetailComponent_ng_container_4_app_modal_4_div_11__svg_svg_11_Template, 2, 0, "svg", 215);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r36 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("gd-member--selectable", ctx_r1.bulkSelectMode() && ctx_r1.isBulkSelected(m_r36.uid) !== void 0 && m_r36.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid) && m_r36.role !== "leader")("gd-member--selected", ctx_r1.isBulkSelected(m_r36.uid));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.bulkSelectMode() && m_r36.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid) && m_r36.role !== "leader");
    \u0275\u0275advance();
    \u0275\u0275property("photoURL", m_r36.photoURL)("displayName", m_r36.displayName)("level", m_r36.uid === (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid) ? ctx_r1.userDataService.levelInfo().id : 1)("isAdmin", m_r36.uid === (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid) && ctx_r1.userDataService.isAdmin())("roleLabel", ctx_r1.memberRoleLabel(m_r36))("activeLabel", ctx_r1.formatLastActive(m_r36.lastActive));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", m_r36.displayName, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r36.role === "leader");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isMemberMuted(m_r36));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatLastActive(m_r36.lastActive));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canManageMembers && m_r36.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid) && !ctx_r1.bulkSelectMode());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (!ctx_r1.canManageMembers || m_r36.uid === (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.uid)) && !ctx_r1.bulkSelectMode());
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_12_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 249);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_div_12_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectAllMembers());
    });
    \u0275\u0275text(1, "Select all");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_12_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 250);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_div_12_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.confirmingBulkAction.set("mute"));
    });
    \u0275\u0275text(1, "Mute 1h");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_12_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 251);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_div_12_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r44);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.confirmingBulkAction.set("remove"));
    });
    \u0275\u0275text(1, "Remove");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 244)(1, "span", 245);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupDetailComponent_ng_container_4_app_modal_4_div_12_button_3_Template, 2, 0, "button", 246)(4, GroupDetailComponent_ng_container_4_app_modal_4_div_12_button_4_Template, 2, 0, "button", 247)(5, GroupDetailComponent_ng_container_4_app_modal_4_div_12_button_5_Template, 2, 0, "button", 248);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.bulkCount() > 0 ? ctx_r1.bulkCount() + " selected" : "Tap members to select", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.bulkCount() < ctx_r1.bulkEligibleMembers.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.bulkCount() > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.bulkCount() > 0);
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_app_confirm_popup_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 252);
    \u0275\u0275listener("confirmed", function GroupDetailComponent_ng_container_4_app_modal_4_app_confirm_popup_13_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.executeBulkAction());
    })("cancelled", function GroupDetailComponent_ng_container_4_app_modal_4_app_confirm_popup_13_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmingBulkAction.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("fixed", true)("message", ctx_r1.confirmingBulkAction() === "remove" ? "Remove " + ctx_r1.bulkCount() + " member" + (ctx_r1.bulkCount() === 1 ? "" : "s") + " from this group?" : "Mute " + ctx_r1.bulkCount() + " member" + (ctx_r1.bulkCount() === 1 ? "" : "s") + " for 1 hour?")("confirmLabel", ctx_r1.confirmingBulkAction() === "remove" ? "Remove all" : "Mute all")("danger", ctx_r1.confirmingBulkAction() === "remove");
  }
}
function GroupDetailComponent_ng_container_4_app_modal_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-modal", 194);
    \u0275\u0275listener("closeRequested", function GroupDetailComponent_ng_container_4_app_modal_4_Template_app_modal_closeRequested_0_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeMembersModal());
    });
    \u0275\u0275elementStart(1, "div", 195)(2, "div", 196)(3, "span", 197);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 198);
    \u0275\u0275template(6, GroupDetailComponent_ng_container_4_app_modal_4_button_6_Template, 2, 3, "button", 199);
    \u0275\u0275elementStart(7, "button", 200);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_4_app_modal_4_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeMembersModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 201);
    \u0275\u0275element(9, "line", 20)(10, "line", 21);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(11, GroupDetailComponent_ng_container_4_app_modal_4_div_11_Template, 12, 17, "div", 202)(12, GroupDetailComponent_ng_container_4_app_modal_4_div_12_Template, 6, 4, "div", 203)(13, GroupDetailComponent_ng_container_4_app_modal_4_app_confirm_popup_13_Template, 1, 4, "app-confirm-popup", 204);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("showClose", false);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.members.length, " member", ctx_r1.members.length === 1 ? "" : "s", "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.canManageMembers && ctx_r1.bulkEligibleMembers.length >= 1);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.members);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.bulkSelectMode());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.confirmingBulkAction());
  }
}
function GroupDetailComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_4_div_1_Template, 67, 20, "div", 11)(2, GroupDetailComponent_ng_container_4_ng_container_2_Template, 12, 7, "ng-container", 8)(3, GroupDetailComponent_ng_container_4_app_modal_3_Template, 12, 2, "app-modal", 12)(4, GroupDetailComponent_ng_container_4_app_modal_4_Template, 14, 7, "app-modal", 13);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showEditForm());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.showEditForm());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showMeetingModal());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showMembersModal() && ctx_r1.authService.isLoggedIn());
  }
}
var GroupDetailComponent = class _GroupDetailComponent {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.destroyRef = inject(DestroyRef);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.seo = inject(SeoService);
    this.analytics = inject(AnalyticsService);
    this.bridge = inject(MapBridgeService);
    this.groupsService = inject(GroupsService);
    this.authService = inject(AuthService);
    this.userDataService = inject(UserDataService);
    this.actionError = signal(null);
    this.actionBusy = signal(false);
    this.showTransfer = signal(false);
    this.confirmingAction = signal(null);
    this.memberActionMenu = signal(null);
    this.confirmingMemberAction = signal(null);
    this.bulkSelectMode = signal(false);
    this.bulkSelectedUids = signal(/* @__PURE__ */ new Set());
    this.bulkCount = computed(() => this.bulkSelectedUids().size);
    this.confirmingBulkAction = signal(null);
    this.messageText = signal("");
    this.sendingMessage = signal(false);
    this.hoveredMessageId = signal(null);
    this.pinnedExpanded = signal(false);
    this.cooldownSecs = signal(0);
    this.chatError = signal(null);
    this.autoJoining = signal(false);
    this.showMeetingModal = signal(false);
    this.showEditForm = signal(false);
    this.editError = signal(null);
    this.editBusy = signal(false);
    this.editPickingPoint = signal(false);
    this.editPendingMeetingPoint = signal(null);
    this.editSpotResults = signal([]);
    this.editTitle = "";
    this.editDate = "";
    this.editTime = "";
    this.editDescription = "";
    this.editDifficulty = "easy";
    this.editMaxMembers = "";
    this.editMeetingPoint = null;
    this.editSpotSearch = "";
    this.editSpotSlug = "";
    this.editSpotTitle = "";
    this.editSpotLat = 0;
    this.editSpotLon = 0;
    this.allSpots = locations.map((l) => ({
      slug: l.slug,
      title: l.title,
      lat: l.lat,
      lon: l.lon
    }));
    this.showMembersModal = signal(false);
    this.activeTab = signal("info");
    this.pendingAutoJoin = false;
    this._membersListenerEffect = effect(() => {
      const needFullList = this.showMembersModal() || this.showTransfer();
      if (!this.groupId)
        return;
      if (needFullList) {
        this.groupsService.startMembersListener(this.groupId);
      } else {
        this.groupsService.stopMembersListener();
      }
    });
    this.autoCompleted = false;
    this._autoCompleteEffect = effect(() => {
      const group = this.groupsService.detailGroup();
      if (!group || this.autoCompleted)
        return;
      if ((group.status === "open" || group.status === "full") && GroupsService.isGroupPast(group) && this.isLeader) {
        this.autoCompleted = true;
        queueMicrotask(() => this.groupsService.completeGroup(group.id).catch(() => {
        }));
      }
    });
    this._autoJoinEffect = effect(() => {
      const user = this.authService.user();
      const group = this.groupsService.detailGroup();
      const already = this.groupsService.currentUserIsMember();
      if (!user || !group || !this.pendingAutoJoin || already)
        return;
      if (group.status === "open") {
        this.pendingAutoJoin = false;
        queueMicrotask(() => this.doAutoJoin());
      }
    });
    this._memberCountHealEffect = effect(() => {
      const members = this.groupsService.detailMembers();
      const group = this.groupsService.detailGroup();
      if (!group || members.length === 0 || !this.isLeader)
        return;
      if (members.length !== group.memberCount) {
        queueMicrotask(() => this.groupsService.correctMemberCount(group.id, members).catch(() => {
        }));
      }
    });
    this.locationApplied = false;
    this._spotLocationEffect = effect(() => {
      const group = this.groupsService.detailGroup();
      if (!group || this.locationApplied || !group.spotSlug)
        return;
      const loc = locations.find((l) => l.slug === group.spotSlug) ?? null;
      if (!loc)
        return;
      this.locationApplied = true;
      this.bridge.selectedLocation.set(loc);
    });
    this._meetingPointEffect = effect(() => {
      const group = this.groupsService.detailGroup();
      if (!group || this.showEditForm())
        return;
      const show = !!group.meetingPoint && (group.status === "open" || group.status === "full");
      this.bridge.meetingPointMarker.set(show ? group.meetingPoint : null);
    });
    this._wasOnChat = false;
    this._chatScrollEffect = effect(() => {
      this.groupsService.messages();
      const onChat = this.activeTab() === "chat";
      const justSwitched = onChat && !this._wasOnChat;
      this._wasOnChat = onChat;
      if (!onChat)
        return;
      if (justSwitched || this.isNearBottom()) {
        this.shouldScrollToBottom = true;
      }
    });
    this.groupId = "";
    this.shouldScrollToBottom = false;
    this.cooldownTimer = null;
  }
  isNearBottom() {
    const el = this.messagesContainer?.nativeElement;
    if (!el)
      return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  }
  // ── Computed helpers ──────────────────────────────────────────────────────
  get currentUser() {
    return this.authService.user();
  }
  get group() {
    return this.groupsService.detailGroup();
  }
  get members() {
    return this.groupsService.detailMembers();
  }
  get messages() {
    return this.groupsService.allMessages();
  }
  get isLeader() {
    return !!this.currentUser && this.group?.leaderId === this.currentUser.uid;
  }
  // Derived from the 1-doc member listener — no subcollection needed
  get isMember() {
    return !!this.currentUser && this.groupsService.currentUserIsMember();
  }
  get canJoin() {
    const g = this.group;
    if (!g)
      return false;
    return g.status === "open" && !this.isMember && !this.isLeader;
  }
  get canEdit() {
    const g = this.group;
    if (!g || g.status === "cancelled" || g.status === "completed")
      return false;
    return this.isLeader || this.userDataService.isAdmin();
  }
  get canStartExploring() {
    const g = this.group;
    if (!g || g.status !== "open" && g.status !== "full")
      return false;
    return this.isLeader || this.userDataService.isAdmin();
  }
  get shareUrl() {
    if (!isPlatformBrowser(this.platformId))
      return "";
    return `${this.document.location.origin}/malta/groups/${this.groupId}`;
  }
  get meetingPointMapsUrl() {
    const mp = this.group?.meetingPoint;
    if (!mp)
      return "";
    return `https://www.google.com/maps?q=${mp.lat},${mp.lon}`;
  }
  get isMuted() {
    const ts = this.groupsService.mutedUntil();
    return !!ts && ts.toMillis() > Date.now();
  }
  get mutedMinutesLeft() {
    const ts = this.groupsService.mutedUntil();
    if (!ts)
      return 0;
    return Math.max(1, Math.ceil((ts.toMillis() - Date.now()) / 6e4));
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    this.groupId = this.route.snapshot.paramMap.get("id") ?? "";
    if (!this.groupId) {
      this.router.navigate(["/malta/groups"]);
      return;
    }
    this.groupsService.startDetailListener(this.groupId);
    this.bridge.enterPanelMode([], { label: "Back to groups" });
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.router.navigate(["/malta/groups"]));
    this.bridge.coordPicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ lat, lon }) => {
      this.editPendingMeetingPoint.set({ lat, lon });
      this.bridge.meetingPointMarker.set({ lat, lon });
      this.bridge.pickMode.set(false);
      this.editPickingPoint.set(false);
      this.bridge.panel.expand();
    });
    this.bridge.meetingPointClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.showMeetingModal.set(true));
    if (this.isMember)
      this.groupsService.updateLastActive(this.groupId);
    this.analytics.pageView(window.location.href, "Group Detail");
  }
  ngOnDestroy() {
    this.groupsService.stopDetailListener();
    this.bridge.meetingPointMarker.set(null);
    this.bridge.pickMode.set(false);
    this.clearCooldownTimer();
  }
  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: "smooth" });
      this.shouldScrollToBottom = false;
    }
  }
  onVisibilityChange() {
    if (!document.hidden && this.isMember) {
      this.groupsService.updateLastActive(this.groupId);
    }
  }
  // ── Actions ───────────────────────────────────────────────────────────────
  join() {
    return __async(this, null, function* () {
      if (!this.authService.isLoggedIn()) {
        this.authService.openLoginModal();
        return;
      }
      this.actionError.set(null);
      this.actionBusy.set(true);
      try {
        yield this.groupsService.joinGroup(this.groupId);
        yield this.groupsService.updateLastActive(this.groupId);
      } catch (e) {
        if (e instanceof GroupFullError) {
          this.actionError.set("This group is now full.");
        } else {
          this.actionError.set(e instanceof Error ? e.message : "Could not join group.");
        }
      } finally {
        this.actionBusy.set(false);
      }
    });
  }
  leave() {
    return __async(this, null, function* () {
      this.confirmingAction.set(null);
      this.actionError.set(null);
      this.actionBusy.set(true);
      try {
        yield this.groupsService.leaveGroup(this.groupId);
        this.router.navigate(["/malta/groups"]);
      } catch (e) {
        if (e instanceof LeaderMustTransferError) {
          this.showTransfer.set(true);
          this.actionError.set("Transfer leadership before leaving.");
        } else {
          this.actionError.set(e instanceof Error ? e.message : "Could not leave group.");
        }
      } finally {
        this.actionBusy.set(false);
      }
    });
  }
  transferTo(uid) {
    return __async(this, null, function* () {
      this.actionError.set(null);
      this.actionBusy.set(true);
      try {
        yield this.groupsService.transferOwnership(this.groupId, uid);
        this.showTransfer.set(false);
      } catch (e) {
        this.actionError.set(e instanceof Error ? e.message : "Transfer failed.");
      } finally {
        this.actionBusy.set(false);
      }
    });
  }
  cancelGroup() {
    return __async(this, null, function* () {
      this.confirmingAction.set(null);
      this.actionError.set(null);
      this.actionBusy.set(true);
      try {
        yield this.groupsService.cancelGroup(this.groupId);
      } catch (e) {
        this.actionError.set(e instanceof Error ? e.message : "Could not cancel group.");
      } finally {
        this.actionBusy.set(false);
      }
    });
  }
  executeConfirmedAction() {
    if (this.confirmingAction() === "leave")
      this.leave();
    if (this.confirmingAction() === "cancel")
      this.cancelGroup();
    if (this.confirmingAction() === "explore")
      this.startExploring();
  }
  startExploring() {
    return __async(this, null, function* () {
      this.confirmingAction.set(null);
      this.actionError.set(null);
      this.actionBusy.set(true);
      try {
        yield this.groupsService.startExploring(this.groupId);
      } catch (e) {
        this.actionError.set(e instanceof Error ? e.message : "Could not start exploring.");
      } finally {
        this.actionBusy.set(false);
      }
    });
  }
  openEdit() {
    const g = this.group;
    if (!g)
      return;
    const d = g.date.toDate();
    this.editTitle = g.title;
    this.editDate = d.toISOString().split("T")[0];
    this.editTime = g.time;
    this.editDescription = g.description;
    this.editDifficulty = g.difficulty;
    this.editMaxMembers = g.maxMembers != null ? String(g.maxMembers) : "";
    this.editMeetingPoint = g.meetingPoint ?? null;
    this.editSpotSlug = g.spotSlug ?? "";
    this.editSpotTitle = g.spotTitle ?? "";
    this.editSpotLat = g.spotLat ?? 0;
    this.editSpotLon = g.spotLon ?? 0;
    this.editSpotSearch = g.spotTitle ?? "";
    this.editSpotResults.set([]);
    this.editError.set(null);
    this.showEditForm.set(true);
    if (this.editMeetingPoint) {
      this.bridge.meetingPointMarker.set(this.editMeetingPoint);
    }
  }
  cancelEdit() {
    this.showEditForm.set(false);
    this.editError.set(null);
    if (this.editPickingPoint())
      this.bridge.panel.expand();
    this.bridge.pickMode.set(false);
    this.editPickingPoint.set(false);
    this.bridge.meetingPointMarker.set(this.group?.meetingPoint ?? null);
  }
  submitEdit() {
    return __async(this, null, function* () {
      const g = this.group;
      if (!g)
        return;
      if (!this.editTitle.trim() || !this.editDate) {
        this.editError.set("Title and date are required.");
        return;
      }
      const dateObj = /* @__PURE__ */ new Date(this.editDate + "T" + this.editTime);
      if (isNaN(dateObj.getTime())) {
        this.editError.set("Invalid date or time.");
        return;
      }
      const payload = {
        title: this.editTitle.trim(),
        spotSlug: this.editSpotSlug || null,
        spotTitle: this.editSpotTitle || null,
        spotLat: this.editSpotSlug ? this.editSpotLat : null,
        spotLon: this.editSpotSlug ? this.editSpotLon : null,
        date: dateObj,
        time: this.editTime,
        description: this.editDescription.trim(),
        difficulty: this.editDifficulty,
        maxMembers: this.editMaxMembers ? parseInt(this.editMaxMembers, 10) : null,
        meetingPoint: this.editMeetingPoint
      };
      this.editError.set(null);
      this.editBusy.set(true);
      try {
        yield this.groupsService.updateGroup(this.groupId, payload);
        this.showEditForm.set(false);
        this.bridge.pickMode.set(false);
        this.editPickingPoint.set(false);
        if (this.editSpotSlug) {
          this.locationApplied = false;
          this.showSpotOnMap();
        }
      } catch (e) {
        this.editError.set(e instanceof Error ? e.message : "Could not save changes.");
      } finally {
        this.editBusy.set(false);
      }
    });
  }
  startEditPickingPoint() {
    this.editPickingPoint.set(true);
    this.bridge.pickMode.set(true);
    this.bridge.panel.minimize();
  }
  clearEditMeetingPoint() {
    if (this.editPickingPoint())
      this.bridge.panel.expand();
    this.editMeetingPoint = null;
    this.editPendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(null);
    this.editPickingPoint.set(false);
    this.bridge.pickMode.set(false);
  }
  confirmEditMeetingPoint() {
    const p = this.editPendingMeetingPoint();
    if (!p)
      return;
    this.editMeetingPoint = p;
    this.editPendingMeetingPoint.set(null);
  }
  retryEditMeetingPoint() {
    this.editPendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(this.editMeetingPoint);
    this.startEditPickingPoint();
  }
  onEditSpotInput() {
    const q = normalizeForSearch(this.editSpotSearch.trim());
    if (!q) {
      this.editSpotResults.set([]);
      return;
    }
    this.editSpotResults.set(this.allSpots.filter((s) => normalizeForSearch(s.title).includes(q)).slice(0, 6));
  }
  selectEditSpot(spot) {
    this.editSpotSlug = spot.slug;
    this.editSpotTitle = spot.title;
    this.editSpotLat = spot.lat;
    this.editSpotLon = spot.lon;
    this.editSpotSearch = spot.title;
    this.editSpotResults.set([]);
  }
  // Opens the login modal and marks that the user wants to join on sign-in
  openJoinLogin() {
    this.pendingAutoJoin = true;
    this.authService.openLoginModal();
  }
  closeMembersModal() {
    this.showMembersModal.set(false);
    this.exitBulkMode();
  }
  sendMessage() {
    return __async(this, null, function* () {
      const text = this.messageText().trim();
      if (!text || this.sendingMessage() || this.cooldownSecs() > 0 || this.isMuted)
        return;
      this.chatError.set(null);
      this.sendingMessage.set(true);
      try {
        yield this.groupsService.sendMessage(this.groupId, text);
        this.messageText.set("");
        this.shouldScrollToBottom = true;
        this.startCooldown(5);
      } catch (e) {
        if (e instanceof CooldownError) {
          this.startCooldown(e.secondsLeft);
        } else if (e instanceof SpamMutedError) {
          this.chatError.set(`You've been muted for ${e.minutesLeft} min${e.minutesLeft === 1 ? "" : "s"} for sending too many messages.`);
        } else {
          this.chatError.set("Could not send message. Check your connection and try again.");
          console.error("[sendMessage]", e);
        }
      } finally {
        this.sendingMessage.set(false);
      }
    });
  }
  onMessageKeydown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }
  doAutoJoin() {
    return __async(this, null, function* () {
      this.autoJoining.set(true);
      try {
        yield this.groupsService.joinGroup(this.groupId);
        yield this.groupsService.updateLastActive(this.groupId);
      } catch {
      } finally {
        this.autoJoining.set(false);
      }
    });
  }
  startCooldown(seconds) {
    this.cooldownSecs.set(seconds);
    this.clearCooldownTimer();
    this.cooldownTimer = setInterval(() => {
      const remaining = this.cooldownSecs() - 1;
      if (remaining <= 0) {
        this.cooldownSecs.set(0);
        this.clearCooldownTimer();
      } else {
        this.cooldownSecs.set(remaining);
      }
    }, 1e3);
  }
  clearCooldownTimer() {
    if (this.cooldownTimer !== null) {
      clearInterval(this.cooldownTimer);
      this.cooldownTimer = null;
    }
  }
  formatLastActive(ts) {
    if (!ts)
      return "";
    return GroupsService.formatLastActive(ts);
  }
  get nonLeaderMembers() {
    return this.members.filter((m) => m.uid !== this.group?.leaderId);
  }
  get canManageMembers() {
    const g = this.group;
    if (!g || g.status === "cancelled" || g.status === "completed")
      return false;
    return this.isLeader || this.userDataService.isAdmin();
  }
  isMemberMuted(m) {
    return !!m.mutedUntil && m.mutedUntil.toMillis() > Date.now();
  }
  toggleMemberMenu(uid, event) {
    event.stopPropagation();
    this.memberActionMenu.set(this.memberActionMenu() === uid ? null : uid);
  }
  pickMemberAction(action, member, event) {
    event.stopPropagation();
    this.memberActionMenu.set(null);
    if (action === "make-leader" || action === "unmute") {
      this.confirmingMemberAction.set({ action, member });
      return;
    }
    const s = new Set(this.bulkSelectedUids());
    s.add(member.uid);
    this.bulkSelectedUids.set(s);
    this.bulkSelectMode.set(true);
  }
  executeMemberAction() {
    return __async(this, null, function* () {
      const target = this.confirmingMemberAction();
      if (!target)
        return;
      this.confirmingMemberAction.set(null);
      this.actionError.set(null);
      this.actionBusy.set(true);
      try {
        const { action, member } = target;
        if (action === "remove")
          yield this.groupsService.removeMember(this.groupId, member.uid);
        if (action === "make-leader")
          yield this.groupsService.transferOwnership(this.groupId, member.uid);
        if (action === "mute")
          yield this.groupsService.muteMember(this.groupId, member.uid, 60);
        if (action === "unmute")
          yield this.groupsService.unmuteMember(this.groupId, member.uid);
      } catch (e) {
        this.actionError.set(e instanceof Error ? e.message : "Action failed.");
      } finally {
        this.actionBusy.set(false);
      }
    });
  }
  closeMemberMenu() {
    if (this.memberActionMenu())
      this.memberActionMenu.set(null);
  }
  // ── Bulk selection ────────────────────────────────────────────────────────
  get bulkEligibleMembers() {
    return this.members.filter((m) => m.uid !== this.group?.leaderId && m.uid !== this.currentUser?.uid);
  }
  isBulkSelected(uid) {
    return this.bulkSelectedUids().has(uid);
  }
  toggleBulkSelect(uid) {
    const s = new Set(this.bulkSelectedUids());
    s.has(uid) ? s.delete(uid) : s.add(uid);
    this.bulkSelectedUids.set(s);
  }
  selectAllMembers() {
    this.bulkSelectedUids.set(new Set(this.bulkEligibleMembers.map((m) => m.uid)));
  }
  exitBulkMode() {
    this.bulkSelectMode.set(false);
    this.bulkSelectedUids.set(/* @__PURE__ */ new Set());
    this.confirmingBulkAction.set(null);
  }
  executeBulkAction() {
    return __async(this, null, function* () {
      const action = this.confirmingBulkAction();
      const uids = [...this.bulkSelectedUids()];
      if (!action || !uids.length)
        return;
      this.confirmingBulkAction.set(null);
      this.actionBusy.set(true);
      try {
        if (action === "remove")
          yield this.groupsService.bulkRemoveMembers(this.groupId, uids);
        if (action === "mute")
          yield this.groupsService.bulkMuteMembers(this.groupId, uids, 60);
        this.exitBulkMode();
      } catch (e) {
        this.actionError.set(e instanceof Error ? e.message : "Action failed.");
      } finally {
        this.actionBusy.set(false);
      }
    });
  }
  loadEarlier() {
    this.groupsService.loadEarlierMessages(this.groupId);
  }
  showSpotOnMap() {
    const group = this.group;
    if (!group)
      return;
    const loc = locations.find((l) => l.slug === group.spotSlug) ?? null;
    if (loc)
      this.bridge.selectedLocation.set(loc);
  }
  memberRoleLabel(m) {
    return m.role === "leader" ? "\u{1F451} Group leader" : "Member";
  }
  // ── Pinned message ────────────────────────────────────────────────────────
  get canPin() {
    return this.isLeader || this.userDataService.isAdmin();
  }
  pinMessage(msg) {
    return __async(this, null, function* () {
      try {
        yield this.groupsService.pinMessage(this.groupId, msg);
        this.pinnedExpanded.set(false);
      } catch {
      }
    });
  }
  unpinMessage() {
    return __async(this, null, function* () {
      try {
        yield this.groupsService.unpinMessage(this.groupId);
      } catch {
      }
    });
  }
  static {
    this.\u0275fac = function GroupDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupDetailComponent, selectors: [["app-group-detail"]], viewQuery: function GroupDetailComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.messagesEnd = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.messagesContainer = _t.first);
      }
    }, hostBindings: function GroupDetailComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("visibilitychange", function GroupDetailComponent_visibilitychange_HostBindingHandler() {
          return ctx.onVisibilityChange();
        }, false, \u0275\u0275resolveDocument)("click", function GroupDetailComponent_click_HostBindingHandler() {
          return ctx.closeMemberMenu();
        }, false, \u0275\u0275resolveDocument);
      }
    }, decls: 5, vars: 5, consts: [["signInGate", ""], ["messagesContainer", ""], ["messagesEnd", ""], ["sendIcon", ""], [3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd", "title"], ["panelActions", "", 3, "url", "shareTitle"], [1, "gd-content"], ["class", "gd-loading", 4, "ngIf"], [4, "ngIf"], [1, "gd-loading"], [1, "gd-loading__dot"], ["class", "gd-edit-scroll", 4, "ngIf"], ["maxWidth", "280px", 3, "closeRequested", 4, "ngIf"], [3, "showClose", "closeRequested", 4, "ngIf"], [1, "gd-edit-scroll"], [1, "gd-edit-form"], [1, "gd-edit-form__header"], [1, "gd-edit-form__title"], ["aria-label", "Cancel", 1, "gd-edit-form__close", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "gd-edit-form__field"], ["type", "text", "placeholder", "Group title", "maxlength", "80", 3, "ngModelChange", "ngModel"], [1, "gd-edit-form__opt"], [1, "gd-edit-form__spot-wrap"], ["type", "text", "placeholder", "Search a location\u2026", "autocomplete", "off", 3, "ngModelChange", "input", "ngModel"], ["class", "gd-edit-form__spot-results", 4, "ngIf"], ["class", "gd-edit-form__spot-selected", 4, "ngIf"], [1, "gd-edit-form__row"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "time", 3, "ngModelChange", "ngModel"], [1, "gd-edit-form__chips"], [1, "chip", 3, "click"], ["rows", "3", "maxlength", "400", "placeholder", "What's the plan? Anything to know beforehand?", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "2", "max", "50", "placeholder", "Unlimited", 3, "ngModelChange", "ngModel"], ["class", "gd-meeting-confirm", 4, "ngIf"], ["class", "gd-meeting-pick", 4, "ngIf"], ["class", "gd-meeting-set", 4, "ngIf"], ["class", "gd-edit-form__error", 4, "ngIf"], [1, "gd-edit-form__actions"], [1, "gd-edit-form__cancel", 3, "click"], [1, "gd-edit-form__submit", 3, "click", "disabled"], [1, "gd-edit-form__spot-results"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "gd-edit-form__spot-selected"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], [1, "gd-meeting-confirm"], [1, "gd-meeting-confirm__msg"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "gd-meeting-confirm__actions"], [1, "gd-meeting-confirm__retry", 3, "click"], [1, "gd-meeting-confirm__ok", 3, "click"], [1, "gd-meeting-pick"], [1, "gd-meeting-pick__btn", 3, "click"], [1, "gd-meeting-set"], [1, "gd-meeting-set__remove", 3, "click"], [1, "gd-edit-form__error"], [1, "gd-tabs"], [1, "gd-tab", 3, "click"], [1, "gd-tab", "gd-tab--chat", 3, "click"], [1, "gd-tab-body"], ["class", "gd-tab-pane", 4, "ngIf"], ["class", "gd-chat", 4, "ngIf"], [1, "gd-tab-pane"], [1, "gd-header"], [1, "gd-header__leader"], ["size", "md", "shape", "circle", "roleLabel", "\u{1F451} Group leader", 3, "photoURL", "displayName", "level", "isAdmin", "isSelf"], [1, "gd-header__info"], [1, "gd-header__title"], [1, "gd-header__sub"], [1, "gd-header__meta"], [1, "badge"], ["class", "gd-header__spot", "title", "Show on map", 3, "click", 4, "ngIf"], ["class", "gd-header__spot gd-header__spot--none", 4, "ngIf"], [1, "gd-status"], ["class", "gd-header__desc", 4, "ngIf"], ["class", "gd-exploring-banner", 4, "ngIf"], ["class", "gd-meeting-row", 3, "click", 4, "ngIf"], ["class", "gd-actions", 4, "ngIf"], ["title", "Show on map", 1, "gd-header__spot", 3, "click"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], [1, "gd-header__spot", "gd-header__spot--none"], [1, "gd-header__desc"], [1, "gd-exploring-banner"], [1, "gd-meeting-row", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", 1, "gd-meeting-row__chevron"], ["points", "9 18 15 12 9 6"], [1, "gd-actions"], ["class", "gd-join-btn", 3, "disabled", "click", 4, "ngIf"], ["class", "gd-leave-btn", 3, "disabled", "click", 4, "ngIf"], ["class", "gd-leader-actions", 4, "ngIf"], ["class", "gd-edit-btn", 3, "click", 4, "ngIf"], [3, "fixed", "message", "confirmLabel", "cancelLabel", "danger", "confirmed", "cancelled", 4, "ngIf"], ["class", "gd-action-error", 4, "ngIf"], [1, "gd-join-btn", 3, "click", "disabled"], [1, "gd-leave-btn", 3, "click", "disabled"], [1, "gd-leader-actions"], ["class", "gd-explore-btn", 3, "disabled", "click", 4, "ngIf"], [1, "gd-leader-row"], ["class", "gd-cancel-btn", 3, "disabled", "click", 4, "ngIf"], [1, "gd-explore-btn", 3, "click", "disabled"], [1, "gd-cancel-btn", 3, "click", "disabled"], [1, "gd-edit-btn", 3, "click"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], [3, "confirmed", "cancelled", "fixed", "message", "confirmLabel", "cancelLabel", "danger"], [1, "gd-action-error"], [4, "ngTemplateOutlet"], [1, "gd-members-section-label"], ["class", "gd-transfer", 4, "ngIf"], [1, "gd-members-row", 3, "click"], [3, "previews", "total"], [1, "gd-members-row__label"], ["class", "gd-members-row__spots", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "gd-members-row__chevron"], [1, "gd-transfer"], [1, "gd-transfer__label"], ["class", "gd-transfer__member", 3, "disabled", "click", 4, "ngFor", "ngForOf"], [1, "gd-transfer__cancel", 3, "click"], [1, "gd-transfer__member", 3, "click", "disabled"], ["size", "xs", "shape", "circle", 3, "photoURL", "displayName"], [1, "gd-members-row__spots"], [1, "gd-chat"], ["class", "gd-pinned", 4, "ngIf"], [1, "gd-messages"], ["class", "gd-load-earlier", 4, "ngIf"], ["class", "gd-empty-chat", 4, "ngIf"], ["class", "gd-msg", 3, "gd-msg--own", "gd-msg--pinned", "gd-msg--system", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"], ["class", "gd-chat-error", 4, "ngIf"], ["class", "gd-muted-banner", 4, "ngIf"], ["class", "gd-input", 4, "ngIf"], ["class", "gd-join-hint", 4, "ngIf"], [1, "gd-pinned"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "currentColor", 1, "gd-pinned__icon"], ["d", "M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"], [1, "gd-pinned__body"], [1, "gd-pinned__author"], [1, "gd-pinned__text"], [1, "gd-pinned__toggle", 3, "click"], ["class", "gd-pinned__unpin", "title", "Unpin", 3, "click", 4, "ngIf"], ["title", "Unpin", 1, "gd-pinned__unpin", 3, "click"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], [1, "gd-load-earlier"], [1, "gd-load-earlier__btn", 3, "click", "disabled"], [1, "gd-empty-chat"], [1, "gd-msg", 3, "mouseenter", "mouseleave"], [1, "gd-msg__system-text"], ["size", "sm", "shape", "circle", 3, "photoURL", "displayName", 4, "ngIf"], [1, "gd-msg__body"], ["class", "gd-msg__name", 4, "ngIf"], [1, "gd-msg__text"], [1, "gd-msg__time"], ["class", "gd-msg__pin-btn", 3, "gd-msg__pin-btn--visible", "gd-msg__pin-btn--active", "title", "click", 4, "ngIf"], ["size", "sm", "shape", "circle", 3, "photoURL", "displayName"], [1, "gd-msg__name"], [1, "gd-msg__pin-btn", 3, "click", "title"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "currentColor"], [1, "gd-chat-error"], [1, "gd-muted-banner"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"], ["d", "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"], ["x1", "12", "y1", "19", "x2", "12", "y2", "23"], ["x1", "8", "y1", "23", "x2", "16", "y2", "23"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], [1, "gd-muted-banner__text"], [1, "gd-muted-banner__title"], [1, "gd-muted-banner__sub"], [1, "gd-input"], ["placeholder", "Say something\u2026", "rows", "1", "maxlength", "500", 1, "gd-input__field", 3, "ngModelChange", "keydown", "ngModel"], [1, "gd-input__send", 3, "click", "disabled"], ["class", "gd-cooldown", 4, "ngIf", "ngIfElse"], [1, "gd-cooldown"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "22", "y1", "2", "x2", "11", "y2", "13"], ["points", "22 2 15 22 11 13 2 9 22 2"], [1, "gd-join-hint"], [1, "gd-gate"], [1, "gd-gate__msg"], [1, "gd-gate__btn", 3, "click", "disabled"], ["maxWidth", "280px", 3, "closeRequested"], [1, "gd-mp-modal"], [1, "gd-mp-modal__icon"], [1, "gd-mp-modal__title"], ["class", "gd-mp-modal__sub", 4, "ngIf"], ["target", "_blank", "rel", "noopener noreferrer", 1, "gd-mp-modal__btn", 3, "href"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "gd-mp-modal__sub"], [3, "closeRequested", "showClose"], [1, "gd-members-modal"], [1, "gd-members-header"], [1, "gd-section-label", 2, "margin-bottom", "0"], [1, "gd-members-header__actions"], ["class", "gd-bulk-select-btn", 3, "gd-bulk-select-btn--active", "click", 4, "ngIf"], ["aria-label", "Close", 1, "gd-members-close", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["class", "gd-member", 3, "gd-member--selectable", "gd-member--selected", "click", 4, "ngFor", "ngForOf"], ["class", "gd-bulk-bar", 4, "ngIf"], ["cancelLabel", "Cancel", 3, "fixed", "message", "confirmLabel", "danger", "confirmed", "cancelled", 4, "ngIf"], [1, "gd-bulk-select-btn", 3, "click"], [1, "gd-member", 3, "click"], ["class", "gd-member__checkbox", 3, "gd-member__checkbox--checked", 4, "ngIf"], ["size", "md", "shape", "circle", 3, "photoURL", "displayName", "level", "isAdmin", "roleLabel", "activeLabel"], [1, "gd-member__info"], [1, "gd-member__name"], ["class", "gd-member__badge gd-member__badge--leader", 4, "ngIf"], ["class", "gd-member__badge gd-member__badge--muted", 4, "ngIf"], [1, "gd-member__active"], ["class", "gd-member__menu-wrap", 4, "ngIf"], ["class", "gd-member__chevron", "width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", 4, "ngIf"], [1, "gd-member__checkbox"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "gd-member__badge", "gd-member__badge--leader"], [1, "gd-member__badge", "gd-member__badge--muted"], [1, "gd-member__menu-wrap"], ["title", "Member actions", 1, "gd-member__menu-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "currentColor"], ["cx", "12", "cy", "5", "r", "1.5"], ["cx", "12", "cy", "12", "r", "1.5"], ["cx", "12", "cy", "19", "r", "1.5"], ["class", "gd-member__menu", 3, "click", 4, "ngIf"], ["cancelLabel", "Cancel", 3, "message", "confirmLabel", "danger", "confirmed", "cancelled", 4, "ngIf"], [1, "gd-member__menu", 3, "click"], ["class", "gd-member__menu-item", 3, "click", 4, "ngIf"], [1, "gd-member__menu-item", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23", 4, "ngIf"], ["class", "gd-member__menu-item gd-member__menu-item--danger", 3, "click", 4, "ngIf"], ["points", "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"], [1, "gd-member__menu-item", "gd-member__menu-item--danger", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v6"], ["d", "M14 11v6"], ["d", "M9 6V4h6v2"], ["cancelLabel", "Cancel", 3, "confirmed", "cancelled", "message", "confirmLabel", "danger"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", 1, "gd-member__chevron"], [1, "gd-bulk-bar"], [1, "gd-bulk-bar__count"], ["class", "gd-bulk-bar__select-all", 3, "click", 4, "ngIf"], ["class", "gd-bulk-bar__btn", 3, "click", 4, "ngIf"], ["class", "gd-bulk-bar__btn gd-bulk-bar__btn--danger", 3, "click", 4, "ngIf"], [1, "gd-bulk-bar__select-all", 3, "click"], [1, "gd-bulk-bar__btn", 3, "click"], [1, "gd-bulk-bar__btn", "gd-bulk-bar__btn--danger", 3, "click"], ["cancelLabel", "Cancel", 3, "confirmed", "cancelled", "fixed", "message", "confirmLabel", "danger"]], template: function GroupDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 4);
        \u0275\u0275listener("closeRequested", function GroupDetailComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.router.navigate(["/malta/groups"]);
        })("dragStart", function GroupDetailComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function GroupDetailComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function GroupDetailComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function GroupDetailComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function GroupDetailComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function GroupDetailComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275element(1, "app-share-btn", 5);
        \u0275\u0275elementStart(2, "div", 6);
        \u0275\u0275template(3, GroupDetailComponent_div_3_Template, 4, 0, "div", 7)(4, GroupDetailComponent_ng_container_4_Template, 5, 4, "ng-container", 8);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        let tmp_2_0;
        \u0275\u0275property("title", (ctx.group == null ? null : ctx.group.title) || "Group");
        \u0275\u0275advance();
        \u0275\u0275property("url", ctx.shareUrl)("shareTitle", (tmp_2_0 = ctx.group == null ? null : ctx.group.title) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "Group");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.group);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.group);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, DatePipe, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, PanelShellComponent, UserAvatarComponent, ConfirmPopupComponent, MemberAvatarsComponent, AppModalComponent, ShareButtonComponent], styles: ["\n\n[_nghost-%COMP%]     .panel-body {\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.gd-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.gd-edit-scroll[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 20px;\n}\n.gd-info[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 20px 20px 0;\n}\n.gd-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  padding: 8px 16px 0;\n  flex-shrink: 0;\n}\n.gd-tab[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 6px 10px;\n  border: 1.5px solid transparent;\n  border-radius: var(--radius-md);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n  transition:\n    background var(--transition),\n    color var(--transition),\n    box-shadow var(--transition),\n    border-color var(--transition);\n}\n.gd-tab--active[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  color: var(--color-text-base);\n  border-color: var(--color-border);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);\n}\n.gd-tab--chat[_ngcontent-%COMP%]:not(.gd-tab--active) {\n  background: var(--color-primary);\n  color: #fff;\n  border-color: transparent;\n  animation: _ngcontent-%COMP%_chatTabGlow 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_chatTabGlow {\n  0%, 100% {\n    box-shadow: 0 2px 10px rgba(244, 169, 34, 0.35);\n  }\n  50% {\n    box-shadow: 0 4px 22px rgba(244, 169, 34, 0.65);\n  }\n}\n.gd-tab-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.gd-tab-pane[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 20px 24px;\n}\n.gd-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding-bottom: 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid var(--color-border);\n}\n.gd-header__leader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n}\n.gd-header__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.gd-header__title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  line-height: 1.3;\n}\n.gd-header__sub[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n}\n.gd-header__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.gd-header__spot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  background: none;\n  border: none;\n  padding: 2px 6px 2px 4px;\n  border-radius: var(--radius-sm);\n  cursor: pointer;\n  transition: background var(--transition), color var(--transition);\n}\n.gd-header__spot[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  color: var(--color-text-base);\n}\n.gd-header__spot--none[_ngcontent-%COMP%] {\n  cursor: default;\n  font-style: italic;\n  opacity: 0.6;\n}\n.gd-header__spot--none[_ngcontent-%COMP%]:hover {\n  background: none;\n  color: var(--color-text-muted);\n}\n.gd-status[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 20px;\n  text-transform: capitalize;\n}\n.gd-status--open[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.gd-status--full[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.gd-status--exploring[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1d4ed8;\n}\n.gd-status--cancelled[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.gd-status--completed[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n.gd-meeting-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  width: 100%;\n  padding: 9px 14px;\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  box-sizing: border-box;\n  margin-bottom: 4px;\n  transition:\n    border-color var(--transition),\n    color var(--transition),\n    background var(--transition);\n}\n.gd-meeting-row[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:first-child {\n  color: var(--color-primary);\n  stroke: var(--color-primary);\n  flex-shrink: 0;\n}\n.gd-meeting-row[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n  background: var(--color-bg-light);\n}\n.gd-meeting-row__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: var(--color-text-light);\n}\n.gd-exploring-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  border-radius: var(--radius-lg);\n  background: #eff6ff;\n  border: 1px solid #bfdbfe;\n  font-size: 13px;\n  font-weight: 600;\n  color: #1d4ed8;\n}\n.gd-header__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  line-height: 1.6;\n  margin: 0 0 14px;\n}\n.gd-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--color-border);\n  position: relative;\n}\n.gd-leader-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.gd-leader-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.gd-leader-row[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.gd-join-btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gd-join-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-join-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-leave-btn[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-leave-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.gd-leave-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-explore-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: #ecfdf5;\n  color: #059669;\n  border: 1.5px solid #a7f3d0;\n  border-radius: var(--radius-lg);\n  padding: 12px 14px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background var(--transition), border-color var(--transition);\n}\n.gd-explore-btn[_ngcontent-%COMP%]:hover {\n  background: #d1fae5;\n  border-color: #6ee7b7;\n}\n.gd-explore-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-cancel-btn[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n  border-radius: var(--radius-lg);\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-cancel-btn[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n}\n.gd-cancel-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-action-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #dc2626;\n  margin: 0;\n}\n.gd-gate[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 20px 16px;\n  text-align: center;\n  margin-bottom: 20px;\n}\n.gd-gate__msg[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: var(--color-text-secondary);\n  margin: 0 0 12px;\n  line-height: 1.5;\n}\n.gd-gate__btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 10px 24px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gd-gate__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-section-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 10px;\n}\n.gd-section-label--chat[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.gd-transfer[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: var(--radius-xl);\n  padding: 14px;\n  margin-bottom: 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.gd-transfer__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #92400e;\n  margin: 0;\n}\n.gd-transfer__member[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #fff;\n  border: 1px solid #fde68a;\n  border-radius: var(--radius-lg);\n  padding: 8px 12px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-transfer__member[_ngcontent-%COMP%]:hover {\n  background: #fef3c7;\n}\n.gd-transfer__member[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-transfer__cancel[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  padding: 4px 0;\n  text-align: left;\n}\n.gd-transfer__cancel[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.gd-members-section-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  padding-top: 20px;\n  padding-bottom: 8px;\n  border-top: 1px solid var(--color-border);\n  margin-top: 16px;\n}\n.gd-members-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  cursor: pointer;\n  transition: background var(--transition), border-color var(--transition);\n}\n.gd-members-row[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  border-color: var(--color-text-light);\n}\n.gd-members-row__label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gd-members-row__spots[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-muted);\n}\n.gd-members-row__chevron[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--color-text-muted);\n}\n.gd-members[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-bottom: 4px;\n}\n.gd-members-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.gd-members-header__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.gd-bulk-select-btn[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: transparent;\n  color: var(--color-text-muted);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    color var(--transition),\n    border-color var(--transition);\n}\n.gd-bulk-select-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n}\n.gd-bulk-select-btn--active[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  border-color: var(--color-text-light);\n}\n.gd-members-close[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-bg-muted);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  width: 28px;\n  height: 28px;\n  cursor: pointer;\n  color: var(--color-text-muted);\n  transition: background var(--transition), color var(--transition);\n}\n.gd-members-close[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n  color: var(--color-text-secondary);\n}\n.gd-member[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.gd-member--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border-radius: var(--radius-lg);\n  padding: 4px 6px;\n  margin: 0 -6px;\n  transition: background var(--transition);\n}\n.gd-member--clickable[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-member--selectable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border-radius: var(--radius-lg);\n  padding: 6px 8px;\n  margin: 0 -8px;\n  transition: background var(--transition);\n}\n.gd-member--selectable[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-member--selected[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n}\n.gd-member--selected[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.gd-member__checkbox[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border-radius: 6px;\n  border: 2px solid var(--color-border);\n  background: var(--color-bg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: border-color var(--transition), background var(--transition);\n}\n.gd-member__checkbox--checked[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: #fff;\n}\n.gd-bulk-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  padding: 10px 12px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  margin-top: 4px;\n  animation: _ngcontent-%COMP%_gdMenuPop 0.14s ease;\n}\n.gd-bulk-bar__count[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  flex: 1;\n  min-width: 80px;\n}\n.gd-bulk-bar__select-all[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n.gd-bulk-bar__select-all[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.gd-bulk-bar__btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n  font-size: 12.5px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition:\n    background var(--transition),\n    border-color var(--transition),\n    color var(--transition);\n}\n.gd-bulk-bar__btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-bulk-bar__btn--danger[_ngcontent-%COMP%] {\n  color: #dc2626;\n  border-color: #fecaca;\n  background: #fef2f2;\n}\n.gd-bulk-bar__btn--danger[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n  border-color: #fca5a5;\n}\n.gd-member__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  flex-shrink: 0;\n  color: var(--color-text-light);\n}\n.gd-member__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.gd-member__name[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.gd-member__badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  padding: 1px 7px;\n  border-radius: 20px;\n  text-transform: capitalize;\n}\n.gd-member__badge--leader[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.gd-member__badge--muted[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.gd-member__active[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.gd-member__menu-wrap[_ngcontent-%COMP%] {\n  margin-left: auto;\n  position: relative;\n  flex-shrink: 0;\n}\n.gd-member__menu-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: var(--radius-md);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--color-text-light);\n  transition: background var(--transition), color var(--transition);\n}\n.gd-member__menu-btn[_ngcontent-%COMP%]:hover, \n.gd-member__menu-btn--open[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n}\n.gd-member__menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 4px);\n  right: 0;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-md);\n  min-width: 148px;\n  z-index: 60;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_gdMenuPop 0.12s ease;\n}\n@keyframes _ngcontent-%COMP%_gdMenuPop {\n  from {\n    opacity: 0;\n    transform: translateY(-4px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.gd-member__menu-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 9px 12px;\n  border: none;\n  background: transparent;\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  text-align: left;\n  transition: background var(--transition);\n}\n.gd-member__menu-item[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-member__menu-item--danger[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.gd-member__menu-item--danger[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n}\n.gd-pinned[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  padding: 8px 10px;\n  margin-bottom: 8px;\n  background: var(--color-bg-muted);\n  border-left: 3px solid var(--color-primary);\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n  animation: _ngcontent-%COMP%_gdMenuPop 0.15s ease;\n}\n.gd-pinned__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--color-primary);\n  margin-top: 2px;\n}\n.gd-pinned__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.gd-pinned__author[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  color: var(--color-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.gd-pinned__text[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-secondary);\n  line-height: 1.4;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.gd-pinned__text--expanded[_ngcontent-%COMP%] {\n  display: block;\n  overflow: visible;\n  -webkit-line-clamp: unset;\n}\n.gd-pinned__toggle[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  margin-top: 3px;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-primary);\n  cursor: pointer;\n  text-align: left;\n}\n.gd-pinned__toggle[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.gd-pinned__unpin[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  background: none;\n  border: none;\n  color: var(--color-text-light);\n  cursor: pointer;\n  padding: 2px;\n  border-radius: var(--radius-sm);\n  display: flex;\n  align-items: center;\n  transition: color var(--transition);\n}\n.gd-pinned__unpin[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.gd-chat[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 220px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  padding: 12px 20px 16px;\n  border-top: 1px solid var(--color-border);\n  margin-top: 4px;\n}\n.gd-messages[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 12px;\n  overflow-y: auto;\n  padding-right: 2px;\n}\n.gd-members-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding-top: 4px;\n}\n.gd-load-earlier[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 4px 0 6px;\n}\n.gd-load-earlier__btn[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-primary);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: var(--radius-sm);\n  transition: opacity var(--transition);\n}\n.gd-load-earlier__btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.75;\n}\n.gd-load-earlier__btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.gd-empty-chat[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  text-align: center;\n  padding: 20px 0;\n}\n.gd-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 7px;\n  max-width: 80%;\n}\n.gd-msg--own[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  flex-direction: row-reverse;\n}\n.gd-msg__body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.gd-msg__name[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.gd-msg__text[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  border-radius: 14px;\n  padding: 8px 12px;\n  font-size: 13.5px;\n  color: var(--color-text-base);\n  line-height: 1.45;\n  word-break: break-word;\n}\n.gd-msg--own[_ngcontent-%COMP%]   .gd-msg__text[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n}\n.gd-msg__time[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--color-text-light);\n  text-align: right;\n}\n.gd-msg--pinned[_ngcontent-%COMP%]   .gd-msg__text[_ngcontent-%COMP%] {\n  outline: 1.5px solid var(--color-primary);\n  outline-offset: 2px;\n  border-radius: 14px;\n}\n.gd-msg--system[_ngcontent-%COMP%] {\n  justify-content: center;\n  max-width: 100%;\n  padding: 2px 0;\n}\n.gd-msg__system-text[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-light);\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-lg);\n  padding: 4px 12px;\n  text-align: center;\n}\n.gd-msg__pin-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  align-self: center;\n  background: none;\n  border: none;\n  color: var(--color-text-light);\n  cursor: pointer;\n  padding: 4px;\n  border-radius: var(--radius-sm);\n  display: flex;\n  align-items: center;\n  opacity: 0;\n  transition: opacity var(--transition), color var(--transition);\n}\n.gd-msg__pin-btn--visible[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.gd-msg__pin-btn--active[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  opacity: 1;\n}\n.gd-msg__pin-btn[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n@media (max-width: 768px) {\n  .gd-msg__pin-btn[_ngcontent-%COMP%] {\n    opacity: 1;\n  }\n}\n.gd-input[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: flex-end;\n  gap: 6px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 4px 4px 4px 10px;\n}\n.gd-input__field[_ngcontent-%COMP%] {\n  flex: 1;\n  background: none;\n  border: none;\n  outline: none;\n  resize: none;\n  font-size: 16px;\n  color: var(--color-text-base);\n  font-family: inherit;\n  line-height: 1.3;\n  max-height: 72px;\n  overflow-y: auto;\n  padding: 4px 0;\n}\n.gd-input__send[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-md);\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: opacity var(--transition);\n}\n.gd-input__send[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-input__send[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.gd-muted-banner[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: var(--radius-lg);\n  padding: 12px 14px;\n  margin-bottom: 8px;\n  color: #92400e;\n}\n.gd-muted-banner[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.gd-muted-banner__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.gd-muted-banner__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n}\n.gd-muted-banner__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 400;\n  opacity: 0.85;\n}\n.gd-chat-error[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  text-align: center;\n  margin: 4px 0 6px;\n}\n.gd-input--disabled[_ngcontent-%COMP%] {\n  opacity: 0.55;\n  pointer-events: none;\n}\n.gd-cooldown[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  line-height: 1;\n}\n.gd-join-hint[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  text-align: center;\n  margin: 8px 0 0;\n}\n.gd-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  padding: 40px 0;\n}\n.gd-loading__dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  animation: _ngcontent-%COMP%_gdDotPulse 1.2s ease-in-out infinite;\n}\n.gd-loading__dot[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.gd-loading__dot[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_gdDotPulse {\n  0%, 80%, 100% {\n    opacity: 0.3;\n    transform: scale(0.8);\n  }\n  40% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.gd-mp-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 0 4px;\n  text-align: center;\n}\n.gd-mp-modal__icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  line-height: 1;\n  margin-bottom: 2px;\n}\n.gd-mp-modal__title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.gd-mp-modal__sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n}\n.gd-mp-modal__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  margin-top: 10px;\n  padding: 11px 22px;\n  border-radius: var(--radius-lg);\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 14px;\n  font-weight: 700;\n  text-decoration: none;\n  transition: opacity var(--transition);\n}\n.gd-mp-modal__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-edit-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  width: 100%;\n  padding: 9px 14px;\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  box-sizing: border-box;\n  transition:\n    border-color var(--transition),\n    color var(--transition),\n    background var(--transition);\n}\n.gd-edit-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  flex-shrink: 0;\n}\n.gd-edit-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n  background: var(--color-bg-light);\n}\n.gd-edit-btn[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.gd-edit-form[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 16px;\n  margin-bottom: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.gd-edit-form__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.gd-edit-form__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  margin: 0;\n  color: var(--color-text-base);\n}\n.gd-edit-form__close[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  border-radius: var(--radius-sm);\n  transition: background var(--transition);\n}\n.gd-edit-form__close[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-hover);\n}\n.gd-edit-form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.gd-edit-form__field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.gd-edit-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.gd-edit-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 11px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: 13.5px;\n  color: var(--color-text-base);\n  background: var(--color-bg);\n  box-sizing: border-box;\n  transition: border-color var(--transition);\n}\n.gd-edit-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.gd-edit-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n}\n.gd-edit-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 70px;\n}\n.gd-edit-form__opt[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-light);\n  text-transform: none;\n  letter-spacing: 0;\n}\n.gd-edit-form__spot-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.gd-edit-form__spot-results[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  background: var(--color-bg);\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-md);\n  box-shadow: var(--shadow-md);\n  list-style: none;\n  margin: 0;\n  padding: 4px 0;\n  z-index: 10;\n  max-height: 180px;\n  overflow-y: auto;\n}\n.gd-edit-form__spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  font-size: 13px;\n  color: var(--color-text-base);\n  cursor: pointer;\n}\n.gd-edit-form__spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-edit-form__spot-selected[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  margin-top: 2px;\n}\n.gd-edit-form__spot-selected[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.gd-edit-form__row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.gd-edit-form__row[_ngcontent-%COMP%]   .gd-edit-form__field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.gd-edit-form__chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.gd-edit-form__error[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #dc2626;\n  margin: 0;\n}\n.gd-edit-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n}\n.gd-edit-form__cancel[_ngcontent-%COMP%] {\n  padding: 9px 16px;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: none;\n  color: var(--color-text-secondary);\n  font-size: 13.5px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-edit-form__cancel[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-hover);\n}\n.gd-edit-form__submit[_ngcontent-%COMP%] {\n  padding: 9px 18px;\n  border-radius: var(--radius-md);\n  border: none;\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 13.5px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gd-edit-form__submit[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-edit-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-meeting-pick[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.gd-meeting-pick__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 7px 12px;\n  border-radius: var(--radius-md);\n  border: 1.5px dashed var(--color-border);\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n  font-size: 12.5px;\n  font-weight: 500;\n  cursor: pointer;\n  transition:\n    border-color var(--transition),\n    color var(--transition),\n    background var(--transition);\n}\n.gd-meeting-pick__btn[_ngcontent-%COMP%]:hover, \n.gd-meeting-pick__btn.picking[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n  background: var(--color-bg-light);\n}\n.gd-meeting-pick__btn.picking[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_gdPickPulse 1.4s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_gdPickPulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.6;\n  }\n}\n.gd-meeting-set[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: #16a34a;\n}\n.gd-meeting-set[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  stroke: #16a34a;\n}\n.gd-meeting-set__remove[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  padding: 2px 8px;\n  border-radius: var(--radius-sm);\n  border: 1px solid var(--color-border);\n  background: none;\n  color: var(--color-text-muted);\n  font-size: 11px;\n  cursor: pointer;\n  transition: color var(--transition), border-color var(--transition);\n}\n.gd-meeting-set__remove[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n  border-color: #dc2626;\n}\n.gd-meeting-confirm[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.gd-meeting-confirm__msg[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: var(--color-text-base);\n}\n.gd-meeting-confirm__msg[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.gd-meeting-confirm__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.gd-meeting-confirm__retry[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 6px 10px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: none;\n  font-size: 12.5px;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n}\n.gd-meeting-confirm__retry[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-meeting-confirm__ok[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 6px 10px;\n  border: none;\n  border-radius: var(--radius-md);\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 12.5px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.gd-meeting-confirm__ok[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n/*# sourceMappingURL=group-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupDetailComponent, { className: "GroupDetailComponent", filePath: "src/app/platform/group-detail/group-detail.component.ts", lineNumber: 35 });
})();
export {
  GroupDetailComponent
};
//# sourceMappingURL=chunk-CIYCWKEB.js.map
