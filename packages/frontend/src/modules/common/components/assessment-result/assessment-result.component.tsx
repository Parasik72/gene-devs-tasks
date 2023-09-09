import React, { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { IAssessmentResultComponent } from './assessment-result.types';
import { SPACES, SPACESNUMBER } from '../../../theme/spaces.const';
import { getStringTime } from '../../functions/get-string-time.function';
import { FONT_SIZES } from '../../../theme/fonts.const';

export const AssessmentResultComponent: FC<IAssessmentResultComponent> = ({ assessment }) => {
  const testTitle = typeof assessment.test !== 'string' ? assessment.test.title : assessment.test;
  const passedBy = typeof assessment.candidate !== 'string' ? assessment.candidate.email : assessment.candidate;
  const passedAt = new Date(assessment.createdAt || '').toLocaleDateString();
  const score = assessment.score.toFixed(2);
  const timeStr = getStringTime(assessment.timer * 1000);

  return (
    <Paper sx={{
      padding: SPACES.m
    }}>
      <Stack spacing={SPACESNUMBER.m}>
        <Typography variant='h4' fontSize={{ sm: FONT_SIZES.xxl, xs: FONT_SIZES.l }}><b>Test: </b>{testTitle}</Typography>
        <Typography variant='h4' fontSize={{ sm: FONT_SIZES.xxl, xs: FONT_SIZES.l }}><b>Passed by: </b>{passedBy}</Typography>
        <Typography variant='h4' fontSize={{ sm: FONT_SIZES.xxl, xs: FONT_SIZES.l }}><b>Score: </b>{score}%</Typography>
        <Typography variant='h4' fontSize={{ sm: FONT_SIZES.xxl, xs: FONT_SIZES.l }}><b>Passed at: </b>{passedAt}</Typography>
        <Typography variant='h4' fontSize={{ sm: FONT_SIZES.xxl, xs: FONT_SIZES.l }}><b>Passed time: </b>{timeStr}</Typography>
      </Stack>
    </Paper>
  );
};
