import React, { useState } from 'react';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { ITestEditingParams } from './test-editing.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllQuestionTypes, useGetTestForEdit } from '../common/queries/tests.query';
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
import { LoaderComponent } from '../common/components/loader/loader.component';

export const TestEditingPageComponent = () => {
  const { testId } = useParams<ITestEditingParams>();
  const { data: testData, isLoading: isTestLoading } = useGetTestForEdit(testId || '');
  const { data: questionTypesData, isLoading: isQuestionTypesLoading } = useGetAllQuestionTypes();
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [isEditTestOpen, setIsEditTestOpen] = useState(false);
  const editTestmutation = useEditTest(testData?._id || '', () => setIsEditTestOpen(false));
  const addQuestionMutation = useAddQuestion(testData?._id || '', () => setIsAddQuestionOpen(false));
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

  const isLoading = isTestLoading || isQuestionTypesLoading;

  return (
    <MainLayoutComponent>
      {isLoading && (
        <LoaderComponent />
      )}
      {!isLoading && testData && questionTypesData && (
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
              <Typography variant='h4'><b>Title:</b> {testData.title}</Typography>
              <Typography variant='h5'><b>Description:</b> {testData.description}</Typography>
              <Box
                display="flex"
                justifyContent="center"
                gap={SPACESNUMBER.s}
                flexDirection={{ sm: 'row', xs: 'column' }}
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
            {testData.questions.map((question, index) => {
              if (typeof question === 'string') return <></>;
              return (
                <QuestionListItemComponent 
                  key={question._id} 
                  question={question} 
                  questionTypes={questionTypesData}
                  number={index + 1}
                  testId={testData._id}
                />
              );
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
      {testData && (
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
                title: testData.title,
                description: testData.description
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
