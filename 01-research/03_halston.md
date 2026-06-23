# Reference 02 — Halston (Architecture Template)

**URL:** https://halston-architecture-template.webflow.io · **Recording:** 0:00 – 1:14 · **Boards:** `boards/01-halston/` · **Stills:** `screenshots/halston/`

> *Why it's here: "love the style, branding, use of space & functionality."*

A premium Webflow template (by **Metrik Studio**) for an architecture studio. Where Felix Nieto gives us *cinematic mood*, Halston gives us **structure and credibility blocks** — the proven section order for a studio/developer site: hero → services → recognition → stats → philosophy → selected projects → consultation CTA.

---

## Tech stack

| Layer | Library |
|---|---|
| Build | Webflow |
| Smooth scroll | **Lenis** |
| Animation | **GSAP + ScrollTrigger** |
| Utility | jQuery (Webflow dep) |

Same family as Felix Nieto, minus Barba/SplitText.

---

## Visual identity

**Palette — warm stone/greige with a deep clay accent**

| Swatch | Hex | Use |
|---|---|---|
| Warm stone | `#DBDAD8` | page background |
| Near-black | `#171615` | text |
| Deep clay/brown | `#583939` | accent panels, hovers |
| Muted mauve | `#694D4D` | secondary accent |
| Light stone | `#B8B7B0` | dividers / muted text |

Noticeably **warmer and earthier** than a typical white architecture site — closer to the Knights "rural luxury" world than a cold modernist palette.

**Typography**
- **Display:** `General Sans` — clean grotesque, weight 500, **UPPERCASE**, very large (≈162px). Used for one-idea-per-screen statements.
- Tight, confident headline setting; generous section padding.

---

## Page structure (the reusable blueprint)

1. **Hero** — `BESPOKE LIVING / DEFINED BY CLARITY` over a slow, almost-still interior film. Menu reveals `ABOUT · SERVICES · DISCIPLINES · PROJECTS · JOURNAL · MORE`.
2. **Statement reveal** — `CONSIDERED · CRAFTED · LASTING SOLUTIONS` then `ARCHITECTURE / INTERIOR DESIGN / SOLUTIONS` revealing word-by-word.
3. **Services trio** — Architecture / Interior Design / Renovation, each with an `EXPLORE` hover.
4. **Recognition** — award names (DAM Preis 2026, Architizer A+, Mies van der Rohe Shortlist).
5. **Stats block** — `96% Satisfaction · 48+ Awards · Since 2012 · 180+ Projects · 12 Countries`.
6. **Studio philosophy** — a paragraph about the practice's approach.
7. **Selected Projects** — large architectural imagery gallery.
8. **Consultation CTA** — `AN EXPERT CONSULTATION` / book-a-call block.
9. **Journal** — articles/blog.

---

## Functionality & motion (measured from the boards)

- **Smooth scroll (Lenis)** throughout.
- **Stats reveal — staggered line entrance, NOT a count-up (board 10):** the figures appear already at final value (96%, 48+, 180+…). Each line **fades + slides up in sequence**, roughly **0.2s apart** as the block enters the viewport. (Note for us: if we *want* an actual rolling count-up, that's an easy upgrade — see code below.)
- **Statement word reveal:** `ARCHITECTURE / INTERIOR DESIGN / SOLUTIONS` lines wipe up from a mask on scroll, staggered — a ScrollTrigger reveal (same mechanic as Felix, no SplitText needed if the lines are separate elements).
- **Hero film:** a very slow, near-static loop / parallax — calm, expensive-feeling, not a busy video.
- **Service & project hovers:** image zoom + `EXPLORE` label fade-in; clay-coloured panels on hover.

---

## How to recreate it (code patterns)

**Staggered line reveal (what Halston actually does)**
```js
gsap.from('.stat-line', {
  y: 24, autoAlpha: 0, duration: 0.6, ease: 'power2.out', stagger: 0.2,
  scrollTrigger: { trigger: '.stats', start: 'top 75%' }
});
```

**Optional upgrade — real number count-up**
```js
document.querySelectorAll('.stat-num').forEach(el => {
  const target = +el.dataset.to;            // e.g. 180
  ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter(){
    gsap.fromTo(el, { val: 0 }, { val: target, duration: 1.4, ease: 'power1.out',
      onUpdate(){ el.textContent = Math.round(this.targets()[0].val); } });
  }});
});
```

**Hover image zoom + label**
```css
.service { overflow: hidden; }
.service img { transition: transform .6s ease; }
.service:hover img { transform: scale(1.06); }
.service .explore { opacity: 0; transition: opacity .4s ease; }
.service:hover .explore { opacity: 1; }
```

---

## What to borrow for Knights
- **The section blueprint** is gold: hero → positioning statement → what-we-do → **recognition (Knights has International Property Awards!)** → stats → philosophy → **projects** → enquiry CTA → journal. We can map Knights' content straight onto this order.
- The **warm stone/clay palette** sits perfectly with rural-luxury property and is friendlier than cold white.
- A **stats/recognition strip** gives Knights instant credibility (awards won, homes delivered, years building).
- **Calm, slow hero film** rather than a busy slideshow — feels premium.
