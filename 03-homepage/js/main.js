/* =========================================================
   Knights Developments — site motion (home · projects · project)
   Engine: Lenis (smooth scroll) + GSAP + ScrollTrigger
   Timings from the reference recording (see 02-plan).
   ========================================================= */
(function () {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const page = document.body.dataset.page || 'home';

  // Reveal the page without motion. The dark loader / title-card overlays sit
  // on top of everything (z-index 9999) and are normally lifted at the end of
  // the intro timeline. If that timeline can't run, this must — otherwise the
  // visitor is left staring at a blank overlay.
  function revealStatic() {
    document.querySelectorAll('.loader, .titlecard').forEach(el => { el.style.display = 'none'; });
    document.querySelectorAll('.line > span').forEach(el => { el.style.transform = 'none'; });
  }

  // GSAP + ScrollTrigger drive every path below. If the CDN failed to load
  // (blocked network, offline, ad-blocker, CDN outage) do NOT throw and trap
  // the page behind the loader — show the static content instead.
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    if (document.readyState === 'complete') revealStatic();
    else window.addEventListener('load', revealStatic);
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  let lenis;
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
  }

  // reveal masked lines within a scope, optionally on scroll
  function revealLines(scope, onScroll) {
    const els = document.querySelectorAll(`${scope} .line > span`);
    if (!els.length) return;
    const cfg = { yPercent: 110 };
    if (onScroll) {
      gsap.from(els, { ...cfg, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: scope, start: 'top 78%' } });
    } else {
      gsap.fromTo(els, cfg, { yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.1 });
    }
  }

  function revealBatch(sel, trigger) {
    const els = document.querySelectorAll(sel);
    if (!els.length) return;
    gsap.from(els, { y: 36, autoAlpha: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
      scrollTrigger: { trigger: trigger || sel, start: 'top 82%' } });
  }

  // parallax on any [data-parallax]
  function buildParallax() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      gsap.to(el, { yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  // home: hover-linked project index (Andre-style)
  function buildProjectIndex() {
    const viewer = document.getElementById('viewerImg');
    if (!viewer) return;
    const locEl = document.getElementById('viewerLoc');
    const metaEl = document.getElementById('viewerMeta');
    document.querySelectorAll('.index__item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        document.querySelectorAll('.index__item').forEach(x => x.classList.remove('is-active'));
        item.classList.add('is-active');
        gsap.to(viewer, { opacity: 0, duration: 0.18, onComplete() {
          viewer.style.setProperty('--tone', item.dataset.tone);
          // viewer.style.setProperty('--img', `url('${item.dataset.img}')`); // when real photos exist
          locEl.textContent = item.dataset.loc;
          metaEl.textContent = item.dataset.meta;
          gsap.to(viewer, { opacity: 1, duration: 0.22 });
        }});
      });
    });
  }

  // projects: status + location filtering
  function buildFilters() {
    const grid = document.getElementById('grid');
    if (!grid) return;
    const tiles = [...grid.querySelectorAll('.tile')];
    const countEl = document.getElementById('filterCount');
    const emptyEl = document.getElementById('gridEmpty');
    const state = { status: 'all', loc: 'all' };

    function apply() {
      let shown = 0;
      tiles.forEach(t => {
        const ok = (state.status === 'all' || t.dataset.status === state.status)
                && (state.loc === 'all' || t.dataset.loc === state.loc);
        if (ok) shown++;
        gsap.to(t, { autoAlpha: ok ? 1 : 0, scale: ok ? 1 : 0.96, duration: 0.35, ease: 'power2.out',
          onStart(){ if (ok) t.style.display = ''; },
          onComplete(){ if (!ok) t.style.display = 'none'; } });
      });
      if (countEl) countEl.textContent = `Showing ${shown} of ${tiles.length}`;
      if (emptyEl) emptyEl.hidden = shown !== 0;
      const p = new URLSearchParams();
      if (state.status !== 'all') p.set('status', state.status);
      if (state.loc !== 'all') p.set('loc', state.loc);
      history.replaceState(null, '', p.toString() ? `?${p}` : location.pathname);
    }

    document.querySelectorAll('.filter-group').forEach(group => {
      group.addEventListener('click', e => {
        const btn = e.target.closest('button'); if (!btn) return;
        group.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b === btn));
        state[group.dataset.group] = btn.dataset.val;
        apply();
      });
    });
    const reset = document.getElementById('gridReset');
    if (reset) reset.addEventListener('click', () => {
      state.status = 'all'; state.loc = 'all';
      document.querySelectorAll('.filter-group').forEach(g =>
        g.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b.dataset.val === 'all')));
      apply();
    });

    const q = new URLSearchParams(location.search);
    state.status = q.get('status') || 'all';
    state.loc = q.get('loc') || 'all';
    document.querySelectorAll('.filter-group').forEach(g =>
      g.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b.dataset.val === state[g.dataset.group])));
    apply();
  }

  // intros
  function runHomeIntro() {
    const tl = gsap.timeline();
    tl.set('.hero .line > span', { yPercent: 110 });
    tl.to('.loader__square', { left: '100%', xPercent: -100, duration: 1.1, ease: 'power2.inOut' })
      .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power3.inOut' }, '+=0.05')
      .add(() => initLenis())
      .to('.hero .line > span', { yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, '-=0.45')
      .set('.loader', { display: 'none' });
  }
  function runTitlecard() {
    gsap.set('.proj-hero h1 > span', { yPercent: 110 });
    const tl = gsap.timeline();
    tl.to('.titlecard', { duration: 0.9 })                       // hold the name
      .to('.titlecard', { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power3.inOut' })
      .add(() => initLenis())
      .to('.proj-hero h1 > span', { yPercent: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .set('.titlecard', { display: 'none' });
  }

  window.addEventListener('load', () => {
    try {
      buildParallax();
      buildProjectIndex();
      buildFilters();

      if (reduced) {
        revealStatic();
        initLenis();
        return;
      }

      if (page === 'home') {
        runHomeIntro();
        revealLines('.statement', true);
        revealLines('.recognition', true);
        revealBatch('.stat', '.stats');
        revealBatch('.feature', '.featured');
        revealBatch('.awards li', '.awards');
      } else if (page === 'projects') {
        initLenis();
        revealLines('.projects-intro', false);
        revealBatch('.tile', '.grid');
      } else if (page === 'project') {
        runTitlecard();
        revealBatch('.fact', '.facts');
        revealLines('.story', true);
        revealBatch('.gallery__item', '.gallery');
      } else {
        initLenis();
      }
    } catch (err) {
      // A runtime error must never leave the dark overlay covering the page.
      console.error('Knights: intro failed — showing static page.', err);
      revealStatic();
      initLenis();
    }
  });
})();
