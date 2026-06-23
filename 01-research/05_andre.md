# Reference 04 — Andre Architecture

**URL:** https://www.andrearchitecture.com · **Recording:** 3:38 – 4:00 · **Boards:** `boards/04-andre/` · **Stills:** `screenshots/andre/`

> *Why it's here: "love the projects page & overall functionality."*

A New York architecture + interiors firm. The most **minimal and refined** of the four, and home to the single best interaction in the whole pack: a **hover-driven project index** where the project list and a large image are linked — hover a name, the image swaps to that project. It's "projects first" distilled to its purest form.

---

## Tech stack

| Layer | Library |
|---|---|
| Build | **Custom** (not Webflow; no jQuery) |
| Smooth scroll | **Lenis** |
| Animation | Custom / GSAP-style |

The odd one out — hand-built. Confirms our plan to **build Knights clean** rather than in Webflow; this level of polish is achievable bespoke.

---

## Visual identity

**Palette — pure monochrome, let the architecture supply the colour**

| Swatch | Hex | Use |
|---|---|---|
| White | `#FFFFFF` | background |
| Black | `#000000` | text |
| (imagery) | — | the renders/photos provide all warmth |

**Typography — this is the signature**
- **Display:** `Sang` — an elegant **serif**, light weight (300), **sentence case** (not uppercase), set large (≈115px). Refined, editorial, gallery-like. The opposite of the bold-sans approach of the others.
- **Body/UI:** `Geo` — a neutral sans for nav, captions, labels.
- A serif-display + sans-UI system reads as quiet, expensive, architectural.

---

## Homepage = the projects index (the bit we want)

The landing page **is** the portfolio. Layout: project **names stacked on the left** (Gropius Facility / Ocean Parkway / Earth House / Broadway Loft / Beehive House / Son Del North / Parquet Wall…), a **large image panel on the right**, and a small line `Design is a tool. What can we do for you?` Nav: `Portfolio · Office · Chronicle · Contact` + a vertical `Honors` tab.

- Project caption shows under the image: **name | type** and **location** (e.g. *Gropius Facility | Adaptive-reuse & addition* … *Lincoln, Massachusetts*).
- **Project detail pages:** full-bleed renders + **isometric / plan drawings** + sparse captions. Very architectural, very calm.

---

## The hover interaction (measured from board 9)

The project list and the image are **coupled**:
- The **active** project name is solid **black**; the others fade to light **grey** (an opacity gradient down the list).
- **Hovering** a name makes it active and **crossfades the large image** to that project (Broadway Loft → Beehive House → Son Del North as you move down).
- The image swap is a quick **crossfade/reveal**, on the boards roughly **6–12 frames (~0.2–0.4s)** — fast enough to feel responsive, slow enough to feel smooth.
- Scrolling the list also drives which project is "active" (the centred name leads).

---

## How to recreate it (code patterns)

**Hover-linked image swap (vanilla)**
```html
<ul class="index">
  <li data-img="/img/gropius.jpg" data-meta="Adaptive-reuse & addition · Lincoln, MA">Gropius Facility</li>
  <li data-img="/img/ocean.jpg"   data-meta="New build · Brooklyn, NY">Ocean Parkway</li>
  <!-- … -->
</ul>
<figure class="viewer"><img id="viewer-img"><figcaption id="viewer-meta"></figcaption></figure>
```
```js
const img = document.getElementById('viewer-img');
const meta = document.getElementById('viewer-meta');
document.querySelectorAll('.index li').forEach(li => {
  li.addEventListener('mouseenter', () => {
    document.querySelectorAll('.index li').forEach(x => x.classList.remove('active'));
    li.classList.add('active');
    // crossfade
    gsap.to(img, { opacity: 0, duration: 0.18, onComplete(){
      img.src = li.dataset.img; meta.textContent = li.dataset.meta;
      gsap.to(img, { opacity: 1, duration: 0.22 });
    }});
  });
});
```
```css
.index li { color:#bbb; transition:color .3s; cursor:pointer; }
.index li.active { color:#000; }
```

**Opacity gradient down the list (resting state)** — fade non-hovered items by distance from the active one, or simply default all to grey and darken on hover (as above).

---

## What to borrow for Knights
- **A hover-linked project index** is the perfect "projects-first" hero for Knights: list every development on the left, a large cinematic photo swapping on the right, with **location + status** as the caption. It puts the entire portfolio on the first screen and makes browsing feel effortless.
- The **serif-display / sans-UI** type system is an elegant alternative direction if Knights wants to feel more "heritage country house" than "modern studio."
- **Project pages that pair photography with plans/figures** suit new-build developments (floor area, plot acreage, beds) — Knights can show specs the way Andre shows drawings.
- Even if we blend palettes from the warmer references, Andre's **discipline with white space** is the thing to keep.
