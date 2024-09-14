import React from 'react';
import './ProductPage.css'; // Import CSS for styling and animations
import ProductList from '../components/product/ProductList';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const ProductPage = () => {
  return (
    <div className="product-page">
      <Header />
      <main>
        <section className="product-section">
          <h1 className="section-title">Our Products</h1>
          <ProductList />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
