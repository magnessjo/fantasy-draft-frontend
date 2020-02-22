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
  name: string;
  placeholder?: string;
  label: string;
};

const InputLabel = styled.label`
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

const Input = ({
  type = 'input',
  placeholder,
  name,
  label,
  formState,
  setFormState,
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

  const focus = () => setIsActive(true);

  const validateValue =
    typeof value === 'string' ? validate(type, value) : null;
  const isValid = isActive ? null : validateValue;

  return (
    <InputWrapper data-valid={isValid}>
      <InputLabel>{label}</InputLabel>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={change}
        onBlur={blur}
        onFocus={focus}
      />
    </InputWrapper>
  );
};

export default Input;
