import {createContext, useContext, useEffect} from 'react';
import authService from '../services/authService.js'

const AuthContext = createContext();

const initialState = {
    user: null,
    token: null,
    loading: true,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, user: action.payload.user, token: action.payload.token, loading: false};
        case 'LOGOUT':
            return {...state, user: null, token: null, loading: false};
        case 'LOGIN_ERROR':
            return {...state, error: action.payload, loading: false};
        case 'LOADING':
            return {...state, loading: true};
        default:
            return state;
    }
};

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        // check for an existing token in localStorage
        const token = localStorage.getItem('token');
        if(token){
            authService.getUserDetails(token)
            .then(user => {
                dispatch({type: 'LOGIN_SUCCESS', payload: {user, token}});
            })
            .catch(() => {
                dispatch({type: 'LOGOUT'});
            });
        } else {
            dispatch({type: 'LOGOUT'});
        }
    }, []);

    const login = async (email, password) => {
        dispatch({type: 'LOADING'});
        try {
            const {user, token} = await authService.login(email, password);
            localStorage.setItem('token', token);
            dispatch({type: 'LOGIN_SUCCESS', payload: {user, token}});
        } catch (error) {
            dispatch({type: 'LOGIN_ERROR', payload: error.message});
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({type: 'LOGOUT'});
    };

    return (
        <AuthContext.Provider value={{...state, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=> useContext(AuthContext);