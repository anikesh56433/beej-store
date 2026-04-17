// Main JavaScript for BEEJ Website

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
});

// Scroll to Top Button
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.getElementById('cartIcon');
    
    if (cartSidebar && cartSidebar.classList.contains('active')) {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            cart.closeCart();
        }
    }
});

// Prevent cart from closing when clicking inside
const cartSidebar = document.getElementById('cartSidebar');
if (cartSidebar) {
    cartSidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\D/g, ''));
}

// Add to Cart Animation
function animateAddToCart(productElement) {
    const cartIcon = document.getElementById('cartIcon');
    if (!cartIcon || !productElement) return;
    
    const productRect = productElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    const flyingProduct = productElement.cloneNode(true);
    flyingProduct.style.position = 'fixed';
    flyingProduct.style.left = productRect.left + 'px';
    flyingProduct.style.top = productRect.top + 'px';
    flyingProduct.style.width = productRect.width + 'px';
    flyingProduct.style.height = productRect.height + 'px';
    flyingProduct.style.zIndex = '9999';
    flyingProduct.style.transition = 'all 0.8s ease-in-out';
    flyingProduct.style.pointerEvents = 'none';
    
    document.body.appendChild(flyingProduct);
    
    setTimeout(() => {
        flyingProduct.style.left = cartRect.left + 'px';
        flyingProduct.style.top = cartRect.top + 'px';
        flyingProduct.style.width = '0px';
        flyingProduct.style.height = '0px';
        flyingProduct.style.opacity = '0';
    }, 50);
    
    setTimeout(() => {
        flyingProduct.remove();
    }, 850);
}

// Price Formatter
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(price);
}

// Console Welcome Message
console.log('%c👋 Welcome to BEEJ!', 'font-size: 20px; color: #2C5F2D; font-weight: bold;');
console.log('%cRoot. Rise. Refine.', 'font-size: 14px; color: #8B7355; font-style: italic;');
console.log('%c🌱 Premium Superfoods for Your Wellness Journey', 'font-size: 12px; color: #666;');

// Analytics Placeholder (Replace with actual analytics)
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    // Add your analytics code here (Google Analytics, etc.)
}

// Track page views
trackEvent('Page', 'View', window.location.pathname);
