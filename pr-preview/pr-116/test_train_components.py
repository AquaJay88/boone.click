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

                        const geom = train.geometry;
                        const numVerts = geom.attributes.position.count;
                        const indices = geom.index.array;

                        const adj = new Array(numVerts).fill(null).map(() => []);
                        for(let i=0; i<indices.length; i+=3) {
                            const a = indices[i], b = indices[i+1], c = indices[i+2];
                            adj[a].push(b, c); adj[b].push(a, c); adj[c].push(a, b);
                        }

                        const visited = new Uint8Array(numVerts);
                        let compCount = 0;
                        for(let i=0; i<numVerts; i++) {
                            if(!visited[i]) {
                                compCount++;
                                const q = [i];
                                visited[i] = 1;
                                while(q.length > 0) {
                                    const curr = q.pop();
                                    const neighbors = adj[curr];
                                    for(let j=0; j<neighbors.length; j++) {
                                        const n = neighbors[j];
                                        if(!visited[n]) {
                                            visited[n] = 1;
                                            q.push(n);
                                        }
                                    }
                                }
                            }
                        }

                        window.glbResult = \`Train mesh has \${compCount} connected components, \${numVerts} vertices\`;
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
