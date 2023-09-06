import { ReactNode } from 'react';

interface IFormikFormSecondBtn {
  show: boolean;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IFormikForm<T extends Object> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate: (values: T) => void;
  children: ReactNode;
  secondBtn: IFormikFormSecondBtn;
}
