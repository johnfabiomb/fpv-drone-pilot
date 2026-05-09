# Adding a New Location

This guide covers everything you need to do to add a new spot to the Malta map.

---

## Quick Checklist

- [ ] Add the image(s) to `src/assets/images/places/`
- [ ] Add the entry to `src/assets/locations.json`
- [ ] Regenerate the sitemap
- [ ] Build and deploy

---

## Step 1 — Add the Image

Drop the photo into a subfolder under:

```
src/assets/images/places/
```

Create a folder named after the location (e.g. `my-spot/`) and put all its images there. The first image listed in `images` (or the `img` field) is used as the hero thumbnail on the map.

**Tips:**
- Use lowercase, hyphenated folder and file names (e.g. `my-spot/my-spot-main.jpg`)
- JPG or PNG both work
- Landscape photos look best as the hero image in the modal
- Keep images under 2 MB each for performance
- The current last ID is **71** — use **72** for the next location

---

## Step 2 — Add the JSON Entry

Open `src/assets/locations.json` and add a new object to the array. Use the template below:

```json
{
    "id": 72,
    "title": "Your Location Name",
    "description": "Write a description here. <b>Bold text is supported.</b> Talk about what makes this spot special, what to expect, and any useful tips for visitors.",
    "img": "/assets/images/places/my-spot/my-spot-main.jpg",
    "images": [
        "/assets/images/places/my-spot/my-spot-main.jpg",
        "/assets/images/places/my-spot/my-spot-2.jpg"
    ],
    "lon": 14.000000,
    "lat": 35.000000,
    "url": "https://www.instagram.com/johnfabiomb/embed",
    "keywords": "Malta, location name, hiking, nature, FPV",
    "rating": 4.5,
    "difficulty": "moderate",
    "hidden": false,
    "tags": [
        "hiking",
        "viewpoint",
        "nature",
        "moderate"
    ],
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
| `title` | Yes | Name shown on the modal and map marker tooltip. |
| `description` | Yes | Full description. HTML `<b>` tags are supported. |
| `img` | Yes | Path to the hero/thumbnail image. |
| `images` | No | Array of image paths for the gallery slider in the modal. If omitted, only `img` is shown. |
| `lon` | Yes | Longitude (e.g. `14.4562`). |
| `lat` | Yes | Latitude (e.g. `35.8207`). Malta is ~35.8–36.1 lat, ~14.2–14.6 lon. |
| `url` | Yes | Instagram embed URL. Use the profile embed until you film a reel there. |
| `keywords` | Yes | Comma-separated keywords for SEO meta tags. |
| `rating` | Yes | Rating out of 5 (e.g. `4.7`). Shown with a star on the modal. |
| `difficulty` | Yes | `"easy"`, `"moderate"`, or `"hard"`. Used by the route builder and filter bar. |
| `hidden` | Yes | `true` for secret/lesser-known spots, `false` for well-known ones. Affects the route builder scoring. |
| `tags` | Yes | Array of tags. See the full tag list below. Always include the difficulty tag too. |
| `mapPoints` | Yes | Array of points shown in the modal with Google Maps buttons. |
| `recommendedRoute` | No | Path to a route screenshot image. Only add if you have one. |

---

## difficulty

Set exactly one of these:

| Value | When to use |
|---|---|
| `"easy"` | Paved or well-marked paths, no physical challenge, suitable for everyone |
| `"moderate"` | Some uneven terrain, light hiking, basic fitness needed |
| `"hard"` | Scrambling, cliff edges, remote access, or serious hike required |

---

## tags

Always include the difficulty as a tag as well (e.g. `"easy"`, `"moderate"`, `"hard"`). Add the island tag if it's Gozo or Comino (Malta needs no island tag).

**Full list of available tags:**

| Tag | Use for |
|---|---|
| `easy` / `moderate` / `hard` | Always include one to match `difficulty` |
| `gozo` | Locations on Gozo island |
| `comino` | Locations on Comino island |
| `hidden` | Secret or off-the-beaten-path spots |
| `beach` | Sandy or pebble beaches |
| `swimming` | Good swimming spots |
| `snorkeling` | Snorkeling spots |
| `diving` | Scuba diving sites |
| `cliff-jumping` | Cliff jump spots |
| `boat-trip` | Boat trips / accessible by boat |
| `kayak` | Kayaking spots |
| `cave` | Land or sea caves |
| `sea-cave` | Specifically sea-level caves |
| `rock-formation` | Notable rock features |
| `natural-arch` | Sea arches or rock arches |
| `cliffs` | Cliff edges / coastal cliffs |
| `viewpoint` | Scenic viewpoints |
| `sunset` | Good sunset spots |
| `hiking` | Hiking locations |
| `trail` | Marked trails |
| `coastal-walk` | Walks along the coastline |
| `scenic-walk` | Scenic walking routes |
| `urban-walk` | City / town walking routes |
| `valley` | Valleys |
| `lagoon` | Lagoons / enclosed bays |
| `bay` | Open bays |
| `nature` | General nature spots |
| `landscape` | Wide landscape views |
| `adventure` | General adventure / thrill spots |
| `photography` | Exceptionally photogenic |
| `historical` | Historical sites or ruins |
| `cultural` | Cultural sites |
| `religious` | Churches, chapels, shrines |
| `fortress` | Major fortresses / citadels |
| `fortification` | Bastions, towers, walls |
| `tower` | Watchtowers |
| `bastion` | Bastions |
| `landmark` | Well-known landmarks |
| `city` | City centres or urban areas |
| `waterfront` | Harbours, promenades, waterfronts |
| `park` | Parks and gardens |
| `garden` | Formal gardens |
| `family` | Family-friendly spots |
| `entertainment` | Entertainment / nightlife areas |
| `film-set` | Locations used in film/TV |
| `engineering` | Notable engineering works |

---

## mapPoints

Every location needs at least one entry in `mapPoints`. Points are shown as navigation buttons in the modal — each one routes from the previous point, so the order matters.

### Point types

| Type | Button shown | Travel mode | When to use |
|---|---|---|---|
| `parking` | 🚗 Drive to Parking | Driving | Where to park the car/bus stop |
| `checkpoint` | 🚶 Walk to [label] | Walking | Visible mid-trail waypoint worth calling out |
| `destination` | 📍 [label] | Walking | The final spot |
| `waypoint` | *(hidden — no button)* | — | Invisible trail coords used internally |

**Routing logic:**
- First button → Google Maps routes from the user's current location
- Each subsequent button → routes *from the previous point* (e.g. parking → destination is a walking route starting at the parking coords)

---

**Single point (most locations):**
```json
"mapPoints": [
    {
        "label": "Final location",
        "description": "The cliff edge viewpoint.",
        "lon": 14.000000,
        "lat": 35.000000,
        "type": "destination"
    }
]
```

**Parking + destination:**
```json
"mapPoints": [
    {
        "label": "Parking area",
        "description": "Park here and follow the trail.",
        "lon": 14.344498,
        "lat": 35.920518,
        "type": "parking"
    },
    {
        "label": "Final location",
        "description": "The cliff edge viewpoint.",
        "lon": 14.345000,
        "lat": 35.921000,
        "type": "destination"
    }
]
```

**Parking + checkpoint + destination:**
```json
"mapPoints": [
    {
        "label": "Parking area",
        "description": "Park here.",
        "lon": 14.344498,
        "lat": 35.920518,
        "type": "parking"
    },
    {
        "label": "Trail junction",
        "description": "Turn left at the fork.",
        "lon": 14.344800,
        "lat": 35.920800,
        "type": "checkpoint"
    },
    {
        "label": "Final location",
        "description": "The viewpoint.",
        "lon": 14.345000,
        "lat": 35.921000,
        "type": "destination"
    }
]
```

**Adding hidden waypoints (trail path only, no button shown):**

Use `type: "waypoint"` for intermediate GPS coords that guide the routing internally but don't need their own button. Get the coords by clicking on the map in the app — the browser console logs `📍 lat: ..., lon: ...` on every tap.

```json
{ "lon": 14.399677, "lat": 35.844461, "type": "waypoint" }
```

---

## Optional: Recommended Route Image

If you have a screenshot of the route (e.g. from Google Maps or a trail app), add it to `src/assets/images/` and reference it:

```json
"recommendedRoute": "/assets/images/recommendedRoute-my-spot.png"
```

This shows a full-width image in the modal below the description, with a note that Google Maps isn't always accurate.

---

## Optional: Custom Instagram Reel

Once you film and publish a reel for the location, replace the default profile embed with the specific reel:

```json
"url": "https://www.instagram.com/reel/YOUR_REEL_ID/embed"
```

To get the embed URL: open the reel on Instagram → tap the three dots → Copy link → paste it here and add `/embed` at the end.

---

## Step 3 — Regenerate the Sitemap

Run this from the project root. It rebuilds `src/sitemap.xml` with all locations so Google can discover the new one.

```bash
python3 -c "
import json
from datetime import date
from urllib.parse import quote

with open('src/assets/locations.json') as f:
    data = json.load(f)

locs = data if isinstance(data, list) else data.get('locations', data)
today = date.today().isoformat()
BASE = 'https://johnfabiomb.com'

urls = ['  <url>\n    <loc>{}/</loc>\n    <lastmod>{}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>'.format(BASE, today)]

for loc in locs:
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

The new marker appears on the map automatically. Clustering, thumbnails, and icon preloading all handle themselves — no code changes needed.

---

## How to Get Coordinates

1. Open **Google Maps** on desktop
2. Right-click on the exact point
3. Click the coordinates at the top of the menu — they copy automatically
4. The format is `lat, lon` — put them in the right fields (Malta lat ≈ `35.8–36.1`, lon ≈ `14.2–14.6`)
