import { check } from 'express-validator/check';
import { arrayContains } from '../../functions/middlewares/array-contains.function';
import { IQuestion } from '../models/question.model';
import { IOption } from '../models/option.model';
import { duplicateValues } from '../../functions/middlewares/duplicate-values.function';
import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const addQuestionToTestValidator = [
  validateObjectId('params', 'testId'),
  check('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5 }).withMessage('Title must be more 5 characters'),
  check('options')
    .isArray().withMessage('Options must be an array')
    .not().isEmpty().withMessage('Options cant be empty'),
  check('answers')
    .isArray().withMessage('Answers must be an array')
    .not().isEmpty().withMessage('Answers cant be empty'),
  arrayContains<IQuestion, IOption>(
    'options', 'answers', 'Answers must contain the same items as the options',
    (item) => item.text
  ),
  duplicateValues<IQuestion, IOption>(
    'options', 
    'The options cant contain duplicates',
    (item) => item.text
  ),
  duplicateValues<IQuestion, IOption>(
    'answers', 
    'The answers cant contain duplicates',
    (item) => item.text
  ),
];
