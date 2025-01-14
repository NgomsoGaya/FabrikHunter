import products from '../Components/Assets/all_products.js';

const fetchProductData = (productId) => {
  // Convert productId to a number (if necessary) because route params are strings
  const product = products.find((item) => item.id === parseInt(productId));
  if (!product) {
    console.error(`Product with ID ${productId} not found.`);
    return null;
  }
  return {
    id: product.id,
    name: product.name,
    price: product.new_price,
    category: product.category,
    image: product.image,
  };
};

export default fetchProductData
