import React from 'react';
import { MainLayoutComponent } from '../common/components/main-layout/main-layout.component';
import { Box, Button } from '@mui/material';
import { SPACES, SPACESNUMBER } from '../theme/spaces.const';
import { useNavigate, useParams } from 'react-router-dom';
import { IAssessmentParams } from './asessment.types';
import { useGetAssessment } from '../common/queries/tests.query';
import { HISTORY_KEYS } from '../common/constants/app-keys.constants';
import { AssessmentResultComponent } from '../common/components/assessment-result/assessment-result.component';

export const AssessmentPageComponent = () => {
  const { assessmentId } = useParams<IAssessmentParams>();
  const { data, isLoading } = useGetAssessment(assessmentId || '');
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
          <AssessmentResultComponent assessment={data} />
        </Box>
      )}
    </MainLayoutComponent>
  );
};
