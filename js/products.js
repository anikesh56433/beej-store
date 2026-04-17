// Products Database
const products = [
    {
        id: 1,
        name: 'Chia Seeds',
        slug: 'chia-seeds',
        price: 299,
        originalPrice: 399,
        image: 'images/products/chia-seeds.jpeg',
        category: 'seeds',
        badge: 'Bestseller',
        shortDesc: 'Rich in omega-3, fiber, and protein for complete nutrition.',
        fullDesc: 'Our premium chia seeds are sourced from the finest farms and packed with nutrients. These tiny powerhouses are perfect for adding to smoothies, yogurt, or making chia pudding.',
        benefits: [
            'High in omega-3 fatty acids',
            'Excellent source of fiber (34% dietary fiber)',
            'Rich in plant protein (16%)',
            'Absorbs 12x its weight in water',
            'Supports digestive health',
            'Helps maintain hydration',
            'Natural energy booster'
        ],
        nutrition: {
            protein: '16%',
            omega3: 'Rich',
            fiber: '34%'
        },
        weight: '250g',
        inStock: true
    },
    {
        id: 2,
        name: 'Flax Seeds',
        slug: 'flax-seeds',
        price: 249,
        originalPrice: 329,
        image: 'images/products/flax-seeds.jpeg',
        category: 'seeds',
        badge: 'Popular',
        shortDesc: '10% plant protein and 34% dietary fiber for wellness.',
        fullDesc: 'Premium golden flax seeds, rich in omega-3 ALA, lignans, and fiber. Perfect for adding a nutty flavor and nutritional boost to your meals.',
        benefits: [
            'Highest plant-based omega-3 source',
            'Rich in lignans (anti-oxidants)',
            '34% dietary fiber content',
            'Supports heart health',
            'Helps regulate cholesterol',
            'Promotes digestive wellness',
            'Natural anti-inflammatory'
        ],
        nutrition: {
            protein: '10%',
            omega3: 'Rich',
            fiber: '34%'
        },
        weight: '250g',
        inStock: true
    },
    {
        id: 3,
        name: 'Sunflower Seeds',
        slug: 'sunflower-seeds',
        price: 199,
        originalPrice: 269,
        image: 'images/products/sunflower-seeds.jpeg',
        category: 'seeds',
        badge: 'New',
        shortDesc: 'Excellent source of vitamin E and selenium.',
        fullDesc: 'Sun-powered nutrition in every seed. Our sunflower seeds are roasted to perfection, delivering a delicious crunch and abundant nutrients.',
        benefits: [
            'Excellent plant-based protein (3%)',
            'High in vitamin E & selenium',
            'Rich in healthy fats (18%)',
            'Supports immune function',
            'Natural antioxidant source',
            'Promotes skin health',
            'Energy-boosting nutrients'
        ],
        nutrition: {
            protein: '30%',
            vitaminE: '25%',
            healthyFats: '18%'
        },
        weight: '250g',
        inStock: true
    },
    {
        id: 4,
        name: 'Pumpkin Seeds',
        slug: 'pumpkin-seeds',
        price: 279,
        originalPrice: 349,
        image: 'images/products/pumpkin-seeds.jpeg',
        category: 'seeds',
        badge: 'Premium',
        shortDesc: 'Rich in plant protein and omega-6 fatty acids.',
        fullDesc: 'Nutrient-dense pumpkin seeds loaded with protein, healthy fats, and essential minerals. Perfect for snacking or adding to salads.',
        benefits: [
            'Rich in plant protein (30%)',
            'Excellent in omega-6 (25%)',
            'Good source of dietary fiber (18%)',
            'Supports prostate health',
            'Rich in magnesium & zinc',
            'Promotes heart health',
            'Helps improve sleep quality'
        ],
        nutrition: {
            protein: '30%',
            omega6: '25%',
            fiber: '18%'
        },
        weight: '250g',
        inStock: true
    },
    {
        id: 5,
        name: 'Watermelon Seeds',
        slug: 'watermelon-seeds',
        price: 229,
        originalPrice: 299,
        image: 'images/products/watermelon-seeds.jpeg',
        category: 'seeds',
        badge: 'Exotic',
        shortDesc: 'Excellent plant-based protein and rich in minerals.',
        fullDesc: 'Discover the hidden treasure of watermelon seeds - packed with protein, healthy fats, and essential minerals for your wellness.',
        benefits: [
            'Excellent plant-based protein (30%)',
            'Rich in magnesium & iron (25%)',
            'Source of healthy fats (18%)',
            'Supports muscle recovery',
            'Boosts energy levels',
            'Promotes bone health',
            'Natural detoxifier'
        ],
        nutrition: {
            protein: '30%',
            minerals: '25%',
            healthyFats: '18%'
        },
        weight: '200g',
        inStock: true
    }
];

// Render Product Cards
function renderProductCard(product) {
    return `
        <div class="product-card fade-in" onclick="goToProduct('${product.slug}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="p-6">
                <h3 class="text-xl font-serif font-bold text-gray-800 mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4">${product.shortDesc}</p>
                
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-2xl font-bold text-primary">₹${product.price}</span>
                    ${product.originalPrice ? `
                        <span class="text-gray-400 line-through text-sm">₹${product.originalPrice}</span>
                        <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                            ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                    ` : ''}
                </div>
                
                <div class="flex gap-2 text-xs text-gray-600 mb-4">
                    ${Object.entries(product.nutrition).slice(0, 3).map(([key, value]) => 
                        `<span class="bg-green-50 px-2 py-1 rounded-full">
                            <i class="fas fa-check text-green-600 mr-1"></i>${value} ${key}
                        </span>`
                    ).join('')}
                </div>
                
                <button 
                    onclick="event.stopPropagation(); addToCart(${product.id})" 
                    class="w-full btn-primary text-center justify-center">
                    Add to Cart
                    <i class="fas fa-shopping-cart ml-2"></i>
                </button>
            </div>
        </div>
    `;
}

// Load Products on Page
function loadProducts(container = 'featuredProducts', limit = null) {
    const productsContainer = document.getElementById(container);
    if (!productsContainer) return;
    
    const productsToShow = limit ? products.slice(0, limit) : products;
    productsContainer.innerHTML = productsToShow.map(product => renderProductCard(product)).join('');
}

// Sort Products
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'priceLow':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'priceHigh':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            sortedProducts = products;
    }
    
    return sortedProducts;
}

// Navigate to Product Detail
function goToProduct(slug) {
    window.location.href = `product-detail.html?product=${slug}`;
}

// Get Product by Slug
function getProductBySlug(slug) {
    return products.find(p => p.slug === slug);
}

// Get Product by ID
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// Initialize Products Page
if (document.getElementById('productsGrid')) {
    loadProducts('productsGrid');
    
    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortedProducts = sortProducts(e.target.value);
            const container = document.getElementById('productsGrid');
            container.innerHTML = sortedProducts.map(product => renderProductCard(product)).join('');
        });
    }
}

// Initialize Home Page Featured Products
if (document.getElementById('featuredProducts')) {
    loadProducts('featuredProducts', 3);
}
