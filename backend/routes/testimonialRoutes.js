import express from 'express';
import {
    getAllTestimonials,
    createTestimonial,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
} from '../controllers/testimonialController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to get all testimonials
router.get('/', getAllTestimonials);

// Route to create a new testimonial (authenticated)
router.post('/', authMiddleware, createTestimonial);

// Route to get a specific testimonial by id
router.get('/:id', getTestimonialById);

// Route to update a testimonial (authenticated)
router.put('/:id', authMiddleware, updateTestimonial);

// Route to delete a testimonial (authenticated)
router.delete('/:id', authMiddleware, deleteTestimonial);

export default router;
