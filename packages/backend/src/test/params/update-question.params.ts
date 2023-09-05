import { ParamsDictionary } from 'express-serve-static-core';

export interface UpdateQuestionParams extends ParamsDictionary {
  questionId: string;
}
