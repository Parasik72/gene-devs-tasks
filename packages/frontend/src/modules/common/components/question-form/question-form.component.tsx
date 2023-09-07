import React from 'react';
import { Box } from '@mui/material';
import { FormikFormComponent } from '../formik-form/formik-form.component';
import { FormikFormInputComponent } from '../formik-form-input/formik-form-input.component';
import { FormikFormInputTypes } from '../formik-form-input/formik-form-input.types';
import { IQuestionFormComponent, QuestionFormType } from './question-form.types';

export function QuestionFormComponent<T extends QuestionFormType>({
  data,
  onSubmit,
  validate
}: IQuestionFormComponent<T>) {
  return (
    <Box>
      <FormikFormComponent
        initialValues={data.initialValues}
        onSubmit={onSubmit}
        validate={validate}
        secondBtn={{
          show: false,
          text: '',
          onClick: () => {
            // emtpy
          }
        }}
      >
        <FormikFormInputComponent
          title="Title"
          htmlFor="title"
          name="title"
          id="title"
          placeholder="Enter title"
          type={FormikFormInputTypes.text}
        />
      </FormikFormComponent>
    </Box>
  );
}
