import { Router } from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js';
import cartController from '../controllers/cartController.js';
Router

const router = Router();

router.get('/', authMiddleware, cartController.getCart);
router.post('/add', authMiddleware, cartController.addToCart);
router.post('/remove', authMiddleware, cartController.removeFromCart);

export default router;