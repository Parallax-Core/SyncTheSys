document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navbarCenter = document.querySelector('.navbar-center');

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navbarCenter.classList.toggle('show');
    });
  });


  
    // User dropdown menu
    const toggle = document.getElementById("userMenuToggle");
    const dropdown = document.getElementById("dropdownMenu");
  
    if (toggle && dropdown) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      });
  
      document.addEventListener("click", function () {
        dropdown.style.display = "none";
      });
    }
    // Profile popup tab switching
    window.showTab = function (index) {
      const tabs = document.querySelectorAll(".tab");
      const sections = document.querySelectorAll(".popup-section");
  
      tabs.forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
        sections[i].classList.toggle("active", i === index);
      });
    };
  
  