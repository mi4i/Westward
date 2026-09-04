const media = document.querySelector('[data-parallax]');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (media && !reduce) { let ticking = false; addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(() => { const y = Math.min(scrollY * .18, 120); media.style.setProperty('--parallax-y', `${y}px`); ticking = false }); ticking = true } }, { passive: true }) }
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible') }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const toggle = document.querySelector('.nav-toggle'); const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)) });
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false') }));
