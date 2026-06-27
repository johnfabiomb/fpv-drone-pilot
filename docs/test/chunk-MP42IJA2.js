import {
  BidiModule,
  DOWN_ARROW,
  Directionality,
  ENTER,
  ESCAPE,
  FocusKeyManager,
  FocusMonitor,
  InputModalityDetector,
  LEFT_ARROW,
  Platform,
  RIGHT_ARROW,
  SPACE,
  ScrollDispatcher,
  ScrollingModule,
  TAB,
  UP_ARROW,
  UniqueSelectionDispatcher,
  ViewportRuler,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _bindEventWithOptions,
  _getEventTarget,
  _isTestEnvironment,
  coerceArray,
  coerceCssPixelValue,
  hasModifierKey,
  supportsScrollBehavior
} from "./chunk-ZQXBBVHZ.js";
import {
  ANIMATION_MODULE_TYPE,
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DOCUMENT,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  Location,
  NgModule,
  NgModuleRef$1,
  NgZone,
  Optional,
  Output,
  Renderer2,
  RendererFactory2,
  SkipSelf,
  Subject,
  Subscription,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  afterRender,
  booleanAttribute,
  computed,
  createComponent,
  debounceTime,
  distinctUntilChanged,
  filter,
  inject,
  mapTo,
  merge,
  mergeAll,
  mergeMap,
  partition,
  setClassMetadata,
  signal,
  skip,
  skipWhile,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  untracked,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵqueryRefresh
} from "./chunk-2FJZNSO2.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// node_modules/@angular/cdk/fesm2022/portal.mjs
function throwNullPortalError() {
  throw Error("Must provide a portal to attach");
}
function throwPortalAlreadyAttachedError() {
  throw Error("Host already has a portal attached");
}
function throwPortalOutletAlreadyDisposedError() {
  throw Error("This PortalOutlet has already been disposed");
}
function throwUnknownPortalTypeError() {
  throw Error("Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal.");
}
function throwNullPortalOutletError() {
  throw Error("Attempting to attach a portal to a null PortalOutlet");
}
function throwNoPortalAttachedError() {
  throw Error("Attempting to detach a portal that is not attached to a host");
}
var Portal = class {
  _attachedHost;
  /** Attach this portal to a host. */
  attach(host) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (host == null) {
        throwNullPortalOutletError();
      }
      if (host.hasAttached()) {
        throwPortalAlreadyAttachedError();
      }
    }
    this._attachedHost = host;
    return host.attach(this);
  }
  /** Detach this portal from its host */
  detach() {
    let host = this._attachedHost;
    if (host != null) {
      this._attachedHost = null;
      host.detach();
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throwNoPortalAttachedError();
    }
  }
  /** Whether this portal is attached to a host. */
  get isAttached() {
    return this._attachedHost != null;
  }
  /**
   * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
   * the PortalOutlet when it is performing an `attach()` or `detach()`.
   */
  setAttachedHost(host) {
    this._attachedHost = host;
  }
};
var ComponentPortal = class extends Portal {
  /** The type of the component that will be instantiated for attachment. */
  component;
  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This is different from where the component *renders*, which is determined by the PortalOutlet.
   * The origin is necessary when the host is outside of the Angular application context.
   */
  viewContainerRef;
  /** Injector used for the instantiation of the component. */
  injector;
  /**
   * @deprecated No longer in use. To be removed.
   * @breaking-change 18.0.0
   */
  componentFactoryResolver;
  /**
   * List of DOM nodes that should be projected through `<ng-content>` of the attached component.
   */
  projectableNodes;
  constructor(component, viewContainerRef, injector, _componentFactoryResolver, projectableNodes) {
    super();
    this.component = component;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.projectableNodes = projectableNodes;
  }
};
var TemplatePortal = class extends Portal {
  templateRef;
  viewContainerRef;
  context;
  injector;
  constructor(templateRef, viewContainerRef, context, injector) {
    super();
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.context = context;
    this.injector = injector;
  }
  get origin() {
    return this.templateRef.elementRef;
  }
  /**
   * Attach the portal to the provided `PortalOutlet`.
   * When a context is provided it will override the `context` property of the `TemplatePortal`
   * instance.
   */
  attach(host, context = this.context) {
    this.context = context;
    return super.attach(host);
  }
  detach() {
    this.context = void 0;
    return super.detach();
  }
};
var DomPortal = class extends Portal {
  /** DOM node hosting the portal's content. */
  element;
  constructor(element) {
    super();
    this.element = element instanceof ElementRef ? element.nativeElement : element;
  }
};
var BasePortalOutlet = class {
  /** The portal currently attached to the host. */
  _attachedPortal;
  /** A function that will permanently dispose this host. */
  _disposeFn;
  /** Whether this host has already been permanently disposed. */
  _isDisposed = false;
  /** Whether this host has an attached portal. */
  hasAttached() {
    return !!this._attachedPortal;
  }
  /** Attaches a portal. */
  attach(portal) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!portal) {
        throwNullPortalError();
      }
      if (this.hasAttached()) {
        throwPortalAlreadyAttachedError();
      }
      if (this._isDisposed) {
        throwPortalOutletAlreadyDisposedError();
      }
    }
    if (portal instanceof ComponentPortal) {
      this._attachedPortal = portal;
      return this.attachComponentPortal(portal);
    } else if (portal instanceof TemplatePortal) {
      this._attachedPortal = portal;
      return this.attachTemplatePortal(portal);
    } else if (this.attachDomPortal && portal instanceof DomPortal) {
      this._attachedPortal = portal;
      return this.attachDomPortal(portal);
    }
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      throwUnknownPortalTypeError();
    }
  }
  // @breaking-change 10.0.0 `attachDomPortal` to become a required abstract method.
  attachDomPortal = null;
  /** Detaches a previously attached portal. */
  detach() {
    if (this._attachedPortal) {
      this._attachedPortal.setAttachedHost(null);
      this._attachedPortal = null;
    }
    this._invokeDisposeFn();
  }
  /** Permanently dispose of this portal host. */
  dispose() {
    if (this.hasAttached()) {
      this.detach();
    }
    this._invokeDisposeFn();
    this._isDisposed = true;
  }
  /** @docs-private */
  setDisposeFn(fn) {
    this._disposeFn = fn;
  }
  _invokeDisposeFn() {
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }
};
var DomPortalOutlet = class extends BasePortalOutlet {
  outletElement;
  _appRef;
  _defaultInjector;
  _document;
  /**
   * @param outletElement Element into which the content is projected.
   * @param _unusedComponentFactoryResolver Used to resolve the component factory.
   *   Only required when attaching component portals.
   * @param _appRef Reference to the application. Only used in component portals when there
   *   is no `ViewContainerRef` available.
   * @param _defaultInjector Injector to use as a fallback when the portal being attached doesn't
   *   have one. Only used for component portals.
   * @param _document Reference to the document. Used when attaching a DOM portal. Will eventually
   *   become a required parameter.
   */
  constructor(outletElement, _unusedComponentFactoryResolver, _appRef, _defaultInjector, _document) {
    super();
    this.outletElement = outletElement;
    this._appRef = _appRef;
    this._defaultInjector = _defaultInjector;
    this._document = _document;
  }
  /**
   * Attach the given ComponentPortal to DOM element.
   * @param portal Portal to be attached
   * @returns Reference to the created component.
   */
  attachComponentPortal(portal) {
    let componentRef;
    if (portal.viewContainerRef) {
      const injector = portal.injector || portal.viewContainerRef.injector;
      const ngModuleRef = injector.get(NgModuleRef$1, null, {
        optional: true
      }) || void 0;
      componentRef = portal.viewContainerRef.createComponent(portal.component, {
        index: portal.viewContainerRef.length,
        injector,
        ngModuleRef,
        projectableNodes: portal.projectableNodes || void 0
      });
      this.setDisposeFn(() => componentRef.destroy());
    } else {
      if ((typeof ngDevMode === "undefined" || ngDevMode) && !this._appRef) {
        throw Error("Cannot attach component portal to outlet without an ApplicationRef.");
      }
      componentRef = createComponent(portal.component, {
        elementInjector: portal.injector || this._defaultInjector || Injector.NULL,
        environmentInjector: this._appRef.injector,
        projectableNodes: portal.projectableNodes || void 0
      });
      this._appRef.attachView(componentRef.hostView);
      this.setDisposeFn(() => {
        if (this._appRef.viewCount > 0) {
          this._appRef.detachView(componentRef.hostView);
        }
        componentRef.destroy();
      });
    }
    this.outletElement.appendChild(this._getComponentRootNode(componentRef));
    this._attachedPortal = portal;
    return componentRef;
  }
  /**
   * Attaches a template portal to the DOM as an embedded view.
   * @param portal Portal to be attached.
   * @returns Reference to the created embedded view.
   */
  attachTemplatePortal(portal) {
    let viewContainer = portal.viewContainerRef;
    let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context, {
      injector: portal.injector
    });
    viewRef.rootNodes.forEach((rootNode) => this.outletElement.appendChild(rootNode));
    viewRef.detectChanges();
    this.setDisposeFn(() => {
      let index = viewContainer.indexOf(viewRef);
      if (index !== -1) {
        viewContainer.remove(index);
      }
    });
    this._attachedPortal = portal;
    return viewRef;
  }
  /**
   * Attaches a DOM portal by transferring its content into the outlet.
   * @param portal Portal to be attached.
   * @deprecated To be turned into a method.
   * @breaking-change 10.0.0
   */
  attachDomPortal = (portal) => {
    const element = portal.element;
    if (!element.parentNode && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("DOM portal content must be attached to a parent node.");
    }
    const anchorNode = this._document.createComment("dom-portal");
    element.parentNode.insertBefore(anchorNode, element);
    this.outletElement.appendChild(element);
    this._attachedPortal = portal;
    super.setDisposeFn(() => {
      if (anchorNode.parentNode) {
        anchorNode.parentNode.replaceChild(element, anchorNode);
      }
    });
  };
  /**
   * Clears out a portal from the DOM.
   */
  dispose() {
    super.dispose();
    this.outletElement.remove();
  }
  /** Gets the root HTMLElement for an instantiated component. */
  _getComponentRootNode(componentRef) {
    return componentRef.hostView.rootNodes[0];
  }
};
var CdkPortal = class _CdkPortal extends TemplatePortal {
  constructor() {
    const templateRef = inject(TemplateRef);
    const viewContainerRef = inject(ViewContainerRef);
    super(templateRef, viewContainerRef);
  }
  static \u0275fac = function CdkPortal_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkPortal)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkPortal,
    selectors: [["", "cdkPortal", ""]],
    exportAs: ["cdkPortal"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkPortal, [{
    type: Directive,
    args: [{
      selector: "[cdkPortal]",
      exportAs: "cdkPortal"
    }]
  }], () => [], null);
})();
var TemplatePortalDirective = class _TemplatePortalDirective extends CdkPortal {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275TemplatePortalDirective_BaseFactory;
    return function TemplatePortalDirective_Factory(__ngFactoryType__) {
      return (\u0275TemplatePortalDirective_BaseFactory || (\u0275TemplatePortalDirective_BaseFactory = \u0275\u0275getInheritedFactory(_TemplatePortalDirective)))(__ngFactoryType__ || _TemplatePortalDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _TemplatePortalDirective,
    selectors: [["", "cdk-portal", ""], ["", "portal", ""]],
    exportAs: ["cdkPortal"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkPortal,
      useExisting: _TemplatePortalDirective
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplatePortalDirective, [{
    type: Directive,
    args: [{
      selector: "[cdk-portal], [portal]",
      exportAs: "cdkPortal",
      providers: [{
        provide: CdkPortal,
        useExisting: TemplatePortalDirective
      }]
    }]
  }], null, null);
})();
var CdkPortalOutlet = class _CdkPortalOutlet extends BasePortalOutlet {
  _moduleRef = inject(NgModuleRef$1, {
    optional: true
  });
  _document = inject(DOCUMENT);
  _viewContainerRef = inject(ViewContainerRef);
  /** Whether the portal component is initialized. */
  _isInitialized = false;
  /** Reference to the currently-attached component/view ref. */
  _attachedRef;
  constructor() {
    super();
  }
  /** Portal associated with the Portal outlet. */
  get portal() {
    return this._attachedPortal;
  }
  set portal(portal) {
    if (this.hasAttached() && !portal && !this._isInitialized) {
      return;
    }
    if (this.hasAttached()) {
      super.detach();
    }
    if (portal) {
      super.attach(portal);
    }
    this._attachedPortal = portal || null;
  }
  /** Emits when a portal is attached to the outlet. */
  attached = new EventEmitter();
  /** Component or view reference that is attached to the portal. */
  get attachedRef() {
    return this._attachedRef;
  }
  ngOnInit() {
    this._isInitialized = true;
  }
  ngOnDestroy() {
    super.dispose();
    this._attachedRef = this._attachedPortal = null;
  }
  /**
   * Attach the given ComponentPortal to this PortalOutlet.
   *
   * @param portal Portal to be attached to the portal outlet.
   * @returns Reference to the created component.
   */
  attachComponentPortal(portal) {
    portal.setAttachedHost(this);
    const viewContainerRef = portal.viewContainerRef != null ? portal.viewContainerRef : this._viewContainerRef;
    const ref = viewContainerRef.createComponent(portal.component, {
      index: viewContainerRef.length,
      injector: portal.injector || viewContainerRef.injector,
      projectableNodes: portal.projectableNodes || void 0,
      ngModuleRef: this._moduleRef || void 0
    });
    if (viewContainerRef !== this._viewContainerRef) {
      this._getRootNode().appendChild(ref.hostView.rootNodes[0]);
    }
    super.setDisposeFn(() => ref.destroy());
    this._attachedPortal = portal;
    this._attachedRef = ref;
    this.attached.emit(ref);
    return ref;
  }
  /**
   * Attach the given TemplatePortal to this PortalHost as an embedded View.
   * @param portal Portal to be attached.
   * @returns Reference to the created embedded view.
   */
  attachTemplatePortal(portal) {
    portal.setAttachedHost(this);
    const viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context, {
      injector: portal.injector
    });
    super.setDisposeFn(() => this._viewContainerRef.clear());
    this._attachedPortal = portal;
    this._attachedRef = viewRef;
    this.attached.emit(viewRef);
    return viewRef;
  }
  /**
   * Attaches the given DomPortal to this PortalHost by moving all of the portal content into it.
   * @param portal Portal to be attached.
   * @deprecated To be turned into a method.
   * @breaking-change 10.0.0
   */
  attachDomPortal = (portal) => {
    const element = portal.element;
    if (!element.parentNode && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("DOM portal content must be attached to a parent node.");
    }
    const anchorNode = this._document.createComment("dom-portal");
    portal.setAttachedHost(this);
    element.parentNode.insertBefore(anchorNode, element);
    this._getRootNode().appendChild(element);
    this._attachedPortal = portal;
    super.setDisposeFn(() => {
      if (anchorNode.parentNode) {
        anchorNode.parentNode.replaceChild(element, anchorNode);
      }
    });
  };
  /** Gets the root node of the portal outlet. */
  _getRootNode() {
    const nativeElement = this._viewContainerRef.element.nativeElement;
    return nativeElement.nodeType === nativeElement.ELEMENT_NODE ? nativeElement : nativeElement.parentNode;
  }
  static \u0275fac = function CdkPortalOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkPortalOutlet)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkPortalOutlet,
    selectors: [["", "cdkPortalOutlet", ""]],
    inputs: {
      portal: [0, "cdkPortalOutlet", "portal"]
    },
    outputs: {
      attached: "attached"
    },
    exportAs: ["cdkPortalOutlet"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkPortalOutlet, [{
    type: Directive,
    args: [{
      selector: "[cdkPortalOutlet]",
      exportAs: "cdkPortalOutlet"
    }]
  }], () => [], {
    portal: [{
      type: Input,
      args: ["cdkPortalOutlet"]
    }],
    attached: [{
      type: Output
    }]
  });
})();
var PortalHostDirective = class _PortalHostDirective extends CdkPortalOutlet {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275PortalHostDirective_BaseFactory;
    return function PortalHostDirective_Factory(__ngFactoryType__) {
      return (\u0275PortalHostDirective_BaseFactory || (\u0275PortalHostDirective_BaseFactory = \u0275\u0275getInheritedFactory(_PortalHostDirective)))(__ngFactoryType__ || _PortalHostDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _PortalHostDirective,
    selectors: [["", "cdkPortalHost", ""], ["", "portalHost", ""]],
    inputs: {
      portal: [0, "cdkPortalHost", "portal"]
    },
    exportAs: ["cdkPortalHost"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkPortalOutlet,
      useExisting: _PortalHostDirective
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortalHostDirective, [{
    type: Directive,
    args: [{
      selector: "[cdkPortalHost], [portalHost]",
      exportAs: "cdkPortalHost",
      inputs: [{
        name: "portal",
        alias: "cdkPortalHost"
      }],
      providers: [{
        provide: CdkPortalOutlet,
        useExisting: PortalHostDirective
      }]
    }]
  }], null, null);
})();
var PortalModule = class _PortalModule {
  static \u0275fac = function PortalModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PortalModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _PortalModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortalModule, [{
    type: NgModule,
    args: [{
      imports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective],
      exports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective]
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/overlay.mjs
var scrollBehaviorSupported = supportsScrollBehavior();
var BlockScrollStrategy = class {
  _viewportRuler;
  _previousHTMLStyles = {
    top: "",
    left: ""
  };
  _previousScrollPosition;
  _isEnabled = false;
  _document;
  constructor(_viewportRuler, document) {
    this._viewportRuler = _viewportRuler;
    this._document = document;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach() {
  }
  /** Blocks page-level scroll while the attached overlay is open. */
  enable() {
    if (this._canBeEnabled()) {
      const root = this._document.documentElement;
      this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
      this._previousHTMLStyles.left = root.style.left || "";
      this._previousHTMLStyles.top = root.style.top || "";
      root.style.left = coerceCssPixelValue(-this._previousScrollPosition.left);
      root.style.top = coerceCssPixelValue(-this._previousScrollPosition.top);
      root.classList.add("cdk-global-scrollblock");
      this._isEnabled = true;
    }
  }
  /** Unblocks page-level scroll while the attached overlay is open. */
  disable() {
    if (this._isEnabled) {
      const html = this._document.documentElement;
      const body = this._document.body;
      const htmlStyle = html.style;
      const bodyStyle = body.style;
      const previousHtmlScrollBehavior = htmlStyle.scrollBehavior || "";
      const previousBodyScrollBehavior = bodyStyle.scrollBehavior || "";
      this._isEnabled = false;
      htmlStyle.left = this._previousHTMLStyles.left;
      htmlStyle.top = this._previousHTMLStyles.top;
      html.classList.remove("cdk-global-scrollblock");
      if (scrollBehaviorSupported) {
        htmlStyle.scrollBehavior = bodyStyle.scrollBehavior = "auto";
      }
      window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
      if (scrollBehaviorSupported) {
        htmlStyle.scrollBehavior = previousHtmlScrollBehavior;
        bodyStyle.scrollBehavior = previousBodyScrollBehavior;
      }
    }
  }
  _canBeEnabled() {
    const html = this._document.documentElement;
    if (html.classList.contains("cdk-global-scrollblock") || this._isEnabled) {
      return false;
    }
    const body = this._document.body;
    const viewport = this._viewportRuler.getViewportSize();
    return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
  }
};
function getMatScrollStrategyAlreadyAttachedError() {
  return Error(`Scroll strategy has already been attached.`);
}
var CloseScrollStrategy = class {
  _scrollDispatcher;
  _ngZone;
  _viewportRuler;
  _config;
  _scrollSubscription = null;
  _overlayRef;
  _initialScrollPosition;
  constructor(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
    this._scrollDispatcher = _scrollDispatcher;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    this._config = _config;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatScrollStrategyAlreadyAttachedError();
    }
    this._overlayRef = overlayRef;
  }
  /** Enables the closing of the attached overlay on scroll. */
  enable() {
    if (this._scrollSubscription) {
      return;
    }
    const stream = this._scrollDispatcher.scrolled(0).pipe(filter((scrollable) => {
      return !scrollable || !this._overlayRef.overlayElement.contains(scrollable.getElementRef().nativeElement);
    }));
    if (this._config && this._config.threshold && this._config.threshold > 1) {
      this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top;
      this._scrollSubscription = stream.subscribe(() => {
        const scrollPosition = this._viewportRuler.getViewportScrollPosition().top;
        if (Math.abs(scrollPosition - this._initialScrollPosition) > this._config.threshold) {
          this._detach();
        } else {
          this._overlayRef.updatePosition();
        }
      });
    } else {
      this._scrollSubscription = stream.subscribe(this._detach);
    }
  }
  /** Disables the closing the attached overlay on scroll. */
  disable() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = null;
    }
  }
  detach() {
    this.disable();
    this._overlayRef = null;
  }
  /** Detaches the overlay ref and disables the scroll strategy. */
  _detach = () => {
    this.disable();
    if (this._overlayRef.hasAttached()) {
      this._ngZone.run(() => this._overlayRef.detach());
    }
  };
};
var NoopScrollStrategy = class {
  /** Does nothing, as this scroll strategy is a no-op. */
  enable() {
  }
  /** Does nothing, as this scroll strategy is a no-op. */
  disable() {
  }
  /** Does nothing, as this scroll strategy is a no-op. */
  attach() {
  }
};
function isElementScrolledOutsideView(element, scrollContainers) {
  return scrollContainers.some((containerBounds) => {
    const outsideAbove = element.bottom < containerBounds.top;
    const outsideBelow = element.top > containerBounds.bottom;
    const outsideLeft = element.right < containerBounds.left;
    const outsideRight = element.left > containerBounds.right;
    return outsideAbove || outsideBelow || outsideLeft || outsideRight;
  });
}
function isElementClippedByScrolling(element, scrollContainers) {
  return scrollContainers.some((scrollContainerRect) => {
    const clippedAbove = element.top < scrollContainerRect.top;
    const clippedBelow = element.bottom > scrollContainerRect.bottom;
    const clippedLeft = element.left < scrollContainerRect.left;
    const clippedRight = element.right > scrollContainerRect.right;
    return clippedAbove || clippedBelow || clippedLeft || clippedRight;
  });
}
var RepositionScrollStrategy = class {
  _scrollDispatcher;
  _viewportRuler;
  _ngZone;
  _config;
  _scrollSubscription = null;
  _overlayRef;
  constructor(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
    this._scrollDispatcher = _scrollDispatcher;
    this._viewportRuler = _viewportRuler;
    this._ngZone = _ngZone;
    this._config = _config;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatScrollStrategyAlreadyAttachedError();
    }
    this._overlayRef = overlayRef;
  }
  /** Enables repositioning of the attached overlay on scroll. */
  enable() {
    if (!this._scrollSubscription) {
      const throttle = this._config ? this._config.scrollThrottle : 0;
      this._scrollSubscription = this._scrollDispatcher.scrolled(throttle).subscribe(() => {
        this._overlayRef.updatePosition();
        if (this._config && this._config.autoClose) {
          const overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();
          const {
            width,
            height
          } = this._viewportRuler.getViewportSize();
          const parentRects = [{
            width,
            height,
            bottom: height,
            right: width,
            top: 0,
            left: 0
          }];
          if (isElementScrolledOutsideView(overlayRect, parentRects)) {
            this.disable();
            this._ngZone.run(() => this._overlayRef.detach());
          }
        }
      });
    }
  }
  /** Disables repositioning of the attached overlay on scroll. */
  disable() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = null;
    }
  }
  detach() {
    this.disable();
    this._overlayRef = null;
  }
};
var ScrollStrategyOptions = class _ScrollStrategyOptions {
  _scrollDispatcher = inject(ScrollDispatcher);
  _viewportRuler = inject(ViewportRuler);
  _ngZone = inject(NgZone);
  _document = inject(DOCUMENT);
  constructor() {
  }
  /** Do nothing on scroll. */
  noop = () => new NoopScrollStrategy();
  /**
   * Close the overlay as soon as the user scrolls.
   * @param config Configuration to be used inside the scroll strategy.
   */
  close = (config) => new CloseScrollStrategy(this._scrollDispatcher, this._ngZone, this._viewportRuler, config);
  /** Block scrolling. */
  block = () => new BlockScrollStrategy(this._viewportRuler, this._document);
  /**
   * Update the overlay's position on scroll.
   * @param config Configuration to be used inside the scroll strategy.
   * Allows debouncing the reposition calls.
   */
  reposition = (config) => new RepositionScrollStrategy(this._scrollDispatcher, this._viewportRuler, this._ngZone, config);
  static \u0275fac = function ScrollStrategyOptions_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollStrategyOptions)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ScrollStrategyOptions,
    factory: _ScrollStrategyOptions.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollStrategyOptions, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var OverlayConfig = class {
  /** Strategy with which to position the overlay. */
  positionStrategy;
  /** Strategy to be used when handling scroll events while the overlay is open. */
  scrollStrategy = new NoopScrollStrategy();
  /** Custom class to add to the overlay pane. */
  panelClass = "";
  /** Whether the overlay has a backdrop. */
  hasBackdrop = false;
  /** Custom class to add to the backdrop */
  backdropClass = "cdk-overlay-dark-backdrop";
  /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
  width;
  /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
  height;
  /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
  minWidth;
  /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
  minHeight;
  /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
  maxWidth;
  /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
  maxHeight;
  /**
   * Direction of the text in the overlay panel. If a `Directionality` instance
   * is passed in, the overlay will handle changes to its value automatically.
   */
  direction;
  /**
   * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  disposeOnNavigation = false;
  constructor(config) {
    if (config) {
      const configKeys = Object.keys(config);
      for (const key of configKeys) {
        if (config[key] !== void 0) {
          this[key] = config[key];
        }
      }
    }
  }
};
var ConnectedOverlayPositionChange = class {
  connectionPair;
  scrollableViewProperties;
  constructor(connectionPair, scrollableViewProperties) {
    this.connectionPair = connectionPair;
    this.scrollableViewProperties = scrollableViewProperties;
  }
};
function validateVerticalPosition(property, value) {
  if (value !== "top" && value !== "bottom" && value !== "center") {
    throw Error(`ConnectedPosition: Invalid ${property} "${value}". Expected "top", "bottom" or "center".`);
  }
}
function validateHorizontalPosition(property, value) {
  if (value !== "start" && value !== "end" && value !== "center") {
    throw Error(`ConnectedPosition: Invalid ${property} "${value}". Expected "start", "end" or "center".`);
  }
}
var BaseOverlayDispatcher = class _BaseOverlayDispatcher {
  /** Currently attached overlays in the order they were attached. */
  _attachedOverlays = [];
  _document = inject(DOCUMENT);
  _isAttached;
  constructor() {
  }
  ngOnDestroy() {
    this.detach();
  }
  /** Add a new overlay to the list of attached overlay refs. */
  add(overlayRef) {
    this.remove(overlayRef);
    this._attachedOverlays.push(overlayRef);
  }
  /** Remove an overlay from the list of attached overlay refs. */
  remove(overlayRef) {
    const index = this._attachedOverlays.indexOf(overlayRef);
    if (index > -1) {
      this._attachedOverlays.splice(index, 1);
    }
    if (this._attachedOverlays.length === 0) {
      this.detach();
    }
  }
  static \u0275fac = function BaseOverlayDispatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseOverlayDispatcher)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _BaseOverlayDispatcher,
    factory: _BaseOverlayDispatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseOverlayDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var OverlayKeyboardDispatcher = class _OverlayKeyboardDispatcher extends BaseOverlayDispatcher {
  _ngZone = inject(NgZone);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cleanupKeydown;
  /** Add a new overlay to the list of attached overlay refs. */
  add(overlayRef) {
    super.add(overlayRef);
    if (!this._isAttached) {
      this._ngZone.runOutsideAngular(() => {
        this._cleanupKeydown = this._renderer.listen("body", "keydown", this._keydownListener);
      });
      this._isAttached = true;
    }
  }
  /** Detaches the global keyboard event listener. */
  detach() {
    if (this._isAttached) {
      this._cleanupKeydown?.();
      this._isAttached = false;
    }
  }
  /** Keyboard event listener that will be attached to the body. */
  _keydownListener = (event) => {
    const overlays = this._attachedOverlays;
    for (let i = overlays.length - 1; i > -1; i--) {
      if (overlays[i]._keydownEvents.observers.length > 0) {
        this._ngZone.run(() => overlays[i]._keydownEvents.next(event));
        break;
      }
    }
  };
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275OverlayKeyboardDispatcher_BaseFactory;
    return function OverlayKeyboardDispatcher_Factory(__ngFactoryType__) {
      return (\u0275OverlayKeyboardDispatcher_BaseFactory || (\u0275OverlayKeyboardDispatcher_BaseFactory = \u0275\u0275getInheritedFactory(_OverlayKeyboardDispatcher)))(__ngFactoryType__ || _OverlayKeyboardDispatcher);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayKeyboardDispatcher,
    factory: _OverlayKeyboardDispatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayKeyboardDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var OverlayOutsideClickDispatcher = class _OverlayOutsideClickDispatcher extends BaseOverlayDispatcher {
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cursorOriginalValue;
  _cursorStyleIsSet = false;
  _pointerDownEventTarget;
  _cleanups;
  /** Add a new overlay to the list of attached overlay refs. */
  add(overlayRef) {
    super.add(overlayRef);
    if (!this._isAttached) {
      const body = this._document.body;
      const eventOptions = {
        capture: true
      };
      this._cleanups = this._ngZone.runOutsideAngular(() => [_bindEventWithOptions(this._renderer, body, "pointerdown", this._pointerDownListener, eventOptions), _bindEventWithOptions(this._renderer, body, "click", this._clickListener, eventOptions), _bindEventWithOptions(this._renderer, body, "auxclick", this._clickListener, eventOptions), _bindEventWithOptions(this._renderer, body, "contextmenu", this._clickListener, eventOptions)]);
      if (this._platform.IOS && !this._cursorStyleIsSet) {
        this._cursorOriginalValue = body.style.cursor;
        body.style.cursor = "pointer";
        this._cursorStyleIsSet = true;
      }
      this._isAttached = true;
    }
  }
  /** Detaches the global keyboard event listener. */
  detach() {
    if (this._isAttached) {
      this._cleanups?.forEach((cleanup) => cleanup());
      this._cleanups = void 0;
      if (this._platform.IOS && this._cursorStyleIsSet) {
        this._document.body.style.cursor = this._cursorOriginalValue;
        this._cursorStyleIsSet = false;
      }
      this._isAttached = false;
    }
  }
  /** Store pointerdown event target to track origin of click. */
  _pointerDownListener = (event) => {
    this._pointerDownEventTarget = _getEventTarget(event);
  };
  /** Click event listener that will be attached to the body propagate phase. */
  _clickListener = (event) => {
    const target = _getEventTarget(event);
    const origin = event.type === "click" && this._pointerDownEventTarget ? this._pointerDownEventTarget : target;
    this._pointerDownEventTarget = null;
    const overlays = this._attachedOverlays.slice();
    for (let i = overlays.length - 1; i > -1; i--) {
      const overlayRef = overlays[i];
      if (overlayRef._outsidePointerEvents.observers.length < 1 || !overlayRef.hasAttached()) {
        continue;
      }
      if (containsPierceShadowDom(overlayRef.overlayElement, target) || containsPierceShadowDom(overlayRef.overlayElement, origin)) {
        break;
      }
      const outsidePointerEvents = overlayRef._outsidePointerEvents;
      if (this._ngZone) {
        this._ngZone.run(() => outsidePointerEvents.next(event));
      } else {
        outsidePointerEvents.next(event);
      }
    }
  };
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275OverlayOutsideClickDispatcher_BaseFactory;
    return function OverlayOutsideClickDispatcher_Factory(__ngFactoryType__) {
      return (\u0275OverlayOutsideClickDispatcher_BaseFactory || (\u0275OverlayOutsideClickDispatcher_BaseFactory = \u0275\u0275getInheritedFactory(_OverlayOutsideClickDispatcher)))(__ngFactoryType__ || _OverlayOutsideClickDispatcher);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayOutsideClickDispatcher,
    factory: _OverlayOutsideClickDispatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayOutsideClickDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function containsPierceShadowDom(parent, child) {
  const supportsShadowRoot = typeof ShadowRoot !== "undefined" && ShadowRoot;
  let current = child;
  while (current) {
    if (current === parent) {
      return true;
    }
    current = supportsShadowRoot && current instanceof ShadowRoot ? current.host : current.parentNode;
  }
  return false;
}
var _CdkOverlayStyleLoader = class __CdkOverlayStyleLoader {
  static \u0275fac = function _CdkOverlayStyleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __CdkOverlayStyleLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __CdkOverlayStyleLoader,
    selectors: [["ng-component"]],
    hostAttrs: ["cdk-overlay-style-loader", ""],
    decls: 0,
    vars: 0,
    template: function _CdkOverlayStyleLoader_Template(rf, ctx) {
    },
    styles: [".cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed}@layer cdk-overlay{.cdk-overlay-container{z-index:1000}}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute}@layer cdk-overlay{.cdk-global-overlay-wrapper{z-index:1000}}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;display:flex;max-width:100%;max-height:100%}@layer cdk-overlay{.cdk-overlay-pane{z-index:1000}}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:auto;-webkit-tap-highlight-color:rgba(0,0,0,0);opacity:0}@layer cdk-overlay{.cdk-overlay-backdrop{z-index:1000;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}}.cdk-overlay-backdrop-showing{opacity:1}@media(forced-colors: active){.cdk-overlay-backdrop-showing{opacity:.6}}@layer cdk-overlay{.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}}.cdk-overlay-transparent-backdrop{transition:visibility 1ms linear,opacity 1ms linear;visibility:hidden;opacity:1}.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing,.cdk-high-contrast-active .cdk-overlay-transparent-backdrop{opacity:0;visibility:visible}.cdk-overlay-backdrop-noop-animation{transition:none}.cdk-overlay-connected-position-bounding-box{position:absolute;display:flex;flex-direction:column;min-width:1px;min-height:1px}@layer cdk-overlay{.cdk-overlay-connected-position-bounding-box{z-index:1000}}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkOverlayStyleLoader, [{
    type: Component,
    args: [{
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "cdk-overlay-style-loader": ""
      },
      styles: [".cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed}@layer cdk-overlay{.cdk-overlay-container{z-index:1000}}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute}@layer cdk-overlay{.cdk-global-overlay-wrapper{z-index:1000}}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;display:flex;max-width:100%;max-height:100%}@layer cdk-overlay{.cdk-overlay-pane{z-index:1000}}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:auto;-webkit-tap-highlight-color:rgba(0,0,0,0);opacity:0}@layer cdk-overlay{.cdk-overlay-backdrop{z-index:1000;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}}.cdk-overlay-backdrop-showing{opacity:1}@media(forced-colors: active){.cdk-overlay-backdrop-showing{opacity:.6}}@layer cdk-overlay{.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}}.cdk-overlay-transparent-backdrop{transition:visibility 1ms linear,opacity 1ms linear;visibility:hidden;opacity:1}.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing,.cdk-high-contrast-active .cdk-overlay-transparent-backdrop{opacity:0;visibility:visible}.cdk-overlay-backdrop-noop-animation{transition:none}.cdk-overlay-connected-position-bounding-box{position:absolute;display:flex;flex-direction:column;min-width:1px;min-height:1px}@layer cdk-overlay{.cdk-overlay-connected-position-bounding-box{z-index:1000}}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}"]
    }]
  }], null, null);
})();
var OverlayContainer = class _OverlayContainer {
  _platform = inject(Platform);
  _containerElement;
  _document = inject(DOCUMENT);
  _styleLoader = inject(_CdkPrivateStyleLoader);
  constructor() {
  }
  ngOnDestroy() {
    this._containerElement?.remove();
  }
  /**
   * This method returns the overlay container element. It will lazily
   * create the element the first time it is called to facilitate using
   * the container in non-browser environments.
   * @returns the container element
   */
  getContainerElement() {
    this._loadStyles();
    if (!this._containerElement) {
      this._createContainer();
    }
    return this._containerElement;
  }
  /**
   * Create the overlay container element, which is simply a div
   * with the 'cdk-overlay-container' class on the document body.
   */
  _createContainer() {
    const containerClass = "cdk-overlay-container";
    if (this._platform.isBrowser || _isTestEnvironment()) {
      const oppositePlatformContainers = this._document.querySelectorAll(`.${containerClass}[platform="server"], .${containerClass}[platform="test"]`);
      for (let i = 0; i < oppositePlatformContainers.length; i++) {
        oppositePlatformContainers[i].remove();
      }
    }
    const container = this._document.createElement("div");
    container.classList.add(containerClass);
    if (_isTestEnvironment()) {
      container.setAttribute("platform", "test");
    } else if (!this._platform.isBrowser) {
      container.setAttribute("platform", "server");
    }
    this._document.body.appendChild(container);
    this._containerElement = container;
  }
  /** Loads the structural styles necessary for the overlay to work. */
  _loadStyles() {
    this._styleLoader.load(_CdkOverlayStyleLoader);
  }
  static \u0275fac = function OverlayContainer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayContainer)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayContainer,
    factory: _OverlayContainer.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayContainer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var BackdropRef = class {
  _renderer;
  _ngZone;
  element;
  _cleanupClick;
  _cleanupTransitionEnd;
  _fallbackTimeout;
  constructor(document, _renderer, _ngZone, onClick) {
    this._renderer = _renderer;
    this._ngZone = _ngZone;
    this.element = document.createElement("div");
    this.element.classList.add("cdk-overlay-backdrop");
    this._cleanupClick = _renderer.listen(this.element, "click", onClick);
  }
  detach() {
    this._ngZone.runOutsideAngular(() => {
      const element = this.element;
      clearTimeout(this._fallbackTimeout);
      this._cleanupTransitionEnd?.();
      this._cleanupTransitionEnd = this._renderer.listen(element, "transitionend", this.dispose);
      this._fallbackTimeout = setTimeout(this.dispose, 500);
      element.style.pointerEvents = "none";
      element.classList.remove("cdk-overlay-backdrop-showing");
    });
  }
  dispose = () => {
    clearTimeout(this._fallbackTimeout);
    this._cleanupClick?.();
    this._cleanupTransitionEnd?.();
    this._cleanupClick = this._cleanupTransitionEnd = this._fallbackTimeout = void 0;
    this.element.remove();
  };
};
var OverlayRef = class {
  _portalOutlet;
  _host;
  _pane;
  _config;
  _ngZone;
  _keyboardDispatcher;
  _document;
  _location;
  _outsideClickDispatcher;
  _animationsDisabled;
  _injector;
  _renderer;
  _backdropClick = new Subject();
  _attachments = new Subject();
  _detachments = new Subject();
  _positionStrategy;
  _scrollStrategy;
  _locationChanges = Subscription.EMPTY;
  _backdropRef = null;
  /**
   * Reference to the parent of the `_host` at the time it was detached. Used to restore
   * the `_host` to its original position in the DOM when it gets re-attached.
   */
  _previousHostParent;
  /** Stream of keydown events dispatched to this overlay. */
  _keydownEvents = new Subject();
  /** Stream of mouse outside events dispatched to this overlay. */
  _outsidePointerEvents = new Subject();
  _renders = new Subject();
  _afterRenderRef;
  /** Reference to the currently-running `afterNextRender` call. */
  _afterNextRenderRef;
  constructor(_portalOutlet, _host, _pane, _config, _ngZone, _keyboardDispatcher, _document, _location, _outsideClickDispatcher, _animationsDisabled = false, _injector, _renderer) {
    this._portalOutlet = _portalOutlet;
    this._host = _host;
    this._pane = _pane;
    this._config = _config;
    this._ngZone = _ngZone;
    this._keyboardDispatcher = _keyboardDispatcher;
    this._document = _document;
    this._location = _location;
    this._outsideClickDispatcher = _outsideClickDispatcher;
    this._animationsDisabled = _animationsDisabled;
    this._injector = _injector;
    this._renderer = _renderer;
    if (_config.scrollStrategy) {
      this._scrollStrategy = _config.scrollStrategy;
      this._scrollStrategy.attach(this);
    }
    this._positionStrategy = _config.positionStrategy;
    this._afterRenderRef = untracked(() => afterRender(() => {
      this._renders.next();
    }, {
      injector: this._injector
    }));
  }
  /** The overlay's HTML element */
  get overlayElement() {
    return this._pane;
  }
  /** The overlay's backdrop HTML element. */
  get backdropElement() {
    return this._backdropRef?.element || null;
  }
  /**
   * Wrapper around the panel element. Can be used for advanced
   * positioning where a wrapper with specific styling is
   * required around the overlay pane.
   */
  get hostElement() {
    return this._host;
  }
  /**
   * Attaches content, given via a Portal, to the overlay.
   * If the overlay is configured to have a backdrop, it will be created.
   *
   * @param portal Portal instance to which to attach the overlay.
   * @returns The portal attachment result.
   */
  attach(portal) {
    if (!this._host.parentElement && this._previousHostParent) {
      this._previousHostParent.appendChild(this._host);
    }
    const attachResult = this._portalOutlet.attach(portal);
    if (this._positionStrategy) {
      this._positionStrategy.attach(this);
    }
    this._updateStackingOrder();
    this._updateElementSize();
    this._updateElementDirection();
    if (this._scrollStrategy) {
      this._scrollStrategy.enable();
    }
    this._afterNextRenderRef?.destroy();
    this._afterNextRenderRef = afterNextRender(() => {
      if (this.hasAttached()) {
        this.updatePosition();
      }
    }, {
      injector: this._injector
    });
    this._togglePointerEvents(true);
    if (this._config.hasBackdrop) {
      this._attachBackdrop();
    }
    if (this._config.panelClass) {
      this._toggleClasses(this._pane, this._config.panelClass, true);
    }
    this._attachments.next();
    this._keyboardDispatcher.add(this);
    if (this._config.disposeOnNavigation) {
      this._locationChanges = this._location.subscribe(() => this.dispose());
    }
    this._outsideClickDispatcher.add(this);
    if (typeof attachResult?.onDestroy === "function") {
      attachResult.onDestroy(() => {
        if (this.hasAttached()) {
          this._ngZone.runOutsideAngular(() => Promise.resolve().then(() => this.detach()));
        }
      });
    }
    return attachResult;
  }
  /**
   * Detaches an overlay from a portal.
   * @returns The portal detachment result.
   */
  detach() {
    if (!this.hasAttached()) {
      return;
    }
    this.detachBackdrop();
    this._togglePointerEvents(false);
    if (this._positionStrategy && this._positionStrategy.detach) {
      this._positionStrategy.detach();
    }
    if (this._scrollStrategy) {
      this._scrollStrategy.disable();
    }
    const detachmentResult = this._portalOutlet.detach();
    this._detachments.next();
    this._keyboardDispatcher.remove(this);
    this._detachContentWhenEmpty();
    this._locationChanges.unsubscribe();
    this._outsideClickDispatcher.remove(this);
    return detachmentResult;
  }
  /** Cleans up the overlay from the DOM. */
  dispose() {
    const isAttached = this.hasAttached();
    if (this._positionStrategy) {
      this._positionStrategy.dispose();
    }
    this._disposeScrollStrategy();
    this._backdropRef?.dispose();
    this._locationChanges.unsubscribe();
    this._keyboardDispatcher.remove(this);
    this._portalOutlet.dispose();
    this._attachments.complete();
    this._backdropClick.complete();
    this._keydownEvents.complete();
    this._outsidePointerEvents.complete();
    this._outsideClickDispatcher.remove(this);
    this._host?.remove();
    this._afterNextRenderRef?.destroy();
    this._previousHostParent = this._pane = this._host = this._backdropRef = null;
    if (isAttached) {
      this._detachments.next();
    }
    this._detachments.complete();
    this._afterRenderRef.destroy();
    this._renders.complete();
  }
  /** Whether the overlay has attached content. */
  hasAttached() {
    return this._portalOutlet.hasAttached();
  }
  /** Gets an observable that emits when the backdrop has been clicked. */
  backdropClick() {
    return this._backdropClick;
  }
  /** Gets an observable that emits when the overlay has been attached. */
  attachments() {
    return this._attachments;
  }
  /** Gets an observable that emits when the overlay has been detached. */
  detachments() {
    return this._detachments;
  }
  /** Gets an observable of keydown events targeted to this overlay. */
  keydownEvents() {
    return this._keydownEvents;
  }
  /** Gets an observable of pointer events targeted outside this overlay. */
  outsidePointerEvents() {
    return this._outsidePointerEvents;
  }
  /** Gets the current overlay configuration, which is immutable. */
  getConfig() {
    return this._config;
  }
  /** Updates the position of the overlay based on the position strategy. */
  updatePosition() {
    if (this._positionStrategy) {
      this._positionStrategy.apply();
    }
  }
  /** Switches to a new position strategy and updates the overlay position. */
  updatePositionStrategy(strategy) {
    if (strategy === this._positionStrategy) {
      return;
    }
    if (this._positionStrategy) {
      this._positionStrategy.dispose();
    }
    this._positionStrategy = strategy;
    if (this.hasAttached()) {
      strategy.attach(this);
      this.updatePosition();
    }
  }
  /** Update the size properties of the overlay. */
  updateSize(sizeConfig) {
    this._config = __spreadValues(__spreadValues({}, this._config), sizeConfig);
    this._updateElementSize();
  }
  /** Sets the LTR/RTL direction for the overlay. */
  setDirection(dir) {
    this._config = __spreadProps(__spreadValues({}, this._config), {
      direction: dir
    });
    this._updateElementDirection();
  }
  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes) {
    if (this._pane) {
      this._toggleClasses(this._pane, classes, true);
    }
  }
  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes) {
    if (this._pane) {
      this._toggleClasses(this._pane, classes, false);
    }
  }
  /**
   * Returns the layout direction of the overlay panel.
   */
  getDirection() {
    const direction = this._config.direction;
    if (!direction) {
      return "ltr";
    }
    return typeof direction === "string" ? direction : direction.value;
  }
  /** Switches to a new scroll strategy. */
  updateScrollStrategy(strategy) {
    if (strategy === this._scrollStrategy) {
      return;
    }
    this._disposeScrollStrategy();
    this._scrollStrategy = strategy;
    if (this.hasAttached()) {
      strategy.attach(this);
      strategy.enable();
    }
  }
  /** Updates the text direction of the overlay panel. */
  _updateElementDirection() {
    this._host.setAttribute("dir", this.getDirection());
  }
  /** Updates the size of the overlay element based on the overlay config. */
  _updateElementSize() {
    if (!this._pane) {
      return;
    }
    const style = this._pane.style;
    style.width = coerceCssPixelValue(this._config.width);
    style.height = coerceCssPixelValue(this._config.height);
    style.minWidth = coerceCssPixelValue(this._config.minWidth);
    style.minHeight = coerceCssPixelValue(this._config.minHeight);
    style.maxWidth = coerceCssPixelValue(this._config.maxWidth);
    style.maxHeight = coerceCssPixelValue(this._config.maxHeight);
  }
  /** Toggles the pointer events for the overlay pane element. */
  _togglePointerEvents(enablePointer) {
    this._pane.style.pointerEvents = enablePointer ? "" : "none";
  }
  /** Attaches a backdrop for this overlay. */
  _attachBackdrop() {
    const showingClass = "cdk-overlay-backdrop-showing";
    this._backdropRef?.dispose();
    this._backdropRef = new BackdropRef(this._document, this._renderer, this._ngZone, (event) => {
      this._backdropClick.next(event);
    });
    if (this._animationsDisabled) {
      this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation");
    }
    if (this._config.backdropClass) {
      this._toggleClasses(this._backdropRef.element, this._config.backdropClass, true);
    }
    this._host.parentElement.insertBefore(this._backdropRef.element, this._host);
    if (!this._animationsDisabled && typeof requestAnimationFrame !== "undefined") {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => this._backdropRef?.element.classList.add(showingClass));
      });
    } else {
      this._backdropRef.element.classList.add(showingClass);
    }
  }
  /**
   * Updates the stacking order of the element, moving it to the top if necessary.
   * This is required in cases where one overlay was detached, while another one,
   * that should be behind it, was destroyed. The next time both of them are opened,
   * the stacking will be wrong, because the detached element's pane will still be
   * in its original DOM position.
   */
  _updateStackingOrder() {
    if (this._host.nextSibling) {
      this._host.parentNode.appendChild(this._host);
    }
  }
  /** Detaches the backdrop (if any) associated with the overlay. */
  detachBackdrop() {
    if (this._animationsDisabled) {
      this._backdropRef?.dispose();
      this._backdropRef = null;
    } else {
      this._backdropRef?.detach();
    }
  }
  /** Toggles a single CSS class or an array of classes on an element. */
  _toggleClasses(element, cssClasses, isAdd) {
    const classes = coerceArray(cssClasses || []).filter((c) => !!c);
    if (classes.length) {
      isAdd ? element.classList.add(...classes) : element.classList.remove(...classes);
    }
  }
  /** Detaches the overlay content next time the zone stabilizes. */
  _detachContentWhenEmpty() {
    this._ngZone.runOutsideAngular(() => {
      const subscription = this._renders.pipe(takeUntil(merge(this._attachments, this._detachments))).subscribe(() => {
        if (!this._pane || !this._host || this._pane.children.length === 0) {
          if (this._pane && this._config.panelClass) {
            this._toggleClasses(this._pane, this._config.panelClass, false);
          }
          if (this._host && this._host.parentElement) {
            this._previousHostParent = this._host.parentElement;
            this._host.remove();
          }
          subscription.unsubscribe();
        }
      });
    });
  }
  /** Disposes of a scroll strategy. */
  _disposeScrollStrategy() {
    const scrollStrategy = this._scrollStrategy;
    scrollStrategy?.disable();
    scrollStrategy?.detach?.();
  }
};
var boundingBoxClass = "cdk-overlay-connected-position-bounding-box";
var cssUnitPattern = /([A-Za-z%]+)$/;
var FlexibleConnectedPositionStrategy = class {
  _viewportRuler;
  _document;
  _platform;
  _overlayContainer;
  /** The overlay to which this strategy is attached. */
  _overlayRef;
  /** Whether we're performing the very first positioning of the overlay. */
  _isInitialRender;
  /** Last size used for the bounding box. Used to avoid resizing the overlay after open. */
  _lastBoundingBoxSize = {
    width: 0,
    height: 0
  };
  /** Whether the overlay was pushed in a previous positioning. */
  _isPushed = false;
  /** Whether the overlay can be pushed on-screen on the initial open. */
  _canPush = true;
  /** Whether the overlay can grow via flexible width/height after the initial open. */
  _growAfterOpen = false;
  /** Whether the overlay's width and height can be constrained to fit within the viewport. */
  _hasFlexibleDimensions = true;
  /** Whether the overlay position is locked. */
  _positionLocked = false;
  /** Cached origin dimensions */
  _originRect;
  /** Cached overlay dimensions */
  _overlayRect;
  /** Cached viewport dimensions */
  _viewportRect;
  /** Cached container dimensions */
  _containerRect;
  /** Amount of space that must be maintained between the overlay and the edge of the viewport. */
  _viewportMargin = 0;
  /** The Scrollable containers used to check scrollable view properties on position change. */
  _scrollables = [];
  /** Ordered list of preferred positions, from most to least desirable. */
  _preferredPositions = [];
  /** The origin element against which the overlay will be positioned. */
  _origin;
  /** The overlay pane element. */
  _pane;
  /** Whether the strategy has been disposed of already. */
  _isDisposed;
  /**
   * Parent element for the overlay panel used to constrain the overlay panel's size to fit
   * within the viewport.
   */
  _boundingBox;
  /** The last position to have been calculated as the best fit position. */
  _lastPosition;
  /** The last calculated scroll visibility. Only tracked  */
  _lastScrollVisibility;
  /** Subject that emits whenever the position changes. */
  _positionChanges = new Subject();
  /** Subscription to viewport size changes. */
  _resizeSubscription = Subscription.EMPTY;
  /** Default offset for the overlay along the x axis. */
  _offsetX = 0;
  /** Default offset for the overlay along the y axis. */
  _offsetY = 0;
  /** Selector to be used when finding the elements on which to set the transform origin. */
  _transformOriginSelector;
  /** Keeps track of the CSS classes that the position strategy has applied on the overlay panel. */
  _appliedPanelClasses = [];
  /** Amount by which the overlay was pushed in each axis during the last time it was positioned. */
  _previousPushAmount;
  /** Observable sequence of position changes. */
  positionChanges = this._positionChanges;
  /** Ordered list of preferred positions, from most to least desirable. */
  get positions() {
    return this._preferredPositions;
  }
  constructor(connectedTo, _viewportRuler, _document, _platform, _overlayContainer) {
    this._viewportRuler = _viewportRuler;
    this._document = _document;
    this._platform = _platform;
    this._overlayContainer = _overlayContainer;
    this.setOrigin(connectedTo);
  }
  /** Attaches this position strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && overlayRef !== this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("This position strategy is already attached to an overlay");
    }
    this._validatePositions();
    overlayRef.hostElement.classList.add(boundingBoxClass);
    this._overlayRef = overlayRef;
    this._boundingBox = overlayRef.hostElement;
    this._pane = overlayRef.overlayElement;
    this._isDisposed = false;
    this._isInitialRender = true;
    this._lastPosition = null;
    this._resizeSubscription.unsubscribe();
    this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
      this._isInitialRender = true;
      this.apply();
    });
  }
  /**
   * Updates the position of the overlay element, using whichever preferred position relative
   * to the origin best fits on-screen.
   *
   * The selection of a position goes as follows:
   *  - If any positions fit completely within the viewport as-is,
   *      choose the first position that does so.
   *  - If flexible dimensions are enabled and at least one satisfies the given minimum width/height,
   *      choose the position with the greatest available size modified by the positions' weight.
   *  - If pushing is enabled, take the position that went off-screen the least and push it
   *      on-screen.
   *  - If none of the previous criteria were met, use the position that goes off-screen the least.
   * @docs-private
   */
  apply() {
    if (this._isDisposed || !this._platform.isBrowser) {
      return;
    }
    if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
      this.reapplyLastPosition();
      return;
    }
    this._clearPanelClasses();
    this._resetOverlayElementStyles();
    this._resetBoundingBoxStyles();
    this._viewportRect = this._getNarrowedViewportRect();
    this._originRect = this._getOriginRect();
    this._overlayRect = this._pane.getBoundingClientRect();
    this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
    const originRect = this._originRect;
    const overlayRect = this._overlayRect;
    const viewportRect = this._viewportRect;
    const containerRect = this._containerRect;
    const flexibleFits = [];
    let fallback;
    for (let pos of this._preferredPositions) {
      let originPoint = this._getOriginPoint(originRect, containerRect, pos);
      let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
      let overlayFit = this._getOverlayFit(overlayPoint, overlayRect, viewportRect, pos);
      if (overlayFit.isCompletelyWithinViewport) {
        this._isPushed = false;
        this._applyPosition(pos, originPoint);
        return;
      }
      if (this._canFitWithFlexibleDimensions(overlayFit, overlayPoint, viewportRect)) {
        flexibleFits.push({
          position: pos,
          origin: originPoint,
          overlayRect,
          boundingBoxRect: this._calculateBoundingBoxRect(originPoint, pos)
        });
        continue;
      }
      if (!fallback || fallback.overlayFit.visibleArea < overlayFit.visibleArea) {
        fallback = {
          overlayFit,
          overlayPoint,
          originPoint,
          position: pos,
          overlayRect
        };
      }
    }
    if (flexibleFits.length) {
      let bestFit = null;
      let bestScore = -1;
      for (const fit of flexibleFits) {
        const score = fit.boundingBoxRect.width * fit.boundingBoxRect.height * (fit.position.weight || 1);
        if (score > bestScore) {
          bestScore = score;
          bestFit = fit;
        }
      }
      this._isPushed = false;
      this._applyPosition(bestFit.position, bestFit.origin);
      return;
    }
    if (this._canPush) {
      this._isPushed = true;
      this._applyPosition(fallback.position, fallback.originPoint);
      return;
    }
    this._applyPosition(fallback.position, fallback.originPoint);
  }
  detach() {
    this._clearPanelClasses();
    this._lastPosition = null;
    this._previousPushAmount = null;
    this._resizeSubscription.unsubscribe();
  }
  /** Cleanup after the element gets destroyed. */
  dispose() {
    if (this._isDisposed) {
      return;
    }
    if (this._boundingBox) {
      extendStyles(this._boundingBox.style, {
        top: "",
        left: "",
        right: "",
        bottom: "",
        height: "",
        width: "",
        alignItems: "",
        justifyContent: ""
      });
    }
    if (this._pane) {
      this._resetOverlayElementStyles();
    }
    if (this._overlayRef) {
      this._overlayRef.hostElement.classList.remove(boundingBoxClass);
    }
    this.detach();
    this._positionChanges.complete();
    this._overlayRef = this._boundingBox = null;
    this._isDisposed = true;
  }
  /**
   * This re-aligns the overlay element with the trigger in its last calculated position,
   * even if a position higher in the "preferred positions" list would now fit. This
   * allows one to re-align the panel without changing the orientation of the panel.
   */
  reapplyLastPosition() {
    if (this._isDisposed || !this._platform.isBrowser) {
      return;
    }
    const lastPosition = this._lastPosition;
    if (lastPosition) {
      this._originRect = this._getOriginRect();
      this._overlayRect = this._pane.getBoundingClientRect();
      this._viewportRect = this._getNarrowedViewportRect();
      this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
      const originPoint = this._getOriginPoint(this._originRect, this._containerRect, lastPosition);
      this._applyPosition(lastPosition, originPoint);
    } else {
      this.apply();
    }
  }
  /**
   * Sets the list of Scrollable containers that host the origin element so that
   * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
   * Scrollable must be an ancestor element of the strategy's origin element.
   */
  withScrollableContainers(scrollables) {
    this._scrollables = scrollables;
    return this;
  }
  /**
   * Adds new preferred positions.
   * @param positions List of positions options for this overlay.
   */
  withPositions(positions) {
    this._preferredPositions = positions;
    if (positions.indexOf(this._lastPosition) === -1) {
      this._lastPosition = null;
    }
    this._validatePositions();
    return this;
  }
  /**
   * Sets a minimum distance the overlay may be positioned to the edge of the viewport.
   * @param margin Required margin between the overlay and the viewport edge in pixels.
   */
  withViewportMargin(margin) {
    this._viewportMargin = margin;
    return this;
  }
  /** Sets whether the overlay's width and height can be constrained to fit within the viewport. */
  withFlexibleDimensions(flexibleDimensions = true) {
    this._hasFlexibleDimensions = flexibleDimensions;
    return this;
  }
  /** Sets whether the overlay can grow after the initial open via flexible width/height. */
  withGrowAfterOpen(growAfterOpen = true) {
    this._growAfterOpen = growAfterOpen;
    return this;
  }
  /** Sets whether the overlay can be pushed on-screen if none of the provided positions fit. */
  withPush(canPush = true) {
    this._canPush = canPush;
    return this;
  }
  /**
   * Sets whether the overlay's position should be locked in after it is positioned
   * initially. When an overlay is locked in, it won't attempt to reposition itself
   * when the position is re-applied (e.g. when the user scrolls away).
   * @param isLocked Whether the overlay should locked in.
   */
  withLockedPosition(isLocked = true) {
    this._positionLocked = isLocked;
    return this;
  }
  /**
   * Sets the origin, relative to which to position the overlay.
   * Using an element origin is useful for building components that need to be positioned
   * relatively to a trigger (e.g. dropdown menus or tooltips), whereas using a point can be
   * used for cases like contextual menus which open relative to the user's pointer.
   * @param origin Reference to the new origin.
   */
  setOrigin(origin) {
    this._origin = origin;
    return this;
  }
  /**
   * Sets the default offset for the overlay's connection point on the x-axis.
   * @param offset New offset in the X axis.
   */
  withDefaultOffsetX(offset) {
    this._offsetX = offset;
    return this;
  }
  /**
   * Sets the default offset for the overlay's connection point on the y-axis.
   * @param offset New offset in the Y axis.
   */
  withDefaultOffsetY(offset) {
    this._offsetY = offset;
    return this;
  }
  /**
   * Configures that the position strategy should set a `transform-origin` on some elements
   * inside the overlay, depending on the current position that is being applied. This is
   * useful for the cases where the origin of an animation can change depending on the
   * alignment of the overlay.
   * @param selector CSS selector that will be used to find the target
   *    elements onto which to set the transform origin.
   */
  withTransformOriginOn(selector) {
    this._transformOriginSelector = selector;
    return this;
  }
  /**
   * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
   */
  _getOriginPoint(originRect, containerRect, pos) {
    let x;
    if (pos.originX == "center") {
      x = originRect.left + originRect.width / 2;
    } else {
      const startX = this._isRtl() ? originRect.right : originRect.left;
      const endX = this._isRtl() ? originRect.left : originRect.right;
      x = pos.originX == "start" ? startX : endX;
    }
    if (containerRect.left < 0) {
      x -= containerRect.left;
    }
    let y;
    if (pos.originY == "center") {
      y = originRect.top + originRect.height / 2;
    } else {
      y = pos.originY == "top" ? originRect.top : originRect.bottom;
    }
    if (containerRect.top < 0) {
      y -= containerRect.top;
    }
    return {
      x,
      y
    };
  }
  /**
   * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
   * origin point to which the overlay should be connected.
   */
  _getOverlayPoint(originPoint, overlayRect, pos) {
    let overlayStartX;
    if (pos.overlayX == "center") {
      overlayStartX = -overlayRect.width / 2;
    } else if (pos.overlayX === "start") {
      overlayStartX = this._isRtl() ? -overlayRect.width : 0;
    } else {
      overlayStartX = this._isRtl() ? 0 : -overlayRect.width;
    }
    let overlayStartY;
    if (pos.overlayY == "center") {
      overlayStartY = -overlayRect.height / 2;
    } else {
      overlayStartY = pos.overlayY == "top" ? 0 : -overlayRect.height;
    }
    return {
      x: originPoint.x + overlayStartX,
      y: originPoint.y + overlayStartY
    };
  }
  /** Gets how well an overlay at the given point will fit within the viewport. */
  _getOverlayFit(point, rawOverlayRect, viewport, position) {
    const overlay = getRoundedBoundingClientRect(rawOverlayRect);
    let {
      x,
      y
    } = point;
    let offsetX = this._getOffset(position, "x");
    let offsetY = this._getOffset(position, "y");
    if (offsetX) {
      x += offsetX;
    }
    if (offsetY) {
      y += offsetY;
    }
    let leftOverflow = 0 - x;
    let rightOverflow = x + overlay.width - viewport.width;
    let topOverflow = 0 - y;
    let bottomOverflow = y + overlay.height - viewport.height;
    let visibleWidth = this._subtractOverflows(overlay.width, leftOverflow, rightOverflow);
    let visibleHeight = this._subtractOverflows(overlay.height, topOverflow, bottomOverflow);
    let visibleArea = visibleWidth * visibleHeight;
    return {
      visibleArea,
      isCompletelyWithinViewport: overlay.width * overlay.height === visibleArea,
      fitsInViewportVertically: visibleHeight === overlay.height,
      fitsInViewportHorizontally: visibleWidth == overlay.width
    };
  }
  /**
   * Whether the overlay can fit within the viewport when it may resize either its width or height.
   * @param fit How well the overlay fits in the viewport at some position.
   * @param point The (x, y) coordinates of the overlay at some position.
   * @param viewport The geometry of the viewport.
   */
  _canFitWithFlexibleDimensions(fit, point, viewport) {
    if (this._hasFlexibleDimensions) {
      const availableHeight = viewport.bottom - point.y;
      const availableWidth = viewport.right - point.x;
      const minHeight = getPixelValue(this._overlayRef.getConfig().minHeight);
      const minWidth = getPixelValue(this._overlayRef.getConfig().minWidth);
      const verticalFit = fit.fitsInViewportVertically || minHeight != null && minHeight <= availableHeight;
      const horizontalFit = fit.fitsInViewportHorizontally || minWidth != null && minWidth <= availableWidth;
      return verticalFit && horizontalFit;
    }
    return false;
  }
  /**
   * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
   * the viewport, the top-left corner will be pushed on-screen (with overflow occurring on the
   * right and bottom).
   *
   * @param start Starting point from which the overlay is pushed.
   * @param rawOverlayRect Dimensions of the overlay.
   * @param scrollPosition Current viewport scroll position.
   * @returns The point at which to position the overlay after pushing. This is effectively a new
   *     originPoint.
   */
  _pushOverlayOnScreen(start, rawOverlayRect, scrollPosition) {
    if (this._previousPushAmount && this._positionLocked) {
      return {
        x: start.x + this._previousPushAmount.x,
        y: start.y + this._previousPushAmount.y
      };
    }
    const overlay = getRoundedBoundingClientRect(rawOverlayRect);
    const viewport = this._viewportRect;
    const overflowRight = Math.max(start.x + overlay.width - viewport.width, 0);
    const overflowBottom = Math.max(start.y + overlay.height - viewport.height, 0);
    const overflowTop = Math.max(viewport.top - scrollPosition.top - start.y, 0);
    const overflowLeft = Math.max(viewport.left - scrollPosition.left - start.x, 0);
    let pushX = 0;
    let pushY = 0;
    if (overlay.width <= viewport.width) {
      pushX = overflowLeft || -overflowRight;
    } else {
      pushX = start.x < this._viewportMargin ? viewport.left - scrollPosition.left - start.x : 0;
    }
    if (overlay.height <= viewport.height) {
      pushY = overflowTop || -overflowBottom;
    } else {
      pushY = start.y < this._viewportMargin ? viewport.top - scrollPosition.top - start.y : 0;
    }
    this._previousPushAmount = {
      x: pushX,
      y: pushY
    };
    return {
      x: start.x + pushX,
      y: start.y + pushY
    };
  }
  /**
   * Applies a computed position to the overlay and emits a position change.
   * @param position The position preference
   * @param originPoint The point on the origin element where the overlay is connected.
   */
  _applyPosition(position, originPoint) {
    this._setTransformOrigin(position);
    this._setOverlayElementStyles(originPoint, position);
    this._setBoundingBoxStyles(originPoint, position);
    if (position.panelClass) {
      this._addPanelClasses(position.panelClass);
    }
    if (this._positionChanges.observers.length) {
      const scrollVisibility = this._getScrollVisibility();
      if (position !== this._lastPosition || !this._lastScrollVisibility || !compareScrollVisibility(this._lastScrollVisibility, scrollVisibility)) {
        const changeEvent = new ConnectedOverlayPositionChange(position, scrollVisibility);
        this._positionChanges.next(changeEvent);
      }
      this._lastScrollVisibility = scrollVisibility;
    }
    this._lastPosition = position;
    this._isInitialRender = false;
  }
  /** Sets the transform origin based on the configured selector and the passed-in position.  */
  _setTransformOrigin(position) {
    if (!this._transformOriginSelector) {
      return;
    }
    const elements = this._boundingBox.querySelectorAll(this._transformOriginSelector);
    let xOrigin;
    let yOrigin = position.overlayY;
    if (position.overlayX === "center") {
      xOrigin = "center";
    } else if (this._isRtl()) {
      xOrigin = position.overlayX === "start" ? "right" : "left";
    } else {
      xOrigin = position.overlayX === "start" ? "left" : "right";
    }
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.transformOrigin = `${xOrigin} ${yOrigin}`;
    }
  }
  /**
   * Gets the position and size of the overlay's sizing container.
   *
   * This method does no measuring and applies no styles so that we can cheaply compute the
   * bounds for all positions and choose the best fit based on these results.
   */
  _calculateBoundingBoxRect(origin, position) {
    const viewport = this._viewportRect;
    const isRtl = this._isRtl();
    let height, top, bottom;
    if (position.overlayY === "top") {
      top = origin.y;
      height = viewport.height - top + this._viewportMargin;
    } else if (position.overlayY === "bottom") {
      bottom = viewport.height - origin.y + this._viewportMargin * 2;
      height = viewport.height - bottom + this._viewportMargin;
    } else {
      const smallestDistanceToViewportEdge = Math.min(viewport.bottom - origin.y + viewport.top, origin.y);
      const previousHeight = this._lastBoundingBoxSize.height;
      height = smallestDistanceToViewportEdge * 2;
      top = origin.y - smallestDistanceToViewportEdge;
      if (height > previousHeight && !this._isInitialRender && !this._growAfterOpen) {
        top = origin.y - previousHeight / 2;
      }
    }
    const isBoundedByRightViewportEdge = position.overlayX === "start" && !isRtl || position.overlayX === "end" && isRtl;
    const isBoundedByLeftViewportEdge = position.overlayX === "end" && !isRtl || position.overlayX === "start" && isRtl;
    let width, left, right;
    if (isBoundedByLeftViewportEdge) {
      right = viewport.width - origin.x + this._viewportMargin * 2;
      width = origin.x - this._viewportMargin;
    } else if (isBoundedByRightViewportEdge) {
      left = origin.x;
      width = viewport.right - origin.x;
    } else {
      const smallestDistanceToViewportEdge = Math.min(viewport.right - origin.x + viewport.left, origin.x);
      const previousWidth = this._lastBoundingBoxSize.width;
      width = smallestDistanceToViewportEdge * 2;
      left = origin.x - smallestDistanceToViewportEdge;
      if (width > previousWidth && !this._isInitialRender && !this._growAfterOpen) {
        left = origin.x - previousWidth / 2;
      }
    }
    return {
      top,
      left,
      bottom,
      right,
      width,
      height
    };
  }
  /**
   * Sets the position and size of the overlay's sizing wrapper. The wrapper is positioned on the
   * origin's connection point and stretches to the bounds of the viewport.
   *
   * @param origin The point on the origin element where the overlay is connected.
   * @param position The position preference
   */
  _setBoundingBoxStyles(origin, position) {
    const boundingBoxRect = this._calculateBoundingBoxRect(origin, position);
    if (!this._isInitialRender && !this._growAfterOpen) {
      boundingBoxRect.height = Math.min(boundingBoxRect.height, this._lastBoundingBoxSize.height);
      boundingBoxRect.width = Math.min(boundingBoxRect.width, this._lastBoundingBoxSize.width);
    }
    const styles = {};
    if (this._hasExactPosition()) {
      styles.top = styles.left = "0";
      styles.bottom = styles.right = styles.maxHeight = styles.maxWidth = "";
      styles.width = styles.height = "100%";
    } else {
      const maxHeight = this._overlayRef.getConfig().maxHeight;
      const maxWidth = this._overlayRef.getConfig().maxWidth;
      styles.height = coerceCssPixelValue(boundingBoxRect.height);
      styles.top = coerceCssPixelValue(boundingBoxRect.top);
      styles.bottom = coerceCssPixelValue(boundingBoxRect.bottom);
      styles.width = coerceCssPixelValue(boundingBoxRect.width);
      styles.left = coerceCssPixelValue(boundingBoxRect.left);
      styles.right = coerceCssPixelValue(boundingBoxRect.right);
      if (position.overlayX === "center") {
        styles.alignItems = "center";
      } else {
        styles.alignItems = position.overlayX === "end" ? "flex-end" : "flex-start";
      }
      if (position.overlayY === "center") {
        styles.justifyContent = "center";
      } else {
        styles.justifyContent = position.overlayY === "bottom" ? "flex-end" : "flex-start";
      }
      if (maxHeight) {
        styles.maxHeight = coerceCssPixelValue(maxHeight);
      }
      if (maxWidth) {
        styles.maxWidth = coerceCssPixelValue(maxWidth);
      }
    }
    this._lastBoundingBoxSize = boundingBoxRect;
    extendStyles(this._boundingBox.style, styles);
  }
  /** Resets the styles for the bounding box so that a new positioning can be computed. */
  _resetBoundingBoxStyles() {
    extendStyles(this._boundingBox.style, {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      height: "",
      width: "",
      alignItems: "",
      justifyContent: ""
    });
  }
  /** Resets the styles for the overlay pane so that a new positioning can be computed. */
  _resetOverlayElementStyles() {
    extendStyles(this._pane.style, {
      top: "",
      left: "",
      bottom: "",
      right: "",
      position: "",
      transform: ""
    });
  }
  /** Sets positioning styles to the overlay element. */
  _setOverlayElementStyles(originPoint, position) {
    const styles = {};
    const hasExactPosition = this._hasExactPosition();
    const hasFlexibleDimensions = this._hasFlexibleDimensions;
    const config = this._overlayRef.getConfig();
    if (hasExactPosition) {
      const scrollPosition = this._viewportRuler.getViewportScrollPosition();
      extendStyles(styles, this._getExactOverlayY(position, originPoint, scrollPosition));
      extendStyles(styles, this._getExactOverlayX(position, originPoint, scrollPosition));
    } else {
      styles.position = "static";
    }
    let transformString = "";
    let offsetX = this._getOffset(position, "x");
    let offsetY = this._getOffset(position, "y");
    if (offsetX) {
      transformString += `translateX(${offsetX}px) `;
    }
    if (offsetY) {
      transformString += `translateY(${offsetY}px)`;
    }
    styles.transform = transformString.trim();
    if (config.maxHeight) {
      if (hasExactPosition) {
        styles.maxHeight = coerceCssPixelValue(config.maxHeight);
      } else if (hasFlexibleDimensions) {
        styles.maxHeight = "";
      }
    }
    if (config.maxWidth) {
      if (hasExactPosition) {
        styles.maxWidth = coerceCssPixelValue(config.maxWidth);
      } else if (hasFlexibleDimensions) {
        styles.maxWidth = "";
      }
    }
    extendStyles(this._pane.style, styles);
  }
  /** Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing. */
  _getExactOverlayY(position, originPoint, scrollPosition) {
    let styles = {
      top: "",
      bottom: ""
    };
    let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
    if (this._isPushed) {
      overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
    }
    if (position.overlayY === "bottom") {
      const documentHeight = this._document.documentElement.clientHeight;
      styles.bottom = `${documentHeight - (overlayPoint.y + this._overlayRect.height)}px`;
    } else {
      styles.top = coerceCssPixelValue(overlayPoint.y);
    }
    return styles;
  }
  /** Gets the exact left/right for the overlay when not using flexible sizing or when pushing. */
  _getExactOverlayX(position, originPoint, scrollPosition) {
    let styles = {
      left: "",
      right: ""
    };
    let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
    if (this._isPushed) {
      overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
    }
    let horizontalStyleProperty;
    if (this._isRtl()) {
      horizontalStyleProperty = position.overlayX === "end" ? "left" : "right";
    } else {
      horizontalStyleProperty = position.overlayX === "end" ? "right" : "left";
    }
    if (horizontalStyleProperty === "right") {
      const documentWidth = this._document.documentElement.clientWidth;
      styles.right = `${documentWidth - (overlayPoint.x + this._overlayRect.width)}px`;
    } else {
      styles.left = coerceCssPixelValue(overlayPoint.x);
    }
    return styles;
  }
  /**
   * Gets the view properties of the trigger and overlay, including whether they are clipped
   * or completely outside the view of any of the strategy's scrollables.
   */
  _getScrollVisibility() {
    const originBounds = this._getOriginRect();
    const overlayBounds = this._pane.getBoundingClientRect();
    const scrollContainerBounds = this._scrollables.map((scrollable) => {
      return scrollable.getElementRef().nativeElement.getBoundingClientRect();
    });
    return {
      isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
      isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
      isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
      isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds)
    };
  }
  /** Subtracts the amount that an element is overflowing on an axis from its length. */
  _subtractOverflows(length, ...overflows) {
    return overflows.reduce((currentValue, currentOverflow) => {
      return currentValue - Math.max(currentOverflow, 0);
    }, length);
  }
  /** Narrows the given viewport rect by the current _viewportMargin. */
  _getNarrowedViewportRect() {
    const width = this._document.documentElement.clientWidth;
    const height = this._document.documentElement.clientHeight;
    const scrollPosition = this._viewportRuler.getViewportScrollPosition();
    return {
      top: scrollPosition.top + this._viewportMargin,
      left: scrollPosition.left + this._viewportMargin,
      right: scrollPosition.left + width - this._viewportMargin,
      bottom: scrollPosition.top + height - this._viewportMargin,
      width: width - 2 * this._viewportMargin,
      height: height - 2 * this._viewportMargin
    };
  }
  /** Whether the we're dealing with an RTL context */
  _isRtl() {
    return this._overlayRef.getDirection() === "rtl";
  }
  /** Determines whether the overlay uses exact or flexible positioning. */
  _hasExactPosition() {
    return !this._hasFlexibleDimensions || this._isPushed;
  }
  /** Retrieves the offset of a position along the x or y axis. */
  _getOffset(position, axis) {
    if (axis === "x") {
      return position.offsetX == null ? this._offsetX : position.offsetX;
    }
    return position.offsetY == null ? this._offsetY : position.offsetY;
  }
  /** Validates that the current position match the expected values. */
  _validatePositions() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._preferredPositions.length) {
        throw Error("FlexibleConnectedPositionStrategy: At least one position is required.");
      }
      this._preferredPositions.forEach((pair) => {
        validateHorizontalPosition("originX", pair.originX);
        validateVerticalPosition("originY", pair.originY);
        validateHorizontalPosition("overlayX", pair.overlayX);
        validateVerticalPosition("overlayY", pair.overlayY);
      });
    }
  }
  /** Adds a single CSS class or an array of classes on the overlay panel. */
  _addPanelClasses(cssClasses) {
    if (this._pane) {
      coerceArray(cssClasses).forEach((cssClass) => {
        if (cssClass !== "" && this._appliedPanelClasses.indexOf(cssClass) === -1) {
          this._appliedPanelClasses.push(cssClass);
          this._pane.classList.add(cssClass);
        }
      });
    }
  }
  /** Clears the classes that the position strategy has applied from the overlay panel. */
  _clearPanelClasses() {
    if (this._pane) {
      this._appliedPanelClasses.forEach((cssClass) => {
        this._pane.classList.remove(cssClass);
      });
      this._appliedPanelClasses = [];
    }
  }
  /** Returns the DOMRect of the current origin. */
  _getOriginRect() {
    const origin = this._origin;
    if (origin instanceof ElementRef) {
      return origin.nativeElement.getBoundingClientRect();
    }
    if (origin instanceof Element) {
      return origin.getBoundingClientRect();
    }
    const width = origin.width || 0;
    const height = origin.height || 0;
    return {
      top: origin.y,
      bottom: origin.y + height,
      left: origin.x,
      right: origin.x + width,
      height,
      width
    };
  }
};
function extendStyles(destination, source) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }
  return destination;
}
function getPixelValue(input) {
  if (typeof input !== "number" && input != null) {
    const [value, units] = input.split(cssUnitPattern);
    return !units || units === "px" ? parseFloat(value) : null;
  }
  return input || null;
}
function getRoundedBoundingClientRect(clientRect) {
  return {
    top: Math.floor(clientRect.top),
    right: Math.floor(clientRect.right),
    bottom: Math.floor(clientRect.bottom),
    left: Math.floor(clientRect.left),
    width: Math.floor(clientRect.width),
    height: Math.floor(clientRect.height)
  };
}
function compareScrollVisibility(a, b) {
  if (a === b) {
    return true;
  }
  return a.isOriginClipped === b.isOriginClipped && a.isOriginOutsideView === b.isOriginOutsideView && a.isOverlayClipped === b.isOverlayClipped && a.isOverlayOutsideView === b.isOverlayOutsideView;
}
var STANDARD_DROPDOWN_BELOW_POSITIONS = [{
  originX: "start",
  originY: "bottom",
  overlayX: "start",
  overlayY: "top"
}, {
  originX: "start",
  originY: "top",
  overlayX: "start",
  overlayY: "bottom"
}, {
  originX: "end",
  originY: "bottom",
  overlayX: "end",
  overlayY: "top"
}, {
  originX: "end",
  originY: "top",
  overlayX: "end",
  overlayY: "bottom"
}];
var STANDARD_DROPDOWN_ADJACENT_POSITIONS = [{
  originX: "end",
  originY: "top",
  overlayX: "start",
  overlayY: "top"
}, {
  originX: "end",
  originY: "bottom",
  overlayX: "start",
  overlayY: "bottom"
}, {
  originX: "start",
  originY: "top",
  overlayX: "end",
  overlayY: "top"
}, {
  originX: "start",
  originY: "bottom",
  overlayX: "end",
  overlayY: "bottom"
}];
var wrapperClass = "cdk-global-overlay-wrapper";
var GlobalPositionStrategy = class {
  /** The overlay to which this strategy is attached. */
  _overlayRef;
  _cssPosition = "static";
  _topOffset = "";
  _bottomOffset = "";
  _alignItems = "";
  _xPosition = "";
  _xOffset = "";
  _width = "";
  _height = "";
  _isDisposed = false;
  attach(overlayRef) {
    const config = overlayRef.getConfig();
    this._overlayRef = overlayRef;
    if (this._width && !config.width) {
      overlayRef.updateSize({
        width: this._width
      });
    }
    if (this._height && !config.height) {
      overlayRef.updateSize({
        height: this._height
      });
    }
    overlayRef.hostElement.classList.add(wrapperClass);
    this._isDisposed = false;
  }
  /**
   * Sets the top position of the overlay. Clears any previously set vertical position.
   * @param value New top offset.
   */
  top(value = "") {
    this._bottomOffset = "";
    this._topOffset = value;
    this._alignItems = "flex-start";
    return this;
  }
  /**
   * Sets the left position of the overlay. Clears any previously set horizontal position.
   * @param value New left offset.
   */
  left(value = "") {
    this._xOffset = value;
    this._xPosition = "left";
    return this;
  }
  /**
   * Sets the bottom position of the overlay. Clears any previously set vertical position.
   * @param value New bottom offset.
   */
  bottom(value = "") {
    this._topOffset = "";
    this._bottomOffset = value;
    this._alignItems = "flex-end";
    return this;
  }
  /**
   * Sets the right position of the overlay. Clears any previously set horizontal position.
   * @param value New right offset.
   */
  right(value = "") {
    this._xOffset = value;
    this._xPosition = "right";
    return this;
  }
  /**
   * Sets the overlay to the start of the viewport, depending on the overlay direction.
   * This will be to the left in LTR layouts and to the right in RTL.
   * @param offset Offset from the edge of the screen.
   */
  start(value = "") {
    this._xOffset = value;
    this._xPosition = "start";
    return this;
  }
  /**
   * Sets the overlay to the end of the viewport, depending on the overlay direction.
   * This will be to the right in LTR layouts and to the left in RTL.
   * @param offset Offset from the edge of the screen.
   */
  end(value = "") {
    this._xOffset = value;
    this._xPosition = "end";
    return this;
  }
  /**
   * Sets the overlay width and clears any previously set width.
   * @param value New width for the overlay
   * @deprecated Pass the `width` through the `OverlayConfig`.
   * @breaking-change 8.0.0
   */
  width(value = "") {
    if (this._overlayRef) {
      this._overlayRef.updateSize({
        width: value
      });
    } else {
      this._width = value;
    }
    return this;
  }
  /**
   * Sets the overlay height and clears any previously set height.
   * @param value New height for the overlay
   * @deprecated Pass the `height` through the `OverlayConfig`.
   * @breaking-change 8.0.0
   */
  height(value = "") {
    if (this._overlayRef) {
      this._overlayRef.updateSize({
        height: value
      });
    } else {
      this._height = value;
    }
    return this;
  }
  /**
   * Centers the overlay horizontally with an optional offset.
   * Clears any previously set horizontal position.
   *
   * @param offset Overlay offset from the horizontal center.
   */
  centerHorizontally(offset = "") {
    this.left(offset);
    this._xPosition = "center";
    return this;
  }
  /**
   * Centers the overlay vertically with an optional offset.
   * Clears any previously set vertical position.
   *
   * @param offset Overlay offset from the vertical center.
   */
  centerVertically(offset = "") {
    this.top(offset);
    this._alignItems = "center";
    return this;
  }
  /**
   * Apply the position to the element.
   * @docs-private
   */
  apply() {
    if (!this._overlayRef || !this._overlayRef.hasAttached()) {
      return;
    }
    const styles = this._overlayRef.overlayElement.style;
    const parentStyles = this._overlayRef.hostElement.style;
    const config = this._overlayRef.getConfig();
    const {
      width,
      height,
      maxWidth,
      maxHeight
    } = config;
    const shouldBeFlushHorizontally = (width === "100%" || width === "100vw") && (!maxWidth || maxWidth === "100%" || maxWidth === "100vw");
    const shouldBeFlushVertically = (height === "100%" || height === "100vh") && (!maxHeight || maxHeight === "100%" || maxHeight === "100vh");
    const xPosition = this._xPosition;
    const xOffset = this._xOffset;
    const isRtl = this._overlayRef.getConfig().direction === "rtl";
    let marginLeft = "";
    let marginRight = "";
    let justifyContent = "";
    if (shouldBeFlushHorizontally) {
      justifyContent = "flex-start";
    } else if (xPosition === "center") {
      justifyContent = "center";
      if (isRtl) {
        marginRight = xOffset;
      } else {
        marginLeft = xOffset;
      }
    } else if (isRtl) {
      if (xPosition === "left" || xPosition === "end") {
        justifyContent = "flex-end";
        marginLeft = xOffset;
      } else if (xPosition === "right" || xPosition === "start") {
        justifyContent = "flex-start";
        marginRight = xOffset;
      }
    } else if (xPosition === "left" || xPosition === "start") {
      justifyContent = "flex-start";
      marginLeft = xOffset;
    } else if (xPosition === "right" || xPosition === "end") {
      justifyContent = "flex-end";
      marginRight = xOffset;
    }
    styles.position = this._cssPosition;
    styles.marginLeft = shouldBeFlushHorizontally ? "0" : marginLeft;
    styles.marginTop = shouldBeFlushVertically ? "0" : this._topOffset;
    styles.marginBottom = this._bottomOffset;
    styles.marginRight = shouldBeFlushHorizontally ? "0" : marginRight;
    parentStyles.justifyContent = justifyContent;
    parentStyles.alignItems = shouldBeFlushVertically ? "flex-start" : this._alignItems;
  }
  /**
   * Cleans up the DOM changes from the position strategy.
   * @docs-private
   */
  dispose() {
    if (this._isDisposed || !this._overlayRef) {
      return;
    }
    const styles = this._overlayRef.overlayElement.style;
    const parent = this._overlayRef.hostElement;
    const parentStyles = parent.style;
    parent.classList.remove(wrapperClass);
    parentStyles.justifyContent = parentStyles.alignItems = styles.marginTop = styles.marginBottom = styles.marginLeft = styles.marginRight = styles.position = "";
    this._overlayRef = null;
    this._isDisposed = true;
  }
};
var OverlayPositionBuilder = class _OverlayPositionBuilder {
  _viewportRuler = inject(ViewportRuler);
  _document = inject(DOCUMENT);
  _platform = inject(Platform);
  _overlayContainer = inject(OverlayContainer);
  constructor() {
  }
  /**
   * Creates a global position strategy.
   */
  global() {
    return new GlobalPositionStrategy();
  }
  /**
   * Creates a flexible position strategy.
   * @param origin Origin relative to which to position the overlay.
   */
  flexibleConnectedTo(origin) {
    return new FlexibleConnectedPositionStrategy(origin, this._viewportRuler, this._document, this._platform, this._overlayContainer);
  }
  static \u0275fac = function OverlayPositionBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayPositionBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayPositionBuilder,
    factory: _OverlayPositionBuilder.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayPositionBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var Overlay = class _Overlay {
  scrollStrategies = inject(ScrollStrategyOptions);
  _overlayContainer = inject(OverlayContainer);
  _positionBuilder = inject(OverlayPositionBuilder);
  _keyboardDispatcher = inject(OverlayKeyboardDispatcher);
  _injector = inject(Injector);
  _ngZone = inject(NgZone);
  _document = inject(DOCUMENT);
  _directionality = inject(Directionality);
  _location = inject(Location);
  _outsideClickDispatcher = inject(OverlayOutsideClickDispatcher);
  _animationsModuleType = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  _idGenerator = inject(_IdGenerator);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _appRef;
  _styleLoader = inject(_CdkPrivateStyleLoader);
  constructor() {
  }
  /**
   * Creates an overlay.
   * @param config Configuration applied to the overlay.
   * @returns Reference to the created overlay.
   */
  create(config) {
    this._styleLoader.load(_CdkOverlayStyleLoader);
    const host = this._createHostElement();
    const pane = this._createPaneElement(host);
    const portalOutlet = this._createPortalOutlet(pane);
    const overlayConfig = new OverlayConfig(config);
    overlayConfig.direction = overlayConfig.direction || this._directionality.value;
    return new OverlayRef(portalOutlet, host, pane, overlayConfig, this._ngZone, this._keyboardDispatcher, this._document, this._location, this._outsideClickDispatcher, this._animationsModuleType === "NoopAnimations", this._injector.get(EnvironmentInjector), this._renderer);
  }
  /**
   * Gets a position builder that can be used, via fluent API,
   * to construct and configure a position strategy.
   * @returns An overlay position builder.
   */
  position() {
    return this._positionBuilder;
  }
  /**
   * Creates the DOM element for an overlay and appends it to the overlay container.
   * @returns Newly-created pane element
   */
  _createPaneElement(host) {
    const pane = this._document.createElement("div");
    pane.id = this._idGenerator.getId("cdk-overlay-");
    pane.classList.add("cdk-overlay-pane");
    host.appendChild(pane);
    return pane;
  }
  /**
   * Creates the host element that wraps around an overlay
   * and can be used for advanced positioning.
   * @returns Newly-create host element.
   */
  _createHostElement() {
    const host = this._document.createElement("div");
    this._overlayContainer.getContainerElement().appendChild(host);
    return host;
  }
  /**
   * Create a DomPortalOutlet into which the overlay content can be loaded.
   * @param pane The DOM element to turn into a portal outlet.
   * @returns A portal outlet for the given DOM element.
   */
  _createPortalOutlet(pane) {
    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }
    return new DomPortalOutlet(pane, null, this._appRef, this._injector, this._document);
  }
  static \u0275fac = function Overlay_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Overlay)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Overlay,
    factory: _Overlay.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Overlay, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var defaultPositionList = [{
  originX: "start",
  originY: "bottom",
  overlayX: "start",
  overlayY: "top"
}, {
  originX: "start",
  originY: "top",
  overlayX: "start",
  overlayY: "bottom"
}, {
  originX: "end",
  originY: "top",
  overlayX: "end",
  overlayY: "bottom"
}, {
  originX: "end",
  originY: "bottom",
  overlayX: "end",
  overlayY: "top"
}];
var CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new InjectionToken("cdk-connected-overlay-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const overlay = inject(Overlay);
    return () => overlay.scrollStrategies.reposition();
  }
});
var CdkOverlayOrigin = class _CdkOverlayOrigin {
  elementRef = inject(ElementRef);
  constructor() {
  }
  static \u0275fac = function CdkOverlayOrigin_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkOverlayOrigin)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkOverlayOrigin,
    selectors: [["", "cdk-overlay-origin", ""], ["", "overlay-origin", ""], ["", "cdkOverlayOrigin", ""]],
    exportAs: ["cdkOverlayOrigin"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkOverlayOrigin, [{
    type: Directive,
    args: [{
      selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]",
      exportAs: "cdkOverlayOrigin"
    }]
  }], () => [], null);
})();
var CdkConnectedOverlay = class _CdkConnectedOverlay {
  _overlay = inject(Overlay);
  _dir = inject(Directionality, {
    optional: true
  });
  _overlayRef;
  _templatePortal;
  _backdropSubscription = Subscription.EMPTY;
  _attachSubscription = Subscription.EMPTY;
  _detachSubscription = Subscription.EMPTY;
  _positionSubscription = Subscription.EMPTY;
  _offsetX;
  _offsetY;
  _position;
  _scrollStrategyFactory = inject(CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY);
  _disposeOnNavigation = false;
  _ngZone = inject(NgZone);
  /** Origin for the connected overlay. */
  origin;
  /** Registered connected position pairs. */
  positions;
  /**
   * This input overrides the positions input if specified. It lets users pass
   * in arbitrary positioning strategies.
   */
  positionStrategy;
  /** The offset in pixels for the overlay connection point on the x-axis */
  get offsetX() {
    return this._offsetX;
  }
  set offsetX(offsetX) {
    this._offsetX = offsetX;
    if (this._position) {
      this._updatePositionStrategy(this._position);
    }
  }
  /** The offset in pixels for the overlay connection point on the y-axis */
  get offsetY() {
    return this._offsetY;
  }
  set offsetY(offsetY) {
    this._offsetY = offsetY;
    if (this._position) {
      this._updatePositionStrategy(this._position);
    }
  }
  /** The width of the overlay panel. */
  width;
  /** The height of the overlay panel. */
  height;
  /** The min width of the overlay panel. */
  minWidth;
  /** The min height of the overlay panel. */
  minHeight;
  /** The custom class to be set on the backdrop element. */
  backdropClass;
  /** The custom class to add to the overlay pane element. */
  panelClass;
  /** Margin between the overlay and the viewport edges. */
  viewportMargin = 0;
  /** Strategy to be used when handling scroll events while the overlay is open. */
  scrollStrategy;
  /** Whether the overlay is open. */
  open = false;
  /** Whether the overlay can be closed by user interaction. */
  disableClose = false;
  /** CSS selector which to set the transform origin. */
  transformOriginSelector;
  /** Whether or not the overlay should attach a backdrop. */
  hasBackdrop = false;
  /** Whether or not the overlay should be locked when scrolling. */
  lockPosition = false;
  /** Whether the overlay's width and height can be constrained to fit within the viewport. */
  flexibleDimensions = false;
  /** Whether the overlay can grow after the initial open when flexible positioning is turned on. */
  growAfterOpen = false;
  /** Whether the overlay can be pushed on-screen if none of the provided positions fit. */
  push = false;
  /** Whether the overlay should be disposed of when the user goes backwards/forwards in history. */
  get disposeOnNavigation() {
    return this._disposeOnNavigation;
  }
  set disposeOnNavigation(value) {
    this._disposeOnNavigation = value;
  }
  /** Event emitted when the backdrop is clicked. */
  backdropClick = new EventEmitter();
  /** Event emitted when the position has changed. */
  positionChange = new EventEmitter();
  /** Event emitted when the overlay has been attached. */
  attach = new EventEmitter();
  /** Event emitted when the overlay has been detached. */
  detach = new EventEmitter();
  /** Emits when there are keyboard events that are targeted at the overlay. */
  overlayKeydown = new EventEmitter();
  /** Emits when there are mouse outside click events that are targeted at the overlay. */
  overlayOutsideClick = new EventEmitter();
  // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
  constructor() {
    const templateRef = inject(TemplateRef);
    const viewContainerRef = inject(ViewContainerRef);
    this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    this.scrollStrategy = this._scrollStrategyFactory();
  }
  /** The associated overlay reference. */
  get overlayRef() {
    return this._overlayRef;
  }
  /** The element's layout direction. */
  get dir() {
    return this._dir ? this._dir.value : "ltr";
  }
  ngOnDestroy() {
    this._attachSubscription.unsubscribe();
    this._detachSubscription.unsubscribe();
    this._backdropSubscription.unsubscribe();
    this._positionSubscription.unsubscribe();
    this._overlayRef?.dispose();
  }
  ngOnChanges(changes) {
    if (this._position) {
      this._updatePositionStrategy(this._position);
      this._overlayRef?.updateSize({
        width: this.width,
        minWidth: this.minWidth,
        height: this.height,
        minHeight: this.minHeight
      });
      if (changes["origin"] && this.open) {
        this._position.apply();
      }
    }
    if (changes["open"]) {
      this.open ? this.attachOverlay() : this.detachOverlay();
    }
  }
  /** Creates an overlay */
  _createOverlay() {
    if (!this.positions || !this.positions.length) {
      this.positions = defaultPositionList;
    }
    const overlayRef = this._overlayRef = this._overlay.create(this._buildConfig());
    this._attachSubscription = overlayRef.attachments().subscribe(() => this.attach.emit());
    this._detachSubscription = overlayRef.detachments().subscribe(() => this.detach.emit());
    overlayRef.keydownEvents().subscribe((event) => {
      this.overlayKeydown.next(event);
      if (event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event)) {
        event.preventDefault();
        this.detachOverlay();
      }
    });
    this._overlayRef.outsidePointerEvents().subscribe((event) => {
      const origin = this._getOriginElement();
      const target = _getEventTarget(event);
      if (!origin || origin !== target && !origin.contains(target)) {
        this.overlayOutsideClick.next(event);
      }
    });
  }
  /** Builds the overlay config based on the directive's inputs */
  _buildConfig() {
    const positionStrategy = this._position = this.positionStrategy || this._createPositionStrategy();
    const overlayConfig = new OverlayConfig({
      direction: this._dir || "ltr",
      positionStrategy,
      scrollStrategy: this.scrollStrategy,
      hasBackdrop: this.hasBackdrop,
      disposeOnNavigation: this.disposeOnNavigation
    });
    if (this.width || this.width === 0) {
      overlayConfig.width = this.width;
    }
    if (this.height || this.height === 0) {
      overlayConfig.height = this.height;
    }
    if (this.minWidth || this.minWidth === 0) {
      overlayConfig.minWidth = this.minWidth;
    }
    if (this.minHeight || this.minHeight === 0) {
      overlayConfig.minHeight = this.minHeight;
    }
    if (this.backdropClass) {
      overlayConfig.backdropClass = this.backdropClass;
    }
    if (this.panelClass) {
      overlayConfig.panelClass = this.panelClass;
    }
    return overlayConfig;
  }
  /** Updates the state of a position strategy, based on the values of the directive inputs. */
  _updatePositionStrategy(positionStrategy) {
    const positions = this.positions.map((currentPosition) => ({
      originX: currentPosition.originX,
      originY: currentPosition.originY,
      overlayX: currentPosition.overlayX,
      overlayY: currentPosition.overlayY,
      offsetX: currentPosition.offsetX || this.offsetX,
      offsetY: currentPosition.offsetY || this.offsetY,
      panelClass: currentPosition.panelClass || void 0
    }));
    return positionStrategy.setOrigin(this._getOrigin()).withPositions(positions).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector);
  }
  /** Returns the position strategy of the overlay to be set on the overlay config */
  _createPositionStrategy() {
    const strategy = this._overlay.position().flexibleConnectedTo(this._getOrigin());
    this._updatePositionStrategy(strategy);
    return strategy;
  }
  _getOrigin() {
    if (this.origin instanceof CdkOverlayOrigin) {
      return this.origin.elementRef;
    } else {
      return this.origin;
    }
  }
  _getOriginElement() {
    if (this.origin instanceof CdkOverlayOrigin) {
      return this.origin.elementRef.nativeElement;
    }
    if (this.origin instanceof ElementRef) {
      return this.origin.nativeElement;
    }
    if (typeof Element !== "undefined" && this.origin instanceof Element) {
      return this.origin;
    }
    return null;
  }
  /** Attaches the overlay. */
  attachOverlay() {
    if (!this._overlayRef) {
      this._createOverlay();
    } else {
      this._overlayRef.getConfig().hasBackdrop = this.hasBackdrop;
    }
    if (!this._overlayRef.hasAttached()) {
      this._overlayRef.attach(this._templatePortal);
    }
    if (this.hasBackdrop) {
      this._backdropSubscription = this._overlayRef.backdropClick().subscribe((event) => {
        this.backdropClick.emit(event);
      });
    } else {
      this._backdropSubscription.unsubscribe();
    }
    this._positionSubscription.unsubscribe();
    if (this.positionChange.observers.length > 0) {
      this._positionSubscription = this._position.positionChanges.pipe(takeWhile(() => this.positionChange.observers.length > 0)).subscribe((position) => {
        this._ngZone.run(() => this.positionChange.emit(position));
        if (this.positionChange.observers.length === 0) {
          this._positionSubscription.unsubscribe();
        }
      });
    }
    this.open = true;
  }
  /** Detaches the overlay. */
  detachOverlay() {
    this._overlayRef?.detach();
    this._backdropSubscription.unsubscribe();
    this._positionSubscription.unsubscribe();
    this.open = false;
  }
  static \u0275fac = function CdkConnectedOverlay_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkConnectedOverlay)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkConnectedOverlay,
    selectors: [["", "cdk-connected-overlay", ""], ["", "connected-overlay", ""], ["", "cdkConnectedOverlay", ""]],
    inputs: {
      origin: [0, "cdkConnectedOverlayOrigin", "origin"],
      positions: [0, "cdkConnectedOverlayPositions", "positions"],
      positionStrategy: [0, "cdkConnectedOverlayPositionStrategy", "positionStrategy"],
      offsetX: [0, "cdkConnectedOverlayOffsetX", "offsetX"],
      offsetY: [0, "cdkConnectedOverlayOffsetY", "offsetY"],
      width: [0, "cdkConnectedOverlayWidth", "width"],
      height: [0, "cdkConnectedOverlayHeight", "height"],
      minWidth: [0, "cdkConnectedOverlayMinWidth", "minWidth"],
      minHeight: [0, "cdkConnectedOverlayMinHeight", "minHeight"],
      backdropClass: [0, "cdkConnectedOverlayBackdropClass", "backdropClass"],
      panelClass: [0, "cdkConnectedOverlayPanelClass", "panelClass"],
      viewportMargin: [0, "cdkConnectedOverlayViewportMargin", "viewportMargin"],
      scrollStrategy: [0, "cdkConnectedOverlayScrollStrategy", "scrollStrategy"],
      open: [0, "cdkConnectedOverlayOpen", "open"],
      disableClose: [0, "cdkConnectedOverlayDisableClose", "disableClose"],
      transformOriginSelector: [0, "cdkConnectedOverlayTransformOriginOn", "transformOriginSelector"],
      hasBackdrop: [2, "cdkConnectedOverlayHasBackdrop", "hasBackdrop", booleanAttribute],
      lockPosition: [2, "cdkConnectedOverlayLockPosition", "lockPosition", booleanAttribute],
      flexibleDimensions: [2, "cdkConnectedOverlayFlexibleDimensions", "flexibleDimensions", booleanAttribute],
      growAfterOpen: [2, "cdkConnectedOverlayGrowAfterOpen", "growAfterOpen", booleanAttribute],
      push: [2, "cdkConnectedOverlayPush", "push", booleanAttribute],
      disposeOnNavigation: [2, "cdkConnectedOverlayDisposeOnNavigation", "disposeOnNavigation", booleanAttribute]
    },
    outputs: {
      backdropClick: "backdropClick",
      positionChange: "positionChange",
      attach: "attach",
      detach: "detach",
      overlayKeydown: "overlayKeydown",
      overlayOutsideClick: "overlayOutsideClick"
    },
    exportAs: ["cdkConnectedOverlay"],
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkConnectedOverlay, [{
    type: Directive,
    args: [{
      selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]",
      exportAs: "cdkConnectedOverlay"
    }]
  }], () => [], {
    origin: [{
      type: Input,
      args: ["cdkConnectedOverlayOrigin"]
    }],
    positions: [{
      type: Input,
      args: ["cdkConnectedOverlayPositions"]
    }],
    positionStrategy: [{
      type: Input,
      args: ["cdkConnectedOverlayPositionStrategy"]
    }],
    offsetX: [{
      type: Input,
      args: ["cdkConnectedOverlayOffsetX"]
    }],
    offsetY: [{
      type: Input,
      args: ["cdkConnectedOverlayOffsetY"]
    }],
    width: [{
      type: Input,
      args: ["cdkConnectedOverlayWidth"]
    }],
    height: [{
      type: Input,
      args: ["cdkConnectedOverlayHeight"]
    }],
    minWidth: [{
      type: Input,
      args: ["cdkConnectedOverlayMinWidth"]
    }],
    minHeight: [{
      type: Input,
      args: ["cdkConnectedOverlayMinHeight"]
    }],
    backdropClass: [{
      type: Input,
      args: ["cdkConnectedOverlayBackdropClass"]
    }],
    panelClass: [{
      type: Input,
      args: ["cdkConnectedOverlayPanelClass"]
    }],
    viewportMargin: [{
      type: Input,
      args: ["cdkConnectedOverlayViewportMargin"]
    }],
    scrollStrategy: [{
      type: Input,
      args: ["cdkConnectedOverlayScrollStrategy"]
    }],
    open: [{
      type: Input,
      args: ["cdkConnectedOverlayOpen"]
    }],
    disableClose: [{
      type: Input,
      args: ["cdkConnectedOverlayDisableClose"]
    }],
    transformOriginSelector: [{
      type: Input,
      args: ["cdkConnectedOverlayTransformOriginOn"]
    }],
    hasBackdrop: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayHasBackdrop",
        transform: booleanAttribute
      }]
    }],
    lockPosition: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayLockPosition",
        transform: booleanAttribute
      }]
    }],
    flexibleDimensions: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayFlexibleDimensions",
        transform: booleanAttribute
      }]
    }],
    growAfterOpen: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayGrowAfterOpen",
        transform: booleanAttribute
      }]
    }],
    push: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayPush",
        transform: booleanAttribute
      }]
    }],
    disposeOnNavigation: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayDisposeOnNavigation",
        transform: booleanAttribute
      }]
    }],
    backdropClick: [{
      type: Output
    }],
    positionChange: [{
      type: Output
    }],
    attach: [{
      type: Output
    }],
    detach: [{
      type: Output
    }],
    overlayKeydown: [{
      type: Output
    }],
    overlayOutsideClick: [{
      type: Output
    }]
  });
})();
function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
  return () => overlay.scrollStrategies.reposition();
}
var CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
  provide: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY
};
var OverlayModule = class _OverlayModule {
  static \u0275fac = function OverlayModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _OverlayModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [Overlay, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER],
    imports: [BidiModule, PortalModule, ScrollingModule, ScrollingModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, PortalModule, ScrollingModule, CdkConnectedOverlay, CdkOverlayOrigin],
      exports: [CdkConnectedOverlay, CdkOverlayOrigin, ScrollingModule],
      providers: [Overlay, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER]
    }]
  }], null, null);
})();
var FullscreenOverlayContainer = class _FullscreenOverlayContainer extends OverlayContainer {
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _fullScreenEventName;
  _cleanupFullScreenListener;
  constructor() {
    super();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._cleanupFullScreenListener?.();
  }
  _createContainer() {
    const eventName = this._getEventName();
    super._createContainer();
    this._adjustParentForFullscreenChange();
    if (eventName) {
      this._cleanupFullScreenListener?.();
      this._cleanupFullScreenListener = this._renderer.listen("document", eventName, () => {
        this._adjustParentForFullscreenChange();
      });
    }
  }
  _adjustParentForFullscreenChange() {
    if (this._containerElement) {
      const fullscreenElement = this.getFullscreenElement();
      const parent = fullscreenElement || this._document.body;
      parent.appendChild(this._containerElement);
    }
  }
  _getEventName() {
    if (!this._fullScreenEventName) {
      const _document = this._document;
      if (_document.fullscreenEnabled) {
        this._fullScreenEventName = "fullscreenchange";
      } else if (_document.webkitFullscreenEnabled) {
        this._fullScreenEventName = "webkitfullscreenchange";
      } else if (_document.mozFullScreenEnabled) {
        this._fullScreenEventName = "mozfullscreenchange";
      } else if (_document.msFullscreenEnabled) {
        this._fullScreenEventName = "MSFullscreenChange";
      }
    }
    return this._fullScreenEventName;
  }
  /**
   * When the page is put into fullscreen mode, a specific element is specified.
   * Only that element and its children are visible when in fullscreen mode.
   */
  getFullscreenElement() {
    const _document = this._document;
    return _document.fullscreenElement || _document.webkitFullscreenElement || _document.mozFullScreenElement || _document.msFullscreenElement || null;
  }
  static \u0275fac = function FullscreenOverlayContainer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FullscreenOverlayContainer)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _FullscreenOverlayContainer,
    factory: _FullscreenOverlayContainer.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullscreenOverlayContainer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@angular/cdk/fesm2022/menu.mjs
var CdkMenuGroup = class _CdkMenuGroup {
  static \u0275fac = function CdkMenuGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkMenuGroup)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenuGroup,
    selectors: [["", "cdkMenuGroup", ""]],
    hostAttrs: ["role", "group", 1, "cdk-menu-group"],
    exportAs: ["cdkMenuGroup"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: UniqueSelectionDispatcher,
      useClass: UniqueSelectionDispatcher
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuGroup, [{
    type: Directive,
    args: [{
      selector: "[cdkMenuGroup]",
      exportAs: "cdkMenuGroup",
      host: {
        "role": "group",
        "class": "cdk-menu-group"
      },
      providers: [{
        provide: UniqueSelectionDispatcher,
        useClass: UniqueSelectionDispatcher
      }]
    }]
  }], null, null);
})();
var CDK_MENU = new InjectionToken("cdk-menu");
var FocusNext;
(function(FocusNext2) {
  FocusNext2[FocusNext2["nextItem"] = 0] = "nextItem";
  FocusNext2[FocusNext2["previousItem"] = 1] = "previousItem";
  FocusNext2[FocusNext2["currentItem"] = 2] = "currentItem";
})(FocusNext || (FocusNext = {}));
var MENU_STACK = new InjectionToken("cdk-menu-stack");
var PARENT_OR_NEW_MENU_STACK_PROVIDER = {
  provide: MENU_STACK,
  deps: [[new Optional(), new SkipSelf(), new Inject(MENU_STACK)]],
  useFactory: (parentMenuStack) => parentMenuStack || new MenuStack()
};
var PARENT_OR_NEW_INLINE_MENU_STACK_PROVIDER = (orientation) => ({
  provide: MENU_STACK,
  deps: [[new Optional(), new SkipSelf(), new Inject(MENU_STACK)]],
  useFactory: (parentMenuStack) => parentMenuStack || MenuStack.inline(orientation)
});
var MenuStack = class _MenuStack {
  /** The ID of this menu stack. */
  id = inject(_IdGenerator).getId("cdk-menu-stack-");
  /** All MenuStackItems tracked by this MenuStack. */
  _elements = [];
  /** Emits the element which was popped off of the stack when requested by a closer. */
  _close = new Subject();
  /** Emits once the MenuStack has become empty after popping off elements. */
  _empty = new Subject();
  /** Emits whether any menu in the menu stack has focus. */
  _hasFocus = new Subject();
  /** Observable which emits the MenuStackItem which has been requested to close. */
  closed = this._close;
  /** Observable which emits whether any menu in the menu stack has focus. */
  hasFocus = this._hasFocus.pipe(startWith(false), debounceTime(0), distinctUntilChanged());
  /**
   * Observable which emits when the MenuStack is empty after popping off the last element. It
   * emits a FocusNext event which specifies the action the closer has requested the listener
   * perform.
   */
  emptied = this._empty;
  /**
   * Whether the inline menu associated with this menu stack is vertical or horizontal.
   * `null` indicates there is no inline menu associated with this menu stack.
   */
  _inlineMenuOrientation = null;
  /** Creates a menu stack that originates from an inline menu. */
  static inline(orientation) {
    const stack = new _MenuStack();
    stack._inlineMenuOrientation = orientation;
    return stack;
  }
  /**
   * Adds an item to the menu stack.
   * @param menu the MenuStackItem to put on the stack.
   */
  push(menu) {
    this._elements.push(menu);
  }
  /**
   * Pop items off of the stack up to and including `lastItem` and emit each on the close
   * observable. If the stack is empty or `lastItem` is not on the stack it does nothing.
   * @param lastItem the last item to pop off the stack.
   * @param options Options that configure behavior on close.
   */
  close(lastItem, options) {
    const {
      focusNextOnEmpty,
      focusParentTrigger
    } = __spreadValues({}, options);
    if (this._elements.indexOf(lastItem) >= 0) {
      let poppedElement;
      do {
        poppedElement = this._elements.pop();
        this._close.next({
          item: poppedElement,
          focusParentTrigger
        });
      } while (poppedElement !== lastItem);
      if (this.isEmpty()) {
        this._empty.next(focusNextOnEmpty);
      }
    }
  }
  /**
   * Pop items off of the stack up to but excluding `lastItem` and emit each on the close
   * observable. If the stack is empty or `lastItem` is not on the stack it does nothing.
   * @param lastItem the element which should be left on the stack
   * @return whether or not an item was removed from the stack
   */
  closeSubMenuOf(lastItem) {
    let removed = false;
    if (this._elements.indexOf(lastItem) >= 0) {
      removed = this.peek() !== lastItem;
      while (this.peek() !== lastItem) {
        this._close.next({
          item: this._elements.pop()
        });
      }
    }
    return removed;
  }
  /**
   * Pop off all MenuStackItems and emit each one on the `close` observable one by one.
   * @param options Options that configure behavior on close.
   */
  closeAll(options) {
    const {
      focusNextOnEmpty,
      focusParentTrigger
    } = __spreadValues({}, options);
    if (!this.isEmpty()) {
      while (!this.isEmpty()) {
        const menuStackItem = this._elements.pop();
        if (menuStackItem) {
          this._close.next({
            item: menuStackItem,
            focusParentTrigger
          });
        }
      }
      this._empty.next(focusNextOnEmpty);
    }
  }
  /** Return true if this stack is empty. */
  isEmpty() {
    return !this._elements.length;
  }
  /** Return the length of the stack. */
  length() {
    return this._elements.length;
  }
  /** Get the top most element on the stack. */
  peek() {
    return this._elements[this._elements.length - 1];
  }
  /** Whether the menu stack is associated with an inline menu. */
  hasInlineMenu() {
    return this._inlineMenuOrientation != null;
  }
  /** The orientation of the associated inline menu. */
  inlineMenuOrientation() {
    return this._inlineMenuOrientation;
  }
  /** Sets whether the menu stack contains the focused element. */
  setHasFocus(hasFocus) {
    this._hasFocus.next(hasFocus);
  }
  static \u0275fac = function MenuStack_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuStack)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MenuStack,
    factory: _MenuStack.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuStack, [{
    type: Injectable
  }], null, null);
})();
var MENU_TRIGGER = new InjectionToken("cdk-menu-trigger");
var MENU_SCROLL_STRATEGY = new InjectionToken("cdk-menu-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const overlay = inject(Overlay);
    return () => overlay.scrollStrategies.reposition();
  }
});
var CdkMenuTriggerBase = class _CdkMenuTriggerBase {
  /** The DI injector for this component. */
  injector = inject(Injector);
  /** The view container ref for this component */
  viewContainerRef = inject(ViewContainerRef);
  /** The menu stack in which this menu resides. */
  menuStack = inject(MENU_STACK);
  /** Function used to configure the scroll strategy for the menu. */
  menuScrollStrategy = inject(MENU_SCROLL_STRATEGY);
  /**
   * A list of preferred menu positions to be used when constructing the
   * `FlexibleConnectedPositionStrategy` for this trigger's menu.
   */
  menuPosition;
  /** Emits when the attached menu is requested to open */
  opened = new EventEmitter();
  /** Emits when the attached menu is requested to close */
  closed = new EventEmitter();
  /** Template reference variable to the menu this trigger opens */
  menuTemplateRef;
  /** Context data to be passed along to the menu template */
  menuData;
  /** A reference to the overlay which manages the triggered menu */
  overlayRef = null;
  /** Emits when this trigger is destroyed. */
  destroyed = new Subject();
  /** Emits when the outside pointer events listener on the overlay should be stopped. */
  stopOutsideClicksListener = merge(this.closed, this.destroyed);
  /** The child menu opened by this trigger. */
  childMenu;
  /** The content of the menu panel opened by this trigger. */
  _menuPortal;
  /** The injector to use for the child menu opened by this trigger. */
  _childMenuInjector;
  ngOnDestroy() {
    this._destroyOverlay();
    this.destroyed.next();
    this.destroyed.complete();
  }
  /** Whether the attached menu is open. */
  isOpen() {
    return !!this.overlayRef?.hasAttached();
  }
  /** Registers a child menu as having been opened by this trigger. */
  registerChildMenu(child) {
    this.childMenu = child;
  }
  /**
   * Get the portal to be attached to the overlay which contains the menu. Allows for the menu
   * content to change dynamically and be reflected in the application.
   */
  getMenuContentPortal() {
    const hasMenuContentChanged = this.menuTemplateRef !== this._menuPortal?.templateRef;
    if (this.menuTemplateRef && (!this._menuPortal || hasMenuContentChanged)) {
      this._menuPortal = new TemplatePortal(this.menuTemplateRef, this.viewContainerRef, this.menuData, this._getChildMenuInjector());
    }
    return this._menuPortal;
  }
  /**
   * Whether the given element is inside the scope of this trigger's menu stack.
   * @param element The element to check.
   * @return Whether the element is inside the scope of this trigger's menu stack.
   */
  isElementInsideMenuStack(element) {
    for (let el = element; el; el = el?.parentElement ?? null) {
      if (el.getAttribute("data-cdk-menu-stack-id") === this.menuStack.id) {
        return true;
      }
    }
    return false;
  }
  /** Destroy and unset the overlay reference it if exists */
  _destroyOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
  /** Gets the injector to use when creating a child menu. */
  _getChildMenuInjector() {
    this._childMenuInjector = this._childMenuInjector || Injector.create({
      providers: [{
        provide: MENU_TRIGGER,
        useValue: this
      }, {
        provide: MENU_STACK,
        useValue: this.menuStack
      }],
      parent: this.injector
    });
    return this._childMenuInjector;
  }
  static \u0275fac = function CdkMenuTriggerBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkMenuTriggerBase)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenuTriggerBase,
    hostVars: 2,
    hostBindings: function CdkMenuTriggerBase_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-controls", ctx.childMenu == null ? null : ctx.childMenu.id)("data-cdk-menu-stack-id", ctx.menuStack.id);
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuTriggerBase, [{
    type: Directive,
    args: [{
      host: {
        "[attr.aria-controls]": "childMenu?.id",
        "[attr.data-cdk-menu-stack-id]": "menuStack.id"
      }
    }]
  }], null, null);
})();
function throwMissingPointerFocusTracker() {
  throw Error("expected an instance of PointerFocusTracker to be provided");
}
function throwMissingMenuReference() {
  throw Error("expected a reference to the parent menu");
}
var MENU_AIM = new InjectionToken("cdk-menu-aim");
var MOUSE_MOVE_SAMPLE_FREQUENCY = 3;
var NUM_POINTS = 5;
var CLOSE_DELAY = 300;
function getSlope(a, b) {
  return (b.y - a.y) / (b.x - a.x);
}
function getYIntercept(point, slope) {
  return point.y - slope * point.x;
}
function isWithinSubmenu(submenuPoints, m, b) {
  const {
    left,
    right,
    top,
    bottom
  } = submenuPoints;
  return m * left + b >= top && m * left + b <= bottom || m * right + b >= top && m * right + b <= bottom || (top - b) / m >= left && (top - b) / m <= right || (bottom - b) / m >= left && (bottom - b) / m <= right;
}
var TargetMenuAim = class _TargetMenuAim {
  _ngZone = inject(NgZone);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cleanupMousemove;
  /** The last NUM_POINTS mouse move events. */
  _points = [];
  /** Reference to the root menu in which we are tracking mouse moves. */
  _menu;
  /** Reference to the root menu's mouse manager. */
  _pointerTracker;
  /** The id associated with the current timeout call waiting to resolve. */
  _timeoutId;
  /** Emits when this service is destroyed. */
  _destroyed = new Subject();
  ngOnDestroy() {
    this._cleanupMousemove?.();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /**
   * Set the Menu and its PointerFocusTracker.
   * @param menu The menu that this menu aim service controls.
   * @param pointerTracker The `PointerFocusTracker` for the given menu.
   */
  initialize(menu, pointerTracker) {
    this._menu = menu;
    this._pointerTracker = pointerTracker;
    this._subscribeToMouseMoves();
  }
  /**
   * Calls the `doToggle` callback when it is deemed that the user is not moving towards
   * the submenu.
   * @param doToggle the function called when the user is not moving towards the submenu.
   */
  toggle(doToggle) {
    if (this._menu.orientation === "horizontal") {
      doToggle();
    }
    this._checkConfigured();
    const siblingItemIsWaiting = !!this._timeoutId;
    const hasPoints = this._points.length > 1;
    if (hasPoints && !siblingItemIsWaiting) {
      if (this._isMovingToSubmenu()) {
        this._startTimeout(doToggle);
      } else {
        doToggle();
      }
    } else if (!siblingItemIsWaiting) {
      doToggle();
    }
  }
  /**
   * Start the delayed toggle handler if one isn't running already.
   *
   * The delayed toggle handler executes the `doToggle` callback after some period of time iff the
   * users mouse is on an item in the current menu.
   *
   * @param doToggle the function called when the user is not moving towards the submenu.
   */
  _startTimeout(doToggle) {
    const timeoutId = setTimeout(() => {
      if (this._pointerTracker.activeElement && timeoutId === this._timeoutId) {
        doToggle();
      }
      this._timeoutId = null;
    }, CLOSE_DELAY);
    this._timeoutId = timeoutId;
  }
  /** Whether the user is heading towards the open submenu. */
  _isMovingToSubmenu() {
    const submenuPoints = this._getSubmenuBounds();
    if (!submenuPoints) {
      return false;
    }
    let numMoving = 0;
    const currPoint = this._points[this._points.length - 1];
    for (let i = this._points.length - 2; i >= 0; i--) {
      const previous = this._points[i];
      const slope = getSlope(currPoint, previous);
      if (isWithinSubmenu(submenuPoints, slope, getYIntercept(currPoint, slope))) {
        numMoving++;
      }
    }
    return numMoving >= Math.floor(NUM_POINTS / 2);
  }
  /** Get the bounding DOMRect for the open submenu. */
  _getSubmenuBounds() {
    return this._pointerTracker?.previousElement?.getMenu()?.nativeElement.getBoundingClientRect();
  }
  /**
   * Check if a reference to the PointerFocusTracker and menu element is provided.
   * @throws an error if neither reference is provided.
   */
  _checkConfigured() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._pointerTracker) {
        throwMissingPointerFocusTracker();
      }
      if (!this._menu) {
        throwMissingMenuReference();
      }
    }
  }
  /** Subscribe to the root menus mouse move events and update the tracked mouse points. */
  _subscribeToMouseMoves() {
    this._cleanupMousemove?.();
    this._cleanupMousemove = this._ngZone.runOutsideAngular(() => {
      let eventIndex = 0;
      return this._renderer.listen(this._menu.nativeElement, "mousemove", (event) => {
        if (eventIndex % MOUSE_MOVE_SAMPLE_FREQUENCY === 0) {
          this._points.push({
            x: event.clientX,
            y: event.clientY
          });
          if (this._points.length > NUM_POINTS) {
            this._points.shift();
          }
        }
        eventIndex++;
      });
    });
  }
  static \u0275fac = function TargetMenuAim_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TargetMenuAim)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TargetMenuAim,
    factory: _TargetMenuAim.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TargetMenuAim, [{
    type: Injectable
  }], null, null);
})();
var CdkTargetMenuAim = class _CdkTargetMenuAim {
  static \u0275fac = function CdkTargetMenuAim_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTargetMenuAim)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTargetMenuAim,
    selectors: [["", "cdkTargetMenuAim", ""]],
    exportAs: ["cdkTargetMenuAim"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MENU_AIM,
      useClass: TargetMenuAim
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTargetMenuAim, [{
    type: Directive,
    args: [{
      selector: "[cdkTargetMenuAim]",
      exportAs: "cdkTargetMenuAim",
      providers: [{
        provide: MENU_AIM,
        useClass: TargetMenuAim
      }]
    }]
  }], null, null);
})();
function eventDispatchesNativeClick(elementRef, event) {
  if (!event.isTrusted) {
    return false;
  }
  const el = elementRef.nativeElement;
  const keyCode = event.keyCode;
  if (el.nodeName === "BUTTON" && !el.disabled) {
    return keyCode === ENTER || keyCode === SPACE;
  }
  if (el.nodeName === "A") {
    return keyCode === ENTER;
  }
  return false;
}
var CdkMenuTrigger = class _CdkMenuTrigger extends CdkMenuTriggerBase {
  _elementRef = inject(ElementRef);
  _overlay = inject(Overlay);
  _ngZone = inject(NgZone);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _inputModalityDetector = inject(InputModalityDetector);
  _directionality = inject(Directionality, {
    optional: true
  });
  _renderer = inject(Renderer2);
  _cleanupMouseenter;
  /** The parent menu this trigger belongs to. */
  _parentMenu = inject(CDK_MENU, {
    optional: true
  });
  /** The menu aim service used by this menu. */
  _menuAim = inject(MENU_AIM, {
    optional: true
  });
  constructor() {
    super();
    this._setRole();
    this._registerCloseHandler();
    this._subscribeToMenuStackClosed();
    this._subscribeToMouseEnter();
    this._subscribeToMenuStackHasFocus();
    this._setType();
  }
  /** Toggle the attached menu. */
  toggle() {
    this.isOpen() ? this.close() : this.open();
  }
  /** Open the attached menu. */
  open() {
    if (!this.isOpen() && this.menuTemplateRef != null) {
      this.opened.next();
      this.overlayRef = this.overlayRef || this._overlay.create(this._getOverlayConfig());
      this.overlayRef.attach(this.getMenuContentPortal());
      this._changeDetectorRef.markForCheck();
      this._subscribeToOutsideClicks();
    }
  }
  /** Close the opened menu. */
  close() {
    if (this.isOpen()) {
      this.closed.next();
      this.overlayRef.detach();
      this._changeDetectorRef.markForCheck();
    }
    this._closeSiblingTriggers();
  }
  /**
   * Get a reference to the rendered Menu if the Menu is open and rendered in the DOM.
   */
  getMenu() {
    return this.childMenu;
  }
  ngOnChanges(changes) {
    if (changes["menuPosition"] && this.overlayRef) {
      this.overlayRef.updatePositionStrategy(this._getOverlayPositionStrategy());
    }
  }
  ngOnDestroy() {
    this._cleanupMouseenter();
    super.ngOnDestroy();
  }
  /**
   * Handles keyboard events for the menu item.
   * @param event The keyboard event to handle
   */
  _toggleOnKeydown(event) {
    const isParentVertical = this._parentMenu?.orientation === "vertical";
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        if (!hasModifierKey(event) && !eventDispatchesNativeClick(this._elementRef, event)) {
          this.toggle();
          this.childMenu?.focusFirstItem("keyboard");
        }
        break;
      case RIGHT_ARROW:
        if (!hasModifierKey(event)) {
          if (this._parentMenu && isParentVertical && this._directionality?.value !== "rtl") {
            event.preventDefault();
            this.open();
            this.childMenu?.focusFirstItem("keyboard");
          }
        }
        break;
      case LEFT_ARROW:
        if (!hasModifierKey(event)) {
          if (this._parentMenu && isParentVertical && this._directionality?.value === "rtl") {
            event.preventDefault();
            this.open();
            this.childMenu?.focusFirstItem("keyboard");
          }
        }
        break;
      case DOWN_ARROW:
      case UP_ARROW:
        if (!hasModifierKey(event)) {
          if (!isParentVertical) {
            event.preventDefault();
            this.open();
            event.keyCode === DOWN_ARROW ? this.childMenu?.focusFirstItem("keyboard") : this.childMenu?.focusLastItem("keyboard");
          }
        }
        break;
    }
  }
  /** Handles clicks on the menu trigger. */
  _handleClick() {
    this.toggle();
    this.childMenu?.focusFirstItem("mouse");
  }
  /**
   * Sets whether the trigger's menu stack has focus.
   * @param hasFocus Whether the menu stack has focus.
   */
  _setHasFocus(hasFocus) {
    if (!this._parentMenu) {
      this.menuStack.setHasFocus(hasFocus);
    }
  }
  /**
   * Subscribe to the mouseenter events and close any sibling menu items if this element is moused
   * into.
   */
  _subscribeToMouseEnter() {
    this._cleanupMouseenter = this._ngZone.runOutsideAngular(() => {
      return this._renderer.listen(this._elementRef.nativeElement, "mouseenter", () => {
        if (
          // Skip fake `mouseenter` events dispatched by touch devices.
          this._inputModalityDetector.mostRecentModality !== "touch" && !this.menuStack.isEmpty() && !this.isOpen()
        ) {
          const toggleMenus = () => this._ngZone.run(() => {
            this._closeSiblingTriggers();
            this.open();
          });
          if (this._menuAim) {
            this._menuAim.toggle(toggleMenus);
          } else {
            toggleMenus();
          }
        }
      });
    });
  }
  /** Close out any sibling menu trigger menus. */
  _closeSiblingTriggers() {
    if (this._parentMenu) {
      const isParentMenuBar = !this.menuStack.closeSubMenuOf(this._parentMenu) && this.menuStack.peek() !== this._parentMenu;
      if (isParentMenuBar) {
        this.menuStack.closeAll();
      }
    } else {
      this.menuStack.closeAll();
    }
  }
  /** Get the configuration object used to create the overlay. */
  _getOverlayConfig() {
    return new OverlayConfig({
      positionStrategy: this._getOverlayPositionStrategy(),
      scrollStrategy: this.menuScrollStrategy(),
      direction: this._directionality || void 0
    });
  }
  /** Build the position strategy for the overlay which specifies where to place the menu. */
  _getOverlayPositionStrategy() {
    return this._overlay.position().flexibleConnectedTo(this._elementRef).withLockedPosition().withFlexibleDimensions(false).withPositions(this._getOverlayPositions());
  }
  /** Get the preferred positions for the opened menu relative to the menu item. */
  _getOverlayPositions() {
    return this.menuPosition ?? (!this._parentMenu || this._parentMenu.orientation === "horizontal" ? STANDARD_DROPDOWN_BELOW_POSITIONS : STANDARD_DROPDOWN_ADJACENT_POSITIONS);
  }
  /**
   * Subscribe to the MenuStack close events if this is a standalone trigger and close out the menu
   * this triggers when requested.
   */
  _registerCloseHandler() {
    if (!this._parentMenu) {
      this.menuStack.closed.pipe(takeUntil(this.destroyed)).subscribe(({
        item
      }) => {
        if (item === this.childMenu) {
          this.close();
        }
      });
    }
  }
  /**
   * Subscribe to the overlays outside pointer events stream and handle closing out the stack if a
   * click occurs outside the menus.
   */
  _subscribeToOutsideClicks() {
    if (this.overlayRef) {
      this.overlayRef.outsidePointerEvents().pipe(takeUntil(this.stopOutsideClicksListener)).subscribe((event) => {
        const target = _getEventTarget(event);
        const element = this._elementRef.nativeElement;
        if (target !== element && !element.contains(target)) {
          if (!this.isElementInsideMenuStack(target)) {
            this.menuStack.closeAll();
          } else {
            this._closeSiblingTriggers();
          }
        }
      });
    }
  }
  /** Subscribe to the MenuStack hasFocus events. */
  _subscribeToMenuStackHasFocus() {
    if (!this._parentMenu) {
      this.menuStack.hasFocus.pipe(takeUntil(this.destroyed)).subscribe((hasFocus) => {
        if (!hasFocus) {
          this.menuStack.closeAll();
        }
      });
    }
  }
  /** Subscribe to the MenuStack closed events. */
  _subscribeToMenuStackClosed() {
    if (!this._parentMenu) {
      this.menuStack.closed.subscribe(({
        focusParentTrigger
      }) => {
        if (focusParentTrigger && !this.menuStack.length()) {
          this._elementRef.nativeElement.focus();
        }
      });
    }
  }
  /** Sets the role attribute for this trigger if needed. */
  _setRole() {
    if (!this._parentMenu) {
      this._elementRef.nativeElement.setAttribute("role", "button");
    }
  }
  /** Sets thte `type` attribute of the trigger. */
  _setType() {
    const element = this._elementRef.nativeElement;
    if (element.nodeName === "BUTTON" && !element.getAttribute("type")) {
      element.setAttribute("type", "button");
    }
  }
  static \u0275fac = function CdkMenuTrigger_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkMenuTrigger)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenuTrigger,
    selectors: [["", "cdkMenuTriggerFor", ""]],
    hostAttrs: [1, "cdk-menu-trigger"],
    hostVars: 2,
    hostBindings: function CdkMenuTrigger_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("focusin", function CdkMenuTrigger_focusin_HostBindingHandler() {
          return ctx._setHasFocus(true);
        })("focusout", function CdkMenuTrigger_focusout_HostBindingHandler() {
          return ctx._setHasFocus(false);
        })("keydown", function CdkMenuTrigger_keydown_HostBindingHandler($event) {
          return ctx._toggleOnKeydown($event);
        })("click", function CdkMenuTrigger_click_HostBindingHandler() {
          return ctx._handleClick();
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("aria-haspopup", ctx.menuTemplateRef ? "menu" : null)("aria-expanded", ctx.menuTemplateRef == null ? null : ctx.isOpen());
      }
    },
    inputs: {
      menuTemplateRef: [0, "cdkMenuTriggerFor", "menuTemplateRef"],
      menuPosition: [0, "cdkMenuPosition", "menuPosition"],
      menuData: [0, "cdkMenuTriggerData", "menuData"]
    },
    outputs: {
      opened: "cdkMenuOpened",
      closed: "cdkMenuClosed"
    },
    exportAs: ["cdkMenuTriggerFor"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MENU_TRIGGER,
      useExisting: _CdkMenuTrigger
    }, PARENT_OR_NEW_MENU_STACK_PROVIDER]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuTrigger, [{
    type: Directive,
    args: [{
      selector: "[cdkMenuTriggerFor]",
      exportAs: "cdkMenuTriggerFor",
      host: {
        "class": "cdk-menu-trigger",
        "[attr.aria-haspopup]": 'menuTemplateRef ? "menu" : null',
        "[attr.aria-expanded]": "menuTemplateRef == null ? null : isOpen()",
        "(focusin)": "_setHasFocus(true)",
        "(focusout)": "_setHasFocus(false)",
        "(keydown)": "_toggleOnKeydown($event)",
        "(click)": "_handleClick()"
      },
      inputs: [{
        name: "menuTemplateRef",
        alias: "cdkMenuTriggerFor"
      }, {
        name: "menuPosition",
        alias: "cdkMenuPosition"
      }, {
        name: "menuData",
        alias: "cdkMenuTriggerData"
      }],
      outputs: ["opened: cdkMenuOpened", "closed: cdkMenuClosed"],
      providers: [{
        provide: MENU_TRIGGER,
        useExisting: CdkMenuTrigger
      }, PARENT_OR_NEW_MENU_STACK_PROVIDER]
    }]
  }], () => [], null);
})();
var CdkMenuItem = class _CdkMenuItem {
  _dir = inject(Directionality, {
    optional: true
  });
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _inputModalityDetector = inject(InputModalityDetector);
  _renderer = inject(Renderer2);
  _cleanupMouseEnter;
  /** The menu aim service used by this menu. */
  _menuAim = inject(MENU_AIM, {
    optional: true
  });
  /** The stack of menus this menu belongs to. */
  _menuStack = inject(MENU_STACK);
  /** The parent menu in which this menuitem resides. */
  _parentMenu = inject(CDK_MENU, {
    optional: true
  });
  /** Reference to the CdkMenuItemTrigger directive if one is added to the same element */
  _menuTrigger = inject(CdkMenuTrigger, {
    optional: true,
    self: true
  });
  /**  Whether the CdkMenuItem is disabled - defaults to false */
  disabled = false;
  /**
   * The text used to locate this item during menu typeahead. If not specified,
   * the `textContent` of the item will be used.
   */
  typeaheadLabel;
  /**
   * If this MenuItem is a regular MenuItem, outputs when it is triggered by a keyboard or mouse
   * event.
   */
  triggered = new EventEmitter();
  /** Whether the menu item opens a menu. */
  get hasMenu() {
    return this._menuTrigger?.menuTemplateRef != null;
  }
  /**
   * The tabindex for this menu item managed internally and used for implementing roving a
   * tab index.
   */
  _tabindex = -1;
  /** Whether the item should close the menu if triggered by the spacebar. */
  closeOnSpacebarTrigger = true;
  /** Emits when the menu item is destroyed. */
  destroyed = new Subject();
  constructor() {
    this._setupMouseEnter();
    this._setType();
    if (this._isStandaloneItem()) {
      this._tabindex = 0;
    }
  }
  ngOnDestroy() {
    this._cleanupMouseEnter?.();
    this.destroyed.next();
    this.destroyed.complete();
  }
  /** Place focus on the element. */
  focus() {
    this._elementRef.nativeElement.focus();
  }
  /**
   * If the menu item is not disabled and the element does not have a menu trigger attached, emit
   * on the cdkMenuItemTriggered emitter and close all open menus.
   * @param options Options the configure how the item is triggered
   *   - keepOpen: specifies that the menu should be kept open after triggering the item.
   */
  trigger(options) {
    const {
      keepOpen
    } = __spreadValues({}, options);
    if (!this.disabled && !this.hasMenu) {
      this.triggered.next();
      if (!keepOpen) {
        this._menuStack.closeAll({
          focusParentTrigger: true
        });
      }
    }
  }
  /** Return true if this MenuItem has an attached menu and it is open. */
  isMenuOpen() {
    return !!this._menuTrigger?.isOpen();
  }
  /**
   * Get a reference to the rendered Menu if the Menu is open and it is visible in the DOM.
   * @return the menu if it is open, otherwise undefined.
   */
  getMenu() {
    return this._menuTrigger?.getMenu();
  }
  /** Get the CdkMenuTrigger associated with this element. */
  getMenuTrigger() {
    return this._menuTrigger;
  }
  /** Get the label for this element which is required by the FocusableOption interface. */
  getLabel() {
    return this.typeaheadLabel || this._elementRef.nativeElement.textContent?.trim() || "";
  }
  /** Reset the tabindex to -1. */
  _resetTabIndex() {
    if (!this._isStandaloneItem()) {
      this._tabindex = -1;
    }
  }
  /**
   * Set the tab index to 0 if not disabled and it's a focus event, or a mouse enter if this element
   * is not in a menu bar.
   */
  _setTabIndex(event) {
    if (this.disabled) {
      return;
    }
    if (!event || !this._menuStack.isEmpty()) {
      this._tabindex = 0;
    }
  }
  /**
   * Handles keyboard events for the menu item, specifically either triggering the user defined
   * callback or opening/closing the current menu based on whether the left or right arrow key was
   * pressed.
   * @param event the keyboard event to handle
   */
  _onKeydown(event) {
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        if (!hasModifierKey(event) && !eventDispatchesNativeClick(this._elementRef, event)) {
          const nodeName = this._elementRef.nativeElement.nodeName;
          if (nodeName !== "A" && nodeName !== "BUTTON") {
            event.preventDefault();
          }
          this.trigger({
            keepOpen: event.keyCode === SPACE && !this.closeOnSpacebarTrigger
          });
        }
        break;
      case RIGHT_ARROW:
        if (!hasModifierKey(event)) {
          if (this._parentMenu && this._isParentVertical()) {
            if (this._dir?.value !== "rtl") {
              this._forwardArrowPressed(event);
            } else {
              this._backArrowPressed(event);
            }
          }
        }
        break;
      case LEFT_ARROW:
        if (!hasModifierKey(event)) {
          if (this._parentMenu && this._isParentVertical()) {
            if (this._dir?.value !== "rtl") {
              this._backArrowPressed(event);
            } else {
              this._forwardArrowPressed(event);
            }
          }
        }
        break;
    }
  }
  /** Whether this menu item is standalone or within a menu or menu bar. */
  _isStandaloneItem() {
    return !this._parentMenu;
  }
  /**
   * Handles the user pressing the back arrow key.
   * @param event The keyboard event.
   */
  _backArrowPressed(event) {
    const parentMenu = this._parentMenu;
    if (this._menuStack.hasInlineMenu() || this._menuStack.length() > 1) {
      event.preventDefault();
      this._menuStack.close(parentMenu, {
        focusNextOnEmpty: this._menuStack.inlineMenuOrientation() === "horizontal" ? FocusNext.previousItem : FocusNext.currentItem,
        focusParentTrigger: true
      });
    }
  }
  /**
   * Handles the user pressing the forward arrow key.
   * @param event The keyboard event.
   */
  _forwardArrowPressed(event) {
    if (!this.hasMenu && this._menuStack.inlineMenuOrientation() === "horizontal") {
      event.preventDefault();
      this._menuStack.closeAll({
        focusNextOnEmpty: FocusNext.nextItem,
        focusParentTrigger: true
      });
    }
  }
  /**
   * Subscribe to the mouseenter events and close any sibling menu items if this element is moused
   * into.
   */
  _setupMouseEnter() {
    if (!this._isStandaloneItem()) {
      const closeOpenSiblings = () => this._ngZone.run(() => this._menuStack.closeSubMenuOf(this._parentMenu));
      this._cleanupMouseEnter = this._ngZone.runOutsideAngular(() => this._renderer.listen(this._elementRef.nativeElement, "mouseenter", () => {
        if (this._inputModalityDetector.mostRecentModality !== "touch" && !this._menuStack.isEmpty() && !this.hasMenu) {
          if (this._menuAim) {
            this._menuAim.toggle(closeOpenSiblings);
          } else {
            closeOpenSiblings();
          }
        }
      }));
    }
  }
  /**
   * Return true if the enclosing parent menu is configured in a horizontal orientation, false
   * otherwise or if no parent.
   */
  _isParentVertical() {
    return this._parentMenu?.orientation === "vertical";
  }
  /** Sets the `type` attribute of the menu item. */
  _setType() {
    const element = this._elementRef.nativeElement;
    if (element.nodeName === "BUTTON" && !element.getAttribute("type")) {
      element.setAttribute("type", "button");
    }
  }
  static \u0275fac = function CdkMenuItem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkMenuItem)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenuItem,
    selectors: [["", "cdkMenuItem", ""]],
    hostAttrs: ["role", "menuitem", 1, "cdk-menu-item"],
    hostVars: 2,
    hostBindings: function CdkMenuItem_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("blur", function CdkMenuItem_blur_HostBindingHandler() {
          return ctx._resetTabIndex();
        })("focus", function CdkMenuItem_focus_HostBindingHandler() {
          return ctx._setTabIndex();
        })("click", function CdkMenuItem_click_HostBindingHandler() {
          return ctx.trigger();
        })("keydown", function CdkMenuItem_keydown_HostBindingHandler($event) {
          return ctx._onKeydown($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275hostProperty("tabindex", ctx._tabindex);
        \u0275\u0275attribute("aria-disabled", ctx.disabled || null);
      }
    },
    inputs: {
      disabled: [2, "cdkMenuItemDisabled", "disabled", booleanAttribute],
      typeaheadLabel: [0, "cdkMenuitemTypeaheadLabel", "typeaheadLabel"]
    },
    outputs: {
      triggered: "cdkMenuItemTriggered"
    },
    exportAs: ["cdkMenuItem"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuItem, [{
    type: Directive,
    args: [{
      selector: "[cdkMenuItem]",
      exportAs: "cdkMenuItem",
      host: {
        "role": "menuitem",
        "class": "cdk-menu-item",
        "[tabindex]": "_tabindex",
        "[attr.aria-disabled]": "disabled || null",
        "(blur)": "_resetTabIndex()",
        "(focus)": "_setTabIndex()",
        "(click)": "trigger()",
        "(keydown)": "_onKeydown($event)"
      }
    }]
  }], () => [], {
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkMenuItemDisabled",
        transform: booleanAttribute
      }]
    }],
    typeaheadLabel: [{
      type: Input,
      args: ["cdkMenuitemTypeaheadLabel"]
    }],
    triggered: [{
      type: Output,
      args: ["cdkMenuItemTriggered"]
    }]
  });
})();
var PointerFocusTracker = class {
  _renderer;
  _items;
  _eventCleanups;
  _itemsSubscription;
  /** Emits when an element is moused into. */
  entered = new Subject();
  /** Emits when an element is moused out. */
  exited = new Subject();
  /** The element currently under mouse focus. */
  activeElement;
  /** The element previously under mouse focus. */
  previousElement;
  constructor(_renderer, _items) {
    this._renderer = _renderer;
    this._items = _items;
    this._bindEvents();
    this.entered.subscribe((element) => this.activeElement = element);
    this.exited.subscribe(() => {
      this.previousElement = this.activeElement;
      this.activeElement = void 0;
    });
  }
  /** Stop the managers listeners. */
  destroy() {
    this._cleanupEvents();
    this._itemsSubscription?.unsubscribe();
  }
  /** Binds the enter/exit events on all the items. */
  _bindEvents() {
    this._itemsSubscription = this._items.changes.pipe(startWith(this._items)).subscribe(() => {
      this._cleanupEvents();
      this._eventCleanups = [];
      this._items.forEach((item) => {
        const element = item._elementRef.nativeElement;
        this._eventCleanups.push(this._renderer.listen(element, "mouseenter", () => {
          this.entered.next(item);
        }), this._renderer.listen(element, "mouseout", () => {
          this.exited.next(item);
        }));
      });
    });
  }
  /** Cleans up the currently-bound events. */
  _cleanupEvents() {
    this._eventCleanups?.forEach((cleanup) => cleanup());
    this._eventCleanups = void 0;
  }
};
var CdkMenuBase = class _CdkMenuBase extends CdkMenuGroup {
  _focusMonitor = inject(FocusMonitor);
  ngZone = inject(NgZone);
  _renderer = inject(Renderer2);
  /** The menu's native DOM host element. */
  nativeElement = inject(ElementRef).nativeElement;
  /** The stack of menus this menu belongs to. */
  menuStack = inject(MENU_STACK);
  /** The menu aim service used by this menu. */
  menuAim = inject(MENU_AIM, {
    optional: true,
    self: true
  });
  /** The directionality (text direction) of the current page. */
  dir = inject(Directionality, {
    optional: true
  });
  /** The id of the menu's host element. */
  id = inject(_IdGenerator).getId("cdk-menu-");
  /** All child MenuItem elements nested in this Menu. */
  items;
  /** The direction items in the menu flow. */
  orientation = "vertical";
  /**
   * Whether the menu is displayed inline (i.e. always present vs a conditional popup that the
   * user triggers with a trigger element).
   */
  isInline = false;
  /** Handles keyboard events for the menu. */
  keyManager;
  /** Emits when the MenuBar is destroyed. */
  destroyed = new Subject();
  /** The Menu Item which triggered the open submenu. */
  triggerItem;
  /** Tracks the users mouse movements over the menu. */
  pointerTracker;
  /** Whether this menu's menu stack has focus. */
  _menuStackHasFocus = signal(false);
  _tabIndexSignal = computed(() => {
    const tabindexIfInline = this._menuStackHasFocus() ? -1 : 0;
    return this.isInline ? tabindexIfInline : null;
  });
  ngAfterContentInit() {
    if (!this.isInline) {
      this.menuStack.push(this);
    }
    this._setKeyManager();
    this._handleFocus();
    this._subscribeToMenuStackHasFocus();
    this._subscribeToMenuOpen();
    this._subscribeToMenuStackClosed();
    this._setUpPointerTracker();
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this.nativeElement);
    this.keyManager?.destroy();
    this.destroyed.next();
    this.destroyed.complete();
    this.pointerTracker?.destroy();
  }
  /**
   * Place focus on the first MenuItem in the menu and set the focus origin.
   * @param focusOrigin The origin input mode of the focus event.
   */
  focusFirstItem(focusOrigin = "program") {
    this.keyManager.setFocusOrigin(focusOrigin);
    this.keyManager.setFirstItemActive();
  }
  /**
   * Place focus on the last MenuItem in the menu and set the focus origin.
   * @param focusOrigin The origin input mode of the focus event.
   */
  focusLastItem(focusOrigin = "program") {
    this.keyManager.setFocusOrigin(focusOrigin);
    this.keyManager.setLastItemActive();
  }
  /** Gets the tabindex for this menu. */
  _getTabIndex() {
    return this._tabIndexSignal();
  }
  /**
   * Close the open menu if the current active item opened the requested MenuStackItem.
   * @param menu The menu requested to be closed.
   * @param options Options to configure the behavior on close.
   *   - `focusParentTrigger` Whether to focus the parent trigger after closing the menu.
   */
  closeOpenMenu(menu, options) {
    const {
      focusParentTrigger
    } = __spreadValues({}, options);
    const keyManager = this.keyManager;
    const trigger = this.triggerItem;
    if (menu === trigger?.getMenuTrigger()?.getMenu()) {
      trigger?.getMenuTrigger()?.close();
      if (focusParentTrigger) {
        if (trigger) {
          keyManager.setActiveItem(trigger);
        } else {
          keyManager.setFirstItemActive();
        }
      }
    }
  }
  /** Setup the FocusKeyManager with the correct orientation for the menu. */
  _setKeyManager() {
    this.keyManager = new FocusKeyManager(this.items).withWrap().withTypeAhead().withHomeAndEnd();
    if (this.orientation === "horizontal") {
      this.keyManager.withHorizontalOrientation(this.dir?.value || "ltr");
    } else {
      this.keyManager.withVerticalOrientation();
    }
  }
  /**
   * Subscribe to the menu trigger's open events in order to track the trigger which opened the menu
   * and stop tracking it when the menu is closed.
   */
  _subscribeToMenuOpen() {
    const exitCondition = merge(this.items.changes, this.destroyed);
    this.items.changes.pipe(startWith(this.items), mergeMap((list) => list.filter((item) => item.hasMenu).map((item) => item.getMenuTrigger().opened.pipe(mapTo(item), takeUntil(exitCondition)))), mergeAll(), switchMap((item) => {
      this.triggerItem = item;
      return item.getMenuTrigger().closed;
    }), takeUntil(this.destroyed)).subscribe(() => this.triggerItem = void 0);
  }
  /** Subscribe to the MenuStack close events. */
  _subscribeToMenuStackClosed() {
    this.menuStack.closed.pipe(takeUntil(this.destroyed)).subscribe(({
      item,
      focusParentTrigger
    }) => this.closeOpenMenu(item, {
      focusParentTrigger
    }));
  }
  /** Subscribe to the MenuStack hasFocus events. */
  _subscribeToMenuStackHasFocus() {
    if (this.isInline) {
      this.menuStack.hasFocus.pipe(takeUntil(this.destroyed)).subscribe((hasFocus) => {
        this._menuStackHasFocus.set(hasFocus);
      });
    }
  }
  /**
   * Set the PointerFocusTracker and ensure that when mouse focus changes the key manager is updated
   * with the latest menu item under mouse focus.
   */
  _setUpPointerTracker() {
    if (this.menuAim) {
      this.ngZone.runOutsideAngular(() => {
        this.pointerTracker = new PointerFocusTracker(this._renderer, this.items);
      });
      this.menuAim.initialize(this, this.pointerTracker);
    }
  }
  /** Handles focus landing on the host element of the menu. */
  _handleFocus() {
    this._focusMonitor.monitor(this.nativeElement, false).pipe(takeUntil(this.destroyed)).subscribe((origin) => {
      if (origin !== null && origin !== "mouse") {
        this.focusFirstItem(origin);
      }
    });
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CdkMenuBase_BaseFactory;
    return function CdkMenuBase_Factory(__ngFactoryType__) {
      return (\u0275CdkMenuBase_BaseFactory || (\u0275CdkMenuBase_BaseFactory = \u0275\u0275getInheritedFactory(_CdkMenuBase)))(__ngFactoryType__ || _CdkMenuBase);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenuBase,
    contentQueries: function CdkMenuBase_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, CdkMenuItem, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.items = _t);
      }
    },
    hostAttrs: ["role", "menu"],
    hostVars: 4,
    hostBindings: function CdkMenuBase_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("focusin", function CdkMenuBase_focusin_HostBindingHandler() {
          return ctx.menuStack.setHasFocus(true);
        })("focusout", function CdkMenuBase_focusout_HostBindingHandler() {
          return ctx.menuStack.setHasFocus(false);
        });
      }
      if (rf & 2) {
        \u0275\u0275hostProperty("tabindex", ctx._getTabIndex())("id", ctx.id);
        \u0275\u0275attribute("aria-orientation", ctx.orientation)("data-cdk-menu-stack-id", ctx.menuStack.id);
      }
    },
    inputs: {
      id: "id"
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuBase, [{
    type: Directive,
    args: [{
      host: {
        "role": "menu",
        "class": "",
        // reset the css class added by the super-class
        "[tabindex]": "_getTabIndex()",
        "[id]": "id",
        "[attr.aria-orientation]": "orientation",
        "[attr.data-cdk-menu-stack-id]": "menuStack.id",
        "(focusin)": "menuStack.setHasFocus(true)",
        "(focusout)": "menuStack.setHasFocus(false)"
      }
    }]
  }], null, {
    id: [{
      type: Input
    }],
    items: [{
      type: ContentChildren,
      args: [CdkMenuItem, {
        descendants: true
      }]
    }]
  });
})();
var CdkMenu = class _CdkMenu extends CdkMenuBase {
  _parentTrigger = inject(MENU_TRIGGER, {
    optional: true
  });
  /** Event emitted when the menu is closed. */
  closed = new EventEmitter();
  /** The direction items in the menu flow. */
  orientation = "vertical";
  /** Whether the menu is displayed inline (i.e. always present vs a conditional popup that the user triggers with a trigger element). */
  isInline = !this._parentTrigger;
  constructor() {
    super();
    this.destroyed.subscribe(this.closed);
    this._parentTrigger?.registerChildMenu(this);
  }
  ngAfterContentInit() {
    super.ngAfterContentInit();
    this._subscribeToMenuStackEmptied();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.closed.complete();
  }
  /**
   * Handle keyboard events for the Menu.
   * @param event The keyboard event to be handled.
   */
  _handleKeyEvent(event) {
    const keyManager = this.keyManager;
    switch (event.keyCode) {
      case LEFT_ARROW:
      case RIGHT_ARROW:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          keyManager.setFocusOrigin("keyboard");
          keyManager.onKeydown(event);
        }
        break;
      case ESCAPE:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this.menuStack.close(this, {
            focusNextOnEmpty: FocusNext.currentItem,
            focusParentTrigger: true
          });
        }
        break;
      case TAB:
        if (!hasModifierKey(event, "altKey", "metaKey", "ctrlKey")) {
          this.menuStack.closeAll({
            focusParentTrigger: true
          });
        }
        break;
      default:
        keyManager.onKeydown(event);
    }
  }
  /**
   * Set focus the either the current, previous or next item based on the FocusNext event.
   * @param focusNext The element to focus.
   */
  _toggleMenuFocus(focusNext) {
    const keyManager = this.keyManager;
    switch (focusNext) {
      case FocusNext.nextItem:
        keyManager.setFocusOrigin("keyboard");
        keyManager.setNextItemActive();
        break;
      case FocusNext.previousItem:
        keyManager.setFocusOrigin("keyboard");
        keyManager.setPreviousItemActive();
        break;
      case FocusNext.currentItem:
        if (keyManager.activeItem) {
          keyManager.setFocusOrigin("keyboard");
          keyManager.setActiveItem(keyManager.activeItem);
        }
        break;
    }
  }
  /** Subscribe to the MenuStack emptied events. */
  _subscribeToMenuStackEmptied() {
    this.menuStack.emptied.pipe(takeUntil(this.destroyed)).subscribe((event) => this._toggleMenuFocus(event));
  }
  static \u0275fac = function CdkMenu_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkMenu)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenu,
    selectors: [["", "cdkMenu", ""]],
    hostAttrs: ["role", "menu", 1, "cdk-menu"],
    hostVars: 2,
    hostBindings: function CdkMenu_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown", function CdkMenu_keydown_HostBindingHandler($event) {
          return ctx._handleKeyEvent($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275classProp("cdk-menu-inline", ctx.isInline);
      }
    },
    outputs: {
      closed: "closed"
    },
    exportAs: ["cdkMenu"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkMenuGroup,
      useExisting: _CdkMenu
    }, {
      provide: CDK_MENU,
      useExisting: _CdkMenu
    }, PARENT_OR_NEW_INLINE_MENU_STACK_PROVIDER("vertical")]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenu, [{
    type: Directive,
    args: [{
      selector: "[cdkMenu]",
      exportAs: "cdkMenu",
      host: {
        "role": "menu",
        "class": "cdk-menu",
        "[class.cdk-menu-inline]": "isInline",
        "(keydown)": "_handleKeyEvent($event)"
      },
      providers: [{
        provide: CdkMenuGroup,
        useExisting: CdkMenu
      }, {
        provide: CDK_MENU,
        useExisting: CdkMenu
      }, PARENT_OR_NEW_INLINE_MENU_STACK_PROVIDER("vertical")]
    }]
  }], () => [], {
    closed: [{
      type: Output
    }]
  });
})();
var CdkMenuBar = class _CdkMenuBar extends CdkMenuBase {
  /** The direction items in the menu flow. */
  orientation = "horizontal";
  /** Whether the menu is displayed inline (i.e. always present vs a conditional popup that the user triggers with a trigger element). */
  isInline = true;
  ngAfterContentInit() {
    super.ngAfterContentInit();
    this._subscribeToMenuStackEmptied();
  }
  /**
   * Handle keyboard events for the Menu.
   * @param event The keyboard event to be handled.
   */
  _handleKeyEvent(event) {
    const keyManager = this.keyManager;
    switch (event.keyCode) {
      case UP_ARROW:
      case DOWN_ARROW:
      case LEFT_ARROW:
      case RIGHT_ARROW:
        if (!hasModifierKey(event)) {
          const horizontalArrows = event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW;
          if (horizontalArrows) {
            event.preventDefault();
            const prevIsOpen = keyManager.activeItem?.isMenuOpen();
            keyManager.activeItem?.getMenuTrigger()?.close();
            keyManager.setFocusOrigin("keyboard");
            keyManager.onKeydown(event);
            if (prevIsOpen) {
              keyManager.activeItem?.getMenuTrigger()?.open();
            }
          }
        }
        break;
      case ESCAPE:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          keyManager.activeItem?.getMenuTrigger()?.close();
        }
        break;
      case TAB:
        if (!hasModifierKey(event, "altKey", "metaKey", "ctrlKey")) {
          keyManager.activeItem?.getMenuTrigger()?.close();
        }
        break;
      default:
        keyManager.onKeydown(event);
    }
  }
  /**
   * Set focus to either the current, previous or next item based on the FocusNext event, then
   * open the previous or next item.
   * @param focusNext The element to focus.
   */
  _toggleOpenMenu(focusNext) {
    const keyManager = this.keyManager;
    switch (focusNext) {
      case FocusNext.nextItem:
        keyManager.setFocusOrigin("keyboard");
        keyManager.setNextItemActive();
        keyManager.activeItem?.getMenuTrigger()?.open();
        break;
      case FocusNext.previousItem:
        keyManager.setFocusOrigin("keyboard");
        keyManager.setPreviousItemActive();
        keyManager.activeItem?.getMenuTrigger()?.open();
        break;
      case FocusNext.currentItem:
        if (keyManager.activeItem) {
          keyManager.setFocusOrigin("keyboard");
          keyManager.setActiveItem(keyManager.activeItem);
        }
        break;
    }
  }
  /** Subscribe to the MenuStack emptied events. */
  _subscribeToMenuStackEmptied() {
    this.menuStack?.emptied.pipe(takeUntil(this.destroyed)).subscribe((event) => this._toggleOpenMenu(event));
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CdkMenuBar_BaseFactory;
    return function CdkMenuBar_Factory(__ngFactoryType__) {
      return (\u0275CdkMenuBar_BaseFactory || (\u0275CdkMenuBar_BaseFactory = \u0275\u0275getInheritedFactory(_CdkMenuBar)))(__ngFactoryType__ || _CdkMenuBar);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenuBar,
    selectors: [["", "cdkMenuBar", ""]],
    hostAttrs: ["role", "menubar", 1, "cdk-menu-bar"],
    hostBindings: function CdkMenuBar_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown", function CdkMenuBar_keydown_HostBindingHandler($event) {
          return ctx._handleKeyEvent($event);
        });
      }
    },
    exportAs: ["cdkMenuBar"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkMenuGroup,
      useExisting: _CdkMenuBar
    }, {
      provide: CDK_MENU,
      useExisting: _CdkMenuBar
    }, {
      provide: MENU_STACK,
      useFactory: () => MenuStack.inline("horizontal")
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuBar, [{
    type: Directive,
    args: [{
      selector: "[cdkMenuBar]",
      exportAs: "cdkMenuBar",
      host: {
        "role": "menubar",
        "class": "cdk-menu-bar",
        "(keydown)": "_handleKeyEvent($event)"
      },
      providers: [{
        provide: CdkMenuGroup,
        useExisting: CdkMenuBar
      }, {
        provide: CDK_MENU,
        useExisting: CdkMenuBar
      }, {
        provide: MENU_STACK,
        useFactory: () => MenuStack.inline("horizontal")
      }]
    }]
  }], null, null);
})();
var CdkMenuItemSelectable = class _CdkMenuItemSelectable extends CdkMenuItem {
  /** Whether the element is checked */
  checked = false;
  /** Whether the item should close the menu if triggered by the spacebar. */
  closeOnSpacebarTrigger = false;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CdkMenuItemSelectable_BaseFactory;
    return function CdkMenuItemSelectable_Factory(__ngFactoryType__) {
      return (\u0275CdkMenuItemSelectable_BaseFactory || (\u0275CdkMenuItemSelectable_BaseFactory = \u0275\u0275getInheritedFactory(_CdkMenuItemSelectable)))(__ngFactoryType__ || _CdkMenuItemSelectable);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenuItemSelectable,
    hostVars: 2,
    hostBindings: function CdkMenuItemSelectable_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-checked", !!ctx.checked)("aria-disabled", ctx.disabled || null);
      }
    },
    inputs: {
      checked: [2, "cdkMenuItemChecked", "checked", booleanAttribute]
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuItemSelectable, [{
    type: Directive,
    args: [{
      host: {
        "[attr.aria-checked]": "!!checked",
        "[attr.aria-disabled]": "disabled || null"
      }
    }]
  }], null, {
    checked: [{
      type: Input,
      args: [{
        alias: "cdkMenuItemChecked",
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkMenuItemRadio = class _CdkMenuItemRadio extends CdkMenuItemSelectable {
  /** The unique selection dispatcher for this radio's `CdkMenuGroup`. */
  _selectionDispatcher = inject(UniqueSelectionDispatcher);
  /** An ID to identify this radio item to the `UniqueSelectionDispatcher`. */
  _id = inject(_IdGenerator).getId("cdk-menu-item-radio-");
  /** Function to unregister the selection dispatcher */
  _removeDispatcherListener;
  constructor() {
    super();
    this._registerDispatcherListener();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._removeDispatcherListener();
  }
  /**
   * Toggles the checked state of the radio-button.
   * @param options Options the configure how the item is triggered
   *   - keepOpen: specifies that the menu should be kept open after triggering the item.
   */
  trigger(options) {
    super.trigger(options);
    if (!this.disabled) {
      this._selectionDispatcher.notify(this._id, "");
    }
  }
  /** Configure the unique selection dispatcher listener in order to toggle the checked state  */
  _registerDispatcherListener() {
    this._removeDispatcherListener = this._selectionDispatcher.listen((id) => {
      this.checked = this._id === id;
    });
  }
  static \u0275fac = function CdkMenuItemRadio_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkMenuItemRadio)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenuItemRadio,
    selectors: [["", "cdkMenuItemRadio", ""]],
    hostAttrs: ["role", "menuitemradio"],
    hostVars: 2,
    hostBindings: function CdkMenuItemRadio_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("cdk-menu-item-radio", true);
      }
    },
    exportAs: ["cdkMenuItemRadio"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkMenuItemSelectable,
      useExisting: _CdkMenuItemRadio
    }, {
      provide: CdkMenuItem,
      useExisting: CdkMenuItemSelectable
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuItemRadio, [{
    type: Directive,
    args: [{
      selector: "[cdkMenuItemRadio]",
      exportAs: "cdkMenuItemRadio",
      host: {
        "role": "menuitemradio",
        "[class.cdk-menu-item-radio]": "true"
      },
      providers: [{
        provide: CdkMenuItemSelectable,
        useExisting: CdkMenuItemRadio
      }, {
        provide: CdkMenuItem,
        useExisting: CdkMenuItemSelectable
      }]
    }]
  }], () => [], null);
})();
var CdkMenuItemCheckbox = class _CdkMenuItemCheckbox extends CdkMenuItemSelectable {
  /**
   * Toggle the checked state of the checkbox.
   * @param options Options the configure how the item is triggered
   *   - keepOpen: specifies that the menu should be kept open after triggering the item.
   */
  trigger(options) {
    super.trigger(options);
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CdkMenuItemCheckbox_BaseFactory;
    return function CdkMenuItemCheckbox_Factory(__ngFactoryType__) {
      return (\u0275CdkMenuItemCheckbox_BaseFactory || (\u0275CdkMenuItemCheckbox_BaseFactory = \u0275\u0275getInheritedFactory(_CdkMenuItemCheckbox)))(__ngFactoryType__ || _CdkMenuItemCheckbox);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkMenuItemCheckbox,
    selectors: [["", "cdkMenuItemCheckbox", ""]],
    hostAttrs: ["role", "menuitemcheckbox"],
    hostVars: 2,
    hostBindings: function CdkMenuItemCheckbox_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("cdk-menu-item-checkbox", true);
      }
    },
    exportAs: ["cdkMenuItemCheckbox"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkMenuItemSelectable,
      useExisting: _CdkMenuItemCheckbox
    }, {
      provide: CdkMenuItem,
      useExisting: CdkMenuItemSelectable
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuItemCheckbox, [{
    type: Directive,
    args: [{
      selector: "[cdkMenuItemCheckbox]",
      exportAs: "cdkMenuItemCheckbox",
      host: {
        "role": "menuitemcheckbox",
        "[class.cdk-menu-item-checkbox]": "true"
      },
      providers: [{
        provide: CdkMenuItemSelectable,
        useExisting: CdkMenuItemCheckbox
      }, {
        provide: CdkMenuItem,
        useExisting: CdkMenuItemSelectable
      }]
    }]
  }], null, null);
})();
var CONTEXT_MENU_POSITIONS = STANDARD_DROPDOWN_BELOW_POSITIONS.map((position) => {
  const offsetX = position.overlayX === "start" ? 2 : -2;
  const offsetY = position.overlayY === "top" ? 2 : -2;
  return __spreadProps(__spreadValues({}, position), {
    offsetX,
    offsetY
  });
});
var ContextMenuTracker = class _ContextMenuTracker {
  /** The last open context menu trigger. */
  static _openContextMenuTrigger;
  /**
   * Close the previous open context menu and set the given one as being open.
   * @param trigger The trigger for the currently open Context Menu.
   */
  update(trigger) {
    if (_ContextMenuTracker._openContextMenuTrigger !== trigger) {
      _ContextMenuTracker._openContextMenuTrigger?.close();
      _ContextMenuTracker._openContextMenuTrigger = trigger;
    }
  }
  static \u0275fac = function ContextMenuTracker_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContextMenuTracker)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ContextMenuTracker,
    factory: _ContextMenuTracker.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContextMenuTracker, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CdkContextMenuTrigger = class _CdkContextMenuTrigger extends CdkMenuTriggerBase {
  /** The CDK overlay service. */
  _overlay = inject(Overlay);
  /** The directionality of the page. */
  _directionality = inject(Directionality, {
    optional: true
  });
  /** The app's context menu tracking registry */
  _contextMenuTracker = inject(ContextMenuTracker);
  _changeDetectorRef = inject(ChangeDetectorRef);
  /** Whether the context menu is disabled. */
  disabled = false;
  constructor() {
    super();
    this._setMenuStackCloseListener();
  }
  /**
   * Open the attached menu at the specified location.
   * @param coordinates where to open the context menu
   */
  open(coordinates) {
    this._open(null, coordinates);
    this._changeDetectorRef.markForCheck();
  }
  /** Close the currently opened context menu. */
  close() {
    this.menuStack.closeAll();
  }
  /**
   * Open the context menu and closes any previously open menus.
   * @param event the mouse event which opens the context menu.
   */
  _openOnContextMenu(event) {
    if (!this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      this._contextMenuTracker.update(this);
      this._open(event, {
        x: event.clientX,
        y: event.clientY
      });
      if (event.button === 2) {
        this.childMenu?.focusFirstItem("mouse");
      } else if (event.button === 0) {
        this.childMenu?.focusFirstItem("keyboard");
      } else {
        this.childMenu?.focusFirstItem("program");
      }
    }
  }
  /**
   * Get the configuration object used to create the overlay.
   * @param coordinates the location to place the opened menu
   */
  _getOverlayConfig(coordinates) {
    return new OverlayConfig({
      positionStrategy: this._getOverlayPositionStrategy(coordinates),
      scrollStrategy: this.menuScrollStrategy(),
      direction: this._directionality || void 0
    });
  }
  /**
   * Get the position strategy for the overlay which specifies where to place the menu.
   * @param coordinates the location to place the opened menu
   */
  _getOverlayPositionStrategy(coordinates) {
    return this._overlay.position().flexibleConnectedTo(coordinates).withLockedPosition().withGrowAfterOpen().withPositions(this.menuPosition ?? CONTEXT_MENU_POSITIONS);
  }
  /** Subscribe to the menu stack close events and close this menu when requested. */
  _setMenuStackCloseListener() {
    this.menuStack.closed.pipe(takeUntil(this.destroyed)).subscribe(({
      item
    }) => {
      if (item === this.childMenu && this.isOpen()) {
        this.closed.next();
        this.overlayRef.detach();
      }
    });
  }
  /**
   * Subscribe to the overlays outside pointer events stream and handle closing out the stack if a
   * click occurs outside the menus.
   * @param userEvent User-generated event that opened the menu.
   */
  _subscribeToOutsideClicks(userEvent) {
    if (this.overlayRef) {
      let outsideClicks = this.overlayRef.outsidePointerEvents();
      if (userEvent) {
        const [auxClicks, nonAuxClicks] = partition(outsideClicks, ({
          type
        }) => type === "auxclick");
        outsideClicks = merge(
          // Using a mouse, the `contextmenu` event can fire either when pressing the right button
          // or left button + control. Most browsers won't dispatch a `click` event right after
          // a `contextmenu` event triggered by left button + control, but Safari will (see #27832).
          // This closes the menu immediately. To work around it, we check that both the triggering
          // event and the current outside click event both had the control key pressed, and that
          // that this is the first outside click event.
          nonAuxClicks.pipe(skipWhile((event, index) => userEvent.ctrlKey && index === 0 && event.ctrlKey)),
          // If the menu was triggered by the `contextmenu` event, skip the first `auxclick` event
          // because it fires when the mouse is released on the same click that opened the menu.
          auxClicks.pipe(skip(1))
        );
      }
      outsideClicks.pipe(takeUntil(this.stopOutsideClicksListener)).subscribe((event) => {
        if (!this.isElementInsideMenuStack(_getEventTarget(event))) {
          this.menuStack.closeAll();
        }
      });
    }
  }
  /**
   * Open the attached menu at the specified location.
   * @param userEvent User-generated event that opened the menu
   * @param coordinates where to open the context menu
   */
  _open(userEvent, coordinates) {
    if (this.disabled) {
      return;
    }
    if (this.isOpen()) {
      this.menuStack.closeSubMenuOf(this.childMenu);
      this.overlayRef.getConfig().positionStrategy.setOrigin(coordinates);
      this.overlayRef.updatePosition();
    } else {
      this.opened.next();
      if (this.overlayRef) {
        this.overlayRef.getConfig().positionStrategy.setOrigin(coordinates);
        this.overlayRef.updatePosition();
      } else {
        this.overlayRef = this._overlay.create(this._getOverlayConfig(coordinates));
      }
      this.overlayRef.attach(this.getMenuContentPortal());
      this._subscribeToOutsideClicks(userEvent);
    }
  }
  static \u0275fac = function CdkContextMenuTrigger_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkContextMenuTrigger)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkContextMenuTrigger,
    selectors: [["", "cdkContextMenuTriggerFor", ""]],
    hostVars: 1,
    hostBindings: function CdkContextMenuTrigger_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("contextmenu", function CdkContextMenuTrigger_contextmenu_HostBindingHandler($event) {
          return ctx._openOnContextMenu($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("data-cdk-menu-stack-id", null);
      }
    },
    inputs: {
      menuTemplateRef: [0, "cdkContextMenuTriggerFor", "menuTemplateRef"],
      menuPosition: [0, "cdkContextMenuPosition", "menuPosition"],
      menuData: [0, "cdkContextMenuTriggerData", "menuData"],
      disabled: [2, "cdkContextMenuDisabled", "disabled", booleanAttribute]
    },
    outputs: {
      opened: "cdkContextMenuOpened",
      closed: "cdkContextMenuClosed"
    },
    exportAs: ["cdkContextMenuTriggerFor"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MENU_TRIGGER,
      useExisting: _CdkContextMenuTrigger
    }, {
      provide: MENU_STACK,
      useClass: MenuStack
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkContextMenuTrigger, [{
    type: Directive,
    args: [{
      selector: "[cdkContextMenuTriggerFor]",
      exportAs: "cdkContextMenuTriggerFor",
      host: {
        "[attr.data-cdk-menu-stack-id]": "null",
        "(contextmenu)": "_openOnContextMenu($event)"
      },
      inputs: [{
        name: "menuTemplateRef",
        alias: "cdkContextMenuTriggerFor"
      }, {
        name: "menuPosition",
        alias: "cdkContextMenuPosition"
      }, {
        name: "menuData",
        alias: "cdkContextMenuTriggerData"
      }],
      outputs: ["opened: cdkContextMenuOpened", "closed: cdkContextMenuClosed"],
      providers: [{
        provide: MENU_TRIGGER,
        useExisting: CdkContextMenuTrigger
      }, {
        provide: MENU_STACK,
        useClass: MenuStack
      }]
    }]
  }], () => [], {
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkContextMenuDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var MENU_DIRECTIVES = [CdkMenuBar, CdkMenu, CdkMenuItem, CdkMenuItemRadio, CdkMenuItemCheckbox, CdkMenuTrigger, CdkMenuGroup, CdkContextMenuTrigger, CdkTargetMenuAim];
var CdkMenuModule = class _CdkMenuModule {
  static \u0275fac = function CdkMenuModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkMenuModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CdkMenuModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [OverlayModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMenuModule, [{
    type: NgModule,
    args: [{
      imports: [OverlayModule, ...MENU_DIRECTIVES],
      exports: MENU_DIRECTIVES
    }]
  }], null, null);
})();

export {
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenu
};
//# sourceMappingURL=chunk-MP42IJA2.js.map
