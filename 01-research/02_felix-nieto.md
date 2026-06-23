# Reference 01 — Felix Nieto

**URL:** https://www.felix-nieto.com · **Recording:** 1:14 – 2:48 · **Boards:** `boards/02-felix-nieto/` · **Stills:** `screenshots/felix-nieto/`

> *Why it's here: "love the style, branding, use of space & functionality. Love the scrolling functionality."*

**The most relevant reference of the four** — Felix Nieto is an art director for **high-end real estate developments**. His own line is literally *"Cinematic visual narratives for high-end real estate developments."* The content problem he's solving (selling property through imagery and story) is Knights' exact problem. If we lead the new Knights site on anyone's playbook, it's this one.

---

## Tech stack (confirmed from the live DOM)

| Layer | Library | Notes |
|---|---|---|
| Build | **Webflow** | hosting/CMS only — irrelevant to us, we rebuild clean |
| Smooth scroll | **Lenis** | the buttery, weighted scroll feel |
| Animation | **GSAP 3.15.0** + **ScrollTrigger** | scroll-driven reveals, pins, parallax |
| Kinetic type | **GSAP SplitText** | splits headings into lines/words/chars to animate |
| Page transitions | **Barba.js** | the seamless page-to-page changes + project "title card" intros |
| Utility | jQuery 3.5.1 | Webflow dependency; not needed in a modern rebuild |

This is the canonical "awwwards agency" stack. Everything below is reproducible with it.

---

## Visual identity

**Palette — warm, gallery-like, with a cinematic teal accent**

| Swatch | Hex | Use |
|---|---|---|
| Off-white paper | `#F9F8F5` | page background |
| Near-black ink | `#131313` | body + display text |
| Muted aqua (light) | `#96C4C8` | accent / hover / highlights |
| Cinematic teal | `#6CAFBF` | secondary accent |

**Typography — sans + serif pairing at huge sizes**
- **Display:** `Nohemi` — geometric sans, weight 500, **UPPERCASE**, set massive (≈144px desktop). The workhorse.
- **Accent display:** `Merchant` — a light (300) serif, mixed *into* the same headline for emphasis words (e.g. an italic-feeling serif word inside a sans headline). This sans/serif mix is a signature move.
- Generous letter-spacing control, very large line-height steps, lots of negative space.

**Use of space:** big, confident, lots of breathing room; type often spans the full viewport width; single ideas per screen.

---

## Page structure (section by section)

1. **Hero** — kinetic headline `ART / DIRECTION / & VISUAL / STRATEGY` stacked, with a `SCROLL` cue. Sub-line: *"Cinematic visual narratives for high-end real estate developments."* Nav: `WORK · ABOUT · CONTACT` + `GET IN TOUCH`.
2. **Statement / kinetic type** — `TRANSFORMING [CINEMATIC] PROPERTIES INTO [VISUAL] NARRATIVES`, the words revealing/animating as you scroll (sans + serif mix). Pinned, scrubbed.
3. **Selected work** — project showcase: each project = full-bleed cinematic still + `VIEW PROJECT`, name (KENSHO / SANCTUARY / PANORAMAH), role ("Creative Direction & Film Production") and year.
4. **Testimonials** — `WHAT PEOPLE SAY ABOUT ME`, quote cards.
5. **CTA / footer** — `LET'S WORK TOGETHER`, links.
6. **Project pages** — full-screen imagery with parallax; intro "title card" showing the project name on enter (Barba).

---

## Functionality & motion (measured from the boards)

- **Smooth scroll (Lenis):** the whole site scrolls with weight/inertia — momentum carries and eases out rather than snapping. This single thing is ~50% of "the feel".
- **Kinetic headline reveal (SplitText + ScrollTrigger):** headings split into lines; each line slides up from a clipped mask with a small stagger. On the boards the reveal of a multi-line heading plays over roughly **15–25 frames (~0.5–0.8s)** with a stagger of a few frames per line — an `ease: power3.out` feel.
- **Scroll-linked parallax on imagery (board 26):** project stills scale/shift slightly slower than the scroll — a classic ScrollTrigger `scrub` parallax. The image is revealed from a clip-path/mask as it enters.
- **Barba page transitions:** moving into a project doesn't hard-reload — an overlay/title-card covers the screen, the new page mounts underneath, then the cover wipes away revealing the project. Gives the "title card" intro feel (e.g. a project name flashes full-screen — `TELHA CLARKE`).
- **Buttons / links:** understated; hover changes weight/colour or reveals an underline/arrow; magnetic-ish cursor proximity on CTAs.

---

## The loading-in state (loader) — inspected from the live DOM

The client specifically loves Felix's loader. Its exact anatomy:
- **`.loader_wrap`** — a full-screen `position:fixed`, `z-index:9999` overlay, background **`#131313`** (dark near-black, not the off-white paper).
- **`.loader_logo`** — a centred **off-white SVG wordmark** (318×56px), the "FELIX" mark, fill in the paper colour.
- **`.loader_square_wrap` + `.loader_square_icon`** — a small **14×14px off-white (`#F9F8F5`) square** that GSAP animates as a progress / wipe indicator beneath the wordmark (no CSS animation — driven by JS transforms).
- **Exit:** on load-complete the dark overlay wipes away (clip-path / transform), revealing the warm off-white hero beneath while the hero headline lines mask up (SplitText) and Lenis initialises.

Recreate (Knights palette):
```js
const tl = gsap.timeline();
tl.set('.hero .line > span', { yPercent: 110 });
tl.to('.loader__square', { x: '12rem', duration: 1.2, ease: 'power2.inOut' })   // progress
  .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power3.inOut' })
  .add(() => initLenis())
  .to('.hero .line > span', { yPercent: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, '-=0.4');
```
(Already implemented in `03-homepage/` — dark screen, off-white KNIGHTS wordmark, square progress, clip wipe.)

## How to recreate it (code patterns — built from scratch, not copied)

**1. Smooth scroll with Lenis**
```js
import Lenis from 'lenis';
const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
// keep ScrollTrigger in sync
lenis.on('scroll', ScrollTrigger.update);
```

**2. Kinetic headline (SplitText + ScrollTrigger)**
```js
const split = new SplitText('.hero h1', { type: 'lines', linesClass: 'line' });
gsap.set('.line', { yPercent: 110 });            // hidden below a clip mask
gsap.to('.line', {
  yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
  scrollTrigger: { trigger: '.hero', start: 'top 80%' }
});
// .hero h1 .line wrapper needs overflow:hidden for the mask effect
```

**3. Scroll-linked image parallax**
```js
gsap.to('.project-img', {
  yPercent: -15, ease: 'none',
  scrollTrigger: { trigger: '.project', start: 'top bottom', end: 'bottom top', scrub: true }
});
```

**4. Page transitions (Barba.js)**
```js
barba.init({ transitions: [{
  async leave({ current }) { await gsap.to(current.container, { opacity: 0, duration: 0.4 }); },
  enter({ next }) { gsap.from(next.container, { opacity: 0, duration: 0.4 }); }
}]});
// For the "title card" intro, animate a full-screen overlay with the project name in/out around the leave+enter.
```

---

## What to borrow for Knights
- **Lead with a cinematic one-line positioning statement** in a kinetic hero — Knights has the brand language for it ("luxury living… unique homes… commuter belt countryside").
- The **sans + serif display mix** is a sophisticated, ownable type system for a property brand.
- **Scroll-linked parallax + masked reveals on project photography** — Knights has ~18 photos per project; this makes them cinematic.
- **Barba-style title-card transitions** when opening a project — a project name flashing full-screen before the gallery loads would feel premium and keeps *projects* as the moment of drama.
