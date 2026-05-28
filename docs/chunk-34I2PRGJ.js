import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel
} from "./chunk-DMA37V7A.js";
import {
  AnalyticsService,
  GroupFullError,
  GroupsService,
  LeaderMustTransferError
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
  MapBridgeService
} from "./chunk-MJA2VSFQ.js";
import {
  takeUntilDestroyed
} from "./chunk-VNFAWDNY.js";
import {
  ActivatedRoute,
  Router
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
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuery
} from "./chunk-UX7WDOQ6.js";

// src/app/platform/group-detail/group-detail.component.ts
var _c0 = ["messagesEnd"];
function GroupDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "span", 5)(2, "span", 5)(3, "span", 5);
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_2_p_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.group.description);
  }
}
function GroupDetailComponent_ng_container_2_div_21_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_2_div_21_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.join());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.actionBusy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.actionBusy() ? "Joining\u2026" : "Join group", " ");
  }
}
function GroupDetailComponent_ng_container_2_div_21_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_2_div_21_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.leave());
    });
    \u0275\u0275text(1, " Leave group ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.actionBusy());
  }
}
function GroupDetailComponent_ng_container_2_div_21_div_3_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_2_div_21_div_3_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.cancelGroup());
    });
    \u0275\u0275text(1, " Cancel group ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.actionBusy());
  }
}
function GroupDetailComponent_ng_container_2_div_21_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "button", 29);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_2_div_21_div_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.leave());
    });
    \u0275\u0275text(2, "Leave group");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupDetailComponent_ng_container_2_div_21_div_3_button_3_Template, 2, 1, "button", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.actionBusy());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.group.status !== "cancelled");
  }
}
function GroupDetailComponent_ng_container_2_div_21_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.actionError());
  }
}
function GroupDetailComponent_ng_container_2_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_2_div_21_button_1_Template, 2, 2, "button", 24)(2, GroupDetailComponent_ng_container_2_div_21_button_2_Template, 2, 1, "button", 25)(3, GroupDetailComponent_ng_container_2_div_21_div_3_Template, 4, 2, "div", 26)(4, GroupDetailComponent_ng_container_2_div_21_p_4_Template, 2, 1, "p", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.canJoin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isMember && !ctx_r0.isLeader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isLeader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.actionError());
  }
}
function GroupDetailComponent_ng_container_2_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "p", 35);
    \u0275\u0275text(2, "Sign in to see who's joining and chat with the group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 36);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_2_div_22_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.authService.openLoginModal());
    });
    \u0275\u0275text(4, "Sign in");
    \u0275\u0275elementEnd()();
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \xB7 ", ctx_r0.group.maxMembers - ctx_r0.group.memberCount, " spot", ctx_r0.group.maxMembers - ctx_r0.group.memberCount === 1 ? "" : "s", " left");
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_div_4_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_2_ng_container_23_div_4_button_3_Template_button_click_0_listener() {
      const m_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.transferTo(m_r9.uid));
    });
    \u0275\u0275element(1, "img", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.actionBusy());
    \u0275\u0275advance();
    \u0275\u0275property("src", m_r9.photoURL || "/assets/images/default-avatar.svg", \u0275\u0275sanitizeUrl)("alt", m_r9.displayName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r9.displayName, " ");
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "p", 49);
    \u0275\u0275text(2, "Choose a new leader before you leave:");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupDetailComponent_ng_container_2_ng_container_23_div_4_button_3_Template, 3, 4, "button", 50);
    \u0275\u0275elementStart(4, "button", 51);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_2_ng_container_23_div_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.showTransfer.set(false));
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.nonLeaderMembers);
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_div_6_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1, "leader");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275element(1, "img", 55);
    \u0275\u0275elementStart(2, "div", 56)(3, "span", 57);
    \u0275\u0275text(4);
    \u0275\u0275template(5, GroupDetailComponent_ng_container_2_ng_container_23_div_6_span_5_Template, 2, 0, "span", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 59);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r10 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", m_r10.photoURL || "/assets/images/default-avatar.svg", \u0275\u0275sanitizeUrl)("alt", m_r10.displayName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", m_r10.displayName, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r10.role === "leader");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatLastActive(m_r10.lastActive));
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275text(1, " Be the first to say something \u{1F44B} ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_div_12_img_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 68);
  }
  if (rf & 2) {
    const msg_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", msg_r11.photoURL || "/assets/images/default-avatar.svg", \u0275\u0275sanitizeUrl)("alt", msg_r11.displayName);
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_div_12_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const msg_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(msg_r11.displayName);
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_2_ng_container_23_div_12_img_1_Template, 1, 2, "img", 63);
    \u0275\u0275elementStart(2, "div", 64);
    \u0275\u0275template(3, GroupDetailComponent_ng_container_2_ng_container_23_div_12_span_3_Template, 2, 1, "span", 65);
    \u0275\u0275elementStart(4, "span", 66);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 67);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const msg_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("gd-msg--own", msg_r11.uid === (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.uid));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", msg_r11.uid !== (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.uid));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", msg_r11.uid !== (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.uid));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(msg_r11.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 6, msg_r11.createdAt == null ? null : msg_r11.createdAt.toDate(), "HH:mm"));
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "textarea", 71);
    \u0275\u0275listener("ngModelChange", function GroupDetailComponent_ng_container_2_ng_container_23_div_15_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.messageText.set($event));
    })("keydown", function GroupDetailComponent_ng_container_2_ng_container_23_div_15_Template_textarea_keydown_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onMessageKeydown($event));
    });
    \u0275\u0275text(2, "          ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 72);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_2_ng_container_23_div_15_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.sendMessage());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 73);
    \u0275\u0275element(5, "line", 74)(6, "polygon", 75);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r0.messageText());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.messageText().trim() || ctx_r0.sendingMessage());
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 76);
    \u0275\u0275text(1, " Join the group to chat ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_2_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 37);
    \u0275\u0275text(2);
    \u0275\u0275template(3, GroupDetailComponent_ng_container_2_ng_container_23_span_3_Template, 2, 2, "span", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, GroupDetailComponent_ng_container_2_ng_container_23_div_4_Template, 6, 1, "div", 38);
    \u0275\u0275elementStart(5, "div", 39);
    \u0275\u0275template(6, GroupDetailComponent_ng_container_2_ng_container_23_div_6_Template, 8, 5, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 41)(8, "div", 42);
    \u0275\u0275text(9, "Chat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 43);
    \u0275\u0275template(11, GroupDetailComponent_ng_container_2_ng_container_23_div_11_Template, 2, 0, "div", 44)(12, GroupDetailComponent_ng_container_2_ng_container_23_div_12_Template, 9, 9, "div", 45);
    \u0275\u0275element(13, "div", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, GroupDetailComponent_ng_container_2_ng_container_23_div_15_Template, 7, 2, "div", 46)(16, GroupDetailComponent_ng_container_2_ng_container_23_p_16_Template, 2, 0, "p", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.members.length, " member", ctx_r0.members.length === 1 ? "" : "s", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.group.maxMembers);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.showTransfer());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.members);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r0.messages.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.messages);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.isMember);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isMember && ctx_r0.authService.isLoggedIn());
  }
}
function GroupDetailComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 6)(2, "div", 7);
    \u0275\u0275element(3, "img", 8);
    \u0275\u0275elementStart(4, "div", 9)(5, "span", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 11);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 12)(11, "span", 13);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 14);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 15);
    \u0275\u0275element(15, "path", 16)(16, "circle", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "span", 18);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(20, GroupDetailComponent_ng_container_2_p_20_Template, 2, 1, "p", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, GroupDetailComponent_ng_container_2_div_21_Template, 5, 4, "div", 20)(22, GroupDetailComponent_ng_container_2_div_22_Template, 5, 0, "div", 21)(23, GroupDetailComponent_ng_container_2_ng_container_23_Template, 17, 9, "ng-container", 3);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r0.group.leaderPhoto || "/assets/images/default-avatar.svg", \u0275\u0275sanitizeUrl)("alt", ctx_r0.group.leaderName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.group.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind2(9, 17, ctx_r0.group.date.toDate(), "EEEE d MMMM"), " \xB7 ", ctx_r0.group.time, " \xB7 ", ctx_r0.group.leaderName, " leading");
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge--" + ctx_r0.group.difficulty);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.group.difficulty);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.group.spotTitle, " ");
    \u0275\u0275advance();
    \u0275\u0275classMap("gd-status--" + ctx_r0.group.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.group.status);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.group.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.authService.isLoggedIn());
  }
}
var GroupDetailComponent = class _GroupDetailComponent {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.seo = inject(SeoService);
    this.analytics = inject(AnalyticsService);
    this.bridge = inject(MapBridgeService);
    this.groupsService = inject(GroupsService);
    this.authService = inject(AuthService);
    this.actionError = signal(null);
    this.actionBusy = signal(false);
    this.showTransfer = signal(false);
    this.messageText = signal("");
    this.sendingMessage = signal(false);
    this.groupId = "";
    this.shouldScrollToBottom = false;
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
    return this.groupsService.messages();
  }
  get isLeader() {
    return !!this.currentUser && this.group?.leaderId === this.currentUser.uid;
  }
  get isMember() {
    return !!this.currentUser && this.members.some((m) => m.uid === this.currentUser.uid);
  }
  get canJoin() {
    const g = this.group;
    if (!g)
      return false;
    return g.status === "open" && !this.isMember;
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
    if (this.isMember)
      this.groupsService.updateLastActive(this.groupId);
    this.analytics.pageView(window.location.href, "Group Detail");
  }
  ngOnDestroy() {
    this.groupsService.stopDetailListener();
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
      if (!confirm("Cancel this group? All members will be notified."))
        return;
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
  sendMessage() {
    return __async(this, null, function* () {
      const text = this.messageText().trim();
      if (!text || this.sendingMessage())
        return;
      this.sendingMessage.set(true);
      try {
        yield this.groupsService.sendMessage(this.groupId, text);
        this.messageText.set("");
        this.shouldScrollToBottom = true;
      } catch {
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
  formatLastActive(ts) {
    if (!ts)
      return "";
    return GroupsService.formatLastActive(ts);
  }
  get nonLeaderMembers() {
    return this.members.filter((m) => m.uid !== this.group?.leaderId);
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
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.messagesEnd = _t.first);
      }
    }, hostBindings: function GroupDetailComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("visibilitychange", function GroupDetailComponent_visibilitychange_HostBindingHandler() {
          return ctx.onVisibilityChange();
        }, false, \u0275\u0275resolveDocument);
      }
    }, decls: 3, vars: 3, consts: [["messagesEnd", ""], [3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd", "title"], ["class", "gd-loading", 4, "ngIf"], [4, "ngIf"], [1, "gd-loading"], [1, "gd-loading__dot"], [1, "gd-header"], [1, "gd-header__leader"], ["width", "40", "height", "40", "referrerpolicy", "no-referrer", 1, "gd-header__photo", 3, "src", "alt"], [1, "gd-header__info"], [1, "gd-header__title"], [1, "gd-header__sub"], [1, "gd-header__meta"], [1, "badge"], [1, "gd-header__spot"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "gd-status"], ["class", "gd-header__desc", 4, "ngIf"], ["class", "gd-actions", 4, "ngIf"], ["class", "gd-gate", 4, "ngIf"], [1, "gd-header__desc"], [1, "gd-actions"], ["class", "gd-join-btn", 3, "disabled", "click", 4, "ngIf"], ["class", "gd-leave-btn", 3, "disabled", "click", 4, "ngIf"], ["class", "gd-leader-actions", 4, "ngIf"], ["class", "gd-action-error", 4, "ngIf"], [1, "gd-join-btn", 3, "click", "disabled"], [1, "gd-leave-btn", 3, "click", "disabled"], [1, "gd-leader-actions"], ["class", "gd-cancel-btn", 3, "disabled", "click", 4, "ngIf"], [1, "gd-cancel-btn", 3, "click", "disabled"], [1, "gd-action-error"], [1, "gd-gate"], [1, "gd-gate__msg"], [1, "gd-gate__btn", 3, "click"], [1, "gd-section-label"], ["class", "gd-transfer", 4, "ngIf"], [1, "gd-members"], ["class", "gd-member", 4, "ngFor", "ngForOf"], [1, "gd-chat"], [1, "gd-section-label", "gd-section-label--chat"], [1, "gd-messages"], ["class", "gd-empty-chat", 4, "ngIf"], ["class", "gd-msg", 3, "gd-msg--own", 4, "ngFor", "ngForOf"], ["class", "gd-input", 4, "ngIf"], ["class", "gd-join-hint", 4, "ngIf"], [1, "gd-transfer"], [1, "gd-transfer__label"], ["class", "gd-transfer__member", 3, "disabled", "click", 4, "ngFor", "ngForOf"], [1, "gd-transfer__cancel", 3, "click"], [1, "gd-transfer__member", 3, "click", "disabled"], ["width", "24", "height", "24", "referrerpolicy", "no-referrer", 3, "src", "alt"], [1, "gd-member"], ["width", "36", "height", "36", "referrerpolicy", "no-referrer", 1, "gd-member__photo", 3, "src", "alt"], [1, "gd-member__info"], [1, "gd-member__name"], ["class", "gd-member__badge gd-member__badge--leader", 4, "ngIf"], [1, "gd-member__active"], [1, "gd-member__badge", "gd-member__badge--leader"], [1, "gd-empty-chat"], [1, "gd-msg"], ["class", "gd-msg__avatar", "width", "26", "height", "26", "referrerpolicy", "no-referrer", 3, "src", "alt", 4, "ngIf"], [1, "gd-msg__body"], ["class", "gd-msg__name", 4, "ngIf"], [1, "gd-msg__text"], [1, "gd-msg__time"], ["width", "26", "height", "26", "referrerpolicy", "no-referrer", 1, "gd-msg__avatar", 3, "src", "alt"], [1, "gd-msg__name"], [1, "gd-input"], ["placeholder", "Say something\u2026", "rows", "1", "maxlength", "500", 1, "gd-input__field", 3, "ngModelChange", "keydown", "ngModel"], [1, "gd-input__send", 3, "click", "disabled"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "22", "y1", "2", "x2", "11", "y2", "13"], ["points", "22 2 15 22 11 13 2 9 22 2"], [1, "gd-join-hint"]], template: function GroupDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 1);
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
        \u0275\u0275template(1, GroupDetailComponent_div_1_Template, 4, 0, "div", 2)(2, GroupDetailComponent_ng_container_2_Template, 24, 20, "ng-container", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("title", (ctx.group == null ? null : ctx.group.title) || "Group");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.group);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.group);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, PanelShellComponent], styles: ["\n\n.gd-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.gd-header__leader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n}\n.gd-header__photo[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  border: 2px solid var(--color-border);\n}\n.gd-header__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.gd-header__title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  line-height: 1.3;\n}\n.gd-header__sub[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n}\n.gd-header__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.gd-header__spot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--color-text-muted);\n}\n.gd-status[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 20px;\n  text-transform: capitalize;\n}\n.gd-status--open[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.gd-status--full[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.gd-status--cancelled[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.gd-status--completed[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n.gd-header__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  line-height: 1.5;\n  margin: 0;\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-md);\n  padding: 10px 12px;\n}\n.gd-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 20px;\n}\n.gd-leader-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.gd-join-btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gd-join-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-join-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-leave-btn[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-leave-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.gd-leave-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-cancel-btn[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n  border-radius: var(--radius-lg);\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-cancel-btn[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n}\n.gd-cancel-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-action-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #dc2626;\n  margin: 0;\n}\n.gd-gate[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 20px 16px;\n  text-align: center;\n  margin-bottom: 20px;\n}\n.gd-gate__msg[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: var(--color-text-secondary);\n  margin: 0 0 12px;\n  line-height: 1.5;\n}\n.gd-gate__btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 10px 24px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gd-gate__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-section-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 10px;\n}\n.gd-section-label--chat[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.gd-transfer[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  border: 1px solid #fde68a;\n  border-radius: var(--radius-xl);\n  padding: 14px;\n  margin-bottom: 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.gd-transfer__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #92400e;\n  margin: 0;\n}\n.gd-transfer__member[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #fff;\n  border: 1px solid #fde68a;\n  border-radius: var(--radius-lg);\n  padding: 8px 12px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-transfer__member[_ngcontent-%COMP%]:hover {\n  background: #fef3c7;\n}\n.gd-transfer__member[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-transfer__member[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  object-fit: cover;\n}\n.gd-transfer__cancel[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  padding: 4px 0;\n  text-align: left;\n}\n.gd-transfer__cancel[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.gd-members[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 4px;\n}\n.gd-member[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.gd-member__photo[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  border: 1.5px solid var(--color-border);\n}\n.gd-member__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.gd-member__name[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.gd-member__badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  padding: 1px 7px;\n  border-radius: 20px;\n  text-transform: capitalize;\n}\n.gd-member__badge--leader[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.gd-member__active[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.gd-chat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.gd-messages[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  min-height: 60px;\n  margin-bottom: 12px;\n  max-height: 340px;\n  overflow-y: auto;\n  padding-right: 2px;\n}\n.gd-empty-chat[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  text-align: center;\n  padding: 20px 0;\n}\n.gd-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 7px;\n  max-width: 80%;\n}\n.gd-msg--own[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  flex-direction: row-reverse;\n}\n.gd-msg__avatar[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n}\n.gd-msg__body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.gd-msg__name[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.gd-msg__text[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  border-radius: 14px;\n  padding: 8px 12px;\n  font-size: 13.5px;\n  color: var(--color-text-base);\n  line-height: 1.45;\n  word-break: break-word;\n}\n.gd-msg--own[_ngcontent-%COMP%]   .gd-msg__text[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n}\n.gd-msg__time[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--color-text-light);\n  text-align: right;\n}\n.gd-input[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 8px 10px 8px 14px;\n}\n.gd-input__field[_ngcontent-%COMP%] {\n  flex: 1;\n  background: none;\n  border: none;\n  outline: none;\n  resize: none;\n  font-size: 13.5px;\n  color: var(--color-text-base);\n  font-family: inherit;\n  line-height: 1.45;\n  max-height: 96px;\n  overflow-y: auto;\n}\n.gd-input__send[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  width: 34px;\n  height: 34px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: opacity var(--transition);\n}\n.gd-input__send[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-input__send[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.gd-join-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n  text-align: center;\n  margin: 8px 0 0;\n}\n.gd-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  padding: 40px 0;\n}\n.gd-loading__dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  animation: _ngcontent-%COMP%_gdDotPulse 1.2s ease-in-out infinite;\n}\n.gd-loading__dot[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.gd-loading__dot[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_gdDotPulse {\n  0%, 80%, 100% {\n    opacity: 0.3;\n    transform: scale(0.8);\n  }\n  40% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n/*# sourceMappingURL=group-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupDetailComponent, { className: "GroupDetailComponent", filePath: "src/app/platform/group-detail/group-detail.component.ts", lineNumber: 25 });
})();
export {
  GroupDetailComponent
};
//# sourceMappingURL=chunk-34I2PRGJ.js.map
