document.addEventListener("DOMContentLoaded", () => {
    const movingImage = document.getElementById("movingImage");

    function moveImage() {
        // Get viewport dimensions
        const maxWidth = window.innerWidth - 60;
        const maxHeight = window.innerHeight - 60;

        // Generate random positions
        const newX = Math.random() * maxWidth;
        const newY = Math.random() * maxHeight;

        // Apply new position
        movingImage.style.left = `${newX}px`;
        movingImage.style.top = `${newY}px`;
    }

    // Move image every 1.5 seconds
    setInterval(moveImage, 1500);
});
