function togglePopup(popupId, show) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById("overlay");

    if (popup) {
        popup.style.display = show ? "block" : "none";
    }

    // If showing a popup, enable the overlay; otherwise, hide it
    if (overlay) {
        overlay.style.display = show ? "block" : "none";
    }
}

// Clicking on the overlay closes all popups
document.getElementById("overlay").addEventListener("click", function () {
    document.querySelectorAll(".popup-form").forEach(popup => {
        popup.style.display = "none";
    });
    this.style.display = "none";
});
function toggleSection(sectionId) {
    document.getElementById('personalDetails').style.display = 'none';
    document.getElementById('passwordSecurity').style.display = 'none';
    
    document.getElementById(sectionId).style.display = 'block';
}
function redirectToHomepage() {
    window.location.href = "homepage.html"; // Redirect to homepage.html
}