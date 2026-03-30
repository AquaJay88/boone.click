import subprocess
import time
from playwright.sync_api import sync_playwright

# Start python http server
server = subprocess.Popen(["python3", "-m", "http.server", "8000"])

# Wait for server to start
time.sleep(2)

try:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        page.on("console", lambda msg: print(f"BROWSER LOG: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))

        page.goto("http://localhost:8000/store/about.html")
        page.wait_for_timeout(10000)

        page.screenshot(path="/home/jules/verification/about_solid_final_http.png", full_page=True)
finally:
    server.terminate()
