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
  return (
    <Paper sx={{
      padding: SPACES.m,
      width: '100%'
    }}>
      <Box display="flex" justifyContent="space-between">
        <Stack spacing={SPACESNUMBER.xs}>
          <Typography variant='h5' fontWeight={WEIGHTS.bold}>{test.title}</Typography>
          <Typography variant='h6'>{test.description}</Typography>
          <Typography variant='h6' fontSize={SIZESNUMBER.xxl}>
            Amount of questions: {test.questions.length}
          </Typography>
        </Stack>
        <Box display="flex" justifyContent="space-between" flexDirection="column">
          <Box display="flex" gap={SPACES.s} flex={1} alignItems="center">
            {isCreator && <Button fullWidth variant='contained' onClick={onEdit}>Edit</Button>}
            {user && user.isAuth && (
              <Button fullWidth variant='contained' disabled={isTestEmpty}>
                Start
              </Button>
            )}
          </Box>
          <Typography variant='h6' fontSize={SIZESNUMBER.xxl}>
            <b>Created by:</b> {test.createdBy}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
