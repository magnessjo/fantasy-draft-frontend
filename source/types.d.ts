export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

/** List of Game Athletes */
export type Athlete = {
   __typename?: 'Athlete',
  /** Id of the athlete */
  id: Scalars['Int'],
  /** First name of Athlete */
  firstName: Scalars['String'],
  /** Last name of Athlete */
  lastName: Scalars['String'],
  /** Athlete school */
  school: Scalars['String'],
  /** Athlete position */
  position: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  athletes?: Maybe<Array<Maybe<Athlete>>>,
};

export type FetchAthletesQueryVariables = {};


export type FetchAthletesQuery = { __typename?: 'Query', athletes: Maybe<Array<Maybe<{ __typename?: 'Athlete', id: number, firstName: string, lastName: string, school: string, position: string }>>> };
