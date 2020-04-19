import styled from 'styled-components';
import { Color, Breakpoints } from 'scripts/variables';

export const Summary = styled.h2`
  height: 30px;
  font-weight: 700;
  display: none;

  @media (min-width: ${Breakpoints.largeMin}px) {
    display: block;
  }
`;

export const CloseButton = styled.button<{
  positionAbsolute?: boolean;
  marginTop?: number;
}>`
  background: ${Color.darkBlue};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  width: 100%;
  font-size: 18px;
  height: 44px;
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop}px`}

  ${({ positionAbsolute = false }) =>
    positionAbsolute &&
    `
      position: absolute;
      bottom: 0;
  `}
`;

export const TeamPlayerLayout = styled.div<{
  tabletHeight?: number;
  desktopHeight?: number;
}>`
  width: 100%;
  position: relative;

  @media (min-width: ${Breakpoints.largeMin}px) {
    padding: 30px;
    padding-bottom: 100px;
  }
`;

export const ScrollList = styled.div`
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 88px;

  @media (min-width: ${Breakpoints.largeMin}px) {
    height: 100%;
    padding-bottom: 0;
  }
`;
