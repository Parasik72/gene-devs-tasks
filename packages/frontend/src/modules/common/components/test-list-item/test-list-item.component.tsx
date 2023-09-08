import React, { FC } from 'react';
import { SPACES, SPACESNUMBER } from '../../../theme/spaces.const';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { ITestListItem } from './test-list-item.types';
import { SIZESNUMBER } from '../../../theme/sizes.const';
import { WEIGHTS } from '../../../theme/fonts.const';
import { useQueryClient } from 'react-query';
import UserModel from '../../services/user/user.model';
import { HISTORY_KEYS, QUERY_KEYS } from '../../constants/app-keys.constants';
import { useNavigate } from 'react-router-dom';

export const TestListItemComponent: FC<ITestListItem> = ({ test }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserModel>(QUERY_KEYS.USER);
  const isCreator = user && user.email === test.createdBy;
  const isTestEmpty = test.questions.length === 0;
  const navigate = useNavigate();

  const onEdit = () => navigate(HISTORY_KEYS.EDIT_TEST.replace(':testId', test._id));
  const onAssessments = () => navigate(HISTORY_KEYS.TEST_ASSESSMENTS.replace(':testId', test._id));
  const onStart = () => navigate(HISTORY_KEYS.PASSING_TEST.replace(':testId', test._id));

  return (
    <Paper sx={{
      padding: SPACES.m,
      width: '100%'
    }}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        gap={SPACES.m}
        flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}
      >
        <Stack spacing={SPACESNUMBER.xs}>
          <Typography variant='h5' fontWeight={WEIGHTS.bold}>{test.title}</Typography>
          <Typography variant='h6'>{test.description}</Typography>
          <Typography variant='h6' fontSize={SIZESNUMBER.xxl}>
            Amount of the questions: {test.questions.length}
          </Typography>
        </Stack>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          flexDirection={{ md: 'column', sm: 'row', xs: 'column' }}
          gap={{ sm: 0, xs: SPACES.s }}
        >
          <Box display="flex" gap={SPACES.s} flex={1} alignItems="center">
            {isCreator && <Button variant='contained' onClick={onEdit}>Edit</Button>}
            {user && user.isAuth && (
              <>
                <Button 
                  variant='contained' 
                  onClick={onAssessments}
                >
                  Results
                </Button>
                <Button 
                  variant='contained' 
                  disabled={isTestEmpty}
                  onClick={onStart}
                >
                  Start
                </Button>
              </>
            )}
          </Box>
          <Typography alignSelf={{ sm: 'end', xs: 'start' }} variant='h6' fontSize={SIZESNUMBER.xxl}>
            <b>Created by:</b> {test.createdBy}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
