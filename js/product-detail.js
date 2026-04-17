// Product Detail Page

// Get product slug from URL
const urlParams = new URLSearchParams(window.location.search);
const productSlug = urlParams.get('product');

// Load product details
if (productSlug) {
    const product = getProductBySlug(productSlug);
    
    if (product) {
        loadProductDetail(product);
        loadRelatedProducts(product.id);
    } else {
        // Product not found, redirect to products page
        window.location.href = 'products.html';
    }
}

// Load Product Detail
function loadProductDetail(product) {
    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumbName');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
    
    // Update page title
    document.title = `${product.name} - BEEJ`;
    
    // Render product detail
    const detailContainer = document.getElementById('productDetail');
    if (!detailContainer) return;
    
    detailContainer.innerHTML = `
        <!-- Product Image -->
        <div class="fade-in">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
        </div>
        
        <!-- Product Info -->
        <div class="fade-in-right">
            ${product.badge ? `
                <span class="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    ${product.badge}
                </span>
            ` : ''}
            
            <h1 class="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                ${product.name}
            </h1>
            
            <div class="flex items-center gap-2 mb-4">
                <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <span class="text-gray-600 text-sm">(4.8/5 - 256 reviews)</span>
            </div>
            
            <p class="text-gray-600 text-lg mb-6">
                ${product.fullDesc}
            </p>
            
            <!-- Price -->
            <div class="price-display mb-6">
                <span class="current-price">₹${product.price}</span>
                ${product.originalPrice ? `
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="discount-badge">
                        SAVE ₹${product.originalPrice - product.price}
                    </span>
                ` : ''}
            </div>
            
            <!-- Weight -->
            <div class="mb-6">
                <span class="text-gray-700 font-semibold">Weight:</span>
                <span class="text-gray-600">${product.weight}</span>
            </div>
            
            <!-- Quantity Selector -->
            <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">Quantity</label>
                <div class="quantity-selector">
                    <button onclick="decreaseQty()">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span id="productQty">1</span>
                    <button onclick="increaseQty()">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            
            <!-- Add to Cart -->
            <div class="flex flex-wrap gap-4 mb-8">
                <button onclick="addProductToCart()" class="btn-primary flex-1 justify-center">
                    <i class="fas fa-shopping-cart mr-2"></i>
                    Add to Cart
                </button>
                <button onclick="buyNow()" class="btn-secondary">
                    <i class="fab fa-whatsapp mr-2"></i>
                    Buy Now
                </button>
            </div>
            
            <!-- Product Benefits -->
            <div class="bg-cream p-6 rounded-lg mb-6">
                <h3 class="text-xl font-serif font-bold mb-4">Health Benefits</h3>
                <ul class="benefits-list">
                    ${product.benefits.map(benefit => `
                        <li class="text-gray-700">${benefit}</li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- Nutritional Info -->
            <div class="grid grid-cols-3 gap-4 mb-6">
                ${Object.entries(product.nutrition).map(([key, value]) => `
                    <div class="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div class="text-2xl font-bold text-primary">${value}</div>
                        <div class="text-sm text-gray-600 capitalize">${key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Trust Badges -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center p-3 bg-green-50 rounded-lg">
                    <i class="fas fa-leaf text-green-600 text-2xl mb-2"></i>
                    <p class="text-xs font-semibold">100% Natural</p>
                </div>
                <div class="text-center p-3 bg-blue-50 rounded-lg">
                    <i class="fas fa-shield-alt text-blue-600 text-2xl mb-2"></i>
                    <p class="text-xs font-semibold">Quality Assured</p>
                </div>
                <div class="text-center p-3 bg-purple-50 rounded-lg">
                    <i class="fas fa-truck text-purple-600 text-2xl mb-2"></i>
                    <p class="text-xs font-semibold">Free Shipping</p>
                </div>
                <div class="text-center p-3 bg-yellow-50 rounded-lg">
                    <i class="fas fa-undo text-yellow-600 text-2xl mb-2"></i>
                    <p class="text-xs font-semibold">Easy Returns</p>
                </div>
            </div>
        </div>
    `;
}

// Quantity Management
let productQuantity = 1;

function increaseQty() {
    productQuantity++;
    document.getElementById('productQty').textContent = productQuantity;
}

function decreaseQty() {
    if (productQuantity > 1) {
        productQuantity--;
        document.getElementById('productQty').textContent = productQuantity;
    }
}

// Add to Cart from Product Detail
function addProductToCart() {
    if (productSlug) {
        const product = getProductBySlug(productSlug);
        if (product) {
            addToCart(product.id, productQuantity);
            productQuantity = 1;
            document.getElementById('productQty').textContent = '1';
        }
    }
}

// Buy Now
function buyNow() {
    addProductToCart();
    setTimeout(() => {
        cart.sendWhatsAppOrder();
    }, 500);
}

// Load Related Products
function loadRelatedProducts(currentProductId) {
    const relatedContainer = document.getElementById('relatedProducts');
    if (!relatedContainer) return;
    
    // Get 3 random products excluding current one
    const relatedProducts = products
        .filter(p => p.id !== currentProductId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    relatedContainer.innerHTML = relatedProducts.map(product => renderProductCard(product)).join('');
}

// Product Reviews (Mock data)
const reviews = [
    {
        name: 'Priya S.',
        rating: 5,
        comment: 'Excellent quality! Fresh and perfectly packed.',
        date: '2 days ago'
    },
    {
        name: 'Rahul K.',
        rating: 5,
        comment: 'Best seeds I\'ve purchased. Will order again!',
        date: '1 week ago'
    },
    {
        name: 'Sneha M.',
        rating: 4,
        comment: 'Good product, fast delivery. Slightly expensive but worth it.',
        date: '2 weeks ago'
    }
];
