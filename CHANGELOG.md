# Changelog

All notable changes to Venture Map are recorded here.

---

## [Unreleased]

---

## 2026-05-20

### Fixed
- Provider pins now correctly hidden in production behind `FEATURES.PROMOTIONS` flag — guarded both the `providerPins` setter and the `setupProviderLayer()` init path
- Google Maps interstitial was showing 3s countdown instead of 6s — `navDuration` was being overridden to 3 in deals and malta-map components
- Footer "John Montano" about popup rendered under the mobile panel (z-index 200 < panel 300) — raised footer bar to z-index 400
- Provider card in interstitial modal overflowed the card boundaries — wrapped `ng-content` slots in `.slot-wrap` containers
- Ghost click on mobile: panel opening so fast after a location tap that the 300ms synthetic click landed on panel elements — CSS `pointer-events: none` + 350ms animation delay on touch devices

### Added
- `ProviderAvatarComponent` — reusable circular avatar with emoji badge overlay, size-aware scaling
- `CouponReminderComponent` — shows provider discount label and copyable coupon code in the Book Now interstitial
- `provider.utils.ts` — `resolveProviderColor()`, `getProviderAccentColor()`, `getProviderCategoryLabel()` utilities
- Per-provider `color` field on Provider model for brand color overrides
- Smart interstitial provider selection: primary = providers near selected location (by `nearLocationIds` or ≤8km), fallback = nearest to user GPS labeled "Near you"
- Deals page providers sorted by distance from user GPS (fetched once on init)
- Book Now interstitial: no countdown timer (duration=0), button immediately active
- Both interstitial modes (Book Now + Google Maps) open in a new tab
- Santa Maria Water Sports brand color (`#0d3d72`) and gallery images

### Changed
- Nav interstitial refactored into a generic shell with `ng-content` slots (`[slot-top]`, `[slot-bottom]`) — decoupled from provider logic
- Provider card stripe, deal strip, exclusive badge, avatar border, and map pin border all use per-provider color via `resolveProviderColor()`
- Gozo map cluster split into 7 sub-locality clusters using `Gozo-` prefix (Gozo-Dwejra, Gozo-Gharb, Gozo-Xagħra, Gozo-Munxar, Gozo-Victoria, Gozo-Marsalforn, Gozo-Qala)
- `map-rotated` host class update wrapped in `NgZone.run()` so the blue compass indicator appears immediately on mobile pinch-rotate

---

## 2026-05 (earlier)

### Added
- Persistent map shell (`MaltaShellComponent`) — single `<app-map>` instance shared across `/malta`, `/malta/list`, `/malta/deals` via router-outlet
- `MapBridgeService` — scoped communication bridge between shell and panel child components
- Instagram-style bottom sheet panel with velocity snap and pull-to-collapse on mobile
- Device-orientation compass on route map (iOS permission from user gesture, `deviceorientationabsolute` for Android)
- Location list page (`/malta/list`) with OnPush + Signals to fix iOS Safari freeze
- Exclusive Deals page (`/malta/deals`) with provider cards and map pins
- `PanelResize` utility — drag-to-resize and minimize/expand logic shared across all map panels
- Image optimisation pipeline — all images converted to WebP with map pin thumbnails

### Fixed
- Filter bar flashing on hard reload at a location URL
- iOS scroll broken after panel height chain fix
- Panel header not sticky on scroll

### Changed
- Project renamed from FPV Pilot Page to Venture Map
- Routing moved to hash-free approach

---

## 2025 and earlier

### Added
- OpenLayers interactive map with location pins, locality clusters, and filter chips
- 73 Malta & Gozo locations with descriptions, images, difficulty ratings, and GPS routes
- SEO: prerendering, sitemap, structured data, per-location meta tags
- Google Analytics integration
- Payment section (`/pay`)
- 30 Places 2026 editorial page (`/malta/30-places-2026`)
- PWA install prompt
- Privacy, cookies, and contact pages
- Google Ads infrastructure
