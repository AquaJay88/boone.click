const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.text().includes('TRAIN')) {
      console.log(msg.text());
    }
  });

  await page.goto('http://localhost:8080/store/about.html');
  await page.waitForTimeout(3000); // wait for 3d load

  await page.evaluate(() => {
    if (!window.animationData) return;
    const { trains } = window.animationData;
    trains.forEach((t, i) => {
      const pos = new THREE.Vector3();
      t.mesh.getWorldPosition(pos);
      console.log(`TRAIN ${i} getWorldPosition: x=${pos.x.toFixed(2)}, y=${pos.y.toFixed(2)}, z=${pos.z.toFixed(2)}`);

      t.mesh.geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      t.mesh.geometry.boundingBox.getCenter(center);
      // center inside local space:
      console.log(`TRAIN ${i} geometry center: x=${center.x.toFixed(4)}, y=${center.y.toFixed(4)}, z=${center.z.toFixed(4)}`);

      // Transform center to world space
      t.mesh.localToWorld(center);
      console.log(`TRAIN ${i} actual world center: x=${center.x.toFixed(2)}, y=${center.y.toFixed(2)}, z=${center.z.toFixed(2)}`);
    });
  });

  await browser.close();
})();
