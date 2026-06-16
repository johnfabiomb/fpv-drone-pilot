import {
  ToastService
} from "./chunk-VKQYSGWL.js";
import {
  BookingDataService
} from "./chunk-ZUGMEISK.js";
import "./chunk-LUKEY4LQ.js";
import {
  BookingsAuthService
} from "./chunk-5K3EYFTC.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-K4JTNS7E.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-ZDNO6UPP.js";
import "./chunk-KJHSNOMD.js";
import {
  bookingsDb
} from "./chunk-QQIZI4YX.js";
import "./chunk-XS6RPKEZ.js";
import {
  CurrencyPipe,
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
  ɵɵpipe,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-W3IDOWRJ.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/invoices/invoice-edit.component.ts
var _c0 = (a0) => ["/bookings", a0];
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
    \u0275\u0275elementStart(1, "span", 22);
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
function InvoiceEditComponent_Conditional_3_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "textarea", 23);
    \u0275\u0275twoWayListener("ngModelChange", function InvoiceEditComponent_Conditional_3_For_18_Template_textarea_ngModelChange_1_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275twoWayBindingSet(item_r4.description, $event) || (item_r4.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function InvoiceEditComponent_Conditional_3_For_18_Template_input_ngModelChange_2_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275twoWayBindingSet(item_r4.amount, $event) || (item_r4.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 25);
    \u0275\u0275listener("click", function InvoiceEditComponent_Conditional_3_For_18_Template_button_click_3_listener() {
      const $index_r5 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeItem($index_r5));
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", item_r4.description);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", item_r4.amount);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.items.length === 1);
  }
}
function InvoiceEditComponent_Conditional_3_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function InvoiceEditComponent_Conditional_3_Conditional_41_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
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
    \u0275\u0275elementStart(0, "div", 3)(1, "div")(2, "a", 4);
    \u0275\u0275text(3, "\u2190 Back to booking");
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
    \u0275\u0275text(16, "These appear on the invoice the client sees. Editing them does not change the booking, calendar or work board.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(17, InvoiceEditComponent_Conditional_3_For_18_Template, 5, 3, "div", 11, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(19, "button", 12);
    \u0275\u0275listener("click", function InvoiceEditComponent_Conditional_3_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addItem());
    });
    \u0275\u0275text(20, "+ Add line item");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 13)(22, "span");
    \u0275\u0275text(23, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 8)(28, "label", 14)(29, "span");
    \u0275\u0275text(30, "Issue date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function InvoiceEditComponent_Conditional_3_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.issueDate, $event) || (ctx_r1.issueDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "label", 14)(33, "span");
    \u0275\u0275text(34, "Invoice note ");
    \u0275\u0275elementStart(35, "span", 16);
    \u0275\u0275text(36, "(optional, printed on this invoice)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "textarea", 17);
    \u0275\u0275twoWayListener("ngModelChange", function InvoiceEditComponent_Conditional_3_Template_textarea_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.notes, $event) || (ctx_r1.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 18)(39, "button", 19);
    \u0275\u0275listener("click", function InvoiceEditComponent_Conditional_3_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, InvoiceEditComponent_Conditional_3_Conditional_41_Template, 2, 1, "button", 20);
    \u0275\u0275elementStart(42, "a", 21);
    \u0275\u0275text(43, "Cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(16, _c0, ctx_r1.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Edit invoice ", ctx_r1.invoiceNumber, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.clientName, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.customized() ? 8 : 9);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.items);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(26, 11, ctx_r1.total(), ctx_r1.currency, "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.issueDate);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.notes);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.canSave);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "Saving\u2026" : "Save invoice");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.customized() ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(18, _c0, ctx_r1.id));
  }
}
var InvoiceEditComponent = class _InvoiceEditComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.data = inject(BookingDataService);
    this.auth = inject(BookingsAuthService);
    this.toast = inject(ToastService);
    this.loading = signal(true);
    this.saving = signal(false);
    this.notFound = signal(false);
    this.customized = signal(false);
    this.id = "";
    this.invoiceNumber = "";
    this.clientName = "";
    this.currency = "EUR";
    this.items = [];
    this.notes = "";
    this.issueDate = "";
    this.total = computed(() => this.items.reduce((s, i) => s + (Number(i.amount) || 0), 0));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.auth.initialize();
      this.id = this.route.snapshot.paramMap.get("id") ?? "";
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
      this.items = (inv.line_items ?? []).map((i) => ({ description: i.description, amount: Number(i.amount) }));
      this.notes = inv.notes ?? "";
      this.issueDate = inv.issue_date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const ref = data.booking?.booking_ref ?? "";
      const prefix = (det.invoice_prefix || "INV").toUpperCase();
      const dash = ref.indexOf("-");
      this.invoiceNumber = dash >= 0 ? `${prefix}-${ref.slice(dash + 1)}` : `${prefix}-${ref}`;
      if (this.items.length === 0)
        this.addItem();
      this.loading.set(false);
    });
  }
  addItem() {
    this.items = [...this.items, { description: "", amount: 0 }];
  }
  removeItem(i) {
    this.items = this.items.filter((_, idx) => idx !== i);
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
        const items = this.items.map((i) => ({ description: i.description.trim(), amount: Number(i.amount) || 0 }));
        const res = yield this.data.saveInvoice(org, this.id, {
          lineItems: items,
          notes: this.notes.trim() || null,
          issueDate: this.issueDate || null
        });
        if (res.error) {
          this.toast.error("Could not save the invoice.");
          return;
        }
        this.toast.success("Invoice saved");
        this.router.navigate(["/bookings", this.id]);
      } finally {
        this.saving.set(false);
      }
    });
  }
  resetToBooking() {
    return __async(this, null, function* () {
      if (!confirm("Discard your edits and revert this invoice to the booking details?"))
        return;
      this.saving.set(true);
      try {
        yield this.data.resetInvoice(this.id);
        this.toast.info("Invoice reset to the booking");
        this.router.navigate(["/bookings", this.id]);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvoiceEditComponent, selectors: [["app-invoice-edit"]], decls: 4, vars: 1, consts: [[1, "page"], [1, "muted"], ["routerLink", "/bookings/invoices", 1, "btn", "btn--ghost"], [1, "page__head"], [1, "back", 3, "routerLink"], [1, "page__title"], [1, "page__sub"], [1, "btn", "btn--ghost", 3, "click"], [1, "card"], [1, "card__h"], [1, "hint"], [1, "item"], [1, "link-btn", 3, "click"], [1, "total-row"], [1, "field"], ["type", "date", 3, "ngModelChange", "ngModel"], [1, "opt"], ["rows", "2", "placeholder", "Anything specific the client asked for on this invoice", 3, "ngModelChange", "ngModel"], [1, "actions"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "btn", "btn--ghost", 3, "disabled"], [1, "btn", "btn--ghost", 3, "routerLink"], [1, "tag"], ["rows", "2", "placeholder", "Description (e.g. Drone Pilot Filming \u2014 2 hours)", 1, "item__desc", 3, "ngModelChange", "ngModel"], ["type", "number", "step", "0.01", "placeholder", "0.00", 1, "item__amt", 3, "ngModelChange", "ngModel"], ["title", "Remove", 1, "item__del", 3, "click", "disabled"], [1, "btn", "btn--ghost", 3, "click", "disabled"]], template: function InvoiceEditComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, InvoiceEditComponent_Conditional_1_Template, 2, 0, "p", 1)(2, InvoiceEditComponent_Conditional_2_Template, 4, 0)(3, InvoiceEditComponent_Conditional_3_Template, 44, 20);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 1 : ctx.notFound() ? 2 : 3);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel, CurrencyPipe, RouterLink], styles: [`

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
  font-size: 12.5px;
  color: #F4A922;
  text-decoration: none;
  font-weight: 600;
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
//# sourceMappingURL=chunk-CUJUIVUY.js.map
