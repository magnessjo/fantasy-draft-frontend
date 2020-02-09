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
      background-color: rgba(255, 255, 255, 0.75);
    }
  }

  & ${Lock} {
    padding: 20px 0;
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    @media (min-width: 768px) {
      padding: 50px 0;
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

  & p {
    font-family: 'Playfair Display', serif;
    padding: 20px 50px;
    font-size: 100px;
    letter-spacing: 5px;
    text-align: center;
    max-width: 860px;
    text-shadow: 1px 2px rgba(255, 255, 255, 0.6);
    font-weight: 700;
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery<
    FetchAthletesQuery,
    FetchAthletesQueryVariables
  >(ATHLETES_QUERY);

  if (loading || error) {
    return null;
  }

  return (
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
          <p>THE FANTASY DRAFT</p>
        </Lock>
      </div>
    </Stage>
  );
};

export default Home;
