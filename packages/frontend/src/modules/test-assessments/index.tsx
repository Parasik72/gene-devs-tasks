import React from 'react';
import { MainLayoutComponent } from '../common/components/main-layout/main-layout.component';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ITestAssessmentsParams } from './test-assessments.types';
import { HISTORY_KEYS } from '../common/constants/app-keys.constants';
import { SPACES, SPACESNUMBER } from '../theme/spaces.const';
import { useGetAssessmentsByTestId } from '../common/queries/tests.query';
import { AssessmentResultComponent } from '../common/components/assessment-result/assessment-result.component';

export const TestAssessmentsPageComponent = () => {
  const { testId } = useParams<ITestAssessmentsParams>();
  const { data, isLoading } = useGetAssessmentsByTestId(testId || '');
  const navigate = useNavigate();

  return (
    <MainLayoutComponent>
      {!isLoading && data && (
        <Box 
          marginTop={SPACES.xxl} 
          display="flex"
          flexDirection="column"
          gap={SPACESNUMBER.m}
        >
          <Box display="flex" justifyContent="flex-start">
            <Button variant='contained' onClick={() => navigate(HISTORY_KEYS.ROOT)}>
                ← To main
            </Button>
          </Box>
          {data.map((assessment) => <AssessmentResultComponent key={assessment._id} assessment={assessment} />)}
        </Box>
      )}
    </MainLayoutComponent>
  );
};
