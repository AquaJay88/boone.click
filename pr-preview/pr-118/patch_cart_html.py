with open('store/cart.html', 'r') as f:
    content = f.read()

content = content.replace(
'''      itemEl.innerHTML = `
        <div class="cart-page-item-header">
          <div class="cart-page-item-title">${item.name}</div>
          <button class="remove-item-btn" onclick="removeFromCartPage(${index})" aria-label="Remove item">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <div class="cart-page-item-content">
          <img src="${thumbUrl}" alt="${item.name}" onerror="this.src=JB_LOADER_URI;" class="cart-page-item-img">
          <div class="cart-page-item-info">
            ${metaDisplay}
            <div class="cart-page-item-price">${item.displayPrice} x ${item.quantity}</div>
          </div>
        </div>
      `;''',
'''
      let titleHtml = item.name;
      let imgHtml = `<img src="${thumbUrl}" alt="${item.name}" onerror="this.src=JB_LOADER_URI;" class="cart-page-item-img">`;
      if (item.productId) {
          titleHtml = `<a href="product.html?id=${item.productId}" style="color: inherit; text-decoration: none;">${item.name}</a>`;
          imgHtml = `<a href="product.html?id=${item.productId}">${imgHtml}</a>`;
      }

      itemEl.innerHTML = `
        <div class="cart-page-item-header">
          <div class="cart-page-item-title">${titleHtml}</div>
          <button class="remove-item-btn" onclick="removeFromCartPage(${index})" aria-label="Remove item">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <div class="cart-page-item-content">
          ${imgHtml}
          <div class="cart-page-item-info">
            ${metaDisplay}
            <div class="cart-page-item-price">${item.displayPrice} x ${item.quantity}</div>
          </div>
        </div>
      `;'''
)

with open('store/cart.html', 'w') as f:
    f.write(content)
