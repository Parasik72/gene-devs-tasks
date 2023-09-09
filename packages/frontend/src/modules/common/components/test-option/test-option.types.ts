import { IOption } from '../../services/tests/test.model';
import { QuestionTypes } from '../../types/question.types';

export interface ITestOptionComponent {
  option: IOption;
  questionType: QuestionTypes;
  callback: (optionId: string, value: boolean) => void;
}
