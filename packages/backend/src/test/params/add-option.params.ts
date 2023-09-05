import { ParamsDictionary } from 'express-serve-static-core';

export interface AddOptionParams extends ParamsDictionary {
  questionId: string;
}
