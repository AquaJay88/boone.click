from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        page.on("console", lambda msg: print(f"BROWSER LOG: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        page.goto("http://127.0.0.1:8000/store/about.html", wait_until="networkidle")
        time.sleep(5)

        browser.close()

if __name__ == "__main__":
    run()
