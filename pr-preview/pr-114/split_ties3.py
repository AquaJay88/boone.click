from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
    page.goto("http://localhost:8080/test_split2.html")
    page.wait_for_timeout(3000)
    browser.close()
