import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const deleteOptionValidator = [
  validateObjectId('params', 'optionId')
];
