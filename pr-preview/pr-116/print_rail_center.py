import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:8000/store/about.html")
        await page.wait_for_timeout(2000)

        info = await page.evaluate("""() => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.type = 'module';
                script.textContent = `
                    import * as THREE from 'three';
                    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
                    import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

                    const loader = new GLTFLoader();
                    const dracoLoader = new DRACOLoader();
                    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
                    loader.setDRACOLoader(dracoLoader);

                    loader.load('images/Train Case & Hub Animation.glb', (gltf) => {
                        const model = gltf.scene;
                        const rails = model.children[1];

                        rails.geometry.computeBoundingBox();
                        const box = rails.geometry.boundingBox;
                        const center = new THREE.Vector3();
                        box.getCenter(center);

                        // Let's get the max X/Z for radius
                        window.glbResult = \`Rails center: (\${center.x.toFixed(3)}, \${center.y.toFixed(3)}, \${center.z.toFixed(3)}), max X: \${box.max.x.toFixed(3)}, max Z: \${box.max.z.toFixed(3)}\`;
                    });
                `;
                document.head.appendChild(script);

                const checkInterval = setInterval(() => {
                    if (window.glbResult) {
                        clearInterval(checkInterval);
                        resolve(window.glbResult);
                    }
                }, 100);
            });
        }""")
        print(info)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
