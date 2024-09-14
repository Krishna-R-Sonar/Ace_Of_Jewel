import React, { useState } from "react";
import "./ProductDetails.css"; // Import CSS for product detail view styles and animations

const ProductDetails = ({ product }) => {
  const [zoomed, setZoomed] = useState(false);

  if (!product) return null;

  return (
    <div className="product-details-container">
      <div
        className={`product-image-wrapper ${zoomed ? "zoomed" : ""}`}
        onClick={() => setZoomed(!zoomed)}
      >
        <img
          src="{product.image}"
          alt="product.name"
          className="product-image-details"
        />
      </div>
      <h2 className="product-name-details">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price-details">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductDetails;