import express from 'express';
import {
    subscribeNewsletter,
    unsubscribeNewsletter,
    getAllSubscriptions
} from '../controllers/newsletterController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to subscribe to the newsletter
router.post('/subscribe', subscribeNewsletter);

// Route to unsubscribe from the newsletter
router.post('/unsubscribe', unsubscribeNewsletter);

// Route to get all newsletter subscriptions (admin only)
router.get('/subscriptions', authMiddleware, getAllSubscriptions);

export default router;
