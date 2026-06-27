import {
  ConfirmService
} from "./chunk-QZKORCKD.js";
import {
  LineItemsEditorComponent
} from "./chunk-DSNSR4WJ.js";
import {
  BookingAdminService
} from "./chunk-PGIN3GFL.js";
import {
  BookingDataService
} from "./chunk-Q2V34T34.js";
import "./chunk-ZRSGIAGG.js";
import {
  ToastService
} from "./chunk-WPLJ2PYK.js";
import {
  BookingsAuthService
} from "./chunk-RCLK272Z.js";
import "./chunk-DEXNZGWM.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-TEK6OFIA.js";
import {
  bookingsDb
} from "./chunk-3A2C4JCE.js";
import "./chunk-5PW2HKAJ.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-K7AGV7TU.js";
import "./chunk-AMJW2RV7.js";
import {
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
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2FJZNSO2.js";
import {
  __async,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/invoices/invoice-edit.component.ts
function InvoiceEditComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function InvoiceEditComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1, "Invoice not found.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 2);
    \u0275\u0275text(3, "\u2190 Invoices");
    \u0275\u0275elementEnd();
  }
}
function InvoiceEditComponent_Conditional_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
    \u0275\u0275elementStart(1, "span", 20);
    \u0275\u0275text(2, "edited");
    \u0275\u0275elementEnd();
  }
}
function InvoiceEditComponent_Conditional_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
    \u0275\u0275elementStart(1, "span", 1);
    \u0275\u0275text(2, "from booking");
    \u0275\u0275elementEnd();
  }
}
function InvoiceEditComponent_Conditional_3_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function InvoiceEditComponent_Conditional_3_Conditional_32_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resetToBooking());
    });
    \u0275\u0275text(1, "Reset to booking");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function InvoiceEditComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div")(2, "button", 4);
    \u0275\u0275listener("click", function InvoiceEditComponent_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.leave());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 6);
    \u0275\u0275text(7);
    \u0275\u0275template(8, InvoiceEditComponent_Conditional_3_Conditional_8_Template, 3, 0)(9, InvoiceEditComponent_Conditional_3_Conditional_9_Template, 3, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 7);
    \u0275\u0275listener("click", function InvoiceEditComponent_Conditional_3_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.preview());
    });
    \u0275\u0275text(11, "Preview");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 8)(13, "h2", 9);
    \u0275\u0275text(14, "Line items");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 10);
    \u0275\u0275text(16, "These are the source of truth for what the client is charged. Saving updates the booking's total (and its calendar event) to match.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "app-line-items-editor", 11);
    \u0275\u0275twoWayListener("itemsChange", function InvoiceEditComponent_Conditional_3_Template_app_line_items_editor_itemsChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.items, $event) || (ctx_r1.items = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 8)(19, "label", 12)(20, "span");
    \u0275\u0275text(21, "Issue date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function InvoiceEditComponent_Conditional_3_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.issueDate, $event) || (ctx_r1.issueDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "label", 12)(24, "span");
    \u0275\u0275text(25, "Invoice note ");
    \u0275\u0275elementStart(26, "span", 14);
    \u0275\u0275text(27, "(optional, printed on this invoice)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "textarea", 15);
    \u0275\u0275twoWayListener("ngModelChange", function InvoiceEditComponent_Conditional_3_Template_textarea_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.notes, $event) || (ctx_r1.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 16)(30, "button", 17);
    \u0275\u0275listener("click", function InvoiceEditComponent_Conditional_3_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, InvoiceEditComponent_Conditional_3_Conditional_32_Template, 2, 1, "button", 18);
    \u0275\u0275elementStart(33, "button", 19);
    \u0275\u0275listener("click", function InvoiceEditComponent_Conditional_3_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.leave());
    });
    \u0275\u0275text(34, "Cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.backLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Edit invoice ", ctx_r1.invoiceNumber, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.clientName, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.customized() ? 8 : 9);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("items", ctx_r1.items);
    \u0275\u0275property("currency", ctx_r1.currency)("services", ctx_r1.services());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.issueDate);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.notes);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.canSave);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "Saving\u2026" : "Save invoice");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.customized() ? 32 : -1);
  }
}
var InvoiceEditComponent = class _InvoiceEditComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.data = inject(BookingDataService);
    this.auth = inject(BookingsAuthService);
    this.admin = inject(BookingAdminService);
    this.toast = inject(ToastService);
    this.confirm = inject(ConfirmService);
    this.services = signal([]);
    this.loading = signal(true);
    this.saving = signal(false);
    this.notFound = signal(false);
    this.customized = signal(false);
    this.id = "";
    this.invoiceNumber = "";
    this.clientName = "";
    this.currency = "EUR";
    this.backTo = "invoices";
    this.items = [];
    this.notes = "";
    this.issueDate = "";
    this.baseline = "";
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.auth.initialize();
      const org = this.auth.orgId();
      if (org)
        this.services.set((yield this.admin.listServices(org)).filter((s) => s.is_active));
      this.id = this.route.snapshot.paramMap.get("id") ?? "";
      if (this.route.snapshot.queryParamMap.get("from") === "booking")
        this.backTo = "booking";
      if (!this.id) {
        this.notFound.set(true);
        this.loading.set(false);
        return;
      }
      const { data, error } = yield bookingsDb.rpc("get_invoice", { p_booking: this.id });
      if (error || !data) {
        this.notFound.set(true);
        this.loading.set(false);
        return;
      }
      const inv = data.invoice;
      const det = data.org?.invoice_details ?? {};
      this.currency = data.org?.currency ?? "EUR";
      this.clientName = data.client?.company || data.client?.name || "\u2014";
      this.customized.set(!!inv.customized);
      this.items = (inv.line_items ?? []).map((i) => __spreadValues(__spreadValues({
        description: i.description,
        amount: Number(i.amount)
      }, i.serviceId ? { serviceId: i.serviceId } : {}), i.hours ? { hours: Number(i.hours) } : {}));
      this.notes = inv.notes ?? "";
      this.issueDate = inv.issue_date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const ref = data.booking?.booking_ref ?? "";
      const prefix = (det.invoice_prefix || "INV").toUpperCase();
      const dash = ref.indexOf("-");
      this.invoiceNumber = dash >= 0 ? `${prefix}-${ref.slice(dash + 1)}` : `${prefix}-${ref}`;
      if (this.items.length === 0)
        this.items = [{ description: "", amount: 0 }];
      this.baseline = this.snapshot();
      this.loading.set(false);
    });
  }
  /** Serialized editable state — used to tell whether there are unsaved edits. */
  snapshot() {
    return JSON.stringify({ items: this.items, notes: this.notes, issueDate: this.issueDate });
  }
  isDirty() {
    return !this.loading() && this.snapshot() !== this.baseline;
  }
  /** Return target — back to the Invoices list or the booking, depending on entry point. */
  returnCommands() {
    return this.backTo === "invoices" ? ["/bookings/invoices"] : ["/bookings", this.id];
  }
  get backLabel() {
    return this.backTo === "invoices" ? "\u2190 Invoices" : "\u2190 Back to booking";
  }
  /** Leave the editor (back/cancel) — confirm first if there are unsaved edits. */
  leave() {
    return __async(this, null, function* () {
      if (this.isDirty() && !(yield this.confirm.ask({
        title: "Unsaved changes",
        message: "You have unsaved changes to this invoice. Leave without saving?",
        confirmLabel: "Leave",
        danger: true
      })))
        return;
      this.router.navigate(this.returnCommands());
    });
  }
  /** Guard a tab close / refresh while edits are pending. */
  onBeforeUnload(e) {
    if (this.isDirty()) {
      e.preventDefault();
      e.returnValue = "";
    }
  }
  get canSave() {
    return !this.saving() && this.items.length > 0 && this.items.every((i) => i.description.trim().length > 0);
  }
  save() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (!org || !this.canSave)
        return;
      this.saving.set(true);
      try {
        const items = this.items.map((i) => __spreadValues(__spreadValues({
          description: i.description.trim(),
          amount: Number(i.amount) || 0
        }, i.serviceId ? { serviceId: i.serviceId } : {}), i.hours ? { hours: i.hours } : {}));
        const res = yield this.data.saveInvoice(org, this.id, {
          lineItems: items,
          notes: this.notes.trim() || null,
          issueDate: this.issueDate || null
        });
        if (res.error) {
          this.toast.error("Could not save the invoice.");
          return;
        }
        const total = items.reduce((s, i) => s + i.amount, 0);
        yield this.data.setAmount(this.id, total);
        this.baseline = this.snapshot();
        this.toast.success("Invoice saved");
        this.router.navigate(this.returnCommands());
      } finally {
        this.saving.set(false);
      }
    });
  }
  resetToBooking() {
    return __async(this, null, function* () {
      if (!(yield this.confirm.ask({
        title: "Reset invoice",
        message: "Discard your edits and revert this invoice to the booking details?",
        confirmLabel: "Reset",
        danger: true
      })))
        return;
      this.saving.set(true);
      try {
        yield this.data.resetInvoice(this.id);
        this.baseline = this.snapshot();
        this.toast.info("Invoice reset to the booking");
        this.router.navigate(this.returnCommands());
      } finally {
        this.saving.set(false);
      }
    });
  }
  preview() {
    window.open(`/book/invoice/${this.id}`, "_blank", "noopener");
  }
  static {
    this.\u0275fac = function InvoiceEditComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InvoiceEditComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvoiceEditComponent, selectors: [["app-invoice-edit"]], hostBindings: function InvoiceEditComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("beforeunload", function InvoiceEditComponent_beforeunload_HostBindingHandler($event) {
          return ctx.onBeforeUnload($event);
        }, false, \u0275\u0275resolveWindow);
      }
    }, decls: 4, vars: 1, consts: [[1, "page"], [1, "muted"], ["routerLink", "/bookings/invoices", 1, "btn", "btn--ghost"], [1, "page__head"], ["type", "button", 1, "back", 3, "click"], [1, "page__title"], [1, "page__sub"], [1, "btn", "btn--ghost", 3, "click"], [1, "card"], [1, "card__h"], [1, "hint"], [3, "itemsChange", "items", "currency", "services"], [1, "field"], ["type", "date", 3, "ngModelChange", "ngModel"], [1, "opt"], ["rows", "2", "placeholder", "Anything specific the client asked for on this invoice", 3, "ngModelChange", "ngModel"], [1, "actions"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "btn", "btn--ghost", 3, "disabled"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "tag"], [1, "btn", "btn--ghost", 3, "click", "disabled"]], template: function InvoiceEditComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, InvoiceEditComponent_Conditional_1_Template, 2, 0, "p", 1)(2, InvoiceEditComponent_Conditional_2_Template, 4, 0)(3, InvoiceEditComponent_Conditional_3_Template, 35, 12);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 1 : ctx.notFound() ? 2 : 3);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink, LineItemsEditorComponent], styles: [`

.page[_ngcontent-%COMP%] {
  padding: 32px 36px;
  max-width: 720px;
}
.page__head[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
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
.page__head[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}
.back[_ngcontent-%COMP%] {
  display: inline-block;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 12.5px;
  color: #F4A922;
  text-decoration: none;
  font-weight: 600;
}
.back[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
.tag[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #b45309;
  background: #fef3c7;
  padding: 2px 8px;
  border-radius: 10px;
}
.card[_ngcontent-%COMP%] {
  padding: 20px;
  margin-bottom: 16px;
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
  margin: 0 0 16px;
}
.opt[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-weight: 400;
}
.item[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 130px 34px;
  gap: 10px;
  align-items: start;
  margin-bottom: 10px;
}
.item[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], 
.item[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  padding: 9px 11px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #0f172a;
  background: #ffffff;
  width: 100%;
  box-sizing: border-box;
}
.item[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus, 
.item[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #F4A922;
}
.item__desc[_ngcontent-%COMP%] {
  resize: vertical;
}
.item__amt[_ngcontent-%COMP%] {
  text-align: right;
}
.item__del[_ngcontent-%COMP%] {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 15px;
  padding: 9px 4px;
}
.item__del[_ngcontent-%COMP%]:hover:not(:disabled) {
  color: #ef4444;
}
.item__del[_ngcontent-%COMP%]:disabled {
  opacity: 0.3;
  cursor: default;
}
.total-row[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1.5px solid #e2e8f0;
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
}
.field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 14px;
}
.field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], 
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
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #F4A922;
}
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  resize: vertical;
}
.actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
}
/*# sourceMappingURL=invoice-edit.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvoiceEditComponent, { className: "InvoiceEditComponent", filePath: "src/app/booking/platform/invoices/invoice-edit.component.ts", lineNumber: 24 });
})();
export {
  InvoiceEditComponent
};
//# sourceMappingURL=chunk-FAHZJAMV.js.map
