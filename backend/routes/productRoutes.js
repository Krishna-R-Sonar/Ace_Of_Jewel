import {Router} from 'express';
import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    searchProducts
} from '../controllers/productController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';
import { check } from 'express-validator';

const router = Router();

// route to get all products
router.get('/', getProducts);
// route to get product by id
router.get('/:id', getProductById);
// route to get products by category
router.get('/category/:categoryId', getProductsByCategory);
// route to search products
router.get('/search', searchProducts);
// route to create a new product (requires authentication)
router.post(
    '/',
    authMiddleware,
    [
        check('name', 'Product name is required').not().isEmpty(),
        check('price', 'Product price is required').isFloat({gt: 0}),
        check('category', 'Product category is required').not().isEmpty(),
    ],
    validateRequest,
    addProduct
);

// route to update an existing product (requires authentication)
router.put(
    '/:id',
    authMiddleware,
    [
        check('name', 'Product name is required').not().isEmpty(),
        check('price', 'Product price is required').isFloat({gt: 0}),
        check('category', 'Product category is required').not().isEmpty(),
    ],
    validateRequest,
    updateProduct
);

// route to delete a product (requires authentication)
router.delete('/:id', authMiddleware, deleteProduct);

export default router;