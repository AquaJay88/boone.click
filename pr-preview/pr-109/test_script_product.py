from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000/store/product.html?id=prod_UBaEIQVFd4NWRL")
        page.wait_for_timeout(2000)
        page.screenshot(path="product_page_test.png")
        browser.close()

if __name__ == "__main__":
    main()
