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
                        const train = model.children[2];

                        let s = '';
                        const pos = train.geometry.attributes.position;
                        s += 'Train First few vertices:\\n';
                        for(let i = 0; i < 5; i++) {
                            s += \`(\${pos.getX(i).toFixed(5)}, \${pos.getY(i).toFixed(5)}, \${pos.getZ(i).toFixed(5)})\\n\`;
                        }

                        // Let's also get the train's min and max
                        train.geometry.computeBoundingBox();
                        const b = train.geometry.boundingBox;
                        s += \`Train box: min=(\${b.min.x.toFixed(5)}, \${b.min.y.toFixed(5)}, \${b.min.z.toFixed(5)}), max=(\${b.max.x.toFixed(5)}, \${b.max.y.toFixed(5)}, \${b.max.z.toFixed(5)})\\n\`;

                        window.glbResult = s;
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
