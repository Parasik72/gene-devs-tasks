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

export const useGetTestForEdit = (testId: string) => {
  return useQuery(
    [QUERY_KEYS.EDIT_TEST, testId], 
    async () => testsService.getTestForEdit(testId),
    { onError: onErrorAlert }
  );
};

export const useGetTestForPassing = (testId: string) => {
  return useQuery(
    [QUERY_KEYS.PASSING_TEST, testId], 
    async () => testsService.getTestForPassing(testId),
    { onError: onErrorAlert }
  );
};

export const useGetAssessment = (assessmentId: string) => {
  return useQuery(
    [QUERY_KEYS.ASSESSMENT, assessmentId], 
    async () => testsService.getAssessment(assessmentId),
    { onError: onErrorAlert }
  );
};

export const useGetAssessmentsByTestId = (testId: string) => {
  return useQuery(
    [QUERY_KEYS.ASSESSMENTS, testId], 
    async () => testsService.getAssessmentsByTestId(testId),
    { onError: onErrorAlert }
  );
};
