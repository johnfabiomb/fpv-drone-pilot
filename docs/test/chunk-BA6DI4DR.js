import {
  servicePrice
} from "./chunk-DEXNZGWM.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-Q47RVXSA.js";
import {
  CurrencyPipe,
  computed,
  input,
  model,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-P56CFEJA.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/ui/line-items-editor/line-items-editor.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function LineItemsEditorComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "textarea", 7);
    \u0275\u0275listener("ngModelChange", function LineItemsEditorComponent_For_2_Template_textarea_ngModelChange_1_listener($event) {
      const $index_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setDescription($index_r2, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 8);
    \u0275\u0275listener("ngModelChange", function LineItemsEditorComponent_For_2_Template_input_ngModelChange_2_listener($event) {
      const $index_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setAmount($index_r2, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 9);
    \u0275\u0275listener("click", function LineItemsEditorComponent_For_2_Template_button_click_3_listener() {
      const $index_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.remove($index_r2));
    });
    \u0275\u0275text(4, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", item_r4.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", item_r4.amount);
  }
}
function LineItemsEditorComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1, "No charges yet \u2014 add at least one to continue.");
    \u0275\u0275elementEnd();
  }
}
function LineItemsEditorComponent_Conditional_4_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    \u0275\u0275property("value", s_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r6.name);
  }
}
function LineItemsEditorComponent_Conditional_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "optgroup", 13);
    \u0275\u0275repeaterCreate(1, LineItemsEditorComponent_Conditional_4_Conditional_6_For_2_Template, 2, 2, "option", 16, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.services());
  }
}
function LineItemsEditorComponent_Conditional_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function LineItemsEditorComponent_Conditional_4_Conditional_7_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.pickHours, $event) || (ctx_r2.pickHours = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 19);
    \u0275\u0275text(3, "h");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 20);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.pickHours);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.pickPrice === null ? "\u2014" : \u0275\u0275pipeBind4(6, 2, ctx_r2.pickPrice, ctx_r2.currency(), "symbol", "1.0-0"));
  }
}
function LineItemsEditorComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "select", 10);
    \u0275\u0275twoWayListener("ngModelChange", function LineItemsEditorComponent_Conditional_4_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.pickId, $event) || (ctx_r2.pickId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "option", 11);
    \u0275\u0275text(3, "What are you charging?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "option", 12);
    \u0275\u0275text(5, "Custom charge");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, LineItemsEditorComponent_Conditional_4_Conditional_6_Template, 3, 0, "optgroup", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, LineItemsEditorComponent_Conditional_4_Conditional_7_Template, 7, 7);
    \u0275\u0275elementStart(8, "button", 14);
    \u0275\u0275listener("click", function LineItemsEditorComponent_Conditional_4_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmAdd());
    });
    \u0275\u0275text(9, "Add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 15);
    \u0275\u0275listener("click", function LineItemsEditorComponent_Conditional_4_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelAdd());
    });
    \u0275\u0275text(11, "Cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.pickId);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.services().length ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.pickedService ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.pickId);
  }
}
function LineItemsEditorComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function LineItemsEditorComponent_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startAdd());
    });
    \u0275\u0275text(1, "+ Add charge");
    \u0275\u0275elementEnd();
  }
}
var LineItemsEditorComponent = class _LineItemsEditorComponent {
  constructor() {
    this.items = model.required();
    this.currency = input("EUR");
    this.services = input([]);
    this.total = computed(() => this.items().reduce((s, i) => s + (Number(i.amount) || 0), 0));
    this.picking = signal(false);
    this.pickId = "";
    this.pickHours = 1;
  }
  get pickedService() {
    return this.services().find((s) => s.id === this.pickId);
  }
  get pickHoursNum() {
    return Math.max(1, Math.floor(Number(this.pickHours) || 1));
  }
  get pickPrice() {
    const s = this.pickedService;
    return s ? servicePrice(s.pricing, this.pickHoursNum) : null;
  }
  startAdd() {
    if (this.services().length) {
      this.pickId = "";
      this.pickHours = 1;
      this.picking.set(true);
    } else
      this.addCustom();
  }
  cancelAdd() {
    this.picking.set(false);
  }
  confirmAdd() {
    if (!this.pickId)
      return;
    if (this.pickId === "custom") {
      this.addCustom();
      return;
    }
    const svc = this.pickedService;
    if (!svc)
      return;
    const hours = this.pickHoursNum;
    this.items.update((list) => [...list, {
      description: `${svc.name} \u2014 ${hours} ${hours === 1 ? "hour" : "hours"}`,
      amount: servicePrice(svc.pricing, hours) ?? 0,
      serviceId: svc.id,
      hours
    }]);
    this.picking.set(false);
  }
  addCustom() {
    this.items.update((list) => [...list, { description: "", amount: 0 }]);
    this.picking.set(false);
  }
  remove(i) {
    this.items.update((list) => list.filter((_, idx) => idx !== i));
  }
  setDescription(i, value) {
    this.items.update((list) => list.map((it, idx) => idx === i ? __spreadProps(__spreadValues({}, it), { description: value }) : it));
  }
  setAmount(i, value) {
    const amount = Number(value) || 0;
    this.items.update((list) => list.map((it, idx) => idx === i ? __spreadProps(__spreadValues({}, it), { amount }) : it));
  }
  static {
    this.\u0275fac = function LineItemsEditorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LineItemsEditorComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LineItemsEditorComponent, selectors: [["app-line-items-editor"]], inputs: { items: [1, "items"], currency: [1, "currency"], services: [1, "services"] }, outputs: { items: "itemsChange" }, decls: 12, vars: 8, consts: [[1, "items"], [1, "item"], [1, "items-empty"], [1, "add-row"], ["type", "button", 1, "add"], [1, "total"], [1, "total__value"], ["rows", "1", "placeholder", "Description", 1, "item__desc", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "step", "1", "inputmode", "decimal", 1, "item__amount", 3, "ngModelChange", "ngModel"], ["type", "button", "aria-label", "Remove line", 1, "item__remove", 3, "click"], ["name", "pickId", 1, "add-row__what", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "custom"], ["label", "Services"], ["type", "button", 1, "add-row__add", 3, "click", "disabled"], ["type", "button", 1, "add-row__cancel", 3, "click"], [3, "value"], [1, "add-row__hours"], ["type", "number", "min", "1", "step", "1", "name", "pickHours", "aria-label", "Hours", 3, "ngModelChange", "ngModel"], [1, "add-row__unit"], [1, "add-row__price"], ["type", "button", 1, "add", 3, "click"]], template: function LineItemsEditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275repeaterCreate(1, LineItemsEditorComponent_For_2_Template, 5, 2, "div", 1, \u0275\u0275repeaterTrackByIndex);
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, LineItemsEditorComponent_Conditional_3_Template, 2, 0, "p", 2)(4, LineItemsEditorComponent_Conditional_4_Template, 12, 4, "div", 3)(5, LineItemsEditorComponent_Conditional_5_Template, 2, 0, "button", 4);
        \u0275\u0275elementStart(6, "div", 5)(7, "span");
        \u0275\u0275text(8, "Total");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 6);
        \u0275\u0275text(10);
        \u0275\u0275pipe(11, "currency");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.items());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(!ctx.items().length && !ctx.picking() ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.picking() ? 4 : 5);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(11, 3, ctx.total(), ctx.currency(), "symbol", "1.2-2"));
      }
    }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, CurrencyPipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 120px 30px;\n  gap: 8px;\n  align-items: start;\n}\n.item__desc[_ngcontent-%COMP%], \n.item__amount[_ngcontent-%COMP%] {\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 14px;\n  color: #0f172a;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 9px 12px;\n  background: #ffffff;\n}\n.item__desc[_ngcontent-%COMP%]:focus, \n.item__amount[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #F4A922;\n}\n.item__desc[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 40px;\n}\n.item__amount[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.item__remove[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 40px;\n  padding: 0;\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #94a3b8;\n  font-size: 20px;\n  line-height: 1;\n  border-radius: 6px;\n}\n.item__remove[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #ef4444;\n  background: rgba(239, 68, 68, 0.08);\n}\n.item__remove[_ngcontent-%COMP%]:disabled {\n  opacity: 0.3;\n  cursor: default;\n}\n.items-empty[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  padding: 12px;\n  border: 1.5px dashed #e2e8f0;\n  border-radius: 8px;\n  text-align: center;\n  font-size: 13px;\n  color: #94a3b8;\n}\n.add[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  background: none;\n  border: none;\n  padding: 4px 0;\n  cursor: pointer;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 13px;\n  font-weight: 700;\n  color: #F4A922;\n}\n.add[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.add-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-top: 10px;\n  padding: 10px;\n  border: 1.5px dashed #e2e8f0;\n  border-radius: 8px;\n}\n.add-row__what[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 160px;\n}\n.add-row__what[_ngcontent-%COMP%], \n.add-row__hours[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 14px;\n  color: #0f172a;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 8px 10px;\n  background: #ffffff;\n}\n.add-row__what[_ngcontent-%COMP%]:focus, \n.add-row__hours[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #F4A922;\n}\n.add-row__hours[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.add-row__hours[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 64px;\n  text-align: right;\n}\n.add-row__unit[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #94a3b8;\n}\n.add-row__price[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #0f172a;\n  min-width: 48px;\n  text-align: right;\n}\n.add-row__add[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  background: #F4A922;\n  border: none;\n  border-radius: 8px;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 13px;\n  font-weight: 700;\n  color: #000;\n  cursor: pointer;\n}\n.add-row__add[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.add-row__cancel[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n  font-size: 13px;\n  font-weight: 600;\n  color: #94a3b8;\n}\n.add-row__cancel[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n.total[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 12px;\n  padding-top: 12px;\n  border-top: 1.5px solid #e2e8f0;\n  font-size: 15px;\n  font-weight: 800;\n  color: #0f172a;\n}\n.total__value[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n}\n/*# sourceMappingURL=line-items-editor.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LineItemsEditorComponent, { className: "LineItemsEditorComponent", filePath: "src/app/booking/ui/line-items-editor/line-items-editor.component.ts", lineNumber: 21 });
})();

export {
  LineItemsEditorComponent
};
//# sourceMappingURL=chunk-BA6DI4DR.js.map
