import { QuestionTypes } from '../types/question.types';

export const getQuestionTypeByText = (text: string): QuestionTypes => {
  switch(text) {
  case QuestionTypes.SINGLE_CHOICE:
    return QuestionTypes.SINGLE_CHOICE;
  case QuestionTypes.TRUE_FALSE:
    return QuestionTypes.TRUE_FALSE;
  default:
    return QuestionTypes.MULTIPLE_CHOICE;
  }
};
