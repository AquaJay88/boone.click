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
            return window.animationData.trains.map((t, i) => {
                const p = t.pivot.position;
                const r = t.pivot.rotation;
                const m = t.mesh.position;
                return `Train ${i}: pivot.pos=(${p.x.toFixed(3)}, ${p.y.toFixed(3)}, ${p.z.toFixed(3)}), pivot.rot.y=${r.y.toFixed(3)}, mesh.pos=(${m.x.toFixed(3)}, ${m.y.toFixed(3)}, ${m.z.toFixed(3)})`;
            });
        }""")
        for line in info:
            print(line)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
