import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-10">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Ace Of Jewel. All Rights Reserved.</p>
                <div className="social-icons flex justify-center space-x-4 mt-2">
                    <a href="https://facebook.com" className="hover:text-blue-500 transition duration-300">Facebook</a>
                    <a href="https://twitter.com" className="hover:text-blue-400 transition duration-300">Twitter</a>
                    <a href="https://instagram.com" className="hover:text-pink-500 transition duration-300">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;