import { ParamsDictionary } from 'express-serve-static-core';

export interface AddQuestionsParams extends ParamsDictionary {
  testId: string;
}
