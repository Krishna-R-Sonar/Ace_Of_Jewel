import Router from 'express';
import {
    createAppointment,
    getAppointmentsByUserId,
    updateAppointment,
    deleteAppointment
} from '../controllers/appointmentConttroller.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { check } from 'express-validator';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

// route to create a new appointment (requires auth)
router.post(
    '/',
    authMiddleware,
    [
        check('userId', 'User ID is required').not().isEmpty(),
        check('date', 'Valid date is required').not().isEmpty(),
        check('time', 'Time is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    validateRequest,
    createAppointment
);

// route to get all appointments for a specific user (requires auth)
router.get('/:userId', authMiddleware, getAppointmentsByUserId);

// route to update a specific appointment by appointment ID (requires auth)
router.put(
    '/:appointmentId',
    authMiddleware,
    [
        check('date', 'Valid date is required').optional().isISO8601(),
        check('time', 'Time must be provided').optional().not().isEmpty(),
        check('description', 'Description must be provided').optional().not().isEmpty(),
    ],
    validateRequest,
    updateAppointment
);

// route to delete a specific appointment ID (requires auth)
router.delete('/:appointmentId', authMiddleware, deleteAppointment);

export default router;