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



//form
// Function to handle link clicks
function handleLinkClick(event) {
    if (!sessionStorage.getItem('formSubmitted')) {
        event.preventDefault();
        // Show the form if it has not been submitted yet
        document.getElementById('form-access').style.display = 'block';
        // Store the URL for redirection
        document.getElementById('form-access').setAttribute('data-redirect-url', event.currentTarget.getAttribute('data-url'));
    } else {
        // Allow the default link action if the form has been submitted
        window.location.href = event.currentTarget.getAttribute('data-url');
    }
}

// Add click event listeners to all links
document.querySelectorAll('.bank-plans').forEach(link => {
    link.addEventListener('click', handleLinkClick);
});

// Handle form submission
document.getElementById('form-access').addEventListener('submit', function(event) {
    event.preventDefault();
    // Mark the form as submitted in session storage
    sessionStorage.setItem('formSubmitted', 'true');
    // Hide the form
    this.style.display = 'none';
    // Redirect to the stored URL
    const redirectUrl = this.getAttribute('data-redirect-url');
    if (redirectUrl) {
        window.location.href = redirectUrl;
    }
});

// Check if the form has been submitted at page load
if (sessionStorage.getItem('formSubmitted')) {
    document.getElementById('form-access').style.display = 'none';
}

// form completed-----------------------------------------------------------------------------------------------------






