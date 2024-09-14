import {createContext, useContext, useReducer} from 'react';
import cartService from '../services/cartService.js';

const CartContext = createContext();

const initialState = {
    cartItems: [],
    total: 0,
    error: null,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {...state, cartItems: action.payload, total: action.payload.reduce((acc, item) => acc + item.price, 0)};
        case 'REMOVE_FROM_CART':
            return {...state, cartItems: action.payload, total: action.payload.reduce((acc, item) => acc + item.price, 0)};
        case 'CART_ERROR':
            return {...state, error: action.payload};
        default:
            return state;
    }
};

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = async (product) => {
        try {
            const updatedCart = await cartService.addItem(product);
            dispatch({type: 'ADD_TO_CART', payload: updatedCart});
        } catch (error) {
            dispatch({type: 'CART_ERROR', payload: error.message});
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const updatedCart = await cartService.removeItem(productId);
            dispatch({type: 'REMOVE_FROM_CART', payload: updatedCart});
        } catch (error) {
            dispatch({type: 'CART_ERROR', payload: error.message});
        }
    };

    return (
        <CartContext.Provider value={{...state, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);