import styled from 'styled-components';
import { Color } from 'scripts/variables';

export const CenteredDivWithLogo = styled.div`
  width: 100%;
  max-width: 540px;
  min-height: 200px;
  padding: 80px 60px 60px;
  background-color: ${Color.white};
  border-radius: 2px;
  position: relative;

  & > img {
    position: absolute;
    top: -10px;
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
    font-size: 11px;

    & a {
      color: blue;
      font-weight: bold;
    }
  }
`;

export const BlueBackground = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.darkBlue};
  background: linear-gradient(${Color.lightBlue}, ${Color.darkBlue});
  text-align: center;
`;

export const InputSubmit = styled.input.attrs<{
  value?: string;
}>(({ value = 'Submit' }) => ({
  type: 'submit',
  value,
}))`
  font-family: 'Lato', sans-serif;
  margin-top: 20px;
  padding: 10px 20px;
  width: 100%;
  font-size: 20px;
  border: none;
  margin-bottom: 20px;
  background-color: ${Color.blue};
  color: ${Color.white};
`;
