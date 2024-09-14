import {useContext, useState} from 'react';
import CartContext from '../context/CartContext.js';
import cartService from '../services/cartService.js';

const useCart = () => {
    const {cartState, setCartState} = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addItemToCart = async (product) => {
        try {
            setLoading(true);
            const cartItems = await cartService.addItem(product);
            setCartState({items: cartItems});
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeItemFromCart = async (productId) => {
        try {
            setLoading(true);
            const cartItems = await cartService.removeItem(productId);
            setCartState({items: cartItems});
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            const cartItems = await cartService.clearCart(productId);
            setCartState({items: cartItems});
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {cartState, addItemToCart, removeItemFromCart, clearCart, loading, error};
};

export default useCart;