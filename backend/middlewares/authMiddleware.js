import jwt from 'jsonwebtoken';
import {jwtConfig} from '../config/jwtConfig.js';
const {jwtSecret} = jwtConfig;

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];

    if(!token){
        return res.status(403).json({ message: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId; // Attach userId to the request object
        next(); // proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid token'});
    }
};