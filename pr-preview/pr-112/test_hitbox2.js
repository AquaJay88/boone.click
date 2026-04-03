const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/store/about.html');
  await new Promise(r => setTimeout(r, 2000));

  // Sweep mouse to see if isHovering is true
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
       await page.mouse.move(i * 100, j * 100);
       await new Promise(r => setTimeout(r, 50));
       const isHovering = await page.evaluate(() => {
           // We can't access isHovering if it's not global, but we can check the Y positions of trains!
           // If they are > 0, wave is active.
           const trains = window.animationData.trains;
           let maxLift = 0;
           trains.forEach(t => {
               maxLift = Math.max(maxLift, t.mesh.position.y);
           });
           return maxLift;
       });
       if (isHovering > 0.001) { // They start slightly above 0? No, baseY = 0
           console.log(`Wave active at mouse ${i*100}, ${j*100}. Max lift: ${isHovering}`);
       }
    }
  }

  await browser.close();
})();
