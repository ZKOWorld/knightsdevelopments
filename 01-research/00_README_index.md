# Knights Developments — Website Redesign Research

Research pack for the Knights Developments site redesign. The goal: keep Knights' **projects front and centre** (they are the product), but rebuild the experience in the style and with the functionality of four reference sites we love.

---

## What's in this folder

```
websites/
├── CLAUDE.md                       (handoff brief — auto-loaded by Claude Code)
├── README.md                       (repo overview)
├── 01-research/
│   ├── 00_README_index.md          ← you are here
│   ├── 01_knights-developments_current-site.md   (the client's existing site)
│   ├── 02_felix-nieto.md           (reference — style, scroll, transitions, loader)
│   ├── 03_halston.md               (reference — style, structure, counters)
│   ├── 04_mersi.md                 (reference — projects page, filtering)
│   ├── 05_andre.md                 (reference — projects index, hover swap)
│   ├── screenshots/                (curated full-res stills, per site — in repo)
│   ├── boards/                     (EVERY frame of the recording, on contact boards — local only)
│   └── recordings/                 (the source screen recording — local only)
├── 02-plan/
│   ├── homepage-plan.md            (blended direction + homepage section spec)
│   ├── homepage-build-spec.md      (technical build approach + Felix loader)
│   └── projects-page-plan.md       (filterable grid: status + location)
├── 03-homepage/                    (the working homepage build: index.html + css + js)
└── tools/
    └── download-knights-images.ps1 (downloads every project's images, organised by project)
```

### Screenshots vs Boards
- **`screenshots/`** — a handful of clean, full-resolution stills per site for quick reference.
- **`boards/`** — contact sheets containing **every frame** of the screen recording, 30 frames per board, each thumbnail labelled with its frame index (`f0, f1…`) and timestamp. Because the recording is ~29 fps, you can **count frames across any animation to read its exact duration** (frames ÷ 29 = seconds). 289 boards total.

---

## The recording — what's where (source: `Halston…2026-06-23 09-48-01.mp4`, 2560×1392, ~29 fps, 4:41)

| Time | Site | Boards folder |
|---|---|---|
| 0:00 – 1:14 | **Halston** | `boards/01-halston/` |
| 1:14 – 2:48 | **Felix Nieto** | `boards/02-felix-nieto/` |
| 2:50 – 3:36 | **Mersi** | `boards/03-mersi/` |
| 3:38 – 4:00 | **Andre** | `boards/04-andre/` |
| 4:00 – 4:41 | "Luxe Estates" + repeat passes of Halston/Andre | `boards/05-extra-luxe-estates/` |

(To convert a board's local time to video time, add the folder's start time above.)

---

## The single most important finding

Three of the four reference sites are built on the **exact same modern stack**, and it is the stack that produces "the scroll", "the buttons", "the layering", "the transitions" we love:

| Site | Platform | Smooth scroll | Animation engine | Page transitions |
|---|---|---|---|---|
| Felix Nieto | Webflow | **Lenis** | **GSAP + ScrollTrigger + SplitText** | **Barba.js** |
| Halston | Webflow | **Lenis** | **GSAP + ScrollTrigger** | (Webflow native) |
| Mersi | Webflow | **Lenis** | Webflow IX2 (no GSAP) | (Webflow native) |
| Andre | Custom build | **Lenis** | Custom / GSAP-style | Custom |

**Takeaway for Knights:** the "feel" of all four is achievable with one well-understood, free, open-source toolset — **Lenis (smooth scroll) + GSAP/ScrollTrigger (scroll-driven animation) + SplitText (kinetic type) + a page-transition layer (Barba.js or a custom fader)**. None of this requires Webflow; it drops into a clean hand-built site. We are not copying any code — we are rebuilding these well-known patterns from scratch.

See each site's doc for the specific patterns and how to code them.
