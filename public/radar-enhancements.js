/* PIXIE OS interaction layer. Loaded by radar.html after radar-core.html. */
(function () {
  'use strict';

  const child = window;
  const doc = document;

  function focusWindow(id) {
    doc.querySelectorAll('.window').forEach(function (win) { win.classList.remove('focused'); });
    const win = doc.getElementById(id);
    if (win) win.classList.add('focused');
  }

  function setTaskbar(name, active) {
    const btn = doc.getElementById('tb-' + name);
    if (btn) btn.classList.toggle('active', active);
  }

  function minimizeWindow(id) {
    const win = doc.getElementById(id);
    if (!win) return;
    win.style.display = 'none';
    setTaskbar(id.replace(/^win-/, ''), false);
  }

  function maximizeWindow(id) {
    const win = doc.getElementById(id);
    if (!win) return;
    if (!win.dataset.pixieMaximized) {
      win.dataset.pixiePrev = JSON.stringify({
        left: win.style.left,
        top: win.style.top,
        width: win.style.width,
        height: win.style.height,
        maxWidth: win.style.maxWidth,
        maxHeight: win.style.maxHeight
      });
      Object.assign(win.style, {
        left: '8px', top: '8px', width: 'calc(100vw - 16px)', height: 'calc(100vh - 62px)',
        maxWidth: 'none', maxHeight: 'none'
      });
      win.dataset.pixieMaximized = '1';
    } else {
      const prev = JSON.parse(win.dataset.pixiePrev || '{}');
      Object.keys(prev).forEach(function (key) { win.style[key] = prev[key] || ''; });
      delete win.dataset.pixieMaximized;
      delete win.dataset.pixiePrev;
    }
    focusWindow(id);
  }

  function wireWindowControls() {
    doc.querySelectorAll('.window').forEach(function (win) {
      const id = win.id;
      const dots = win.querySelectorAll('.wdot');
      if (dots[0]) dots[0].addEventListener('click', function (e) { e.stopPropagation(); minimizeWindow(id); });
      if (dots[1]) dots[1].addEventListener('click', function (e) { e.stopPropagation(); minimizeWindow(id); });
      if (dots[2]) dots[2].addEventListener('click', function (e) { e.stopPropagation(); maximizeWindow(id); });
      dots.forEach(function (dot) { dot.addEventListener('mousedown', function (e) { e.stopPropagation(); }); });
      win.addEventListener('mousedown', function () { focusWindow(id); });
    });
  }

  function wireDesktopIcons() {
    doc.querySelectorAll('.desk-icon').forEach(function (icon) {
      if (icon.dataset.pixieSingleClick) return;
      icon.dataset.pixieSingleClick = '1';
      icon.addEventListener('click', function () {
        const dbl = icon.getAttribute('ondblclick') || '';
        const match = dbl.match(/openWin\(['"]([^'"]+)['"]\)/);
        if (match && typeof child.openWin === 'function') child.openWin(match[1]);
      });
    });
  }

  function wireRadar() {
    const canvas = doc.getElementById('rc');
    if (!canvas || canvas.dataset.pixieRadarFixed) return;
    canvas.dataset.pixieRadarFixed = '1';
    if (typeof child.initRadar === 'function') child.initRadar();
    const original = canvas.onclick;
    if (!original) return;
    canvas.onclick = function (event) {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const scaledX = (event.clientX - rect.left) * canvas.width / rect.width;
      const scaledY = (event.clientY - rect.top) * canvas.height / rect.height;
      const synthetic = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: rect.left + scaledX,
        clientY: rect.top + scaledY,
        screenX: event.screenX,
        screenY: event.screenY,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
      });
      original.call(canvas, synthetic);
    };
  }

  function wireTouchDragging() {
    doc.querySelectorAll('.win-bar').forEach(function (bar) {
      if (bar.dataset.pixieTouchDrag) return;
      bar.dataset.pixieTouchDrag = '1';
      let drag = null;
      bar.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) return;
        const win = bar.closest('.window');
        if (!win) return;
        focusWindow(win.id);
        const rect = win.getBoundingClientRect();
        const touch = e.touches[0];
        drag = { win: win, x: touch.clientX - rect.left, y: touch.clientY - rect.top };
        e.preventDefault();
      }, { passive: false });
      bar.addEventListener('touchmove', function (e) {
        if (!drag || e.touches.length !== 1) return;
        const touch = e.touches[0];
        drag.win.style.left = (touch.clientX - drag.x) + 'px';
        drag.win.style.top = (touch.clientY - drag.y) + 'px';
        e.preventDefault();
      }, { passive: false });
      bar.addEventListener('touchend', function () { drag = null; });
      bar.addEventListener('touchcancel', function () { drag = null; });
    });
  }

  function wireKeyboard() {
    doc.querySelectorAll('.door-card, .tree-node, .wdot, .access-pill').forEach(function (el) {
      if (el.tabIndex < 0) el.tabIndex = 0;
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    });
  }

  function boot() {
    wireWindowControls();
    wireDesktopIcons();
    wireRadar();
    wireTouchDragging();
    wireKeyboard();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
