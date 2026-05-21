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

                        const pos = train.geometry.attributes.position;
                        let s = 'First few train vertices:\\n';
                        for(let i = 0; i < 5; i++) {
                            s += \`(\${pos.getX(i).toFixed(3)}, \${pos.getY(i).toFixed(3)}, \${pos.getZ(i).toFixed(3)})\\n\`;
                        }

                        // What about hub?
                        const hub = model.children[3];
                        const hpos = hub.geometry.attributes.position;
                        s += 'First few hub vertices:\\n';
                        for(let i = 0; i < 5; i++) {
                            s += \`(\${hpos.getX(i).toFixed(3)}, \${hpos.getY(i).toFixed(3)}, \${hpos.getZ(i).toFixed(3)})\\n\`;
                        }

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
