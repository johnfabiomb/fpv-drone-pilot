# Adding a New Location

This guide covers everything you need to do to add a new spot to the Malta map.

---

## Quick Checklist

- [ ] Add the image to `src/assets/images/places/`
- [ ] Add the entry to `src/assets/locations.json`
- [ ] Regenerate the sitemap
- [ ] Build and deploy

---

## Step 1 — Add the Image

Drop the photo into:

```
src/assets/images/places/
```

**Tips:**
- Name it after the next available number (currently the last is `71`, so use `72.jpg`)
- JPG or PNG both work
- Landscape photos look best as the hero image in the modal
- There is no size requirement, but keep it under 2MB for performance

---

## Step 2 — Add the JSON Entry

Open `src/assets/locations.json` and add a new object inside the `"locations"` array. Use the template below:

```json
{
    "id": 72,
    "title": "Your Location Name",
    "description": "Write a description here. <b>Bold text is supported.</b> Talk about what makes this spot special, what to expect, and any useful tips for visitors.",
    "img": "/assets/images/places/72.jpg",
    "lon": 14.000000,
    "lat": 35.000000,
    "url": "https://www.instagram.com/johnfabiomb/embed",
    "keywords": "Malta, location name, hiking, nature, FPV",
    "category": "Nature & Landmarks",
    "rating": 4.5,
    "mapPoints": [
        {
            "label": "Final location",
            "description": "Open this exact spot in Google Maps.",
            "lon": 14.000000,
            "lat": 35.000000,
            "type": "destination"
        }
    ]
}
```

---

## Field Reference

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Next number in sequence. Current max is **71**. |
| `title` | Yes | Name shown on the modal and page title. |
| `description` | Yes | Full description. HTML `<b>` tags are supported. |
| `img` | Yes | Path to the hero image. Always starts with `/assets/images/places/`. |
| `lon` | Yes | Longitude of the location (e.g. `14.4562`). |
| `lat` | Yes | Latitude of the location (e.g. `35.8207`). |
| `url` | Yes | Instagram embed URL. Use the profile embed until you film a reel there. |
| `keywords` | Yes | Comma-separated keywords used for SEO. |
| `category` | Yes | Category shown as a chip on the modal. See categories below. |
| `rating` | Yes | Rating out of 5 (e.g. `4.7`). Shown with a star on the modal. |
| `mapPoints` | Yes | Array of points shown in the modal. Always include at least the final destination. |
| `recommendedRoute` | No | Path to a route/map screenshot image. Only add if you have one. |

---

## mapPoints

Every location needs at least one entry in `mapPoints` — the final destination. If the spot has a tricky approach (e.g. a parking area + the actual location), you can add multiple points.

**Single point (most locations):**
```json
"mapPoints": [
    {
        "label": "Final location",
        "description": "Open this exact spot in Google Maps.",
        "lon": 14.000000,
        "lat": 35.000000,
        "type": "destination"
    }
]
```

**Multiple points (parking + destination):**
```json
"mapPoints": [
    {
        "label": "Parking spot",
        "description": "Park here and walk down the trail.",
        "lon": 14.344498,
        "lat": 35.920518,
        "type": "parking"
    },
    {
        "label": "Final location",
        "description": "Open this exact spot in Google Maps.",
        "lon": 14.345000,
        "lat": 35.921000,
        "type": "destination"
    }
]
```

When there are multiple `mapPoints`, the modal shows each one with an "Open on Google Maps" button instead of a single button. The map also zooms to the destination point when the modal opens.

---

## Optional: Recommended Route Image

If you have a screenshot of the route (e.g. from Google Maps or a trail app), add it to `src/assets/images/places/` and reference it:

```json
"recommendedRoute": "/assets/images/places/72-route.jpg"
```

This shows a separate full-width image in the modal below the description with the note about Google Maps not always being accurate.

---

## Optional: Custom Instagram Reel

Once you film and publish a reel for the location, replace the default profile embed with the specific reel:

```json
"url": "https://www.instagram.com/reel/YOUR_REEL_ID/embed"
```

To get the embed URL: open the reel on Instagram → click the three dots → Copy link → paste it here and add `/embed` at the end.

---

## Available Categories

Pick the one that fits best, or add a new one if none apply:

| Category |
|---|
| Nature & Landmarks |
| Nature & Water Attractions |
| Nature & Cultural Landscapes |
| Hiking & Trails |
| Beaches & Coastal Spots |
| Beaches & Swimming Spots |
| Beaches & Water Attractions |
| Rock Formations & Coastal Views |
| Rock Formations & Scenic Views |
| Caves & Natural Wonders |
| Caves & Rock Formations |
| Caves & Historical Sites |
| Viewpoints |
| Adventure & Scenic Views |
| Historic & Cultural Sites |
| Historical & Cultural |
| Historical & Natural Landmarks |
| Religious & Historical |
| Cultural & Entertainment |
| Parks & Scenic Spots |
| Gardens & Scenic Walks |

---

## Step 3 — Regenerate the Sitemap

Run this command from the project root. It rebuilds `src/sitemap.xml` with all locations including the new one so Google can discover it.

```bash
python3 -c "
import json
from datetime import date
from urllib.parse import quote

with open('src/assets/locations.json') as f:
    data = json.load(f)

today = date.today().isoformat()
BASE = 'https://johnfabiomb.com'

urls = ['  <url>\n    <loc>{}/</loc>\n    <lastmod>{}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>'.format(BASE, today)]

for loc in data['locations']:
    slug = quote(loc['title'].replace(' ', '-'))
    urls.append('  <url>\n    <loc>{}/#/malta?title={}</loc>\n    <lastmod>{}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>'.format(BASE, slug, today))

sitemap = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n' + '\n'.join(urls) + '\n</urlset>\n'

with open('src/sitemap.xml', 'w') as f:
    f.write(sitemap)
print(f'Done - {len(urls)} URLs')
"
```

---

## Step 4 — Build and Deploy

```bash
ng build --configuration production
```

The new marker appears on the map automatically. The clustering, circular thumbnail, and icon preloading all handle themselves — no code changes needed.

---

## How to Get Coordinates

The easiest way to get `lon` and `lat` for a spot:

1. Open **Google Maps** on desktop
2. Right-click on the exact point
3. Click the coordinates at the top of the menu — they copy automatically
4. The format is `lat, lon` — make sure you put them in the right fields (Malta lat is around `35.8–36.1`, lon is around `14.2–14.6`)
