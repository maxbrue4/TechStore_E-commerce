        // Variables globales del carrito
        let cart = [];
        let cartTotal = 0;

        // Productos disponibles
        const products = {
            'iphone-15': { name: 'iPhone 15 Pro Max', price: 899.99, emoji: '📱' },
            'macbook-air': { name: 'MacBook Air M3', price: 1299.99, emoji: '💻' },
            'samsung-tv': { name: 'Samsung QLED 4K 55"', price: 799.99, emoji: '📺' },
            'ipad-pro': { name: 'iPad Pro 12.9"', price: 1099.99, emoji: '📟' },
            'playstation-5': { name: 'PlayStation 5', price: 499.99, emoji: '🎮' },
            'gaming-kit': { name: 'Kit Gaming RGB', price: 149.99, emoji: '🖨️' }
        };

        // Función para cargar carrito desde localStorage
        function loadCart() {
            const savedCart = localStorage.getItem('techstore_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }

        // Función para guardar carrito en localStorage
        function saveCart(cart) {
            localStorage.setItem('techstore_cart', JSON.stringify(cart));
        }

        // Función para inicializar el carrito al cargar la página
        function initializeCart() {
            cart = loadCart();
            updateCartUI();
            updateCartCount();
        }

        // Funciones del carrito
        function openCart() {
            document.getElementById('cartSidebar').classList.add('open');
            document.querySelector('.cart-overlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCart() {
            document.getElementById('cartSidebar').classList.remove('open');
            document.querySelector('.cart-overlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function addToCart(productId) {
            const product = products[productId];
            if (!product) return;

            // Buscar si el producto ya está en el carrito
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    emoji: product.emoji,
                    quantity: 1
                });
            }

            saveCart(cart); // Guardar en localStorage
            updateCartUI();
            updateCartCount();
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart(cart); // Guardar en localStorage
            updateCartUI();
            updateCartCount();
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    saveCart(cart); // Guardar en localStorage
                    updateCartUI();
                    updateCartCount();
                }
            }
        }

        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.querySelector('.cart-count').textContent = totalItems;
        }

        function updateCartUI() {
            const cartItemsContainer = document.getElementById('cartItems');
            const cartTotalElement = document.getElementById('cartTotal');

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <p>Your cart is empty</p>
                        <p>Add some amazing products!</p>
                    </div>
                `;
                cartTotal = 0;
            } else {
                cartItemsContainer.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">${item.emoji}</div>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="cart-item-controls">
                                <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                                <button class="remove-item" onclick="removeFromCart('${item.id}')">Eliminar</button>
                            </div>
                        </div>
                    </div>
                `).join('');

                cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            }

            cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            
            alert(`Thank you for your purchase!\nTotal: $${cartTotal.toFixed(2)}\nItems: ${cart.length}`);
            cart = [];
            saveCart(cart); // Limpiar localStorage
            updateCartUI();
            updateCartCount();
            closeCart();
        }

        // Funcionalidad para los botones de agregar al carrito
        document.querySelectorAll('.add-to-cart').forEach((button, index) => {
            const productIds = ['iphone-15', 'macbook-air', 'samsung-tv', 'ipad-pro', 'playstation-5', 'gaming-kit'];
            
            button.addEventListener('click', function() {
                const productId = productIds[index];
                addToCart(productId);
                
                // Efecto visual
                this.style.background = '#27ae60';
                this.textContent = '✓ Added';
                
                setTimeout(() => {
                    this.style.background = '';
                    this.textContent = 'Add to cart';
                }, 1500);
            });
        });

        // Smooth scroll para los enlaces de navegación
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

        // Funcionalidad de búsqueda básica
        document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert('Función de búsqueda: "' + this.value + '"');
                this.value = '';
            }
        });

        // Cerrar carrito con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeCart();
            }
        });

        // Inicializar carrito al cargar la página
        document.addEventListener('DOMContentLoaded', initializeCart);
