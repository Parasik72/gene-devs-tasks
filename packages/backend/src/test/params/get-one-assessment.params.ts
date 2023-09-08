import { ParamsDictionary } from 'express-serve-static-core';

export interface GetOneAssessmentParams extends ParamsDictionary {
  assessmentId: string;
}
