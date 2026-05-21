with open('store/cart.html', 'r') as f:
    content = f.read()

# Add to cart.html summary section
content = content.replace(
'''    <div id="cartPageSummary" class="cart-page-summary" style="display: none;">
      <div class="cart-page-total">Total: <span id="cartPageTotalValue">$0.00</span></div>
      <button class="btn cart-page-checkout-btn" id="cartPageCheckoutBtn">Checkout</button>
    </div>''',
'''    <div id="cartPageSummary" class="cart-page-summary" style="display: none;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%;">
        <div class="shipping-info" style="font-size: 0.9rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem; text-align: left;">
          <i class="fa-solid fa-truck" style="color: var(--primary-color);"></i>
          <span>Items typically ship within 2 weeks</span>
          <button class="learnMoreShippingBtn" style="background: none; border: none; padding: 0; color: var(--secondary-color-2); text-decoration: underline; cursor: pointer; font-size: 0.85rem; font-weight: 500;">Learn More</button>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 1rem;">
          <div class="cart-page-total">Total: <span id="cartPageTotalValue">$0.00</span></div>
          <button class="btn cart-page-checkout-btn" id="cartPageCheckoutBtn">Checkout</button>
        </div>
      </div>
    </div>'''
)

# Also need the modal html in cart.html since it lacks it.
modal_html = '''
  <!-- Shipping Information Modal -->
  <div id="shippingModal" class="modal-overlay" style="display: none;">
    <div class="modal-content bento-card">
      <button class="modal-close-btn" id="closeShippingModalBtn" aria-label="Close Shipping Information">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <h3 style="color: var(--primary-color); margin-bottom: 1rem; margin-top: 0;">Shipping Information</h3>
      <p style="font-size: 1rem; color: var(--text-primary); margin-bottom: 1rem;">
        All orders* should be shipped within 2 weeks, though many will be shipped earlier. Most of our products are made to order and then shipped. Items may be made and shipped in a couple of days, but this can be limited by our current volume of orders. If you ordered a product and haven’t received a shipping confirmation within 2 weeks, please let us know!
      </p>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0;">
        *Please note that we currently don’t ship outside of the United States. If you are interested in ordering one of our products over seas, let’s <a href="contact.html" style="text-decoration: underline;">get in touch</a>.
      </p>
    </div>
  </div>
'''

if 'id="shippingModal"' not in content:
    content = content.replace('</body>', f'{modal_html}\n</body>')


shipping_script = '''
  // Shipping Modal Logic
  document.addEventListener('DOMContentLoaded', () => {
    const shippingModal = document.getElementById('shippingModal');
    const closeBtn = document.getElementById('closeShippingModalBtn');

    function openModal() {
      if(shippingModal) {
        shippingModal.style.display = 'flex';
        setTimeout(() => {
          shippingModal.classList.add('active');
        }, 10);
      }
    }

    function closeModal() {
      if(shippingModal) {
        shippingModal.classList.remove('active');
        setTimeout(() => {
          shippingModal.style.display = 'none';
        }, 300);
      }
    }

    // Use event delegation or attach to specific class
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('learnMoreShippingBtn')) {
            e.preventDefault();
            openModal();
        }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
      if (e.target === shippingModal) {
        closeModal();
      }
    });
  });
'''

content = content.replace('</body>', f'<script>\n{shipping_script}\n</script>\n</body>')


with open('store/cart.html', 'w') as f:
    f.write(content)


# --- Add modal and styles to cart.js globally ---
# We inject the modal into the body and add the shipping text to the floating cart footer dynamically
with open('store/cart.js', 'r') as f:
    cart_js_content = f.read()

# Make sure we add modal styles to document if they don't exist
styles_to_inject = '''
// Inject Shipping Modal Styles
if (!document.getElementById('shipping-modal-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'shipping-modal-styles';
  styleEl.innerHTML = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 3000;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .modal-overlay.active {
      opacity: 1;
    }

    .modal-content {
      position: relative;
      width: 50%;
      max-width: 600px;
      padding: 2.5rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      transform: translateY(20px);
      transition: transform 0.3s ease;
      background: var(--card-bg, #fff);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-light, #eee);
    }

    .modal-overlay.active .modal-content {
      transform: translateY(0);
    }

    .modal-close-btn {
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--text-secondary);
      cursor: pointer;
      transition: color 0.2s;
    }

    .modal-close-btn:hover {
      color: var(--primary-color);
    }

    @media (max-width: 900px) {
      .modal-content {
        width: 90%;
        padding: 1.5rem;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

// Inject Shipping Modal HTML if it doesn't exist
if (!document.getElementById('shippingModal')) {
  const modalHtml = `
  <div id="shippingModal" class="modal-overlay" style="display: none;">
    <div class="modal-content bento-card">
      <button class="modal-close-btn" id="closeShippingModalBtn" aria-label="Close Shipping Information">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <h3 style="color: var(--primary-color); margin-bottom: 1rem; margin-top: 0;">Shipping Information</h3>
      <p style="font-size: 1rem; color: var(--text-primary); margin-bottom: 1rem;">
        All orders* should be shipped within 2 weeks, though many will be shipped earlier. Most of our products are made to order and then shipped. Items may be made and shipped in a couple of days, but this can be limited by our current volume of orders. If you ordered a product and haven’t received a shipping confirmation within 2 weeks, please let us know!
      </p>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0;">
        *Please note that we currently don’t ship outside of the United States. If you are interested in ordering one of our products over seas, let’s <a href="contact.html" style="text-decoration: underline;">get in touch</a>.
      </p>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Add event listeners for the modal globally
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('learnMoreShippingBtn')) {
        e.preventDefault();
        const shippingModal = document.getElementById('shippingModal');
        if (shippingModal) {
            shippingModal.style.display = 'flex';
            setTimeout(() => {
                shippingModal.classList.add('active');
            }, 10);
        }
    }
});

document.addEventListener('click', (e) => {
    const closeBtn = document.getElementById('closeShippingModalBtn');
    const shippingModal = document.getElementById('shippingModal');

    if (e.target === closeBtn || closeBtn?.contains(e.target)) {
        if (shippingModal) {
            shippingModal.classList.remove('active');
            setTimeout(() => {
                shippingModal.style.display = 'none';
            }, 300);
        }
    } else if (e.target === shippingModal) {
        if (shippingModal) {
            shippingModal.classList.remove('active');
            setTimeout(() => {
                shippingModal.style.display = 'none';
            }, 300);
        }
    }
});
'''

# We need to inject the shipping text into the cart-footer inside updateCartUI
# if it is not empty.
cart_js_update_footer_logic = '''
  // Inject shipping info to footer
  const cartFooter = document.querySelector('.cart-footer');
  if (cartFooter) {
    let shippingInfoEl = cartFooter.querySelector('.floating-shipping-info');
    if (!shippingInfoEl) {
      shippingInfoEl = document.createElement('div');
      shippingInfoEl.className = 'floating-shipping-info';
      shippingInfoEl.style.cssText = "font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem; max-width: 60%;";
      shippingInfoEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-truck" style="color: var(--primary-color);"></i>
            <span>Items typically ship within 2 weeks</span>
        </div>
        <button class="learnMoreShippingBtn" style="background: none; border: none; padding: 0; color: var(--secondary-color-2); text-decoration: underline; cursor: pointer; text-align: left; margin-left: 1.5rem; font-size: 0.75rem;">Learn More</button>
      `;
      // Insert before checkout button
      cartFooter.insertBefore(shippingInfoEl, document.getElementById('checkoutBtn'));

      // Ensure footer uses flexbox space-between
      cartFooter.style.display = 'flex';
      cartFooter.style.justifyContent = 'space-between';
      cartFooter.style.alignItems = 'center';
    }

    if (cart.length === 0) {
      shippingInfoEl.style.display = 'none';
    } else {
      shippingInfoEl.style.display = 'flex';
    }
  }
'''

cart_js_content = cart_js_content.replace(
    '''  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
  }
}''',
    '''  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
  }
''' + cart_js_update_footer_logic + '\n}'
)

cart_js_content += '\n\n' + styles_to_inject

with open('store/cart.js', 'w') as f:
    f.write(cart_js_content)
