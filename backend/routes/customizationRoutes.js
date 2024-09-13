import { Router } from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {createCustomization, getCustomizationByUserId, updateCustomization, deleteCustomization} from '../controllers/customizationController.js';
import { check } from "express-validator";
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

// route to create a new customization (requires authentication)
router.post('/', authMiddleware,
    [
        check('userId', 'User ID is required').not().isEmpty(),
        check('customizationDetails', 'Customization details are required').not().isEmpty(),
    ],
    validateRequest,
    createCustomization
);

// route to get customization by user ID (requires authenixation)
router.get('/:userId', authMiddleware, getCustomizationByUserId);

// route to update customization by user ID (requires authentication)
router.put(
    '/:userId',
    authMiddleware,
    [
        check('customizationDetails', 'customization details are required').not().isEmpty(),
    ],
    validateRequest,
    updateCustomization
);

// route to delete customization by user ID (requires authentication)
router.delete('/:userId', authMiddleware, deleteCustomization);

export default router;