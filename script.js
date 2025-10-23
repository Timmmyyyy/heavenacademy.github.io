// === ОНОВЛЕНА ІНІЦІАЛІЗАЦІЯ СЛАЙДЕРА SWIPER.JS ===
const swiper = new Swiper('.mySwiper', {
    
    // --- 1. Налаштування за замовчуванням (для мобільних) ---
    direction: 'horizontal', // Горизонтальний напрямок
    effect: 'slide',         // Звичайний ефект
    loop: true,              // Можемо увімкнути loop для горизонтального
    grabCursor: true,
    slidesPerView: 1,      // Показувати 1 слайд
    spaceBetween: 30,      // Невеликий відступ між слайдами
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // --- 2. Налаштування для десктопу (спрацює при > 768px) ---
    breakpoints: {
        // Коли ширина екрану 769px або більше
        769: {
            direction: 'vertical', // Повертаємо вертикальний напрямок
            effect: 'cards',     // Повертаємо ефект карток
            loop: false,         // Вимикаємо loop (як було у вас)
            // 'slidesPerView' і 'spaceBetween' не потрібні для ефекту 'cards'
        }
    }
});

// --- Логіка для Бургер-меню (без змін) ---

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
    // Додаємо 'event' в аргументи, щоб мати доступ до події кліку
    link.addEventListener('click', (event) => {

        // Перевіряємо, чи меню відкрите
        if (navMenu.classList.contains('active')) {
            toggleMenu(); // Якщо так, закриваємо його
        }

        // Плавна прокрутка до секції
        const targetId = link.getAttribute('href');
        // Переконуємось, що посилання веде на якір (#)
        if (targetId && targetId.startsWith('#')) {
            // Забороняємо браузеру миттєво стрибати по якорю
            event.preventDefault(); 
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Використовуємо setTimeout, щоб меню встигло закритись перед прокруткою
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 300); // 300 мілісекунд
            }
        }
    });
});