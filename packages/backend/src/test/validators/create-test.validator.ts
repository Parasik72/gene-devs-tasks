import { check } from 'express-validator/check';
import { arrayContains } from '../../functions/array-contains.function';
import { IQuestion } from '../models/question.model';

export const createTestValidator = [
  check('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5 }).withMessage('Title must be more 5 characters'),
  check('description')
    .isString().withMessage('Description must be a string')
    .isLength({ min: 5 }).withMessage('Description must be more 5 characters')
];

export const addQuestionToTestValidator = [
  check('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5 }).withMessage('Title must be more 5 characters'),
  check('options')
    .isArray().withMessage('Options must be an array')
    .not().isEmpty().withMessage('Options cant be empty'),
  check('answers')
    .isArray().withMessage('Answers must be an array')
    .not().isEmpty().withMessage('Answers cant be empty'),
  arrayContains<IQuestion>(
    'options', 'answers', 'Answers must contain the same items as the options', 'text'
  )
];
