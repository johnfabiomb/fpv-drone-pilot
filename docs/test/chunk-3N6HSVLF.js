import {
  CdkMenu,
  CdkMenuItem,
  CdkMenuTrigger
} from "./chunk-SWOOOGPT.js";
import "./chunk-6P2DGWSJ.js";
import {
  BookingAdminService
} from "./chunk-55EK3O4Z.js";
import {
  BookingDataService
} from "./chunk-L5B7Y5IS.js";
import "./chunk-476WSH3G.js";
import {
  ToastService
} from "./chunk-CXTVWK53.js";
import {
  BookingsAuthService
} from "./chunk-6YU6B7KO.js";
import "./chunk-Y4O5MVSK.js";
import {
  RouterLink
} from "./chunk-E53NQKQB.js";
import "./chunk-DNKJKTBS.js";
import "./chunk-GQ3SG4V7.js";
import {
  CurrencyPipe,
  DatePipe,
  computed,
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
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-P56CFEJA.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/invoices/invoices-admin.component.ts
var _c0 = (a0) => ["/bookings/invoice-edit", a0];
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function InvoicesAdminComponent_Conditional_7_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const y_r3 = ctx.$implicit;
    \u0275\u0275property("value", y_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(y_r3);
  }
}
function InvoicesAdminComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "select", 7);
    \u0275\u0275listener("change", function InvoicesAdminComponent_Conditional_7_Template_select_change_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.year.set($event.target.value));
    });
    \u0275\u0275elementStart(2, "option", 8);
    \u0275\u0275text(3, "All years");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, InvoicesAdminComponent_Conditional_7_For_5_Template, 2, 2, "option", 9, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 10);
    \u0275\u0275listener("click", function InvoicesAdminComponent_Conditional_7_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportCsv());
    });
    \u0275\u0275text(7, "Export CSV");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.year());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.years());
  }
}
function InvoicesAdminComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function InvoicesAdminComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "No invoices yet. Confirmed bookings will appear here.");
    \u0275\u0275elementEnd();
  }
}
function InvoicesAdminComponent_Conditional_10_For_26_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.counts()[t_r5.key]);
  }
}
function InvoicesAdminComponent_Conditional_10_For_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function InvoicesAdminComponent_Conditional_10_For_26_Template_button_click_0_listener() {
      const t_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.tab.set(t_r5.key));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, InvoicesAdminComponent_Conditional_10_For_26_Conditional_3_Template, 2, 1, "span", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("tab--active", ctx_r1.tab() === t_r5.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r5.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.counts()[t_r5.key] ? 3 : -1);
  }
}
function InvoicesAdminComponent_Conditional_10_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "No invoices match this filter.");
    \u0275\u0275elementEnd();
  }
}
function InvoicesAdminComponent_Conditional_10_Conditional_28_For_18_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "a", 36);
    \u0275\u0275text(2, "Edit invoice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 37);
    \u0275\u0275listener("click", function InvoicesAdminComponent_Conditional_10_Conditional_28_For_18_ng_template_26_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r8);
      const b_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.open(b_r7));
    });
    \u0275\u0275text(4, "View / print");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 37);
    \u0275\u0275listener("click", function InvoicesAdminComponent_Conditional_10_Conditional_28_For_18_ng_template_26_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const b_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.copyShareLink(b_r7));
    });
    \u0275\u0275text(6, "Copy share link");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, b_r7.id));
  }
}
function InvoicesAdminComponent_Conditional_10_Conditional_28_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("click", function InvoicesAdminComponent_Conditional_10_Conditional_28_For_18_Template_div_click_0_listener() {
      const b_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.open(b_r7));
    });
    \u0275\u0275elementStart(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 27);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 23);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 23);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 23);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span")(18, "span", 28);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 29)(21, "button", 30);
    \u0275\u0275listener("click", function InvoicesAdminComponent_Conditional_10_Conditional_28_For_18_Template_button_click_21_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(22, "svg", 31);
    \u0275\u0275element(23, "circle", 32)(24, "circle", 33)(25, "circle", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(26, InvoicesAdminComponent_Conditional_10_Conditional_28_For_18_ng_template_26_Template, 7, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const b_r7 = ctx.$implicit;
    const rowMenu_r9 = \u0275\u0275reference(27);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.invoiceNo(b_r7.booking_ref));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 16, b_r7.start_at, "d MMM y"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_15_0 = b_r7.client_name) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(10, 19, b_r7.price_total, ctx_r1.currency(), "symbol", "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(13, 24, b_r7.total_paid, ctx_r1.currency(), "symbol", "1.0-2"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("due", ctx_r1.balance(b_r7) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(16, 29, ctx_r1.balance(b_r7), ctx_r1.currency(), "symbol", "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275classProp("badge--paid", ctx_r1.invStatus(b_r7) === "paid")("badge--partial", ctx_r1.invStatus(b_r7) === "partial")("badge--unpaid", ctx_r1.invStatus(b_r7) === "unpaid");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(b_r7));
    \u0275\u0275advance(2);
    \u0275\u0275property("cdkMenuTriggerFor", rowMenu_r9);
  }
}
function InvoicesAdminComponent_Conditional_10_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 22)(2, "span");
    \u0275\u0275text(3, "Invoice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 23);
    \u0275\u0275text(9, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 23);
    \u0275\u0275text(11, "Paid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 23);
    \u0275\u0275text(13, "Balance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(17, InvoicesAdminComponent_Conditional_10_Conditional_28_For_18_Template, 28, 34, "div", 24, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r1.filtered());
  }
}
function InvoicesAdminComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "span", 13);
    \u0275\u0275text(3, "Invoices");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 12)(7, "span", 13);
    \u0275\u0275text(8, "Billed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 14);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 12)(13, "span", 13);
    \u0275\u0275text(14, "Collected");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 15);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 12)(19, "span", 13);
    \u0275\u0275text(20, "Outstanding");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 16);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 17);
    \u0275\u0275repeaterCreate(25, InvoicesAdminComponent_Conditional_10_For_26_Template, 4, 4, "button", 18, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, InvoicesAdminComponent_Conditional_10_Conditional_27_Template, 2, 0, "p", 6)(28, InvoicesAdminComponent_Conditional_10_Conditional_28_Template, 19, 0, "div", 19);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.counts().all);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(11, 5, ctx_r1.totalBilled(), ctx_r1.currency(), "symbol", "1.0-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(17, 10, ctx_r1.totalPaid(), ctx_r1.currency(), "symbol", "1.0-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(23, 15, ctx_r1.outstanding(), ctx_r1.currency(), "symbol", "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.tabs);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.filtered().length === 0 ? 27 : 28);
  }
}
var STATUS_LABEL = {
  unpaid: "Unpaid",
  partial: "Partial",
  paid: "Paid"
};
var InvoicesAdminComponent = class _InvoicesAdminComponent {
  constructor() {
    this.data = inject(BookingDataService);
    this.admin = inject(BookingAdminService);
    this.auth = inject(BookingsAuthService);
    this.toast = inject(ToastService);
    this.prefix = signal("INV");
    this.currency = signal("EUR");
    this.INVOICED = ["booked", "in_progress", "done"];
    this.invoices = computed(() => this.data.bookings().filter((b) => this.INVOICED.includes(b.status) && !b.is_external));
    this.year = signal("all");
    this.years = computed(() => {
      const ys = /* @__PURE__ */ new Set();
      for (const b of this.invoices())
        ys.add(new Date(b.start_at).getFullYear().toString());
      return [...ys].sort((a, b) => b.localeCompare(a));
    });
    this.yearScoped = computed(() => {
      const y = this.year();
      return y === "all" ? this.invoices() : this.invoices().filter((b) => new Date(b.start_at).getFullYear().toString() === y);
    });
    this.tabs = [
      { key: "all", label: "All" },
      { key: "unpaid", label: "Unpaid" },
      { key: "partial", label: "Partially paid" },
      { key: "paid", label: "Paid" }
    ];
    this.tab = signal("all");
    this.counts = computed(() => {
      const c = { all: 0, unpaid: 0, partial: 0, paid: 0 };
      for (const b of this.yearScoped()) {
        c.all++;
        c[this.invStatus(b)]++;
      }
      return c;
    });
    this.filtered = computed(() => {
      const t = this.tab();
      const list = t === "all" ? this.yearScoped() : this.yearScoped().filter((b) => this.invStatus(b) === t);
      return [...list].sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime());
    });
    this.totalBilled = computed(() => this.yearScoped().reduce((s, b) => s + b.price_total, 0));
    this.totalPaid = computed(() => this.yearScoped().reduce((s, b) => s + b.total_paid, 0));
    this.outstanding = computed(() => Math.max(0, this.totalBilled() - this.totalPaid()));
  }
  /** Paid / partial / unpaid for a single invoice. */
  invStatus(b) {
    if (b.price_total > 0 && b.total_paid >= b.price_total - 5e-3)
      return "paid";
    if (b.total_paid > 0)
      return "partial";
    return "unpaid";
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.auth.initialize();
      const org = this.auth.orgId();
      if (org) {
        const s = yield this.admin.getOrgSettings(org);
        this.prefix.set((s?.invoice_details?.invoice_prefix || "INV").toUpperCase());
        this.currency.set(s?.currency || "EUR");
      }
      if (this.data.bookings().length === 0)
        this.data.load();
    });
  }
  /** Invoice number = booking ref with the prefix swapped (BK-2026-007 → INV-2026-007). */
  invoiceNo(ref) {
    const dash = ref.indexOf("-");
    return dash >= 0 ? `${this.prefix()}-${ref.slice(dash + 1)}` : `${this.prefix()}-${ref}`;
  }
  balance(b) {
    return Math.max(0, b.price_total - b.total_paid);
  }
  statusLabel(b) {
    return STATUS_LABEL[this.invStatus(b)];
  }
  open(b) {
    window.open(`/book/invoice/${b.id}`, "_blank", "noopener");
  }
  /** Copy the client-shareable (no-login) invoice link. */
  copyShareLink(b) {
    return __async(this, null, function* () {
      const url = yield this.data.invoiceShareLink(b.id);
      if (!url) {
        this.toast.error("Could not create the invoice link.");
        return;
      }
      yield navigator.clipboard.writeText(url);
      this.toast.success("Invoice link copied \u2014 share it with your client");
    });
  }
  /** Download the visible list as CSV for the accountant. */
  exportCsv() {
    const rows = [["Invoice", "Date", "Client", "Total", "Paid", "Balance", "Status"]];
    for (const b of this.filtered()) {
      rows.push([
        this.invoiceNo(b.booking_ref),
        new Date(b.start_at).toISOString().slice(0, 10),
        (b.client_name ?? "").replace(/"/g, '""'),
        b.price_total.toFixed(2),
        b.total_paid.toFixed(2),
        this.balance(b).toFixed(2),
        b.status
      ]);
    }
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoices-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  static {
    this.\u0275fac = function InvoicesAdminComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InvoicesAdminComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvoicesAdminComponent, selectors: [["app-invoices-admin"]], decls: 11, vars: 2, consts: [["rowMenu", ""], [1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], [1, "head-tools"], [1, "muted"], [1, "year-select", 3, "change", "value"], ["value", "all"], [3, "value"], [1, "btn", "btn--ghost", 3, "click"], [1, "summary"], [1, "summary__card"], [1, "summary__label"], [1, "summary__val"], [1, "summary__val", "summary__val--ok"], [1, "summary__val", "summary__val--due"], ["role", "tablist", 1, "tabs"], ["role", "tab", 1, "tab", 3, "tab--active"], [1, "table"], ["role", "tab", 1, "tab", 3, "click"], [1, "tab__count"], [1, "row", "row--head"], [1, "num"], [1, "row"], [1, "row", 3, "click"], [1, "mono"], [1, "ellipsis"], [1, "badge"], [1, "actions"], ["aria-label", "Actions", 1, "kebab", 3, "click", "cdkMenuTriggerFor"], ["viewBox", "0 0 20 20", "width", "18", "height", "18", "fill", "currentColor"], ["cx", "10", "cy", "4", "r", "1.7"], ["cx", "10", "cy", "10", "r", "1.7"], ["cx", "10", "cy", "16", "r", "1.7"], ["cdkMenu", "", 1, "menu"], ["cdkMenuItem", "", 1, "menu__item", 3, "routerLink"], ["cdkMenuItem", "", 1, "menu__item", 3, "click"]], template: function InvoicesAdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
        \u0275\u0275text(4, "Invoices");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "Every confirmed booking is an invoice. Click one to view or print it.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, InvoicesAdminComponent_Conditional_7_Template, 8, 1, "div", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, InvoicesAdminComponent_Conditional_8_Template, 2, 0, "p", 6)(9, InvoicesAdminComponent_Conditional_9_Template, 2, 0, "p", 6)(10, InvoicesAdminComponent_Conditional_10_Template, 29, 20);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.invoices().length > 0 ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.data.loading() ? 8 : ctx.invoices().length === 0 ? 9 : 10);
      }
    }, dependencies: [DatePipe, CurrencyPipe, RouterLink, CdkMenuTrigger, CdkMenu, CdkMenuItem], styles: [`

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
.head-tools[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
}
.year-select[_ngcontent-%COMP%] {
  padding: 8px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  color: #0f172a;
  background: #ffffff;
  cursor: pointer;
}
.summary[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}
.tabs[_ngcontent-%COMP%] {
  display: inline-flex;
  gap: 2px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 4px;
}
.tab[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  border-radius: 8px;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.tab[_ngcontent-%COMP%]:hover {
  color: #0f172a;
}
.tab--active[_ngcontent-%COMP%] {
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}
.tab__count[_ngcontent-%COMP%] {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  background: #e2e8f0;
  color: #475569;
}
.tab--active[_ngcontent-%COMP%]   .tab__count[_ngcontent-%COMP%] {
  background: rgba(244, 169, 34, 0.12);
  color: #0f172a;
}
.badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}
.badge--paid[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #16a34a;
}
.badge--partial[_ngcontent-%COMP%] {
  background: #fef9c3;
  color: #a16207;
}
.badge--unpaid[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #dc2626;
}
.summary__card[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.summary__label[_ngcontent-%COMP%] {
  font-size: 11.5px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.summary__val[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
}
.summary__val--ok[_ngcontent-%COMP%] {
  color: #16a34a;
}
.summary__val--due[_ngcontent-%COMP%] {
  color: #b45309;
}
.table[_ngcontent-%COMP%] {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr 1.3fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr;
  align-items: center;
  gap: 12px;
  padding: 13px 18px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 13.5px;
  cursor: pointer;
}
.row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.row[_ngcontent-%COMP%]:hover:not(.row--head) {
  background: rgba(244, 169, 34, 0.12);
}
.row--head[_ngcontent-%COMP%] {
  cursor: default;
  background: transparent;
  font-size: 11.5px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.row--head[_ngcontent-%COMP%]:hover {
  background: transparent;
}
.num[_ngcontent-%COMP%] {
  text-align: right;
  white-space: nowrap;
}
.actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
}
.kebab[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s ease;
}
.kebab[_ngcontent-%COMP%]:hover {
  background: #f8fafc;
  color: #0f172a;
}
.kebab[aria-expanded=true][_ngcontent-%COMP%] {
  background: #f8fafc;
  color: #0f172a;
}
.menu[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  min-width: 168px;
  padding: 6px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.14);
}
.menu__item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  text-align: left;
  background: none;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: background 0.15s ease;
}
.menu__item[_ngcontent-%COMP%]:hover, 
.menu__item[_ngcontent-%COMP%]:focus-visible {
  background: #f8fafc;
  color: #0f172a;
  outline: none;
}
.mono[_ngcontent-%COMP%] {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: #0f172a;
}
.ellipsis[_ngcontent-%COMP%] {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.due[_ngcontent-%COMP%] {
  color: #b45309;
  font-weight: 600;
}
@media (max-width: 640px) {
  .row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
    gap: 4px 12px;
  }
  .row--head[_ngcontent-%COMP%] {
    display: none;
  }
  .row[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {
    text-align: left;
  }
}
/*# sourceMappingURL=invoices-admin.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvoicesAdminComponent, { className: "InvoicesAdminComponent", filePath: "src/app/booking/platform/invoices/invoices-admin.component.ts", lineNumber: 27 });
})();
export {
  InvoicesAdminComponent
};
//# sourceMappingURL=chunk-3N6HSVLF.js.map
