// script.js — легкий та робочий
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('nav-menu');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      const expanded = burger.classList.contains('active');
      burger.setAttribute('aria-expanded', String(expanded));
    });

    // Close nav when clicking any link (mobile)
    document.querySelectorAll('.nav .nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          burger.classList.remove('active');
          document.body.classList.toggle('no-scroll');
          burger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // close by Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.toggle('no-scroll');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Swiper init (carousel)
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.mySwiper', {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
      /* Блок breakpoints видалено, оскільки 
        slidesPerView: 1 однаковий для всіх розмірів.
      */
    });
  } else {
    // If Swiper didn't load, hide nav buttons gracefully
    document.querySelectorAll('.swiper-button-next, .swiper-button-prev, .swiper-pagination').forEach(n => n && (n.style.display = 'none'));
  }
});