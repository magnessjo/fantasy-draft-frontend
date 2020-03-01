import styled from 'styled-components';
import { Color } from 'scripts/variables';

export const ChildrenWrapper = styled.div<{
  styles: {
    paddingTop: string;
  };
}>`
  ${({ styles }) => `
    ${styles && styles.paddingTop && `padding-top: ${styles.paddingTop}`};
  `}
`;

export const CenteredDivWithLogo = styled.div`
  width: 100%;
  max-width: 540px;
  padding: 60px 20px 20px;
  background-color: ${Color.white};
  border-radius: 2px;
  position: relative;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 80px 60px 60px;
  }

  & > img {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    width: auto;
    object-fit: contain;
    z-index: 999;

    @media (min-width: 768px) {
      height: 140px;
    }
  }

  & p {
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.3em;
    font-size: 11px;

    & a {
      color: blue;
      font-weight: bold;
    }
  }

  & .disclaimer {
    margin-top: 20px;
  }
`;

export const BlueBackground = styled.div`
  background-color: ${Color.darkBlue};
  background: linear-gradient(${Color.lightBlue}, ${Color.darkBlue});
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 100px;
  padding-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;

  & > div {
    width: 100%;
  }
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
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  margin-bottom: 20px;
  background-color: ${Color.blue};
  color: ${Color.white};

  @media (min-width: 768px) {
    font-size: 17px;
  }
`;
