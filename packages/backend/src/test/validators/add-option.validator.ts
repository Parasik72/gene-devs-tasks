import { check } from 'express-validator/check';
import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const addOptionValidator = [
  validateObjectId('params', 'questionId'),
  check('text')
    .isString().withMessage('Text must be a string')
    .not().isEmpty().withMessage('Text cant be empty')
];
