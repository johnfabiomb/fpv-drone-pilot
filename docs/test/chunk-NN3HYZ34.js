import {
  FEATURES
} from "./chunk-TRSB2AWX.js";
import {
  UserDataService
} from "./chunk-BMUH7F5Q.js";
import "./chunk-HHUPO22U.js";
import "./chunk-A3YPDJEV.js";
import "./chunk-KHB26QZQ.js";
import "./chunk-JQO4RH2X.js";
import "./chunk-IIDAMI5Y.js";
import "./chunk-XS6RPKEZ.js";
import {
  inject
} from "./chunk-W3IDOWRJ.js";
import {
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/map/map.routes.ts
var mapRoutes = [
  __spreadValues({
    path: "",
    loadComponent: () => import("./chunk-P573MDGC.js").then((m) => m.MapRootComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "malta"
      },
      {
        path: "",
        loadComponent: () => import("./chunk-W73MEJUA.js").then((mod) => mod.HomeComponent)
      },
      {
        path: "privacy",
        loadComponent: () => import("./chunk-346JRASO.js").then((mod) => mod.PrivacyComponent)
      },
      {
        path: "cookies",
        loadComponent: () => import("./chunk-WEMNTFUA.js").then((mod) => mod.CookiesComponent)
      },
      {
        path: "about",
        loadComponent: () => import("./chunk-UATSV4YF.js").then((mod) => mod.AboutComponent)
      },
      {
        path: "contact",
        loadComponent: () => import("./chunk-YW2EPLM5.js").then((mod) => mod.ContactComponent)
      },
      {
        path: "malta",
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-6PYAES7D.js").then((m) => m.MapShellComponent),
            children: [
              {
                path: "",
                pathMatch: "full",
                loadComponent: () => import("./chunk-V7XQY6D6.js").then((mod) => mod.MapExploreComponent)
              },
              {
                path: "list",
                loadComponent: () => import("./chunk-JZ336QH2.js").then((m) => m.LocationListComponent)
              },
              {
                path: "deals",
                loadComponent: () => import("./chunk-2VPN6AIT.js").then((m) => m.DealsComponent)
              },
              {
                path: "providers/:id",
                loadComponent: () => import("./chunk-YYUBD645.js").then((m) => m.ProviderPageComponent)
              },
              {
                path: "locations/:slug",
                loadComponent: () => import("./chunk-LZEY72XV.js").then((m) => m.LocationPageComponent)
              },
              {
                path: "saved",
                loadComponent: () => import("./chunk-FX2KOCEY.js").then((m) => m.SavedPlacesComponent)
              },
              {
                path: "admin",
                canMatch: [() => inject(UserDataService).isAdmin()],
                loadComponent: () => import("./chunk-TYZN7EA4.js").then((m) => m.AdminPanelComponent)
              },
              {
                path: "groups",
                canMatch: [() => FEATURES.GROUPS],
                loadComponent: () => import("./chunk-H7TPFGXH.js").then((m) => m.ExploreTogetherComponent)
              },
              {
                path: "groups/:id",
                canMatch: [() => FEATURES.GROUPS],
                loadComponent: () => import("./chunk-JAO2RCX3.js").then((m) => m.GroupDetailComponent)
              },
              {
                path: "notifications",
                loadComponent: () => import("./chunk-QKCZR3NF.js").then((m) => m.NotificationsComponent)
              }
            ]
          },
          {
            path: "30-places-2026",
            loadComponent: () => import("./chunk-SDOCOSPM.js").then((m) => m.TopPlacesComponent)
          },
          {
            path: "leaderboard",
            loadComponent: () => import("./chunk-FOJQ5QLE.js").then((m) => m.LeaderboardComponent)
          },
          {
            path: "plan",
            canMatch: [() => FEATURES.ROUTE_BUILDER],
            loadComponent: () => import("./chunk-Q2URSSXZ.js").then((m) => m.RouteBuilderComponent)
          }
        ]
      },
      {
        path: "pay",
        loadComponent: () => import("./chunk-V37M3MT6.js").then((m) => m.PaymentComponent)
      }
    ]
  }, false ? { \u0275entryName: "src/app/map/map-root.component.ts" } : {})
];
export {
  mapRoutes
};
//# sourceMappingURL=chunk-NN3HYZ34.js.map
