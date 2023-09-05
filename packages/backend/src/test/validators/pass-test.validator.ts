import { check } from 'express-validator/check';
import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const passTestValidator = [
  validateObjectId('params', 'testId'),
  check('answers')
    .isArray().withMessage('Answers must be an array')
    .not().isEmpty().withMessage('Answers cant be empty')
];
