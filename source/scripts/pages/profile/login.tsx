import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { setAlertAction, setUserAction, setSessionAction } from 'scripts/store';
import { getSessionTime } from 'scripts/lib/session';
import { UserForm, FormStateTypes } from './shared/form';
import { InputSubmit } from './shared/styles';
import { Input, FormInputs } from './shared/input';
import { LoginMutation, LoginMutationVariables } from 'scripts/generated/types';

const initialFormState = {
  username: '',
  password: '',
};

const CREATE_USER = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      access_token
      expires_in
      user {
        id
        first_name
        last_name
        username
      }
    }
  }
`;

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submitUser, { error, loading, data }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(CREATE_USER);

  useEffect(() => {
    if (data) {
      const loginData = data?.login;
      const user = loginData?.user;
      const token = loginData?.access_token;
      const expires = loginData?.expires_in;

      if (token && expires && user) {
        dispatch(
          setUserAction({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
          }),
        );

        dispatch(
          setAlertAction({
            type: 'notice',
            text: 'You have been logged in',
          }),
        );

        dispatch(
          setSessionAction({
            time: getSessionTime(),
            token,
            expires,
          }),
        );
      }

      history.push('/');
    }
  }, [data, dispatch, history]);

  const formSumit = ({ username, password }: FormInputs) => {
    if (username && password) {
      submitUser({
        variables: {
          input: { username, password },
        },
      });
    }
  };

  return (
    <UserForm
      initalFormValue={initialFormState}
      successfulForm={formSumit}
      errorMessage={
        error && 'The email or password you have entered is invalid'
      }
      loading={loading}
    >
      {({ formState, setFormState }: FormStateTypes) => {
        return (
          <React.Fragment>
            <Input
              type="email"
              validateType="email"
              placeholder="johnnyu4life@gmail.com"
              name="username"
              label="email"
              formState={formState}
              setFormState={setFormState}
              helpText={"The email doesn't appear correct"}
            />

            <Input
              type="password"
              validateType="password"
              placeholder=""
              name="password"
              label="password"
              formState={formState}
              setFormState={setFormState}
            />

            <InputSubmit />
            <p>
              Not a Member yet? <Link to="/register"> Sign up</Link>
            </p>
            <p>
              Not sure of your password?{' '}
              <Link to="/forgotten-password"> Reset Password</Link>
            </p>
          </React.Fragment>
        );
      }}
    </UserForm>
  );
};
