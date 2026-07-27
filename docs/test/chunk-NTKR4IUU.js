import {
  ModalComponent
} from "./chunk-2PKC7M3P.js";
import {
  BookingDataService
} from "./chunk-74TTJQQS.js";
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
  RequiredValidator
} from "./chunk-3H6OUIAT.js";
import {
  effect,
  inject,
  input,
  model,
  output,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-EBVVQ6Y2.js";
import {
  __async,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/ui/client-editor/client-editor.component.ts
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientEditorComponent, selectors: [["app-client-editor"]], inputs: { open: [1, "open"], client: [1, "client"] }, outputs: { open: "openChange", saved: "saved" }, decls: 42, vars: 11, consts: [[3, "openChange", "open", "title"], [1, "editor-sub"], [1, "field"], [1, "req"], ["name", "name", "placeholder", "Client or company name", "required", "", 3, "ngModelChange", "ngModel"], [1, "row2"], ["type", "email", "name", "email", "placeholder", "name@email.com", 3, "ngModelChange", "ngModel"], ["name", "phone", "placeholder", "+356 \u2026", 3, "ngModelChange", "ngModel"], ["name", "company", "placeholder", "Registered business name", 3, "ngModelChange", "ngModel"], ["name", "vat", "placeholder", "MT\u2026", 3, "ngModelChange", "ngModel"], ["name", "addr", "rows", "2", "placeholder", "Street, city, country", 3, "ngModelChange", "ngModel"], [1, "opt"], ["name", "notes", "rows", "2", "placeholder", "Anything worth remembering", 3, "ngModelChange", "ngModel"], [1, "actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function ClientEditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-modal", 0);
        \u0275\u0275twoWayListener("openChange", function ClientEditorComponent_Template_app_modal_openChange_0_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.open, $event) || (ctx.open = $event);
          return $event;
        });
        \u0275\u0275elementStart(1, "p", 1);
        \u0275\u0275text(2, "Billing details are optional \u2014 fill them in for VAT-ready invoices.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 2)(4, "label");
        \u0275\u0275text(5, "Name ");
        \u0275\u0275elementStart(6, "span", 3);
        \u0275\u0275text(7, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.draft.name, $event) || (ctx.draft.name = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 5)(10, "div", 2)(11, "label");
        \u0275\u0275text(12, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.draft.email, $event) || (ctx.draft.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 2)(15, "label");
        \u0275\u0275text(16, "Phone");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.draft.phone, $event) || (ctx.draft.phone = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(18, "div", 5)(19, "div", 2)(20, "label");
        \u0275\u0275text(21, "Company");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Template_input_ngModelChange_22_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.draft.company, $event) || (ctx.draft.company = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div", 2)(24, "label");
        \u0275\u0275text(25, "VAT number");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Template_input_ngModelChange_26_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.draft.vat_number, $event) || (ctx.draft.vat_number = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "div", 2)(28, "label");
        \u0275\u0275text(29, "Billing address");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "textarea", 10);
        \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Template_textarea_ngModelChange_30_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.draft.billing_address, $event) || (ctx.draft.billing_address = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "div", 2)(32, "label");
        \u0275\u0275text(33, "Notes ");
        \u0275\u0275elementStart(34, "span", 11);
        \u0275\u0275text(35, "(internal)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "textarea", 12);
        \u0275\u0275twoWayListener("ngModelChange", function ClientEditorComponent_Template_textarea_ngModelChange_36_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.draft.notes, $event) || (ctx.draft.notes = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 13)(38, "button", 14);
        \u0275\u0275listener("click", function ClientEditorComponent_Template_button_click_38_listener() {
          return ctx.close();
        });
        \u0275\u0275text(39, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "button", 15);
        \u0275\u0275listener("click", function ClientEditorComponent_Template_button_click_40_listener() {
          return ctx.save();
        });
        \u0275\u0275text(41);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275twoWayProperty("open", ctx.open);
        \u0275\u0275property("title", ctx.draft.id ? "Edit client" : "New client");
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.draft.name);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.draft.email);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.draft.phone);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.draft.company);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.draft.vat_number);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.draft.billing_address);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.draft.notes);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", !ctx.canSave);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Saving\u2026" : ctx.draft.id ? "Save changes" : "Add client", " ");
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel, ModalComponent], styles: ['\n\n.editor-sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #475569;\n  margin: 0 0 18px;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  margin-bottom: 14px;\n}\n.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #475569;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 14px;\n  color: #0f172a;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 9px 12px;\n  background: #ffffff;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #F4A922;\n}\n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.row2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n@media (max-width: 560px) {\n  .row2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.opt[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-weight: 400;\n}\n.req[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 22px;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 9px 18px;\n  border-radius: 8px;\n  font-size: 13.5px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  border: 1.5px solid transparent;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #F4A922;\n  border-color: #F4A922;\n  color: #000;\n}\n.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  filter: brightness(0.92);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-color: #e2e8f0;\n  color: #475569;\n}\n.btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #94a3b8;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n/*# sourceMappingURL=client-editor.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientEditorComponent, { className: "ClientEditorComponent", filePath: "src/app/booking/ui/client-editor/client-editor.component.ts", lineNumber: 28 });
})();

export {
  ClientEditorComponent
};
//# sourceMappingURL=chunk-NTKR4IUU.js.map
