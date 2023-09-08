import { IOption } from '../../services/tests/test.model';

export interface ITestOptionComponent {
  option: IOption;
  callback: (optionId: string, value: boolean) => void;
}
