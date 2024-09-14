import React, {useState} from "react";
import './Sidebat.css';

const Sidebar = () => {
    const[isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="p-4 bg-gray-900 text-white hover:bg-gray-700" onClick={toggleSidebar}>
                Menu
            </button>
            <div className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <ul className="p-4">
                    <li className="hover:transfrom hover:scale-105 transition duration-300">
                        <a href="/">Home</a>
                    </li>
                    <li className="hover:transfrom hover:scale-105 transition duration-300">
                        <a href="/products">Products</a>
                    </li>
                    <li className="hover:transfrom hover:scale-105 transition duration-300">
                        <a href="/cart">Cart</a>
                    </li>
                    <li className="hover:transfrom hover:scale-105 transition duration-300">
                        <a href="/profile">Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;