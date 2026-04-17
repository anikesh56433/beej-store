// Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }
    
    init() {
        this.updateCartCount();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Cart icon click
        const cartIcon = document.getElementById('cartIcon');
        if (cartIcon) {
            cartIcon.addEventListener('click', () => this.toggleCart());
        }
        
        // Close cart
        const closeCart = document.getElementById('closeCart');
        if (closeCart) {
            closeCart.addEventListener('click', () => this.closeCart());
        }
        
        // Clear cart
        const clearCartBtn = document.getElementById('clearCart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => this.clearCart());
        }
        
        // WhatsApp order
        const whatsappBtn = document.getElementById('whatsappOrder');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => this.sendWhatsAppOrder());
        }
    }
    
    loadCart() {
        const saved = localStorage.getItem('beejCart');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveCart() {
        localStorage.setItem('beejCart', JSON.stringify(this.items));
        this.updateCartCount();
        this.renderCart();
    }
    
    addItem(productId, quantity = 1) {
        const product = getProductById(productId);
        if (!product) return;
        
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
        this.openCart();
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }
    
    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.items = [];
            this.saveCart();
            this.showNotification('Cart cleared!');
        }
    }
    
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    updateCartCount() {
        const countElements = document.querySelectorAll('#cartCount');
        const count = this.getItemCount();
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }
    
    renderCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItemsContainer) return;
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag text-6xl mb-4"></i>
                    <p class="text-lg">Your cart is empty</p>
                    <p class="text-sm">Add some delicious superfoods!</p>
                </div>
            `;
            if (cartTotal) cartTotal.textContent = '₹0';
            return;
        }
        
        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="text-sm font-medium">${item.quantity}</span>
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                </div>
                <button class="remove-item" onclick="cart.removeItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        if (cartTotal) {
            cartTotal.textContent = `₹${this.getTotal()}`;
        }
    }
    
    toggleCart() {
        const sidebar = document.getElementById('cartSidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
            this.renderCart();
        }
    }
    
    openCart() {
        const sidebar = document.getElementById('cartSidebar');
        if (sidebar) {
            sidebar.classList.add('active');
            this.renderCart();
        }
    }
    
    closeCart() {
        const sidebar = document.getElementById('cartSidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
    
    sendWhatsAppOrder() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        let message = '*New Order from BEEJ Website*%0A%0A';
        message += '*Order Details:*%0A';
        message += '━━━━━━━━━━━━━━━%0A';
        
        this.items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}%0A`;
            message += `   Qty: ${item.quantity}%0A`;
            message += `   Price: ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}%0A%0A`;
        });
        
        message += '━━━━━━━━━━━━━━━%0A';
        message += `*Total Amount: ₹${this.getTotal()}*%0A%0A`;
        message += 'Please confirm your delivery address and we will process your order.';

        const phoneNumber = '918319143976';
        const message = "Hi, I want to order from BEEJ";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Global function to add to cart
function addToCart(productId, quantity = 1) {
    cart.addItem(productId, quantity);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .animate-slide-in {
        animation: slide-in 0.3s ease;
    }
`;
document.head.appendChild(style);
