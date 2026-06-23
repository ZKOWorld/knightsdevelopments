# Reference 03 — Mersi Architecture

**URL:** https://www.mersi-architecture.com/projets · **Recording:** 2:50 – 3:36 · **Boards:** `boards/03-mersi/` · **Stills:** `screenshots/mersi/`

> *Why it's here: "love the projects page & overall functionality."*

Mersi is an **interiors studio**, and we were sent straight to its **`/projets` page** — this is our primary reference for **how the project index itself should look and behave**: a big editorial intro, **category filtering**, and a warm, image-led grid.

---

## Tech stack

| Layer | Library |
|---|---|
| Build | Webflow |
| Smooth scroll | **Lenis** |
| Animation | **Webflow IX2** (native interactions — no GSAP) |
| Utility | jQuery (Webflow dep) |

Worth noting: Mersi proves you **don't need GSAP** for a beautiful result — Webflow's native IX2 + Lenis is enough here. In our hand-built version we'd still use GSAP/ScrollTrigger because it's more flexible, but the bar is "looks like this," not "uses that."

---

## Visual identity

**Palette — warm oatmeal with sage & taupe (very "natural materials")**

| Swatch | Hex | Use |
|---|---|---|
| Oatmeal/sand | `#EDE7DE` | page background |
| Near-black | `#1A1A1A` | text |
| Sage green | `#657B69` | accent |
| Olive | `#80865F` | accent |
| Warm taupe | `#B3A696` | filter panel / muted blocks |
| Sand | `#CCB598` | secondary |

**Typography**
- **Display:** `Doner` — a heavy, slightly condensed display face, weight 700, **UPPERCASE**. Big and punchy (the stacked `MERSI` logomark uses it too).
- **Body/UI:** `Switzer` (variable) — clean neutral sans for labels, filters, captions.
- The pairing = bold characterful headline + quiet functional UI. Easy to reproduce (both are free-ish/available faces, or close substitutes exist).

---

## The projects page (the bit we want)

1. **Editorial intro** — huge centred statement `QUIET LUXURY / INTERIORS SHAPED / BY TRUE STORIES`, set in Doner, lots of space above the grid.
2. **Filter tabs** — a taupe pill containing `Résidentiel · Retail · Hospitality`. Clicking filters the grid in place.
3. **Horizontal teaser strip** — a row of project thumbnails that scrolls horizontally (a marquee/strip) under the intro.
4. **Main project grid** — a warm, slightly irregular grid of project tiles. Each tile = full-bleed interior photo with the **project name + category label** beneath (e.g. *Naya — Résidentiel*, *Maurice Cafe St-Honoré — Hospitality*, *Berri — Résidentiel*).
5. **Project detail** — full-bleed photography with simple stat figures (e.g. `120` / `20`) and minimal captions.

---

## Functionality & motion

- **Smooth scroll (Lenis)** throughout.
- **Category filtering** — `Résidentiel / Retail / Hospitality` filter the grid without a page load; tiles animate out/in. This maps *directly* onto Knights' statuses/locations.
- **Grid reveal on scroll** — tiles fade/rise as they enter the viewport, lightly staggered.
- **Hover** — image scale/!brightness shift on tiles; name/label emphasis.
- **Horizontal scroll strip** — a secondary motion texture; nice but optional.

---

## How to recreate it (code patterns)

**Filterable grid (vanilla, no framework)**
```js
const tabs = document.querySelectorAll('.filter');
const tiles = document.querySelectorAll('.project');
tabs.forEach(tab => tab.addEventListener('click', () => {
  const cat = tab.dataset.cat;                          // 'all' | 'sold' | 'marlow' ...
  tabs.forEach(t => t.classList.toggle('is-active', t === tab));
  tiles.forEach(tile => {
    const show = cat === 'all' || tile.dataset.cat.includes(cat);
    gsap.to(tile, { autoAlpha: show ? 1 : 0, scale: show ? 1 : 0.96, duration: 0.4,
      onStart(){ if (show) tile.style.display = ''; },
      onComplete(){ if (!show) tile.style.display = 'none'; } });
  });
}));
```

**Staggered grid entrance**
```js
gsap.from('.project', {
  y: 40, autoAlpha: 0, duration: 0.7, ease: 'power2.out', stagger: 0.06,
  scrollTrigger: { trigger: '.grid', start: 'top 80%' }
});
```

**Horizontal teaser strip (scroll-driven)**
```js
gsap.to('.strip-track', {
  xPercent: -50, ease: 'none',
  scrollTrigger: { trigger: '.strip', start: 'top bottom', end: 'bottom top', scrub: true }
});
```

---

## What to borrow for Knights
- **This is the model for Knights' Projects page.** Big editorial intro line + **filter tabs** (Knights' natural filters: *All · Launching Soon · Coming Soon · Sold*, and/or by location *Marlow · Warfield · Seer Green · Amersham · Wheathampstead*) + a warm image-led grid with name + status under each tile.
- The **oatmeal/sage/taupe natural palette** is a strong candidate for Knights' rural-luxury brand (warmer than Andre's stark white, less editorial-magazine than Felix).
- **Category labels under tiles** = Knights' status/location badges.
