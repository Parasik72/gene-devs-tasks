export interface ITestFormCreation {
  title: string;
  description: string;
}

export interface ITestFormEditing {
  title: string;
  description: string;
}

export enum TestFormActions {
  CREATION = 'CREATION',
  EDITING = 'EDITING'
}

export interface ITestCreation {
  type: TestFormActions.CREATION;
  initialValues: ITestFormCreation;
}

export interface IAuthLogin {
  type: TestFormActions.EDITING;
  initialValues: ITestFormEditing;
}

export type TestFormType =
  | ITestCreation
  | IAuthLogin;

export type TestType =
  | ITestFormCreation
  | ITestFormEditing;

export interface ITestFormComponent<T extends TestFormType> {
  data: T;
  validate: (values: TestType) => {};
  onSubmit: (values: TestType) => Promise<any>;
}
