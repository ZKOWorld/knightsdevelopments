# Knights Developments — Website Redesign (project brief for Claude Code)

You are picking up a website redesign for **Knights Developments**, a luxury property developer building unique homes in the Buckinghamshire commuter-belt countryside. This file is the handoff: read it first, then the docs it points to.

## The goal
Rebuild Knights' site in the style and with the functionality of four reference sites the client loves, while keeping **projects front and centre** — projects are the product; every screen either shows a project or leads to one.

## Confirmed decisions (locked with the client)
- **Deliverable:** a real, working, hand-built static homepage (no Webflow / no heavy build tooling). It must demonstrate the actual motion/feel.
- **Hero:** cinematic statement → project index. One screen of mood (kinetic one-liner over a slow hero), then drop straight into the project index.
- **Type:** bold grotesque sans display + a light serif for emphasis words (Felix Nieto / Halston feel).
- **Loading-in state:** recreate Felix Nieto's loader — full-screen dark `#1A1A1A` overlay, centred off-white wordmark, a small off-white square as a GSAP-driven progress indicator, then a `clip-path` wipe-up that reveals the hero while the headline lines mask up and Lenis initialises.
- **Engine (same as all four references):** Lenis (smooth scroll) + GSAP + ScrollTrigger (reveals/parallax) + SplitText (kinetic type). Page transitions later via a custom title-card fader (Barba optional once multi-page).

## Read these first (in `01-research/` and `02-plan/`)
- `01-research/00_README_index.md` — overview + how the reference recording maps to sites.
- `01-research/01_knights-developments_current-site.md` — **the client's real content: full project list, locations, statuses, brand copy, contact.**
- `01-research/02_felix-nieto.md` — primary style/scroll/transition reference (a real-estate art director — most relevant). Includes the loader anatomy.
- `01-research/03_halston.md` — section blueprint, warm palette, stats/recognition.
- `01-research/04_mersi.md` — the Projects page model: editorial intro + filter tabs + warm grid.
- `01-research/05_andre.md` — hover-linked project index (the homepage hero device).
- `02-plan/homepage-plan.md` — blended brand direction + section-by-section homepage spec.
- `02-plan/homepage-build-spec.md` — the technical build approach (libraries, loader timeline, file structure, motion timings).
- `02-plan/projects-page-plan.md` — the Projects page: Mersi-style filterable grid (filter by status + location), tile spec, all 15 projects mapped, filter code.

## Brand system (starting point — see plan for detail)
- **Palette:** background oatmeal `#F4F1EA` / `#EDE7DE`; ink `#1A1A1A`; primary accent deep clay `#583939`; secondary sage `#657B69`; muted taupe `#B3A696`.
- **Type:** bold sans display + light serif accent (Google-hosted stand-ins until licensed faces chosen).
- **Tone:** understated, premium, heritage. Reuse: *"unique homes in some of the most beautiful locations across Buckinghamshire."*

## Homepage section order (build target)
1. Loader → Hero (cinematic one-liner + `SCROLL` cue)
2. Positioning statement (masked line reveal)
3. **Project index** (Andre-style hover: names list + large photo crossfading on hover; caption = location + status) — uses the real projects from doc 01
4. Selected projects (full-bleed photos, scroll parallax)
5. Recognition (International Property Awards — they've won "Best Residential Property UK")
6. Stats (homes delivered / years / locations / awards — staggered reveal)
7. Enquiry CTA (clay panel — "Register your interest")
8. Footer (contact, locations, enquiries@knightsdevelopments.com)

## Motion timings (measured from the reference recording)
Smooth scroll (Lenis, ~1.1 duration) · masked line reveals ~0.6–0.8s, stagger ~0.08s, power3.out · image parallax scrub ~15% · hover image crossfade ~0.2–0.4s · staggered stats ~0.2s apart · button hover = underline/arrow reveal.

## Where things live
- `03-homepage/` — the build. A running skeleton is already scaffolded (`index.html`, `css/style.css`, `js/main.js`) with Lenis + GSAP wired, the loader, the hero, and the hover project index working against placeholder imagery. Continue building the remaining sections and swap placeholders for real assets.
- `03-homepage/assets/` — drop real Knights photography + logo SVG here (~18 photos per project exist; not yet added).
- `01-research/screenshots/` — curated full-res stills of each reference site (committed).
- `01-research/boards/` and the `*.mp4` recording — **large local-only reference, git-ignored.** They live on the original machine: every frame of the reference recording on labelled contact boards (frame index + timestamp → exact animation timing). Not in the repo.

## Build conventions
- Keep it a static site that opens directly in a browser (libraries via CDN are fine to start; can be bundled later).
- Progressive enhancement: real HTML content first, motion layered on top. Respect `prefers-reduced-motion`.
- Don't copy any code from the reference sites — rebuild the patterns from scratch (the docs give the patterns).
