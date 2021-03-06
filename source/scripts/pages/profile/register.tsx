import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';
import { setModalAction } from 'scripts/store';
import { Input, FormInputs } from './shared/input';
import { UserForm, FormStateTypes } from './shared/form';
import { InputSubmit } from './shared/styles';
import {
  RegisterUserMutation,
  RegisterUserMutationVariables,
} from 'scripts/generated/types.d';

const CREATE_USER = gql`
  mutation registerUser($input: RegisterInput!) {
    register(input: $input) {
      status
    }
  }
`;

// To Do : Add user agreement and privacy notice

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
};

const makeErrorMessage = (error: Readonly<GraphQLError[]>) => {
  const validations = error.map((obj) => obj?.extensions?.validation);
  const messages = validations.map((validation) => {
    if (validation['input.email']) {
      return 'The email that you have entered is not valid.  Please select another email.';
    }

    if (validation['input.username']) {
      return 'The username that you have entered is not valid.  Please select another username.';
    }
  });

  return messages ?? [];
};

export const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submitUser, { error, loading, data }] = useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(CREATE_USER);

  // Succcessful

  useEffect(() => {
    if (data?.register?.status === 'MUST_VERIFY_EMAIL') {
      dispatch(
        setModalAction({
          headlineText: {
            headline: `Action Required`,
            text:
              'You can login without verifying your email at this time.  This app is a beta so we are only allowing people we know to enter.  ',
          },
        }),
      );

      history.push('/');
    }
  }, [dispatch, data, history]);

  // Mutation

  const formSumit = ({
    username,
    password,
    email,
    first_name,
    last_name,
  }: FormInputs) => {
    if (username && password && first_name && last_name && email) {
      submitUser({
        variables: {
          input: { username, password, email, first_name, last_name },
        },
      });
    }
  };

  return (
    <UserForm
      initalFormValue={initialFormState}
      successfulForm={formSumit}
      loading={loading}
      errorMessage={error && makeErrorMessage(error.graphQLErrors)}
    >
      {({ formState, setFormState }: FormStateTypes) => {
        return (
          <React.Fragment>
            <Input
              type="text"
              placeholder="Johnny"
              name="first_name"
              label="First Name"
              formState={formState}
              setFormState={setFormState}
            />

            <Input
              type="text"
              placeholder="Utah"
              name="last_name"
              label="Last Name"
              formState={formState}
              setFormState={setFormState}
            />

            <Input
              type="text"
              validateType="any"
              placeholder="johnnyu4life"
              name="username"
              label="username"
              formState={formState}
              setFormState={setFormState}
            />

            <Input
              type="email"
              validateType="email"
              placeholder="johnnyu@example.com"
              name="email"
              label="email"
              formState={formState}
              setFormState={setFormState}
              helpText={'Email must be valid. Example: bob@gmail.com'}
            />

            <Input
              type="password"
              validateType="password"
              placeholder=""
              name="password"
              label="password"
              formState={formState}
              setFormState={setFormState}
              helpText={
                'Password must be at least 8 characters and contain 1 special character. Example: fu$kshi$'
              }
            />

            <p className="disclaimer">
              By click join now, you agree to Draft Clash's User Agreement and
              Privacy Policy.
            </p>

            <InputSubmit value={'Join Now'} />
            <p>
              Already a member? <Link to="/login">Sign In</Link>
            </p>
          </React.Fragment>
        );
      }}
    </UserForm>
  );
};
