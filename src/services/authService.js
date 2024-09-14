// import axios from 'axios';
import api from '../utils/api.js';

const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', {email, password});
            return response.data; // assuming the api returns {user, token}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    getUserDetails: async (token) => {
        try {
            const response = await api.get('/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.user; // assuming the api returns {user}
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch user details');
        }
    },
};

export default authService;