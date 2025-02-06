export const updateProductView = (productId) => {
  const product = fetchProductData(productId);
  
  if (!product) {
    console.error("Could not fetch product data");
    return;
  }

  // Update current product data
  window.digitalData.product = [{
    productInfo: {
      productID: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      currency: "USD", // Default currency
      availability: "in stock" // Default availability
    }
  }];

  // Update user behavior
  if (!window.digitalData.user.behavior.viewedProducts.includes(product.id)) {
    window.digitalData.user.behavior.viewedProducts.push(product.id);
  }

  // Update most viewed product
  const productViews = window.digitalData.user.behavior.viewedProducts.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});
  
  const mostViewedProductId = Object.entries(productViews).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0];
  
  window.digitalData.user.mostViewed.product = mostViewedProductId;

  console.log("DigitalData updated for product view:", window.digitalData);
  return product; // Return product data for component use
};