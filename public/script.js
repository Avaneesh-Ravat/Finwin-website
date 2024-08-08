let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const sliderWrapper = document.querySelector('.slider-wrapper');
//navbar responsive

const hamburger = document.querySelector('.hamburger');
const rightNav = document.querySelector('.right-nav');

hamburger.addEventListener('click', () => {
    rightNav.classList.toggle('show');
});

//user icon functionality
function toggleBox() {
    const box = document.getElementById('box');
    if (box.style.display === 'block') {
        box.style.display = 'none';
    } else {
        box.style.display = 'block';
    }
}

document.addEventListener('click', function(event) {
    const box = document.getElementById('box');
    const iconContainer = document.querySelector('.icon-container');
    const isClickInsideBox = box.contains(event.target);
    const isClickInsideIcon = iconContainer.contains(event.target);

    if (!isClickInsideBox && !isClickInsideIcon) {
        box.style.display = 'none';
    }
});

// Clone the slides and append them to the end
for (let i = 0; i < 3; i++) {
    const clone = slides[i].cloneNode(true);
    sliderWrapper.appendChild(clone);
}

// Clone the last 3 slides and prepend them to the beginning
for (let i = totalSlides - 3; i < totalSlides; i++) {
    const clone = slides[i].cloneNode(true);
    sliderWrapper.insertBefore(clone, slides[0]);
}

// Adjust initial position
currentIndex = 3;
updateSliderPosition();

document.querySelector('.next').addEventListener('click', () => {
    moveToNextSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    moveToPrevSlide();
});

function moveToNextSlide() {
    currentIndex++;
    updateSliderPosition();
    if (currentIndex === totalSlides + 3) {
        setTimeout(() => {
            sliderWrapper.style.transition = 'none';
            currentIndex = 3;
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
    if (currentIndex === 2) {
        setTimeout(() => {
            sliderWrapper.style.transition = 'none';
            currentIndex = totalSlides + 2;
            updateSliderPosition();
            setTimeout(() => {
                sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    }
}

function updateSliderPosition() {
    const slideWidth = document.querySelector('.slide').offsetWidth;
    sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
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

//popup script

window.addEventListener("load", function(){
    this.setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        1000
    )
})

document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

document.querySelector(".close-form").addEventListener("click", function(){
    document.querySelector(".form-access").style.display = "none";
})



document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-access');
    const links = document.querySelectorAll('.provider a');

    let redirectLink = null;

    if (!sessionStorage.getItem('formSubmitted')) {
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                redirectLink = link.getAttribute('data-link'); // Store the link to redirect after form submission
                formContainer.style.display = 'block';
            });
        });
    } else {
        // Activate links if form has already been submitted
        activateLinks();
    }

    function activateLinks() {
        links.forEach(link => {
            link.style.pointerEvents = 'auto'; // Enable clicking
            link.style.color = 'black'; // Reset color to default
        });
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', () => {
        sessionStorage.setItem('formSubmitted', 'true');
        activateLinks();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        form.submit(); // Actually submit the form
        if (redirectLink) {
            window.location.href = redirectLink; // Redirect to the stored link after form submission
        }
    });
});

// form completed---------------------------------------------------------------------------------------

