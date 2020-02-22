import styled, { css } from 'styled-components';
import { Color } from 'scripts/variables';

export const InputLabel = styled.label`
  color: black;
`;

export const InputWrapper = styled.div<{ valid: boolean | null }>`
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 40px;
  }

  & input {
    ${({ valid }) => valid === true && `border: 1px solid green`};
    ${({ valid }) => valid === false && `border: 1px solid red`};
  }

  & ${InputLabel} {
    ${({ valid }) => valid === true && `color: green`};
    ${({ valid }) => valid === false && `color: red`};
  }
`;

export const InputSubmitStyle = css`
  font-family: 'Lato', sans-serif;
  margin-top: 20px;
  padding: 10px 20px;
  width: 100%;
  font-size: 20px;
  border: none;
  margin-bottom: 20px;
`;
