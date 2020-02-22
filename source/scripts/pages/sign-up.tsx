import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { setModalAction } from 'scripts/store';
import Loader from 'scripts/styles/loader';
import Error from 'scripts/styles/error';
import {
  InputWrapper,
  InputSubmitStyle,
  InputLabel,
} from 'scripts/styles/form';
import { Color } from 'scripts/variables';
import { Maybe } from 'scripts/types';
import {
  CreateUserMutationVariables,
  CreateUserMutation,
} from 'scripts/generated/types.d';

type FormKeys = 'firstName' | 'lastName' | 'username' | 'email' | 'password';

type FormInputValue = {
  value: Maybe<string>;
  valid: Maybe<boolean>;
};

type FormInputs = {
  firstName: FormInputValue;
  lastName: FormInputValue;
  username: FormInputValue;
  email: FormInputValue;
  password: FormInputValue;
};

const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      id
      firstName
    }
  }
`;

const FormStyled = styled.form`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.darkBlue};
  background: linear-gradient(${Color.lightBlue}, ${Color.darkBlue});
  text-align: center;

  & > div {
    width: 100%;
    max-width: 540px;
    padding: 80px 60px;
    background-color: ${Color.white};
    border-radius: 2px;
    position: relative;

    & > img {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 140px;
      width: auto;
      object-fit: contain;
      z-index: 999;
    }

    & > p {
      max-width: 400px;
      margin: 0 auto;
      line-height: 1.3em;

      & a {
        color: blue;
        font-weight: bold;
      }
    }
  }
`;

export const InputSubmit = styled.input.attrs({
  type: 'submit',
  value: 'Join Now',
})`
  ${InputSubmitStyle}
  background-color: ${Color.blue};
  color: ${Color.white};
`;

// To Do : Add user agreement and privacy notice

const form = {
  firstName: {
    value: null,
    valid: null,
  },
  lastName: {
    value: null,
    valid: null,
  },
  email: {
    value: null,
    valid: null,
  },
  username: {
    value: null,
    valid: null,
  },
  password: {
    value: null,
    valid: null,
  },
};

// Form Validation

const validateString = (str: string) =>
  str.length > 0 && /^[a-zA-Z]+$/.test(str);

const validateEmail = (str: string) => str.length > 0;
const validatePassword = (str: string) => str.length > 0;

const validate = (type: string, value: string) => {
  if (type === 'text') return validateString(value);
  if (type === 'password') return validatePassword(value);
  if (type === 'email') return validateEmail(value);

  return null;
};

// Component

const Signup = () => {
  const formElement = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();
  const history = useHistory();
  const [formState, setFormState] = useState<FormInputs>(form);
  const [submitUser, { error, loading, data: userData }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER);

  // Successful user created

  if (userData) {
    history.push('/');

    dispatch(
      setModalAction({
        headlineText: {
          headline: `${userData?.createUser.firstName}, Action Required`,
          text:
            'You are one step away from joining the coolest draft game that the author of this website is aware of.  Please check the email that you used to signup for a validation email.  Once your email is validated, you can start making your draft entries and inviting your friends to compete for the prize of being right.',
        },
      }),
    );
  }

  const closeErrorNotice = () =>
    setFormState({
      ...formState,
    });

  const inputChange = (event: React.FormEvent<HTMLInputElement>) =>
    setFormState({
      ...formState,
      [event.currentTarget.name]: {
        value: event.currentTarget.value,
        valid: null,
      },
    });

  const blur = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;

    return setFormState({
      ...formState,
      [target.name]: {
        value: target.value,
        valid: validate(target.type, target.value),
      },
    });
  };

  const inputFocus = (event: React.FormEvent<HTMLInputElement>) =>
    setFormState({
      ...formState,
      [event.currentTarget.name]: {
        value: formState[event.currentTarget.value as FormKeys],
        valid: null,
      },
    });

  const showErrors = () => {
    const copiedFormState = { ...formState };
    for (const key in copiedFormState) {
      if (copiedFormState[key as FormKeys].valid !== true) {
        copiedFormState[key as FormKeys].valid = false;
      }
    }

    setFormState({
      ...formState,
      ...copiedFormState,
    });
  };

  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isError = Object.keys(formState).find(
      key => formState[key as FormKeys].valid !== true,
    );

    if (isError) {
      if (formElement && formElement.current) {
        const inputs = Array.from(
          formElement.current.querySelectorAll('input'),
        );

        inputs.forEach(input => input.blur());

        const isValid = inputs
          .map((input: HTMLInputElement) => validate(input.type, input.value))
          .find(valid => valid === false || valid === null);

        if (!isValid) {
          showErrors();
          return;
        }
      }
    }

    submitUser({
      variables: {
        firstName: formState.firstName.value as string,
        lastName: formState.lastName.value as string,
        email: formState.email.value as string,
        username: formState.username.value as string,
        password: formState.password.value as string,
      },
    });
  };

  return (
    <FormStyled onSubmit={formSubmit} ref={formElement}>
      <div>
        <img src="/images/logo.png" aria-hidden />

        <InputWrapper valid={formState.firstName.valid}>
          <InputLabel>First Name</InputLabel>
          <input
            type="text"
            name="firstName"
            placeholder="Johnny"
            onChange={inputChange}
            onBlur={blur}
            onFocus={inputFocus}
          />
        </InputWrapper>

        <InputWrapper valid={formState.lastName.valid}>
          <InputLabel>Last Name</InputLabel>
          <input
            type="text"
            name="lastName"
            placeholder="Utah"
            onChange={inputChange}
            onBlur={blur}
            onFocus={inputFocus}
          />
        </InputWrapper>

        <InputWrapper valid={formState.username.valid}>
          <InputLabel>Username</InputLabel>
          <input
            type="text"
            name="username"
            placeholder="johnnyu4life"
            onChange={inputChange}
            onBlur={blur}
            onFocus={inputFocus}
          />
        </InputWrapper>

        <InputWrapper valid={formState.email.valid}>
          <InputLabel>Email</InputLabel>
          <input
            type="email"
            name="email"
            placeholder="johnnyu@example.com"
            onChange={inputChange}
            onBlur={blur}
            onFocus={inputFocus}
          />
        </InputWrapper>

        <InputWrapper valid={formState.password.valid}>
          <InputLabel>Password</InputLabel>
          <input
            type="password"
            name="password"
            onChange={inputChange}
            onBlur={blur}
            onFocus={inputFocus}
          />
        </InputWrapper>

        <p>
          By click Join now, you agree to Draft Clash's User Agreement, Privacy
          Policy.
        </p>

        <InputSubmit />
        <p>
          Already a member? <Link to="/">Sign In</Link>
        </p>
        {error && <Error errorCodes={error} close={closeErrorNotice} />}
        {loading && <Loader />}
      </div>
    </FormStyled>
  );
};

export default Signup;
