const mainAdminID = "mainadmin";
const mainAdminPassword = "admin123"; // Will later be securely stored in a DB

document.getElementById("admin-login-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const adminID = document.getElementById("admin-id").value.trim();
  const password = document.getElementById("password").value;

  const errorMsg = document.getElementById("error-msg");

  if (!adminID || !password) {
    errorMsg.textContent = "Please fill in both fields.";
    return;
  }

  if (adminID === mainAdminID && password === mainAdminPassword) {
    // Redirect to dashboard
    window.location.href = "admin.html";
  } else {
    errorMsg.textContent = "Invalid Admin ID or Password.";
  }
});

