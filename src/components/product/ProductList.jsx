import React, {useState} from "react";
import ProductCard from './ProductCard.jsx';
import '.ProductList.css'; // import css for product listing styles and animations

const ProductList = ({products, onProductClick}) => {
    const [filter, setFilter] = useState('');

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="product-list-container">
            <input type="text" 
            placeholder="Search products..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-bar"
            />
            <div className="product-list">
                {filteredProducts.map(product => (<ProductCard 
                key={product.id}
                product={product}
                onClick={onProductClick}
                />))}
            </div>
        </div>
    );
};

export default ProductList;