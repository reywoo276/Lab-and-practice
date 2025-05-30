document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    let isValid = true;

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    if (username === '') {
        document.getElementById('usernameError').textContent = "Введіть ім'я користувача.";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = "Невірний формат email.";
        isValid = false;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').textContent = "Пароль має містити мінімум 8 символів, одну велику літеру та цифру.";
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = "Паролі не співпадають.";
        isValid = false;
    }

    const phonePattern = /^\+?\d{10,15}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = "Введіть коректний номер телефону.";
        isValid = false;
    }

    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (isNaN(age) || age < 18) {
        document.getElementById('dobError').textContent = "Потрібно бути старше 18 років.";
        isValid = false;
    }

    if (!terms) {
        document.getElementById('termsError').textContent = "Ви повинні погодитись з умовами.";
        isValid = false;
    }

    if (isValid) {
        alert('Форма успішно надіслана!');
    }
});
