import { validateObjectId } from '../../functions/middlewares/validate-objectid.function';

export const getAssessmentValidator = [
  validateObjectId('params', 'assessmentId')
];
