/* ─── Lotus Lounge — menu.js ─────────────────────────────── */
'use strict';

(function initMenuTabs() {
  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) {
        panel.classList.add('active');
        // Re-trigger reveal for items in new panel
        panel.querySelectorAll('[data-reveal], [data-reveal-group]').forEach(el => {
          el.classList.add('revealed');
        });
      }
    });
  });
})();
