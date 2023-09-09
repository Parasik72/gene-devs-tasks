import React, { FC, useEffect, useState } from 'react';
import { IOptionListItemComponent } from './option-list-item.types';
import { Box, Button, Card, Checkbox, Radio, Typography } from '@mui/material';
import { SPACESNUMBER } from '../../../theme/spaces.const';
import { useAddAnswer, useRemoveAnswer, useRemoveOption } from '../../mutations/tests/tests.mutation';
import { WEIGHTS } from '../../../theme/fonts.const';
import { QuestionTypes } from '../../types/question.types';

export const OptionListItemComponent: FC<IOptionListItemComponent> = ({ option, questionId, questionType, testId }) => {
  const [isAnswer, setIsAnswer] = useState(option.isAnswer);
  const addAnswerMutation = useAddAnswer(testId, () => setIsAnswer(prev => !prev));
  const removeAnswerMutation = useRemoveAnswer(testId, () => setIsAnswer(prev => !prev));
  const removeOptionMutation = useRemoveOption(testId);

  const onAnswerChange = () => {
    if (!isAnswer) return addAnswerMutation.mutate({ optionId: option._id, questionId });
    if (isAnswer && questionType !== QuestionTypes.MULTIPLE_CHOICE) return;
    removeAnswerMutation.mutate({ answerId: option._id });
  };
  const onOptionRemove = () => {
    removeOptionMutation.mutate({ optionId: option._id });
  };

  useEffect(() => {
    setIsAnswer(option.isAnswer);
  }, [option.isAnswer]);

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
            {
              questionType === QuestionTypes.MULTIPLE_CHOICE 
                ? <Checkbox checked={isAnswer} onClick={onAnswerChange}/>
                : <Radio checked={isAnswer} onClick={onAnswerChange}/>
            }
          </Box>
          <Button 
            variant='contained'
            color="error"
            sx={{
              margin: SPACESNUMBER.xxs
            }}
            onClick={onOptionRemove}
            disabled={questionType === QuestionTypes.TRUE_FALSE}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
