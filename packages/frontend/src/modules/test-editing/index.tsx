import React, { useState } from 'react';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { ITestEditingParams } from './test-editing.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFullTest } from '../common/queries/tests.query';
import { SPACES, SPACESNUMBER } from '../theme/spaces.const';
import { QuestionListItemComponent } from '../common/components/question-list-item/question-list-item.component';
import { Popup } from '../common/popup/popup.component';
import { QuestionFormComponent } from '../common/components/question-form/question-form.component';
import { TestFormComponent } from '../common/components/test-form/test-form.component';
import { ITestFormEditing, TestFormActions } from '../common/components/test-form/test-form.types';
import { testEditingFormInitialVariables } from '../common/components/test-form/test-form.constants';
import { questionFormValidate, testFormValidate } from '../common/validators/test.validator';
import { useAddQuestion, useEditTest, useRemoveTest } from '../common/mutations/tests/tests.mutation';
import { IQuestionFormCreation, QuestionFormActions } from '../common/components/question-form/question-form.types';
import { addQuestionFormInitialVariables } from '../common/components/question-form/question-form.constants';
import { HISTORY_KEYS } from '../common/constants/app-keys.constants';
import { MainLayoutComponent } from '../common/components/main-layout/main-layout.component';

export const TestEditingPageComponent = () => {
  const { testId } = useParams<ITestEditingParams>();
  const { data, isLoading } = useGetFullTest(testId || '');
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [isEditTestOpen, setIsEditTestOpen] = useState(false);
  const editTestmutation = useEditTest(() => setIsEditTestOpen(false));
  const addQuestionMutation = useAddQuestion(() => setIsAddQuestionOpen(false));
  const removeTestMutation = useRemoveTest(() => navigate(HISTORY_KEYS.ROOT));
  const navigate = useNavigate();

  const onAddQuestionSubmit = async (values: IQuestionFormCreation) => {
    addQuestionMutation.mutate({ title: values.title, testId: testId! });
  };
  const onEditTestSubmit = async (values: ITestFormEditing) => {
    editTestmutation.mutate({ data: values, testId: testId! });
  };
  const onRemoveTest = () => {
    removeTestMutation.mutate({ testId: testId! });
  };

  return (
    <MainLayoutComponent>
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
              <Typography variant='h4'><b>Title:</b> {data.title}</Typography>
              <Typography variant='h5'><b>Description:</b> {data.description}</Typography>
              <Box
                display="flex"
                justifyContent="center"
                gap={SPACESNUMBER.s}
              >
                <Button variant='contained' onClick={() => setIsAddQuestionOpen(true)}>
                    Add question
                </Button>
                <Button variant='contained' onClick={() => setIsEditTestOpen(true)}>
                    Edit test
                </Button>
                <Button variant='contained' color='error' onClick={onRemoveTest}>
                    Remove test
                </Button>
              </Box>
            </Stack>
          </Paper>
          <Box
            display="flex"
            flexDirection="column"
            gap={SPACESNUMBER.s}
          >
            {data.questions.map((question, index) => {
              if (typeof question === 'string') return <></>;
              return <QuestionListItemComponent key={question._id} question={question} number={index + 1}/>;
            })}
          </Box>
        </Box> 
      )}
      <Popup 
        isOpen={isAddQuestionOpen} 
        close={() => setIsAddQuestionOpen(false)} 
        title='Add question'
        width={500}
      >
        <QuestionFormComponent 
          data={{
            type: QuestionFormActions.CREATION,
            initialValues: addQuestionFormInitialVariables()
          }}
          onSubmit={onAddQuestionSubmit}
          validate={questionFormValidate}
        />
      </Popup>
      {data && (
        <Popup 
          isOpen={isEditTestOpen} 
          close={() => setIsEditTestOpen(false)} 
          title='Edit test'
          width={500}
        >
          <TestFormComponent 
            data={{
              type: TestFormActions.EDITING,
              initialValues: testEditingFormInitialVariables({
                title: data.title,
                description: data.description
              })
            }}
            onSubmit={onEditTestSubmit}
            validate={testFormValidate}
          />
        </Popup>
      )}
    </MainLayoutComponent>
  );
};
