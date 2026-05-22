# Project Guide — Venture Map (Malta)

Angular 19 standalone-component app. No new Angular Modules. Routing via `app.routes.ts`.

---

## CLAUDE.md Is a Living Document

**This file must stay in sync with the codebase at all times.**

After completing any task, if the work introduced or removed something significant, update this file immediately — before reporting the task as done. Do not wait to be asked.

**Update this file when:**
- A new page or route is added or removed
- A new shared component, service, utility, or pattern is introduced
- A feature flag is added, changed, or removed
- A key architectural decision is made (e.g. a new data flow, a new third-party integration)
- A convention documented here changes in practice
- Anything listed in Key Files is added, renamed, or deleted

**What counts as significant:** if a future Claude session working on this project would be confused or would make a wrong decision without knowing about it — it belongs here.

**What does not belong here:** implementation details, code snippets that duplicate what the code already says, or anything derivable by reading the source files.

---

## Design System

All shared tokens and reusable classes live in **`src/styles.scss`** — never duplicate them in a component.

### CSS Custom Properties (defined in `body {}`)

```
--color-primary        #F4A922   (brand orange/gold)
--color-primary-hover  #e09a1a
--color-primary-shadow rgba(244, 169, 34, 0.3)
--color-text-base      #111827
--color-text-secondary #374151
--color-text-muted     #6b7280
--color-text-light     #9ca3af
--color-border         #e5e7eb
--color-bg             #fff
--color-bg-light       #f9fafb
--color-bg-muted       #f3f4f6
--color-bg-hover       #eaecef
--radius-sm            6px
--radius-md            8px
--radius-lg            10px
--radius-xl            12px
--shadow-sm            0 1px 5px rgba(0,0,0,0.25)
--shadow-md            0 2px 14px rgba(0,0,0,0.14)
--shadow-panel         0 -4px 24px rgba(0,0,0,0.12)
--transition           0.15s
```

Always use these vars in component SCSS. Never hardcode `#F4A922`, `#e5e7eb`, etc.

### Global Classes (already in `styles.scss`)

**Map page layout** — use for any page that has a map + side panel:
```html
<div class="map-layout">           <!-- 100dvh flex column -->
  <div class="map-layout__main">  <!-- flex row (desktop) / column (mobile) -->
    <div class="map-layout__map"> <!-- fills remaining space -->
      <app-map ...></app-map>
    </div>
    <div class="map-layout__panel" #panelWrap ...> <!-- 380px desktop / 62vh mobile bottom sheet -->
      <button class="collapse-btn" ...>  <!-- desktop-only left-edge arrow -->
      <app-panel-shell ...>
    </div>
  </div>
  <app-footer></app-footer>
</div>
```

Mobile behaviour is automatic: panel stacks below map at 62vh with `margin-top: -20px` overlap and `border-radius: 14px 14px 0 0`. JS drag-to-resize and `applyPanelHeight()` handle the rest.

**Shared map buttons:**
```html
<!-- Re-open panel after it's been hidden -->
<button class="show-panel-btn" *ngIf="mapOnly" (click)="mapOnly = false">
  <i class="fa fa-list"></i>
</button>

<!-- Floating pill back button over map -->
<button class="floating-back-btn" (click)="goBack()">
  <i class="fa fa-chevron-left"></i> Back to map
</button>

<!-- Accent variant (brand color background) -->
<button class="floating-back-btn floating-back-btn--accent" ...>
```

**Badges:**
```html
<span class="badge badge--island">Gozo</span>
<span class="badge badge--hidden">hidden gem</span>
<span class="badge badge--easy">easy</span>
<span class="badge badge--medium">medium</span>
<span class="badge badge--hard">hard</span>
<!-- Dynamic background (e.g. from difficultyColor()): -->
<span class="badge" [style.background]="difficultyColor(item.difficulty)">{{ item.difficulty }}</span>
```

**Filter chips:**
```html
<div class="chip" [class.active]="isActive" (click)="toggle()">Label</div>
```
The `.chip` base is global. `filter-bar.component.scss` overrides sizing for the floating filter bar — that's the only valid override.

---

## Page Layout Patterns

### Map + Panel page (map-explore, coupons, location-list)

These three routes share a **persistent map** via `MapShellComponent`. The shell owns the single `<app-map>` instance and a `<router-outlet>` whose child component is swapped without reloading the map.

**Architecture:**
```
MapShellComponent  (path: '' under /malta)
  ├── <app-map>         ← single persistent instance, never destroyed on sub-nav
  └── <router-outlet>
        ├── MapExploreComponent  (path: '', pathMatch: full)
        ├── LocationListComponent (path: 'list')
        └── DealsComponent       (path: 'deals')
```

Non-map routes (`/malta/30-places-2026`, `/malta/plan`) are direct siblings of the shell — **not** children.

**Communication via `MapBridgeService`** (`src/app/shared/services/map-bridge.service.ts`):
- Provided in `MapShellComponent` (scoped, not root)
- Child components inject the bridge to configure map inputs (`filters`, `providerPins`, `selectedLocation`) and UI state (`showFilterBar`, `panelOpen`, `mapOnly`, `floatingBackBtn`)
- Map events flow to children via Subjects: `locationSelected$`, `providerPinSelected$`, `gpsCoord$`
- Children emit via: `floatingBackBtnClicked$`, `scrollToTop$`, `interstitialProviderSelected$`
- `bridge.panel` is the shared `PanelResize` instance — all three children call `bridge.panel.expand()`, `bridge.panel.minimize()`, `bridge.panel.onDragStart/Move/End()`

**Panel visibility** — critical design:
- The shell's panel `<div>` is **always in the DOM** (never `*ngIf`)
- Hidden via `[class.panel--hidden]` (`display: none`) so the router-outlet and child components stay alive and can subscribe to bridge events
- `bridge.panelOpen.set(true/false)` controls this class

**Each child configures the bridge in `ngOnInit`:**
```typescript
// Example (map-explore)
this.bridge.showFilterBar.set(true);
this.bridge.panelOpen.set(false);  // no location selected initially
this.bridge.floatingBackBtn.set(null);

// Then subscribe to bridge events:
this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe(loc => this.onLocationSelected(loc));
```

**Panel drag bindings** (in child templates, bound to `bridge.panel`):
```html
[minimized]="bridge.panel.minimized()"
(dragStart)="bridge.panel.onDragStart($event)"
(dragMove)="bridge.panel.onDragMove($event)"
(dragEnd)="bridge.panel.onDragEnd($event)"
(toggleCollapse)="bridge.toggleMinimize()"
```

**Panel close navigation:**
- Always route-navigate on close (not just `mapOnly = true`) so the browser back button works
- Within a page, sub-panels (e.g. provider detail inside deals) can clear state without navigating

**Panel close button on mobile:**
- The `×` close button is visible on all panels by default (no need for `showCloseOnMobile`)
- This is standard — do not hide it on mobile in panel-shell.component.scss

### Full-screen (non-map) pages
Pages like `top-places`, `home`, `privacy` use their own root class and don't use `.map-layout`.

---

## Component File Structure

**Prefer a single `.ts` file** (inline `template` and `styles`) for small, self-contained components — when the template fits in ~50 lines and the styles in ~80 lines. The `pwa-prompt` and `share-button` components are the reference pattern.

Use separate `templateUrl` / `styleUrl` files only when the component is large enough that a single file becomes unwieldy to navigate.

---

## Component SCSS Rules

- **Global** (`styles.scss`): layout, shared buttons, badges, chips, design tokens
- **Component** (`*.component.scss`): only what is unique to that component

If you find yourself writing the same CSS in two components, it belongs in `styles.scss`.

Component SCSS should use `var(--color-primary)` etc. — no hardcoded hex for anything covered by the token list above.

---

## SEO, Prerendering & Analytics

### Build configurations

| Config | Command | Output | Base href | Notes |
|---|---|---|---|---|
| **staging** | `ng build` (default) | `docs/test/` | `/test/` | No optimization, source maps on, uses `feature-flags.staging.ts` and `index.staging.html` |
| **production** | `ng build --configuration production` | `docs/` | `/` | Full optimization, uses `feature-flags.production.ts` |

Both configs use the same `prerender-routes.txt` and `discoverRoutes: false`.

> **SSR vs prerendering:** `ssr: false` is set in both configs — the app does **not** run a Node server at request time. Prerendering generates static HTML files at build time only. Angular 17+ requires a `server.ts` entry point for the prerender builder even with `ssr: false`; that file exists but is never served in production.

---

### Prerendering

Routes are prerendered via **`prerender-routes.txt`** (project root). Every route listed there gets a static HTML file at build time, which Google indexes instantly.

**Current prerendered routes:**
```
/                                 (home)
/malta                            (map explore)
/malta/list                       (location list)
/malta/deals                      (deals)
/malta/30-places-2026             (top places editorial)
/malta/providers/santa-maria-watersports
/malta/locations/:slug            (all 64 location detail pages — see prerender-routes.txt)
/pay, /privacy, /cookies, /about, /contact, /pay/success
```

**Rule: every new public route must be added to `prerender-routes.txt`.**

The only exceptions are:
- Feature-flagged routes (e.g. `/malta/plan` uses `canMatch: [() => FEATURES.ROUTE_BUILDER]`) — omit until the flag is on in production
- Routes that should not be indexed (add `noindex` in SEO service instead, but still consider prerendering for performance)

Location detail pages use clean `/malta/locations/:slug` URLs and **are prerendered**. Each location has an explicit `slug` field in `locations.json` — do not compute slugs from titles at runtime.

---

### SEO checklist — adding a new page

When adding a new public route, do **all four** of these:

1. **`prerender-routes.txt`** — add the route path (e.g. `/malta/new-page`)
2. **`src/app/shared/services/seo.service.ts`** — add a new key to `setPage()` with `title`, `desc`, `url`. Add `noindex: true` for pages that must not be indexed (e.g. payment success, internal tools)
3. **`src/sitemap.xml`** — add a `<url>` entry with appropriate `priority` and `changefreq` (see priorities below). Update `lastmod` to today's date
4. **Component `ngOnInit`** — call `this.seo.setPage('your-page-key')`

**SEO priorities:**

| Page type | Priority | changefreq |
|---|---|---|
| Home (`/`) | 1.0 | weekly |
| Individual locations (`/malta/locations/:slug`) | 0.8 | daily |
| Browse/discovery pages (`/malta`, `/malta/list`, `/malta/deals`) | 0.7 | weekly |
| Content/editorial pages (`/malta/30-places-2026`) | 0.6 | monthly |
| Utility pages (`/about`, `/contact`, `/privacy`, `/cookies`) | 0.4 | monthly |
| Internal/transactional (`/pay`, `/pay/success`) | omit from sitemap | noindex |

---


### SEO checklist — adding a new location

See **`ADDING_LOCATIONS.md`** for the full step-by-step workflow including image conversion and thumbnail generation.

SEO-specific requirements when adding to `src/assets/locations.json`:

1. **`slug` field** — freeze it immediately; never change after publishing — it would break indexed URLs.
2. **`prerender-routes.txt`** — add `/malta/locations/{slug}`
3. **`src/sitemap.xml`** — regenerated automatically by `node scripts/generate-sitemap.js`
4. **`location.keywords`** — used by `seo.service.ts` for `<meta name="keywords">`

---

### Analytics

**`AnalyticsService`** (`src/app/shared/services/analytics.service.ts`) wraps Google Analytics via `gtag`. Two methods:

```typescript
analyticsService.pageView(url: string, title: string)   // fires a GA page_view event
analyticsService.event(name: string, params: Record<string, any>)  // fires a custom GA event
```

**Rules:**
- Every new **page component** must fire `analyticsService.pageView(window.location.href, 'Page Title')` in `ngOnInit` (browser-only — guard with `isPlatformBrowser`)
- Every significant **user interaction** (opening a location, navigating to a map point, clicking a CTA) should fire a named `analyticsService.event()`
- `analyticsService` is currently wired only into `map.component.ts` (location opens) and `location-detail.component.ts` (navigation, recommendations, explore). Static pages (`/about`, `/contact`, etc.) do **not** currently fire pageView — add it if tracking those matters

**Existing event names to stay consistent with:**
- `location_view` — params: `location_title`, `location_id`, `location_tags`
- `navigate_to_point` — params: `location_title`, `point_type`
- `recommendation_click` — params: `from_location`, `to_location`
- `explore_malta_click` — params: `from_location`

---

## Feature Flags

Feature flags live in `src/app/feature-flags.ts` and are swapped at build time via `fileReplacements` in `angular.json`. **The `feature-flags.ts` file is only used by `ng serve` — deployed builds always use the environment-specific file.**

| Flag | dev (`ng serve`) | staging | production |
|---|---|---|---|
| `FEATURES.PROMOTIONS` | `true` | `true` | `false` (flip to `true` when ready) |
| `FEATURES.ROUTE_BUILDER` | `false` | `false` | `false` |

**Adding a new flag:**
1. Add the key to all three files (`feature-flags.ts`, `feature-flags.staging.ts`, `feature-flags.production.ts`)
2. Default to `false` in production until explicitly ready to ship
3. Use `canMatch: [() => FEATURES.FLAG_NAME]` on the route to gate an entire page, or `*ngIf="FEATURES.FLAG_NAME"` in a template to gate a UI element
4. If the route is gated, **do not** add it to `prerender-routes.txt` or `sitemap.xml` until the flag is on in production

---

## Deploy

The site is hosted on **GitHub Pages** at `johnfabiomb.com` (CNAME in `docs/`). There is no CI pipeline — deploy is manual by pushing the built output.

| Target | Build command | Output dir | URL |
|---|---|---|---|
| Production | `ng build --configuration production` | `docs/` | `https://johnfabiomb.com` |
| Staging | `ng build` (default) | `docs/test/` | `https://johnfabiomb.com/test/` |

**Deploy steps:**
1. Run the build command
2. Commit the `docs/` changes
3. Push to `main` — GitHub Pages serves directly from `docs/`

Staging (`/test/`) has `<meta name="robots" content="noindex">` in `index.staging.html` and a `[STAGING]` title prefix — it is never indexed by Google.

---

## Key Files

| File | Purpose |
|---|---|
| `src/styles.scss` | Global tokens + shared classes |
| `src/app/feature-flags.ts` | Feature flags for `ng serve` (swapped at build time) |
| `src/environments/feature-flags.production.ts` | Production flag values |
| `src/environments/feature-flags.staging.ts` | Staging flag values |
| `prerender-routes.txt` | Routes Angular prerenders at build time |
| `src/sitemap.xml` | Manually maintained XML sitemap submitted to Google |
| `src/app/app.routes.ts` | All application routes |
| `src/app/shared/models/` | `Location`, `Provider`, `MapPoint`, `Difficulty`, `Island` types |
| `src/app/shared/services/seo.service.ts` | `setPage()` and `updateMetaData()` for all SEO tags |
| `src/app/shared/services/analytics.service.ts` | `pageView()` and `event()` wrappers around gtag |
| `src/app/shared/services/route-builder.service.ts` | Itinerary plan generation logic |
| `src/app/shared/utils/panel-resize.util.ts` | Drag-to-resize + minimize/expand logic for map panels |
| `src/app/shared/services/map-bridge.service.ts` | Scoped bridge between persistent shell map and swappable panel children |
| `src/app/platform/map-shell/` | Persistent shell that owns `<app-map>` across /malta, /malta/list, /malta/deals, /malta/providers/:id |
| `src/app/platform/provider-page/` | Provider detail page at `/malta/providers/:id` — SEO, Book Now, back navigation |
| `src/app/shared/utils/location-filter.util.ts` | `matchesFilter()`, `getIslandLabel()`, `difficultyColor()` |
| `src/app/shared/utils/geo.utils.ts` | `haversineKm()`, `haversineM()` distance helpers |
| `src/app/shared/utils/route-drawing.ts` | Builds OpenLayers features from `mapPoints[]` |
| `src/app/shared/utils/location-tracker.ts` | GPS dot + heading cone on the map |
| `src/app/components/panel-shell/` | Reusable panel wrapper (header, drag handle, scrollable body) |
| `src/app/components/map/` | OpenLayers map component |
| `src/app/platform/map-explore/` | Main map page |
| `src/app/platform/deals/` | Exclusive Deals map page |
| `src/app/platform/location-list/` | Browse Locations map page |
| `src/assets/locations.json` | All location data |
| `src/assets/providers.json` | All provider/deal data |

---

## Navigation & Routing

Routes are in `src/app/app.routes.ts`. All map-adjacent pages use `/malta/*`.

Panel navigation must be route-based:
- Opening a location → `/malta/locations/:slug` (use `location.slug` from JSON — never compute with `toLocationSlug`)
- Opening a provider → `/malta/providers/:id`
- Closing top-level panel → `router.navigate(['/malta'])`
- Closing sub-panel (e.g. provider within deals) → clear state, stay on same route

Old `?locationId=X` and `?title=X` query-param URLs are still handled by `MapExploreComponent` which redirects them to the canonical slug URL (`replaceUrl: true`).

---

## Data

### Location fields (`src/assets/locations.json`)

| Field | Type | Notes |
|---|---|---|
| `id` | `number` | Unique; supports legacy `?locationId=X` redirects |
| `title` | `string` | Display name — changing this does NOT change the URL |
| `slug` | `string` | URL segment used in `/malta/locations/:slug` — explicit, never computed at runtime |
| `description` | `string` | HTML allowed — rendered with `[innerHTML]` |
| `img` | `string` | Cover image path — preloaded by map on startup |
| `images` | `string[]?` | Extra gallery photos — preloaded when location is selected |
| `lat` / `lon` | `number` | Map pin position |
| `difficulty` | `'easy' \| 'moderate' \| 'hard'` | Shown as badge; used in route builder |
| `rating` | `number?` | 0–5, shown in card and panel |
| `tags` | `string[]` | Drive filter chips and route builder scoring — see tags below |
| `hidden` | `boolean?` | Shows "hidden gem" badge |
| `locality` | `string?` | Used to group pins into locality clusters on the map |
| `showLabel` | `boolean?` | Renders a name pill above the map pin |
| `clusterPriority` | `boolean?` | This location's image is used as the cluster representative |
| `mapPoints` | `MapPoint[]?` | Route waypoints drawn on the map when location is open |
| `keywords` | `string?` | Injected into `<meta name="keywords">` by `seo.service.ts` |
| `url` | `string?` | External reference URL |

**Tags used in filter matching:** `beach`, `bay`, `cave`, `sea-cave`, `historical`, `religious`, `fortress`, `fortification`, `cultural`, `hidden`, `easy`, `hard`, `gozo`, `comino`

### Provider fields (`src/assets/providers.json`)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Used in `?provider=X` query param |
| `name` / `tagline` / `emoji` | `string` | Display fields |
| `category` | `string` | Used for category badge label |
| `description` | `string?` | Shown in provider detail panel |
| `coverImage` | `string \| null?` | Hero image |
| `images` | `string[]?` | Gallery in provider detail |
| `highlights` | `string[]?` | Bullet list of key selling points |
| `discount` | `ProviderDiscount?` | `{ label, coupon, instructions }` — renders discount box |
| `website` / `instagram` / `phone` | `string?` | Contact links |
| `lat` / `lon` | `number?` | Required for map pin (`showOnMap: true`) |
| `showOnMap` | `boolean?` | Whether a pin appears on the deals map |
| `mapLabel` | `string?` | Text on the map pin pill (defaults to `'🏷️ Deal'`) |
| `nearLocationIds` | `number[]?` | Location IDs this provider is shown alongside in the location panel |

---

## OL Map Controls

Map controls (compass, zoom, locate) are styled globally in `styles.scss` under `.ol-rotate`, `.ol-zoom`, `.ol-attribution`.

- Compass always visible (`autoHide: false`), uses `fa-compass` icon
- Compass turns blue (`#4285F4`) when map is rotated — via `app-map.map-rotated .ol-rotate button`
- All OL control buttons have `outline: none` globally

---

## Commit Policy

Never run `git commit` or `git push` without explicit user instruction.

**Before every commit, update `CHANGELOG.md` first** — stage it as part of the same commit. Add a new entry under `## Unreleased` (or a dated version heading if this is a release). Keep entries concise: one line per meaningful change, grouped under `### Added`, `### Fixed`, or `### Changed`. Do not wait to be asked.

---

## Before Coding

Architecture, scalability, and consistency with existing project standards must always be the priority before implementation.

Do not start coding immediately. First analyze the current architecture and existing patterns in the files provided. Then propose the cleanest approach that fits the project.

Avoid quick fixes, isolated solutions, duplicated logic, or changes that solve the current task but damage maintainability.

If the requested feature can be implemented in multiple ways, choose the option that best respects:
- Existing architecture
- Reusability
- Type safety
- Separation of concerns
- Angular best practices
- Scalability
- Clean and understandable code

Only after that, provide the implementation.

---

## State Management — Signals vs RxJS

Use Angular Signals as the preferred approach for local component state, UI state, derived state, and simple reactive values. Do not force Signals everywhere — analyze the existing architecture first and choose the best tool for the case.

**Use Signals when they improve readability, maintainability, performance, and template simplicity.**

**Keep RxJS when working with:**
- HTTP streams or existing Observable-based services
- Debounced searches
- Complex async flows
- Cancellation
- Multiple stream combinations
- WebSocket / event streams
- Existing project patterns based on Observables

**Signal rules:**
- Prefer `computed()` for derived values.
- Use `effect()` only for real side effects (syncing with external APIs, browser APIs, analytics, storage, or imperative code). Never use `effect()` to copy state from one signal to another.
- Keep writable signals private when possible. Expose readonly signals from services/stores.
- Avoid mixing Signals and RxJS randomly without a clear reason.
- Use Angular RxJS interop utilities (`toSignal()`, `toObservable()`, `takeUntilDestroyed()`, `rxResource()`) when bridging the two.

---

## Engineering Mindset

Act as a senior JavaScript/TypeScript developer specialized in Angular. Every task — whether adding, refactoring, or reviewing — requires thinking about architecture, scalability, maintainability, and long-term impact, not just making the immediate code work.

### 1. Architecture and scalability
- Think about how new functionality fits into the existing project before writing a line.
- Avoid quick fixes that solve the immediate problem but create technical debt.
- Propose solutions that can scale if the feature grows in complexity.
- Keep responsibilities separated: components handle presentation and user interaction; services, helpers, and utilities handle business logic, data transformation, and reusable behaviour.
- Avoid putting business logic inside Angular components.

### 2. Reusability
- Identify logic that can be reused elsewhere and extract it into services, helpers, directives, pipes, or types.
- Never duplicate code. If a pattern already exists in the project, follow it.
- Prefer generic, flexible solutions over hardcoded logic.

### 3. Clean TypeScript
- Use strong typing. Avoid `any` unless there is a documented reason.
- Create clear interfaces, types, enums, or models when needed.
- Keep function signatures explicit. Use meaningful names for variables, functions, classes, and files.
- Keep functions small, focused, and readable. Prefer readable over clever.

### 4. Angular best practices
- Use Angular patterns correctly (standalone components, signals where appropriate, proper DI).
- Move business logic, API logic, and data transformation into services or utilities.
- Use RxJS carefully — avoid memory leaks, prefer `takeUntilDestroyed`, use `async` pipe when possible.
- Avoid unnecessary subscriptions. Use lifecycle hooks correctly.
- Keep templates clean — no complex logic inside HTML.

### 5. OOP and design principles
- Apply SOLID principles where they add real clarity and maintainability.
- Use encapsulation, abstraction, and separation of concerns.
- Prefer composition over inheritance when it leads to simpler code.
- Use classes, interfaces, and inheritance only when they add genuine value.

### 6. Maintainability
- Write code another developer can understand without a walkthrough.
- Comments explain the *why* (a hidden constraint, a non-obvious invariant) — never the *what*.
- Keep naming consistent with the rest of the project.
- Avoid hidden side effects. Make edge cases explicit.

### 7. Performance
- Avoid unnecessary calculations, subscriptions, renders, or API calls.
- Consider lazy loading, memoization, debounce, caching, or optimised change detection when relevant.
- Do not over-optimise prematurely, but flag performance risks when they exist.

### 8. Error handling and edge cases
- Always consider loading states, empty states, null/undefined values, API errors, invalid data, and user mistakes.
- Make the solution resilient. Avoid code that breaks silently. Handle errors cleanly and user-friendly.

### 9. Project consistency
- Before introducing a new pattern, check whether a project convention already exists.
- Match the folder structure, naming, imports, and component patterns already in use.
- If existing code is provided as context, adapt to its style.

### 10. Response format
When providing code, always include:
1. A short explanation of the recommended approach and *why* it is better.
2. The final implementation with all files to create or modify.
3. Any notes about scalability, reusability, or architectural impact.
4. Potential edge cases or follow-up improvements if relevant.

Point out trade-offs when multiple solutions exist. Give the senior-level approach first. Keep explanations practical — avoid theory unless it directly supports the implementation.
