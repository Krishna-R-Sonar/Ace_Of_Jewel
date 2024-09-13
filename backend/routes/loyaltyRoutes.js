import {Router} from 'express';
import { createLoyalty, getLoyalByUserId, updateLoyalty, deleteLoyalty} from '../controllers/loyaltyController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { check } from 'express-validator';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

// route to create a new loyalty program entry (requires authentication)
router.post('/',
    authMiddleware,
    [
        check('userId', 'User ID is required').not().isEmpty(),
        check('points', 'Points are required').isNumeric(),
        check('level', 'Level is required').not().isEmpty(),
    ],
    validateRequest,
    createLoyalty
);

// route to get loyalty program by user ID (requires authentication)
router.get('/:userId', authMiddleware, getLoyalByUserId);

// route to update loyalty program by user ID (requires authentication)
router.put(
    '/:userId',
    authMiddleware,
    [
        check('points', 'Points are required').optional().isNumeric(),
        check('level', 'Level is required').optional().not().isEmpty(),
    ],
    validateRequest,
    updateLoyalty
);

// route to delete loyalty program by user ID (requires authentication)
router.delete('/:userId', authMiddleware, deleteLoyalty);

export default router;