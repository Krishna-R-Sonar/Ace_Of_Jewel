import api from '../utils/api.js';

const productService = {
    getProducts: async () => {
        try {
            const response = await api.get('/products'); //Assuming the api endpoint is /products
            return response.data.products; // assuming the api return {products}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch products');
        }
    },

    getProductById: async (productId) => {
        try {
            const response = await api.get(`/products/${productId}`); // assuming the api endpoint is /product/:id
            return response.data.product; // assuming the api return {product}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch product details');
        }
    }
};

export default productService;