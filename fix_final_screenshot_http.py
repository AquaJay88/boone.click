from playwright.sync_api import sync_playwright
import time
import http.server
import socketserver
import threading
import os

PORT = 8000
DIRECTORY = "/app"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

# Start server in background thread
server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
time.sleep(1) # wait for server to start

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Log console messages to help debug
        page.on("console", lambda msg: print(f"BROWSER LOG: {msg.text}"))

        # Navigate to the local server
        page.goto("http://127.0.0.1:8000/store/about.html", wait_until="networkidle")

        # Wait for the model to load and the 2.5s GSAP staggered crossfade to finish
        print("Waiting for GSAP animations...")
        time.sleep(10)

        page.screenshot(path="/home/jules/verification/about_solid_final_http_v2.png", full_page=True)
        print("Screenshot saved to /home/jules/verification/about_solid_final_http_v2.png")
        browser.close()

if __name__ == "__main__":
    run()
