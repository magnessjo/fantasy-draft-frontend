import styled, { css } from 'styled-components';

export const CTAStyles = css`
  font-weight: 700;
  padding: 10px 20px;
  letter-spacing: 0.5px;
  display: inline-block;
  margin-top: 20px;
  text-transform: uppercase;
  transition: background 0.5s ease-in-out;

  &:hover {
    text-decoration: none;
  }
`;

const CTA = styled.div`
  ${CTAStyles}
`;

export default CTA;
