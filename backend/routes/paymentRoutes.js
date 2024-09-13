import { Router } from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {createPaymentRequest, confirmPayment} from '../controllers/paymentController.js';

const router = Router();

router.post('/create-payment-request', authMiddleware, createPaymentRequest);
router.post('/confirm-payment', authMiddleware, confirmPayment);

export default router;