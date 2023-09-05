import { ParamsDictionary } from 'express-serve-static-core';

export interface PassTestParams extends ParamsDictionary {
  testId: string;
}
