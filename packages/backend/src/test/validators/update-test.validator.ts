import { check } from 'express-validator/check';
import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const updateTestValidator = [
  validateObjectId('params', 'testId'),
  check('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5 }).withMessage('Title must be more 5 characters'),
  check('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ min: 5 }).withMessage('Description must be more 5 characters')
];
