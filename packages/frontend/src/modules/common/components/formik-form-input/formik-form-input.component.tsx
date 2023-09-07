import React from 'react';
import { Box, FormLabel } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { FC } from 'react';
import { FormikFormErrorText, FormikFormInputItem } from './formik-form-input.styled';
import { FormikFormInputTypes, IFormikFormInputComponent } from './formik-form-input.types';

export const FormikFormInputComponent: FC<IFormikFormInputComponent> = ({
  title,
  htmlFor,
  name,
  placeholder,
  id,
  type
}) => (
  <Box component={FormikFormInputItem}>
    <FormLabel htmlFor={htmlFor}>{title}</FormLabel>
    <Field
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete="on"
      style={{ width: type === FormikFormInputTypes.checkbox ? 'auto' : '100%' }}
    />
    <ErrorMessage name={name} component={FormikFormErrorText} />
  </Box>
);
