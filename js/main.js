'use strict';

(function initNavState() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const toggleNav = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', toggleNav, { passive: true });
  toggleNav();
})();

(function initMobileMenu() {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__mobile');

  if (!nav || !burger || !menu) return;

  const closeMenu = () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (!nav.contains(target) && !menu.contains(target)) {
      closeMenu();
    }
  });
})();

(function initRevealOnScroll() {
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-group]');
  if (!revealEls.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

(function initHeroParallax() {
  const bg = document.querySelector('.hero__bg');
  if (!bg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, window.innerHeight);
      bg.style.transform = 'scale(1.05) translate3d(0,' + y * 0.14 + 'px,0)';
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

(function initActiveSectionLinks() {
  const links = Array.from(document.querySelectorAll('.nav__link[href^="#"]'));
  if (!links.length) return;

  const sections = links
    .map((link) => {
      const href = link.getAttribute('href');
      return href ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector('.nav__link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      });
    },
    { rootMargin: '-38% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();

(function initSmoothAnchorScroll() {
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const parsed = new URL(href, window.location.href);
      if (parsed.pathname !== window.location.pathname || !parsed.hash) return;

      const target = document.querySelector(parsed.hash);
      if (!target) return;

      event.preventDefault();
      const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 2;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

(function initCursorDot() {
  const dot = document.querySelector('.cursor-dot');
  if (!dot) return;

  const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (coarsePointer) return;

  document.body.classList.add('cursor-enabled');

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const target = { x: pos.x, y: pos.y };

  const tick = () => {
    pos.x += (target.x - pos.x) * 0.25;
    pos.y += (target.y - pos.y) * 0.25;
    dot.style.transform = 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)';
    requestAnimationFrame(tick);
  };

  window.addEventListener('mousemove', (event) => {
    target.x = event.clientX;
    target.y = event.clientY;
    dot.classList.add('visible');
  });

  window.addEventListener('mouseout', () => {
    dot.classList.remove('visible');
  });

  requestAnimationFrame(tick);
})();
