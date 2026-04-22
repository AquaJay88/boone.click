const { chromium } = require('playwright');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname)));

const server = app.listen(3000, async () => {
  console.log('Server running on port 3000');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.error('BROWSER ERROR:', error));

  await page.goto('http://localhost:3000/store/about.html', { waitUntil: 'networkidle' });

  // Wait for 3d model to load
  await page.waitForTimeout(3000);

  // Get the size of the hitbox via console log evaluation
  const evalResult = await page.evaluate(() => {
    if (!window.animationData) return 'No animation data';
    const hitBox = window.animationData.interactableObjects[0];
    if (!hitBox) return 'No hitbox found';

    return {
      type: hitBox.geometry.type,
      yPos: hitBox.position.y,
      radius: hitBox.geometry.parameters.radiusTop,
      height: hitBox.geometry.parameters.height
    };
  });

  console.log('Hitbox Properties:', evalResult);

  await browser.close();
  server.close();
});
