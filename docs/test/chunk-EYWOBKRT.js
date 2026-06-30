import {
  BookingAdminService
} from "./chunk-DT3HMCUA.js";
import {
  BookingDataService
} from "./chunk-QWTZ5MNF.js";
import "./chunk-FSJG3SUO.js";
import {
  ToastService
} from "./chunk-C7UDYKXR.js";
import {
  BookingsAuthService
} from "./chunk-KKHOHJA2.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-3H6OUIAT.js";
import "./chunk-F6LTA4RG.js";
import "./chunk-4746DPCT.js";
import {
  Router
} from "./chunk-Q6APD67I.js";
import "./chunk-GHBBMOR7.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-EBVVQ6Y2.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/organizations/organizations.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function OrganizationsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function OrganizationsComponent_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showCreate.set(!ctx_r1.showCreate()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.showCreate() ? "Cancel" : "+ New organization");
  }
}
function OrganizationsComponent_Conditional_8_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tz_r4 = ctx.$implicit;
    \u0275\u0275property("value", tz_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tz_r4);
  }
}
function OrganizationsComponent_Conditional_8_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("value", c_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5);
  }
}
function OrganizationsComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "h2", 10);
    \u0275\u0275text(2, "Create organization");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 11);
    \u0275\u0275text(4, "You become its owner. Set it up (services, staff, company details) from Settings once you're switched into it.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 12)(6, "label", 13)(7, "span");
    \u0275\u0275text(8, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizationsComponent_Conditional_8_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.name, $event) || (ctx_r1.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "label", 13)(11, "span");
    \u0275\u0275text(12, "Slug");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizationsComponent_Conditional_8_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.slug, $event) || (ctx_r1.slug = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "label", 13)(15, "span");
    \u0275\u0275text(16, "Timezone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 16);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizationsComponent_Conditional_8_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.timezone, $event) || (ctx_r1.timezone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(18, OrganizationsComponent_Conditional_8_For_19_Template, 2, 2, "option", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "label", 13)(21, "span");
    \u0275\u0275text(22, "Currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "select", 16);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizationsComponent_Conditional_8_Template_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.currency, $event) || (ctx_r1.currency = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(24, OrganizationsComponent_Conditional_8_For_25_Template, 2, 2, "option", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "p", 11);
    \u0275\u0275text(27, "Public booking page: ");
    \u0275\u0275elementStart(28, "strong");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " \xA0\xB7\xA0 lowercase letters, numbers and hyphens only.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 18)(32, "button", 19);
    \u0275\u0275listener("click", function OrganizationsComponent_Conditional_8_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.create());
    });
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.slug);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.timezone);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.timezones);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.currency);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.currencies);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.origin, "/", ctx_r1.slug || "slug", "/book");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r1.canCreate);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.creating() ? "Creating\u2026" : "Create organization");
  }
}
function OrganizationsComponent_For_19_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "Active");
    \u0275\u0275elementEnd();
  }
}
function OrganizationsComponent_For_19_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", "/" + o_r6.slug + "/book", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("/", o_r6.slug, "/book");
  }
}
function OrganizationsComponent_For_19_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function OrganizationsComponent_For_19_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const o_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.switchTo(o_r6.id));
    });
    \u0275\u0275text(1, "Switch");
    \u0275\u0275elementEnd();
  }
}
function OrganizationsComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21)(2, "span", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, OrganizationsComponent_For_19_Conditional_4_Template, 2, 0, "span", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 25);
    \u0275\u0275template(8, OrganizationsComponent_For_19_Conditional_8_Template, 2, 2, "a", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 27);
    \u0275\u0275template(10, OrganizationsComponent_For_19_Conditional_10_Template, 2, 0, "button", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("row--active", o_r6.id === ctx_r1.auth.orgId());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r6.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(o_r6.id === ctx_r1.auth.orgId() ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r6.role);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(o_r6.slug ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(o_r6.id !== ctx_r1.auth.orgId() ? 10 : -1);
  }
}
function supportedList(key, fallback) {
  try {
    const fn = Intl.supportedValuesOf;
    if (typeof fn === "function")
      return fn(key);
  } catch {
  }
  return fallback;
}
var OrganizationsComponent = class _OrganizationsComponent {
  constructor() {
    this.auth = inject(BookingsAuthService);
    this.admin = inject(BookingAdminService);
    this.data = inject(BookingDataService);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.origin = typeof window !== "undefined" ? window.location.origin : "";
    this.showCreate = signal(false);
    this.creating = signal(false);
    this.timezones = supportedList("timeZone", ["UTC", "Europe/Malta", "Europe/London", "Europe/Madrid", "America/New_York"]);
    this.currencies = supportedList("currency", ["EUR", "USD", "GBP", "CHF", "AUD", "CAD"]);
    this.name = "";
    this.slug = "";
    this.timezone = "Europe/Malta";
    this.currency = "EUR";
  }
  switchTo(orgId) {
    if (orgId === this.auth.orgId())
      return;
    this.auth.setActiveOrg(orgId);
    this.data.load();
    this.router.navigate(["/bookings", "dashboard"]);
  }
  get canCreate() {
    return !this.creating() && this.name.trim().length > 0 && /^[a-z0-9-]+$/.test(this.slug.trim());
  }
  create() {
    return __async(this, null, function* () {
      if (!this.canCreate)
        return;
      this.creating.set(true);
      try {
        const res = yield this.admin.createOrg(this.name.trim(), this.slug.trim().toLowerCase(), this.timezone, this.currency.toUpperCase());
        if (res.error) {
          this.toast.error("Could not create \u2014 the slug may already be taken.");
          return;
        }
        this.toast.success("Organization created");
        this.name = "";
        this.slug = "";
        this.showCreate.set(false);
        yield this.auth.refresh();
        if (res.id)
          this.switchTo(res.id);
      } finally {
        this.creating.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function OrganizationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OrganizationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrganizationsComponent, selectors: [["app-organizations"]], decls: 20, vars: 2, consts: [[1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], [1, "btn", "btn--primary"], [1, "card"], [1, "table"], [1, "row", "row--head"], [1, "row", 3, "row--active"], [1, "btn", "btn--primary", 3, "click"], [1, "card__h"], [1, "hint"], [1, "grid"], [1, "field"], ["placeholder", "Acme Studio", 3, "ngModelChange", "ngModel"], ["placeholder", "acme", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], [3, "value"], [1, "actions"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "row"], [1, "org"], [1, "org__name"], [1, "badge", "badge--active"], [1, "role"], [1, "link"], ["target", "_blank", "rel", "noopener", 3, "href"], [1, "action"], [1, "link-btn"], [1, "link-btn", 3, "click"]], template: function OrganizationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Organizations");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "The organizations you manage. Click one to switch into it.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, OrganizationsComponent_Conditional_7_Template, 2, 1, "button", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, OrganizationsComponent_Conditional_8_Template, 34, 8, "div", 5);
        \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "span");
        \u0275\u0275text(12, "Organization");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "span");
        \u0275\u0275text(14, "Your role");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "span");
        \u0275\u0275text(16, "Public page");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "span");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(18, OrganizationsComponent_For_19_Template, 11, 7, "div", 8, _forTrack0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.auth.isPlatformAdmin() ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showCreate() ? 8 : -1);
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.auth.orgs());
      }
    }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: [`

.page[_ngcontent-%COMP%] {
  padding: 32px 40px;
  max-width: 1200px;
}
@media (max-width: 760px) {
  .page[_ngcontent-%COMP%] {
    padding: 20px 16px;
  }
}
.page__head[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.head-actions[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex-shrink: 0;
}
@media (max-width: 640px) {
  .head-actions[_ngcontent-%COMP%] {
    width: 100%;
  }
  .head-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
    flex: 1 1 auto;
    justify-content: center;
  }
}
.page__title[_ngcontent-%COMP%] {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 4px;
  letter-spacing: -0.02em;
}
.page__sub[_ngcontent-%COMP%] {
  font-size: 13.5px;
  color: #475569;
  margin: 0;
}
.muted[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 14px;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  border: 1.5px solid transparent;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Inter",
    "Segoe UI",
    sans-serif;
  transition: 0.15s ease;
  text-decoration: none;
}
.btn--primary[_ngcontent-%COMP%] {
  background: #F4A922;
  color: #000;
}
.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  filter: brightness(0.94);
}
.btn--ghost[_ngcontent-%COMP%] {
  background: #ffffff;
  border-color: #e2e8f0;
  color: #475569;
}
.btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {
  border-color: #94a3b8;
}
.btn--sm[_ngcontent-%COMP%] {
  padding: 6px 12px;
  font-size: 12px;
}
.btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: default;
}
.link-btn[_ngcontent-%COMP%] {
  background: none;
  border: none;
  font-size: 12.5px;
  font-weight: 600;
  color: #F4A922;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: inherit;
}
.link-btn[_ngcontent-%COMP%]:hover {
  background: rgba(244, 169, 34, 0.12);
}
.link-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
}
.link-btn--danger[_ngcontent-%COMP%] {
  color: #ef4444;
}
.link-btn--danger[_ngcontent-%COMP%]:hover {
  background: rgba(239, 68, 68, 0.1);
}
.card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}
.field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], 
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], 
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #0f172a;
  background: #ffffff;
  width: 100%;
  box-sizing: border-box;
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, 
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, 
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #F4A922;
}
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  resize: vertical;
}
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  appearance: none;
  cursor: pointer;
  padding-right: 32px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%236b7280' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}
.check[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: #0f172a;
}
.list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
}
.item--off[_ngcontent-%COMP%] {
  opacity: 0.6;
}
.item__name[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.item__meta[_ngcontent-%COMP%] {
  font-size: 12.5px;
  color: #475569;
  margin-top: 2px;
}
.item__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
  white-space: nowrap;
}
.tag[_ngcontent-%COMP%] {
  font-size: 10.5px;
  font-weight: 700;
  background: #eef2f6;
  color: #475569;
  padding: 2px 7px;
  border-radius: 10px;
  vertical-align: middle;
}
[_nghost-%COMP%] {
  display: block;
}
.card[_ngcontent-%COMP%] {
  padding: 20px;
  margin-bottom: 18px;
}
.card__h[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 6px;
}
.hint[_ngcontent-%COMP%] {
  font-size: 12.5px;
  color: #94a3b8;
  margin: 8px 0 0;
}
.grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
  margin-bottom: 8px;
}
.actions[_ngcontent-%COMP%] {
  margin-top: 16px;
}
.table[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 2fr 1fr 1.6fr 0.8fr;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 13.5px;
}
.row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.row--head[_ngcontent-%COMP%] {
  font-size: 11.5px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.row--active[_ngcontent-%COMP%] {
  background: rgba(244, 169, 34, 0.12);
}
.org[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.org__name[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #0f172a;
}
.role[_ngcontent-%COMP%] {
  text-transform: capitalize;
  color: #475569;
}
.link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: #F4A922;
  text-decoration: none;
  font-variant-numeric: tabular-nums;
}
.link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
.action[_ngcontent-%COMP%] {
  text-align: right;
}
.badge[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.badge--active[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #15803d;
}
@media (max-width: 600px) {
  .row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
  }
  .row--head[_ngcontent-%COMP%], 
   .link[_ngcontent-%COMP%] {
    display: none;
  }
}
/*# sourceMappingURL=organizations.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrganizationsComponent, { className: "OrganizationsComponent", filePath: "src/app/booking/platform/organizations/organizations.component.ts", lineNumber: 27 });
})();
export {
  OrganizationsComponent
};
//# sourceMappingURL=chunk-EYWOBKRT.js.map
