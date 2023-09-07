import React from 'react';
import { Box } from '@mui/material';
import { FormikFormComponent } from '../formik-form/formik-form.component';
import { ITestFormComponent, TestFormType } from './test-form.types';
import { FormikFormInputComponent } from '../formik-form-input/formik-form-input.component';
import { FormikFormInputTypes } from '../formik-form-input/formik-form-input.types';

export function TestFormComponent<T extends TestFormType>({ 
  data,
  onSubmit,
  validate
}: ITestFormComponent<T>) {
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
        <FormikFormInputComponent
          title="Description"
          htmlFor="description"
          name="description"
          id="description"
          placeholder="Enter description"
          type={FormikFormInputTypes.text}
        />
      </FormikFormComponent>
    </Box>
  );
}
