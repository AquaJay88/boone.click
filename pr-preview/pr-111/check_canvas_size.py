from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8080/store/about.html")
        page.wait_for_timeout(3000)

        box = page.locator("#hero-canvas").bounding_box()
        print(f"Canvas Box: {box}")

        browser.close()

if __name__ == "__main__":
    run()
