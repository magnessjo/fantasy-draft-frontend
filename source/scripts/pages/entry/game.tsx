import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { AccessabilityElement } from 'scripts/styles/accessability';
import { Lock } from 'scripts/styles/lock';
import { Breakpoints, Color } from 'scripts/variables';
import { setAlertAction } from 'scripts/store';
import { Selections } from './selections';
import { PickerDisplay } from './picker-display';
import { PlayerPicker } from './players';
import { TeamPicker } from './teams';
import { PlayerModel } from './players/model';
import { EntryType, UpdateSelectionType } from './shared/game-types';
import {
  UpdateEntrySelectionMutation,
  UpdateEntrySelectionMutationVariables,
  Athlete,
  Maybe,
} from 'scripts/generated/types';

type GameProps = {
  entries: Array<EntryType>;
};

type SelectionControllerComponentProps = {
  entries: Array<EntryType>;
  currentSelection: EntryType;
  setCurrentSelection: (arg: EntryType) => void;
};

const ENTRY_SELECTION_MUTATION = gql`
  mutation updateEntrySelection($input: EntryInput!) {
    updateEntry(input: $input) {
      status
      selections {
        id
        selection
        athlete {
          id
          first_name
          last_name
          school
          position
          school_standing
          image
        }
        organization {
          id
          name
          city
          image
          primary_color
        }
      }
    }
  }
`;

const Container = styled.section`
  padding: 20px 0;

  @media (min-width: ${Breakpoints.largeMin}px) {
    padding: 60px 0;
  }
`;

const Modal = styled.div<{ show: boolean }>`
  display: ${({ show }) => `${show ? `flex` : `none`}`};
  background-color: white;
  z-index: 999;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;

  @media (min-width: ${Breakpoints.mediumMin}px) {
    height: calc(100vh - 40px);
    width: calc(100vw - 40px);
    top: 20px;
    left: 20px;
    box-shadow: 0 0 1px 100vw rgba(0, 0, 0, 0.8);
  }

  & > div {
    position: relative;
    overflow: hidden;
    width: 100%;

    @media (min-width: ${Breakpoints.largeMin}px) {
      padding: 20px;
      padding-top: 50px;
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      padding: 50px;
    }
  }
`;

const SelectionController = styled.div`
  height: 50px;

  @media (max-width: ${Breakpoints.mediumMax}px) {
    display: none;
  }

  & .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    & p {
    }

    & > div {
      padding: 0 50px;
      font-weight: 700;
      position: relative;
      height: 100%;
      align-items: center;
      justify-content: center;
      display: flex;

      & button {
        position: absolute;
        top: 50%;
        left: 0;
        width: 15px;
        height: 15px;
        display: block;
        border: 2px solid black;
        transform: rotate(-45deg) translateY(-50%);
        margin-top: -2px;
      }

      & button:first-of-type {
        border-right: none;
        border-bottom: none;
      }

      & button:last-of-type {
        right: 0;
        left: inherit;
        border-top: none;
        border-left: none;
      }
    }
  }
`;

const SelectionControllerComponent: FunctionComponent<SelectionControllerComponentProps> = ({
  currentSelection,
  setCurrentSelection,
  entries,
}) => {
  const getEntryById = (id?: number) =>
    entries.find((entry: EntryType) => entry.selection === id && entry);

  const getAddSelection = (id: number) => (id === 33 ? 1 : id);
  const getSubSelection = (id: number) => (id < 1 ? 32 : id);

  return (
    <SelectionController>
      <div className="wrapper">
        <div>
          <button
            onClick={() =>
              setCurrentSelection(
                //@ts-ignore
                getEntryById(getSubSelection(currentSelection.selection - 1)),
              )
            }
          ></button>

          <p>
            #{currentSelection.selection} - {currentSelection.organization.city}{' '}
            {currentSelection.athlete && (
              <span>
                - {currentSelection.athlete?.first_name}{' '}
                {currentSelection.athlete?.last_name}
              </span>
            )}
          </p>

          <button
            onClick={() =>
              setCurrentSelection(
                //@ts-ignore
                getEntryById(getAddSelection(currentSelection.selection + 1)),
              )
            }
          ></button>
        </div>
      </div>
    </SelectionController>
  );
};

export const Game: FunctionComponent<GameProps> = ({ entries }) => {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const [currentSelection, setCurrentSelection] = useState<Maybe<EntryType>>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState<Maybe<Athlete>>(null);

  const handleSelectionClick = (entry: EntryType) => {
    setCurrentSelection(entry);
    setShowModal(true);
  };

  useEffect(() => {
    if (currentSelection) {
      const updatedEntry = entries.find(
        entry => entry.id === currentSelection.id,
      );

      if (updatedEntry && updatedEntry !== currentSelection) {
        setCurrentSelection(updatedEntry);
      }
    }
  }, [entries, currentSelection, setCurrentSelection]);

  const [updateEntry, { loading }] = useMutation<
    UpdateEntrySelectionMutation,
    UpdateEntrySelectionMutationVariables
  >(ENTRY_SELECTION_MUTATION);

  const handleUpdateSelection = async ({
    player,
    organization,
    currentSelection,
  }: UpdateSelectionType) => {
    const athleteId = player ? player.id : currentSelection?.athlete?.id;
    const organizationId = organization
      ? organization.id
      : currentSelection?.organization.id;

    if (windowWidth < 768) {
      setShowModal(false);
    }

    if (currentSelection) {
      const response = await updateEntry({
        variables: {
          input: {
            id: currentSelection.id,
            org_id: organizationId,
            athlete_id: athleteId ?? null,
          },
        },
      });

      if (response?.data?.updateEntry?.status === 'success') {
        dispatch(
          setAlertAction({
            type: 'notice',
            text: `Your selection has been updated `,
            time: 2000,
          }),
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, [setWindowWidth]);

  return (
    <Container>
      <Lock>
        <AccessabilityElement as="h1">
          Make your Selections
        </AccessabilityElement>
        <Selections
          entries={entries}
          handleSelectionClick={handleSelectionClick}
          currentSelection={currentSelection}
        />
        <Modal show={showModal}>
          <div>
            {currentSelection && (
              <SelectionControllerComponent
                currentSelection={currentSelection}
                setCurrentSelection={setCurrentSelection}
                entries={entries}
              />
            )}
            <PickerDisplay
              windowWidth={windowWidth}
              setShowModal={setShowModal}
            >
              {currentSelection && (
                <React.Fragment>
                  <PlayerPicker
                    currentSelection={currentSelection}
                    setShowPlayer={setShowPlayer}
                    handleUpdateSelection={handleUpdateSelection}
                  />
                  <TeamPicker
                    handleUpdateSelection={handleUpdateSelection}
                    currentSelection={currentSelection}
                  />
                </React.Fragment>
              )}
            </PickerDisplay>
          </div>
        </Modal>

        {showPlayer && (
          <PlayerModel playerInfo={showPlayer} setShowPlayer={setShowPlayer} />
        )}
      </Lock>
    </Container>
  );
};
