// One persistent route to existing PIXIE guidance. No account data or URL forwarding.
(() => {
  if (document.getElementById('pixie-core')) return;
  try { for (let host=window;host!==host.parent;host=host.parent) { if (host.frameElement?.closest('.window, .market-feed-frame')) return; } } catch { /* Cross-origin hosts retain this page's own guidance route. */ }
  const launcher = document.createElement('a');
  launcher.className = 'pixie-launcher';
  launcher.href = 'https://pixie-project-companion-production.up.railway.app/';
  launcher.target = '_top';
  launcher.referrerPolicy = 'no-referrer';
  launcher.setAttribute('aria-label', 'Open PIXIE guidance');
  const mark = document.createElement('img');
  mark.src = '/pixie-companion-sigil.png'; mark.alt = ''; mark.width = 40; mark.height = 40;
  const label = document.createElement('span'); label.textContent = 'PIXIE';
  launcher.append(mark, label); document.body.appendChild(launcher);
  const taskbar = document.querySelector('.taskbar');
  if (taskbar) {
    const measure = () => document.documentElement.style.setProperty('--pixie-taskbar-height', taskbar.getBoundingClientRect().height + 'px');
    measure(); if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(taskbar);
  }
  const guidance = document.getElementById('win-pixie');
  if (!guidance) return;
  const local = () => document.documentElement.dataset.holdingsControl !== 'true';
  const visible = () => getComputedStyle(guidance).display !== 'none';
  const sync = () => { if (local()) { launcher.setAttribute('aria-controls', guidance.id); launcher.setAttribute('aria-expanded', String(visible())); } else { launcher.removeAttribute('aria-controls'); launcher.removeAttribute('aria-expanded'); } };
  launcher.addEventListener('click', event => {
    if (!local()) return;
    event.preventDefault();
    if (visible() && guidance.classList.contains('focused')) { window.closeWin(guidance.id); launcher.focus(); }
    else { window.openWin('pixie'); guidance.querySelector('#chat-input')?.focus(); }
    sync();
  });
  guidance.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); window.closeWin(guidance.id); launcher.focus(); sync(); } });
  new MutationObserver(sync).observe(guidance, {attributes:true, attributeFilter:['style','class']});
  new MutationObserver(sync).observe(document.documentElement, {attributes:true, attributeFilter:['data-holdings-control']});
  sync();
})();
