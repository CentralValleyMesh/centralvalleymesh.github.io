/* ── Global dropdown toggle (called from onclick) ──────────────────*/
function toggleNav(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.nav-has-dropdown.open').forEach(d => d.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

/* Central Valley Mesh — main.js */

/* ── Announcement bar ──────────────────────────────────────────────
   enabled: true/false — global on/off
   id: bump this string to re-show for users who already dismissed
   message: supports HTML/links, use absolute paths (/stats.html)
──────────────────────────────────────────────────────────────────── */
const ANNOUNCE = {
  enabled: true,
  id:      'cvm-announce-v4',
  label:   'New',
  message: 'CentralValleyMesh.net is live! Explore the <a href="/stats.html">Live Stats</a> and <a href="/docs/config-wizard.html">Config Wizard</a>.',
};

(function initAnnounceBar() {
  if (!ANNOUNCE.enabled) return;
  if (localStorage.getItem('announce-dismissed') === ANNOUNCE.id) return;
  const bar = document.createElement('div');
  bar.className = 'announce-bar';
  bar.id = 'announce-bar';
  bar.innerHTML = `
    <div class="announce-icon">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    </div>
    <div class="announce-text">${ANNOUNCE.message}</div>
    ${ANNOUNCE.label ? `<span class="announce-label">${ANNOUNCE.label}</span>` : ''}
    <button class="announce-close" onclick="dismissAnnounce()" aria-label="Dismiss">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  document.body.prepend(bar);
  document.body.classList.add('has-announce-bar');
})();

function dismissAnnounce() {
  const bar = document.getElementById('announce-bar');
  if (bar) {
    bar.style.transition = 'opacity .2s, transform .2s';
    bar.style.opacity = '0';
    bar.style.transform = 'translateY(-100%)';
    setTimeout(() => bar.remove(), 200);
  }
  document.body.classList.remove('has-announce-bar');
  localStorage.setItem('announce-dismissed', ANNOUNCE.id);
}

/* ── Dropdown navigation ───────────────────────────────────────────
   Toggle handled via onclick="toggleNav(id)" on each button.
   This function only wires up close-on-outside-click and Escape.
──────────────────────────────────────────────────────────────────── */
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-has-dropdown');

  // Close on outside click
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('open'));
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') dropdowns.forEach(d => d.classList.remove('open'));
  });

  // Prevent dropdown panel clicks from closing
  document.querySelectorAll('.nav-dropdown').forEach(panel => {
    panel.addEventListener('click', e => e.stopPropagation());
  });

  // Prevent trigger button clicks from triggering outside-click close
  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.nav-dropdown-trigger');
    if (trigger) trigger.addEventListener('click', e => e.stopPropagation());
  });
}

/* ── Mobile nav ────────────────────────────────────────────────────
   Hamburger toggle + expandable sections for Docs and Community
──────────────────────────────────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close mobile menu on link click (non-expandable links)
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function toggleMobSection(id) {
  const sec = document.getElementById(id);
  if (sec) sec.classList.toggle('open');
}

/* ── Theme toggle ──────────────────────────────────────────────────*/
(function() {
  if (localStorage.getItem('cvm-theme') === 'light') {
    document.body.classList.add('light');
  }
})();

function initTheme() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('cvm-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
}

/* ── Active nav link ───────────────────────────────────────────────*/
(function() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-dropdown a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (!href || href === '#') return;
    // Match on filename
    const hrefFile = href.split('/').pop().split('#')[0].split('?')[0];
    const pathFile = path.split('/').pop().split('?')[0] || 'index.html';
    if (hrefFile && hrefFile === pathFile && !a.closest('.nav-dropdown')) {
      a.classList.add('active');
    }
  });
})();

/* ── Scroll fade-in ────────────────────────────────────────────────*/
// Show elements already in viewport immediately on load
function revealVisible() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Run immediately and after a short delay (fonts/layout may shift)
revealVisible();
setTimeout(revealVisible, 100);

/* ── Init ──────────────────────────────────────────────────────────*/
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDropdowns();
    initMobileNav();
  });
} else {
  initTheme();
  initDropdowns();
  initMobileNav();
}
