export enum FormikFormInputTypes {
  text = 'text',
  password = 'password',
  checkbox = 'checkbox'
}

export type FormikFormInputType = FormikFormInputTypes;

export interface IFormikFormInputComponent {
  title: string;
  htmlFor: string;
  name: string;
  id: string;
  placeholder: string;
  type: FormikFormInputType;
}
