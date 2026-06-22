import {
  ConfirmService
} from "./chunk-4LW3H3NR.js";
import {
  BookingAdminService
} from "./chunk-55EK3O4Z.js";
import {
  ToastService
} from "./chunk-CXTVWK53.js";
import {
  BookingsAuthService
} from "./chunk-6YU6B7KO.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-Q47RVXSA.js";
import "./chunk-Y4O5MVSK.js";
import "./chunk-GQ3SG4V7.js";
import {
  inject,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-P56CFEJA.js";
import {
  __async
} from "./chunk-TWWAJFRB.js";

// src/app/booking/platform/staff/staff-admin.component.ts
var _forTrack0 = ($index, $item) => $item.serviceId;
var _forTrack1 = ($index, $item) => $item.id;
function StaffAdminComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function StaffAdminComponent_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addStaff());
    });
    \u0275\u0275text(1, "+ Add worker");
    \u0275\u0275elementEnd();
  }
}
function StaffAdminComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "label", 7)(2, "span");
    \u0275\u0275text(3, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 8);
    \u0275\u0275twoWayListener("ngModelChange", function StaffAdminComponent_Conditional_8_Template_input_ngModelChange_4_listener($event) {
      const f_r4 = \u0275\u0275restoreView(_r3);
      \u0275\u0275twoWayBindingSet(f_r4.name, $event) || (f_r4.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "label", 7)(6, "span");
    \u0275\u0275text(7, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function StaffAdminComponent_Conditional_8_Template_input_ngModelChange_8_listener($event) {
      const f_r4 = \u0275\u0275restoreView(_r3);
      \u0275\u0275twoWayBindingSet(f_r4.email, $event) || (f_r4.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "label", 10)(10, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function StaffAdminComponent_Conditional_8_Template_input_ngModelChange_10_listener($event) {
      const f_r4 = \u0275\u0275restoreView(_r3);
      \u0275\u0275twoWayBindingSet(f_r4.is_bookable, $event) || (f_r4.is_bookable = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Bookable (shown to clients)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 12)(13, "button", 13);
    \u0275\u0275listener("click", function StaffAdminComponent_Conditional_8_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveStaff());
    });
    \u0275\u0275text(14, "Save");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 14);
    \u0275\u0275listener("click", function StaffAdminComponent_Conditional_8_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelStaff());
    });
    \u0275\u0275text(16, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const f_r4 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", f_r4.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", f_r4.email);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", f_r4.is_bookable);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !f_r4.name.trim());
  }
}
function StaffAdminComponent_Conditional_9_Conditional_0_For_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "span");
    \u0275\u0275text(2, "from");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function StaffAdminComponent_Conditional_9_Conditional_0_For_8_Conditional_4_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const r_r7 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(r_r7.start, $event) || (r_r7.start = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "to");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function StaffAdminComponent_Conditional_9_Conditional_0_For_8_Conditional_4_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r8);
      const r_r7 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(r_r7.end, $event) || (r_r7.end = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "(0\u201324)");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", r_r7.start);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", r_r7.end);
  }
}
function StaffAdminComponent_Conditional_9_Conditional_0_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "label", 20)(2, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function StaffAdminComponent_Conditional_9_Conditional_0_For_8_Template_input_ngModelChange_2_listener($event) {
      const r_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275twoWayBindingSet(r_r7.assigned, $event) || (r_r7.assigned = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, StaffAdminComponent_Conditional_9_Conditional_0_For_8_Conditional_4_Template, 9, 2, "div", 21);
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function StaffAdminComponent_Conditional_9_Conditional_0_For_8_Template_button_click_5_listener() {
      const r_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.saveRow(r_r7));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", r_r7.assigned);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r7.name, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r7.assigned ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.savingRow() === r_r7.serviceId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingRow() === r_r7.serviceId ? "\u2026" : "Save", " ");
  }
}
function StaffAdminComponent_Conditional_9_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1, "Create a service first (Services tab).");
    \u0275\u0275elementEnd();
  }
}
function StaffAdminComponent_Conditional_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function StaffAdminComponent_Conditional_9_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeManage());
    });
    \u0275\u0275text(1, "\u2039 Back to staff");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 15);
    \u0275\u0275text(5, "One shared calendar: a booking for any service blocks that time for all of them.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 18);
    \u0275\u0275repeaterCreate(7, StaffAdminComponent_Conditional_9_Conditional_0_For_8_Template, 7, 5, "div", 19, _forTrack0);
    \u0275\u0275template(9, StaffAdminComponent_Conditional_9_Conditional_0_Conditional_9_Template, 2, 0, "p", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.name, " \u2014 services & hours");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.rows());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.rows().length === 0 ? 9 : -1);
  }
}
function StaffAdminComponent_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function StaffAdminComponent_Conditional_9_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1, "No workers yet.");
    \u0275\u0275elementEnd();
  }
}
function StaffAdminComponent_Conditional_9_Conditional_2_For_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "not bookable");
    \u0275\u0275elementEnd();
  }
}
function StaffAdminComponent_Conditional_9_Conditional_2_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26)(2, "div", 27);
    \u0275\u0275text(3);
    \u0275\u0275template(4, StaffAdminComponent_Conditional_9_Conditional_2_For_3_Conditional_4_Template, 2, 0, "span", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 30)(8, "button", 31);
    \u0275\u0275listener("click", function StaffAdminComponent_Conditional_9_Conditional_2_For_3_Template_button_click_8_listener() {
      const s_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.manageServices(s_r10));
    });
    \u0275\u0275text(9, "Services & hours");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 31);
    \u0275\u0275listener("click", function StaffAdminComponent_Conditional_9_Conditional_2_For_3_Template_button_click_10_listener() {
      const s_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editStaff(s_r10));
    });
    \u0275\u0275text(11, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 32);
    \u0275\u0275listener("click", function StaffAdminComponent_Conditional_9_Conditional_2_For_3_Template_button_click_12_listener() {
      const s_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeStaff(s_r10));
    });
    \u0275\u0275text(13, "Remove");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("item--off", !s_r10.is_bookable);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", s_r10.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!s_r10.is_bookable ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.servicesFor(s_r10.id).join(" \xB7 ") || "No services assigned");
  }
}
function StaffAdminComponent_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, StaffAdminComponent_Conditional_9_Conditional_2_Conditional_0_Template, 2, 0, "p", 15);
    \u0275\u0275elementStart(1, "div", 18);
    \u0275\u0275repeaterCreate(2, StaffAdminComponent_Conditional_9_Conditional_2_For_3_Template, 14, 5, "div", 24, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.staff().length === 0 ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.staff());
  }
}
function StaffAdminComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, StaffAdminComponent_Conditional_9_Conditional_0_Template, 10, 2)(1, StaffAdminComponent_Conditional_9_Conditional_1_Template, 2, 0, "p", 15)(2, StaffAdminComponent_Conditional_9_Conditional_2_Template, 4, 1);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.managing()) ? 0 : ctx_r1.loading() ? 1 : 2, tmp_1_0);
  }
}
var StaffAdminComponent = class _StaffAdminComponent {
  constructor() {
    this.admin = inject(BookingAdminService);
    this.auth = inject(BookingsAuthService);
    this.toast = inject(ToastService);
    this.confirm = inject(ConfirmService);
    this.staff = signal([]);
    this.services = signal([]);
    this.assignments = [];
    this.loading = signal(true);
    this.editingStaff = signal(null);
    this.managing = signal(null);
    this.rows = signal([]);
    this.savingRow = signal(null);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.auth.initialize();
      yield this.reload();
    });
  }
  reload() {
    return __async(this, null, function* () {
      const org = this.auth.orgId();
      if (org) {
        const [st, sv, asg] = yield Promise.all([this.admin.listStaff(org), this.admin.listServices(org), this.admin.listStaffServices()]);
        this.staff.set(st);
        this.services.set(sv);
        this.assignments = asg;
      }
      this.loading.set(false);
    });
  }
  servicesFor(staffId) {
    const ids = this.assignments.filter((a) => a.staff_id === staffId).map((a) => a.service_id);
    return this.services().filter((s) => ids.includes(s.id)).map((s) => s.name);
  }
  // ── Staff add/edit ────────────────────────────────────────────────
  addStaff() {
    this.editingStaff.set({ name: "", email: "", is_bookable: true });
  }
  editStaff(s) {
    this.editingStaff.set({ id: s.id, name: s.name, email: s.email ?? "", is_bookable: s.is_bookable });
  }
  cancelStaff() {
    this.editingStaff.set(null);
  }
  saveStaff() {
    return __async(this, null, function* () {
      const f = this.editingStaff();
      const org = this.auth.orgId();
      if (!f || !f.name.trim() || !org)
        return;
      const isNew = !f.id;
      try {
        yield this.admin.saveStaff(org, { id: f.id, name: f.name.trim(), email: f.email.trim() || null, is_bookable: f.is_bookable });
        this.editingStaff.set(null);
        yield this.reload();
        this.toast.success(`Worker "${f.name.trim()}" ${isNew ? "added" : "updated"}`);
      } catch {
        this.toast.error("Could not save the worker. Please try again.");
      }
    });
  }
  removeStaff(s) {
    return __async(this, null, function* () {
      if (!(yield this.confirm.ask({ title: "Remove worker", message: `Remove worker "${s.name}"?`, confirmLabel: "Remove", danger: true })))
        return;
      try {
        yield this.admin.deleteStaff(s.id);
        yield this.reload();
        this.toast.success(`Worker "${s.name}" removed`);
      } catch {
        this.toast.error("Could not remove the worker.");
      }
    });
  }
  // ── Service assignment + schedule ─────────────────────────────────
  manageServices(s) {
    this.managing.set(s);
    this.rows.set(this.services().map((svc) => {
      const a = this.assignments.find((x) => x.staff_id === s.id && x.service_id === svc.id);
      const range = a?.working_hours?.default?.[0];
      return { serviceId: svc.id, name: svc.name, assigned: !!a, start: range?.start ?? 9, end: range?.end ?? 17 };
    }));
  }
  closeManage() {
    this.managing.set(null);
  }
  saveRow(r) {
    return __async(this, null, function* () {
      const s = this.managing();
      if (!s)
        return;
      this.savingRow.set(r.serviceId);
      try {
        if (r.assigned)
          yield this.admin.assignService(s.id, r.serviceId, { default: [{ start: Number(r.start), end: Number(r.end) }] });
        else
          yield this.admin.unassignService(s.id, r.serviceId);
        yield this.reload();
        this.toast.success(`${r.name} ${r.assigned ? "assigned to" : "removed from"} ${s.name}`);
      } catch {
        this.toast.error("Could not update the assignment.");
      } finally {
        this.savingRow.set(null);
      }
    });
  }
  static {
    this.\u0275fac = function StaffAdminComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StaffAdminComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StaffAdminComponent, selectors: [["app-staff-admin"]], decls: 10, vars: 2, consts: [[1, "page"], [1, "page__head"], [1, "page__title"], [1, "page__sub"], [1, "btn", "btn--primary"], [1, "card", "editor"], [1, "btn", "btn--primary", 3, "click"], [1, "field"], ["type", "text", "placeholder", "Worker name", 3, "ngModelChange", "ngModel"], ["type", "email", "placeholder", "optional", 3, "ngModelChange", "ngModel"], [1, "check"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "editor__actions"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "btn", "btn--ghost", 3, "click"], [1, "muted"], [1, "back", 3, "click"], [1, "sub-h"], [1, "list"], [1, "svc"], [1, "svc__toggle"], [1, "svc__hours"], [1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"], ["type", "number", "min", "0", "max", "24", 3, "ngModelChange", "ngModel"], [1, "item", 3, "item--off"], [1, "item"], [1, "item__main"], [1, "item__name"], [1, "tag"], [1, "item__meta"], [1, "item__actions"], [1, "link-btn", 3, "click"], [1, "link-btn", "link-btn--danger", 3, "click"]], template: function StaffAdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Staff");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Your workers, the services they do, and their hours.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, StaffAdminComponent_Conditional_7_Template, 2, 0, "button", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, StaffAdminComponent_Conditional_8_Template, 17, 4, "div", 5)(9, StaffAdminComponent_Conditional_9_Template, 3, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_1_0;
        \u0275\u0275advance(7);
        \u0275\u0275conditional(!ctx.editingStaff() && !ctx.managing() ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_1_0 = ctx.editingStaff()) ? 8 : 9, tmp_1_0);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: [`

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
.sub-h[_ngcontent-%COMP%] {
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  margin: 6px 0 4px;
}
.back[_ngcontent-%COMP%] {
  background: none;
  border: none;
  color: #475569;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0 0 10px;
}
.back[_ngcontent-%COMP%]:hover {
  color: #0f172a;
}
.editor[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.editor__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}
.svc[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;
}
.svc__toggle[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14.5px;
  font-weight: 600;
  color: #0f172a;
  min-width: 180px;
}
.svc__hours[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #475569;
}
.svc__hours[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 56px;
  padding: 7px 9px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13.5px;
}
.svc[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
  margin-left: auto;
}
/*# sourceMappingURL=staff-admin.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StaffAdminComponent, { className: "StaffAdminComponent", filePath: "src/app/booking/platform/staff/staff-admin.component.ts", lineNumber: 18 });
})();
export {
  StaffAdminComponent
};
//# sourceMappingURL=chunk-4VKLZRYQ.js.map
