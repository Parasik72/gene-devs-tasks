import { ITestAnswer } from '../../../passing-test/passing-test.types';
import { ITestFormCreation, ITestFormEditing } from '../../components/test-form/test-form.types';

export interface ITestCreationSending {
  data: ITestFormCreation;
}

export interface ITestUpdateSending {
  data: ITestFormEditing;
  testId: string;
}

export interface AddAnswerSending {
  optionId: string;
  questionId: string;
}

export interface RemoveAnswerSending {
  answerId: string;
}

export interface AddQuestionSending {
  testId: string;
  title: string;
}

export interface UpdateQuestionSending {
  questionId: string;
  title: string;
}

export interface AddOptionSending {
  questionId: string;
  text: string;
}

export interface RemoveOptionSending {
  optionId: string;
}

export interface RemoveQuestionSending {
  questionId: string;
}

export interface RemoveTestSending {
  testId: string;
}

export interface SubmitTestSending {
  answers: ITestAnswer[];
  testId: string;
}
