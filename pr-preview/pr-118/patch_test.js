const fs = require('fs');
const content = fs.readFileSync('store/index.html', 'utf8');
if (content.includes('<div class="review-product">${review.product_name}</div>') &&
    content.includes('<div class="review-message">"${review.message}" – ${review.reviewers_name}</div>') &&
    content.includes('<div class="review-stars">${starsHtml}</div>')) {
  console.log('Success: Layout modified correctly');
} else {
  console.log('Failed: Layout not found');
}
