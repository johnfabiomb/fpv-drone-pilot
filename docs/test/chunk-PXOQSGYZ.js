import {
  eventBookUrl,
  eventCategoryMeta,
  formatEventDate,
  nextDate
} from "./chunk-BU7ZDQCB.js";
import {
  CommonModule,
  EventEmitter,
  NgIf,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-EBVVQ6Y2.js";

// src/app/map/features/events/event-card/event-card.component.ts
function EventCardComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("+", ctx_r0.extraDates, " more ", ctx_r0.extraDates === 1 ? "date" : "dates", "");
  }
}
function EventCardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "i", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.event.venue, " ");
  }
}
var EventCardComponent = class _EventCardComponent {
  constructor() {
    this.now = /* @__PURE__ */ new Date(0);
    this.selected = new EventEmitter();
    this.platformId = inject(PLATFORM_ID);
  }
  get meta() {
    return eventCategoryMeta(this.event.category);
  }
  get whenLabel() {
    const next = nextDate(this.event, this.now);
    const raw = this.event.dates.find((d) => d.start === next)?.dateRaw ?? this.event.dates[0]?.dateRaw ?? "";
    return formatEventDate(next, raw, this.now);
  }
  /** "+3 more dates" hint for recurring events. */
  get extraDates() {
    return Math.max(0, this.event.dates.length - 1);
  }
  openTickets(e) {
    e.stopPropagation();
    if (isPlatformBrowser(this.platformId)) {
      window.open(eventBookUrl(this.event), "_blank", "noopener");
    }
  }
  static {
    this.\u0275fac = function EventCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EventCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventCardComponent, selectors: [["app-event-card"]], inputs: { event: "event", now: "now" }, outputs: { selected: "selected" }, decls: 17, vars: 10, consts: [[1, "event-card", 3, "click"], [1, "event-card__media"], ["loading", "lazy", 1, "event-card__img", 3, "src", "alt"], [1, "event-card__cat"], [1, "event-card__body"], [1, "event-card__when"], ["class", "event-card__more", 4, "ngIf"], [1, "event-card__name"], ["class", "event-card__venue", 4, "ngIf"], [1, "event-card__cta", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"], [1, "event-card__more"], [1, "event-card__venue"], [1, "fa-solid", "fa-location-dot"]], template: function EventCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function EventCardComponent_Template_div_click_0_listener() {
          return ctx.selected.emit(ctx.event);
        });
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275element(2, "img", 2);
        \u0275\u0275elementStart(3, "span", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "div", 4)(6, "div", 5);
        \u0275\u0275text(7);
        \u0275\u0275template(8, EventCardComponent_span_8_Template, 2, 2, "span", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 7);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275template(11, EventCardComponent_div_11_Template, 3, 1, "div", 8);
        \u0275\u0275elementStart(12, "button", 9);
        \u0275\u0275listener("click", function EventCardComponent_Template_button_click_12_listener($event) {
          return ctx.openTickets($event);
        });
        \u0275\u0275text(13, " Get tickets ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(14, "svg", 10);
        \u0275\u0275element(15, "line", 11)(16, "polyline", 12);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("src", ctx.event.image, \u0275\u0275sanitizeUrl)("alt", ctx.event.name);
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.meta.color);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate2("", ctx.meta.icon, " ", ctx.meta.label, "");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.whenLabel, " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.extraDates);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.event.name);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.event.venue);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.event-card[_ngcontent-%COMP%] {\n  display: flex;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  background: var(--color-bg);\n  overflow: hidden;\n  cursor: pointer;\n  transition: box-shadow 0.18s, transform 0.18s;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.event-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n@media (hover: hover) {\n  .event-card[_ngcontent-%COMP%]:hover {\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);\n  }\n}\n.event-card__media[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n  width: 96px;\n}\n.event-card__img[_ngcontent-%COMP%] {\n  width: 96px;\n  height: 100%;\n  min-height: 96px;\n  object-fit: cover;\n  display: block;\n}\n.event-card__cat[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 6px;\n  left: 6px;\n  font-size: 9.5px;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  color: #fff;\n  padding: 2px 6px;\n  border-radius: 999px;\n  white-space: nowrap;\n}\n.event-card__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  padding: 10px 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.event-card__when[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 700;\n  color: var(--color-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.event-card__more[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-light);\n  background: var(--color-bg-muted);\n  border-radius: 999px;\n  padding: 1px 6px;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.event-card__name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  line-height: 1.25;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.event-card__venue[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--color-text-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.event-card__venue[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--color-text-light);\n  margin-right: 3px;\n}\n.event-card__cta[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  align-self: flex-start;\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  font-weight: 700;\n  color: #fff;\n  background: var(--color-primary);\n  border: none;\n  border-radius: var(--radius-lg);\n  padding: 6px 12px;\n  cursor: pointer;\n  transition: background var(--transition);\n}\n.event-card__cta[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-hover);\n}\n/*# sourceMappingURL=event-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventCardComponent, { className: "EventCardComponent", filePath: "src/app/map/features/events/event-card/event-card.component.ts", lineNumber: 13 });
})();

export {
  EventCardComponent
};
//# sourceMappingURL=chunk-PXOQSGYZ.js.map
