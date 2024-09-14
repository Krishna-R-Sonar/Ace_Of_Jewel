import React from "react";
import "./CartItem.css"; // Import CSS for animations and styling

const CartItem = ({ item, onRemove }) => {
  if (!item) return null;

  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove(item.id);
    }
  };

  return (
    <div className="cart-item-container">
      <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
        <p className="cart-item-quantity">Quantity: {item.quantity}</p>
      </div>
      <button className="cart-item-remove" onClick={handleRemoveClick}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
