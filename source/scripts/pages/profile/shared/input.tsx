import React, { useState } from 'react';
import { validate } from 'scripts/lib/form';
import styled from 'styled-components';
import { FormStateTypes } from './form';

export type InputKeys =
  | 'username'
  | 'password'
  | 'email'
  | 'first_name'
  | 'last_name';

export type FormInputs = {
  [key in InputKeys]?: string;
};

type InputProps = FormStateTypes & {
  type: string;
  validateType?: string;
  name: string;
  placeholder?: string;
  label: string;
  helpText?: string;
};

const InputLabel = styled.label.attrs((props: { htmlFor: string }) => ({
  htmlFor: props.htmlFor,
}))`
  color: black;
  font-size: 13px;
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 3px;
  margin-left: 1px;
  line-height: 1em;
  display: block;
  text-align: left;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }

  &[data-valid='true'] {
    & input {
      border: 1px solid green;
    }

    & ${InputLabel} {
      color: green;
    }
  }

  &[data-valid='false'] {
    & input {
      border: 1px solid red;
    }

    & ${InputLabel} {
      color: red;
    }
  }
`;

const HelpText = styled.p`
  font-size: 12px;
  text-align: left;
  color: red;
  padding-top: 5px;
`;

export const Input = ({
  type = 'input',
  validateType = 'text',
  placeholder,
  name,
  label,
  formState,
  setFormState,
  helpText,
}: InputProps) => {
  const [isActive, setIsActive] = useState(true);
  const value = formState[name as InputKeys];

  const change = (event: React.FormEvent<HTMLInputElement>) => {
    setIsActive(true);
    setFormState({ ...formState, [name]: event.currentTarget.value });
  };

  const blur = (event: React.FormEvent<HTMLInputElement>) => {
    setIsActive(false);
    return setFormState({ ...formState, [name]: event.currentTarget.value });
  };

  const focus = () => {
    setIsActive(true);
  };

  const validateValue =
    typeof value === 'string' ? validate(validateType, value) : null;

  const isValid = isActive ? null : validateValue;

  return (
    <InputWrapper data-valid={isValid}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={change}
        onBlur={blur}
        onFocus={focus}
      />
      {helpText && isValid === false && <HelpText>{helpText}</HelpText>}
    </InputWrapper>
  );
};
