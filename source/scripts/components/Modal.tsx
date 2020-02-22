import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setModalAction } from 'scripts/store';
import { CTAStyles } from 'scripts/styles/call-to-action';
import { LargeFont } from 'scripts/styles/fonts';
import { Color } from 'scripts/variables';
import { RootState, ModalTypes, ModalHeadlineTextType } from 'scripts/types';

const CloseWrapper = styled.div<{
  showing: boolean;
}>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 99;
  display: none;
  ${({ showing }) => showing && `display: flex;`}
`;

const Container = styled.div`
  height: 60vh;
  width: 60vw;
  min-height: 200px;
  min-width: 200px;
  padding: 20px;
  padding-top: 60px;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.99);
  cursor: default;
  position: relative;

  @media (min-width: 768px) {
    padding: 40px;
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    height: 100%;

    & > div {
      width: 100%;
    }

    & > button {
      ${CTAStyles}
      background-color: ${Color.black};
      color: ${Color.white};
      align-self: flex-end;
      margin: 0 auto;
    }
  }

  & button[aria-hidden] {
    position: absolute;
    top: 5px;
    right: 5px;
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

  & .headline {
    margin-bottom: 20px;
  }
`;

const HeadlineText = ({ headline, text }: ModalHeadlineTextType) => (
  <HeadlineTextStyle>
    <LargeFont>{headline}</LargeFont>
    <p>{text}</p>
  </HeadlineTextStyle>
);

const Modal = () => {
  const dispatch = useDispatch();
  const [showing, setShowing] = useState(false);
  const modalState = useSelector<RootState, ModalTypes>(
    state => state.modalState,
  );

  // if (!showing && modalState) setShowing(true);
  // if (showing && modalState === null) setShowing(false);

  if (!showing) setShowing(true);

  const close = () => dispatch(setModalAction(null));

  if (!modalState || typeof modalState === 'undefined') return null;

  return (
    <CloseWrapper onClick={close} showing={showing}>
      <Container onClick={event => event.stopPropagation()}>
        <div>
          <button onClick={close} aria-hidden="true">
            X
          </button>
          {modalState.headlineText && (
            <HeadlineText {...modalState.headlineText} />
          )}
          <button onClick={close}>Close Modal</button>
        </div>
      </Container>
    </CloseWrapper>
  );
};

export default Modal;
