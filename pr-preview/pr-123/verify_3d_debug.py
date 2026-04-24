import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:8000/store/about.html")
        await page.wait_for_timeout(4000)

        # Extract train colors and positions to verify
        trains_info = await page.evaluate("""() => {
            if (!window.animationData || !window.animationData.trains) return 'No trains found';
            return window.animationData.trains.map((t, i) => {
                const color = t.mesh.material.color.getHexString();
                return `Train ${i}: color=${color}`;
            });
        }""")
        print("Trains info:", trains_info)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
