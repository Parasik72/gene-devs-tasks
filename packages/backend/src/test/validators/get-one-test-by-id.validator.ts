import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const getOneTestByIdValidator = [
  validateObjectId('params', 'testId')
];
