# Explore Malta — Interactive Map

An Angular 19 web app for discovering hidden gems, sea caves, hiking trails and scenic spots across Malta and Gozo. Curated and built by John Montaño.

**Live site:** https://johnfabiomb.com

---

## What kind of project this is

- **Framework:** Angular 19 (standalone components, signals-ready)
- **Hosting:** GitHub Pages — static files served from the `docs/` folder
- **Rendering:** Static prerendering (SSG) — Angular generates real HTML files at build time for each route. Google and social scrapers see full content without running JavaScript.
- **Routing:** PathLocationStrategy (clean URLs — `/malta`, `/malta/list`, etc.)
- **Map:** OpenLayers (OL) with clustered pin layer and route drawing
- **Payment:** Stripe Buy Button embed + serverless checkout session (`payment-server/`)
- **SEO:** Per-route meta tags + JSON-LD structured data via `SeoService`

---

## Running locally

### Daily development
```bash
npm start
```
Starts the Angular dev server at `http://localhost:4200` with hot reload. **Use this for all day-to-day work.** No prerendering — it's a plain SPA, which is fine for building features.

### Preview the real prerendered output
```bash
npm run preview
```
Runs a full production build (with prerendering) then serves the `docs/` output at `http://localhost:4200`. Use this to verify what GitHub Pages will actually serve before you push. This takes ~30–60 seconds.

---

## Deploying to GitHub Pages

```bash
ng build
```
Output goes to `docs/`. Commit and push — GitHub Pages serves from `docs/` on the `main` branch.

The build:
1. Compiles and bundles all Angular code
2. Prerenderers each route in `prerender-routes.txt` to a static `index.html`
3. Copies all assets to `docs/`

**Prerendered routes** (defined in `prerender-routes.txt`):
```
/
/malta
/malta/list
/malta/30-places-2026
/pay
```

---

## Route structure

```
/                       → redirects to /malta
/malta                  → Interactive map (OpenLayers)
/malta/list             → Browse all locations
/malta/30-places-2026   → "30 Places to Visit in Malta" trend list
/malta/plan             → Route builder (feature-flagged)
/pay                    → Payment page (Stripe)
/pay/success            → Payment confirmation
```

Future pages (landing, about, contact, policy) will live at the root level alongside `/malta`.

---

## Rendering approach — why prerendering?

The app was originally a pure client-side SPA (hash routing: `/#/malta`). This meant:
- Google could eventually index it (it executes JS) but slowly
- Social share previews (WhatsApp, Slack, Twitter/X) got a blank page — they don't run JS
- First paint required the full JS bundle to download and execute

**Now (prerendered + PathLocationStrategy):**
- Each route has a real HTML file in `docs/` — Google indexes it immediately
- Social previews show correct title, description and image
- First Contentful Paint is instant — the browser paints HTML before JS loads
- Angular then "hydrates" the prerendered HTML client-side (attaches event listeners)

The OpenLayers map is intentionally skipped during prerendering (`isPlatformBrowser` guard in `map.component.ts`). The map canvas is a browser-only thing — the prerendered HTML for `/malta` just contains the app shell with correct SEO meta tags, and the map loads after JavaScript initialises.

---

## Legacy hash URL handling

Old bookmarked URLs like `https://johnfabiomb.com/#/malta` still work. `AppComponent.ngOnInit` detects the `#/` hash on boot and redirects to the clean path equivalent:

| Old | New |
|-----|-----|
| `/#/malta` | `/malta` |
| `/#/list` | `/malta/list` |
| `/#/trend` | `/malta/30-places-2026` |
| `/#/plan` | `/malta/plan` |

---

## 404 handling on GitHub Pages

`src/404.html` is served by GitHub Pages for any path it can't find a file for. It redirects to `/?redirect=<encoded-path>` and `AppComponent` navigates to the right route on boot. Since all main routes are prerendered, this only triggers for genuinely unknown paths.

---

## Key files

| File | Purpose |
|------|---------|
| `src/app/app.routes.ts` | All route definitions |
| `src/app/shared/services/seo.service.ts` | Meta tags + JSON-LD per route |
| `src/app/components/map/map.component.ts` | OpenLayers map (large file) |
| `src/assets/locations.json` | All location data |
| `src/server.ts` | Server entry point for prerender build |
| `src/app/app.config.server.ts` | Server-side app config (merges with app.config.ts) |
| `prerender-routes.txt` | Routes to prerender at build time |
| `payment-server/server.js` | Express server for Stripe checkout sessions |
| `ADDING_LOCATIONS.md` | Guide for adding new map locations |

---

## Adding new locations

See `ADDING_LOCATIONS.md`.

If a new location should appear in the "30 Places" list, add it to the `REVEALED` array in `src/app/platform/trend/trend.component.ts` and add a new prerender route entry if it gets its own page.
