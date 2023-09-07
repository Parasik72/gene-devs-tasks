import { ITestFormCreation, ITestFormEditing } from './test-form.types';

export const testCreationFormInitialVariables = (): ITestFormCreation => ({
  title: '',
  description: ''
});

export const testEditingFormInitialVariables = (
  data: ITestFormEditing
): ITestFormEditing => ({
  title: data.title,
  description: data.description
});
