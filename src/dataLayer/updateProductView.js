export const updateProductView = (product) => {
    // Add detailed logging to see what's being received
   // console.log("Received product data:", product);
  
    if (!product) {
      //console.error("Product is undefined or null");
      return;
    }
  
    if (!product.id) {
      //console.error("Missing product ID");
      return;
    }
  
    if (!product.name) {
      //console.error("Missing product name");
      return;
    }
  
    window.digitalData.product = [
      {
        productInfo: {
          productID: product.id,
          productName: product.name,
          category: product.category,
          price: product.price,
          currency: product.currency || "USD",
          availability: product.availability || "in stock",
        },
      },
    ];
  
    console.log("DigitalData updated for product view:", window.digitalData.product);
  };