import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star.png'
import star_dull_icon from '../Assets/star-dull.png'

export const ProductDisplay = ({ product }) => {
  // Add early return with loading state if product is null
  if (!product) {
    return <div className="productdisplay">Loading...</div>;
  }

  // If we have a product, destructure the needed properties
  const { image, name } = product;

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
          <img className='productdisplay-main-img' src={image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(16)</p>
        </div>
      </div>
    </div>
  )
}