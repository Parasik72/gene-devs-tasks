import { ParamsDictionary } from 'express-serve-static-core';

export interface DeleteQuestionParams extends ParamsDictionary {
  questionId: string;
}
