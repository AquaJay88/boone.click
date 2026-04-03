const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/store/about.html');
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    // See where hoverPoint goes
    window.addEventListener('mousemove', () => {
       console.log('Hover point:', window.hoverPoint ? window.hoverPoint.x + "," + window.hoverPoint.z : "null");
    });
  });

  // Sweep mouse to see if hoverPoint reaches +/- 40
  await page.mouse.move(100, 100);
  await new Promise(r => setTimeout(r, 100));
  await page.mouse.move(200, 200);
  await new Promise(r => setTimeout(r, 100));
  await page.mouse.move(300, 300);
  await new Promise(r => setTimeout(r, 100));
  await page.mouse.move(400, 400);
  await new Promise(r => setTimeout(r, 100));

  await browser.close();
})();
