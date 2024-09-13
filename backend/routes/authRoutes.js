import {Router} from 'express';
import {check} from 'express-validator';
import {register, login, logout, refreshToken} from '../controllers/authController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import validationRequest  from '../middlewares/validateRequest.js';

const router = Router();

// route for user registration with validation
router.post('/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
    ],
    validationRequest,
    register
);


// route for user login with validation
router.post('/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    validationRequest,
    login
);

// route for user logout
router.post('/logout', authMiddleware, logout);

// route for refreshing the token
router.post('/refresh-token', refreshToken);

export default router;