import { IOption } from '../../services/tests/test.model';
import { QuestionTypes } from '../../types/question.types';

export interface IOptionListItemComponent {
  option: IOption;
  questionId: string;
  questionType: QuestionTypes;
  testId: string;
}
