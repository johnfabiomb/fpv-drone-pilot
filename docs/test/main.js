import {
  version
} from "./chunk-F5IHMW4M.js";
import {
  FEATURES
} from "./chunk-D7BDNDUA.js";
import {
  UserDataService,
  getFirestore,
  provideFirestore
} from "./chunk-FPB6O42O.js";
import {
  AuthService,
  getAuth,
  initializeApp,
  provideAuth,
  provideFirebaseApp
} from "./chunk-B23OTVUL.js";
import {
  takeUntilDestroyed
} from "./chunk-Q33RJLWE.js";
import {
  NavigationEnd,
  Router,
  RouterOutlet,
  provideRouter
} from "./chunk-U3AVTKB7.js";
import {
  DomRendererFactory2,
  bootstrapApplication
} from "./chunk-UJ3FFGCN.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionScheduler,
  CommonModule,
  DOCUMENT,
  DestroyRef,
  IMAGE_CONFIG,
  Injectable,
  InjectionToken,
  Injector,
  NgIf,
  NgZone,
  PLATFORM_ID,
  RendererFactory2,
  RuntimeError,
  __async,
  __spreadValues,
  filter,
  inject,
  isPlatformBrowser,
  makeEnvironmentProviders,
  performanceMarkFeature,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinvalidFactory,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-QFIZ3IRG.js";

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "malta"
  },
  __spreadValues({
    path: "",
    loadComponent: () => import("./chunk-IELMQP5U.js").then((mod) => mod.HomeComponent)
  }, false ? { \u0275entryName: "src/app/platform/home/home.component.ts" } : {}),
  __spreadValues({
    path: "privacy",
    loadComponent: () => import("./chunk-M4TZLWO5.js").then((mod) => mod.PrivacyComponent)
  }, false ? { \u0275entryName: "src/app/platform/privacy/privacy.component.ts" } : {}),
  __spreadValues({
    path: "cookies",
    loadComponent: () => import("./chunk-3HA6FG22.js").then((mod) => mod.CookiesComponent)
  }, false ? { \u0275entryName: "src/app/platform/cookies/cookies.component.ts" } : {}),
  __spreadValues({
    path: "about",
    loadComponent: () => import("./chunk-RXEF6URU.js").then((mod) => mod.AboutComponent)
  }, false ? { \u0275entryName: "src/app/platform/about/about.component.ts" } : {}),
  __spreadValues({
    path: "contact",
    loadComponent: () => import("./chunk-K4CQ4YQR.js").then((mod) => mod.ContactComponent)
  }, false ? { \u0275entryName: "src/app/platform/contact/contact.component.ts" } : {}),
  {
    path: "malta",
    children: [
      __spreadValues({
        // Shell owns the persistent map — '' matches /malta, /malta/list, /malta/deals
        path: "",
        loadComponent: () => import("./chunk-YMJDN5MJ.js").then((m) => m.MapShellComponent),
        children: [
          {
            path: "",
            pathMatch: "full",
            loadComponent: () => import("./chunk-5KCDV6H2.js").then((mod) => mod.MapExploreComponent)
          },
          {
            path: "list",
            loadComponent: () => import("./chunk-NORIIDGE.js").then((m) => m.LocationListComponent)
          },
          {
            path: "deals",
            loadComponent: () => import("./chunk-UOZTOP5G.js").then((m) => m.DealsComponent)
          },
          {
            path: "providers/:id",
            loadComponent: () => import("./chunk-UEUKMBRV.js").then((m) => m.ProviderPageComponent)
          },
          {
            path: "locations/:slug",
            loadComponent: () => import("./chunk-6RVIOIAN.js").then((m) => m.LocationPageComponent)
          },
          {
            path: "saved",
            loadComponent: () => import("./chunk-WX7MJMUH.js").then((m) => m.SavedPlacesComponent)
          }
        ]
      }, false ? { \u0275entryName: "src/app/platform/map-shell/map-shell.component.ts" } : {}),
      // Non-map routes are direct siblings — NOT inside the shell
      __spreadValues({
        path: "30-places-2026",
        loadComponent: () => import("./chunk-SGH6KYUM.js").then((m) => m.TopPlacesComponent)
      }, false ? { \u0275entryName: "src/app/platform/top-places/top-places.component.ts" } : {}),
      __spreadValues({
        path: "plan",
        canMatch: [() => FEATURES.ROUTE_BUILDER],
        loadComponent: () => import("./chunk-YKYIFUUZ.js").then((m) => m.RouteBuilderComponent)
      }, false ? { \u0275entryName: "src/app/platform/route-builder/route-builder.component.ts" } : {})
    ]
  },
  __spreadValues({
    path: "pay",
    loadComponent: () => import("./chunk-WHL55UZX.js").then((m) => m.PaymentComponent)
  }, false ? { \u0275entryName: "src/app/platform/payment/payment.component.ts" } : {}),
  __spreadValues({
    path: "pay/success",
    loadComponent: () => import("./chunk-P5L2SKEY.js").then((m) => m.PaymentSuccessComponent)
  }, false ? { \u0275entryName: "src/app/platform/payment-success/payment-success.component.ts" } : {})
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
    const loadFn = () => this.moduleImpl ?? import("./chunk-QJ5OGJWE.js").then((m) => m);
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

// src/app/shared/config/firebase.config.ts
var firebaseConfig = {
  apiKey: "AIzaSyBkkjVmAcq4CZRkr-Oc0lcCGKfSqSZRjdQ",
  authDomain: "venture-map-web.firebaseapp.com",
  projectId: "venture-map-web",
  storageBucket: "venture-map-web.firebasestorage.app",
  messagingSenderId: "457351831227",
  appId: "1:457351831227:web:c2bb8010bf390f49cf939e"
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};

// src/app/components/pwa-prompt/pwa-prompt.component.ts
function PwaPromptComponent_div_0_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Install the app \u2014 explore Malta's spots without internet.");
    \u0275\u0275elementEnd();
  }
}
function PwaPromptComponent_div_0_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " Tap ");
    \u0275\u0275elementStart(2, "b");
    \u0275\u0275text(3, "Share");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 9);
    \u0275\u0275text(5, "\u2399");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " then ");
    \u0275\u0275elementStart(7, "b");
    \u0275\u0275text(8, "Add to Home Screen");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " to install. ");
    \u0275\u0275elementEnd();
  }
}
function PwaPromptComponent_div_0_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function PwaPromptComponent_div_0_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.install());
    });
    \u0275\u0275text(1, "Install");
    \u0275\u0275elementEnd();
  }
}
function PwaPromptComponent_div_0_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function PwaPromptComponent_div_0_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.dismiss());
    });
    \u0275\u0275text(1, "Got it");
    \u0275\u0275elementEnd();
  }
}
function PwaPromptComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275text(2, "\u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "strong");
    \u0275\u0275text(5, "Use offline");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, PwaPromptComponent_div_0_span_6_Template, 2, 0, "span", 4)(7, PwaPromptComponent_div_0_span_7_Template, 10, 0, "span", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 5)(9, "button", 6);
    \u0275\u0275listener("click", function PwaPromptComponent_div_0_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismiss());
    });
    \u0275\u0275text(10, "Later");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, PwaPromptComponent_div_0_button_11_Template, 2, 0, "button", 7)(12, PwaPromptComponent_div_0_button_12_Template, 2, 0, "button", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 8);
    \u0275\u0275listener("click", function PwaPromptComponent_div_0_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismiss());
    });
    \u0275\u0275text(14, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ios", ctx_r1.isIos);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", !ctx_r1.isIos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isIos);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.isIos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isIos);
  }
}
var DISMISSED_KEY = "pwa-prompt-dismissed";
var DISMISS_TTL = 30 * 24 * 60 * 60 * 1e3;
var PwaPromptComponent = class _PwaPromptComponent {
  constructor() {
    this.visible = false;
    this.isIos = false;
    this.platformId = inject(PLATFORM_ID);
    this.deferredPrompt = null;
    this.installHandler = (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.scheduleShow();
    };
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    if (window.matchMedia("(display-mode: standalone)").matches)
      return;
    if (window.navigator.standalone)
      return;
    const ts = localStorage.getItem(DISMISSED_KEY);
    if (ts && Date.now() - parseInt(ts) < DISMISS_TTL)
      return;
    this.isIos = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
    if (this.isIos) {
      this.scheduleShow();
    } else {
      window.addEventListener("beforeinstallprompt", this.installHandler);
    }
  }
  scheduleShow() {
    setTimeout(() => {
      this.visible = true;
    }, 4e3);
  }
  install() {
    return __async(this, null, function* () {
      if (!this.deferredPrompt)
        return;
      this.deferredPrompt.prompt();
      yield this.deferredPrompt.userChoice;
      this.deferredPrompt = null;
      this.dismiss();
    });
  }
  dismiss() {
    this.visible = false;
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  }
  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId))
      return;
    window.removeEventListener("beforeinstallprompt", this.installHandler);
  }
  static {
    this.\u0275fac = function PwaPromptComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PwaPromptComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PwaPromptComponent, selectors: [["app-pwa-prompt"]], decls: 1, vars: 1, consts: [["class", "pwa-card", 3, "ios", 4, "ngIf"], [1, "pwa-card"], [1, "pwa-card__icon"], [1, "pwa-card__body"], [4, "ngIf"], [1, "pwa-card__actions"], [1, "btn-later", 3, "click"], ["class", "btn-install", 3, "click", 4, "ngIf"], ["aria-label", "Close", 1, "pwa-card__close", 3, "click"], [1, "ios-share"], [1, "btn-install", 3, "click"]], template: function PwaPromptComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, PwaPromptComponent_div_0_Template, 15, 6, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.visible);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.pwa-card[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 80px;\n  left: 16px;\n  right: 16px;\n  max-width: 420px;\n  margin: 0 auto;\n  right: 16px;\n  background: #fff;\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);\n  padding: 14px 25px 14px 14px;\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  z-index: 9999;\n  animation: _ngcontent-%COMP%_slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(120%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.pwa-card__icon[_ngcontent-%COMP%] {\n  font-size: 26px;\n  line-height: 1;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.pwa-card__body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  font-size: 13px;\n  line-height: 1.4;\n  color: #374151;\n}\n.pwa-card__body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #111827;\n}\n.pwa-card__body[_ngcontent-%COMP%]   .ios-share[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n}\n.pwa-card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  flex-shrink: 0;\n}\n.pwa-card__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 20px;\n  padding: 6px 14px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.btn-later[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.btn-install[_ngcontent-%COMP%] {\n  background: #F4A922;\n  color: #fff;\n}\n.pwa-card__close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 10px;\n  background: none;\n  border: none;\n  font-size: 18px;\n  line-height: 1;\n  color: #9ca3af;\n  cursor: pointer;\n  padding: 0;\n}\n/*# sourceMappingURL=pwa-prompt.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PwaPromptComponent, { className: "PwaPromptComponent", filePath: "src/app/components/pwa-prompt/pwa-prompt.component.ts", lineNumber: 130 });
})();

// src/app/components/auth-modal/auth-modal.component.ts
var AuthModalComponent = class _AuthModalComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.loading = false;
  }
  signIn() {
    return __async(this, null, function* () {
      this.loading = true;
      try {
        yield this.auth.signInWithGoogle();
      } finally {
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function AuthModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthModalComponent, selectors: [["app-auth-modal"]], decls: 24, vars: 2, consts: [[1, "modal-backdrop", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-close", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "modal-logo"], [1, "modal-title"], [1, "modal-subtitle"], [1, "btn-google", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 48 48"], ["fill", "#EA4335", "d", "M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.8 2.5 30.3 0 24 0 14.7 0 6.7 5.4 2.9 13.3l7.8 6C12.5 13 17.8 9.5 24 9.5z"], ["fill", "#4285F4", "d", "M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"], ["fill", "#FBBC05", "d", "M10.7 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.2-6.1z"], ["fill", "#34A853", "d", "M24 48c6.2 0 11.5-2 15.3-5.5l-7.5-5.8c-2 1.4-4.6 2.3-7.8 2.3-6.2 0-11.5-4.2-13.3-9.9l-8.2 6.1C6.7 42.6 14.7 48 24 48z"], [1, "modal-legal"], ["href", "/privacy", "target", "_blank"]], template: function AuthModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function AuthModalComponent_Template_div_click_0_listener() {
          return ctx.auth.closeLoginModal();
        });
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275listener("click", function AuthModalComponent_Template_div_click_1_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275elementStart(2, "button", 2);
        \u0275\u0275listener("click", function AuthModalComponent_Template_button_click_2_listener() {
          return ctx.auth.closeLoginModal();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "line", 4)(5, "line", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "div", 6);
        \u0275\u0275text(7, "\u{1F5FA}\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "h2", 7);
        \u0275\u0275text(9, "Unlock exclusive deals");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p", 8);
        \u0275\u0275text(11, "Sign in to reveal discount codes and save your favourite spots across Malta & Gozo.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 9);
        \u0275\u0275listener("click", function AuthModalComponent_Template_button_click_12_listener() {
          return ctx.signIn();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(13, "svg", 10);
        \u0275\u0275element(14, "path", 11)(15, "path", 12)(16, "path", 13)(17, "path", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275text(18);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(19, "p", 15);
        \u0275\u0275text(20, "By signing in you agree to our ");
        \u0275\u0275elementStart(21, "a", 16);
        \u0275\u0275text(22, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(23, ".");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Signing in\u2026" : "Continue with Google", " ");
      }
    }, dependencies: [CommonModule], styles: ["\n\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  padding: 16px;\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 20px;\n  padding: 36px 28px 28px;\n  width: 100%;\n  max-width: 380px;\n  position: relative;\n  text-align: center;\n  animation: _ngcontent-%COMP%_slideUp 0.2s ease;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(16px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.modal-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 6px;\n  color: var(--color-text-muted);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background var(--transition);\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.modal-logo[_ngcontent-%COMP%] {\n  font-size: 40px;\n  margin-bottom: 12px;\n  line-height: 1;\n}\n.modal-title[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--color-text-base);\n}\n.modal-subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 28px;\n  font-size: 14px;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n}\n.btn-google[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  padding: 13px 20px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  background: #fff;\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--color-text-base);\n  cursor: pointer;\n  transition: background var(--transition), box-shadow var(--transition);\n}\n.btn-google[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-bg-light);\n  box-shadow: var(--shadow-sm);\n}\n.btn-google[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n.modal-legal[_ngcontent-%COMP%] {\n  margin: 16px 0 0;\n  font-size: 11px;\n  color: var(--color-text-light);\n}\n.modal-legal[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  text-decoration: underline;\n}\n/*# sourceMappingURL=auth-modal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthModalComponent, { className: "AuthModalComponent", filePath: "src/app/components/auth-modal/auth-modal.component.ts", lineNumber: 138 });
})();

// src/app/app.component.ts
function AppComponent_app_pwa_prompt_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-pwa-prompt");
  }
}
function AppComponent_app_auth_modal_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-auth-modal");
  }
}
var MAP_ROUTES = ["/malta", "/"];
var AppComponent = class _AppComponent {
  constructor() {
    this.version = version;
    this.isMapRoute = true;
    this.platformId = inject(PLATFORM_ID);
    this.router = inject(Router);
    this.destroyRef = inject(DestroyRef);
    this.authService = inject(AuthService);
    this._userData = inject(UserDataService);
    this.HASH_RENAMES = {
      "/list": "/malta/list",
      "/trend": "/malta/30-places-2026",
      "/plan": "/malta/plan"
    };
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.handleLegacyHashUrls();
      this.handleRedirectParam();
    }
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef)).subscribe((e) => {
      const url = e.urlAfterRedirects;
      this.isMapRoute = MAP_ROUTES.some((r) => url === r || url.startsWith(r + "?") || url.startsWith("/malta/"));
    });
  }
  handleLegacyHashUrls() {
    const hash = window.location.hash;
    if (!hash.startsWith("#/"))
      return;
    const hashContent = hash.slice(1);
    const qIdx = hashContent.indexOf("?");
    const oldPath = qIdx === -1 ? hashContent : hashContent.slice(0, qIdx);
    const query = qIdx === -1 ? "" : hashContent.slice(qIdx);
    const newUrl = (this.HASH_RENAMES[oldPath] ?? oldPath) + query;
    this.router.navigateByUrl(newUrl, { replaceUrl: true });
  }
  handleRedirectParam() {
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    if (redirect) {
      this.router.navigateByUrl(decodeURIComponent(redirect), { replaceUrl: true });
    }
  }
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 5, vars: 3, consts: [[4, "ngIf"], [1, "app-version"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
        \u0275\u0275template(1, AppComponent_app_pwa_prompt_1_Template, 1, 0, "app-pwa-prompt", 0);
        \u0275\u0275elementStart(2, "span", 1);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, AppComponent_app_auth_modal_4_Template, 1, 0, "app-auth-modal", 0);
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isMapRoute);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("v", ctx.version, "");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.showLoginModal());
      }
    }, dependencies: [RouterOutlet, CommonModule, NgIf, PwaPromptComponent, AuthModalComponent], styles: ["\n\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n.app-version[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 2px;\n  right: 10px;\n  transform: translateX(-50%);\n  font-size: 6px;\n  color: #111827;\n  opacity: 0.4;\n  pointer-events: none;\n  z-index: 9999;\n  letter-spacing: 0.3px;\n  font-family: monospace;\n  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);\n}\n/*# sourceMappingURL=app.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 22 });
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
