import React from "react";
import AppRoutes from './routes/AppRoutes.js';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import './App.css';

const App = () => {
  return(
    <div className="App">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
};