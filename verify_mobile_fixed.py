from playwright.sync_api import sync_playwright

def verify_mobile():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Mobile viewport
        context = browser.new_context(viewport={'width': 375, 'height': 812})
        page = context.new_page()
        page.goto('http://localhost:8000/john/index.html')
        page.wait_for_timeout(2000)
        page.screenshot(path='/home/jules/verification/hero_mobile_fixed.png', full_page=True)
        browser.close()

if __name__ == '__main__':
    verify_mobile()