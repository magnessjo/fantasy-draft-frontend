import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router';
import gql from 'graphql-tag';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CTAStyles } from 'scripts/styles/call-to-action';
import { Loader } from 'scripts/styles/loader';
import { Lock } from 'scripts/styles/lock';
import { Breakpoints } from 'scripts/variables';
import { MediumSerifFont } from 'scripts/styles/fonts';
import { Game } from './game';
import { Maybe, RootState, UserType } from 'scripts/types';
import {
  GetEntrySelectionsQuery,
  GetEntrySelectionsQueryVariables,
  CreateEntryMutation,
  CreateEntryMutationVariables,
} from 'scripts/generated/types';
import { setAlertAction } from 'scripts/store';

const CREATE_ENTRY_MUTATION = gql`
  mutation createEntry($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
    }
  }
`;

const ENTRY_SELECTIONS_QUERY = gql`
  query getEntrySelections($id: ID!) {
    selections(entry_id: $id) {
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
`;
const NewEntryForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding-top: 80px;
  background-image: url('/images/backgrounds/entry.jpg');
  background-position: center;
  background-size: cover;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 58, 116, 0.9);
    background: linear-gradient(
      rgba(0, 58, 116, 0.4) 0%,
      rgba(0, 58, 116, 1) 100%
    );
  }

  & p {
    margin-bottom: 20px;
    line-height: 1.4em;
  }

  & p.headline {
    ${MediumSerifFont};
    text-align: center;
  }

  & > div {
    width: 100%;
    max-width: 540px;
    background-color: white;
    position: relative;
    padding: 20px;

    @media (min-width: ${Breakpoints.largeMin}px) {
      padding: 50px 80px;
    }
  }

  & input[type='text'] {
    height: 44px;
    margin-bottom: 20px;
  }

  & input[type='submit'] {
    ${CTAStyles};
    float: right;
    border: none;
    margin-top: 0;
  }
`;

const EntriesData = ({ id }: { id: string }) => {
  const { data, loading } = useQuery<
    GetEntrySelectionsQuery,
    GetEntrySelectionsQueryVariables
  >(ENTRY_SELECTIONS_QUERY, {
    variables: {
      id: id as string,
    },
    skip: !id,
  });

  const response = data?.selections;

  if (loading) return <Loader />;

  if (response) {
    return <Game entries={response} />;
  }

  return null;
};

const CreateEntry = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector<RootState, UserType>(state => state.userState);

  const [entryName, setEntryName] = useState<Maybe<string>>(null);
  const [createEntry, { loading }] = useMutation<
    CreateEntryMutation,
    CreateEntryMutationVariables
  >(CREATE_ENTRY_MUTATION);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (entryName && user) {
      const response = await createEntry({
        variables: {
          input: {
            name: entryName as string,
            user_id: user?.id as string,
          },
        },
      });

      const responseId = response?.data?.createEntry?.id;

      if (responseId) {
        history.push(`/entries/${responseId}`);
        dispatch(
          setAlertAction({
            type: 'notice',
            text: `New entry ${entryName} has been created`,
          }),
        );
      }
    }
  };

  return (
    <NewEntryForm onSubmit={handleSubmit}>
      <Lock>
        <p className="headline">Entry Name</p>
        <p>
          Enter a name for the entry so you can quickly find it in your profile
        </p>
        <input
          type="text"
          placeholder="Winner #1"
          onChange={event => setEntryName(event.currentTarget.value)}
          name="name"
        />
        <input type="submit" />
      </Lock>
    </NewEntryForm>
  );
};

export const Entries = () => {
  const { id } = useParams();

  if (!id) {
    return <CreateEntry />;
  }

  return <EntriesData id={id} />;
};
