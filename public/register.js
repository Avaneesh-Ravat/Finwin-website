document.getElementById('registerForm').addEventListener('submit', function(event) {
    let isValid = true;

    // Clear all previous error messages
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.innerText = '');

    // Name validation
    const name = document.getElementById('name').value;
    if (name.trim() === '') {
        isValid = false;
        document.getElementById('nameError').innerText = '*Name is required.';
    }

    // Phone validation
    const phone = document.getElementById('phone').value;
    if (phone.trim() === '' || !/^\d{10}$/.test(phone)) {
        isValid = false;
        document.getElementById('phoneError').innerText = '*Enter a valid 10-digit phone number.';
    }

    // Email validation
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '' || !emailPattern.test(email)) {
        isValid = false;
        document.getElementById('emailError').innerText = '*Enter a valid email address.';
    }

    // Password validation
    const password = document.getElementById('pass').value;
    if (password.length < 6) {
        isValid = false;
        document.getElementById('passError').innerText = '*Password must be at least 6 characters long.';
    }

    // Confirm password validation
    const confirmPassword = document.getElementById('cnf-pass').value;
    if (confirmPassword !== password) {
        isValid = false;
        document.getElementById('cnfPassError').innerText = '*Passwords do not match.';
    }

    // Gender validation
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        isValid = false;
        document.getElementById('genderError').innerText = '*Please select your gender.';
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        event.preventDefault();
    }
});

// Real-time validation for inputs
const formElements = document.querySelectorAll('.register-form input');
formElements.forEach(element => {
    element.addEventListener('input', function() {
        // Clear error message for the corresponding field
        const errorId = this.id + 'Error';
        document.getElementById(errorId).innerText = '';
    });
});