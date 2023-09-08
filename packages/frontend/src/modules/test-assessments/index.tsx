import React from 'react';
import { MainLayoutComponent } from '../common/components/main-layout/main-layout.component';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ITestAssessmentsParams } from './test-assessments.types';
import { HISTORY_KEYS } from '../common/constants/app-keys.constants';
import { SPACES, SPACESNUMBER } from '../theme/spaces.const';
import { useGetAssessmentsByTestId } from '../common/queries/tests.query';
import { AssessmentResultComponent } from '../common/components/assessment-result/assessment-result.component';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { WEIGHTS } from '../theme/fonts.const';

export const TestAssessmentsPageComponent = () => {
  const { testId } = useParams<ITestAssessmentsParams>();
  const { data, isLoading } = useGetAssessmentsByTestId(testId || '');
  const navigate = useNavigate();

  return (
    <MainLayoutComponent>
      {isLoading && (
        <LoaderComponent />
      )}
      <Box 
        marginTop={SPACES.xxl} 
        display="flex"
        flexDirection="column"
        gap={SPACESNUMBER.m}
      >
        <Box display="flex" justifyContent="flex-start" zIndex={1}>
          <Button variant='contained' onClick={() => navigate(HISTORY_KEYS.ROOT)}>
            ← Back
          </Button>
        </Box>
        {!isLoading && data && data.length !== 0 && (
          data.map((assessment) => <AssessmentResultComponent key={assessment._id} assessment={assessment} />)
        )}
      </Box>
      {!isLoading && data && data.length === 0 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          width="100%"
          height="100%"
        >
          <Typography variant='h3' fontWeight={WEIGHTS.bold}>There are no any results</Typography>
        </Box>
      )}
    </MainLayoutComponent>
  );
};
