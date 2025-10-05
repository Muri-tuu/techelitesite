// Enhanced TechElite App - Mobile Responsive & Dynamic Features
class TechEliteApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('techElite_cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('techElite_wishlist')) || [];
        this.theme = localStorage.getItem('techElite_theme') || 'dark';
        this.products = this.initializeProducts();
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupCart();
        this.setupMobileNavigation();
        this.setupResponsiveHandlers();
        this.setupAnimations();
        this.setupEventListeners();
        this.initializeComponents();
        this.setupTouchInteractions();
    }

    // Theme Management
    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        // Apply saved theme
        html.setAttribute('data-theme', this.theme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.theme = this.theme === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', this.theme);
                localStorage.setItem('techElite_theme', this.theme);
                
                // Animate theme toggle
                anime({
                    targets: themeToggle,
                    rotate: '1turn',
                    duration: 600,
                    easing: 'easeInOutQuart'
                });

                // Update theme icon
                this.updateThemeIcon();
            });
        }
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('svg');
            if (icon) {
                if (this.theme === 'light') {
                    icon.innerHTML = '<path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>';
                } else {
                    icon.innerHTML = '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>';
                }
            }
        }
    }

    // Mobile Navigation
    setupMobileNavigation() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('translate-x-full');
                mobileMenu.classList.toggle('opacity-0');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    mobileMenu.classList.add('translate-x-full', 'opacity-0');
                }
            });
        }
    }

    // Responsive Handlers
    setupResponsiveHandlers() {
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth < 768;
            
            if (wasMobile !== this.isMobile) {
                this.handleScreenSizeChange();
            }
        });
    }

    handleScreenSizeChange() {
        // Adjust layouts for mobile/desktop
        this.adjustProductGrid();
        this.adjustCarousel();
        this.updateMobileSpecificFeatures();
    }

    adjustProductGrid() {
        const productGrid = document.getElementById('products-grid');
        if (productGrid) {
            if (this.isMobile) {
                productGrid.classList.add('grid-cols-1', 'gap-4');
                productGrid.classList.remove('grid-cols-2', 'grid-cols-3', 'gap-6', 'gap-8');
            } else {
                productGrid.classList.add('grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'xl:gap-8');
                productGrid.classList.remove('grid-cols-1', 'gap-4');
            }
        }
    }

    adjustCarousel() {
        const carousel = document.querySelector('.product-carousel');
        if (carousel && window.Splide) {
            const splideInstance = carousel.querySelector('.splide')?._splide;
            if (splideInstance) {
                if (this.isMobile) {
                    splideInstance.options.perPage = 1;
                } else {
                    splideInstance.options.perPage = 3;
                }
                splideInstance.refresh();
            }
        }
    }

    updateMobileSpecificFeatures() {
        // Update touch targets for mobile
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(btn => {
            if (this.isMobile) {
                btn.classList.add('min-h-[44px]');
            } else {
                btn.classList.remove('min-h-[44px]');
            }
        });
    }

    // Touch Interactions
    setupTouchInteractions() {
        // Add touch feedback for mobile
        document.addEventListener('touchstart', (e) => {
            const target = e.target.closest('button, .product-card, .nav-item');
            if (target) {
                target.style.transform = 'scale(0.98)';
                target.style.transition = 'transform 0.1s ease';
            }
        });

        document.addEventListener('touchend', (e) => {
            const target = e.target.closest('button, .product-card, .nav-item');
            if (target) {
                setTimeout(() => {
                    target.style.transform = '';
                    target.style.transition = '';
                }, 100);
            }
        });

        // Prevent zoom on input focus for iOS
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (this.isMobile) {
                    document.querySelector('meta[name=viewport]').setAttribute('content', 
                        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            });

            input.addEventListener('blur', () => {
                if (this.isMobile) {
                    document.querySelector('meta[name=viewport]').setAttribute('content', 
                        'width=device-width, initial-scale=1.0');
                }
            });
        });
    }

    // Shopping Cart Functionality
    setupCart() {
        this.updateCartUI();
        
        const cartToggle = document.getElementById('cart-toggle');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartBackdrop = document.getElementById('cart-backdrop');
        
        if (cartToggle && cartSidebar) {
            cartToggle.addEventListener('click', () => this.toggleCart());
            cartBackdrop?.addEventListener('click', () => this.closeCart());
        }
    }

    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }

        this.saveCart();
        this.updateCartUI();
        this.showCartNotification(product.name);

        // Add to cart animation
        const addButton = document.querySelector(`[onclick="app.addToCart(${productId})"]`);
        if (addButton) {
            anime({
                targets: addButton,
                scale: [1, 1.1, 1],
                duration: 300,
                easing: 'easeOutBack'
            });
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartBackdrop = document.getElementById('cart-backdrop');
        
        if (cartSidebar && cartBackdrop) {
            cartSidebar.classList.toggle('translate-x-full');
            cartBackdrop.classList.toggle('opacity-0');
            cartBackdrop.classList.toggle('invisible');
            
            // Prevent body scroll on mobile when cart is open
            if (this.isMobile) {
                document.body.classList.toggle('overflow-hidden');
            }
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartBackdrop = document.getElementById('cart-backdrop');
        
        if (cartSidebar && cartBackdrop) {
            cartSidebar.classList.add('translate-x-full');
            cartBackdrop.classList.add('opacity-0', 'invisible');
            
            // Restore body scroll
            if (this.isMobile) {
                document.body.classList.remove('overflow-hidden');
            }
        }
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
        
        if (cartItems) {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item flex items-center gap-4 p-4 border-b border-gray-700">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-white truncate">${item.name}</h4>
                        <p class="text-blue-400 text-sm">$${item.price}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="app.updateQuantity(${item.id}, ${item.quantity - 1})" 
                                class="w-8 h-8 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">-</button>
                        <span class="w-8 text-center text-white font-medium">${item.quantity}</span>
                        <button onclick="app.updateQuantity(${item.id}, ${item.quantity + 1})" 
                                class="w-8 h-8 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">+</button>
                    </div>
                    <button onclick="app.removeFromCart(${item.id})" 
                            class="text-red-400 hover:text-red-300 ml-2 transition-colors">×</button>
                </div>
            `).join('');
        }
        
        if (cartTotal) {
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        }
    }

    saveCart() {
        localStorage.setItem('techElite_cart', JSON.stringify(this.cart));
    }

    showCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full max-w-sm';
        notification.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="font-medium">${productName} added to cart!</span>
            </div>
        `;
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: 0,
            duration: 300,
            easing: 'easeOutQuart',
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: notification,
                        translateX: '100%',
                        duration: 300,
                        easing: 'easeInQuart',
                        complete: () => notification.remove()
                    });
                }, 3000);
            }
        });
    }

    // Animation Setup
    setupAnimations() {
        // Scroll reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animation || 'fadeInUp';
                    this.animateElement(element, animationType);
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all elements with animation class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Hero typewriter effect
        this.initTypewriter();
        
        // Particle background
        this.initParticleBackground();
    }

    animateElement(element, type) {
        const animations = {
            fadeInUp: {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: 'easeOutQuart'
            },
            fadeInLeft: {
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 800,
                easing: 'easeOutQuart'
            },
            fadeInRight: {
                opacity: [0, 1],
                translateX: [30, 0],
                duration: 800,
                easing: 'easeOutQuart'
            },
            scaleIn: {
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 600,
                easing: 'easeOutBack'
            }
        };

        anime({
            targets: element,
            ...animations[type]
        });
    }

    initTypewriter() {
        const typewriterElement = document.getElementById('typewriter-text');
        if (typewriterElement) {
            const text = typewriterElement.textContent;
            typewriterElement.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    typewriterElement.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }
    }

    initParticleBackground() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const app = new PIXI.Application({
            view: canvas,
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            antialias: true
        });

        const particles = [];
        const particleCount = this.isMobile ? 30 : 50; // Fewer particles on mobile

        for (let i = 0; i < particleCount; i++) {
            const particle = new PIXI.Graphics();
            particle.beginFill(0x00d4ff, 0.6);
            particle.drawCircle(0, 0, Math.random() * 3 + 1);
            particle.endFill();
            
            particle.x = Math.random() * app.screen.width;
            particle.y = Math.random() * app.screen.height;
            particle.vx = (Math.random() - 0.5) * 0.5;
            particle.vy = (Math.random() - 0.5) * 0.5;
            
            app.stage.addChild(particle);
            particles.push(particle);
        }

        app.ticker.add(() => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0) particle.x = app.screen.width;
                if (particle.x > app.screen.width) particle.x = 0;
                if (particle.y < 0) particle.y = app.screen.height;
                if (particle.y > app.screen.height) particle.y = 0;
            });
        });

        // Resize handler
        window.addEventListener('resize', () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Product quick view
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-view-btn')) {
                const productId = parseInt(e.target.dataset.productId);
                this.showProductModal(productId);
            }
        });

        // Wishlist toggle
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('wishlist-btn')) {
                const productId = parseInt(e.target.dataset.productId);
                this.toggleWishlist(productId);
                this.animateWishlistButton(e.target);
            }
        });

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop') || 
                e.target.classList.contains('modal-close')) {
                this.closeModal();
            }
        });

        // Newsletter form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup();
            });
        }

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.debounce(() => this.handleSearch(e.target.value), 300)();
            });
        }

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeCart();
            }
        });
    }

    // Product Modal
    showProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 modal-backdrop';
        modal.innerHTML = `
            <div class="bg-gray-900 rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-white">${product.name}</h2>
                        <button class="modal-close text-gray-400 hover:text-white text-2xl">&times;</button>
                    </div>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <img src="${product.image}" alt="${product.name}" class="w-full rounded-lg">
                        </div>
                        <div>
                            <div class="mb-4">
                                <div class="flex items-center mb-2">
                                    ${this.renderStars(product.rating)}
                                    <span class="ml-2 text-gray-400">(${product.reviews} reviews)</span>
                                </div>
                                <p class="text-3xl font-bold text-blue-400 mb-4">$${product.price}</p>
                                <p class="text-gray-300 mb-6">${product.description}</p>
                            </div>
                            <div class="space-y-4">
                                <button onclick="app.addToCart(${product.id})" 
                                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                                    Add to Cart
                                </button>
                                <button onclick="app.toggleWishlist(${product.id})" 
                                        class="w-full border border-gray-600 hover:border-gray-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Animate modal in
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });

        anime({
            targets: modal.querySelector('.bg-gray-900'),
            scale: [0.8, 1],
            duration: 300,
            easing: 'easeOutBack'
        });
    }

    closeModal() {
        const modal = document.querySelector('.modal-backdrop');
        if (modal) {
            document.body.style.overflow = ''; // Restore scroll
            anime({
                targets: modal,
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => modal.remove()
            });
        }
    }

    // Wishlist
    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
        } else {
            this.wishlist.push(productId);
        }
        
        localStorage.setItem('techElite_wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistUI();
    }

    updateWishlistUI() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            const isWishlisted = this.wishlist.includes(productId);
            btn.classList.toggle('text-red-500', isWishlisted);
            btn.classList.toggle('text-gray-400', !isWishlisted);
        });
    }

    animateWishlistButton(button) {
        anime({
            targets: button,
            scale: [1, 1.3, 1],
            duration: 400,
            easing: 'easeOutBack'
        });
    }

    // Newsletter
    handleNewsletterSignup() {
        const email = document.getElementById('newsletter-email').value;
        const button = document.getElementById('newsletter-submit');
        
        if (this.validateEmail(email)) {
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.showNotification('Successfully subscribed to newsletter!', 'success');
                document.getElementById('newsletter-email').value = '';
                button.textContent = 'Subscribe';
                button.disabled = false;
            }, 1500);
        } else {
            this.showNotification('Please enter a valid email address', 'error');
        }
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full max-w-sm ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        } text-white`;
        notification.innerHTML = `
            <div class="flex items-center">
                ${type === 'success' ? 
                    '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' :
                    '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>'
                }
                <span class="font-medium">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: 0,
            duration: 300,
            easing: 'easeOutQuart',
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: notification,
                        translateX: '100%',
                        duration: 300,
                        easing: 'easeInQuart',
                        complete: () => notification.remove()
                    });
                }, 3000);
            }
        });
    }

    // Search
    handleSearch(query) {
        const results = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        const container = document.getElementById('search-results');
        if (!container) return;
        
        if (results.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-8">No products found</p>';
            return;
        }
        
        container.innerHTML = results.map(product => `
            <div class="product-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="font-semibold text-white mb-2">${product.name}</h3>
                    <p class="text-blue-400 font-bold">$${product.price}</p>
                </div>
            </div>
        `).join('');
    }

    // Utility
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="text-yellow-400">★</span>';
        }
        
        if (hasHalfStar) {
            stars += '<span class="text-yellow-400">☆</span>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="text-gray-600">★</span>';
        }
        
        return stars;
    }

    // Initialize components
    initializeComponents() {
        this.updateWishlistUI();
        this.updateThemeIcon();
        
        // Initialize product carousel if on homepage
        if (document.querySelector('.product-carousel')) {
            this.initProductCarousel();
        }
        
        // Initialize filters if on products page
        if (document.querySelector('.filter-sidebar')) {
            this.initFilters();
        }

        // Initialize admin features if on admin page
        if (document.getElementById('admin-dashboard')) {
            this.initAdminFeatures();
        }
    }

    initProductCarousel() {
        // Splide carousel initialization
        const carousel = document.querySelector('.product-carousel .splide');
        if (carousel && window.Splide) {
            new Splide(carousel, {
                type: 'loop',
                perPage: this.isMobile ? 1 : 3,
                perMove: 1,
                gap: this.isMobile ? '1rem' : '2rem',
                autoplay: true,
                interval: 4000,
                pauseOnHover: true,
                breakpoints: {
                    768: {
                        perPage: 1,
                    },
                    1024: {
                        perPage: 2,
                    }
                }
            }).mount();
        }
    }

    initFilters() {
        // Initialize filter functionality
        const filterSidebar = document.getElementById('filter-sidebar');
        if (filterSidebar) {
            // Mobile filter toggle
            const filterToggle = document.getElementById('filter-toggle');
            if (filterToggle) {
                filterToggle.addEventListener('click', () => {
                    filterSidebar.classList.toggle('hidden');
                });
            }
        }
    }

    initAdminFeatures() {
        // Initialize admin-specific features
        console.log('Admin features initialized');
    }

    // Product Data
    initializeProducts() {
        return [
            {
                id: 1,
                name: "Sony WH-1000XM5 Wireless Headphones",
                price: 399.99,
                category: "Audio",
                brand: "Sony",
                image: "resources/product-1.jpg",
                rating: 4.8,
                reviews: 1247,
                description: "Industry-leading noise canceling with exceptional sound quality and 30-hour battery life.",
                features: ["wireless", "noise-canceling"],
                stock: 75
            },
            {
                id: 2,
                name: "Razer Mechanical Gaming Keyboard",
                price: 159.99,
                category: "Gaming",
                brand: "Razer",
                image: "resources/product-2.jpg",
                rating: 4.6,
                reviews: 892,
                description: "RGB backlit mechanical keyboard with premium switches for ultimate gaming performance.",
                features: ["rgb", "wireless"],
                stock: 45
            },
            {
                id: 3,
                name: "iPhone 15 Pro Max",
                price: 1199.99,
                category: "Mobile",
                brand: "Apple",
                image: "resources/product-3.jpg",
                rating: 4.9,
                reviews: 2156,
                description: "The most advanced iPhone with titanium design and A17 Pro chip.",
                features: ["wireless"],
                stock: 3
            },
            {
                id: 4,
                name: "AirPods Pro (2nd Generation)",
                price: 249.99,
                category: "Audio",
                brand: "Apple",
                image: "resources/product-4.jpg",
                rating: 4.7,
                reviews: 1834,
                description: "Premium wireless earbuds with active noise cancellation and spatial audio.",
                features: ["wireless", "noise-canceling"],
                stock: 23
            },
            {
                id: 5,
                name: "Apple Watch Ultra",
                price: 799.99,
                category: "Wearables",
                brand: "Apple",
                image: "resources/product-5.jpg",
                rating: 4.8,
                reviews: 967,
                description: "Rugged smartwatch designed for extreme adventures and fitness tracking.",
                features: ["wireless", "waterproof"],
                stock: 12
            },
            {
                id: 6,
                name: "Logitech G Pro X Gaming Mouse",
                price: 149.99,
                category: "Gaming",
                brand: "Logitech",
                image: "resources/product-6.jpg",
                rating: 4.5,
                reviews: 743,
                description: "Professional gaming mouse with customizable RGB and precision sensor.",
                features: ["rgb", "wireless"],
                stock: 34
            },
            {
                id: 7,
                name: "Bose SoundLink Revolve+",
                price: 329.99,
                category: "Audio",
                brand: "Bose",
                image: "resources/product-7.jpg",
                rating: 4.6,
                reviews: 1123,
                description: "360-degree portable Bluetooth speaker with premium sound quality.",
                features: ["wireless", "waterproof"],
                stock: 18
            },
            {
                id: 8,
                name: "MacBook Pro 14\" M3",
                price: 1999.99,
                category: "Laptops",
                brand: "Apple",
                image: "resources/product-8.jpg",
                rating: 4.9,
                reviews: 1456,
                description: "Professional laptop with M3 chip delivering exceptional performance.",
                features: [],
                stock: 8
            }
        ];
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TechEliteApp();
});

// Smooth scrolling for navigation links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Hide loading spinner if exists
    const loader = document.getElementById('loading-spinner');
    if (loader) {
        anime({
            targets: loader,
            opacity: 0,
            duration: 500,
            complete: () => loader.remove()
        });
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        anime.running.forEach(animation => animation.pause());
    } else {
        // Resume animations when page becomes visible
        anime.running.forEach(animation => animation.play());
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could show user-friendly error message here
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});