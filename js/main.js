'use strict';

document.documentElement.classList.add('js-ready');

(function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  window.setTimeout(() => {
    preloader.classList.add('loaded');
  }, 1500);
})();

(function initNav() {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const mobile = document.querySelector('.nav__mobile');

  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!burger || !mobile) return;

  const closeMenu = () => {
    burger.classList.remove('open');
    mobile.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobile.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });

  mobile.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });
})();

(function initCustomCursor() {
  const main = document.querySelector('.cursor--main');
  const trail = document.querySelector('.cursor--trail');
  if (!main || !trail) return;

  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  document.body.classList.add('cursor-enabled');

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const trailPos = { x: mouse.x, y: mouse.y };

  const raf = () => {
    trailPos.x += (mouse.x - trailPos.x) * 0.2;
    trailPos.y += (mouse.y - trailPos.y) * 0.2;
    main.style.transform = 'translate(' + mouse.x + 'px,' + mouse.y + 'px) translate(-50%, -50%)';
    trail.style.transform = 'translate(' + trailPos.x + 'px,' + trailPos.y + 'px) translate(-50%, -50%)';
    requestAnimationFrame(raf);
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      main.classList.add('cursor-grow');
    });
    el.addEventListener('mouseleave', () => {
      main.classList.remove('cursor-grow');
    });
  });

  requestAnimationFrame(raf);
})();

(function initMagneticButtons() {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  document.querySelectorAll('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      btn.style.transform = 'translate(' + x * 16 + 'px,' + y * 16 + 'px)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
})();

(function initReveal() {
  const all = document.querySelectorAll('[data-reveal], [data-reveal-group]');
  if (!all.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    all.forEach((el) => el.classList.add('revealed'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    all.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const node = entry.target;
        if (node.hasAttribute('data-reveal-group')) {
          node.classList.add('revealed');
          Array.from(node.children).forEach((child, i) => {
            child.style.transitionDelay = i * 100 + 'ms';
          });
        } else {
          node.classList.add('revealed');
        }

        observer.unobserve(node);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  all.forEach((el) => observer.observe(el));
})();

(function initHeroParallax() {
  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, window.innerHeight * 1.4);
      heroBg.style.transform = 'scale(1.08) translate3d(0,' + y * 0.4 + 'px,0)';
      ticking = false;
    });
  }, { passive: true });
})();

(function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset + 2;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

(function initReservationForm() {
  if (document.body?.dataset.cmsReservation === 'true') return;

  const form = document.querySelector('#reservation-form');
  const message = document.querySelector('#reservation-message');
  if (!form || !message) return;

  const dateInput = form.querySelector('#date');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      message.textContent = 'Please complete all required fields.';
      return;
    }

    message.textContent = 'Reservation request received. Our concierge will confirm shortly.';
    form.reset();
  });
})();
