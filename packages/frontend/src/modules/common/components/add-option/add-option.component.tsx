import React, { FC } from 'react';
import { Box } from '@mui/material';
import { FormikFormComponent } from '../formik-form/formik-form.component';
import { FormikFormInputComponent } from '../formik-form-input/formik-form-input.component';
import { addOptionFormVariables } from './add-option.constants';
import { FormikFormInputTypes } from '../formik-form-input/formik-form-input.types';
import { addOptionFormValidate } from '../../validators/test.validator';
import { useAddOption } from '../../mutations/tests/tests.mutation';
import { IAddOptionComponent, IAddOptionFormCreation } from './add-option.types';

export const AddOptionComponent: FC<IAddOptionComponent> = ({
  questionId,
  callback,
  testId
}) => {
  const mutation = useAddOption(testId, callback);
  const onSubmit = async (values: IAddOptionFormCreation) => {
    mutation.mutate({ questionId, text: values.text });
  };
  return (
    <Box>
      <FormikFormComponent
        initialValues={addOptionFormVariables()}
        onSubmit={onSubmit}
        validate={addOptionFormValidate}
        secondBtn={{
          show: false,
          text: '',
          onClick: () => {
            // emtpy
          }
        }}
      >
        <FormikFormInputComponent
          title="Text"
          htmlFor="text"
          name="text"
          id="text"
          placeholder="Enter text"
          type={FormikFormInputTypes.text}
        />
      </FormikFormComponent>
    </Box>
  );
};
