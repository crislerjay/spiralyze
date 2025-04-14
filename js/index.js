document.addEventListener('DOMContentLoaded', () => {
  /* ----------------------
     Select Focus
  ---------------------- */
  const select = document.querySelector('.form__select');
  const selectLabel = document.querySelector('.form__select__label');

  if (select && selectLabel) {
    const updateLabelState = () => {
      const isFocused = document.activeElement === select;
      const hasValue = select.value;
      selectLabel.classList.toggle('active', isFocused || hasValue);
    };
    ['focus', 'blur', 'change'].forEach(event =>
      select.addEventListener(event, updateLabelState)
    );
    updateLabelState();
  }

  /* ----------------------
     Form Validation
  ---------------------- */
  const form = document.querySelector('.form');

  if (form) {
    const inputs = form.querySelectorAll('input, select');

    form.addEventListener('submit', e => {
      e.preventDefault();

      let allValid = true;
      let firstInvalidFound = false;

      inputs.forEach(input => {
        const field = input.closest('.form__field');
        const tooltip = field.querySelector('.tooltip--error');
        const isEmpty = input.tagName === 'SELECT' ? input.value === '' : input.value.trim() === '';

        tooltip.classList.remove('show');
        field.classList.remove('error');

        if (isEmpty && !firstInvalidFound) {
          tooltip.classList.add('show');
          field.classList.add('error');
          input.focus();
          allValid = false;
          firstInvalidFound = true;
        }
      });

      if (allValid) {
        alert('Form submitted successfully!');
        inputs.forEach(input => {
          if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
          } else {
            input.value = '';
          }
        });
      }
    });
  }

  /* ----------------------
     Burger Menu
  ---------------------- */
  const burger = document.getElementById('burger-menu');
  const menu = document.getElementById('menu');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('close');
      menu.classList.toggle('show');
    });
  }

  /* ----------------------
     Slider
  ---------------------- */
  const slides = document.querySelector('.slides');
  const slideItems = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const dotsContainer = document.getElementById('dots');
  const slider = document.querySelector('.slider');

  let currentIndex = 0;
  const totalSlides = slideItems.length;

  // Create dots
  slideItems.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('button');

  const updateSlider = () => {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  };

  const goToSlide = index => {
    currentIndex = index;
    updateSlider();
  };

  const showNextSlide = () => goToSlide((currentIndex + 1) % totalSlides);
  const showPrevSlide = () => goToSlide((currentIndex - 1 + totalSlides) % totalSlides);

  prevBtn?.addEventListener('click', showPrevSlide);
  nextBtn?.addEventListener('click', showNextSlide);

  updateSlider();

  // Swipe Support
  let startX = 0;

  slider?.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  slider?.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const distance = endX - startX;
    if (Math.abs(distance) > 50) {
      distance < 0 ? showNextSlide() : showPrevSlide();
    }
  });

  /* ----------------------
     Video Modal
  ---------------------- */
  const modal = document.getElementById('videoModal');
  const playBtn = document.getElementById('playTrigger');
  const closeBtn = document.getElementById('closeModal');
  const video = document.getElementById('videoPlayer');

  if (modal && video && playBtn && closeBtn) {
    const closeModal = () => {
      modal.style.display = 'none';
      video.pause();
      video.currentTime = 0;
    };

    playBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      video.play();
    });

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }
});
