import {createContext, useContext, useReducer, useEffect} from 'react';
import productService from '../services/productService.js'

const ProductContext = createContext();

const initialState = {
    products: [],
    loading: true,
    error: null,
};

const productReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false};
        case 'FETCH_ERROR':
            return { ...state, error: action.payload, loading: false};
        case 'LOADING':
            return { ...state, loading: true};
        default:
            return state;    
    }
};

export const ProductProvider = ({children}) => {
    const[state, dispatch] = useReducer(productReducer, initialState);

    useEffect(() => {
        dispatch({type: 'LOADING'});
        productService.getProducts()
        .then((producta) => dispatch({type: 'FETCH_SUCCESS', payload: products}))
        .catch((error) => dispatch({type: 'FETCH_ERROR', payload: error.message}));
    }, []);

    return (
        <ProductContext.Provider value={state}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);