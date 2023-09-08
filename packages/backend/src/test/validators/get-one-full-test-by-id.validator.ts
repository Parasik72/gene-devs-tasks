import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const getOneFullTestByIdValidator = [
  validateObjectId('params', 'testId')
];
