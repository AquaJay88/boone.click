const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err));

  // Intercept requests and log failures
  page.on('response', response => {
      if (response.status() >= 400 && !response.url().includes('loader.gif')) {
          console.log(`RESPONSE FAILED: ${response.status()} ${response.url()}`);
      }
  });

  // We can just populate the localStorage directly and go to checkout page
  await page.goto('http://127.0.0.1:8080/store/index.html');

  await page.evaluate(() => {
    localStorage.setItem('boone_cart', JSON.stringify([
      {
        id: 'price_1QGBu2BA6S4OMIQxDqT431vB', // test data item
        productId: '3',
        name: 'Test Product',
        price: 10.00,
        displayPrice: '$10.00',
        quantity: 1,
        imageUrl: '../images/products/product-3.jpg',
        isTest: true
      }
    ]));
  });

  // Now go to checkout
  await page.goto('http://127.0.0.1:8080/store/checkout.html', { waitUntil: 'load', timeout: 5000 }).catch(e => console.log('Timeout caught', e));

  // wait another 5 seconds for stripe to load
  await page.waitForTimeout(5000);

  await page.screenshot({ path: 'checkout_fixed7.png', fullPage: true });

  const content = await page.content();
  console.log(content);

  await browser.close();
})();
