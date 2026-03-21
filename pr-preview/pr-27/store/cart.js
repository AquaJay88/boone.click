// cart.js

// Using localStorage to persist the cart
let cart = JSON.parse(localStorage.getItem('boone_cart')) || [];

const publishableKey = "pk_live_51TDC2lBA6S4OMIQx9F6TnP7bhrlGTSJXDAvcNrTuqdCd5YKY016GAB5yqVHYKHlDyxe8EA5XvrkK7Tcm2dIsjVvU00s04IK7B3";

// Initialize Stripe (requires Stripe.js to be loaded on the page)
let stripe;
if (typeof Stripe !== 'undefined') {
  stripe = Stripe(publishableKey);
}

// Function to add item to cart
function addToCart(priceId, size, color) {
  const productInfo = PRODUCTS[priceId];
  if (!productInfo) {
    console.error("Product not found in products.js");
    return;
  }

  // Check if item with exact same id, size, and color already exists in cart
  const existingItemIndex = cart.findIndex(item =>
    item.id === priceId &&
    item.size === size &&
    item.color === color
  );

  if (existingItemIndex > -1) {
    // Increment quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new item
    cart.push({
      id: priceId,
      name: productInfo.name,
      size: size,
      color: color,
      price: productInfo.price,
      displayPrice: productInfo.displayPrice,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();

  // Open the cart when item is added
  const cartMenu = document.getElementById('floatingCartMenu');
  if (cartMenu && !cartMenu.classList.contains('active')) {
    cartMenu.classList.add('active');
  }
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('boone_cart', JSON.stringify(cart));
}

// Format color to capitalize first letter
function formatColor(color) {
  return color.charAt(0).toUpperCase() + color.slice(1);
}

// Update the Cart UI (Badge and Dropdown items)
function updateCartUI() {
  // Update Badge
  const badge = document.getElementById('cartBadge');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (badge) {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }

  // Update Cart Items List
  const cartItemsContainer = document.getElementById('cartItems');
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    } else {
      cart.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';

        // Generate thumbnail URL
        const thumbUrl = `https://boone.click/images/card_holders/ch_${item.size.replace('mm', '')}_${item.color}.jpeg`;

        itemEl.innerHTML = `
          <img src="${thumbUrl}" alt="${item.name}" onerror="this.src='../John Boone Suit (no background).png';" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-meta">${item.size} / ${formatColor(item.color)}</div>
            <div class="cart-item-price">${item.displayPrice} x ${item.quantity}</div>
          </div>
          <button class="remove-item-btn" onclick="removeFromCart(${index})" aria-label="Remove item">
            <i class="fa-solid fa-trash"></i>
          </button>
        `;
        cartItemsContainer.appendChild(itemEl);
      });
    }
  }

  // Update Total Price
  const totalPriceContainer = document.getElementById('cartTotal');
  if (totalPriceContainer) {
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Disable checkout button if cart is empty
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
  }
}

// Make globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartUI = updateCartUI;
window.saveCart = saveCart;

// Handle Stripe Checkout
function handleCheckout() {
  if (cart.length === 0) return;

  const checkoutBtn = document.getElementById('checkoutBtn');
  const originalText = checkoutBtn.innerHTML;
  checkoutBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
  checkoutBtn.disabled = true;

  // Format line items for Stripe.js
  const lineItems = cart.map(item => {
    return {
      price: item.id,
      quantity: item.quantity
    };
  });

  // Ensure Stripe is loaded
  if (!stripe) {
    if (typeof Stripe !== 'undefined') {
      stripe = Stripe(publishableKey);
    } else {
      alert("Stripe is not loaded yet. Please wait a moment and try again.");
      checkoutBtn.innerHTML = originalText;
      checkoutBtn.disabled = false;
      return;
    }
  }

  // Redirect to Stripe Checkout
  stripe.redirectToCheckout({
    lineItems: lineItems,
    mode: 'payment',
    // Using current origin for dynamic success/cancel URLs
    successUrl: window.location.origin + '/store/success.html?session_id={CHECKOUT_SESSION_ID}',
    cancelUrl: window.location.href, // Go back to the page they were on
  }).then(function (result) {
    if (result.error) {
      alert(result.error.message);
      checkoutBtn.innerHTML = originalText;
      checkoutBtn.disabled = false;
    }
  });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  // Make sure cart script handles toggle
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const floatingCartMenu = document.getElementById('floatingCartMenu');

  if (cartToggleBtn && floatingCartMenu) {
    cartToggleBtn.addEventListener('click', function() {
      floatingCartMenu.classList.toggle('active');
    });
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }

  // Initial UI update
  updateCartUI();
});
