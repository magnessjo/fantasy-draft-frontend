import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setModalAction } from 'scripts/store';
import { CTAStyles } from 'scripts/styles/call-to-action';
import { LargeSans } from 'scripts/styles/fonts';
import { Color, Breakpoints } from 'scripts/variables';
import { RootState, ModalTypes, ModalHeadlineTextType } from 'scripts/types';

const CloseWrapper = styled.div<{
  showing: boolean;
}>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 999;
  display: none;
  ${({ showing }) => showing && `display: flex;`}
`;

const Container = styled.div`
  height: 70vh;
  width: 90vw;
  min-height: 200px;
  min-width: 200px;
  padding: 20px;
  padding-top: 60px;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.99);
  cursor: default;
  position: relative;
  text-align: center;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, .8);

  @media (min-width: ${Breakpoints.largeMin}px) {
    padding: 40px;
    height: 60vh;
    width: 60vw;
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    height: 100%;

    & > div {
      width: 100%;
    }
  }

  & button {
    ${CTAStyles}
    background-color: ${Color.black};
    color: ${Color.white};
    align-self: flex-end;
  }

  & button[aria-hidden] {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 22px;
    padding: 10px 15px;
    border: 1px solid ${Color.black};
    border-radius: 50%;
    background-color: transparent;
    color: ${Color.black};
  }
`;

const HeadlineTextStyle = styled.div`
  align-self: center;

  & p {
    line-height: 1.4em;
    margin-bottom: 20px;
  }
`;

const Actions = styled.div`
  @media (min-width: ${Breakpoints.largeMin}px) {
    display: flex;
    justify-content: center;
  }

  & > button + button {
    width: 140px;

    @media (max-width: ${Breakpoints.mediumMax}px) {
      display: block;
      margin: 0 auto;
      margin-top: 20px;
    }

    @media (min-width: ${Breakpoints.largeMin}px) {
      margin-left: 10px;
    }
  }
`;

export const Modal = () => {
  const dispatch = useDispatch();
  const [showing, setShowing] = useState(false);
  const modalState = useSelector<RootState, ModalTypes>(
    state => state.modalState,
  );

  if (!showing && modalState) setShowing(true);
  if (showing && modalState === null) setShowing(false);

  const close = () => dispatch(setModalAction(null));

  if (!modalState || typeof modalState === 'undefined') return null;

  const handleProceed = () => {
    if (modalState.callback) {
      dispatch(setModalAction(null));
      modalState.callback();
    }
  };

  return (
    <CloseWrapper onClick={close} showing={showing}>
      <Container onClick={event => event.stopPropagation()}>
        <div>
          <button onClick={close} aria-hidden="true">
            X
          </button>
          <HeadlineTextStyle>
            <LargeSans>{modalState?.headlineText?.headline}</LargeSans>
            <p>{modalState?.headlineText?.text}</p>
            <Actions>
              {!modalState.callback && (
                <button onClick={close}>Close Modal</button>
              )}
              {modalState.callback && (
                <button onClick={handleProceed}>Proceed</button>
              )}
            </Actions>
          </HeadlineTextStyle>
        </div>
      </Container>
    </CloseWrapper>
  );
};
