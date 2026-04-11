'use strict';

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
