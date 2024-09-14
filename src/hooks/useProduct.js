import {useState, useEffect} from 'react';
import productService from '../services/productService.js';

const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const fetchedProducts = await productService.getProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductById = async (productId) => {
        try {
            setLoading(true);
            const product = await productService.getProductById(productId);
            return product;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {products, fetchProductById, loading, error};
};

export default useProduct;