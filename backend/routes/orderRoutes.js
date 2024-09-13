import { Router } from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {placeOrder, getOrderById, getAllOrders, updateOrderStatus} from '../controllers/orderController.js';

const router = Router();

// route to place a new order (requires auth)
router.post('/', authMiddleware, placeOrder);

// route to get a specific order by its ID (requires auth)
router.get('/', authMiddleware, getOrderById);

//route to get all orders (admin-only access can be added if needed)
router.get('/all', authMiddleware, getAllOrders);

// route to update the status of an order (admin-only access can be added)
router.put('/:id/status', authMiddleware, updateOrderStatus);

export default router;