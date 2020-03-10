import styled from 'styled-components';
import { Breakpoints } from '../variables';

export const Lock = styled.div`
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: ${Breakpoints.largeMin}px) {
    padding: 0 30px;
  }

  @media (min-width: ${Breakpoints.desktopMin}px) {
    padding: 0 40px;
  }
`;
