// products.js

// This file serves as your central repository for product information.
// You can update this file when you add new products or change prices on Stripe.

const PRODUCTS = {
  // Card Holder Product IDs
  'price_1TDD4KBA6S4OMIQxlwcdg1TE': {
    id: 'price_1TDD4KBA6S4OMIQxlwcdg1TE',
    name: 'Premium Card Holder',
    size: '19mm',
    price: 15.00,
    displayPrice: '$15.00'
  },
  'price_1TDDBgBA6S4OMIQxBELX2uYT': {
    id: 'price_1TDDBgBA6S4OMIQxBELX2uYT',
    name: 'Premium Card Holder',
    size: '25mm',
    price: 15.00,
    displayPrice: '$15.00'
  },
  'price_1TDDCZBA6S4OMIQxHyH3GX9u': {
    id: 'price_1TDDCZBA6S4OMIQxHyH3GX9u',
    name: 'Premium Card Holder',
    size: '35mm',
    price: 15.00,
    displayPrice: '$15.00'
  },
  'price_1TDDD7BA6S4OMIQxJX8gUESg': {
    id: 'price_1TDDD7BA6S4OMIQxJX8gUESg',
    name: 'Premium Card Holder',
    size: '41mm',
    price: 15.00,
    displayPrice: '$15.00'
  },
  'price_1TDDDdBA6S4OMIQxE23U85qe': {
    id: 'price_1TDDDdBA6S4OMIQxE23U85qe',
    name: 'Premium Card Holder',
    size: '53.5mm',
    price: 15.00,
    displayPrice: '$15.00'
  },
  // Test Product
  'price_1TDm1NBA6S4OMIQxtM8EDvxS': {
    id: 'price_1TDm1NBA6S4OMIQxtM8EDvxS',
    name: 'Test Product',
    size: 'Variant A',
    price: 5.00,
    displayPrice: '$5.00'
  },
  'price_1TDm1NBA6S4OMIQxPzx9uCeT': {
    id: 'price_1TDm1NBA6S4OMIQxPzx9uCeT',
    name: 'Test Product',
    size: 'Variant B',
    price: 8.00,
    displayPrice: '$8.00'
  }
};

const CATALOG = [
  {
    id: 'premium_card_holder',
    name: 'Premium Card Holder',
    category: 'Games',
    image: 'https://boone.click/images/card_holders/ch_35_black.jpeg',
    url: 'card_holder/index.html',
    displayPrice: '$15.00'
  }
];

// If using ES modules
// export default PRODUCTS;
