import styled, { css } from 'styled-components';
import { Color } from '../variables';

export const CTAStyles = css`
  padding: 10px 20px;
  display: inline-block;
  margin-top: 20px;
  transition: background 0.5s ease-in-out;
  background-color: ${Color.lightBlue};
  color: ${Color.white};
  text-transform: capitalize;
  border-radius: 5px;

  &:hover {
    text-decoration: none;
    background-color: rgba(69, 149, 209, 0.7);
  }
`;

export const CTA = styled.button`
  ${CTAStyles}
`;
