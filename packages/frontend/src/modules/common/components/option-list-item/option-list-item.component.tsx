import React, { FC, useState } from 'react';
import { IOptionListItemComponent } from './option-list-item.types';
import { Box, Button, Card, Checkbox, Typography } from '@mui/material';
import { SPACESNUMBER } from '../../../theme/spaces.const';
import { useAddAnswer, useRemoveAnswer, useRemoveOption } from '../../mutations/tests/tests.mutation';

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
        gap={SPACESNUMBER.l}
      >
        <Typography variant='h6' alignSelf="center">{option.text}</Typography>
        <Box display="flex" gap={SPACESNUMBER.xxs}>
          <Typography variant='h6' alignSelf="center">Is answer: </Typography>
          <Checkbox checked={isAnswer} onClick={onAnswerChange}/>
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
