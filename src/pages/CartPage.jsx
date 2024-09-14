import React from 'react';
import './CartPage.css'; // Import CSS for styling and animations
import CartItem from '../components/cart/CartItem';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const CartPage = () => {
  return (
    <div className="cart-page">
      <Header />
      <main>
        <section className="cart-section">
          <h1 className="section-title">Your Cart</h1>
          {/* Render CartItems here */}
          <CartItem />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
