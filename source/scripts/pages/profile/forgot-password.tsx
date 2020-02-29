import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Input, { FormInputs } from './shared/input';
import UserForm, { FormStateTypes } from './shared/form';
import { InputSubmit } from './shared/styles';
import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from 'scripts/generated/types';

const initialFormState = {
  email: '',
};

const styles = {
  paddingTop: '40px',
};

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      status
      message
    }
  }
`;

const ForgotPassword = () => {
  const history = useHistory();
  const [submitUser, { error, loading, data }] = useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(FORGOT_PASSWORD);

  if (data) {
    history.push('/');
  }

  const formSumit = ({ email }: FormInputs) => {
    if (email) {
      submitUser({
        variables: {
          input: { email },
        },
      });
    }
  };

  const successText =
    data?.forgotPassword?.status === 'EMAIL_SENT'
      ? data?.forgotPassword?.message
      : undefined;

  return (
    <UserForm
      initalFormValue={initialFormState}
      successfulForm={formSumit}
      loading={loading}
      successMessage={successText}
      styleAdjustments={styles}
    >
      {({ formState, setFormState }: FormStateTypes) => {
        return (
          <React.Fragment>
            <Input
              type="email"
              placeholder="johnnyu4life@gmail.com"
              name="email"
              label="email"
              formState={formState}
              setFormState={setFormState}
            />

            <InputSubmit />
            <p>
              Need to Login? <Link to="/login"> Login</Link>
            </p>
          </React.Fragment>
        );
      }}
    </UserForm>
  );
};

export default ForgotPassword;
