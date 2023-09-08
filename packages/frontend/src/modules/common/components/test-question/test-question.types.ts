import { IQuestion } from '../../services/tests/test.model';

export interface ITestQuestionComponent {
  question: IQuestion;
  callback: (questionId: string, optionId: string, toAdd: boolean) => void;
}
