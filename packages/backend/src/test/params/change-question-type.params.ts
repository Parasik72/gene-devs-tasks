import { ParamsDictionary } from 'express-serve-static-core';

export interface ChangeQuestionTypeParams extends ParamsDictionary {
  questionId: string;
}
