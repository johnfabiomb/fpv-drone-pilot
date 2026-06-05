import {
  ShareButtonComponent
} from "./chunk-T25PJZD5.js";
import {
  ConfirmPopupComponent,
  MemberAvatarsComponent
} from "./chunk-2H6FXFNJ.js";
import {
  AnalyticsService,
  GroupsService
} from "./chunk-EQRF7B5Q.js";
import {
  PanelShellComponent
} from "./chunk-OCC7J5OB.js";
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
  normalizeForSearch
} from "./chunk-DV4PQ35C.js";
import {
  AppModalComponent
} from "./chunk-Y5KTKYRJ.js";
import {
  UserAvatarComponent
} from "./chunk-WCQ2L7X5.js";
import {
  UserDataService
} from "./chunk-JEMGPZZW.js";
import "./chunk-4VPY4RR2.js";
import "./chunk-YJZWMVU3.js";
import {
  CooldownError,
  GroupFullError,
  GroupRole,
  GroupStatus,
  LeaderMustTransferError,
  SpamMutedError
} from "./chunk-PHYDDMB4.js";
import {
  AuthService
} from "./chunk-LZQGUYST.js";
import "./chunk-ETILE57P.js";
import {
  SeoService
} from "./chunk-2WBO6UKF.js";
import {
  locations
} from "./chunk-QS4OYXJB.js";
import {
  MapBridgeService
} from "./chunk-3RZU6AR3.js";
import {
  takeUntilDestroyed
} from "./chunk-3HMSICCD.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-JZVCYE4P.js";
import "./chunk-UEIPWXE7.js";
import {
  CommonModule,
  DOCUMENT,
  DatePipe,
  DestroyRef,
  EventEmitter,
  NgForOf,
  NgIf,
  NgTemplateOutlet,
  PLATFORM_ID,
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
} from "./chunk-435XO7VF.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/features/groups/group-detail/group-chat/group-chat.component.ts
var _c0 = ["messagesEnd"];
var _c1 = ["messagesContainer"];
var _c2 = ["textareaRef"];
var _c3 = ["emojiWrap"];
function GroupChatComponent_div_0_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function GroupChatComponent_div_0_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pinnedExpanded.set(!ctx_r1.pinnedExpanded()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.pinnedExpanded() ? "Show less" : "Show more", " ");
  }
}
function GroupChatComponent_div_0_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function GroupChatComponent_div_0_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.unpinMessage());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 27);
    \u0275\u0275element(2, "line", 28)(3, "line", 29);
    \u0275\u0275elementEnd()();
  }
}
function GroupChatComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 18);
    \u0275\u0275element(2, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "div", 20)(4, "span", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, GroupChatComponent_div_0_button_8_Template, 2, 1, "button", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, GroupChatComponent_div_0_button_9_Template, 4, 0, "button", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.group.pinnedMessage.authorName);
    \u0275\u0275advance();
    \u0275\u0275classProp("gd-pinned__text--expanded", ctx_r1.pinnedExpanded());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.group.pinnedMessage.text);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.pinnedNeedsTruncation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canPin);
  }
}
function GroupChatComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "button", 31);
    \u0275\u0275listener("click", function GroupChatComponent_div_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadEarlier());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.groupsService.loadingEarlier());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.groupsService.loadingEarlier() ? "Loading\u2026" : "Load earlier messages", " ");
  }
}
function GroupChatComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1, " Be the first to say something \u{1F44B} ");
    \u0275\u0275elementEnd();
  }
}
function GroupChatComponent_div_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const msg_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(msg_r6.text);
  }
}
function GroupChatComponent_div_5_ng_container_2_app_user_avatar_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-user-avatar", 44);
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_9_0;
    const msg_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("photoURL", msg_r6.photoURL)("displayName", msg_r6.displayName)("level", (tmp_8_0 = msg_r6.level) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : 1)("isAdmin", (tmp_9_0 = msg_r6.isAdmin) !== null && tmp_9_0 !== void 0 ? tmp_9_0 : false);
  }
}
function GroupChatComponent_div_5_ng_container_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const msg_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(msg_r6.displayName);
  }
}
function GroupChatComponent_div_5_ng_container_2_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function GroupChatComponent_div_5_ng_container_2_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const msg_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r6.id ? ctx_r1.unpinMessage() : ctx_r1.confirmingPinMsg.set(msg_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 47);
    \u0275\u0275element(2, "path", 19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const msg_r6 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("gd-msg__pin-btn--visible", ctx_r1.hoveredMessageId() === msg_r6.id || (ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r6.id)("gd-msg__pin-btn--active", (ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r6.id);
    \u0275\u0275property("title", (ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r6.id ? "Unpin" : "Pin message");
  }
}
function GroupChatComponent_div_5_ng_container_2_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function GroupChatComponent_div_5_ng_container_2_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const msg_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reportMessage(msg_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "path", 50)(3, "line", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const msg_r6 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("gd-msg__report-btn--visible", ctx_r1.hoveredMessageId() === msg_r6.id)("gd-msg__report-btn--done", ctx_r1.reportedIds().has(msg_r6.id));
    \u0275\u0275property("disabled", ctx_r1.reportedIds().has(msg_r6.id));
  }
}
function GroupChatComponent_div_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, GroupChatComponent_div_5_ng_container_2_app_user_avatar_1_Template, 1, 4, "app-user-avatar", 36);
    \u0275\u0275elementStart(2, "div", 37);
    \u0275\u0275template(3, GroupChatComponent_div_5_ng_container_2_span_3_Template, 2, 1, "span", 38);
    \u0275\u0275elementStart(4, "span", 39);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 40);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 41);
    \u0275\u0275template(10, GroupChatComponent_div_5_ng_container_2_button_10_Template, 3, 5, "button", 42)(11, GroupChatComponent_div_5_ng_container_2_button_11_Template, 4, 5, "button", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const msg_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", msg_r6.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", msg_r6.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(msg_r6.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 6, msg_r6.createdAt == null ? null : msg_r6.createdAt.toDate(), "HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.canPin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.currentUser && msg_r6.uid !== ctx_r1.currentUser.id);
  }
}
function GroupChatComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275listener("mouseenter", function GroupChatComponent_div_5_Template_div_mouseenter_0_listener() {
      const msg_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!msg_r6.isSystem ? ctx_r1.hoveredMessageId.set(msg_r6.id) : null);
    })("mouseleave", function GroupChatComponent_div_5_Template_div_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.hoveredMessageId.set(null));
    });
    \u0275\u0275template(1, GroupChatComponent_div_5_ng_container_1_Template, 3, 1, "ng-container", 34)(2, GroupChatComponent_div_5_ng_container_2_Template, 12, 9, "ng-container", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const msg_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("gd-msg--own", !msg_r6.isSystem && msg_r6.uid === (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id))("gd-msg--pinned", !msg_r6.isSystem && (ctx_r1.group.pinnedMessage == null ? null : ctx_r1.group.pinnedMessage.id) === msg_r6.id)("gd-msg--system", msg_r6.isSystem);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", msg_r6.isSystem);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !msg_r6.isSystem);
  }
}
function GroupChatComponent_app_confirm_popup_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 52);
    \u0275\u0275listener("confirmed", function GroupChatComponent_app_confirm_popup_8_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.pinMessage(ctx_r1.confirmingPinMsg());
      return \u0275\u0275resetView(ctx_r1.confirmingPinMsg.set(null));
    })("cancelled", function GroupChatComponent_app_confirm_popup_8_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmingPinMsg.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("fixed", true)("danger", false);
  }
}
function GroupChatComponent_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.chatError());
  }
}
function GroupChatComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 55);
    \u0275\u0275element(2, "path", 56)(3, "path", 57)(4, "line", 58)(5, "line", 59)(6, "line", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 61)(8, "span", 62);
    \u0275\u0275text(9, "You've been muted by the group leader");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 63);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate2("You can read the chat but can't reply for ", ctx_r1.mutedMinutesLeft, " more minute", ctx_r1.mutedMinutesLeft === 1 ? "" : "s", ".");
  }
}
function GroupChatComponent_div_11_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 68);
    \u0275\u0275element(2, "circle", 69)(3, "polyline", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Chat closes in ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.countdownText());
  }
}
function GroupChatComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "span", 65);
    \u0275\u0275text(2, "\u{1F3C1} Group completed");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupChatComponent_div_11_span_3_Template, 7, 1, "span", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.countdownText());
  }
}
function GroupChatComponent_div_12_emoji_picker_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "emoji-picker", 83);
    \u0275\u0275listener("emoji-click", function GroupChatComponent_div_12_emoji_picker_13_Template_emoji_picker_emoji_click_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEmojiClick($event));
    });
    \u0275\u0275elementEnd();
  }
}
function GroupChatComponent_div_12_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.cooldownSecs(), "s");
  }
}
function GroupChatComponent_div_12_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 85);
    \u0275\u0275element(1, "line", 86)(2, "polygon", 87);
    \u0275\u0275elementEnd();
  }
}
function GroupChatComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71)(1, "div", 72)(2, "textarea", 73, 2);
    \u0275\u0275listener("ngModelChange", function GroupChatComponent_div_12_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.messageText.set($event));
    })("keydown", function GroupChatComponent_div_12_Template_textarea_keydown_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onMessageKeydown($event));
    });
    \u0275\u0275text(4, "    ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 74, 3)(7, "button", 75);
    \u0275\u0275listener("click", function GroupChatComponent_div_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEmojiPicker());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 76);
    \u0275\u0275element(9, "circle", 69)(10, "path", 77)(11, "line", 78)(12, "line", 79);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, GroupChatComponent_div_12_emoji_picker_13_Template, 1, 0, "emoji-picker", 80);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(14, "button", 81);
    \u0275\u0275listener("click", function GroupChatComponent_div_12_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendMessage());
    });
    \u0275\u0275template(15, GroupChatComponent_div_12_span_15_Template, 2, 1, "span", 82)(16, GroupChatComponent_div_12_ng_template_16_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sendIcon_r12 = \u0275\u0275reference(17);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.messageText());
    \u0275\u0275advance(5);
    \u0275\u0275classProp("gd-input__emoji--active", ctx_r1.showEmojiPicker());
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.showEmojiPicker());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.messageText().trim() || ctx_r1.sendingMessage() || ctx_r1.cooldownSecs() > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.cooldownSecs() > 0)("ngIfElse", sendIcon_r12);
  }
}
function GroupChatComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88)(1, "div", 89);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 90)(4, "span", 91);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 92);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.group.status === "cancelled" ? "\u274C" : "\u{1F512}", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.group.status === "cancelled" ? "Group was cancelled" : "Chat archived", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.group.status === "cancelled" ? "This group was cancelled. Messages are preserved for reference." : "The 24-hour post-group chat window has closed. Messages are preserved for reference.", " ");
  }
}
function GroupChatComponent_p_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 93);
    \u0275\u0275text(1, " Join the group to chat\n");
    \u0275\u0275elementEnd();
  }
}
var GroupChatComponent = class _GroupChatComponent {
  constructor() {
    this.canPin = false;
    this.isMember = false;
    this.isMuted = false;
    this.mutedMinutesLeft = 0;
    this.chatClosesAt = null;
    this.groupsService = inject(GroupsService);
    this.authService = inject(AuthService);
    this.platformId = inject(PLATFORM_ID);
    this.messageText = signal("");
    this.sendingMessage = signal(false);
    this.hoveredMessageId = signal(null);
    this.pinnedExpanded = signal(false);
    this.confirmingPinMsg = signal(null);
    this.cooldownSecs = signal(0);
    this.chatError = signal(null);
    this.chatOpen = signal(true);
    this.countdownText = signal("");
    this.showEmojiPicker = signal(false);
    this.reportedIds = signal(/* @__PURE__ */ new Set());
    this.shouldScrollToBottom = false;
    this.cooldownTimer = null;
    this.countdownTimer = null;
    this._scrollEffect = effect(() => {
      this.groupsService.messages();
      if (this.isNearBottom())
        this.shouldScrollToBottom = true;
    });
  }
  get messages() {
    return this.groupsService.allMessages();
  }
  get currentUser() {
    return this.authService.user();
  }
  get pinnedNeedsTruncation() {
    const t = this.group.pinnedMessage?.text ?? "";
    return t.length > 80 || t.includes("\n");
  }
  ngOnInit() {
    this.shouldScrollToBottom = true;
    this.initChatCountdown();
    if (isPlatformBrowser(this.platformId)) {
      import("./chunk-HUUOTPN3.js");
    }
  }
  ngOnDestroy() {
    this.clearCooldownTimer();
    this.clearCountdownTimer();
  }
  initChatCountdown() {
    if (this.chatClosesAt === null) {
      this.chatOpen.set(true);
      return;
    }
    this.tickCountdown();
    this.countdownTimer = setInterval(() => this.tickCountdown(), 1e3);
  }
  tickCountdown() {
    const remaining = (this.chatClosesAt ?? 0) - Date.now();
    if (remaining <= 0) {
      this.chatOpen.set(false);
      this.countdownText.set("");
      this.clearCountdownTimer();
      return;
    }
    this.chatOpen.set(true);
    const h = Math.floor(remaining / 36e5);
    const m = Math.floor(remaining % 36e5 / 6e4);
    const s = Math.floor(remaining % 6e4 / 1e3);
    if (h > 0) {
      this.countdownText.set(`${h}h ${m}m ${s}s`);
    } else if (m > 0) {
      this.countdownText.set(`${m}m ${s}s`);
    } else {
      this.countdownText.set(`${s}s`);
    }
  }
  clearCountdownTimer() {
    if (this.countdownTimer !== null) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }
  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: "smooth" });
      this.shouldScrollToBottom = false;
    }
  }
  isNearBottom() {
    const el = this.messagesContainer?.nativeElement;
    if (!el)
      return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  }
  sendMessage() {
    return __async(this, null, function* () {
      const text = this.messageText().trim();
      if (!text || this.sendingMessage() || this.cooldownSecs() > 0 || this.isMuted || !this.chatOpen())
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
  loadEarlier() {
    this.groupsService.loadEarlierMessages(this.groupId);
  }
  toggleEmojiPicker() {
    this.showEmojiPicker.update((v) => !v);
  }
  onEmojiClick(event) {
    const emoji = event.detail?.emoji?.unicode;
    if (!emoji)
      return;
    const el = this.textareaRef?.nativeElement;
    const text = this.messageText();
    const start = el?.selectionStart ?? text.length;
    const end = el?.selectionEnd ?? start;
    this.messageText.set(text.slice(0, start) + emoji + text.slice(end));
    setTimeout(() => {
      el?.focus();
      el?.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  }
  onDocClick(e) {
    if (!this.showEmojiPicker())
      return;
    if (!this.emojiWrap?.nativeElement.contains(e.target)) {
      this.showEmojiPicker.set(false);
    }
  }
  reportMessage(msg) {
    return __async(this, null, function* () {
      const id = msg.id;
      if (this.reportedIds().has(id))
        return;
      try {
        yield this.groupsService.reportMessage(this.groupId, this.group.title, id, msg.text);
        this.reportedIds.update((s) => /* @__PURE__ */ new Set([...s, id]));
      } catch {
      }
    });
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
  static {
    this.\u0275fac = function GroupChatComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupChatComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupChatComponent, selectors: [["app-group-chat"]], viewQuery: function GroupChatComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
        \u0275\u0275viewQuery(_c2, 5);
        \u0275\u0275viewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.messagesEnd = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.messagesContainer = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.textareaRef = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.emojiWrap = _t.first);
      }
    }, hostBindings: function GroupChatComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function GroupChatComponent_click_HostBindingHandler($event) {
          return ctx.onDocClick($event);
        }, false, \u0275\u0275resolveDocument);
      }
    }, inputs: { groupId: "groupId", group: "group", canPin: "canPin", isMember: "isMember", isMuted: "isMuted", mutedMinutesLeft: "mutedMinutesLeft", chatClosesAt: "chatClosesAt" }, decls: 15, vars: 11, consts: [["messagesContainer", ""], ["messagesEnd", ""], ["textareaRef", ""], ["emojiWrap", ""], ["sendIcon", ""], ["class", "gd-pinned", 4, "ngIf"], [1, "gd-messages"], ["class", "gd-load-earlier", 4, "ngIf"], ["class", "gd-empty-chat", 4, "ngIf"], ["class", "gd-msg", 3, "gd-msg--own", "gd-msg--pinned", "gd-msg--system", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"], ["message", "Pin this message?", "confirmLabel", "Pin", 3, "fixed", "danger", "confirmed", "cancelled", 4, "ngIf"], ["class", "gd-chat-error", 4, "ngIf"], ["class", "gd-muted-banner", 4, "ngIf"], ["class", "gd-completed-banner", 4, "ngIf"], ["class", "gd-input-row", 4, "ngIf"], ["class", "gd-archived-banner", 4, "ngIf"], ["class", "gd-join-hint", 4, "ngIf"], [1, "gd-pinned"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "currentColor", 1, "gd-pinned__icon"], ["d", "M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"], [1, "gd-pinned__body"], [1, "gd-pinned__author"], [1, "gd-pinned__text"], ["class", "gd-pinned__toggle", 3, "click", 4, "ngIf"], ["class", "gd-pinned__unpin", "title", "Unpin", 3, "click", 4, "ngIf"], [1, "gd-pinned__toggle", 3, "click"], ["title", "Unpin", 1, "gd-pinned__unpin", 3, "click"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "gd-load-earlier"], [1, "gd-load-earlier__btn", 3, "click", "disabled"], [1, "gd-empty-chat"], [1, "gd-msg", 3, "mouseenter", "mouseleave"], [4, "ngIf"], [1, "gd-msg__system-text"], ["size", "md", "shape", "circle", 3, "photoURL", "displayName", "level", "isAdmin", 4, "ngIf"], [1, "gd-msg__body"], ["class", "gd-msg__name", 4, "ngIf"], [1, "gd-msg__text"], [1, "gd-msg__time"], [1, "gd-msg__actions"], ["class", "gd-msg__pin-btn", 3, "gd-msg__pin-btn--visible", "gd-msg__pin-btn--active", "title", "click", 4, "ngIf"], ["class", "gd-msg__report-btn", "title", "Report message", 3, "gd-msg__report-btn--visible", "gd-msg__report-btn--done", "disabled", "click", 4, "ngIf"], ["size", "md", "shape", "circle", 3, "photoURL", "displayName", "level", "isAdmin"], [1, "gd-msg__name"], [1, "gd-msg__pin-btn", 3, "click", "title"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "currentColor"], ["title", "Report message", 1, "gd-msg__report-btn", 3, "click", "disabled"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"], ["x1", "4", "y1", "22", "x2", "4", "y2", "15"], ["message", "Pin this message?", "confirmLabel", "Pin", 3, "confirmed", "cancelled", "fixed", "danger"], [1, "gd-chat-error"], [1, "gd-muted-banner"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"], ["d", "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"], ["x1", "12", "y1", "19", "x2", "12", "y2", "23"], ["x1", "8", "y1", "23", "x2", "16", "y2", "23"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], [1, "gd-muted-banner__text"], [1, "gd-muted-banner__title"], [1, "gd-muted-banner__sub"], [1, "gd-completed-banner"], [1, "gd-completed-banner__title"], ["class", "gd-completed-banner__countdown", 4, "ngIf"], [1, "gd-completed-banner__countdown"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], [1, "gd-input-row"], [1, "gd-input"], ["placeholder", "Say something\u2026", "rows", "1", "maxlength", "500", 1, "gd-input__field", 3, "ngModelChange", "keydown", "ngModel"], [1, "gd-emoji-wrap"], ["type", "button", "title", "Emoji", 1, "gd-input__emoji", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M8 14s1.5 2 4 2 4-2 4-2"], ["x1", "9", "y1", "9", "x2", "9.01", "y2", "9"], ["x1", "15", "y1", "9", "x2", "15.01", "y2", "9"], ["class", "gd-emoji-picker", 3, "emoji-click", 4, "ngIf"], [1, "gd-input__send", 3, "click", "disabled"], ["class", "gd-cooldown", 4, "ngIf", "ngIfElse"], [1, "gd-emoji-picker", 3, "emoji-click"], [1, "gd-cooldown"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "22", "y1", "2", "x2", "11", "y2", "13"], ["points", "22 2 15 22 11 13 2 9 22 2"], [1, "gd-archived-banner"], [1, "gd-archived-banner__icon"], [1, "gd-archived-banner__text"], [1, "gd-archived-banner__title"], [1, "gd-archived-banner__sub"], [1, "gd-join-hint"]], template: function GroupChatComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, GroupChatComponent_div_0_Template, 10, 6, "div", 5);
        \u0275\u0275elementStart(1, "div", 6, 0);
        \u0275\u0275template(3, GroupChatComponent_div_3_Template, 3, 2, "div", 7)(4, GroupChatComponent_div_4_Template, 2, 0, "div", 8)(5, GroupChatComponent_div_5_Template, 3, 8, "div", 9);
        \u0275\u0275element(6, "div", null, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, GroupChatComponent_app_confirm_popup_8_Template, 1, 2, "app-confirm-popup", 10)(9, GroupChatComponent_p_9_Template, 2, 1, "p", 11)(10, GroupChatComponent_div_10_Template, 12, 2, "div", 12)(11, GroupChatComponent_div_11_Template, 4, 1, "div", 13)(12, GroupChatComponent_div_12_Template, 18, 7, "div", 14)(13, GroupChatComponent_div_13_Template, 8, 3, "div", 15)(14, GroupChatComponent_p_14_Template, 2, 0, "p", 16);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.group.pinnedMessage);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.groupsService.hasMoreMessages());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.messages.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.messages);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.confirmingPinMsg());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.chatError());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isMuted && ctx.chatOpen());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.group.status === "completed" && ctx.chatOpen());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isMember && !ctx.isMuted && ctx.chatOpen());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.chatOpen());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isMember && ctx.chatOpen());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, UserAvatarComponent, ConfirmPopupComponent], styles: ["\n\n[_nghost-%COMP%] {\n  flex: 1;\n  min-height: 220px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border-top: 1px solid var(--color-border);\n  margin-top: 4px;\n}\n.gd-pinned[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  padding: 8px 10px;\n  margin: 5px 5px 0px 5px;\n  background: var(--color-bg-muted);\n  border-left: 3px solid var(--color-primary);\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n  animation: _ngcontent-%COMP%_gdMenuPop 0.15s ease;\n}\n.gd-pinned__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--color-primary);\n  margin-top: 2px;\n}\n.gd-pinned__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.gd-pinned__author[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  color: var(--color-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.gd-pinned__text[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-secondary);\n  line-height: 1.4;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.gd-pinned__text--expanded[_ngcontent-%COMP%] {\n  display: block;\n  overflow: visible;\n  -webkit-line-clamp: unset;\n}\n.gd-pinned__toggle[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  margin-top: 3px;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-primary);\n  cursor: pointer;\n  text-align: left;\n}\n.gd-pinned__toggle[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.gd-pinned__unpin[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  background: none;\n  border: none;\n  color: var(--color-text-light);\n  cursor: pointer;\n  padding: 2px;\n  border-radius: var(--radius-sm);\n  display: flex;\n  align-items: center;\n  transition: color var(--transition);\n}\n.gd-pinned__unpin[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.gd-messages[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  overflow-y: auto;\n  padding: 10px 10px 0;\n}\n.gd-load-earlier[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 4px 0 6px;\n}\n.gd-load-earlier__btn[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-primary);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: var(--radius-sm);\n  transition: opacity var(--transition);\n}\n.gd-load-earlier__btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.75;\n}\n.gd-load-earlier__btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.gd-empty-chat[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  text-align: center;\n  padding: 20px 0;\n}\n.gd-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 7px;\n  max-width: 80%;\n}\n.gd-msg--own[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  flex-direction: row-reverse;\n}\n.gd-msg__body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.gd-msg__name[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.gd-msg__text[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  border-radius: 14px;\n  padding: 8px 12px;\n  font-size: 13.5px;\n  color: var(--color-text-base);\n  line-height: 1.45;\n  word-break: break-word;\n}\n.gd-msg--own[_ngcontent-%COMP%]   .gd-msg__text[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n}\n.gd-msg__time[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--color-text-light);\n  text-align: right;\n}\n.gd-msg--pinned[_ngcontent-%COMP%]   .gd-msg__text[_ngcontent-%COMP%] {\n  outline: 1.5px solid var(--color-primary);\n  outline-offset: 2px;\n  border-radius: 14px;\n}\n.gd-msg--system[_ngcontent-%COMP%] {\n  justify-content: center;\n  max-width: 100%;\n  padding: 2px 0;\n}\n.gd-msg__system-text[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-light);\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-lg);\n  padding: 4px 12px;\n  text-align: center;\n}\n.gd-msg__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-self: center;\n  gap: 2px;\n  flex-shrink: 0;\n}\n.gd-msg__pin-btn[_ngcontent-%COMP%], \n.gd-msg__report-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: var(--radius-sm);\n  display: flex;\n  align-items: center;\n  opacity: 0;\n  transition: opacity var(--transition), color var(--transition);\n}\n@media (max-width: 768px) {\n  .gd-msg__pin-btn[_ngcontent-%COMP%], \n   .gd-msg__report-btn[_ngcontent-%COMP%] {\n    opacity: 1;\n  }\n}\n.gd-msg__pin-btn[_ngcontent-%COMP%] {\n  color: var(--color-text-light);\n}\n.gd-msg__pin-btn--visible[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.gd-msg__pin-btn--active[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  opacity: 1;\n}\n.gd-msg__pin-btn[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.gd-msg__report-btn[_ngcontent-%COMP%] {\n  color: var(--color-text-light);\n}\n.gd-msg__report-btn--visible[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.gd-msg__report-btn--done[_ngcontent-%COMP%] {\n  opacity: 1;\n  color: #ef4444;\n  cursor: default;\n}\n.gd-msg__report-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  color: #ef4444;\n}\n.gd-input-row[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: flex-end;\n  gap: 6px;\n  margin-inline: 5px;\n  margin-bottom: 5px;\n}\n.gd-input[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: flex-end;\n  gap: 6px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 4px 4px 4px 10px;\n  min-height: 38px;\n  box-sizing: border-box;\n  position: relative;\n}\n.gd-emoji-wrap[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  position: relative;\n  display: flex;\n  align-items: flex-end;\n}\n.gd-input__emoji[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 5px;\n  margin-right: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--color-text-light);\n  border-radius: var(--radius-sm);\n  transition: color var(--transition);\n  height: 30px;\n  width: 30px;\n}\n.gd-input__emoji[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-muted);\n}\n.gd-input__emoji--active[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.gd-emoji-picker[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  right: 0;\n  z-index: 100;\n  box-shadow: var(--shadow-md);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_gdMenuPop 0.15s ease;\n  --background: var(--color-bg);\n  --border-color: var(--color-border);\n  --border-size: 1px;\n  --button-active-background: var(--color-bg-hover);\n  --button-hover-background: var(--color-bg-muted);\n  --indicator-color: var(--color-primary);\n  --input-border-color: var(--color-border);\n  --input-font-color: var(--color-text-base);\n  --input-placeholder-color: var(--color-text-light);\n  --outline-color: var(--color-primary);\n  --category-emoji-size: 1.1rem;\n  --emoji-size: 1.4rem;\n  --num-columns: 8;\n}\n@media (max-width: 420px) {\n  .gd-emoji-picker[_ngcontent-%COMP%] {\n    right: -30px;\n  }\n}\n.gd-input__field[_ngcontent-%COMP%] {\n  flex: 1;\n  background: none;\n  border: none;\n  outline: none;\n  resize: none;\n  font-size: 16px;\n  color: var(--color-text-base);\n  font-family: inherit;\n  line-height: 1.3;\n  max-height: 72px;\n  overflow-y: auto;\n  padding: 4px 0;\n}\n.gd-input__send[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  width: 38px;\n  height: 38px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: opacity var(--transition);\n}\n.gd-input__send[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-input__send[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.gd-muted-banner[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: var(--color-warning-bg);\n  border: 1px solid var(--color-warning-border);\n  border-radius: var(--radius-lg);\n  padding: 12px 14px;\n  margin-bottom: 8px;\n  color: var(--color-warning);\n}\n.gd-muted-banner[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.gd-muted-banner__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.gd-muted-banner__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n}\n.gd-muted-banner__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 400;\n  opacity: 0.85;\n}\n.gd-chat-error[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  text-align: center;\n  margin: 4px 0 6px;\n}\n.gd-cooldown[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  line-height: 1;\n}\n.gd-join-hint[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  text-align: center;\n  margin: 8px 0 0;\n}\n.gd-completed-banner[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  background: var(--color-success-bg);\n  border: 1px solid var(--color-success-border);\n  border-radius: var(--radius-md);\n  padding: 7px 10px;\n  margin: 0 5px 4px;\n}\n.gd-completed-banner__title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-success);\n  white-space: nowrap;\n}\n.gd-completed-banner__countdown[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11.5px;\n  color: var(--color-success);\n  opacity: 0.8;\n  white-space: nowrap;\n}\n.gd-completed-banner__countdown[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n  font-weight: 700;\n}\n.gd-archived-banner[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: var(--color-bg-muted);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 14px;\n  margin: 0 5px 8px;\n}\n.gd-archived-banner__icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n  line-height: 1.2;\n}\n.gd-archived-banner__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.gd-archived-banner__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.gd-archived-banner__sub[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n  line-height: 1.4;\n}\n@keyframes _ngcontent-%COMP%_gdMenuPop {\n  from {\n    opacity: 0;\n    transform: translateY(-4px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n/*# sourceMappingURL=group-chat.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupChatComponent, { className: "GroupChatComponent", filePath: "src/app/features/groups/group-detail/group-chat/group-chat.component.ts", lineNumber: 22 });
})();

// src/app/features/groups/group-detail/group-members-modal/group-members-modal.component.ts
function GroupMembersModalComponent_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function GroupMembersModalComponent_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.bulkSelectMode() ? ctx_r1.exitBulkMode() : ctx_r1.bulkSelectMode.set(true));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("gd-bulk-select-btn--active", ctx_r1.bulkSelectMode());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.bulkSelectMode() ? "Cancel" : "Select", " ");
  }
}
function GroupMembersModalComponent_div_11_div_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 28);
    \u0275\u0275element(1, "polyline", 29);
    \u0275\u0275elementEnd();
  }
}
function GroupMembersModalComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275template(1, GroupMembersModalComponent_div_11_div_1__svg_svg_1_Template, 2, 0, "svg", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("gd-member__checkbox--checked", ctx_r1.isBulkSelected(m_r4.uid));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isBulkSelected(m_r4.uid));
  }
}
function GroupMembersModalComponent_div_11_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "leader");
    \u0275\u0275elementEnd();
  }
}
function GroupMembersModalComponent_div_11_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "muted");
    \u0275\u0275elementEnd();
  }
}
function GroupMembersModalComponent_div_11_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F4DE} ", m_r4.contactPhone, " ");
  }
}
function GroupMembersModalComponent_div_11_div_11_div_6_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function GroupMembersModalComponent_div_11_div_11_div_6_button_1_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const m_r4 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pickMemberAction("make-leader", m_r4, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 43);
    \u0275\u0275element(2, "polygon", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Make leader ");
    \u0275\u0275elementEnd();
  }
}
function GroupMembersModalComponent_div_11_div_11_div_6__svg_line_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 51);
  }
}
function GroupMembersModalComponent_div_11_div_11_div_6_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function GroupMembersModalComponent_div_11_div_11_div_6_button_10_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const m_r4 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pickMemberAction("remove", m_r4, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 43);
    \u0275\u0275element(2, "polyline", 53)(3, "path", 54)(4, "path", 55)(5, "path", 56)(6, "path", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Remove ");
    \u0275\u0275elementEnd();
  }
}
function GroupMembersModalComponent_div_11_div_11_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275listener("click", function GroupMembersModalComponent_div_11_div_11_div_6_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(1, GroupMembersModalComponent_div_11_div_11_div_6_button_1_Template, 4, 0, "button", 41);
    \u0275\u0275elementStart(2, "button", 42);
    \u0275\u0275listener("click", function GroupMembersModalComponent_div_11_div_11_div_6_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const m_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pickMemberAction(ctx_r1.isMemberMuted(m_r4) ? "unmute" : "mute", m_r4, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 43);
    \u0275\u0275element(4, "path", 44)(5, "path", 45)(6, "line", 46)(7, "line", 47);
    \u0275\u0275template(8, GroupMembersModalComponent_div_11_div_11_div_6__svg_line_8_Template, 1, 0, "line", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, GroupMembersModalComponent_div_11_div_11_div_6_button_10_Template, 8, 0, "button", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r4.role !== "leader");
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.isMemberMuted(m_r4));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isMemberMuted(m_r4) ? "Unmute" : "Mute 1h", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r4.role !== "leader");
  }
}
function GroupMembersModalComponent_div_11_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "button", 34);
    \u0275\u0275listener("click", function GroupMembersModalComponent_div_11_div_11_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const m_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleMemberMenu(m_r4.uid, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 35);
    \u0275\u0275element(3, "circle", 36)(4, "circle", 37)(5, "circle", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, GroupMembersModalComponent_div_11_div_11_div_6_Template, 11, 4, "div", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("gd-member__menu-btn--open", ctx_r1.memberActionMenu() === m_r4.uid);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.memberActionMenu() === m_r4.uid);
  }
}
function GroupMembersModalComponent_div_11__svg_svg_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 58);
    \u0275\u0275element(1, "polyline", 59);
    \u0275\u0275elementEnd();
  }
}
function GroupMembersModalComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275listener("click", function GroupMembersModalComponent_div_11_Template_div_click_0_listener() {
      const m_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.bulkSelectMode() && m_r4.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id) && m_r4.uid !== ctx_r1.group.leaderId ? ctx_r1.toggleBulkSelect(m_r4.uid) : null);
    });
    \u0275\u0275template(1, GroupMembersModalComponent_div_11_div_1_Template, 2, 3, "div", 16);
    \u0275\u0275element(2, "app-user-avatar", 17);
    \u0275\u0275elementStart(3, "div", 18)(4, "span", 19);
    \u0275\u0275text(5);
    \u0275\u0275template(6, GroupMembersModalComponent_div_11_span_6_Template, 2, 0, "span", 20)(7, GroupMembersModalComponent_div_11_span_7_Template, 2, 0, "span", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 22);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, GroupMembersModalComponent_div_11_span_10_Template, 2, 1, "span", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, GroupMembersModalComponent_div_11_div_11_Template, 7, 3, "div", 24)(12, GroupMembersModalComponent_div_11__svg_svg_12_Template, 2, 0, "svg", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("gd-member--selectable", ctx_r1.bulkSelectMode() && m_r4.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id) && m_r4.uid !== ctx_r1.group.leaderId)("gd-member--selected", ctx_r1.isBulkSelected(m_r4.uid));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.bulkSelectMode() && m_r4.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id) && m_r4.uid !== ctx_r1.group.leaderId);
    \u0275\u0275advance();
    \u0275\u0275property("photoURL", m_r4.photoURL)("displayName", m_r4.displayName)("level", m_r4.uid === (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id) ? ctx_r1.userDataService.levelInfo().id : m_r4.level)("isAdmin", m_r4.uid === (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id) ? ctx_r1.userDataService.isAdmin() : m_r4.isAdmin)("roleLabel", ctx_r1.memberRoleLabel(m_r4))("activeLabel", ctx_r1.formatLastActive(m_r4.lastActive));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", m_r4.displayName, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r4.role === "leader");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isMemberMuted(m_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatLastActive(m_r4.lastActive));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canManageMembers && m_r4.contactPhone);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canManageMembers && m_r4.uid !== (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id) && !ctx_r1.bulkSelectMode());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (!ctx_r1.canManageMembers || m_r4.uid === (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.id)) && !ctx_r1.bulkSelectMode());
  }
}
function GroupMembersModalComponent_div_12_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function GroupMembersModalComponent_div_12_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectAllMembers());
    });
    \u0275\u0275text(1, "Select all");
    \u0275\u0275elementEnd();
  }
}
function GroupMembersModalComponent_div_12_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function GroupMembersModalComponent_div_12_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmingBulkAction.set("mute"));
    });
    \u0275\u0275text(1, "Mute 1h");
    \u0275\u0275elementEnd();
  }
}
function GroupMembersModalComponent_div_12_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function GroupMembersModalComponent_div_12_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmingBulkAction.set("remove"));
    });
    \u0275\u0275text(1, "Remove");
    \u0275\u0275elementEnd();
  }
}
function GroupMembersModalComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60)(1, "span", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupMembersModalComponent_div_12_button_3_Template, 2, 0, "button", 62)(4, GroupMembersModalComponent_div_12_button_4_Template, 2, 0, "button", 63)(5, GroupMembersModalComponent_div_12_button_5_Template, 2, 0, "button", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
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
function GroupMembersModalComponent_app_confirm_popup_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 68);
    \u0275\u0275listener("confirmed", function GroupMembersModalComponent_app_confirm_popup_13_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.executeMemberAction());
    })("cancelled", function GroupMembersModalComponent_app_confirm_popup_13_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmingMemberAction.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("fixed", true)("message", ctx_r1.confirmingMemberAction().action === "make-leader" ? "Make " + ctx_r1.confirmingMemberAction().member.displayName + " the new leader? You'll become a regular member." : "Unmute " + ctx_r1.confirmingMemberAction().member.displayName + "?")("confirmLabel", ctx_r1.confirmingMemberAction().action === "make-leader" ? "Transfer" : "Unmute")("danger", false);
  }
}
function GroupMembersModalComponent_app_confirm_popup_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 68);
    \u0275\u0275listener("confirmed", function GroupMembersModalComponent_app_confirm_popup_14_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.executeBulkAction());
    })("cancelled", function GroupMembersModalComponent_app_confirm_popup_14_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmingBulkAction.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("fixed", true)("message", ctx_r1.confirmingBulkAction() === "remove" ? "Remove " + ctx_r1.bulkCount() + " member" + (ctx_r1.bulkCount() === 1 ? "" : "s") + " from this group?" : "Mute " + ctx_r1.bulkCount() + " member" + (ctx_r1.bulkCount() === 1 ? "" : "s") + " for 1 hour?")("confirmLabel", ctx_r1.confirmingBulkAction() === "remove" ? "Remove all" : "Mute all")("danger", ctx_r1.confirmingBulkAction() === "remove");
  }
}
function GroupMembersModalComponent_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.actionError());
  }
}
var GroupMembersModalComponent = class _GroupMembersModalComponent {
  constructor() {
    this.canManageMembers = false;
    this.currentUser = null;
    this.closeRequested = new EventEmitter();
    this.groupsService = inject(GroupsService);
    this.userDataService = inject(UserDataService);
    this.memberActionMenu = signal(null);
    this.confirmingMemberAction = signal(null);
    this.bulkSelectMode = signal(false);
    this.bulkSelectedUids = signal(/* @__PURE__ */ new Set());
    this.bulkCount = computed(() => this.bulkSelectedUids().size);
    this.confirmingBulkAction = signal(null);
    this.actionBusy = signal(false);
    this.actionError = signal(null);
  }
  get bulkEligibleMembers() {
    return this.members.filter((m) => m.uid !== this.group?.leaderId && m.uid !== this.currentUser?.id);
  }
  ngOnInit() {
    this.actionError.set(null);
  }
  onClose() {
    this.exitBulkMode();
    this.closeRequested.emit();
  }
  closeMemberMenu() {
    if (this.memberActionMenu())
      this.memberActionMenu.set(null);
  }
  isMemberMuted(m) {
    return !!m.mutedUntil && m.mutedUntil.toMillis() > Date.now();
  }
  memberRoleLabel(m) {
    return m.role === GroupRole.Leader ? "\u{1F451} Group leader" : "Member";
  }
  formatLastActive(ts) {
    if (!ts)
      return "";
    return GroupsService.formatLastActive(ts);
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
  static {
    this.\u0275fac = function GroupMembersModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupMembersModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupMembersModalComponent, selectors: [["app-group-members-modal"]], hostBindings: function GroupMembersModalComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function GroupMembersModalComponent_click_HostBindingHandler() {
          return ctx.closeMemberMenu();
        }, false, \u0275\u0275resolveDocument);
      }
    }, inputs: { groupId: "groupId", group: "group", members: "members", canManageMembers: "canManageMembers", currentUser: "currentUser" }, outputs: { closeRequested: "closeRequested" }, decls: 16, vars: 9, consts: [[3, "closeRequested", "showClose"], [1, "gd-members-modal"], [1, "gd-members-header"], [1, "gd-section-label", 2, "margin-bottom", "0"], [1, "gd-members-header__actions"], ["class", "gd-bulk-select-btn", 3, "gd-bulk-select-btn--active", "click", 4, "ngIf"], ["aria-label", "Close", 1, "gd-members-close", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], ["class", "gd-member", 3, "gd-member--selectable", "gd-member--selected", "click", 4, "ngFor", "ngForOf"], ["class", "gd-bulk-bar", 4, "ngIf"], ["cancelLabel", "Cancel", 3, "fixed", "message", "confirmLabel", "danger", "confirmed", "cancelled", 4, "ngIf"], ["class", "gd-member-action-error", 4, "ngIf"], [1, "gd-bulk-select-btn", 3, "click"], [1, "gd-member", 3, "click"], ["class", "gd-member__checkbox", 3, "gd-member__checkbox--checked", 4, "ngIf"], ["size", "md", "shape", "circle", 3, "photoURL", "displayName", "level", "isAdmin", "roleLabel", "activeLabel"], [1, "gd-member__info"], [1, "gd-member__name"], ["class", "gd-member__badge gd-member__badge--leader", 4, "ngIf"], ["class", "gd-member__badge gd-member__badge--muted", 4, "ngIf"], [1, "gd-member__active"], ["class", "gd-member__phone", 4, "ngIf"], ["class", "gd-member__menu-wrap", 4, "ngIf"], ["class", "gd-member__chevron", "width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", 4, "ngIf"], [1, "gd-member__checkbox"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], [1, "gd-member__badge", "gd-member__badge--leader"], [1, "gd-member__badge", "gd-member__badge--muted"], [1, "gd-member__phone"], [1, "gd-member__menu-wrap"], ["title", "Member actions", 1, "gd-member__menu-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "currentColor"], ["cx", "12", "cy", "5", "r", "1.5"], ["cx", "12", "cy", "12", "r", "1.5"], ["cx", "12", "cy", "19", "r", "1.5"], ["class", "gd-member__menu", 3, "click", 4, "ngIf"], [1, "gd-member__menu", 3, "click"], ["class", "gd-member__menu-item", 3, "click", 4, "ngIf"], [1, "gd-member__menu-item", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"], ["d", "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"], ["x1", "12", "y1", "19", "x2", "12", "y2", "23"], ["x1", "8", "y1", "23", "x2", "16", "y2", "23"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23", 4, "ngIf"], ["class", "gd-member__menu-item gd-member__menu-item--danger", 3, "click", 4, "ngIf"], ["points", "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], [1, "gd-member__menu-item", "gd-member__menu-item--danger", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v6"], ["d", "M14 11v6"], ["d", "M9 6V4h6v2"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", 1, "gd-member__chevron"], ["points", "9 18 15 12 9 6"], [1, "gd-bulk-bar"], [1, "gd-bulk-bar__count"], ["class", "gd-bulk-bar__select-all", 3, "click", 4, "ngIf"], ["class", "gd-bulk-bar__btn", 3, "click", 4, "ngIf"], ["class", "gd-bulk-bar__btn gd-bulk-bar__btn--danger", 3, "click", 4, "ngIf"], [1, "gd-bulk-bar__select-all", 3, "click"], [1, "gd-bulk-bar__btn", 3, "click"], [1, "gd-bulk-bar__btn", "gd-bulk-bar__btn--danger", 3, "click"], ["cancelLabel", "Cancel", 3, "confirmed", "cancelled", "fixed", "message", "confirmLabel", "danger"], [1, "gd-member-action-error"]], template: function GroupMembersModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-modal", 0);
        \u0275\u0275listener("closeRequested", function GroupMembersModalComponent_Template_app_modal_closeRequested_0_listener() {
          return ctx.onClose();
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 4);
        \u0275\u0275template(6, GroupMembersModalComponent_button_6_Template, 2, 3, "button", 5);
        \u0275\u0275elementStart(7, "button", 6);
        \u0275\u0275listener("click", function GroupMembersModalComponent_Template_button_click_7_listener() {
          return ctx.onClose();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 7);
        \u0275\u0275element(9, "line", 8)(10, "line", 9);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(11, GroupMembersModalComponent_div_11_Template, 13, 18, "div", 10)(12, GroupMembersModalComponent_div_12_Template, 6, 4, "div", 11)(13, GroupMembersModalComponent_app_confirm_popup_13_Template, 1, 4, "app-confirm-popup", 12)(14, GroupMembersModalComponent_app_confirm_popup_14_Template, 1, 4, "app-confirm-popup", 12)(15, GroupMembersModalComponent_p_15_Template, 2, 1, "p", 13);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275property("showClose", false);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate2("", ctx.members.length, " member", ctx.members.length === 1 ? "" : "s", "");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.canManageMembers && ctx.bulkEligibleMembers.length >= 1);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.members);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.bulkSelectMode());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.confirmingMemberAction());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.confirmingBulkAction());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.actionError());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, AppModalComponent, UserAvatarComponent, ConfirmPopupComponent], styles: ["\n\n.gd-members-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding-top: 4px;\n}\n.gd-section-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 10px;\n}\n.gd-members-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.gd-members-header__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.gd-bulk-select-btn[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: transparent;\n  color: var(--color-text-muted);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    color var(--transition),\n    border-color var(--transition);\n}\n.gd-bulk-select-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n}\n.gd-bulk-select-btn--active[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  border-color: var(--color-text-light);\n}\n.gd-members-close[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-bg-muted);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  width: 28px;\n  height: 28px;\n  cursor: pointer;\n  color: var(--color-text-muted);\n  transition: background var(--transition), color var(--transition);\n}\n.gd-members-close[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n  color: var(--color-text-secondary);\n}\n.gd-member[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.gd-member--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border-radius: var(--radius-lg);\n  padding: 4px 6px;\n  margin: 0 -6px;\n  transition: background var(--transition);\n}\n.gd-member--clickable[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-member--selectable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border-radius: var(--radius-lg);\n  padding: 6px 8px;\n  margin: 0 -8px;\n  transition: background var(--transition);\n}\n.gd-member--selectable[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-member--selected[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n}\n.gd-member--selected[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.gd-member__checkbox[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--radius-sm);\n  border: 2px solid var(--color-border);\n  background: var(--color-bg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: border-color var(--transition), background var(--transition);\n}\n.gd-member__checkbox--checked[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: #fff;\n}\n.gd-member__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.gd-member__name[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.gd-member__badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  padding: 1px 7px;\n  border-radius: 20px;\n  text-transform: capitalize;\n}\n.gd-member__badge--leader[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg-hover);\n  color: var(--color-warning);\n}\n.gd-member__badge--muted[_ngcontent-%COMP%] {\n  background: var(--color-danger-bg-hover);\n  color: var(--color-danger-dark);\n}\n.gd-member__active[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-muted);\n}\n.gd-member__phone[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--color-text-secondary);\n  font-weight: 500;\n}\n.gd-member__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  flex-shrink: 0;\n  color: var(--color-text-light);\n}\n.gd-member__menu-wrap[_ngcontent-%COMP%] {\n  margin-left: auto;\n  position: relative;\n  flex-shrink: 0;\n}\n.gd-member__menu-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: var(--radius-md);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--color-text-light);\n  transition: background var(--transition), color var(--transition);\n}\n.gd-member__menu-btn[_ngcontent-%COMP%]:hover, \n.gd-member__menu-btn--open[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n}\n.gd-member__menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 4px);\n  right: 0;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-md);\n  min-width: 148px;\n  z-index: 60;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_gdMenuPop 0.12s ease;\n}\n.gd-member__menu-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 9px 12px;\n  border: none;\n  background: transparent;\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  text-align: left;\n  transition: background var(--transition);\n}\n.gd-member__menu-item[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-member__menu-item--danger[_ngcontent-%COMP%] {\n  color: var(--color-danger);\n}\n.gd-member__menu-item--danger[_ngcontent-%COMP%]:hover {\n  background: var(--color-danger-bg-hover);\n}\n.gd-bulk-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  padding: 10px 12px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  margin-top: 4px;\n  animation: _ngcontent-%COMP%_gdMenuPop 0.14s ease;\n}\n.gd-bulk-bar__count[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  flex: 1;\n  min-width: 80px;\n}\n.gd-bulk-bar__select-all[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n.gd-bulk-bar__select-all[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.gd-bulk-bar__btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n  font-size: 12.5px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition:\n    background var(--transition),\n    border-color var(--transition),\n    color var(--transition);\n}\n.gd-bulk-bar__btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-bulk-bar__btn--danger[_ngcontent-%COMP%] {\n  color: var(--color-danger);\n  border-color: var(--color-danger-border);\n  background: var(--color-danger-bg);\n}\n.gd-bulk-bar__btn--danger[_ngcontent-%COMP%]:hover {\n  background: var(--color-danger-bg-hover);\n  border-color: var(--color-danger-border);\n}\n.gd-member-action-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-danger);\n  margin: 0;\n  text-align: center;\n}\n@keyframes _ngcontent-%COMP%_gdMenuPop {\n  from {\n    opacity: 0;\n    transform: translateY(-4px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n/*# sourceMappingURL=group-members-modal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupMembersModalComponent, { className: "GroupMembersModalComponent", filePath: "src/app/features/groups/group-detail/group-members-modal/group-members-modal.component.ts", lineNumber: 21 });
})();

// src/app/features/groups/group-detail/group-edit-form/group-edit-form.component.ts
function GroupEditFormComponent_ul_19_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 34);
    \u0275\u0275listener("click", function GroupEditFormComponent_ul_19_li_1_Template_li_click_0_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectSpot(s_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r2.title);
  }
}
function GroupEditFormComponent_ul_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 32);
    \u0275\u0275template(1, GroupEditFormComponent_ul_19_li_1_Template, 2, 1, "li", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.editSpotResults());
  }
}
function GroupEditFormComponent_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 36);
    \u0275\u0275element(2, "polyline", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.editSpotTitle, " ");
  }
}
function GroupEditFormComponent_span_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, "\u{1F512} Guide or admin only");
    \u0275\u0275elementEnd();
  }
}
function GroupEditFormComponent_div_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "span", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 41);
    \u0275\u0275element(3, "path", 42)(4, "circle", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Is this the right spot? ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 44)(7, "button", 45);
    \u0275\u0275listener("click", function GroupEditFormComponent_div_67_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.retryPoint());
    });
    \u0275\u0275text(8, "Try again");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 46);
    \u0275\u0275listener("click", function GroupEditFormComponent_div_67_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmPendingPoint());
    });
    \u0275\u0275text(10, "Confirm");
    \u0275\u0275elementEnd()()();
  }
}
function GroupEditFormComponent_div_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "button", 48);
    \u0275\u0275listener("click", function GroupEditFormComponent_div_68_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startPickingPoint());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 41);
    \u0275\u0275element(3, "path", 42)(4, "circle", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Pin on map ");
    \u0275\u0275elementEnd()();
  }
}
function GroupEditFormComponent_div_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 41);
    \u0275\u0275element(2, "polyline", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Meeting point set ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "button", 50);
    \u0275\u0275listener("click", function GroupEditFormComponent_div_69_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearMeetingPoint());
    });
    \u0275\u0275text(5, "Remove");
    \u0275\u0275elementEnd()();
  }
}
function GroupEditFormComponent_p_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editError());
  }
}
var GroupEditFormComponent = class _GroupEditFormComponent {
  constructor() {
    this.saved = new EventEmitter();
    this.cancelled = new EventEmitter();
    this.bridge = inject(MapBridgeService);
    this.groupsService = inject(GroupsService);
    this.userDataService = inject(UserDataService);
    this.destroyRef = inject(DestroyRef);
    this.canSetPrice = computed(() => this.userDataService.canSetPrice());
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
    this.editPrice = "";
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
  }
  ngOnInit() {
    const g = this.group;
    const d = g.date.toDate();
    this.editTitle = g.title;
    this.editDate = d.toISOString().split("T")[0];
    this.editTime = g.time;
    this.editDescription = g.description;
    this.editDifficulty = g.difficulty;
    this.editMaxMembers = g.maxMembers != null ? String(g.maxMembers) : "";
    this.editPrice = g.price != null ? String(g.price) : "";
    this.editMeetingPoint = g.meetingPoint ?? null;
    this.editSpotSlug = g.spotSlug ?? "";
    this.editSpotTitle = g.spotTitle ?? "";
    this.editSpotLat = g.spotLat ?? 0;
    this.editSpotLon = g.spotLon ?? 0;
    this.editSpotSearch = g.spotTitle ?? "";
    this.editSpotResults.set([]);
    this.editError.set(null);
    if (this.editMeetingPoint) {
      this.bridge.meetingPointMarker.set(this.editMeetingPoint);
    }
    this.bridge.coordPicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ lat, lon }) => {
      this.editPendingMeetingPoint.set({ lat, lon });
      this.bridge.meetingPointMarker.set({ lat, lon });
      this.bridge.pickMode.set(false);
      this.editPickingPoint.set(false);
      this.bridge.panel.expand();
    });
  }
  ngOnDestroy() {
    if (this.editPickingPoint()) {
      this.bridge.pickMode.set(false);
      this.bridge.panel.expand();
    }
  }
  cancel() {
    if (this.editPickingPoint())
      this.bridge.panel.expand();
    this.bridge.pickMode.set(false);
    this.editPickingPoint.set(false);
    this.cancelled.emit();
  }
  submit() {
    return __async(this, null, function* () {
      if (!this.editTitle.trim() || !this.editDate) {
        this.editError.set("Title and date are required.");
        return;
      }
      const dateObj = /* @__PURE__ */ new Date(this.editDate + "T" + this.editTime);
      if (isNaN(dateObj.getTime())) {
        this.editError.set("Invalid date or time.");
        return;
      }
      const priceVal = this.canSetPrice() && this.editPrice ? parseFloat(this.editPrice) : null;
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
        price: priceVal !== null && !isNaN(priceVal) && priceVal > 0 ? priceVal : null,
        meetingPoint: this.editMeetingPoint
      };
      this.editError.set(null);
      this.editBusy.set(true);
      try {
        yield this.groupsService.updateGroup(this.groupId, payload);
        this.bridge.pickMode.set(false);
        this.editPickingPoint.set(false);
        this.saved.emit(this.editSpotSlug || null);
      } catch (e) {
        this.editError.set(e instanceof Error ? e.message : "Could not save changes.");
      } finally {
        this.editBusy.set(false);
      }
    });
  }
  startPickingPoint() {
    this.editPickingPoint.set(true);
    this.bridge.pickMode.set(true);
    this.bridge.panel.minimize();
  }
  clearMeetingPoint() {
    if (this.editPickingPoint())
      this.bridge.panel.expand();
    this.editMeetingPoint = null;
    this.editPendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(null);
    this.editPickingPoint.set(false);
    this.bridge.pickMode.set(false);
  }
  confirmPendingPoint() {
    const p = this.editPendingMeetingPoint();
    if (!p)
      return;
    this.editMeetingPoint = p;
    this.editPendingMeetingPoint.set(null);
  }
  retryPoint() {
    this.editPendingMeetingPoint.set(null);
    this.bridge.meetingPointMarker.set(this.editMeetingPoint);
    this.startPickingPoint();
  }
  onSpotInput() {
    const q = normalizeForSearch(this.editSpotSearch.trim());
    if (!q) {
      this.editSpotResults.set([]);
      return;
    }
    this.editSpotResults.set(this.allSpots.filter((s) => normalizeForSearch(s.title).includes(q)).slice(0, 6));
  }
  selectSpot(spot) {
    this.editSpotSlug = spot.slug;
    this.editSpotTitle = spot.title;
    this.editSpotLat = spot.lat;
    this.editSpotLon = spot.lon;
    this.editSpotSearch = spot.title;
    this.editSpotResults.set([]);
  }
  static {
    this.\u0275fac = function GroupEditFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupEditFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupEditFormComponent, selectors: [["app-group-edit-form"]], inputs: { group: "group", groupId: "groupId" }, outputs: { saved: "saved", cancelled: "cancelled" }, decls: 76, vars: 23, consts: [[1, "gd-edit-form"], [1, "gd-edit-form__header"], [1, "gd-edit-form__title"], ["aria-label", "Cancel", 1, "gd-edit-form__close", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "gd-edit-form__field"], ["type", "text", "placeholder", "Group title", "maxlength", "80", 3, "ngModelChange", "ngModel"], [1, "gd-edit-form__opt"], [1, "gd-edit-form__spot-wrap"], ["type", "text", "placeholder", "Search a location\u2026", "autocomplete", "off", 3, "ngModelChange", "input", "ngModel"], ["class", "gd-edit-form__spot-results", 4, "ngIf"], ["class", "gd-edit-form__spot-selected", 4, "ngIf"], [1, "gd-edit-form__row"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "time", 3, "ngModelChange", "ngModel"], [1, "gd-edit-form__chips"], [1, "chip", 3, "click"], ["rows", "3", "maxlength", "400", "placeholder", "What's the plan? Anything to know beforehand?", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "2", "max", "50", "placeholder", "Unlimited", 3, "ngModelChange", "ngModel"], ["class", "gd-edit-form__lock-hint", 4, "ngIf"], [1, "gd-price-wrap"], [1, "gd-price-euro"], ["type", "number", "min", "0", "step", "0.01", "placeholder", "Free", 3, "ngModelChange", "ngModel", "disabled"], ["class", "gd-meeting-confirm", 4, "ngIf"], ["class", "gd-meeting-pick", 4, "ngIf"], ["class", "gd-meeting-set", 4, "ngIf"], ["class", "gd-edit-form__error", 4, "ngIf"], [1, "gd-edit-form__actions"], [1, "gd-edit-form__cancel", 3, "click"], [1, "gd-edit-form__submit", 3, "click", "disabled"], [1, "gd-edit-form__spot-results"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "gd-edit-form__spot-selected"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], [1, "gd-edit-form__lock-hint"], [1, "gd-meeting-confirm"], [1, "gd-meeting-confirm__msg"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "gd-meeting-confirm__actions"], [1, "gd-meeting-confirm__retry", 3, "click"], [1, "gd-meeting-confirm__ok", 3, "click"], [1, "gd-meeting-pick"], [1, "gd-meeting-pick__btn", 3, "click"], [1, "gd-meeting-set"], [1, "gd-meeting-set__remove", 3, "click"], [1, "gd-edit-form__error"]], template: function GroupEditFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
        \u0275\u0275text(3, "Edit group");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function GroupEditFormComponent_Template_button_click_4_listener() {
          return ctx.cancel();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(5, "svg", 4);
        \u0275\u0275element(6, "line", 5)(7, "line", 6);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(8, "div", 7)(9, "label");
        \u0275\u0275text(10, "Title");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function GroupEditFormComponent_Template_input_ngModelChange_11_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.editTitle, $event) || (ctx.editTitle = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 7)(13, "label");
        \u0275\u0275text(14, "Location ");
        \u0275\u0275elementStart(15, "span", 9);
        \u0275\u0275text(16, "(optional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 10)(18, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function GroupEditFormComponent_Template_input_ngModelChange_18_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.editSpotSearch, $event) || (ctx.editSpotSearch = $event);
          return $event;
        });
        \u0275\u0275listener("input", function GroupEditFormComponent_Template_input_input_18_listener() {
          return ctx.onSpotInput();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(19, GroupEditFormComponent_ul_19_Template, 2, 1, "ul", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(20, GroupEditFormComponent_span_20_Template, 4, 1, "span", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 14)(22, "div", 7)(23, "label");
        \u0275\u0275text(24, "Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "input", 15);
        \u0275\u0275twoWayListener("ngModelChange", function GroupEditFormComponent_Template_input_ngModelChange_25_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.editDate, $event) || (ctx.editDate = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 7)(27, "label");
        \u0275\u0275text(28, "Time");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "input", 16);
        \u0275\u0275twoWayListener("ngModelChange", function GroupEditFormComponent_Template_input_ngModelChange_29_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.editTime, $event) || (ctx.editTime = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(30, "div", 7)(31, "label");
        \u0275\u0275text(32, "Difficulty");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "div", 17)(34, "span", 18);
        \u0275\u0275listener("click", function GroupEditFormComponent_Template_span_click_34_listener() {
          return ctx.editDifficulty = "easy";
        });
        \u0275\u0275text(35, "Easy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "span", 18);
        \u0275\u0275listener("click", function GroupEditFormComponent_Template_span_click_36_listener() {
          return ctx.editDifficulty = "moderate";
        });
        \u0275\u0275text(37, "Moderate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "span", 18);
        \u0275\u0275listener("click", function GroupEditFormComponent_Template_span_click_38_listener() {
          return ctx.editDifficulty = "hard";
        });
        \u0275\u0275text(39, "Hard");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(40, "div", 7)(41, "label");
        \u0275\u0275text(42, "Description ");
        \u0275\u0275elementStart(43, "span", 9);
        \u0275\u0275text(44, "(optional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(45, "textarea", 19);
        \u0275\u0275twoWayListener("ngModelChange", function GroupEditFormComponent_Template_textarea_ngModelChange_45_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.editDescription, $event) || (ctx.editDescription = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "div", 7)(47, "label");
        \u0275\u0275text(48, "Max members ");
        \u0275\u0275elementStart(49, "span", 9);
        \u0275\u0275text(50, "(optional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(51, "input", 20);
        \u0275\u0275twoWayListener("ngModelChange", function GroupEditFormComponent_Template_input_ngModelChange_51_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.editMaxMembers, $event) || (ctx.editMaxMembers = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 7)(53, "label");
        \u0275\u0275text(54, " Tour price ");
        \u0275\u0275elementStart(55, "span", 9);
        \u0275\u0275text(56, "(optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275template(57, GroupEditFormComponent_span_57_Template, 2, 0, "span", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "div", 22)(59, "span", 23);
        \u0275\u0275text(60, "\u20AC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "input", 24);
        \u0275\u0275twoWayListener("ngModelChange", function GroupEditFormComponent_Template_input_ngModelChange_61_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.editPrice, $event) || (ctx.editPrice = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(62, "div", 7)(63, "label");
        \u0275\u0275text(64, "Meeting point ");
        \u0275\u0275elementStart(65, "span", 9);
        \u0275\u0275text(66, "(optional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(67, GroupEditFormComponent_div_67_Template, 11, 0, "div", 25)(68, GroupEditFormComponent_div_68_Template, 6, 0, "div", 26)(69, GroupEditFormComponent_div_69_Template, 6, 0, "div", 27);
        \u0275\u0275elementEnd();
        \u0275\u0275template(70, GroupEditFormComponent_p_70_Template, 2, 1, "p", 28);
        \u0275\u0275elementStart(71, "div", 29)(72, "button", 30);
        \u0275\u0275listener("click", function GroupEditFormComponent_Template_button_click_72_listener() {
          return ctx.cancel();
        });
        \u0275\u0275text(73, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "button", 31);
        \u0275\u0275listener("click", function GroupEditFormComponent_Template_button_click_74_listener() {
          return ctx.submit();
        });
        \u0275\u0275text(75);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275twoWayProperty("ngModel", ctx.editTitle);
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.editSpotSearch);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.editSpotResults().length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.editSpotSlug);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.editDate);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.editTime);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("active", ctx.editDifficulty === "easy");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.editDifficulty === "moderate");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.editDifficulty === "hard");
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.editDescription);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.editMaxMembers);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", !ctx.canSetPrice());
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.editPrice);
        \u0275\u0275property("disabled", !ctx.canSetPrice());
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.editPendingMeetingPoint());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.editMeetingPoint && !ctx.editPendingMeetingPoint());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.editMeetingPoint && !ctx.editPendingMeetingPoint());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.editError());
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.editBusy());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.editBusy() ? "Saving\u2026" : "Save changes", " ");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel], styles: ["\n\n[_nghost-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 20px;\n  display: block;\n}\n.gd-edit-form[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 16px;\n  margin-bottom: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.gd-edit-form__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.gd-edit-form__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  margin: 0;\n  color: var(--color-text-base);\n}\n.gd-edit-form__close[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  border-radius: var(--radius-sm);\n  transition: background var(--transition);\n}\n.gd-edit-form__close[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-hover);\n}\n.gd-edit-form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.gd-edit-form__field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.gd-edit-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.gd-edit-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 11px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: 13.5px;\n  color: var(--color-text-base);\n  background: var(--color-bg);\n  box-sizing: border-box;\n  transition: border-color var(--transition);\n}\n.gd-edit-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.gd-edit-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n}\n.gd-edit-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 70px;\n}\n.gd-edit-form__opt[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-light);\n  text-transform: none;\n  letter-spacing: 0;\n}\n.gd-edit-form__lock-hint[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-left: 6px;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-light);\n  vertical-align: middle;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.gd-price-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.gd-price-wrap[_ngcontent-%COMP%]   .gd-price-euro[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  pointer-events: none;\n}\n.gd-price-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-left: 24px;\n  width: 100%;\n}\n.gd-edit-form__spot-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.gd-edit-form__spot-results[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  background: var(--color-bg);\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-md);\n  box-shadow: var(--shadow-md);\n  list-style: none;\n  margin: 0;\n  padding: 4px 0;\n  z-index: 10;\n  max-height: 180px;\n  overflow-y: auto;\n}\n.gd-edit-form__spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  font-size: 13px;\n  color: var(--color-text-base);\n  cursor: pointer;\n}\n.gd-edit-form__spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-edit-form__spot-selected[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  margin-top: 2px;\n}\n.gd-edit-form__spot-selected[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.gd-edit-form__row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.gd-edit-form__row[_ngcontent-%COMP%]   .gd-edit-form__field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.gd-edit-form__chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.gd-edit-form__error[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-danger);\n  margin: 0;\n}\n.gd-edit-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n}\n.gd-edit-form__cancel[_ngcontent-%COMP%] {\n  padding: 9px 16px;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--color-border);\n  background: none;\n  color: var(--color-text-secondary);\n  font-size: 13.5px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-edit-form__cancel[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-hover);\n}\n.gd-edit-form__submit[_ngcontent-%COMP%] {\n  padding: 9px 18px;\n  border-radius: var(--radius-md);\n  border: none;\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 13.5px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gd-edit-form__submit[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-edit-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-meeting-pick[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.gd-meeting-pick__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 7px 12px;\n  border-radius: var(--radius-md);\n  border: 1.5px dashed var(--color-border);\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n  font-size: 12.5px;\n  font-weight: 500;\n  cursor: pointer;\n  transition:\n    border-color var(--transition),\n    color var(--transition),\n    background var(--transition);\n}\n.gd-meeting-pick__btn[_ngcontent-%COMP%]:hover, \n.gd-meeting-pick__btn.picking[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n  background: var(--color-bg-light);\n}\n.gd-meeting-pick__btn.picking[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_gdPickPulse 1.4s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_gdPickPulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.6;\n  }\n}\n.gd-meeting-set[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: var(--color-success);\n}\n.gd-meeting-set[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  stroke: var(--color-success);\n}\n.gd-meeting-set__remove[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  padding: 2px 8px;\n  border-radius: var(--radius-sm);\n  border: 1px solid var(--color-border);\n  background: none;\n  color: var(--color-text-muted);\n  font-size: 11px;\n  cursor: pointer;\n  transition: color var(--transition), border-color var(--transition);\n}\n.gd-meeting-set__remove[_ngcontent-%COMP%]:hover {\n  color: var(--color-danger);\n  border-color: var(--color-danger);\n}\n.gd-meeting-confirm[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.gd-meeting-confirm__msg[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: var(--color-text-base);\n}\n.gd-meeting-confirm__msg[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.gd-meeting-confirm__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.gd-meeting-confirm__retry[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 6px 10px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: none;\n  font-size: 12.5px;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n}\n.gd-meeting-confirm__retry[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.gd-meeting-confirm__ok[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 6px 10px;\n  border: none;\n  border-radius: var(--radius-md);\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 12.5px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.gd-meeting-confirm__ok[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n/*# sourceMappingURL=group-edit-form.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupEditFormComponent, { className: "GroupEditFormComponent", filePath: "src/app/features/groups/group-detail/group-edit-form/group-edit-form.component.ts", lineNumber: 24 });
})();

// src/app/features/groups/group-detail/group-detail.component.ts
function GroupDetailComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 9);
    \u0275\u0275element(3, "path", 10)(4, "circle", 11)(5, "path", 12)(6, "path", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "h3", 14);
    \u0275\u0275text(8, "Explore Together");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 15);
    \u0275\u0275text(10, "Coming Soon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 16);
    \u0275\u0275text(12, "Find other explorers and join hikes at Malta's best spots. Stay tuned!");
    \u0275\u0275elementEnd()();
  }
}
function GroupDetailComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "span", 18)(2, "span", 18)(3, "span", 18);
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_5_app_group_edit_form_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-group-edit-form", 22);
    \u0275\u0275listener("saved", function GroupDetailComponent_ng_container_5_app_group_edit_form_1_Template_app_group_edit_form_saved_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEditSaved($event));
    })("cancelled", function GroupDetailComponent_ng_container_5_app_group_edit_form_1_Template_app_group_edit_form_cancelled_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEditCancelled());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("group", ctx_r1.group)("groupId", ctx_r1.groupId);
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.unreadCount() > 99 ? "99+" : ctx_r1.unreadCount());
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u20AC", ctx_r1.group.price, " per person");
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1, "Free");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_button_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.showSpotOnMap());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 55);
    \u0275\u0275element(2, "path", 56)(3, "circle", 57);
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
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1, "No location set");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_p_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.group.description);
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275text(1, " \u{1F9ED} This group is currently exploring! ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_button_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_button_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.showMeetingModal.set(true));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "path", 56)(3, "circle", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Meeting point set ");
    \u0275\u0275elementStart(5, "svg", 62);
    \u0275\u0275element(6, "polyline", 63);
    \u0275\u0275elementEnd()();
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_22_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.contactFormError());
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_22_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "p", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 66)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " will contact you to arrange payment. Share your phone number so they can reach you. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 67);
    \u0275\u0275twoWayListener("ngModelChange", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_22_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.contactPhone, $event) || (ctx_r1.contactPhone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.enter", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_22_Template_input_keydown_enter_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.submitContactAndJoin());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_22_p_8_Template, 2, 1, "p", 68);
    \u0275\u0275elementStart(9, "div", 69)(10, "button", 70);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_22_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.cancelContactForm());
    });
    \u0275\u0275text(11, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 71);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_22_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.submitContactAndJoin());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u{1F4B3} \u20AC", ctx_r1.group.price, " per person ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.group.leaderName);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.contactPhone);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.contactFormError());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.actionBusy() ? "Joining\u2026" : "Join & share number", " ");
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
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
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 81);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
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
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 86);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
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
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 87);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.confirmingAction.set("complete"));
    });
    \u0275\u0275text(1, " \u2713 Complete group ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_div_3_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 90);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_div_3_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r1.confirmingAction.set("cancel"));
    });
    \u0275\u0275text(1, " Cancel group ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 88)(1, "button", 81);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_div_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.confirmingAction.set("leave"));
    });
    \u0275\u0275text(2, " Leave group ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_div_3_button_3_Template, 2, 1, "button", 89);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.group.status !== "cancelled" && ctx_r1.group.status !== "exploring");
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_button_1_Template, 2, 1, "button", 83)(2, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_button_2_Template, 2, 1, "button", 84)(3, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_div_3_Template, 4, 2, "div", 85);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canStartExploring);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.group.status === "exploring");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.group.status !== "completed");
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 91);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.openEdit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "path", 92)(3, "path", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Edit group ");
    \u0275\u0275elementEnd();
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_app_confirm_popup_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-confirm-popup", 94);
    \u0275\u0275listener("confirmed", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_app_confirm_popup_5_Template_app_confirm_popup_confirmed_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.executeConfirmedAction());
    })("cancelled", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_app_confirm_popup_5_Template_app_confirm_popup_cancelled_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.confirmingAction.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("fixed", true)("message", ctx_r1.confirmingAction() === "leave" ? "Leave this group?" : ctx_r1.confirmingAction() === "explore" ? "Start exploring? No new members can join once you begin." : ctx_r1.confirmingAction() === "complete" ? "Mark this group as completed?" : "Cancel this group? All members will be notified.")("confirmLabel", ctx_r1.confirmingAction() === "leave" ? "Leave" : ctx_r1.confirmingAction() === "explore" ? "Start exploring" : ctx_r1.confirmingAction() === "complete" ? "Complete" : "Cancel group")("cancelLabel", ctx_r1.confirmingAction() === "leave" ? "Stay" : ctx_r1.confirmingAction() === "explore" ? "Not yet" : ctx_r1.confirmingAction() === "complete" ? "Not yet" : "Keep it")("danger", ctx_r1.confirmingAction() !== "explore" && ctx_r1.confirmingAction() !== "complete");
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 95);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.actionError());
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_button_1_Template, 2, 2, "button", 74)(2, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_button_2_Template, 2, 1, "button", 75)(3, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_div_3_Template, 4, 3, "div", 76)(4, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_button_4_Template, 5, 0, "button", 77)(5, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_app_confirm_popup_5_Template, 1, 5, "app-confirm-popup", 78)(6, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_p_6_Template, 2, 1, "p", 79);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canJoin && !ctx_r1.showContactForm());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isMember && !ctx_r1.isLeader && ctx_r1.group.status !== "completed");
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
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_24_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_24_ng_container_1_Template, 1, 0, "ng-container", 96);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const signInGate_r15 = \u0275\u0275reference(14);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", signInGate_r15);
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_div_3_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 108);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_div_3_button_3_Template_button_click_0_listener() {
      const m_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.transferTo(m_r19.uid));
    });
    \u0275\u0275element(1, "app-user-avatar", 109);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275property("disabled", ctx_r1.actionBusy());
    \u0275\u0275advance();
    \u0275\u0275property("photoURL", m_r19.photoURL)("displayName", m_r19.displayName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r19.displayName, " ");
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 104)(1, "p", 105);
    \u0275\u0275text(2, "Choose a new leader before you leave:");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_div_3_button_3_Template, 3, 4, "button", 106);
    \u0275\u0275elementStart(4, "button", 107);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_div_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r17);
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
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 110);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("\xB7 ", ctx_r1.group.maxMembers - ctx_r1.group.memberCount, " spot", ctx_r1.group.maxMembers - ctx_r1.group.memberCount === 1 ? "" : "s", " left");
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 97);
    \u0275\u0275text(2, "Members");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_div_3_Template, 6, 1, "div", 98);
    \u0275\u0275elementStart(4, "div", 99);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_Template_div_click_4_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.showMembersModal.set(true));
    });
    \u0275\u0275element(5, "app-member-avatars", 100);
    \u0275\u0275elementStart(6, "span", 101)(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275template(10, GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_span_10_Template, 2, 2, "span", 102);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 103);
    \u0275\u0275element(12, "polyline", 63);
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
function GroupDetailComponent_ng_container_5_ng_container_2_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34)(2, "div", 35);
    \u0275\u0275element(3, "app-user-avatar", 36);
    \u0275\u0275elementStart(4, "div", 37)(5, "span", 38);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 39);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 40)(11, "span", 41);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, GroupDetailComponent_ng_container_5_ng_container_2_div_10_span_13_Template, 2, 1, "span", 42)(14, GroupDetailComponent_ng_container_5_ng_container_2_div_10_span_14_Template, 2, 0, "span", 43)(15, GroupDetailComponent_ng_container_5_ng_container_2_div_10_button_15_Template, 5, 1, "button", 44)(16, GroupDetailComponent_ng_container_5_ng_container_2_div_10_span_16_Template, 2, 0, "span", 45);
    \u0275\u0275elementStart(17, "span", 46);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(19, GroupDetailComponent_ng_container_5_ng_container_2_div_10_p_19_Template, 2, 1, "p", 47)(20, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_20_Template, 2, 0, "div", 48)(21, GroupDetailComponent_ng_container_5_ng_container_2_div_10_button_21_Template, 7, 0, "button", 49)(22, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_22_Template, 14, 6, "div", 50)(23, GroupDetailComponent_ng_container_5_ng_container_2_div_10_div_23_Template, 7, 6, "div", 51)(24, GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_24_Template, 2, 1, "ng-container", 6)(25, GroupDetailComponent_ng_container_5_ng_container_2_div_10_ng_container_25_Template, 13, 6, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("photoURL", ctx_r1.group.leaderPhoto)("displayName", ctx_r1.group.leaderName)("level", ctx_r1.isLeader ? ctx_r1.userDataService.levelInfo().id : ctx_r1.group.leaderLevel)("isAdmin", ctx_r1.group.leaderIsAdmin)("isSelf", ctx_r1.isLeader);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.group.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind2(9, 26, ctx_r1.group.date.toDate(), "EEEE d MMMM"), " \xB7 ", ctx_r1.group.time, " \xB7 ", ctx_r1.group.leaderName, " leading");
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge--" + ctx_r1.group.difficulty);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.group.difficulty);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.group.price);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.group.price);
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
    \u0275\u0275property("ngIf", ctx_r1.showContactForm());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.authService.isLoggedIn());
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_app_group_chat_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-group-chat", 111);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("groupId", ctx_r1.groupId)("group", ctx_r1.group)("canPin", ctx_r1.canPin)("isMember", ctx_r1.isMember)("isMuted", ctx_r1.isMuted)("mutedMinutesLeft", ctx_r1.mutedMinutesLeft)("chatClosesAt", ctx_r1.chatClosesAt);
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_12_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_5_ng_container_2_div_12_ng_container_1_Template, 1, 0, "ng-container", 96);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const signInGate_r15 = \u0275\u0275reference(14);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", signInGate_r15);
  }
}
function GroupDetailComponent_ng_container_5_ng_container_2_ng_template_13_ng_container_5_Template(rf, ctx) {
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
function GroupDetailComponent_ng_container_5_ng_container_2_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 112)(1, "p", 113)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " is organising a group");
    \u0275\u0275template(5, GroupDetailComponent_ng_container_5_ng_container_2_ng_template_13_ng_container_5_Template, 4, 1, "ng-container", 6);
    \u0275\u0275text(6, ". Sign in to join the group and chat with the members. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 114);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_ng_template_13_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r20);
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
function GroupDetailComponent_ng_container_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 23)(2, "button", 24);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setTab("info"));
    });
    \u0275\u0275text(3, " Details ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 25);
    \u0275\u0275listener("click", function GroupDetailComponent_ng_container_5_ng_container_2_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setTab("chat"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 26);
    \u0275\u0275element(6, "path", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Chat ");
    \u0275\u0275template(8, GroupDetailComponent_ng_container_5_ng_container_2_span_8_Template, 2, 1, "span", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 29);
    \u0275\u0275template(10, GroupDetailComponent_ng_container_5_ng_container_2_div_10_Template, 26, 29, "div", 30)(11, GroupDetailComponent_ng_container_5_ng_container_2_app_group_chat_11_Template, 1, 7, "app-group-chat", 31)(12, GroupDetailComponent_ng_container_5_ng_container_2_div_12_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, GroupDetailComponent_ng_container_5_ng_container_2_ng_template_13_Template, 9, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("gd-tab--active", ctx_r1.activeTab() === "info");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("gd-tab--active", ctx_r1.activeTab() === "chat");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.unreadCount() > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.activeTab() === "info");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab() === "chat" && ctx_r1.authService.isLoggedIn());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab() === "chat" && !ctx_r1.authService.isLoggedIn());
  }
}
function GroupDetailComponent_ng_container_5_app_modal_3_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 122);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.group.meetingPoint.label);
  }
}
function GroupDetailComponent_ng_container_5_app_modal_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-modal", 115);
    \u0275\u0275listener("closeRequested", function GroupDetailComponent_ng_container_5_app_modal_3_Template_app_modal_closeRequested_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showMeetingModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 116)(2, "div", 117);
    \u0275\u0275text(3, "\u{1F4CD}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 118);
    \u0275\u0275text(5, "Meeting point");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, GroupDetailComponent_ng_container_5_app_modal_3_div_6_Template, 2, 1, "div", 119);
    \u0275\u0275elementStart(7, "a", 120);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 121);
    \u0275\u0275element(9, "path", 56)(10, "circle", 57);
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
function GroupDetailComponent_ng_container_5_app_group_members_modal_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-group-members-modal", 123);
    \u0275\u0275listener("closeRequested", function GroupDetailComponent_ng_container_5_app_group_members_modal_4_Template_app_group_members_modal_closeRequested_0_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showMembersModal.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("groupId", ctx_r1.groupId)("group", ctx_r1.group)("members", ctx_r1.members)("canManageMembers", ctx_r1.canManageMembers)("currentUser", ctx_r1.currentUser);
  }
}
function GroupDetailComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, GroupDetailComponent_ng_container_5_app_group_edit_form_1_Template, 1, 2, "app-group-edit-form", 19)(2, GroupDetailComponent_ng_container_5_ng_container_2_Template, 15, 8, "ng-container", 6)(3, GroupDetailComponent_ng_container_5_app_modal_3_Template, 12, 2, "app-modal", 20)(4, GroupDetailComponent_ng_container_5_app_group_members_modal_4_Template, 1, 5, "app-group-members-modal", 21);
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
    this.groupsUnlocked = computed(() => this.userDataService.groupsUnlocked());
    this.actionError = signal(null);
    this.actionBusy = signal(false);
    this.showTransfer = signal(false);
    this.confirmingAction = signal(null);
    this.autoJoining = signal(false);
    this.showMeetingModal = signal(false);
    this.showMembersModal = signal(false);
    this.showEditForm = signal(false);
    this.activeTab = signal("info");
    this.unreadCount = signal(0);
    this.showContactForm = signal(false);
    this.contactPhone = "";
    this.contactFormError = signal(null);
    this.lastSeenMessageCount = 0;
    this.messagesInitialized = false;
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
      if ((group.status === GroupStatus.Open || group.status === GroupStatus.Full) && GroupsService.isGroupPast(group) && this.isLeader) {
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
      if (group.status === GroupStatus.Open) {
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
      const show = !!group.meetingPoint && group.status !== GroupStatus.Cancelled && group.status !== GroupStatus.Completed;
      this.bridge.meetingPointMarker.set(show ? group.meetingPoint : null);
    });
    this._unreadEffect = effect(() => {
      const count = this.groupsService.messages().length;
      const onChat = this.activeTab() === "chat";
      if (!this.messagesInitialized) {
        if (count > 0) {
          this.lastSeenMessageCount = count;
          this.messagesInitialized = true;
        }
        return;
      }
      if (onChat) {
        this.lastSeenMessageCount = count;
        this.unreadCount.set(0);
      } else {
        this.unreadCount.set(Math.max(0, count - this.lastSeenMessageCount));
      }
    });
    this.groupId = "";
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
  get isLeader() {
    return !!this.currentUser && this.group?.leaderId === this.currentUser.id;
  }
  get isMember() {
    return !!this.currentUser && (this.groupsService.currentUserIsMember() || this.isLeader);
  }
  get canJoin() {
    const g = this.group;
    if (!g)
      return false;
    return g.status === GroupStatus.Open && !this.isMember && !this.isLeader;
  }
  get canEdit() {
    const g = this.group;
    if (!g || g.status === GroupStatus.Cancelled || g.status === GroupStatus.Completed)
      return false;
    return this.isLeader || this.userDataService.isAdmin();
  }
  get canStartExploring() {
    const g = this.group;
    if (!g || g.status !== GroupStatus.Open && g.status !== GroupStatus.Full)
      return false;
    return this.isLeader || this.userDataService.isAdmin();
  }
  get canPin() {
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
  get canManageMembers() {
    const g = this.group;
    if (!g || g.status === GroupStatus.Cancelled || g.status === GroupStatus.Completed)
      return false;
    return this.isLeader || this.userDataService.isAdmin();
  }
  get nonLeaderMembers() {
    return this.members.filter((m) => m.uid !== this.group?.leaderId);
  }
  // Returns the ms timestamp when the post-group chat window closes:
  //   null  → active group (no close time)
  //   0     → cancelled (archived immediately)
  //   N     → completedAt + 24 h
  get chatClosesAt() {
    const g = this.group;
    if (!g)
      return null;
    if (g.status === GroupStatus.Cancelled)
      return 0;
    if (g.status === GroupStatus.Completed) {
      const base = g.completedAt ?? g.updatedAt;
      return base ? base.toMillis() + 432e5 : null;
    }
    return null;
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    this.groupId = this.route.snapshot.paramMap.get("id") ?? "";
    if (!this.groupId) {
      this.router.navigate(["/malta/groups"]);
      return;
    }
    if (this.route.snapshot.queryParamMap.get("tab") === "chat") {
      this.activeTab.set("chat");
    }
    this.groupsService.startDetailListener(this.groupId);
    this.bridge.enterPanelMode([], { label: "Back to groups" });
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.router.navigate(["/malta/groups"]));
    this.bridge.meetingPointClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.showMeetingModal.set(true));
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta/locations", loc.slug]);
    });
    if (this.isMember)
      this.groupsService.updateLastActive(this.groupId);
    this.analytics.pageView(window.location.href, "Group Detail");
  }
  ngOnDestroy() {
    this.groupsService.stopDetailListener();
    this.bridge.meetingPointMarker.set(null);
    this.bridge.pickMode.set(false);
  }
  onVisibilityChange() {
    if (!document.hidden && this.isMember) {
      this.groupsService.updateLastActive(this.groupId);
    }
  }
  // ── Group actions ─────────────────────────────────────────────────────────
  join() {
    return __async(this, null, function* () {
      if (!this.authService.isLoggedIn()) {
        this.authService.openLoginModal();
        return;
      }
      const group = this.groupsService.detailGroup();
      if (group?.price) {
        this.contactPhone = "";
        this.contactFormError.set(null);
        this.showContactForm.set(true);
        return;
      }
      yield this._doJoin();
    });
  }
  submitContactAndJoin() {
    return __async(this, null, function* () {
      const phone = this.contactPhone.trim();
      if (!phone) {
        this.contactFormError.set("Please enter your phone number.");
        return;
      }
      this.showContactForm.set(false);
      yield this._doJoin(phone);
    });
  }
  cancelContactForm() {
    this.showContactForm.set(false);
    this.contactFormError.set(null);
    this.contactPhone = "";
  }
  _doJoin(phone) {
    return __async(this, null, function* () {
      this.actionError.set(null);
      this.actionBusy.set(true);
      try {
        yield this.groupsService.joinGroup(this.groupId, phone);
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
    if (this.confirmingAction() === "complete")
      this.completeGroup();
  }
  completeGroup() {
    return __async(this, null, function* () {
      this.confirmingAction.set(null);
      this.actionError.set(null);
      this.actionBusy.set(true);
      try {
        yield this.groupsService.completeGroup(this.groupId);
      } catch (e) {
        this.actionError.set(e instanceof Error ? e.message : "Could not complete group.");
      } finally {
        this.actionBusy.set(false);
      }
    });
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
    this.showEditForm.set(true);
  }
  onEditSaved(spotSlug) {
    this.showEditForm.set(false);
    if (spotSlug) {
      this.locationApplied = false;
    }
  }
  onEditCancelled() {
    this.showEditForm.set(false);
  }
  openJoinLogin() {
    this.pendingAutoJoin = true;
    this.authService.openLoginModal();
  }
  showSpotOnMap() {
    const group = this.group;
    if (!group)
      return;
    const loc = locations.find((l) => l.slug === group.spotSlug) ?? null;
    if (loc)
      this.bridge.selectedLocation.set(loc);
  }
  setTab(tab) {
    if (tab === "chat") {
      this.lastSeenMessageCount = this.groupsService.messages().length;
      this.unreadCount.set(0);
    }
    this.activeTab.set(tab);
    const base = window.location.pathname;
    window.history.replaceState(null, "", tab === "chat" ? `${base}?tab=chat` : base);
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
  static {
    this.\u0275fac = function GroupDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupDetailComponent, selectors: [["app-group-detail"]], hostBindings: function GroupDetailComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("visibilitychange", function GroupDetailComponent_visibilitychange_HostBindingHandler() {
          return ctx.onVisibilityChange();
        }, false, \u0275\u0275resolveDocument);
      }
    }, decls: 6, vars: 6, consts: [["signInGate", ""], [3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd", "title"], ["panelActions", "", 3, "url", "shareTitle"], [1, "gd-content"], ["class", "gd-locked", 4, "ngIf"], ["class", "gd-loading", 4, "ngIf"], [4, "ngIf"], [1, "gd-locked"], [1, "gd-locked__icon"], ["width", "32", "height", "32", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "gd-locked__title"], [1, "gd-locked__sub"], [1, "gd-locked__desc"], [1, "gd-loading"], [1, "gd-loading__dot"], [3, "group", "groupId", "saved", "cancelled", 4, "ngIf"], ["maxWidth", "280px", 3, "closeRequested", 4, "ngIf"], [3, "groupId", "group", "members", "canManageMembers", "currentUser", "closeRequested", 4, "ngIf"], [3, "saved", "cancelled", "group", "groupId"], [1, "gd-tabs"], [1, "gd-tab", 3, "click"], [1, "gd-tab", "gd-tab--chat", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"], ["class", "gd-tab__badge", 4, "ngIf"], [1, "gd-tab-body"], ["class", "gd-tab-pane", 4, "ngIf"], [3, "groupId", "group", "canPin", "isMember", "isMuted", "mutedMinutesLeft", "chatClosesAt", 4, "ngIf"], [1, "gd-tab__badge"], [1, "gd-tab-pane"], [1, "gd-header"], [1, "gd-header__leader"], ["size", "md", "shape", "circle", "roleLabel", "\u{1F451} Group leader", 3, "photoURL", "displayName", "level", "isAdmin", "isSelf"], [1, "gd-header__info"], [1, "gd-header__title"], [1, "gd-header__sub"], [1, "gd-header__meta"], [1, "badge"], ["class", "gd-price-badge", 4, "ngIf"], ["class", "gd-price-badge gd-price-badge--free", 4, "ngIf"], ["class", "gd-header__spot", "title", "Show on map", 3, "click", 4, "ngIf"], ["class", "gd-header__spot gd-header__spot--none", 4, "ngIf"], [1, "gd-status"], ["class", "gd-header__desc", 4, "ngIf"], ["class", "gd-exploring-banner", 4, "ngIf"], ["class", "gd-meeting-row", 3, "click", 4, "ngIf"], ["class", "gd-contact-form", 3, "click", 4, "ngIf"], ["class", "gd-actions", 4, "ngIf"], [1, "gd-price-badge"], [1, "gd-price-badge", "gd-price-badge--free"], ["title", "Show on map", 1, "gd-header__spot", 3, "click"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "gd-header__spot", "gd-header__spot--none"], [1, "gd-header__desc"], [1, "gd-exploring-banner"], [1, "gd-meeting-row", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", 1, "gd-meeting-row__chevron"], ["points", "9 18 15 12 9 6"], [1, "gd-contact-form", 3, "click"], [1, "gd-contact-form__title"], [1, "gd-contact-form__desc"], ["type", "tel", "placeholder", "+356 9999 9999", 1, "gd-contact-form__input", 3, "ngModelChange", "keydown.enter", "ngModel"], ["class", "gd-contact-form__error", 4, "ngIf"], [1, "gd-contact-form__actions"], [1, "gd-contact-form__cancel", 3, "click"], [1, "gd-contact-form__submit", 3, "click", "disabled"], [1, "gd-contact-form__error"], [1, "gd-actions"], ["class", "gd-join-btn", 3, "disabled", "click", 4, "ngIf"], ["class", "gd-leave-btn", 3, "disabled", "click", 4, "ngIf"], ["class", "gd-leader-actions", 4, "ngIf"], ["class", "gd-edit-btn", 3, "click", 4, "ngIf"], [3, "fixed", "message", "confirmLabel", "cancelLabel", "danger", "confirmed", "cancelled", 4, "ngIf"], ["class", "gd-action-error", 4, "ngIf"], [1, "gd-join-btn", 3, "click", "disabled"], [1, "gd-leave-btn", 3, "click", "disabled"], [1, "gd-leader-actions"], ["class", "gd-explore-btn", 3, "disabled", "click", 4, "ngIf"], ["class", "gd-complete-btn", 3, "disabled", "click", 4, "ngIf"], ["class", "gd-leader-row", 4, "ngIf"], [1, "gd-explore-btn", 3, "click", "disabled"], [1, "gd-complete-btn", 3, "click", "disabled"], [1, "gd-leader-row"], ["class", "gd-cancel-btn", 3, "disabled", "click", 4, "ngIf"], [1, "gd-cancel-btn", 3, "click", "disabled"], [1, "gd-edit-btn", 3, "click"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], [3, "confirmed", "cancelled", "fixed", "message", "confirmLabel", "cancelLabel", "danger"], [1, "gd-action-error"], [4, "ngTemplateOutlet"], [1, "gd-members-section-label"], ["class", "gd-transfer", 4, "ngIf"], [1, "gd-members-row", 3, "click"], [3, "previews", "total"], [1, "gd-members-row__label"], ["class", "gd-members-row__spots", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "gd-members-row__chevron"], [1, "gd-transfer"], [1, "gd-transfer__label"], ["class", "gd-transfer__member", 3, "disabled", "click", 4, "ngFor", "ngForOf"], [1, "gd-transfer__cancel", 3, "click"], [1, "gd-transfer__member", 3, "click", "disabled"], ["size", "xs", "shape", "circle", 3, "photoURL", "displayName"], [1, "gd-members-row__spots"], [3, "groupId", "group", "canPin", "isMember", "isMuted", "mutedMinutesLeft", "chatClosesAt"], [1, "gd-gate"], [1, "gd-gate__msg"], [1, "gd-gate__btn", 3, "click", "disabled"], ["maxWidth", "280px", 3, "closeRequested"], [1, "gd-mp-modal"], [1, "gd-mp-modal__icon"], [1, "gd-mp-modal__title"], ["class", "gd-mp-modal__sub", 4, "ngIf"], ["target", "_blank", "rel", "noopener noreferrer", 1, "gd-mp-modal__btn", 3, "href"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "gd-mp-modal__sub"], [3, "closeRequested", "groupId", "group", "members", "canManageMembers", "currentUser"]], template: function GroupDetailComponent_Template(rf, ctx) {
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
        \u0275\u0275element(1, "app-share-btn", 2);
        \u0275\u0275elementStart(2, "div", 3);
        \u0275\u0275template(3, GroupDetailComponent_div_3_Template, 13, 0, "div", 4)(4, GroupDetailComponent_div_4_Template, 4, 0, "div", 5)(5, GroupDetailComponent_ng_container_5_Template, 5, 4, "ng-container", 6);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        let tmp_2_0;
        \u0275\u0275property("title", (ctx.group == null ? null : ctx.group.title) || "Group");
        \u0275\u0275advance();
        \u0275\u0275property("url", ctx.shareUrl)("shareTitle", (tmp_2_0 = ctx.group == null ? null : ctx.group.title) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "Group");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.groupsUnlocked());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.groupsUnlocked() && !ctx.group);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.groupsUnlocked() && ctx.group);
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
      NgIf,
      NgTemplateOutlet,
      DatePipe,
      FormsModule,
      DefaultValueAccessor,
      NgControlStatus,
      NgModel,
      PanelShellComponent,
      UserAvatarComponent,
      ConfirmPopupComponent,
      MemberAvatarsComponent,
      AppModalComponent,
      ShareButtonComponent,
      GroupChatComponent,
      GroupMembersModalComponent,
      GroupEditFormComponent
    ], styles: ["\n\n[_nghost-%COMP%]     .panel-body {\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.gd-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.gd-info[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 20px 20px 0;\n}\n.gd-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  padding: 8px 16px 0;\n  flex-shrink: 0;\n}\n.gd-tab[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 34px;\n  padding: 0 10px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  background: var(--color-bg-light);\n  color: var(--color-text-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  transition:\n    background var(--transition),\n    color var(--transition),\n    box-shadow var(--transition),\n    border-color var(--transition);\n}\n.gd-tab--active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border-color: var(--color-primary);\n  box-shadow: 0 2px 8px var(--color-primary-shadow);\n  animation: none;\n}\n.gd-tab--chat[_ngcontent-%COMP%]:not(.gd-tab--active) {\n  animation: _ngcontent-%COMP%_chatTabPulse 2.4s ease-in-out infinite;\n}\n.gd-tab__badge[_ngcontent-%COMP%] {\n  min-width: 17px;\n  height: 17px;\n  padding: 0 4px;\n  border-radius: 8.5px;\n  background: #ef4444;\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n@keyframes _ngcontent-%COMP%_chatTabPulse {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(244, 169, 34, 0.45);\n  }\n  50% {\n    box-shadow: 0 0 0 5px rgba(244, 169, 34, 0);\n  }\n}\n.gd-tab-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.gd-tab-pane[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 20px 24px;\n}\n.gd-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding-bottom: 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid var(--color-border);\n}\n.gd-header__leader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n}\n.gd-header__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.gd-header__title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  line-height: 1.3;\n}\n.gd-header__sub[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n}\n.gd-header__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.gd-header__spot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  background: none;\n  border: none;\n  padding: 2px 6px 2px 4px;\n  border-radius: var(--radius-sm);\n  cursor: pointer;\n  transition: background var(--transition), color var(--transition);\n}\n.gd-header__spot[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  color: var(--color-text-base);\n}\n.gd-header__spot--none[_ngcontent-%COMP%] {\n  cursor: default;\n  font-style: italic;\n  opacity: 0.6;\n}\n.gd-header__spot--none[_ngcontent-%COMP%]:hover {\n  background: none;\n  color: var(--color-text-muted);\n}\n.gd-price-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 20px;\n  background: rgba(244, 169, 34, 0.12);\n  color: #92620a;\n}\n.gd-price-badge--free[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n  font-weight: 600;\n}\n.gd-status[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 20px;\n  text-transform: capitalize;\n}\n.gd-status--open[_ngcontent-%COMP%] {\n  background: var(--color-success-bg-hover);\n  color: #065f46;\n}\n.gd-status--full[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg-hover);\n  color: var(--color-warning);\n}\n.gd-status--exploring[_ngcontent-%COMP%] {\n  background: var(--color-info-bg-hover);\n  color: var(--color-info);\n}\n.gd-status--cancelled[_ngcontent-%COMP%] {\n  background: var(--color-danger-bg-hover);\n  color: var(--color-danger);\n}\n.gd-status--completed[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n.gd-meeting-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  width: 100%;\n  padding: 9px 14px;\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  box-sizing: border-box;\n  margin-bottom: 4px;\n  transition:\n    border-color var(--transition),\n    color var(--transition),\n    background var(--transition);\n}\n.gd-meeting-row[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:first-child {\n  color: var(--color-primary);\n  stroke: var(--color-primary);\n  flex-shrink: 0;\n}\n.gd-meeting-row[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n  background: var(--color-bg-light);\n}\n.gd-meeting-row__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: var(--color-text-light);\n}\n.gd-exploring-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  border-radius: var(--radius-lg);\n  background: var(--color-info-bg);\n  border: 1px solid var(--color-info-border);\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-info);\n}\n.gd-header__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  line-height: 1.6;\n  margin: 0 0 14px;\n}\n.gd-contact-form[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-left: 3px solid var(--color-primary);\n  border-radius: var(--radius-lg);\n}\n.gd-contact-form__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0 0 6px;\n}\n.gd-contact-form__desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n  margin: 0 0 12px;\n  line-height: 1.5;\n}\n.gd-contact-form__input[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 9px 12px;\n  font-size: 14px;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: var(--color-bg);\n  color: var(--color-text-base);\n  margin-bottom: 8px;\n  outline: none;\n}\n.gd-contact-form__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 2px var(--color-primary-shadow);\n}\n.gd-contact-form__error[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #dc2626;\n  margin: 0 0 8px;\n}\n.gd-contact-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.gd-contact-form__cancel[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 9px 12px;\n  background: var(--color-bg-muted);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n}\n.gd-contact-form__cancel[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.gd-contact-form__submit[_ngcontent-%COMP%] {\n  flex: 2;\n  padding: 9px 12px;\n  background: var(--color-primary);\n  border: none;\n  border-radius: var(--radius-md);\n  font-size: 13px;\n  font-weight: 700;\n  color: #fff;\n  cursor: pointer;\n}\n.gd-contact-form__submit[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-contact-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--color-border);\n  position: relative;\n}\n.gd-leader-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.gd-leader-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.gd-leader-row[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.gd-join-btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gd-join-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-join-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-leave-btn[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-leave-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.gd-leave-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-explore-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: var(--color-success-bg);\n  color: var(--color-success);\n  border: 1.5px solid var(--color-success-border);\n  border-radius: var(--radius-lg);\n  padding: 12px 14px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background var(--transition), border-color var(--transition);\n}\n.gd-explore-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-success-bg-hover);\n  border-color: var(--color-success-border-hover);\n}\n.gd-explore-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-complete-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: var(--color-info-bg);\n  color: var(--color-info);\n  border: 1.5px solid var(--color-info-border);\n  border-radius: var(--radius-lg);\n  padding: 12px 14px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background var(--transition), border-color var(--transition);\n}\n.gd-complete-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-info-bg-hover);\n  border-color: var(--color-info-border-hover);\n}\n.gd-complete-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-cancel-btn[_ngcontent-%COMP%] {\n  background: var(--color-danger-bg);\n  color: var(--color-danger);\n  border: 1px solid var(--color-danger-border);\n  border-radius: var(--radius-lg);\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-cancel-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-danger-bg-hover);\n}\n.gd-cancel-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-action-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-danger);\n  margin: 0;\n}\n.gd-gate[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 20px 16px;\n  text-align: center;\n  margin-bottom: 20px;\n}\n.gd-gate__msg[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: var(--color-text-secondary);\n  margin: 0 0 12px;\n  line-height: 1.5;\n}\n.gd-gate__btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 10px 24px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.gd-gate__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-transfer[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  border: 1px solid var(--color-warning-border);\n  border-radius: var(--radius-xl);\n  padding: 14px;\n  margin-bottom: 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.gd-transfer__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-warning);\n  margin: 0;\n}\n.gd-transfer__member[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: var(--color-bg);\n  border: 1px solid var(--color-warning-border);\n  border-radius: var(--radius-lg);\n  padding: 8px 12px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.gd-transfer__member[_ngcontent-%COMP%]:hover {\n  background: var(--color-warning-bg-hover);\n}\n.gd-transfer__member[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.gd-transfer__cancel[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  padding: 4px 0;\n  text-align: left;\n}\n.gd-transfer__cancel[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.gd-members-section-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  padding-top: 20px;\n  padding-bottom: 8px;\n  border-top: 1px solid var(--color-border);\n  margin-top: 16px;\n}\n.gd-members-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  cursor: pointer;\n  transition: background var(--transition), border-color var(--transition);\n}\n.gd-members-row[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n  border-color: var(--color-text-light);\n}\n.gd-members-row__label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gd-members-row__spots[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-muted);\n}\n.gd-members-row__chevron[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--color-text-muted);\n}\n.gd-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  padding: 40px 0;\n}\n.gd-loading__dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  animation: _ngcontent-%COMP%_gdDotPulse 1.2s ease-in-out infinite;\n}\n.gd-loading__dot[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.gd-loading__dot[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_gdDotPulse {\n  0%, 80%, 100% {\n    opacity: 0.3;\n    transform: scale(0.8);\n  }\n  40% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.gd-locked[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 60px 24px 48px;\n  flex: 1;\n}\n.gd-locked__icon[_ngcontent-%COMP%] {\n  color: var(--color-text-light);\n  margin-bottom: 18px;\n}\n.gd-locked__title[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0 0 4px;\n  letter-spacing: -0.3px;\n}\n.gd-locked__sub[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--color-primary);\n  margin: 0 0 14px;\n}\n.gd-locked__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.55;\n  margin: 0;\n  max-width: 240px;\n}\n.gd-mp-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 0 4px;\n  text-align: center;\n}\n.gd-mp-modal__icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  line-height: 1;\n  margin-bottom: 2px;\n}\n.gd-mp-modal__title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.gd-mp-modal__sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n}\n.gd-mp-modal__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  margin-top: 10px;\n  padding: 11px 22px;\n  border-radius: var(--radius-lg);\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 14px;\n  font-weight: 700;\n  text-decoration: none;\n  transition: opacity var(--transition);\n}\n.gd-mp-modal__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gd-edit-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  width: 100%;\n  padding: 9px 14px;\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n  background: var(--color-bg-muted);\n  color: var(--color-text-secondary);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  box-sizing: border-box;\n  transition:\n    border-color var(--transition),\n    color var(--transition),\n    background var(--transition);\n}\n.gd-edit-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  flex-shrink: 0;\n}\n.gd-edit-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n  background: var(--color-bg-light);\n}\n.gd-edit-btn[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n/*# sourceMappingURL=group-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupDetailComponent, { className: "GroupDetailComponent", filePath: "src/app/features/groups/group-detail/group-detail.component.ts", lineNumber: 42 });
})();
export {
  GroupDetailComponent
};
//# sourceMappingURL=chunk-WUCNBSLZ.js.map
