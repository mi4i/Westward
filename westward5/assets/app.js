/* =========================================================
   WESTWARD AUTO REPAIR — front-end presentation interactions
   - mobile navigation
   - safe parallax (disabled for reduced-motion users)
   - scroll reveal
   - booking presentation modal
   ========================================================= */
const menuBtn = document.querySelector('.menu-btn');
const mobilePanel = document.querySelector('[data-mobile-panel]');
if (menuBtn && mobilePanel) {
  menuBtn.addEventListener('click', () => {
    const open = mobilePanel.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobilePanel.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

/* Reveal sections only once to keep the page calm, not gimmicky. */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Lightweight requestAnimationFrame parallax. No third-party library needed. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxLayers = [...document.querySelectorAll('[data-parallax]')];
let ticking = false;
function updateParallax() {
  const y = window.scrollY;
  parallaxLayers.forEach(layer => {
    const speed = Number(layer.dataset.parallax || 0.1);
    layer.style.transform = `translate3d(0, ${y * speed}px, 0)`;
  });
  ticking = false;
}
if (!reduceMotion && parallaxLayers.length) {
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
  }, { passive: true });
  updateParallax();
}

/* Presentation-only booking dialog. */
const modal = document.querySelector('[data-booking-modal]');
document.querySelectorAll('[data-open-booking]').forEach(btn => btn.addEventListener('click', () => {
  if (modal?.showModal) modal.showModal();
}));
const fakeSubmit = document.querySelector('#fakeSubmit');
const form = document.querySelector('#bookingForm');
if (fakeSubmit && form) {
  fakeSubmit.addEventListener('click', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.querySelector('.form-success')?.classList.add('show');
  });
}
