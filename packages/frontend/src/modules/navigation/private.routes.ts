import { AssessmentPageComponent } from '../asessment';
import { ROUTER_KEYS } from '../common/constants/app-keys.constants';
import { PassingTestPageComponent } from '../passing-test';
import { TestAssessmentsPageComponent } from '../test-assessments';
import { TestEditingPageComponent } from '../test-editing';
import { INavigationRoute } from './navigation.interfaces';

export const PrivateRoutes = (): INavigationRoute[] => {
  return [
    { component: TestEditingPageComponent, path: ROUTER_KEYS.EDIT_TEST },
    { component: PassingTestPageComponent, path: ROUTER_KEYS.PASSING_TEST },
    { component: AssessmentPageComponent, path: ROUTER_KEYS.ASSESSMENT },
    { component: TestAssessmentsPageComponent, path: ROUTER_KEYS.TEST_ASSESSMENTS },
  ];
};
