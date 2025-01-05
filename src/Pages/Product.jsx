import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrums/Breadcrum.jsx';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay.jsx';

export const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  console.log("productId:", productId);

  const [product, setProduct] = useState(() => null); // Proper initialization

  useEffect(() => {
    if (Array.isArray(all_product) && productId) {
      const foundProduct = all_product.find(
        (e) => e.id === parseInt(productId, 10) // Use parseInt for clarity
      );
      setProduct(foundProduct || null); // Ensure state remains consistent
    }
  }, [all_product, productId]);

  if (!product) {
    return <div>Product not found or loading... Check product ID</div>; // Handle null state gracefully
  }

  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDisplay products={product} />
    </div>
  );
};
