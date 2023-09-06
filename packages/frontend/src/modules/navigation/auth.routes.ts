import { LoginPageContainer } from '../auth/login';
import { RegistrationPageContainer } from '../auth/registration';
import { ROUTER_KEYS } from '../common/constants/app-keys.constants';
import { INavigationRoute } from './navigation.interfaces';

export const AuthRoutes = (): INavigationRoute[] => {
  return [
    { component: RegistrationPageContainer, path: ROUTER_KEYS.REGISTRATION },
    { component: LoginPageContainer, path: ROUTER_KEYS.LOGIN },
  ];
};
