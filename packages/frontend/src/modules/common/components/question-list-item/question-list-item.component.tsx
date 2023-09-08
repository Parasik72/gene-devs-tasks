import React, { FC, useState } from 'react';
import { IQuestionListItemComponent } from './question-list-item.types';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { SPACES, SPACESNUMBER } from '../../../theme/spaces.const';
import { OptionListItemComponent } from '../option-list-item/option-list-item.component';
import { Popup } from '../../popup/popup.component';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { IQuestionFormEditing, QuestionFormActions } from '../question-form/question-form.types';
import { editQuestionFormInitialVariables } from '../question-form/question-form.constants';
import { questionFormValidate } from '../../validators/test.validator';
import { useRemoveQuestion, useUpdateQuestion } from '../../mutations/tests/tests.mutation';
import { AddOptionComponent } from '../add-option/add-option.component';

export const QuestionListItemComponent: FC<IQuestionListItemComponent> = ({ question, number }) => {
  const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(false);
  const [isAddOptionOpen, setIsAddOptionOpen] = useState(false);
  const updateQuestionMutation = useUpdateQuestion(() => setIsEditQuestionOpen(false));
  const removeQuestionMutation = useRemoveQuestion();

  const onUpdateQuestionSubmit = async (values: IQuestionFormEditing) => {
    updateQuestionMutation.mutate({ questionId: question._id, title: values.title });
  };
  const onRemoveQuestion = () => {
    removeQuestionMutation.mutate({ questionId: question._id });
  };

  return (
    <Paper sx={{
      padding: SPACES.m
    }}>
      <Stack spacing={SPACESNUMBER.s}>
        <Typography variant='h5'><b>Question number: </b>{number}</Typography>
        <Typography variant='h5'><b>Title: </b>{question.title}</Typography>
        <Typography variant='h6'>Options:</Typography>
        {question.options.map((option) => 
          <OptionListItemComponent key={option._id} option={option} questionId={question._id} />
        )}
        <Box 
          display="flex" 
          justifyContent="center"
          gap={SPACESNUMBER.s}
          flexDirection={{ sm: 'row', xs: 'column' }}
        >
          <Button variant='contained' onClick={() => setIsAddOptionOpen(true)}>
            Add option
          </Button>
          <Button variant='contained' onClick={() => setIsEditQuestionOpen(true)}>
            Edit question
          </Button>
          <Button 
            variant='contained' 
            color="error"
            onClick={onRemoveQuestion}
          >
            Remove question
          </Button>
        </Box>
      </Stack>
      <Popup 
        isOpen={isEditQuestionOpen} 
        close={() => setIsEditQuestionOpen(false)} 
        title='Add question'
        width={500}
      >
        <QuestionFormComponent 
          data={{
            type: QuestionFormActions.EDITING,
            initialValues: editQuestionFormInitialVariables({
              title: question.title
            })
          }}
          onSubmit={onUpdateQuestionSubmit}
          validate={questionFormValidate}
        />
      </Popup>
      <Popup 
        isOpen={isAddOptionOpen} 
        close={() => setIsAddOptionOpen(false)} 
        title='Add question'
        width={500}
      >
        <AddOptionComponent 
          questionId={question._id} 
          callback={() => setIsAddOptionOpen(false)} 
        />
      </Popup>
    </Paper>
  );
};
