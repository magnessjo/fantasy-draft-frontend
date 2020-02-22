import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ApolloError } from 'apollo-boost';
import Loader from 'scripts/styles/loader';
import Error from 'scripts/styles/error';
import { FormInputs } from './input';
import { validate } from 'scripts/lib/form';
import { BlueBackground, CenteredDivWithLogo } from './styles';

export type FormStateTypes = {
  formState: FormInputs;
  setFormState: (args: FormInputs) => void;
};

type FormProps = {
  children?: any;
  initalFormValue: FormInputs;
  successfulForm: (data: FormInputs) => void;
  error?: string | Array<string> | ApolloError;
  loading?: boolean;
  styleAdjustments?: any;
};

const ChildrenWrapper = styled.div<{
  styles: {
    paddingTop: string;
  };
}>`
  ${({ styles }) => `
    ${styles && styles.paddingTop && `padding-top: ${styles.paddingTop}`};
  `}
`;

const UserForm = ({
  children,
  initalFormValue,
  successfulForm,
  error,
  loading,
  styleAdjustments,
}: FormProps) => {
  const formElement = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [formState, setFormState] = useState<FormInputs>(initalFormValue);

  const closeErrorNotice = () => {
    setFormState(initalFormValue);
  };

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
      <CenteredDivWithLogo as={'form'} onSubmit={formSubmit} ref={formElement}>
        <img src="/images/logo.png" aria-hidden />
        <ChildrenWrapper styles={styleAdjustments}>
          {children({ formState, setFormState })}
        </ChildrenWrapper>
        {error && <Error errorCodes={error} close={closeErrorNotice} />}
        {loading && <Loader />}
      </CenteredDivWithLogo>
    </BlueBackground>
  );
};

export default UserForm;
