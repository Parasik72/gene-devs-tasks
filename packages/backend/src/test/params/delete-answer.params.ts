import { ParamsDictionary } from 'express-serve-static-core';

export interface DeleteAnswerParams extends ParamsDictionary {
  answerId: string;
}
