/* =========================================================
   Knights Developments — nav menu (3 switchable styles)
   1 = overlay curtain · 2 = index drawer · 3 = warm pill
   The 1/2/3 switcher in the header flips html[data-nav];
   CSS shows the matching trigger + menu. Open state is the
   shared html.nav-open class, scoped per style in the CSS.
   ========================================================= */
(function () {
  'use strict';
  const root = document.documentElement;
  if (!root.dataset.nav) root.dataset.nav = '2';

  const menuToggle = document.getElementById('menuToggle');
  const pill = document.getElementById('pill');
  const scrim = document.getElementById('navScrim');

  function setOpen(open) {
    root.classList.toggle('nav-open', open);
    if (menuToggle) menuToggle.setAttribute('aria-expanded', open);
    if (pill) pill.setAttribute('aria-expanded', open);
  }
  const toggle = () => setOpen(!root.classList.contains('nav-open'));

  if (menuToggle) menuToggle.addEventListener('click', toggle);   // styles 1 & 2
  if (pill) pill.addEventListener('click', toggle);               // style 3
  if (scrim) scrim.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  document.querySelectorAll('#navOverlay a, #navDrawer a, #pillLinks a')
    .forEach(a => a.addEventListener('click', () => setOpen(false)));

  // style 2 drawer: photo crossfades on hover (Andre's coupled list)
  const imgs = document.querySelectorAll('#navPreview img');
  const plabel = document.getElementById('navPlabel');
  const labels = { home: 'Unique homes in Buckinghamshire', projects: 'Fifteen developments', about: 'The studio since 2009', contact: 'Get in touch', enquire: 'Register your interest' };
  document.querySelectorAll('#navDrawer a').forEach(a => a.addEventListener('mouseenter', () => {
    const k = a.dataset.k;
    imgs.forEach(im => im.classList.toggle('show', im.dataset.k === k));
    if (plabel && labels[k]) plabel.textContent = labels[k];
  }));

  // 1/2/3 switcher
  const sw = document.getElementById('navSwitch');
  function paint() { if (sw) sw.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.n === root.dataset.nav)); }
  if (sw) sw.addEventListener('click', e => {
    const b = e.target.closest('button[data-n]'); if (!b) return;
    setOpen(false); root.dataset.nav = b.dataset.n; paint();
  });
  paint();
})();
