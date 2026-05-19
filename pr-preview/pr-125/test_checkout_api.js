const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  // Intercept the API request to see what it's sending and what the response is
  page.on('request', request => {
      if (request.url().includes('create-checkout-test')) {
          console.log('REQUEST DATA:', request.postData());
      }
  });

  page.on('response', async response => {
      if (response.url().includes('create-checkout-test')) {
          console.log('RESPONSE STATUS:', response.status());
          try {
              const body = await response.text();
              console.log('RESPONSE BODY:', body);
          } catch (e) {
              console.log('Could not read response body', e);
          }
      }
  });

  // We can just populate the localStorage directly and go to checkout page
  await page.goto('http://127.0.0.1:8080/store/index.html');

  await page.evaluate(() => {
    localStorage.setItem('boone_cart', JSON.stringify([
      {
        id: 'price_1QGBu2BA6S4OMIQxDqT431vB', // test data item. let's just use empty so it triggers a checkout with NO items, OR we just let it fail. Wait. The problem was that price_1QGBu2BA6S4OMIQxDqT431vB was not in Stripe.
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

  await browser.close();
})();
