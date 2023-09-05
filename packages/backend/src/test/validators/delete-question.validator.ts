import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const deleteQuestionValidator = [
  validateObjectId('params', 'questionId')
];
