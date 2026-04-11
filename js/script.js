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

    // Аккордеон FAQ
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('[data-lucide="chevron-down"]');

            // Переключение контента
            content.classList.toggle('hidden');

            // Поворот иконки
            if (icon) {
                icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            }

            // Закрытие других открытых элементов (опционально)
            faqButtons.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('[data-lucide="chevron-down"]');
                    otherContent.classList.add('hidden');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });
        });
    });
});
