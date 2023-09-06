import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ContainerCenterComponent } from '../common/components/container-center/container-center.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthFormActions, AuthFormTitles, IAuthFormRegistration } from './auth-form/auth-form.interfaces';
import { authLoginFormInitialVariables, authSecondButtonBack } from './auth.consts';
import { authFormValidate } from '../common/validators/auth.validator';
import { useLoginMutation } from '../common/mutations/user/user.mutations';

export const LoginPageContainer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { loginFunc, onSuccess, onError } = useLoginMutation(queryClient, navigate);
  const mutation = useMutation(loginFunc, { onSuccess, onError });
  const onSubmit = async (values: IAuthFormRegistration) => {
    console.log(values);
    mutation.mutate({ data: values });
  };

  return (
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
  );
};
