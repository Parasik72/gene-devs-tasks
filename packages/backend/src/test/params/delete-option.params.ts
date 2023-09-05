import { ParamsDictionary } from 'express-serve-static-core';

export interface DeleteOptionParams extends ParamsDictionary {
  optionId: string;
}
