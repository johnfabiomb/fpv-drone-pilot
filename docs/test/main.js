import {
  BookingsAuthService
} from "./chunk-KKHOHJA2.js";
import "./chunk-F6LTA4RG.js";
import "./chunk-4746DPCT.js";
import {
  Router,
  RouterOutlet,
  provideRouter,
  withInMemoryScrolling
} from "./chunk-Q6APD67I.js";
import {
  DomRendererFactory2,
  bootstrapApplication
} from "./chunk-GHBBMOR7.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionScheduler,
  DOCUMENT,
  IMAGE_CONFIG,
  Injectable,
  InjectionToken,
  Injector,
  NgZone,
  RendererFactory2,
  RuntimeError,
  inject,
  makeEnvironmentProviders,
  performanceMarkFeature,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵinvalidFactory
} from "./chunk-EBVVQ6Y2.js";
import {
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/booking/core/guards/booking-auth.guards.ts
var adminGuard = () => {
  const auth = inject(BookingsAuthService);
  const router = inject(Router);
  auth.initialize();
  const s = auth.state();
  if (s === "loading")
    return true;
  return s === "admin" ? true : router.createUrlTree(["/bookings", "login"]);
};
var loginGuard = () => {
  const auth = inject(BookingsAuthService);
  const router = inject(Router);
  auth.initialize();
  if (auth.state() === "admin")
    return router.createUrlTree(["/bookings", "list"]);
  return true;
};

// src/app/booking/booking.routes.ts
var bookingRoutes = [
  // ── Public (no auth) ──────────────────────────────────────────────
  __spreadValues({
    path: "book",
    loadComponent: () => import("./chunk-JBFLJYMQ.js").then((m) => m.ServicePickerComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/service-picker/service-picker.component.ts" } : {}),
  __spreadValues({
    // literals must precede 'book/:token' so they aren't captured as a token
    path: "book/calendar",
    loadComponent: () => import("./chunk-ZO46JJWF.js").then((m) => m.BookingCalendarComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/booking-calendar/booking-calendar.component.ts" } : {}),
  __spreadValues({
    path: "book/checkout",
    loadComponent: () => import("./chunk-RFXE367V.js").then((m) => m.BookingCheckoutComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/booking-checkout/booking-checkout.component.ts" } : {}),
  __spreadValues({
    path: "book/mine",
    loadComponent: () => import("./chunk-IYKKMJ6Y.js").then((m) => m.MyBookingsComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/my-bookings/my-bookings.component.ts" } : {}),
  __spreadValues({
    // Printable invoice. ?token=… serves anon pay-link customers (get_invoice_by_token);
    // the /:id form below serves admins + the booking's own client (get_invoice).
    // Both precede 'book/:token' so 'invoice' isn't captured as a token.
    path: "book/invoice",
    loadComponent: () => import("./chunk-4R3GQOXL.js").then((m) => m.InvoiceComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/invoice/invoice.component.ts" } : {}),
  __spreadValues({
    path: "book/invoice/:id",
    loadComponent: () => import("./chunk-4R3GQOXL.js").then((m) => m.InvoiceComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/invoice/invoice.component.ts" } : {}),
  __spreadValues({
    path: "book/:token",
    loadComponent: () => import("./chunk-7VLR6HGK.js").then((m) => m.BookPageComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/book-page/book-page.component.ts" } : {}),
  __spreadValues({
    path: "pay/success",
    loadComponent: () => import("./chunk-HNSCKKBL.js").then((m) => m.PaymentSuccessComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/payment-success/payment-success.component.ts" } : {}),
  // ── Per-org public booking (slug-driven) ──────────────────────────
  // `:org/book*` — the `book` second segment can't collide with the map app
  // (no map route has `/book` as its 2nd segment). The default `/book` above
  // stays for the primary org.
  __spreadValues({
    path: ":org/book",
    loadComponent: () => import("./chunk-JBFLJYMQ.js").then((m) => m.ServicePickerComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/service-picker/service-picker.component.ts" } : {}),
  __spreadValues({
    path: ":org/book/calendar",
    loadComponent: () => import("./chunk-ZO46JJWF.js").then((m) => m.BookingCalendarComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/booking-calendar/booking-calendar.component.ts" } : {}),
  __spreadValues({
    path: ":org/book/checkout",
    loadComponent: () => import("./chunk-RFXE367V.js").then((m) => m.BookingCheckoutComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/booking-checkout/booking-checkout.component.ts" } : {}),
  __spreadValues({
    path: ":org/book/mine",
    loadComponent: () => import("./chunk-IYKKMJ6Y.js").then((m) => m.MyBookingsComponent)
  }, false ? { \u0275entryName: "src/app/booking/public/my-bookings/my-bookings.component.ts" } : {}),
  // ── Studio (logged-in platform) ───────────────────────────────────
  {
    path: "bookings",
    children: [
      __spreadValues({
        path: "login",
        canActivate: [loginGuard],
        loadComponent: () => import("./chunk-INAI2D7A.js").then((m) => m.LoginComponent)
      }, false ? { \u0275entryName: "src/app/booking/auth/login/login.component.ts" } : {}),
      __spreadValues({
        path: "",
        canActivate: [adminGuard],
        loadComponent: () => import("./chunk-3FUHTCWX.js").then((m) => m.PlatformShellComponent),
        children: [
          { path: "", redirectTo: "dashboard", pathMatch: "full" },
          {
            path: "dashboard",
            loadComponent: () => import("./chunk-N27FLFAH.js").then((m) => m.DashboardComponent)
          },
          {
            path: "list",
            loadComponent: () => import("./chunk-6QRODHWF.js").then((m) => m.BookingListComponent)
          },
          {
            path: "new",
            loadComponent: () => import("./chunk-JSSQPZFN.js").then((m) => m.BookingFormComponent)
          },
          {
            path: ":id/edit",
            loadComponent: () => import("./chunk-JSSQPZFN.js").then((m) => m.BookingFormComponent)
          },
          {
            path: "organizations",
            loadComponent: () => import("./chunk-EYWOBKRT.js").then((m) => m.OrganizationsComponent)
          },
          {
            path: "invoices",
            loadComponent: () => import("./chunk-GINUTNMV.js").then((m) => m.InvoicesAdminComponent)
          },
          {
            // literal segment, so it precedes the catch-all ':id' below
            path: "invoice-edit/:id",
            loadComponent: () => import("./chunk-GPLWNSWS.js").then((m) => m.InvoiceEditComponent)
          },
          {
            path: "clients",
            loadComponent: () => import("./chunk-PZ4HBC5Z.js").then((m) => m.ClientListComponent)
          },
          {
            path: "services",
            loadComponent: () => import("./chunk-MNLUFTRY.js").then((m) => m.ServicesAdminComponent)
          },
          {
            path: "staff",
            loadComponent: () => import("./chunk-EGLWBEPZ.js").then((m) => m.StaffAdminComponent)
          },
          {
            path: "settings",
            loadComponent: () => import("./chunk-53YBR3YQ.js").then((m) => m.SettingsAdminComponent)
          },
          {
            path: "work",
            loadComponent: () => import("./chunk-UYVHJJ75.js").then((m) => m.WorkBoardComponent)
          },
          {
            // Keep LAST: ':id' matches a single segment, so it must come after all
            // the literal routes above (list/new/clients/…) to avoid shadowing them.
            path: ":id",
            loadComponent: () => import("./chunk-NYWDTHFY.js").then((m) => m.BookingDetailComponent)
          }
        ]
      }, false ? { \u0275entryName: "src/app/booking/platform/platform-shell/platform-shell.component.ts" } : {})
    ]
  }
];

// src/app/app.routes.ts
var routes = [
  ...bookingRoutes,
  // Personal landing page at the exact root (johnfabiomb.com/). Standalone — it must NOT
  // sit inside the map chrome, so it precedes the map module and uses pathMatch: 'full'.
  __spreadValues({
    path: "",
    pathMatch: "full",
    loadComponent: () => import("./chunk-JODJJ2IZ.js").then((m) => m.LandingComponent)
  }, false ? { \u0275entryName: "src/app/landing/landing.component.ts" } : {}),
  // Map routes are loaded lazily so the map Supabase client (and the full
  // AuthService / UserDataService chain) is never initialised on booking pages.
  // Handles /malta, /privacy, /contact, /pay, … (everything except the bare root).
  __spreadValues({
    path: "",
    loadChildren: () => import("./chunk-MEMYNXOK.js").then((m) => m.mapRoutes)
  }, false ? { \u0275entryName: "src/app/map/map.routes.ts" } : {})
];

// node_modules/@angular/platform-browser/fesm2022/animations/async.mjs
var ANIMATION_PREFIX = "@";
var AsyncAnimationRendererFactory = class _AsyncAnimationRendererFactory {
  doc;
  delegate;
  zone;
  animationType;
  moduleImpl;
  _rendererFactoryPromise = null;
  scheduler = null;
  injector = inject(Injector);
  loadingSchedulerFn = inject(\u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
    optional: true
  });
  _engine;
  /**
   *
   * @param moduleImpl allows to provide a mock implmentation (or will load the animation module)
   */
  constructor(doc, delegate, zone, animationType, moduleImpl) {
    this.doc = doc;
    this.delegate = delegate;
    this.zone = zone;
    this.animationType = animationType;
    this.moduleImpl = moduleImpl;
  }
  /** @nodoc */
  ngOnDestroy() {
    this._engine?.flush();
  }
  /**
   * @internal
   */
  loadImpl() {
    const loadFn = () => this.moduleImpl ?? import("./chunk-WOUJFXFW.js").then((m) => m);
    let moduleImplPromise;
    if (this.loadingSchedulerFn) {
      moduleImplPromise = this.loadingSchedulerFn(loadFn);
    } else {
      moduleImplPromise = loadFn();
    }
    return moduleImplPromise.catch((e) => {
      throw new RuntimeError(5300, (typeof ngDevMode === "undefined" || ngDevMode) && "Async loading for animations package was enabled, but loading failed. Angular falls back to using regular rendering. No animations will be displayed and their styles won't be applied.");
    }).then(({
      \u0275createEngine,
      \u0275AnimationRendererFactory
    }) => {
      this._engine = \u0275createEngine(this.animationType, this.doc);
      const rendererFactory = new \u0275AnimationRendererFactory(this.delegate, this._engine, this.zone);
      this.delegate = rendererFactory;
      return rendererFactory;
    });
  }
  /**
   * This method is delegating the renderer creation to the factories.
   * It uses default factory while the animation factory isn't loaded
   * and will rely on the animation factory once it is loaded.
   *
   * Calling this method will trigger as side effect the loading of the animation module
   * if the renderered component uses animations.
   */
  createRenderer(hostElement, rendererType) {
    const renderer = this.delegate.createRenderer(hostElement, rendererType);
    if (renderer.\u0275type === 0) {
      return renderer;
    }
    if (typeof renderer.throwOnSyntheticProps === "boolean") {
      renderer.throwOnSyntheticProps = false;
    }
    const dynamicRenderer = new DynamicDelegationRenderer(renderer);
    if (rendererType?.data?.["animation"] && !this._rendererFactoryPromise) {
      this._rendererFactoryPromise = this.loadImpl();
    }
    this._rendererFactoryPromise?.then((animationRendererFactory) => {
      const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
      dynamicRenderer.use(animationRenderer);
      this.scheduler ??= this.injector.get(ChangeDetectionScheduler, null, {
        optional: true
      });
      this.scheduler?.notify(
        10
        /* NotificationSource.AsyncAnimationsLoaded */
      );
    }).catch((e) => {
      dynamicRenderer.use(renderer);
    });
    return dynamicRenderer;
  }
  begin() {
    this.delegate.begin?.();
  }
  end() {
    this.delegate.end?.();
  }
  whenRenderingDone() {
    return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
  }
  /**
   * Used during HMR to clear any cached data about a component.
   * @param componentId ID of the component that is being replaced.
   */
  componentReplaced(componentId) {
    this._engine?.flush();
    this.delegate.componentReplaced?.(componentId);
  }
  static \u0275fac = function AsyncAnimationRendererFactory_Factory(__ngFactoryType__) {
    \u0275\u0275invalidFactory();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AsyncAnimationRendererFactory,
    factory: _AsyncAnimationRendererFactory.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AsyncAnimationRendererFactory, [{
    type: Injectable
  }], () => [{
    type: Document
  }, {
    type: RendererFactory2
  }, {
    type: NgZone
  }, {
    type: void 0
  }, {
    type: Promise
  }], null);
})();
var DynamicDelegationRenderer = class {
  delegate;
  // List of callbacks that need to be replayed on the animation renderer once its loaded
  replay = [];
  \u0275type = 1;
  constructor(delegate) {
    this.delegate = delegate;
  }
  use(impl) {
    this.delegate = impl;
    if (this.replay !== null) {
      for (const fn of this.replay) {
        fn(impl);
      }
      this.replay = null;
    }
  }
  get data() {
    return this.delegate.data;
  }
  destroy() {
    this.replay = null;
    this.delegate.destroy();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  get destroyNode() {
    return this.delegate.destroyNode;
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
  }
  insertBefore(parent, newChild, refChild, isMove) {
    this.delegate.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent, oldChild, isHostElement) {
    this.delegate.removeChild(parent, oldChild, isHostElement);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style, value, flags) {
    this.delegate.setStyle(el, style, value, flags);
  }
  removeStyle(el, style, flags) {
    this.delegate.removeStyle(el, style, flags);
  }
  setProperty(el, name, value) {
    if (this.shouldReplay(name)) {
      this.replay.push((renderer) => renderer.setProperty(el, name, value));
    }
    this.delegate.setProperty(el, name, value);
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback, options) {
    if (this.shouldReplay(eventName)) {
      this.replay.push((renderer) => renderer.listen(target, eventName, callback, options));
    }
    return this.delegate.listen(target, eventName, callback, options);
  }
  shouldReplay(propOrEventName) {
    return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
  }
};
var \u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN = new InjectionToken(ngDevMode ? "async_animation_loading_scheduler_fn" : "");
function provideAnimationsAsync(type = "animations") {
  performanceMarkFeature("NgAsyncAnimations");
  if (false) {
    type = "noop";
  }
  return makeEnvironmentProviders([{
    provide: RendererFactory2,
    useFactory: (doc, renderer, zone) => {
      return new AsyncAnimationRendererFactory(doc, renderer, zone, type);
    },
    deps: [DOCUMENT, DomRendererFactory2, NgZone]
  }, {
    provide: ANIMATION_MODULE_TYPE,
    useValue: type === "noop" ? "NoopAnimations" : "BrowserAnimations"
  }]);
}

// src/app/app.config.ts
var appConfig = {
  providers: [
    // Start new navigations at the top; restore the saved position on back/forward.
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: "enabled" })),
    provideAnimationsAsync(),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    }
  ]
};

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
      }
    }, dependencies: [RouterOutlet], styles: ["\n\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n/*# sourceMappingURL=app.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 11 });
})();

// src/main.ts
window.global = window;
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
    });
  });
}
/*! Bundled license information:

@angular/platform-browser/fesm2022/animations/async.mjs:
  (**
   * @license Angular v19.2.1
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=main.js.map
