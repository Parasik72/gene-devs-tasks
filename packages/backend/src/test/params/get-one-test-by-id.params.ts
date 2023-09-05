import { ParamsDictionary } from 'express-serve-static-core';

export interface GetOneTestByIdParams extends ParamsDictionary {
  testId: string;
}
