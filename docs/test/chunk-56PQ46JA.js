import {
  FEATURES
} from "./chunk-TRSB2AWX.js";
import {
  UserDataService
} from "./chunk-XVTWIPJM.js";
import "./chunk-MYGBX3UV.js";
import "./chunk-HHUPO22U.js";
import "./chunk-GCGHXSHH.js";
import "./chunk-COL63V6Y.js";
import "./chunk-YDLK2X2B.js";
import "./chunk-YQQNS7T3.js";
import "./chunk-4746DPCT.js";
import {
  inject
} from "./chunk-EBVVQ6Y2.js";
import {
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/map/map.routes.ts
var mapRoutes = [
  __spreadValues({
    path: "",
    loadComponent: () => import("./chunk-DKRCXVJ4.js").then((m) => m.MapRootComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "malta"
      },
      {
        path: "",
        loadComponent: () => import("./chunk-GQ4DALME.js").then((mod) => mod.HomeComponent)
      },
      {
        path: "privacy",
        loadComponent: () => import("./chunk-3S6PCGAE.js").then((mod) => mod.PrivacyComponent)
      },
      {
        path: "cookies",
        loadComponent: () => import("./chunk-RADFPCF7.js").then((mod) => mod.CookiesComponent)
      },
      {
        path: "about",
        loadComponent: () => import("./chunk-YVMPCX72.js").then((mod) => mod.AboutComponent)
      },
      {
        path: "contact",
        loadComponent: () => import("./chunk-SGYZ4DUY.js").then((mod) => mod.ContactComponent)
      },
      {
        path: "malta",
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-SRI2MMFP.js").then((m) => m.MapShellComponent),
            children: [
              {
                path: "",
                pathMatch: "full",
                loadComponent: () => import("./chunk-7NHUAGIN.js").then((mod) => mod.MapExploreComponent)
              },
              {
                path: "list",
                loadComponent: () => import("./chunk-EXMKLPDJ.js").then((m) => m.LocationListComponent)
              },
              {
                path: "deals",
                loadComponent: () => import("./chunk-PLUTFVP2.js").then((m) => m.DealsComponent)
              },
              {
                path: "events",
                loadComponent: () => import("./chunk-QXSVS7GC.js").then((m) => m.EventsComponent)
              },
              {
                path: "providers/:id",
                loadComponent: () => import("./chunk-VJAPVDZW.js").then((m) => m.ProviderPageComponent)
              },
              {
                path: "experiences/:id",
                loadComponent: () => import("./chunk-54RIQUA3.js").then((m) => m.ExperiencePageComponent)
              },
              {
                path: "locations/:slug",
                loadComponent: () => import("./chunk-U4LTT3PC.js").then((m) => m.LocationPageComponent)
              },
              {
                path: "saved",
                loadComponent: () => import("./chunk-GVKCVCU7.js").then((m) => m.SavedPlacesComponent)
              },
              {
                path: "admin",
                canMatch: [() => inject(UserDataService).isAdmin()],
                loadComponent: () => import("./chunk-UNKJPYVA.js").then((m) => m.AdminPanelComponent)
              },
              {
                path: "groups",
                canMatch: [() => FEATURES.GROUPS],
                loadComponent: () => import("./chunk-CFKTRODE.js").then((m) => m.ExploreTogetherComponent)
              },
              {
                path: "groups/:id",
                canMatch: [() => FEATURES.GROUPS],
                loadComponent: () => import("./chunk-HRKZAOX2.js").then((m) => m.GroupDetailComponent)
              },
              {
                path: "notifications",
                loadComponent: () => import("./chunk-4JK6O5EN.js").then((m) => m.NotificationsComponent)
              }
            ]
          },
          {
            path: "30-places-2026",
            loadComponent: () => import("./chunk-O2ZB5QNK.js").then((m) => m.TopPlacesComponent)
          },
          {
            path: "leaderboard",
            loadComponent: () => import("./chunk-JOED5WPB.js").then((m) => m.LeaderboardComponent)
          },
          {
            path: "plan",
            canMatch: [() => FEATURES.ROUTE_BUILDER],
            loadComponent: () => import("./chunk-L7O53MVU.js").then((m) => m.RouteBuilderComponent)
          }
        ]
      },
      {
        path: "pay",
        loadComponent: () => import("./chunk-SWDAPEB2.js").then((m) => m.PaymentComponent)
      }
    ]
  }, false ? { \u0275entryName: "src/app/map/map-root.component.ts" } : {})
];
export {
  mapRoutes
};
//# sourceMappingURL=chunk-56PQ46JA.js.map
