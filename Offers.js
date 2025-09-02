    // Productos de ofertas con sus datos
    const offerProducts = {
        'samsung-s23': { name: 'Samsung Galaxy S23 Ultra', price: 699.99, emoji: '📱' },
        'dell-xps': { name: 'Dell XPS 13 Plus', price: 899.99, emoji: '💻' },
        'sony-wh': { name: 'Sony WH-1000XM5', price: 159.99, emoji: '🎧' },
        'lg-oled': { name: 'LG OLED 65" C3', price: 1299.99, emoji: '📺' },
        'ipad-air': { name: 'iPad Air 5th Gen', price: 399.99, emoji: '📟' },
        'nintendo-switch': { name: 'Nintendo Switch OLED', price: 199.99, emoji: '🎮' }
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

    // Función para agregar producto al carrito
    function addToOfferCart(productId) {
        const product = offerProducts[productId];
        if (!product) return;

        let cart = loadCart();
        
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

        saveCart(cart);
        return cart;
    }

    // Agregar funcionalidad a los botones de "Add to Cart" de ofertas
    document.querySelectorAll('.add-to-cart').forEach((button, index) => {
        const offerProductIds = ['samsung-s23', 'dell-xps', 'sony-wh', 'lg-oled', 'ipad-air', 'nintendo-switch'];
        
        button.addEventListener('click', function() {
            const productId = offerProductIds[index];
            const updatedCart = addToOfferCart(productId);
            
            // Efecto visual
            this.style.background = '#27ae60';
            this.innerHTML = '✓ Added to Cart';
            
            setTimeout(() => {
                this.style.background = '';
                this.innerHTML = '🛒 Add to Cart';
            }, 2000);
            
            // Mostrar notificación
            showNotification(`${offerProducts[productId].name} added to cart!`);
        });
    });

    // Función para mostrar notificación
    function showNotification(message) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        `;
        
        // Agregar estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Countdown Timer (código existente)
    function updateCountdown() {
        const now = new Date().getTime();
        const endTime = now + (12 * 60 * 60 * 1000) + (45 * 60 * 1000) + (30 * 1000);
        
        setInterval(() => {
            const currentTime = new Date().getTime();
            const timeLeft = endTime - currentTime;
            
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            if (timeLeft < 0) {
                document.querySelector('.offers-timer').innerHTML = '<h2>Offer Ended!</h2><p>But we have more offers for you...</p>';
            }
        }, 1000);
    }

    // Iniciar countdown
    updateCountdown();