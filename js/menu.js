'use strict';

function initMenuAnchors() {
  const links = Array.from(document.querySelectorAll('.menu-anchor'));
  if (!links.length) return;

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id) return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const offset = (document.querySelector('.nav')?.offsetHeight || 0) + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const sections = links
    .map((link) => {
      const id = link.getAttribute('href');
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((l) => l.classList.remove('active'));
        const active = document.querySelector('.menu-anchor[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      });
    },
    { rootMargin: '-35% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

window.initMenuAnchorBindings = initMenuAnchors;

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initMenuAnchors);
} else {
  initMenuAnchors();
}
