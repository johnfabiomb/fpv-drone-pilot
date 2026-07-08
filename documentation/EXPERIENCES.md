# Experiences (provider promo on the map)

The map promotes **experiences** (the thing you do — wakeboarding, a buggy safari, a dive) rather than providers. One provider offers many experiences; one experience can appear at several map spots. Deals are resolved per experience, falling back to the provider's deal.

```
Provider (the business)  ──< Experience (what you do)  ──< Spot (a pin on the map)
```

- **Provider** stays the brand/contact/booking entity at `/malta/providers/:id` (linked from each experience as "Offered by …").
- **Experience** is shown at `/malta/experiences/:id` and as map pins.

All of this is gated behind `FEATURES.PROMOTIONS`.

---

## Data — `src/assets/providers.json`

Add an `experiences` array to a provider. Example:

```json
"experiences": [
  {
    "id": "yippee-buggy",
    "providerId": "yippee-malta",
    "title": "Self-drive Buggy Safari",
    "type": "buggy",
    "emoji": "🚙",
    "tagline": "Drive Gozo's backroads in your own buggy convoy",
    "description": "HTML allowed — rendered with [innerHTML].",
    "coverImage": null,
    "spots": [
      { "lat": 36.0470, "lon": 14.2350, "label": "Gozo countryside", "nearLocationIds": [65, 41] }
    ]
  }
]
```

### Fields

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Unique across **all** providers. Used in `/malta/experiences/:id` — freeze it once published. |
| `providerId` | Yes | Must equal the parent provider's `id`. |
| `title` | Yes | Display name. |
| `type` | Yes | Drives the pin icon. One of `ExperienceType` (`enums.ts`): `wakeboard`, `wakesurf`, `wakefoil`, `tube`, `buggy`, `quad`, `tuktuk`, `jeep`, `boat`, `kayak`, `dive`, `stay`. |
| `emoji` | No | Explicit pin icon, overrides the `type` default. |
| `tagline` | Yes | One-line hook. |
| `description` | Yes | HTML allowed. |
| `coverImage` | Yes (use `null`) | **`null` → icon-only pin.** Set a path to switch the pin to a photo circle with the type icon badged on it. See "Adding a photo" below. |
| `images` | No | Extra gallery photos in the experience panel. |
| `spots` | Yes | One pin per entry: `{ lat, lon, label?, nearLocationIds? }`. `nearLocationIds` makes the experience appear in those location panels. |
| `discount` | No | Overrides the provider's deal. Omit to inherit `provider.discount`. Same shape as `ProviderDiscount`. |
| `bookUrl` | No | Overrides the provider's booking link. |

> **Why `coverImage: null` and not a comment?** JSON has no comments, so the key is kept present and set to `null` to mark the slot. Icon-only is the current default for all seeded experiences.

### Adding a photo to an experience (icon → photo pin)
1. Drop the image in `src/assets/images/providers/<provider-folder>/` (e.g. `yippee-buggy.png`).
2. Set `"coverImage": "/assets/images/providers/<provider-folder>/yippee-buggy.png"`.
3. Run `node scripts/convert-to-webp.js` (converts to `.webp` and rewrites the path).

The pin then renders as a photo circle with the activity-type icon badged in the corner; otherwise it's a coloured icon teardrop in the provider's brand colour.

---

## Code map

| File | Role |
|---|---|
| `core/models/enums.ts` | `ExperienceType` |
| `core/models/provider.model.ts` | `Experience`, `ExperienceSpot`, `Provider.experiences` |
| `core/utils/experience.utils.ts` | flatten (`getAllExperiences`, `getExperiencePins`), `findExperience`, icon/colour, `resolveExperienceDiscount`/`resolveExperienceBookUrl`, `getExperiencesNearLocation` |
| `ui/deal-box/` | shared coupon/deal box (used by provider **and** experience detail) |
| `features/experiences/experience-page/` | route component at `/malta/experiences/:id` |
| `features/experiences/experience-detail/` | panel content (hero, gallery, deal, "Offered by", book) |
| `features/experiences/experience-card/` | card used in the Local Deals list + "experiences near this spot" |
| `features/map/map/map.component.ts` | experience pin layer (separate from the provider/group layer) |
| `core/services/map-bridge.service.ts` | `experiencePins` signal + `experienceSelected$` |
| `core/services/seo.service.ts` | `setExperiencePage()` |

## When adding a new experience — checklist
1. Add the object to `providers.json` (see fields above).
2. Add `/malta/experiences/<id>` to `prerender-routes.txt`.
3. `node scripts/generate-sitemap.js` (auto-includes experiences).
4. Pins, Local Deals list, and "experiences near this spot" pick it up automatically.
