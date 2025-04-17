document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = document.querySelector(".next-btn");

    submitButton.addEventListener("click", function (event) {
        const validationMessage = validateForm();

        if (validationMessage !== "") {
            event.preventDefault();
            alert(validationMessage);
        } else {
            window.location.href = "confirm_password.html"; // Navigate to next step
        }
    });

    // Prevent default form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });
});

function validateForm() {
    const requiredNameFields = document.querySelectorAll("input[placeholder='First Name*'], input[placeholder='Last Name*']");
    const optionalNameFields = document.querySelectorAll("input[placeholder='Middle Name (Put N/A if not applicable)'], input[placeholder='Suffix']");
    const nameRegex = /^[A-Za-z\s]+$/;

    for (let field of requiredNameFields) {
        if (!nameRegex.test(field.value.trim()) || field.value.trim().length < 2) {
            return `Invalid name in field: ${field.placeholder}. Only letters and spaces allowed, minimum 2 characters.`;
        }
    }

    for (let field of optionalNameFields) {
        if (field.value.trim() !== "" && !nameRegex.test(field.value.trim())) {
            return `Invalid optional field: ${field.placeholder}. Only letters and spaces allowed.`;
        }
    }

    // Birthdate validation (Must be 18 years old or older)
    const birthdate = document.querySelector("input[type='date']");
    if (!birthdate.value) {
        return "Birthdate is required.";
    }

    const birthDateValue = new Date(birthdate.value);
    const today = new Date();
    const age = today.getFullYear() - birthDateValue.getFullYear();
    const isBirthdayPassed = (today.getMonth() > birthDateValue.getMonth()) || 
        (today.getMonth() === birthDateValue.getMonth() && today.getDate() >= birthDateValue.getDate());

    if (age < 18 || (age === 18 && !isBirthdayPassed)) {
        return "Invalid birthdate. You must be at least 18 years old.";
    }

    // Email validation (Must be from a valid domain)
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com", "hotmail.com", "aol.com", "protonmail.com", "zoho.com"];
    const emailField = document.querySelector("input[type='email']");
    
    if (emailField.value.trim() !== "N/A") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            return `Invalid email format in field: ${emailField.placeholder}.`;
        }

        const domain = emailField.value.trim().split("@")[1];
        if (!validDomains.includes(domain.toLowerCase())) {
            return `Invalid email domain. Please use a valid provider (e.g., Gmail, Yahoo, Outlook, iCloud).`;
        }
    }

    // Contact number validation (Must be a valid Philippine number)
    const contactField = document.querySelector("input[placeholder='Contact Number*']");
    const phoneRegex = /^(\+63|09)\d{9}$/;
    if (!phoneRegex.test(contactField.value.trim())) {
        return `Invalid contact number format in field: ${contactField.placeholder}. Must be a valid Philippine number (e.g., +639123456789 or 09123456789).`;
    }

    // Nationality validation
    const nationalityField = document.querySelector("input[placeholder='Nationality*']");
    if (!nameRegex.test(nationalityField.value.trim())) {
        return `Invalid nationality format in field: ${nationalityField.placeholder}. Only letters allowed.`;
    }

    // Address validation (Required field)
    const addressField = document.querySelector("input[placeholder='Address*']");
    if (!addressField.value.trim()) {
        return "Address is required.";
    }

    // Dropdown validation (Gender and Status must be selected)
    const dropdowns = document.querySelectorAll("select[required]");
    for (let dropdown of dropdowns) {
        if (dropdown.value === "") {
            return `Please select a valid option for: ${dropdown.options[0].textContent}`;
        }
    }

    // Beneficiary radio button validation
    const beneficiaryYes = document.querySelector("input[name='beneficiary'][value='yes']:checked");
    const beneficiaryNo = document.querySelector("input[name='beneficiary'][value='no']:checked");

    if (!beneficiaryYes && !beneficiaryNo) {
        return "Please select whether you have a beneficiary (Yes or No).";
    }

    // Beneficiary validation (Only if "Yes" is selected)
    if (beneficiaryYes) {
        const beneficiaryName = document.querySelector("input[placeholder='Beneficiary Name']");
        const beneficiaryAge = document.querySelector("input[placeholder='Beneficiary Age']");
        const beneficiaryContact = document.querySelector("input[placeholder='Beneficiary Contact']");
        const beneficiaryRelationship = document.querySelector("select[name='beneficiary_relationship']");

        if (!beneficiaryName.value.trim()) {
            return "Beneficiary name is required.";
        }
        if (!beneficiaryAge.value) {
            return "Beneficiary age is required.";
        }
        if (parseInt(beneficiaryAge.value) < 18) {
            return "Invalid beneficiary age. Must be at least 18 years old.";
        }

        if (!beneficiaryContact.value.trim()) {
            return "Beneficiary contact is required.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+63|09)\d{9}$/;
        if (!phoneRegex.test(beneficiaryContact.value.trim()) && !emailRegex.test(beneficiaryContact.value.trim())) {
            return "Invalid beneficiary contact. Must be a valid phone number or email.";
        }

        if (!beneficiaryRelationship || beneficiaryRelationship.value === "") {
            return "Please select a beneficiary relationship.";
        }
    }

    return ""; // If no errors, return an empty string
}
