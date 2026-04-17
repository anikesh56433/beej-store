# BEEJ - Premium Superfoods E-Commerce Website

A modern, responsive e-commerce website for BEEJ, a premium superfood brand specializing in natural seeds.

## 🌱 Brand Identity

**Brand Name:** BEEJ  
**Tagline:** Root. Rise. Refine.  
**Domain:** beej.store  
**Category:** Health & Wellness / Superfoods / D2C Brand

## ✨ Features

- **Modern, Premium Design** - Clean UI with earthy color palette
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **Shopping Cart** - Add to cart, update quantities, remove items
- **WhatsApp Integration** - Direct ordering via WhatsApp
- **Product Pages** - Detailed product information with benefits
- **Smooth Animations** - Engaging user experience with CSS animations
- **LocalStorage** - Cart persists across sessions
- **SEO Optimized** - Proper meta tags and semantic HTML

## 📁 File Structure

```
beej-website/
├── index.html              # Home page
├── products.html           # Product listing page
├── product-detail.html     # Individual product details
├── about.html              # About us page
├── contact.html            # Contact page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── products.js        # Product data and rendering
│   ├── cart.js            # Shopping cart functionality
│   ├── main.js            # General functionality
│   ├── product-detail.js  # Product detail page logic
│   └── contact.js         # Contact form handling
└── images/
    ├── products/          # Product images
    │   ├── chia-seeds.jpeg
    │   ├── flax-seeds.jpeg
    │   ├── sunflower-seeds.jpeg
    │   ├── pumpkin-seeds.jpeg
    │   └── watermelon-seeds.jpeg
    └── hero/             # Hero section images
        ├── hero1.png
        └── hero2.png
```

## 🚀 Getting Started

### Option 1: Open Directly in Browser

1. Extract the zip file
2. Open `index.html` in any modern web browser
3. The website will load completely offline!

### Option 2: Use Local Server (Recommended for Development)

**Using Python:**
```bash
# Python 3
cd beej-website
python -m http.server 8000

# Then open: http://localhost:8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run in project directory
cd beej-website
http-server

# Then open: http://localhost:8080
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

## 🎨 Color Palette

- **Primary Green:** #2C5F2D
- **Secondary Brown:** #8B7355  
- **Accent Gold:** #D4A574
- **Cream:** #F5F1E8
- **Earth:** #97866B

## 📦 Products

The website includes 5 premium seed products:

1. **Chia Seeds** - ₹299 (250g)
2. **Flax Seeds** - ₹249 (250g)
3. **Sunflower Seeds** - ₹199 (250g)
4. **Pumpkin Seeds** - ₹279 (250g)
5. **Watermelon Seeds** - ₹229 (200g)

## 🛠 Customization

### Update WhatsApp Number

In `js/cart.js` and `js/contact.js`, replace the phone number:
```javascript
const phoneNumber = '919876543210'; // Replace with your number
```

### Add More Products

Edit `js/products.js` and add new products to the `products` array:
```javascript
{
    id: 6,
    name: 'Your Product',
    slug: 'your-product',
    price: 299,
    originalPrice: 399,
    image: 'images/products/your-product.jpg',
    category: 'seeds',
    badge: 'New',
    // ... more fields
}
```

### Change Colors

Edit the Tailwind config in each HTML file's `<script>` tag, or update CSS variables in `css/style.css`.

## 📱 Pages Overview

### Home Page (index.html)
- Hero section with CTA
- Featured products
- Benefits section
- Health benefits showcase
- Customer testimonials
- Footer

### Products Page (products.html)
- All products grid
- Sort functionality
- Add to cart from listing

### Product Detail Page (product-detail.html)
- Large product image
- Detailed description
- Benefits list
- Nutrition information
- Quantity selector
- Add to cart / Buy now
- Related products

### About Page (about.html)
- Brand story
- Company values
- Our promise

### Contact Page (contact.html)
- Contact form
- Contact information
- Business hours
- FAQ section

## 🛒 Shopping Cart Features

- Add products with quantity
- Update quantities
- Remove items
- Cart persists in localStorage
- Total calculation
- WhatsApp order integration
- Slide-in sidebar design

## 📧 Contact Form

Form includes:
- Name validation
- Email validation
- Phone validation (optional)
- Subject selection
- Message validation
- WhatsApp submission

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📝 SEO Features

- Semantic HTML5
- Meta descriptions
- Open Graph tags ready
- Proper heading hierarchy
- Alt text for images
- Fast loading times

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles + Tailwind CSS
- **JavaScript** - Vanilla JS (no frameworks)
- **Tailwind CSS** - Utility-first CSS via CDN
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📊 Performance

- Lightweight (~100KB total)
- Fast loading
- Optimized images
- Minimal dependencies
- LocalStorage for cart

## 🎯 Future Enhancements

Potential additions:
- Backend integration
- Payment gateway
- User authentication
- Order tracking
- Product reviews
- Wishlist feature
- Email notifications
- Analytics integration

## 📞 Support

For customization or support:
- Email: hello@beej.store
- WhatsApp: +91 98765 43210

## 📄 License

This website is created for BEEJ brand. All rights reserved.

## 🙏 Credits

- Design & Development: Custom built
- Images: Provided by client
- Icons: Font Awesome
- Fonts: Google Fonts (Playfair Display, Inter)

---

**Built with ❤️ for BEEJ - Root. Rise. Refine.**
