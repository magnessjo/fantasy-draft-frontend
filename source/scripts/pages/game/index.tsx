import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  FetchAthletesQueryVariables,
  FetchAthletesQuery,
  FetchAthletesBySchoolQuery,
  FetchAthletesBySchoolQueryVariables,
  FetchAthletesByIdQuery,
  FetchAthletesByIdQueryVariables,
} from '../../generated/types';

const ATHLETE_DATA = gql`
  fragment AthleteData on Athlete {
    id
    first_name
    last_name
    school
    position
  }
`;

const ATHLETES_QUERY = gql`
  query FetchAthletes($year: String!) {
    athletes(eligible_year: $year) {
      data {
        ...AthleteData
      }
    }
  }
  ${ATHLETE_DATA}
`;

const ATHLETE_ID_QUERY = gql`
  query FetchAthletesByID($id: ID!) {
    athlete(id: $id) {
      ...AthleteData
      height
      weight
      description
      image
    }
  }
  ${ATHLETE_DATA}
`;

const ATHLETE_SCHOOL_QUERY = gql`
  query FetchAthletesBySchool($year: String!, $school: String!) {
    athletes(eligible_year: $year, school: $school) {
      data {
        ...AthleteData
      }
    }
  }
  ${ATHLETE_DATA}
`;

export const Athletes = () => {
  const { data } = useQuery<FetchAthletesQuery, FetchAthletesQueryVariables>(
    ATHLETES_QUERY,
    {
      variables: { year: '2020' },
    },
  );

  const { data: playerIds } = useQuery<
    FetchAthletesByIdQuery,
    FetchAthletesByIdQueryVariables
  >(ATHLETE_ID_QUERY, {
    variables: { id: '1' },
  });

  const { data: playerBySchool } = useQuery<
    FetchAthletesBySchoolQuery,
    FetchAthletesBySchoolQueryVariables
  >(ATHLETE_SCHOOL_QUERY, {
    variables: { year: '2020', school: 'Alabama' },
  });

  if (data) console.log(data);
  if (playerIds) console.log(playerIds);
  if (playerBySchool) console.log(playerBySchool);

  return <div></div>;
};
