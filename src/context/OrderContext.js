import {createContext, useContext, useEffect, useReducer} from 'react';
import orderService from '../services/orderService.js'

const OrderContext = createContext();

const initialState = {
    orders: [],
    loading: true,
    error: null,
};

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_ORDERS_SUCCESS':
            return {...state, orders: action.payload, loading: false};
        case 'FETCH_ORDERS_ERROR':
            return {...state, error: action.payload, loading: false};
        case 'LOADING':
            return {...state, loading: true};
        default:
            return state;
    }
};

export const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, initialState);

    useEffect(() => {
        dispatch({type: 'LOADING'});
        orderService.getOrders()
        .then((orders) => dispatch({type: 'FETCH_ORDERS_SUCCESS', payload: orders}))
        .catch((error) => dispatch({type: 'FECTH_ORDERS_ERROR', payload: error.message}))
    }, []);

    return (
        <OrderContext.Provider value={state}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => useContext(OrderContext);