import { NavigateFunction } from 'react-router-dom';
import { IAuthFormLogin, IAuthFormRegistration, IAuthFormSecondBtn } from './auth-form/auth-form.types';
import { HISTORY_KEYS } from '../common/constants/app-keys.constants';

export const authRegistrationFormInitialVariables = (): IAuthFormRegistration => ({
  email: '',
  password: '',
  confirmPassword: ''
});

export const authLoginFormInitialVariables = (): IAuthFormLogin => ({
  email: '',
  password: ''
});

export const authSecondButtonBack = (navigate: NavigateFunction): IAuthFormSecondBtn => ({
  show: true,
  onClick: () => navigate(HISTORY_KEYS.ROOT),
  text: 'Back'
});
