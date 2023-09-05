import { check } from 'express-validator/check';
import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const updateQuestionValidator = [
  validateObjectId('params', 'questionId'),
  check('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5 }).withMessage('Title must be more 5 characters'),
];
