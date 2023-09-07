import { IAuthFormLogin, IAuthFormRegistration } from '../../auth/auth-form/auth-form.types';
import { authRegistrationFormInitialVariables } from '../../auth/auth.constants';
import { createValidation } from './class.validator';

export const authFormValidate = (values: IAuthFormRegistration | IAuthFormLogin) => {
  const resultErrors = authRegistrationFormInitialVariables();
  const validationErrors = createValidation(values)
    .isNotEmpty('email')
    .isEmail('email')
    .isNotEmpty('password')
    .length('password', { min: 5, max: 30 }).errors;
  const emailErrors = validationErrors.filter((error) => error.key === 'email');
  const passwordErrors = validationErrors.filter((error) => error.key === 'password');
  if (emailErrors.length !== 0) {
    resultErrors.email = emailErrors[0].msg;
  }
  if (passwordErrors.length !== 0) {
    resultErrors.password = passwordErrors[0].msg;
  }
  if ('confirmPassword' in values) {
    if (values.confirmPassword !== values.password) {
      resultErrors.confirmPassword = 'Must be equal to password';
    }
  }
  if (
    resultErrors.email.length === 0 &&
    resultErrors.password.length === 0 &&
    resultErrors.confirmPassword?.length === 0
  ) {
    return {};
  }
  return resultErrors;
};
