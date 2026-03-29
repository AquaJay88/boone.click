with open('store/index.html', 'r') as f:
    content = f.read()

js_logic = """
      // Reviews Logic
      let reviewsData = [];
      let currentReviewIndex = 0;
      let reviewInterval;
      let reviewTimeout;

      async function initReviews() {
        reviewsData = await fetchReviews();
        const reviewsContainer = document.getElementById('reviewsContainer');
        const reviewContent = document.getElementById('reviewContent');
        const reviewDots = document.getElementById('reviewDots');

        if (!reviewsData || reviewsData.length === 0) {
          reviewsContainer.style.display = 'none';
          return;
        }

        reviewsContainer.style.display = 'block';

        // Create dots
        reviewDots.innerHTML = '';
        reviewsData.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('review-dot');
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', () => {
            selectReview(index);
          });
          reviewDots.appendChild(dot);
        });

        renderReview(0);
        startReviewInterval();
      }

      function renderReview(index) {
        if (!reviewsData[index]) return;
        const review = reviewsData[index];
        const reviewContent = document.getElementById('reviewContent');
        const reviewDots = document.getElementById('reviewDots');

        // Stars HTML
        let starsHtml = '';
        const starCount = parseInt(review.stars) || 5;
        for (let i = 0; i < 5; i++) {
          if (i < starCount) {
            starsHtml += '<i class="fa-solid fa-star"></i>';
          } else {
            starsHtml += '<i class="fa-regular fa-star"></i>';
          }
        }

        reviewContent.innerHTML = `
          <div class="review-stars">${starsHtml}</div>
          <div class="review-message">"${review.message}"</div>
          <div class="review-author">${review.reviewers_name}</div>
          <div class="review-product">${review.product_name}</div>
        `;

        // Update dots
        Array.from(reviewDots.children).forEach((dot, idx) => {
          if (idx === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }

      function startReviewInterval() {
        clearInterval(reviewInterval);
        reviewInterval = setInterval(() => {
          currentReviewIndex = (currentReviewIndex + 1) % reviewsData.length;
          renderReview(currentReviewIndex);
        }, 15000); // 15 seconds
      }

      function selectReview(index) {
        currentReviewIndex = index;
        renderReview(currentReviewIndex);

        // Pause and restart interval
        clearInterval(reviewInterval);
        clearTimeout(reviewTimeout);
        reviewTimeout = setTimeout(() => {
          startReviewInterval();
        }, 30000); // 30 seconds pause on interaction
      }
"""

content = content.replace('      // Initial Render', js_logic + '\n      // Initial Render')
content = content.replace('      updateDisplay();', '      updateDisplay();\n      initReviews();')

with open('store/index.html', 'w') as f:
    f.write(content)
