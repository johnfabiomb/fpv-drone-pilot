import {
  version
} from "./chunk-ZYVSRP6N.js";
import {
  FEATURES
} from "./chunk-D7BDNDUA.js";
import {
  UserDataService,
  getFirestore,
  provideFirestore
} from "./chunk-YW32N6GM.js";
import {
  AuthService,
  getAuth,
  initializeApp,
  provideAuth,
  provideFirebaseApp
} from "./chunk-LKVJC54M.js";
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
  computed,
  filter,
  inject,
  isPlatformBrowser,
  makeEnvironmentProviders,
  performanceMarkFeature,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinvalidFactory,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
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
    loadComponent: () => import("./chunk-4M7UFA2Z.js").then((mod) => mod.PrivacyComponent)
  }, false ? { \u0275entryName: "src/app/platform/privacy/privacy.component.ts" } : {}),
  __spreadValues({
    path: "cookies",
    loadComponent: () => import("./chunk-3HA6FG22.js").then((mod) => mod.CookiesComponent)
  }, false ? { \u0275entryName: "src/app/platform/cookies/cookies.component.ts" } : {}),
  __spreadValues({
    path: "about",
    loadComponent: () => import("./chunk-EGTM3553.js").then((mod) => mod.AboutComponent)
  }, false ? { \u0275entryName: "src/app/platform/about/about.component.ts" } : {}),
  __spreadValues({
    path: "contact",
    loadComponent: () => import("./chunk-3E7J4TXF.js").then((mod) => mod.ContactComponent)
  }, false ? { \u0275entryName: "src/app/platform/contact/contact.component.ts" } : {}),
  {
    path: "malta",
    children: [
      __spreadValues({
        // Shell owns the persistent map — '' matches /malta, /malta/list, /malta/deals
        path: "",
        loadComponent: () => import("./chunk-HAMS2VOD.js").then((m) => m.MapShellComponent),
        children: [
          {
            path: "",
            pathMatch: "full",
            loadComponent: () => import("./chunk-6DUJADEM.js").then((mod) => mod.MapExploreComponent)
          },
          {
            path: "list",
            loadComponent: () => import("./chunk-D2GSYVZK.js").then((m) => m.LocationListComponent)
          },
          {
            path: "deals",
            loadComponent: () => import("./chunk-BPXYVGJR.js").then((m) => m.DealsComponent)
          },
          {
            path: "providers/:id",
            loadComponent: () => import("./chunk-2RFPKQPS.js").then((m) => m.ProviderPageComponent)
          },
          {
            path: "locations/:slug",
            loadComponent: () => import("./chunk-EWK3QPNR.js").then((m) => m.LocationPageComponent)
          },
          {
            path: "saved",
            loadComponent: () => import("./chunk-QXEPJRY6.js").then((m) => m.SavedPlacesComponent)
          }
        ]
      }, false ? { \u0275entryName: "src/app/platform/map-shell/map-shell.component.ts" } : {}),
      // Non-map routes are direct siblings — NOT inside the shell
      __spreadValues({
        path: "30-places-2026",
        loadComponent: () => import("./chunk-QIMPK5EC.js").then((m) => m.TopPlacesComponent)
      }, false ? { \u0275entryName: "src/app/platform/top-places/top-places.component.ts" } : {}),
      __spreadValues({
        path: "plan",
        canMatch: [() => FEATURES.ROUTE_BUILDER],
        loadComponent: () => import("./chunk-QODIW3NM.js").then((m) => m.RouteBuilderComponent)
      }, false ? { \u0275entryName: "src/app/platform/route-builder/route-builder.component.ts" } : {})
    ]
  },
  __spreadValues({
    path: "pay",
    loadComponent: () => import("./chunk-B6OHNXN4.js").then((m) => m.PaymentComponent)
  }, false ? { \u0275entryName: "src/app/platform/payment/payment.component.ts" } : {}),
  __spreadValues({
    path: "pay/success",
    loadComponent: () => import("./chunk-ZXUIC4WQ.js").then((m) => m.PaymentSuccessComponent)
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
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.pwa-card[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 80px;\n  left: 16px;\n  right: 16px;\n  max-width: 420px;\n  margin: 0 auto;\n  right: 16px;\n  background: var(--color-bg);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);\n  padding: 14px 25px 14px 14px;\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  z-index: 9999;\n  animation: _ngcontent-%COMP%_slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(120%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.pwa-card__icon[_ngcontent-%COMP%] {\n  font-size: 26px;\n  line-height: 1;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.pwa-card__body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  font-size: 13px;\n  line-height: 1.4;\n  color: var(--color-text-secondary);\n}\n.pwa-card__body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text-base);\n}\n.pwa-card__body[_ngcontent-%COMP%]   .ios-share[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n}\n.pwa-card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  flex-shrink: 0;\n}\n.pwa-card__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 20px;\n  padding: 6px 14px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.btn-later[_ngcontent-%COMP%] {\n  background: var(--color-bg-muted);\n  color: var(--color-text-muted);\n}\n.btn-install[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #fff;\n}\n.pwa-card__close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 10px;\n  background: none;\n  border: none;\n  font-size: 18px;\n  line-height: 1;\n  color: var(--color-text-light);\n  cursor: pointer;\n  padding: 0;\n}\n/*# sourceMappingURL=pwa-prompt.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PwaPromptComponent, { className: "PwaPromptComponent", filePath: "src/app/components/pwa-prompt/pwa-prompt.component.ts", lineNumber: 130 });
})();

// src/app/shared/services/in-app-browser.service.ts
var InAppBrowserService = class _InAppBrowserService {
  isInAppBrowser() {
    const ua = navigator.userAgent;
    return /Instagram|FBAN|FBAV|FB_IAB|FB4A|Line\/|Musical\.ly/i.test(ua);
  }
  isAndroid() {
    return /android/i.test(navigator.userAgent);
  }
  /** Launches the current URL in Chrome on Android via the intent:// scheme. */
  openInChrome() {
    const stripped = window.location.href.replace(/^https?:\/\//, "");
    window.location.href = `intent://${stripped}#Intent;scheme=https;package=com.android.chrome;end`;
  }
  static {
    this.\u0275fac = function InAppBrowserService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InAppBrowserService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InAppBrowserService, factory: _InAppBrowserService.\u0275fac, providedIn: "root" });
  }
};

// src/app/components/auth-modal/auth-modal.component.ts
function AuthModalComponent_ng_container_6_p_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.emailError);
  }
}
function AuthModalComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 9)(2, "span", 10);
    \u0275\u0275text(3, "\u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "img", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2", 12);
    \u0275\u0275text(6, "Sign in to unlock it all");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ul", 13)(8, "li")(9, "span", 14);
    \u0275\u0275text(10, "\u{1F516}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "Save your favourite locations");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "li")(14, "span", 14);
    \u0275\u0275text(15, "\u{1F39F}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "Unlock exclusive deals & coupon codes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "li")(19, "span", 14);
    \u0275\u0275text(20, "\u{1F4CD}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Open directions in Google Maps");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "button", 15);
    \u0275\u0275listener("click", function AuthModalComponent_ng_container_6_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signIn());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(24, "svg", 16);
    \u0275\u0275element(25, "path", 17)(26, "path", 18)(27, "path", 19)(28, "path", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(30, "div", 21)(31, "span");
    \u0275\u0275text(32, "or");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "input", 22, 0);
    \u0275\u0275listener("keydown.enter", function AuthModalComponent_ng_container_6_Template_input_keydown_enter_33_listener() {
      \u0275\u0275restoreView(_r1);
      const emailDefault_r3 = \u0275\u0275reference(34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendLink(emailDefault_r3.value, "default"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(35, AuthModalComponent_ng_container_6_p_35_Template, 2, 1, "p", 23);
    \u0275\u0275elementStart(36, "button", 24);
    \u0275\u0275listener("click", function AuthModalComponent_ng_container_6_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r1);
      const emailDefault_r3 = \u0275\u0275reference(34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendLink(emailDefault_r3.value, "default"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(37, "svg", 25);
    \u0275\u0275element(38, "rect", 26)(39, "path", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(41, "p", 28);
    \u0275\u0275text(42, "By signing in you agree to our ");
    \u0275\u0275elementStart(43, "a", 29);
    \u0275\u0275text(44, "Privacy Policy");
    \u0275\u0275elementEnd();
    \u0275\u0275text(45, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275property("disabled", ctx_r1.loadingGoogle || ctx_r1.loadingEmail);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingGoogle ? "Signing in\u2026" : "Continue with Google", " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.emailError);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loadingGoogle || ctx_r1.loadingEmail);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingEmail ? "Sending link\u2026" : "Continue with email", " ");
  }
}
function AuthModalComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 9)(2, "span", 10);
    \u0275\u0275text(3, "\u{1F310}");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h2", 12);
    \u0275\u0275text(5, "Opening Chrome\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 31);
    \u0275\u0275text(7, "Google sign-in requires a full browser. We're opening Chrome for you now.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 32);
    \u0275\u0275listener("click", function AuthModalComponent_ng_container_7_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retryAndroidRedirect());
    });
    \u0275\u0275text(9, "Open in Chrome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 28);
    \u0275\u0275text(11, "Chrome will open this page so you can sign in normally.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function AuthModalComponent_ng_container_8_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.emailError);
  }
}
function AuthModalComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 9)(2, "span", 10);
    \u0275\u0275text(3, "\u2709\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "img", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2", 12);
    \u0275\u0275text(6, "Sign in via email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 31);
    \u0275\u0275text(8, "Google sign-in isn't available in this browser. Enter your email and we'll send you a one-tap sign-in link.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 22, 1);
    \u0275\u0275listener("keydown.enter", function AuthModalComponent_ng_container_8_Template_input_keydown_enter_9_listener() {
      \u0275\u0275restoreView(_r5);
      const emailIab_r6 = \u0275\u0275reference(10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendLink(emailIab_r6.value, "email-input"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AuthModalComponent_ng_container_8_p_11_Template, 2, 1, "p", 23);
    \u0275\u0275elementStart(12, "button", 15);
    \u0275\u0275listener("click", function AuthModalComponent_ng_container_8_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const emailIab_r6 = \u0275\u0275reference(10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendLink(emailIab_r6.value, "email-input"));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 28);
    \u0275\u0275text(15, "By signing in you agree to our ");
    \u0275\u0275elementStart(16, "a", 29);
    \u0275\u0275text(17, "Privacy Policy");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx_r1.emailError);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loadingEmail);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingEmail ? "Sending\u2026" : "Send sign-in link", " ");
  }
}
function AuthModalComponent_ng_container_9_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "p", 31);
    \u0275\u0275text(2, " We sent a sign-in link to ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, ". Tap the link \u2014 your browser will sign you in automatically. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.emailAddress());
  }
}
function AuthModalComponent_ng_container_9_ng_container_6_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.checkError);
  }
}
function AuthModalComponent_ng_container_9_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "p", 31);
    \u0275\u0275text(2, " We sent a link to ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, ". Tap it in your inbox \u2014 it'll open in Safari and sign you in. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 35)(7, "div", 36)(8, "span", 37);
    \u0275\u0275text(9, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11, "Open your inbox and tap the sign-in link");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 36)(13, "span", 37);
    \u0275\u0275text(14, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Sign in in Safari, then come back here");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 36)(18, "span", 37);
    \u0275\u0275text(19, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "Tap the button below to confirm");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "button", 32);
    \u0275\u0275listener("click", function AuthModalComponent_ng_container_9_ng_container_6_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.checkSignIn());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(23, "svg", 38);
    \u0275\u0275element(24, "polyline", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " I've signed in \u2014 check now ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, AuthModalComponent_ng_container_9_ng_container_6_p_26_Template, 2, 1, "p", 40);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.emailAddress());
    \u0275\u0275advance(22);
    \u0275\u0275property("ngIf", ctx_r1.checkError);
  }
}
function AuthModalComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 33);
    \u0275\u0275text(2, "\u2709\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 12);
    \u0275\u0275text(4, "Check your email");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AuthModalComponent_ng_container_9_ng_container_5_Template, 6, 1, "ng-container", 8)(6, AuthModalComponent_ng_container_9_ng_container_6_Template, 27, 2, "ng-container", 8);
    \u0275\u0275elementStart(7, "button", 34);
    \u0275\u0275listener("click", function AuthModalComponent_ng_container_9_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(8, "\u2190 Try a different email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.isIabFlow());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isIabFlow());
  }
}
var AuthModalComponent = class _AuthModalComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.iab = inject(InAppBrowserService);
    this.platformId = inject(PLATFORM_ID);
    this.state = signal("default");
    this.emailAddress = signal("");
    this.backToState = signal("default");
    this.isIabFlow = computed(() => this.backToState() === "email-input");
    this.loadingGoogle = false;
    this.loadingEmail = false;
    this.emailError = "";
    this.checkError = "";
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    if (!this.iab.isInAppBrowser())
      return;
    if (this.iab.isAndroid()) {
      this.state.set("android-redirect");
      setTimeout(() => this.iab.openInChrome(), 400);
    } else {
      this.state.set("email-input");
    }
  }
  signIn() {
    return __async(this, null, function* () {
      this.loadingGoogle = true;
      try {
        yield this.auth.signInWithGoogle();
      } finally {
        this.loadingGoogle = false;
      }
    });
  }
  retryAndroidRedirect() {
    this.iab.openInChrome();
  }
  sendLink(email, from) {
    return __async(this, null, function* () {
      const trimmed = email.trim();
      if (!trimmed.includes("@")) {
        this.emailError = "Please enter a valid email address.";
        return;
      }
      this.loadingEmail = true;
      this.emailError = "";
      try {
        yield this.auth.sendEmailSignInLink(trimmed);
        this.emailAddress.set(trimmed);
        this.backToState.set(from);
        this.state.set("email-sent");
      } catch {
        this.emailError = "Could not send the link. Please try again.";
      } finally {
        this.loadingEmail = false;
      }
    });
  }
  checkSignIn() {
    const user = this.auth.currentSignedInUser();
    if (user) {
      this.auth.closeLoginModal();
    } else {
      this.checkError = "Not detected yet. Open the email link first, then tap this button.";
    }
  }
  goBack() {
    this.checkError = "";
    this.emailError = "";
    this.state.set(this.backToState());
  }
  static {
    this.\u0275fac = function AuthModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthModalComponent, selectors: [["app-auth-modal"]], decls: 10, vars: 4, consts: [["emailDefault", ""], ["emailIab", ""], [1, "modal-backdrop", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-close", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [4, "ngIf"], [1, "modal-header"], [1, "modal-emoji"], ["src", "/assets/images/profile.webp", "alt", "John Monta\xF1o", "width", "52", "height", "52", 1, "modal-photo"], [1, "modal-title"], [1, "modal-benefits"], [1, "modal-benefit__icon"], [1, "btn-google", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", "fill", "#4285F4"], ["d", "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", "fill", "#34A853"], ["d", "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z", "fill", "#FBBC05"], ["d", "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", "fill", "#EA4335"], [1, "divider-or"], ["type", "email", "placeholder", "your@email.com", "autocomplete", "email", "inputmode", "email", 1, "email-input", 3, "keydown.enter"], ["class", "field-error", 4, "ngIf"], [1, "btn-email", 3, "click", "disabled"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "2", "y", "4", "width", "20", "height", "16", "rx", "2"], ["d", "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"], [1, "modal-legal"], ["href", "/privacy", "target", "_blank"], [1, "field-error"], [1, "modal-subtitle"], [1, "btn-google", 3, "click"], [1, "sent-icon"], [1, "btn-ghost", 3, "click"], [1, "sent-steps"], [1, "sent-step"], [1, "sent-step__num"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], ["class", "check-error", 4, "ngIf"], [1, "check-error"]], template: function AuthModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2);
        \u0275\u0275listener("click", function AuthModalComponent_Template_div_click_0_listener() {
          return ctx.auth.closeLoginModal();
        });
        \u0275\u0275elementStart(1, "div", 3);
        \u0275\u0275listener("click", function AuthModalComponent_Template_div_click_1_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275elementStart(2, "button", 4);
        \u0275\u0275listener("click", function AuthModalComponent_Template_button_click_2_listener() {
          return ctx.auth.closeLoginModal();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 5);
        \u0275\u0275element(4, "line", 6)(5, "line", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, AuthModalComponent_ng_container_6_Template, 46, 5, "ng-container", 8)(7, AuthModalComponent_ng_container_7_Template, 12, 0, "ng-container", 8)(8, AuthModalComponent_ng_container_8_Template, 19, 3, "ng-container", 8)(9, AuthModalComponent_ng_container_9_Template, 9, 2, "ng-container", 8);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.state() === "default");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "android-redirect");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "email-input");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "email-sent");
      }
    }, dependencies: [CommonModule, NgIf], styles: ['\n\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  padding: 20px;\n  animation: _ngcontent-%COMP%_amFadeIn 0.25s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border-radius: 22px;\n  padding: 36px 24px 26px;\n  width: 100%;\n  max-width: 340px;\n  max-height: calc(100dvh - 40px);\n  overflow-y: auto;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_amSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.modal-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 6px;\n  color: var(--color-text-muted);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background var(--transition);\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 18px;\n}\n.modal-emoji[_ngcontent-%COMP%] {\n  font-size: 56px;\n  line-height: 1;\n  width: 52px;\n  text-align: center;\n}\n.modal-photo[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: var(--radius-lg);\n  object-fit: cover;\n  object-position: center top;\n  border: 2px solid var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.15);\n  flex-shrink: 0;\n}\n.modal-title[_ngcontent-%COMP%] {\n  margin: 0 0 18px;\n  font-size: 21px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  letter-spacing: -0.4px;\n  line-height: 1.2;\n}\n.modal-subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 22px;\n  font-size: 13.5px;\n  color: var(--color-text-muted);\n  line-height: 1.55;\n}\n.modal-subtitle[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n.modal-legal[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--color-text-light);\n  margin: 0;\n}\n.modal-legal[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  text-decoration: underline;\n}\n.modal-benefits[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0 0 20px;\n  padding: 0;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.modal-benefits[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-secondary);\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-lg);\n  padding: 10px 14px;\n}\n.modal-benefit__icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n  line-height: 1;\n}\n.divider-or[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  margin: 4px 0 12px;\n}\n.divider-or[_ngcontent-%COMP%]::before, \n.divider-or[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: var(--color-border);\n}\n.divider-or[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text-light);\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.email-input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 0 14px;\n  font-size: 15px;\n  color: var(--color-text-base);\n  background: var(--color-bg-light);\n  outline: none;\n  box-sizing: border-box;\n  margin-bottom: 8px;\n  transition: border-color var(--transition), box-shadow var(--transition);\n}\n.email-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  background: var(--color-bg);\n  box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.1);\n}\n.email-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-text-light);\n}\n.field-error[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 12px;\n  color: #dc2626;\n  text-align: left;\n  width: 100%;\n}\n.sent-icon[_ngcontent-%COMP%] {\n  font-size: 52px;\n  line-height: 1;\n  margin-bottom: 16px;\n}\n.sent-steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: 100%;\n  margin-bottom: 20px;\n}\n.sent-step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-secondary);\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-lg);\n  padding: 10px 14px;\n}\n.sent-step__num[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 11px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.check-error[_ngcontent-%COMP%] {\n  margin: 4px 0 8px;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n}\n.btn-google[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 9px;\n  border: none;\n  border-radius: var(--radius-xl);\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 14.5px;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 4px 16px var(--color-primary-shadow);\n  transition: opacity var(--transition), transform 0.1s;\n  margin-bottom: 10px;\n}\n.btn-google[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.92;\n}\n.btn-google[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.btn-google[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: default;\n}\n.btn-email[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 46px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    background var(--transition),\n    border-color var(--transition),\n    transform 0.1s;\n  margin-bottom: 16px;\n}\n.btn-email[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-bg-muted);\n  border-color: var(--color-text-light);\n}\n.btn-email[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.btn-email[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: default;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  padding: 6px 0;\n  transition: color var(--transition);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n@keyframes _ngcontent-%COMP%_amFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_amSlideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n/*# sourceMappingURL=auth-modal.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthModalComponent, { className: "AuthModalComponent", filePath: "src/app/components/auth-modal/auth-modal.component.ts", lineNumber: 458 });
})();

// src/app/components/welcome-popup/welcome-popup.component.ts
function WelcomePopupComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function WelcomePopupComponent_div_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismiss());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function WelcomePopupComponent_div_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3)(3, "span", 4);
    \u0275\u0275text(4, "\u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "img", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 6);
    \u0275\u0275text(7, "Hey, I'm John \u{1F44B}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h2", 7);
    \u0275\u0275text(9, "Welcome to My Malta Map!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 8);
    \u0275\u0275text(11, "Your guide to Malta's best spots \u2014 sign in to get the most out of it.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "ul", 9)(13, "li")(14, "span", 10);
    \u0275\u0275text(15, "\u{1F516}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "Save your favourite spots and revisit them anytime");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "li")(19, "span", 10);
    \u0275\u0275text(20, "\u{1F39F}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Unlock exclusive deals & coupon codes from local partners");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "li")(24, "span", 10);
    \u0275\u0275text(25, "\u{1F4CD}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27, "Get directions straight to every location on the map");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "button", 11);
    \u0275\u0275listener("click", function WelcomePopupComponent_div_0_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signIn());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(29, "svg", 12);
    \u0275\u0275element(30, "path", 13)(31, "path", 14)(32, "path", 15)(33, "path", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(34, " Sign in with Google ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(35, "button", 17);
    \u0275\u0275listener("click", function WelcomePopupComponent_div_0_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismiss());
    });
    \u0275\u0275text(36, " Continue as guest ");
    \u0275\u0275elementEnd()()();
  }
}
var WelcomePopupComponent = class _WelcomePopupComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.platformId = inject(PLATFORM_ID);
    this.visible = signal(false);
    this.STORAGE_KEY = "vm_welcome_shown";
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    if (this.auth.isLoggedIn())
      return;
    if (localStorage.getItem(this.STORAGE_KEY))
      return;
    setTimeout(() => {
      if (!this.auth.isLoggedIn()) {
        this.visible.set(true);
        localStorage.setItem(this.STORAGE_KEY, "1");
      }
    }, 2500);
  }
  signIn() {
    this.visible.set(false);
    this.auth.openLoginModal();
  }
  dismiss() {
    this.visible.set(false);
  }
  static {
    this.\u0275fac = function WelcomePopupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WelcomePopupComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WelcomePopupComponent, selectors: [["app-welcome-popup"]], decls: 1, vars: 1, consts: [["class", "wp-backdrop", 3, "click", 4, "ngIf"], [1, "wp-backdrop", 3, "click"], [1, "wp-card", 3, "click"], [1, "wp-header"], [1, "wp-emoji"], ["src", "/assets/images/profile.webp", "alt", "John Monta\xF1o", "width", "52", "height", "52", 1, "wp-photo", 2, "flex-shrink", "0"], [1, "wp-hey"], [1, "wp-title"], [1, "wp-sub"], [1, "wp-benefits"], [1, "wp-benefit__icon"], [1, "wp-btn", "wp-btn--primary", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", "fill", "#4285F4"], ["d", "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", "fill", "#34A853"], ["d", "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z", "fill", "#FBBC05"], ["d", "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", "fill", "#EA4335"], [1, "wp-btn", "wp-btn--ghost", 3, "click"]], template: function WelcomePopupComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, WelcomePopupComponent_div_0_Template, 37, 0, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.visible());
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.wp-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1200;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  animation: _ngcontent-%COMP%_wpFadeIn 0.3s ease;\n}\n.wp-card[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border-radius: 22px;\n  padding: 36px 24px 26px;\n  width: 100%;\n  max-width: 340px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_wpSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.wp-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 18px;\n}\n.wp-emoji[_ngcontent-%COMP%] {\n  font-size: 56px;\n  line-height: 1;\n  width: 52px;\n  text-align: center;\n}\n.wp-photo[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: var(--radius-lg);\n  object-fit: cover;\n  object-position: center top;\n  border: 2px solid var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.15);\n}\n.wp-hey[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-primary);\n  letter-spacing: 0.01em;\n}\n.wp-title[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  letter-spacing: -0.4px;\n  line-height: 1.2;\n}\n.wp-sub[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n}\n.wp-benefits[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0 0 26px;\n  padding: 0;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.wp-benefits[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-secondary);\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-lg);\n  padding: 11px 14px;\n}\n.wp-benefit__icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  flex-shrink: 0;\n  line-height: 1;\n}\n.wp-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: var(--radius-xl);\n  font-size: 14.5px;\n  font-weight: 700;\n  cursor: pointer;\n  border: none;\n  transition:\n    opacity var(--transition),\n    background var(--transition),\n    transform 0.1s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 9px;\n}\n.wp-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.wp-btn--primary[_ngcontent-%COMP%] {\n  height: 50px;\n  background: var(--color-primary);\n  color: #fff;\n  margin-bottom: 10px;\n  box-shadow: 0 4px 16px var(--color-primary-shadow);\n}\n.wp-btn--primary[_ngcontent-%COMP%]:hover {\n  opacity: 0.92;\n}\n.wp-btn--ghost[_ngcontent-%COMP%] {\n  height: 38px;\n  background: transparent;\n  color: var(--color-text-muted);\n  font-size: 13px;\n  font-weight: 500;\n}\n.wp-btn--ghost[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n@keyframes _ngcontent-%COMP%_wpFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_wpSlideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n/*# sourceMappingURL=welcome-popup.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WelcomePopupComponent, { className: "WelcomePopupComponent", filePath: "src/app/components/welcome-popup/welcome-popup.component.ts", lineNumber: 202 });
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
      this.handleEmailSignInLink();
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
  handleEmailSignInLink() {
    if (!this.authService.isEmailSignInLink(window.location.href))
      return;
    this.authService.completeEmailSignIn(window.location.href).then((completed) => {
      if (completed) {
        this.router.navigateByUrl("/malta", { replaceUrl: true });
      }
    });
  }
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 6, vars: 3, consts: [[4, "ngIf"], [1, "app-version"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
        \u0275\u0275template(1, AppComponent_app_pwa_prompt_1_Template, 1, 0, "app-pwa-prompt", 0);
        \u0275\u0275elementStart(2, "span", 1);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, AppComponent_app_auth_modal_4_Template, 1, 0, "app-auth-modal", 0);
        \u0275\u0275element(5, "app-welcome-popup");
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isMapRoute);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("v", ctx.version, "");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.showLoginModal());
      }
    }, dependencies: [RouterOutlet, CommonModule, NgIf, PwaPromptComponent, AuthModalComponent, WelcomePopupComponent], styles: ["\n\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n.app-version[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 2px;\n  right: 10px;\n  transform: translateX(-50%);\n  font-size: 6px;\n  color: var(--color-text-base);\n  opacity: 0.4;\n  pointer-events: none;\n  z-index: 9999;\n  letter-spacing: 0.3px;\n  font-family: monospace;\n  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);\n}\n/*# sourceMappingURL=app.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 23 });
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
