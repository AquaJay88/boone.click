from playwright.sync_api import sync_playwright

def verify_border():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000/store/product.html?id=1")
        page.wait_for_selector("#mainProductImage")
        # Ensure we wait a bit for SVG animations to settle
        page.wait_for_timeout(2000)
        page.screenshot(path="border_screenshot.png")
        print("Screenshot saved to border_screenshot.png")
        browser.close()

if __name__ == "__main__":
    verify_border()
