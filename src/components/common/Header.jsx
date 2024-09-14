import React from "react";;
import {Link} from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    return (
        <header className="bg-gray-900 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to={"/"}>Ace Of Jewel</Link>
                </div>
                <nav className="flex space-x-4">
                    <Link className="hover:text-gray-400 transition duration-300" to={"/"}>Home</Link>
                    <Link className="hover:text-gray-400 transition duration-300" to={"/products"}>Products</Link>
                    <Link className="hover:text-gray-400 transition duration-300" to={"/cart"}>Cart</Link>
                    <Link className="hover:text-gray-400 transition duration-300" to={"/profile"}>Profile</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;