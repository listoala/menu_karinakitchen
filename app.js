// --- CONFIGURATION ---
// Replace the number below with your phone number.
// Important! Use the international format with '1' at the beginning for the USA.
const PHONE_NUMBER = '16232397605';
// --------------------


document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const menuItemsContainer = document.getElementById('menu-items');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const customerNameInput = document.getElementById('customer-name');
    const callButton = document.getElementById('call-btn');
    const smsButton = document.getElementById('sms-btn');

    let cart = []; // The shopping cart

    // Event to add products to the cart
    menuItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const itemElement = event.target.closest('.menu-item');
            const itemName = itemElement.dataset.name;
            const itemPrice = parseFloat(itemElement.dataset.price);
            addToCart(itemName, itemPrice);
        }
    });

    // Function to add an item to the cart
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }

    // Function to render the cart on the screen
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

    // --- Logic for each button ---

    // 1. Event listener for the CALL button
    callButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add some dishes to continue.');
            return;
        }
        
        alert('A phone call will be initiated to complete your order. Please have your order details ready!');
        
        const phoneURL = `tel:${PHONE_NUMBER}`;
        window.open(phoneURL);
    });

    // 2. Event listener for the SEND SMS button
    smsButton.addEventListener('click', () => {
        const customerName = customerNameInput.value.trim();
        if (cart.length === 0) {
            alert('Your cart is empty. Please add some dishes.');
            return;
        }
        if (customerName === "") {
            alert('Please enter your name to place the order.');
            customerNameInput.focus();
            return;
        }

        // Build the text message with order details
        let message = `Hello! 👋 I'd like to place an order.\n\n`;
        message += `Name: ${customerName}\n\n`;
        message += `My Order:\n`;
        
        cart.forEach(item => {
            // *** CORRECTION WAS HERE: It was item.g, now it's correctly item.quantity ***
            message += `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal Due: $${total.toFixed(2)}`;

        const encodedMessage = encodeURIComponent(message);
        
        const smsURL = `sms:${PHONE_NUMBER}?body=${encodedMessage}`;
        window.open(smsURL, '_blank');
    });
});