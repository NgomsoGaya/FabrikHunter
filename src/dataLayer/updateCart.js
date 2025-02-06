import fetchProductData from "./fetchProductData";

export const updateCart = (cartItems) => {
  if (!Array.isArray(cartItems)) {
    console.error("Invalid cart items");
    return;
  }

  // Fetch full product data for each cart item
  const populatedCartItems = cartItems.map(item => {
    const product = fetchProductData(item.id);
    return product ? {
      ...item,
      price: product.price,
      name: product.name
    } : null;
  }).filter(item => item !== null);

  const cartValue = populatedCartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );

  window.digitalData.ecommerce.cart = {
    productsAdded: populatedCartItems.map(item => item.id),
    cartValue
  };

  console.log("DigitalData updated for cart:", window.digitalData.ecommerce.cart);
  return populatedCartItems; // Return populated cart items for component use
};