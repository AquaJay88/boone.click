import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:8000/store/about.html")
        await page.wait_for_timeout(2000)

        # Load the raw GLB and print its children, using window.THREE since it's imported in about-3d.js
        info = await page.evaluate("""() => {
            return new Promise((resolve) => {
                // We need to fetch THREE from the global scope, but it's loaded as an ES module.
                // Let's attach it to window in the module if not already, or just use the global variables we exposed.
                // Alternatively, we know the raw children are in window.animationData.allSolidMeshes initially.
                // Actually, let's just inspect the original 4 meshes before we modified them, if we can.
                // But we modified them in place.

                // Let's just create a new script to load it again manually.
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
                            return \`Child \${i}: name='\${child.name}', type=\${child.type}, verts=\${child.geometry.attributes.position.count}, size=\${size.x.toFixed(3)},\${size.y.toFixed(3)},\${size.z.toFixed(3)}\`;
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
