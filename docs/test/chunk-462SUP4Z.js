import {
  PanelShellComponent
} from "./chunk-MPKSAMEJ.js";
import {
  EventCardComponent
} from "./chunk-PXOQSGYZ.js";
import {
  events
} from "./chunk-S3HAMASV.js";
import {
  NavigationService
} from "./chunk-372PF7SV.js";
import {
  providers
} from "./chunk-DYEFD6F2.js";
import {
  SeoService
} from "./chunk-WFXQZ6RY.js";
import {
  DAY_FILTERS,
  EVENT_FILTERS,
  PERIOD_FILTERS,
  eventBookUrl,
  getEventVenuePins,
  matchesDay,
  matchesPeriod,
  nextDate,
  upcomingEvents
} from "./chunk-BU7ZDQCB.js";
import {
  getExperiencePins
} from "./chunk-ETA2JZSR.js";
import {
  MapBridgeService
} from "./chunk-USW22R6T.js";
import "./chunk-5FMFH5XE.js";
import {
  takeUntilDestroyed
} from "./chunk-Q5BD35NP.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-Q6APD67I.js";
import "./chunk-GHBBMOR7.js";
import {
  CommonModule,
  DestroyRef,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  computed,
  inject,
  isPlatformBrowser,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
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
  ɵɵtextInterpolate2
} from "./chunk-EBVVQ6Y2.js";
import "./chunk-TWWAJFRB.js";

// src/app/map/features/events/events-page/events.component.ts
function EventsComponent_option_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", p_r1.id)("selected", ctx_r1.activePeriod() === p_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1.label);
  }
}
function EventsComponent_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", d_r3.id)("selected", ctx_r1.activeDay() === d_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r3.label);
  }
}
function EventsComponent_option_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", c_r4.id)("selected", ctx_r1.activeCategory() === c_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4.id === "all" ? "All types" : c_r4.label);
  }
}
function EventsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "span");
    \u0275\u0275element(2, "i", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 15);
    \u0275\u0275listener("click", function EventsComponent_div_9_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearVenue());
    });
    \u0275\u0275text(5, "Clear \u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r6 = ctx.ngIf;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", v_r6, "");
  }
}
function EventsComponent_app_event_card_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-event-card", 16);
    \u0275\u0275listener("selected", function EventsComponent_app_event_card_13_Template_app_event_card_selected_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEvent($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("event", e_r8)("now", ctx_r1.now);
  }
}
function EventsComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
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
    this.dayFilters = DAY_FILTERS;
    this.activeCategory = signal("all");
    this.activePeriod = signal("all");
    this.activeDay = signal("all");
    this.selectedVenue = signal(null);
    this.filtered = computed(() => {
      const cat = this.activeCategory();
      const period = this.activePeriod();
      const day = this.activeDay();
      const venue = this.selectedVenue();
      return this.allEvents.filter((e) => cat === "all" || e.category === cat).filter((e) => matchesPeriod(e, period, this.now)).filter((e) => matchesDay(e, day)).filter((e) => !venue || e.venue === venue).sort((a, b) => (nextDate(a, this.now) ?? "").localeCompare(nextDate(b, this.now) ?? ""));
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
    this.bridge.showGems.set(false);
    this.bridge.clusterPins.set(false);
    this.bridge.experiencePins.set(getExperiencePins(providers));
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
  setDay(id) {
    this.activeDay.set(id);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventsComponent, selectors: [["app-events"]], decls: 15, vars: 8, consts: [["title", "What's On in Malta", 3, "closeRequested", "dragStart", "dragMove", "dragEnd", "bodyDragStart", "bodyDragMove", "bodyDragEnd"], [1, "events"], [1, "events__filters"], ["aria-label", "When", 1, "events__select", 3, "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], ["aria-label", "Day", 1, "events__select", 3, "change"], ["aria-label", "Type", 1, "events__select", 3, "change"], ["class", "events__venue-filter", 4, "ngIf"], [1, "events__count"], [1, "events__list"], [3, "event", "now", "selected", 4, "ngFor", "ngForOf"], ["class", "events__empty", 4, "ngIf"], [3, "value", "selected"], [1, "events__venue-filter"], [1, "fa-solid", "fa-location-dot"], [3, "click"], [3, "selected", "event", "now"], [1, "events__empty"]], template: function EventsComponent_Template(rf, ctx) {
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
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "select", 3);
        \u0275\u0275listener("change", function EventsComponent_Template_select_change_3_listener($event) {
          return ctx.setPeriod($event.target.value);
        });
        \u0275\u0275template(4, EventsComponent_option_4_Template, 2, 3, "option", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "select", 5);
        \u0275\u0275listener("change", function EventsComponent_Template_select_change_5_listener($event) {
          return ctx.setDay($event.target.value);
        });
        \u0275\u0275template(6, EventsComponent_option_6_Template, 2, 3, "option", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "select", 6);
        \u0275\u0275listener("change", function EventsComponent_Template_select_change_7_listener($event) {
          return ctx.setCategory($event.target.value);
        });
        \u0275\u0275template(8, EventsComponent_option_8_Template, 2, 3, "option", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, EventsComponent_div_9_Template, 6, 1, "div", 7);
        \u0275\u0275elementStart(10, "div", 8);
        \u0275\u0275text(11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 9);
        \u0275\u0275template(13, EventsComponent_app_event_card_13_Template, 1, 2, "app-event-card", 10)(14, EventsComponent_div_14_Template, 2, 0, "div", 11);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngForOf", ctx.periodFilters);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.dayFilters);
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
    }, dependencies: [CommonModule, NgForOf, NgIf, PanelShellComponent, EventCardComponent], styles: ["\n\n.events[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 12px 14px 20px;\n}\n.events__filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.events__select[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 7px 8px;\n  cursor: pointer;\n  appearance: none;\n  -webkit-appearance: none;\n  text-overflow: ellipsis;\n}\n.events__venue-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  background: var(--color-bg-light);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 8px 12px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.events__venue-filter[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  margin-right: 4px;\n}\n.events__venue-filter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: none;\n  background: none;\n  color: var(--color-text-light);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.events__venue-filter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-base);\n}\n.events__count[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-light);\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.events__list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.events__empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--color-text-muted);\n  font-size: 13px;\n  padding: 24px 8px;\n}\n/*# sourceMappingURL=events.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventsComponent, { className: "EventsComponent", filePath: "src/app/map/features/events/events-page/events.component.ts", lineNumber: 26 });
})();
export {
  EventsComponent
};
//# sourceMappingURL=chunk-462SUP4Z.js.map
