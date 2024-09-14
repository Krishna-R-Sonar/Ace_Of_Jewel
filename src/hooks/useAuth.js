import {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext.js';
import authService from '../services/authService.js';

const useAuth = () => {
    const {authState, setAuthState} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const data = await authService.login(email, password);
            setAuthState({user: data.user, token: data.token});
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserDetails = async (token) => {
        try {
            setLoading(true);
            const user = await authService.getUserDetails(token);
            setAuthState({user, token});
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authState.token) {
            getUserDetails(authState.token);
        }
    }, [authState.token]);

    return {authState, login, error, loading};
};

export default useAuth;