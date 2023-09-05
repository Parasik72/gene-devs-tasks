import { ParamsDictionary } from 'express-serve-static-core';

export interface GetAssessmentsParams extends ParamsDictionary {
  testId: string;
}
