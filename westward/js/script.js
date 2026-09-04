/**
 * Единый скрипт сайта Westward Auto Service:
 * 1. Параллакс-эффект движения фоновой картинки
 * 2. Модальное окно просмотра YouTube-видео прямо на сайте
 * 3. Мобильное гамбургер-меню
 */

document.addEventListener('DOMContentLoaded', function () {
    
    // =========================================================================
    // 1. ПАРАЛЛАКС ЭФФЕКТ
    // =========================================================================
    const parallaxBg = document.getElementById('parallaxBg');

    // Применяем параллакс только если экран больше мобильного (ширина > 768px)
    if (parallaxBg) {
        window.addEventListener('scroll', function () {
            if (window.innerWidth > 768) {
                let scrollPosition = window.pageYOffset;
                // Мягкое смещение картинки с коэффициентом 0.25
                let translateY = scrollPosition * 0.25;
                parallaxBg.style.transform = 'translateY(' + translateY + 'px)';
            } else {
                parallaxBg.style.transform = 'none';
            }
        });
    }

    // =========================================================================
    // 2. МОДАЛЬНОЕ ОКНО YOUTUBE ВИДЕО ПРЯМО НА САЙТЕ
    // =========================================================================
    const openVideoBtn = document.getElementById('openVideoBtn');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const youtubeIframe = document.getElementById('youtubeIframe');

    // Ссылка на YouTube видео (режим embed)
    const youtubeVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

    if (openVideoBtn && videoModal && youtubeIframe) {
        
        // Открытие модального окна при клике на кнопку WATCH VIDEO
        openVideoBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // Вставляем ссылку с автозапуском
            youtubeIframe.setAttribute('src', youtubeVideoUrl);
            // Показываем модальное окно
            videoModal.classList.add('active');
        });

        // Функция закрытия модального окна
        function closeVideoModal() {
            videoModal.classList.remove('active');
            // Очищаем src, чтобы видео и звук прекратили воспроизведение
            youtubeIframe.setAttribute('src', '');
        }

        // Закрытие при клике на крестик
        if (closeVideoBtn) {
            closeVideoBtn.addEventListener('click', closeVideoModal);
        }

        // Закрытие при клике по затемненному фону вокруг окна
        videoModal.addEventListener('click', function (e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }

    // =========================================================================
    // 3. МОБИЛЬНОЕ МЕНЮ (ГAМБУРГЕР)
    // =========================================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });
    }
});