with open('store/product.html', 'r') as f:
    content = f.read()

content = content.replace(
'''      window.addToCart(
         state.priceId,
         productName,
         state.sizeVal !== 'default' ? state.sizeVal : '',
         state.variationVal !== 'default' ? state.variationVal : '',
         state.displayPrice,
         imageUrl,
         isTestMode(),
         state.isCustomTextRequired ? state.customTextVal.trim() : null
      );''',
'''      window.addToCart(
         productData[0].product_id,
         state.priceId,
         productName,
         state.sizeVal !== 'default' ? state.sizeVal : '',
         state.variationVal !== 'default' ? state.variationVal : '',
         state.displayPrice,
         imageUrl,
         isTestMode(),
         state.isCustomTextRequired ? state.customTextVal.trim() : null
      );'''
)

with open('store/product.html', 'w') as f:
    f.write(content)
