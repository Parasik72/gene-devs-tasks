import { IQuestion, IQuestionType } from '../../services/tests/test.model';

export interface IQuestionListItemComponent {
  question: IQuestion
  questionTypes: IQuestionType[];
  number: number;
  testId: string;
}
