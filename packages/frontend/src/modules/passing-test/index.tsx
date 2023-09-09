import React, { useMemo, useState } from 'react';
import { MainLayoutComponent } from '../common/components/main-layout/main-layout.component';
import { ITestData, ITestPassingParams } from './passing-test.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTestForPassing } from '../common/queries/tests.query';
import { SPACES, SPACESNUMBER } from '../theme/spaces.const';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { WEIGHTS } from '../theme/fonts.const';
import { HISTORY_KEYS } from '../common/constants/app-keys.constants';
import { TestQuestionComponent } from '../common/components/test-question/test-question.component';
import { getAtLeastOneSelected, storeTestData } from './passing-test.functions';
import { useSubmitTest } from '../common/mutations/tests/tests.mutation';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { TimerComponent } from '../common/components/timer/timer.component';

export const PassingTestPageComponent = () => {
  const [time, setTime] = useState(0);
  const { testId } = useParams<ITestPassingParams>();
  const { data, isLoading } = useGetTestForPassing(testId || '');
  const [testData, setTestData] = useState<ITestData>({ answers: [] });
  const navigate = useNavigate();
  const callback = useMemo(() => storeTestData(testData, setTestData), [testData, setTestData]);
  const atLeastOneSelected = useMemo(() => getAtLeastOneSelected(testData), [testData]);

  const onSubmitTest = () => {
    mutation.mutate({ testId: testId!, answers: testData.answers, timer: time / 1000 });
  };
  const mutation = useSubmitTest((assessmentId: string) => {
    navigate(HISTORY_KEYS.ASSESSMENT.replace(':assessmentId', assessmentId));
  });


  return (
    <MainLayoutComponent>
      {isLoading && (
        <LoaderComponent />
      )}
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
              <Box display="flex" justifyContent="space-between">
                <Typography variant='h4' fontWeight={WEIGHTS.bold}>Passing the test</Typography>
                <TimerComponent time={time} setTime={setTime}/>
              </Box>
              <Typography variant='h5'>{data.title}</Typography>
            </Stack>
          </Paper>
          {data.questions.map((question) => {
            if (typeof question === 'string') return <></>;
            return <TestQuestionComponent key={question._id} question={question} callback={callback} />;
          })}
          <Button 
            variant='contained' 
            onClick={onSubmitTest}
            disabled={!atLeastOneSelected}
          >
            Submit the test
          </Button>
        </Box>
      )}
    </MainLayoutComponent>
  );
};
