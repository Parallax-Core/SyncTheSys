function toggleSection(sectionId) {
    document.getElementById('announcements').style.display = 'none';
    document.getElementById('rates').style.display = 'none';
    document.getElementById('summary').style.display = 'none';
    
    document.getElementById(sectionId).style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById("userMenuToggle");
    const dropdown = document.getElementById("dropdownMenu");

    toggle.addEventListener("click", function(e) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function() {
        dropdown.style.display = "none";
    });
});
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    nav.classList.toggle("active");
  }

//slider
let currentIndex = 0;
let slideInterval;
const wrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slider-image');

function updateSlider() {
    const offset = -currentIndex * 100;
    wrapper.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

function manualSlide(direction) {
    clearInterval(slideInterval); // pause autoplay
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    updateSlider();
    slideInterval = setInterval(nextSlide, 5000); // resume autoplay
}

// Init on load
document.addEventListener("DOMContentLoaded", () => {
    updateSlider();
    slideInterval = setInterval(nextSlide, 3000);
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navbarCenter = document.querySelector('.navbar-center');

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navbarCenter.classList.toggle('show');
    });
  });