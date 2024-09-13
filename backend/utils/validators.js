import {check} from 'express-validator'

export const validateUserRegistration = [
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
];

export const validateProductCreation = [
    check('name').notEmpty().withMessage('Product name is required'),
    check('price').isFloat({min: 0}).withMessage('Price must be a positive number'),
];

export const validateGiftCreation = [
    check('giftType').notEmpty().withMessage('Gift type is required'),
    check('deliveryDate').isISO8601().toDate().withMessage('Invalid delivery date'),
];