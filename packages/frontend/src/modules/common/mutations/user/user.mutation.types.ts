import { 
  IAuthFormLogin, 
  IAuthFormRegistration 
} from '../../../auth/auth-form/auth-form.types';

export interface IUserRegistrationSending {
  data: IAuthFormRegistration;
}

export interface IUserLoginSending {
  data: IAuthFormLogin;
}

export interface IUserErrorMutation {
  message: string;
}
