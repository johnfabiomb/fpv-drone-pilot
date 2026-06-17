import {
  CommonModule,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-YX7TN7IZ.js";

// src/app/map/core/utils/geo.utils.ts
var EARTH_RADIUS_KM = 6371;
function haversineRad(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function haversineKm(lat1, lon1, lat2, lon2) {
  return EARTH_RADIUS_KM * haversineRad(lat1, lon1, lat2, lon2);
}
function haversineM(lat1, lon1, lat2, lon2) {
  return EARTH_RADIUS_KM * 1e3 * haversineRad(lat1, lon1, lat2, lon2);
}

// src/app/map/core/utils/provider.utils.ts
var NEAR_LOCATION_KM = 8;
function getProvidersNearLocation(location, all) {
  return all.filter((p) => p.nearLocationIds?.includes(location.id) || p.lat && p.lon && haversineKm(location.lat, location.lon, p.lat, p.lon) <= NEAR_LOCATION_KM).sort((a, b) => {
    const da = a.lat && a.lon ? haversineKm(location.lat, location.lon, a.lat, a.lon) : Infinity;
    const db = b.lat && b.lon ? haversineKm(location.lat, location.lon, b.lat, b.lon) : Infinity;
    return da - db;
  });
}
function isDiscountValid(discount) {
  if (!discount.validUntil)
    return true;
  return /* @__PURE__ */ new Date() <= /* @__PURE__ */ new Date(discount.validUntil + "T23:59:59");
}
function buildBookingUrl(provider) {
  const cfg = provider.bookingConfig;
  if (!cfg)
    return provider.website ?? null;
  const checkIn = /* @__PURE__ */ new Date();
  checkIn.setDate(checkIn.getDate() + cfg.checkInOffsetDays);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + cfg.nights);
  const fmt = (d) => d.toISOString().split("T")[0];
  const params = new URLSearchParams({
    checkInDate: fmt(checkIn),
    checkOutDate: fmt(checkOut)
  });
  if (provider.discount?.coupon)
    params.set("promocode", provider.discount.coupon);
  return `${cfg.baseUrl}?${params}`;
}
var CATEGORY_COLORS = {
  "water-sports": "#0ea5e9",
  "tour": "#8b5cf6",
  "hotel": "#f59e0b",
  "restaurant": "#ef4444",
  "experience": "#10b981",
  "tours": "#F4A300"
};
var CATEGORY_LABELS = {
  "water-sports": "Water Sports",
  "tour": "Boat Tour",
  "hotel": "Hotel",
  "restaurant": "Restaurant",
  "experience": "Experience",
  "tours": "Tours"
};
function getProviderAccentColor(category) {
  return CATEGORY_COLORS[category] ?? "#F4A922";
}
function resolveProviderColor(provider) {
  return provider?.color ?? getProviderAccentColor(provider?.category);
}
function getProviderCategoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category;
}
function getClosestProviders(location, all, count) {
  return [...all].sort((a, b) => {
    const da = a.lat && a.lon ? haversineKm(location.lat, location.lon, a.lat, a.lon) : Infinity;
    const db = b.lat && b.lon ? haversineKm(location.lat, location.lon, b.lat, b.lon) : Infinity;
    return da - db;
  }).slice(0, count);
}

// src/app/map/features/providers/provider-avatar/provider-avatar.component.ts
function ProviderAvatarComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "img", 3);
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("border-color", (tmp_2_0 = ctx_r0.provider.pinBorderColor) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "#fff");
    \u0275\u0275property("src", ctx_r0.provider.coverImage, \u0275\u0275sanitizeUrl)("alt", ctx_r0.provider.name);
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r0.badgeSize, "px")("height", ctx_r0.badgeSize, "px")("font-size", ctx_r0.badgeFont, "px");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.provider.emoji, " ");
  }
}
function ProviderAvatarComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("font-size", ctx_r0.emojiFont, "px");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.provider.emoji);
  }
}
var ProviderAvatarComponent = class _ProviderAvatarComponent {
  constructor() {
    this.size = 68;
  }
  get accentColor() {
    return resolveProviderColor(this.provider);
  }
  get badgeSize() {
    return Math.round(this.size * 0.38);
  }
  get badgeFont() {
    return Math.round(this.size * 0.22);
  }
  get emojiFont() {
    return Math.round(this.size * 0.6);
  }
  static {
    this.\u0275fac = function ProviderAvatarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProviderAvatarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProviderAvatarComponent, selectors: [["app-provider-avatar"]], inputs: { provider: "provider", size: "size" }, decls: 4, vars: 6, consts: [["emojiOnly", ""], [1, "avatar"], [4, "ngIf", "ngIfElse"], [1, "avatar__img", 3, "src", "alt"], [1, "avatar__badge"], [1, "avatar__emoji"]], template: function ProviderAvatarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275template(1, ProviderAvatarComponent_ng_container_1_Template, 4, 11, "ng-container", 2)(2, ProviderAvatarComponent_ng_template_2_Template, 2, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const emojiOnly_r2 = \u0275\u0275reference(3);
        \u0275\u0275styleProp("width", ctx.size, "px")("height", ctx.size, "px");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.provider.coverImage)("ngIfElse", emojiOnly_r2);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n[_nghost-%COMP%] {\n  display: contents;\n}\n.avatar[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n}\n.avatar__img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2.5px solid;\n  display: block;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);\n}\n.avatar__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -3px;\n  right: -3px;\n  background: var(--color-bg);\n  border-radius: 50%;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n}\n.avatar__emoji[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  line-height: 1;\n}\n/*# sourceMappingURL=provider-avatar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProviderAvatarComponent, { className: "ProviderAvatarComponent", filePath: "src/app/map/features/providers/provider-avatar/provider-avatar.component.ts", lineNumber: 67 });
})();

export {
  haversineKm,
  haversineM,
  getProvidersNearLocation,
  isDiscountValid,
  buildBookingUrl,
  resolveProviderColor,
  getProviderCategoryLabel,
  getClosestProviders,
  ProviderAvatarComponent
};
//# sourceMappingURL=chunk-UMCJSMWF.js.map
