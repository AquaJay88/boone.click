const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/store/about.html');
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    const THREE = window.THREE; // if available, or just use the math we know
    const trains = window.animationData.trains;
    trains.forEach((t, i) => {
      const pos = t.localCenter.clone();
      t.mesh.localToWorld(pos);
      console.log(`Train ${i} world pos:`, pos.x, pos.y, pos.z);
    });

    // Also log the model bounding box center to see where "center of screen" is
    console.log("Cylinder position:", window.animationData.interactableObjects[0].position.y);
  });

  await browser.close();
})();
