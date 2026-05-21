const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  page.on('response', async response => {
      if (response.url().includes('create-checkout-test') || response.url().includes('create-checkout')) {
          console.log('RESPONSE STATUS:', response.status());
          try {
              const body = await response.text();
              console.log('RESPONSE BODY:', body);
          } catch (e) {
              console.log('Could not read response body', e);
          }
      }
  });

  // Go to store index with test mode
  await page.goto('http://127.0.0.1:8080/store/index.html?test=true');

  // Wait for products to load
  await page.waitForSelector('.product-card a', { timeout: 10000 });

  // Click the first product
  await page.click('.product-card a:first-child');

  // Wait for product page to load
  await page.waitForSelector('#add-to-cart-btn', { timeout: 10000 });

  // Add to cart
  await page.click('#add-to-cart-btn');

  // Wait for cart notification or just wait a bit
  await page.waitForTimeout(1000);

  // Go to checkout
  await page.goto('http://127.0.0.1:8080/store/checkout.html', { waitUntil: 'load', timeout: 5000 }).catch(e => console.log('Timeout caught', e));

  // wait another 5 seconds for stripe to load
  await page.waitForTimeout(5000);

  await page.screenshot({ path: 'checkout_real_data.png', fullPage: true });

  await browser.close();
})();
