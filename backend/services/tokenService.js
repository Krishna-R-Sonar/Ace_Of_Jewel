import jwt from 'jsonwebtoken';
import {jwtConfig} from '../config/jwtConfig.js';

export const generateToken = (user) => {
    return jwt.sign({user}, jwtConfig.jwtSecret, {expiresIn: jwtConfig.jwtExpiration});
};

export const verifyToken = (token) => {
    return jwt.verify(token, jwtConfig.jwtSecret);
};