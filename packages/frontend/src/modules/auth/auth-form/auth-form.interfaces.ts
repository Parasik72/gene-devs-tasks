export interface IAuthFormRegistration {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IAuthFormLogin {
  email: string;
  password: string;
}

export enum AuthFormActions {
  REGISTRATION = 'REGISTRATION',
  LOGIN = 'LOGIN'
}

export enum AuthFormTitles {
  REGISTRATION = 'Registration',
  LOGIN = 'Login'
}

export interface IAuthRegistration {
  type: AuthFormActions.REGISTRATION;
  formTitle: AuthFormTitles.REGISTRATION;
  initialValues: IAuthFormRegistration;
}

export interface IAuthLogin {
  type: AuthFormActions.LOGIN;
  formTitle: AuthFormTitles.LOGIN;
  initialValues: IAuthFormLogin;
}

export type AuthFormType =
  | IAuthRegistration
  | IAuthLogin;

export interface IAuthFormSecondBtn {
  show: boolean;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}

export type AuthType =
  | IAuthFormRegistration
  | IAuthFormLogin;

export interface IAuthForm<T extends AuthFormType> {
  data: T;
  validate: (values: AuthType) => {};
  onSubmit: (values: AuthType) => Promise<any>;
  title: string;
  secondBtn: IAuthFormSecondBtn;
}
