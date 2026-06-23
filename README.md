# Knights Developments — Website Redesign

Rebuild of the Knights Developments site in the style and functionality of four reference sites the client loves, keeping **projects front and centre**.

- **`CLAUDE.md`** — start here. Project brief, locked decisions, build instructions (auto-loaded by Claude Code).
- **`01-research/`** — per-site breakdowns (style, palette, type, functionality, code patterns) + curated screenshots. Every-frame contact `boards/` and the source recording are large and git-ignored (local only).
- **`02-plan/`** — blended brand direction, homepage spec, and the technical build spec.
- **`03-homepage/`** — the working homepage build. Open `03-homepage/index.html` in a browser.

## Run
Open `03-homepage/index.html` directly, or serve the folder:
```
cd 03-homepage && python -m http.server 8000   # then visit localhost:8000
```

## Stack
Static site — Lenis (smooth scroll) + GSAP/ScrollTrigger (reveals/parallax) + SplitText (kinetic type), via CDN. No Webflow.
