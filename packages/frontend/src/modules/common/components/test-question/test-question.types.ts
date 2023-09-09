import { StoreDataAction } from '../../../passing-test/passing-test.functions';
import { IQuestion } from '../../services/tests/test.model';

export interface ITestQuestionComponent {
  question: IQuestion;
  callback: (questionId: string, optionId: string, action: StoreDataAction) => void;
}
