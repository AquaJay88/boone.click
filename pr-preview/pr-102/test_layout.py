from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://127.0.0.1:8000/store/product.html?id=1')
        page.wait_for_timeout(2000)

        # Override with mock content if empty
        page.evaluate("""
            const content = document.getElementById('productPageContent');
            if (content.innerHTML.includes('Product not found')) {
                content.innerHTML = `
                  <div class="product-images col-span-6">
                    <div class="main-image-container bento-card" style="position: relative;">
                      <img id="mainProductImage" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PC9zdmc+" alt="Product Image">
                    </div>
                    <div class="carousel-container" id="carouselContainer">
                      <div class="carousel-track" id="carouselTrack">
                        <div class="carousel-item active"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2NjYyIvPjwvc3Zn+"></div>
                        <div class="carousel-item"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZCIvPjwvc3Zn+"></div>
                      </div>
                    </div>
                  </div>
                  <div class="product-details col-span-6 bento-card">
                    <h1 class="product-title" id="productTitle">Test Product</h1>
                    <div class="product-price" id="priceDisplay">$99.99</div>
                  </div>
                `;
            }
        """)

        page.screenshot(path='screenshot5.png')
        browser.close()

if __name__ == '__main__':
    run()
