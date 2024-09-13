import {Router} from 'express';
import { createReferral, getReferralsByUserId, updateReferralStatus, deleteReferral} from '../controllers/referralController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { check } from 'express-validator';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

// route to create a new referral (requires auth)
router.post(
    '/',
    authMiddleware,
    [
        check('userId', 'User ID is required').not().isEmpty(),
        check('referralUserId', 'Referral User ID is required').not().isEmpty(),
    ],
    validateRequest,
    createReferral
);

// route to get all referrals for a specific user (requires auth)
router.get('/:userId', authMiddleware, getReferralsByUserId);

// route to update the status of a specific referral (requires auth)
router.put('/:referralId', authMiddleware, [
    check('status', 'Status is required').not().isEmpty(),
], validateRequest, updateReferralStatus);

// route to delete a specific referral (requires auth)
router.delete('/:referralId', authMiddleware, deleteReferral);

export default router;