import { ParamsDictionary } from 'express-serve-static-core';

export interface DeleteTestParams extends ParamsDictionary {
  testId: string;
}
