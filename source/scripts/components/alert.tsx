import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setAlertAction } from 'scripts/store';
import { RootState, AlertType } from 'scripts/types';
import { Color, Breakpoints } from 'scripts/variables';

const Container = styled.div<{
  alertColors: { background: string; highlights: string };
  showing: boolean;
  hide: boolean;
}>`
  background-color: ${({ alertColors }) => `${alertColors.background}`};
  position: fixed;
  left: 50%;
  top: ${({ showing }) => (showing ? `20px` : `-50px`)};
  top: ${({ hide }) => hide && `-50px`};
  transform: translateX(-50%);
  padding: 15px 20px;
  min-width: 280px;
  max-width: 80%;
  z-index: 999;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  color: ${({ alertColors }) => `${alertColors.highlights}`};
  transition: ${({ showing }) => (showing ? `top 700ms` : `none`)};
  transition-delay: 500ms;

  @media (min-width: ${Breakpoints.largeMin}px) {
    min-width: 380px;
  }

  & button {
    color: ${({ alertColors }) => `${alertColors.highlights}`};
    margin-right: 20px;
  }

  & p {
    margin-bottom: 0;
  }
`;

let alertColors = {
  background: Color.blue,
  highlights: Color.white,
};

export const Alert = () => {
  const dispatch = useDispatch();
  const [showing, setShowing] = useState(false);
  const [hide, setHide] = useState(false);
  const alertState = useSelector<RootState, AlertType>(
    state => state.alertState,
  );

  const close = () => dispatch(setAlertAction(null));

  if (showing && alertState === null) setShowing(false);
  if (!showing && alertState) {
    setShowing(true);
    setTimeout(() => {
      setHide(true);
      setTimeout(() => {
        dispatch(setAlertAction(null));
      }, 1000);
    }, 4000);
  }

  if (alertState?.type) {
    if (alertState.type === 'notice') {
      alertColors.background = Color.lightGray;
      alertColors.highlights = Color.darkGray;
    }
    if (alertState.type === 'error') {
      alertColors.background = Color.lightRed;
      alertColors.highlights = Color.white;
    }
  }

  return (
    <Container
      aria-hidden={!showing}
      showing={showing}
      hide={hide}
      alertColors={alertColors}
    >
      <button onClick={close}>X</button>
      <p>{alertState?.text}</p>
    </Container>
  );
};
