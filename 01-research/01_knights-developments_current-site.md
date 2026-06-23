# Knights Developments — Current Site (the client's existing website)

**URL:** https://knightsdevelopments.com · **Platform:** WordPress (jQuery, Contact Form 7, reCAPTCHA, "portfolio" custom post type)

This is what we're replacing. It's clean and content-light. Everything below is content we must carry across to the new build — **the projects are the entire site today, and they must stay the hero of the new one.**

---

## Who they are (brand / copy to reuse)

> "We are leading developers of luxury living, creating unique homes in some of the most beautiful locations across Buckinghamshire. All our projects are finished to the highest of standards only using the very finest materials and fixtures & fittings for our discerning clients."

> "At Knights Developments we specialise in unique, luxury properties, set within stunning rural locations in the commuter belt countryside."

Positioning: **luxury rural homes, Buckinghamshire commuter belt.** Tone: understated, premium, heritage.

---

## Site structure (current)

Four pages only: **Home · Projects · About Us · Contact**

### Home
A single full-bleed **grid of projects**. Each tile = project name + location + a `VIEW` link. No hero statement, no story, no differentiation — just tiles. Functional but flat.

### Projects (`/properties/`)
The same grid, with a **status line** added under each name. This is the core of the business.

### Project detail (`/portfolio/{slug}/`)
Minimal template: **project title → location → one short paragraph → image gallery (~18 images).** That's it. No spec, no plan, no map, no enquiry hook on the page. Example (Huxley Hall):
> "A new build mansion set in ten acres of grounds in rural Marlow, just 1.5 miles from the thriving high street. This incredible property won 3 prestigious accolades at the International Property Awards, including Best Residential Property United Kingdom."

### About Us (`/company-profile/`)
Two short paragraphs (above). Plus social links.

### Contact (`/contact/`)
Email **enquiries@knightsdevelopments.com**, social links, and a simple Contact Form 7 form: **Name · Email · Message** (+ reCAPTCHA).

---

## The full project catalogue (carry all of this across)

| Project | Location | Status |
|---|---|---|
| Bramblewood Place | Marlow | 2 new homes, launching soon |
| Huxley Hall | Marlow | Country manor, completion 2026 |
| Foxleigh Place | Warfield | 5 new homes, launching soon |
| Foxleigh Farmhouse | Warfield | New home, launching soon |
| Brockwell Barn | Marlow | Country house, completion 2027 |
| Maplebrook Manor | Seer Green | Completion spring 2027, sold |
| Bibbs Hall Barns | Wheathampstead | 3 new homes, all sold |
| Bibbs Hall Farmhouse | Wheathampstead | Sold |
| The Willows | Marlow | Coming soon |
| Windmill Farm | Warfield | Coming soon |
| Broadleaves | Seer Green | Sold |
| Elmhurst Hall | Seer Green | Sold |
| Great Meadow Barn | Amersham | Sold |
| The Farmhouse | Amersham | Sold |
| The Old Tythe Barn | Amersham | Sold |

**Locations:** Marlow, Warfield, Seer Green, Wheathampstead, Amersham.
**Status types (useful as filters/badges):** Launching Soon · Coming Soon · Completion 2026/2027 · Sold.

---

## What's missing today (the opportunity)

The current site lists projects but never **sells** them. The redesign should keep the project-first principle but add the things the reference sites do so well:

- A **hero statement** that positions Knights in one cinematic line (cf. Felix Nieto, Halston).
- A **richer project index** with filtering by status/location and hover-reveal imagery (cf. Mersi, Andre).
- **Proper project pages** — story, key facts (beds, acreage, completion, awards), gallery, map, and a clear enquiry CTA.
- **Credibility cues** — awards (they have International Property Award wins!), stats, testimonials (cf. Halston, Felix).
- **Motion & polish** — smooth scroll, scroll-reveal, page transitions (the whole point of this exercise).

---

## Assets we already have
- 15 projects with names, locations, statuses.
- ~18 photos per completed project.
- Award credentials (International Property Awards — "Best Residential Property UK", 3 accolades on Huxley Hall alone).
- Brand copy and contact details.

---

## Page slugs & image assets (for the rebuild)

The site is WordPress; project pages live at `/portfolio/{slug}/` and images at `https://knightsdevelopments.com/wp-content/uploads/…`. Note a couple of slugs don't match the display name:

| Project | Page slug (`/portfolio/…`) |
|---|---|
| Bramblewood Place | `bramblewood-place` |
| Huxley Hall | `huxley-hall` |
| Foxleigh Place | `foxleigh-place` |
| Foxleigh Farmhouse | `foxleigh-farmhouse` |
| Brockwell Barn | `brockwell-barn` |
| Maplebrook Manor | `maplebrook-manor` |
| **Bibbs Hall Barns** | `highlands-farm-barns` ⚠️ name/slug mismatch |
| Bibbs Hall Farmhouse | `bibbs-hall-farmhouse` |
| The Willows | `the-willows` |
| Windmill Farm | `windmill-farm` |
| **Broadleaves** | `broadleaves-long-grove-seer-green` |
| **Elmhurst Hall** | `elmhurst-seer-green` |
| Great Meadow Barn | `great-meadow-barn` |
| The Farmhouse | `the-farmhouse` |
| The Old Tythe Barn | `the-old-tythe-barn` |

- Each project page renders its gallery server-side (WPBakery), so all image URLs are scrapeable from the page HTML.
- Image sizes vary (e.g. `-1000x660`, `-2000x1320`); higher-res originals may exist by stripping the size suffix.
- **International Property Award badges** are separate PNGs (`UK_2025_DEV_*`, `UK_2025_ARC_*`) — worth featuring prominently in the rebuild's recognition strip.
- **Download:** `tools/download-knights-images.ps1` pulls every project's images into a folder per project (run on a machine that can reach the site).
