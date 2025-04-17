//user-menu
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
//hamburger
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navbarCenter = document.querySelector('.navbar-center');

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navbarCenter.classList.toggle('show');
    });
  });

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".item");
    const totalDisplay = document.createElement("span");
    
    // Create a total display beside the checkout button
    totalDisplay.id = "totalPrice";
    totalDisplay.style.fontSize = "18px";
    totalDisplay.style.fontWeight = "bold";
    totalDisplay.style.marginLeft = "20px";
    totalDisplay.innerText = "Total: Php. 0.00";
    document.querySelector(".checkout").after(totalDisplay);

    // Function to update the total price
    function updateTotal() {
        let total = 0;

        items.forEach(item => {
            const checkbox = item.querySelector("input[type='checkbox']");
            const quantity = parseInt(item.querySelector(".quantity-control input").value);
            const price = parseFloat(item.getAttribute("data-price"));

            if (checkbox.checked) {
                total += price * quantity;
            }
        });

        totalDisplay.innerText = `Total: Php. ${total.toFixed(2)}`;
    }

    // Attach event listeners to each item
    items.forEach(item => {
        const minusButton = item.querySelector(".quantity-control button:first-child");
        const plusButton = item.querySelector(".quantity-control button:last-child");
        const quantityInput = item.querySelector(".quantity-control input");
        const checkbox = item.querySelector("input[type='checkbox']");

        // Set price as a data attribute
        const priceText = item.querySelector(".item-info p").innerText;
        const priceValue = parseFloat(priceText.replace("Php. ", ""));
        item.setAttribute("data-price", priceValue);

        // Increase quantity
        plusButton.addEventListener("click", () => {
            let currentQty = parseInt(quantityInput.value);
            quantityInput.value = currentQty + 1;
            updateTotal();
        });

        // Decrease quantity
        minusButton.addEventListener("click", () => {
            let currentQty = parseInt(quantityInput.value);
            if (currentQty > 0) {
                quantityInput.value = currentQty - 1;
            }
            updateTotal();
        });

        // Checkbox change updates total
        checkbox.addEventListener("change", updateTotal);

        // Manually entering a quantity
        quantityInput.addEventListener("input", () => {
            // Ensure input is a valid number and update total
            const currentQty = parseInt(quantityInput.value);
            if (isNaN(currentQty) || currentQty < 0) {
                quantityInput.value = 0;
            }
            updateTotal();
        });
    });
});
