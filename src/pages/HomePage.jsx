import React from "react";
import './HomePage.css'; // import css for styling and animations
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <main>
                <section className="hero-section">
                    <h1 className="hero-title">Welcome to Ace Of Jewel</h1>
                    <p className="hero-subtitle">Discover the latest in Jewels</p>
                </section>
                {/*add more sections as needed*/}
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;