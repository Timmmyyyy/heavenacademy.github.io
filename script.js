// Ініціалізація слайдера Swiper.js
const swiper = new Swiper('.mySwiper', {
    effect: 'cards',
    grabCursor: true,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// --- Логіка для Бургер-меню ---

// Знаходимо потрібні елементи в HTML
const burgerMenu = document.getElementById('burger-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

// Функція для відкриття/закриття меню
const toggleMenu = () => {
    // Додаємо/прибираємо клас 'active' для анімації
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Блокуємо/розблоковуємо прокрутку сторінки
    body.classList.toggle('no-scroll');
};

// 1. Відкриваємо/закриваємо меню при кліку на бургер
burgerMenu.addEventListener('click', toggleMenu);

// 2. Закриваємо меню при кліку на будь-яке посилання в ньому
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Перевіряємо, чи меню відкрите
        if (navMenu.classList.contains('active')) {
            toggleMenu(); // Якщо так, закриваємо його
        }

        // Плавна прокрутка до секції
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Використовуємо setTimeout, щоб меню встигло закритись перед прокруткою
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 300); // 300 мілісекунд
        }
    });
});