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
                const { trains } = window.animationData;

                // simulate hover logic in real time
                const hoverPoint = { x: 40, z: -10 };

                trains.forEach((t, i) => {
                    const pos = t.localCenter.clone();
                    t.mesh.localToWorld(pos);

                    const dx = pos.x - hoverPoint.x;
                    const dz = pos.z - hoverPoint.z;
                    const dist = Math.sqrt(dx*dx + dz*dz);
                    console.log(`TEST TRAIN ${i} dist to hover: ${dist.toFixed(2)}`);
                });
            }
        """)
        await browser.close()

asyncio.run(main())
