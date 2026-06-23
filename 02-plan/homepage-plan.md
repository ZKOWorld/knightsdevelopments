# Knights Developments — Redesign Direction & Homepage Plan

Synthesis of the four references into one coherent direction for Knights, with a section-by-section homepage spec. Built on one principle:

> **Projects are the product. Every screen either shows a project or leads to one.**

---

## 1. The blend — what we take from each

| From | We take |
|---|---|
| **Felix Nieto** | Cinematic tone; kinetic one-line hero statement; sans+serif display mix; scroll-linked parallax on photography; title-card page transitions. |
| **Halston** | The section blueprint (hero → statement → what-we-do → recognition → stats → philosophy → projects → CTA); warm earthy palette; a credibility/stats strip. |
| **Mersi** | The **Projects page**: editorial intro + **filter tabs** + warm image grid with name/label under each tile. |
| **Andre** | The **hover-linked project index** as a hero device; refined white space; project pages that pair photography with specs. |

**The shared engine (all four):** Lenis smooth scroll + scroll-driven reveals. We rebuild this clean with **Lenis + GSAP/ScrollTrigger + SplitText + a transition layer** — no Webflow.

---

## 2. Brand system (proposed)

**Palette — "rural luxury": Mersi's warmth + Halston's depth, kept calm like Andre.**

| Role | Hex | Rationale |
|---|---|---|
| Background (paper) | `#EDE7DE` / `#F4F1EA` | warm oatmeal (Mersi) — premium, not cold |
| Ink | `#1A1A1A` | near-black text |
| Primary accent | `#583939` | deep clay/brown (Halston) — heritage, country |
| Secondary accent | `#657B69` | sage (Mersi) — landscape, rural |
| Muted/borders | `#B3A696` | taupe |

**Typography — sans display + serif emphasis (Felix), or serif display (Andre) as an alt route.**
- Primary direction: bold grotesque display (à la `General Sans` / `Nohemi`) **+** a light serif for emphasis words.
- Alternative "heritage" direction: elegant serif display (à la `Sang`) + neutral sans UI.
- *(Final type choice is a design decision — both routes are mocked-up-able.)*

**Tone of voice:** understated, confident, premium. Reuse their line — *"unique homes in some of the most beautiful locations across Buckinghamshire."*

---

## 3. Information architecture

```
Home            ← projects-led, cinematic
Projects        ← filterable index (the heart) — by Status and Location
  └ Project     ← rich detail: story, key facts, gallery, plans/map, enquiry
About           ← story, philosophy, awards, stats, team
Contact         ← enquiry form + details
(Journal)       ← optional, later: news/updates (Halston-style)
```

Filters for the Projects index, straight from their data:
- **Status:** All · Launching Soon · Coming Soon · Under Construction · Sold
- **Location:** Marlow · Warfield · Seer Green · Wheathampstead · Amersham

---

## 4. Homepage — section-by-section spec

1. **Hero (projects-first).** Full-viewport. Two options to prototype:
   - *(A) Andre-style hover index* — development names listed, large photo swapping on hover, caption = location + status. Entire portfolio on screen one.
   - *(B) Felix-style cinematic statement* — kinetic one-liner (*"Unique luxury homes in the Buckinghamshire countryside"*) over a slow hero film, with a `SCROLL` cue, leading into the index.
   - **Recommendation:** open with (B) for 1 screen of mood, then immediately (A)/the grid — mood *then* product.

2. **Positioning statement** — kinetic masked-line reveal (Felix/Halston): *"Leading developers of luxury living — unique homes in the most beautiful locations across Buckinghamshire."*

3. **Featured / Selected Projects** — 3–4 hero developments, full-bleed photography with parallax, name + location + status + `VIEW`.

4. **Recognition strip** — **International Property Awards** (they've won "Best Residential Property UK"), logos/wording. Instant credibility (Halston move).

5. **Stats strip** — homes delivered, years building, locations, awards (staggered reveal or count-up).

6. **Philosophy** — one short, well-set paragraph on quality/materials/locations.

7. **Full project index teaser** — link into the filterable Projects page (Mersi style), with the filter tabs previewed.

8. **Enquiry CTA** — `Register your interest` / `Arrange a viewing` (warm clay panel).

9. **Footer** — contact, locations, social, email.

---

## 5. Motion & interaction spec (the "functionality")

| Effect | Where | Library | Feel (from boards) |
|---|---|---|---|
| Smooth scroll | global | Lenis | weighted, eased, momentum |
| Masked line reveal | headings | SplitText + ScrollTrigger | ~0.6–0.8s, stagger ~0.08s, power3.out |
| Image parallax | project photos | ScrollTrigger scrub | image moves ~15% slower than scroll |
| Hover image swap | hero index | vanilla + GSAP | crossfade ~0.2–0.4s |
| Filter grid | projects | GSAP | fade/scale ~0.4s |
| Stats reveal | stats strip | ScrollTrigger | staggered lines ~0.2s apart (or count-up upgrade) |
| Page transition | project open | Barba.js / custom | title-card cover → reveal |
| Hover states | buttons/links | CSS | underline/arrow reveal, colour/weight shift |

---

## 6. Project detail page (the real conversion moment)

Upgrade from today's "title + paragraph + gallery" to:
- Title-card intro (project name) → hero photo.
- **Key facts band:** location, status, completion, beds/baths, plot/acreage, awards.
- Story paragraph(s).
- **Cinematic gallery** with parallax (they already supply ~18 photos/project).
- Floor plans / site plan / location map (Andre-style pairing of imagery + drawings).
- **Enquiry CTA** specific to that development.
- Prev/next project navigation.

---

## 7. Build approach (to confirm before executing)

The homepage example can be delivered as either:
- **(A) A real, working static page** — `index.html` + CSS + JS with Lenis + GSAP wired up, real scroll/hover/parallax, openable in a browser. Closest to the references; becomes the actual foundation.
- **(B) A static design mockup** — the layout/sections/style with limited interactivity; faster to iterate visually, but not the real motion.

**Recommendation: (A)** — the whole point of this brief is the *functionality*, and a working page is the most honest way to show Matt/the client the feel. We can use placeholder imagery from Knights' existing projects.

> **Next step:** confirm (1) build approach A vs B, (2) hero direction (A hover-index, B cinematic statement, or the recommended B→A combo), and (3) type route (bold-sans vs heritage-serif). Then I build the homepage into `03-homepage/`.
