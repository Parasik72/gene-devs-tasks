import React from 'react';
import { Box, Typography } from '@mui/material';
import { AuthFormActions, AuthFormType, IAuthForm } from './auth-form.interfaces';
import { StyledAuthFormContainer, StyledAuthTitleContainer } from './auth-form.styled';
import { FormikFormComponent } from '../../common/components/formik-form/formik-form.component';
import { FormikFormInputComponent } from '../../common/components/formik-form-input/formik-form-input.component';
import { FormikFormInputTypes } from '../../common/components/formik-form-input/formik-form-input.interfaces';

export function AuthFormComponent<T extends AuthFormType>({
  data,
  onSubmit,
  validate,
  title,
  secondBtn
}: IAuthForm<T>) {
  return (
    <StyledAuthFormContainer variant="outlined">
      <FormikFormComponent
        initialValues={data.initialValues}
        onSubmit={onSubmit}
        validate={validate}
        secondBtn={secondBtn}
      >
        <Box width="100%" textAlign="center" component={StyledAuthTitleContainer}>
          <Typography variant="h4">{title}</Typography>
        </Box>
        <FormikFormInputComponent
          title="Email"
          htmlFor="email"
          name="email"
          id="email"
          placeholder="Enter email"
          type={FormikFormInputTypes.text}
        />
        <FormikFormInputComponent
          title="Password"
          htmlFor="password"
          name="password"
          id="password"
          placeholder="Enter password"
          type={FormikFormInputTypes.password}
        />
        {data.type === AuthFormActions.REGISTRATION && (
          <FormikFormInputComponent
            title="Confirm password"
            htmlFor="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter confirm password"
            type={FormikFormInputTypes.password}
          />
        )}
      </FormikFormComponent>
    </StyledAuthFormContainer>
  );
}
