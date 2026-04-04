import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:8000/store/about.html")
        await page.wait_for_timeout(2000)

        mesh_info = await page.evaluate("""() => {
            const meshes = window.animationData.allSolidMeshes;
            return meshes.map((m, i) => {
                m.geometry.computeBoundingBox();
                const box = m.geometry.boundingBox;
                const min = box.min;
                const max = box.max;
                const sizeX = max.x - min.x;
                const sizeY = max.y - min.y;
                const sizeZ = max.z - min.z;
                return `Mesh ${i}: verts=${m.geometry.attributes.position.count}, size=${sizeX.toFixed(3)},${sizeY.toFixed(3)},${sizeZ.toFixed(3)}, color=${m.material.color ? m.material.color.getHexString() : 'none'}`;
            });
        }""")
        for info in mesh_info:
            print(info)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
