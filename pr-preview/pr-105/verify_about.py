from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 800, 'height': 800})
    page.goto('http://localhost:8000/store/about.html')
    # wait a bit for fonts/layout
    page.wait_for_timeout(1000)
    page.screenshot(path='about_mobile.png')
    browser.close()
