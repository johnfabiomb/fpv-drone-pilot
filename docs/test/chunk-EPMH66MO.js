import {
  currencySymbol
} from "./chunk-NUQ3PGB2.js";
import {
  servicePrice
} from "./chunk-DEXNZGWM.js";
import {
  BookingOrgService
} from "./chunk-SEGSOSVX.js";
import "./chunk-Y4O5MVSK.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-E53NQKQB.js";
import "./chunk-DNKJKTBS.js";
import "./chunk-GQ3SG4V7.js";
import {
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-P56CFEJA.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/public/service-picker/service-picker.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ServicePickerComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "Loading services\u2026");
    \u0275\u0275elementEnd();
  }
}
function ServicePickerComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function ServicePickerComponent_Conditional_8_Conditional_0_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function ServicePickerComponent_Conditional_8_Conditional_0_For_6_Template_button_click_0_listener() {
      const w_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const svc_r5 = \u0275\u0275nextContext();
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.pickWorker(svc_r5.id, w_r4.id));
    });
    \u0275\u0275elementStart(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4, "\u203A");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const w_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(w_r4.name);
  }
}
function ServicePickerComponent_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function ServicePickerComponent_Conditional_8_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.back());
    });
    \u0275\u0275text(1, "\u2039 Back to services");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 6);
    \u0275\u0275repeaterCreate(5, ServicePickerComponent_Conditional_8_Conditional_0_For_6_Template, 5, 1, "button", 9, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const svc_r5 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Who would you like for ", svc_r5.name, "?");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(svc_r5.workers);
  }
}
function ServicePickerComponent_Conditional_8_Conditional_1_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r7.description);
  }
}
function ServicePickerComponent_Conditional_8_Conditional_1_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("from ", ctx_r0.currencySymbol(), "", ctx_r0.fromPrice(s_r7), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("/ ", s_r7.min_hours, "h");
  }
}
function ServicePickerComponent_Conditional_8_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function ServicePickerComponent_Conditional_8_Conditional_1_For_2_Template_button_click_0_listener() {
      const s_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.pickService(s_r7));
    });
    \u0275\u0275elementStart(1, "div", 15)(2, "div", 11);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ServicePickerComponent_Conditional_8_Conditional_1_For_2_Conditional_4_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 17);
    \u0275\u0275template(6, ServicePickerComponent_Conditional_8_Conditional_1_For_2_Conditional_6_Template, 4, 3);
    \u0275\u0275elementStart(7, "span", 12);
    \u0275\u0275text(8, "\u203A");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", s_r7.workers.length === 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r7.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r7.description ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.fromPrice(s_r7) !== null ? 6 : -1);
  }
}
function ServicePickerComponent_Conditional_8_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "No services available right now.");
    \u0275\u0275elementEnd();
  }
}
function ServicePickerComponent_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275repeaterCreate(1, ServicePickerComponent_Conditional_8_Conditional_1_For_2_Template, 9, 4, "button", 13, _forTrack0);
    \u0275\u0275template(3, ServicePickerComponent_Conditional_8_Conditional_1_Conditional_3_Template, 2, 0, "p", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.services());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.services().length === 0 ? 3 : -1);
  }
}
function ServicePickerComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ServicePickerComponent_Conditional_8_Conditional_0_Template, 7, 1)(1, ServicePickerComponent_Conditional_8_Conditional_1_Template, 4, 1, "div", 6);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r0.pickingWorkersFor()) ? 0 : 1, tmp_1_0);
  }
}
var ServicePickerComponent = class _ServicePickerComponent {
  constructor() {
    this.bookingOrg = inject(BookingOrgService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.orgSlug = "";
    this.loading = signal(true);
    this.error = signal(null);
    this.org = this.bookingOrg.org;
    this.services = this.bookingOrg.services;
    this.pickingWorkersFor = signal(null);
    this.currencySymbol = computed(() => currencySymbol(this.org()?.currency));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.orgSlug = this.route.snapshot.paramMap.get("org") ?? "";
      const data = yield this.bookingOrg.load(this.orgSlug || void 0);
      if (!data)
        this.error.set("Could not load services. Please try again.");
      this.loading.set(false);
    });
  }
  fromPrice(s) {
    return servicePrice(s.pricing, s.min_hours);
  }
  pickService(s) {
    if (s.workers.length === 0)
      return;
    if (s.workers.length === 1) {
      this.go(s.id, s.workers[0].id);
      return;
    }
    this.pickingWorkersFor.set(s);
  }
  pickWorker(serviceId, staffId) {
    this.go(serviceId, staffId);
  }
  back() {
    this.pickingWorkersFor.set(null);
  }
  go(serviceId, staffId) {
    const cmds = this.orgSlug ? ["/", this.orgSlug, "book", "calendar"] : ["/book/calendar"];
    this.router.navigate(cmds, { queryParams: { service: serviceId, staff: staffId } });
  }
  static {
    this.\u0275fac = function ServicePickerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ServicePickerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ServicePickerComponent, selectors: [["app-service-picker"]], decls: 9, vars: 2, consts: [[1, "sp"], [1, "sp__head"], [1, "sp__title"], [1, "sp__sub"], [1, "sp__msg"], [1, "sp__err"], [1, "cards"], [1, "sp__back", 3, "click"], [1, "sp__step"], [1, "card", "card--worker"], [1, "card", "card--worker", 3, "click"], [1, "card__name"], [1, "card__go"], [1, "card", 3, "disabled"], [1, "card", 3, "click", "disabled"], [1, "card__body"], [1, "card__desc"], [1, "card__right"], [1, "card__price"], [1, "card__per"]], template: function ServicePickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, "Choose a service to get started.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, ServicePickerComponent_Conditional_6_Template, 2, 0, "p", 4)(7, ServicePickerComponent_Conditional_7_Template, 2, 1, "p", 5)(8, ServicePickerComponent_Conditional_8_Template, 2, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate((tmp_0_0 = (tmp_0_0 = ctx.org()) == null ? null : tmp_0_0.name) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : "Book a session");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.loading() ? 6 : ctx.error() ? 7 : 8);
      }
    }, styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  background: #f8fafc;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  color: #0f172a;\n}\n.sp[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 32px 20px 80px;\n}\n.sp__head[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.sp__title[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 800;\n  letter-spacing: -0.03em;\n  margin: 0 0 6px;\n}\n.sp__sub[_ngcontent-%COMP%] {\n  font-size: 14.5px;\n  color: #475569;\n  margin: 0;\n}\n.sp__msg[_ngcontent-%COMP%] {\n  color: #475569;\n  font-size: 14px;\n  padding: 30px 0;\n  text-align: center;\n}\n.sp__err[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 14px;\n}\n.sp__step[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  margin: 4px 0 14px;\n}\n.sp__back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #475569;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0 0 12px;\n}\n.sp__back[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n.cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  width: 100%;\n  text-align: left;\n  cursor: pointer;\n  background: #ffffff;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 18px;\n  transition: 0.15s ease;\n  font-family: inherit;\n}\n.card[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #F4A922;\n  box-shadow: 0 2px 14px rgba(244, 169, 34, 0.14);\n}\n.card[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.card__body[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.card__name[_ngcontent-%COMP%] {\n  font-size: 16.5px;\n  font-weight: 700;\n  color: #0f172a;\n}\n.card__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #475569;\n  margin-top: 3px;\n}\n.card__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 6px;\n  white-space: nowrap;\n}\n.card__price[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  color: #F4A922;\n}\n.card__per[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n}\n.card__go[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #94a3b8;\n  line-height: 1;\n  margin-left: 4px;\n}\n.card--worker[_ngcontent-%COMP%] {\n  padding: 16px 18px;\n}\n.card--worker[_ngcontent-%COMP%]   .card__name[_ngcontent-%COMP%] {\n  font-size: 15.5px;\n}\n/*# sourceMappingURL=service-picker.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ServicePickerComponent, { className: "ServicePickerComponent", filePath: "src/app/booking/public/service-picker/service-picker.component.ts", lineNumber: 13 });
})();
export {
  ServicePickerComponent
};
//# sourceMappingURL=chunk-EPMH66MO.js.map
