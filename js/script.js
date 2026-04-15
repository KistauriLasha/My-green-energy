tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f0faf7',
                    100: '#d1f0e5',
                    500: '#43b692',
                    600: '#369476',
                    700: '#2a735c',
                },
                corporate: {
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок
    lucide.createIcons();

    // Инициализация GLightbox
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }

    // Мобильное меню
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => menu.classList.toggle('hidden'));

        // Закрытие при клике на ссылку
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => menu.classList.add('hidden'));
        });
    }

    // Intersection Observer для анимаций появления
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Эффект скролла для хедера
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('bg-white', 'shadow-md');
                header.classList.remove('bg-white/80', 'backdrop-blur-md');
            } else {
                header.classList.remove('bg-white', 'shadow-md');
                header.classList.add('bg-white/80', 'backdrop-blur-md');
            }
        });
    }

});
