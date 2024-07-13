let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const sliderWrapper = document.querySelector('.slider-wrapper');

// Clone the first 4 slides and append them to the end
for (let i = 0; i < 10; i++) {
    const clone = slides[i].cloneNode(true);
    sliderWrapper.appendChild(clone);
}

// Clone the last 4 slides and prepend them to the beginning
for (let i = totalSlides - 4; i < totalSlides; i++) {
    const clone = slides[i].cloneNode(true);
    sliderWrapper.insertBefore(clone, slides[0]);
}

// Adjust initial position
currentIndex = 4;
sliderWrapper.style.transform = `translateX(-${currentIndex * (25 + 2.5)}%)`;

document.querySelector('.next').addEventListener('click', () => {
    moveToNextSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    moveToPrevSlide();
});

function moveToNextSlide() {
    currentIndex++;
    updateSliderPosition();
    if (currentIndex === totalSlides + 4) {
        setTimeout(() => {
            sliderWrapper.style.transition = 'none';
            currentIndex = 4;
            updateSliderPosition();
            setTimeout(() => {
                sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    }
}

function moveToPrevSlide() {
    currentIndex--;
    updateSliderPosition();
    if (currentIndex === 3) {
        setTimeout(() => {
            sliderWrapper.style.transition = 'none';
            currentIndex = totalSlides + 3;
            updateSliderPosition();
            setTimeout(() => {
                sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    }
}

function updateSliderPosition() {
    sliderWrapper.style.transform = `translateX(-${currentIndex * (25 + 2.5)}%)`;
}

// Auto slide every 2 seconds
setInterval(() => {
    moveToNextSlide();
}, 2000);


//swiper js code ------------------------------------
const swiper = new Swiper('.box-2-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: true,

    pagination: {
        el: 'swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        620: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 4
        }
    }
  });