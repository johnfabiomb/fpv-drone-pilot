import {
  UserProfileCardComponent,
  version
} from "./chunk-2RWEJCW4.js";
import {
  FEATURES
} from "./chunk-AFV7OAE7.js";
import {
  AppModalComponent
} from "./chunk-6W5N77V2.js";
import {
  ProfileModalService
} from "./chunk-WETHF3DM.js";
import {
  UserDataService,
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  persistentLocalCache,
  provideFirestore
} from "./chunk-AUG5IYR7.js";
import {
  AuthService,
  getApp2 as getApp,
  getAuth,
  initializeApp,
  provideAuth,
  provideFirebaseApp
} from "./chunk-HPOPY4XD.js";
import {
  takeUntilDestroyed
} from "./chunk-YJYHGMFB.js";
import {
  NavigationEnd,
  Router,
  RouterOutlet,
  provideRouter
} from "./chunk-6DNTZJP4.js";
import {
  DomRendererFactory2,
  bootstrapApplication
} from "./chunk-CGA4Y22O.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionScheduler,
  CommonModule,
  DOCUMENT,
  DestroyRef,
  EventEmitter,
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
  effect,
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
  ɵɵconditional,
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
} from "./chunk-E43Y6J77.js";

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "malta"
  },
  __spreadValues({
    path: "",
    loadComponent: () => import("./chunk-625BICRR.js").then((mod) => mod.HomeComponent)
  }, false ? { \u0275entryName: "src/app/platform/home/home.component.ts" } : {}),
  __spreadValues({
    path: "privacy",
    loadComponent: () => import("./chunk-X757D7HT.js").then((mod) => mod.PrivacyComponent)
  }, false ? { \u0275entryName: "src/app/platform/privacy/privacy.component.ts" } : {}),
  __spreadValues({
    path: "cookies",
    loadComponent: () => import("./chunk-RRZQ67KU.js").then((mod) => mod.CookiesComponent)
  }, false ? { \u0275entryName: "src/app/platform/cookies/cookies.component.ts" } : {}),
  __spreadValues({
    path: "about",
    loadComponent: () => import("./chunk-GSNHEDL5.js").then((mod) => mod.AboutComponent)
  }, false ? { \u0275entryName: "src/app/platform/about/about.component.ts" } : {}),
  __spreadValues({
    path: "contact",
    loadComponent: () => import("./chunk-PT5PDIC6.js").then((mod) => mod.ContactComponent)
  }, false ? { \u0275entryName: "src/app/platform/contact/contact.component.ts" } : {}),
  {
    path: "malta",
    children: [
      __spreadValues({
        // Shell owns the persistent map — '' matches /malta, /malta/list, /malta/deals
        path: "",
        loadComponent: () => import("./chunk-W33DDAN5.js").then((m) => m.MapShellComponent),
        children: [
          {
            path: "",
            pathMatch: "full",
            loadComponent: () => import("./chunk-3VUI7ENT.js").then((mod) => mod.MapExploreComponent)
          },
          {
            path: "list",
            loadComponent: () => import("./chunk-LCQQG726.js").then((m) => m.LocationListComponent)
          },
          {
            path: "deals",
            loadComponent: () => import("./chunk-JUBR7HFT.js").then((m) => m.DealsComponent)
          },
          {
            path: "providers/:id",
            loadComponent: () => import("./chunk-2NT7Z42M.js").then((m) => m.ProviderPageComponent)
          },
          {
            path: "locations/:slug",
            loadComponent: () => import("./chunk-VM2UOSHV.js").then((m) => m.LocationPageComponent)
          },
          {
            path: "saved",
            loadComponent: () => import("./chunk-GOJZXY3R.js").then((m) => m.SavedPlacesComponent)
          },
          {
            path: "admin",
            canMatch: [() => inject(UserDataService).isAdmin()],
            loadComponent: () => import("./chunk-7PGLHH5F.js").then((m) => m.AdminPanelComponent)
          },
          {
            path: "groups",
            canMatch: [() => FEATURES.GROUPS],
            loadComponent: () => import("./chunk-VH5Y33EF.js").then((m) => m.ExploreTogetherComponent)
          },
          {
            path: "groups/:id",
            canMatch: [() => FEATURES.GROUPS],
            loadComponent: () => import("./chunk-XKPGFBHL.js").then((m) => m.GroupDetailComponent)
          }
        ]
      }, false ? { \u0275entryName: "src/app/platform/map-shell/map-shell.component.ts" } : {}),
      // Non-map routes are direct siblings — NOT inside the shell
      __spreadValues({
        path: "30-places-2026",
        loadComponent: () => import("./chunk-MKK4MPT5.js").then((m) => m.TopPlacesComponent)
      }, false ? { \u0275entryName: "src/app/platform/top-places/top-places.component.ts" } : {}),
      __spreadValues({
        path: "plan",
        canMatch: [() => FEATURES.ROUTE_BUILDER],
        loadComponent: () => import("./chunk-QYBAKHYK.js").then((m) => m.RouteBuilderComponent)
      }, false ? { \u0275entryName: "src/app/platform/route-builder/route-builder.component.ts" } : {})
    ]
  },
  __spreadValues({
    path: "pay",
    loadComponent: () => import("./chunk-F4RGLCW2.js").then((m) => m.PaymentComponent)
  }, false ? { \u0275entryName: "src/app/platform/payment/payment.component.ts" } : {}),
  __spreadValues({
    path: "pay/success",
    loadComponent: () => import("./chunk-OTLLCKQ3.js").then((m) => m.PaymentSuccessComponent)
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
    const loadFn = () => this.moduleImpl ?? import("./chunk-Y6FR3UKK.js").then((m) => m);
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
    provideFirestore(() => {
      try {
        return initializeFirestore(getApp(), {
          localCache: typeof indexedDB !== "undefined" ? persistentLocalCache() : memoryLocalCache()
        });
      } catch {
        return getFirestore(getApp());
      }
    })
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

// src/app/components/sign-in-form/sign-in-form.component.ts
function SignInFormComponent_ng_container_0_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.googleError);
  }
}
function SignInFormComponent_ng_container_0_p_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.emailError);
  }
}
function SignInFormComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "button", 3);
    \u0275\u0275listener("click", function SignInFormComponent_ng_container_0_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signInWithGoogle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 4);
    \u0275\u0275element(3, "path", 5)(4, "path", 6)(5, "path", 7)(6, "path", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, SignInFormComponent_ng_container_0_p_8_Template, 2, 1, "p", 9);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 10)(10, "span");
    \u0275\u0275text(11, "or");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "input", 11, 0);
    \u0275\u0275listener("keydown.enter", function SignInFormComponent_ng_container_0_Template_input_keydown_enter_12_listener() {
      \u0275\u0275restoreView(_r1);
      const emailDefault_r3 = \u0275\u0275reference(13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendLink(emailDefault_r3.value, "default"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, SignInFormComponent_ng_container_0_p_14_Template, 2, 1, "p", 9);
    \u0275\u0275elementStart(15, "button", 12);
    \u0275\u0275listener("click", function SignInFormComponent_ng_container_0_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const emailDefault_r3 = \u0275\u0275reference(13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendLink(emailDefault_r3.value, "default"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 13);
    \u0275\u0275element(17, "rect", 14)(18, "path", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingGoogle ? "Signing in\u2026" : "Continue with Google", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.googleError);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.emailError);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingEmail ? "Sending\u2026" : "Continue with email", " ");
  }
}
function SignInFormComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 17);
    \u0275\u0275text(2, "\u{1F310}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 18);
    \u0275\u0275text(4, "Opening Chrome for sign-in\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 19);
    \u0275\u0275listener("click", function SignInFormComponent_ng_container_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retryAndroidRedirect());
    });
    \u0275\u0275text(6, "Open in Chrome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function SignInFormComponent_ng_container_2_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.emailError);
  }
}
function SignInFormComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "p", 18);
    \u0275\u0275text(2, "You're in a browser that blocks Google sign-in \u2014 no worries! Drop your email and I'll send you a magic link.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 11, 1);
    \u0275\u0275listener("keydown.enter", function SignInFormComponent_ng_container_2_Template_input_keydown_enter_3_listener() {
      \u0275\u0275restoreView(_r5);
      const emailIab_r6 = \u0275\u0275reference(4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendLink(emailIab_r6.value, "email-input"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, SignInFormComponent_ng_container_2_p_5_Template, 2, 1, "p", 9);
    \u0275\u0275elementStart(6, "button", 3);
    \u0275\u0275listener("click", function SignInFormComponent_ng_container_2_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const emailIab_r6 = \u0275\u0275reference(4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendLink(emailIab_r6.value, "email-input"));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.emailError);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loadingEmail);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingEmail ? "Sending\u2026" : "Send sign-in link", " ");
  }
}
function SignInFormComponent_ng_container_3_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " I've sent a sign-in link to ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u2014 just tap it and you're in. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.emailAddress());
  }
}
function SignInFormComponent_ng_container_3_ng_container_6_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.checkError);
  }
}
function SignInFormComponent_ng_container_3_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "p", 18);
    \u0275\u0275text(2, " I've sent a link to ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, ". Tap it in your inbox \u2014 it opens in Safari and signs you in. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 24)(7, "div", 25)(8, "span", 26);
    \u0275\u0275text(9, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11, "Open your inbox and tap the sign-in link");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 25)(13, "span", 26);
    \u0275\u0275text(14, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Head to Safari, sign in, then come back here");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 25)(18, "span", 26);
    \u0275\u0275text(19, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "Tap the button below to confirm");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "button", 19);
    \u0275\u0275listener("click", function SignInFormComponent_ng_container_3_ng_container_6_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.checkSignIn());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(23, "svg", 27);
    \u0275\u0275element(24, "polyline", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " I've signed in \u2014 check now ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, SignInFormComponent_ng_container_3_ng_container_6_p_26_Template, 2, 1, "p", 29);
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
function SignInFormComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 20);
    \u0275\u0275text(2, "\u2709\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 21);
    \u0275\u0275text(4, "Link on its way! \u2709\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, SignInFormComponent_ng_container_3_p_5_Template, 5, 1, "p", 22)(6, SignInFormComponent_ng_container_3_ng_container_6_Template, 27, 2, "ng-container", 2);
    \u0275\u0275elementStart(7, "button", 23);
    \u0275\u0275listener("click", function SignInFormComponent_ng_container_3_Template_button_click_7_listener() {
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
var SignInFormComponent = class _SignInFormComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.iab = inject(InAppBrowserService);
    this.platformId = inject(PLATFORM_ID);
    this.stateChange = new EventEmitter();
    this.state = signal("default");
    this.emailAddress = signal("");
    this.backToState = signal("default");
    this.isIabFlow = computed(() => this.backToState() === "email-input");
    this.loadingGoogle = false;
    this.loadingEmail = false;
    this.googleError = "";
    this.emailError = "";
    this.checkError = "";
  }
  get busy() {
    return this.loadingGoogle || this.loadingEmail;
  }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId))
      return;
    if (!this.iab.isInAppBrowser())
      return;
    if (this.iab.isAndroid()) {
      this.setState("android-redirect");
      setTimeout(() => this.iab.openInChrome(), 400);
    } else {
      this.setState("email-input");
    }
  }
  signInWithGoogle() {
    return __async(this, null, function* () {
      if (this.busy)
        return;
      this.loadingGoogle = true;
      this.googleError = "";
      try {
        yield this.auth.signInWithGoogle();
      } catch (err) {
        this.googleError = this.resolveGoogleError(err?.code);
      } finally {
        this.loadingGoogle = false;
      }
    });
  }
  retryAndroidRedirect() {
    this.iab.openInChrome();
  }
  sendLink(email, from = "default") {
    return __async(this, null, function* () {
      if (this.busy)
        return;
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
        this.setState("email-sent");
      } catch {
        this.emailError = "Could not send the link. Please try again.";
      } finally {
        this.loadingEmail = false;
      }
    });
  }
  checkSignIn() {
    if (this.auth.currentSignedInUser()) {
      this.auth.closeLoginModal();
    } else {
      this.checkError = "Not detected yet \u2014 open the email link first, then tap here.";
    }
  }
  goBack() {
    this.checkError = "";
    this.emailError = "";
    this.googleError = "";
    this.setState(this.backToState());
  }
  setState(s) {
    this.state.set(s);
    this.stateChange.emit(s);
  }
  resolveGoogleError(code) {
    switch (code) {
      case "auth/popup-closed-by-user":
      case "auth/cancelled-popup-request":
        return "Sign-in was cancelled.";
      case "auth/popup-blocked":
        return "Popup blocked \u2014 please allow popups for this site.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection.";
      default:
        return "Sign-in failed. Please try again.";
    }
  }
  static {
    this.\u0275fac = function SignInFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SignInFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SignInFormComponent, selectors: [["app-sign-in-form"]], outputs: { stateChange: "stateChange" }, decls: 4, vars: 4, consts: [["emailDefault", ""], ["emailIab", ""], [4, "ngIf"], [1, "sf-btn", "sf-btn--primary", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", "aria-hidden", "true"], ["d", "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", "fill", "#4285F4"], ["d", "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", "fill", "#34A853"], ["d", "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z", "fill", "#FBBC05"], ["d", "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", "fill", "#EA4335"], ["class", "sf-error", 4, "ngIf"], [1, "sf-divider"], ["type", "email", "placeholder", "your@email.com", "autocomplete", "email", "inputmode", "email", 1, "sf-input", 3, "keydown.enter"], [1, "sf-btn", "sf-btn--secondary", 3, "click", "disabled"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["x", "2", "y", "4", "width", "20", "height", "16", "rx", "2"], ["d", "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"], [1, "sf-error"], [1, "sf-redirect-icon"], [1, "sf-note"], [1, "sf-btn", "sf-btn--primary", 3, "click"], [1, "sf-sent-icon"], [1, "sf-sent-title"], ["class", "sf-note", 4, "ngIf"], [1, "sf-btn", "sf-btn--ghost", 3, "click"], [1, "sf-steps"], [1, "sf-step"], [1, "sf-step__num"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["points", "20 6 9 17 4 12"], ["class", "sf-check-error", 4, "ngIf"], [1, "sf-check-error"]], template: function SignInFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, SignInFormComponent_ng_container_0_Template, 20, 6, "ng-container", 2)(1, SignInFormComponent_ng_container_1_Template, 7, 0, "ng-container", 2)(2, SignInFormComponent_ng_container_2_Template, 8, 3, "ng-container", 2)(3, SignInFormComponent_ng_container_3_Template, 9, 2, "ng-container", 2);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.state() === "default");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "android-redirect");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "email-input");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.state() === "email-sent");
      }
    }, dependencies: [CommonModule, NgIf], styles: ['\n\n[_nghost-%COMP%] {\n  display: contents;\n}\n.sf-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 9px;\n  border-radius: var(--radius-xl);\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    opacity var(--transition),\n    background var(--transition),\n    border-color var(--transition),\n    transform 0.1s;\n}\n.sf-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.sf-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.sf-btn--primary[_ngcontent-%COMP%] {\n  height: 50px;\n  border: none;\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 14.5px;\n  box-shadow: 0 4px 16px var(--color-primary-shadow);\n  margin-bottom: 10px;\n}\n.sf-btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.92;\n}\n.sf-btn--secondary[_ngcontent-%COMP%] {\n  height: 46px;\n  border: 1.5px solid var(--color-border);\n  background: var(--color-bg);\n  color: var(--color-text-secondary);\n  font-size: 14px;\n  margin-bottom: 16px;\n}\n.sf-btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-bg-muted);\n  border-color: var(--color-text-light);\n}\n.sf-btn--ghost[_ngcontent-%COMP%] {\n  height: auto;\n  border: none;\n  background: none;\n  color: var(--color-text-muted);\n  font-size: 13px;\n  font-weight: 500;\n  padding: 6px 0;\n  margin-bottom: 0;\n  box-shadow: none;\n}\n.sf-btn--ghost[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n  opacity: 1;\n}\n.sf-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  margin: 2px 0 12px;\n}\n.sf-divider[_ngcontent-%COMP%]::before, \n.sf-divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: var(--color-border);\n}\n.sf-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text-light);\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.sf-input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 0 14px;\n  font-size: 15px;\n  color: var(--color-text-base);\n  background: var(--color-bg-light);\n  outline: none;\n  box-sizing: border-box;\n  margin-bottom: 8px;\n  transition: border-color var(--transition), box-shadow var(--transition);\n}\n.sf-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  background: var(--color-bg);\n  box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.1);\n}\n.sf-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-text-light);\n}\n.sf-error[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 12px;\n  color: #dc2626;\n  text-align: left;\n  width: 100%;\n}\n.sf-note[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: var(--color-text-muted);\n  line-height: 1.55;\n  margin: 0 0 18px;\n  text-align: center;\n}\n.sf-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n.sf-check-error[_ngcontent-%COMP%] {\n  margin: 4px 0 8px;\n  font-size: 12px;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n  text-align: center;\n}\n.sf-redirect-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  line-height: 1;\n  margin-bottom: 12px;\n}\n.sf-sent-icon[_ngcontent-%COMP%] {\n  font-size: 52px;\n  line-height: 1;\n  margin-bottom: 12px;\n}\n.sf-sent-title[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  letter-spacing: -0.3px;\n}\n.sf-steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: 100%;\n  margin-bottom: 20px;\n}\n.sf-step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-secondary);\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-lg);\n  padding: 10px 14px;\n}\n.sf-step__num[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: #fff;\n  font-size: 11px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=sign-in-form.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SignInFormComponent, { className: "SignInFormComponent", filePath: "src/app/components/sign-in-form/sign-in-form.component.ts", lineNumber: 297 });
})();

// src/app/components/auth-modal/auth-modal.component.ts
function AuthModalComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "\u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "img", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 13);
    \u0275\u0275text(6, "Hey, I'm John \u{1F44B}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h2", 14);
    \u0275\u0275text(8, "It's way better signed in");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function AuthModalComponent_ul_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 15)(1, "li")(2, "span", 16);
    \u0275\u0275text(3, "\u{1F9ED}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Don't explore alone \u2014 meet people who love Malta as much as you");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "li")(7, "span", 16);
    \u0275\u0275text(8, "\u{1F516}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Save your favourite spots and revisit them anytime");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "li")(12, "span", 16);
    \u0275\u0275text(13, "\u{1F39F}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Get real discounts from local partners I trust");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "li")(17, "span", 16);
    \u0275\u0275text(18, "\u26A1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Open Google Maps instantly \u2014 no wait");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "li")(22, "span", 16);
    \u0275\u0275text(23, "\u{1F4F6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "Browse the map offline, even without signal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "li")(27, "span", 16);
    \u0275\u0275text(28, "\u{1F514}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30, "Get notified when I add new spots to the map");
    \u0275\u0275elementEnd()()();
  }
}
function AuthModalComponent_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, " By signing in you agree to our ");
    \u0275\u0275elementStart(2, "a", 18);
    \u0275\u0275text(3, "Privacy Policy");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ". ");
    \u0275\u0275elementEnd();
  }
}
var AuthModalComponent = class _AuthModalComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.formState = signal("default");
    effect(() => {
      if (this.auth.isLoggedIn()) {
        this.auth.showLoginModal.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function AuthModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthModalComponent, selectors: [["app-auth-modal"]], decls: 10, vars: 3, consts: [[1, "modal-backdrop", 3, "click"], [1, "modal-card", 3, "click"], ["aria-label", "Close", 1, "modal-close", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [4, "ngIf"], ["class", "modal-benefits", 4, "ngIf"], [3, "stateChange"], ["class", "modal-legal", 4, "ngIf"], [1, "modal-header"], [1, "modal-emoji"], ["src", "/assets/images/profile.webp", "alt", "John Monta\xF1o", "width", "52", "height", "52", 1, "modal-photo"], [1, "modal-hey"], [1, "modal-title"], [1, "modal-benefits"], [1, "modal-benefit__icon"], [1, "modal-legal"], ["href", "/privacy", "target", "_blank"]], template: function AuthModalComponent_Template(rf, ctx) {
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
        \u0275\u0275template(6, AuthModalComponent_ng_container_6_Template, 9, 0, "ng-container", 6)(7, AuthModalComponent_ul_7_Template, 31, 0, "ul", 7);
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(8, "app-sign-in-form", 8);
        \u0275\u0275listener("stateChange", function AuthModalComponent_Template_app_sign_in_form_stateChange_8_listener($event) {
          return ctx.formState.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, AuthModalComponent_p_9_Template, 5, 0, "p", 9);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.formState() === "default" || ctx.formState() === "email-input");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.formState() === "default");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.formState() !== "email-sent");
      }
    }, dependencies: [CommonModule, NgIf, SignInFormComponent], styles: ["\n\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  z-index: 9999;\n  padding: 20px;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_amFadeIn 0.25s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border-radius: 22px;\n  padding: 36px 24px 26px;\n  width: 100%;\n  max-width: 340px;\n  margin: auto;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_amSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.modal-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 6px;\n  color: var(--color-text-muted);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background var(--transition);\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-muted);\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 18px;\n}\n.modal-emoji[_ngcontent-%COMP%] {\n  font-size: 56px;\n  line-height: 1;\n  width: 52px;\n  text-align: center;\n}\n.modal-photo[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: var(--radius-lg);\n  object-fit: cover;\n  object-position: center top;\n  border: 2px solid var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.15);\n  flex-shrink: 0;\n}\n.modal-hey[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-primary);\n  letter-spacing: 0.01em;\n}\n.modal-title[_ngcontent-%COMP%] {\n  margin: 0 0 18px;\n  font-size: 21px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  letter-spacing: -0.4px;\n  line-height: 1.2;\n}\n.modal-benefits[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0 0 20px;\n  padding: 0;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.modal-benefits[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-secondary);\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-lg);\n  padding: 10px 14px;\n}\n.modal-benefit__icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n  line-height: 1;\n}\n.modal-legal[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--color-text-light);\n  margin: 0;\n}\n.modal-legal[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  text-decoration: underline;\n}\n@keyframes _ngcontent-%COMP%_amFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_amSlideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n/*# sourceMappingURL=auth-modal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthModalComponent, { className: "AuthModalComponent", filePath: "src/app/components/auth-modal/auth-modal.component.ts", lineNumber: 182 });
})();

// src/app/components/welcome-popup/welcome-popup.component.ts
function WelcomePopupComponent_div_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 6)(2, "span", 7);
    \u0275\u0275text(3, "\u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "img", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 9);
    \u0275\u0275text(6, "Hey, I'm John \u{1F44B}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h2", 10);
    \u0275\u0275text(8, "Welcome to My Malta Map!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 11);
    \u0275\u0275text(10, "I've mapped out my favourite spots \u2014 sign in and I'll save yours too.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ul", 12)(12, "li")(13, "span", 13);
    \u0275\u0275text(14, "\u{1F9ED}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Don't explore alone \u2014 meet people who love Malta as much as you");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "li")(18, "span", 13);
    \u0275\u0275text(19, "\u{1F516}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "Save your favourite spots and revisit them anytime");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "li")(23, "span", 13);
    \u0275\u0275text(24, "\u{1F39F}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Get real discounts from local partners I trust");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "li")(28, "span", 13);
    \u0275\u0275text(29, "\u26A1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31, "Open Google Maps instantly \u2014 no wait");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "li")(33, "span", 13);
    \u0275\u0275text(34, "\u{1F4F6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36, "Browse the map offline, even without signal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "li")(38, "span", 13);
    \u0275\u0275text(39, "\u{1F514}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span");
    \u0275\u0275text(41, "Get notified when I add new spots to the map");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function WelcomePopupComponent_div_0_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function WelcomePopupComponent_div_0_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.dismiss());
    });
    \u0275\u0275text(1, " Continue as guest ");
    \u0275\u0275elementEnd();
  }
}
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
    \u0275\u0275template(2, WelcomePopupComponent_div_0_ng_container_2_Template, 42, 0, "ng-container", 3);
    \u0275\u0275elementStart(3, "app-sign-in-form", 4);
    \u0275\u0275listener("stateChange", function WelcomePopupComponent_div_0_Template_app_sign_in_form_stateChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.formState.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, WelcomePopupComponent_div_0_button_4_Template, 2, 0, "button", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.formState() === "default");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.formState() === "default");
  }
}
var WelcomePopupComponent = class _WelcomePopupComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.platformId = inject(PLATFORM_ID);
    this.visible = signal(false);
    this.formState = signal("default");
    this.STORAGE_KEY = "vm_welcome_shown";
    effect(() => {
      if (this.auth.isLoggedIn() && this.visible()) {
        this.visible.set(false);
      }
    });
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
  dismiss() {
    this.visible.set(false);
  }
  static {
    this.\u0275fac = function WelcomePopupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WelcomePopupComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WelcomePopupComponent, selectors: [["app-welcome-popup"]], decls: 1, vars: 1, consts: [["class", "wp-backdrop", 3, "click", 4, "ngIf"], [1, "wp-backdrop", 3, "click"], [1, "wp-card", 3, "click"], [4, "ngIf"], [3, "stateChange"], ["class", "wp-ghost", 3, "click", 4, "ngIf"], [1, "wp-header"], [1, "wp-emoji"], ["src", "/assets/images/profile.webp", "alt", "John Monta\xF1o", "width", "52", "height", "52", 1, "wp-photo", 2, "flex-shrink", "0"], [1, "wp-hey"], [1, "wp-title"], [1, "wp-sub"], [1, "wp-benefits"], [1, "wp-benefit__icon"], [1, "wp-ghost", 3, "click"]], template: function WelcomePopupComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, WelcomePopupComponent_div_0_Template, 5, 2, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.visible());
      }
    }, dependencies: [CommonModule, NgIf, SignInFormComponent], styles: ["\n\n.wp-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1200;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 20px;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_wpFadeIn 0.3s ease;\n}\n.wp-card[_ngcontent-%COMP%] {\n  background: var(--color-bg);\n  border-radius: 22px;\n  padding: 36px 24px 26px;\n  width: 100%;\n  max-width: 340px;\n  margin: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_wpSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.wp-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 18px;\n}\n.wp-emoji[_ngcontent-%COMP%] {\n  font-size: 56px;\n  line-height: 1;\n  width: 52px;\n  text-align: center;\n}\n.wp-photo[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: var(--radius-lg);\n  object-fit: cover;\n  object-position: center top;\n  border: 2px solid var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.15);\n}\n.wp-hey[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-primary);\n  letter-spacing: 0.01em;\n}\n.wp-title[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--color-text-base);\n  letter-spacing: -0.4px;\n  line-height: 1.2;\n}\n.wp-sub[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n  font-size: 12.5px;\n  color: var(--color-text-muted);\n  line-height: 1.5;\n}\n.wp-benefits[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0 0 24px;\n  padding: 0;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.wp-benefits[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-secondary);\n  background: var(--color-bg-muted);\n  border-radius: var(--radius-lg);\n  padding: 10px 14px;\n}\n.wp-benefit__icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n  line-height: 1;\n}\n.wp-ghost[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  padding: 6px 0;\n  transition: color var(--transition);\n}\n.wp-ghost[_ngcontent-%COMP%]:hover {\n  color: var(--color-text-secondary);\n}\n@keyframes _ngcontent-%COMP%_wpFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_wpSlideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n/*# sourceMappingURL=welcome-popup.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WelcomePopupComponent, { className: "WelcomePopupComponent", filePath: "src/app/components/welcome-popup/welcome-popup.component.ts", lineNumber: 186 });
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
function AppComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-modal", 3);
    \u0275\u0275listener("closeRequested", function AppComponent_Conditional_6_Template_app_modal_closeRequested_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.profileModal.hide());
    });
    \u0275\u0275element(1, "app-user-profile-card", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const profile_r3 = ctx;
    \u0275\u0275advance();
    \u0275\u0275property("photoURL", profile_r3.photoURL)("displayName", profile_r3.displayName)("levelId", profile_r3.levelId)("levelLabel", profile_r3.levelLabel)("isAdmin", profile_r3.isAdmin)("roleLabel", profile_r3.roleLabel)("activeLabel", profile_r3.activeLabel);
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
    this.profileModal = inject(ProfileModalService);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 7, vars: 4, consts: [[4, "ngIf"], [1, "app-version"], ["maxWidth", "280px"], ["maxWidth", "280px", 3, "closeRequested"], [3, "photoURL", "displayName", "levelId", "levelLabel", "isAdmin", "roleLabel", "activeLabel"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
        \u0275\u0275template(1, AppComponent_app_pwa_prompt_1_Template, 1, 0, "app-pwa-prompt", 0);
        \u0275\u0275elementStart(2, "span", 1);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, AppComponent_app_auth_modal_4_Template, 1, 0, "app-auth-modal", 0);
        \u0275\u0275element(5, "app-welcome-popup");
        \u0275\u0275template(6, AppComponent_Conditional_6_Template, 2, 7, "app-modal", 2);
      }
      if (rf & 2) {
        let tmp_3_0;
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isMapRoute);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("v", ctx.version, "");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.showLoginModal());
        \u0275\u0275advance(2);
        \u0275\u0275conditional((tmp_3_0 = ctx.profileModal.current()) ? 6 : -1, tmp_3_0);
      }
    }, dependencies: [RouterOutlet, CommonModule, NgIf, PwaPromptComponent, AuthModalComponent, WelcomePopupComponent, AppModalComponent, UserProfileCardComponent], styles: ["\n\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n.app-version[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 2px;\n  right: 10px;\n  transform: translateX(-50%);\n  font-size: 6px;\n  color: var(--color-text-base);\n  opacity: 0.4;\n  pointer-events: none;\n  z-index: 9999;\n  letter-spacing: 0.3px;\n  font-family: monospace;\n  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);\n}\n/*# sourceMappingURL=app.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 26 });
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
