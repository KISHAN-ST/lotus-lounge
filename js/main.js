/* ─── Lotus Lounge — main.js ─────────────────────────────── */
'use strict';

// ── Normalize /index → /index.html (static servers) ───────
(function normalizeIndexPath() {
  if (!location.protocol.startsWith('http')) return;
  if (/\/index$/.test(location.pathname)) {
    const target = location.pathname + '.html' + location.hash;
    location.replace(target);
  }
})();

// ── Nav: transparent → solid on scroll ─────────────────────
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load in case already scrolled
})();

// ── Mobile menu toggle ──────────────────────────────────────
(function initMobileMenu() {
  const burger = document.querySelector('.nav__burger');
  const menu   = document.querySelector('.nav__mobile');
  if (!burger || !menu) return;

  const closeMenu = () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });

  const nav = document.querySelector('.nav');
})();

// ── Scroll reveal (Intersection Observer) ──────────────────
(function initReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Reveal all immediately
    document.querySelectorAll('[data-reveal], [data-reveal-group]').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal], [data-reveal-group]').forEach(el => {
    io.observe(el);
  });
})();

// ── Hero parallax ───────────────────────────────────────────
(function initParallax() {
  const bg = document.querySelector('.hero__bg');
  if (!bg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // skip on touch devices

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const limit = window.innerHeight;
        if (scrolled < limit) {
          bg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── Active nav link on scroll ───────────────────────────────
(function initActiveLink() {
  const links = document.querySelectorAll('.nav__link[href^="#"]');
  if (!links.length) return;

  const sections = [...links].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
})();

// ── Smooth scroll for anchor links ─────────────────────────
document.querySelectorAll('a[href*="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    const url = new URL(href, window.location.href);
    if (url.pathname !== window.location.pathname || !url.hash) return;

    const target = document.querySelector(url.hash);
    if (!target) return;

    e.preventDefault();

    const burger = document.querySelector('.nav__burger');
    const menu = document.querySelector('.nav__mobile');
    if (burger && menu) {
      burger.classList.remove('open');
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    const offset = document.querySelector('.nav')?.offsetHeight || 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
