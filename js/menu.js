'use strict';

(function initFeaturedSwipeCarousel() {
  const viewport = document.querySelector('#featured-viewport');
  const track = document.querySelector('#featured-track');
  const dotsContainer = document.querySelector('#featured-dots');
  const prevButton = document.querySelector('#featured-prev');
  const nextButton = document.querySelector('#featured-next');
  const swipePrompt = document.querySelector('#featured-swipe-prompt');

  if (!viewport || !track || !dotsContainer) return;

  const cards = Array.from(track.querySelectorAll('.menu-item--featured'));
  if (!cards.length) return;

  const SWIPE_PROMPT_KEY = 'lotus-featured-swipe-done';
  const MOBILE_BREAKPOINT = 700;
  const RUBBER_BAND_LIMIT = 0.3;

  let activeIndex = 0;
  let cardWidth = 0;
  let cardStep = 0;
  let maxIndex = 0;

  let pointerDown = false;
  let isDragging = false;
  let dragIntent = null;
  let startX = 0;
  let startY = 0;
  let startTranslate = 0;
  let currentTranslate = 0;
  let animationFrame = null;

  const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

  const getGap = () => {
    const styles = window.getComputedStyle(track);
    return parseFloat(styles.columnGap || styles.gap || '0') || 0;
  };

  const computeMetrics = () => {
    const firstCard = cards[0];
    if (!firstCard) return;

    cardWidth = firstCard.getBoundingClientRect().width;
    cardStep = cardWidth + getGap();
    maxIndex = Math.max(0, cards.length - 1);
  };

  const clampIndex = (value) => Math.max(0, Math.min(value, maxIndex));

  const maxTranslate = () => 0;
  const minTranslate = () => -maxIndex * cardStep;

  const getSnapTranslate = (index) => -index * cardStep;

  const updateControls = () => {
    const dots = dotsContainer.querySelectorAll('.menu-featured__dot');
    dots.forEach((dot, index) => {
      const active = index === activeIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.setAttribute('tabindex', active ? '0' : '-1');
    });

    if (prevButton) prevButton.disabled = activeIndex === 0;
    if (nextButton) nextButton.disabled = activeIndex === maxIndex;
  };

  const applyTranslate = (value, withTransition) => {
    currentTranslate = value;
    track.style.transition = withTransition ? 'transform 320ms cubic-bezier(0.18, 0.7, 0.2, 1)' : 'none';
    track.style.transform = 'translate3d(' + value + 'px, 0, 0)';
  };

  const setIndex = (index, animate) => {
    activeIndex = clampIndex(index);
    applyTranslate(getSnapTranslate(activeIndex), animate);
    updateControls();
  };

  const hideSwipePrompt = () => {
    if (!swipePrompt || swipePrompt.dataset.dismissed === 'true') return;

    swipePrompt.dataset.dismissed = 'true';
    swipePrompt.classList.add('is-fading');
    window.setTimeout(() => {
      swipePrompt.classList.remove('is-visible');
      swipePrompt.classList.remove('is-fading');
      swipePrompt.style.display = 'none';
    }, 260);

    try {
      window.localStorage.setItem(SWIPE_PROMPT_KEY, '1');
    } catch (_error) {
      // Ignore storage issues in private mode.
    }
  };

  const showSwipePrompt = () => {
    if (!swipePrompt || !isMobile()) return;
    let shouldShow = true;

    try {
      shouldShow = window.localStorage.getItem(SWIPE_PROMPT_KEY) !== '1';
    } catch (_error) {
      shouldShow = true;
    }

    if (!shouldShow) {
      swipePrompt.style.display = 'none';
      return;
    }

    swipePrompt.style.display = 'inline-flex';
    swipePrompt.classList.add('is-visible');
  };

  const buildDots = () => {
    dotsContainer.innerHTML = '';
    cards.forEach((_, index) => {
      const button = document.createElement('button');
      button.className = 'menu-featured__dot';
      button.type = 'button';
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-label', 'Go to featured card ' + (index + 1));
      button.addEventListener('click', () => setIndex(index, true));
      dotsContainer.appendChild(button);
    });
  };

  const stopDragging = (pointerId) => {
    pointerDown = false;
    isDragging = false;
    dragIntent = null;
    if (typeof pointerId === 'number' && viewport.hasPointerCapture(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }
    viewport.classList.remove('is-dragging');
    track.style.transition = 'transform 320ms cubic-bezier(0.18, 0.7, 0.2, 1)';
  };

  const onPointerDown = (event) => {
    if (!isMobile() || event.pointerType === 'mouse') return;

    pointerDown = true;
    isDragging = false;
    dragIntent = null;
    startX = event.clientX;
    startY = event.clientY;
    startTranslate = currentTranslate;
    viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!pointerDown || !isMobile()) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (!dragIntent) {
      const horizontalThreshold = 8;
      const verticalThreshold = 8;
      if (Math.abs(deltaX) < horizontalThreshold && Math.abs(deltaY) < verticalThreshold) return;
      dragIntent = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
    }

    if (dragIntent === 'vertical') {
      stopDragging(event.pointerId);
      return;
    }

    event.preventDefault();

    if (!isDragging) {
      isDragging = true;
      viewport.classList.add('is-dragging');
      hideSwipePrompt();
    }

    const maxLeft = maxTranslate();
    const maxRight = minTranslate();
    let nextTranslate = startTranslate + deltaX;

    if (nextTranslate > maxLeft) {
      const overscroll = nextTranslate - maxLeft;
      const bounded = Math.min(overscroll, cardWidth * RUBBER_BAND_LIMIT);
      nextTranslate = maxLeft + bounded;
    }

    if (nextTranslate < maxRight) {
      const overscroll = maxRight - nextTranslate;
      const bounded = Math.min(overscroll, cardWidth * RUBBER_BAND_LIMIT);
      nextTranslate = maxRight - bounded;
    }

    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }

    animationFrame = window.requestAnimationFrame(() => {
      applyTranslate(nextTranslate, false);
    });
  };

  const onPointerUp = (event) => {
    if (!pointerDown) return;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    const movedBy = currentTranslate - startTranslate;
    const threshold = Math.max(38, cardWidth * 0.14);

    if (dragIntent === 'horizontal' && Math.abs(movedBy) > threshold) {
      if (movedBy < 0) {
        setIndex(activeIndex + 1, true);
      } else {
        setIndex(activeIndex - 1, true);
      }
    } else {
      setIndex(activeIndex, true);
    }

    stopDragging(event.pointerId);
  };

  const onPointerCancel = () => {
    if (!pointerDown) return;
    setIndex(activeIndex, true);
    stopDragging();
  };

  const bindControls = () => {
    if (prevButton) prevButton.addEventListener('click', () => setIndex(activeIndex - 1, true));
    if (nextButton) nextButton.addEventListener('click', () => setIndex(activeIndex + 1, true));

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove, { passive: false });
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerCancel);
    viewport.addEventListener('pointerleave', onPointerCancel);
  };

  const handleResize = () => {
    computeMetrics();
    if (!isMobile()) {
      track.style.transition = '';
      track.style.transform = '';
      dotsContainer.innerHTML = '';
      if (swipePrompt) {
        swipePrompt.classList.remove('is-visible');
        swipePrompt.style.display = 'none';
      }
      return;
    }

    buildDots();
    showSwipePrompt();
    setIndex(activeIndex, false);
  };

  bindControls();
  handleResize();
  window.addEventListener('resize', handleResize);
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

  if (!openFlipbookButton || !closeFlipbookButton || !flipbookOverlay || !flipbookContainer) return;

  const menuPages = [
    'assets/menu-pdf/cover.jpg',
    'assets/menu-pdf/page-1.jpg',
    'assets/menu-pdf/page-2.jpg',
    'assets/menu-pdf/page-3.jpg',
    'assets/menu-pdf/page-4.jpg',
    'assets/menu-pdf/page-5.jpg',
    'assets/menu-pdf/page-6.jpg',
    'assets/menu-pdf/back-cover.jpg'
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
      showCover: true,
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

  const closeFlipbook = () => {
    if (!flipbookOverlay) return;

    flipbookOverlay.classList.add('hidden');
    flipbookOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openFlipbookButton.addEventListener('click', openFlipbook);

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
