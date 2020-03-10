import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import gql from 'graphql-tag';
import { setModalAction } from 'scripts/store';
import { Input, FormInputs } from './shared/input';
import { UserForm, FormStateTypes } from './shared/form';
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

export const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [submitUser, { error, loading, data }] = useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(FORGOT_PASSWORD);

  useEffect(() => {
    if (data?.forgotPassword?.status === 'EMAIL_SENT') {
      dispatch(
        setModalAction({
          headlineText: {
            headline: `Action Required`,
            text: 'An email has been sent to the email address you entered',
          },
        }),
      );

      history.push('/');
    }
  }, [data, dispatch, history]);

  const formSumit = ({ email }: FormInputs) => {
    if (email) {
      submitUser({
        variables: {
          input: { email },
        },
      });
    }
  };

  return (
    <UserForm
      initalFormValue={initialFormState}
      successfulForm={formSumit}
      loading={loading}
      styleAdjustments={styles}
    >
      {({ formState, setFormState }: FormStateTypes) => {
        return (
          <React.Fragment>
            <Input
              type="email"
              validateType="email"
              placeholder="johnnyu4life@gmail.com"
              name="email"
              label="email"
              formState={formState}
              setFormState={setFormState}
              helpText={"The email doesn't appear correct"}
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
