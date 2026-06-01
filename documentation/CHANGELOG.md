# Changelog

All notable changes to Venture Map are recorded here.

---

## [Unreleased]

### Added
- **XP & Level system** — 7-level progression (New → Explorer → Legend) driven by XP earned from location views, saves, group actions, daily login, session time, and friend referrals; level gates group creation; each level raises max-member cap
- `award_xp` Supabase RPC — atomic XP + level update with daily caps, unique-index deduplication, and level-up detection
- `InteractionTrackingService` — per-user stats counter via `track_interaction` RPC; tracks view/save/share counts per location and view/book_now/coupon_copy/share counts per provider; signals-based `stats` map for reactive reads
- `user_interaction_stats` table — composite PK `(user_id, entity_type, entity_id)`; unified table covering both locations and providers
- `xp_events` table — audit log of every XP-earning event with action, ref_id, and timestamp
- `user_profiles` view — postgres-owned view exposing safe user fields (id, display_name, photo_url, level, role) for cross-user JOINs without exposing PII; bypasses users RLS
- "You've visited this N times" chip on location pages (shown after second visit)
- Levels modal accessible globally via `LevelsModalService`; auto-opens on first login
- Level-up toast — fixed bottom pill that appears when user crosses a level threshold
- Referral system — unique 8-char referral code per user; share link in account popup; `process_referral` RPC awards 120 XP to referrer and 30 XP welcome bonus to new user
- Session heartbeat — awards 5 XP every 10 min while active (max 30 XP/day)
- Daily login bonus — 80 XP once per calendar day
- `ShareButtonComponent` — new `(shared)` output event for tracking; fires on both native share and clipboard copy
- `ProviderDetailComponent` — new `(couponCopied)` and `(providerShared)` outputs for provider interaction tracking

### Changed
- Groups now open to all users by default (`feature_access.groups = true` default); opt-out locking still available per user
- Groups list sorted by leader level descending (admin/GM first, then level 6→1), then by date
- `join_group` RPC now resolves caller profile server-side — no client-supplied name/photo (prevents spoofing)
- Groups architecture migrated from denormalized leader/member columns to live JOINs via `user_profiles` view

### Added
- **Explore Together** — full hiking groups feature behind `FEATURES.GROUPS` flag: create groups for Malta spots, join/leave with race-safe transactions, real-time member list, group chat (last 100 messages), leader transfer, cancel group
- `GroupsService` — all Firestore operations: `onSnapshot` listeners, `runTransaction` for join, `writeBatch` for atomic multi-doc writes, `fetchGroupsForSpot` one-shot query for location detail widget
- `GroupCardComponent` — group card with leader avatar, date, difficulty badge, member avatars
- `MemberAvatarsComponent` — overlapping avatar bubbles with `+N` overflow
- `ExploreTogetherComponent` — groups list + inline create form at `/malta/groups`
- `GroupDetailComponent` — group detail, member list with last-active, chat, leadership controls at `/malta/groups/:id`
- Footer **Explore nav menu** — single trigger button replaces "Browse All" + "Groups" buttons; popup with Browse Locations, Exclusive Deals, Explore Together items; backdrop overlay on open
- "Who's exploring here?" section in location detail when groups exist for that spot

### Fixed
- Footer profile popup clipped by `overflow: hidden` on `.footer-right` — removed, text truncation handled by inner elements
- Footer nav popup positioning broken by `backdrop-filter` containing block — moved popup to direct child of `.bottom-bar`
- Navigation lock icon removed from Google Maps direction buttons (was purely cosmetic, never gated)
- Explore Together and Group Detail panels had no side padding — wrapped content in `.et-content` / `.gd-content` div

### Added (directions gate + sign-in nudge)
- Guests clicking a Google Maps direction now get a 10-second interstitial countdown instead of a hard login block; a "Sign in to open straight away" nudge with a sign-in button appears in the interstitial slot
- Logged-in users skip the interstitial entirely — Google Maps opens immediately in a new tab
- Direction buttons updated: lock icon removed, hint now reads "Opens in 10s · sign in to skip" for guests
- Two new benefits added to both auth modal and welcome popup: ⚡ "Open Google Maps instantly — no wait" and 📶 "Browse the map offline, even without signal"

### Changed (copy & tone)
- Replaced all instances of "exclusive" in UI copy with honest, peer-to-peer language ("Local Deals", "Partner deal", "real discounts from local partners I trust")
- Auth modal title: "Sign in to unlock it all" → "It's way better signed in"
- Auth modal benefits aligned with welcome popup wording
- Email sent state: "Check your email" → "Link on its way! ✉️"; "We sent..." → "I've sent..."
- Saved places empty state: more personal, first-person copy
- Deals intro: "Exclusive discounts" → first-person "partners I've personally connected with"
- iOS IAB note: rewritten to friendly peer-to-peer tone
- Welcome popup subtitle updated to first-person; benefit copy aligned across both modals

### Added (auth UX overhaul)
- `SignInFormComponent` — shared reusable form used by both `AuthModalComponent` and `WelcomePopupComponent`; handles all four states: `default`, `android-redirect`, `email-input`, `email-sent`; emits `stateChange` so parents can show/hide chrome conditionally; `:host { display: contents }` slots into any parent flex layout
- `InAppBrowserService.isAndroid()` — added to gate Android Chrome redirect vs iOS email-only flow
- `AuthService.openLoginModal()` — now no-ops if user is already logged in (prevents ghost modal)
- Footer sign-out: `signingOut` loading state disables button and shows "Signing out…" while Firebase `signOut()` resolves
- `effect()` in both `AuthModalComponent` and `WelcomePopupComponent` auto-dismisses when `isLoggedIn()` becomes true, regardless of which sign-in path was used
- `busy` getter guards all sign-in buttons against double-click race conditions

### Changed (auth UX overhaul)
- `AuthModalComponent` rewritten as a thin wrapper around `SignInFormComponent`; header and benefits shown only while `formState === 'default'`; legal text hidden on `email-sent` state
- `WelcomePopupComponent` rewritten to embed `SignInFormComponent`; welcome chrome (title, benefits) collapses once form advances past `default` state
- Duplicate sign-in logic (Google OAuth, email link, error handling, loading flags) removed from both modal/popup and centralised in `SignInFormComponent`

### Added (IAB auth)
- `InAppBrowserService` — detects Instagram/Facebook/Line in-app browsers; `openInChrome()` redirects Android IAB users to Chrome via `intent://` scheme
- `AuthModalComponent` — IAB-aware states: Android auto-redirects to Chrome; iOS shows email magic link flow (`email-input` → `email-sent` with numbered steps + manual "Check sign-in" button)
- `AuthService.sendEmailSignInLink()` — sends Firebase email sign-in link; email embedded in `continueUrl` for cross-browser sign-in completion
- `AuthService.completeEmailSignIn()` — called on app init to detect and complete a pending email link sign-in from any browser; cleans URL after completion
- `AppComponent.handleEmailSignInLink()` — checks `window.location.href` on startup and completes email link auth if detected, then navigates to `/malta`

### Added
- `WelcomePopupComponent` — one-time guest welcome modal (shown 2.5s after first visit, suppressed once dismissed via `vm_welcome_shown` localStorage key); lists save/deals/directions benefits; "Sign in with Google" CTA + "Continue as guest" dismiss

### Changed (auth modal)
- Redesigned `AuthModalComponent` to match welcome popup style: same emoji + photo header, benefit rows, branded gold "Continue with Google" button, matching bounce animation

### Changed
- Dev about button: photo reduced to 65% opacity (85% on hover) + gold "i" info badge overlaid at bottom-right so users know it's tappable
- Save buttons (header + body): pulsing `deals-pulse` glow animation while unsaved; animation stops once saved

### Changed (prior)
- Design token audit: replaced all hardcoded hex colours and pixel values with `var(--token)` references across all component SCSS and inline `styles:` arrays — affects `app.component.scss`, `footer.component.scss`, `map.component.scss`, `nav-interstitial.component.scss`, `location-detail.component.scss`, `provider-card.component.scss`, `provider-detail.component.scss`, `image-gallery.component.scss`, `about.component.scss`, `contact.component.scss`, `map-shell.component.scss`, `payment.component.scss`, `payment-success.component.scss`, `route-builder.component.scss`, `saved-places.component.scss`, `top-places.component.scss`, and inline styles in `auth-modal`, `confirm-popup`, `coupon-reminder`, `pwa-prompt`, `share-button`, and `provider-avatar` components

### Added
- Firebase Authentication with Google OAuth — sign-in modal, auth state persisted via `onAuthStateChanged`
- `AuthService` — signals-based service (`user`, `isLoggedIn`, `showLoginModal`); `signInWithGoogle()`, `signOut()`, `openLoginModal()`
- `UserDataService` — eagerly instantiated at app startup; creates Firestore user document on first login with `role: 'explorer'` and `savedLocations: []`; supports `toggleSaveLocation()`
- `AuthModalComponent` — overlay modal with Google sign-in button, backdrop dismiss, loading state
- Footer: "Sign in" button shown when logged out; logged-in user's Google avatar shown when signed in
- Footer: user popup (above avatar) shows name, email, and "Sign out" button
- Provider detail: coupon code blurred behind login; phone number locked behind login; Book Now locked behind login
- Block Hotel provider data corrected: name, tagline, description, highlights, discount label and instructions

### Fixed
- `UserDataService` was never instantiated at startup — `AppComponent` now eagerly injects it so the `effect()` watching auth state fires on login

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
