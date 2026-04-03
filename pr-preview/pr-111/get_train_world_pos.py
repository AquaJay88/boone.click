import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:8000/store/about.html")
        await page.wait_for_timeout(2000)

        info = await page.evaluate("""() => {
            if (!window.animationData || !window.animationData.trains) return ['No trains'];
            // Since THREE is not globally available in this context, just use the built-in properties
            // or we could grab THREE from the first mesh if we had a reference...
            // Wait, we can just look at `m.geometry.boundingBox` properties directly
            return window.animationData.trains.map((t, i) => {
                const m = t.mesh;

                m.geometry.computeBoundingBox();
                const min = m.geometry.boundingBox.min;
                const max = m.geometry.boundingBox.max;
                const cx = (min.x + max.x) / 2;
                const cy = (min.y + max.y) / 2;
                const cz = (min.z + max.z) / 2;

                return `Train ${i}: color=${m.material.color.getHexString()} local_bb_center=(${cx.toFixed(3)}, ${cy.toFixed(3)}, ${cz.toFixed(3)})`;
            });
        }""")
        for line in info:
            print(line)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
