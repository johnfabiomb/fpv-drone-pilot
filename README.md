# Explore Malta — Interactive Map

An Angular 19 web app for discovering hidden gems, sea caves, hiking trails, and scenic spots across Malta, Gozo, and Comino — with group hikes, exclusive deals, and user-curated lists.

**Live site:** https://johnfabiomb.com

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Angular 19 (standalone components, signals) |
| Map | OpenLayers — cluster layer + individual photo pins |
| Backend / Auth | Supabase — PostgreSQL + Realtime channels + Google OAuth + Magic Link OTP |
| Hosting | GitHub Pages — static files from `docs/` |
| Rendering | Static prerendering (SSG) at build time via `prerender-routes.txt` |
| Routing | PathLocationStrategy (clean URLs: `/malta`, `/malta/list`, …) |
| Payments | Stripe Buy Button embed |
| Ads | Google AdSense (Auto Ads + manual `AdUnitComponent`) |
| Consent | Google Funding Choices — IAB TCF-certified GDPR banner |
| SEO | Per-route meta tags + JSON-LD via `SeoService` |

---

## Running locally

```bash
npm start
```

Starts the Angular dev server at `http://localhost:4200` with hot reload. No prerendering — plain SPA, fine for building features.

### Preview the real prerendered output

```bash
npm run preview
```

Full production build (with prerendering) then serves `docs/` at `http://localhost:4200`. Use this to verify what GitHub Pages will actually serve before pushing. Takes ~30–60 seconds.

---

## Build configs

| Config | Command | Output | Base href | Notes |
|---|---|---|---|---|
| **staging** | `ng build` | `docs/test/` | `/test/` | No optimisation, source maps on, staging feature flags, `[STAGING]` title prefix, `noindex` |
| **production** | `ng build --configuration production` | `docs/` | `/` | Full optimisation, production feature flags |

Both configs use `prerender-routes.txt` with `discoverRoutes: false` — every public route must be added there explicitly.

---

## Deploying

See `documentation/DEPLOYMENT.md` for the full deploy workflow.

**Staging** (`/test/`) — build and push `docs/test/` from the feature branch without touching production.

**Production** (`/`):
```bash
ng build --configuration production
```
Commit the `docs/` changes and push to `main`. GitHub Pages serves directly from `docs/`.

---

## Route structure

```
/                           → redirects to /malta
/malta                      → Interactive map (MapShellComponent — persistent OL map)
/malta/list                 → Browse all locations
/malta/deals                → Exclusive deals map
/malta/providers/:id        → Provider detail page
/malta/locations/:slug      → Individual location detail (prerendered for all 74 locations)
/malta/saved                → Saved places
/malta/groups               → Explore Together — group hikes list + create form (GROUPS flag)
/malta/groups/:id           → Group detail + member list + live chat (GROUPS flag)
/malta/admin                → Admin panel (canMatch: isAdmin())
/malta/30-places-2026       → "30 Places to Visit in Malta" editorial list
/malta/plan                 → Route builder (ROUTE_BUILDER flag — off everywhere)
/pay                        → Payment page (Stripe)
/pay/success                → Payment confirmation
/about, /contact, /privacy, /cookies  → Static pages
```

---

## Source structure

```
src/app/
  core/           ← models, services, utils, config (alias: @core/*)
  features/       ← domain feature slices (alias: @features/*)
  layout/         ← full-viewport overlays and app-level chrome (alias: @layout/*)
  pages/          ← standalone full-page route components (alias: @pages/*)
  ui/             ← reusable UI primitives (alias: @ui/*)
  components/
    map/          ← OpenLayers map component
```

### Path aliases (tsconfig.json)

| Alias | Resolves to |
|---|---|
| `@core/*` | `src/app/core/*` |
| `@features/*` | `src/app/features/*` |
| `@layout/*` | `src/app/layout/*` |
| `@pages/*` | `src/app/pages/*` |
| `@ui/*` | `src/app/ui/*` |
| `@assets/*` | `src/assets/*` |

---

## Architecture — map shell + bridge

`/malta` and its panel sub-routes share a **single persistent map** via `MapShellComponent`. The shell owns one `<app-map>` instance and a `<router-outlet>` whose child is swapped without ever destroying the map.

```
src/app/features/map/shell/   (MapShellComponent)
  ├── <app-map>                ← src/app/components/map/ — single OL instance, never destroyed
  └── <router-outlet>
        ├── MapExploreComponent        src/app/features/map/explore/
        ├── LocationListComponent      src/app/features/map/list/
        ├── DealsComponent             src/app/features/map/deals/
        ├── ProviderPageComponent      src/app/features/providers/provider-page/
        ├── LocationPageComponent      src/app/features/locations/location-page/
        ├── SavedPlacesComponent       src/app/features/saved-places/
        ├── ExploreTogetherComponent   src/app/features/groups/groups-list/
        ├── GroupDetailComponent       src/app/features/groups/group-detail/
        └── AdminPanelComponent        src/app/pages/admin/

  Non-map siblings (NOT inside the shell):
        TopPlacesComponent             src/app/pages/top-places/
        RouteBuilderComponent          src/app/features/route-builder/
```

Child components communicate with the shell map through **`MapBridgeService`** (`src/app/core/services/map-bridge.service.ts`) — scoped to the shell. The bridge carries map config signals (`filters`, `providerPins`, `selectedLocation`, `showFilterBar`, `panelOpen`) and event subjects (`locationSelected$`, `providerPinSelected$`, `gpsCoord$`). Every child configures the bridge in `ngOnInit`.

---

## Feature flags

Flags live in `src/app/feature-flags.ts` and are swapped at build time via `fileReplacements` in `angular.json`.

| Flag | dev | staging | production |
|---|---|---|---|
| `FEATURES.PROMOTIONS` | `true` | `true` | `false` → flip when ready |
| `FEATURES.ROUTE_BUILDER` | `false` | `false` | `false` |
| `FEATURES.GROUPS` | `true` | `true` | `true` (teaser visible; per-user Supabase field controls real access) |

**Per-user groups access:** `FEATURES.GROUPS = true` shows a locked teaser to everyone. `users.feature_access_groups = true` in Supabase grants real access to a specific user — activated by an admin via the Users tab at `/malta/admin`.

---

## Auth

Supabase handles all authentication:
- **Google OAuth** — redirect flow
- **Magic Link OTP** — email-based passwordless login

Auth state is exposed as Angular signals via `AuthService` (`src/app/core/services/auth.service.ts`). `UserDataService` wraps the Supabase user record and exposes `isAdmin()`, `groupsUnlocked()`, and level/XP signals.

In-app browser detection (`InAppBrowserService`) routes Instagram/Facebook users to Chrome on Android, or forces the email OTP flow on iOS.

---

## XP & Level system

Users earn XP from app interactions (location views, saves, group joins, daily login, session heartbeat, referrals). XP is tracked by the `xp_events` table; the `award_xp` Supabase RPC handles deduplication and level-up detection atomically. Levels 1–7 are defined in `src/app/core/utils/level.utils.ts`.

`InteractionTrackingService` (`src/app/core/services/interaction-tracking.service.ts`) tracks per-entity interaction counts (views, saves, shares, book-now clicks, coupon copies) in the `user_interaction_stats` table.

---

## Groups feature

Explore Together (`/malta/groups`) lets users create and join group hikes. Each group has:
- Real-time member list and live group chat (Supabase Realtime channels)
- Message pinning, cooldown, and spam-mute
- Meeting point and spot selection tied to map locations
- Group status lifecycle: `open → exploring → completed → archived` / `cancelled`
- Admin controls: mute members, cancel group
- Message reporting — flag icon on any message; admin reviews reports at `/malta/admin` → Reports tab

All group data lives in Supabase (`groups`, `group_members`, `group_messages`, `reports` tables). Real-time updates use Supabase Realtime channels via `GroupsService` (`src/app/core/services/groups.service.ts`).

---

## Map clustering

Controlled by `CLUSTER_ZOOM = 12` in `map.component.ts`:
- **Below zoom 12** → locality cluster bubbles (Malta North, Gozo, Comino, etc.)
- **At or above zoom 12** → individual photo pins
- Clicking a cluster zooms to that region's extent, capped at `maxZoom: 14`

---

## Prerendering

Routes are listed explicitly in **`prerender-routes.txt`** (project root). Angular prerenders each one to a static HTML file at build time.

**Rule: every new public route must be added to `prerender-routes.txt`.**

Exceptions:
- Feature-flagged routes — omit until the flag is enabled in production
- Routes that must not be indexed (add `noindex` via `SeoService` instead)

---

## 404 handling

`src/404.html` is served by GitHub Pages for unknown paths. It redirects to `/?redirect=<encoded-path>` and `AppComponent` navigates to the correct route on boot. Legacy hash URLs (`/#/malta`, `/#/list`, etc.) are also handled.

---

## Key files

| File | Purpose |
|---|---|
| `src/app/app.routes.ts` | All route definitions |
| `src/app/feature-flags.ts` | Feature flags for `ng serve` (swapped at build time) |
| `src/environments/feature-flags.production.ts` | Production flag values |
| `src/environments/feature-flags.staging.ts` | Staging flag values |
| `prerender-routes.txt` | Routes Angular prerenders at build time |
| `src/sitemap.xml` | Manually maintained XML sitemap |
| `src/styles.scss` | Global design tokens + shared classes |
| `src/assets/locations.json` | All 74 location records |
| `src/assets/providers.json` | All provider / deal records |
| `supabase/schema.sql` | Full PostgreSQL schema — tables, RLS, triggers, RPCs |
| `src/app/core/models/enums.ts` | Shared typed enum constants — `Difficulty`, `Island`, `MapPointType`, `GroupStatus`, `GroupRole`, `UserRole` |
| `src/app/core/models/` | All domain types — `Location`, `Provider`, `Group`, `GroupMessage`, `User`, etc. |
| `src/app/core/services/map-bridge.service.ts` | Scoped bridge between shell map and panel children |
| `src/app/core/services/groups.service.ts` | All Supabase group operations + realtime channels |
| `src/app/core/services/auth.service.ts` | Supabase auth — Google OAuth + magic link |
| `src/app/core/services/user-data.service.ts` | User record, XP/level signals, `isAdmin()`, `groupsUnlocked()` |
| `src/app/core/services/seo.service.ts` | Per-route meta tags + JSON-LD |
| `src/app/core/services/analytics.service.ts` | gtag `pageView()` + `event()` wrappers |
| `src/app/core/services/interaction-tracking.service.ts` | Per-entity interaction stats via `track_interaction` RPC |
| `src/app/core/services/navigation.service.ts` | Back-button and panel navigation helpers |
| `src/app/core/services/route-builder.service.ts` | Itinerary plan generation |
| `src/app/core/utils/panel-resize.util.ts` | Drag-to-resize + minimize/expand logic for panels |
| `src/app/core/utils/location-filter.util.ts` | `matchesFilter()`, `getIslandLabel()`, `difficultyColor()` |
| `src/app/core/utils/level.utils.ts` | Level thresholds and XP computation |
| `src/app/core/utils/provider.utils.ts` | `resolveProviderColor()`, `getProviderCategoryLabel()` |
| `src/app/core/utils/route-drawing.ts` | Builds OpenLayers features from `mapPoints[]` |
| `src/app/core/utils/location-tracker.ts` | GPS dot + heading cone on the map |
| `src/app/core/config/supabase.config.ts` | Supabase client singleton (staging; swapped for production) |
| `src/app/features/map/shell/` | Persistent shell owning the OL map instance |
| `src/app/features/map/explore/` | Main map page |
| `src/app/features/map/list/` | Browse all locations page |
| `src/app/features/map/deals/` | Exclusive deals map page |
| `src/app/features/map/filter-bar/` | Floating filter chip bar |
| `src/app/features/locations/location-page/` | Location detail route — SEO, back navigation |
| `src/app/features/locations/location-detail/` | Location detail panel content |
| `src/app/features/providers/provider-page/` | Provider detail route |
| `src/app/features/providers/provider-detail/` | Provider detail panel content |
| `src/app/features/groups/groups-list/` | Explore Together list + create form |
| `src/app/features/groups/group-detail/` | Group detail + member list + live chat |
| `src/app/features/groups/group-card/` | Group card for list view |
| `src/app/features/groups/member-avatars/` | Overlapping avatar bubbles with `+N` overflow |
| `src/app/features/route-builder/` | Route builder (feature-flagged) |
| `src/app/features/saved-places/` | Saved locations panel |
| `src/app/pages/top-places/` | "30 Places to Visit in Malta" editorial |
| `src/app/pages/admin/` | Admin panel — Groups migration, user activation, message reports |
| `src/app/layout/footer/` | App footer + nav bar |
| `src/app/layout/auth-modal/` | Sign-in overlay |
| `src/app/layout/welcome-popup/` | First-visit guest welcome modal |
| `src/app/layout/levels-modal/` | XP levels overview modal |
| `src/app/layout/nav-interstitial/` | Google Maps / Book Now countdown interstitial |
| `src/app/ui/panel-shell/` | Reusable panel wrapper (header, drag handle, scrollable body) |
| `src/app/ui/share-button/` | Copy-to-clipboard share button with `(shared)` output |
| `src/app/ui/sign-in-form/` | Shared sign-in form (used by auth modal + welcome popup) |
| `src/app/ui/user-avatar/` | User avatar with level border animation |
| `src/app/components/map/` | OpenLayers map component |
| `documentation/ADDING_LOCATIONS.md` | Step-by-step guide for adding new map locations |
| `documentation/DEPLOYMENT.md` | Full build and deploy reference |

---

## Adding new locations

See `documentation/ADDING_LOCATIONS.md` for the full workflow including image conversion, thumbnail generation, SEO fields, and prerender route registration.
