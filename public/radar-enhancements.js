/* PIXIE OS interaction layer. Loaded by radar.html after radar-core.html. */
(function () {
  'use strict';

  const child = window;
  const doc = document;

  function wireNavigationKeys() {
    doc.querySelectorAll('.door-card, .tree-node, .access-pill').forEach(function (el) {
      if (el.hasAttribute('onkeydown') || el.dataset.navigationKeys) return;
      el.dataset.navigationKeys = 'true';
      if (el.tabIndex < 0) el.tabIndex = 0;
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    });
  }

  function boot() {

    if (typeof child.initRadar === 'function') child.initRadar();

    wireNavigationKeys();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
