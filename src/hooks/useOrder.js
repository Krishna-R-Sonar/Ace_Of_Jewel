import {useState, useEffect} from 'react';
import orderService from '../services/orderService.js';

const useOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const fetchedOrders = await orderService.getOrders();
            setOrders(fetchedOrders);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderById = async (orderId) => {
        try {
            setLoading(true);
            const order = await orderService.getOrdersById(orderId);
            return order;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async (orderData) => {
        try {
            setLoading(true);
            const newOrder = await orderService.placeOrder(orderData);
            setOrders([...orders, newOrder]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {orders, fetchOrderById, placeOrder, loading, error};
};

export default useOrder;