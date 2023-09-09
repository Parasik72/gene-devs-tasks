import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const changeQuestionTypeValidator = [
  validateObjectId('params', 'questionId'),
  validateObjectId('body', 'questionTypeId'),
];
