import products from '../Components/Assets/all_products.js';

// Fetch product data from your product database/array
 const fetchProductData = (productId) => {
  const product = products.find((item) => item.id == Number(productId));
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