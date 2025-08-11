import products from '../Components/Assets/all_products.js';

// Fetch product data from your product database/array
const fetchProductData = (productId) => {
    // Ensure productId is correctly formatted
    const numericProductId = Number(productId);

    // Validate productId
    if (!numericProductId || isNaN(numericProductId)) {
        console.error(`Invalid product ID: ${productId}`);
        return null;
    }

    // Find the product by ID
    const product = products.find((item) => item.id === numericProductId);

    // Handle not found case
    if (!product) {
        console.error(`Product with ID ${numericProductId} not found.`);
        return null;
    }

    // Return product details
    return {
        id: product.id,
        name: product.name,
        price: product.new_price,
        category: product.category,
        image: product.image,
    };
};

export default fetchProductData;
