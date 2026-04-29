import re

with open('store/index.html', 'r') as f:
    content = f.read()

fetch_reviews_code = """
      // Fetch reviews from Supabase
      async function fetchReviews() {
        const { data: reviews, error: reviewsError } = await window.supabaseClient
          .from('reviews')
          .select('*')
          .eq('home_page', true);

        if (reviewsError) {
          console.error('Error fetching reviews:', reviewsError);
          return [];
        }
        return reviews;
      }
"""

content = content.replace('async function fetchProducts() {', fetch_reviews_code + '\n      async function fetchProducts() {')

with open('store/index.html', 'w') as f:
    f.write(content)
