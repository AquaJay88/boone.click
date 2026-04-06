const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));

  await page.goto('file://' + __dirname + '/store/about.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(10000); // Wait 10 seconds for animation

  await browser.close();
})();
