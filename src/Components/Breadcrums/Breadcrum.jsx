import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrum.css';
import arrow_icon from '../Assets/right-arrow.png'

const Breadcrumb = ({ product }) => {
  if (!product) {
    return (
      <div className="breadcrumb">
        <Link to="/">HOME</Link>
        <img src={arrow_icon} alt="arrow" />
        <Link to="/shop">SHOP</Link>
      </div>
    );
  }

  return (
    <div className="breadcrumb">
      <Link to="/">HOME</Link>
      <img src={arrow_icon} alt="arrow" />
      <Link to="/shop">SHOP</Link>
      <img src={arrow_icon} alt="arrow" />
      <Link to={`/shop/${product.category}`}>{product.category.toUpperCase()}</Link>
      <img src={arrow_icon} alt="arrow" />
      <span>{product.name}</span>
    </div>
  );
};

export default Breadcrumb;