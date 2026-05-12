# Explore Malta — Interactive Map

An Angular 19 web app for discovering hidden gems, sea caves, hiking trails and scenic spots across Malta, Gozo, and Comino. Curated and built by John Montaño.

**Live site:** https://johnfabiomb.com

---

## What kind of project this is

- **Framework:** Angular 19 (standalone components, signals-ready)
- **Hosting:** GitHub Pages — static files served from the `docs/` folder
- **Rendering:** Static prerendering (SSG) — Angular generates real HTML files at build time for each route via `discoverRoutes: true`. Routes are auto-discovered from `app.routes.ts` — no manual route file needed.
- **Routing:** PathLocationStrategy (clean URLs — `/malta`, `/malta/list`, etc.)
- **Map:** OpenLayers (OL) with locality cluster layer and individual pin layer
- **Payment:** Stripe Buy Button embed
- **Ads:** Google AdSense (Auto Ads + manual `AdUnitComponent`) with Google Funding Choices for GDPR consent
- **SEO:** Per-route meta tags + JSON-LD structured data via `SeoService`

---

## Running locally

### Daily development
```bash
npm start
```
Starts the Angular dev server at `http://localhost:4200` with hot reload. No prerendering — plain SPA, fine for building features.

### Preview the real prerendered output
```bash
npm run preview
```
Runs a full production build (with prerendering) then serves the `docs/` output at `http://localhost:4200`. Use this to verify what GitHub Pages will actually serve before you push. Takes ~30–60 seconds.

To preview on a specific network host (e.g. test on mobile):
```bash
npm run preview -- -a 192.168.x.x
```

---

## Deploying to GitHub Pages

```bash
ng build
```
Output goes to `docs/`. Commit and push — GitHub Pages serves from `docs/` on the `main` branch.

The build:
1. Compiles and bundles all Angular code
2. Prerenderers all routes discovered from `app.routes.ts` to static `index.html` files
3. Copies all assets to `docs/`

> Routes are discovered automatically via `discoverRoutes: true` in `angular.json`. No manual route file to maintain.

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
/privacy                → Privacy Policy (GDPR)
/cookies                → Cookie Policy
```

---

## Rendering approach — why prerendering?

The app was originally a pure client-side SPA (hash routing: `/#/malta`). This meant:
- Social share previews (WhatsApp, Slack, Twitter/X) got a blank page — they don't run JS
- First paint required the full JS bundle to download and execute

**Now (prerendered + PathLocationStrategy):**
- Each route has a real HTML file in `docs/` — Google indexes it immediately
- Social previews show correct title, description and image
- First Contentful Paint is instant — the browser paints HTML before JS loads
- Angular then "hydrates" the prerendered HTML client-side

The OpenLayers map is intentionally skipped during prerendering (`isPlatformBrowser` guard). The prerendered HTML for `/malta` contains the app shell with correct SEO meta tags; the map loads after JS initialises.

---

## Legacy hash URL handling

Old bookmarked URLs like `https://johnfabiomb.com/#/malta` still work. `AppComponent.ngOnInit` detects the `#/` hash and redirects to the clean path:

| Old | New |
|-----|-----|
| `/#/malta` | `/malta` |
| `/#/list` | `/malta/list` |
| `/#/trend` | `/malta/30-places-2026` |
| `/#/plan` | `/malta/plan` |

---

## 404 handling on GitHub Pages

`src/404.html` is served by GitHub Pages for unknown paths. It redirects to `/?redirect=<encoded-path>` and `AppComponent` navigates to the right route on boot.

---

## Map clustering

Defined by `CLUSTER_ZOOM = 12` in `map.component.ts`:

- **Below zoom 12** → locality cluster bubbles (one per region: Malta North, Gozo, Comino, etc.)
- **At or above zoom 12** → individual photo pins
- Clicking a cluster calls `view.fit()` on that region's extent, capped at `maxZoom: 14`
- Island isolation: cluster "Closest Spots" only shows locations on the same island (Malta / Gozo / Comino), detected via the `gozo` / `comino` tag

---

## Google AdSense & GDPR

- **Publisher ID:** `ca-pub-9568287834157004`
- **Auto Ads:** The main AdSense script in `index.html` enables Google Auto Ads — Google places ad units automatically.
- **Manual ad slots:** Use `<app-ad-unit slot="YOUR_SLOT_ID">` anywhere in a template. The component handles the SSR browser guard and `adsbygoogle.push({})` call.
- **Consent (GDPR):** Google Funding Choices script in `index.html` shows an IAB TCF-certified consent banner to EEA visitors. You must also configure the consent message in your AdSense dashboard under **Privacy & Messaging → GDPR**.
- **Policy pages:** `/privacy` (Privacy Policy) and `/cookies` (Cookie Policy) are live routes.

---

## Key files

| File | Purpose |
|------|---------|
| `src/app/app.routes.ts` | All route definitions |
| `src/app/shared/services/seo.service.ts` | Meta tags + JSON-LD per route |
| `src/app/components/map/map.component.ts` | OpenLayers map (clustering, pins, GPS) |
| `src/app/components/location-panel/` | Side panel shown on pin click |
| `src/app/components/ad-unit/ad-unit.component.ts` | Reusable AdSense ad slot |
| `src/app/components/footer/footer.component.html` | Footer with Privacy/Cookie policy links |
| `src/app/platform/privacy/` | Privacy Policy page |
| `src/app/platform/cookies/` | Cookie Policy page |
| `src/assets/locations.json` | All location data |
| `src/index.html` | AdSense + Funding Choices + Analytics scripts |
| `src/server.ts` | Server entry point for prerender build |
| `ADDING_LOCATIONS.md` | Guide for adding new map locations |

---

## Adding new locations

See `ADDING_LOCATIONS.md`.

If a new location should appear in the "30 Places" list, add it to the `REVEALED` array in `src/app/platform/trend/trend.component.ts`.
