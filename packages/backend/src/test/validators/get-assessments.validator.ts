import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const getAssessmentsValidator = [
  validateObjectId('params', 'testId')
];
