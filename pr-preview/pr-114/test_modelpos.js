const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/store/about.html');
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    // We can't access model directly, but we can access train 0's parent (pivot), and its parent (model)
    const pivot = window.animationData.trains[0].pivot;
    const model = pivot.parent;
    console.log(`Model position: ${model.position.x}, ${model.position.y}, ${model.position.z}`);
  });

  await browser.close();
})();
