import re

with open('store/cart.js', 'r') as f:
    content = f.read()

# 1. Update addToCart signature and logic
content = re.sub(
    r'function addToCart\(priceId, name, size, variation, displayPrice, imageUrl, isTest = false, customText = null\) \{',
    r'function addToCart(productId, priceId, name, size, variation, displayPrice, imageUrl, isTest = false, customText = null) {',
    content
)

content = content.replace(
'''    cart.push({
      id: priceId,
      name: name,
      size: size,
      color: variation, // 'color' key kept for backwards compatibility with Edge function if needed
      customText: customText,
      price: numericPrice,
      displayPrice: '$' + numericPrice.toFixed(2),
      imageUrl: imageUrl,
      quantity: 1,
      isTest: isTest
    });''',
'''    cart.push({
      productId: productId,
      id: priceId,
      name: name,
      size: size,
      color: variation, // 'color' key kept for backwards compatibility with Edge function if needed
      customText: customText,
      price: numericPrice,
      displayPrice: '$' + numericPrice.toFixed(2),
      imageUrl: imageUrl,
      quantity: 1,
      isTest: isTest
    });'''
)

# 2. Update updateCartUI
content = content.replace(
'''        itemEl.innerHTML = `
          <div class="cart-item-header">
            <div class="cart-item-title">${escapeHTML(item.name)}</div>
            <button class="remove-item-btn" onclick="removeFromCart(${index})" aria-label="Remove item">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <div class="cart-item-content">
            <img src="${thumbUrl}" alt="${item.name}" onerror="this.src=JB_LOADER_URI;" class="cart-item-img">
            <div class="cart-item-info">
              ${metaDisplay}
              <div class="cart-item-price">${item.displayPrice} x ${item.quantity}</div>
            </div>
          </div>
        `;''',
'''
        let titleHtml = escapeHTML(item.name);
        let imgHtml = `<img src="${thumbUrl}" alt="${item.name}" onerror="this.src=JB_LOADER_URI;" class="cart-item-img">`;
        if (item.productId) {
            titleHtml = `<a href="product.html?id=${item.productId}" style="color: inherit; text-decoration: none;">${escapeHTML(item.name)}</a>`;
            imgHtml = `<a href="product.html?id=${item.productId}">${imgHtml}</a>`;
        }

        itemEl.innerHTML = `
          <div class="cart-item-header">
            <div class="cart-item-title">${titleHtml}</div>
            <button class="remove-item-btn" onclick="removeFromCart(${index})" aria-label="Remove item">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <div class="cart-item-content">
            ${imgHtml}
            <div class="cart-item-info">
              ${metaDisplay}
              <div class="cart-item-price">${item.displayPrice} x ${item.quantity}</div>
            </div>
          </div>
        `;'''
)

# 3. Add Supabase fallback sync to DOMContentLoaded
sync_code = '''
  // Sync legacy cart items that are missing productId
  if (cart.some(item => !item.productId)) {
    const fetchMissingProductIds = async () => {
      let updated = false;
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        if (!item.productId && item.id) {
          try {
            const tableName = item.isTest ? 'test_product' : 'product';
            const { data, error } = await window.supabaseClient
              .from(tableName)
              .select('product_id')
              .eq('stripe_price_id', item.id)
              .single();

            if (data && data.product_id) {
              item.productId = data.product_id;
              updated = true;
            }
          } catch (e) {
            console.error('Error fetching missing product_id for cart item:', e);
          }
        }
      }

      if (updated) {
        saveCart();
        updateCartUI();
        // If on the cart page, also update its UI
        if (typeof renderCartPage === 'function') {
          renderCartPage();
        }
      }
    };

    // Only attempt to fetch if supabaseClient is available
    if (window.supabaseClient) {
      fetchMissingProductIds();
    }
  }

  // Initial UI update
'''

content = content.replace('  // Initial UI update\n', sync_code)

with open('store/cart.js', 'w') as f:
    f.write(content)
