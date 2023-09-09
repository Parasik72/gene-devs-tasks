import { addOptionFormVariables } from '../components/add-option/add-option.constants';
import { IAddOptionFormCreation } from '../components/add-option/add-option.types';
import { addQuestionFormInitialVariables } from '../components/question-form/question-form.constants';
import { IQuestionFormCreation, IQuestionFormEditing } from '../components/question-form/question-form.types';
import { testCreationFormInitialVariables } from '../components/test-form/test-form.constants';
import { ITestFormCreation, ITestFormEditing } from '../components/test-form/test-form.types';
import { createValidation } from './class.validator';

export const testFormValidate = (values: ITestFormCreation | ITestFormEditing) => {
  const resultErrors = testCreationFormInitialVariables();
  const validationErrors = createValidation(values)
    .isNotEmpty('title')
    .length('title', { min: 5, max: 1000 })
    .isNotEmpty('description')
    .length('description', { min: 5, max: 1000 }).errors;
  const titleErrors = validationErrors.filter((error) => error.key === 'title');
  const descriptionErrors = validationErrors.filter((error) => error.key === 'description');
  if (titleErrors.length !== 0) {
    resultErrors.title = titleErrors[0].msg;
  }
  if (descriptionErrors.length !== 0) {
    resultErrors.description = descriptionErrors[0].msg;
  }
  if (
    resultErrors.title?.length === 0 &&
    resultErrors.description.length === 0
  ) {
    return {};
  }
  return resultErrors;
};

export const questionFormValidate = (values: IQuestionFormCreation | IQuestionFormEditing) => {
  const resultErrors = addQuestionFormInitialVariables();
  const validationErrors = createValidation(values)
    .isNotEmpty('title')
    .length('title', { min: 5, max: 1000 }).errors;
  const titleErrors = validationErrors.filter((error) => error.key === 'title');
  if (titleErrors.length !== 0) {
    resultErrors.title = titleErrors[0].msg;
  }
  if (resultErrors.title.length === 0 ) {
    return {};
  }
  return resultErrors;
};

export function addOptionFormValidate(values: IAddOptionFormCreation) {
  const resultErrors = addOptionFormVariables();
  const validationErrors = createValidation(values)
    .isNotEmpty('text').errors;
  const textErrors = validationErrors.filter((error) => error.key === 'text');
  if (textErrors.length !== 0) {
    resultErrors.text = textErrors[0].msg;
  }
  if (resultErrors.text.length === 0) {
    return {};
  }
  return resultErrors;
}
