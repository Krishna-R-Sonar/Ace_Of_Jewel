import express from 'express';
import {
    getAllBlogPosts,
    createBlogPost,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost
} from '../controllers/blogController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to get all blogs
router.get('/', getAllBlogPosts);

// Route to create a new blog (authenticated)
router.post('/', authMiddleware, createBlogPost);

// Route to get a specific blog by id
router.get('/:id', getBlogPostById);

// Route to update a blog (authenticated)
router.put('/:id', authMiddleware, updateBlogPost);

// Route to delete a blog (authenticated)
router.delete('/:id', authMiddleware, deleteBlogPost);

export default router;