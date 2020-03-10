import React, { useEffect } from 'react';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import { setAlertAction } from 'scripts/store';
import { Input, FormInputs } from './shared/input';
import { UserForm, FormStateTypes } from './shared/form';
import { InputSubmit } from './shared/styles';
import {
  UpdateForgottenPasswordMutation,
  UpdateForgottenPasswordMutationVariables,
} from 'scripts/generated/types';

const initialFormState = {
  password: '',
};

const styles = {
  paddingTop: '40px',
};

const UPDATE_PASSWORD = gql`
  mutation updateForgottenPassword($input: NewPasswordWithCodeInput!) {
    updateForgottenPassword(input: $input) {
      status
      message
    }
  }
`;

export const PasswordReset = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ token: string }>();
  const location = useLocation();
  const { email } = queryString.parse(location.search);
  const { token } = params;
  const [submitUser, { loading, data }] = useMutation<
    UpdateForgottenPasswordMutation,
    UpdateForgottenPasswordMutationVariables
  >(UPDATE_PASSWORD);

  useEffect(() => {
    if (data?.updateForgottenPassword?.status === 'PASSWORD_UPDATED') {
      dispatch(
        setAlertAction({
          type: 'notice',
          text: 'Your password has been reset',
        }),
      );
      history.push('/login');
    }
  }, [data, history, data, dispatch]);

  const formSumit = ({ password }: FormInputs) => {
    if (password && typeof email === 'string' && token) {
      submitUser({
        variables: {
          input: { password, email, token },
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
              type="password"
              name="password"
              label="password"
              formState={formState}
              setFormState={setFormState}
              helpText={
                'Password must be at least 8 characters and contain 1 special character. Example: fu$kshi$'
              }
            />

            <InputSubmit />
            <p>
              Don't need to reset? <Link to="/login"> Login</Link>
            </p>
          </React.Fragment>
        );
      }}
    </UserForm>
  );
};
