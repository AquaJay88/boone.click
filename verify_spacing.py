import sys
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 1000})
    page.goto("http://localhost:8000/john/index.html")
    page.evaluate("window.scrollTo(0, 500)")
    page.wait_for_timeout(1000)
    page.screenshot(path="after_spacing_fix.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
