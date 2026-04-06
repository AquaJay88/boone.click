with open('store/index.html', 'r') as f:
    content = f.read()

reviews_html = """
    </div>

    <!-- Reviews Component -->
    <div id="reviewsContainer" class="bento-card" style="margin-top: 2rem; display: none; padding: 2rem; position: relative;">
      <h2 style="text-align: center; margin-bottom: 1.5rem; color: var(--text-primary);">What people are saying</h2>
      <div id="reviewContent" style="min-height: 120px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
        <!-- Review details injected here -->
      </div>
      <div id="reviewDots" style="display: flex; justify-content: center; margin-top: 1.5rem; gap: 0.5rem;">
        <!-- Dots injected here -->
      </div>
    </div>
"""

content = content.replace('    </div>\n\n  </div>\n\n  <footer', reviews_html + '\n  </div>\n\n  <footer')

with open('store/index.html', 'w') as f:
    f.write(content)
