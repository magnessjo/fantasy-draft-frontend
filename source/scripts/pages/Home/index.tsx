import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Lock from 'scripts/styles/Lock';
import { FetchAthletesQueryVariables, FetchAthletesQuery } from 'types.d';

const ATHLETES_QUERY = gql`
  query FetchAthletes {
    athletes {
      id
      firstName
      lastName
      school
      position
    }
  }
`;

const ATHLETE_ID_QUERY = gql`
  query FetchAthletesByID($id: Int!) {
    athletes(id: $id) {
      id
      firstName
      lastName
      school
      position
    }
  }
`;

const ATHLETE_SCHOOL_QUERY = gql`
  query FetchAthletesBySchool($school: String!) {
    athletes(school: $school) {
      id
      firstName
      lastName
      school
      position
    }
  }
`;

const Container = styled.div`
  height: 500vh;
  padding-top: 80px;
`;

const Stage = styled.section`
  position: relative;
  overflow: hidden;
  background-image: url(/images/home/stage-default.jpg);
  background-size: cover;
  background-repeat: no-repeat;

  & > div {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  & ${Lock} {
    padding: 20px 0;
    min-height: calc(90vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;

    @media (min-width: 768px) {
      padding: 50px 0;
    }

    & > div {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: black;
        padding: 100vw;
        background: radial-gradient(
          rgba(255, 255, 255, 1) 0,
          rgba(255, 255, 255, 0.4) 50%,
          rgba(255, 255, 255, 0) 70%
        );
      }

      & > * {
        position: relative;
      }
    }
  }

  & video {
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & h1 {
    font-family: 'Playfair Display', serif;
    text-shadow: 1px 2px rgba(255, 255, 255, 0.6);
    font-weight: 700;
    letter-spacing: 10px;
    font-size: 40px;
    font-size: calc(40px + 3vw);
    line-height: 1em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  & h2 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-size: calc(18px + 0.75vw);
    margin-bottom: 20px;
    letter-spacing: 5px;
    text-transform: capitalize;
  }

  & p {
    font-size: 18px;
    max-width: 450px;
    line-height: 1.3em;
    margin: 0 auto;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const Home = () => {
  const { data } = useQuery<FetchAthletesQuery, FetchAthletesQueryVariables>(
    ATHLETES_QUERY,
  );

  const { data: playerIds } = useQuery<
    FetchAthletesQuery,
    FetchAthletesQueryVariables
  >(ATHLETE_ID_QUERY, {
    variables: { id: 170 },
  });

  const { data: playerBySchool } = useQuery<
    FetchAthletesQuery,
    FetchAthletesQueryVariables
  >(ATHLETE_SCHOOL_QUERY, {
    variables: { school: 'Alabama' },
  });

  if (data) console.log(data);
  if (playerIds) console.log(playerIds);
  if (playerBySchool) console.log(playerBySchool);

  return (
    <Container>
      <Stage>
        <video
          muted
          playsInline
          autoPlay
          placeholder="/images/home/stage-default.jpg"
        >
          <source src="/videos/hugs.mp4" type="video/mp4" />
        </video>
        <div>
          <Lock>
            <div>
              <h1>Draft Clash</h1>
              <h2>The annual mock draft game</h2>
              <p>
                Compete aganist your friends, family, and other fans for the
                ultimate prize of being right
              </p>
            </div>
          </Lock>
        </div>
      </Stage>
    </Container>
  );
};

export default Home;
