import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

export const Item = ({ id, image, name, new_price = 0, old_price = 0 }) => {
  const numericId = Number(id); // Ensure ID is always a number

  return (
    <div className="item">
      <Link to={`/product/${numericId}`}>
        <img src={image} alt={name || "Product"} />
      </Link>
      <p>{name || "Unnamed Product"}</p>
      <div className="item-prices">
        <div className="item-price-new">R{new_price}</div>
        <div className="item-price-old">R{old_price}</div>
      </div>
    </div>
  );
};
