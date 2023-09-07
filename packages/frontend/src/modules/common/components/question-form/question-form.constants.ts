import { IQuestionFormCreation, IQuestionFormEditing } from './question-form.types';

export const addQuestionFormInitialVariables = (): IQuestionFormCreation => ({
  title: ''
});

export const editQuestionFormInitialVariables = (
  data: IQuestionFormEditing
): IQuestionFormEditing => ({
  title: data.title
});
