import styled from 'styled-components';
import { Breakpoints } from 'scripts/variables';
import { LargeSerifFont } from 'scripts/styles/fonts';
import { Lock } from 'scripts/styles/lock';

export const SectionContainer = styled.section`
  padding: 50px 0;

  @media (min-width: ${Breakpoints.largeMin}px) {
    padding: 100px 0;
  }

  & ${Lock} > p {
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: 50px;
    text-align: center;
    font-size: 18px;
    font-size: calc(18px + 0.2vw);
    line-height: 1.3em;
  }
`;

export const SectionHeadline = styled.h1`
  ${LargeSerifFont}
  font-size: calc(18px + 1vw);
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 700;
`;

export const CenteredSummary = styled.p`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 50px;
  text-align: center;
  font-size: 18px;
  font-size: calc(18px + 0.2vw);
  line-height: 1.3em;
`;
