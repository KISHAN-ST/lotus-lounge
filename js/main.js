'use strict';

(function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  window.setTimeout(() => {
    preloader.classList.add('loaded');
  }, 420);
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

(function initWhatsAppInquiryCTA() {
  if (document.querySelector('.wa-cta')) return;

  const whatsappNumber = '919900099877';
  const autoText = 'Hello Lotus Lounge, I would like to enquire about table availability and offers.';
  const storageKey = 'lotusWaCtaHintShown';
  const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(autoText);

  const wrap = document.createElement('div');
  wrap.className = 'wa-cta-wrap';

  const cta = document.createElement('a');
  cta.className = 'wa-cta';
  cta.href = whatsappUrl;
  cta.target = '_blank';
  cta.rel = 'noopener noreferrer';
  cta.setAttribute('aria-label', 'Inquire on WhatsApp');
  cta.innerHTML = '<span class="wa-cta__icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M20.5 3.5A11 11 0 0 0 3.6 17l-1.2 3.9 4-1.2A11 11 0 1 0 20.5 3.5Zm-8.6 17.4a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-2.3.7.7-2.3-.2-.3a9.1 9.1 0 1 1 6.7 3.4Zm5-6.8c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1-.8 1-1 1.1-.4.2-.7 0c-2-.9-3.2-2.7-3.5-3.1s0-.5.1-.7c.2-.2.4-.5.5-.7.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-1 1-1 2.5s1 3 1.1 3.2c.2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.8 2-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.3Z" fill="currentColor"></path></svg></span>';

  const preview = document.createElement('aside');
  preview.className = 'wa-chat-pop';
  preview.innerHTML = [
    '<p class="wa-chat-pop__title">Example Chat</p>',
    '<p class="wa-chat-pop__bubble wa-chat-pop__bubble--user">Hi Lotus Lounge, table for 4 at 8:00 PM today?</p>',
    '<p class="wa-chat-pop__bubble wa-chat-pop__bubble--brand">Yes, available. Please share your name and contact number.</p>'
  ].join('');

  wrap.appendChild(cta);
  wrap.appendChild(preview);
  document.body.appendChild(wrap);

  if (sessionStorage.getItem(storageKey)) return;

  sessionStorage.setItem(storageKey, '1');
  window.setTimeout(() => {
    wrap.classList.add('is-peek');
    window.setTimeout(() => {
      wrap.classList.remove('is-peek');
    }, 4200);
  }, 1400);
})();

(function initReservationForm() {
  const form = document.querySelector('#reservation-form');
  const message = document.querySelector('#reservation-message');
  if (!form || !message) return;

  const whatsappNumber = '919900099877';

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

    const name = (form.querySelector('#name')?.value || '').trim();
    const phone = (form.querySelector('#phone')?.value || '').trim();
    const date = form.querySelector('#date')?.value || '-';
    const time = form.querySelector('#time')?.value || '-';
    const guests = form.querySelector('#guests')?.value || '-';
    const occasion = form.querySelector('#occasion')?.value || 'No special occasion';
    const requests = (form.querySelector('#requests')?.value || '').trim() || 'None';

    const whatsappText = [
      'Hello Lotus Lounge, I would like to reserve a table.',
      '',
      'Name: ' + name,
      'Phone: ' + phone,
      'Date: ' + date,
      'Time: ' + time,
      'Guests: ' + guests,
      'Occasion: ' + occasion,
      'Special Requests: ' + requests
    ].join('\n');

    const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappText);
    const popup = window.open(whatsappUrl, '_blank');
    if (!popup) {
      window.location.href = whatsappUrl;
    }

    message.textContent = 'Opening WhatsApp for booking confirmation...';
    form.reset();
  });
})();

(function initSignatureMobileColorReveal() {
  const cards = Array.from(document.querySelectorAll('.menu-preview .dish-card'));
  if (!cards.length) return;

  const updateVisibility = () => {
    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardTop = window.scrollY + rect.top;
      const cardBottom = cardTop + rect.height;
      const visibleHeight = Math.min(cardBottom, viewportBottom) - Math.max(cardTop, viewportTop);
      const visibleRatio = Math.max(0, visibleHeight) / Math.max(1, rect.height);

      card.classList.toggle('is-visible', visibleRatio > 0.35);
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateVisibility();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateVisibility();
})();

(function initExperienceVideoGate() {
  const trigger = document.querySelector('[data-exp-video-trigger="true"]');
  const overlay = document.querySelector('#exp-video-overlay');
  const video = document.querySelector('#exp-main-1-video');
  const skip = document.querySelector('#exp-video-skip');

  if (!trigger || !overlay || !video || !skip) return;

  const destination = 'experience.html';
  let redirected = false;

  const redirectToExperience = () => {
    if (redirected) return;
    redirected = true;
    window.location.href = destination;
  };

  const openOverlay = () => {
    redirected = false;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('exp-video-open');

    // User click opens the overlay, so enable sound explicitly for this playback.
    video.muted = false;
    video.volume = 1;

    try {
      video.currentTime = 0;
    } catch (error) {
      // Ignore seek errors and continue playback attempt.
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        redirectToExperience();
      });
    }
  };

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openOverlay();
  });

  skip.addEventListener('click', () => {
    video.pause();
    redirectToExperience();
  });

  video.addEventListener('ended', redirectToExperience);
  video.addEventListener('error', redirectToExperience);
})();
