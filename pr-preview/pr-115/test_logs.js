const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  // Expose a function to evaluate the model data
  await page.goto('http://localhost:3000/store/about.html');
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    if (window.animationData) {
      const train = window.animationData.trains[0];
      console.log('Train localCenter:', train.localCenter.x, train.localCenter.y, train.localCenter.z);
      console.log('Train position:', train.mesh.position.x, train.mesh.position.y, train.mesh.position.z);
    }
  });

  await browser.close();
})();
