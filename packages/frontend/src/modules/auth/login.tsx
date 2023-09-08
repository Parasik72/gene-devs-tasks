import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerCenterComponent } from '../common/components/container-center/container-center.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthFormActions, AuthFormTitles, IAuthFormRegistration } from './auth-form/auth-form.types';
import { authLoginFormInitialVariables, authSecondButtonBack } from './auth.constants';
import { authFormValidate } from '../common/validators/auth.validator';
import { useLoginMutation } from '../common/mutations/user/user.mutations';
import { Container } from '@mui/material';

export const LoginPageContainer = () => {
  const navigate = useNavigate();
  const mutation = useLoginMutation();
  const onSubmit = async (values: IAuthFormRegistration) => {
    mutation.mutate({ data: values });
  };

  return (
    <Container>
      <ContainerCenterComponent>
        <AuthFormComponent
          data={{
            type: AuthFormActions.LOGIN,
            formTitle: AuthFormTitles.LOGIN,
            initialValues: authLoginFormInitialVariables()
          }}
          secondBtn={authSecondButtonBack(navigate)}
          onSubmit={onSubmit}
          validate={authFormValidate}
          title="Login"
        />
      </ContainerCenterComponent>
    </Container>
  );
};
