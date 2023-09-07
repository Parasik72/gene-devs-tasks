import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../constants/app-keys.constants';
import { testsService } from '../services/tests/tests.service';
import { onErrorAlert } from '../mutations/on-error.alert';

export const useGetTests = () => {
  return useQuery(
    QUERY_KEYS.TESTS, 
    async () => testsService.getAllTests()
  );
};

export const useGetFullTest = (testId: string) => {
  return useQuery(
    QUERY_KEYS.EDIT_TEST, 
    async () => testsService.getFullTest(testId),
    { onError: onErrorAlert }
  );
};
