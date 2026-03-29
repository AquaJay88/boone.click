from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Intercept Supabase calls to return mock data for 0 sizes
    def handle_route(route):
        url = route.request.url
        if "supabase" in url:
            if "select" in url and "product_media" in url:
                route.fulfill(status=200, content_type="application/json", body='[{"image_url": "test.jpg", "display_order": 1, "is_default": true, "variation_value": "Red"}]')
            elif "select" in url and "product_id" in url:
                # 0 sizes (stripe_price_id is None/null)
                route.fulfill(status=200, content_type="application/json", body='[{"product_id": "1", "name": "Test Item", "price_display": "10.00", "stripe_price_id": null, "size_label": null, "variation_type": "Color"}]')
            else:
                route.continue_()
        else:
            route.continue_()

    page.route("**/*", handle_route)

    page.goto("http://localhost:8000/store/product.html?id=1&test=true")

    page.wait_for_selector("#productTitle:not(:has-text('Loading...'))")
    page.wait_for_timeout(2000)

    is_hidden = page.evaluate("document.getElementById('sizeGroup').style.display === 'none' || window.getComputedStyle(document.getElementById('sizeGroup')).display === 'none'")
    print(f"Size Group Hidden (0 sizes): {is_hidden}")

    size_val = page.evaluate("state.sizeVal")
    price_id = page.evaluate("state.priceId")
    print(f"State sizeVal: {size_val}")
    print(f"State priceId: {price_id}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
