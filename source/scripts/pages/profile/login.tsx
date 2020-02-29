import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { setAlertAction, setUserAction, setSessionAction } from 'scripts/store';
import UserForm, { FormStateTypes } from './shared/form';
import { InputSubmit } from './shared/styles';
import { LoginMutation, LoginMutationVariables } from 'scripts/generated/types';
import Input, { FormInputs } from './shared/input';
import { getSessionTime } from 'scripts/lib/session';

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
        first_name
        username
      }
    }
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submitUser, { error, loading, data }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(CREATE_USER);

  if (data) {
    const loginData = data?.login;
    const user = loginData?.user;
    const token = loginData?.access_token;
    const expires = loginData?.expires_in;

    if (token && expires && user) {
      dispatch(
        setUserAction({
          first_name: user.first_name,
          username: user.username,
          token,
          expires,
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
        }),
      );
    }

    history.push('/');
  }

  const formSumit = ({ username, password }: FormInputs) => {
    if (username && password) {
      submitUser({
        variables: {
          input: { username, password },
        },
      });
    }
  };

  console.log(error);

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
              placeholder="johnnyu4life@gmail.com"
              name="username"
              label="email"
              formState={formState}
              setFormState={setFormState}
            />

            <Input
              type="password"
              placeholder=""
              name="password"
              label="password"
              formState={formState}
              setFormState={setFormState}
            />

            <InputSubmit />
            <p>
              Not a Member yet? <Link to="/signup"> Sign up</Link>
            </p>
          </React.Fragment>
        );
      }}
    </UserForm>
  );
};

export default Login;
