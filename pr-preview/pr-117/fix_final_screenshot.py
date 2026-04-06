import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:8000/store/about.html")
        await page.wait_for_timeout(10000)

        await page.screenshot(path="/home/jules/verification/about_solid_final_10s.png", full_page=True)
        print("Screenshot saved to /home/jules/verification/about_solid_final_10s.png")

        await browser.close()

if __name__ == "__main__":
    import time
    start = time.time()
    asyncio.run(main())
    print("Took", time.time() - start)
