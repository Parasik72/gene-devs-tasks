import React, { FC, useState } from 'react';
import { IOptionListItemComponent } from './option-list-item.types';
import { Box, Button, Card, Checkbox, Typography } from '@mui/material';
import { SPACESNUMBER } from '../../../theme/spaces.const';
import { useAddAnswer, useRemoveAnswer, useRemoveOption } from '../../mutations/tests/tests.mutation';
import { WEIGHTS } from '../../../theme/fonts.const';

export const OptionListItemComponent: FC<IOptionListItemComponent> = ({ option, questionId }) => {
  const [isAnswer, setIsAnswer] = useState(option.isAnswer);
  const addAnswerMutation = useAddAnswer(() => setIsAnswer(prev => !prev));
  const removeAnswerMutation = useRemoveAnswer(() => setIsAnswer(prev => !prev));
  const removeOptionMutation = useRemoveOption();

  const onAnswerChange = () => {
    if (!isAnswer) return addAnswerMutation.mutate({ optionId: option._id, questionId });
    removeAnswerMutation.mutate({ answerId: option._id });
  };
  const onOptionRemove = () => {
    removeOptionMutation.mutate({ optionId: option._id });
  };

  return (
    <Card variant='outlined'>
      <Box 
        display="flex" 
        justifyContent="space-between"
        pl={SPACESNUMBER.xxs}
        gap={{ md: SPACESNUMBER.l, sm: SPACESNUMBER.xxs }}
        flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}
      >
        <Typography variant='h6' alignSelf='center' py={SPACESNUMBER.xxs} fontWeight={WEIGHTS.bold}>
          {option.text}
        </Typography>
        <Box 
          display="flex" 
          gap={SPACESNUMBER.xxs}
          justifyContent={{ md: 'flex-start', sm: 'center', xs: 'center' }}
          flexDirection={{ sm: 'row', xs: 'column' }}
        >
          <Box display='flex' justifyContent={{ sm: 'flex-start', xs: 'center' }}>
            <Typography variant='h6' alignSelf="center" minWidth={100}>Is answer: </Typography>
            <Checkbox checked={isAnswer} onClick={onAnswerChange}/>
          </Box>
          <Button 
            variant='contained'
            color="error"
            sx={{
              margin: SPACESNUMBER.xxs
            }}
            onClick={onOptionRemove}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
