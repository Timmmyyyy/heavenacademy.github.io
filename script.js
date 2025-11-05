// Ініціалізація слайдера Swiper.js (ПОВЕРНУТО ВАШУ ОРИГІНАЛЬНУ ВЕРСІЮ)
const swiper = new Swiper('.mySwiper', {
    direction: 'vertical', 
    effect: 'cards',
    grabCursor: true,
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// --- Логіка для Бургер-меню --- (Ваш оригінальний код)
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
    link.addEventListener('click', (e) => { // Додано 'e'
        // Перевіряємо, чи меню відкрите
        if (navMenu.classList.contains('active')) {
            toggleMenu(); // Якщо так, закриваємо його
        }

        // Плавна прокрутка до секції
        const targetId = link.getAttribute('href');
        
        // Ця перевірка запобігає "стрибку" сторінки при кліку на посилання
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault(); // Запобігаємо миттєвому "стрибку"
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

// === ПОЧАТОК НОВОГО КОДУ: ЛОГІКА МОДАЛЬНОГО ВІКНА ===

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('course-modal');
    if (!modal) return; // Зупиняємо, якщо модалки немає на сторінці

    const closeModalBtn = document.getElementById('modal-close');
    const detailsButtons = document.querySelectorAll('.btn-details');

    // Елементи модального вікна для заповнення
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDetails = document.getElementById('modal-details');
    const modalCourseInput = document.getElementById('modal-course-title-input');

    // Функція відкриття модалки
    const openModal = (e) => {
        e.preventDefault(); // Запобігаємо переходу по посиланню
        
        const button = e.currentTarget;
        const courseId = button.getAttribute('data-course-id');
        const courseTitle = button.getAttribute('data-course-title');
        
        // Знаходимо картку та беремо з неї фото
        const card = button.closest('.swiper-slide');
        const imageSrc = card.querySelector('.course-card-bg').src;

        // Знаходимо template з деталями
        const detailsTemplate = document.getElementById(`details-${courseId}`);
        const detailsHtml = detailsTemplate ? detailsTemplate.innerHTML : '<p>Детальний опис курсу скоро з\'явиться.</p>';

        // Заповнюємо модальне вікно
        modalTitle.textContent = courseTitle;
        modalImage.src = imageSrc;
        modalDetails.innerHTML = detailsHtml;
        modalCourseInput.value = courseTitle; // Встановлюємо назву курсу для форми

        // Показуємо модальне вікно
        modal.classList.add('active');
        body.classList.add('no-scroll');
    };

    // Функція закриття модалки
    const closeModal = () => {
        modal.classList.remove('active');
        body.classList.remove('no-scroll');
    };

    // Навішуємо слухачі
    detailsButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Закриття по кліку на оверлей (темний фон)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закриття по натисканню на 'Escape'
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
// === КІНЕЦЬ НОВОГО КОДУ ===