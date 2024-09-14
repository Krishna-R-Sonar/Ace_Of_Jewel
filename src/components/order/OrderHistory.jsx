import React, { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary.jsx";
import "./OrderHistory.css"; // Import CSS for order history styles and animations

const OrderHistory = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  useEffect(() => {
    if (orders.length > 0) {
      setSelectedOrder(orders[0]);
    }
  }, [orders]);

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
      <div className="order-history-list">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`order-history-item ${
              selectedOrder && selectedOrder.id === order.id ? "active" : ""
            }`}
            onClick={() => handleOrderClick(order)}
          >
            <p className="order-history-item-text">Order ID: {order.id}</p>
            <p className="order-history-item-text">
              Total: ${order.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      {selectedOrder && <OrderSummary order={selectedOrder} />}
    </div>
  );
};

export default OrderHistory;