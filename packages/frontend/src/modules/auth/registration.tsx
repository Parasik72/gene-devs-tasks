import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerCenterComponent } from '../common/components/container-center/container-center.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthFormActions, AuthFormTitles, IAuthFormRegistration } from './auth-form/auth-form.types';
import { authRegistrationFormInitialVariables, authSecondButtonBack } from './auth.constants';
import { authFormValidate } from '../common/validators/auth.validator';
import { useRegisterMutation } from '../common/mutations/user/user.mutations';

export const RegistrationPageContainer = () => {
  const navigate = useNavigate();
  const mutation = useRegisterMutation();
  const onSubmit = async (values: IAuthFormRegistration) => {
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
