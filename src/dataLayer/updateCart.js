export const updateCart = (cart) => {
    if (!cart || !Array.isArray(cart.items)) {
      console.error("Invalid cart data:", cart);
      return;
    }
  
    window.digitalData.cart = {
      productsInCart: cart.items.length,
      cartValue: cart.items.reduce((total, item) => total + item.price * item.quantity, 0),
      cartItems: cart.items.map((item) => ({
        productID: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  
    console.log("DigitalData updated for cart:", window.digitalData.cart);
  };
  