/* =========================================================
   Knights Developments — shared page motion
   Lenis smooth scroll + GSAP/ScrollTrigger reveals,
   Mersi-style project filtering, project-gallery parallax.
   ========================================================= */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  // ---- smooth scroll ----
  var lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
    if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  }

  function reveal() {
    if (reduced || !window.gsap) return;
    // masked headline lines
    document.querySelectorAll('.lines').forEach(function (scope) {
      var spans = scope.querySelectorAll('.ln > span');
      if (!spans.length) return;
      gsap.to(spans, {
        yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: scope, start: 'top 85%' }
      });
    });
    // fade-up batches
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        delay: (+el.dataset.reveal || 0) * 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
    // image parallax
    gsap.utils.toArray('[data-parallax]').forEach(function (el) {
      gsap.to(el, {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: el.closest('section,figure') || el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  // ---- projects filtering (Mersi) ----
  function filters() {
    var grid = document.getElementById('grid');
    if (!grid) return;
    var tiles = [].slice.call(grid.querySelectorAll('.tile'));
    var countEl = document.getElementById('filterCount');
    var emptyEl = document.getElementById('gridEmpty');
    var state = { status: 'all', loc: 'all' };

    function apply(animate) {
      var shown = 0;
      tiles.forEach(function (t) {
        var ok = (state.status === 'all' || t.dataset.status === state.status) &&
                 (state.loc === 'all' || t.dataset.loc === state.loc);
        if (ok) shown++;
        if (window.gsap && animate) {
          gsap.to(t, { autoAlpha: ok ? 1 : 0, scale: ok ? 1 : 0.96, duration: 0.35, ease: 'power2.out',
            onStart: function () { if (ok) t.style.display = ''; },
            onComplete: function () { if (!ok) t.style.display = 'none'; } });
        } else { t.style.display = ok ? '' : 'none'; t.style.opacity = ok ? 1 : 0; }
      });
      if (countEl) countEl.textContent = 'Showing ' + shown + ' of ' + tiles.length;
      if (emptyEl) emptyEl.hidden = shown !== 0;
      var p = new URLSearchParams();
      if (state.status !== 'all') p.set('status', state.status);
      if (state.loc !== 'all') p.set('loc', state.loc);
      history.replaceState(null, '', p.toString() ? '?' + p : location.pathname);
    }

    document.querySelectorAll('.filter-group').forEach(function (group) {
      group.addEventListener('click', function (e) {
        var btn = e.target.closest('button'); if (!btn) return;
        group.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        state[group.dataset.group] = btn.dataset.val;
        apply(true);
      });
    });
    var reset = document.getElementById('gridReset');
    if (reset) reset.addEventListener('click', function () {
      state.status = 'all'; state.loc = 'all';
      document.querySelectorAll('.filter-group').forEach(function (g) {
        g.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.val === 'all'); });
      });
      apply(true);
    });

    var q = new URLSearchParams(location.search);
    state.status = q.get('status') || 'all';
    state.loc = q.get('loc') || 'all';
    document.querySelectorAll('.filter-group').forEach(function (g) {
      g.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.val === state[g.dataset.group]); });
    });
    apply(false);
    if (window.gsap && !reduced) {
      gsap.from(tiles.filter(function (t) { return t.style.display !== 'none'; }), {
        opacity: 0, y: 40, duration: 0.6, ease: 'power2.out', stagger: 0.05,
        scrollTrigger: { trigger: grid, start: 'top 85%' }
      });
    }
  }

  window.addEventListener('load', function () { reveal(); filters(); if (window.ScrollTrigger) ScrollTrigger.refresh(); });
})();
