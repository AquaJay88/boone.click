const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/store/about.html');

  // Wait for 3D model to load
  await new Promise(r => setTimeout(r, 2000));

  // Try many different mouse positions to find the hit box
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
       await page.mouse.move(i * 50, j * 50);
       await new Promise(r => setTimeout(r, 50));
       const isHovering = await page.evaluate(() => window.isHovering !== undefined ? window.isHovering : false);
       if (isHovering) {
         console.log(`Hit at ${i*50}, ${j*50}`);
       }
    }
  }
  console.log('Done scanning.');

  await browser.close();
})();
