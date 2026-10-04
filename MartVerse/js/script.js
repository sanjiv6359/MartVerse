/**
 * Global JavaScript for MartVerse
 */

document.addEventListener('DOMContentLoaded', () => {
    // Top Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Set cart count from localStorage
    updateCartCount();

    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));
});

// Mock Cart logic
function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        let cart = JSON.parse(localStorage.getItem('martverse_cart') || '[]');
        let totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCountEl.textContent = totalItems;
        if (totalItems > 0) {
            cartCountEl.style.display = 'flex';
        } else {
            cartCountEl.style.display = 'none';
        }
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('martverse_cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('martverse_cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Item added to cart!');
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'glass notification';
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.padding = '15px 25px';
    notif.style.zIndex = '9999';
    notif.style.borderRadius = '8px';
    notif.style.color = '#fff';
    notif.style.transform = 'translateY(100px)';
    notif.style.opacity = '0';
    notif.style.transition = 'all 0.3s ease';
    notif.textContent = message;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.transform = 'translateY(0)';
        notif.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        notif.style.transform = 'translateY(100px)';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}
