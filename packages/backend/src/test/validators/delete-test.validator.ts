import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const deleteTestValidator = [
  validateObjectId('params', 'testId')
];
