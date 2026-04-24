import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        page.on("console", lambda msg: print(msg.text) if "TEST" in msg.text else None)
        await page.goto("http://localhost:8080/store/about.html")
        await page.wait_for_timeout(5000)

        await page.evaluate("""
            () => {
                const { ties } = window.animationData;
                ties.slice(0, 3).forEach((cluster, i) => {
                    const firstBody = cluster[0];
                    firstBody.updateMatrixWorld(true);
                    const e = firstBody.matrixWorld.elements;
                    const wx = e[12];
                    const wz = e[14];
                    console.log(`TEST TIE ${i} matrixWorld elements pos: x=${wx.toFixed(2)}, z=${wz.toFixed(2)}`);

                    const center = new window.THREE.Vector3();
                    firstBody.getWorldPosition(center);
                    console.log(`TEST TIE ${i} getWorldPosition: x=${center.x.toFixed(2)}, z=${center.z.toFixed(2)}`);
                });
            }
        """)
        await browser.close()

asyncio.run(main())
