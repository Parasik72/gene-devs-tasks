import { check } from 'express-validator/check';

export const createTestValidator = [
  check('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5 }).withMessage('Title must be more 5 characters'),
  check('description')
    .isString().withMessage('Description must be a string')
    .isLength({ min: 5 }).withMessage('Description must be more 5 characters')
];
