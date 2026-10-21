/* ============================================================
   PORTFOLIO — main.js
   Interatividade: nav, filtros de stack, animações de skill bars
   ============================================================ */

// ── NAV: pills de navegação ──────────────────────────────────
document.querySelectorAll('.npill[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });

    // atualiza pill ativo (só na nav desktop)
    document.querySelectorAll('.nav-pills .npill').forEach(p => p.classList.remove('active'));
    const navPill = document.querySelector(`.nav-pills .npill[data-target="${btn.dataset.target}"]`);
    if (navPill) navPill.classList.add('active');

    // fecha menu mobile se aberto
    document.getElementById('mobile-menu').classList.remove('open');
  });
});

// ── NAV: scroll highlight ────────────────────────────────────
const sections = ['hero', 'stack', 'projects', 'about'];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-pills .npill').forEach(p => p.classList.remove('active'));
      const navPill = document.querySelector(`.nav-pills .npill[data-target="${entry.target.id}"]`);
      if (navPill) navPill.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// ── HAMBURGER MENU ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// ── SKILL BARS: animar ao entrar na viewport ─────────────────
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sb-fill').forEach(fill => {
        const targetWidth = fill.dataset.width;
        fill.style.width = targetWidth + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroCard = document.querySelector('.hero-card');
if (heroCard) barObserver.observe(heroCard);

// ── STACK FILTER ─────────────────────────────────────────────
function filterChips(cat, btn) {
  document.querySelectorAll('.ctab').forEach(t => t.classList.remove('on'));
  btn.classList.add('on');

  const chips = document.querySelectorAll('#chips .chip');
  let visible = 0;

  chips.forEach(chip => {
    const show = cat === 'all' || chip.dataset.cat === cat;
    chip.style.display = show ? 'flex' : 'none';
    if (show) visible++;
  });

  document.getElementById('chip-count').textContent =
    visible + ' tecnologia' + (visible !== 1 ? 's' : '');
}

// expõe globalmente para os botões inline no HTML
window.filterChips = filterChips;
