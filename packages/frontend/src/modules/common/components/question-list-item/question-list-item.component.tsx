import React, { FC, useMemo, useState } from 'react';
import { IQuestionListItemComponent } from './question-list-item.types';
import { Box, Button, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { SPACES, SPACESNUMBER } from '../../../theme/spaces.const';
import { OptionListItemComponent } from '../option-list-item/option-list-item.component';
import { Popup } from '../../popup/popup.component';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { IQuestionFormEditing, QuestionFormActions } from '../question-form/question-form.types';
import { editQuestionFormInitialVariables } from '../question-form/question-form.constants';
import { questionFormValidate } from '../../validators/test.validator';
import { useChangeQuestionType, useRemoveQuestion, useUpdateQuestion } from '../../mutations/tests/tests.mutation';
import { AddOptionComponent } from '../add-option/add-option.component';
import { getQuestionTypeByText } from '../../functions/question.functions';
import { QuestionTypes } from '../../types/question.types';

export const QuestionListItemComponent: FC<IQuestionListItemComponent> 
= ({ question, number, questionTypes, testId }) => {
  const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(false);
  const [isAddOptionOpen, setIsAddOptionOpen] = useState(false);
  const updateQuestionMutation = useUpdateQuestion(testId, () => setIsEditQuestionOpen(false));
  const removeQuestionMutation = useRemoveQuestion(testId);
  const changeQuestionTypeMutation = useChangeQuestionType(testId);

  const onUpdateQuestionSubmit = async (values: IQuestionFormEditing) => {
    updateQuestionMutation.mutate({ questionId: question._id, title: values.title });
  };
  const onRemoveQuestion = () => {
    removeQuestionMutation.mutate({ questionId: question._id });
  };
  const onQuestionTypeChange = (e: SelectChangeEvent<string>) => {
    changeQuestionTypeMutation.mutate({ questionId: question._id, questionTypeId: e.target.value });
  };

  const currentQuestionType = useMemo(
    () => getQuestionTypeByText(question.questionType.text), 
    [question.questionType.text]
  );

  return (
    <Paper sx={{
      padding: SPACES.m
    }}>
      <Stack spacing={SPACESNUMBER.s}>
        <Typography variant='h5'><b>Question number: </b>{number}</Typography>
        <Typography variant='h5'><b>Title: </b>{question.title}</Typography>
        <Box display="flex" gap={SPACESNUMBER.xxs}>
          <Typography variant='h5' alignSelf="center"><b>Type: </b></Typography>
          <Select
            displayEmpty
            value={question.questionType._id}
            onChange={onQuestionTypeChange}
          >
            {questionTypes.map((questionType) => (
              <MenuItem key={questionType._id} value={questionType._id}>
                {questionType.text}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Typography variant='h6'>Options:</Typography>
        {question.options.map((option) => 
          <OptionListItemComponent 
            key={option._id} 
            option={option} 
            questionId={question._id}
            testId={testId}
            questionType={currentQuestionType}
          />
        )}
        <Box 
          display="flex" 
          justifyContent="center"
          gap={SPACESNUMBER.s}
          flexDirection={{ sm: 'row', xs: 'column' }}
        >
          <Button 
            variant='contained' 
            onClick={() => setIsAddOptionOpen(true)}
            disabled={currentQuestionType === QuestionTypes.TRUE_FALSE}
          >
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
          testId={testId} 
          questionId={question._id} 
          callback={() => setIsAddOptionOpen(false)} 
        />
      </Popup>
    </Paper>
  );
};
