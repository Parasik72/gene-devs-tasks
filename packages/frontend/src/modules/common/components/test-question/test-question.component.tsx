import React, { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { SPACES, SPACESNUMBER } from '../../../theme/spaces.const';
import { ITestQuestionComponent } from './test-question.types';
import { WEIGHTS } from '../../../theme/fonts.const';
import { TestOptionComponent } from '../test-option/test-option.component';

export const TestQuestionComponent: FC<ITestQuestionComponent> = ({ question, callback: outCallback }) => {
  const callback = (optionId: string, value: boolean) => {
    outCallback(question._id, optionId, value);
  };
  return (
    <Paper sx={{
      padding: SPACES.m
    }}>
      <Stack spacing={SPACESNUMBER.m}>
        <Typography variant='h4' fontWeight={WEIGHTS.bold}>
          {question.title}
        </Typography>
        <Stack spacing={SPACESNUMBER.s}>
          {question.options.map((option) => (
            <TestOptionComponent key={option._id} option={option} callback={callback} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};
