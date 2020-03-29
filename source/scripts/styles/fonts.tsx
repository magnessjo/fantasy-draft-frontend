import styled, { css } from 'styled-components';
import { Breakpoints } from '../variables';

export const XLargeSansFont = css`
  font-size: 24px;
  font-size: calc(20px + 2vw);
  margin-bottom: 20px;
`;

export const LargeSansFont = css`
  font-size: 20px;
  font-size: calc(20px + 1vw);
  margin-bottom: 20px;
`;

export const LargeSans = styled.p`
  ${LargeSansFont}
`;

export const MediumSansFont = css`
  font-size: 18px;
  font-size: calc(18px + 0.2vw);
  margin-bottom: 20px;
`;

export const MediumSans = styled.p`
  ${MediumSansFont}
`;

export const RegularSansFont = css`
  font-size: 16px;
  font-size: calc(16px + 0.2vw);
  margin-bottom: 20px;
`;

export const XLargeSerifFont = css`
  font-family: 'Noto Serif', serif;
  font-size: 40px;
  font-size: calc(18px + 4vw);
  line-height: 1em;
  letter-spacing: 2px;

  @media (min-width: ${Breakpoints.desktopMin}) {
    font-size: 60px;
  }
`;

export const LargeSerifFont = css`
  font-family: 'Noto Serif', serif;
  font-size: 30px;
  font-size: calc(18px + 2vw);
  line-height: 1em;

  @media (min-width: ${Breakpoints.desktopMin}) {
    font-size: 32px;
  }
`;

export const MediumSerifFont = css`
  font-family: 'Noto Serif', serif;
  font-size: 20px;
  font-size: calc(18px + 0.75vw);
  line-height: 1em;

  @media (min-width: ${Breakpoints.desktopMin}) {
    font-size: 24px;
  }
`;

export const MediumSerif = styled.p`
  ${MediumSerifFont}
`;

export const RegularSerifFont = css`
  font-family: 'Noto Serif', serif;
  font-size: 18px;
  font-size: calc(18px + 0.2vw);
  line-height: 1em;

  @media (min-width: ${Breakpoints.desktopMin}) {
    font-size: 20px;
  }
`;
