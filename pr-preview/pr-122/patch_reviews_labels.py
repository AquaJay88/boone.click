with open('store/index.html', 'r') as f:
    content = f.read()

old_string = """        reviewContent.innerHTML = `
          <div class="review-stars">${starsHtml}</div>
          <div class="review-message">"${review.message}"</div>
          <div class="review-author">${review.reviewers_name}</div>
          <div class="review-product">${review.product_name}</div>
        `;"""

new_string = """        reviewContent.innerHTML = `
          <div class="review-stars">${starsHtml}</div>
          <div class="review-message">"${review.message}"</div>
          <div class="review-author">Name: ${review.reviewers_name}</div>
          <div class="review-product">Product: ${review.product_name}</div>
        `;"""

content = content.replace(old_string, new_string)

with open('store/index.html', 'w') as f:
    f.write(content)
