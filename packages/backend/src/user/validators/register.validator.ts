import { check } from 'express-validator/check';

export const registerValidator = [
  check('email')
    .isString().withMessage('Email must be a string')
    .isEmail().withMessage('Incorrect email format'),
  check('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 5, max: 30 }).withMessage('Password must be more 5 and less or equal 30 characters')
];
