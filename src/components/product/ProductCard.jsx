import React from "react";
import './ProductCard.css'; // import css for 3d animations and styling

const PrdouctCard = ({product, onClick}) => {
    return (
        <div className="product-card" onClick={() => onClick(product.id)}>
            <div className="product-card-inner">
                <div className="product-card-front">
                    <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-cart-back">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default PrdouctCard;