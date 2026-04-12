'use strict';

(function initChefShowcase() {
  const showcase = document.querySelector('#chef-showcase');
  const cardsRail = document.querySelector('#chef-cards');
  const cards = Array.from(document.querySelectorAll('[data-chef-card]'));
  const completeMenuButton = document.querySelector('#chef-complete-menu');

  if (!showcase || !cards.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplayMs = 4500;
  let activeIndex = 0;
  let timer = null;
  let paused = false;
  let scrollRaf = null;

  const isMobile = () => window.innerWidth <= 700;

  const scrollCardIntoRail = (card) => {
    if (!cardsRail || !card) return;
    const isHorizontalRail = cardsRail.scrollWidth > cardsRail.clientWidth + 4;

    if (isHorizontalRail) {
      const targetLeft = Math.max(0, card.offsetLeft - 8);
      cardsRail.scrollTo({ left: targetLeft, behavior: 'smooth' });
      return;
    }

    const showcaseRect = showcase.getBoundingClientRect();
    const showcaseVisible = showcaseRect.bottom > window.innerHeight * 0.15 && showcaseRect.top < window.innerHeight * 0.85;
    if (!showcaseVisible) return;

    card.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  // Keep a single active card in sync with visual state and mobile scroll.
  const setActive = (index, shouldScroll) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      const active = cardIndex === activeIndex;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (active && shouldScroll && window.innerWidth <= 700) {
        scrollCardIntoRail(card);
      }
    });
  };

  const stopAutoplay = () => {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
  };

  const startAutoplay = () => {
    if (timer || paused || reducedMotion) return;
    timer = window.setInterval(() => {
      setActive(activeIndex + 1, true);
    }, autoplayMs);
  };

  // Card-level interactions should immediately take control of the active state.
  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      paused = true;
      stopAutoplay();
      setActive(index, false);
    });

    card.addEventListener('focus', () => {
      paused = true;
      stopAutoplay();
      setActive(index, false);
    });

    card.addEventListener('click', () => {
      paused = true;
      stopAutoplay();
      setActive(index, true);
    });

    card.addEventListener('touchstart', () => {
      paused = true;
      stopAutoplay();
      setActive(index, false);
    }, { passive: true });
  });

  if (cardsRail) {
    cardsRail.addEventListener('scroll', () => {
      if (!isMobile()) return;
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);

      scrollRaf = window.requestAnimationFrame(() => {
        const railRect = cardsRail.getBoundingClientRect();
        const targetX = railRect.left + railRect.width * 0.5;
        let nearestIndex = activeIndex;
        let nearestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const center = rect.left + rect.width * 0.5;
          const distance = Math.abs(center - targetX);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        if (nearestIndex !== activeIndex) {
          setActive(nearestIndex, false);
        }
      });
    }, { passive: true });
  }

  // Pause autoplay while the section is hovered, then resume on exit.
  showcase.addEventListener('mouseenter', () => {
    paused = true;
    stopAutoplay();
  });

  showcase.addEventListener('mouseleave', () => {
    paused = false;
    startAutoplay();
  });

  showcase.addEventListener('focusout', (event) => {
    if (showcase.contains(event.relatedTarget)) return;
    paused = false;
    startAutoplay();
  });

  if (completeMenuButton) {
    completeMenuButton.addEventListener('click', () => {
      if (typeof window.openMenuFlipbook === 'function') {
        window.openMenuFlipbook();
      }
    });
  }

  setActive(0, false);
  startAutoplay();
})();

(function initMenuFlipbook() {
  const openFlipbookButton = document.querySelector('#open-flipbook');
  const closeFlipbookButton = document.querySelector('#close-flipbook');
  const flipbookOverlay = document.querySelector('#flipbook-overlay');
  const flipbookContainer = document.querySelector('#flipbook');
  const currentPageNode = document.querySelector('#current-page');
  const totalPageNode = document.querySelector('#total-pages');
  const nextPageButton = document.querySelector('#next-page');
  const prevPageButton = document.querySelector('#prev-page');
  const bookPreview = document.querySelector('.book-preview');

  if (!closeFlipbookButton || !flipbookOverlay || !flipbookContainer) return;

  const menuPages = [
    'assets/menu/1.jpg',
    'assets/menu/2.jpg',
    'assets/menu/3.jpg',
    'assets/menu/4.jpg',
    'assets/menu/5.jpg',
    'assets/menu/6.jpg',
    'assets/menu/7.jpg',
    'assets/menu/8.jpg'
  ];

  let flipBook = null;


  const buildFlipbook = () => {
    if (!flipbookContainer) return;

    flipbookContainer.innerHTML = '';

    menuPages.forEach((src, i) => {
      const page = document.createElement('div');
      page.className = 'page';
      page.innerHTML = '<img src="' + src + '" alt="Menu page ' + (i + 1) + '" style="width:100%;height:100%;object-fit:cover;display:block;">';
      flipbookContainer.appendChild(page);
    });
  };

  const initFlipbook = () => {
    if (!flipbookContainer || typeof window.St === 'undefined' || typeof window.St.PageFlip === 'undefined') return;

    buildFlipbook();

    const isMobile = window.innerWidth < 768;
    const width = isMobile ? Math.max(280, Math.floor(window.innerWidth * 0.86)) : Math.min(Math.floor(window.innerWidth * 0.4), 500);
    const height = Math.floor(width * 1.4);

    flipBook = new window.St.PageFlip(flipbookContainer, {
      width,
      height,
      size: 'fixed',
      minWidth: 280,
      maxWidth: 500,
      minHeight: 400,
      maxHeight: 700,
      showCover: !isMobile,
      mobileScrollSupport: true,
      useMouseEvents: true,
      drawShadow: true,
      flippingTime: 700,
      usePortrait: isMobile,
      startZIndex: 10,
      autoSize: true,
      maxShadowOpacity: 0.4,
      showPageCount: false,
      clickEventForward: true,
      swipeDistance: 30
    });

    flipBook.loadFromHTML(document.querySelectorAll('#flipbook .page'));

    if (totalPageNode) totalPageNode.textContent = String(menuPages.length);
    if (currentPageNode) currentPageNode.textContent = '1';

    flipBook.on('flip', (e) => {
      if (currentPageNode) currentPageNode.textContent = String((e.data || 0) + 1);
      if (totalPageNode) totalPageNode.textContent = String(menuPages.length);
    });
  };

  const openFlipbook = () => {
    if (!flipbookOverlay) return;

    flipbookOverlay.classList.remove('hidden');
    flipbookOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (!flipBook) {
      window.setTimeout(initFlipbook, 100);
    }
  };

  window.openMenuFlipbook = openFlipbook;

  const shouldOpenFullMenu = new URLSearchParams(window.location.search).get('open') === 'fullmenu';
  if (shouldOpenFullMenu) {
    window.setTimeout(openFlipbook, 180);
  }

  const closeFlipbook = () => {
    if (!flipbookOverlay) return;

    flipbookOverlay.classList.add('hidden');
    flipbookOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (openFlipbookButton) {
    openFlipbookButton.addEventListener('click', openFlipbook);
  }

  if (bookPreview) {
    bookPreview.addEventListener('click', openFlipbook);
    bookPreview.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      openFlipbook();
    });
  }

  closeFlipbookButton.addEventListener('click', closeFlipbook);

  if (flipbookOverlay) {
    flipbookOverlay.addEventListener('click', (e) => {
      if (e.target === flipbookOverlay) {
        closeFlipbook();
      }
    });
  }

  if (nextPageButton) {
    nextPageButton.addEventListener('click', () => {
      if (flipBook) flipBook.flipNext();
    });
  }

  if (prevPageButton) {
    prevPageButton.addEventListener('click', () => {
      if (flipBook) flipBook.flipPrev();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!flipbookOverlay || flipbookOverlay.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight' && flipBook) flipBook.flipNext();
    if (e.key === 'ArrowLeft' && flipBook) flipBook.flipPrev();
    if (e.key === 'Escape') closeFlipbook();
  });
})();
