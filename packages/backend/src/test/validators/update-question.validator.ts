import { check } from 'express-validator/check';
import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';
import { filesExtensions } from '../../functions/middlewares/files-type.function';
import { filesMaxSize } from '../../functions/middlewares/files-size.function';

export const updateQuestionValidator = [
  validateObjectId('params', 'questionId'),
  filesExtensions(['jpg', 'jpeg', 'png']),
  filesMaxSize(4),
  check('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5 }).withMessage('Title must be more 5 characters'),
];
