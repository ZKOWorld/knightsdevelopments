# Knights Homepage — Build Spec (how I'll build it)

Confirmed direction: **real working page** · hero = **cinematic statement → project index** · type = **bold sans + serif accent** · with a **Felix-Nieto-style loading-in state**.

---

## Tech approach

A clean, hand-built **static page** — no Webflow, no build tooling required to view it. One folder, opens straight in a browser:

```
03-homepage/
├── index.html
├── css/style.css
├── js/main.js
└── assets/        (placeholder project imagery, logo SVG, hero film/poster)
```

**Libraries (via CDN, the same engine as the references):**
- **Lenis** — weighted smooth scroll.
- **GSAP + ScrollTrigger** — scroll-driven reveals, parallax, the loader timeline.
- **GSAP SplitText** (or a tiny custom line-splitter) — masked kinetic headline reveals.
- Page transitions: a lightweight **custom title-card fader** (Barba can come later when there are real multiple pages).

Everything is progressive-enhancement friendly: content is real HTML; motion layers on top.

---

## The loading-in state (recreating Felix's, in Knights' palette)

1. Full-screen overlay `#1A1A1A` (Knights ink), `z-index: 9999`.
2. Centred **Knights wordmark** in off-white (`#F4F1EA`) as inline SVG/text.
3. A small **off-white square** that travels / scales as a progress indicator beneath the wordmark (GSAP-driven), 0→100 of asset load (or a timed 1.2–1.6s fallback).
4. On complete: overlay **wipes upward** via `clip-path` (≈0.8s, `power3.inOut`), revealing the hero. As it lifts, the **hero headline lines mask up** (SplitText, stagger ~0.08s) and Lenis initialises.

```js
const tl = gsap.timeline();
tl.to('.loader-square', { x: '12rem', duration: 1.2, ease: 'power2.inOut' })   // progress
  .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power3.inOut' })
  .from('.hero .line', { yPercent: 110, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, '-=0.4')
  .add(() => initLenis());
```

---

## Homepage sections (what gets built)

1. **Loader** → **Hero**: cinematic one-liner over a slow hero image/film + `SCROLL` cue. Headline e.g. *"Unique luxury homes in the Buckinghamshire countryside."* (sans, with a serif emphasis word).
2. **Positioning statement** — masked line reveal on scroll.
3. **Project index** (the heart, Andre-style hover): development names list + large photo that crossfades on hover; caption = location + status. Real Knights projects.
4. **Selected projects** — 2–3 full-bleed photos with scroll parallax.
5. **Recognition** — International Property Awards strip.
6. **Stats** — homes delivered / years / locations / awards (staggered reveal).
7. **Enquiry CTA** — clay panel, "Register your interest".
8. **Footer** — contact, locations, email.

## Motion spec (timings from the boards)
Smooth scroll (Lenis) · masked line reveals (~0.6–0.8s, stagger 0.08, power3.out) · image parallax (scrub, ~15%) · hover image crossfade (~0.2–0.4s) · staggered stats (~0.2s apart) · clay-button hover (underline/arrow).

## Content & assets
- Real project names/locations/statuses from the current site (see research doc 01).
- **Placeholder imagery** standing in for Knights' real photos (we have ~18 per project to swap in later). I'll use tasteful neutral placeholders so the layout reads correctly.
- Type: Google-hosted stand-ins for the bold-sans + serif pairing (e.g. a grotesque + a light serif) until licensed faces are chosen.

## What it is / isn't
- **Is:** a real, scrollable, interactive homepage demonstrating the actual feel — shareable with Matt/the client.
- **Isn't yet:** the full multi-page site, real photography, or final licensed fonts — those follow once the direction is approved.
