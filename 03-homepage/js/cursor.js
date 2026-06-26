/* =========================================================
   Knights Developments — custom cursor (vanilla port)
   A small dot that follows the pointer and grows into a
   labelled circle over clickable things. mix-blend-mode keeps
   it readable over any background. Drop-in: one <script> tag
   injects its own CSS. Add data-cursor="Label" to set a label.
   Restores the native cursor on touch / no-hover devices.
   ========================================================= */
(function () {
  'use strict';
  // Touch / coarse pointers: leave the native cursor alone.
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  var css = '' +
    'html.kd-has-cursor, html.kd-has-cursor *{cursor:none}' +
    '@media (hover:none),(pointer:coarse){html.kd-has-cursor,html.kd-has-cursor *{cursor:auto}.kd-cursor{display:none!important}}' +
    '@media (max-width:900px){html.kd-has-cursor,html.kd-has-cursor *{cursor:auto}.kd-cursor{display:none!important}}' +
    '.kd-cursor{position:fixed;top:0;left:0;width:12px;height:12px;border-radius:50%;' +
      'background:#ECE6DD;pointer-events:none;z-index:9999;mix-blend-mode:difference;' +
      'display:flex;align-items:center;justify-content:center;' +
      "font-family:'Space Grotesk',sans-serif;font-size:10px;font-weight:600;letter-spacing:.18em;" +
      'text-transform:uppercase;color:#1A1A1A;will-change:transform;opacity:0;' +
      'transition:width .3s cubic-bezier(.23,1,.32,1),height .3s cubic-bezier(.23,1,.32,1),opacity .3s ease}' +
    '.kd-cursor.is-in{opacity:1}' +
    '.kd-cursor.is-hover{width:72px;height:72px}' +
    '.kd-cursor .kd-cursor-label{opacity:0;transition:opacity .2s;white-space:nowrap}' +
    '.kd-cursor.is-hover .kd-cursor-label{opacity:1}';

  function init() {
    document.documentElement.classList.add('kd-has-cursor');
    var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

    var cur = document.createElement('div'); cur.className = 'kd-cursor'; cur.setAttribute('aria-hidden', 'true');
    var lbl = document.createElement('span'); lbl.className = 'kd-cursor-label'; cur.appendChild(lbl);
    cur.style.transform = 'translate(-100px,-100px) translate(-50%,-50%)';
    document.body.appendChild(cur);

    // Position via ref + rAF — never re-layout on every mousemove.
    var pos = { x: -100, y: -100 }, frame = 0;
    function flush() { frame = 0; cur.style.transform = 'translate(' + pos.x + 'px,' + pos.y + 'px) translate(-50%,-50%)'; }
    window.addEventListener('mousemove', function (e) {
      pos.x = e.clientX; pos.y = e.clientY; cur.classList.add('is-in');
      if (!frame) frame = requestAnimationFrame(flush);
    }, { passive: true });
    document.addEventListener('mouseleave', function () { cur.classList.remove('is-in'); });

    // Hover state via delegation. Label comes from [data-cursor]; project tiles
    // default to "View"; other links/buttons grow with no label.
    var SEL = 'a,button,[data-cursor],.item,.index__item';
    function labelFor(t) {
      if (t.hasAttribute('data-cursor')) return t.getAttribute('data-cursor');
      if (t.matches('.item,.index__item')) return 'View';
      return '';
    }
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest(SEL); if (!t) return;
      cur.classList.add('is-hover'); lbl.textContent = labelFor(t);
    });
    document.addEventListener('mouseout', function (e) {
      var t = e.target.closest(SEL); if (!t) return;
      var to = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(SEL);
      if (to === t) return;                       // moving within the same hit area
      cur.classList.remove('is-hover'); lbl.textContent = '';
    });
  }

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
