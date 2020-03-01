import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Loader from 'scripts/styles/loader';
import { FormInputs } from './input';
import { validate } from 'scripts/lib/form';
import { BlueBackground, CenteredDivWithLogo, ChildrenWrapper } from './styles';
import { Maybe } from 'scripts/types';

export type FormStateTypes = {
  formState: FormInputs;
  setFormState: (args: FormInputs) => void;
};

type ErrorMessageTypes = string | Array<Maybe<string> | undefined>;

type FormProps = {
  children?: any;
  initalFormValue: FormInputs;
  successfulForm: (data: FormInputs) => void;
  errorMessage?: ErrorMessageTypes;
  successMessage?: Maybe<string>;
  loading?: boolean;
  styleAdjustments?: any;
};

const ErrorText = styled.p`
  && {
    padding-top: 20px;
    color: red;
    font-size: 18px;
  }
`;

const SuccessText = styled.p`
  && {
    padding-top: 20px;
    color: green;
    font-size: 18px;
  }
`;

const Errors = ({ error }: { error?: ErrorMessageTypes }) => {
  if (error) {
    if (typeof error === 'string') {
      return <ErrorText>{error}</ErrorText>;
    }

    if (Array.isArray(error)) {
      return (
        <React.Fragment>
          {error.map((errorMessage?: Maybe<string>) => {
            if (errorMessage) {
              return <ErrorText>{errorMessage}</ErrorText>;
            }
          })}
        </React.Fragment>
      );
    }
  }

  return null;
};

const UserForm = ({
  children,
  initalFormValue,
  successfulForm,
  errorMessage,
  successMessage,
  loading,
  styleAdjustments,
}: FormProps) => {
  const formElement = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [formState, setFormState] = useState<FormInputs>(initalFormValue);

  const checkInputs = () => {
    const inputs: Array<HTMLInputElement> = Array.from(
      formElement.current.querySelectorAll('input:not([type="submit"])'),
    );

    const list = inputs.filter((input: HTMLInputElement) => {
      const isValid = validate(input.type, input.value);
      return isValid === false;
    });

    if (Array.isArray(list) && list.length > 0) {
      list.forEach(input => {
        const parent = input.parentNode as HTMLElement;
        parent.setAttribute('data-valid', 'false');
      });
      return false;
    }

    return true;
  };

  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formElement && formElement.current) {
      const isValid = checkInputs();
      if (isValid === false) return;

      return successfulForm(formState);
    }
  };

  return (
    <BlueBackground>
      <div>
        <CenteredDivWithLogo
          as={'form'}
          onSubmit={formSubmit}
          ref={formElement}
          autoComplete="off"
          method="post"
        >
          <img src="/images/logo.png" aria-hidden />
          <ChildrenWrapper styles={styleAdjustments}>
            {children({ formState, setFormState })}
          </ChildrenWrapper>
          {errorMessage && <Errors error={errorMessage} />}
          {successMessage && <SuccessText>{successMessage}</SuccessText>}
          {loading && <Loader />}
        </CenteredDivWithLogo>
      </div>
    </BlueBackground>
  );
};

export default UserForm;
