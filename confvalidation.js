document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const message = document.createElement("p");
    message.style.color = "red";
    message.style.fontSize = "0.9em";
    confirmPasswordInput.parentNode.appendChild(message);
    
    function createShowPasswordButton(inputField) {
        const showPasswordBtn = document.createElement("button");
        showPasswordBtn.type = "button";
        showPasswordBtn.textContent = "👁";
        showPasswordBtn.classList.add("show-password-btn");
        
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        
        inputField.parentNode.insertBefore(wrapper, inputField);
        wrapper.appendChild(inputField);
        wrapper.appendChild(showPasswordBtn);
        
        wrapper.style.width = "100%";
        inputField.style.flex = "1";
        showPasswordBtn.style.position = "absolute";
        showPasswordBtn.style.right = "10px";
        showPasswordBtn.style.background = "none";
        showPasswordBtn.style.border = "none";
        showPasswordBtn.style.cursor = "pointer";
        
        showPasswordBtn.addEventListener("mousedown", function () {
            inputField.type = "text";
        });
        
        showPasswordBtn.addEventListener("mouseup", function () {
            inputField.type = "password";
        });
    }
    
    createShowPasswordButton(passwordInput);
    createShowPasswordButton(confirmPasswordInput);
    
    function validatePassword() {
        if (passwordInput.value.length < 8) {
            message.textContent = "Password must be at least 8 characters long";
            return false;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            message.textContent = "Passwords do not match";
            return false;
        } else {
            message.textContent = "";
            return true;
        }
    }
    
    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validatePassword);
    
    document.querySelector("form").addEventListener("submit", function (event) {
        if (!validatePassword()) {
            event.preventDefault();
        }
    });
});
