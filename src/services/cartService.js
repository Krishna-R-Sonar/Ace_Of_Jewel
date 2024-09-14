import api from '../utils/api.js';

const cartService = {
    addItem: async (product) => {
        try {
            const response = await api.post('/cart/add', product); // assuming the api endpoint is /cart/add
            return response.data.cartItems; // assuming the api returns {cartItems}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to add item to cart')
        }
    },

    removeItem: async (productId) => {
        try {
            const response = await api.post(`/cart/remove/${productId}`); // assuming the api endpoint is /cart/remove/:id
            return response.data.cartItems; // assuming the api returns {cartItems}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to remove item from cart')
        }
    },

    getCart: async () => {
        try {
            const response = await api.get('/cart'); // Assuming the api endpoint is /cart
            return response.data.cartItems; // Assuming the api returns {cartItems}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch cart items')
        }
    },

    clearCart: async () => {
        try {
            const response = await api.get('/cart/clear'); // Assuming the api endpoint is /cart/clear
            return response.data.cartItems; // Assuming the api returns {cartItems}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to clear the cart');
        }
    }
};

export default cartService;