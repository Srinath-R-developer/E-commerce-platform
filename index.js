// Global Variables
let cart = [];
let products = [];
let filteredProducts = [];
let currentFilter = 'all';
let productsPerPage = 8;
let currentPage = 1;

// Sample Products Data
const sampleProducts = [
     {
        id: 1,
        title: "Samsung Galaxy M34 5G (Dark Blue, 128 GB)",
        category: "electronics",
        price: 16999,
        originalPrice: 24999,
        discount: "32% off",
        rating: 4.3,
        ratingCount: 1840,
        image: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=300",
        description: "6000 mAh Battery | 50MP Triple Camera | 120Hz Super AMOLED Display"
    },
    {
        id: 2,
        title: "Apple MacBook Air M2 Chip (8GB/256GB SSD)",
        category: "electronics",
        price: 99900,
        originalPrice: 119900,
        discount: "17% off",
        rating: 4.6,
        ratingCount: 892,
        image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300",
        description: "13.6-inch Liquid Retina Display | 8-Core CPU | 8-Core GPU | 18 Hour Battery Life"
    },
    {
        id: 3,
        title: "Levi's Men's Regular Fit Jeans",
        category: "fashion",
        price: 1599,
        originalPrice: 2999,
        discount: "47% off",
        rating: 4.1,
        ratingCount: 2340,
        image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300",
        description: "Classic blue denim jeans with regular fit and comfortable stretch fabric"
    },
    {
        id: 4,
        title: "Sony WH-CH720N Wireless Noise Canceling Headphones",
        category: "electronics",
        price: 8990,
        originalPrice: 14990,
        discount: "40% off",
        rating: 4.4,
        ratingCount: 567,
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
        description: "Active Noise Canceling | 35Hr Battery Life | Quick Charge | Bluetooth 5.2"
    },
    {
        id: 5,
        title: "The Psychology of Money by Morgan Housel",
        category: "books",
        price: 299,
        originalPrice: 399,
        discount: "25% off",
        rating: 4.7,
        ratingCount: 3421,
        image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300",
        description: "Timeless lessons on wealth, greed, and happiness from one of the most important authors"
    },
    {
        id: 6,
        title: "Prestige Omega Deluxe Granite Kadai 24 cm",
        category: "home",
        price: 1299,
        originalPrice: 2100,
        discount: "38% off",
        rating: 4.2,
        ratingCount: 1567,
        image: "https://images.pexels.com/photos/4226792/pexels-photo-4226792.jpeg?auto=compress&cs=tinysrgb&w=300",
        description: "Non-stick granite coating | Heat resistant handles | Induction compatible"
    },
    {
        id: 7,
        title: "Nike Air Force 1 '07 White Sneakers",
        category: "fashion",
        price: 7495,
        originalPrice: 8295,
        discount: "10% off",
        rating: 4.5,
        ratingCount: 892,
        image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300",
        description: "Classic white leather sneakers with Air-Sole unit and pivot points for traction"
    },
    {
        id: 8,
        title: "Yonex Arcsaber 11 Badminton Racket",
        category: "sports",
        price: 12500,
        originalPrice: 16500,
        discount: "24% off",
        rating: 4.6,
        ratingCount: 234,
        image: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=300",
        description: "Professional badminton racket | High modulus graphite | Unstrung weight 88g"
    }
];

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartClose = document.getElementById('cartClose');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const productModal = document.getElementById('productModal');
const productClose = document.getElementById('productClose');
const productDetails = document.getElementById('productDetails');
const contactForm = document.getElementById('contactForm');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const toastContainer = document.getElementById('toastContainer');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    products = [...sampleProducts];
    filteredProducts = [...products];
    
    setupEventListeners();
    renderProducts();
    updateCartUI();
    setupSmoothScrolling();
    setupIntersectionObserver();
    
    console.log('E-commerce website initialized!');
}

// Event Listeners Setup
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Search modal
    searchBtn.addEventListener('click', openSearchModal);
    searchClose.addEventListener('click', closeSearchModal);
    
    // Cart modal
    cartBtn.addEventListener('click', openCartModal);
    cartClose.addEventListener('click', closeCartModal);
    
    // Product modal
    productClose.addEventListener('click', closeProductModal);
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    
    // Contact form
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Cart actions
    checkoutBtn.addEventListener('click', handleCheckout);
    clearCartBtn.addEventListener('click', clearCart);
    
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });
    
    // Close modals on outside click
    window.addEventListener('click', handleOutsideClick);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// Mobile Menu Functions
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = '';
            span.style.opacity = '';
        }
    });
}

// Search Functions
function openSearchModal() {
    searchModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus on search input
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        searchInput.focus();
    }, 100);
}

function closeSearchModal() {
    searchModal.style.display = 'none';
    document.body.style.overflow = '';
}

// Cart Functions
function openCartModal() {
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderCartItems();
}

function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = '';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showToast('Product added to cart!', 'success');
    
    // Add animation to cart button
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = '';
    }, 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    renderCartItems();
    showToast('Product removed from cart', 'warning');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        renderCartItems();
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    // Hide cart count if empty
    if (totalItems === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'flex';
    }
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center p-2">
                <p>Your cart is empty</p>
                <button onclick="closeCartModal()" class="cta-btn mt-2">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
}

function clearCart() {
    if (cart.length === 0) {
        showToast('Cart is already empty', 'warning');
        return;
    }
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCartUI();
        renderCartItems();
        showToast('Cart cleared successfully', 'success');
    }
}

function handleCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'warning');
        return;
    }
    
    showLoading();
    
    // Simulate checkout process
    setTimeout(() => {
        hideLoading();
        showToast('Order placed successfully! Thank you for shopping with us.', 'success');
        cart = [];
        updateCartUI();
        renderCartItems();
        closeCartModal();
    }, 2000);
}

// Product Functions
function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(0, endIndex);
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1;">
                <p>No products found matching your criteria.</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card fade-in-up" data-category="{product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">₹${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                    <button class="quick-view-btn" onclick="openProductModal(${product.id})">
                        👁️
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Show/hide load more button
    if (endIndex >= filteredProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

function filterProducts(category) {
    currentFilter = category;
    currentPage = 1;
    
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    renderProducts();
}

function handleFilterClick(e) {
    const filter = e.target.dataset.filter;
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter products
    filterProducts(filter);
}

function handleCategoryClick(e) {
    const category = e.currentTarget.dataset.category;
    
    // Scroll to products section
    scrollToSection('products');
    
    // Filter products after scroll
    setTimeout(() => {
        // Update filter button
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        filterProducts(category);
    }, 500);
}

function loadMoreProducts() {
    currentPage++;
    renderProducts();
}

// Product Modal Functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <div class="product-details-info">
            <h2>${product.title}</h2>
            <div class="product-details-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <p class="product-details-description">${product.description}</p>
            <div class="product-details-actions">
                <button class="add-to-cart-detail" onclick="addToCart(${product.id}); closeProductModal();">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    productModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = '';
}

// Form Handlers
function handleContactSubmit(e) {
    e.preventDefault();
    
    showLoading();
    
    // Simulate form submission
    setTimeout(() => {
        hideLoading();
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    }, 1500);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showToast('Successfully subscribed to newsletter!', 'success');
        e.target.reset();
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

function showLoading() {
    loadingSpinner.style.display = 'flex';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const title = type === 'success' ? 'Success!' : 
                  type === 'error' ? 'Error!' : 
                  type === 'warning' ? 'Warning!' : 'Info!';
    
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Event Handlers
function handleOutsideClick(e) {
    // Close search modal
    if (e.target === searchModal) {
        closeSearchModal();
    }
    
    // Close cart modal
    if (e.target === cartModal) {
        closeCartModal();
    }
    
    // Close product modal
    if (e.target === productModal) {
        closeProductModal();
    }
}

function handleKeyboardShortcuts(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        closeSearchModal();
        closeCartModal();
        closeProductModal();
    }
    
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.category-card, .feature, .contact-item');
    animateElements.forEach(el => observer.observe(el));
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Search Functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length > 2) {
        const searchResults = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        // You can implement search results display here
        console.log('Search results:', searchResults);
    }
});

// Performance Optimization: Lazy Loading Images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
setupLazyLoading();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateQuantity,
        filterProducts,
        showToast
    };
}

// Console welcome message
console.log(`
🛒 Welcome to ShopEase E-commerce Website!
📱 This is a fully responsive e-commerce platform built with HTML, CSS, and JavaScript.
🎯 Features: Product catalog, shopping cart, search, filters, and more!
🚀 Perfect for learning modern web development!
`);

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // You can register a service worker here for offline functionality
        console.log('Service Worker support detected');
    });
}