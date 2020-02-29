import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { setModalAction } from 'scripts/store';
import Input, { FormInputs } from './shared/input';
import UserForm, { FormStateTypes } from './shared/form';
import { InputSubmit } from './shared/styles';
import { GraphQLError } from 'graphql';
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
  const validations = error.map(obj => obj?.extensions?.validation);
  const messages = validations.map(validation => {
    if (validation['input.email']) {
      return 'The email that you have entered is not valid.  Please select another email.';
    }

    if (validation['input.username']) {
      return 'The username that you have entered is not valid.  Please select another username.';
    }
  });

  return messages ?? [];
};

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submitUser, { error, loading, data }] = useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(CREATE_USER);

  if (data) {
    history.push('/');

    dispatch(
      setModalAction({
        headlineText: {
          headline: `Action Required`,
          text:
            'You are one step away from joining the coolest draft game that the author of this website is aware of.  Please check the email that you used to signup for a validation email.  Once your email is validated, you can start making your draft entries and inviting your friends to compete for the prize of being right.',
        },
      }),
    );
  }

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
              placeholder="johnnyu4life"
              name="username"
              label="username"
              formState={formState}
              setFormState={setFormState}
            />

            <Input
              type="email"
              placeholder="johnnyu@example.com"
              name="email"
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

            <p>
              By click join now, you agree to Draft Clash's User Agreement and
              Privacy Policy.
            </p>

            <InputSubmit value={'Join Now'} />
            <p>
              Already a member? <Link to="/">Sign In</Link>
            </p>
          </React.Fragment>
        );
      }}
    </UserForm>
  );
};

export default Register;
