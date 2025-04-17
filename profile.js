document.addEventListener("DOMContentLoaded", function () {
    // Hamburger toggle for mobile nav
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
  
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent closing right after opening
        navLinks.classList.toggle("show");
        hamburger.classList.toggle("active");
  
        const expanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", !expanded);
      });
  
      // Optional: close nav when clicking outside
      document.addEventListener("click", function (e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove("show");
          hamburger.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
        }
      });
    }
  
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
  
    // Profile popup toggle
    const popup = document.getElementById("profilePopup");
    const backdrop = document.getElementById("popupBackdrop");
  
    window.togglePopup = function () {
      const isShown = popup.classList.contains("show");
  
      if (isShown) {
        popup.classList.remove("show");
        backdrop.style.display = "none";
        document.body.style.overflow = "";
        setTimeout(() => {
          popup.style.display = "none";
        }, 300);
      } else {
        popup.style.display = "block";
        setTimeout(() => {
          popup.classList.add("show");
          backdrop.style.display = "block";
          document.body.style.overflow = "hidden";
        }, 10);
      }
    };
  
    // Profile popup tab switching
    window.showTab = function (index) {
      const tabs = document.querySelectorAll(".tab");
      const sections = document.querySelectorAll(".popup-section");
  
      tabs.forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
        sections[i].classList.toggle("active", i === index);
      });
    };
  });
  