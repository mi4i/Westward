/**
 * Главный скрипт Westward Auto Service — вариант 3.
 * Отвечает за параллакс, появление элементов, мобильное меню и мини-форму.
 */

document.addEventListener('DOMContentLoaded', function () {
    // -------------------------------------------------------------------------
    // 1. ПАРАЛЛАКС ФОНОВОЙ ФОТОГРАФИИ В HERO-БЛОКЕ
    // -------------------------------------------------------------------------
    const parallaxPhoto = document.getElementById('parallaxPhoto');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let parallaxFrameRequested = false;

    if (parallaxPhoto && !reducedMotion) {
        window.addEventListener('scroll', function () {
            // requestAnimationFrame не позволяет обработчику перегружать браузер.
            if (!parallaxFrameRequested) {
                window.requestAnimationFrame(function () {
                    const movement = Math.min(window.scrollY * 0.16, 125);
                    parallaxPhoto.style.setProperty('--parallax-y', movement + 'px');
                    parallaxFrameRequested = false;
                });
                parallaxFrameRequested = true;
            }
        }, { passive: true });
    }

    // -------------------------------------------------------------------------
    // 2. ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
    // -------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        // Запасной вариант для старых браузеров и режима reduced motion.
        revealElements.forEach(function (element) {
            element.classList.add('visible');
        });
    }

    // -------------------------------------------------------------------------
    // 3. МОБИЛЬНОЕ МЕНЮ
    // -------------------------------------------------------------------------
    const menuButton = document.getElementById('menuButton');
    const mainNav = document.getElementById('mainNav');

    if (menuButton && mainNav) {
        menuButton.addEventListener('click', function () {
            const isOpen = mainNav.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });

        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('open');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // -------------------------------------------------------------------------
    // 4. ДЕМОНСТРАЦИОННАЯ ОБРАБОТКА МИНИ-ФОРМЫ
    // -------------------------------------------------------------------------
    const requestForm = document.getElementById('requestForm');
    const formStatus = document.getElementById('formStatus');

    if (requestForm && formStatus) {
        requestForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!requestForm.checkValidity()) {
                requestForm.reportValidity();
                return;
            }

            // Здесь можно подключить отправку данных в CRM или на PHP-обработчик.
            formStatus.textContent = 'Thank you. Your request is ready to be sent.';
        });
    }
});
