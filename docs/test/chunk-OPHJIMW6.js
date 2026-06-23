import {
  events
} from "./chunk-IVLVBHQU.js";
import {
  NavigationService
} from "./chunk-WUOM5WYJ.js";
import {
  EVENT_FILTERS,
  PERIOD_FILTERS,
  eventBookUrl,
  eventCategoryMeta,
  formatEventDate,
  getEventVenuePins,
  matchesPeriod,
  nextDate,
  upcomingEvents
} from "./chunk-42PZ366Z.js";
import {
  PanelShellComponent
} from "./chunk-RX7SKMBG.js";
import {
  SeoService
} from "./chunk-MHTJLQEP.js";
import {
  MapBridgeService
} from "./chunk-PH3BTFK4.js";
import "./chunk-YQQNS7T3.js";
import {
  takeUntilDestroyed
} from "./chunk-TP5FMXQB.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-E53NQKQB.js";
import "./chunk-DNKJKTBS.js";
import {
  CommonModule,
  DestroyRef,
  EventEmitter,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  computed,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-P56CFEJA.js";
import "./chunk-TWWAJFRB.js";

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
    return formatEventDate(next, raw);
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

// src/app/map/features/events/events-page/events.component.ts
function EventsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275listener("click", function EventsComponent_div_5_Template_div_click_0_listener() {
      const p_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setPeriod(p_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activePeriod() === p_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r2.label);
  }
}
function EventsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275listener("click", function EventsComponent_div_7_Template_div_click_0_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setCategory(c_r5.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeCategory() === c_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.label);
  }
}
function EventsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "span");
    \u0275\u0275element(2, "i", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 14);
    \u0275\u0275listener("click", function EventsComponent_div_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearVenue());
    });
    \u0275\u0275text(5, "Clear \u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r7 = ctx.ngIf;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", v_r7, "");
  }
}
function EventsComponent_app_event_card_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-event-card", 15);
    \u0275\u0275listener("selected", function EventsComponent_app_event_card_12_Template_app_event_card_selected_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEvent($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("event", e_r9)("now", ctx_r2.now);
  }
}
function EventsComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1, " No events match these filters \u2014 try \u201CAll dates\u201D. ");
    \u0275\u0275elementEnd();
  }
}
var EventsComponent = class _EventsComponent {
  constructor() {
    this.now = /* @__PURE__ */ new Date();
    this.allEvents = upcomingEvents(events, this.now);
    this.categoryFilters = EVENT_FILTERS;
    this.periodFilters = PERIOD_FILTERS;
    this.activeCategory = signal("all");
    this.activePeriod = signal("all");
    this.selectedVenue = signal(null);
    this.filtered = computed(() => {
      const cat = this.activeCategory();
      const period = this.activePeriod();
      const venue = this.selectedVenue();
      return this.allEvents.filter((e) => cat === "all" || e.category === cat).filter((e) => matchesPeriod(e, period, this.now)).filter((e) => !venue || e.venue === venue).sort((a, b) => (nextDate(a, this.now) ?? "").localeCompare(nextDate(b, this.now) ?? ""));
    });
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.nav = inject(NavigationService);
    this.seo = inject(SeoService);
    this.bridge = inject(MapBridgeService);
  }
  ngOnInit() {
    this.seo.setPage("events");
    if (!isPlatformBrowser(this.platformId))
      return;
    const backTo = this.route.snapshot.queryParamMap.get("backTo");
    const backBtn = backTo === "list" ? { label: "Back", accent: true } : { label: "Back to map" };
    this.bridge.enterPanelMode([], backBtn);
    this.bridge.eventVenuePins.set(getEventVenuePins(this.allEvents));
    const venue = this.route.snapshot.queryParamMap.get("venue");
    if (venue)
      this.selectedVenue.set(venue);
    this.bridge.eventVenueSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pin) => {
      this.selectedVenue.set(pin.venue);
      this.bridge.scrollToTop$.next();
    });
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loc) => {
      if (loc)
        this.router.navigate(["/malta/locations", loc.slug]);
    });
    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.navigateBack());
  }
  setCategory(id) {
    this.activeCategory.set(id);
  }
  setPeriod(id) {
    this.activePeriod.set(id);
  }
  clearVenue() {
    this.selectedVenue.set(null);
  }
  openEvent(event) {
    if (isPlatformBrowser(this.platformId))
      window.open(eventBookUrl(event), "_blank", "noopener");
  }
  onPanelCloseRequested() {
    this.navigateBack();
  }
  navigateBack() {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
  static {
    this.\u0275fac = function EventsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EventsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventsComponent, selectors: [["app-events"]], decls: 14, vars: 7, consts: [["title", "What's On in Malta", 3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd"], [1, "events"], [1, "events__intro"], [1, "events__chips"], ["class", "chip", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "events__chips", "events__chips--cat"], ["class", "events__venue-filter", 4, "ngIf"], [1, "events__count"], [1, "events__list"], [3, "event", "now", "selected", 4, "ngFor", "ngForOf"], ["class", "events__empty", 4, "ngIf"], [1, "chip", 3, "click"], [1, "events__venue-filter"], [1, "fa-solid", "fa-location-dot"], [3, "click"], [3, "selected", "event", "now"], [1, "events__empty"]], template: function EventsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-panel-shell", 0);
        \u0275\u0275listener("closeRequested", function EventsComponent_Template_app_panel_shell_closeRequested_0_listener() {
          return ctx.onPanelCloseRequested();
        })("dragStart", function EventsComponent_Template_app_panel_shell_dragStart_0_listener($event) {
          return ctx.bridge.panel.onDragStart($event);
        })("dragMove", function EventsComponent_Template_app_panel_shell_dragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("dragEnd", function EventsComponent_Template_app_panel_shell_dragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        })("bodyDragStart", function EventsComponent_Template_app_panel_shell_bodyDragStart_0_listener($event) {
          return ctx.bridge.panel.startDrag($event);
        })("bodyDragMove", function EventsComponent_Template_app_panel_shell_bodyDragMove_0_listener($event) {
          return ctx.bridge.panel.onDragMove($event);
        })("bodyDragEnd", function EventsComponent_Template_app_panel_shell_bodyDragEnd_0_listener($event) {
          return ctx.bridge.panel.onDragEnd($event);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "p", 2);
        \u0275\u0275text(3, "Parties, pool days & live nights across Malta \u2014 tap a card for tickets, or a map pin to see what's on at that venue.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 3);
        \u0275\u0275template(5, EventsComponent_div_5_Template, 2, 3, "div", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 5);
        \u0275\u0275template(7, EventsComponent_div_7_Template, 2, 3, "div", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, EventsComponent_div_8_Template, 6, 1, "div", 6);
        \u0275\u0275elementStart(9, "div", 7);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 8);
        \u0275\u0275template(12, EventsComponent_app_event_card_12_Template, 1, 2, "app-event-card", 9)(13, EventsComponent_div_13_Template, 2, 0, "div", 10);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.periodFilters);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.categoryFilters);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedVenue());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate2("", ctx.filtered().length, " event", ctx.filtered().length === 1 ? "" : "s", "");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.filtered());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filtered().length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, PanelShellComponent, EventCardComponent], styles: ["\n\n.events[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 12px 14px 20px;\n}\n.events__intro[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  color: var(--color-text-muted);\n  line-height: 1.45;\n}\n.events__chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.events__chips--cat[_ngcontent-%COMP%] {\n  padding-bottom: 4px;\n  border-bottom: 1px solid var(--color-border);\n}\n.events__venue-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 8px 12px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.events__venue-filter[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  margin-right: 4px;\n}\n.events__venue-filter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: none;\n  background: none;\n  color: var(--color-text-light);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.events__venue-filter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-base);\n}\n.events__count[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-light);\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.events__list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.events__empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--color-text-muted);\n  font-size: 13px;\n  padding: 24px 8px;\n}\n/*# sourceMappingURL=events.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventsComponent, { className: "EventsComponent", filePath: "src/app/map/features/events/events-page/events.component.ts", lineNumber: 23 });
})();
export {
  EventsComponent
};
//# sourceMappingURL=chunk-OPHJIMW6.js.map
