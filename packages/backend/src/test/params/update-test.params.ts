import { ParamsDictionary } from 'express-serve-static-core';

export interface UpdateTestParams extends ParamsDictionary {
  testId: string;
}
