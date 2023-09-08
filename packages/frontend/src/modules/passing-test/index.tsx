import React, { useState } from 'react';
import { MainLayoutComponent } from '../common/components/main-layout/main-layout.component';
import { ITestData, ITestPassingParams } from './passing-test.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTestForPassing } from '../common/queries/tests.query';
import { SPACES, SPACESNUMBER } from '../theme/spaces.const';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { WEIGHTS } from '../theme/fonts.const';
import { HISTORY_KEYS } from '../common/constants/app-keys.constants';
import { TestQuestionComponent } from '../common/components/test-question/test-question.component';
import { storeTestData } from './passing-test.functions';
import { useSubmitTest } from '../common/mutations/tests/tests.mutation';

export const PassingTestPageComponent = () => {
  const { testId } = useParams<ITestPassingParams>();
  const { data, isLoading } = useGetTestForPassing(testId || '');
  const [testData, setTestData] = useState<ITestData>({ answers: [] });
  const navigate = useNavigate();
  const mutation = useSubmitTest((assessmentId: string) => {
    navigate(HISTORY_KEYS.ASSESSMENT.replace(':assessmentId', assessmentId));
  });
  const callback = storeTestData(testData, setTestData);

  const onSubmitTest = () => {
    mutation.mutate({ testId: testId!, answers: testData.answers });
  };

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
                ← Back
            </Button>
          </Box>
          <Paper sx={{
            padding: SPACES.m
          }}>
            <Stack spacing={SPACESNUMBER.m}>
              <Typography variant='h4' fontWeight={WEIGHTS.bold}>Passing the test</Typography>
              <Typography variant='h5'>{data.title}</Typography>
            </Stack>
          </Paper>
          {data.questions.map((question) => {
            if (typeof question === 'string') return <></>;
            return <TestQuestionComponent key={question._id} question={question} callback={callback} />;
          })}
          <Button variant='contained' onClick={onSubmitTest}>
            Submit the test
          </Button>
        </Box>
      )}
    </MainLayoutComponent>
  );
};
