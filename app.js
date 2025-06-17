// --- CONFIGURACIÓN ---
// Reemplaza el número de abajo con tu número de WhatsApp.
// ¡Importante! Usa el formato internacional sin el signo '+', espacios o guiones.
// Ejemplo para un número en caracas, Venezuela: 584127245092
const WHATSAPP_NUMBER = '584127245092';
// --------------------


document.addEventListener('DOMContentLoaded', () => {
    const menuItemsContainer = document.getElementById('menu-items');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const sendOrderButton = document.getElementById('send-order');
    const customerNameInput = document.getElementById('customer-name');

    let cart = [];

    // Evento para agregar productos al carrito
    menuItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const itemElement = event.target.closest('.menu-item');
            const itemName = itemElement.dataset.name;
            const itemPrice = parseFloat(itemElement.dataset.price);
            addToCart(itemName, itemPrice);
        }
    });

    // Función para agregar un item al carrito
    function addToCart(name, price) {
        // Revisa si el item ya está en el carrito
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }

    // Función para renderizar (dibujar) el carrito en la pantalla
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

    // Evento para enviar el pedido
    sendOrderButton.addEventListener('click', () => {
        const customerName = customerNameInput.value.trim();
        if(cart.length === 0) {
            alert('Tu carrito está vacío. Por favor, agrega algún platillo.');
            return;
        }
        if(customerName === "") {
            alert('Por favor, dinos tu nombre para tomar el pedido.');
            customerNameInput.focus();
            return;
        }

        let message = `¡Hola! 👋 Quisiera hacer un pedido.\n\n`;
        message += `*Nombre:* ${customerName}\n\n`;
        message += `*Mi Pedido:*\n`;
        
        cart.forEach(item => {
            message += `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\n*Total a Pagar:* $${total.toFixed(2)}`;

        // Codificamos el mensaje para que funcione en una URL
        const encodedMessage = encodeURIComponent(message);
        
        // Creamos el enlace de WhatsApp y lo abrimos
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
    });
});