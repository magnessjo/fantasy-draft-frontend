import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setAlertAction } from 'scripts/store';
import { RootState, AlertType } from 'scripts/types';
import { Color, Breakpoints } from 'scripts/variables';

const Container = styled.div<{
  alertColors: { background: string; highlights: string };
  showing: boolean;
}>`
  background-color: ${({ alertColors }) => `${alertColors.background}`};
  position: fixed;
  left: 50%;
  top: ${({ showing }) => (showing ? `20px` : `-100px`)};
  transform: translateX(-50%);
  padding: 15px 20px;
  min-width: 280px;
  max-width: 80%;
  z-index: 99999;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  color: ${({ alertColors }) => `${alertColors.highlights}`};
  transition: top 600ms;
  transition-delay: 100ms;

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
  const [previousText, setPreviousText] = useState('');
  const alertState = useSelector<RootState, AlertType>(
    state => state.alertState,
  );

  const close = () => dispatch(setAlertAction(null));

  if (alertState) {
    setTimeout(() => {
      dispatch(setAlertAction(null));
    }, alertState?.time ?? '4000');
  }

  useEffect(() => {
    if (alertState?.text && previousText !== alertState.text) {
      setPreviousText(alertState.text);
    }
  }, [previousText, setPreviousText, alertState]);

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
      aria-hidden={!!alertState}
      showing={!!alertState}
      alertColors={alertColors}
    >
      <button onClick={close} z-index="-1">
        X
      </button>
      <p>{previousText}</p>
    </Container>
  );
};
