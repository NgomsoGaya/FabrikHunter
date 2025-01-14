export const updateProductView = (product) => {
    if (!product || !product.id || !product.name) {
      console.error("Invalid product data:", product);
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
  