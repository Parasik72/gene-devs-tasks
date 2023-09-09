export interface IQuestionFormCreation {
  title: string;
}

export interface IQuestionFormEditing {
  title: string;
  removeImage?: boolean;
}

export enum QuestionFormActions {
  CREATION = 'CREATION',
  EDITING = 'EDITING'
}

export interface IQuestionCreation {
  type: QuestionFormActions.CREATION;
  initialValues: IQuestionFormCreation;
}

export interface IAuthLogin {
  type: QuestionFormActions.EDITING;
  initialValues: IQuestionFormEditing;
}

export type QuestionFormType =
  | IQuestionCreation
  | IAuthLogin;

export type QuestionType =
  | IQuestionFormCreation
  | IQuestionFormEditing;

export interface IQuestionFormComponent<T extends QuestionFormType> {
  data: T;
  validate: (values: QuestionType) => {};
  onSubmit: (values: QuestionType) => Promise<any>;
  onFileUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFileUploaded?: boolean;
  hasImage?: boolean;
}
