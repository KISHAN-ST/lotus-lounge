window.AdminAuth = {
  user: null,
  path: window.location.pathname,
  supabase: window.supabaseClient,

  async requireAuth() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error || !data?.user) {
      window.location.href = '/admin/login.html';
      return null;
    }

    this.user = data.user;
    const userEmail = document.querySelector('[data-user-email]');
    if (userEmail) userEmail.textContent = data.user.email || 'admin@lotuslounge.in';
    return data.user;
  },

  async logout() {
    await this.supabase.auth.signOut();
    window.location.href = '/admin/login.html';
  },

  bindSidebar() {
    const hamburger = document.querySelector('[data-sidebar-toggle]');
    const sidebar = document.querySelector('.sidebar');
    if (!hamburger || !sidebar) return;

    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  },

  setActiveNav() {
    const current = this.path.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      link.classList.toggle('active', href === current);
    });
  },

  ensureToastWrap() {
    if (document.querySelector('.toast-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  },

  toast(message, type = 'success', autoDismiss = true) {
    this.ensureToastWrap();
    const wrap = document.querySelector('.toast-wrap');
    const toast = document.createElement('div');
    toast.className = 'toast ' + (type === 'error' ? 'error' : 'success');

    const text = document.createElement('span');
    text.textContent = message;

    const close = document.createElement('button');
    close.className = 'btn-icon';
    close.textContent = '✕';
    close.addEventListener('click', () => toast.remove());

    toast.append(text, close);
    wrap.appendChild(toast);

    if (autoDismiss && type !== 'error') {
      window.setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  },

  setBusy(button, busy, idleLabel, busyLabel = 'Loading...') {
    if (!button) return;
    button.disabled = busy;
    button.classList.toggle('loading', busy);
    button.textContent = busy ? busyLabel : idleLabel;
  },

  emptyState(container, text) {
    container.innerHTML = '<div class="empty">📭 ' + text + '</div>';
  },

  statusBadge(status) {
    const normalized = String(status || 'pending').toLowerCase();
    return '<span class="badge ' + normalized + '">' + normalized + '</span>';
  },

  confirmDanger(text = 'Are you sure? This cannot be undone.') {
    return window.confirm(text);
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname.endsWith('/login.html')) return;
  await window.AdminAuth.requireAuth();
  window.AdminAuth.bindSidebar();
  window.AdminAuth.setActiveNav();

  const logoutBtn = document.querySelector('[data-logout]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await window.AdminAuth.logout();
    });
  }
});
