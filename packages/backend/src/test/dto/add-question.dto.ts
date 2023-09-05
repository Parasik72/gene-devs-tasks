import { IOption } from '../models/option.model';

export interface AddQuestionDto {
  title: string;
  options: IOption[];
  answers: IOption[];
}
