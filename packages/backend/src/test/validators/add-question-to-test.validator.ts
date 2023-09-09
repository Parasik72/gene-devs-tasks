import { check } from 'express-validator/check';
import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';
import { filesMaxSize } from '../../functions/middlewares/files-size.function';
import { filesExtensions } from '../../functions/middlewares/files-type.function';

export const addQuestionToTestValidator = [
  validateObjectId('params', 'testId'),
  filesExtensions(['jpg', 'jpeg', 'png']),
  filesMaxSize(4),
  check('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5 }).withMessage('Title must be more 5 characters'),
];
