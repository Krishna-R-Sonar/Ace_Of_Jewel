import React from 'react';
import './CheckoutPage.css'; // Import CSS for styling and animations
import OrderSummary from '../components/order/OrderSummary.jsx';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <Header />
      <main>
        <section className="checkout-section">
          <h1 className="section-title">Checkout</h1>
          <OrderSummary />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
