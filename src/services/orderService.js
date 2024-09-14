import api from '../utils/api.js';

const orderService = {
    getOrders: async () => {
        try {
            const response = await api.get('/orders') // assuming the api endpoint is /orders
            return response.data.orders; // assuming the api returns {orders}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch orders');
        }
    },

    getOrdersById: async (orderId) => {
        try {
            const response = await api.get(`/orders/${orderId}`); // assuming the api endpoint is /orders/:orderId
            return response.data.order; // assuming the api returns {order}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch order details');
        }
    },

    placeOrder: async (orderData) => {
        try {
            const response = await api.post('/orders', orderData); // assuming the api allows post to /orders
            return response.data.order; // assuming the api returns {order}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to place order');
        }
    }
};

export default orderService;