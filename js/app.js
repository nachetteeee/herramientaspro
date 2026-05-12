/* ===========================
   HerramientasPro - app.js
   Shared utilities & components
   =========================== */

// --- All tools index (for search) ---
const TOOLS = [
  { name: 'Generador de Contraseñas', icon: '🔐', cat: 'Dev Tools', url: '/herramientas/generador-contrasenas.html' },
  { name: 'Encoder / Decoder Base64', icon: '🔄', cat: 'Dev Tools', url: '/herramientas/base64.html' },
  { name: 'Validador y Formateador JSON', icon: '📋', cat: 'Dev Tools', url: '/herramientas/json-formateador.html' },
  { name: 'Generador de UUID', icon: '🎲', cat: 'Dev Tools', url: '/herramientas/uuid.html' },
  { name: 'Conversor HEX / RGB / HSL', icon: '🎨', cat: 'Dev Tools', url: '/herramientas/color-conversor.html' },
  { name: 'Encoder / Decoder URL', icon: '🔗', cat: 'Dev Tools', url: '/herramientas/url-encoder.html' },
  { name: 'Conversor Binario / Decimal / Hex', icon: '💻', cat: 'Dev Tools', url: '/herramientas/conversor-numerico.html' },
  { name: 'Generador Lorem Ipsum', icon: '📝', cat: 'Dev Tools', url: '/herramientas/lorem-ipsum.html' },
  { name: 'Minificador CSS y JS', icon: '⚡', cat: 'Dev Tools', url: '/herramientas/minificador.html' },
  { name: 'Diferenciador de Texto', icon: '🔍', cat: 'Dev Tools', url: '/herramientas/diff-texto.html' },
  { name: 'Conversor de Unidades', icon: '📐', cat: 'Herramientas Generales', url: '/herramientas/conversor-unidades.html' },
  { name: 'Calculadora de Porcentajes', icon: '💯', cat: 'Herramientas Generales', url: '/herramientas/porcentajes.html' },
  { name: 'Contador de Palabras', icon: '🔢', cat: 'Herramientas Generales', url: '/herramientas/contador-palabras.html' },
  { name: 'Generador de Códigos QR', icon: '📱', cat: 'Herramientas Generales', url: '/herramientas/generador-qr.html' },
  { name: 'Conversor de Colores', icon: '🌈', cat: 'Herramientas Generales', url: '/herramientas/color-conversor.html' },
  { name: 'Calculadora de Fechas', icon: '📅', cat: 'Herramientas Generales', url: '/herramientas/calculadora-fechas.html' },
  { name: 'Conversor de Tiempo', icon: '⏱️', cat: 'Herramientas Generales', url: '/herramientas/conversor-tiempo.html' },
  { name: 'Conversor de Bytes', icon: '💾', cat: 'Herramientas Generales', url: '/herramientas/conversor-bytes.html' },
  { name: 'Mayúsculas y Minúsculas', icon: '🔤', cat: 'Herramientas Generales', url: '/herramientas/cambiar-caso.html' },
  { name: 'Generador de Texto Aleatorio', icon: '🎰', cat: 'Herramientas Generales', url: '/herramientas/texto-aleatorio.html' },
];

// --- Header component ---
function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = `
    <div class="header-inner">
      <a href="/" class="logo">Herramientas<span>Pro</span></a>
      <nav class="header-nav">
        <a href="/herramientas/generador-contrasenas.html">Dev Tools</a>
        <a href="/herramientas/contador-palabras.html">Generales</a>
        <a href="/acerca.html">Acerca</a>
      </nav>
      <div class="header-search" style="position:relative">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="header-search-input" placeholder="Buscar herramienta..." autocomplete="off">
        <div id="search-results"></div>
      </div>
    </div>
  `;
  initSearch('header-search-input', 'search-results');
}

// --- Footer component ---
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = `
    <div class="footer-inner">
      <span class="footer-copy">© ${year} HerramientasPro — Herramientas online gratuitas</span>
      <nav class="footer-links">
        <a href="/">Inicio</a>
        <a href="/acerca.html">Acerca</a>
        <a href="/privacidad.html">Privacidad</a>
      </nav>
    </div>
  `;
}

// --- Search functionality ---
function initSearch(inputId, resultsId) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.remove('visible'); return; }
    const matches = TOOLS.filter(t =>
      t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)
    ).slice(0, 6);
    if (!matches.length) { results.classList.remove('visible'); return; }
    results.innerHTML = matches.map(t => `
      <div class="search-result-item" onclick="location.href='${t.url}'">
        <span class="sri-icon">${t.icon}</span>
        <span>
          <span class="sri-name">${t.name}</span><br>
          <span class="sri-cat">${t.cat}</span>
        </span>
      </div>
    `).join('');
    results.classList.add('visible');
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('visible');
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') results.classList.remove('visible');
  });
}

// --- Toast notification ---
function showToast(msg = '¡Copiado!', type = 'success') {
  let toast = document.getElementById('hp-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'hp-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.borderColor = type === 'success' ? 'var(--success)' : 'var(--error)';
  toast.style.color = type === 'success' ? 'var(--success)' : 'var(--error)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// --- Copy to clipboard ---
function copyText(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('¡Copiado al portapapeles!');
    if (btnEl) {
      const orig = btnEl.textContent;
      btnEl.textContent = '✓ Copiado';
      btnEl.classList.add('copied');
      setTimeout(() => { btnEl.textContent = orig; btnEl.classList.remove('copied'); }, 2000);
    }
  });
}

// --- AdSense placeholder (replace with real ad code after approval) ---
function renderAd(containerId, type = 'banner') {
  const el = document.getElementById(containerId);
  if (!el) return;
  const labels = {
    banner: 'Anuncio — 728×90',
    rectangle: 'Anuncio — 336×280',
    sidebar: 'Anuncio — 160×600',
  };
  el.innerHTML = `<span>${labels[type] || 'Anuncio'}<br><small>Espacio publicitario de Google AdSense</small></span>`;
}

// --- Counter animation for hero stats ---
function animateCounter(el, target, suffix = '', duration = 1200) {
  const start = 0;
  const startTime = performance.now();
  const isDecimal = String(target).includes('.');
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (target - start) * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const counterMap = {
    'stat-tools':   { target: 22,  suffix: '' },
    'stat-registro':{ target: 0,   suffix: '' },
    'stat-gratis':  { target: 100, suffix: '%' },
    'stat-espera':  { target: 0,   suffix: 'ms' },
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cfg = counterMap[entry.target.id];
        if (cfg) animateCounter(entry.target, cfg.target, cfg.suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  Object.keys(counterMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// --- Scroll animations ---
function initScrollAnimations() {
  // Cards observer — staggered per row of 4
  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cardObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.tool-card').forEach((el, i) => {
    el.classList.add('animate-up');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    cardObs.observe(el);
  });

  // Category cards — slower, bigger
  const catObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        catObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.category-card').forEach((el, i) => {
    el.classList.add('animate-scale');
    el.style.transitionDelay = `${i * 120}ms`;
    catObs.observe(el);
  });

  // Section titles — slide in from left
  const titleObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        titleObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('animate-left');
    titleObs.observe(el);
  });

  // Ad banners — fade in
  const adObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        adObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.ad-banner, .ad-rectangle').forEach(el => {
    el.classList.add('animate-up');
    adObs.observe(el);
  });
}

// --- Ambient scroll orbs (purple + pink blobs that drift on scroll) ---
function initAmbientOrbs() {
  const purple = document.createElement('div');
  purple.className = 'ambient-orb ambient-orb-purple';
  const pink = document.createElement('div');
  pink.className = 'ambient-orb ambient-orb-pink';
  document.body.appendChild(purple);
  document.body.appendChild(pink);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      // Purple drifts down-left as page scrolls
      purple.style.transform = `translate(${sy * -0.04}px, ${sy * 0.18}px)`;
      // Pink drifts up-right (opposite direction)
      pink.style.transform   = `translate(${sy * 0.06}px, ${sy * -0.12}px)`;
      // Also update hero glow parallax via CSS custom property
      document.documentElement.style.setProperty('--scroll-hero', `${sy * 0.28}px`);
      ticking = false;
    });
  }, { passive: true });
}

// --- 3D card tilt on mousemove (desktop only) ---
function initCardTilt() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const MAX_ROT = 6; // degrees
  const ease    = 0.4; // transition time in seconds

  document.querySelectorAll('.tool-card, .category-card').forEach(card => {
    let animId;

    card.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x  = e.clientX - rect.left;
        const y  = e.clientY - rect.top;
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -MAX_ROT;
        const rotY = ((x - cx) / cx) *  MAX_ROT;
        card.style.transition = `border-color 0.25s, box-shadow 0.25s, transform 0.08s`;
        card.style.transform  = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(animId);
      card.style.transition = `border-color 0.25s, box-shadow 0.25s, transform ${ease}s cubic-bezier(0.23, 1, 0.32, 1)`;
      card.style.transform  = '';
    });
  });
}

// --- Init on DOM ready ---
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  // Render all ad slots
  renderAd('ad-top', 'banner');
  renderAd('ad-sidebar', 'sidebar');
  renderAd('ad-mid', 'rectangle');
  // Scroll animations + counters + premium effects
  initScrollAnimations();
  initCounters();
  initAmbientOrbs();
  initCardTilt();
});
