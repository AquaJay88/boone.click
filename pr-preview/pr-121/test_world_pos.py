import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        page.on("console", lambda msg: print(msg.text) if "TIE" in msg.text else None)

        await page.goto("http://localhost:8080/store/about.html")
        await page.wait_for_timeout(5000)

        await page.evaluate("""
            () => {
                if (!window.animationData) { return; }
                const { ties } = window.animationData;
                ties.slice(0, 3).forEach((cluster, i) => {
                    const firstBody = cluster[0];
                    firstBody.updateMatrixWorld(true);
                    const e = firstBody.matrixWorld.elements;
                    console.log(`TIE ${i} matrixWorld pos: x=${e[12].toFixed(2)}, y=${e[13].toFixed(2)}, z=${e[14].toFixed(2)}`);
                });
            }
        """)
        await browser.close()

asyncio.run(main())
