import { ROUTER_KEYS } from '../common/constants/app-keys.constants';
import { TestEditingPageComponent } from '../test-editing';
import { INavigationRoute } from './navigation.interfaces';

export const PrivateRoutes = (): INavigationRoute[] => {
  return [
    { component: TestEditingPageComponent, path: ROUTER_KEYS.EDIT_TEST },
  ];
};
