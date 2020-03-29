import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CloseButton } from './shared/styles';
import { Color, Breakpoints } from 'scripts/variables';

type PickerDisplayProps = {
  children: any;
  windowWidth: number;
  setShowModal: (arg: boolean) => void;
};

export const SliderWrapper = styled.div<{
  placement: number;
}>`
  display: flex;
  justify-content: space-between;
  transition: transform 1s;
  transform: translateX(${({ placement }) => (placement === 1 ? '0' : '-50%')});
  width: 200%;

  @media (min-width: ${Breakpoints.largeMin}px) {
    height: calc(100vh - 180px);
  }
`;

const SliderControls = styled.div<{
  placement: number;
}>`
  display: flex;

  & > * {
    width: 50%;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: ${Color.darkBlue};
    color: ${Color.white};
    font-weight: 700;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: white;
    }
  }

  & > *:first-of-type:before {
    display: none;
  }
`;

const DesktopView = styled.div`
  width: 100%;
  overflow: hidden;

  & > div {
    height: calc(100% - 70px);
  }

  & > button {
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
    border: 3px solid black;
  }
`;

export const PickerDisplay: FunctionComponent<PickerDisplayProps> = ({
  children,
  windowWidth,
  setShowModal,
}: PickerDisplayProps) => {
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <React.Fragment>
      {windowWidth > 767 ? (
        <DesktopView>
          <button onClick={() => setShowModal(false)}>X</button>
          <div>
            <SliderWrapper placement={currentTab}>{children}</SliderWrapper>
          </div>
          <SliderControls placement={currentTab}>
            <button onClick={() => setCurrentTab(1)}>
              <span>Players</span>
            </button>
            <button onClick={() => setCurrentTab(2)}>
              <span>Teams</span>
            </button>
          </SliderControls>
        </DesktopView>
      ) : (
        <React.Fragment>
          <SliderControls placement={currentTab}>
            <button onClick={() => setCurrentTab(1)}>
              <span>Players</span>
            </button>
            <button onClick={() => setCurrentTab(2)}>
              <span>Teams</span>
            </button>
          </SliderControls>
          <SliderWrapper placement={currentTab}>{children}</SliderWrapper>
          <CloseButton
            onClick={() => setShowModal(false)}
            positionAbsolute={true}
          >
            Close
          </CloseButton>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
