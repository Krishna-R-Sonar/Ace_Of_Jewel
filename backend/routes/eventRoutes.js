import { Router } from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { check } from 'express-validator';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

// route to create a new event (requires auth)
router.post(
    '/',
    authMiddleware,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('date', 'Date is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('organizer', 'Organizer is required').not().isEmpty()
    ],
    validateRequest,
    createEvent
);

// route to get all events (public access)
router.get('/', getAllEvents);

// route to get a specific event by ID (public access)
router.get('/:eventId', getEventById);

// route to update a specific event (req auth)
router.put(
    '/:eventId',
    authMiddleware,
    [
        check('title', 'Title is required').optional(),
        check('description', 'Description is required').optional(),
        check('date', 'Date is required').optional(),
        check('location', 'Location is required').optional(),
        check('organizer', 'Organizer is required').optional(),
    ],
    validateRequest,
    updateEvent
);

// Route to delete a specific event (Requires authentication)
router.delete('/:eventId', authMiddleware, deleteEvent);

export default router;