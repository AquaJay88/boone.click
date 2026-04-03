const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/store/about.html');

  // Wait for 3D model to load
  await new Promise(r => setTimeout(r, 2000));

  // Simulate mouse moves
  await page.mouse.move(200, 200);
  await new Promise(r => setTimeout(r, 100));
  await page.mouse.move(400, 400);
  await new Promise(r => setTimeout(r, 100));

  // Evaluate state
  const isHovering = await page.evaluate(() => window.isHovering !== undefined ? window.isHovering : false);
  console.log('Is Hovering:', isHovering);

  await browser.close();
})();
