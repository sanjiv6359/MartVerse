/**
 * Auth JavaScript for MartVerse
 */

document.addEventListener('DOMContentLoaded', () => {

    // Login form validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                showAuthNotification('Please fill in all fields.', 'error');
                return;
            }

            // Mock success
            loginForm.reset();
            showAuthNotification('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    // Register form validation
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pwd = document.getElementById('password').value;
            const confirm = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;

            if (pwd !== confirm) {
                showAuthNotification('Passwords do not match.', 'error');
                return;
            }
            if (!terms) {
                showAuthNotification('Please agree to the Terms & Conditions.', 'error');
                return;
            }

            // Mock success
            registerForm.reset();
            showAuthPopup();
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        });
    }

    // Show/Hide Password toggle
    const toggleBtns = document.querySelectorAll('.toggle-pwd');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dt = e.target.getAttribute('data-target');
            const input = document.getElementById(dt);
            if (input.type === 'password') {
                input.type = 'text';
                e.target.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                e.target.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

});

function showAuthNotification(msg, type) {
    const p = document.getElementById('auth-notif');
    if (p) {
        p.textContent = msg;
        p.style.color = type === 'error' ? 'var(--pink)' : 'var(--emerald-green)';
        p.style.display = 'block';
    } else {
        alert(msg);
    }
}

function showAuthPopup() {
    const popup = document.getElementById('success-popup');
    if (popup) {
        popup.style.display = 'flex';
        setTimeout(() => {
            popup.classList.add('active');
        }, 10);
    }
}
