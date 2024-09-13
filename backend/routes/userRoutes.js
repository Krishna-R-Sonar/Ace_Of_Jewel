import express from 'express';
import {getProfile, updateProfile, getOrderHistory, getWishlist} from '../controllers/userController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js'

const router = express.Router();

// profile routes
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

// order and wishlist routes
router.get('/orders', authMiddleware, getOrderHistory);
router.get('/wishlist', authMiddleware, getWishlist);

export default router;