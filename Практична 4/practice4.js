// Модальне вікно
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = modal.querySelector('.close');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Форма зворотного зв'язку
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        feedback.textContent = 'Будь ласка, заповніть усі поля.';
        feedback.style.color = 'red';
        return;
    }

    const emailRegex = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/;
    if (!emailRegex.test(email)) {
        feedback.textContent = 'Введіть коректну email-адресу.';
        feedback.style.color = 'red';
        return;
    }

    feedback.style.color = 'green';
    feedback.textContent = 'Повідомлення успішно надіслано!';
    form.reset();
});

// Кнопка \"вгору\"
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
