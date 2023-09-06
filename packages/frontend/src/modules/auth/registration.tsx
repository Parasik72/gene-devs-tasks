import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ContainerCenterComponent } from '../common/components/container-center/container-center.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthFormActions, AuthFormTitles, IAuthFormRegistration } from './auth-form/auth-form.interfaces';
import { authRegistrationFormInitialVariables, authSecondButtonBack } from './auth.consts';
import { authFormValidate } from '../common/validators/auth.validator';
import { useRegisterMutation } from '../common/mutations/user/user.mutations';

export const RegistrationPageContainer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { registrateFunc, onSuccess, onError } = useRegisterMutation(queryClient, navigate);
  const mutation = useMutation(registrateFunc, { onSuccess, onError });
  const onSubmit = async (values: IAuthFormRegistration) => {
    console.log(values);
    mutation.mutate({ data: values });
  };

  return (
    <ContainerCenterComponent>
      <AuthFormComponent
        data={{
          type: AuthFormActions.REGISTRATION,
          formTitle: AuthFormTitles.REGISTRATION,
          initialValues: authRegistrationFormInitialVariables()
        }}
        secondBtn={authSecondButtonBack(navigate)}
        onSubmit={onSubmit}
        validate={authFormValidate}
        title="Registration"
      />
    </ContainerCenterComponent>
  );
};
