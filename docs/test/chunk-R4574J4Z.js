import {
  FEATURES
} from "./chunk-TRSB2AWX.js";
import {
  UserDataService
} from "./chunk-KYRZ2KQ6.js";
import "./chunk-O2HOMRRP.js";
import "./chunk-HHUPO22U.js";
import "./chunk-GCGHXSHH.js";
import "./chunk-YNLBUE2Q.js";
import "./chunk-Q2ZTODBY.js";
import "./chunk-YQQNS7T3.js";
import "./chunk-5PW2HKAJ.js";
import {
  inject
} from "./chunk-2FJZNSO2.js";
import {
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/map/map.routes.ts
var mapRoutes = [
  __spreadValues({
    path: "",
    loadComponent: () => import("./chunk-D6YPOQJE.js").then((m) => m.MapRootComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "malta"
      },
      {
        path: "",
        loadComponent: () => import("./chunk-LA6VFF2Y.js").then((mod) => mod.HomeComponent)
      },
      {
        path: "privacy",
        loadComponent: () => import("./chunk-4JZIFT3H.js").then((mod) => mod.PrivacyComponent)
      },
      {
        path: "cookies",
        loadComponent: () => import("./chunk-FAIFYETN.js").then((mod) => mod.CookiesComponent)
      },
      {
        path: "about",
        loadComponent: () => import("./chunk-2YOCLM3C.js").then((mod) => mod.AboutComponent)
      },
      {
        path: "contact",
        loadComponent: () => import("./chunk-4ZGOLLSV.js").then((mod) => mod.ContactComponent)
      },
      {
        path: "malta",
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-I53CTSUH.js").then((m) => m.MapShellComponent),
            children: [
              {
                path: "",
                pathMatch: "full",
                loadComponent: () => import("./chunk-DGTL2W3Y.js").then((mod) => mod.MapExploreComponent)
              },
              {
                path: "list",
                loadComponent: () => import("./chunk-4KMHIVTN.js").then((m) => m.LocationListComponent)
              },
              {
                path: "deals",
                loadComponent: () => import("./chunk-GU4KYHNT.js").then((m) => m.DealsComponent)
              },
              {
                path: "events",
                loadComponent: () => import("./chunk-MKQA2BKJ.js").then((m) => m.EventsComponent)
              },
              {
                path: "providers/:id",
                loadComponent: () => import("./chunk-I37ZH3AV.js").then((m) => m.ProviderPageComponent)
              },
              {
                path: "experiences/:id",
                loadComponent: () => import("./chunk-HF54SIZQ.js").then((m) => m.ExperiencePageComponent)
              },
              {
                path: "locations/:slug",
                loadComponent: () => import("./chunk-MPTHHGME.js").then((m) => m.LocationPageComponent)
              },
              {
                path: "saved",
                loadComponent: () => import("./chunk-ZYWHTLAZ.js").then((m) => m.SavedPlacesComponent)
              },
              {
                path: "admin",
                canMatch: [() => inject(UserDataService).isAdmin()],
                loadComponent: () => import("./chunk-LGGMJYHL.js").then((m) => m.AdminPanelComponent)
              },
              {
                path: "groups",
                canMatch: [() => FEATURES.GROUPS],
                loadComponent: () => import("./chunk-5ECZ4RRO.js").then((m) => m.ExploreTogetherComponent)
              },
              {
                path: "groups/:id",
                canMatch: [() => FEATURES.GROUPS],
                loadComponent: () => import("./chunk-QDAX6ERN.js").then((m) => m.GroupDetailComponent)
              },
              {
                path: "notifications",
                loadComponent: () => import("./chunk-QE7Q54BJ.js").then((m) => m.NotificationsComponent)
              }
            ]
          },
          {
            path: "30-places-2026",
            loadComponent: () => import("./chunk-B46QZE4N.js").then((m) => m.TopPlacesComponent)
          },
          {
            path: "leaderboard",
            loadComponent: () => import("./chunk-REWDMQZE.js").then((m) => m.LeaderboardComponent)
          },
          {
            path: "plan",
            canMatch: [() => FEATURES.ROUTE_BUILDER],
            loadComponent: () => import("./chunk-TN6I46B2.js").then((m) => m.RouteBuilderComponent)
          }
        ]
      },
      {
        path: "pay",
        loadComponent: () => import("./chunk-XPFT55ES.js").then((m) => m.PaymentComponent)
      }
    ]
  }, false ? { \u0275entryName: "src/app/map/map-root.component.ts" } : {})
];
export {
  mapRoutes
};
//# sourceMappingURL=chunk-R4574J4Z.js.map
