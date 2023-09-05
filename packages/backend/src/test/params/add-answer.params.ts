import { ParamsDictionary } from 'express-serve-static-core';

export interface AddAnswerParams extends ParamsDictionary {
  questionId: string;
}
