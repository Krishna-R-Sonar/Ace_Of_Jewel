import React from "react";
import "./OrderSummary.css"; // Import CSS for typing effects and summary styles

const OrderSummary = () => {
  if (!order) return null;

  return (
    <div className="order-summary-container">
      <h2 className="order-summary-title">Order Summary</h2>
      <div className="order-summary-details">
        <p className="order-summary-text">
          Order ID: <span className="order-summary-value">{order.id}</span>
        </p>
        <p className="order-summary-text">
          Total Amount:{" "}
          <span className="order-summary-value">${order.total.toFixed(2)}</span>
        </p>
        <p className="order-summary-text">
          Status: <span className="order-summary-value">{order.status}</span>
        </p>
        <p className="order-summary-text">Items:</p>
        <ul className="order-summary-items">
          {order.items.map((item) => (
            <li key={item.id} className="order-summary-item">
              {item.name} - ${item.prive.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderSummary;
