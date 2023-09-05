import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const deleteAnswerValidator = [
  validateObjectId('params', 'answerId'),
];
