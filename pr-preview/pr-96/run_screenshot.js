const { chromium } = require('playwright');
const { exec } = require('child_process');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const contextMobile = await browser.newContext({ viewport: { width: 700, height: 1024 } });

  exec('python3 -m http.server 3000');

  await new Promise(resolve => setTimeout(resolve, 2000));

  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto('http://localhost:3000/store/index.html', { waitUntil: 'networkidle' });
  await pageMobile.screenshot({ path: 'mobile.png', fullPage: false });

  await browser.close();
  exec('kill $(lsof -t -i :3000) 2>/dev/null || true');
})();
