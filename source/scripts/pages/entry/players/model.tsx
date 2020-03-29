import React from 'react';
import styled from 'styled-components';
import { Breakpoints } from 'scripts/variables';
import { LargeSerifFont } from 'scripts/styles/fonts';
import { CloseButton } from '../shared/styles';
import { Athlete } from 'scripts/generated/types';

type PlayerModalProps = {
  setShowPlayer: (arg: null) => void;
  playerInfo: Athlete;
};

const Modal = styled.div`
  background-color: rgba(255, 255, 255, 0.99);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  display: block;
  box-shadow: 0 0 1px 100vw rgba(0, 0, 0, 0.8);
  z-index: 999;

  & > button {
    position: absolute;
    right: 20px;
    top: 20px;
  }
`;

const PlayerInfoModal = styled.div`
  font-size: 18px;
  overflow-y: scroll;
  height: 100%;
  z-index: 999;
  position: relative;

  & > div {
    @media (min-width: ${Breakpoints.desktopMin}px) {
      display: flex;
      align-items: center;
    }

    & > div {
      @media (min-width: ${Breakpoints.desktopMin}px) {
        width: 60%;
        padding-left: 20px;
      }
    }
  }

  & p {
    margin-bottom: 10px;
  }

  & .name {
    ${LargeSerifFont};
    margin-bottom: 20px;
  }

  & img {
    width: 80%;
    max-width: 400px;
    display: block;
    margin: 0 auto;

    @media (max-width: ${Breakpoints.largeMax}px) {
      margin: 0;
      margin-bottom: 20px;
    }
  }
`;

const PlayerDescription = styled.p`
  margin-top: 20px;
  font-size: 15px;
  line-height: 1.4em;
`;

export const PlayerModel = ({
  setShowPlayer,
  playerInfo,
}: PlayerModalProps) => {
  return (
    <Modal>
      {playerInfo && (
        <PlayerInfoModal>
          <div>
            <img
              src={`/images/players/2020/${playerInfo.image}`}
              alt={`image of ${playerInfo.last_name}`}
            />
            <div>
              <p className="name">{` ${playerInfo.first_name} ${playerInfo.last_name}`}</p>
              <p>
                {playerInfo.position}, {playerInfo.school}
              </p>
              <p>
                {playerInfo.height}, {playerInfo.weight}
              </p>
              <p>{playerInfo.school_standing}</p>
            </div>
          </div>
          {playerInfo.description && (
            <PlayerDescription>{playerInfo.description}</PlayerDescription>
          )}
          <CloseButton onClick={() => setShowPlayer(null)}>Close</CloseButton>
        </PlayerInfoModal>
      )}
    </Modal>
  );
};
