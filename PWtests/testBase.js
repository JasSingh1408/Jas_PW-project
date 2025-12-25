// creating fixture help to run the tests with extra features by extending the test behaviour.(extending default behaviour).

const { test } = require('playwright/test');

exports.customtest = test.extend({
  testDataForOrder: async ({}, use) => {
    await use({
      username: "jassingh@gmail.com",
      password: "Rahul@123",
      productName: "ZARA COAT 3"
    });
  }
});
