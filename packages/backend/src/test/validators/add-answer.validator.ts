import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const addAnswerValidator = [
  validateObjectId('params', 'questionId'),
  validateObjectId('body', 'optionId'),
];
