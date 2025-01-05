import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

export const Item = (props) => {
  const { id, image, name, new_price = 0, old_price = 0 } = props;

  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        <img src={image} alt={name || 'Product'} />
      </Link>
      <p>{name || 'Unnamed Product'}</p>
      <div className="item-prices">
        <div className="item-price-new">R{new_price}</div>
        <div className="item-price-old">R{old_price}</div>
      </div>
    </div>
  );
};
