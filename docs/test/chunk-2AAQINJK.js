import {
  ToastService
} from "./chunk-WE6LBMFD.js";
import {
  BookingDataService
} from "./chunk-YN35FWKD.js";
import {
  BookingsAuthService
} from "./chunk-MQ25DMRF.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  RequiredValidator
} from "./chunk-RYL5JWPP.js";
import {
  effect,
  inject,
  input,
  model,
  output,
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
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-YX7TN7IZ.js";
import {
  __async,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/ui/client-editor/client-editor.component.ts
function ClientEditorComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function ClientEditorComponent_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function ClientEditorComponent_Conditional_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "h2", 3);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 4);
    \u0275\u0275text(5, "Billing details are optional \u2014 fill them in for VAT-ready invoices.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 5)(7, "label");
    \u0275\u0275text(8, "Name ");
    \u0275\u0275elementStart(9, "span", 6);
    \u0275\u0275text(10, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Conditional_0_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.name, $event) || (ctx_r1.draft.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 8)(13, "div", 5)(14, "label");
    \u0275\u0275text(15, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Conditional_0_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.email, $event) || (ctx_r1.draft.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 5)(18, "label");
    \u0275\u0275text(19, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Conditional_0_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.phone, $event) || (ctx_r1.draft.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 8)(22, "div", 5)(23, "label");
    \u0275\u0275text(24, "Company");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Conditional_0_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.company, $event) || (ctx_r1.draft.company = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 5)(27, "label");
    \u0275\u0275text(28, "VAT number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Conditional_0_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.vat_number, $event) || (ctx_r1.draft.vat_number = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 5)(31, "label");
    \u0275\u0275text(32, "Billing address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "textarea", 13);
    \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Conditional_0_Template_textarea_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.billing_address, $event) || (ctx_r1.draft.billing_address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 5)(35, "label");
    \u0275\u0275text(36, "Notes ");
    \u0275\u0275elementStart(37, "span", 14);
    \u0275\u0275text(38, "(internal)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "textarea", 15);
    \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Conditional_0_Template_textarea_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.notes, $event) || (ctx_r1.draft.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 16)(41, "button", 17);
    \u0275\u0275listener("click", function ClientEditorComponent_Conditional_0_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275text(42, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 18);
    \u0275\u0275listener("click", function ClientEditorComponent_Conditional_0_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.draft.id ? "Edit client" : "New client");
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.name);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.phone);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.company);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.vat_number);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.billing_address);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.notes);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.canSave);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Saving\u2026" : ctx_r1.draft.id ? "Save changes" : "Add client", " ");
  }
}
var EMPTY = { name: "", email: "", phone: "", company: "", vat_number: "", billing_address: "", notes: "" };
var ClientEditorComponent = class _ClientEditorComponent {
  constructor() {
    this.data = inject(BookingDataService);
    this.auth = inject(BookingsAuthService);
    this.toast = inject(ToastService);
    this.open = model(false);
    this.client = input(null);
    this.saved = output();
    this.saving = signal(false);
    this.draft = __spreadValues({}, EMPTY);
    effect(() => {
      if (!this.open())
        return;
      const c = this.client();
      this.draft = c ? {
        id: c.id,
        name: c.name,
        email: c.email ?? "",
        phone: c.phone ?? "",
        company: c.company ?? "",
        vat_number: c.vat_number ?? "",
        billing_address: c.billing_address ?? "",
        notes: c.notes ?? ""
      } : __spreadValues({}, EMPTY);
    });
  }
  get canSave() {
    return this.draft.name.trim().length > 0 && !this.saving();
  }
  close() {
    this.open.set(false);
  }
  save() {
    return __async(this, null, function* () {
      if (!this.canSave)
        return;
      const org = this.auth.orgId();
      if (!org) {
        this.toast.error("No organization context.");
        return;
      }
      this.saving.set(true);
      try {
        const res = yield this.data.saveClient(org, __spreadValues({}, this.draft));
        if (res.error || !res.client) {
          this.toast.error("Could not save the client.");
          return;
        }
        this.toast.success(this.draft.id ? "Client updated" : "Client added");
        this.saved.emit(res.client);
        this.open.set(false);
      } finally {
        this.saving.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function ClientEditorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ClientEditorComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientEditorComponent, selectors: [["app-client-editor"]], inputs: { open: [1, "open"], client: [1, "client"] }, outputs: { open: "openChange", saved: "saved" }, decls: 1, vars: 1, consts: [[1, "modal-overlay"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal__title"], [1, "modal__sub"], [1, "field"], [1, "req"], ["name", "name", "placeholder", "Client or company name", "required", "", 3, "ngModelChange", "ngModel"], [1, "row2"], ["type", "email", "name", "email", "placeholder", "name@email.com", 3, "ngModelChange", "ngModel"], ["name", "phone", "placeholder", "+356 \u2026", 3, "ngModelChange", "ngModel"], ["name", "company", "placeholder", "Registered business name", 3, "ngModelChange", "ngModel"], ["name", "vat", "placeholder", "MT\u2026", 3, "ngModelChange", "ngModel"], ["name", "addr", "rows", "2", "placeholder", "Street, city, country", 3, "ngModelChange", "ngModel"], [1, "opt"], ["name", "notes", "rows", "2", "placeholder", "Anything worth remembering", 3, "ngModelChange", "ngModel"], [1, "modal__actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function ClientEditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ClientEditorComponent_Conditional_0_Template, 45, 10, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.open() ? 0 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel], styles: ['\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(15, 23, 42, 0.45);\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 6vh 20px;\n  overflow-y: auto;\n}\n.modal[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.25);\n  width: 100%;\n  max-width: 520px;\n  padding: 24px;\n}\n.modal__title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: #0f172a;\n  margin: 0 0 4px;\n}\n.modal__sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #475569;\n  margin: 0 0 18px;\n}\n.modal__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 22px;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  margin-bottom: 14px;\n}\n.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #475569;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 14px;\n  color: #0f172a;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 9px 12px;\n  background: #ffffff;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #F4A922;\n}\n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.row2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n@media (max-width: 560px) {\n  .row2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.opt[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-weight: 400;\n}\n.req[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 9px 18px;\n  border-radius: 8px;\n  font-size: 13.5px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  border: 1.5px solid transparent;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #F4A922;\n  border-color: #F4A922;\n  color: #000;\n}\n.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  filter: brightness(0.92);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-color: #e2e8f0;\n  color: #475569;\n}\n.btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #94a3b8;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n/*# sourceMappingURL=client-editor.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientEditorComponent, { className: "ClientEditorComponent", filePath: "src/app/booking/ui/client-editor/client-editor.component.ts", lineNumber: 27 });
})();

export {
  ClientEditorComponent
};
//# sourceMappingURL=chunk-2AAQINJK.js.map
