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
                        const result = model.children.map((child, i) => {
                            child.geometry.computeBoundingBox();
                            const box = child.geometry.boundingBox;
                            const size = new THREE.Vector3();
                            box.getSize(size);
                            return \`Child \${i}: name='\${child.name}', verts=\${child.geometry.attributes.position.count}, size=\${size.x.toFixed(3)},\${size.y.toFixed(3)},\${size.z.toFixed(3)}\`;
                        });
                        window.glbResult = result;
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
        for line in info:
            print(line)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
