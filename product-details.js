// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Extended product data with additional images and features
const products = [
    {
        id: 1,
        title: "Premium Wireless Earbuds",
        price: 129.99,
        originalPrice: 159.99,
        description: "Experience crystal-clear sound with our Premium Wireless Earbuds. Featuring active noise cancellation, touch controls, and up to 24 hours of battery life with the charging case.",
        mainImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1598331668826-20cecc596b86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        ],
        features: [
            "Active Noise Cancellation",
            "Touch Controls",
            "24-Hour Battery Life",
            "Wireless Charging Case",
            "IPX7 Water Resistance",
            "Bluetooth 5.2"
        ]
    },
    {
        id: 2,
        title: "Smart Watch Pro",
        price: 199.99,
        originalPrice: 249.99,
        description: "Stay connected and monitor your health with our advanced Smart Watch Pro. Features include heart rate monitoring, sleep tracking, and a beautiful AMOLED display.",
        mainImage: "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        images: [
            "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1434494343833-76d479012394?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        ],
        features: [
            "AMOLED Display",
            "Heart Rate Monitor",
            "Sleep Tracking",
            "5 ATM Water Resistance",
            "GPS Built-in",
            "7-Day Battery Life"
        ]
    },
    {
        id: 3,
        title: "4K Action Camera",
        price: 299.99,
        originalPrice: 349.99,
        description: "Capture your adventures in stunning 4K with our waterproof action camera. Perfect for extreme sports and underwater photography up to 30 meters.",
        mainImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        images: [
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1491796014055-e6835cdcd4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        ],
        features: [
            "4K/60fps Video",
            "20MP Photos",
            "30m Waterproof",
            "Image Stabilization",
            "Voice Control",
            "WiFi & Bluetooth"
        ]
    }
];

// Find the current product
const currentProduct = products.find(p => p.id === productId);

if (currentProduct) {
    // Update page content
    document.title = `${currentProduct.title} - TechHub`;
    document.getElementById('productTitle').textContent = currentProduct.title;
    document.getElementById('productPrice').textContent = `$${currentProduct.price.toFixed(2)}`;
    document.getElementById('originalPrice').textContent = currentProduct.originalPrice.toFixed(2);
    document.getElementById('productDescription').textContent = currentProduct.description;
    document.getElementById('mainImage').src = currentProduct.mainImage;

    // Create thumbnails
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    currentProduct.images.forEach((image, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail';
        thumb.innerHTML = `<img src="${image}" alt="Product view ${index + 1}">`;
        thumb.addEventListener('click', () => {
            document.getElementById('mainImage').src = image;
            // Remove active class from all thumbnails
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumb.classList.add('active');
        });
        if (index === 0) thumb.classList.add('active');
        thumbnailContainer.appendChild(thumb);
    });

    // Add features
    const featuresList = document.getElementById('productFeatures');
    currentProduct.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
        featuresList.appendChild(li);
    });

    // Add related products
    const relatedProducts = products.filter(p => p.id !== productId).slice(0, 3);
    const relatedGrid = document.querySelector('.related-products-grid');
    relatedProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'related-product-card';
        card.setAttribute('data-aos', 'fade-up');
        card.innerHTML = `
            <img src="${product.mainImage}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <a href="product-details.html?id=${product.id}" class="view-btn">View Details</a>
        `;
        relatedGrid.appendChild(card);
    });
}

// Quantity selector functionality
function updateQuantity(change) {
    const input = document.getElementById('quantity');
    let value = parseInt(input.value) + change;
    value = Math.max(1, Math.min(10, value)); // Clamp between 1 and 10
    input.value = value;
}

// Wishlist button toggle
const wishlistBtn = document.querySelector('.wishlist-btn');
wishlistBtn.addEventListener('click', () => {
    wishlistBtn.classList.toggle('active');
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu') && !e.target.closest('.nav-links')) {
        navLinks.classList.remove('active');
    }
}); 