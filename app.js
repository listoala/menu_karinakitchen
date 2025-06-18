// --- CONFIGURACIÓN ---
// Reemplaza el número de abajo con tu número de teléfono.
// ¡Importante! Usa el formato internacional con el '1' al principio para EEUU.
const PHONE_NUMBER = '16232397605;
// --------------------


document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const menuItemsContainer = document.getElementById('menu-items');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const customerNameInput = document.getElementById('customer-name');

    // --- CAMBIO: Referencias a los dos nuevos botones ---
    const callButton = document.getElementById('call-btn');
    const smsButton = document.getElementById('sms-btn');

    let cart = []; // El carrito de compras

    // Evento para agregar productos al carrito (sin cambios)
    menuItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const itemElement = event.target.closest('.menu-item');
            const itemName = itemElement.dataset.name;
            const itemPrice = parseFloat(itemElement.dataset.price);
            addToCart(itemName, itemPrice);
        }
    });

    // Función para agregar un item al carrito (sin cambios)
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }

    // Función para renderizar el carrito en la pantalla (sin cambios)
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    // --- NUEVA SECCIÓN: Lógica para cada botón ---

    // 1. Evento para el botón de LLAMAR
    callButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Por favor, agrega algún platillo para continuar.');
            return;
        }
        
        alert('Se iniciará una llamada para que completes tu pedido. ¡Por favor, ten los detalles de tu orden a la mano!');
        
        const phoneURL = `tel:${PHONE_NUMBER}`;
        window.open(phoneURL);
    });

    // 2. Evento para el botón de ENVIAR SMS
    smsButton.addEventListener('click', () => {
        const customerName = customerNameInput.value.trim();
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Por favor, agrega algún platillo.');
            return;
        }
        if (customerName === "") {
            alert('Por favor, dinos tu nombre para tomar el pedido.');
            customerNameInput.focus();
            return;
        }

        // Construimos el mensaje de texto con los detalles del pedido
        let message = `¡Hola! 👋 Quisiera hacer un pedido.\n\n`;
        message += `Nombre: ${customerName}\n\n`;
        message += `Mi Pedido:\n`;
        
        cart.forEach(item => {
            message += `- ${item.name} (x${item.quantity}) - $${(item.price * item.g).toFixed(2)}\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal a Pagar: $${total.toFixed(2)}`;

        const encodedMessage = encodeURIComponent(message);
        
        const smsURL = `sms:${PHONE_NUMBER}?body=${encodedMessage}`;
        window.open(smsURL, '_blank');
    });
});