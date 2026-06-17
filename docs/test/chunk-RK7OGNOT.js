import {
  GroupsSectionComponent
} from "./chunk-NAJD2GPS.js";
import "./chunk-AF6MFLYJ.js";
import {
  AnalyticsService,
  GroupsService
} from "./chunk-Y6SM2IUZ.js";
import {
  PanelShellComponent
} from "./chunk-4BKKPH4H.js";
import {
  MapBridgeService,
  takeUntilDestroyed
} from "./chunk-THJSUENW.js";
import "./chunk-DJNGE6OQ.js";
import {
  UserDataService
} from "./chunk-D7IYRYWV.js";
import "./chunk-HHUPO22U.js";
import "./chunk-SXYQDE25.js";
import {
  AuthService
} from "./chunk-VGYDPPC7.js";
import "./chunk-FNGMJUD7.js";
import "./chunk-IIDAMI5Y.js";
import "./chunk-BDFMM2X7.js";
import {
  SeoService
} from "./chunk-HSPLBQNI.js";
import "./chunk-RYL5JWPP.js";
import {
  Router
} from "./chunk-23WFKX7T.js";
import "./chunk-2VIPXXQC.js";
import "./chunk-WKMKAAWK.js";
import {
  CommonModule,
  DestroyRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-YX7TN7IZ.js";
import "./chunk-TWWAJFRB.js";

// src/app/map/features/groups/groups-list/explore-together.component.ts
function ExploreTogetherComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-groups-section");
  }
}
function ExploreTogetherComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 4);
    \u0275\u0275element(3, "path", 5)(4, "circle", 6)(5, "path", 7)(6, "path", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "h3", 9);
    \u0275\u0275text(8, "Explore Together");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 10);
    \u0275\u0275text(10, "Coming Soon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 11);
    \u0275\u0275text(12, "Find other explorers and join hikes at Malta's best spots. Stay tuned!");
    \u0275\u0275elementEnd()();
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
    this.userDataService = inject(UserDataService);
    this.groupsUnlocked = computed(() => this.userDataService.groupsUnlocked());
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
      if (!loc)
        return;
      if (this.bridge.spotPickMode())
        return;
      this.router.navigate(["/malta/locations", loc.slug]);
    });
    this.analytics.pageView(window.location.href, "Explore Together");
  }
  ngOnDestroy() {
    this.groupsService.stopGroupsListener();
    this.bridge.pickMode.set(false);
    this.bridge.meetingPointMarker.set(null);
  }
  static {
    this.\u0275fac = function ExploreTogetherComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ExploreTogetherComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExploreTogetherComponent, selectors: [["app-explore-together"]], decls: 4, vars: 1, consts: [["title", "Explore Together", 3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd"], [1, "et-content"], [1, "et-locked"], [1, "et-locked__icon"], ["width", "32", "height", "32", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "et-locked__title"], [1, "et-locked__sub"], [1, "et-locked__desc"]], template: function ExploreTogetherComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function ExploreTogetherComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.router.navigate(["/malta"]);
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
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275template(2, ExploreTogetherComponent_Conditional_2_Template, 1, 0, "app-groups-section")(3, ExploreTogetherComponent_Conditional_3_Template, 13, 0, "div", 2);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.groupsUnlocked() ? 2 : 3);
      }
    }, dependencies: [CommonModule, PanelShellComponent, GroupsSectionComponent], styles: ["\n\n.et-content[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.et-intro[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 12px 14px;\n  margin-bottom: 18px;\n}\n.et-intro__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n  min-width: 0;\n}\n.et-intro__desc[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  margin: 0;\n  line-height: 1.45;\n}\n.et-create-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 8px 13px;\n  font-weight: 700;\n  font-size: 12.5px;\n  cursor: pointer;\n  flex-shrink: 0;\n  white-space: nowrap;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.28);\n  transition: opacity var(--transition), box-shadow var(--transition);\n}\n.et-create-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  box-shadow: 0 4px 12px rgba(244, 169, 34, 0.38);\n}\n.et-form[_ngcontent-%COMP%] {\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: 16px;\n  margin-bottom: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  animation: _ngcontent-%COMP%_etSlideDown 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_etSlideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.et-form__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.et-form__title[_ngcontent-%COMP%] {\n  font-size: 14.5px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0;\n}\n.et-form__close[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  border: none;\n  border-radius: 50%;\n  width: 26px;\n  height: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--color-text-muted);\n  transition: background var(--transition);\n}\n.et-form__close[_ngcontent-%COMP%]:hover {\n  background: var(--color-border);\n}\n.et-form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  position: relative;\n}\n.et-form__field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  letter-spacing: 0.01em;\n}\n.et-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.et-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  padding: 9px 11px;\n  font-size: 13.5px;\n  color: var(--color-text-base);\n  outline: none;\n  transition: border-color var(--transition);\n  font-family: inherit;\n  width: 100%;\n  box-sizing: border-box;\n}\n.et-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.et-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n}\n.et-form__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.et-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-text-light);\n}\n.et-form__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 72px;\n}\n.et-form__opt[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--color-text-muted);\n  font-size: 11px;\n}\n.et-form__row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.et-form__chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.et-spot-results[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 2px);\n  left: 0;\n  right: 0;\n  background: var(--color-bg);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  box-shadow: var(--shadow-md);\n  z-index: 10;\n  list-style: none;\n  margin: 0;\n  padding: 4px 0;\n  max-height: 180px;\n  overflow-y: auto;\n}\n.et-spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  font-size: 13px;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.et-spot-results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.et-form__selected-spot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11.5px;\n  color: #059669;\n  font-weight: 600;\n  margin-top: 2px;\n}\n.et-form__error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #dc2626;\n  background: #fef2f2;\n  border-radius: var(--radius-md);\n  padding: 8px 10px;\n  margin: 0;\n}\n.et-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  padding-top: 2px;\n  border-top: 1px solid var(--color-border);\n}\n.et-form__cancel[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  cursor: pointer;\n  transition: color var(--transition);\n}\n.et-form__cancel[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n.et-form__submit[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 9px 18px;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity var(--transition);\n}\n.et-form__submit[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.et-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.et-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.et-list__count[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 2px;\n}\n.et-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 36px 20px 32px;\n  text-align: center;\n  border: 1.5px dashed var(--color-border);\n  border-radius: var(--radius-xl);\n  background: var(--color-bg-light);\n}\n.et-empty__icon[_ngcontent-%COMP%] {\n  font-size: 38px;\n  line-height: 1;\n  margin-bottom: 14px;\n  filter: grayscale(20%);\n}\n.et-empty__msg[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0 0 6px;\n  letter-spacing: -0.2px;\n}\n.et-empty__sub[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  margin: 0 0 20px;\n  line-height: 1.5;\n  max-width: 240px;\n}\n.et-empty__cta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: var(--color-primary);\n  color: #fff;\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 10px 20px;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(244, 169, 34, 0.3);\n  transition: opacity var(--transition);\n}\n.et-empty__cta[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.et-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  padding: 40px 0;\n}\n.et-loading__dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  animation: _ngcontent-%COMP%_etDotPulse 1.2s ease-in-out infinite;\n}\n.et-loading__dot[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.et-loading__dot[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_etDotPulse {\n  0%, 80%, 100% {\n    opacity: 0.25;\n    transform: scale(0.75);\n  }\n  40% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.et-meeting-pick[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.et-meeting-pick__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 7px 12px;\n  border-radius: var(--radius-md);\n  border: 1.5px dashed var(--color-border);\n  background: var(--color-bg-light);\n  color: var(--color-text-secondary);\n  font-size: 12.5px;\n  font-weight: 500;\n  cursor: pointer;\n  transition:\n    border-color var(--transition),\n    color var(--transition),\n    background var(--transition);\n}\n.et-meeting-pick__btn[_ngcontent-%COMP%]:hover, \n.et-meeting-pick__btn.picking[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n  background: rgba(244, 169, 34, 0.06);\n}\n.et-meeting-pick__btn.picking[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_etPickPulse 1.4s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_etPickPulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.6;\n  }\n}\n.et-meeting-set[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: #16a34a;\n}\n.et-meeting-set[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  stroke: #16a34a;\n}\n.et-meeting-set__remove[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  padding: 2px 8px;\n  border-radius: var(--radius-sm);\n  border: 1px solid var(--color-border);\n  background: none;\n  color: var(--color-text-muted);\n  font-size: 11px;\n  cursor: pointer;\n  transition: color var(--transition), border-color var(--transition);\n}\n.et-meeting-set__remove[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n  border-color: #dc2626;\n}\n.et-locked[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 48px 24px 40px;\n  border: 1.5px dashed var(--color-border);\n  border-radius: var(--radius-xl);\n  background: var(--color-bg-light);\n}\n.et-locked__icon[_ngcontent-%COMP%] {\n  color: var(--color-text-light);\n  margin-bottom: 16px;\n}\n.et-locked__title[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--color-text-base);\n  margin: 0 0 4px;\n  letter-spacing: -0.3px;\n}\n.et-locked__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--color-primary);\n  margin: 0 0 14px;\n}\n.et-locked__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.55;\n  margin: 0;\n  max-width: 240px;\n}\n/*# sourceMappingURL=explore-together.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExploreTogetherComponent, { className: "ExploreTogetherComponent", filePath: "src/app/map/features/groups/groups-list/explore-together.component.ts", lineNumber: 26 });
})();
export {
  ExploreTogetherComponent
};
//# sourceMappingURL=chunk-RK7OGNOT.js.map
