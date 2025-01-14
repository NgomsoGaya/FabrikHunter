import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateProductView } from '../../dataLayer/updateProductView.js';
import './ProductDisplay.css';
import star_icon from '../Assets/star.png';
import star_dull_icon from '../Assets/star-dull.png';
import fetchProductData  from '../../dataLayer/fetchProductData.js';

export const ProductDisplay = () => {
  const [product, setProduct] = useState(null); // State to store the current product
  const [isLoading, setIsLoading] = useState(true); // State for loading state
  const { productId } = useParams();

  useEffect(() => {
    const getProductData = async () => {
      try {
        setIsLoading(true);
        const productData = fetchProductData(productId);
        setProduct(productData);

        updateProductView(productData);
      } catch {
        console.error("Product not found");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      getProductData();
    }
  }, [productId]);

  // Display a loading spinner while the product data is being fetched
  if (isLoading) {
    return <div className="productdisplay">Loading...</div>;
  }

  // Handle the case where the product is not found
  if (!product) {
    return <div className="productdisplay">Product not found!</div>;
  }

  // Destructure product data for display
  const { image, name, old_price, new_price, category } = product;

  // Call the data layer update function
  updateProductView();

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={image} alt="" />
          <img src={image} alt="" />
          <img src={image} alt="" />
          <img src={image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={image} alt={name} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(16)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">R{old_price}</div>
          <div className="productdisplay-right-price-new">R{new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, ullam!
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size-options">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button>ADD TO CART</button>
        <div className="productdisplay-right-category">
          <span>Category :</span> {category}
        </div>
        <div className="productdisplay-right-category">
          <span>Tags :</span> Trending, Summer
        </div>
      </div>
    </div>
  );
};
