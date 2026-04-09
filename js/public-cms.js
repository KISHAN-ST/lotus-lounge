(function initPublicCMS() {
  const sb = window.supabaseClientPublic;
  if (!sb) return;

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function slugify(input) {
    return String(input || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function formatPrice(price) {
    if (price === null || price === undefined || price === '') return '';
    return '₹' + Number(price).toLocaleString('en-IN');
  }

  async function loadAnnouncementBanner() {
    const host = document.getElementById('announcement-banner-host');
    if (!host) return;

    const { data, error } = await sb.from('announcements').select('id,message,is_active').eq('is_active', true).limit(1);
    if (error || !data || !data.length) {
      host.innerHTML = '';
      return;
    }

    const row = data[0];
    host.innerHTML =
      '<div class="announcement-banner">' +
      '<span>' + escapeHtml(row.message) + '</span>' +
      '<button type="button" aria-label="Close announcement">✕</button>' +
      '</div>';

    host.querySelector('button').addEventListener('click', () => {
      host.innerHTML = '';
    });
  }

  async function loadIndexMenuPreview() {
    const wrap = document.querySelector('.dishes');
    if (!wrap) return;

    const { data, error } = await sb
      .from('menu_items')
      .select('id,name,category,price,image_url,is_chefs_special,is_available')
      .eq('is_chefs_special', true)
      .eq('is_available', true)
      .limit(3);

    if (error || !data || !data.length) return;

    wrap.innerHTML = data.map((item) =>
      '<article class="dish-card">' +
      '<img src="' + escapeHtml(item.image_url || 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80&auto=format&fit=crop') + '" alt="' + escapeHtml(item.name || 'Menu item') + '" loading="lazy">' +
      '<span>' + escapeHtml(item.category || 'Signature') + '</span>' +
      '<h3>' + escapeHtml(item.name || '-') + '</h3>' +
      '<i></i>' +
      '<p>' + formatPrice(item.price) + '</p>' +
      '</article>'
    ).join('');
  }

  async function loadIndexReviews() {
    const rail = document.querySelector('.reviews-rail');
    if (!rail) return;

    const { data, error } = await sb.from('reviews').select('reviewer_name,name,review_text,text,rating,is_visible').eq('is_visible', true).order('id', { ascending: false });
    if (error || !data || !data.length) return;

    rail.innerHTML = data.map((r) => {
      const rating = Math.max(1, Math.min(5, Number(r.rating || 5)));
      return '<article class="review">' +
        '<span>"</span>' +
        '<p>' + escapeHtml(r.review_text || r.text || '') + '</p>' +
        '<div class="stars">' + Array.from({ length: rating }).map(() => '<i></i>').join('') + '</div>' +
        '<h4>' + escapeHtml(r.reviewer_name || r.name || 'Guest') + '</h4>' +
      '</article>';
    }).join('');

    const avg = data.reduce((sum, r) => sum + Number(r.rating || 0), 0) / data.length;
    const ratingBadge = document.querySelector('.rating-badge strong');
    const ratingText = document.querySelector('.rating-badge p');
    if (ratingBadge) ratingBadge.textContent = avg.toFixed(1);
    if (ratingText) ratingText.textContent = data.length + ' reviews on Google';
  }

  async function loadFullMenuPage() {
    const content = document.querySelector('.menu-content');
    const sidebar = document.querySelector('.menu-sidebar');
    if (!content || !sidebar) return;

    const { data, error } = await sb
      .from('menu_items')
      .select('id,name,description,category,price,is_vegetarian,is_chefs_special,is_available')
      .eq('is_available', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error || !data || !data.length) return;

    const grouped = data.reduce((acc, item) => {
      const key = item.category || 'Uncategorized';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    const categories = Object.keys(grouped);
    sidebar.innerHTML =
      '<p>Menu Sections</p>' +
      categories.map((cat, i) => '<a href="#' + slugify(cat) + '" class="menu-anchor' + (i === 0 ? ' active' : '') + '">' + escapeHtml(cat) + '</a>').join('');

    content.innerHTML = categories.map((cat, index) => {
      const items = grouped[cat];
      return '<section id="' + slugify(cat) + '" class="menu-block section-number" data-number="' + String(index + 1).padStart(2, '0') + '">' +
        '<p class="label">' + escapeHtml(cat) + '</p>' +
        '<div class="menu-items-grid">' +
        items.map((item) =>
          '<article class="menu-entry">' +
          '<h3>' + escapeHtml(item.name) + (item.is_vegetarian ? ' <span class="veg-dot"></span>' : '') + (item.is_chefs_special ? ' <em>Chef\'s Recommendation</em>' : '') + '</h3>' +
          '<p>' + escapeHtml(item.description || '') + '</p>' +
          '<strong>' + formatPrice(item.price) + '</strong>' +
          '</article>'
        ).join('') +
        '</div>' +
      '</section>';
    }).join('');

    if (typeof window.initMenuAnchorBindings === 'function') {
      window.initMenuAnchorBindings();
    }
  }

  async function bindReservationSubmit() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    const message = document.getElementById('reservation-message');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        if (message) message.textContent = 'Please complete all required fields.';
        return;
      }

      const payload = {
        name: (document.getElementById('name')?.value || '').trim(),
        phone: (document.getElementById('phone')?.value || '').trim(),
        date: document.getElementById('date')?.value || null,
        time: document.getElementById('time')?.value || null,
        guests: Number(document.getElementById('guests')?.value?.replace(/\D/g, '') || 0) || null,
        occasion: document.getElementById('occasion')?.value || null,
        special_requests: (document.getElementById('requests')?.value || '').trim(),
        status: 'pending'
      };

      const { error } = await sb.from('reservations').insert(payload);
      if (error) {
        if (message) message.textContent = 'Unable to submit reservation right now. Please try again.';
        return;
      }

      form.reset();
      if (message) message.textContent = "Your table is reserved! We'll confirm shortly.";
    });
  }

  window.addEventListener('DOMContentLoaded', async () => {
    await loadAnnouncementBanner();
    await loadIndexMenuPreview();
    await loadIndexReviews();
    await loadFullMenuPage();
    await bindReservationSubmit();
  });
})();
