# Knights Developments — Projects Page Plan

The projects page is the heart of the site — it's what the current site basically *is*, and it's the page that has to do the selling. Direction: **Mersi-style filterable grid**, filterable by **status** and **location**, with the warm Knights palette and the same motion engine as the homepage.

References: `01-research/04_mersi.md` (grid + filtering) and `01-research/05_andre.md` (hover reveal on tiles). Data: `01-research/01_knights-developments_current-site.md`.

---

## 1. Goals
- Show **all 15 developments** at a glance, beautifully.
- Let people cut straight to what's relevant: *what can I buy/see, and where.*
- Make every tile feel like a property worth enquiring about (the current site's tiles are flat — fix that).
- Lead naturally into rich individual **project pages**.

---

## 2. Page structure (top to bottom)

1. **Editorial intro** — a large Mersi-style statement set in the bold display face, lots of space. e.g.
   *"Unique luxury homes, shaped by their landscape."* with a one-line sub: *"Fifteen developments across the Buckinghamshire countryside."*
2. **Filter bar** — two groups of tabs in a warm taupe panel:
   - **Status:** All · Launching Soon · Coming Soon · Completion 2026/27 · Sold
   - **Location:** All · Marlow · Warfield · Seer Green · Wheathampstead · Amersham
   - A live **count** ("Showing 6 of 15") updates as filters change.
3. **Project grid** — responsive masonry-ish grid of tiles (see tile spec). Tiles animate in/out on filter.
4. **Footer CTA** — "Can't see what you're looking for? Register your interest." → contact.

---

## 3. Tile (project card) spec
- Full-bleed cover photo, `4:5` portrait or `3:2` — consistent ratio across all tiles.
- **Hover:** image gently scales (~1.05) + warms; an `VIEW` / arrow label fades in (Andre/Mersi behaviour). Optional second image crossfade if a project has a strong interior shot.
- **Below the image:** Project name (display face) · location · **status badge** (colour-coded: green = available/launching, clay = coming soon, muted/struck = sold).
- Entire tile is one link to the project page.
- Sold projects stay visible (portfolio credibility) but read as "Sold" — slightly desaturated.

---

## 4. The data (all 15, ready to wire)

| # | Project | Location | Status | data-status | data-loc |
|---|---|---|---|---|---|
| 1 | Bramblewood Place | Marlow | 2 new homes, launching soon | launching | marlow |
| 2 | Huxley Hall | Marlow | Country manor, completion 2026 | completion | marlow |
| 3 | Foxleigh Place | Warfield | 5 new homes, launching soon | launching | warfield |
| 4 | Foxleigh Farmhouse | Warfield | New home, launching soon | launching | warfield |
| 5 | Brockwell Barn | Marlow | Country house, completion 2027 | completion | marlow |
| 6 | Maplebrook Manor | Seer Green | Completion spring 2027, sold | sold | seer-green |
| 7 | Bibbs Hall Barns | Wheathampstead | 3 new homes, all sold | sold | wheathampstead |
| 8 | Bibbs Hall Farmhouse | Wheathampstead | Sold | sold | wheathampstead |
| 9 | The Willows | Marlow | Coming soon | coming | marlow |
| 10 | Windmill Farm | Warfield | Coming soon | coming | warfield |
| 11 | Broadleaves | Seer Green | Sold | sold | seer-green |
| 12 | Elmhurst Hall | Seer Green | Sold | sold | seer-green |
| 13 | Great Meadow Barn | Amersham | Sold | sold | amersham |
| 14 | The Farmhouse | Amersham | Sold | sold | amersham |
| 15 | The Old Tythe Barn | Amersham | Sold | sold | amersham |

Default order: live/launching first, then coming soon, then completion, then sold (sell the available, prove the track record below).

---

## 5. Filtering behaviour
- **Two independent filter groups** (status AND location) combine — e.g. "Launching Soon" + "Marlow" → Bramblewood Place.
- Filtering is **client-side, no page reload**; tiles fade/scale out, surviving tiles reflow with a quick stagger.
- Empty state: a tasteful "No developments match — view all" reset.
- Filters reflect in the URL (`?status=launching&loc=marlow`) so views are shareable/bookmarkable.
- Mobile: filters collapse into two dropdowns.

---

## 6. Motion (same engine: Lenis + GSAP + ScrollTrigger)
- Grid tiles reveal on scroll, staggered ~0.06s, `power2.out`.
- Filter transition: out (fade+scale 0.96, ~0.3s) → reflow → in (~0.4s).
- Tile hover: image scale + label fade (CSS, ~0.5s).
- Smooth scroll throughout; respects `prefers-reduced-motion`.

---

## 7. How it's coded (vanilla + GSAP)

```html
<div class="filters">
  <div class="filter-group" data-group="status">
    <button data-val="all" class="is-active">All</button>
    <button data-val="launching">Launching Soon</button>
    <button data-val="coming">Coming Soon</button>
    <button data-val="completion">Completion 2026/27</button>
    <button data-val="sold">Sold</button>
  </div>
  <div class="filter-group" data-group="loc"> … Marlow / Warfield / … </div>
  <span class="filter-count"></span>
</div>

<div class="grid">
  <a class="tile" href="/projects/bramblewood-place" data-status="launching" data-loc="marlow"> … </a>
  …
</div>
```

```js
const state = { status: 'all', loc: 'all' };
const tiles = [...document.querySelectorAll('.tile')];

function apply() {
  let shown = 0;
  tiles.forEach(t => {
    const ok = (state.status === 'all' || t.dataset.status === state.status)
            && (state.loc    === 'all' || t.dataset.loc    === state.loc);
    if (ok) shown++;
    gsap.to(t, { autoAlpha: ok ? 1 : 0, scale: ok ? 1 : 0.96, duration: 0.35,
      onStart(){ if (ok) t.style.display = ''; },
      onComplete(){ if (!ok) t.style.display = 'none'; } });
  });
  document.querySelector('.filter-count').textContent = `Showing ${shown} of ${tiles.length}`;
  const p = new URLSearchParams(); if(state.status!=='all')p.set('status',state.status); if(state.loc!=='all')p.set('loc',state.loc);
  history.replaceState(null,'',p.toString()?`?${p}`:location.pathname);
}

document.querySelectorAll('.filter-group').forEach(group => {
  group.addEventListener('click', e => {
    const btn = e.target.closest('button'); if(!btn) return;
    group.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b === btn));
    state[group.dataset.group] = btn.dataset.val;
    apply();
  });
});
// init from URL
const q = new URLSearchParams(location.search);
state.status = q.get('status') || 'all'; state.loc = q.get('loc') || 'all';
apply();
```

```js
// reveal on scroll
gsap.from('.tile', { y: 40, autoAlpha: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06,
  scrollTrigger: { trigger: '.grid', start: 'top 80%' } });
```

---

## 8. → Project detail page (where it leads)
Each tile opens a rich project page (spec in `02-plan/homepage-plan.md` §6): title-card intro → hero photo → key facts band (location, status, completion, beds, acreage, awards) → story → cinematic gallery with parallax → plans/map → enquiry CTA → prev/next. The downloaded imagery (`tools/download-knights-images.ps1`) supplies the galleries.

---

## 9. Build notes
- Static page `03-homepage/projects.html` sharing the site's CSS/JS; grid data can be hand-written now and moved to a CMS/JSON later.
- Use the downloaded project images as tile covers (pick the strongest hero per project).
- Accessibility: filters are real `<button>`s, tiles are real links, status conveyed in text (not colour alone).
