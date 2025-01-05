import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star.png'
import star_dull_icon from '../Assets/star-dull.png'
//import products from '../Assets/all_products'

export const ProductDisplay = ( {products} ) => {
  // Add early return with loading state if product is null
  if (!products) {
    return <div className="productdisplay">Loading...</div>;
  }

  // If we have a product, destructure the needed properties
  const { image, name, old_price, new_price} = products;

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={image} alt="" />
          <img src={image} alt="" />
          <img src={image} alt="" />
          <img src={image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={image} alt={name} />
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
            <div className="productdisplay-right-price-old">
                R{old_price}
            </div>
            <div className="productdisplay-right-price-new">
                R{new_price}
            </div>
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
            <div className="productdisplay-right-category"><span>Category :</span> Women, T-Shirt</div>
            <div className="productdisplay-right-category"><span>Tags :</span> Trending, Summer</div>
      </div>
    </div>
  )
}